import { describe, it, expect } from 'vitest';
import { Capturer } from '../capturer.js';

describe('Capturer', () => {
  it('can be instantiated', () => {
    const capturer = new Capturer();
    expect(capturer).toBeDefined();
  });
});
