import { describe, it, expect, vi } from 'vitest';
import { captureSlotImages, type ExportableNode } from './image-capture.js';
import type { SlotDetectionResult, SlotDetectableNode } from './slot-detector.js';

// --- Helpers ---

function makeExportableSlot(
  name: string,
  overrides?: Partial<{
    width: number;
    height: number;
    exportAsync: ExportableNode['exportAsync'];
    sourceType: 'dslCanvas' | 'nativeSlot';
  }>,
): SlotDetectionResult {
  const width = overrides?.width ?? 200;
  const height = overrides?.height ?? 100;
  const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47]); // PNG magic bytes
  const exportAsync = overrides?.exportAsync ?? vi.fn().mockResolvedValue(pngBytes);

  const node = {
    type: 'SLOT',
    name,
    id: `node-${name}`,
    width,
    height,
    exportAsync,
  } as unknown as SlotDetectableNode;

  return {
    node,
    slotName: name,
    sourceType: overrides?.sourceType ?? 'nativeSlot',
    slotNodeKind: 'wrapped',
    detectedVia: 'componentPropertyDefinitions',
  };
}

// --- Tests ---

describe('captureSlotImages', () => {
  it('calls exportAsync with correct PNG format and scale for each slot', async () => {
    const slot = makeExportableSlot('header');
    const exportAsync = (slot.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureSlotImages([slot], { scale: 3 });

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    });
  });

  it('uses default scale of 2 when not specified', async () => {
    const slot = makeExportableSlot('header');
    const exportAsync = (slot.node as unknown as ExportableNode).exportAsync as ReturnType<typeof vi.fn>;

    await captureSlotImages([slot]);

    expect(exportAsync).toHaveBeenCalledWith({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 2 },
    });
  });

  it('calculates dimensions correctly from node size × scale', async () => {
    const slot = makeExportableSlot('card', { width: 300, height: 150 });

    const results = await captureSlotImages([slot], { scale: 2 });

    const captured = results.get('card');
    expect(captured).toBeDefined();
    expect(captured!.width).toBe(600);
    expect(captured!.height).toBe(300);
    expect(captured!.scale).toBe(2);
  });

  it('invokes progress callback with correct current/total/slotName', async () => {
    const slots = [
      makeExportableSlot('slot-a'),
      makeExportableSlot('slot-b'),
      makeExportableSlot('slot-c'),
    ];

    const onProgress = vi.fn();
    await captureSlotImages(slots, { onProgress });

    expect(onProgress).toHaveBeenCalledTimes(3);
    expect(onProgress).toHaveBeenNthCalledWith(1, 1, 3, 'slot-a');
    expect(onProgress).toHaveBeenNthCalledWith(2, 2, 3, 'slot-b');
    expect(onProgress).toHaveBeenNthCalledWith(3, 3, 3, 'slot-c');
  });

  it('continues capturing when one slot fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failingSlot = makeExportableSlot('broken', {
      exportAsync: vi.fn().mockRejectedValue(new Error('Export failed')),
    });
    const goodSlot = makeExportableSlot('good');

    const results = await captureSlotImages([failingSlot, goodSlot]);

    expect(results.size).toBe(1);
    expect(results.has('broken')).toBe(false);
    expect(results.has('good')).toBe(true);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to capture slot "broken"'),
      expect.any(String),
    );
    errorSpy.mockRestore();
  });

  it('returns partial results when abort signal is triggered', async () => {
    const controller = new AbortController();
    const slots = [
      makeExportableSlot('first'),
      makeExportableSlot('second'),
      makeExportableSlot('third'),
    ];

    // Abort after first capture completes
    const onProgress = vi.fn().mockImplementation((current: number) => {
      if (current === 1) controller.abort();
    });

    const results = await captureSlotImages(slots, {
      signal: controller.signal,
      onProgress,
    });

    expect(results.size).toBe(1);
    expect(results.has('first')).toBe(true);
    expect(results.has('second')).toBe(false);
  });

  it('returns empty map when all captures fail', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failSlot = makeExportableSlot('fail', {
      exportAsync: vi.fn().mockRejectedValue(new Error('boom')),
    });

    const results = await captureSlotImages([failSlot]);

    expect(results.size).toBe(0);
    errorSpy.mockRestore();
  });

  it('returns empty map for empty input', async () => {
    const results = await captureSlotImages([]);
    expect(results.size).toBe(0);
  });

  it('preserves source type from detection result', async () => {
    const dslSlot = makeExportableSlot('canvas-slot', { sourceType: 'dslCanvas' });
    const nativeSlot = makeExportableSlot('native-slot', { sourceType: 'nativeSlot' });

    const results = await captureSlotImages([dslSlot, nativeSlot]);

    expect(results.get('canvas-slot')!.sourceType).toBe('dslCanvas');
    expect(results.get('native-slot')!.sourceType).toBe('nativeSlot');
  });
});
