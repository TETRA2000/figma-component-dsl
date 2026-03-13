import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PNG } from "pngjs";
import { compare } from "../comparator.js";

/** Helper: create a solid-colour PNG buffer and write it to `filePath`. */
function makeSolidPng(
  width: number,
  height: number,
  rgba: [number, number, number, number],
): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) << 2;
      png.data[idx] = rgba[0];
      png.data[idx + 1] = rgba[1];
      png.data[idx + 2] = rgba[2];
      png.data[idx + 3] = rgba[3];
    }
  }
  return PNG.sync.write(png);
}

describe("compare", () => {
  let tmpDir: string;

  beforeAll(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "comparator-test-"));
  });

  afterAll(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("should return 100% similarity for identical images", async () => {
    const buf = makeSolidPng(10, 10, [255, 0, 0, 255]);
    const pathA = join(tmpDir, "identical-a.png");
    const pathB = join(tmpDir, "identical-b.png");
    await writeFile(pathA, buf);
    await writeFile(pathB, buf);

    const result = await compare(pathA, pathB);

    expect(result.similarity).toBe(1);
    expect(result.mismatchedPixels).toBe(0);
    expect(result.totalPixels).toBe(100);
    expect(result.dimensionMatch).toBe(true);
    expect(result.pass).toBe(true);
    expect(Buffer.isBuffer(result.diffImage)).toBe(true);
  });

  it("should report low similarity for completely different images", async () => {
    const bufA = makeSolidPng(10, 10, [255, 0, 0, 255]); // red
    const bufB = makeSolidPng(10, 10, [0, 0, 255, 255]); // blue
    const pathA = join(tmpDir, "diff-a.png");
    const pathB = join(tmpDir, "diff-b.png");
    await writeFile(pathA, bufA);
    await writeFile(pathB, bufB);

    const result = await compare(pathA, pathB);

    expect(result.similarity).toBeLessThan(0.5);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
    expect(result.dimensionMatch).toBe(true);
    expect(result.pass).toBe(false);
  });

  it("should handle dimension mismatch by padding smaller image", async () => {
    const bufA = makeSolidPng(10, 10, [0, 0, 0, 255]);
    const bufB = makeSolidPng(20, 15, [0, 0, 0, 255]);
    const pathA = join(tmpDir, "dim-a.png");
    const pathB = join(tmpDir, "dim-b.png");
    await writeFile(pathA, bufA);
    await writeFile(pathB, bufB);

    const result = await compare(pathA, pathB);

    expect(result.dimensionMatch).toBe(false);
    expect(result.totalPixels).toBe(20 * 15); // max dimensions
    // The overlapping 10x10 black region matches; remaining pixels are padded black ⟶ also match
    expect(result.similarity).toBe(1);
    expect(result.pass).toBe(true);
  });

  it("should respect failThreshold for pass/fail", async () => {
    const bufA = makeSolidPng(10, 10, [255, 0, 0, 255]);
    const bufB = makeSolidPng(10, 10, [0, 0, 255, 255]);
    const pathA = join(tmpDir, "thresh-a.png");
    const pathB = join(tmpDir, "thresh-b.png");
    await writeFile(pathA, bufA);
    await writeFile(pathB, bufB);

    // Very lenient threshold — even very different images should pass
    const lenient = await compare(pathA, pathB, { failThreshold: 0.0 });
    expect(lenient.pass).toBe(true);

    // Very strict threshold — different images should fail
    const strict = await compare(pathA, pathB, { failThreshold: 0.99 });
    expect(strict.pass).toBe(false);
  });

  it("should accept a custom diffColor", async () => {
    const bufA = makeSolidPng(4, 4, [255, 0, 0, 255]);
    const bufB = makeSolidPng(4, 4, [0, 255, 0, 255]);
    const pathA = join(tmpDir, "color-a.png");
    const pathB = join(tmpDir, "color-b.png");
    await writeFile(pathA, bufA);
    await writeFile(pathB, bufB);

    const result = await compare(pathA, pathB, {
      diffColor: [0, 0, 255],
    });

    // Just verify it runs and returns a diff image
    expect(result.diffImage.length).toBeGreaterThan(0);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
  });
});
