import { describe, it, expect } from 'vitest';
import { deriveName } from '../naming.js';
import type { DomSnapshot } from '../types.js';

function makeSnapshot(overrides: Partial<DomSnapshot> = {}): DomSnapshot {
  return {
    tag: 'div',
    id: '',
    className: '',
    textContent: '',
    isTextOnly: false,
    styles: {} as DomSnapshot['styles'],
    rect: { x: 0, y: 0, width: 100, height: 100 },
    children: [],
    ...overrides,
  };
}

describe('deriveName', () => {
  it('uses id when available', () => {
    const snap = makeSnapshot({ id: 'main-header' });
    expect(deriveName(snap, 0)).toBe('MainHeader');
  });

  it('uses className when available', () => {
    const snap = makeSnapshot({ className: 'pricing-card_abc123' });
    expect(deriveName(snap, 0)).toBe('PricingCard');
  });

  it('uses semantic tag names', () => {
    const snap = makeSnapshot({ tag: 'header' });
    expect(deriveName(snap, 0)).toBe('Header');
  });

  it('uses semantic tag with index', () => {
    const snap = makeSnapshot({ tag: 'nav' });
    expect(deriveName(snap, 2)).toBe('Navigation3');
  });

  it('uses truncated text for text-only elements', () => {
    const snap = makeSnapshot({
      tag: 'span',
      isTextOnly: true,
      textContent: 'Hello World',
    });
    expect(deriveName(snap, 0)).toBe('HelloWorld');
  });

  it('falls back to tag + index', () => {
    const snap = makeSnapshot({ tag: 'div' });
    expect(deriveName(snap, 3)).toBe('Div4');
  });

  it('filters utility class names', () => {
    const snap = makeSnapshot({ className: 'flex center container_xyz12' });
    expect(deriveName(snap, 0)).toBe('Container');
  });
});
