import { describe, it, expect } from 'vitest';
import {
  frame,
  text,
  rectangle,
  ellipse,
  group,
} from '../nodes.js';
import type { DslNode } from '../types.js';

describe('Node factory functions', () => {
  describe('frame()', () => {
    it('creates a FRAME node with name and defaults', () => {
      const node = frame('Container', {});
      expect(node.type).toBe('FRAME');
      expect(node.name).toBe('Container');
      expect(node.visible).toBe(true);
      expect(node.opacity).toBe(1);
      expect(node.children).toEqual([]);
    });

    it('accepts size, fills, strokes, cornerRadius, opacity, visibility, clipContent', () => {
      const node = frame('Card', {
        size: { x: 300, y: 200 },
        cornerRadius: 16,
        opacity: 0.8,
        visible: false,
        clipContent: true,
      });
      expect(node.size).toEqual({ x: 300, y: 200 });
      expect(node.cornerRadius).toBe(16);
      expect(node.opacity).toBe(0.8);
      expect(node.visible).toBe(false);
      expect(node.clipContent).toBe(true);
    });

    it('accepts per-corner radii via cornerRadii', () => {
      const node = frame('Card', {
        cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
      });
      expect(node.cornerRadii).toEqual({
        topLeft: 8,
        topRight: 8,
        bottomLeft: 0,
        bottomRight: 0,
      });
    });

    it('produces correct parent-child hierarchy with children', () => {
      const child = rectangle('Inner', { size: { x: 50, y: 50 } });
      const parent = frame('Outer', { children: [child] });
      expect(parent.children).toHaveLength(1);
      expect(parent.children![0]!.name).toBe('Inner');
    });

    it('defensively copies children array', () => {
      const children: DslNode[] = [rectangle('A', { size: { x: 10, y: 10 } })];
      const node = frame('F', { children });
      children.push(rectangle('B', { size: { x: 10, y: 10 } }));
      expect(node.children).toHaveLength(1);
    });
  });

  describe('text()', () => {
    it('creates a TEXT node with characters', () => {
      const node = text('Hello World');
      expect(node.type).toBe('TEXT');
      expect(node.name).toBe('Hello World');
      expect(node.characters).toBe('Hello World');
      expect(node.visible).toBe(true);
    });

    it('accepts textStyle options', () => {
      const node = text('Title', {
        fontSize: 24,
        fontWeight: 700,
        fontFamily: 'Inter',
        textAlignHorizontal: 'CENTER',
      });
      expect(node.textStyle).toEqual({
        fontSize: 24,
        fontWeight: 700,
        fontFamily: 'Inter',
        textAlignHorizontal: 'CENTER',
      });
    });

    it('accepts explicit name override', () => {
      const node = text('Hello', { fontSize: 14 }, 'Label');
      expect(node.name).toBe('Label');
      expect(node.characters).toBe('Hello');
    });
  });

  describe('rectangle()', () => {
    it('creates a RECTANGLE node with name and size', () => {
      const node = rectangle('Box', { size: { x: 100, y: 50 } });
      expect(node.type).toBe('RECTANGLE');
      expect(node.name).toBe('Box');
      expect(node.size).toEqual({ x: 100, y: 50 });
    });

    it('accepts fills, strokes, cornerRadius, opacity', () => {
      const node = rectangle('Rect', {
        size: { x: 100, y: 100 },
        cornerRadius: 8,
        opacity: 0.5,
      });
      expect(node.cornerRadius).toBe(8);
      expect(node.opacity).toBe(0.5);
    });
  });

  describe('ellipse()', () => {
    it('creates an ELLIPSE node with name and size', () => {
      const node = ellipse('Circle', { size: { x: 40, y: 40 } });
      expect(node.type).toBe('ELLIPSE');
      expect(node.name).toBe('Circle');
      expect(node.size).toEqual({ x: 40, y: 40 });
    });

    it('accepts fills and opacity', () => {
      const node = ellipse('Dot', {
        size: { x: 8, y: 8 },
        opacity: 0.7,
      });
      expect(node.opacity).toBe(0.7);
    });
  });

  describe('group()', () => {
    it('creates a GROUP node with children', () => {
      const child1 = rectangle('A', { size: { x: 10, y: 10 } });
      const child2 = rectangle('B', { size: { x: 20, y: 20 } });
      const node = group('MyGroup', [child1, child2]);
      expect(node.type).toBe('GROUP');
      expect(node.name).toBe('MyGroup');
      expect(node.children).toHaveLength(2);
    });

    it('defensively copies children array', () => {
      const children: DslNode[] = [rectangle('A', { size: { x: 10, y: 10 } })];
      const node = group('G', children);
      children.push(rectangle('B', { size: { x: 10, y: 10 } }));
      expect(node.children).toHaveLength(1);
    });
  });

  describe('Validation', () => {
    it('throws on empty name for frame', () => {
      expect(() => frame('', {})).toThrow('name');
    });

    it('throws on empty name for rectangle', () => {
      expect(() => rectangle('', { size: { x: 10, y: 10 } })).toThrow('name');
    });

    it('throws on empty name for ellipse', () => {
      expect(() => ellipse('', { size: { x: 10, y: 10 } })).toThrow('name');
    });

    it('throws on empty name for group', () => {
      expect(() => group('', [])).toThrow('name');
    });

    it('throws on empty characters for text', () => {
      expect(() => text('')).toThrow('characters');
    });

    it('throws on negative size values', () => {
      expect(() => frame('F', { size: { x: -1, y: 10 } })).toThrow('size');
    });

    it('throws on zero size values', () => {
      expect(() => rectangle('R', { size: { x: 0, y: 10 } })).toThrow('size');
    });
  });

  describe('Immutability', () => {
    it('node objects are frozen', () => {
      const node = frame('F', {});
      expect(Object.isFrozen(node)).toBe(true);
    });

    it('children arrays in returned node are frozen', () => {
      const node = frame('F', {
        children: [rectangle('R', { size: { x: 10, y: 10 } })],
      });
      expect(Object.isFrozen(node.children)).toBe(true);
    });
  });
});
