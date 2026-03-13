import { describe, it, expect } from 'vitest';
import { hex, solid, gradient, defineTokens, token, stroke } from '../colors.js';

describe('Color helpers', () => {
  describe('hex()', () => {
    it('converts 6-digit hex to RGBA with alpha 1', () => {
      const color = hex('#FF0000');
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
      expect(color.a).toBe(1);
    });

    it('handles black and white', () => {
      const black = hex('#000000');
      expect(black.r).toBe(0);
      expect(black.g).toBe(0);
      expect(black.b).toBe(0);

      const white = hex('#FFFFFF');
      expect(white.r).toBeCloseTo(1.0);
      expect(white.g).toBeCloseTo(1.0);
      expect(white.b).toBeCloseTo(1.0);
    });

    it('throws on invalid hex string', () => {
      expect(() => hex('FF0000')).toThrow();
      expect(() => hex('#FFF')).toThrow();
      expect(() => hex('#GGGGGG')).toThrow();
    });
  });

  describe('solid()', () => {
    it('creates a SolidFill from hex string', () => {
      const fill = solid('#7c3aed');
      expect(fill.type).toBe('SOLID');
      expect(fill.color.r).toBeCloseTo(0x7c / 255);
      expect(fill.opacity).toBe(1);
      expect(fill.visible).toBe(true);
    });

    it('accepts optional opacity', () => {
      const fill = solid('#FF0000', 0.5);
      expect(fill.opacity).toBe(0.5);
    });
  });

  describe('gradient()', () => {
    it('creates a GradientFill with stops and default angle 0', () => {
      const fill = gradient([
        { hex: '#7c3aed', position: 0 },
        { hex: '#6366f1', position: 1 },
      ]);
      expect(fill.type).toBe('GRADIENT_LINEAR');
      expect(fill.gradientStops).toHaveLength(2);
      expect(fill.gradientStops[0]!.position).toBe(0);
      expect(fill.gradientStops[1]!.position).toBe(1);
      expect(fill.opacity).toBe(1);
      expect(fill.visible).toBe(true);
    });

    it('creates gradient with custom angle', () => {
      const fill = gradient(
        [
          { hex: '#000000', position: 0 },
          { hex: '#FFFFFF', position: 1 },
        ],
        90,
      );
      expect(fill.gradientTransform).toBeDefined();
      // 90 degree rotation should have specific transform
    });

    it('supports 3-stop gradients', () => {
      const fill = gradient([
        { hex: '#000000', position: 0 },
        { hex: '#7c3aed', position: 0.5 },
        { hex: '#FFFFFF', position: 1 },
      ]);
      expect(fill.gradientStops).toHaveLength(3);
    });
  });

  describe('stroke()', () => {
    it('creates a StrokePaint from hex, weight', () => {
      const s = stroke('#e5e7eb', 1);
      expect(s.color.r).toBeCloseTo(0xe5 / 255);
      expect(s.weight).toBe(1);
      expect(s.align).toBeUndefined();
    });

    it('accepts optional alignment', () => {
      const s = stroke('#000000', 2, 'INSIDE');
      expect(s.align).toBe('INSIDE');
    });
  });

  describe('Color tokens', () => {
    it('defineTokens creates a token map and token() resolves it', () => {
      const tokens = defineTokens({
        primary: '#7c3aed',
        danger: '#ef4444',
      });
      const fill = token(tokens, 'primary');
      expect(fill.type).toBe('SOLID');
      expect(fill.color.r).toBeCloseTo(0x7c / 255);
    });

    it('token() throws on unresolved token name', () => {
      const tokens = defineTokens({ primary: '#7c3aed' });
      expect(() => token(tokens, 'nonexistent')).toThrow('nonexistent');
    });
  });

  describe('Multiple fills preserve order', () => {
    it('fill array order is maintained', () => {
      const fills = [
        solid('#FF0000'),
        solid('#00FF00'),
        solid('#0000FF'),
      ];
      expect(fills[0]!.color.r).toBeCloseTo(1.0);
      expect(fills[1]!.color.g).toBeCloseTo(1.0);
      expect(fills[2]!.color.b).toBeCloseTo(1.0);
    });
  });
});
