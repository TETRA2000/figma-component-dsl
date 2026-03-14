import { describe, it, expect } from 'vitest';
import type {
  PluginNodeDef,
  PluginInput,
  ComponentIdentity,
  EditLogEntry,
} from './plugin-types.js';

describe('PluginNodeDef', () => {
  it('represents a minimal frame node', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Card',
      size: { x: 300, y: 200 },
      opacity: 1,
      visible: true,
      children: [],
    };
    expect(node.type).toBe('FRAME');
    expect(node.size.x).toBe(300);
    expect(node.children).toHaveLength(0);
  });

  it('represents a text node with typography', () => {
    const node: PluginNodeDef = {
      type: 'TEXT',
      name: 'Heading',
      size: { x: 200, y: 32 },
      opacity: 1,
      visible: true,
      children: [],
      characters: 'Hello World',
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: 700,
      fontStyle: 'Bold',
      textAlignHorizontal: 'LEFT',
    };
    expect(node.characters).toBe('Hello World');
    expect(node.fontSize).toBe(24);
  });

  it('represents a node with auto-layout', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Row',
      size: { x: 400, y: 50 },
      opacity: 1,
      visible: true,
      children: [],
      stackMode: 'HORIZONTAL',
      itemSpacing: 16,
      paddingTop: 8,
      paddingRight: 16,
      paddingBottom: 8,
      paddingLeft: 16,
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
    };
    expect(node.stackMode).toBe('HORIZONTAL');
    expect(node.itemSpacing).toBe(16);
  });

  it('represents a node with fills and strokes', () => {
    const node: PluginNodeDef = {
      type: 'RECTANGLE',
      name: 'Box',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
      fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 }],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
      cornerRadius: 8,
    };
    expect(node.fills).toHaveLength(1);
    expect(node.strokes).toHaveLength(1);
    expect(node.cornerRadius).toBe(8);
  });
});

describe('PluginInput', () => {
  it('represents a valid plugin input document', () => {
    const input: PluginInput = {
      schemaVersion: '1.0.0',
      targetPage: 'Component Library',
      components: [
        {
          type: 'COMPONENT',
          name: 'Button',
          size: { x: 120, y: 40 },
          opacity: 1,
          visible: true,
          children: [],
        },
      ],
    };
    expect(input.schemaVersion).toBe('1.0.0');
    expect(input.components).toHaveLength(1);
  });
});

describe('ComponentIdentity', () => {
  it('has all required fields', () => {
    const identity: ComponentIdentity = {
      componentName: 'Button',
      dslSourcePath: 'examples/button.dsl.ts',
      importTimestamp: '2026-03-14T00:00:00.000Z',
      originalNodeId: '123:456',
    };
    expect(identity.componentName).toBe('Button');
    expect(identity.dslSourcePath).toBe('examples/button.dsl.ts');
  });
});

describe('EditLogEntry', () => {
  it('represents a property change event', () => {
    const entry: EditLogEntry = {
      nodeId: '123:456',
      componentName: 'Button',
      timestamp: '2026-03-14T00:00:00.000Z',
      changeType: 'PROPERTY_CHANGE',
      properties: ['fills', 'cornerRadius'],
      origin: 'LOCAL',
    };
    expect(entry.changeType).toBe('PROPERTY_CHANGE');
    expect(entry.properties).toContain('fills');
    expect(entry.origin).toBe('LOCAL');
  });

  it('represents a structural create event', () => {
    const entry: EditLogEntry = {
      nodeId: '789:012',
      componentName: 'Card',
      timestamp: '2026-03-14T00:01:00.000Z',
      changeType: 'CREATE',
      properties: [],
      origin: 'LOCAL',
    };
    expect(entry.changeType).toBe('CREATE');
  });
});
