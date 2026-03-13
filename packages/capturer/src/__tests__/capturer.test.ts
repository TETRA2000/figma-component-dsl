import { describe, it, expect } from 'vitest';
import { captureFromUrl, captureFromModule } from '../capturer.js';

describe('Screenshot capturer', () => {
  it('exports captureFromUrl function', () => {
    expect(typeof captureFromUrl).toBe('function');
  });

  it('exports captureFromModule function', () => {
    expect(typeof captureFromModule).toBe('function');
  });

  it('captureFromModule throws with helpful message', async () => {
    await expect(captureFromModule('test.tsx', 'out.png')).rejects.toThrow(
      'captureFromModule requires a running dev server',
    );
  });

  // Note: Full Playwright-based tests require a running server and browser.
  // Integration tests in Task 11 will test the full capture pipeline.
});
