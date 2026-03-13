import { describe, it, expect, beforeAll } from 'vitest';
import { compare, compareFiles } from './comparator.js';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import { compile } from '@figma-dsl/compiler';
import { frame, rectangle } from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const fontDir = join(__dirname2, '../../dsl-core/fonts');
const testDir = join(__dirname2, '../../../test-output-comparator');

beforeAll(() => {
  initializeRenderer(fontDir);
  mkdirSync(testDir, { recursive: true });
});

function makeRedBox(): Buffer {
  const node = frame('Red', { size: { x: 50, y: 50 }, fills: [solid('#ff0000')] });
  return render(compile(node).root).pngBuffer;
}

function makeBlueBox(): Buffer {
  const node = frame('Blue', { size: { x: 50, y: 50 }, fills: [solid('#0000ff')] });
  return render(compile(node).root).pngBuffer;
}

function makeSmallBox(): Buffer {
  const node = frame('Small', { size: { x: 30, y: 30 }, fills: [solid('#ff0000')] });
  return render(compile(node).root).pngBuffer;
}

describe('compare() — identical images', () => {
  it('returns 100% similarity for identical images', () => {
    const img = makeRedBox();
    const result = compare(img, img);
    expect(result.similarity).toBe(100);
    expect(result.mismatchedPixels).toBe(0);
    expect(result.dimensionMatch).toBe(true);
    expect(result.pass).toBe(true);
  });
});

describe('compare() — different images', () => {
  it('detects pixel differences', () => {
    const imgA = makeRedBox();
    const imgB = makeBlueBox();
    const result = compare(imgA, imgB);
    expect(result.similarity).toBeLessThan(100);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
    expect(result.dimensionMatch).toBe(true);
  });

  it('fails when similarity below threshold', () => {
    const imgA = makeRedBox();
    const imgB = makeBlueBox();
    const result = compare(imgA, imgB, { failThreshold: 95 });
    expect(result.pass).toBe(false);
  });
});

describe('compare() — dimension mismatch', () => {
  it('handles different dimensions by padding', () => {
    const imgA = makeRedBox();  // 50x50
    const imgB = makeSmallBox(); // 30x30
    const result = compare(imgA, imgB);
    expect(result.dimensionMatch).toBe(false);
    expect(result.totalPixels).toBe(50 * 50); // padded to larger
  });
});

describe('compare() — diff image', () => {
  it('produces a diff PNG buffer', () => {
    const imgA = makeRedBox();
    const imgB = makeBlueBox();
    const result = compare(imgA, imgB);
    expect(result.diffPngBuffer).toBeInstanceOf(Buffer);
    expect(result.diffPngBuffer!.length).toBeGreaterThan(0);
  });
});

describe('compareFiles()', () => {
  it('reads files and produces comparison', () => {
    const pathA = join(testDir, 'a.png');
    const pathB = join(testDir, 'b.png');
    const diffPath = join(testDir, 'diff.png');

    writeFileSync(pathA, makeRedBox());
    writeFileSync(pathB, makeBlueBox());

    const result = compareFiles(pathA, pathB, diffPath);
    expect(result.similarity).toBeLessThan(100);
    expect(existsSync(diffPath)).toBe(true);

    // Cleanup
    unlinkSync(pathA);
    unlinkSync(pathB);
    unlinkSync(diffPath);
  });
});

describe('compare() — configurable options', () => {
  it('respects custom fail threshold', () => {
    const img = makeRedBox();
    // Identical images at any threshold should pass
    const result = compare(img, img, { failThreshold: 100 });
    expect(result.pass).toBe(true);
    expect(result.similarity).toBe(100);
  });
});
