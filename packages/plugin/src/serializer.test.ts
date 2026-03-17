import { describe, it, expect } from 'vitest';
import {
  serializeNode,
  serializeFills,
  serializeStrokes,
  collectSharedPropDefs,
  getRegistrableProperties,
  calculateGridColumns,
  calculateComponentSetWidth,
  COMPONENT_SET_PAD,
} from './serializer.js';
import type { SerializableNode, SerializablePaint, SharedPropDef } from './serializer.js';

// --- Helpers to build mock nodes ---

function mockNode(overrides: Partial<SerializableNode> & { type: string; name: string }): SerializableNode {
  return {
    visible: true,
    width: 100,
    height: 50,
    opacity: 1,
    children: [],
    ...overrides,
  };
}

function solidFill(r: number, g: number, b: number, opacity = 1): SerializablePaint {
  return { type: 'SOLID', color: { r, g, b }, opacity, visible: true };
}

// =================================================================
// serializeNode — variant component safety
// =================================================================

describe('serializeNode — variant component handling', () => {
  it('serializes componentPropertyDefinitions for standalone COMPONENT', () => {
    const node = mockNode({
      type: 'COMPONENT',
      name: 'Button',
      parent: { type: 'PAGE' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Click me' },
        Disabled: { type: 'BOOLEAN', defaultValue: false },
      },
    });

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toEqual({
      Label: { type: 'TEXT', defaultValue: 'Click me' },
      Disabled: { type: 'BOOLEAN', defaultValue: false },
    });
  });

  it('skips componentPropertyDefinitions for variant COMPONENT (parent is COMPONENT_SET)', () => {
    const node = mockNode({
      type: 'COMPONENT',
      name: 'Variant=Default, Size=Small',
      parent: { type: 'COMPONENT_SET' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Click me' },
      },
    });

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toBeUndefined();
  });

  it('serializes componentPropertyDefinitions for COMPONENT_SET node', () => {
    const node = mockNode({
      type: 'COMPONENT_SET',
      name: 'Button',
      parent: { type: 'PAGE' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Click me' },
        Variant: { type: 'VARIANT', defaultValue: 'Default' },
      },
    });

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toEqual({
      Label: { type: 'TEXT', defaultValue: 'Click me' },
      Variant: { type: 'VARIANT', defaultValue: 'Default' },
    });
  });

  it('skips componentPropertyDefinitions for non-component types (FRAME)', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'Wrapper',
      // A FRAME should never have componentPropertyDefinitions serialized
      // even if it somehow has the property
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'x' },
      },
    });

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toBeUndefined();
  });

  it('handles COMPONENT with no parent gracefully', () => {
    const node = mockNode({
      type: 'COMPONENT',
      name: 'Orphan',
      parent: null,
      componentPropertyDefinitions: {
        Title: { type: 'TEXT', defaultValue: 'Hello' },
      },
    });

    const result = serializeNode(node);
    // parent is null → not a variant component → should serialize props
    expect(result.componentPropertyDefinitions).toEqual({
      Title: { type: 'TEXT', defaultValue: 'Hello' },
    });
  });

  it('handles COMPONENT with undefined parent gracefully', () => {
    const node = mockNode({
      type: 'COMPONENT',
      name: 'TopLevel',
      componentPropertyDefinitions: {
        Title: { type: 'TEXT', defaultValue: 'Hello' },
      },
    });
    // parent is undefined by default in mockNode

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toEqual({
      Title: { type: 'TEXT', defaultValue: 'Hello' },
    });
  });

  it('does not serialize empty componentPropertyDefinitions', () => {
    const node = mockNode({
      type: 'COMPONENT',
      name: 'EmptyProps',
      parent: { type: 'PAGE' },
      componentPropertyDefinitions: {},
    });

    const result = serializeNode(node);
    expect(result.componentPropertyDefinitions).toBeUndefined();
  });
});

// =================================================================
// serializeNode — recursive COMPONENT_SET with variant children
// =================================================================

describe('serializeNode — COMPONENT_SET with children', () => {
  it('serializes COMPONENT_SET and skips componentPropertyDefinitions on variant children', () => {
    const variantChild1 = mockNode({
      type: 'COMPONENT',
      name: 'Variant=Default',
      parent: { type: 'COMPONENT_SET' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Click me' },
      },
      children: [
        mockNode({ type: 'TEXT', name: 'Label', characters: 'Click me', fontSize: 14 }),
      ],
    });

    const variantChild2 = mockNode({
      type: 'COMPONENT',
      name: 'Variant=Active',
      parent: { type: 'COMPONENT_SET' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Active' },
      },
      children: [
        mockNode({ type: 'TEXT', name: 'Label', characters: 'Active', fontSize: 14 }),
      ],
    });

    const setNode = mockNode({
      type: 'COMPONENT_SET',
      name: 'Button',
      parent: { type: 'PAGE' },
      componentPropertyDefinitions: {
        Label: { type: 'TEXT', defaultValue: 'Click me' },
        Variant: { type: 'VARIANT', defaultValue: 'Default' },
      },
      children: [variantChild1, variantChild2],
    });

    const result = serializeNode(setNode);

    // COMPONENT_SET itself should have componentPropertyDefinitions
    expect(result.componentPropertyDefinitions).toBeDefined();
    expect(result.componentPropertyDefinitions!.Label).toEqual({
      type: 'TEXT',
      defaultValue: 'Click me',
    });

    // Variant children should NOT have componentPropertyDefinitions
    expect(result.children).toHaveLength(2);
    expect(result.children[0]!.name).toBe('Variant=Default');
    expect(result.children[0]!.componentPropertyDefinitions).toBeUndefined();
    expect(result.children[1]!.name).toBe('Variant=Active');
    expect(result.children[1]!.componentPropertyDefinitions).toBeUndefined();
  });
});

// =================================================================
// serializeNode — basic node serialization
// =================================================================

describe('serializeNode — basics', () => {
  it('serializes a minimal FRAME', () => {
    const node = mockNode({ type: 'FRAME', name: 'Card' });
    const result = serializeNode(node);
    expect(result.type).toBe('FRAME');
    expect(result.name).toBe('Card');
    expect(result.size).toEqual({ x: 100, y: 50 });
    expect(result.opacity).toBe(1);
    expect(result.visible).toBe(true);
    expect(result.children).toEqual([]);
  });

  it('serializes TEXT node with typography', () => {
    const node = mockNode({
      type: 'TEXT',
      name: 'Title',
      characters: 'Hello World',
      fontSize: 24,
      fontName: { family: 'Inter', style: 'Bold' },
      fontWeight: 700,
      textAlignHorizontal: 'CENTER',
      textAutoResize: 'HEIGHT',
    });

    const result = serializeNode(node);
    expect(result.characters).toBe('Hello World');
    expect(result.fontSize).toBe(24);
    expect(result.fontFamily).toBe('Inter');
    expect(result.fontStyle).toBe('Bold');
    expect(result.fontWeight).toBe(700);
    expect(result.textAlignHorizontal).toBe('CENTER');
    expect(result.textAutoResize).toBe('HEIGHT');
  });

  it('serializes auto-layout properties', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'Row',
      layoutMode: 'HORIZONTAL',
      itemSpacing: 16,
      paddingTop: 8,
      paddingRight: 16,
      paddingBottom: 8,
      paddingLeft: 16,
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'MIN',
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'HUG',
    });

    const result = serializeNode(node);
    expect(result.stackMode).toBe('HORIZONTAL');
    expect(result.itemSpacing).toBe(16);
    expect(result.paddingTop).toBe(8);
    expect(result.layoutSizingHorizontal).toBe('FILL');
    expect(result.layoutSizingVertical).toBe('HUG');
  });

  it('serializes corner radius', () => {
    const node = mockNode({ type: 'RECTANGLE', name: 'Box', cornerRadius: 12 });
    const result = serializeNode(node);
    expect(result.cornerRadius).toBe(12);
  });

  it('skips corner radius when 0', () => {
    const node = mockNode({ type: 'RECTANGLE', name: 'Box', cornerRadius: 0 });
    const result = serializeNode(node);
    expect(result.cornerRadius).toBeUndefined();
  });

  it('serializes clip content', () => {
    const node = mockNode({ type: 'FRAME', name: 'Clipped', clipsContent: true });
    const result = serializeNode(node);
    expect(result.clipContent).toBe(true);
  });

  it('serializes INSTANCE with mainComponent reference', () => {
    const node = mockNode({
      type: 'INSTANCE',
      name: 'ButtonInstance',
      mainComponent: { name: 'Button' },
    });

    const result = serializeNode(node);
    expect(result.componentId).toBe('Button');
  });

  it('recursively serializes children', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'Parent',
      children: [
        mockNode({ type: 'TEXT', name: 'Child1', characters: 'Hello' }),
        mockNode({ type: 'RECTANGLE', name: 'Child2' }),
      ],
    });

    const result = serializeNode(node);
    expect(result.children).toHaveLength(2);
    expect(result.children[0]!.name).toBe('Child1');
    expect(result.children[1]!.name).toBe('Child2');
  });
});

// =================================================================
// serializeFills
// =================================================================

describe('serializeFills', () => {
  it('returns undefined for nodes without fills', () => {
    const node = mockNode({ type: 'GROUP', name: 'G' });
    // node has no fills property
    expect(serializeFills(node)).toBeUndefined();
  });

  it('returns undefined for empty fills', () => {
    const node = mockNode({ type: 'FRAME', name: 'F', fills: [] });
    expect(serializeFills(node)).toBeUndefined();
  });

  it('serializes SOLID fills', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      fills: [solidFill(1, 0, 0, 0.8)],
    });

    const result = serializeFills(node);
    expect(result).toHaveLength(1);
    expect(result![0]).toEqual({
      type: 'SOLID',
      color: { r: 1, g: 0, b: 0, a: 0.8 },
      opacity: 1,
    });
  });

  it('filters out invisible fills', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      fills: [
        { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 1, visible: false },
        solidFill(0, 1, 0),
      ],
    });

    const result = serializeFills(node);
    expect(result).toHaveLength(1);
    expect(result![0]!.color!.g).toBe(1);
  });

  it('serializes GRADIENT_LINEAR fills', () => {
    const gradientTransform: [[number, number, number], [number, number, number]] = [[1, 0, 0], [0, 1, 0]];
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      fills: [{
        type: 'GRADIENT_LINEAR',
        opacity: 0.9,
        visible: true,
        gradientStops: [
          { color: { r: 1, g: 0, b: 0, a: 1 }, position: 0 },
          { color: { r: 0, g: 0, b: 1, a: 1 }, position: 1 },
        ],
        gradientTransform,
      }],
    });

    const result = serializeFills(node);
    expect(result).toHaveLength(1);
    expect(result![0]!.type).toBe('GRADIENT_LINEAR');
    expect(result![0]!.opacity).toBe(0.9);
  });
});

// =================================================================
// serializeStrokes
// =================================================================

describe('serializeStrokes', () => {
  it('returns undefined for nodes without strokes', () => {
    const node = mockNode({ type: 'GROUP', name: 'G' });
    expect(serializeStrokes(node)).toBeUndefined();
  });

  it('returns undefined for empty strokes', () => {
    const node = mockNode({ type: 'FRAME', name: 'F', strokes: [] });
    expect(serializeStrokes(node)).toBeUndefined();
  });

  it('serializes solid strokes with weight', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, visible: true }],
      strokeWeight: 2,
    });

    const result = serializeStrokes(node);
    expect(result).toHaveLength(1);
    expect(result![0]).toEqual({
      color: { r: 0, g: 0, b: 0, a: 1 },
      weight: 2,
    });
  });

  it('defaults stroke weight to 1', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      strokes: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 0.5, visible: true }],
    });

    const result = serializeStrokes(node);
    expect(result![0]!.weight).toBe(1);
  });

  it('filters non-SOLID strokes', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'F',
      strokes: [
        { type: 'GRADIENT_LINEAR', visible: true },
        { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 1, visible: true },
      ],
      strokeWeight: 1,
    });

    const result = serializeStrokes(node);
    expect(result).toHaveLength(1);
    expect(result![0]!.color.r).toBe(1);
  });
});

// =================================================================
// collectSharedPropDefs
// =================================================================

describe('collectSharedPropDefs', () => {
  it('returns props from first COMPONENT child', () => {
    const children: Array<{ type: string; componentPropertyDefinitions?: Record<string, SharedPropDef> }> = [
      {
        type: 'COMPONENT',
        componentPropertyDefinitions: {
          Label: { type: 'TEXT', defaultValue: 'Hello' },
          Active: { type: 'BOOLEAN', defaultValue: false },
        },
      },
      {
        type: 'COMPONENT',
        componentPropertyDefinitions: {
          Label: { type: 'TEXT', defaultValue: 'World' },
        },
      },
    ];

    const result = collectSharedPropDefs(children);
    expect(result).toEqual({
      Label: { type: 'TEXT', defaultValue: 'Hello' },
      Active: { type: 'BOOLEAN', defaultValue: false },
    });
  });

  it('returns undefined when no children have componentPropertyDefinitions', () => {
    const children = [
      { type: 'COMPONENT' },
      { type: 'COMPONENT' },
    ];

    expect(collectSharedPropDefs(children)).toBeUndefined();
  });

  it('returns undefined for empty children', () => {
    expect(collectSharedPropDefs([])).toBeUndefined();
  });

  it('skips non-COMPONENT children', () => {
    const children: Array<{ type: string; componentPropertyDefinitions?: Record<string, SharedPropDef> }> = [
      {
        type: 'FRAME',
        componentPropertyDefinitions: {
          X: { type: 'TEXT', defaultValue: 'ignored' },
        },
      },
      {
        type: 'COMPONENT',
        componentPropertyDefinitions: {
          Label: { type: 'TEXT', defaultValue: 'picked' },
        },
      },
    ];

    const result = collectSharedPropDefs(children);
    expect(result).toEqual({
      Label: { type: 'TEXT', defaultValue: 'picked' },
    });
  });
});

// =================================================================
// getRegistrableProperties
// =================================================================

describe('getRegistrableProperties', () => {
  it('filters out VARIANT properties', () => {
    const props: Record<string, SharedPropDef> = {
      Variant: { type: 'VARIANT', defaultValue: 'Default' },
      Size: { type: 'VARIANT', defaultValue: 'Medium' },
      Label: { type: 'TEXT', defaultValue: 'Click me' },
      Disabled: { type: 'BOOLEAN', defaultValue: false },
    };

    const result = getRegistrableProperties(props);
    expect(result).toHaveLength(2);
    expect(result.map(([name]) => name)).toEqual(['Label', 'Disabled']);
  });

  it('returns all properties when no VARIANT types exist', () => {
    const props: Record<string, SharedPropDef> = {
      Label: { type: 'TEXT', defaultValue: 'Click me' },
      Visible: { type: 'BOOLEAN', defaultValue: true },
    };

    const result = getRegistrableProperties(props);
    expect(result).toHaveLength(2);
  });

  it('returns empty array when all properties are VARIANT', () => {
    const props: Record<string, SharedPropDef> = {
      Style: { type: 'VARIANT', defaultValue: 'Primary' },
      Size: { type: 'VARIANT', defaultValue: 'Medium' },
    };

    const result = getRegistrableProperties(props);
    expect(result).toHaveLength(0);
  });

  it('returns empty array for empty input', () => {
    expect(getRegistrableProperties({})).toHaveLength(0);
  });

  it('preserves INSTANCE_SWAP properties', () => {
    const props: Record<string, SharedPropDef> = {
      Icon: { type: 'INSTANCE_SWAP', defaultValue: 'StarIcon' },
      Variant: { type: 'VARIANT', defaultValue: 'Default' },
    };

    const result = getRegistrableProperties(props);
    expect(result).toHaveLength(1);
    expect(result[0]![0]).toBe('Icon');
    expect(result[0]![1]!.type).toBe('INSTANCE_SWAP');
  });
});

// =================================================================
// serializeNode — new node types (LINE, SECTION, POLYGON, STAR, BOOLEAN_OPERATION)
// =================================================================

describe('serializeNode — LINE', () => {
  it('serializes LINE with strokeCap and rotation', () => {
    const node = mockNode({
      type: 'LINE',
      name: 'Divider',
      width: 200,
      height: 0,
      strokeCap: 'ROUND',
      rotation: 45,
      strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, visible: true }],
      strokeWeight: 2,
    });

    const result = serializeNode(node);
    expect(result.type).toBe('LINE');
    expect(result.strokeCap).toBe('ROUND');
    expect(result.rotation).toBe(45);
  });

  it('serializes LINE without optional properties', () => {
    const node = mockNode({
      type: 'LINE',
      name: 'SimpleLine',
      width: 100,
      height: 0,
    });

    const result = serializeNode(node);
    expect(result.type).toBe('LINE');
    expect((result as any).strokeCap).toBeUndefined();
    expect((result as any).rotation).toBeUndefined();
  });
});

describe('serializeNode — SECTION', () => {
  it('serializes SECTION with sectionContentsHidden', () => {
    const node = mockNode({
      type: 'SECTION',
      name: 'MySection',
      width: 400,
      height: 300,
      sectionContentsHidden: true,
      children: [mockNode({ type: 'FRAME', name: 'Child' })],
    });

    const result = serializeNode(node);
    expect(result.type).toBe('SECTION');
    expect((result as any).sectionContentsHidden).toBe(true);
    expect(result.children).toHaveLength(1);
  });

  it('serializes SECTION with sectionContentsHidden=false', () => {
    const node = mockNode({
      type: 'SECTION',
      name: 'VisibleSection',
      sectionContentsHidden: false,
    });

    const result = serializeNode(node);
    expect(result.type).toBe('SECTION');
    expect((result as any).sectionContentsHidden).toBe(false);
  });
});

describe('serializeNode — POLYGON', () => {
  it('serializes POLYGON with pointCount', () => {
    const node = mockNode({
      type: 'POLYGON',
      name: 'Hexagon',
      width: 100,
      height: 100,
      pointCount: 6,
      fills: [solidFill(1, 0, 0)],
    });

    const result = serializeNode(node);
    expect(result.type).toBe('POLYGON');
    expect((result as any).pointCount).toBe(6);
  });

  it('serializes POLYGON with rotation', () => {
    const node = mockNode({
      type: 'POLYGON',
      name: 'RotatedTriangle',
      pointCount: 3,
      rotation: 60,
    });

    const result = serializeNode(node);
    expect((result as any).pointCount).toBe(3);
    expect((result as any).rotation).toBe(60);
  });
});

describe('serializeNode — STAR', () => {
  it('serializes STAR with pointCount and innerRadius', () => {
    const node = mockNode({
      type: 'STAR',
      name: 'FiveStar',
      width: 100,
      height: 100,
      pointCount: 5,
      innerRadius: 0.5,
    });

    const result = serializeNode(node);
    expect(result.type).toBe('STAR');
    expect((result as any).pointCount).toBe(5);
    expect((result as any).innerRadius).toBe(0.5);
  });

  it('serializes STAR without innerRadius', () => {
    const node = mockNode({
      type: 'STAR',
      name: 'DefaultStar',
      pointCount: 4,
    });

    const result = serializeNode(node);
    expect((result as any).pointCount).toBe(4);
    expect((result as any).innerRadius).toBeUndefined();
  });
});

describe('serializeNode — BOOLEAN_OPERATION', () => {
  it('serializes BOOLEAN_OPERATION with operation type and children', () => {
    const node = mockNode({
      type: 'BOOLEAN_OPERATION',
      name: 'Cutout',
      booleanOperation: 'SUBTRACT',
      children: [
        mockNode({ type: 'RECTANGLE', name: 'Base' }),
        mockNode({ type: 'ELLIPSE', name: 'Hole' }),
      ],
    });

    const result = serializeNode(node);
    expect(result.type).toBe('BOOLEAN_OPERATION');
    expect((result as any).booleanOperation).toBe('SUBTRACT');
    expect(result.children).toHaveLength(2);
  });

  it('serializes BOOLEAN_OPERATION UNION', () => {
    const node = mockNode({
      type: 'BOOLEAN_OPERATION',
      name: 'Combined',
      booleanOperation: 'UNION',
      children: [
        mockNode({ type: 'RECTANGLE', name: 'A' }),
        mockNode({ type: 'RECTANGLE', name: 'B' }),
      ],
    });

    const result = serializeNode(node);
    expect((result as any).booleanOperation).toBe('UNION');
  });

  it('serializes BOOLEAN_OPERATION INTERSECT', () => {
    const node = mockNode({
      type: 'BOOLEAN_OPERATION',
      name: 'Overlap',
      booleanOperation: 'INTERSECT',
    });

    const result = serializeNode(node);
    expect((result as any).booleanOperation).toBe('INTERSECT');
  });

  it('serializes BOOLEAN_OPERATION EXCLUDE', () => {
    const node = mockNode({
      type: 'BOOLEAN_OPERATION',
      name: 'Xor',
      booleanOperation: 'EXCLUDE',
    });

    const result = serializeNode(node);
    expect((result as any).booleanOperation).toBe('EXCLUDE');
  });
});

// =================================================================
// serializeNode — canvas metadata from plugin data
// =================================================================

describe('serializeNode — canvas metadata', () => {
  it('serializes isCanvas and canvasName from plugin data', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'HeroBanner',
      getPluginData: (key: string) => {
        if (key === 'dsl-canvas') return JSON.stringify({ isCanvas: true, canvasName: 'HeroBanner' });
        return '';
      },
    });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBe(true);
    expect((result as any).canvasName).toBe('HeroBanner');
  });

  it('serializes isCanvas without canvasName when canvasName is absent', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'Canvas',
      getPluginData: (key: string) => {
        if (key === 'dsl-canvas') return JSON.stringify({ isCanvas: true });
        return '';
      },
    });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBe(true);
    expect((result as any).canvasName).toBeUndefined();
  });

  it('does not set canvas fields when plugin data is empty', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'RegularFrame',
      getPluginData: () => '',
    });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBeUndefined();
    expect((result as any).canvasName).toBeUndefined();
  });

  it('does not set canvas fields when no getPluginData method', () => {
    const node = mockNode({ type: 'FRAME', name: 'NormalFrame' });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBeUndefined();
    expect((result as any).canvasName).toBeUndefined();
  });

  it('handles malformed plugin data gracefully', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'BadData',
      getPluginData: (key: string) => {
        if (key === 'dsl-canvas') return 'not valid json';
        return '';
      },
    });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBeUndefined();
    expect((result as any).canvasName).toBeUndefined();
  });

  it('does not set isCanvas when plugin data has isCanvas: false', () => {
    const node = mockNode({
      type: 'FRAME',
      name: 'NonCanvas',
      getPluginData: (key: string) => {
        if (key === 'dsl-canvas') return JSON.stringify({ isCanvas: false });
        return '';
      },
    });

    const result = serializeNode(node);
    expect((result as any).isCanvas).toBeUndefined();
  });

  it('preserves canvas metadata through recursive child serialization', () => {
    const child = mockNode({
      type: 'FRAME',
      name: 'CanvasChild',
      getPluginData: (key: string) => {
        if (key === 'dsl-canvas') return JSON.stringify({ isCanvas: true, canvasName: 'NestedCanvas' });
        return '';
      },
    });

    const parent = mockNode({
      type: 'FRAME',
      name: 'Parent',
      children: [child],
    });

    const result = serializeNode(parent);
    expect(result.children).toHaveLength(1);
    expect((result.children[0] as any).isCanvas).toBe(true);
    expect((result.children[0] as any).canvasName).toBe('NestedCanvas');
  });
});

// =================================================================
// calculateGridColumns
// =================================================================

describe('calculateGridColumns', () => {
  it('returns 1 for a single variant', () => {
    expect(calculateGridColumns(1)).toBe(1);
  });

  it('returns 2 for 2 variants', () => {
    expect(calculateGridColumns(2)).toBe(2);
  });

  it('returns 2 for 3 variants', () => {
    expect(calculateGridColumns(3)).toBe(2);
  });

  it('returns 2 for 4 variants (perfect square)', () => {
    expect(calculateGridColumns(4)).toBe(2);
  });

  it('returns 3 for 5 variants', () => {
    expect(calculateGridColumns(5)).toBe(3);
  });

  it('returns 3 for 6 variants (PizzaCard case)', () => {
    expect(calculateGridColumns(6)).toBe(3);
  });

  it('returns 3 for 9 variants (perfect square)', () => {
    expect(calculateGridColumns(9)).toBe(3);
  });

  it('returns 4 for 10 variants', () => {
    expect(calculateGridColumns(10)).toBe(4);
  });

  it('returns 1 for 0 variants (edge case)', () => {
    expect(calculateGridColumns(0)).toBe(1);
  });

  it('returns 1 for negative count (edge case)', () => {
    expect(calculateGridColumns(-1)).toBe(1);
  });
});

// =================================================================
// calculateComponentSetWidth
// =================================================================

describe('calculateComponentSetWidth', () => {
  it('calculates width for PizzaCard (6 variants: 260, 320, 400 × 2)', () => {
    // 6 variants → 3 columns
    // Top 3 widths: 400, 400, 320
    // Width = 400 + 400 + 320 + 20*2 + 40*2 = 1240
    const widths = [260, 320, 400, 260, 320, 400];
    expect(calculateComponentSetWidth(widths)).toBe(1240);
  });

  it('calculates width for 2 equal-width variants', () => {
    // 2 variants → 2 columns
    // Width = 200 + 200 + 20*1 + 40*2 = 500
    const widths = [200, 200];
    expect(calculateComponentSetWidth(widths)).toBe(500);
  });

  it('calculates width for 1 variant', () => {
    // 1 variant → 1 column
    // Width = 300 + 20*0 + 40*2 = 380
    expect(calculateComponentSetWidth([300])).toBe(380);
  });

  it('returns only padding for empty variants', () => {
    expect(calculateComponentSetWidth([])).toBe(COMPONENT_SET_PAD * 2);
  });

  it('uses custom gap and padding', () => {
    // 4 variants → 2 columns, widths [100, 200, 150, 180]
    // Top 2: 200, 180
    // Width = 200 + 180 + 10*1 + 20*2 = 430
    expect(calculateComponentSetWidth([100, 200, 150, 180], 10, 20)).toBe(430);
  });

  it('handles 4 identical-width variants', () => {
    // 4 → 2 columns
    // Width = 300 + 300 + 20*1 + 40*2 = 700
    expect(calculateComponentSetWidth([300, 300, 300, 300])).toBe(700);
  });

  it('handles 9 variants (3×3 grid)', () => {
    // 9 → 3 columns
    // Top 3 widths: 400, 350, 300
    // Width = 400 + 350 + 300 + 20*2 + 40*2 = 1170
    const widths = [100, 200, 300, 150, 250, 350, 120, 220, 400];
    expect(calculateComponentSetWidth(widths)).toBe(1170);
  });
});
