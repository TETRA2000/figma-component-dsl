import { createCanvas, GlobalFonts, type SKRSContext2D } from '@napi-rs/canvas';
import type { FigmaNodeDict } from '@figma-dsl/compiler';
import type { DslSolidPaint, DslGradientPaint, DslPaint } from '@figma-dsl/core';
import fs from 'node:fs';
import path from 'node:path';

interface RenderOptions {
  backgroundColor: { r: number; g: number; b: number; a: number };
  scale: number;
  assetDir?: string;
}

interface RenderResult {
  pngPath: string;
  width: number;
  height: number;
}

const DEFAULT_OPTIONS: RenderOptions = {
  backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
  scale: 1,
};

export class Renderer {
  private fontsRegistered = false;

  constructor(private fontDir: string) {}

  private registerFonts(): void {
    if (this.fontsRegistered) return;
    const fontFile = path.join(this.fontDir, 'InterVariable.ttf');
    if (fs.existsSync(fontFile)) {
      GlobalFonts.registerFromPath(fontFile, 'Inter');
    }
    this.fontsRegistered = true;
  }

  async render(
    root: FigmaNodeDict,
    outputPath: string,
    options?: Partial<RenderOptions>,
  ): Promise<RenderResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const width = Math.ceil(root.size.x * opts.scale);
    const height = Math.ceil(root.size.y * opts.scale);

    this.registerFonts();

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    const bg = opts.backgroundColor;
    ctx.fillStyle = `rgba(${bg.r * 255}, ${bg.g * 255}, ${bg.b * 255}, ${bg.a})`;
    ctx.fillRect(0, 0, width, height);

    // Scale
    if (opts.scale !== 1) {
      ctx.scale(opts.scale, opts.scale);
    }

    this.renderNode(ctx, root);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    return { pngPath: outputPath, width, height };
  }

  async renderToBuffer(
    root: FigmaNodeDict,
    options?: Partial<RenderOptions>,
  ): Promise<Buffer> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const width = Math.ceil(root.size.x * opts.scale);
    const height = Math.ceil(root.size.y * opts.scale);

    this.registerFonts();

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const bg = opts.backgroundColor;
    ctx.fillStyle = `rgba(${bg.r * 255}, ${bg.g * 255}, ${bg.b * 255}, ${bg.a})`;
    ctx.fillRect(0, 0, width, height);

    if (opts.scale !== 1) {
      ctx.scale(opts.scale, opts.scale);
    }

    this.renderNode(ctx, root);

    return canvas.toBuffer('image/png');
  }

  private renderNode(ctx: SKRSContext2D, node: FigmaNodeDict): void {
    if (!node.visible) return;

    ctx.save();

    // Apply transform
    const t = node.transform;
    ctx.transform(t[0]![0]!, t[1]![0]!, t[0]![1]!, t[1]![1]!, t[0]![2]!, t[1]![2]!);

    // Apply opacity
    if (node.opacity < 1) {
      ctx.globalAlpha *= node.opacity;
    }

    const w = node.size.x;
    const h = node.size.y;

    if (node.type === 'TEXT') {
      this.renderText(ctx, node);
    } else if (node.type === 'ELLIPSE') {
      this.renderEllipse(ctx, node, w, h);
    } else {
      // FRAME, RECTANGLE, COMPONENT, COMPONENT_SET, INSTANCE, GROUP
      this.renderRect(ctx, node, w, h);
    }

    // Clip content
    if (node.clipContent) {
      ctx.beginPath();
      if (node.cornerRadius) {
        ctx.roundRect(0, 0, w, h, node.cornerRadius);
      } else {
        ctx.rect(0, 0, w, h);
      }
      ctx.clip();
    }

    // Render children
    for (const child of node.children) {
      this.renderNode(ctx, child);
    }

    ctx.restore();
  }

  private renderRect(
    ctx: SKRSContext2D,
    node: FigmaNodeDict,
    w: number,
    h: number,
  ): void {
    for (const paint of node.fillPaints) {
      this.applyFill(ctx, paint, w, h);
      ctx.beginPath();
      if (node.cornerRadius) {
        ctx.roundRect(0, 0, w, h, node.cornerRadius);
      } else {
        ctx.rect(0, 0, w, h);
      }
      ctx.fill();
    }

    // Strokes
    if (node.strokes && node.strokeWeight) {
      for (const stroke of node.strokes) {
        this.applyFill(ctx, stroke, w, h);
        ctx.lineWidth = node.strokeWeight;
        ctx.beginPath();
        if (node.cornerRadius) {
          ctx.roundRect(0, 0, w, h, node.cornerRadius);
        } else {
          ctx.rect(0, 0, w, h);
        }
        ctx.stroke();
      }
    }
  }

  private renderEllipse(
    ctx: SKRSContext2D,
    node: FigmaNodeDict,
    w: number,
    h: number,
  ): void {
    const cx = w / 2;
    const cy = h / 2;

    for (const paint of node.fillPaints) {
      this.applyFill(ctx, paint, w, h);
      ctx.beginPath();
      ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private renderText(ctx: SKRSContext2D, node: FigmaNodeDict): void {
    if (!node.textData || !node.fontSize) return;

    const fontWeight = node.fontWeight ?? 400;
    const fontFamily = node.fontFamily ?? 'Inter';
    ctx.font = `${fontWeight} ${node.fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';

    // Text color from first fill
    if (node.fillPaints.length > 0) {
      this.applyFill(ctx, node.fillPaints[0]!, node.size.x, node.size.y);
    } else {
      ctx.fillStyle = '#000000';
    }

    const lineHeightPx = this.resolveLineHeight(node);
    const align = node.textAlignHorizontal ?? 'LEFT';

    for (let i = 0; i < node.textData.lines.length; i++) {
      const line = node.textData.lines[i]!;
      const y = i * lineHeightPx;
      let x = 0;

      if (align === 'CENTER') {
        const measured = ctx.measureText(line);
        x = (node.size.x - measured.width) / 2;
      } else if (align === 'RIGHT') {
        const measured = ctx.measureText(line);
        x = node.size.x - measured.width;
      }

      ctx.fillText(line, x, y);
    }
  }

  private applyFill(
    ctx: SKRSContext2D,
    paint: DslPaint,
    w: number,
    h: number,
  ): void {
    if (paint.type === 'SOLID') {
      const { r, g, b } = (paint as DslSolidPaint).color;
      const opacity = (paint as DslSolidPaint).opacity ?? 1;
      ctx.fillStyle = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${opacity})`;
    } else if (paint.type === 'GRADIENT_LINEAR') {
      const grad = paint as DslGradientPaint;
      const t = grad.gradientTransform;
      // Convert Figma gradient transform to Canvas gradient points
      const x0 = t[0]![2]! * w;
      const y0 = t[1]![2]! * h;
      const x1 = (t[0]![0]! + t[0]![2]!) * w;
      const y1 = (t[1]![0]! + t[1]![2]!) * h;

      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      for (const stop of grad.gradientStops) {
        const { r, g, b, a } = stop.color;
        gradient.addColorStop(stop.position, `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`);
      }
      ctx.fillStyle = gradient;
    }
  }

  private resolveLineHeight(node: FigmaNodeDict): number {
    if (node.lineHeight && 'value' in node.lineHeight) {
      if (node.lineHeight.unit === 'PIXELS') return node.lineHeight.value;
      if (node.lineHeight.unit === 'PERCENT') return (node.lineHeight.value / 100) * (node.fontSize ?? 16);
    }
    return (node.fontSize ?? 16) * 1.2;
  }
}
