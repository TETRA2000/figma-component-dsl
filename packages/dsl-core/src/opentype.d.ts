declare module "opentype.js" {
  export interface Glyph {
    advanceWidth: number;
  }

  export interface Font {
    unitsPerEm: number;
    ascender: number;
    descender: number;
    names: { fontFamily?: { en?: string } };
    charToGlyph(char: string): Glyph;
  }

  export function loadSync(path: string): Font;
}
