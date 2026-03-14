import type { RgbaColor, SolidFill, GradientFill, GradientStop, ColorTokenMap } from './types.js';

const HEX_PATTERN = /^#?([0-9a-fA-F]{6})$/;

export function hex(value: string): RgbaColor {
  const match = HEX_PATTERN.exec(value);
  if (!match?.[1]) {
    throw new Error(`Invalid hex color: "${value}". Expected 6-digit hex (e.g., "#ff0000").`);
  }
  const hexStr = match[1];
  return {
    r: parseInt(hexStr.substring(0, 2), 16) / 255,
    g: parseInt(hexStr.substring(2, 4), 16) / 255,
    b: parseInt(hexStr.substring(4, 6), 16) / 255,
    a: 1,
  };
}

export function solid(hexValue: string, opacity = 1): SolidFill {
  return {
    type: 'SOLID',
    color: hex(hexValue),
    opacity,
    visible: true,
  };
}

function angleToGradientTransform(angleDeg: number): [[number, number, number], [number, number, number]] {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  // Figma gradient transform maps (0,0)→(1,1) UV space
  // Rotation around center (0.5, 0.5)
  return [
    [cos, sin, (1 - cos - sin) / 2],
    [-sin, cos, (1 + sin - cos) / 2],
  ];
}

export function gradient(
  stops: { hex: string; position: number }[],
  angle = 0
): GradientFill {
  const gradientStops: GradientStop[] = stops.map(s => ({
    color: hex(s.hex),
    position: s.position,
  }));
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops,
    gradientTransform: angleToGradientTransform(angle),
    opacity: 1,
    visible: true,
  };
}

export function defineTokens(tokens: Record<string, string>): ColorTokenMap {
  const resolved: Record<string, RgbaColor> = {};
  for (const [name, value] of Object.entries(tokens)) {
    resolved[name] = hex(value);
  }
  return { _tokens: resolved };
}

export function token(map: ColorTokenMap, name: string): SolidFill {
  const color = map._tokens[name];
  if (!color) {
    throw new Error(`Undefined color token: "${name}". Available tokens: ${Object.keys(map._tokens).join(', ')}`);
  }
  return {
    type: 'SOLID',
    color,
    opacity: 1,
    visible: true,
  };
}
