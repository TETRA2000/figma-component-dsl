import { describe, it, expect } from 'vitest';
import {
  getStoredSource,
  isDslCanvasNode,
  toCanvasRegionInfos,
  pngToDataUri,
  MAX_CANVAS_CAPTURES,
  CANVAS_CAPTURE_SCALE,
} from './codegen.js';
import type { CanvasRegion, CanvasDetectableNode } from './canvas-detector.js';

// --- Unit tests for helpers ---

describe('isDslCanvasNode', () => {
  it('returns isCanvas true for a node with dsl-canvas plugin data', () => {
    const node = {
      id: '1:1',
      name: 'MyCanvas',
      type: 'FRAME',
      width: 200,
      height: 100,
      visible: true,
      getPluginData: (key: string) =>
        key === 'dsl-canvas'
          ? JSON.stringify({ isCanvas: true, canvasName: 'hero-canvas' })
          : '',
    };
    const result = isDslCanvasNode(node as unknown as SceneNode);
    expect(result.isCanvas).toBe(true);
    expect(result.canvasName).toBe('hero-canvas');
  });

  it('returns isCanvas false for a node without dsl-canvas data', () => {
    const node = {
      id: '1:2',
      name: 'Regular',
      type: 'FRAME',
      width: 100,
      height: 50,
      visible: true,
      getPluginData: () => '',
    };
    const result = isDslCanvasNode(node as unknown as SceneNode);
    expect(result.isCanvas).toBe(false);
    expect(result.canvasName).toBeNull();
  });

  it('returns isCanvas false for invalid JSON in dsl-canvas data', () => {
    const node = {
      id: '1:3',
      name: 'Bad',
      type: 'FRAME',
      width: 100,
      height: 50,
      visible: true,
      getPluginData: (key: string) => key === 'dsl-canvas' ? 'not json' : '',
    };
    const result = isDslCanvasNode(node as unknown as SceneNode);
    expect(result.isCanvas).toBe(false);
  });

  it('returns isCanvas false when isCanvas field is false', () => {
    const node = {
      id: '1:4',
      name: 'NotCanvas',
      type: 'FRAME',
      width: 100,
      height: 50,
      visible: true,
      getPluginData: (key: string) =>
        key === 'dsl-canvas'
          ? JSON.stringify({ isCanvas: false })
          : '',
    };
    const result = isDslCanvasNode(node as unknown as SceneNode);
    expect(result.isCanvas).toBe(false);
  });
});

describe('toCanvasRegionInfos', () => {
  it('maps CanvasRegion array to CanvasRegionInfo array', () => {
    const regions: CanvasRegion[] = [
      {
        node: { id: '1:1', name: 'c1', type: 'FRAME', width: 200, height: 100 } as CanvasDetectableNode,
        canvasName: 'hero',
      },
      {
        node: { id: '1:2', name: 'c2', type: 'FRAME', width: 300, height: 150 } as CanvasDetectableNode,
        canvasName: 'footer',
      },
    ];
    const infos = toCanvasRegionInfos(regions);
    expect(infos).toHaveLength(2);
    expect(infos[0]).toEqual({ canvasName: 'hero', nodeId: '1:1', width: 200, height: 100 });
    expect(infos[1]).toEqual({ canvasName: 'footer', nodeId: '1:2', width: 300, height: 150 });
  });

  it('returns empty array for no regions', () => {
    expect(toCanvasRegionInfos([])).toEqual([]);
  });
});

describe('pngToDataUri', () => {
  it('converts Uint8Array to data URI string', () => {
    // Simple test: 3 bytes → base64
    const bytes = new Uint8Array([0x89, 0x50, 0x4E]); // PNG magic bytes (partial)
    const result = pngToDataUri(bytes);
    expect(result).toMatch(/^data:image\/png;base64,/);
    // Verify round-trip: atob the base64 portion
    const base64 = result.replace('data:image/png;base64,', '');
    const decoded = atob(base64);
    expect(decoded.charCodeAt(0)).toBe(0x89);
    expect(decoded.charCodeAt(1)).toBe(0x50);
    expect(decoded.charCodeAt(2)).toBe(0x4E);
  });

  it('handles empty Uint8Array', () => {
    const result = pngToDataUri(new Uint8Array([]));
    expect(result).toBe('data:image/png;base64,');
  });
});

describe('getStoredSource', () => {
  const sources = { react: 'tsx code', css: 'css code', dsl: 'dsl code' };

  it('returns react source for react language', () => {
    expect(getStoredSource(sources, 'react')).toBe('tsx code');
  });

  it('returns css source for css language', () => {
    expect(getStoredSource(sources, 'css')).toBe('css code');
  });

  it('returns dsl source for dsl language', () => {
    expect(getStoredSource(sources, 'dsl')).toBe('dsl code');
  });

  it('returns undefined for html language', () => {
    expect(getStoredSource(sources, 'html')).toBeUndefined();
  });

  it('returns undefined for unknown language', () => {
    expect(getStoredSource(sources, 'python')).toBeUndefined();
  });
});

describe('constants', () => {
  it('MAX_CANVAS_CAPTURES is 3', () => {
    expect(MAX_CANVAS_CAPTURES).toBe(3);
  });

  it('CANVAS_CAPTURE_SCALE is 1', () => {
    expect(CANVAS_CAPTURE_SCALE).toBe(1);
  });
});
