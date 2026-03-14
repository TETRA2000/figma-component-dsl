import { describe, it, expect } from 'vitest';
import { TextMeasurer } from '../text-measurer.js';
import path from 'node:path';

const FONT_DIR = path.resolve(
  import.meta.dirname,
  '../../../dsl-core/fonts',
);

describe('TextMeasurer', () => {
  it('loads Inter font and measures text', () => {
    const measurer = new TextMeasurer();
    measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const result = measurer.measure('Hello', { fontSize: 16 });
    expect(result.width).toBeGreaterThan(0);
    expect(result.height).toBeGreaterThan(0);
  });

  it('measures wider text as having greater width', () => {
    const measurer = new TextMeasurer();
    measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const short = measurer.measure('Hi', { fontSize: 16 });
    const long = measurer.measure('Hello World', { fontSize: 16 });
    expect(long.width).toBeGreaterThan(short.width);
  });

  it('measures larger font size as taller', () => {
    const measurer = new TextMeasurer();
    measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const small = measurer.measure('Test', { fontSize: 12 });
    const large = measurer.measure('Test', { fontSize: 24 });
    expect(large.height).toBeGreaterThan(small.height);
  });

  it('handles multi-line text', () => {
    const measurer = new TextMeasurer();
    measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const single = measurer.measure('Hello', { fontSize: 16 });
    const multi = measurer.measure('Hello\nWorld', { fontSize: 16 });
    expect(multi.height).toBeGreaterThan(single.height);
  });

  it('respects line height in pixels', () => {
    const measurer = new TextMeasurer();
    measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const result = measurer.measure('Line1\nLine2', {
      fontSize: 16,
      lineHeight: { value: 24, unit: 'PIXELS' },
    });
    expect(result.height).toBeCloseTo(48, 0);
  });
});
