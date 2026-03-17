import { describe, it, expect } from 'vitest';
import type {
  PluginNodeDef,
  PluginInput,
  ComponentIdentity,
  EditLogEntry,
  SourceSnapshots,
} from './plugin-types.js';
import { PLUGIN_DATA_SOURCES } from './plugin-types.js';

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

describe('SourceSnapshots', () => {
  it('represents snapshots with all three source files', () => {
    const snapshots: SourceSnapshots = {
      react: 'export function Button() { return <button>Click</button>; }',
      css: '.button { color: red; }',
      dsl: 'export default component("Button", frame())',
      paths: {
        react: 'src/components/Button.tsx',
        css: 'src/components/Button.module.css',
        dsl: 'examples/button.dsl.ts',
      },
    };
    expect(snapshots.react).toContain('Button');
    expect(snapshots.css).toContain('.button');
    expect(snapshots.dsl).toContain('component');
    expect(snapshots.paths?.react).toBe('src/components/Button.tsx');
    expect(snapshots.paths?.css).toBe('src/components/Button.module.css');
    expect(snapshots.paths?.dsl).toBe('examples/button.dsl.ts');
  });

  it('allows partial snapshots (not all files present)', () => {
    const snapshots: SourceSnapshots = {
      react: 'export function Card() { return <div />; }',
    };
    expect(snapshots.react).toBeDefined();
    expect(snapshots.css).toBeUndefined();
    expect(snapshots.dsl).toBeUndefined();
    expect(snapshots.paths).toBeUndefined();
  });

  it('allows empty snapshots', () => {
    const snapshots: SourceSnapshots = {};
    expect(snapshots.react).toBeUndefined();
    expect(snapshots.css).toBeUndefined();
    expect(snapshots.dsl).toBeUndefined();
  });
});

describe('ComponentIdentity with sources', () => {
  it('supports optional sources field (backward-compatible)', () => {
    const identity: ComponentIdentity = {
      componentName: 'Button',
      dslSourcePath: 'examples/button.dsl.ts',
      importTimestamp: '2026-03-14T00:00:00.000Z',
      originalNodeId: '123:456',
    };
    expect(identity.sources).toBeUndefined();
  });

  it('includes source snapshots when provided', () => {
    const identity: ComponentIdentity = {
      componentName: 'Button',
      dslSourcePath: 'examples/button.dsl.ts',
      importTimestamp: '2026-03-14T00:00:00.000Z',
      originalNodeId: '123:456',
      sources: {
        react: 'export function Button() {}',
        css: '.button {}',
        dsl: 'export default component("Button", frame())',
      },
    };
    expect(identity.sources?.react).toContain('Button');
    expect(identity.sources?.css).toContain('.button');
  });
});

describe('PluginInput with componentSources', () => {
  it('supports optional componentSources field (backward-compatible)', () => {
    const input: PluginInput = {
      schemaVersion: '1.0.0',
      targetPage: 'Component Library',
      components: [],
    };
    expect(input.componentSources).toBeUndefined();
  });

  it('includes component sources map when provided', () => {
    const input: PluginInput = {
      schemaVersion: '1.0.0',
      targetPage: 'Component Library',
      components: [],
      componentSources: {
        Button: {
          react: 'export function Button() {}',
          css: '.button {}',
        },
        Card: {
          dsl: 'export default component("Card", frame())',
        },
      },
    };
    expect(input.componentSources?.Button?.react).toContain('Button');
    expect(input.componentSources?.Card?.dsl).toContain('Card');
  });

  it('serializes to JSON correctly (Record, not Map)', () => {
    const input: PluginInput = {
      schemaVersion: '1.0.0',
      targetPage: 'Test',
      components: [],
      componentSources: {
        Button: { react: 'code here' },
      },
    };
    const json = JSON.stringify(input);
    const parsed = JSON.parse(json);
    expect(parsed.componentSources.Button.react).toBe('code here');
  });
});

describe('PLUGIN_DATA_SOURCES', () => {
  it('exports the plugin data key constant', () => {
    expect(PLUGIN_DATA_SOURCES).toBe('dsl-sources');
  });
});
