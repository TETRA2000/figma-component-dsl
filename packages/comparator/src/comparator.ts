import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'node:fs';

interface CompareOptions {
  threshold?: number;
  failThreshold?: number;
  diffColor?: [number, number, number];
  antiAliasing?: boolean;
}

interface CompareResult {
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
    options?: CompareOptions,
  ): Promise<CompareResult> {
    const img1 = PNG.sync.read(fs.readFileSync(imagePath1));
    const img2 = PNG.sync.read(fs.readFileSync(imagePath2));

    const threshold = options?.threshold ?? 0.1;
    const failThreshold = options?.failThreshold ?? 95;
    const diffColor = options?.diffColor ?? [255, 0, 0];

    // Handle dimension mismatch
    const dimensionMatch = img1.width === img2.width && img1.height === img2.height;
    const maxW = Math.max(img1.width, img2.width);
    const maxH = Math.max(img1.height, img2.height);

    let data1 = img1.data;
    let data2 = img2.data;

    if (!dimensionMatch) {
      data1 = this.padImage(img1, maxW, maxH);
      data2 = this.padImage(img2, maxW, maxH);
    }

    const diff = new PNG({ width: maxW, height: maxH });
    const totalPixels = maxW * maxH;

    const mismatchedPixels = pixelmatch(
      data1,
      data2,
      diff.data,
      maxW,
      maxH,
      {
        threshold,
        includeAA: options?.antiAliasing !== false,
        diffColor: diffColor as [number, number, number],
      },
    );

    const similarity = ((totalPixels - mismatchedPixels) / totalPixels) * 100;

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

  private padImage(img: PNG, targetW: number, targetH: number): Buffer {
    const padded = Buffer.alloc(targetW * targetH * 4, 255);
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const srcIdx = (y * img.width + x) * 4;
        const dstIdx = (y * targetW + x) * 4;
        padded[dstIdx] = img.data[srcIdx]!;
        padded[dstIdx + 1] = img.data[srcIdx + 1]!;
        padded[dstIdx + 2] = img.data[srcIdx + 2]!;
        padded[dstIdx + 3] = img.data[srcIdx + 3]!;
      }
    }
    return padded;
  }
}
