import { loadImage, type Image } from '@napi-rs/canvas';
import { resolve, isAbsolute } from 'path';
import type { FigmaNodeDict } from '@figma-dsl/compiler';

/**
 * Immutable map from image source path/URL to loaded Image object.
 */
export type ImageCache = ReadonlyMap<string, Image>;

/**
 * Traverse a compiled node tree and collect all image source references
 * (from IMAGE nodes and IMAGE fills).
 */
export function collectImageSources(node: FigmaNodeDict): Set<string> {
  const sources = new Set<string>();

  function walk(n: FigmaNodeDict): void {
    // IMAGE node source
    if (n.type === 'IMAGE' && n.imageSrc) {
      sources.add(n.imageSrc);
    }

    // IMAGE fills
    for (const paint of n.fillPaints) {
      if (paint.type === 'IMAGE' && paint.imageSrc) {
        sources.add(paint.imageSrc);
      }
    }

    // Recurse children
    for (const child of n.children) {
      walk(child);
    }
  }

  walk(node);
  return sources;
}

/**
 * Resolve a relative image path against an asset directory.
 * - Absolute paths and URLs (https://) pass through unchanged.
 * - Relative paths are resolved against assetDir.
 */
export function resolveImageSource(src: string, assetDir: string): string {
  if (src.startsWith('https://') || src.startsWith('http://')) {
    return src;
  }
  if (isAbsolute(src)) {
    return src;
  }
  return resolve(assetDir, src);
}

/**
 * Load all collected image sources in parallel, returning an immutable cache.
 * Failed loads are logged as warnings and omitted from the cache.
 */
export async function preloadImages(
  sources: Set<string>,
  assetDir: string,
): Promise<ImageCache> {
  const cache = new Map<string, Image>();

  const entries = await Promise.allSettled(
    Array.from(sources).map(async (src) => {
      const resolved = resolveImageSource(src, assetDir);
      const img = await loadImage(resolved);
      return { src, img };
    }),
  );

  for (const entry of entries) {
    if (entry.status === 'fulfilled') {
      cache.set(entry.value.src, entry.value.img);
    }
    // Rejected entries are silently omitted — the renderer draws a placeholder
  }

  return cache;
}
