/**
 * Color parsing utilities for converting CSS color values to DSL format.
 *
 * Handles: rgb(), rgba(), hex (#xxx, #xxxxxx, #xxxxxxxx),
 * linear-gradient(), and named colors.
 */

/** Gradient stop */
export interface GradientInfo {
  stops: Array<{ hex: string; position: number }>;
  angleDeg: number;
}

/**
 * Convert a CSS color string to a hex value.
 * Supports: rgb(r,g,b), rgba(r,g,b,a), #hex, named colors.
 */
export function cssColorToHex(cssColor: string): string | null {
  if (!cssColor || cssColor === 'transparent' || cssColor === 'none') {
    return null;
  }

  const trimmed = cssColor.trim();

  // Already hex
  if (trimmed.startsWith('#')) {
    return normalizeHex(trimmed);
  }

  // rgb() or rgba()
  const rgbMatch = trimmed.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/
  );
  if (rgbMatch) {
    const r = Math.round(Number(rgbMatch[1]));
    const g = Math.round(Number(rgbMatch[2]));
    const b = Math.round(Number(rgbMatch[3]));
    return rgbToHex(r, g, b);
  }

  // Modern rgb(r g b / a) syntax
  const modernRgbMatch = trimmed.match(
    /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.%]+))?\s*\)/
  );
  if (modernRgbMatch) {
    const r = Math.round(Number(modernRgbMatch[1]));
    const g = Math.round(Number(modernRgbMatch[2]));
    const b = Math.round(Number(modernRgbMatch[3]));
    return rgbToHex(r, g, b);
  }

  // Named colors (common ones)
  const named = NAMED_COLORS[trimmed.toLowerCase()];
  if (named) return named;

  return null;
}

/**
 * Extract opacity from a CSS color string.
 * Returns 1 for fully opaque, 0-1 for transparent.
 */
export function cssColorToOpacity(cssColor: string): number {
  if (!cssColor || cssColor === 'transparent') return 0;

  const trimmed = cssColor.trim();

  // rgba with comma syntax
  const rgbaMatch = trimmed.match(
    /rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/
  );
  if (rgbaMatch) {
    return Number(rgbaMatch[1]);
  }

  // Modern rgb(r g b / a) syntax
  const modernMatch = trimmed.match(
    /rgba?\(\s*[\d.]+\s+[\d.]+\s+[\d.]+\s*\/\s*([\d.%]+)\s*\)/
  );
  if (modernMatch) {
    const val = modernMatch[1]!;
    if (val.endsWith('%')) {
      return Number(val.slice(0, -1)) / 100;
    }
    return Number(val);
  }

  return 1;
}

/**
 * Parse a CSS linear-gradient() string into DSL gradient info.
 * Maps CSS angles to DSL convention:
 *   CSS 0° = bottom→top, DSL 0° = left→right
 *   CSS 90° = left→right, DSL 90° = bottom→top
 *   Conversion: dslAngle = (450 - cssAngle) % 360
 */
export function parseLinearGradient(cssGradient: string): GradientInfo | null {
  if (!cssGradient.includes('linear-gradient')) return null;

  const match = cssGradient.match(/linear-gradient\((.+)\)/);
  if (!match) return null;

  const inner = match[1]!.trim();

  // Parse angle (optional)
  let angleDeg = 270; // Default: CSS 180deg (top→bottom) → DSL 270°
  let colorPart = inner;

  // Check for explicit angle
  const angleMatch = inner.match(/^(\d+(?:\.\d+)?)deg\s*,\s*/);
  if (angleMatch) {
    const cssAngle = Number(angleMatch[1]);
    angleDeg = cssAngleToDsl(cssAngle);
    colorPart = inner.slice(angleMatch[0].length);
  } else {
    // Check for direction keywords
    const dirMatch = inner.match(/^to\s+(top|bottom|left|right)(?:\s+(top|bottom|left|right))?\s*,\s*/);
    if (dirMatch) {
      angleDeg = directionToDslAngle(dirMatch[1]!, dirMatch[2]);
      colorPart = inner.slice(dirMatch[0].length);
    }
  }

  // Parse color stops
  const stops = parseGradientStops(colorPart);
  if (stops.length < 2) return null;

  return { stops, angleDeg };
}

/**
 * Check if a backgroundColor is effectively transparent (rgba with 0 alpha).
 */
export function isTransparent(color: string): boolean {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return true;
  const opacity = cssColorToOpacity(color);
  return opacity === 0;
}

// --- Internal helpers ---

function rgbToHex(r: number, g: number, b: number): string {
  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  return `#${hex}`;
}

function normalizeHex(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  if (h.length === 8) {
    // Strip alpha channel
    return `#${h.slice(0, 6)}`;
  }
  return `#${h}`;
}

function cssAngleToDsl(cssAngle: number): number {
  // CSS: 0°=bottom→top, 90°=left→right, 180°=top→bottom
  // DSL: 0°=left→right, 90°=bottom→top, 270°=top→bottom
  return ((450 - cssAngle) % 360 + 360) % 360;
}

function directionToDslAngle(dir1: string, dir2?: string): number {
  const key = dir2 ? `${dir1} ${dir2}` : dir1;
  const map: Record<string, number> = {
    'right': 0,
    'top': 90,
    'left': 180,
    'bottom': 270,
    'top right': 45,
    'right top': 45,
    'top left': 135,
    'left top': 135,
    'bottom left': 225,
    'left bottom': 225,
    'bottom right': 315,
    'right bottom': 315,
  };
  return map[key] ?? 270;
}

function parseGradientStops(colorPart: string): Array<{ hex: string; position: number }> {
  const stops: Array<{ hex: string; position: number }> = [];

  // Split on commas that are not inside parentheses
  const parts = splitGradientParts(colorPart);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!.trim();
    if (!part) continue;

    // Extract color and optional position
    const posMatch = part.match(/(.*?)\s+([\d.]+%)\s*$/);
    let colorStr: string;
    let position: number;

    if (posMatch) {
      colorStr = posMatch[1]!.trim();
      position = parseFloat(posMatch[2]!) / 100;
    } else {
      colorStr = part;
      // Auto-distribute position
      position = parts.length > 1 ? i / (parts.length - 1) : 0;
    }

    const hex = cssColorToHex(colorStr);
    if (hex) {
      stops.push({ hex, position });
    }
  }

  return stops;
}

function splitGradientParts(str: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const char of str) {
    if (char === '(') depth++;
    else if (char === ')') depth--;

    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

const NAMED_COLORS: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  orange: '#ffa500',
  purple: '#800080',
  gray: '#808080',
  grey: '#808080',
  pink: '#ffc0cb',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  lime: '#00ff00',
  navy: '#000080',
  teal: '#008080',
  maroon: '#800000',
  olive: '#808000',
  aqua: '#00ffff',
  silver: '#c0c0c0',
  fuchsia: '#ff00ff',
};
