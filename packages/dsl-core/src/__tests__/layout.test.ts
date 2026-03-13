import { describe, it, expect } from 'vitest';
import { horizontal, vertical } from '../layout.js';

describe('Layout helpers', () => {
  describe('horizontal()', () => {
    it('creates horizontal auto-layout config', () => {
      const config = horizontal();
      expect(config.direction).toBe('HORIZONTAL');
    });

    it('accepts spacing, padding, alignment', () => {
      const config = horizontal({
        spacing: 8,
        padX: 16,
        padY: 8,
        align: 'CENTER',
        counterAlign: 'CENTER',
      });
      expect(config.spacing).toBe(8);
      expect(config.padX).toBe(16);
      expect(config.padY).toBe(8);
      expect(config.align).toBe('CENTER');
      expect(config.counterAlign).toBe('CENTER');
    });

    it('accepts per-side padding', () => {
      const config = horizontal({
        padTop: 10,
        padRight: 20,
        padBottom: 10,
        padLeft: 20,
      });
      expect(config.padTop).toBe(10);
      expect(config.padRight).toBe(20);
    });

    it('accepts sizing modes', () => {
      const config = horizontal({ sizing: 'HUG' });
      expect(config.sizing).toBe('HUG');
    });

    it('accepts per-axis sizing', () => {
      const config = horizontal({
        widthSizing: 'FILL',
        heightSizing: 'HUG',
      });
      expect(config.widthSizing).toBe('FILL');
      expect(config.heightSizing).toBe('HUG');
    });
  });

  describe('vertical()', () => {
    it('creates vertical auto-layout config', () => {
      const config = vertical();
      expect(config.direction).toBe('VERTICAL');
    });

    it('accepts all the same options as horizontal', () => {
      const config = vertical({
        spacing: 16,
        padX: 24,
        padY: 24,
        align: 'MIN',
        sizing: 'FIXED',
      });
      expect(config.direction).toBe('VERTICAL');
      expect(config.spacing).toBe(16);
    });
  });
});
