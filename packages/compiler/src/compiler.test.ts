import { describe, it, expect } from 'vitest';
import { compile, compileToJson } from './compiler.js';
import { frame, text, rectangle, ellipse, group, component, componentSet, instance, image, line, section, polygon, star, union, subtract, intersect, exclude } from '@figma-dsl/core';
import { solid, gradient, radialGradient, imageFill, defineTokens, token } from '@figma-dsl/core';
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

describe('compile() — new node types', () => {
  it('maps LINE to LINE', () => {
    const node = line('Divider', { size: { x: 200 } });
    const result = compile(node);
    expect(result.root.type).toBe('LINE');
    expect(result.root.size).toEqual({ x: 200, y: 0 });
  });

  it('maps LINE strokeCap', () => {
    const node = line('Divider', {
      size: { x: 100 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, strokeCap: 'ROUND' }],
    });
    const result = compile(node);
    expect(result.root.strokeCap).toBe('ROUND');
  });

  it('maps LINE rotation', () => {
    const node = line('Divider', { size: { x: 100 }, rotation: 45 });
    const result = compile(node);
    expect(result.root.rotation).toBe(45);
  });

  it('maps SECTION to SECTION', () => {
    const node = section('My Section', { size: { x: 200, y: 200 } });
    const result = compile(node);
    expect(result.root.type).toBe('SECTION');
  });

  it('maps SECTION contentsHidden to sectionContentsHidden', () => {
    const node = section('S', { contentsHidden: true });
    const result = compile(node);
    expect(result.root.sectionContentsHidden).toBe(true);
  });

  it('skips auto-layout for SECTION', () => {
    const node = section('S', { size: { x: 200, y: 200 } });
    const result = compile(node);
    expect(result.root.stackMode).toBeUndefined();
  });

  it('maps POLYGON to POLYGON with pointCount', () => {
    const node = polygon('Hex', { pointCount: 6, size: { x: 100, y: 100 } });
    const result = compile(node);
    expect(result.root.type).toBe('POLYGON');
    expect(result.root.pointCount).toBe(6);
  });

  it('maps POLYGON rotation', () => {
    const node = polygon('Tri', { pointCount: 3, rotation: 30 });
    const result = compile(node);
    expect(result.root.rotation).toBe(30);
  });

  it('maps STAR to STAR with pointCount and default innerRadius', () => {
    const node = star('Star', { pointCount: 5, size: { x: 100, y: 100 } });
    const result = compile(node);
    expect(result.root.type).toBe('STAR');
    expect(result.root.pointCount).toBe(5);
    expect(result.root.innerRadius).toBeCloseTo(0.382);
  });

  it('maps STAR with custom innerRadius', () => {
    const node = star('Star', { pointCount: 5, innerRadius: 0.5 });
    const result = compile(node);
    expect(result.root.innerRadius).toBe(0.5);
  });

  it('maps BOOLEAN_OPERATION to BOOLEAN_OPERATION', () => {
    const child1 = rectangle('R1', { size: { x: 50, y: 50 } });
    const child2 = ellipse('E1', { size: { x: 50, y: 50 } });
    const node = subtract('Cutout', { children: [child1, child2] });
    const result = compile(node);
    expect(result.root.type).toBe('BOOLEAN_OPERATION');
    expect(result.root.booleanOperation).toBe('SUBTRACT');
    expect(result.root.children).toHaveLength(2);
  });

  it('compiles all four boolean operation types', () => {
    const c1 = rectangle('R', { size: { x: 10, y: 10 } });
    const c2 = rectangle('R2', { size: { x: 10, y: 10 } });

    expect(compile(union('U', { children: [c1, c2] })).root.booleanOperation).toBe('UNION');
    expect(compile(subtract('S', { children: [c1, c2] })).root.booleanOperation).toBe('SUBTRACT');
    expect(compile(intersect('I', { children: [c1, c2] })).root.booleanOperation).toBe('INTERSECT');
    expect(compile(exclude('E', { children: [c1, c2] })).root.booleanOperation).toBe('EXCLUDE');
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

describe('compile() — validation levels', () => {
  it('strict rejects strokeWeight=0', () => {
    const node = rectangle('Bad', {
      size: { x: 10, y: 10 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 0 }],
    });
    const result = compile(node, { validationLevel: 'strict' });
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('strokeWeight');
  });

  it('normal allows strokeWeight=0 as warning', () => {
    const node = rectangle('OK', {
      size: { x: 10, y: 10 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 0 }],
    });
    const result = compile(node, { validationLevel: 'normal' });
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]!.severity).toBe('warning');
    expect(result.errors[0]!.message).toContain('invisible');
  });

  it('loose treats negative cornerRadius as warning', () => {
    const node = frame('Neg', { cornerRadius: -5 });
    const result = compile(node, { validationLevel: 'loose' });
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]!.severity).toBe('warning');
    expect(result.errors[0]!.message).toContain('clamping');
  });

  it('loose treats zero fontSize as warning', () => {
    const node = frame('Root', {
      children: [text('Hidden', { fontSize: 0 })],
    });
    const result = compile(node, { validationLevel: 'loose' });
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]!.severity).toBe('warning');
  });

  it('all levels reject invalid RGBA (Figma hard constraint)', () => {
    const node = frame('Bad', {
      fills: [{ type: 'SOLID', color: { r: 2, g: 0, b: 0, a: 1 }, opacity: 1, visible: true }],
    });
    for (const level of ['strict', 'normal', 'loose'] as const) {
      const result = compile(node, { validationLevel: level });
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]!.message).toContain('RGBA');
    }
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

describe('compile() — IMAGE node', () => {
  it('maps IMAGE type correctly', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 200, y: 150 } });
    const result = compile(node);
    expect(result.root.type).toBe('IMAGE');
  });

  it('passes through imageSrc and imageScaleMode', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 200, y: 150 }, fit: 'FIT' });
    const result = compile(node);
    expect(result.root.imageSrc).toBe('./photo.png');
    expect(result.root.imageScaleMode).toBe('FIT');
  });

  it('defaults imageScaleMode to FILL', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 200, y: 150 } });
    const result = compile(node);
    expect(result.root.imageScaleMode).toBe('FILL');
  });

  it('preserves size on IMAGE nodes', () => {
    const node = image('Photo', { src: './photo.png', size: { x: 300, y: 200 } });
    const result = compile(node);
    expect(result.root.size).toEqual({ x: 300, y: 200 });
  });

  it('preserves cornerRadius on IMAGE nodes', () => {
    const node = image('Round', { src: 'img.png', size: { x: 100, y: 100 }, cornerRadius: 8 });
    const result = compile(node);
    expect(result.root.cornerRadius).toBe(8);
  });

  it('compiles IMAGE nodes as children of FRAME', () => {
    const node = frame('Container', {
      children: [image('Photo', { src: './photo.png', size: { x: 200, y: 150 } })],
    });
    const result = compile(node);
    expect(result.root.children).toHaveLength(1);
    expect(result.root.children[0]!.type).toBe('IMAGE');
    expect(result.root.children[0]!.imageSrc).toBe('./photo.png');
  });

  it('compiles IMAGE nodes in auto-layout with layout sizing', () => {
    const node = frame('Container', {
      autoLayout: horizontal({ spacing: 8 }),
      children: [image('Photo', {
        src: './photo.png',
        size: { x: 200, y: 150 },
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FIXED',
      })],
    });
    const result = compile(node);
    const child = result.root.children[0]!;
    expect(child.layoutSizingHorizontal).toBe('FILL');
    expect(child.layoutSizingVertical).toBe('FIXED');
  });
});

describe('compile() — IMAGE fills', () => {
  it('converts imageFill to IMAGE paint', () => {
    const node = frame('BgImage', {
      size: { x: 400, y: 300 },
      fills: [imageFill('./hero.jpg')],
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('IMAGE');
    expect(result.root.fillPaints[0]!.imageSrc).toBe('./hero.jpg');
    expect(result.root.fillPaints[0]!.imageScaleMode).toBe('FILL');
  });

  it('preserves imageFill scaleMode', () => {
    const node = frame('BgImage', {
      size: { x: 400, y: 300 },
      fills: [imageFill('./bg.png', { scaleMode: 'TILE' })],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.imageScaleMode).toBe('TILE');
  });

  it('preserves imageFill opacity', () => {
    const node = frame('BgImage', {
      size: { x: 400, y: 300 },
      fills: [imageFill('./bg.png', { opacity: 0.5 })],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.opacity).toBe(0.5);
  });

  it('handles mixed solid and image fills', () => {
    const node = frame('Mixed', {
      size: { x: 400, y: 300 },
      fills: [solid('#ff0000'), imageFill('./overlay.png'), solid('#0000ff')],
    });
    const result = compile(node);
    expect(result.root.fillPaints).toHaveLength(3);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    expect(result.root.fillPaints[1]!.type).toBe('IMAGE');
    expect(result.root.fillPaints[2]!.type).toBe('SOLID');
  });

  it('converts imageFill on rectangles', () => {
    const node = rectangle('Bg', {
      size: { x: 200, y: 100 },
      fills: [imageFill('./texture.png', { scaleMode: 'FIT' })],
    });
    const result = compile(node);
    expect(result.root.fillPaints[0]!.type).toBe('IMAGE');
    expect(result.root.fillPaints[0]!.imageSrc).toBe('./texture.png');
    expect(result.root.fillPaints[0]!.imageScaleMode).toBe('FIT');
  });
});
