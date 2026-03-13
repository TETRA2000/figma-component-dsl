import type { RgbaColor, SolidFill, GradientFill, GradientStop, StrokePaint } from './types.js';

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export function hex(value: string): RgbaColor {
  if (!HEX_REGEX.test(value)) {
    throw new Error(`Invalid hex color: "${value}". Expected format: #RRGGBB`);
  }
  return Object.freeze({
    r: parseInt(value.slice(1, 3), 16) / 255,
    g: parseInt(value.slice(3, 5), 16) / 255,
    b: parseInt(value.slice(5, 7), 16) / 255,
    a: 1,
  });
}

export function solid(hexValue: string, opacity?: number): SolidFill {
  return Object.freeze({
    type: 'SOLID' as const,
    color: hex(hexValue),
    opacity: opacity ?? 1,
    visible: true,
  });
}

export function gradient(
  stops: readonly { readonly hex: string; readonly position: number }[],
  angle?: number,
): GradientFill {
  const rad = ((angle ?? 0) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const gradientStops: GradientStop[] = stops.map((s) =>
    Object.freeze({ color: hex(s.hex), position: s.position }),
  );

  return Object.freeze({
    type: 'GRADIENT_LINEAR' as const,
    gradientStops: Object.freeze(gradientStops),
    gradientTransform: Object.freeze([
      Object.freeze([cos, sin, 0.5 * (1 - cos - sin)] as const),
      Object.freeze([-sin, cos, 0.5 * (1 + sin - cos)] as const),
    ] as const),
    opacity: 1,
    visible: true,
  });
}

export function stroke(
  hexValue: string,
  weight: number,
  align?: 'INSIDE' | 'CENTER' | 'OUTSIDE',
): StrokePaint {
  return Object.freeze({
    color: hex(hexValue),
    weight,
    align,
  });
}

// --- Color Tokens ---
export type ColorTokenMap = Readonly<Record<string, string>>;

export function defineTokens(tokens: Record<string, string>): ColorTokenMap {
  // Validate all hex values
  for (const [name, value] of Object.entries(tokens)) {
    if (!HEX_REGEX.test(value)) {
      throw new Error(`Invalid hex color for token "${name}": "${value}"`);
    }
  }
  return Object.freeze({ ...tokens });
}

export function token(map: ColorTokenMap, name: string): SolidFill {
  const value = map[name];
  if (!value) {
    throw new Error(`Unresolved color token: "${name}"`);
  }
  return solid(value);
}
