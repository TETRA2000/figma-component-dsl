import { createCanvas, GlobalFonts, type SKRSContext2D } from "@napi-rs/canvas";
import type {
  CompiledNode,
  ResolvedFill,
  ResolvedStroke,
  ResolvedTextStyle,
} from "@figma-dsl/core";
import { FONTS_DIR } from "@figma-dsl/core";
import { join } from "node:path";
import { writeFileSync } from "node:fs";

export interface RenderOptions {
  readonly scale?: number;
  readonly backgroundColor?: string;
}

export interface RenderError {
  readonly message: string;
  readonly nodePath: string;
  readonly nodeType: string;
}

export interface RenderResult {
  readonly buffer: Buffer;
  readonly width: number;
  readonly height: number;
  readonly errors: readonly RenderError[];
}

let fontsRegistered = false;

function registerFonts(): void {
  if (fontsRegistered) return;
  const weights: Array<[string, string]> = [
    ["Inter-Regular.otf", "Inter"],
    ["Inter-Medium.otf", "Inter"],
    ["Inter-SemiBold.otf", "Inter"],
    ["Inter-Bold.otf", "Inter"],
  ];
  for (const [file, family] of weights) {
    GlobalFonts.registerFromPath(join(FONTS_DIR, file), family);
  }
  fontsRegistered = true;
}

/**
 * Render a CompiledNode tree to a PNG buffer.
 */
export function render(
  root: CompiledNode,
  options: RenderOptions = {},
): RenderResult {
  registerFonts();

  const scale = options.scale ?? 1;
  const errors: RenderError[] = [];

  const width = Math.ceil(root.size.x * scale);
  const height = Math.ceil(root.size.y * scale);

  if (width <= 0 || height <= 0) {
    return {
      buffer: Buffer.alloc(0),
      width: 0,
      height: 0,
      errors: [
        {
          message: `Invalid canvas dimensions: ${String(width)}x${String(height)}`,
          nodePath: root.name,
          nodeType: root.type,
        },
      ],
    };
  }

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (scale !== 1) {
    ctx.scale(scale, scale);
  }

  // Background
  if (options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, root.size.x, root.size.y);
  }

  // Render tree
  renderNode(ctx, root, root.name, errors);

  const buffer = canvas.toBuffer("image/png");
  return { buffer, width, height, errors };
}

/**
 * Render a CompiledNode tree to a PNG file.
 */
export function renderToFile(
  root: CompiledNode,
  outputPath: string,
  options: RenderOptions = {},
): RenderResult {
  const result = render(root, options);
  if (result.buffer.length > 0) {
    writeFileSync(outputPath, result.buffer);
  }
  return result;
}

function renderNode(
  ctx: SKRSContext2D,
  node: CompiledNode,
  path: string,
  errors: RenderError[],
): void {
  // Skip invisible nodes
  if (!node.visible) return;

  ctx.save();

  // Apply position
  ctx.translate(node.position.x, node.position.y);

  // Apply opacity
  if (node.opacity < 1) {
    ctx.globalAlpha *= node.opacity;
  }

  const nodeType = node.type;

  switch (nodeType) {
    case "FRAME":
    case "COMPONENT":
    case "COMPONENT_SET":
    case "INSTANCE":
    case "GROUP":
      renderFrame(ctx, node, path, errors);
      break;
    case "RECTANGLE":
      renderRectangle(ctx, node);
      break;
    case "ELLIPSE":
      renderEllipse(ctx, node);
      break;
    case "TEXT":
      renderText(ctx, node);
      break;
    default:
      errors.push({
        message: `Unsupported node type: ${nodeType}`,
        nodePath: path,
        nodeType,
      });
  }

  ctx.restore();
}

function renderFrame(
  ctx: SKRSContext2D,
  node: CompiledNode,
  path: string,
  errors: RenderError[],
): void {
  const { x: w, y: h } = node.size;

  // Apply fills
  if (node.fills.length > 0 && node.type !== "GROUP") {
    for (const fill of node.fills) {
      applyFill(ctx, fill, w, h);
      drawRect(ctx, w, h, node.cornerRadius, node.cornerRadii);
    }
  }

  // Apply strokes
  if (node.strokes) {
    for (const stroke of node.strokes) {
      applyStroke(ctx, stroke, w, h, node.cornerRadius, node.cornerRadii);
    }
  }

  // Clip content if needed
  if (node.clipContent) {
    ctx.beginPath();
    if (node.cornerRadius) {
      roundRectPath(ctx, 0, 0, w, h, node.cornerRadius);
    } else {
      ctx.rect(0, 0, w, h);
    }
    ctx.clip();
  }

  // Render children
  for (const child of node.children) {
    renderNode(ctx, child, `${path} > ${child.name}`, errors);
  }
}

function renderRectangle(ctx: SKRSContext2D, node: CompiledNode): void {
  const { x: w, y: h } = node.size;

  for (const fill of node.fills) {
    applyFill(ctx, fill, w, h);
    drawRect(ctx, w, h, node.cornerRadius, node.cornerRadii);
  }

  if (node.strokes) {
    for (const stroke of node.strokes) {
      applyStroke(ctx, stroke, w, h, node.cornerRadius, node.cornerRadii);
    }
  }
}

function renderEllipse(ctx: SKRSContext2D, node: CompiledNode): void {
  const { x: w, y: h } = node.size;
  const cx = w / 2;
  const cy = h / 2;

  for (const fill of node.fills) {
    applyFill(ctx, fill, w, h);
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (node.strokes) {
    for (const stroke of node.strokes) {
      ctx.strokeStyle = rgbaToString(stroke.color);
      ctx.lineWidth = stroke.weight;
      ctx.beginPath();
      ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function renderText(ctx: SKRSContext2D, node: CompiledNode): void {
  if (!node.characters || !node.textStyle) return;

  const style = node.textStyle;
  const { x: w } = node.size;

  // Set font
  ctx.font = `${String(style.fontWeight)} ${String(style.fontSize)}px ${style.fontFamily}`;
  ctx.fillStyle = rgbaToString(style.color);
  ctx.textBaseline = "top";

  // Text alignment
  let textAlign: "left" | "center" | "right" = "left";
  if (style.textAlignHorizontal === "CENTER") textAlign = "center";
  else if (style.textAlignHorizontal === "RIGHT") textAlign = "right";
  ctx.textAlign = textAlign;

  const lines = node.textLines ?? [node.characters];
  const lineHeight = style.lineHeight;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const y = i * lineHeight;
    let x = 0;
    if (textAlign === "center") x = w / 2;
    else if (textAlign === "right") x = w;

    ctx.fillText(line, x, y);
  }
}

function applyFill(
  ctx: SKRSContext2D,
  fill: ResolvedFill,
  w: number,
  h: number,
): void {
  if (fill.type === "SOLID" && fill.color) {
    ctx.fillStyle = rgbaToString(fill.color, fill.opacity);
  } else if (fill.type === "GRADIENT_LINEAR" && fill.gradientStops) {
    const grad = createGradient(ctx, fill, w, h);
    if (grad) ctx.fillStyle = grad;
  }
}

function createGradient(
  ctx: SKRSContext2D,
  fill: ResolvedFill,
  w: number,
  h: number,
): ReturnType<SKRSContext2D["createLinearGradient"]> | null {
  if (!fill.gradientTransform || !fill.gradientStops) return null;

  // Convert Figma gradient transform to start/end coordinates
  const t = fill.gradientTransform;
  const x0 = t[0][2] * w;
  const y0 = t[1][2] * h;
  const x1 = (t[0][0] + t[0][2]) * w;
  const y1 = (t[1][0] + t[1][2]) * h;

  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const stop of fill.gradientStops) {
    grad.addColorStop(stop.position, rgbaToString(stop.color));
  }
  return grad;
}

function applyStroke(
  ctx: SKRSContext2D,
  stroke: ResolvedStroke,
  w: number,
  h: number,
  cornerRadius: number | undefined,
  cornerRadii:
    | {
        readonly topLeft: number;
        readonly topRight: number;
        readonly bottomLeft: number;
        readonly bottomRight: number;
      }
    | undefined,
): void {
  ctx.strokeStyle = rgbaToString(stroke.color);
  ctx.lineWidth = stroke.weight;

  ctx.beginPath();
  if (cornerRadius || cornerRadii) {
    roundRectPath(ctx, 0, 0, w, h, cornerRadius, cornerRadii);
  } else {
    ctx.rect(0, 0, w, h);
  }
  ctx.stroke();
}

function drawRect(
  ctx: SKRSContext2D,
  w: number,
  h: number,
  cornerRadius: number | undefined,
  cornerRadii:
    | {
        readonly topLeft: number;
        readonly topRight: number;
        readonly bottomLeft: number;
        readonly bottomRight: number;
      }
    | undefined,
): void {
  ctx.beginPath();
  if (cornerRadius || cornerRadii) {
    roundRectPath(ctx, 0, 0, w, h, cornerRadius, cornerRadii);
  } else {
    ctx.rect(0, 0, w, h);
  }
  ctx.fill();
}

function roundRectPath(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  uniform?: number,
  perCorner?: {
    readonly topLeft: number;
    readonly topRight: number;
    readonly bottomLeft: number;
    readonly bottomRight: number;
  },
): void {
  if (perCorner) {
    ctx.roundRect(x, y, w, h, [
      perCorner.topLeft,
      perCorner.topRight,
      perCorner.bottomRight,
      perCorner.bottomLeft,
    ]);
  } else {
    ctx.roundRect(x, y, w, h, uniform ?? 0);
  }
}

function rgbaToString(
  color: { readonly r: number; readonly g: number; readonly b: number; readonly a: number },
  opacity = 1,
): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a * opacity;
  return `rgba(${String(r)},${String(g)},${String(b)},${String(a)})`;
}
