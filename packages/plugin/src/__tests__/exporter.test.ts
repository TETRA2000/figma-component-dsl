import { describe, it, expect } from 'vitest';
import { Exporter } from '../exporter.js';

describe('Exporter', () => {
  it('can be instantiated', () => {
    const exporter = new Exporter();
    expect(exporter).toBeDefined();
  });
});
