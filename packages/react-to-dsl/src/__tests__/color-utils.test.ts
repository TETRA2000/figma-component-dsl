import { describe, it, expect } from 'vitest';
import {
  cssColorToHex,
  cssColorToOpacity,
  parseLinearGradient,
  parseBoxShadow,
  parseTextShadow,
  isTransparent,
} from '../color-utils.js';

describe('cssColorToHex', () => {
  it('parses hex colors', () => {
    expect(cssColorToHex('#ff0000')).toBe('#ff0000');
    expect(cssColorToHex('#abc')).toBe('#aabbcc');
    expect(cssColorToHex('#ff000080')).toBe('#ff0000'); // strips alpha
  });

  it('parses rgb() colors', () => {
    expect(cssColorToHex('rgb(255, 0, 0)')).toBe('#ff0000');
    expect(cssColorToHex('rgb(0, 128, 255)')).toBe('#0080ff');
  });

  it('parses rgba() colors', () => {
    expect(cssColorToHex('rgba(255, 0, 0, 0.5)')).toBe('#ff0000');
    expect(cssColorToHex('rgba(0, 128, 255, 1)')).toBe('#0080ff');
  });

  it('parses modern rgb syntax', () => {
    expect(cssColorToHex('rgb(255 0 0)')).toBe('#ff0000');
    expect(cssColorToHex('rgb(255 128 0 / 0.5)')).toBe('#ff8000');
  });

  it('parses named colors', () => {
    expect(cssColorToHex('white')).toBe('#ffffff');
    expect(cssColorToHex('black')).toBe('#000000');
    expect(cssColorToHex('red')).toBe('#ff0000');
  });

  it('returns null for transparent/none', () => {
    expect(cssColorToHex('transparent')).toBeNull();
    expect(cssColorToHex('none')).toBeNull();
    expect(cssColorToHex('')).toBeNull();
  });
});

describe('cssColorToOpacity', () => {
  it('returns 1 for opaque colors', () => {
    expect(cssColorToOpacity('rgb(255, 0, 0)')).toBe(1);
    expect(cssColorToOpacity('#ff0000')).toBe(1);
  });

  it('extracts alpha from rgba', () => {
    expect(cssColorToOpacity('rgba(255, 0, 0, 0.5)')).toBe(0.5);
    expect(cssColorToOpacity('rgba(0, 0, 0, 0)')).toBe(0);
    expect(cssColorToOpacity('rgba(255, 255, 255, 0.72)')).toBe(0.72);
  });

  it('returns 0 for transparent', () => {
    expect(cssColorToOpacity('transparent')).toBe(0);
  });
});

describe('parseLinearGradient', () => {
  it('parses gradient with angle', () => {
    const result = parseLinearGradient('linear-gradient(135deg, #ff0000 0%, #0000ff 100%)');
    expect(result).not.toBeNull();
    expect(result!.stops).toHaveLength(2);
    expect(result!.stops[0]!.hex).toBe('#ff0000');
    expect(result!.stops[0]!.position).toBe(0);
    expect(result!.stops[1]!.hex).toBe('#0000ff');
    expect(result!.stops[1]!.position).toBe(1);
  });

  it('parses gradient with direction keyword', () => {
    const result = parseLinearGradient('linear-gradient(to right, #ff0000, #0000ff)');
    expect(result).not.toBeNull();
    expect(result!.angleDeg).toBe(0); // to right = DSL 0°
    expect(result!.stops).toHaveLength(2);
  });

  it('parses gradient with rgb colors', () => {
    const result = parseLinearGradient('linear-gradient(90deg, rgb(255, 0, 0), rgb(0, 0, 255))');
    expect(result).not.toBeNull();
    expect(result!.stops).toHaveLength(2);
    expect(result!.stops[0]!.hex).toBe('#ff0000');
  });

  it('parses multi-stop gradient', () => {
    const result = parseLinearGradient('linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)');
    expect(result).not.toBeNull();
    expect(result!.stops).toHaveLength(3);
    expect(result!.stops[1]!.position).toBe(0.5);
  });

  it('returns null for non-gradient', () => {
    expect(parseLinearGradient('none')).toBeNull();
    expect(parseLinearGradient('')).toBeNull();
  });
});

describe('isTransparent', () => {
  it('identifies transparent values', () => {
    expect(isTransparent('transparent')).toBe(true);
    expect(isTransparent('rgba(0, 0, 0, 0)')).toBe(true);
    expect(isTransparent('')).toBe(true);
  });

  it('identifies opaque values', () => {
    expect(isTransparent('rgb(255, 0, 0)')).toBe(false);
    expect(isTransparent('#ff0000')).toBe(false);
    expect(isTransparent('rgba(255, 0, 0, 0.5)')).toBe(false);
  });
});

describe('parseBoxShadow', () => {
  it('parses a single shadow', () => {
    const result = parseBoxShadow('0px 4px 12px rgba(0, 0, 0, 0.25)');
    expect(result).toHaveLength(1);
    expect(result[0]!.offsetX).toBe(0);
    expect(result[0]!.offsetY).toBe(4);
    expect(result[0]!.blur).toBe(12);
    expect(result[0]!.color.a).toBeCloseTo(0.25);
  });

  it('parses shadow with spread', () => {
    const result = parseBoxShadow('2px 4px 8px 2px rgba(0, 0, 0, 0.5)');
    expect(result).toHaveLength(1);
    expect(result[0]!.spread).toBe(2);
  });

  it('returns empty for none', () => {
    expect(parseBoxShadow('none')).toEqual([]);
    expect(parseBoxShadow('')).toEqual([]);
  });

  it('skips inset shadows', () => {
    const result = parseBoxShadow('inset 0 2px 4px rgba(0, 0, 0, 0.1)');
    expect(result).toEqual([]);
  });
});

describe('parseTextShadow', () => {
  it('parses a basic text shadow', () => {
    const result = parseTextShadow('2px 3px 4px rgba(0, 0, 0, 0.5)');
    expect(result).not.toBeNull();
    expect(result!.offsetX).toBe(2);
    expect(result!.offsetY).toBe(3);
    expect(result!.blur).toBe(4);
    expect(result!.color).toContain('rgba');
  });

  it('returns null for none', () => {
    expect(parseTextShadow('none')).toBeNull();
    expect(parseTextShadow('')).toBeNull();
  });
});
