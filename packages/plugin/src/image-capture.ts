// --- Image Capture ---
// Captures rendered images of detected slots and DslCanvas regions
// via Figma's exportAsync API with progress reporting and cancellation.

import type { SlotDetectionResult, SlotSourceType } from './slot-detector.js';

// --- Types ---

export interface CapturedSlotImage {
  /** Raw PNG bytes from exportAsync */
  pngBytes: Uint8Array;
  /** Slot source classification */
  sourceType: SlotSourceType;
  /** Scale factor used for capture */
  scale: number;
  /** Pixel dimensions of captured image */
  width: number;
  height: number;
}

export interface CaptureOptions {
  /** Scale factor for PNG export (default: 2) */
  scale?: number;
  /** Progress callback */
  onProgress?: (current: number, total: number, slotName: string) => void;
  /** Abort signal for cancellation — checked between captures */
  signal?: { aborted: boolean };
}

// Minimal exportable node interface for testability
export interface ExportableNode {
  readonly width: number;
  readonly height: number;
  exportAsync(settings: { format: 'PNG'; constraint: { type: 'SCALE'; value: number } }): Promise<Uint8Array>;
}

// --- Scale Validation ---

/** Clamp and round scale to integer within 1–4 range */
function clampScale(value: number): number {
  return Math.min(4, Math.max(1, Math.round(value)));
}

// --- Capture ---

/**
 * Capture images for all detected slots.
 * Returns Map keyed by slotName. Failed captures are omitted with error logged.
 */
export async function captureSlotImages(
  detectedSlots: SlotDetectionResult[],
  options?: CaptureOptions,
): Promise<Map<string, CapturedSlotImage>> {
  const scale = clampScale(options?.scale ?? 2);
  const total = detectedSlots.length;
  const results = new Map<string, CapturedSlotImage>();

  for (let i = 0; i < detectedSlots.length; i++) {
    // Check abort signal before each capture
    if (options?.signal?.aborted) {
      return results; // Return partial results
    }

    const slot = detectedSlots[i]!;
    const node = slot.node as unknown as ExportableNode;

    try {
      const pngBytes = await node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: scale },
      });

      const width = Math.round(node.width * scale);
      const height = Math.round(node.height * scale);

      results.set(slot.slotName, {
        pngBytes,
        sourceType: slot.sourceType,
        scale,
        width,
        height,
      });

      // Report progress after successful capture
      options?.onProgress?.(i + 1, total, slot.slotName);
    } catch (error) {
      console.error(
        `[ImageCapture] Failed to capture slot "${slot.slotName}":`,
        error instanceof Error ? error.message : error,
      );
      // Continue with remaining slots
    }
  }

  return results;
}
