import { describe, it, expect } from 'vitest';
import { computeStructuralHash } from './structural-hash.js';
import type { PluginNodeDef } from '@figma-dsl/core';

function mockNode(overrides: Partial<PluginNodeDef> & { type: string; name: string }): PluginNodeDef {
  return {
    size: { x: 100, y: 50 },
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  } as PluginNodeDef;
}

describe('computeStructuralHash()', () => {
  it('produces identical hashes for structurally identical trees', () => {
    const a = mockNode({
      type: 'FRAME', name: 'Card 1',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [
        mockNode({ type: 'TEXT', name: 'Title' }),
        mockNode({ type: 'TEXT', name: 'Body' }),
      ],
    });
    const b = mockNode({
      type: 'FRAME', name: 'Card 2',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [
        mockNode({ type: 'TEXT', name: 'Title' }),
        mockNode({ type: 'TEXT', name: 'Body' }),
      ],
    });
    expect(computeStructuralHash(a)).toBe(computeStructuralHash(b));
  });

  it('produces identical hashes when only text/fills/opacity/size differ', () => {
    const a = mockNode({
      type: 'FRAME', name: 'Card',
      children: [
        mockNode({ type: 'TEXT', name: 'Title', characters: 'Hello', fontSize: 16 }),
      ],
    });
    const b = mockNode({
      type: 'FRAME', name: 'Card',
      size: { x: 200, y: 100 }, // different size
      opacity: 0.5, // different opacity
      children: [
        mockNode({ type: 'TEXT', name: 'Title', characters: 'World', fontSize: 24 }), // different text/size
      ],
    });
    expect(computeStructuralHash(a)).toBe(computeStructuralHash(b));
  });

  it('produces different hashes for different layouts', () => {
    const a = mockNode({
      type: 'FRAME', name: 'Card',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    const b = mockNode({
      type: 'FRAME', name: 'Card',
      stackMode: 'HORIZONTAL', itemSpacing: 16,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    expect(computeStructuralHash(a)).not.toBe(computeStructuralHash(b));
  });

  it('produces different hashes for different child structure', () => {
    const a = mockNode({
      type: 'FRAME', name: 'Card',
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    const b = mockNode({
      type: 'FRAME', name: 'Card',
      children: [
        mockNode({ type: 'TEXT', name: 'Title' }),
        mockNode({ type: 'TEXT', name: 'Body' }),
      ],
    });
    expect(computeStructuralHash(a)).not.toBe(computeStructuralHash(b));
  });

  it('produces different hashes for different node types', () => {
    const a = mockNode({ type: 'FRAME', name: 'Box' });
    const b = mockNode({ type: 'RECTANGLE', name: 'Box' });
    expect(computeStructuralHash(a)).not.toBe(computeStructuralHash(b));
  });

  it('strips trailing digits from names for pattern matching', () => {
    const a = mockNode({ type: 'FRAME', name: 'Item1' });
    const b = mockNode({ type: 'FRAME', name: 'Item99' });
    expect(computeStructuralHash(a)).toBe(computeStructuralHash(b));
  });

  it('returns a hex string', () => {
    const hash = computeStructuralHash(mockNode({ type: 'FRAME', name: 'Test' }));
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
