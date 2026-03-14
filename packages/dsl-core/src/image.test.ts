import { describe, it, expect } from 'vitest';
import { image, frame, group, component, componentSet } from './nodes.js';
import { imageFill, solid } from './colors.js';
import { computeDrawInstruction, isSupportedImageFormat } from './image-helpers.js';
import type { SingleDrawInstruction } from './image-helpers.js';

// --- Task 1.2: image() builder ---

describe('image()', () => {
  it('creates an IMAGE node with required props', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 200, y: 150 } });
    expect(node.type).toBe('IMAGE');
    expect(node.name).toBe('Photo');
    expect(node.imageSrc).toBe('./photo.png');
    expect(node.size).toEqual({ x: 200, y: 150 });
  });

  it('defaults fit to FILL', () => {
    const node = image('Img', { src: 'img.jpg', size: { x: 100, y: 100 } });
    expect(node.imageScaleMode).toBe('FILL');
  });

  it('accepts explicit fit option', () => {
    const node = image('Img', { src: 'img.jpg', size: { x: 100, y: 100 }, fit: 'FIT' });
    expect(node.imageScaleMode).toBe('FIT');
  });

  it('accepts HTTPS URLs as src', () => {
    const node = image('Remote', { src: 'https://example.com/img.png', size: { x: 100, y: 100 } });
    expect(node.imageSrc).toBe('https://example.com/img.png');
  });

  it('accepts cornerRadius', () => {
    const node = image('Round', { src: 'img.png', size: { x: 100, y: 100 }, cornerRadius: 8 });
    expect(node.cornerRadius).toBe(8);
  });

  it('accepts opacity and visible', () => {
    const node = image('Dim', { src: 'img.png', size: { x: 100, y: 100 }, opacity: 0.5, visible: false });
    expect(node.opacity).toBe(0.5);
    expect(node.visible).toBe(false);
  });

  it('defaults visible to true and opacity to 1', () => {
    const node = image('Img', { src: 'img.png', size: { x: 100, y: 100 } });
    expect(node.visible).toBe(true);
    expect(node.opacity).toBe(1);
  });

  it('accepts layout sizing props', () => {
    const node = image('Img', {
      src: 'img.png',
      size: { x: 100, y: 100 },
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FIXED',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
    expect(node.layoutSizingVertical).toBe('FIXED');
  });

  it('throws on empty name', () => {
    expect(() => image('', { src: 'img.png', size: { x: 100, y: 100 } })).toThrow();
  });

  it('throws on empty src', () => {
    expect(() => image('Img', { src: '', size: { x: 100, y: 100 } })).toThrow('Image src must be a non-empty string');
  });

  it('is accepted as child of FRAME', () => {
    const img = image('Img', { src: 'img.png', size: { x: 100, y: 100 } });
    const parent = frame('Container', { children: [img] });
    expect(parent.children).toHaveLength(1);
    expect(parent.children![0]!.type).toBe('IMAGE');
  });

  it('is accepted as child of GROUP', () => {
    const img = image('Img', { src: 'img.png', size: { x: 100, y: 100 } });
    const parent = group('G', [img]);
    expect(parent.children![0]!.type).toBe('IMAGE');
  });

  it('is accepted as child of COMPONENT', () => {
    const img = image('Img', { src: 'img.png', size: { x: 100, y: 100 } });
    const parent = component('C', { children: [img] });
    expect(parent.children![0]!.type).toBe('IMAGE');
  });

  it('is accepted as child of COMPONENT_SET', () => {
    const img = image('Img', { src: 'img.png', size: { x: 100, y: 100 } });
    const parent = componentSet('CS', { children: [img] });
    expect(parent.children![0]!.type).toBe('IMAGE');
  });
});

// --- Task 1.3: imageFill() builder ---

describe('imageFill()', () => {
  it('creates an IMAGE fill with defaults', () => {
    const fill = imageFill('./bg.png');
    expect(fill.type).toBe('IMAGE');
    expect(fill.src).toBe('./bg.png');
    expect(fill.scaleMode).toBe('FILL');
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it('accepts custom scaleMode', () => {
    const fill = imageFill('./bg.png', { scaleMode: 'TILE' });
    expect(fill.scaleMode).toBe('TILE');
  });

  it('accepts custom opacity', () => {
    const fill = imageFill('./bg.png', { opacity: 0.5 });
    expect(fill.opacity).toBe(0.5);
  });

  it('throws on empty src', () => {
    expect(() => imageFill('')).toThrow('Image fill src must be a non-empty string');
  });

  it('coexists with solid fills in a fills array', () => {
    const fills = [solid('#ff0000'), imageFill('./bg.png'), solid('#0000ff')];
    expect(fills).toHaveLength(3);
    expect(fills[0]!.type).toBe('SOLID');
    expect(fills[1]!.type).toBe('IMAGE');
    expect(fills[2]!.type).toBe('SOLID');
  });

  it('can be used on a frame node', () => {
    const f = frame('WithImage', {
      size: { x: 400, y: 300 },
      fills: [imageFill('./hero.jpg')],
    });
    expect(f.fills).toHaveLength(1);
    expect(f.fills![0]!.type).toBe('IMAGE');
  });
});

// --- Task 2: image-helpers ---

describe('computeDrawInstruction()', () => {
  describe('FILL mode (cover)', () => {
    it('handles same aspect ratio', () => {
      const result = computeDrawInstruction('FILL', 200, 100, 400, 200);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      expect(d.dw).toBe(400);
      expect(d.dh).toBe(200);
    });

    it('handles landscape image in square frame', () => {
      const result = computeDrawInstruction('FILL', 200, 100, 100, 100);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      // Scale = max(100/200, 100/100) = 1
      // sw = 100/1 = 100, sh = 100/1 = 100
      // sx = (200-100)/2 = 50
      expect(d.sx).toBe(50);
      expect(d.sy).toBe(0);
      expect(d.sw).toBe(100);
      expect(d.sh).toBe(100);
      expect(d.dw).toBe(100);
      expect(d.dh).toBe(100);
    });

    it('handles portrait image in landscape frame', () => {
      const result = computeDrawInstruction('FILL', 100, 200, 400, 200);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      // Scale = max(400/100, 200/200) = 4
      // sw = 400/4 = 100, sh = 200/4 = 50
      // sx = (100-100)/2 = 0, sy = (200-50)/2 = 75
      expect(d.sx).toBe(0);
      expect(d.sy).toBe(75);
    });
  });

  describe('FIT mode (contain)', () => {
    it('fits landscape image in square frame', () => {
      const result = computeDrawInstruction('FIT', 200, 100, 100, 100);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      // Scale = min(100/200, 100/100) = 0.5
      // dw = 200*0.5 = 100, dh = 100*0.5 = 50
      // dx = (100-100)/2 = 0, dy = (100-50)/2 = 25
      expect(d.sx).toBe(0);
      expect(d.sy).toBe(0);
      expect(d.sw).toBe(200);
      expect(d.sh).toBe(100);
      expect(d.dw).toBe(100);
      expect(d.dh).toBe(50);
      expect(d.dy).toBe(25);
    });

    it('fits portrait image in landscape frame', () => {
      const result = computeDrawInstruction('FIT', 100, 200, 400, 200);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      // Scale = min(400/100, 200/200) = 1
      // dw = 100, dh = 200
      // dx = (400-100)/2 = 150
      expect(d.dw).toBe(100);
      expect(d.dh).toBe(200);
      expect(d.dx).toBe(150);
    });
  });

  describe('CROP mode (centered, no scaling)', () => {
    it('centers image at original size', () => {
      const result = computeDrawInstruction('CROP', 200, 100, 300, 300);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      expect(d.sx).toBe(0);
      expect(d.sy).toBe(0);
      expect(d.sw).toBe(200);
      expect(d.sh).toBe(100);
      expect(d.dw).toBe(200);
      expect(d.dh).toBe(100);
      expect(d.dx).toBe(50);
      expect(d.dy).toBe(100);
    });

    it('centers image larger than frame', () => {
      const result = computeDrawInstruction('CROP', 400, 400, 100, 100);
      expect(result.type).toBe('draw');
      const d = result as SingleDrawInstruction;
      expect(d.dx).toBe(-150);
      expect(d.dy).toBe(-150);
    });
  });

  describe('TILE mode', () => {
    it('returns TileInstruction', () => {
      const result = computeDrawInstruction('TILE', 50, 50, 200, 200);
      expect(result.type).toBe('tile');
    });
  });
});

describe('isSupportedImageFormat()', () => {
  it('accepts PNG', () => expect(isSupportedImageFormat('photo.png')).toBe(true));
  it('accepts JPG', () => expect(isSupportedImageFormat('photo.jpg')).toBe(true));
  it('accepts JPEG', () => expect(isSupportedImageFormat('photo.jpeg')).toBe(true));
  it('accepts WebP', () => expect(isSupportedImageFormat('photo.webp')).toBe(true));
  it('accepts uppercase extensions', () => expect(isSupportedImageFormat('photo.PNG')).toBe(true));
  it('rejects GIF', () => expect(isSupportedImageFormat('photo.gif')).toBe(false));
  it('rejects SVG', () => expect(isSupportedImageFormat('icon.svg')).toBe(false));
  it('rejects BMP', () => expect(isSupportedImageFormat('image.bmp')).toBe(false));
  it('handles paths with directories', () => expect(isSupportedImageFormat('/assets/img/photo.png')).toBe(true));
});
