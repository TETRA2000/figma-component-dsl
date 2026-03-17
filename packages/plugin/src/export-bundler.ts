// --- Export Bundler ---
// Bundles export JSON and captured canvas images into base64-inline JSON or ZIP archive
// based on total payload size.

import { zipSync } from 'fflate';
import type { CapturedCanvasImage } from './image-capture.js';

// --- Types ---

export type ExportFormat = 'json' | 'zip';

export interface CanvasImageEntry {
  /** Base64 data URI (json mode) or relative file path (zip mode) */
  data: string;
  /** Scale factor */
  scale: number;
  /** Pixel dimensions */
  width: number;
  height: number;
}

/** Map of canvas names to their image entries */
export type CanvasImageMap = Record<string, CanvasImageEntry>;

export interface BundledExport {
  /** Output format */
  format: ExportFormat;
  /** For json format: complete JSON string with embedded canvasImages */
  json?: string;
  /** For zip format: ZIP archive bytes */
  zipBytes?: Uint8Array;
  /** Summary of bundled images */
  imageCount: number;
  totalImageBytes: number;
}

export interface BundleOptions {
  /** Size threshold in bytes for switching to ZIP (default: 1_048_576 = 1 MB) */
  sizeThreshold?: number;
}

// --- Base64 Encoding ---

/**
 * Encode Uint8Array to base64 string.
 * Works in both Figma plugin sandbox (via figma.base64Encode)
 * and Node.js environments (via Buffer).
 */
function uint8ArrayToBase64(bytes: Uint8Array): string {
  // In Figma sandbox, figma.base64Encode is available
  if (typeof figma !== 'undefined' && typeof figma.base64Encode === 'function') {
    return figma.base64Encode(bytes);
  }
  // In Node.js (tests), use Buffer
  return Buffer.from(bytes).toString('base64');
}

// --- Bundler ---

/**
 * Bundle export JSON with captured canvas images.
 * Below threshold: embeds images as base64 data URIs.
 * Above threshold: packages as ZIP archive.
 */
export function bundleExport(
  exportJson: Record<string, unknown>,
  capturedImages: Map<string, CapturedCanvasImage>,
  options?: BundleOptions,
): BundledExport {
  const threshold = options?.sizeThreshold ?? 1_048_576;

  // Calculate totals
  let totalImageBytes = 0;
  for (const img of capturedImages.values()) {
    totalImageBytes += img.pngBytes.byteLength;
  }

  // If no images, return plain JSON
  if (capturedImages.size === 0) {
    return {
      format: 'json',
      json: JSON.stringify(exportJson),
      imageCount: 0,
      totalImageBytes: 0,
    };
  }

  // Estimate total payload size
  const jsonStr = JSON.stringify(exportJson);
  // Base64 expands ~33%, plus data URI prefix overhead
  const estimatedBase64Size = totalImageBytes * 1.37 + capturedImages.size * 30;
  const estimatedTotalSize = jsonStr.length + estimatedBase64Size;

  if (estimatedTotalSize > threshold) {
    // Try ZIP format
    try {
      return bundleAsZip(exportJson, capturedImages, totalImageBytes);
    } catch (error) {
      console.warn(
        '[ExportBundler] ZIP generation failed, falling back to base64:',
        error instanceof Error ? error.message : error,
      );
      // Fall through to base64
    }
  }

  // Base64 format
  return bundleAsBase64(exportJson, capturedImages, totalImageBytes);
}

// --- Internal ---

function bundleAsBase64(
  exportJson: Record<string, unknown>,
  capturedImages: Map<string, CapturedCanvasImage>,
  totalImageBytes: number,
): BundledExport {
  const canvasImages: CanvasImageMap = {};

  for (const [name, img] of capturedImages) {
    const base64 = uint8ArrayToBase64(img.pngBytes);
    canvasImages[name] = {
      data: `data:image/png;base64,${base64}`,
      scale: img.scale,
      width: img.width,
      height: img.height,
    };
  }

  const enrichedJson = { ...exportJson, canvasImages };

  return {
    format: 'json',
    json: JSON.stringify(enrichedJson),
    imageCount: capturedImages.size,
    totalImageBytes,
  };
}

function bundleAsZip(
  exportJson: Record<string, unknown>,
  capturedImages: Map<string, CapturedCanvasImage>,
  totalImageBytes: number,
): BundledExport {
  // Build canvasImages map with file paths instead of data URIs
  const canvasImages: CanvasImageMap = {};
  const zipEntries: Record<string, Uint8Array> = {};

  for (const [name, img] of capturedImages) {
    const filePath = `images/${name}.png`;
    canvasImages[name] = {
      data: filePath,
      scale: img.scale,
      width: img.width,
      height: img.height,
    };
    zipEntries[filePath] = img.pngBytes;
  }

  const enrichedJson = { ...exportJson, canvasImages };
  const jsonBytes = new TextEncoder().encode(JSON.stringify(enrichedJson));
  zipEntries['export.json'] = jsonBytes;

  const zipBytes = zipSync(zipEntries);

  return {
    format: 'zip',
    zipBytes,
    imageCount: capturedImages.size,
    totalImageBytes,
  };
}
