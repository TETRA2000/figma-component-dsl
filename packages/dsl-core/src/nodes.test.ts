import { describe, it, expect } from 'vitest';
import { frame, text, rectangle, ellipse, group } from './nodes.js';
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
