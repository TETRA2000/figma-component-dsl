import { describe, it, expect } from 'vitest';
import { collectSvgSources, preloadSvgContent, svgCacheKey } from './svg-loader.js';
import type { FigmaNodeDict } from '@figma-dsl/compiler';

function makeNode(overrides: Partial<FigmaNodeDict>): FigmaNodeDict {
  return {
    guid: [0, 1],
    type: 'FRAME',
    name: 'Test',
    size: { x: 100, y: 100 },
    transform: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    fillPaints: [],
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  };
}

const SIMPLE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10" fill="red"/></svg>';

describe('collectSvgSources()', () => {
  it('returns empty array for tree with no SVG nodes', () => {
    const tree = makeNode({
      children: [makeNode({ type: 'RECTANGLE', name: 'Rect' })],
    });
    const entries = collectSvgSources(tree, '.');
    expect(entries).toHaveLength(0);
  });

  it('collects inline svgContent from SVG nodes', () => {
    const tree = makeNode({
      children: [
        makeNode({
          type: 'SVG' as FigmaNodeDict['type'],
          name: 'Icon',
          svgContent: SIMPLE_SVG,
          size: { x: 24, y: 24 },
        }),
      ],
    });
    const entries = collectSvgSources(tree, '.');
    expect(entries).toHaveLength(1);
    expect(entries[0]!.svgString).toBe(SIMPLE_SVG);
  });

  it('deduplicates identical inline SVG content', () => {
    const tree = makeNode({
      children: [
        makeNode({
          type: 'SVG' as FigmaNodeDict['type'],
          name: 'Icon1',
          svgContent: SIMPLE_SVG,
          size: { x: 24, y: 24 },
        }),
        makeNode({
          type: 'SVG' as FigmaNodeDict['type'],
          name: 'Icon2',
          svgContent: SIMPLE_SVG,
          size: { x: 24, y: 24 },
        }),
      ],
    });
    const entries = collectSvgSources(tree, '.');
    expect(entries).toHaveLength(1);
  });
});

describe('svgCacheKey()', () => {
  it('returns svgSrc when present', () => {
    const node = makeNode({
      type: 'SVG' as FigmaNodeDict['type'],
      svgSrc: './icon.svg',
    });
    expect(svgCacheKey(node)).toBe('./icon.svg');
  });

  it('returns content hash for inline svgContent', () => {
    const node = makeNode({
      type: 'SVG' as FigmaNodeDict['type'],
      svgContent: SIMPLE_SVG,
    });
    const key = svgCacheKey(node);
    expect(key).toBeDefined();
    expect(typeof key).toBe('string');
    // Hash should be deterministic
    expect(key).toBe(svgCacheKey(node));
  });

  it('returns undefined when no SVG source', () => {
    const node = makeNode({ type: 'SVG' as FigmaNodeDict['type'] });
    expect(svgCacheKey(node)).toBeUndefined();
  });
});

describe('preloadSvgContent()', () => {
  it('returns empty cache for tree with no SVG nodes', async () => {
    const tree = makeNode({ children: [] });
    const cache = await preloadSvgContent(tree, '.');
    expect(cache.size).toBe(0);
  });

  it('rasterises inline SVG content and caches the result', async () => {
    const tree = makeNode({
      children: [
        makeNode({
          type: 'SVG' as FigmaNodeDict['type'],
          name: 'Icon',
          svgContent: SIMPLE_SVG,
          size: { x: 24, y: 24 },
        }),
      ],
    });
    const cache = await preloadSvgContent(tree, '.');
    expect(cache.size).toBe(1);

    const key = svgCacheKey(tree.children[0]!)!;
    const img = cache.get(key);
    expect(img).toBeDefined();
    expect(img!.width).toBeGreaterThan(0);
    expect(img!.height).toBeGreaterThan(0);
  });

  it('handles missing svgSrc file gracefully', async () => {
    const tree = makeNode({
      children: [
        makeNode({
          type: 'SVG' as FigmaNodeDict['type'],
          name: 'Missing',
          svgSrc: './nonexistent-icon.svg',
          size: { x: 24, y: 24 },
        }),
      ],
    });
    // Should not throw; missing file is logged and skipped
    const cache = await preloadSvgContent(tree, '.');
    expect(cache.size).toBe(0);
  });
});
