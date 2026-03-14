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

function drawRoundedRect(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
}

function renderNode(ctx: SKRSContext2D, node: FigmaNodeDict, path: string): void {
  if (!node.visible) return;

  ctx.save();

  // Apply transform
  const [[a, c, tx], [b, d, ty]] = node.transform;
  ctx.setTransform(a, b, c, d, tx, ty);

  const w = node.size.x;
  const h = node.size.y;

  // Clip content
  if (node.clipContent) {
    ctx.beginPath();
    if (node.cornerRadius && node.cornerRadius > 0) {
      ctx.roundRect(0, 0, w, h, node.cornerRadius);
    } else {
      ctx.rect(0, 0, w, h);
    }
    ctx.clip();
  }

  const drawShape = (context: SKRSContext2D) => {
    if (node.cornerRadius && node.cornerRadius > 0) {
      drawRoundedRect(context, 0, 0, w, h, node.cornerRadius);
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
    } else if (node.cornerRadius && node.cornerRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(0, 0, w, h, node.cornerRadius);
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
