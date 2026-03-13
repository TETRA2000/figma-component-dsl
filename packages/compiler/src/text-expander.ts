import type { TextStyle } from '../../dsl-core/src/types.js';
import type { Baseline, FontMeta } from './types.js';

function weightToStyle(weight: number): string {
  switch (weight) {
    case 400: return 'Regular';
    case 500: return 'Medium';
    case 600: return 'Semi Bold';
    case 700: return 'Bold';
    default: return 'Regular';
  }
}

export function expandTextData(
  characters: string,
  style: TextStyle | undefined,
  resolvedHeight: number,
): {
  textData: { characters: string; lines: string[] };
  derivedTextData: { baselines: Baseline[]; fontMetaData: FontMeta[] };
  fontSize: number;
  fontFamily: string;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT';
} {
  const fontSize = style?.fontSize ?? 14;
  const fontFamily = style?.fontFamily ?? 'Inter';
  const fontWeight = style?.fontWeight ?? 400;
  const textAlign = style?.textAlignHorizontal ?? 'LEFT';

  // Compute line height
  let lineHeight: number;
  if (style?.lineHeight) {
    if (style.lineHeight.unit === 'PIXELS') {
      lineHeight = style.lineHeight.value;
    } else {
      lineHeight = fontSize * (style.lineHeight.value / 100);
    }
  } else {
    lineHeight = fontSize * 1.2;
  }

  const lines = characters.split('\n');
  const baselines: Baseline[] = [];
  let charIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    baselines.push({
      lineY: i * lineHeight,
      lineHeight,
      firstCharIndex: charIdx,
      endCharIndex: charIdx + line.length,
    });
    charIdx += line.length + 1; // +1 for \n
  }

  const fontMeta: FontMeta = {
    fontFamily,
    fontStyle: weightToStyle(fontWeight),
    fontWeight,
    fontSize,
  };

  return {
    textData: { characters, lines },
    derivedTextData: {
      baselines,
      fontMetaData: [fontMeta],
    },
    fontSize,
    fontFamily,
    textAlignHorizontal: textAlign,
  };
}
