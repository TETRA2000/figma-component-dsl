import { describe, it, expect } from 'vitest';
import { exportToPluginInput, exportToPluginJson } from '../exporter.js';
import type { CompileResult, FigmaNodeDict, Transform } from '../../../../compiler/src/types.js';

const IDENTITY: Transform = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
] as const;

function makeNode(overrides: Partial<FigmaNodeDict> & { type: string; name: string }): FigmaNodeDict {
  return {
    guid: [0, 0],
    type: overrides.type,
    name: overrides.name,
    size: { x: 100, y: 50 },
    transform: IDENTITY,
    fillPaints: [],
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  };
}

function makeResult(root: FigmaNodeDict): CompileResult {
  return { root, nodeCount: 1, errors: [] };
}

// ---- Tests ----

describe('exportToPluginInput', () => {
  describe('simple frame export', () => {
    it('wraps a plain frame as a single component entry', () => {
      const frame = makeNode({ type: 'FRAME', name: 'SimpleFrame' });
      const result = exportToPluginInput(makeResult(frame));

      expect(result.schemaVersion).toBe('1.0');
      expect(result.targetPage).toBe('Component Library');
      expect(result.components).toHaveLength(1);
      expect(result.components[0]!.name).toBe('SimpleFrame');
      expect(result.components[0]!.node).toBe(frame);
      expect(result.components[0]!.properties).toBeUndefined();
      expect(result.components[0]!.variants).toBeUndefined();
      expect(result.components[0]!.instances).toBeUndefined();
    });

    it('preserves auto-layout properties on nodes', () => {
      const frame = makeNode({
        type: 'FRAME',
        name: 'AutoLayoutFrame',
        stackMode: 'VERTICAL',
        itemSpacing: 8,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'MIN',
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG',
      });
      const result = exportToPluginInput(makeResult(frame));

      const node = result.components[0]!.node;
      expect(node.stackMode).toBe('VERTICAL');
      expect(node.itemSpacing).toBe(8);
      expect(node.paddingTop).toBe(16);
      expect(node.paddingRight).toBe(16);
      expect(node.paddingBottom).toBe(16);
      expect(node.paddingLeft).toBe(16);
      expect(node.primaryAxisAlignItems).toBe('CENTER');
      expect(node.counterAxisAlignItems).toBe('MIN');
      expect(node.layoutSizingHorizontal).toBe('FILL');
      expect(node.layoutSizingVertical).toBe('HUG');
    });

    it('respects custom targetPage option', () => {
      const frame = makeNode({ type: 'FRAME', name: 'F' });
      const result = exportToPluginInput(makeResult(frame), { targetPage: 'My Page' });
      expect(result.targetPage).toBe('My Page');
    });
  });

  describe('component with properties export', () => {
    it('extracts componentPropertyDefinitions into properties field', () => {
      const comp = makeNode({
        type: 'COMPONENT',
        name: 'Button',
        guid: [0, 0],
        componentPropertyDefinitions: {
          label: { type: 'TEXT', defaultValue: 'Click me' },
          disabled: { type: 'BOOLEAN', defaultValue: false },
        },
      });
      const result = exportToPluginInput(makeResult(comp));

      expect(result.components).toHaveLength(1);
      const entry = result.components[0]!;
      expect(entry.name).toBe('Button');
      expect(entry.properties).toEqual({
        label: { type: 'TEXT', defaultValue: 'Click me' },
        disabled: { type: 'BOOLEAN', defaultValue: false },
      });
      expect(entry.variants).toBeUndefined();
    });

    it('omits properties when componentPropertyDefinitions is empty', () => {
      const comp = makeNode({
        type: 'COMPONENT',
        name: 'Icon',
        componentPropertyDefinitions: {},
      });
      const result = exportToPluginInput(makeResult(comp));
      expect(result.components[0]!.properties).toBeUndefined();
    });

    it('omits properties when componentPropertyDefinitions is not set', () => {
      const comp = makeNode({ type: 'COMPONENT', name: 'Divider' });
      const result = exportToPluginInput(makeResult(comp));
      expect(result.components[0]!.properties).toBeUndefined();
    });
  });

  describe('component set with variants export', () => {
    it('generates variant definitions with Key=Value naming', () => {
      const variant1 = makeNode({
        type: 'COMPONENT',
        name: 'Size=Small, State=Default',
        guid: [0, 1],
      });
      const variant2 = makeNode({
        type: 'COMPONENT',
        name: 'Size=Large, State=Default',
        guid: [0, 2],
      });
      const variant3 = makeNode({
        type: 'COMPONENT',
        name: 'Size=Small, State=Hover',
        guid: [0, 3],
      });

      const compSet = makeNode({
        type: 'COMPONENT_SET',
        name: 'Button',
        guid: [0, 0],
        children: [variant1, variant2, variant3],
      });

      const result = exportToPluginInput(makeResult(compSet));

      expect(result.components).toHaveLength(1);
      const entry = result.components[0]!;
      expect(entry.name).toBe('Button');
      expect(entry.variants).toBeDefined();
      expect(entry.variants!.axes['Size']).toEqual(['Small', 'Large']);
      expect(entry.variants!.axes['State']).toEqual(['Default', 'Hover']);
      expect(entry.variants!.children).toHaveLength(3);
      expect(entry.variants!.children[0]!.name).toBe('Size=Small, State=Default');
      expect(entry.variants!.children[1]!.name).toBe('Size=Large, State=Default');
      expect(entry.variants!.children[2]!.name).toBe('Size=Small, State=Hover');
    });

    it('handles component set nested inside a frame', () => {
      const variant1 = makeNode({
        type: 'COMPONENT',
        name: 'Type=Primary',
        guid: [0, 2],
      });
      const variant2 = makeNode({
        type: 'COMPONENT',
        name: 'Type=Secondary',
        guid: [0, 3],
      });
      const compSet = makeNode({
        type: 'COMPONENT_SET',
        name: 'Badge',
        guid: [0, 1],
        children: [variant1, variant2],
      });
      const root = makeNode({
        type: 'FRAME',
        name: 'Root',
        guid: [0, 0],
        children: [compSet],
      });

      const result = exportToPluginInput(makeResult(root));

      expect(result.components).toHaveLength(1);
      expect(result.components[0]!.name).toBe('Badge');
      expect(result.components[0]!.variants!.axes['Type']).toEqual(['Primary', 'Secondary']);
      expect(result.components[0]!.variants!.children).toHaveLength(2);
    });
  });

  describe('instance reference export', () => {
    it('includes instance with componentRef and overrides', () => {
      const instance = makeNode({
        type: 'INSTANCE',
        name: 'ButtonInstance',
        guid: [0, 1],
        componentId: 'btn-component-id',
        overriddenProperties: {
          label: 'Submit',
          disabled: true,
        },
      });
      const root = makeNode({
        type: 'FRAME',
        name: 'Root',
        guid: [0, 0],
        children: [instance],
      });

      const result = exportToPluginInput(makeResult(root));

      expect(result.components).toHaveLength(1);
      const entry = result.components[0]!;
      expect(entry.name).toBe('ButtonInstance');
      expect(entry.instances).toBeDefined();
      expect(entry.instances).toHaveLength(1);
      expect(entry.instances![0]!.componentRef).toBe('btn-component-id');
      expect(entry.instances![0]!.overrides).toEqual({
        label: 'Submit',
        disabled: true,
      });
    });

    it('omits overrides when none are present', () => {
      const instance = makeNode({
        type: 'INSTANCE',
        name: 'PlainInstance',
        guid: [0, 1],
        componentId: 'some-id',
      });
      const root = makeNode({
        type: 'FRAME',
        name: 'Root',
        guid: [0, 0],
        children: [instance],
      });

      const result = exportToPluginInput(makeResult(root));

      const entry = result.components[0]!;
      expect(entry.instances![0]!.overrides).toBeUndefined();
    });

    it('handles mixed components and instances in a frame', () => {
      const comp = makeNode({
        type: 'COMPONENT',
        name: 'MyComp',
        guid: [0, 1],
        componentPropertyDefinitions: {
          text: { type: 'TEXT', defaultValue: 'Hello' },
        },
      });
      const instance = makeNode({
        type: 'INSTANCE',
        name: 'MyCompInstance',
        guid: [0, 2],
        componentId: 'my-comp-ref',
        overriddenProperties: { text: 'World' },
      });
      const root = makeNode({
        type: 'FRAME',
        name: 'Page',
        guid: [0, 0],
        children: [comp, instance],
      });

      const result = exportToPluginInput(makeResult(root));

      expect(result.components).toHaveLength(2);
      expect(result.components[0]!.name).toBe('MyComp');
      expect(result.components[0]!.properties).toEqual({
        text: { type: 'TEXT', defaultValue: 'Hello' },
      });
      expect(result.components[1]!.name).toBe('MyCompInstance');
      expect(result.components[1]!.instances![0]!.componentRef).toBe('my-comp-ref');
    });
  });
});

describe('exportToPluginJson', () => {
  it('returns valid JSON string matching PluginInput structure', () => {
    const frame = makeNode({ type: 'FRAME', name: 'TestFrame' });
    const json = exportToPluginJson(makeResult(frame));
    const parsed = JSON.parse(json) as Record<string, unknown>;

    expect(parsed['schemaVersion']).toBe('1.0');
    expect(parsed['targetPage']).toBe('Component Library');
    expect(Array.isArray(parsed['components'])).toBe(true);
  });
});
