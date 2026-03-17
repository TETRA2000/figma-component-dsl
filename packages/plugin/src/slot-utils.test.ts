import { describe, it, expect } from 'vitest';
import {
  formatCanvasName,
  isCanvasFrameName,
  extractCanvasName,
  buildComponentMap,
  findDuplicateNames,
  resolveInstance,
  formatDetachedCopyName,
  buildDetachedCopy,
} from './slot-utils.js';
import type { ComponentEntry } from './slot-utils.js';
import type { PluginNodeDef } from '@figma-dsl/core';

// --- Canvas frame naming convention ---

describe('formatCanvasName()', () => {
  it('prefixes with [Canvas]', () => {
    expect(formatCanvasName('Content')).toBe('[Canvas] Content');
  });

  it('works with multi-word names', () => {
    expect(formatCanvasName('Action Bar')).toBe('[Canvas] Action Bar');
  });
});

describe('isCanvasFrameName()', () => {
  it('returns true for canvas-named frames', () => {
    expect(isCanvasFrameName('[Canvas] Content')).toBe(true);
  });

  it('returns false for regular frame names', () => {
    expect(isCanvasFrameName('Content')).toBe(false);
    expect(isCanvasFrameName('Canvas Content')).toBe(false);
  });

  it('returns false for old slot-named frames', () => {
    expect(isCanvasFrameName('[Slot] Content')).toBe(false);
  });
});

describe('extractCanvasName()', () => {
  it('extracts canvas name from frame name', () => {
    expect(extractCanvasName('[Canvas] Content')).toBe('Content');
  });

  it('returns undefined for non-canvas names', () => {
    expect(extractCanvasName('Regular Frame')).toBeUndefined();
  });
});

// --- File scanner map building ---

describe('buildComponentMap()', () => {
  it('builds map from entries', () => {
    const entries: ComponentEntry[] = [
      { name: 'Button', nodeId: '1:1' },
      { name: 'Card', nodeId: '2:2' },
    ];
    const map = buildComponentMap(entries);
    expect(map.size).toBe(2);
    expect(map.get('Button')?.nodeId).toBe('1:1');
    expect(map.get('Card')?.nodeId).toBe('2:2');
  });

  it('handles duplicate names by keeping first match', () => {
    const entries: ComponentEntry[] = [
      { name: 'Button', nodeId: '1:1' },
      { name: 'Button', nodeId: '3:3' },
    ];
    const map = buildComponentMap(entries);
    expect(map.size).toBe(1);
    expect(map.get('Button')?.nodeId).toBe('1:1');
  });

  it('handles empty entries', () => {
    const map = buildComponentMap([]);
    expect(map.size).toBe(0);
  });
});

describe('findDuplicateNames()', () => {
  it('finds duplicate component names', () => {
    const entries: ComponentEntry[] = [
      { name: 'Button', nodeId: '1:1' },
      { name: 'Card', nodeId: '2:2' },
      { name: 'Button', nodeId: '3:3' },
    ];
    expect(findDuplicateNames(entries)).toEqual(['Button']);
  });

  it('returns empty for no duplicates', () => {
    const entries: ComponentEntry[] = [
      { name: 'Button', nodeId: '1:1' },
      { name: 'Card', nodeId: '2:2' },
    ];
    expect(findDuplicateNames(entries)).toEqual([]);
  });
});

// --- Instance resolution ---

describe('resolveInstance()', () => {
  const localMap = new Map([
    ['Button', { nodeId: 'local:1' }],
  ]);
  const fileMap = buildComponentMap([
    { name: 'Card', nodeId: 'file:2' },
    { name: 'Button', nodeId: 'file:1' },
  ]);

  it('resolves from local map first', () => {
    const result = resolveInstance('Button', localMap, fileMap);
    expect(result.source).toBe('local');
    expect(result.nodeId).toBe('local:1');
  });

  it('falls back to file-scanned map', () => {
    const result = resolveInstance('Card', localMap, fileMap);
    expect(result.source).toBe('file-scan');
    expect(result.nodeId).toBe('file:2');
  });

  it('returns not-found when component not in either map', () => {
    const result = resolveInstance('Unknown', localMap, fileMap);
    expect(result.source).toBe('not-found');
    expect(result.componentName).toBe('Unknown');
  });
});

// --- Detached copy ---

describe('formatDetachedCopyName()', () => {
  it('formats with detached suffix', () => {
    expect(formatDetachedCopyName('Card')).toBe('Card (detached — canvas override)');
  });
});

function mockPluginNodeDef(overrides: Partial<PluginNodeDef> & { type: string; name: string }): PluginNodeDef {
  return {
    size: { x: 100, y: 50 },
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  } as PluginNodeDef;
}

describe('buildDetachedCopy()', () => {
  it('creates a FRAME copy with detached naming', () => {
    const compDef = mockPluginNodeDef({
      type: 'COMPONENT',
      name: 'Card',
      children: [
        mockPluginNodeDef({ type: 'TEXT', name: 'Title' }),
        mockPluginNodeDef({
          type: 'FRAME',
          name: 'Content',
          isCanvas: true,
          canvasName: 'Content',
          children: [mockPluginNodeDef({ type: 'TEXT', name: 'Default' })],
        }),
      ],
    });

    const copy = buildDetachedCopy(compDef, {
      Content: [mockPluginNodeDef({ type: 'TEXT', name: 'Custom' })],
    });

    expect(copy.type).toBe('FRAME');
    expect(copy.name).toBe('Card (detached — canvas override)');
    expect(copy.children).toHaveLength(2);
    // First child unchanged
    expect(copy.children[0]!.name).toBe('Title');
    // Canvas child has override content
    expect(copy.children[1]!.name).toBe('[Canvas] Content');
    expect(copy.children[1]!.children).toHaveLength(1);
    expect(copy.children[1]!.children[0]!.name).toBe('Custom');
  });

  it('preserves original children when no override for canvas', () => {
    const compDef = mockPluginNodeDef({
      type: 'COMPONENT',
      name: 'Card',
      children: [
        mockPluginNodeDef({
          type: 'FRAME',
          name: 'Header',
          isCanvas: true,
          canvasName: 'Header',
          children: [mockPluginNodeDef({ type: 'TEXT', name: 'Default Header' })],
        }),
      ],
    });

    const copy = buildDetachedCopy(compDef, {});
    // No override for Header — original children preserved
    expect(copy.children[0]!.children[0]!.name).toBe('Default Header');
  });

  it('stores original component reference', () => {
    const compDef = mockPluginNodeDef({ type: 'COMPONENT', name: 'Card' });
    const copy = buildDetachedCopy(compDef, {});
    expect(copy.componentId).toBe('Card');
  });
});
