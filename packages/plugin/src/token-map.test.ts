import { describe, it, expect } from 'vitest';
import {
  lookupColorToken,
  lookupSpacingToken,
  lookupRadiusToken,
  figmaColorToHex,
  COLOR_TOKENS,
  SPACING_TOKENS,
  RADIUS_TOKENS,
} from './token-map.js';

describe('lookupColorToken', () => {
  it('returns token for known hex value', () => {
    expect(lookupColorToken('#7c3aed')).toBe('var(--color-primary-600)');
  });

  it('returns token for case-insensitive lookup', () => {
    expect(lookupColorToken('#7C3AED')).toBe('var(--color-primary-600)');
  });

  it('returns undefined for unknown hex value', () => {
    expect(lookupColorToken('#123456')).toBeUndefined();
  });

  it('returns token for white', () => {
    expect(lookupColorToken('#ffffff')).toBe('var(--color-white)');
  });

  it('returns token for black', () => {
    expect(lookupColorToken('#000000')).toBe('var(--color-black)');
  });
});

describe('lookupSpacingToken', () => {
  it('returns token for known spacing value', () => {
    expect(lookupSpacingToken(8)).toBe('var(--space-2)');
    expect(lookupSpacingToken(16)).toBe('var(--space-4)');
  });

  it('returns undefined for unknown spacing value', () => {
    expect(lookupSpacingToken(7)).toBeUndefined();
    expect(lookupSpacingToken(100)).toBeUndefined();
  });
});

describe('lookupRadiusToken', () => {
  it('returns token for known radius value', () => {
    expect(lookupRadiusToken(6)).toBe('var(--radius-sm)');
    expect(lookupRadiusToken(9999)).toBe('var(--radius-full)');
  });

  it('returns undefined for unknown radius value', () => {
    expect(lookupRadiusToken(5)).toBeUndefined();
  });
});

describe('figmaColorToHex', () => {
  it('converts Figma float RGB to hex', () => {
    expect(figmaColorToHex(1, 0, 0)).toBe('#ff0000');
    expect(figmaColorToHex(0, 1, 0)).toBe('#00ff00');
    expect(figmaColorToHex(0, 0, 1)).toBe('#0000ff');
  });

  it('converts black and white', () => {
    expect(figmaColorToHex(0, 0, 0)).toBe('#000000');
    expect(figmaColorToHex(1, 1, 1)).toBe('#ffffff');
  });

  it('converts mid-range values correctly', () => {
    // 0.486 * 255 ≈ 124 = 0x7c, 0.227 * 255 ≈ 58 = 0x3a, 0.929 * 255 ≈ 237 = 0xed
    const hex = figmaColorToHex(0.486, 0.227, 0.929);
    expect(hex).toBe('#7c3aed');
  });
});

describe('token maps completeness', () => {
  it('has all color tokens from tokens.css', () => {
    expect(COLOR_TOKENS.size).toBeGreaterThanOrEqual(35);
  });

  it('has all spacing tokens', () => {
    expect(SPACING_TOKENS.size).toBe(12);
  });

  it('has all radius tokens', () => {
    expect(RADIUS_TOKENS.size).toBe(6);
  });
});
