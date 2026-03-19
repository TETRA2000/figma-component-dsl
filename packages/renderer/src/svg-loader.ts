import { Resvg } from '@resvg/resvg-js';
import { loadImage, type Image } from '@napi-rs/canvas';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import type { FigmaNodeDict } from '@figma-dsl/compiler';

/**
 * Immutable map from SVG cache key (file path or content hash) to rasterised Image.
 */
export type SvgCache = ReadonlyMap<string, Image>;

/**
 * Information about an SVG source collected from the node tree.
 */
interface SvgEntry {
  /** Cache key — svgSrc path or sha256 hash of inline content. */
  key: string;
  /** Raw SVG markup (inline or read from file). */
  svgString: string;
  /** Desired rasterisation width. */
  width: number;
}

/**
 * Compute a deterministic cache key for inline SVG content.
 */
function contentHash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Recursively walk a compiled node tree and collect all SVG entries.
 */
export function collectSvgSources(
  node: FigmaNodeDict,
  assetDir: string,
): SvgEntry[] {
  const entries: SvgEntry[] = [];
  const seen = new Set<string>();

  function walk(n: FigmaNodeDict): void {
    if (n.type === 'SVG') {
      const width = Math.max(Math.ceil(n.size.x), 1);

      if (n.svgSrc) {
        const resolvedPath = isAbsolute(n.svgSrc)
          ? n.svgSrc
          : resolve(assetDir, n.svgSrc);
        if (!seen.has(n.svgSrc)) {
          seen.add(n.svgSrc);
          try {
            const svgString = readFileSync(resolvedPath, 'utf-8');
            entries.push({ key: n.svgSrc, svgString, width });
          } catch (err) {
            console.warn(`[svg-loader] Failed to read SVG file "${resolvedPath}":`, err);
          }
        }
      } else if (n.svgContent) {
        const key = contentHash(n.svgContent);
        if (!seen.has(key)) {
          seen.add(key);
          entries.push({ key, svgString: n.svgContent, width });
        }
      }
    }

    for (const child of n.children) {
      walk(child);
    }
  }

  walk(node);
  return entries;
}

/**
 * Resolve the cache key for an SVG node.
 * Returns the svgSrc path if present, otherwise the sha256 hash of svgContent.
 */
export function svgCacheKey(node: FigmaNodeDict): string | undefined {
  if (node.svgSrc) return node.svgSrc;
  if (node.svgContent) return contentHash(node.svgContent);
  return undefined;
}

/**
 * Pre-rasterise all SVG sources found in a compiled node tree.
 *
 * Each SVG is rendered to a PNG at the node's width via resvg, then loaded as
 * a canvas Image. The resulting cache is keyed by svgSrc path or content hash.
 *
 * Failures are logged as warnings and the entry is omitted from the cache —
 * the renderer will draw a placeholder instead.
 */
export async function preloadSvgContent(
  node: FigmaNodeDict,
  assetDir: string = '.',
): Promise<SvgCache> {
  const entries = collectSvgSources(node, assetDir);
  const cache = new Map<string, Image>();

  const results = await Promise.allSettled(
    entries.map(async (entry) => {
      const resvg = new Resvg(entry.svgString, {
        fitTo: { mode: 'width', value: entry.width },
      });
      const rendered = resvg.render();
      const pngBuffer = rendered.asPng();
      const img = await loadImage(Buffer.from(pngBuffer));
      return { key: entry.key, img };
    }),
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      cache.set(result.value.key, result.value.img);
    } else {
      console.warn('[svg-loader] Failed to rasterise SVG:', result.reason);
    }
  }

  return cache;
}
