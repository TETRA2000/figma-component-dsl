import { readFileSync } from 'node:fs';
import opentype from 'opentype.js';
import type { TextStyle } from '../../dsl-core/src/types.js';

export interface TextMeasurement {
  readonly width: number;
  readonly height: number;
}

interface FontEntry {
  font: opentype.Font;
  family: string;
  weight: number;
}

export class TextMeasurer {
  private fonts: FontEntry[] = [];

  loadFont(path: string, family: string, weight: number): void {
    const buffer = readFileSync(path);
    const font = opentype.parse(buffer.buffer as ArrayBuffer);
    this.fonts.push({ font, family, weight });
  }

  private getFont(family: string, weight: number): opentype.Font {
    // Exact match first
    const exact = this.fonts.find(
      (f) => f.family === family && f.weight === weight,
    );
    if (exact) return exact.font;

    // Fallback to same family, closest weight
    const sameFamily = this.fonts.filter((f) => f.family === family);
    if (sameFamily.length > 0) {
      sameFamily.sort((a, b) => Math.abs(a.weight - weight) - Math.abs(b.weight - weight));
      return sameFamily[0]!.font;
    }

    // Fallback to first loaded font
    if (this.fonts.length > 0) return this.fonts[0]!.font;
    throw new Error(`No font loaded for ${family} ${weight}`);
  }

  measure(characters: string, style: TextStyle): TextMeasurement {
    const fontSize = style.fontSize ?? 14;
    const fontFamily = style.fontFamily ?? 'Inter';
    const fontWeight = style.fontWeight ?? 400;
    const font = this.getFont(fontFamily, fontWeight);

    // Compute line height
    let lineHeight: number;
    if (style.lineHeight) {
      if (style.lineHeight.unit === 'PIXELS') {
        lineHeight = style.lineHeight.value;
      } else {
        // PERCENT
        lineHeight = fontSize * (style.lineHeight.value / 100);
      }
    } else {
      lineHeight = fontSize * 1.2;
    }

    // Compute letter spacing in pixels
    let letterSpacingPx = 0;
    if (style.letterSpacing) {
      if (style.letterSpacing.unit === 'PIXELS') {
        letterSpacingPx = style.letterSpacing.value;
      } else {
        letterSpacingPx = fontSize * (style.letterSpacing.value / 100);
      }
    }

    // Split into lines
    const lines = characters.split('\n');
    let maxWidth = 0;

    for (const line of lines) {
      const glyphs = font.stringToGlyphs(line);
      let lineWidth = 0;
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]!;
        lineWidth += (glyph.advanceWidth ?? 0) * (fontSize / font.unitsPerEm);
        // Apply kerning
        if (i < glyphs.length - 1) {
          const kerning = font.getKerningValue(glyph, glyphs[i + 1]!);
          lineWidth += kerning * (fontSize / font.unitsPerEm);
        }
      }
      lineWidth += glyphs.length * letterSpacingPx;
      maxWidth = Math.max(maxWidth, lineWidth);
    }

    return {
      width: maxWidth,
      height: lines.length * lineHeight,
    };
  }
}
