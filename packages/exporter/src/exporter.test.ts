import { describe, it, expect, beforeAll } from 'vitest';
import { generatePluginInput, exportToFile } from './exporter.js';
import { compile } from '@figma-dsl/compiler';
import { frame, text, component, componentSet, instance, image, line, section, polygon, star, subtract, rectangle, ellipse } from '@figma-dsl/core';
import { solid, imageFill } from '@figma-dsl/core';
import { horizontal } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createCanvas } from '@napi-rs/canvas';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const testAssetDir = join(__dirname2, '../../../.test-assets');

beforeAll(() => {
  // Create a tiny test PNG for image export tests
  mkdirSync(testAssetDir, { recursive: true });
  const canvas = createCanvas(4, 4);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 4, 4);
  writeFileSync(join(testAssetDir, 'test.png'), canvas.toBuffer('image/png'));
});

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

describe('generatePluginInput() — IMAGE fills', () => {
  it('embeds image data as base64 for local files', () => {
    const node = frame('BgImage', {
      size: { x: 100, y: 100 },
      fills: [imageFill('./test.png')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const fill = input.components[0]!.fills![0]!;
    expect(fill.type).toBe('IMAGE');
    expect(fill.imageSrc).toBe('./test.png');
    expect(fill.imageData).toBeDefined();
    expect(fill.imageData!.startsWith('data:image/png;base64,')).toBe(true);
    expect(fill.imageScaleMode).toBe('FILL');
  });

  it('sets imageFormat for embedded images', () => {
    const node = frame('BgImage', {
      size: { x: 100, y: 100 },
      fills: [imageFill('./test.png')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const fill = input.components[0]!.fills![0]!;
    expect(fill.imageFormat).toBe('PNG');
  });

  it('sets imageError for missing files', () => {
    const node = frame('Missing', {
      size: { x: 100, y: 100 },
      fills: [imageFill('./nonexistent.png')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const fill = input.components[0]!.fills![0]!;
    expect(fill.imageError).toBeDefined();
    expect(fill.imageData).toBeUndefined();
  });

  it('sets imageError for URL images', () => {
    const node = frame('Remote', {
      size: { x: 100, y: 100 },
      fills: [imageFill('https://example.com/img.png')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const fill = input.components[0]!.fills![0]!;
    expect(fill.imageError).toBeDefined();
  });

  it('preserves scaleMode in exported IMAGE fills', () => {
    const node = frame('Tiled', {
      size: { x: 100, y: 100 },
      fills: [imageFill('./test.png', { scaleMode: 'TILE' })],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const fill = input.components[0]!.fills![0]!;
    expect(fill.imageScaleMode).toBe('TILE');
  });
});

describe('generatePluginInput() — IMAGE nodes', () => {
  it('embeds image data for IMAGE node with local src', () => {
    const node = frame('Root', {
      size: { x: 200, y: 200 },
      children: [
        image('Photo', { src: './test.png', size: { x: 100, y: 100 } }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const imgNode = input.components[0]!.children[0]!;
    expect(imgNode.type).toBe('IMAGE');
    expect(imgNode.imageSrc).toBe('./test.png');
    expect(imgNode.imageScaleMode).toBe('FILL');
    expect(imgNode.imageData).toBeDefined();
    expect(imgNode.imageData!.startsWith('data:image/png;base64,')).toBe(true);
    expect(imgNode.imageFormat).toBe('PNG');
  });

  it('sets imageError for IMAGE node with missing file', () => {
    const node = frame('Root', {
      size: { x: 200, y: 200 },
      children: [
        image('Missing', { src: './nonexistent.png', size: { x: 100, y: 100 } }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const imgNode = input.components[0]!.children[0]!;
    expect(imgNode.imageSrc).toBe('./nonexistent.png');
    expect(imgNode.imageError).toBeDefined();
    expect(imgNode.imageData).toBeUndefined();
  });

  it('sets imageError for IMAGE node with URL src', () => {
    const node = frame('Root', {
      size: { x: 200, y: 200 },
      children: [
        image('Remote', { src: 'https://example.com/img.png', size: { x: 100, y: 100 } }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const imgNode = input.components[0]!.children[0]!;
    expect(imgNode.imageSrc).toBe('https://example.com/img.png');
    expect(imgNode.imageError).toBeDefined();
  });

  it('preserves custom fit mode for IMAGE nodes', () => {
    const node = frame('Root', {
      size: { x: 200, y: 200 },
      children: [
        image('Fitted', { src: './test.png', size: { x: 100, y: 100 }, fit: 'FIT' }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled, 'Test', { assetDir: testAssetDir });
    const imgNode = input.components[0]!.children[0]!;
    expect(imgNode.imageScaleMode).toBe('FIT');
  });
});

// --- Banner Mode Exporter Tests ---
describe('generatePluginInput() — Banner Mode effects', () => {
  it('maps DROP_SHADOW effects to Figma format', () => {
    const node = frame('Banner', {
      size: { x: 800, y: 400 },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.5 },
        offsetX: 2,
        offsetY: 4,
        blur: 8,
        spread: 1,
      }],
    });
    const compiled = compile(node, { mode: 'banner' });
    const input = generatePluginInput(compiled);
    const root = input.components[0]!;
    expect((root as Record<string, unknown>).effects).toBeDefined();
    const effects = (root as Record<string, unknown>).effects as Array<Record<string, unknown>>;
    expect(effects).toHaveLength(1);
    expect(effects[0]!.type).toBe('DROP_SHADOW');
    expect(effects[0]!.visible).toBe(true);
    expect(effects[0]!.radius).toBe(8);
    expect(effects[0]!.offset).toEqual({ x: 2, y: 4 });
    expect(effects[0]!.spread).toBe(1);
  });

  it('maps LAYER_BLUR effects to Figma format', () => {
    const node = frame('Blurred', {
      size: { x: 100, y: 100 },
      effects: [{ type: 'LAYER_BLUR', radius: 10 }],
    });
    const compiled = compile(node, { mode: 'banner' });
    const input = generatePluginInput(compiled);
    const root = input.components[0]!;
    const effects = (root as Record<string, unknown>).effects as Array<Record<string, unknown>>;
    expect(effects).toHaveLength(1);
    expect(effects[0]!.type).toBe('LAYER_BLUR');
    expect(effects[0]!.radius).toBe(10);
  });

  it('maps blendMode to export output', () => {
    const node = frame('Blended', {
      size: { x: 100, y: 100 },
      blendMode: 'MULTIPLY',
    });
    const compiled = compile(node, { mode: 'banner' });
    const input = generatePluginInput(compiled);
    const root = input.components[0]! as Record<string, unknown>;
    expect(root.blendMode).toBe('MULTIPLY');
  });

  it('propagates mode to export output', () => {
    const node = frame('Root', { size: { x: 100, y: 100 } });
    const compiled = compile(node, { mode: 'banner' });
    const input = generatePluginInput(compiled);
    expect((input as Record<string, unknown>).mode).toBe('banner');
  });
});
