import { describe, it, expect, beforeAll } from 'vitest';
import { TextMeasurer } from '../text-measurer.js';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = resolve(__dirname, '..', '..', '..', 'dsl-core', 'fonts');

describe('TextMeasurer', () => {
  let measurer: TextMeasurer;

  beforeAll(() => {
    measurer = new TextMeasurer();
    measurer.loadFont(resolve(fontsDir, 'Inter-Regular.otf'), 'Inter', 400);
    measurer.loadFont(resolve(fontsDir, 'Inter-Medium.otf'), 'Inter', 500);
    measurer.loadFont(resolve(fontsDir, 'Inter-SemiBold.otf'), 'Inter', 600);
    measurer.loadFont(resolve(fontsDir, 'Inter-Bold.otf'), 'Inter', 700);
  });

  it('measures single-line text width and height', () => {
    const m = measurer.measure('Hello', { fontSize: 14 });
    expect(m.width).toBeGreaterThan(0);
    expect(m.height).toBeGreaterThan(0);
  });

  it('wider text has greater width', () => {
    const short = measurer.measure('Hi', { fontSize: 14 });
    const long = measurer.measure('Hello World', { fontSize: 14 });
    expect(long.width).toBeGreaterThan(short.width);
  });

  it('larger fontSize produces larger measurements', () => {
    const small = measurer.measure('Text', { fontSize: 12 });
    const large = measurer.measure('Text', { fontSize: 24 });
    expect(large.width).toBeGreaterThan(small.width);
    expect(large.height).toBeGreaterThan(small.height);
  });

  it('uses default fontSize 14 and fontFamily Inter', () => {
    const m = measurer.measure('X', {});
    expect(m.width).toBeGreaterThan(0);
  });

  it('handles multi-line text (split on \\n)', () => {
    const single = measurer.measure('Line', { fontSize: 14 });
    const multi = measurer.measure('Line\nLine', { fontSize: 14 });
    expect(multi.height).toBeGreaterThan(single.height);
    // Width should be the max line width
    expect(multi.width).toBeCloseTo(single.width, 0);
  });

  it('respects lineHeight with PIXELS unit', () => {
    const m = measurer.measure('X\nY', {
      fontSize: 14,
      lineHeight: { value: 28, unit: 'PIXELS' },
    });
    expect(m.height).toBeCloseTo(56, 0); // 2 lines × 28px
  });

  it('respects lineHeight with PERCENT unit', () => {
    const m = measurer.measure('X', {
      fontSize: 20,
      lineHeight: { value: 150, unit: 'PERCENT' },
    });
    expect(m.height).toBeCloseTo(30, 0); // 20 * 1.5
  });

  it('defaults lineHeight to fontSize * 1.2', () => {
    const m = measurer.measure('X', { fontSize: 20 });
    expect(m.height).toBeCloseTo(24, 0); // 20 * 1.2
  });

  it('handles different font weights', () => {
    const regular = measurer.measure('Bold Text', { fontSize: 14, fontWeight: 400 });
    const bold = measurer.measure('Bold Text', { fontSize: 14, fontWeight: 700 });
    // Both should measure (widths may differ slightly due to different glyph widths)
    expect(regular.width).toBeGreaterThan(0);
    expect(bold.width).toBeGreaterThan(0);
  });
});
