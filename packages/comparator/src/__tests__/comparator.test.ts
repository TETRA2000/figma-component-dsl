import { describe, it, expect } from 'vitest';
import { Comparator } from '../comparator.js';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function createPng(width: number, height: number, r: number, g: number, b: number): string {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) << 2;
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = 255;
    }
  }
  const filePath = path.join(os.tmpdir(), `test-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
  fs.writeFileSync(filePath, PNG.sync.write(png));
  return filePath;
}

describe('Comparator', () => {
  it('reports 100% similarity for identical images', async () => {
    const img1 = createPng(100, 100, 255, 0, 0);
    const img2 = createPng(100, 100, 255, 0, 0);
    const diffOut = path.join(os.tmpdir(), `diff-${Date.now()}.png`);
    try {
      const comparator = new Comparator();
      const result = await comparator.compare(img1, img2, diffOut);
      expect(result.similarity).toBe(100);
      expect(result.mismatchedPixels).toBe(0);
      expect(result.dimensionMatch).toBe(true);
      expect(result.passed).toBe(true);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffOut, { force: true });
    }
  });

  it('reports low similarity for different images', async () => {
    const img1 = createPng(100, 100, 255, 0, 0);
    const img2 = createPng(100, 100, 0, 0, 255);
    const diffOut = path.join(os.tmpdir(), `diff-${Date.now()}.png`);
    try {
      const comparator = new Comparator();
      const result = await comparator.compare(img1, img2, diffOut);
      expect(result.similarity).toBeLessThan(50);
      expect(result.mismatchedPixels).toBeGreaterThan(0);
      expect(result.passed).toBe(false);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffOut, { force: true });
    }
  });

  it('handles different dimensions', async () => {
    const img1 = createPng(100, 100, 255, 0, 0);
    const img2 = createPng(120, 100, 255, 0, 0);
    const diffOut = path.join(os.tmpdir(), `diff-${Date.now()}.png`);
    try {
      const comparator = new Comparator();
      const result = await comparator.compare(img1, img2, diffOut);
      expect(result.dimensionMatch).toBe(false);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffOut, { force: true });
    }
  });

  it('generates diff image', async () => {
    const img1 = createPng(50, 50, 255, 0, 0);
    const img2 = createPng(50, 50, 0, 255, 0);
    const diffOut = path.join(os.tmpdir(), `diff-${Date.now()}.png`);
    try {
      const comparator = new Comparator();
      const result = await comparator.compare(img1, img2, diffOut);
      expect(result.diffImagePath).toBe(diffOut);
      expect(fs.existsSync(diffOut)).toBe(true);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffOut, { force: true });
    }
  });

  it('respects custom fail threshold', async () => {
    const img1 = createPng(100, 100, 255, 0, 0);
    const img2 = createPng(100, 100, 255, 0, 0);
    const diffOut = path.join(os.tmpdir(), `diff-${Date.now()}.png`);
    try {
      const comparator = new Comparator();
      const result = await comparator.compare(img1, img2, diffOut, {
        failThreshold: 99,
      });
      expect(result.passed).toBe(true);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffOut, { force: true });
    }
  });
});
