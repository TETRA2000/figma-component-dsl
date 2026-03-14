import { describe, it, expect } from 'vitest';
import { hex, solid, gradient, radialGradient, defineTokens, token } from './colors.js';

describe('hex()', () => {
  it('converts 6-digit hex to RGBA', () => {
    const color = hex('#ff0000');
    expect(color.r).toBeCloseTo(1.0);
    expect(color.g).toBeCloseTo(0.0);
    expect(color.b).toBeCloseTo(0.0);
    expect(color.a).toBe(1);
  });

  it('converts lowercase hex', () => {
    const color = hex('#7c3aed');
    expect(color.r).toBeCloseTo(0x7c / 255);
    expect(color.g).toBeCloseTo(0x3a / 255);
    expect(color.b).toBeCloseTo(0xed / 255);
  });

  it('handles hex without # prefix', () => {
    const color = hex('00ff00');
    expect(color.g).toBeCloseTo(1.0);
  });

  it('converts 8-digit hex with alpha', () => {
    const color = hex('#ff000080');
    expect(color.r).toBeCloseTo(1.0);
    expect(color.g).toBeCloseTo(0.0);
    expect(color.b).toBeCloseTo(0.0);
    expect(color.a).toBeCloseTo(128 / 255);
  });

  it('converts 8-digit hex with full alpha', () => {
    const color = hex('#00ff00ff');
    expect(color.g).toBeCloseTo(1.0);
    expect(color.a).toBeCloseTo(1.0);
  });

  it('throws on invalid hex', () => {
    expect(() => hex('xyz')).toThrow();
    expect(() => hex('#gg0000')).toThrow();
  });
});

describe('solid()', () => {
  it('creates a solid fill from hex', () => {
    const fill = solid('#ffffff');
    expect(fill.type).toBe('SOLID');
    expect(fill.color.r).toBeCloseTo(1.0);
    expect(fill.color.g).toBeCloseTo(1.0);
    expect(fill.color.b).toBeCloseTo(1.0);
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it('supports custom opacity', () => {
    const fill = solid('#000000', 0.5);
    expect(fill.opacity).toBe(0.5);
  });

  it('extracts opacity from 8-digit hex', () => {
    const fill = solid('#ffffff80');
    expect(fill.color.r).toBeCloseTo(1.0);
    expect(fill.color.a).toBe(1); // color.a stays 1
    expect(fill.opacity).toBeCloseTo(128 / 255); // opacity comes from hex alpha
  });

  it('explicit opacity overrides 8-digit hex alpha', () => {
    const fill = solid('#ffffff80', 0.3);
    expect(fill.opacity).toBe(0.3); // explicit wins
  });
});

describe('gradient()', () => {
  it('creates a linear gradient fill', () => {
    const fill = gradient([
      { hex: '#7c3aed', position: 0 },
      { hex: '#4f46e5', position: 1 },
    ]);
    expect(fill.type).toBe('GRADIENT_LINEAR');
    expect(fill.gradientStops).toHaveLength(2);
    expect(fill.gradientStops[0]!.position).toBe(0);
    expect(fill.gradientStops[1]!.position).toBe(1);
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it('supports custom angle', () => {
    const fill = gradient([
      { hex: '#000000', position: 0 },
      { hex: '#ffffff', position: 1 },
    ], 45);
    expect(fill.gradientTransform).toBeDefined();
    // 45 degrees should produce non-zero rotation components
    expect(fill.gradientTransform[0][0]).not.toBe(1);
  });

  it('defaults to 0-degree (left to right) gradient', () => {
    const fill = gradient([
      { hex: '#000000', position: 0 },
      { hex: '#ffffff', position: 1 },
    ]);
    // 0 degrees = left to right = identity-like transform
    expect(fill.gradientTransform[0][0]).toBeCloseTo(1);
  });

  it('preserves per-stop alpha from 8-digit hex', () => {
    const fill = gradient([
      { hex: '#FF000080', position: 0 },
      { hex: '#0000FFFF', position: 1 },
    ]);
    expect(fill.gradientStops[0]!.color.r).toBeCloseTo(1.0);
    expect(fill.gradientStops[0]!.color.a).toBeCloseTo(128 / 255);
    expect(fill.gradientStops[1]!.color.b).toBeCloseTo(1.0);
    expect(fill.gradientStops[1]!.color.a).toBeCloseTo(1.0);
  });
});

describe('defineTokens() and token()', () => {
  it('defines and resolves color tokens', () => {
    const tokens = defineTokens({
      primary: '#7c3aed',
      secondary: '#4f46e5',
    });
    const fill = token(tokens, 'primary');
    expect(fill.type).toBe('SOLID');
    expect(fill.color.r).toBeCloseTo(0x7c / 255);
  });

  it('throws on undefined token', () => {
    const tokens = defineTokens({ primary: '#000000' });
    expect(() => token(tokens, 'nonexistent')).toThrow();
  });
});

describe('radialGradient()', () => {
  it('creates a radial gradient fill', () => {
    const fill = radialGradient([
      { hex: '#ff0000', position: 0 },
      { hex: '#0000ff', position: 1 },
    ]);
    expect(fill.type).toBe('GRADIENT_RADIAL');
    expect(fill.gradientStops).toHaveLength(2);
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it('supports custom center and radius', () => {
    const fill = radialGradient([
      { hex: '#000000', position: 0 },
      { hex: '#ffffff', position: 1 },
    ], { center: { x: 0.3, y: 0.7 }, radius: 0.8 });
    expect(fill.center).toEqual({ x: 0.3, y: 0.7 });
    expect(fill.radius).toBe(0.8);
  });
});

describe('multiple fills ordering', () => {
  it('preserves fill array order', () => {
    const fills = [
      solid('#ff0000'),
      solid('#00ff00'),
      solid('#0000ff'),
    ];
    expect(fills[0]!.color.r).toBeCloseTo(1.0);
    expect(fills[1]!.color.g).toBeCloseTo(1.0);
    expect(fills[2]!.color.b).toBeCloseTo(1.0);
  });
});
