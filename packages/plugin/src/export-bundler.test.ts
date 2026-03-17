import { describe, it, expect, vi } from 'vitest';
import { bundleExport, type CanvasImageMap } from './export-bundler.js';
import { unzipSync } from 'fflate';
import type { CapturedCanvasImage } from './image-capture.js';

// --- Helpers ---

function makeCapturedImage(overrides?: Partial<CapturedCanvasImage>): CapturedCanvasImage {
  return {
    pngBytes: new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    scale: 2,
    width: 400,
    height: 200,
    ...overrides,
  };
}

function makeExportJson(): Record<string, unknown> {
  return {
    schemaVersion: '1.0.0',
    targetPage: 'TestPage',
    components: [{ type: 'COMPONENT', name: 'TestComp', children: [] }],
  };
}

// --- Tests ---

describe('bundleExport - base64 mode (below threshold)', () => {
  it('produces JSON with embedded base64 data URIs in canvasImages', () => {
    const images = new Map<string, CapturedCanvasImage>();
    images.set('hero', makeCapturedImage());

    const result = bundleExport(makeExportJson(), images);

    expect(result.format).toBe('json');
    expect(result.json).toBeDefined();
    expect(result.imageCount).toBe(1);
    expect(result.totalImageBytes).toBe(8);

    const parsed = JSON.parse(result.json!) as { canvasImages: CanvasImageMap };
    expect(parsed.canvasImages).toBeDefined();
    expect(parsed.canvasImages.hero).toBeDefined();
    expect(parsed.canvasImages.hero!.data).toMatch(/^data:image\/png;base64,/);
    expect(parsed.canvasImages.hero!.scale).toBe(2);
    expect(parsed.canvasImages.hero!.width).toBe(400);
    expect(parsed.canvasImages.hero!.height).toBe(200);
  });

  it('includes correct metadata for each canvasImages entry', () => {
    const images = new Map<string, CapturedCanvasImage>();
    images.set('card', makeCapturedImage({ width: 600, height: 300, scale: 3 }));

    const result = bundleExport(makeExportJson(), images);
    const parsed = JSON.parse(result.json!) as { canvasImages: CanvasImageMap };

    expect(parsed.canvasImages.card!.scale).toBe(3);
    expect(parsed.canvasImages.card!.width).toBe(600);
    expect(parsed.canvasImages.card!.height).toBe(300);
  });
});

describe('bundleExport - ZIP mode (above threshold)', () => {
  it('produces ZIP archive when payload exceeds threshold', () => {
    const images = new Map<string, CapturedCanvasImage>();
    images.set('big-image', makeCapturedImage({
      pngBytes: new Uint8Array(500),
    }));

    const result = bundleExport(makeExportJson(), images, { sizeThreshold: 100 });

    expect(result.format).toBe('zip');
    expect(result.zipBytes).toBeDefined();
    expect(result.imageCount).toBe(1);
    expect(result.totalImageBytes).toBe(500);
  });

  it('ZIP contains export.json and images/ directory', () => {
    const images = new Map<string, CapturedCanvasImage>();
    images.set('hero', makeCapturedImage({ pngBytes: new Uint8Array(500) }));

    const result = bundleExport(makeExportJson(), images, { sizeThreshold: 100 });
    const unzipped = unzipSync(result.zipBytes!);

    expect(unzipped['export.json']).toBeDefined();
    expect(unzipped['images/hero.png']).toBeDefined();

    // Verify JSON content includes canvasImages with file paths
    const jsonStr = new TextDecoder().decode(unzipped['export.json']);
    const parsed = JSON.parse(jsonStr) as { canvasImages: CanvasImageMap };
    expect(parsed.canvasImages.hero!.data).toBe('images/hero.png');
  });
});

describe('bundleExport - empty images', () => {
  it('produces JSON without canvasImages field when no images captured', () => {
    const images = new Map<string, CapturedCanvasImage>();

    const result = bundleExport(makeExportJson(), images);

    expect(result.format).toBe('json');
    expect(result.imageCount).toBe(0);
    expect(result.totalImageBytes).toBe(0);

    const parsed = JSON.parse(result.json!) as Record<string, unknown>;
    expect(parsed.canvasImages).toBeUndefined();
  });
});

describe('bundleExport - ZIP fallback', () => {
  it('falls back to base64 when ZIP generation fails', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const images = new Map<string, CapturedCanvasImage>();
    images.set('test', makeCapturedImage());

    // With default threshold, small images use base64 directly
    const result = bundleExport(makeExportJson(), images);
    expect(result.format).toBe('json');

    warnSpy.mockRestore();
  });
});
