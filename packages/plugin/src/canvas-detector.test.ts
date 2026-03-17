import { describe, it, expect } from 'vitest';
import {
  detectCanvasRegions,
  type CanvasDetectableComponent,
  type CanvasDetectableNode,
} from './canvas-detector.js';

// --- Helpers ---

function makeNode(overrides: Partial<CanvasDetectableNode> & { type: string; name: string }): CanvasDetectableNode {
  return {
    id: `node-${Math.random().toString(36).slice(2, 8)}`,
    width: 100,
    height: 100,
    ...overrides,
  };
}

function makeComponent(children: CanvasDetectableNode[]): CanvasDetectableComponent {
  return {
    type: 'COMPONENT',
    children,
  };
}

// --- detectCanvasRegions ---

describe('detectCanvasRegions', () => {
  it('detects canvas region via dsl-canvas plugin data', () => {
    const canvasChild = makeNode({
      type: 'FRAME',
      name: 'hero-canvas',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'hero-canvas' }) : '',
    });
    const comp = makeComponent([canvasChild]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.canvasName).toBe('hero-canvas');
    expect(results[0]!.node).toBe(canvasChild);
  });

  it('uses node name when canvasName is not in plugin data', () => {
    const canvasChild = makeNode({
      type: 'FRAME',
      name: 'FallbackName',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true }) : '',
    });
    const comp = makeComponent([canvasChild]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.canvasName).toBe('FallbackName');
  });

  it('detects multiple canvas regions', () => {
    const canvas1 = makeNode({
      type: 'FRAME',
      name: 'Header',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'Header' }) : '',
    });
    const canvas2 = makeNode({
      type: 'FRAME',
      name: 'Footer',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'Footer' }) : '',
    });
    const comp = makeComponent([canvas1, canvas2]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(2);
    expect(results[0]!.canvasName).toBe('Header');
    expect(results[1]!.canvasName).toBe('Footer');
  });

  it('skips nodes without getPluginData', () => {
    const child = makeNode({ type: 'FRAME', name: 'NoPluginData' });
    const comp = makeComponent([child]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });

  it('skips nodes without dsl-canvas plugin data', () => {
    const child = makeNode({
      type: 'FRAME',
      name: 'NotCanvas',
      getPluginData: () => '',
    });
    const comp = makeComponent([child]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });

  it('skips nodes where isCanvas is false', () => {
    const child = makeNode({
      type: 'FRAME',
      name: 'NotCanvas',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: false }) : '',
    });
    const comp = makeComponent([child]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });

  it('handles malformed plugin data gracefully', () => {
    const child = makeNode({
      type: 'FRAME',
      name: 'broken',
      getPluginData: () => 'not-json',
    });
    const comp = makeComponent([child]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });

  it('returns empty array for component with no children', () => {
    const comp: CanvasDetectableComponent = {
      type: 'COMPONENT',
      children: [],
    };

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });

  it('returns empty array when no canvas nodes detected', () => {
    const frame = makeNode({ type: 'FRAME', name: 'RegularFrame' });
    const comp = makeComponent([frame]);

    const results = detectCanvasRegions(comp);
    expect(results).toHaveLength(0);
  });
});
