import { describe, it, expect } from 'vitest';
import { generatePluginInput, exportToFile } from './exporter.js';
import { compile } from '@figma-dsl/compiler';
import { frame, text, component, componentSet, instance, line, section, polygon, star, subtract, rectangle, ellipse } from '@figma-dsl/core';
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

describe('generatePluginInput() — new node types', () => {
  it('exports LINE with strokeCap and rotation', () => {
    const node = line('Divider', {
      size: { x: 200 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, strokeCap: 'ROUND' }],
      rotation: 45,
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.type).toBe('LINE');
    expect(comp.strokeCap).toBe('ROUND');
    expect(comp.rotation).toBe(45);
  });

  it('exports POLYGON with pointCount', () => {
    const node = polygon('Hex', { pointCount: 6, size: { x: 100, y: 100 }, fills: [solid('#ff0000')] });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.type).toBe('POLYGON');
    expect(comp.pointCount).toBe(6);
  });

  it('exports STAR with pointCount and innerRadius', () => {
    const node = star('Star', { pointCount: 5, innerRadius: 0.5, size: { x: 100, y: 100 } });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.type).toBe('STAR');
    expect(comp.pointCount).toBe(5);
    expect(comp.innerRadius).toBe(0.5);
  });

  it('exports BOOLEAN_OPERATION with operation type and children', () => {
    const node = subtract('Cutout', {
      children: [
        rectangle('R', { size: { x: 50, y: 50 } }),
        ellipse('E', { size: { x: 30, y: 30 } }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.type).toBe('BOOLEAN_OPERATION');
    expect(comp.booleanOperation).toBe('SUBTRACT');
    expect(comp.children).toHaveLength(2);
  });

  it('exports SECTION with sectionContentsHidden', () => {
    const node = section('S', {
      size: { x: 200, y: 200 },
      contentsHidden: true,
      children: [rectangle('R', { size: { x: 50, y: 50 } })],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const comp = input.components[0]!;
    expect(comp.type).toBe('SECTION');
    expect(comp.sectionContentsHidden).toBe(true);
    expect(comp.children).toHaveLength(1);
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
