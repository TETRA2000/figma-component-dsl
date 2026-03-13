import { describe, expect, it, afterEach } from "vitest";
import { compare } from "./comparator.js";
import { PNG } from "pngjs";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function createTestPng(
  width: number,
  height: number,
  color: [number, number, number, number],
): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      png.data[idx] = color[0]!;
      png.data[idx + 1] = color[1]!;
      png.data[idx + 2] = color[2]!;
      png.data[idx + 3] = color[3]!;
    }
  }
  return PNG.sync.write(png);
}

const tmpDir = tmpdir();
const filesToClean: string[] = [];

function tmpPath(name: string): string {
  const p = join(tmpDir, `figma-dsl-test-${name}`);
  filesToClean.push(p);
  return p;
}

afterEach(() => {
  for (const f of filesToClean) {
    if (existsSync(f)) unlinkSync(f);
  }
  filesToClean.length = 0;
});

describe("compare", () => {
  it("returns 100% similarity for identical images", () => {
    const img = createTestPng(10, 10, [255, 0, 0, 255]);
    const path1 = tmpPath("identical1.png");
    const path2 = tmpPath("identical2.png");
    const diffPath = tmpPath("diff-identical.png");
    writeFileSync(path1, img);
    writeFileSync(path2, img);

    const result = compare(path1, path2, diffPath);
    expect(result.similarity).toBe(100);
    expect(result.mismatchedPixels).toBe(0);
    expect(result.totalPixels).toBe(100);
    expect(result.dimensionMatch).toBe(true);
    expect(result.passed).toBe(true);
    expect(result.diffImagePath).toBeNull();
  });

  it("detects differences between images", () => {
    const img1 = createTestPng(10, 10, [255, 0, 0, 255]);
    const img2 = createTestPng(10, 10, [0, 0, 255, 255]);
    const path1 = tmpPath("diff1.png");
    const path2 = tmpPath("diff2.png");
    const diffPath = tmpPath("diff-output.png");
    writeFileSync(path1, img1);
    writeFileSync(path2, img2);

    const result = compare(path1, path2, diffPath);
    expect(result.similarity).toBeLessThan(100);
    expect(result.mismatchedPixels).toBeGreaterThan(0);
    expect(result.dimensionMatch).toBe(true);
    expect(result.diffImagePath).toBe(diffPath);
    expect(existsSync(diffPath)).toBe(true);
  });

  it("handles different dimensions by padding", () => {
    const img1 = createTestPng(10, 10, [255, 0, 0, 255]);
    const img2 = createTestPng(20, 20, [255, 0, 0, 255]);
    const path1 = tmpPath("small.png");
    const path2 = tmpPath("large.png");
    const diffPath = tmpPath("diff-size.png");
    writeFileSync(path1, img1);
    writeFileSync(path2, img2);

    const result = compare(path1, path2, diffPath);
    expect(result.dimensionMatch).toBe(false);
    expect(result.totalPixels).toBe(400); // 20x20
  });

  it("respects failThreshold option", () => {
    const img1 = createTestPng(10, 10, [255, 0, 0, 255]);
    const img2 = createTestPng(10, 10, [0, 0, 255, 255]);
    const path1 = tmpPath("thresh1.png");
    const path2 = tmpPath("thresh2.png");
    const diffPath = tmpPath("diff-thresh.png");
    writeFileSync(path1, img1);
    writeFileSync(path2, img2);

    const result = compare(path1, path2, diffPath, { failThreshold: 0 });
    expect(result.passed).toBe(true); // any similarity passes with 0% threshold
  });

  it("comparison is commutative", () => {
    const img1 = createTestPng(10, 10, [255, 0, 0, 255]);
    const img2 = createTestPng(10, 10, [0, 255, 0, 255]);
    const p1 = tmpPath("comm1.png");
    const p2 = tmpPath("comm2.png");
    const d1 = tmpPath("diff-comm1.png");
    const d2 = tmpPath("diff-comm2.png");
    writeFileSync(p1, img1);
    writeFileSync(p2, img2);

    const r1 = compare(p1, p2, d1);
    const r2 = compare(p2, p1, d2);
    expect(r1.similarity).toBe(r2.similarity);
    expect(r1.mismatchedPixels).toBe(r2.mismatchedPixels);
  });
});
