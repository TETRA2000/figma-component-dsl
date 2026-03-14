import opentype from 'opentype.js';

interface MeasureStyle {
  fontSize: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: { value: number; unit: string };
}

interface MeasureResult {
  width: number;
  height: number;
}

export class TextMeasurer {
  private fonts = new Map<string, opentype.Font>();

  loadFont(filePath: string, family: string, weight: number): void {
    const key = `${family}:${weight}`;
    const font = opentype.loadSync(filePath);
    this.fonts.set(key, font);
  }

  measure(characters: string, style: MeasureStyle): MeasureResult {
    const font = this.getFont(style.fontFamily ?? 'Inter', style.fontWeight ?? 400);
    const lines = characters.split('\n');
    const scale = style.fontSize / (font?.unitsPerEm ?? 1000);
    const lineHeightPx = this.resolveLineHeight(style);

    let maxWidth = 0;
    for (const line of lines) {
      if (font) {
        const glyphs = font.stringToGlyphs(line);
        let width = 0;
        for (let i = 0; i < glyphs.length; i++) {
          const glyph = glyphs[i]!;
          width += (glyph.advanceWidth ?? 0) * scale;
          // Kerning
          if (i < glyphs.length - 1) {
            const nextGlyph = glyphs[i + 1]!;
            const kerning = font.getKerningValue(glyph, nextGlyph);
            width += kerning * scale;
          }
        }
        maxWidth = Math.max(maxWidth, width);
      } else {
        // Fallback estimation
        maxWidth = Math.max(maxWidth, line.length * style.fontSize * 0.6);
      }
    }

    return {
      width: maxWidth,
      height: lines.length * lineHeightPx,
    };
  }

  private getFont(family: string, weight: number): opentype.Font | undefined {
    const key = `${family}:${weight}`;
    const exact = this.fonts.get(key);
    if (exact) return exact;

    // Fallback: try any weight for this family
    for (const [k, font] of this.fonts) {
      if (k.startsWith(`${family}:`)) return font;
    }
    return undefined;
  }

  private resolveLineHeight(style: MeasureStyle): number {
    if (style.lineHeight) {
      if (style.lineHeight.unit === 'PIXELS') {
        return style.lineHeight.value;
      }
      if (style.lineHeight.unit === 'PERCENT') {
        return (style.lineHeight.value / 100) * style.fontSize;
      }
    }
    return style.fontSize * 1.2;
  }
}
