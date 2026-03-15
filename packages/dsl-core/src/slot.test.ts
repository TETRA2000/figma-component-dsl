import { describe, it, expect } from 'vitest';
import { slot, instance, text, frame } from './nodes.js';
import type { DslNode, SlotProps } from './types.js';

describe('slot()', () => {
  it('creates a FRAME node with isSlot and slotName', () => {
    const node = slot('Content');
    expect(node.type).toBe('FRAME');
    expect(node.isSlot).toBe(true);
    expect(node.slotName).toBe('Content');
    expect(node.name).toBe('Content');
    expect(node.visible).toBe(true);
    expect(node.opacity).toBe(1);
  });

  it('throws on empty name', () => {
    expect(() => slot('')).toThrow('Slot name must be a non-empty string');
  });

  it('accepts default children and places them in children array', () => {
    const children = [text('Default text'), text('More text')];
    const node = slot('Content', { defaultChildren: children });
    expect(node.children).toHaveLength(2);
    expect(node.children![0]!.characters).toBe('Default text');
    expect(node.children![1]!.characters).toBe('More text');
  });

  it('accepts size option', () => {
    const node = slot('Content', { size: { x: 200, y: 100 } });
    expect(node.size).toEqual({ x: 200, y: 100 });
  });

  it('accepts autoLayout option', () => {
    const node = slot('Content', {
      autoLayout: { direction: 'VERTICAL', spacing: 8 },
    });
    expect(node.autoLayout).toEqual({ direction: 'VERTICAL', spacing: 8 });
  });

  it('accepts cornerRadius option', () => {
    const node = slot('Content', { cornerRadius: 12 });
    expect(node.cornerRadius).toBe(12);
  });

  it('accepts layout sizing options', () => {
    const node = slot('Content', {
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'HUG',
    });
    expect(node.layoutSizingHorizontal).toBe('FILL');
    expect(node.layoutSizingVertical).toBe('HUG');
  });

  it('accepts preferredInstances', () => {
    const node = slot('Actions', { preferredInstances: ['Button', 'IconButton'] });
    expect(node.preferredInstances).toEqual(['Button', 'IconButton']);
  });

  it('creates a slot with no options (all defaults)', () => {
    const node = slot('Empty');
    expect(node.isSlot).toBe(true);
    expect(node.children).toBeUndefined();
    expect(node.size).toBeUndefined();
    expect(node.autoLayout).toBeUndefined();
  });
});

describe('instance() with slotOverrides', () => {
  it('accepts slot overrides as third parameter', () => {
    const overrideContent = [text('Custom content')];
    const node = instance('Card', undefined, { Content: overrideContent });
    expect(node.slotOverrides).toBeDefined();
    expect(node.slotOverrides!['Content']).toHaveLength(1);
    expect(node.slotOverrides!['Content']![0]!.characters).toBe('Custom content');
  });

  it('supports both property overrides and slot overrides', () => {
    const node = instance(
      'Card',
      { Title: 'Hello' },
      { Content: [text('Body')] },
    );
    expect(node.propertyOverrides).toEqual({ Title: 'Hello' });
    expect(node.slotOverrides!['Content']).toHaveLength(1);
  });

  it('preserves backward compatibility with two arguments', () => {
    const node = instance('Button', { Label: 'Click' });
    expect(node.type).toBe('INSTANCE');
    expect(node.componentRef).toBe('Button');
    expect(node.propertyOverrides).toEqual({ Label: 'Click' });
    expect(node.slotOverrides).toBeUndefined();
  });

  it('preserves backward compatibility with one argument', () => {
    const node = instance('Button');
    expect(node.type).toBe('INSTANCE');
    expect(node.componentRef).toBe('Button');
    expect(node.propertyOverrides).toBeUndefined();
    expect(node.slotOverrides).toBeUndefined();
  });

  it('handles empty slot overrides record', () => {
    const node = instance('Card', undefined, {});
    expect(node.slotOverrides).toEqual({});
  });

  it('supports multiple slot overrides', () => {
    const node = instance('Layout', undefined, {
      Header: [text('Title')],
      Footer: [text('Copyright')],
    });
    expect(Object.keys(node.slotOverrides!)).toEqual(['Header', 'Footer']);
  });
});

describe('DslNode slot fields', () => {
  it('DslNode without slot fields has them as undefined', () => {
    const node = frame('Regular', {});
    expect(node.isSlot).toBeUndefined();
    expect(node.slotName).toBeUndefined();
    expect(node.slotOverrides).toBeUndefined();
    expect(node.preferredInstances).toBeUndefined();
  });
});
