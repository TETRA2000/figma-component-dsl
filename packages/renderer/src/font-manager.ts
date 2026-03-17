import { GlobalFonts } from '@napi-rs/canvas';
import { join, isAbsolute, resolve } from 'path';
import { readdirSync, readFileSync, existsSync } from 'fs';

export interface FontRegistration {
  path: string;
  family: string;
  weight: number;
  style: 'normal' | 'italic';
}

export interface FontManagerOptions {
  fontDir: string;
  assetDir?: string;
  customFonts?: FontRegistration[];
}

const CJK_FONT_FAMILY = 'Noto Sans JP';

// Keep buffer references to prevent GC
const fontBuffers = new Map<string, Buffer>();

let initialized = false;

/**
 * Detect if text contains CJK characters (Chinese, Japanese, Korean).
 */
const CJK_REGEX = /[\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/;

export function containsCJK(text: string): boolean {
  return CJK_REGEX.test(text);
}

/**
 * Register bundled fonts (Inter, Noto Sans JP) from the fonts directory.
 */
function registerBundledFonts(fontDir: string): void {
  if (!existsSync(fontDir)) return;
  const files = readdirSync(fontDir);
  for (const file of files) {
    if (file.endsWith('.otf') || file.endsWith('.ttf')) {
      const fileLower = file.toLowerCase();
      if (fileLower.includes('notosansjp') || fileLower.includes('noto-sans-jp')) {
        GlobalFonts.registerFromPath(join(fontDir, file), CJK_FONT_FAMILY);
      } else {
        GlobalFonts.registerFromPath(join(fontDir, file), 'Inter');
      }
    }
  }
}

/**
 * Resolve a font path relative to the asset directory.
 */
function resolveFontPath(fontPath: string, assetDir?: string): string {
  if (isAbsolute(fontPath)) return fontPath;
  return resolve(assetDir ?? process.cwd(), fontPath);
}

/**
 * Register a custom font file with the canvas font system.
 * Returns an error message if the file doesn't exist or can't be loaded.
 */
function registerCustomFont(reg: FontRegistration, assetDir?: string): string | null {
  const resolved = resolveFontPath(reg.path, assetDir);

  if (!existsSync(resolved)) {
    return `Font file not found: ${resolved} (declared as '${reg.path}')`;
  }

  // Check for WOFF2 — needs decompression
  if (resolved.endsWith('.woff2')) {
    try {
      // Try to load woff2-rs for decompression
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const woff2 = require('@aspect-build/woff2-rs');
      const woff2Buffer = readFileSync(resolved);
      const ttfBuffer = woff2.decompress(woff2Buffer);
      fontBuffers.set(resolved, ttfBuffer);
      GlobalFonts.register(ttfBuffer, reg.family);
      return null;
    } catch {
      // Try direct registration — some canvas implementations handle WOFF2 natively
      try {
        const buffer = readFileSync(resolved);
        fontBuffers.set(resolved, buffer);
        GlobalFonts.register(buffer, reg.family);
        return null;
      } catch {
        return `Failed to register WOFF2 font: ${resolved}. Install @aspect-build/woff2-rs for WOFF2 support.`;
      }
    }
  }

  // TTF/OTF — register directly
  try {
    const buffer = readFileSync(resolved);
    fontBuffers.set(resolved, buffer);
    GlobalFonts.register(buffer, reg.family);
    return null;
  } catch {
    return `Failed to register font: ${resolved}`;
  }
}

/**
 * Initialize the font manager with bundled and optional custom fonts.
 */
export function initializeFontManager(options: FontManagerOptions): string[] {
  const errors: string[] = [];

  if (!initialized) {
    registerBundledFonts(options.fontDir);
    initialized = true;
  }

  // Register custom fonts
  if (options.customFonts) {
    for (const font of options.customFonts) {
      const err = registerCustomFont(font, options.assetDir);
      if (err) errors.push(err);
    }
  }

  return errors;
}

/**
 * Resolve the appropriate font family for given text content.
 * If a specific family is requested and registered, returns it.
 * Otherwise auto-detects CJK text for Noto Sans JP fallback.
 */
export function resolveFontFamily(text: string, requestedFamily?: string): string {
  if (requestedFamily && requestedFamily !== 'Inter') {
    return requestedFamily;
  }
  if (containsCJK(text)) {
    return CJK_FONT_FAMILY;
  }
  return requestedFamily ?? 'Inter';
}

/**
 * Reset font manager state (for testing).
 */
export function resetFontManager(): void {
  fontBuffers.clear();
  initialized = false;
}
