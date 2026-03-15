import { createCanvas, GlobalFonts, type SKRSContext2D, type Canvas, type Image } from '@napi-rs/canvas';
import { join } from 'path';
import { readdirSync, writeFileSync } from 'fs';
import type { FigmaNodeDict } from '@figma-dsl/compiler';
import { computeDrawInstruction } from '@figma-dsl/core';
import type { ImageCache } from './image-loader.js';

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RenderOptions {
  backgroundColor: RgbaColor;
  scale: number;
  assetDir?: string;
  debugLayout?: boolean;
  imageCache?: ImageCache;
}

export interface RenderResult {
  pngBuffer: Buffer;
  width: number;
  height: number;
}

export class RenderError extends Error {
  constructor(
    message: string,
    public readonly nodePath: string,
    public readonly nodeType: string,
  ) {
    super(message);
    this.name = 'RenderError';
  }
}

const DEFAULT_OPTIONS: RenderOptions = {
  backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
  scale: 1,
};

// Canvas pool for reuse across batch renders
const canvasPool = new Map<string, Canvas[]>();

function acquireCanvas(width: number, height: number): Canvas {
  const key = `${width}x${height}`;
  const pool = canvasPool.get(key);
  if (pool?.length) {
    const canvas = pool.pop()!;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    return canvas;
  }
  return createCanvas(width, height);
}

function releaseCanvas(canvas: Canvas, width: number, height: number): void {
  const key = `${width}x${height}`;
  let pool = canvasPool.get(key);
  if (!pool) {
    pool = [];
    canvasPool.set(key, pool);
  }
  // Keep at most 4 canvases per size
  if (pool.length < 4) {
    pool.push(canvas);
  }
}

let fontsRegistered = false;

const CJK_FONT_FAMILY = 'Noto Sans JP';

export function initializeRenderer(fontDir: string): void {
  if (fontsRegistered) return;
  const files = readdirSync(fontDir);
  for (const file of files) {
    if (file.endsWith('.otf') || file.endsWith('.ttf')) {
      const fileLower = file.toLowerCase();
      if (fileLower.includes('notosansjp') || fileLower.includes('noto-sans-jp')) {
        GlobalFonts.registerFromPath(join(fontDir, file), CJK_FONT_FAMILY);
      } else {
        GlobalFonts.registerFromPath(join(fontDir, file), 'Inter');
      }
    }
  }
  fontsRegistered = true;
}

/**
 * Detect if text contains CJK characters (Chinese, Japanese, Korean).
 * Covers: CJK Unified Ideographs, Hiragana, Katakana, CJK Symbols, Halfwidth/Fullwidth.
 */
function containsCJK(text: string): boolean {
  return /[\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(text);
}

/**
 * Choose font family based on text content — CJK text uses Noto Sans JP fallback.
 */
function chooseFontFamily(text: string, requested: string): string {
  if (requested !== 'Inter') return requested;
  return containsCJK(text) ? CJK_FONT_FAMILY : 'Inter';
}

function rgbaToString(color: { r: number; g: number; b: number; a: number }, alpha?: number): string {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${alpha ?? color.a})`;
}

function fontWeightToCss(weight: number): string {
  return String(weight);
}

function applyFills(
  ctx: SKRSContext2D,
  node: FigmaNodeDict,
  drawShape: (ctx: SKRSContext2D) => void,
  imageCache?: ImageCache,
): void {
  for (const paint of node.fillPaints) {
    if (!paint.visible) continue;

    ctx.globalAlpha = (node.opacity ?? 1) * paint.opacity;

    if (paint.type === 'IMAGE' && paint.imageSrc) {
      const img = imageCache?.get(paint.imageSrc);
      if (img) {
        drawImageOnNode(ctx, img, node, paint.imageScaleMode ?? 'FILL');
      } else {
        drawImagePlaceholder(ctx, node);
      }
    } else if (paint.type === 'SOLID' && paint.color) {
      ctx.fillStyle = rgbaToString(paint.color);
      drawShape(ctx);
    } else if (paint.type === 'GRADIENT_LINEAR' && paint.gradientStops) {
      const w = node.size.x;
      const h = node.size.y;

      // Convert gradient transform to coordinates
      let x0 = 0, y0 = h / 2, x1 = w, y1 = h / 2;
      if (paint.gradientTransform) {
        const [[a, c, tx], [b, d, ty]] = paint.gradientTransform;
        // Map UV (0,0)→(1,1) through transform to get gradient endpoints
        x0 = (a * 0 + c * 0.5 + tx) * w;
        y0 = (b * 0 + d * 0.5 + ty) * h;
        x1 = (a * 1 + c * 0.5 + tx) * w;
        y1 = (b * 1 + d * 0.5 + ty) * h;
      }

      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      for (const stop of paint.gradientStops) {
        gradient.addColorStop(stop.position, rgbaToString(stop.color));
      }
      ctx.fillStyle = gradient;
      drawShape(ctx);
    } else if (paint.type === 'GRADIENT_RADIAL' && paint.gradientStops) {
      const w = node.size.x;
      const h = node.size.y;

      // Compute center and radius in pixel coordinates
      const cx = (paint.center?.x ?? 0.5) * w;
      const cy = (paint.center?.y ?? 0.5) * h;
      const r = (paint.radius ?? 0.5) * Math.max(w, h);

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      for (const stop of paint.gradientStops) {
        gradient.addColorStop(stop.position, rgbaToString(stop.color));
      }
      ctx.fillStyle = gradient;
      drawShape(ctx);
    }
  }
}

function drawImageOnNode(
  ctx: SKRSContext2D,
  img: Image,
  node: FigmaNodeDict,
  scaleMode: string,
): void {
  const w = node.size.x;
  const h = node.size.y;
  const mode = (scaleMode as 'FILL' | 'FIT' | 'CROP' | 'TILE') || 'FILL';
  const instruction = computeDrawInstruction(mode, img.width, img.height, w, h);

  if (instruction.type === 'tile') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pattern = ctx.createPattern(img as any, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, w, h);
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx.drawImage(
      img as any,
      instruction.sx, instruction.sy, instruction.sw, instruction.sh,
      instruction.dx, instruction.dy, instruction.dw, instruction.dh,
    );
  }
}

function drawImagePlaceholder(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  const h = node.size.y;

  // Draw a light gray background
  ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.fillRect(0, 0, w, h);

  // Draw crosshatch diagonal lines
  ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
  ctx.lineWidth = 1;
  const spacing = 10;
  ctx.beginPath();
  for (let i = -h; i < w; i += spacing) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
  }
  ctx.stroke();
}

/**
 * Resolve corner radius from either uniform `cornerRadius` or per-corner `cornerRadii`.
 * Returns a single number (uniform) or an array [topLeft, topRight, bottomRight, bottomLeft]
 * suitable for canvas.roundRect().
 */
function resolveCornerRadius(
  node: FigmaNodeDict,
): number | [number, number, number, number] | undefined {
  if (node.cornerRadii) {
    const { topLeft, topRight, bottomRight, bottomLeft } = node.cornerRadii;
    // If all corners are the same, use uniform radius
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return topLeft > 0 ? topLeft : undefined;
    }
    return [topLeft, topRight, bottomRight, bottomLeft];
  }
  if (node.cornerRadius && node.cornerRadius > 0) {
    return node.cornerRadius;
  }
  return undefined;
}

function hasCornerRadius(radius: number | [number, number, number, number] | undefined): boolean {
  if (radius === undefined) return false;
  if (typeof radius === 'number') return radius > 0;
  return radius.some(r => r > 0);
}

function drawRoundedRect(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number | [number, number, number, number],
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
}

function renderNode(ctx: SKRSContext2D, node: FigmaNodeDict, path: string, imageCache?: ImageCache): void {
  if (!node.visible) return;

  ctx.save();

  // Apply transform
  const [[a, c, tx], [b, d, ty]] = node.transform;
  ctx.setTransform(a, b, c, d, tx, ty);

  const w = node.size.x;
  const h = node.size.y;
  const radius = resolveCornerRadius(node);

  // Clip content
  if (node.clipContent) {
    ctx.beginPath();
    if (hasCornerRadius(radius)) {
      ctx.roundRect(0, 0, w, h, radius!);
    } else {
      ctx.rect(0, 0, w, h);
    }
    ctx.clip();
  }

  const drawShape = (context: SKRSContext2D) => {
    if (hasCornerRadius(radius)) {
      drawRoundedRect(context, 0, 0, w, h, radius!);
    } else if (node.type === 'ELLIPSE') {
      context.beginPath();
      context.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      context.fill();
    } else {
      context.fillRect(0, 0, w, h);
    }
  };

  // Render based on node type
  switch (node.type) {
    case 'FRAME':
    case 'COMPONENT':
    case 'COMPONENT_SET':
    case 'INSTANCE':
    case 'RECTANGLE':
    case 'ROUNDED_RECTANGLE':
      if (node.fillPaints.length > 0) {
        applyFills(ctx, node, drawShape, imageCache);
      }
      break;

    case 'ELLIPSE':
      if (node.fillPaints.length > 0) {
        applyFills(ctx, node, drawShape, imageCache);
      }
      break;

    case 'IMAGE': {
      // Clip to node bounds (with optional cornerRadius)
      ctx.save();
      ctx.beginPath();
      if (hasCornerRadius(radius)) {
        ctx.roundRect(0, 0, w, h, radius!);
      } else {
        ctx.rect(0, 0, w, h);
      }
      ctx.clip();

      ctx.globalAlpha = node.opacity ?? 1;
      const img = node.imageSrc ? imageCache?.get(node.imageSrc) : undefined;
      if (img) {
        drawImageOnNode(ctx, img, node, node.imageScaleMode ?? 'FILL');
      } else {
        drawImagePlaceholder(ctx, node);
      }
      ctx.restore();
      break;
    }

    case 'TEXT':
      renderText(ctx, node);
      break;

    case 'GROUP':
      // Groups don't render themselves, just children
      break;
  }

  // Draw strokes (iterate all strokes, support alignment)
  if (node.strokes?.length) {
    ctx.globalAlpha = node.opacity ?? 1;

    for (const stroke of node.strokes) {
      ctx.strokeStyle = rgbaToString(stroke.color);
      const strokeWeight = stroke.weight;
      const align = stroke.align ?? 'CENTER';

      if (align === 'INSIDE') {
        // Draw inside: clip to shape, double weight (half will be outside, clipped away)
        ctx.save();
        ctx.beginPath();
        if (node.type === 'ELLIPSE') {
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        } else if (hasCornerRadius(radius)) {
          ctx.roundRect(0, 0, w, h, radius!);
        } else {
          ctx.rect(0, 0, w, h);
        }
        ctx.clip();
        ctx.lineWidth = strokeWeight * 2;
        ctx.beginPath();
        if (node.type === 'ELLIPSE') {
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        } else if (hasCornerRadius(radius)) {
          ctx.roundRect(0, 0, w, h, radius!);
        } else {
          ctx.rect(0, 0, w, h);
        }
        ctx.stroke();
        ctx.restore();
      } else if (align === 'OUTSIDE') {
        // Draw outside: clip to inverse of shape, double weight
        ctx.save();
        ctx.beginPath();
        // Draw a large rect covering the entire area, then the shape as a hole
        ctx.rect(-strokeWeight, -strokeWeight, w + strokeWeight * 2, h + strokeWeight * 2);
        if (node.type === 'ELLIPSE') {
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        } else if (hasCornerRadius(radius)) {
          ctx.roundRect(0, 0, w, h, radius!);
        } else {
          ctx.rect(0, 0, w, h);
        }
        ctx.clip('evenodd');
        ctx.lineWidth = strokeWeight * 2;
        ctx.beginPath();
        if (node.type === 'ELLIPSE') {
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        } else if (hasCornerRadius(radius)) {
          ctx.roundRect(0, 0, w, h, radius!);
        } else {
          ctx.rect(0, 0, w, h);
        }
        ctx.stroke();
        ctx.restore();
      } else {
        // CENTER (default)
        ctx.lineWidth = strokeWeight;
        if (node.type === 'ELLIPSE') {
          ctx.beginPath();
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (hasCornerRadius(radius)) {
          ctx.beginPath();
          ctx.roundRect(0, 0, w, h, radius!);
          ctx.stroke();
        } else {
          ctx.strokeRect(0, 0, w, h);
        }
      }
    }
  }

  // Reset transform for children — children have their own absolute transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Render children
  for (const child of node.children) {
    renderNode(ctx, child, `${path} > ${child.name}`, imageCache);
  }

  ctx.restore();
}

function drawWrappedLine(
  ctx: SKRSContext2D, text: string, y: number, w: number, align: string,
): void {
  let xOffset = 0;
  if (align === 'CENTER') {
    xOffset = (w - ctx.measureText(text).width) / 2;
  } else if (align === 'RIGHT') {
    xOffset = w - ctx.measureText(text).width;
  }
  ctx.fillText(text, xOffset, y);
}

function drawTextDecoration(
  ctx: SKRSContext2D,
  decoration: string | undefined,
  x: number,
  y: number,
  width: number,
  fontSize: number,
): void {
  if (!decoration || decoration === 'NONE') return;

  ctx.beginPath();
  if (decoration === 'UNDERLINE') {
    // Draw line below the text baseline
    const lineY = y + fontSize + 2;
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
  } else if (decoration === 'STRIKETHROUGH') {
    // Draw line through the vertical center of text
    const lineY = y + fontSize * 0.55;
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = ctx.fillStyle as string;
  ctx.stroke();
}

function renderText(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  if (!node.textData || !node.derivedTextData) return;

  const fontSize = node.fontSize ?? 14;
  const requestedFamily = node.fontFamily ?? 'Inter';
  const fontWeight = node.derivedTextData.fontMetaData[0]?.fontWeight ?? 400;
  const fontFamily = chooseFontFamily(node.textData.characters, requestedFamily);

  ctx.font = `${fontWeightToCss(fontWeight)} ${fontSize}px "${fontFamily}"`;
  ctx.textBaseline = 'top';

  // Apply text color from first fill
  if (node.fillPaints.length > 0 && node.fillPaints[0]!.color) {
    ctx.fillStyle = rgbaToString(node.fillPaints[0]!.color);
  } else {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  }

  ctx.globalAlpha = node.opacity ?? 1;

  const { lines } = node.textData;
  const baselines = node.derivedTextData.baselines;
  const align = node.textAlignHorizontal ?? 'LEFT';
  const w = node.size.x;

  const decoration = node.textDecoration;

  // Word-wrap when textAutoResize is HEIGHT (fixed width, auto height)
  if (node.textAutoResize === 'HEIGHT') {
    const lineHeight = baselines[0]?.lineHeight ?? fontSize * 1.2;
    let drawLineIndex = 0;

    for (const paragraph of lines) {
      if (paragraph === '') {
        drawLineIndex++;
        continue;
      }
      const words = paragraph.split(/\s+/);
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > w && currentLine) {
          drawWrappedLine(ctx, currentLine, drawLineIndex * lineHeight, w, align);
          const lineMetrics = ctx.measureText(currentLine);
          let lxOffset = 0;
          if (align === 'CENTER') lxOffset = (w - lineMetrics.width) / 2;
          else if (align === 'RIGHT') lxOffset = w - lineMetrics.width;
          drawTextDecoration(ctx, decoration, lxOffset, drawLineIndex * lineHeight, lineMetrics.width, fontSize);
          drawLineIndex++;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        drawWrappedLine(ctx, currentLine, drawLineIndex * lineHeight, w, align);
        const lineMetrics = ctx.measureText(currentLine);
        let lxOffset = 0;
        if (align === 'CENTER') lxOffset = (w - lineMetrics.width) / 2;
        else if (align === 'RIGHT') lxOffset = w - lineMetrics.width;
        drawTextDecoration(ctx, decoration, lxOffset, drawLineIndex * lineHeight, lineMetrics.width, fontSize);
        drawLineIndex++;
      }
    }
  } else {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const baseline = baselines[i];
      if (!baseline) continue;

      let xOffset = 0;
      const measured = ctx.measureText(line);
      if (align === 'CENTER') {
        xOffset = (w - measured.width) / 2;
      } else if (align === 'RIGHT') {
        xOffset = w - measured.width;
      }

      ctx.fillText(line, xOffset, baseline.lineY);
      drawTextDecoration(ctx, decoration, xOffset, baseline.lineY, measured.width, fontSize);
    }
  }
}

function renderDebugOverlay(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  if (!node.visible) return;

  ctx.save();
  const [[a, c, tx], [b, d, ty]] = node.transform;
  ctx.setTransform(a, b, c, d, tx, ty);

  const w = node.size.x;
  const h = node.size.y;

  // Draw frame boundaries with dashed red line
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, w, h);
    ctx.setLineDash([]);

    // Draw padding areas
    const pT = node.paddingTop ?? 0;
    const pR = node.paddingRight ?? 0;
    const pB = node.paddingBottom ?? 0;
    const pL = node.paddingLeft ?? 0;

    if (pT > 0 || pB > 0 || pL > 0 || pR > 0) {
      // Top padding (blue)
      if (pT > 0) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.fillRect(0, 0, w, pT);
      }
      // Bottom padding (blue)
      if (pB > 0) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.fillRect(0, h - pB, w, pB);
      }
      // Left padding (green)
      if (pL > 0) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.fillRect(0, pT, pL, h - pT - pB);
      }
      // Right padding (green)
      if (pR > 0) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.fillRect(w - pR, pT, pR, h - pT - pB);
      }
    }

    // Label with name and size
    ctx.font = '10px Inter';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.textBaseline = 'top';
    ctx.fillText(`${node.name} (${Math.round(w)}×${Math.round(h)})`, 2, 2);
  }

  // Reset and recurse
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (const child of node.children) {
    renderDebugOverlay(ctx, child);
  }
  ctx.restore();
}

export function render(
  node: FigmaNodeDict,
  options?: Partial<RenderOptions>,
): RenderResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const width = Math.ceil(node.size.x * opts.scale);
  const height = Math.ceil(node.size.y * opts.scale);

  if (width <= 0 || height <= 0) {
    throw new RenderError(
      `Invalid canvas dimensions: ${width}x${height}`,
      node.name,
      node.type,
    );
  }

  const canvas = acquireCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Apply scale
  if (opts.scale !== 1) {
    ctx.scale(opts.scale, opts.scale);
  }

  // Draw background
  const bg = opts.backgroundColor;
  ctx.fillStyle = rgbaToString(bg, bg.a);
  ctx.fillRect(0, 0, node.size.x, node.size.y);

  // Render the tree
  renderNode(ctx, node, node.name, opts.imageCache);

  // Debug layout overlay
  if (opts.debugLayout) {
    renderDebugOverlay(ctx, node);
  }

  const pngBuffer = canvas.toBuffer('image/png');
  releaseCanvas(canvas, width, height);
  return { pngBuffer, width, height };
}

export function renderToFile(
  node: FigmaNodeDict,
  outputPath: string,
  options?: Partial<RenderOptions>,
): RenderResult {
  const result = render(node, options);
  writeFileSync(outputPath, result.pngBuffer);
  return result;
}
