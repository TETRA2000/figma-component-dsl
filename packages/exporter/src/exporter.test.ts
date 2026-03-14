import { describe, it, expect } from 'vitest';
import { generatePluginInput, exportToFile } from './exporter.js';
import { compile } from '@figma-dsl/compiler';
import { frame, text, component, componentSet, instance } from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { horizontal } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync, readFileSync } from 'fs';

const __dirname2 = dirname(fileURLToPath(import.meta.url));

describe('generatePluginInput()', () => {
  it('generates plugin input with schema version', () => {
    const node = frame('Box', { size: { x: 100, y: 50 }, fills: [solid('#ff0000')] });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    expect(input.schemaVersion).toBe('1.0.0');
    expect(input.targetPage).toBe('Component Library');
    expect(input.components).toHaveLength(1);
  });

  it('preserves auto-layout properties', () => {
    const node = frame('Container', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      children: [text('Hello')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.stackMode).toBe('HORIZONTAL');
    expect(comp.itemSpacing).toBe(8);
    expect(comp.paddingLeft).toBe(16);
    expect(comp.paddingRight).toBe(16);
  });

  it('preserves component property definitions', () => {
    const node = component('Button', {
      componentProperties: [
        { name: 'Label', type: 'TEXT', defaultValue: 'Click' },
        { name: 'Disabled', type: 'BOOLEAN', defaultValue: false },
      ],
      children: [text('Click')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    expect(input.components[0]!.componentPropertyDefinitions).toBeDefined();
    expect(input.components[0]!.componentPropertyDefinitions!['Label']).toEqual({
      type: 'TEXT',
      defaultValue: 'Click',
    });
  });

  it('filters out VARIANT properties from standalone COMPONENT nodes', () => {
    const node = component('PizzaCard', {
      componentProperties: [
        { name: 'Name', type: 'TEXT', defaultValue: 'Margherita' },
        { name: 'Variant', type: 'VARIANT', defaultValue: 'Default' },
        { name: 'Size', type: 'VARIANT', defaultValue: 'Medium' },
      ],
      children: [text('Hello')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const defs = input.components[0]!.componentPropertyDefinitions!;
    // TEXT property should be preserved
    expect(defs['Name']).toEqual({ type: 'TEXT', defaultValue: 'Margherita' });
    // VARIANT properties should be stripped
    expect(defs['Variant']).toBeUndefined();
    expect(defs['Size']).toBeUndefined();
  });

  it('preserves instance references', () => {
    const node = frame('Root', {
      size: { x: 200, y: 100 },
      children: [instance('Button', { Label: 'Submit' })],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const inst = input.components[0]!.children[0]!;
    expect(inst.componentId).toBe('Button');
    expect(inst.overriddenProperties).toEqual({ Label: 'Submit' });
  });

  it('converts text nodes with font metadata', () => {
    const node = frame('Root', {
      size: { x: 200, y: 50 },
      children: [text('Title', { fontSize: 24, fontWeight: 700 })],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const textNode = input.components[0]!.children[0]!;
    expect(textNode.characters).toBe('Title');
    expect(textNode.fontSize).toBe(24);
    expect(textNode.fontWeight).toBe(700);
    expect(textNode.fontStyle).toBe('Bold');
  });

  it('supports custom page name', () => {
    const node = frame('Box', { size: { x: 50, y: 50 } });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Custom Page');
    expect(input.targetPage).toBe('Custom Page');
  });
});

describe('exportToFile()', () => {
  it('writes plugin input JSON to file', () => {
    const outPath = join(__dirname2, '../../../test-plugin-input.json');
    const node = frame('Box', { size: { x: 100, y: 50 }, fills: [solid('#ff0000')] });
    const compiled = compile(node);
    const input = exportToFile(compiled, outPath);

    expect(existsSync(outPath)).toBe(true);
    const contents = JSON.parse(readFileSync(outPath, 'utf-8'));
    expect(contents.schemaVersion).toBe('1.0.0');
    expect(contents.components).toHaveLength(1);

    // Cleanup
    unlinkSync(outPath);
  });
});
