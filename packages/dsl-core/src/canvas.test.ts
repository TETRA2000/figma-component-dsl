import { describe, it, expect } from 'vitest';
import { canvas, frame, text } from './nodes.js';

describe('canvas()', () => {
  it('creates a FRAME node with isCanvas and canvasName', () => {
    const node = canvas('Banner');
    expect(node.type).toBe('FRAME');
    expect(node.isCanvas).toBe(true);
    expect(node.canvasName).toBe('Banner');
    expect(node.name).toBe('Banner');
    expect(node.visible).toBe(true);
    expect(node.opacity).toBe(1);
  });

  it('throws on empty name', () => {
    expect(() => canvas('')).toThrow('Canvas name must be a non-empty string');
  });

  it('accepts children from props', () => {
    const children = [text('Hello'), text('World')];
    const node = canvas('Content', { children });
    expect(node.children).toHaveLength(2);
    expect(node.children![0]!.characters).toBe('Hello');
    expect(node.children![1]!.characters).toBe('World');
  });

  it('accepts size option', () => {
    const node = canvas('Banner', { size: { x: 300, y: 200 } });
    expect(node.size).toEqual({ x: 300, y: 200 });
  });

  it('accepts autoLayout option', () => {
    const node = canvas('Banner', {
      autoLayout: { direction: 'VERTICAL', spacing: 16 },
    });
    expect(node.autoLayout).toEqual({ direction: 'VERTICAL', spacing: 16 });
  });

  it('accepts fills option', () => {
    const fill = { type: 'SOLID' as const, color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1, visible: true };
    const node = canvas('Banner', { fills: [fill] });
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe('SOLID');
  });

  it('accepts cornerRadius option', () => {
    const node = canvas('Banner', { cornerRadius: 8 });
    expect(node.cornerRadius).toBe(8);
  });

  it('accepts layout sizing options', () => {
    const node = canvas('Banner', {
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FIXED',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
    expect(node.layoutSizingVertical).toBe('FIXED');
  });

  it('accepts scale option', () => {
    const node = canvas('Banner', { scale: 2 });
    expect(node.canvasScale).toBe(2);
  });

  it('creates a canvas with no options (all defaults)', () => {
    const node = canvas('Empty');
    expect(node.isCanvas).toBe(true);
    expect(node.children).toBeUndefined();
    expect(node.size).toBeUndefined();
    expect(node.autoLayout).toBeUndefined();
    expect(node.canvasScale).toBeUndefined();
  });

  it('regular frame does not have canvas fields', () => {
    const node = frame('Regular', {});
    expect(node.isCanvas).toBeUndefined();
    expect(node.canvasName).toBeUndefined();
    expect(node.canvasScale).toBeUndefined();
  });
});
