import { describe, it, expect } from 'vitest';
import { compile, compileToJson } from '../compiler.js';
import type { DslNode } from '../../../dsl-core/src/types.js';

function makeFrame(name: string, children: DslNode[] = []): DslNode {
  return Object.freeze({
    type: 'FRAME' as const,
    name,
    opacity: 1,
    visible: true,
    children: Object.freeze(children),
  });
}

function makeText(characters: string): DslNode {
  return Object.freeze({
    type: 'TEXT' as const,
    name: characters,
    characters,
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
  });
}

function makeRect(name: string, w: number, h: number): DslNode {
  return Object.freeze({
    type: 'RECTANGLE' as const,
    name,
    size: { x: w, y: h },
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
  });
}

describe('Compiler — GUID assignment and tree structure', () => {
  it('assigns counter-based GUIDs starting from [0, 0]', () => {
    const node = makeFrame('Root');
    const result = compile(node);
    expect(result.root.guid).toEqual([0, 0]);
    expect(result.nodeCount).toBe(1);
  });

  it('assigns sequential GUIDs to children depth-first', () => {
    const child1 = makeRect('A', 10, 10);
    const child2 = makeRect('B', 20, 20);
    const root = makeFrame('Root', [child1, child2]);
    const result = compile(root);

    expect(result.root.guid).toEqual([0, 0]);
    expect(result.root.children[0]!.guid).toEqual([0, 1]);
    expect(result.root.children[1]!.guid).toEqual([0, 2]);
    expect(result.nodeCount).toBe(3);
  });

  it('assigns GUIDs in deep nested trees', () => {
    const leaf = makeRect('Leaf', 5, 5);
    const inner = makeFrame('Inner', [leaf]);
    const root = makeFrame('Root', [inner]);
    const result = compile(root);

    expect(result.root.guid).toEqual([0, 0]);
    expect(result.root.children[0]!.guid).toEqual([0, 1]);
    expect(result.root.children[0]!.children[0]!.guid).toEqual([0, 2]);
    expect(result.nodeCount).toBe(3);
  });

  it('sets parentIndex on child nodes', () => {
    const child = makeRect('Child', 10, 10);
    const root = makeFrame('Root', [child]);
    const result = compile(root);

    expect(result.root.parentIndex).toBeUndefined();
    expect(result.root.children[0]!.parentIndex).toEqual({
      guid: [0, 0],
      position: '0',
    });
  });

  it('sets correct position for multiple children', () => {
    const a = makeRect('A', 10, 10);
    const b = makeRect('B', 10, 10);
    const c = makeRect('C', 10, 10);
    const root = makeFrame('Root', [a, b, c]);
    const result = compile(root);

    expect(result.root.children[0]!.parentIndex!.position).toBe('0');
    expect(result.root.children[1]!.parentIndex!.position).toBe('1');
    expect(result.root.children[2]!.parentIndex!.position).toBe('2');
  });

  it('produces deterministic output for snapshot testing', () => {
    const node = makeFrame('Root', [makeRect('A', 10, 10)]);
    const result1 = compile(node);
    const result2 = compile(node);
    expect(result1.root.guid).toEqual(result2.root.guid);
    expect(result1.root.children[0]!.guid).toEqual(result2.root.children[0]!.guid);
  });
});

describe('Compiler — Node type mapping', () => {
  it('maps FRAME type correctly', () => {
    const result = compile(makeFrame('F'));
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('F');
  });

  it('maps TEXT type correctly', () => {
    const result = compile(makeText('Hello'));
    expect(result.root.type).toBe('TEXT');
  });

  it('maps RECTANGLE type correctly', () => {
    const result = compile(makeRect('R', 10, 10));
    expect(result.root.type).toBe('RECTANGLE');
  });

  it('preserves size, opacity, visible properties', () => {
    const node: DslNode = Object.freeze({
      type: 'RECTANGLE' as const,
      name: 'R',
      size: { x: 100, y: 50 },
      opacity: 0.8,
      visible: false,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.size).toEqual({ x: 100, y: 50 });
    expect(result.root.opacity).toBe(0.8);
    expect(result.root.visible).toBe(false);
  });
});

describe('Compiler — Fill conversion', () => {
  it('converts SolidFill to fillPaints', () => {
    const node: DslNode = Object.freeze({
      type: 'RECTANGLE' as const,
      name: 'R',
      size: { x: 10, y: 10 },
      fills: Object.freeze([
        Object.freeze({
          type: 'SOLID' as const,
          color: Object.freeze({ r: 1, g: 0, b: 0, a: 1 }),
          opacity: 1,
          visible: true,
        }),
      ]),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    expect(result.root.fillPaints[0]!.color).toEqual({ r: 1, g: 0, b: 0, a: 1 });
  });

  it('converts GradientFill to fillPaints', () => {
    const node: DslNode = Object.freeze({
      type: 'RECTANGLE' as const,
      name: 'R',
      size: { x: 10, y: 10 },
      fills: Object.freeze([
        Object.freeze({
          type: 'GRADIENT_LINEAR' as const,
          gradientStops: Object.freeze([
            Object.freeze({ color: Object.freeze({ r: 1, g: 0, b: 0, a: 1 }), position: 0 }),
            Object.freeze({ color: Object.freeze({ r: 0, g: 0, b: 1, a: 1 }), position: 1 }),
          ]),
          gradientTransform: Object.freeze([
            Object.freeze([1, 0, 0] as const),
            Object.freeze([0, 1, 0] as const),
          ] as const),
          opacity: 1,
          visible: true,
        }),
      ]),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    expect(result.root.fillPaints[0]!.gradientStops).toHaveLength(2);
  });

  it('preserves fill array ordering', () => {
    const node: DslNode = Object.freeze({
      type: 'RECTANGLE' as const,
      name: 'R',
      size: { x: 10, y: 10 },
      fills: Object.freeze([
        Object.freeze({ type: 'SOLID' as const, color: Object.freeze({ r: 1, g: 0, b: 0, a: 1 }), opacity: 1, visible: true }),
        Object.freeze({ type: 'SOLID' as const, color: Object.freeze({ r: 0, g: 1, b: 0, a: 1 }), opacity: 1, visible: true }),
      ]),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.color!.r).toBe(1);
    expect(result.root.fillPaints[1]!.color!.g).toBe(1);
  });

  it('converts strokes to strokeWeight and stroke entries', () => {
    const node: DslNode = Object.freeze({
      type: 'RECTANGLE' as const,
      name: 'R',
      size: { x: 10, y: 10 },
      strokes: Object.freeze([
        Object.freeze({ color: Object.freeze({ r: 0, g: 0, b: 0, a: 1 }), weight: 2 }),
      ]),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.strokeWeight).toBe(2);
    expect(result.root.strokes).toHaveLength(1);
  });
});

describe('Compiler — Transform matrices', () => {
  it('root node has identity transform', () => {
    const result = compile(makeFrame('Root'));
    expect(result.root.transform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('child nodes without auto-layout have identity transform (position not explicitly set)', () => {
    const child = makeRect('Child', 10, 10);
    const root = makeFrame('Root', [child]);
    const result = compile(root);
    // Without explicit position or auto-layout, child is at (0,0) relative to parent
    expect(result.root.children[0]!.transform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });
});

describe('Compiler — Auto-layout passthrough', () => {
  it('passes through auto-layout config as stackMode, itemSpacing, padding', () => {
    const node: DslNode = Object.freeze({
      type: 'FRAME' as const,
      name: 'F',
      autoLayout: Object.freeze({
        direction: 'HORIZONTAL' as const,
        spacing: 8,
        padX: 16,
        padY: 8,
        align: 'CENTER' as const,
        counterAlign: 'CENTER' as const,
      }),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.stackMode).toBe('HORIZONTAL');
    expect(result.root.itemSpacing).toBe(8);
    expect(result.root.paddingLeft).toBe(16);
    expect(result.root.paddingRight).toBe(16);
    expect(result.root.paddingTop).toBe(8);
    expect(result.root.paddingBottom).toBe(8);
    expect(result.root.primaryAxisAlignItems).toBe('CENTER');
    expect(result.root.counterAxisAlignItems).toBe('CENTER');
  });
});

describe('Compiler — Component compilation', () => {
  it('compiles COMPONENT with componentPropertyDefinitions', () => {
    const node: DslNode = Object.freeze({
      type: 'COMPONENT' as const,
      name: 'Button',
      componentProperties: Object.freeze([
        Object.freeze({ name: 'Label', type: 'TEXT' as const, defaultValue: 'Button' }),
      ]),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.componentPropertyDefinitions).toEqual({
      Label: { type: 'TEXT', defaultValue: 'Button' },
    });
  });

  it('compiles INSTANCE with componentId and overriddenProperties', () => {
    const inst: DslNode = Object.freeze({
      type: 'INSTANCE' as const,
      name: 'Button',
      componentRef: 'Button',
      propertyOverrides: Object.freeze({ Label: 'Submit' }),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const root: DslNode = Object.freeze({
      type: 'FRAME' as const,
      name: 'Root',
      opacity: 1,
      visible: true,
      children: Object.freeze([inst]),
    });
    const result = compile(root);
    const compiled = result.root.children[0]!;
    expect(compiled.type).toBe('INSTANCE');
    expect(compiled.componentId).toBe('Button');
    expect(compiled.overriddenProperties).toEqual({ Label: 'Submit' });
  });
});

describe('Compiler — Text data expansion with letterSpacing', () => {
  it('includes letterSpacing in compiled text node', () => {
    const node: DslNode = Object.freeze({
      type: 'TEXT' as const,
      name: 'Spaced',
      characters: 'Hello',
      textStyle: Object.freeze({
        fontSize: 16,
        letterSpacing: Object.freeze({ value: 2, unit: 'PIXELS' as const }),
      }),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.letterSpacing).toEqual({ value: 2, unit: 'PIXELS' });
  });

  it('omits letterSpacing when not specified', () => {
    const node: DslNode = Object.freeze({
      type: 'TEXT' as const,
      name: 'Normal',
      characters: 'Hello',
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.letterSpacing).toBeUndefined();
  });
});

describe('Compiler — Per-corner cornerRadii', () => {
  it('passes cornerRadii through to compiled node', () => {
    const node: DslNode = Object.freeze({
      type: 'FRAME' as const,
      name: 'RoundedFrame',
      size: { x: 100, y: 100 },
      cornerRadii: Object.freeze({ topLeft: 8, topRight: 16, bottomLeft: 4, bottomRight: 12 }),
      opacity: 1,
      visible: true,
      children: Object.freeze([]),
    });
    const result = compile(node);
    expect(result.root.cornerRadii).toEqual({ topLeft: 8, topRight: 16, bottomLeft: 4, bottomRight: 12 });
  });

  it('omits cornerRadii when not specified', () => {
    const node = makeFrame('F');
    const result = compile(node);
    expect(result.root.cornerRadii).toBeUndefined();
  });
});

describe('Compiler — compileToJson', () => {
  it('produces valid JSON string', () => {
    const node = makeFrame('Root', [makeRect('R', 10, 10)]);
    const json = compileToJson(node);
    const parsed = JSON.parse(json);
    expect(parsed.root.guid).toEqual([0, 0]);
    expect(parsed.root.children[0].guid).toEqual([0, 1]);
    expect(parsed.nodeCount).toBe(2);
  });
});

describe('Compiler — Error accumulation', () => {
  it('returns empty errors array for valid input', () => {
    const result = compile(makeFrame('Root'));
    expect(result.errors).toEqual([]);
  });
});
