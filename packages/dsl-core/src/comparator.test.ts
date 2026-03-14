import { describe, it, expect, beforeAll } from 'vitest';
import { Comparator } from './comparator.js';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function createTestPNG(width: number, height: number, r: number, g: number, b: number, a = 255): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }
  return PNG.sync.write(png);
}

let tmpDir: string;
let redImage: string;
let greenImage: string;
let redImage2: string;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'comparator-test-'));
  redImage = path.join(tmpDir, 'red.png');
  greenImage = path.join(tmpDir, 'green.png');
  redImage2 = path.join(tmpDir, 'red2.png');

  fs.writeFileSync(redImage, createTestPNG(50, 50, 255, 0, 0));
  fs.writeFileSync(greenImage, createTestPNG(50, 50, 0, 255, 0));
  fs.writeFileSync(redImage2, createTestPNG(50, 50, 255, 0, 0));
});

describe('Comparator', () => {
  it('should report 100% similarity for identical images', async () => {
    const comparator = new Comparator();
    const diffPath = path.join(tmpDir, 'diff-identical.png');
    const result = await comparator.compare(redImage, redImage2, diffPath);
    expect(result.similarity).toBe(100);
    expect(result.mismatchedPixels).toBe(0);
    expect(result.passed).toBe(true);
    expect(result.dimensionMatch).toBe(true);
  });

  it('should report low similarity for completely different images', async () => {
    const comparator = new Comparator();
    const diffPath = path.join(tmpDir, 'diff-different.png');
    const result = await comparator.compare(redImage, greenImage, diffPath);
    expect(result.similarity).toBeLessThan(5);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
    expect(result.passed).toBe(false);
  });

  it('should generate a diff image', async () => {
    const comparator = new Comparator();
    const diffPath = path.join(tmpDir, 'diff-output.png');
    await comparator.compare(redImage, greenImage, diffPath);
    expect(fs.existsSync(diffPath)).toBe(true);
  });

  it('should handle dimension mismatch by padding', async () => {
    const smallImage = path.join(tmpDir, 'small.png');
    fs.writeFileSync(smallImage, createTestPNG(30, 30, 255, 0, 0));
    const diffPath = path.join(tmpDir, 'diff-dim.png');

    const comparator = new Comparator();
    const result = await comparator.compare(redImage, smallImage, diffPath);
    expect(result.dimensionMatch).toBe(false);
    expect(result.totalPixels).toBe(50 * 50); // Padded to larger dimensions
  });

  it('should respect configurable threshold', async () => {
    const comparator = new Comparator();
    const diffPath = path.join(tmpDir, 'diff-threshold.png');
    const result = await comparator.compare(redImage, greenImage, diffPath, {
      failThreshold: 0, // 0% threshold = always passes
    });
    expect(result.passed).toBe(true);
  });

  it('should report correct total pixels', async () => {
    const comparator = new Comparator();
    const diffPath = path.join(tmpDir, 'diff-total.png');
    const result = await comparator.compare(redImage, redImage2, diffPath);
    expect(result.totalPixels).toBe(50 * 50);
  });
});
