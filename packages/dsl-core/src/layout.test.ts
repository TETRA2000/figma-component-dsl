import { describe, it, expect } from 'vitest';
import { horizontal, vertical } from './layout.js';
import { frame, text, component } from './nodes.js';

describe('horizontal()', () => {
  it('creates horizontal auto-layout config', () => {
    const config = horizontal();
    expect(config.direction).toBe('HORIZONTAL');
  });

  it('merges spacing and padding', () => {
    const config = horizontal({ spacing: 8, padX: 16, padY: 8 });
    expect(config.spacing).toBe(8);
    expect(config.padX).toBe(16);
    expect(config.padY).toBe(8);
  });

  it('supports alignment', () => {
    const config = horizontal({ align: 'CENTER', counterAlign: 'MAX' });
    expect(config.align).toBe('CENTER');
    expect(config.counterAlign).toBe('MAX');
  });

  it('supports sizing modes', () => {
    const config = horizontal({ sizing: 'HUG', widthSizing: 'FILL', heightSizing: 'FIXED' });
    expect(config.sizing).toBe('HUG');
    expect(config.widthSizing).toBe('FILL');
    expect(config.heightSizing).toBe('FIXED');
  });
});

describe('vertical()', () => {
  it('creates vertical auto-layout config', () => {
    const config = vertical();
    expect(config.direction).toBe('VERTICAL');
  });

  it('supports per-side padding', () => {
    const config = vertical({ padTop: 16, padRight: 24, padBottom: 16, padLeft: 24 });
    expect(config.padTop).toBe(16);
    expect(config.padRight).toBe(24);
    expect(config.padBottom).toBe(16);
    expect(config.padLeft).toBe(24);
  });
});

describe('auto-layout validation', () => {
  it('only allows autoLayout on FRAME nodes', () => {
    const node = frame('Container', {
      autoLayout: horizontal({ spacing: 8 }),
    });
    expect(node.autoLayout?.direction).toBe('HORIZONTAL');
  });

  it('only allows autoLayout on COMPONENT nodes', () => {
    const node = component('Button', {
      autoLayout: horizontal({ spacing: 8 }),
    });
    expect(node.autoLayout?.direction).toBe('HORIZONTAL');
  });
});

describe('child layout props', () => {
  it('ChildLayoutProps on text nodes', () => {
    const node = text('Label', {
      fontSize: 14,
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'HUG',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
    expect(node.layoutSizingVertical).toBe('HUG');
  });

  it('layoutGrow for spacer elements', () => {
    const spacer = frame('Spacer', { layoutGrow: 1 });
    expect(spacer.layoutGrow).toBe(1);
  });
});
