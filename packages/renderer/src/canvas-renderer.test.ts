import { describe, it, expect, beforeAll } from 'vitest';
import { renderCanvasNodes } from './canvas-renderer.js';
import { initializeRenderer, render } from './renderer.js';
import { compile, textMeasurer } from '@figma-dsl/compiler';
import { canvas, frame, text, rectangle } from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const fontDir = join(__dirname2, '../../dsl-core/fonts');

beforeAll(() => {
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);
});

describe('renderCanvasNodes()', () => {
  it('extracts and renders canvas nodes from a tree', () => {
    const node = frame('Page', {
      size: { x: 800, y: 600 },
      children: [
        canvas('Banner', {
          size: { x: 300, y: 200 },
          children: [text('Hello')],
        }),
      ],
    });
    const compiled = compile(node);
    const results = renderCanvasNodes(compiled.root);
    expect(results.size).toBe(1);
    expect(results.has('Banner')).toBe(true);
    const banner = results.get('Banner')!;
    expect(banner.pngBuffer).toBeInstanceOf(Buffer);
    expect(banner.width).toBe(300);
    expect(banner.height).toBe(200);
    expect(banner.scale).toBe(1);
  });

  it('applies canvasScale to rendering', () => {
    const node = canvas('HiDPI', {
      size: { x: 100, y: 50 },
      scale: 2,
    });
    const compiled = compile(node);
    const results = renderCanvasNodes(compiled.root);
    const result = results.get('HiDPI')!;
    expect(result.width).toBe(200);  // 100 * scale 2
    expect(result.height).toBe(100); // 50 * scale 2
    expect(result.scale).toBe(2);
  });

  it('returns empty Map when no canvas nodes exist', () => {
    const node = frame('Plain', {
      size: { x: 100, y: 100 },
      children: [rectangle('Box', { size: { x: 50, y: 50 }, fills: [solid('#ff0000')] })],
    });
    const compiled = compile(node);
    const results = renderCanvasNodes(compiled.root);
    expect(results.size).toBe(0);
  });

  it('handles multiple canvas nodes at different depths', () => {
    const node = frame('Page', {
      size: { x: 800, y: 600 },
      children: [
        canvas('Top', { size: { x: 200, y: 100 } }),
        frame('Section', {
          size: { x: 400, y: 300 },
          children: [
            canvas('Nested', { size: { x: 150, y: 75 } }),
          ],
        }),
      ],
    });
    const compiled = compile(node);
    const results = renderCanvasNodes(compiled.root);
    expect(results.size).toBe(2);
    expect(results.has('Top')).toBe(true);
    expect(results.has('Nested')).toBe(true);
  });

  it('produces identical output to direct render()', () => {
    const canvasNode = canvas('Compare', {
      size: { x: 200, y: 100 },
      children: [
        rectangle('BG', { size: { x: 200, y: 100 }, fills: [solid('#00ff00')] }),
      ],
    });
    const compiled = compile(canvasNode);

    // Direct render
    const directResult = render(compiled.root);

    // Via renderCanvasNodes
    const mapResult = renderCanvasNodes(compiled.root);
    const canvasResult = mapResult.get('Compare')!;

    expect(canvasResult.pngBuffer).toEqual(directResult.pngBuffer);
    expect(canvasResult.width).toBe(directResult.width);
    expect(canvasResult.height).toBe(directResult.height);
  });
});
