import fs from 'node:fs';
import { PNG } from 'pngjs';

export interface CompareOptions {
  threshold?: number;
  failThreshold?: number;
  diffColor?: [number, number, number];
  antiAliasing?: boolean;
}

export interface CompareResult {
  similarity: number;
  mismatchedPixels: number;
  totalPixels: number;
  diffImagePath: string | null;
  dimensionMatch: boolean;
  passed: boolean;
}

export class Comparator {
  async compare(
    imagePath1: string,
    imagePath2: string,
    diffOutputPath: string,
    options: CompareOptions = {},
  ): Promise<CompareResult> {
    const { default: pixelmatch } = await import('pixelmatch');

    const img1 = PNG.sync.read(fs.readFileSync(imagePath1));
    const img2 = PNG.sync.read(fs.readFileSync(imagePath2));

    const threshold = options.threshold ?? 0.1;
    const failThreshold = options.failThreshold ?? 95;

    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);
    const dimensionMatch = img1.width === img2.width && img1.height === img2.height;

    // Pad images to same dimensions if needed
    const data1 = this.padImage(img1, width, height);
    const data2 = this.padImage(img2, width, height);

    const diff = new PNG({ width, height });
    const totalPixels = width * height;

    const mismatchedPixels = pixelmatch(
      data1,
      data2,
      diff.data,
      width,
      height,
      {
        threshold,
        includeAA: options.antiAliasing ?? true,
        diffColor: options.diffColor ?? [255, 0, 0],
      },
    );

    const similarity = totalPixels > 0
      ? ((totalPixels - mismatchedPixels) / totalPixels) * 100
      : 100;

    // Write diff image
    fs.writeFileSync(diffOutputPath, PNG.sync.write(diff));

    return {
      similarity,
      mismatchedPixels,
      totalPixels,
      diffImagePath: diffOutputPath,
      dimensionMatch,
      passed: similarity >= failThreshold,
    };
  }

  private padImage(img: PNG, targetWidth: number, targetHeight: number): Buffer {
    if (img.width === targetWidth && img.height === targetHeight) {
      return img.data;
    }

    const padded = Buffer.alloc(targetWidth * targetHeight * 4, 255); // White background
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const srcIdx = (y * img.width + x) * 4;
        const dstIdx = (y * targetWidth + x) * 4;
        padded[dstIdx] = img.data[srcIdx];
        padded[dstIdx + 1] = img.data[srcIdx + 1];
        padded[dstIdx + 2] = img.data[srcIdx + 2];
        padded[dstIdx + 3] = img.data[srcIdx + 3];
      }
    }
    return padded;
  }
}
