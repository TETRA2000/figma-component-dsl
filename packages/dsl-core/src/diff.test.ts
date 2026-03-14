import { describe, it, expect } from 'vitest';
import type { PluginNodeDef } from './plugin-types.js';
import { diffNodes, diffValues, describeChange } from './diff.js';
import type { PropertyChange } from './changeset.js';

function makeNode(overrides: Partial<PluginNodeDef> = {}): PluginNodeDef {
  return {
    type: 'FRAME',
    name: 'TestNode',
    size: { x: 100, y: 50 },
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  };
}

describe('diffValues', () => {
  it('detects no change for identical primitives', () => {
    const changes: PropertyChange[] = [];
    diffValues('foo', 42, 42, changes);
    expect(changes).toHaveLength(0);
  });

  it('detects modified primitive', () => {
    const changes: PropertyChange[] = [];
    diffValues('fontSize', 16, 24, changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.changeType).toBe('modified');
    expect(changes[0]!.oldValue).toBe(16);
    expect(changes[0]!.newValue).toBe(24);
  });

  it('ignores float rounding noise in colors (Figma 32-bit vs JS 64-bit)', () => {
    const changes: PropertyChange[] = [];
    // Real example: JS double 0.058823529411764705 vs Figma float 0.05882352963089943
    diffValues('fills.0.color.r', 0.058823529411764705, 0.05882352963089943, changes);
    expect(changes).toHaveLength(0);
  });

  it('ignores float rounding noise in gradient stop colors', () => {
    const changes: PropertyChange[] = [];
    diffValues('fills.0.gradientStops.0.color.b', 0.1803921568627451, 0.18039216101169586, changes);
    expect(changes).toHaveLength(0);
  });

  it('ignores sub-pixel size differences', () => {
    const changes: PropertyChange[] = [];
    // Real example: 1417.6 vs 1418.199951171875 (< 1px diff)
    diffValues('size.y', 1417.6, 1418.199951171875, changes);
    expect(changes).toHaveLength(0);
  });

  it('detects meaningful size changes beyond 1px', () => {
    const changes: PropertyChange[] = [];
    diffValues('size.y', 100, 120, changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.changeType).toBe('modified');
  });

  it('detects meaningful color changes', () => {
    const changes: PropertyChange[] = [];
    // Red to blue: clearly different
    diffValues('fills.0.color.r', 1.0, 0.0, changes);
    expect(changes).toHaveLength(1);
  });

  it('ignores gradient transform epsilon noise', () => {
    const changes: PropertyChange[] = [];
    diffValues('fills.0.gradientTransform.0.1', 1.2246467991473532e-16, 1.2246468525851679e-16, changes);
    expect(changes).toHaveLength(0);
  });

  it('detects added value', () => {
    const changes: PropertyChange[] = [];
    diffValues('cornerRadius', undefined, 8, changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.changeType).toBe('added');
    expect(changes[0]!.newValue).toBe(8);
  });

  it('detects removed value', () => {
    const changes: PropertyChange[] = [];
    diffValues('cornerRadius', 8, undefined, changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.changeType).toBe('removed');
    expect(changes[0]!.oldValue).toBe(8);
  });

  it('diffs nested objects with dot-notation paths', () => {
    const changes: PropertyChange[] = [];
    diffValues('size', { x: 100, y: 50 }, { x: 200, y: 50 }, changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.propertyPath).toBe('size.x');
    expect(changes[0]!.oldValue).toBe(100);
    expect(changes[0]!.newValue).toBe(200);
  });

  it('diffs arrays element by element', () => {
    const changes: PropertyChange[] = [];
    const oldFills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 }];
    const newFills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1, a: 1 }, opacity: 1 }];
    diffValues('fills', oldFills, newFills, changes);
    expect(changes.length).toBeGreaterThanOrEqual(1);
    const colorChange = changes.find(c => c.propertyPath === 'fills.0.color.r');
    expect(colorChange).toBeDefined();
    expect(colorChange!.oldValue).toBe(1);
    expect(colorChange!.newValue).toBe(0);
  });

  it('handles arrays with different lengths', () => {
    const changes: PropertyChange[] = [];
    diffValues('items', [1, 2], [1, 2, 3], changes);
    expect(changes).toHaveLength(1);
    expect(changes[0]!.propertyPath).toBe('items.2');
    expect(changes[0]!.changeType).toBe('added');
  });
});

describe('diffNodes', () => {
  it('returns empty array for identical nodes', () => {
    const node = makeNode();
    const changes = diffNodes(node, node);
    expect(changes).toHaveLength(0);
  });

  it('detects fill color change', () => {
    const baseline = makeNode({
      fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 }],
    });
    const current = makeNode({
      fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 1, a: 1 }, opacity: 1 }],
    });
    const changes = diffNodes(baseline, current);
    expect(changes.length).toBeGreaterThanOrEqual(1);
    const rChange = changes.find(c => c.propertyPath === 'fills.0.color.r');
    expect(rChange).toBeDefined();
    expect(rChange!.changeType).toBe('modified');
  });

  it('detects font size change', () => {
    const baseline = makeNode({ type: 'TEXT', fontSize: 16, characters: 'Hello' });
    const current = makeNode({ type: 'TEXT', fontSize: 24, characters: 'Hello' });
    const changes = diffNodes(baseline, current);
    const fsChange = changes.find(c => c.propertyPath === 'fontSize');
    expect(fsChange).toBeDefined();
    expect(fsChange!.oldValue).toBe(16);
    expect(fsChange!.newValue).toBe(24);
  });

  it('detects text content change', () => {
    const baseline = makeNode({ type: 'TEXT', characters: 'Hello' });
    const current = makeNode({ type: 'TEXT', characters: 'World' });
    const changes = diffNodes(baseline, current);
    const textChange = changes.find(c => c.propertyPath === 'characters');
    expect(textChange).toBeDefined();
    expect(textChange!.changeType).toBe('modified');
  });

  it('detects corner radius change', () => {
    const baseline = makeNode({ cornerRadius: 4 });
    const current = makeNode({ cornerRadius: 12 });
    const changes = diffNodes(baseline, current);
    const crChange = changes.find(c => c.propertyPath === 'cornerRadius');
    expect(crChange).toBeDefined();
    expect(crChange!.oldValue).toBe(4);
    expect(crChange!.newValue).toBe(12);
  });

  it('detects spacing change', () => {
    const baseline = makeNode({ paddingTop: 8, itemSpacing: 4 });
    const current = makeNode({ paddingTop: 16, itemSpacing: 8 });
    const changes = diffNodes(baseline, current);
    expect(changes.find(c => c.propertyPath === 'paddingTop')).toBeDefined();
    expect(changes.find(c => c.propertyPath === 'itemSpacing')).toBeDefined();
  });

  it('detects added child', () => {
    const baseline = makeNode({ children: [] });
    const child = makeNode({ name: 'NewChild', type: 'RECTANGLE' });
    const current = makeNode({ children: [child] });
    const changes = diffNodes(baseline, current);
    const addedChild = changes.find(c => c.propertyPath === 'children.0');
    expect(addedChild).toBeDefined();
    expect(addedChild!.changeType).toBe('added');
  });

  it('detects removed child', () => {
    const child = makeNode({ name: 'OldChild', type: 'RECTANGLE' });
    const baseline = makeNode({ children: [child] });
    const current = makeNode({ children: [] });
    const changes = diffNodes(baseline, current);
    const removedChild = changes.find(c => c.propertyPath === 'children.0');
    expect(removedChild).toBeDefined();
    expect(removedChild!.changeType).toBe('removed');
  });

  it('detects changes in child nodes with correct path prefix', () => {
    const baseChild = makeNode({ name: 'Label', type: 'TEXT', characters: 'Old', fontSize: 14 });
    const currChild = makeNode({ name: 'Label', type: 'TEXT', characters: 'New', fontSize: 14 });
    const baseline = makeNode({ children: [baseChild] });
    const current = makeNode({ children: [currChild] });
    const changes = diffNodes(baseline, current);
    const textChange = changes.find(c => c.propertyPath === 'children.0.characters');
    expect(textChange).toBeDefined();
    expect(textChange!.changeType).toBe('modified');
  });

  it('returns empty for identical nested structures', () => {
    const child = makeNode({ name: 'Inner', type: 'RECTANGLE', cornerRadius: 4 });
    const node = makeNode({ children: [child] });
    const changes = diffNodes(node, node);
    expect(changes).toHaveLength(0);
  });
});

describe('describeChange', () => {
  it('generates color description', () => {
    expect(describeChange('fills.0.color.r', 0, 1)).toContain('Color changed');
  });

  it('generates font size description', () => {
    expect(describeChange('fontSize', 16, 24)).toContain('Font size changed');
  });

  it('generates text content description', () => {
    expect(describeChange('characters', 'old', 'new')).toContain('Text content changed');
  });

  it('generates spacing description', () => {
    expect(describeChange('paddingTop', 8, 16)).toContain('Spacing changed');
  });

  it('generates generic description for unknown paths', () => {
    expect(describeChange('visible', true, false)).toContain('Property visible changed');
  });
});
