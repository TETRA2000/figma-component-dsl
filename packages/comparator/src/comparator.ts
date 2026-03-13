import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export interface CompareOptions {
  threshold: number;          // pixelmatch sensitivity, default 0.1
  failThreshold: number;      // minimum similarity %, default 95
  diffColor: { r: number; g: number; b: number };  // default red
  antiAliasing: boolean;      // default true
}

export interface CompareResult {
  similarity: number;         // 0-100 percentage
  mismatchedPixels: number;
  totalPixels: number;
  dimensionMatch: boolean;
  pass: boolean;
  diffPngBuffer?: Buffer;
}

const DEFAULT_OPTIONS: CompareOptions = {
  threshold: 0.1,
  failThreshold: 95,
  diffColor: { r: 255, g: 0, b: 0 },
  antiAliasing: true,
};

function decodePng(buffer: Buffer): PNG {
  return PNG.sync.read(buffer);
}

export function compare(
  imageA: Buffer,
  imageB: Buffer,
  options?: Partial<CompareOptions>,
): CompareResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  let pngA = decodePng(imageA);
  let pngB = decodePng(imageB);

  let dimensionMatch = pngA.width === pngB.width && pngA.height === pngB.height;

  // Pad smaller image if dimensions differ
  const maxWidth = Math.max(pngA.width, pngB.width);
  const maxHeight = Math.max(pngA.height, pngB.height);

  if (!dimensionMatch) {
    pngA = padImage(pngA, maxWidth, maxHeight);
    pngB = padImage(pngB, maxWidth, maxHeight);
  }

  const totalPixels = maxWidth * maxHeight;
  const diff = new PNG({ width: maxWidth, height: maxHeight });

  const mismatchedPixels = pixelmatch(
    pngA.data,
    pngB.data,
    diff.data,
    maxWidth,
    maxHeight,
    {
      threshold: opts.threshold,
      includeAA: !opts.antiAliasing,
      diffColor: [opts.diffColor.r, opts.diffColor.g, opts.diffColor.b],
    },
  );

  const matchingPixels = totalPixels - mismatchedPixels;
  const similarity = totalPixels > 0 ? (matchingPixels / totalPixels) * 100 : 100;
  const pass = similarity >= opts.failThreshold;

  return {
    similarity,
    mismatchedPixels,
    totalPixels,
    dimensionMatch,
    pass,
    diffPngBuffer: PNG.sync.write(diff),
  };
}

export function compareFiles(
  pathA: string,
  pathB: string,
  diffOutputPath?: string,
  options?: Partial<CompareOptions>,
): CompareResult {
  const imageA = readFileSync(pathA);
  const imageB = readFileSync(pathB);
  const result = compare(imageA, imageB, options);

  if (diffOutputPath && result.diffPngBuffer) {
    mkdirSync(dirname(diffOutputPath), { recursive: true });
    writeFileSync(diffOutputPath, result.diffPngBuffer);
  }

  return result;
}

function padImage(png: PNG, targetWidth: number, targetHeight: number): PNG {
  if (png.width === targetWidth && png.height === targetHeight) return png;

  const padded = new PNG({ width: targetWidth, height: targetHeight, fill: true });
  // Fill with white background
  for (let i = 0; i < padded.data.length; i += 4) {
    padded.data[i] = 255;     // R
    padded.data[i + 1] = 255; // G
    padded.data[i + 2] = 255; // B
    padded.data[i + 3] = 255; // A
  }

  // Copy original pixels
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const srcIdx = (y * png.width + x) * 4;
      const dstIdx = (y * targetWidth + x) * 4;
      padded.data[dstIdx] = png.data[srcIdx]!;
      padded.data[dstIdx + 1] = png.data[srcIdx + 1]!;
      padded.data[dstIdx + 2] = png.data[srcIdx + 2]!;
      padded.data[dstIdx + 3] = png.data[srcIdx + 3]!;
    }
  }

  return padded;
}
