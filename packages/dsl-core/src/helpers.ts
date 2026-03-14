import type {
  DslSolidPaint,
  DslGradientPaint,
  DslFrameNode,
  AutoLayoutOptions,
  ColorTokenMap,
} from './types.js';

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

export function hexToRGB(hex: string): { r: number; g: number; b: number } {
  if (!HEX_PATTERN.test(hex)) {
    throw new Error(`Invalid hex color: "${hex}". Expected format: #RRGGBB`);
  }
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

export function solidPaint(hex: string, opacity?: number): DslSolidPaint {
  const paint: DslSolidPaint = {
    type: 'SOLID',
    color: hexToRGB(hex),
  };
  if (opacity !== undefined) {
    paint.opacity = opacity;
  }
  return paint;
}

export function gradientPaint(
  stops: Array<{ color: string; position: number }>,
  angle: number = 0,
): DslGradientPaint {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: stops.map(({ color, position }) => {
      const { r, g, b } = hexToRGB(color);
      return { color: { r, g, b, a: 1 }, position };
    }),
    gradientTransform: [
      [cos, sin, 0.5],
      [-sin, cos, 0.5],
    ],
  };
}

export function defineTokens(tokens: ColorTokenMap): ColorTokenMap {
  return { ...tokens };
}

export function tokenPaint(tokens: ColorTokenMap, name: string): DslSolidPaint {
  const hex = tokens[name];
  if (hex === undefined) {
    throw new Error(`Unknown color token: "${name}". Available tokens: ${Object.keys(tokens).join(', ')}`);
  }
  return solidPaint(hex);
}

export function setAutoLayout(node: DslFrameNode, options: AutoLayoutOptions): void {
  node.layoutMode = options.direction;
  if (options.spacing !== undefined) node.itemSpacing = options.spacing;

  // Padding: padX/padY as base, then per-side overrides
  if (options.padX !== undefined) {
    node.paddingLeft = options.padX;
    node.paddingRight = options.padX;
  }
  if (options.padY !== undefined) {
    node.paddingTop = options.padY;
    node.paddingBottom = options.padY;
  }
  if (options.padTop !== undefined) node.paddingTop = options.padTop;
  if (options.padRight !== undefined) node.paddingRight = options.padRight;
  if (options.padBottom !== undefined) node.paddingBottom = options.padBottom;
  if (options.padLeft !== undefined) node.paddingLeft = options.padLeft;

  // Alignment
  if (options.align !== undefined) node.primaryAxisAlignItems = options.align;
  if (options.counterAlign !== undefined) node.counterAxisAlignItems = options.counterAlign;

  // Sizing: unified first, then per-axis overrides
  if (options.sizing !== undefined) {
    node.layoutSizingHorizontal = options.sizing;
    node.layoutSizingVertical = options.sizing;
  }
  if (options.widthSizing !== undefined) node.layoutSizingHorizontal = options.widthSizing;
  if (options.heightSizing !== undefined) node.layoutSizingVertical = options.heightSizing;
}
