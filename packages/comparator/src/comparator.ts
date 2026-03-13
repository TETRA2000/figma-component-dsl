import { readFile } from "node:fs/promises";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

export interface CompareOptions {
  /** pixelmatch threshold (0–1, default 0.1) */
  threshold?: number;
  /** minimum similarity to pass (0–1, default 0.95) */
  failThreshold?: number;
  /** RGB colour used for diff highlights (default [255, 0, 0]) */
  diffColor?: [number, number, number];
}

export interface CompareResult {
  /** 0–1 ratio of matching pixels */
  similarity: number;
  mismatchedPixels: number;
  totalPixels: number;
  dimensionMatch: boolean;
  pass: boolean;
  /** PNG-encoded diff image */
  diffImage: Buffer;
}

/**
 * Decode a PNG file from disk into a pngjs PNG instance.
 */
async function decodePng(filePath: string): Promise<PNG> {
  const buf = await readFile(filePath);
  return PNG.sync.read(buf);
}

/**
 * Pad an image so that it fits into the given width/height,
 * filling the extra area with `bgColor` (RGBA).
 */
function padImage(
  src: PNG,
  targetWidth: number,
  targetHeight: number,
  bgColor: [number, number, number, number] = [0, 0, 0, 255],
): PNG {
  const dst = new PNG({ width: targetWidth, height: targetHeight, fill: true });

  // Fill background
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const idx = (y * targetWidth + x) << 2;
      dst.data[idx] = bgColor[0]!;
      dst.data[idx + 1] = bgColor[1]!;
      dst.data[idx + 2] = bgColor[2]!;
      dst.data[idx + 3] = bgColor[3]!;
    }
  }

  // Copy source pixels
  PNG.bitblt(src, dst, 0, 0, src.width, src.height, 0, 0);

  return dst;
}

/**
 * Compare two PNG images pixel-by-pixel.
 *
 * When the images have different dimensions the smaller one is padded
 * (with black) so that pixelmatch can run, and `dimensionMatch` is
 * set to `false` in the result.
 */
export async function compare(
  image1Path: string,
  image2Path: string,
  options: CompareOptions = {},
): Promise<CompareResult> {
  const {
    threshold = 0.1,
    failThreshold = 0.95,
    diffColor = [255, 0, 0] as [number, number, number],
  } = options;

  let img1 = await decodePng(image1Path);
  let img2 = await decodePng(image2Path);

  const dimensionMatch =
    img1.width === img2.width && img1.height === img2.height;

  // Normalise dimensions by padding the smaller image
  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);

  if (!dimensionMatch) {
    if (img1.width !== width || img1.height !== height) {
      img1 = padImage(img1, width, height);
    }
    if (img2.width !== width || img2.height !== height) {
      img2 = padImage(img2, width, height);
    }
  }

  const totalPixels = width * height;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    new Uint8Array(img1.data.buffer, img1.data.byteOffset, img1.data.byteLength),
    new Uint8Array(img2.data.buffer, img2.data.byteOffset, img2.data.byteLength),
    new Uint8Array(diff.data.buffer, diff.data.byteOffset, diff.data.byteLength),
    width,
    height,
    {
      threshold,
      includeAA: true,
      diffColor,
    },
  );

  const similarity = totalPixels === 0 ? 1 : (totalPixels - mismatchedPixels) / totalPixels;
  const pass = similarity >= failThreshold;

  const diffImage = PNG.sync.write(diff);

  return {
    similarity,
    mismatchedPixels,
    totalPixels,
    dimensionMatch,
    pass,
    diffImage,
  };
}
