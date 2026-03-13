import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";

export interface CompareOptions {
  readonly threshold?: number;
  readonly failThreshold?: number;
  readonly diffColor?: [number, number, number];
  readonly antiAliasing?: boolean;
}

export interface CompareResult {
  readonly similarity: number;
  readonly mismatchedPixels: number;
  readonly totalPixels: number;
  readonly diffImagePath: string | null;
  readonly dimensionMatch: boolean;
  readonly passed: boolean;
}

/**
 * Compare two PNG images pixel-by-pixel using pixelmatch.
 */
export function compare(
  imagePath1: string,
  imagePath2: string,
  diffOutputPath: string,
  options: CompareOptions = {},
): CompareResult {
  const threshold = options.threshold ?? 0.1;
  const failThreshold = options.failThreshold ?? 95;
  const diffColor = options.diffColor ?? [255, 0, 0] as [number, number, number];
  const antiAliasing = options.antiAliasing ?? true;

  const img1 = PNG.sync.read(readFileSync(imagePath1));
  const img2 = PNG.sync.read(readFileSync(imagePath2));

  let dimensionMatch = true;
  let width = img1.width;
  let height = img1.height;
  let data1 = img1.data;
  let data2 = img2.data;

  if (img1.width !== img2.width || img1.height !== img2.height) {
    dimensionMatch = false;
    width = Math.max(img1.width, img2.width);
    height = Math.max(img1.height, img2.height);
    data1 = padImage(img1, width, height);
    data2 = padImage(img2, width, height);
  }

  const totalPixels = width * height;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    data1,
    data2,
    diff.data,
    width,
    height,
    {
      threshold,
      includeAA: !antiAliasing,
      diffColor,
    },
  );

  const similarity = totalPixels > 0
    ? ((totalPixels - mismatchedPixels) / totalPixels) * 100
    : 100;

  let diffImagePath: string | null = null;
  if (mismatchedPixels > 0) {
    writeFileSync(diffOutputPath, PNG.sync.write(diff));
    diffImagePath = diffOutputPath;
  }

  return {
    similarity,
    mismatchedPixels,
    totalPixels,
    diffImagePath,
    dimensionMatch,
    passed: similarity >= failThreshold,
  };
}

/**
 * Pad a smaller image to target dimensions with white background.
 */
function padImage(img: PNG, targetWidth: number, targetHeight: number): Buffer {
  const padded = Buffer.alloc(targetWidth * targetHeight * 4, 255);
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const srcIdx = (y * img.width + x) * 4;
      const dstIdx = (y * targetWidth + x) * 4;
      padded[dstIdx] = img.data[srcIdx]!;
      padded[dstIdx + 1] = img.data[srcIdx + 1]!;
      padded[dstIdx + 2] = img.data[srcIdx + 2]!;
      padded[dstIdx + 3] = img.data[srcIdx + 3]!;
    }
  }
  return padded;
}
