import { describe, it, expect, vi } from 'vitest';
import { captureCanvasImages, type ExportableNode } from './image-capture.js';
import type { CanvasRegion, CanvasDetectableNode } from './canvas-detector.js';

// --- Helpers ---

function makeCanvasRegion(
  name: string,
  overrides?: Partial<{
    width: number;
    height: number;
    exportAsync: ExportableNode['exportAsync'];
  }>,
): CanvasRegion {
  const width = overrides?.width ?? 200;
  const height = overrides?.height ?? 100;
  const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47]); // PNG magic bytes
  const exportAsync = overrides?.exportAsync ?? vi.fn().mockResolvedValue(pngBytes);

  const node = {
    type: 'FRAME',
    name,
    id: `node-${name}`,
    width,
    height,
    exportAsync,
  } as unknown as CanvasDetectableNode;

  return {
    node,
    canvasName: name,
  };
}

// --- Tests ---

describe('captureCanvasImages', () => {
  it('calls exportAsync with correct PNG format and scale for each region', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region], { scale: 3 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    });
  });

  it('uses default scale of 2 when not specified', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region]);

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 2 },
    });
  });

  it('calculates dimensions correctly from node size x scale', async () => {
    const region = makeCanvasRegion('card', { width: 300, height: 150 });

    const results = await captureCanvasImages([region], { scale: 2 });

    const captured = results.get('card');
    expect(captured).toBeDefined();
    expect(captured!.width).toBe(600);
    expect(captured!.height).toBe(300);
    expect(captured!.scale).toBe(2);
  });

  it('invokes progress callback with correct current/total/canvasName', async () => {
    const regions = [
      makeCanvasRegion('region-a'),
      makeCanvasRegion('region-b'),
      makeCanvasRegion('region-c'),
    ];

    const onProgress = vi.fn();
    await captureCanvasImages(regions, { onProgress });

    expect(onProgress).toHaveBeenCalledTimes(3);
    expect(onProgress).toHaveBeenNthCalledWith(1, 1, 3, 'region-a');
    expect(onProgress).toHaveBeenNthCalledWith(2, 2, 3, 'region-b');
    expect(onProgress).toHaveBeenNthCalledWith(3, 3, 3, 'region-c');
  });

  it('continues capturing when one region fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failingRegion = makeCanvasRegion('broken', {
      exportAsync: vi.fn().mockRejectedValue(new Error('Export failed')),
    });
    const goodRegion = makeCanvasRegion('good');

    const results = await captureCanvasImages([failingRegion, goodRegion]);

    expect(results.size).toBe(1);
    expect(results.has('broken')).toBe(false);
    expect(results.has('good')).toBe(true);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to capture canvas "broken"'),
      expect.any(String),
    );
    errorSpy.mockRestore();
  });

  it('returns partial results when abort signal is triggered', async () => {
    const controller = new AbortController();
    const regions = [
      makeCanvasRegion('first'),
      makeCanvasRegion('second'),
      makeCanvasRegion('third'),
    ];

    // Abort after first capture completes
    const onProgress = vi.fn().mockImplementation((current: number) => {
      if (current === 1) controller.abort();
    });

    const results = await captureCanvasImages(regions, {
      signal: controller.signal,
      onProgress,
    });

    expect(results.size).toBe(1);
    expect(results.has('first')).toBe(true);
    expect(results.has('second')).toBe(false);
  });

  it('returns empty map when all captures fail', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failRegion = makeCanvasRegion('fail', {
      exportAsync: vi.fn().mockRejectedValue(new Error('boom')),
    });

    const results = await captureCanvasImages([failRegion]);

    expect(results.size).toBe(0);
    errorSpy.mockRestore();
  });

  it('returns empty map for empty input', async () => {
    const results = await captureCanvasImages([]);
    expect(results.size).toBe(0);
  });

  it('clamps scale below minimum to 1', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region], { scale: 0 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 1 },
    });
  });

  it('clamps scale above maximum to 4', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region], { scale: 10 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 4 },
    });
  });

  it('rounds fractional scale to nearest integer within range', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region], { scale: 2.7 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    });
  });

  it('clamps negative scale to 1', async () => {
    const region = makeCanvasRegion('header');
    const exportAsync = (region.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureCanvasImages([region], { scale: -2 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 1 },
    });
  });
});
