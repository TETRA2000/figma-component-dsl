import { describe, it, expect } from 'vitest';
import { generateDSL } from './codegen-dsl.js';
import type { CodegenContext } from './codegen-types.js';
import type { PluginNodeDef } from '@figma-dsl/core';

function makeContext(node: PluginNodeDef, overrides?: Partial<CodegenContext>): CodegenContext {
  return {
    node,
    identity: null,
    baseline: null,
    sources: null,
    preferences: { unit: 'px', scaleFactor: 16, naming: 'camelCase' },
    truncated: false,
    canvasRegions: [],
    canvasImages: null,
    ...overrides,
  };
}

describe('generateDSL', () => {
  it('generates DSL for a frame node', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Card',
      size: { x: 300, y: 200 },
      opacity: 1,
      visible: true,
      children: [],
    };
    const ctx = makeContext(node);
    const results = generateDSL(ctx);
    expect(results).toHaveLength(1);
    const code = results[0]!.code;
    expect(code).toContain("import { frame } from '@figma-dsl/core'");
    expect(code).toContain("frame('Card'");
    expect(code).toContain('size: { x: 300, y: 200 }');
  });

  it('generates DSL for a text node', () => {
    const node: PluginNodeDef = {
      type: 'TEXT',
      name: 'Label',
      size: { x: 100, y: 20 },
      opacity: 1,
      visible: true,
      children: [],
      characters: 'Hello',
      fontSize: 16,
    };
    const ctx = makeContext(node);
    const results = generateDSL(ctx);
    const code = results[0]!.code;
    expect(code).toContain("import { text } from '@figma-dsl/core'");
    expect(code).toContain("text('Hello'");
    expect(code).toContain('fontSize: 16');
  });

  it('generates DSL for a rectangle with fills', () => {
    const node: PluginNodeDef = {
      type: 'RECTANGLE',
      name: 'Box',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
      fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 }],
      cornerRadius: 8,
    };
    const ctx = makeContext(node);
    const results = generateDSL(ctx);
    const code = results[0]!.code;
    expect(code).toContain("rectangle('Box'");
    expect(code).toContain("solid('#ff0000')");
    expect(code).toContain('cornerRadius: 8');
  });

  it('generates only used imports', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Container',
      size: { x: 400, y: 300 },
      opacity: 1,
      visible: true,
      children: [
        {
          type: 'TEXT',
          name: 'Title',
          size: { x: 200, y: 30 },
          opacity: 1,
          visible: true,
          children: [],
          characters: 'Title',
        },
      ],
    };
    const ctx = makeContext(node);
    const results = generateDSL(ctx);
    const code = results[0]!.code;
    expect(code).toContain('import { frame, text }');
    expect(code).not.toContain('rectangle');
  });

  it('uses baseline data when available', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Current',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
    };
    const baseline: PluginNodeDef = {
      type: 'FRAME',
      name: 'Original',
      size: { x: 200, y: 200 },
      opacity: 1,
      visible: true,
      children: [],
    };
    const ctx = makeContext(node, { baseline });
    const results = generateDSL(ctx);
    const code = results[0]!.code;
    expect(code).toContain("frame('Original'");
    expect(code).toContain('size: { x: 200, y: 200 }');
  });

  it('generates layout helpers for auto-layout', () => {
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
      paddingRight: 8,
      paddingBottom: 8,
      paddingLeft: 8,
    };
    const ctx = makeContext(node);
    const results = generateDSL(ctx);
    const code = results[0]!.code;
    expect(code).toContain('horizontal');
    expect(code).toContain('spacing: 16');
    expect(code).toContain('padding: 8');
  });

  it('adds truncation comment when truncated', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Big',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
    };
    const ctx = makeContext(node, { truncated: true });
    const results = generateDSL(ctx);
    expect(results[0]!.code).toContain('truncated');
  });
});
