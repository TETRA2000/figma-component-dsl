import type { ImageScaleMode } from './types.js';

export interface SingleDrawInstruction {
  readonly type: 'draw';
  readonly sx: number;
  readonly sy: number;
  readonly sw: number;
  readonly sh: number;
  readonly dx: number;
  readonly dy: number;
  readonly dw: number;
  readonly dh: number;
}

export interface TileInstruction {
  readonly type: 'tile';
}

export type DrawInstruction = SingleDrawInstruction | TileInstruction;

export function computeDrawInstruction(
  mode: ImageScaleMode,
  imageWidth: number,
  imageHeight: number,
  frameWidth: number,
  frameHeight: number,
): DrawInstruction {
  switch (mode) {
    case 'FILL': {
      // Cover: scale to fill frame, crop overflow (centered)
      const scale = Math.max(frameWidth / imageWidth, frameHeight / imageHeight);
      const sw = frameWidth / scale;
      const sh = frameHeight / scale;
      const sx = (imageWidth - sw) / 2;
      const sy = (imageHeight - sh) / 2;
      return { type: 'draw', sx, sy, sw, sh, dx: 0, dy: 0, dw: frameWidth, dh: frameHeight };
    }
    case 'FIT': {
      // Contain: scale to fit within frame, letterbox (centered)
      const scale = Math.min(frameWidth / imageWidth, frameHeight / imageHeight);
      const dw = imageWidth * scale;
      const dh = imageHeight * scale;
      const dx = (frameWidth - dw) / 2;
      const dy = (frameHeight - dh) / 2;
      return { type: 'draw', sx: 0, sy: 0, sw: imageWidth, sh: imageHeight, dx, dy, dw, dh };
    }
    case 'CROP': {
      // Center at original size, clip overflow
      const dx = (frameWidth - imageWidth) / 2;
      const dy = (frameHeight - imageHeight) / 2;
      return { type: 'draw', sx: 0, sy: 0, sw: imageWidth, sh: imageHeight, dx, dy, dw: imageWidth, dh: imageHeight };
    }
    case 'TILE': {
      return { type: 'tile' };
    }
  }
}

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

export function isSupportedImageFormat(filePath: string): boolean {
  const ext = filePath.toLowerCase().replace(/^.*(\.[^.]+)$/, '$1');
  return SUPPORTED_EXTENSIONS.has(ext);
}
