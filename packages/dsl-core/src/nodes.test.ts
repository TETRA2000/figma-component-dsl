import { describe, it, expect } from 'vitest';
import { frame, text, rectangle, ellipse, group, line, section, polygon, star, union, subtract, intersect, exclude } from './nodes.js';
import type { DslNode } from './types.js';
import { solid } from './colors.js';

describe('frame()', () => {
  it('creates a FRAME node with name and defaults', () => {
    const node = frame('Container', {});
    expect(node.type).toBe('FRAME');
    expect(node.name).toBe('Container');
    expect(node.visible).toBe(true);
    expect(node.opacity).toBe(1);
  });

  it('creates a FRAME with size and fills', () => {
    const fill = solid('#ff0000');
    const node = frame('Box', {
      size: { x: 100, y: 50 },
      fills: [fill],
    });
    expect(node.size).toEqual({ x: 100, y: 50 });
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe('SOLID');
  });

  it('creates a FRAME with corner radius', () => {
    const node = frame('Rounded', { cornerRadius: 8 });
    expect(node.cornerRadius).toBe(8);
  });

  it('creates a FRAME with per-corner radii', () => {
    const node = frame('Mixed', {
      cornerRadii: { topLeft: 4, topRight: 8, bottomLeft: 0, bottomRight: 12 },
    });
    expect(node.cornerRadii).toEqual({ topLeft: 4, topRight: 8, bottomLeft: 0, bottomRight: 12 });
  });

  it('creates a FRAME with children (defensively copied)', () => {
    const child = rectangle('R', { size: { x: 10, y: 10 } });
    const children = [child];
    const node = frame('Parent', { children });
    children.push(rectangle('R2', { size: { x: 20, y: 20 } }));
    expect(node.children).toHaveLength(1);
  });

  it('creates a FRAME with clipContent', () => {
    const node = frame('Clipped', { clipContent: true });
    expect(node.clipContent).toBe(true);
  });

  it('creates a FRAME with visibility false', () => {
    const node = frame('Hidden', { visible: false });
    expect(node.visible).toBe(false);
  });

  it('throws on empty name', () => {
    expect(() => frame('', {})).toThrow();
  });

  it('supports auto-layout config', () => {
    const node = frame('AutoLayout', {
      autoLayout: { direction: 'HORIZONTAL', spacing: 8 },
    });
    expect(node.autoLayout?.direction).toBe('HORIZONTAL');
    expect(node.autoLayout?.spacing).toBe(8);
  });

  it('supports child layout props', () => {
    const node = frame('Fill', {
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'HUG',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
    expect(node.layoutSizingVertical).toBe('HUG');
  });
});

describe('text()', () => {
  it('creates a TEXT node with characters', () => {
    const node = text('Hello');
    expect(node.type).toBe('TEXT');
    expect(node.characters).toBe('Hello');
    expect(node.name).toBe('Hello');
  });

  it('creates a TEXT node with style', () => {
    const node = text('Title', {
      fontSize: 24,
      fontWeight: 700,
      color: '#000000',
    });
    expect(node.textStyle?.fontSize).toBe(24);
    expect(node.textStyle?.fontWeight).toBe(700);
    expect(node.textStyle?.color).toBe('#000000');
  });

  it('accepts child layout props on text', () => {
    const node = text('Fill Text', {
      fontSize: 14,
      layoutSizingHorizontal: 'FILL',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
  });

  it('throws on empty characters', () => {
    expect(() => text('')).toThrow();
  });
});

describe('rectangle()', () => {
  it('creates a RECTANGLE node', () => {
    const node = rectangle('Rect', { size: { x: 100, y: 50 } });
    expect(node.type).toBe('RECTANGLE');
    expect(node.name).toBe('Rect');
    expect(node.size).toEqual({ x: 100, y: 50 });
  });

  it('supports fills, strokes, corner radius', () => {
    const node = rectangle('Styled', {
      fills: [solid('#0000ff')],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 }],
      cornerRadius: 4,
    });
    expect(node.fills).toHaveLength(1);
    expect(node.strokes).toHaveLength(1);
    expect(node.cornerRadius).toBe(4);
  });

  it('throws on empty name', () => {
    expect(() => rectangle('', {})).toThrow();
  });
});

describe('ellipse()', () => {
  it('creates an ELLIPSE node', () => {
    const node = ellipse('Circle', { size: { x: 40, y: 40 } });
    expect(node.type).toBe('ELLIPSE');
    expect(node.name).toBe('Circle');
    expect(node.size).toEqual({ x: 40, y: 40 });
  });

  it('supports fills and opacity', () => {
    const node = ellipse('Dot', {
      fills: [solid('#ff0000')],
      opacity: 0.5,
    });
    expect(node.fills).toHaveLength(1);
    expect(node.opacity).toBe(0.5);
  });

  it('throws on empty name', () => {
    expect(() => ellipse('', {})).toThrow();
  });
});

describe('group()', () => {
  it('creates a GROUP node with children', () => {
    const child1 = rectangle('R1', { size: { x: 10, y: 10 } });
    const child2 = rectangle('R2', { size: { x: 20, y: 20 } });
    const node = group('MyGroup', [child1, child2]);
    expect(node.type).toBe('GROUP');
    expect(node.name).toBe('MyGroup');
    expect(node.children).toHaveLength(2);
  });

  it('defensively copies children', () => {
    const children: DslNode[] = [rectangle('R', { size: { x: 10, y: 10 } })];
    const node = group('G', children);
    children.push(rectangle('R2', { size: { x: 20, y: 20 } }));
    expect(node.children).toHaveLength(1);
  });

  it('throws on empty name', () => {
    expect(() => group('', [])).toThrow();
  });
});

describe('line()', () => {
  it('creates a LINE node with defaults', () => {
    const node = line('Divider');
    expect(node.type).toBe('LINE');
    expect(node.name).toBe('Divider');
    expect(node.visible).toBe(true);
    expect(node.opacity).toBe(1);
    expect(node.size).toEqual({ x: 0, y: 0 });
  });

  it('defaults to 1px black stroke when no strokes provided', () => {
    const node = line('Divider');
    expect(node.strokes).toHaveLength(1);
    expect(node.strokes![0]!.color).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(node.strokes![0]!.weight).toBe(1);
  });

  it('uses provided strokes', () => {
    const node = line('Divider', {
      strokes: [{ color: { r: 1, g: 0, b: 0, a: 1 }, weight: 2 }],
    });
    expect(node.strokes).toHaveLength(1);
    expect(node.strokes![0]!.color.r).toBe(1);
    expect(node.strokes![0]!.weight).toBe(2);
  });

  it('sets height to 0', () => {
    const node = line('Divider', { size: { x: 200 } });
    expect(node.size).toEqual({ x: 200, y: 0 });
  });

  it('throws on empty name', () => {
    expect(() => line('')).toThrow();
  });
});

describe('section()', () => {
  it('creates a SECTION node', () => {
    const node = section('My Section');
    expect(node.type).toBe('SECTION');
    expect(node.name).toBe('My Section');
    expect(node.visible).toBe(true);
  });

  it('does not include opacity, strokes, or autoLayout', () => {
    const node = section('S', {
      size: { x: 200, y: 200 },
      fills: [solid('#eeeeee')],
    });
    expect(node.opacity).toBeUndefined();
    expect(node.strokes).toBeUndefined();
    expect(node.autoLayout).toBeUndefined();
  });

  it('supports contentsHidden', () => {
    const node = section('S', { contentsHidden: true });
    expect(node.contentsHidden).toBe(true);
  });

  it('supports children', () => {
    const child = rectangle('R', { size: { x: 50, y: 50 } });
    const node = section('S', { children: [child] });
    expect(node.children).toHaveLength(1);
  });

  it('throws on empty name', () => {
    expect(() => section('')).toThrow();
  });
});

describe('polygon()', () => {
  it('creates a POLYGON node', () => {
    const node = polygon('Hex', { pointCount: 6, size: { x: 100, y: 100 } });
    expect(node.type).toBe('POLYGON');
    expect(node.pointCount).toBe(6);
  });

  it('throws when pointCount < 3', () => {
    expect(() => polygon('Bad', { pointCount: 2 })).toThrow('pointCount must be an integer >= 3');
  });

  it('throws when pointCount is not integer', () => {
    expect(() => polygon('Bad', { pointCount: 3.5 })).toThrow('pointCount must be an integer >= 3');
  });

  it('supports fills, strokes, cornerRadius, rotation', () => {
    const node = polygon('Tri', {
      pointCount: 3,
      fills: [solid('#ff0000')],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 }],
      cornerRadius: 4,
      rotation: 45,
    });
    expect(node.fills).toHaveLength(1);
    expect(node.strokes).toHaveLength(1);
    expect(node.cornerRadius).toBe(4);
    expect(node.rotation).toBe(45);
  });

  it('throws on empty name', () => {
    expect(() => polygon('', { pointCount: 3 })).toThrow();
  });
});

describe('star()', () => {
  it('creates a STAR node with default innerRadius', () => {
    const node = star('Star', { pointCount: 5, size: { x: 100, y: 100 } });
    expect(node.type).toBe('STAR');
    expect(node.pointCount).toBe(5);
    expect(node.innerRadius).toBeCloseTo(0.382);
  });

  it('uses custom innerRadius', () => {
    const node = star('Star', { pointCount: 5, innerRadius: 0.5 });
    expect(node.innerRadius).toBe(0.5);
  });

  it('throws when pointCount < 3', () => {
    expect(() => star('Bad', { pointCount: 1 })).toThrow('pointCount must be an integer >= 3');
  });

  it('throws on empty name', () => {
    expect(() => star('', { pointCount: 5 })).toThrow();
  });
});

describe('boolean operations', () => {
  const child1 = rectangle('R1', { size: { x: 50, y: 50 } });
  const child2 = ellipse('E1', { size: { x: 50, y: 50 } });

  it('creates UNION', () => {
    const node = union('U', { children: [child1, child2] });
    expect(node.type).toBe('BOOLEAN_OPERATION');
    expect(node.booleanOperation).toBe('UNION');
    expect(node.children).toHaveLength(2);
  });

  it('creates SUBTRACT', () => {
    const node = subtract('S', { children: [child1, child2] });
    expect(node.booleanOperation).toBe('SUBTRACT');
  });

  it('creates INTERSECT', () => {
    const node = intersect('I', { children: [child1, child2] });
    expect(node.booleanOperation).toBe('INTERSECT');
  });

  it('creates EXCLUDE', () => {
    const node = exclude('E', { children: [child1, child2] });
    expect(node.booleanOperation).toBe('EXCLUDE');
  });

  it('throws when fewer than 2 children', () => {
    expect(() => union('Bad', { children: [child1] })).toThrow('at least 2 children');
  });

  it('throws on empty children', () => {
    expect(() => union('Bad', { children: [] })).toThrow('at least 2 children');
  });

  it('throws on empty name', () => {
    expect(() => union('', { children: [child1, child2] })).toThrow();
  });

  it('supports optional fills and strokes', () => {
    const node = union('U', {
      children: [child1, child2],
      fills: [solid('#ff0000')],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
    });
    expect(node.fills).toHaveLength(1);
    expect(node.strokes).toHaveLength(1);
  });
});

describe('node hierarchy', () => {
  it('creates a nested tree structure', () => {
    const tree = frame('Root', {
      children: [
        frame('Row', {
          autoLayout: { direction: 'HORIZONTAL' },
          children: [
            text('Label', { fontSize: 14 }),
            rectangle('Icon', { size: { x: 16, y: 16 } }),
          ],
        }),
      ],
    });
    expect(tree.children).toHaveLength(1);
    expect(tree.children![0]!.children).toHaveLength(2);
    expect(tree.children![0]!.children![0]!.type).toBe('TEXT');
    expect(tree.children![0]!.children![1]!.type).toBe('RECTANGLE');
  });
});
