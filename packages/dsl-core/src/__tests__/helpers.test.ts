import { describe, it, expect } from 'vitest';
import {
  hexToRGB,
  solidPaint,
  gradientPaint,
  defineTokens,
  tokenPaint,
  setAutoLayout,
  REFERENCE_COLORS,
  SEMANTIC_COLORS,
  REFERENCE_GRADIENTS,
  SPACING_SCALE,
  RADIUS_SCALE,
  FONT_SIZE_SCALE,
  FONT_WEIGHTS,
} from '../helpers.js';
import { VirtualFigmaApi } from '../virtual-api.js';

describe('hexToRGB', () => {
  it('converts #FF0000 to red', () => {
    const rgb = hexToRGB('#FF0000');
    expect(rgb.r).toBeCloseTo(1, 5);
    expect(rgb.g).toBeCloseTo(0, 5);
    expect(rgb.b).toBeCloseTo(0, 5);
  });

  it('converts #7c3aed (primary-600)', () => {
    const rgb = hexToRGB('#7c3aed');
    expect(rgb.r).toBeCloseTo(124 / 255, 3);
    expect(rgb.g).toBeCloseTo(58 / 255, 3);
    expect(rgb.b).toBeCloseTo(237 / 255, 3);
  });

  it('handles lowercase hex', () => {
    const rgb = hexToRGB('#ffffff');
    expect(rgb.r).toBeCloseTo(1, 5);
    expect(rgb.g).toBeCloseTo(1, 5);
    expect(rgb.b).toBeCloseTo(1, 5);
  });

  it('handles 000000', () => {
    const rgb = hexToRGB('#000000');
    expect(rgb.r).toBe(0);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });
});

describe('solidPaint', () => {
  it('creates a solid paint from hex', () => {
    const paint = solidPaint('#FF0000');
    expect(paint.type).toBe('SOLID');
    expect(paint.color.r).toBeCloseTo(1, 5);
    expect(paint.color.g).toBe(0);
    expect(paint.color.b).toBe(0);
    expect(paint.opacity).toBeUndefined();
  });

  it('supports optional opacity', () => {
    const paint = solidPaint('#FF0000', 0.5);
    expect(paint.opacity).toBe(0.5);
  });
});

describe('gradientPaint', () => {
  it('creates a gradient paint with default angle (0)', () => {
    const paint = gradientPaint([
      { color: '#7c3aed', position: 0 },
      { color: '#4f46e5', position: 1 },
    ]);
    expect(paint.type).toBe('GRADIENT_LINEAR');
    expect(paint.gradientStops).toHaveLength(2);
    expect(paint.gradientStops[0]!.position).toBe(0);
    expect(paint.gradientStops[1]!.position).toBe(1);
    expect(paint.gradientTransform).toBeDefined();
  });

  it('creates a gradient paint with 135 degree angle', () => {
    const paint = gradientPaint(
      [
        { color: '#7c3aed', position: 0 },
        { color: '#4f46e5', position: 1 },
      ],
      135,
    );
    expect(paint.type).toBe('GRADIENT_LINEAR');
    // Verify transform matrix is 2x3 array
    expect(paint.gradientTransform).toHaveLength(2);
    expect(paint.gradientTransform[0]).toHaveLength(3);
    expect(paint.gradientTransform[1]).toHaveLength(3);
  });

  it('gradient stops include alpha channel', () => {
    const paint = gradientPaint([
      { color: '#FF0000', position: 0 },
    ]);
    expect(paint.gradientStops[0]!.color).toHaveProperty('a');
    expect(paint.gradientStops[0]!.color.a).toBe(1);
  });
});

describe('defineTokens / tokenPaint', () => {
  it('creates and resolves color tokens', () => {
    const tokens = defineTokens({
      primary: '#7c3aed',
      secondary: '#4f46e5',
    });
    const paint = tokenPaint(tokens, 'primary');
    expect(paint.type).toBe('SOLID');
    expect(paint.color.r).toBeCloseTo(124 / 255, 3);
  });

  it('throws for unknown token', () => {
    const tokens = defineTokens({ primary: '#7c3aed' });
    expect(() => tokenPaint(tokens, 'unknown')).toThrow();
  });
});

describe('REFERENCE_COLORS', () => {
  it('contains primary color scale', () => {
    expect(REFERENCE_COLORS['primary-50']).toBe('#f5f3ff');
    expect(REFERENCE_COLORS['primary-600']).toBe('#7c3aed');
    expect(REFERENCE_COLORS['primary-900']).toBe('#4c1d95');
  });

  it('contains gray scale', () => {
    expect(REFERENCE_COLORS['gray-50']).toBe('#f9fafb');
    expect(REFERENCE_COLORS['gray-950']).toBe('#030712');
  });

  it('contains accent colors', () => {
    expect(REFERENCE_COLORS['pink-500']).toBe('#ec4899');
    expect(REFERENCE_COLORS['orange-500']).toBe('#f97316');
    expect(REFERENCE_COLORS['cyan-500']).toBe('#06b6d4');
    expect(REFERENCE_COLORS['green-500']).toBe('#22c55e');
  });

  it('contains white and black', () => {
    expect(REFERENCE_COLORS['white']).toBe('#ffffff');
    expect(REFERENCE_COLORS['black']).toBe('#000000');
  });
});

describe('SEMANTIC_COLORS', () => {
  it('maps semantic tokens to concrete hex values', () => {
    expect(SEMANTIC_COLORS['text-primary']).toBe('#111827');
    expect(SEMANTIC_COLORS['text-secondary']).toBe('#4b5563');
    expect(SEMANTIC_COLORS['text-inverse']).toBe('#ffffff');
    expect(SEMANTIC_COLORS['bg-primary']).toBe('#ffffff');
    expect(SEMANTIC_COLORS['bg-inverse']).toBe('#111827');
    expect(SEMANTIC_COLORS['border-default']).toBe('#e5e7eb');
  });
});

describe('REFERENCE_GRADIENTS', () => {
  it('contains gradient-primary', () => {
    const g = REFERENCE_GRADIENTS['gradient-primary'];
    expect(g).toBeDefined();
    expect(g!.stops).toHaveLength(2);
    expect(g!.angle).toBe(135);
  });

  it('contains gradient-hero with 3 stops', () => {
    const g = REFERENCE_GRADIENTS['gradient-hero'];
    expect(g).toBeDefined();
    expect(g!.stops).toHaveLength(3);
  });
});

describe('SPACING_SCALE', () => {
  it('contains space values in pixels', () => {
    expect(SPACING_SCALE['space-1']).toBe(4);
    expect(SPACING_SCALE['space-4']).toBe(16);
    expect(SPACING_SCALE['space-8']).toBe(32);
    expect(SPACING_SCALE['space-24']).toBe(96);
  });
});

describe('RADIUS_SCALE', () => {
  it('contains radius values', () => {
    expect(RADIUS_SCALE['radius-sm']).toBe(6);
    expect(RADIUS_SCALE['radius-md']).toBe(10);
    expect(RADIUS_SCALE['radius-full']).toBe(9999);
  });
});

describe('FONT_SIZE_SCALE', () => {
  it('contains font size values in pixels', () => {
    expect(FONT_SIZE_SCALE['text-xs']).toBe(12);
    expect(FONT_SIZE_SCALE['text-base']).toBe(16);
    expect(FONT_SIZE_SCALE['text-6xl']).toBe(60);
  });
});

describe('FONT_WEIGHTS', () => {
  it('contains standard weight values', () => {
    expect(FONT_WEIGHTS['regular']).toBe(400);
    expect(FONT_WEIGHTS['medium']).toBe(500);
    expect(FONT_WEIGHTS['semibold']).toBe(600);
    expect(FONT_WEIGHTS['bold']).toBe(700);
  });
});

describe('setAutoLayout', () => {
  it('sets direction and spacing', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'HORIZONTAL', spacing: 8 });
    expect(frame.layoutMode).toBe('HORIZONTAL');
    expect(frame.itemSpacing).toBe(8);
  });

  it('sets uniform padding via padX/padY', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, { direction: 'VERTICAL', padX: 16, padY: 8 });
    expect(frame.paddingLeft).toBe(16);
    expect(frame.paddingRight).toBe(16);
    expect(frame.paddingTop).toBe(8);
    expect(frame.paddingBottom).toBe(8);
  });

  it('sets per-side padding', () => {
    const api = new VirtualFigmaApi();
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

  it('per-side padding overrides padX/padY', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'HORIZONTAL',
      padX: 16,
      padLeft: 8,
    });
    expect(frame.paddingLeft).toBe(8);
    expect(frame.paddingRight).toBe(16);
  });

  it('sets alignment', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'HORIZONTAL',
      align: 'CENTER',
      counterAlign: 'MAX',
    });
    expect(frame.primaryAxisAlignItems).toBe('CENTER');
    expect(frame.counterAxisAlignItems).toBe('MAX');
  });

  it('sets sizing mode', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'VERTICAL',
      sizing: 'HUG',
    });
    expect(frame.layoutSizingHorizontal).toBe('HUG');
    expect(frame.layoutSizingVertical).toBe('HUG');
  });

  it('sets per-axis sizing', () => {
    const api = new VirtualFigmaApi();
    const frame = api.createFrame();
    setAutoLayout(frame, {
      direction: 'VERTICAL',
      widthSizing: 'FILL',
      heightSizing: 'HUG',
    });
    expect(frame.layoutSizingHorizontal).toBe('FILL');
    expect(frame.layoutSizingVertical).toBe('HUG');
  });
});
