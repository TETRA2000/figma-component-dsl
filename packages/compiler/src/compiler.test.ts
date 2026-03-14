import { describe, it, expect } from 'vitest';
import { compile, compileToJson } from './compiler.js';
import { frame, text, rectangle, ellipse, group, component, componentSet, instance } from '@figma-dsl/core';
import { solid, gradient, radialGradient, defineTokens, token } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';

describe('compile() — GUID assignment', () => {
  it('assigns sequential GUIDs to all nodes', () => {
    const node = frame('Root', {
      children: [
        rectangle('R1', { size: { x: 10, y: 10 } }),
        rectangle('R2', { size: { x: 20, y: 20 } }),
      ],
    });
    const result = compile(node);
    expect(result.root.guid).toEqual([0, 1]);
    expect(result.root.children[0]!.guid).toEqual([0, 2]);
    expect(result.root.children[1]!.guid).toEqual([0, 3]);
    expect(result.nodeCount).toBe(3);
  });

  it('assigns GUIDs deterministically', () => {
    const node = frame('Root', {
      children: [text('Hello', { fontSize: 14 })],
    });
    const r1 = compile(node);
    const r2 = compile(node);
    expect(r1.root.guid).toEqual(r2.root.guid);
    expect(r1.root.children[0]!.guid).toEqual(r2.root.children[0]!.guid);
  });
});

describe('compile() — parent references', () => {
  it('sets parentIndex on child nodes', () => {
    const node = frame('Root', {
      children: [rectangle('R', { size: { x: 10, y: 10 } })],
    });
    const result = compile(node);
    expect(result.root.parentIndex).toBeUndefined();
    expect(result.root.children[0]!.parentIndex).toEqual({
      guid: [0, 1],
      position: '0',
    });
  });
});

describe('compile() — node type mapping', () => {
  it('maps FRAME to FRAME', () => {
    const result = compile(frame('F', {}));
    expect(result.root.type).toBe('FRAME');
  });

  it('maps TEXT to TEXT', () => {
    const node = frame('Root', {
      children: [text('Hello')],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('TEXT');
  });

  it('maps RECTANGLE with cornerRadius to ROUNDED_RECTANGLE', () => {
    const node = frame('Root', {
      children: [rectangle('R', { size: { x: 10, y: 10 }, cornerRadius: 4 })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('ROUNDED_RECTANGLE');
  });

  it('maps RECTANGLE with cornerRadii to ROUNDED_RECTANGLE', () => {
    const node = frame('Root', {
      children: [rectangle('R', {
        size: { x: 10, y: 10 },
        cornerRadii: { topLeft: 4, topRight: 0, bottomLeft: 0, bottomRight: 8 },
      })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('ROUNDED_RECTANGLE');
  });

  it('passes cornerRadii through to compiled output', () => {
    const node = frame('Root', {
      cornerRadii: { topLeft: 4, topRight: 8, bottomLeft: 0, bottomRight: 12 },
    });
    const result = compile(node);
    expect(result.root.cornerRadii).toEqual({ topLeft: 4, topRight: 8, bottomLeft: 0, bottomRight: 12 });
  });

  it('maps RECTANGLE without cornerRadius to RECTANGLE', () => {
    const node = frame('Root', {
      children: [rectangle('R', { size: { x: 10, y: 10 } })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('RECTANGLE');
  });

  it('maps ELLIPSE to ELLIPSE', () => {
    const node = frame('Root', {
      children: [ellipse('E', { size: { x: 40, y: 40 } })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('ELLIPSE');
  });

  it('maps GROUP to GROUP', () => {
    const node = group('G', [rectangle('R', { size: { x: 10, y: 10 } })]);
    const result = compile(node);
    expect(result.root.type).toBe('GROUP');
  });

  it('maps COMPONENT to COMPONENT', () => {
    const node = component('Btn', { children: [text('Click')] });
    const result = compile(node);
    expect(result.root.type).toBe('COMPONENT');
  });

  it('maps COMPONENT_SET to COMPONENT_SET', () => {
    const node = componentSet('Buttons', {
      children: [component('Variant=Primary', { children: [text('P')] })],
    });
    const result = compile(node);
    expect(result.root.type).toBe('COMPONENT_SET');
  });

  it('maps INSTANCE to INSTANCE', () => {
    const node = frame('Root', {
      children: [instance('Button')],
    });
    const result = compile(node);
    expect(result.root.children[0]!.type).toBe('INSTANCE');
  });
});

describe('compile() — fills conversion', () => {
  it('converts solid fills to fillPaints', () => {
    const node = frame('Box', {
      fills: [solid('#ff0000')],
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    expect(result.root.fillPaints[0]!.color!.r).toBeCloseTo(1.0);
  });

  it('converts gradient fills to fillPaints', () => {
    const node = frame('Grad', {
      fills: [gradient([
        { hex: '#000000', position: 0 },
        { hex: '#ffffff', position: 1 },
      ])],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    expect(result.root.fillPaints[0]!.gradientStops).toHaveLength(2);
  });

  it('preserves fill array ordering', () => {
    const node = frame('Multi', {
      fills: [solid('#ff0000'), solid('#00ff00'), solid('#0000ff')],
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(3);
    expect(result.root.fillPaints[0]!.color!.r).toBeCloseTo(1.0);
    expect(result.root.fillPaints[1]!.color!.g).toBeCloseTo(1.0);
    expect(result.root.fillPaints[2]!.color!.b).toBeCloseTo(1.0);
  });
});

describe('compile() — strokes', () => {
  it('converts strokes', () => {
    const node = rectangle('R', {
      size: { x: 100, y: 50 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
    });
    const result = compile(node);
    expect(result.root.strokes).toHaveLength(1);
    expect(result.root.strokeWeight).toBe(2);
  });
});

describe('compile() — transforms', () => {
  it('root node has identity transform', () => {
    const node = frame('Root', {});
    const result = compile(node);
    expect(result.root.transform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });
});

describe('compile() — auto-layout passthrough', () => {
  it('sets stackMode and layout properties', () => {
    const node = frame('Container', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8, align: 'CENTER', counterAlign: 'MAX' }),
    });
    const result = compile(node);
    expect(result.root.stackMode).toBe('HORIZONTAL');
    expect(result.root.itemSpacing).toBe(8);
    expect(result.root.paddingLeft).toBe(16);
    expect(result.root.paddingRight).toBe(16);
    expect(result.root.paddingTop).toBe(8);
    expect(result.root.paddingBottom).toBe(8);
    expect(result.root.primaryAxisAlignItems).toBe('CENTER');
    expect(result.root.counterAxisAlignItems).toBe('MAX');
  });
});

describe('compile() — layoutSizing inference', () => {
  it('infers FIXED when auto-layout frame has explicit size but no widthSizing', () => {
    const node = frame('Header', {
      size: { x: 1440, y: 64 },
      autoLayout: horizontal({ padX: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    });
    const result = compile(node);
    expect(result.root.layoutSizingHorizontal).toBe('FIXED');
    expect(result.root.layoutSizingVertical).toBe('FIXED');
  });

  it('respects explicit widthSizing/heightSizing over inference', () => {
    const node = frame('Card', {
      size: { x: 260, y: 100 },
      autoLayout: vertical({ spacing: 8, widthSizing: 'FIXED', heightSizing: 'HUG' }),
    });
    const result = compile(node);
    expect(result.root.layoutSizingHorizontal).toBe('FIXED');
    expect(result.root.layoutSizingVertical).toBe('HUG');
  });

  it('does not infer FIXED when size is zero or undefined', () => {
    const node = frame('HugFrame', {
      autoLayout: horizontal({ spacing: 8 }),
    });
    const result = compile(node);
    // No explicit size, so no inference
    expect(result.root.layoutSizingHorizontal).toBeUndefined();
    expect(result.root.layoutSizingVertical).toBeUndefined();
  });

  it('infers FIXED for width only when only x is set', () => {
    const node = frame('WidthOnly', {
      size: { x: 300, y: 0 },
      autoLayout: vertical({ spacing: 0 }),
    });
    const result = compile(node);
    expect(result.root.layoutSizingHorizontal).toBe('FIXED');
    // y=0 should not infer FIXED
    expect(result.root.layoutSizingVertical).toBeUndefined();
  });

  it('preserves HUG when explicitly set even with size', () => {
    const node = frame('Badge', {
      size: { x: 80, y: 22 },
      autoLayout: horizontal({ padX: 12, padY: 4, widthSizing: 'HUG', heightSizing: 'HUG' }),
    });
    const result = compile(node);
    expect(result.root.layoutSizingHorizontal).toBe('HUG');
    expect(result.root.layoutSizingVertical).toBe('HUG');
  });
});

describe('compile() — textAutoResize passthrough', () => {
  it('passes through textAutoResize from node', () => {
    const node = frame('Root', {
      children: [text('Wrapping text', {
        fontSize: 13,
        size: { x: 228 },
        textAutoResize: 'HEIGHT',
      })],
    });
    const result = compile(node);
    const textNode = result.root.children[0]!;
    expect(textNode.textAutoResize).toBe('HEIGHT');
  });

  it('does not set textAutoResize when not specified', () => {
    const node = frame('Root', {
      children: [text('Auto text', { fontSize: 14 })],
    });
    const result = compile(node);
    const textNode = result.root.children[0]!;
    expect(textNode.textAutoResize).toBeUndefined();
  });
});

describe('compile() — component compilation', () => {
  it('maps component properties to definitions', () => {
    const node = component('Button', {
      componentProperties: [
        { name: 'Label', type: 'TEXT', defaultValue: 'Click' },
        { name: 'Disabled', type: 'BOOLEAN', defaultValue: false },
      ],
    });
    const result = compile(node);
    expect(result.root.componentPropertyDefinitions).toBeDefined();
    expect(result.root.componentPropertyDefinitions!['Label']).toEqual({
      type: 'TEXT',
      defaultValue: 'Click',
    });
    expect(result.root.componentPropertyDefinitions!['Disabled']).toEqual({
      type: 'BOOLEAN',
      defaultValue: false,
    });
  });

  it('reports error and skips VARIANT properties on standalone COMPONENT', () => {
    const node = component('Card', {
      componentProperties: [
        { name: 'Title', type: 'TEXT', defaultValue: 'Hello' },
        { name: 'Style', type: 'VARIANT' as any, defaultValue: 'Default' },
      ],
    });
    const result = compile(node);
    // VARIANT property should be excluded
    expect(result.root.componentPropertyDefinitions!['Title']).toBeDefined();
    expect(result.root.componentPropertyDefinitions!['Style']).toBeUndefined();
    // Should report a compile error
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('VARIANT');
    expect(result.errors[0]!.message).toContain('componentSet()');
  });

  it('maps instance overrides', () => {
    const node = frame('Root', {
      children: [instance('Button', { Label: 'Submit' })],
    });
    const result = compile(node);
    const inst = result.root.children[0]!;
    expect(inst.overriddenProperties).toEqual({ Label: 'Submit' });
    expect(inst.componentId).toBe('Button');
  });
});

describe('compile() — text data expansion', () => {
  it('generates textData for text nodes', () => {
    const node = frame('Root', {
      children: [text('Hello\nWorld')],
    });
    const result = compile(node);
    const textNode = result.root.children[0]!;
    expect(textNode.textData).toEqual({
      characters: 'Hello\nWorld',
      lines: ['Hello', 'World'],
    });
  });

  it('generates fontMetaData', () => {
    const node = frame('Root', {
      children: [text('Title', { fontSize: 24, fontWeight: 700 })],
    });
    const result = compile(node);
    const textNode = result.root.children[0]!;
    expect(textNode.derivedTextData?.fontMetaData[0]).toEqual({
      fontFamily: 'Inter',
      fontStyle: 'Bold',
      fontWeight: 700,
      fontSize: 24,
    });
  });

  it('sets top-level text properties', () => {
    const node = frame('Root', {
      children: [text('Centered', { fontSize: 16, textAlignHorizontal: 'CENTER' })],
    });
    const result = compile(node);
    const textNode = result.root.children[0]!;
    expect(textNode.fontSize).toBe(16);
    expect(textNode.fontFamily).toBe('Inter');
    expect(textNode.textAlignHorizontal).toBe('CENTER');
  });
});

describe('compile() — color token resolution', () => {
  it('resolves tokens during compilation', () => {
    const tokens = defineTokens({ primary: '#7c3aed' });
    const node = frame('Box', {
      fills: [token(tokens, 'primary')],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.color!.r).toBeCloseTo(0x7c / 255);
  });
});

describe('compile() — visibility', () => {
  it('preserves visible=false', () => {
    const node = frame('Root', {
      children: [rectangle('Hidden', { size: { x: 10, y: 10 }, visible: false })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.visible).toBe(false);
  });
});

describe('compileToJson()', () => {
  it('serializes to JSON string', () => {
    const node = frame('Root', {});
    const json = compileToJson(node);
    const parsed = JSON.parse(json);
    expect(parsed.root.name).toBe('Root');
    expect(parsed.nodeCount).toBe(1);
  });
});

describe('compile() — error handling', () => {
  it('returns empty errors for valid input', () => {
    const node = frame('Root', {});
    const result = compile(node);
    expect(result.errors).toEqual([]);
  });
});

describe('compile() — validation errors', () => {
  it('reports negative cornerRadius', () => {
    const node = frame('Bad', { cornerRadius: -5 });
    const result = compile(node);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('cornerRadius');
  });

  it('reports invalid RGBA values', () => {
    const node = frame('Bad', {
      fills: [{ type: 'SOLID', color: { r: 2, g: 0, b: 0, a: 1 }, opacity: 1, visible: true }],
    });
    const result = compile(node);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('RGBA');
  });

  it('reports non-positive strokeWeight', () => {
    const node = rectangle('Bad', {
      size: { x: 10, y: 10 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 0 }],
    });
    const result = compile(node);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('strokeWeight');
  });

  it('reports non-positive fontSize', () => {
    const node = frame('Root', {
      children: [text('Bad', { fontSize: 0 })],
    });
    const result = compile(node);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('fontSize');
  });

  it('returns no errors for valid nodes', () => {
    const node = frame('Root', {
      fills: [solid('#ff0000')],
      cornerRadius: 8,
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
      children: [text('OK', { fontSize: 14 })],
    });
    const result = compile(node);
    expect(result.errors).toEqual([]);
  });
});

describe('compile() — textDecoration passthrough', () => {
  it('passes through UNDERLINE textDecoration', () => {
    const node = frame('Root', {
      children: [text('Underlined', { fontSize: 14, textDecoration: 'UNDERLINE' })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.textDecoration).toBe('UNDERLINE');
  });

  it('omits NONE textDecoration', () => {
    const node = frame('Root', {
      children: [text('Normal', { fontSize: 14, textDecoration: 'NONE' })],
    });
    const result = compile(node);
    expect(result.root.children[0]!.textDecoration).toBeUndefined();
  });
});

describe('compile() — radial gradient', () => {
  it('compiles radial gradient fills', () => {
    const node = frame('Grad', {
      fills: [radialGradient([
        { hex: '#ff0000', position: 0 },
        { hex: '#0000ff', position: 1 },
      ])],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_RADIAL');
    expect(result.root.fillPaints[0]!.gradientStops).toHaveLength(2);
  });
});
