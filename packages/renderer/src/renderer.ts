import { createCanvas, GlobalFonts, type SKRSContext2D } from '@napi-rs/canvas';
import { join } from 'path';
import { readdirSync, writeFileSync } from 'fs';
import type { FigmaNodeDict } from '@figma-dsl/compiler';

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

let fontsRegistered = false;

export function initializeRenderer(fontDir: string): void {
  if (fontsRegistered) return;
  const files = readdirSync(fontDir);
  for (const file of files) {
    if (file.endsWith('.otf') || file.endsWith('.ttf')) {
      GlobalFonts.registerFromPath(join(fontDir, file), 'Inter');
    }
  }
  fontsRegistered = true;
}

function rgbaToString(color: { r: number; g: number; b: number; a: number }, alpha = 1): string {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${alpha})`;
}

function fontWeightToCss(weight: number): string {
  return String(weight);
}

function applyFills(
  ctx: SKRSContext2D,
  node: FigmaNodeDict,
  drawShape: (ctx: SKRSContext2D) => void,
): void {
  for (const paint of node.fillPaints) {
    if (!paint.visible) continue;

    ctx.globalAlpha = (node.opacity ?? 1) * paint.opacity;

    if (paint.type === 'SOLID' && paint.color) {
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
    }
  }
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

export function calculatePolygonVertices(
  pointCount: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
): Array<{ x: number; y: number }> {
  const vertices: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < pointCount; i++) {
    const angle = (2 * Math.PI * i) / pointCount - Math.PI / 2;
    vertices.push({
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    });
  }
  return vertices;
}

export function calculateStarVertices(
  pointCount: number,
  innerRadius: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
): Array<{ x: number; y: number }> {
  const vertices: Array<{ x: number; y: number }> = [];
  const totalPoints = pointCount * 2;
  for (let i = 0; i < totalPoints; i++) {
    const angle = (2 * Math.PI * i) / totalPoints - Math.PI / 2;
    const isOuter = i % 2 === 0;
    const radiusX = isOuter ? rx : rx * innerRadius;
    const radiusY = isOuter ? ry : ry * innerRadius;
    vertices.push({
      x: cx + radiusX * Math.cos(angle),
      y: cy + radiusY * Math.sin(angle),
    });
  }
  return vertices;
}

function drawPolygonPath(ctx: SKRSContext2D, vertices: Array<{ x: number; y: number }>): void {
  if (vertices.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(vertices[0]!.x, vertices[0]!.y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i]!.x, vertices[i]!.y);
  }
  ctx.closePath();
}

function renderLine(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  ctx.save();

  if (node.rotation) {
    ctx.rotate((node.rotation * Math.PI) / 180);
  }

  if (node.strokes?.length) {
    const stroke = node.strokes[0]!;
    ctx.strokeStyle = rgbaToString(stroke.color);
    ctx.lineWidth = node.strokeWeight ?? stroke.weight;
    ctx.globalAlpha = node.opacity ?? 1;
    if (node.strokeCap && node.strokeCap !== 'NONE') {
      // Map DSL stroke cap to canvas lineCap
      const capMap: Record<string, CanvasLineCap> = {
        'ROUND': 'round',
        'SQUARE': 'square',
      };
      ctx.lineCap = capMap[node.strokeCap] ?? 'butt';
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
  }

  ctx.restore();
}

function renderSection(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  const h = node.size.y;

  // Draw section fills
  if (node.fillPaints.length > 0) {
    applyFills(ctx, node, (context) => {
      context.fillRect(0, 0, w, h);
    });
  }

  // Draw section name label above content
  ctx.save();
  ctx.font = '11px Inter';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.textBaseline = 'bottom';
  ctx.fillText(node.name, 4, -2);
  ctx.restore();
}

function renderPolygon(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  const h = node.size.y;
  const pointCount = node.pointCount ?? 3;
  const cx = w / 2;
  const cy = h / 2;

  ctx.save();
  if (node.rotation) {
    ctx.translate(cx, cy);
    ctx.rotate((node.rotation * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  const vertices = calculatePolygonVertices(pointCount, cx, cy, w / 2, h / 2);

  // Fill
  if (node.fillPaints.length > 0) {
    for (const paint of node.fillPaints) {
      if (!paint.visible) continue;
      ctx.globalAlpha = (node.opacity ?? 1) * paint.opacity;
      if (paint.type === 'SOLID' && paint.color) {
        ctx.fillStyle = rgbaToString(paint.color);
      }
      drawPolygonPath(ctx, vertices);
      ctx.fill();
    }
  }

  // Stroke
  if (node.strokes?.length) {
    const stroke = node.strokes[0]!;
    ctx.strokeStyle = rgbaToString(stroke.color);
    ctx.lineWidth = node.strokeWeight ?? stroke.weight;
    ctx.globalAlpha = node.opacity ?? 1;
    drawPolygonPath(ctx, vertices);
    ctx.stroke();
  }

  ctx.restore();
}

function renderStar(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  const h = node.size.y;
  const pointCount = node.pointCount ?? 5;
  const innerRadius = node.innerRadius ?? 0.382;
  const cx = w / 2;
  const cy = h / 2;

  ctx.save();
  if (node.rotation) {
    ctx.translate(cx, cy);
    ctx.rotate((node.rotation * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  const vertices = calculateStarVertices(pointCount, innerRadius, cx, cy, w / 2, h / 2);

  // Fill
  if (node.fillPaints.length > 0) {
    for (const paint of node.fillPaints) {
      if (!paint.visible) continue;
      ctx.globalAlpha = (node.opacity ?? 1) * paint.opacity;
      if (paint.type === 'SOLID' && paint.color) {
        ctx.fillStyle = rgbaToString(paint.color);
      }
      drawPolygonPath(ctx, vertices);
      ctx.fill();
    }
  }

  // Stroke
  if (node.strokes?.length) {
    const stroke = node.strokes[0]!;
    ctx.strokeStyle = rgbaToString(stroke.color);
    ctx.lineWidth = node.strokeWeight ?? stroke.weight;
    ctx.globalAlpha = node.opacity ?? 1;
    drawPolygonPath(ctx, vertices);
    ctx.stroke();
  }

  ctx.restore();
}

function renderBooleanOperation(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  const w = node.size.x;
  const h = node.size.y;

  if (w <= 0 || h <= 0 || node.children.length === 0) return;

  // Create offscreen canvas for compositing
  const offscreen = createCanvas(Math.ceil(w), Math.ceil(h));
  const offCtx = offscreen.getContext('2d');

  // Map boolean operation to composite operation
  const compositeMap: Record<string, GlobalCompositeOperation> = {
    'UNION': 'source-over',
    'SUBTRACT': 'destination-out',
    'INTERSECT': 'destination-in',
    'EXCLUDE': 'xor',
  };

  const operation = node.booleanOperation ?? 'UNION';

  // Render first child normally
  if (node.children.length > 0) {
    renderNode(offCtx as unknown as SKRSContext2D, node.children[0]!, '');
  }

  // Render subsequent children with composite operation
  for (let i = 1; i < node.children.length; i++) {
    offCtx.globalCompositeOperation = compositeMap[operation] ?? 'source-over';
    renderNode(offCtx as unknown as SKRSContext2D, node.children[i]!, '');
  }

  // Composite result onto main canvas
  ctx.globalAlpha = node.opacity ?? 1;
  ctx.drawImage(offscreen, 0, 0);
}

function renderNode(ctx: SKRSContext2D, node: FigmaNodeDict, path: string): void {
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
        applyFills(ctx, node, drawShape);
      }
      break;

    case 'ELLIPSE':
      if (node.fillPaints.length > 0) {
        applyFills(ctx, node, drawShape);
      }
      break;

    case 'TEXT':
      renderText(ctx, node);
      break;

    case 'GROUP':
      // Groups don't render themselves, just children
      break;

    case 'LINE':
      renderLine(ctx, node);
      break;

    case 'SECTION':
      renderSection(ctx, node);
      break;

    case 'POLYGON':
      renderPolygon(ctx, node);
      break;

    case 'STAR':
      renderStar(ctx, node);
      break;

    case 'BOOLEAN_OPERATION':
      renderBooleanOperation(ctx, node);
      break;

    default:
      // Unknown type — skip gracefully
      break;
  }

  // Draw strokes
  if (node.strokes?.length) {
    const stroke = node.strokes[0]!;
    ctx.strokeStyle = rgbaToString(stroke.color);
    ctx.lineWidth = node.strokeWeight ?? stroke.weight;
    ctx.globalAlpha = node.opacity ?? 1;

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

  // Reset transform for children — children have their own absolute transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Render children
  for (const child of node.children) {
    renderNode(ctx, child, `${path} > ${child.name}`);
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

function renderText(ctx: SKRSContext2D, node: FigmaNodeDict): void {
  if (!node.textData || !node.derivedTextData) return;

  const fontSize = node.fontSize ?? 14;
  const fontFamily = node.fontFamily ?? 'Inter';
  const fontWeight = node.derivedTextData.fontMetaData[0]?.fontWeight ?? 400;

  ctx.font = `${fontWeightToCss(fontWeight)} ${fontSize}px ${fontFamily}`;
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
          drawLineIndex++;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        drawWrappedLine(ctx, currentLine, drawLineIndex * lineHeight, w, align);
        drawLineIndex++;
      }
    }
  } else {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const baseline = baselines[i];
      if (!baseline) continue;

      let xOffset = 0;
      if (align === 'CENTER') {
        const measured = ctx.measureText(line);
        xOffset = (w - measured.width) / 2;
      } else if (align === 'RIGHT') {
        const measured = ctx.measureText(line);
        xOffset = w - measured.width;
      }

      ctx.fillText(line, xOffset, baseline.lineY);
    }
  }
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

  const canvas = createCanvas(width, height);
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
  renderNode(ctx, node, node.name);

  const pngBuffer = canvas.toBuffer('image/png');
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
