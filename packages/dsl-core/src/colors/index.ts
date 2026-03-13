import type {
  GradientFill,
  GradientStop,
  RgbaColor,
  SolidFill,
  StrokePaint,
} from "../nodes/types.js";

// --- Color Token Map ---
export type ColorTokenMap = Readonly<Record<string, RgbaColor>>;

// --- Hex parsing ---

function parseHex(value: string): RgbaColor {
  const cleaned = value.startsWith("#") ? value.slice(1) : value;
  if (cleaned.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    throw new Error(
      `Invalid hex color: "${value}". Expected 6-digit hex (e.g., "#7c3aed")`,
    );
  }
  return {
    r: parseInt(cleaned.slice(0, 2), 16) / 255,
    g: parseInt(cleaned.slice(2, 4), 16) / 255,
    b: parseInt(cleaned.slice(4, 6), 16) / 255,
    a: 1,
  };
}

/**
 * Convert a 6-digit hex string to RgbaColor in 0.0–1.0 float range.
 */
export function hex(value: string): RgbaColor {
  return parseHex(value);
}

/**
 * Create a SolidFill from a hex color string with optional opacity.
 */
export function solid(hexValue: string, opacity = 1): SolidFill {
  return {
    type: "SOLID",
    color: parseHex(hexValue),
    opacity,
    visible: true,
  };
}

/**
 * Create a GradientFill from color stops and angle.
 * The angle is in degrees (0 = left-to-right, 90 = top-to-bottom).
 */
export function gradient(
  stops: readonly { readonly hex: string; readonly position: number }[],
  angle = 0,
): GradientFill {
  if (stops.length < 2) {
    throw new Error("Gradient requires at least 2 color stops");
  }

  const gradientStops: GradientStop[] = stops.map((stop) => ({
    color: parseHex(stop.hex),
    position: stop.position,
  }));

  // Convert angle to Figma gradient transform matrix
  // Figma uses a 2x3 affine transform matrix for gradients
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const gradientTransform: readonly [
    readonly [number, number, number],
    readonly [number, number, number],
  ] = [
    [cos, sin, (1 - cos - sin) / 2],
    [-sin, cos, (1 + sin - cos) / 2],
  ];

  return {
    type: "GRADIENT_LINEAR",
    gradientStops,
    gradientTransform,
    opacity: 1,
    visible: true,
  };
}

/**
 * Create a StrokePaint definition.
 */
export function stroke(
  hexValue: string,
  weight: number,
  align?: "INSIDE" | "CENTER" | "OUTSIDE",
): StrokePaint {
  return {
    color: parseHex(hexValue),
    weight,
    ...(align !== undefined && { align }),
  };
}

/**
 * Define a set of named color tokens from hex strings.
 */
export function defineTokens(
  tokens: Readonly<Record<string, string>>,
): ColorTokenMap {
  const result: Record<string, RgbaColor> = {};
  for (const [name, value] of Object.entries(tokens)) {
    result[name] = parseHex(value);
  }
  return result;
}

/**
 * Resolve a named color token to a SolidFill.
 */
export function token(map: ColorTokenMap, name: string): SolidFill {
  const color = map[name];
  if (color === undefined) {
    throw new Error(`Unknown color token: "${name}"`);
  }
  return {
    type: "SOLID",
    color,
    opacity: 1,
    visible: true,
  };
}
