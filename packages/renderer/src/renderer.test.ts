import { describe, it, expect, beforeAll } from 'vitest';
import { initializeRenderer, render, renderToFile, RenderError } from './renderer.js';
import { compile, compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { frame, text, rectangle, ellipse, group } from '@figma-dsl/core';
import { solid, gradient } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync } from 'fs';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const fontDir = join(__dirname2, '../../dsl-core/fonts');

beforeAll(() => {
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);
});

describe('render() — basic shapes', () => {
  it('renders a solid-filled frame', () => {
    const node = frame('Box', {
      size: { x: 100, y: 50 },
      fills: [solid('#ff0000')],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
  });

  it('renders a rectangle with corner radius', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('R', { size: { x: 80, y: 40 }, fills: [solid('#0000ff')], cornerRadius: 8 })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders an ellipse', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [ellipse('E', { size: { x: 60, y: 60 }, fills: [solid('#00ff00')] })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders a group (transparent container)', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [group('G', [rectangle('R', { size: { x: 50, y: 50 }, fills: [solid('#ff0000')] })])],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — text', () => {
  it('renders text nodes', () => {
    const node = frame('Root', {
      size: { x: 200, y: 50 },
      children: [text('Hello World', { fontSize: 16, fontWeight: 600, color: '#000000' })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders multiline text', () => {
    const node = frame('Root', {
      size: { x: 200, y: 100 },
      children: [text('Line 1\nLine 2\nLine 3', { fontSize: 14 })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders center-aligned text', () => {
    const node = frame('Root', {
      size: { x: 200, y: 50 },
      children: [text('Centered', { fontSize: 16, textAlignHorizontal: 'CENTER' })],
    });
    const compiled = compile(node);
    compiled.root.children[0]!.size = { x: 200, y: 19 };
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — gradients', () => {
  it('renders linear gradient fills', () => {
    const node = frame('GradBox', {
      size: { x: 200, y: 100 },
      fills: [gradient([
        { hex: '#7c3aed', position: 0 },
        { hex: '#4f46e5', position: 1 },
      ])],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders gradient with angle', () => {
    const node = frame('AngleGrad', {
      size: { x: 200, y: 100 },
      fills: [gradient([
        { hex: '#000000', position: 0 },
        { hex: '#ffffff', position: 1 },
      ], 45)],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — strokes', () => {
  it('renders stroked rectangle', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('Bordered', {
        size: { x: 80, y: 40 },
        fills: [solid('#ffffff')],
        strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
      })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — visibility', () => {
  it('skips invisible nodes', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      fills: [solid('#ffffff')],
      children: [
        rectangle('Hidden', { size: { x: 50, y: 50 }, fills: [solid('#ff0000')], visible: false }),
      ],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — scale', () => {
  it('renders at 2x scale', () => {
    const node = frame('Box', {
      size: { x: 100, y: 50 },
      fills: [solid('#ffffff')],
    });
    const compiled = compile(node);
    const result = render(compiled.root, { scale: 2 });
    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
  });
});

describe('render() — with layout', () => {
  it('renders a button with auto-layout', () => {
    const button = frame('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      cornerRadius: 8,
      children: [
        text('Click me', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
      ],
    });
    const compiled = compileWithLayout(button, textMeasurer);
    const result = render(compiled.root);
    expect(result.width).toBeGreaterThan(50);
    expect(result.height).toBeGreaterThan(20);
  });
});

describe('renderToFile()', () => {
  it('writes PNG to file', () => {
    const outPath = join(__dirname2, '../../../test-output.png');
    const node = frame('Box', {
      size: { x: 50, y: 50 },
      fills: [solid('#ff0000')],
    });
    const compiled = compile(node);
    const result = renderToFile(compiled.root, outPath);
    expect(existsSync(outPath)).toBe(true);
    expect(result.width).toBe(50);
    // Cleanup
    unlinkSync(outPath);
  });
});

describe('render() — error handling', () => {
  it('throws RenderError for zero-size canvas', () => {
    const node = frame('Empty', {});
    const compiled = compile(node);
    expect(() => render(compiled.root)).toThrow(RenderError);
  });
});
