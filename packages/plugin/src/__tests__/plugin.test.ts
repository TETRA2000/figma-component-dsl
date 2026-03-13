import { describe, it, expect } from 'vitest';
import type { PluginInput, PluginNodeDef } from '../plugin.js';

// Note: Full plugin tests require Figma Plugin API mocks.
// These tests verify the type exports and basic structure.

describe('Figma Plugin types', () => {
  it('PluginInput structure is well-defined', () => {
    const input: PluginInput = {
      schemaVersion: '1.0',
      targetPage: 'Component Library',
      components: [
        {
          name: 'Button',
          node: {
            type: 'COMPONENT',
            name: 'Button',
            size: { x: 100, y: 40 },
            fillPaints: [
              { type: 'SOLID', color: { r: 0.486, g: 0.227, b: 0.929, a: 1 }, opacity: 1, visible: true },
            ],
            stackMode: 'HORIZONTAL',
            itemSpacing: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            children: [
              {
                type: 'TEXT',
                name: 'Label',
                size: { x: 52, y: 17 },
                fontSize: 14,
                fontFamily: 'Inter',
                textData: { characters: 'Click me' },
              },
            ],
          },
          properties: {
            Label: { type: 'TEXT', defaultValue: 'Button' },
          },
        },
      ],
    };
    expect(input.schemaVersion).toBe('1.0');
    expect(input.components).toHaveLength(1);
    expect(input.components[0]!.name).toBe('Button');
  });

  it('PluginInput with variants', () => {
    const input: PluginInput = {
      schemaVersion: '1.0',
      targetPage: 'Component Library',
      components: [
        {
          name: 'Badge',
          node: {
            type: 'COMPONENT_SET',
            name: 'Badge',
            size: { x: 200, y: 100 },
          },
          variants: {
            axes: { Variant: ['Default', 'Primary'] },
            children: [
              {
                name: 'Variant=Default',
                node: {
                  type: 'COMPONENT',
                  name: 'Variant=Default',
                  size: { x: 60, y: 24 },
                },
              },
              {
                name: 'Variant=Primary',
                node: {
                  type: 'COMPONENT',
                  name: 'Variant=Primary',
                  size: { x: 60, y: 24 },
                },
              },
            ],
          },
        },
      ],
    };
    expect(input.components[0]!.variants!.axes.Variant).toEqual(['Default', 'Primary']);
    expect(input.components[0]!.variants!.children).toHaveLength(2);
  });
});
