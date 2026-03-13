import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
import { readdirSync } from 'fs';
import type { TextMeasurer, TextMeasurement } from './types.js';

let initialized = false;
let ctx: ReturnType<typeof createCanvas> extends infer C ? (C extends { getContext: (t: '2d') => infer Ctx } ? Ctx : never) : never;

function ensureContext() {
  if (!ctx) {
    const canvas = createCanvas(1, 1);
    ctx = canvas.getContext('2d');
  }
  return ctx;
}

export const textMeasurer: TextMeasurer = {
  initialize(fontDir: string): void {
    if (initialized) return;
    const files = readdirSync(fontDir);
    for (const file of files) {
      if (file.endsWith('.otf') || file.endsWith('.ttf')) {
        const familyName = 'Inter';
        GlobalFonts.registerFromPath(join(fontDir, file), familyName);
      }
    }
    initialized = true;
  },

  measure(characters: string, style): TextMeasurement {
    const context = ensureContext();
    const fontSize = style.fontSize ?? 14;
    const fontWeight = style.fontWeight ?? 400;
    const fontFamily = style.fontFamily ?? 'Inter';

    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const lines = characters.split('\n');
    let maxWidth = 0;
    for (const line of lines) {
      const metrics = context.measureText(line);
      if (metrics.width > maxWidth) {
        maxWidth = metrics.width;
      }
    }

    const lineHeightValue = style.lineHeight
      ? style.lineHeight.unit === 'PERCENT'
        ? (style.lineHeight.value / 100) * fontSize
        : style.lineHeight.value
      : fontSize * 1.2;

    return {
      width: maxWidth,
      height: lines.length * lineHeightValue,
    };
  },
};

export function resetTextMeasurer(): void {
  initialized = false;
}
