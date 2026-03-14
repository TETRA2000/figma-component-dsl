import { describe, it, expect } from 'vitest';
import { Renderer } from '../renderer.js';
import type { FigmaNodeDict } from '@figma-dsl/compiler';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const FONT_DIR = path.resolve(import.meta.dirname, '../../../dsl-core/fonts');

function makeFrame(
  overrides: Partial<FigmaNodeDict> = {},
): FigmaNodeDict {
  return {
    guid: [0, 0],
    type: 'FRAME',
    name: 'Test',
    size: { x: 200, y: 100 },
    transform: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    fillPaints: [],
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  };
}

describe('Renderer', () => {
  it('renders a simple frame to buffer', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      fillPaints: [
        { type: 'SOLID', color: { r: 0.48, g: 0.23, b: 0.93 } },
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
    // PNG magic bytes
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50); // P
    expect(buffer[2]).toBe(0x4e); // N
    expect(buffer[3]).toBe(0x47); // G
  });

  it('renders to a file', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 100, y: 50 },
      fillPaints: [
        { type: 'SOLID', color: { r: 1, g: 0, b: 0 } },
      ],
    });
    const outPath = path.join(os.tmpdir(), `renderer-test-${Date.now()}.png`);
    try {
      const result = await renderer.render(root, outPath);
      expect(result.pngPath).toBe(outPath);
      expect(result.width).toBe(100);
      expect(result.height).toBe(50);
      expect(fs.existsSync(outPath)).toBe(true);
    } finally {
      fs.rmSync(outPath, { force: true });
    }
  });

  it('renders child nodes', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 300, y: 200 },
      fillPaints: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      children: [
        makeFrame({
          guid: [0, 1],
          size: { x: 100, y: 50 },
          transform: [[1, 0, 20], [0, 1, 30], [0, 0, 1]],
          fillPaints: [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }],
        }),
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders text nodes', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 300, y: 100 },
      fillPaints: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      children: [
        {
          ...makeFrame({ guid: [0, 1] }),
          type: 'TEXT',
          size: { x: 200, y: 24 },
          transform: [[1, 0, 10], [0, 1, 10], [0, 0, 1]],
          textData: {
            characters: 'Hello World',
            lines: ['Hello World'],
            computedWidth: 100,
            computedHeight: 24,
          },
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: 400,
          textAlignHorizontal: 'LEFT' as const,
          fillPaints: [{ type: 'SOLID' as const, color: { r: 0, g: 0, b: 0 } }],
        },
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders gradient fills', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 200, y: 100 },
      fillPaints: [
        {
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { color: { r: 0.48, g: 0.23, b: 0.93, a: 1 }, position: 0 },
            { color: { r: 0.31, g: 0.27, b: 0.90, a: 1 }, position: 1 },
          ],
          gradientTransform: [
            [0.707, 0.707, 0.146],
            [-0.707, 0.707, 0.146],
          ],
        },
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders ellipse nodes', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 200, y: 200 },
      children: [
        makeFrame({
          guid: [0, 1],
          type: 'ELLIPSE',
          size: { x: 100, y: 100 },
          transform: [[1, 0, 50], [0, 1, 50], [0, 0, 1]],
          fillPaints: [{ type: 'SOLID', color: { r: 0, g: 1, b: 0 } }],
        }),
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('skips invisible nodes', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 100, y: 100 },
      children: [
        makeFrame({
          guid: [0, 1],
          visible: false,
          fillPaints: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }],
        }),
      ],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with corner radius', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 100, y: 100 },
      cornerRadius: 16,
      fillPaints: [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }],
    });
    const buffer = await renderer.renderToBuffer(root);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('applies scale option', async () => {
    const renderer = new Renderer(FONT_DIR);
    const root = makeFrame({
      size: { x: 100, y: 50 },
    });
    const outPath = path.join(os.tmpdir(), `renderer-scale-${Date.now()}.png`);
    try {
      const result = await renderer.render(root, outPath, { scale: 2 });
      expect(result.width).toBe(200);
      expect(result.height).toBe(100);
    } finally {
      fs.rmSync(outPath, { force: true });
    }
  });
});
