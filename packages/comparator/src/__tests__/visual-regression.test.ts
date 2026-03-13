import { describe, it, expect } from 'vitest';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { PNG } from 'pngjs';
import { compare } from '../comparator.js';

const FIXTURES_DIR = resolve(dirname(import.meta.filename ?? '.'), '../../fixtures/visual-regression');

/**
 * Helper: create a solid-color PNG buffer.
 */
function createSolidPng(
  width: number,
  height: number,
  color: [number, number, number, number] = [255, 255, 255, 255],
): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) << 2;
      png.data[idx] = color[0]!;
      png.data[idx + 1] = color[1]!;
      png.data[idx + 2] = color[2]!;
      png.data[idx + 3] = color[3]!;
    }
  }
  return PNG.sync.write(png);
}

/**
 * Helper: create a PNG with a colored rectangle in it.
 */
function createRectPng(
  width: number,
  height: number,
  rectX: number,
  rectY: number,
  rectW: number,
  rectH: number,
  bgColor: [number, number, number, number] = [255, 255, 255, 255],
  rectColor: [number, number, number, number] = [124, 58, 237, 255],
): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) << 2;
      const inRect = x >= rectX && x < rectX + rectW && y >= rectY && y < rectY + rectH;
      const color = inRect ? rectColor : bgColor;
      png.data[idx] = color[0]!;
      png.data[idx + 1] = color[1]!;
      png.data[idx + 2] = color[2]!;
      png.data[idx + 3] = color[3]!;
    }
  }
  return PNG.sync.write(png);
}

function ensureFixturesDir() {
  if (!existsSync(FIXTURES_DIR)) {
    mkdirSync(FIXTURES_DIR, { recursive: true });
  }
}

describe('Visual regression framework', () => {
  it('identical images produce 100% similarity', async () => {
    ensureFixturesDir();
    const img = createSolidPng(100, 40, [124, 58, 237, 255]);
    const path1 = resolve(FIXTURES_DIR, 'identical-a.png');
    const path2 = resolve(FIXTURES_DIR, 'identical-b.png');
    writeFileSync(path1, img);
    writeFileSync(path2, img);

    const result = await compare(path1, path2);
    expect(result.similarity).toBe(1);
    expect(result.mismatchedPixels).toBe(0);
    expect(result.dimensionMatch).toBe(true);
    expect(result.pass).toBe(true);
  });

  it('slightly different images still pass at 95% threshold', async () => {
    ensureFixturesDir();
    // Two images that are 99% similar (small rect difference)
    const base = createSolidPng(200, 100);
    const variant = createRectPng(200, 100, 95, 45, 10, 10); // small 10x10 purple spot

    const path1 = resolve(FIXTURES_DIR, 'slight-diff-base.png');
    const path2 = resolve(FIXTURES_DIR, 'slight-diff-variant.png');
    writeFileSync(path1, base);
    writeFileSync(path2, variant);

    const result = await compare(path1, path2, { failThreshold: 0.95 });
    expect(result.similarity).toBeGreaterThan(0.95);
    expect(result.pass).toBe(true);
    expect(result.dimensionMatch).toBe(true);
  });

  it('very different images fail at 95% threshold', async () => {
    ensureFixturesDir();
    const white = createSolidPng(100, 100, [255, 255, 255, 255]);
    const purple = createSolidPng(100, 100, [124, 58, 237, 255]);

    const path1 = resolve(FIXTURES_DIR, 'diff-white.png');
    const path2 = resolve(FIXTURES_DIR, 'diff-purple.png');
    writeFileSync(path1, white);
    writeFileSync(path2, purple);

    const result = await compare(path1, path2, { failThreshold: 0.95 });
    expect(result.similarity).toBeLessThan(0.95);
    expect(result.pass).toBe(false);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
  });

  it('different sized images are padded and compared', async () => {
    ensureFixturesDir();
    const small = createSolidPng(50, 50, [255, 255, 255, 255]);
    const large = createSolidPng(100, 100, [255, 255, 255, 255]);

    const path1 = resolve(FIXTURES_DIR, 'size-small.png');
    const path2 = resolve(FIXTURES_DIR, 'size-large.png');
    writeFileSync(path1, small);
    writeFileSync(path2, large);

    const result = await compare(path1, path2);
    expect(result.dimensionMatch).toBe(false);
    // The padded area (black) will differ from white
    expect(result.similarity).toBeLessThan(1);
  });

  it('diff image is generated as PNG buffer', async () => {
    ensureFixturesDir();
    const white = createSolidPng(50, 50, [255, 255, 255, 255]);
    const black = createSolidPng(50, 50, [0, 0, 0, 255]);

    const path1 = resolve(FIXTURES_DIR, 'diffimg-white.png');
    const path2 = resolve(FIXTURES_DIR, 'diffimg-black.png');
    writeFileSync(path1, white);
    writeFileSync(path2, black);

    const result = await compare(path1, path2);
    expect(result.diffImage).toBeInstanceOf(Buffer);
    expect(result.diffImage.length).toBeGreaterThan(0);

    // Verify it's a valid PNG (starts with PNG signature)
    expect(result.diffImage[0]).toBe(0x89);
    expect(result.diffImage[1]).toBe(0x50); // P
    expect(result.diffImage[2]).toBe(0x4e); // N
    expect(result.diffImage[3]).toBe(0x47); // G
  });

  it('configurable threshold affects sensitivity', async () => {
    ensureFixturesDir();
    // Create two images with subtle color difference
    const img1 = createSolidPng(100, 100, [128, 128, 128, 255]);
    const img2 = createSolidPng(100, 100, [130, 128, 128, 255]); // very slight diff

    const path1 = resolve(FIXTURES_DIR, 'thresh-a.png');
    const path2 = resolve(FIXTURES_DIR, 'thresh-b.png');
    writeFileSync(path1, img1);
    writeFileSync(path2, img2);

    // With high pixelmatch threshold (lenient), should match better
    const lenient = await compare(path1, path2, { threshold: 0.5 });
    // With low pixelmatch threshold (strict), may detect more mismatches
    const strict = await compare(path1, path2, { threshold: 0.01 });

    expect(lenient.similarity).toBeGreaterThanOrEqual(strict.similarity);
  });

  it('expected similarity ranges by component type', () => {
    // Document expected baselines for visual regression
    const expectedRanges = {
      // Simple shapes: solid fills, rectangles, ellipses
      simpleShapes: { min: 0.98, description: 'Solid fills and basic shapes should match >98%' },
      // Text-heavy layouts: font rendering may vary slightly
      textHeavy: { min: 0.92, description: 'Text layout similarity >92% due to font rendering' },
      // Gradient components: gradient interpolation may differ
      gradients: { min: 0.90, description: 'Gradient fills similarity >90% due to interpolation' },
    };

    // These are the documented thresholds for future regression runs
    expect(expectedRanges.simpleShapes.min).toBe(0.98);
    expect(expectedRanges.textHeavy.min).toBe(0.92);
    expect(expectedRanges.gradients.min).toBe(0.90);
  });
});
