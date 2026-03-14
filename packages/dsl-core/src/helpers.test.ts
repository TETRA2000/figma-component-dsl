import { describe, it, expect } from 'vitest';
import { hexToRGB, solidPaint, gradientPaint, defineTokens, tokenPaint, setAutoLayout } from './helpers.js';
import { VirtualFigmaApi } from './virtual-api.js';

describe('hexToRGB', () => {
  it('should convert black', () => {
    expect(hexToRGB('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should convert white', () => {
    expect(hexToRGB('#FFFFFF')).toEqual({ r: 1, g: 1, b: 1 });
  });

  it('should convert a color', () => {
    const rgb = hexToRGB('#FF5733');
    expect(rgb.r).toBeCloseTo(1.0, 2);
    expect(rgb.g).toBeCloseTo(0.341, 2);
    expect(rgb.b).toBeCloseTo(0.2, 2);
  });

  it('should handle lowercase hex', () => {
    const rgb = hexToRGB('#7c3aed');
    expect(rgb.r).toBeCloseTo(0.486, 2);
    expect(rgb.g).toBeCloseTo(0.227, 2);
    expect(rgb.b).toBeCloseTo(0.929, 2);
  });

  it('should throw on invalid hex', () => {
    expect(() => hexToRGB('invalid')).toThrow();
    expect(() => hexToRGB('#GGG')).toThrow();
  });
});

describe('solidPaint', () => {
  it('should create a SolidPaint with correct format', () => {
    const paint = solidPaint('#FF0000');
    expect(paint.type).toBe('SOLID');
    expect(paint.color).toEqual({ r: 1, g: 0, b: 0 });
    expect(paint.opacity).toBeUndefined();
  });

  it('should support optional opacity', () => {
    const paint = solidPaint('#FF0000', 0.5);
    expect(paint.type).toBe('SOLID');
    expect(paint.opacity).toBe(0.5);
  });
});

describe('gradientPaint', () => {
  it('should create a GradientPaint with stops', () => {
    const paint = gradientPaint([
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 1 },
    ]);
    expect(paint.type).toBe('GRADIENT_LINEAR');
    expect(paint.gradientStops.length).toBe(2);
    expect(paint.gradientStops[0].position).toBe(0);
    expect(paint.gradientStops[1].position).toBe(1);
    expect(paint.gradientStops[0].color).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });

  it('should compute correct transform for 0 degrees (top to bottom)', () => {
    const paint = gradientPaint([
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 1 },
    ], 0);
    const [[a, b, tx], [c, d, ty]] = paint.gradientTransform;
    // 0 degrees = top to bottom
    expect(a).toBeCloseTo(1, 5);
    expect(b).toBeCloseTo(0, 5);
    expect(tx).toBeCloseTo(0.5, 5);
    expect(c).toBeCloseTo(0, 5);
    expect(d).toBeCloseTo(1, 5);
    expect(ty).toBeCloseTo(0.5, 5);
  });

  it('should compute correct transform for 90 degrees', () => {
    const paint = gradientPaint([
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 1 },
    ], 90);
    const [[a, b, tx], [c, d, ty]] = paint.gradientTransform;
    expect(a).toBeCloseTo(0, 5);
    expect(b).toBeCloseTo(1, 5);
    expect(c).toBeCloseTo(-1, 5);
    expect(d).toBeCloseTo(0, 5);
  });

  it('should compute correct transform for 180 degrees', () => {
    const paint = gradientPaint([
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 1 },
    ], 180);
    const [[a, b], [c, d]] = paint.gradientTransform;
    expect(a).toBeCloseTo(-1, 5);
    expect(b).toBeCloseTo(0, 5);
    expect(c).toBeCloseTo(0, 5);
    expect(d).toBeCloseTo(-1, 5);
  });

  it('should compute correct transform for 45 degrees', () => {
    const paint = gradientPaint([
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 1 },
    ], 45);
    const [[a, b], [c, d]] = paint.gradientTransform;
    const cos45 = Math.cos(Math.PI / 4);
    const sin45 = Math.sin(Math.PI / 4);
    expect(a).toBeCloseTo(cos45, 5);
    expect(b).toBeCloseTo(sin45, 5);
    expect(c).toBeCloseTo(-sin45, 5);
    expect(d).toBeCloseTo(cos45, 5);
  });
});

describe('defineTokens / tokenPaint', () => {
  it('should define and resolve tokens', () => {
    const tokens = defineTokens({
      'primary-600': '#7c3aed',
      'gray-100': '#f3f4f6',
    });
    const paint = tokenPaint(tokens, 'primary-600');
    expect(paint.type).toBe('SOLID');
    expect(paint.color.r).toBeCloseTo(0.486, 2);
  });

  it('should throw on unknown token', () => {
    const tokens = defineTokens({ 'primary': '#000' });
    expect(() => tokenPaint(tokens, 'nonexistent')).toThrow();
  });
});

describe('setAutoLayout', () => {
  const api = new VirtualFigmaApi();

  it('should set direction and spacing', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'HORIZONTAL', spacing: 8 });
    expect(frame.layoutMode).toBe('HORIZONTAL');
    expect(frame.itemSpacing).toBe(8);
  });

  it('should map padX to paddingLeft and paddingRight', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'VERTICAL', padX: 16 });
    expect(frame.paddingLeft).toBe(16);
    expect(frame.paddingRight).toBe(16);
  });

  it('should map padY to paddingTop and paddingBottom', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'VERTICAL', padY: 12 });
    expect(frame.paddingTop).toBe(12);
    expect(frame.paddingBottom).toBe(12);
  });

  it('should support per-side padding', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'HORIZONTAL',
      padTop: 10,
      padRight: 20,
      padBottom: 30,
      padLeft: 40,
    });
    expect(frame.paddingTop).toBe(10);
    expect(frame.paddingRight).toBe(20);
    expect(frame.paddingBottom).toBe(30);
    expect(frame.paddingLeft).toBe(40);
  });

  it('should set alignment', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'HORIZONTAL',
      align: 'CENTER',
      counterAlign: 'MAX',
    });
    expect(frame.primaryAxisAlignItems).toBe('CENTER');
    expect(frame.counterAxisAlignItems).toBe('MAX');
  });

  it('should set unified sizing', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'HORIZONTAL', sizing: 'HUG' });
    expect(frame.layoutSizingHorizontal).toBe('HUG');
    expect(frame.layoutSizingVertical).toBe('HUG');
  });

  it('should override unified sizing with per-axis sizing', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'HORIZONTAL',
      sizing: 'HUG',
      widthSizing: 'FILL',
      heightSizing: 'FIXED',
    });
    expect(frame.layoutSizingHorizontal).toBe('FILL');
    expect(frame.layoutSizingVertical).toBe('FIXED');
  });

  it('should per-side padding override padX/padY', () => {
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'VERTICAL',
      padX: 16,
      padLeft: 24,
    });
    expect(frame.paddingLeft).toBe(24);
    expect(frame.paddingRight).toBe(16);
  });
});
