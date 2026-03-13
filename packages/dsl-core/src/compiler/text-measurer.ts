import { loadSync, type Font } from "opentype.js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { TextStyle, FontWeight } from "../nodes/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONT_DIR = join(__dirname, "..", "..", "fonts");

const FONT_FILES: Record<number, string> = {
  400: "Inter-Regular.otf",
  500: "Inter-Medium.otf",
  600: "Inter-SemiBold.otf",
  700: "Inter-Bold.otf",
};

const fontCache = new Map<number, Font>();

function getFont(weight: FontWeight): Font {
  let font = fontCache.get(weight);
  if (font) return font;
  const file = FONT_FILES[weight];
  if (!file) throw new Error(`No font file for weight ${String(weight)}`);
  font = loadSync(join(FONT_DIR, file));
  fontCache.set(weight, font);
  return font;
}

export interface TextMeasurement {
  readonly width: number;
  readonly height: number;
  readonly lines: readonly string[];
}

/**
 * Measure text dimensions using opentype.js glyph metrics.
 */
export function measureText(
  characters: string,
  style: TextStyle | undefined,
): TextMeasurement {
  const fontSize = style?.fontSize ?? 14;
  const fontWeight: FontWeight = style?.fontWeight ?? 400;
  const font = getFont(fontWeight);
  const scale = fontSize / font.unitsPerEm;

  const lines = characters.split("\n");

  let maxWidth = 0;
  for (const line of lines) {
    let lineWidth = 0;
    for (let i = 0; i < line.length; i++) {
      const glyph = font.charToGlyph(line[i]!);
      lineWidth += (glyph.advanceWidth ?? 0) * scale;
    }
    if (lineWidth > maxWidth) maxWidth = lineWidth;
  }

  // Apply letter spacing
  if (style?.letterSpacing) {
    const ls = style.letterSpacing;
    const spacingPx =
      ls.unit === "PIXELS" ? ls.value : (ls.value / 100) * fontSize;
    // Letter spacing is applied between characters (count - 1 gaps per line)
    for (const line of lines) {
      if (line.length > 1) {
        maxWidth += spacingPx * (line.length - 1);
      }
    }
    // Use the max width across all lines
    // (already tracking maxWidth but need to recalculate properly)
    maxWidth = 0;
    for (const line of lines) {
      let lineWidth = 0;
      for (let i = 0; i < line.length; i++) {
        const glyph = font.charToGlyph(line[i]!);
        lineWidth += (glyph.advanceWidth ?? 0) * scale;
      }
      if (line.length > 1) {
        lineWidth += spacingPx * (line.length - 1);
      }
      if (lineWidth > maxWidth) maxWidth = lineWidth;
    }
  }

  // Compute line height
  const resolvedLineHeight = resolveLineHeight(style, fontSize);
  const height = lines.length * resolvedLineHeight;

  return { width: maxWidth, height, lines };
}

/**
 * Resolve line height to pixels.
 * Default: fontSize * 1.2
 */
export function resolveLineHeight(
  style: TextStyle | undefined,
  fontSize: number,
): number {
  if (!style?.lineHeight) return fontSize * 1.2;
  const lh = style.lineHeight;
  if (lh.unit === "PIXELS") return lh.value;
  return (lh.value / 100) * fontSize;
}

/**
 * Resolve letter spacing to pixels.
 */
export function resolveLetterSpacing(
  style: TextStyle | undefined,
  fontSize: number,
): number {
  if (!style?.letterSpacing) return 0;
  const ls = style.letterSpacing;
  if (ls.unit === "PIXELS") return ls.value;
  return (ls.value / 100) * fontSize;
}

/** Path to the fonts directory (for renderer to register fonts) */
export const FONTS_DIR = FONT_DIR;
