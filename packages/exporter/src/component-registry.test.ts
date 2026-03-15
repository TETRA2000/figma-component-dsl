import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRegistry } from './component-registry.js';
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

describe('ComponentRegistry', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
  });

  it('starts empty', () => {
    expect(registry.size).toBe(0);
    expect(registry.has('Card')).toBe(false);
  });

  it('registers and retrieves a component', () => {
    const node = mockNode({ type: 'COMPONENT', name: 'Card' });
    registry.register(node, '1:1');
    expect(registry.has('Card')).toBe(true);
    const entry = registry.get('Card')!;
    expect(entry.name).toBe('Card');
    expect(entry.figmaNodeId).toBe('1:1');
    expect(entry.structuralHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('records slot names', () => {
    const node = mockNode({
      type: 'COMPONENT', name: 'Card',
      children: [
        mockNode({ type: 'FRAME', name: 'Header', isSlot: true, slotPropertyName: 'Header' }),
        mockNode({ type: 'TEXT', name: 'Body' }),
        mockNode({ type: 'FRAME', name: 'Footer', isSlot: true, slotPropertyName: 'Footer' }),
      ],
    });
    const entry = registry.register(node);
    expect(entry.slotNames).toEqual(['Header', 'Footer']);
  });

  it('matches by name and validates structural hash', () => {
    const node = mockNode({
      type: 'COMPONENT', name: 'Card',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    registry.register(node);

    // Same structure → no divergence
    const same = mockNode({
      type: 'COMPONENT', name: 'Card',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    const match = registry.match(same);
    expect(match).toBeDefined();
    expect(match!.diverged).toBe(false);
  });

  it('detects structural divergence', () => {
    const node = mockNode({
      type: 'COMPONENT', name: 'Card',
      stackMode: 'VERTICAL', itemSpacing: 8,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    registry.register(node);

    // Different structure
    const different = mockNode({
      type: 'COMPONENT', name: 'Card',
      stackMode: 'HORIZONTAL', itemSpacing: 16,
      children: [mockNode({ type: 'TEXT', name: 'Title' })],
    });
    const match = registry.match(different);
    expect(match).toBeDefined();
    expect(match!.diverged).toBe(true);
  });

  it('returns undefined when no match', () => {
    const node = mockNode({ type: 'COMPONENT', name: 'Unknown' });
    expect(registry.match(node)).toBeUndefined();
  });

  it('loads from data', () => {
    const node = mockNode({ type: 'COMPONENT', name: 'Button' });
    registry.register(node, '2:2');

    const data = registry.toData();
    const loaded = ComponentRegistry.fromData(data);
    expect(loaded.size).toBe(1);
    expect(loaded.get('Button')?.figmaNodeId).toBe('2:2');
  });

  it('loads from missing file returns empty registry', () => {
    const loaded = ComponentRegistry.loadFromFile('/nonexistent/registry.json');
    expect(loaded.size).toBe(0);
  });

  it('builds incrementally during batch', () => {
    const card = mockNode({ type: 'COMPONENT', name: 'Card' });
    const button = mockNode({ type: 'COMPONENT', name: 'Button' });
    registry.register(card, '1:1');
    registry.register(button, '2:2');
    expect(registry.size).toBe(2);
  });
});
