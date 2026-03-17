import { describe, it, expect } from 'vitest';
import { deduplicateNodes } from './deduplicator.js';
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

describe('deduplicateNodes()', () => {
  it('extracts 1 component + 3 instances from 3 identical cards', () => {
    const cards = [
      mockNode({
        type: 'FRAME', name: 'Card 1',
        stackMode: 'VERTICAL', itemSpacing: 8,
        children: [
          mockNode({ type: 'TEXT', name: 'Title', characters: 'Card A' }),
          mockNode({ type: 'TEXT', name: 'Body', characters: 'Description A' }),
        ],
      }),
      mockNode({
        type: 'FRAME', name: 'Card 2',
        stackMode: 'VERTICAL', itemSpacing: 8,
        children: [
          mockNode({ type: 'TEXT', name: 'Title', characters: 'Card B' }),
          mockNode({ type: 'TEXT', name: 'Body', characters: 'Description B' }),
        ],
      }),
      mockNode({
        type: 'FRAME', name: 'Card 3',
        stackMode: 'VERTICAL', itemSpacing: 8,
        children: [
          mockNode({ type: 'TEXT', name: 'Title', characters: 'Card C' }),
          mockNode({ type: 'TEXT', name: 'Body', characters: 'Description C' }),
        ],
      }),
    ];

    const result = deduplicateNodes(cards);

    // 1 component + 3 instances
    expect(result.components).toHaveLength(4);
    expect(result.summary.extractedComponents).toHaveLength(1);
    expect(result.summary.extractedComponents[0]!.name).toBe('Card');
    expect(result.summary.extractedComponents[0]!.instanceCount).toBe(3);
  });

  it('places components before instances in output', () => {
    const cards = [
      mockNode({ type: 'FRAME', name: 'Card 1', children: [mockNode({ type: 'TEXT', name: 'T', characters: 'A' })] }),
      mockNode({ type: 'FRAME', name: 'Card 2', children: [mockNode({ type: 'TEXT', name: 'T', characters: 'B' })] }),
    ];
    const result = deduplicateNodes(cards);
    expect(result.components[0]!.type).toBe('COMPONENT');
    expect(result.components[1]!.type).toBe('INSTANCE');
    expect(result.components[2]!.type).toBe('INSTANCE');
  });

  it('infers TEXT properties from differing text content', () => {
    const cards = [
      mockNode({ type: 'FRAME', name: 'Card 1', children: [mockNode({ type: 'TEXT', name: 'Title', characters: 'Hello' })] }),
      mockNode({ type: 'FRAME', name: 'Card 2', children: [mockNode({ type: 'TEXT', name: 'Title', characters: 'World' })] }),
    ];
    const result = deduplicateNodes(cards);

    // Component should have TEXT property definition
    const comp = result.components[0]!;
    expect(comp.type).toBe('COMPONENT');
    expect(comp.componentPropertyDefinitions).toBeDefined();

    // Instances should have overrides
    const inst1 = result.components[1]!;
    const inst2 = result.components[2]!;
    // First instance uses template value (no override needed for default)
    // Second instance has different text
    expect(inst2.overriddenProperties).toBeDefined();
  });

  it('infers BOOLEAN properties from visibility differences', () => {
    const nodes = [
      mockNode({
        type: 'FRAME', name: 'Card 1',
        children: [
          mockNode({ type: 'RECTANGLE', name: 'Badge', visible: true }),
        ],
      }),
      mockNode({
        type: 'FRAME', name: 'Card 2',
        children: [
          mockNode({ type: 'RECTANGLE', name: 'Badge', visible: false }),
        ],
      }),
    ];
    const result = deduplicateNodes(nodes);
    const comp = result.components[0]!;
    expect(comp.componentPropertyDefinitions?.['Badge_visible']).toBeDefined();
    expect(comp.componentPropertyDefinitions!['Badge_visible']!.type).toBe('BOOLEAN');
  });

  it('keeps unique nodes unchanged', () => {
    const nodes = [
      mockNode({ type: 'FRAME', name: 'Header' }),
      mockNode({ type: 'RECTANGLE', name: 'Divider' }),
    ];
    const result = deduplicateNodes(nodes);
    expect(result.components).toHaveLength(2);
    expect(result.components[0]!.type).toBe('FRAME');
    expect(result.components[1]!.type).toBe('RECTANGLE');
    expect(result.summary.extractedComponents).toHaveLength(0);
  });

  it('handles empty input', () => {
    const result = deduplicateNodes([]);
    expect(result.components).toHaveLength(0);
    expect(result.summary.extractedComponents).toHaveLength(0);
  });
});
