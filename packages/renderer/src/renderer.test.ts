import { describe, it, expect, beforeAll } from 'vitest';
import { initializeRenderer, render, renderToFile, RenderError } from './renderer.js';
import { compile, compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { frame, text, rectangle, ellipse, group, image } from '@figma-dsl/core';
import { solid, gradient, radialGradient, imageFill } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync } from 'fs';
import { createCanvas } from '@napi-rs/canvas';
import type { ImageCache } from './image-loader.js';

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

  it('renders a frame with per-corner radii', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      fills: [solid('#0000ff')],
      cornerRadii: { topLeft: 0, topRight: 12, bottomLeft: 0, bottomRight: 12 },
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders a rectangle with per-corner radii', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('R', {
        size: { x: 80, y: 40 },
        fills: [solid('#00ff00')],
        cornerRadii: { topLeft: 4, topRight: 8, bottomLeft: 0, bottomRight: 16 },
      })],
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

describe('render() — multi-stroke', () => {
  it('renders multiple strokes on a rectangle', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('MultiStroke', {
        size: { x: 80, y: 40 },
        fills: [solid('#ffffff')],
        strokes: [
          { color: { r: 1, g: 0, b: 0, a: 1 }, weight: 3 },
          { color: { r: 0, g: 0, b: 1, a: 1 }, weight: 1 },
        ],
      })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — stroke alignment', () => {
  it('renders INSIDE stroke', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('Inside', {
        size: { x: 80, y: 40 },
        fills: [solid('#ffffff')],
        strokes: [{ color: { r: 1, g: 0, b: 0, a: 1 }, weight: 4, align: 'INSIDE' }],
      })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders OUTSIDE stroke', () => {
    const node = frame('Root', {
      size: { x: 100, y: 100 },
      children: [rectangle('Outside', {
        size: { x: 60, y: 30 },
        fills: [solid('#ffffff')],
        strokes: [{ color: { r: 0, g: 1, b: 0, a: 1 }, weight: 4, align: 'OUTSIDE' }],
      })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — text decoration', () => {
  it('renders underlined text', () => {
    const node = frame('Root', {
      size: { x: 200, y: 50 },
      children: [text('Underlined', { fontSize: 16, color: '#000000', textDecoration: 'UNDERLINE' })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders strikethrough text', () => {
    const node = frame('Root', {
      size: { x: 200, y: 50 },
      children: [text('Strikethrough', { fontSize: 16, color: '#000000', textDecoration: 'STRIKETHROUGH' })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — radial gradient', () => {
  it('renders radial gradient fill', () => {
    const node = frame('RadialBox', {
      size: { x: 200, y: 200 },
      fills: [radialGradient([
        { hex: '#ff0000', position: 0 },
        { hex: '#0000ff', position: 1 },
      ])],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — debug layout overlay', () => {
  it('renders without error with debugLayout=true', () => {
    const node = frame('DebugRoot', {
      size: { x: 200, y: 100 },
      fills: [solid('#ffffff')],
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      children: [
        text('Hello', { fontSize: 14, color: '#000000' }),
      ],
    });
    const compiled = compileWithLayout(node, textMeasurer);
    const result = render(compiled.root, { debugLayout: true });
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — CJK text', () => {
  it('renders Japanese text without error', () => {
    const node = frame('Root', {
      size: { x: 300, y: 50 },
      children: [text('こんにちは世界', { fontSize: 16, color: '#000000' })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });
});

describe('render() — canvas pooling', () => {
  it('renders correctly across multiple same-sized renders', () => {
    const node = frame('Box', {
      size: { x: 100, y: 50 },
      fills: [solid('#ff0000')],
    });
    // Render multiple times with same dimensions to exercise pooling
    for (let i = 0; i < 5; i++) {
      const compiled = compile(node);
      const result = render(compiled.root);
      expect(result.width).toBe(100);
      expect(result.height).toBe(50);
    }
  });
});

// Helper: create a small test image as an Image object
function createTestImage(width: number, height: number) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

describe('render() — IMAGE nodes', () => {
  it('renders IMAGE node with placeholder when no cache', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 100, y: 80 } });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
    expect(result.width).toBe(100);
    expect(result.height).toBe(80);
  });

  it('renders IMAGE node with placeholder when image not in cache', () => {
    const node = image('Photo', { src: './missing.png', size: { x: 100, y: 80 } });
    const compiled = compile(node);
    const emptyCache: ImageCache = new Map();
    const result = render(compiled.root, { imageCache: emptyCache });
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders IMAGE node with cached image', () => {
    const testImg = createTestImage(200, 150);
    const cache: ImageCache = new Map([['./photo.png', testImg as never]]);

    const node = image('Photo', { src: './photo.png', size: { x: 100, y: 80 } });
    const compiled = compile(node);
    const result = render(compiled.root, { imageCache: cache });
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
    expect(result.pngBuffer.length).toBeGreaterThan(0);
  });

  it('renders IMAGE node with cornerRadius clipping', () => {
    const node = image('Round', { src: './photo.png', size: { x: 100, y: 100 }, cornerRadius: 16 });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
  });

  it('renders IMAGE node as child of FRAME', () => {
    const node = frame('Container', {
      size: { x: 200, y: 200 },
      fills: [solid('#ffffff')],
      children: [image('Photo', { src: './photo.png', size: { x: 100, y: 80 } })],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
    expect(result.width).toBe(200);
  });
});

describe('render() — IMAGE fills', () => {
  it('renders frame with imageFill placeholder when no cache', () => {
    const node = frame('BgImage', {
      size: { x: 200, y: 150 },
      fills: [imageFill('./hero.jpg')],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
  });

  it('renders frame with mixed solid and image fills', () => {
    const node = frame('Mixed', {
      size: { x: 200, y: 150 },
      fills: [solid('#ff0000'), imageFill('./overlay.png')],
    });
    const compiled = compile(node);
    const result = render(compiled.root);
    expect(result.pngBuffer).toBeInstanceOf(Buffer);
  });
});
