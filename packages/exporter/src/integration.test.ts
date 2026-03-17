import { describe, it, expect } from 'vitest';
import { compile } from '@figma-dsl/compiler';
import { generatePluginInput } from './exporter.js';
import { deduplicateNodes } from './deduplicator.js';
import { ComponentRegistry } from './component-registry.js';
import { generateCodeConnect } from './code-connect.js';
import {
  component, componentSet, frame, text, rectangle, instance,
} from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { vertical, horizontal } from '@figma-dsl/core';

// --- Task 9.2: Deduplication integration test ---

describe('Integration — deduplication with repeated components', () => {
  it('deduplicates 3 structurally identical cards with text differences', () => {
    // Create 3 cards that differ only in text content
    const cards = [1, 2, 3].map(i => {
      const node = frame(`Card ${i}`, {
        size: { x: 300, y: 200 },
        autoLayout: vertical({ spacing: 8 }),
        children: [
          text(`Title ${i}`, { fontSize: 18, fontWeight: 700 }),
          text(`Description for card ${i}`, { fontSize: 14 }),
        ],
      });
      const compiled = compile(node);
      return generatePluginInput(compiled).components[0]!;
    });

    const result = deduplicateNodes(cards);

    // Should extract 1 component + 3 instances
    expect(result.summary.extractedComponents).toHaveLength(1);
    expect(result.summary.extractedComponents[0]!.name).toBe('Card');
    expect(result.summary.extractedComponents[0]!.instanceCount).toBe(3);

    // First element should be the component
    expect(result.components[0]!.type).toBe('COMPONENT');

    // Remaining should be instances
    const instances = result.components.filter(c => c.type === 'INSTANCE');
    expect(instances).toHaveLength(3);

    // Instances should reference the component
    for (const inst of instances) {
      expect(inst.componentId).toBe('Card');
    }

    // Component should have TEXT property definitions inferred from text diffs
    const comp = result.components[0]!;
    expect(comp.componentPropertyDefinitions).toBeDefined();
  });

  it('components are ordered before instances in output', () => {
    const cards = [1, 2].map(i => {
      const node = frame(`Card ${i}`, {
        size: { x: 200, y: 100 },
        children: [text(`Text ${i}`)],
      });
      return generatePluginInput(compile(node)).components[0]!;
    });

    const result = deduplicateNodes(cards);
    const types = result.components.map(c => c.type);
    const componentIdx = types.indexOf('COMPONENT');
    const instanceIdx = types.indexOf('INSTANCE');
    expect(componentIdx).toBeLessThan(instanceIdx);
  });
});

// --- Task 9.3: Registry integration test ---

describe('Integration — registry with cross-file reuse', () => {
  it('builds registry from first file and matches in second', () => {
    // First file: define a Card component
    const cardNode = component('Card', {
      size: { x: 300, y: 200 },
      autoLayout: vertical({ spacing: 8 }),
      children: [text('Title')],
    });
    const cardCompiled = compile(cardNode);
    const cardInput = generatePluginInput(cardCompiled);
    const cardPluginDef = cardInput.components[0]!;

    // Build registry from first file
    const registry = new ComponentRegistry();
    registry.register(cardPluginDef, 'figma:1:1');

    // Second file: references the same component structure (same node names, different text)
    const secondCardNode = component('Card', {
      size: { x: 300, y: 200 },
      autoLayout: vertical({ spacing: 8 }),
      children: [text('Title')],
    });
    const secondCompiled = compile(secondCardNode);
    const secondInput = generatePluginInput(secondCompiled);
    const secondPluginDef = secondInput.components[0]!;

    // Match against registry
    const match = registry.match(secondPluginDef);
    expect(match).toBeDefined();
    expect(match!.entry.name).toBe('Card');
    expect(match!.entry.figmaNodeId).toBe('figma:1:1');
    // Structure should match (only text content differs)
    expect(match!.diverged).toBe(false);
  });

  it('detects structural divergence when component changes', () => {
    const registry = new ComponentRegistry();
    const original = component('Button', {
      size: { x: 120, y: 40 },
      autoLayout: horizontal({ spacing: 8 }),
      children: [text('Click')],
    });
    registry.register(generatePluginInput(compile(original)).components[0]!);

    // Changed structure — different layout
    const changed = component('Button', {
      size: { x: 120, y: 40 },
      autoLayout: vertical({ spacing: 12 }),
      children: [text('Click'), rectangle('Icon', { size: { x: 16, y: 16 } })],
    });
    const changedDef = generatePluginInput(compile(changed)).components[0]!;
    const match = registry.match(changedDef);
    expect(match).toBeDefined();
    expect(match!.diverged).toBe(true);
  });

  it('auto-builds registry from batch components', () => {
    const registry = new ComponentRegistry();

    // Simulate batch: register each component as it's exported
    const button = component('Button', { children: [text('Click')] });
    const card = component('Card', {
      children: [text('Title'), text('Content')],
    });

    registry.register(generatePluginInput(compile(button)).components[0]!);
    registry.register(generatePluginInput(compile(card)).components[0]!);

    expect(registry.size).toBe(2);
    expect(registry.has('Button')).toBe(true);
    expect(registry.has('Card')).toBe(true);
  });
});

// --- Task 9.4: Code Connect integration test ---

describe('Integration — Code Connect generation', () => {
  it('generates Code Connect with TEXT and BOOLEAN properties', () => {
    const result = generateCodeConnect({
      fileKey: 'abc123',
      componentName: 'Card',
      nodeId: '1:1',
      properties: [
        { name: 'Title', type: 'TEXT' },
        { name: 'ShowBadge', type: 'BOOLEAN' },
      ],
    });

    expect(result).toContain("title: figma.string('Title')");
    expect(result).toContain("showBadge: figma.boolean('ShowBadge')");
  });

  it('includes Figma URL in figma.connect() call', () => {
    const result = generateCodeConnect({
      fileKey: 'myFileKey',
      componentName: 'Button',
      nodeId: '10:20',
      properties: [{ name: 'Label', type: 'TEXT' }],
    });

    expect(result).toContain('https://www.figma.com/design/myFileKey?node-id=10-20');
    expect(result).toContain("figma.connect(Button, 'https://www.figma.com/design/myFileKey?node-id=10-20'");
  });
});
