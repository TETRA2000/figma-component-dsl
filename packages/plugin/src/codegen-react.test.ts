import { describe, it, expect } from 'vitest';
import { generateReact } from './codegen-react.js';
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
    ...overrides,
  };
}

const minimalNode: PluginNodeDef = {
  type: 'FRAME',
  name: 'Card',
  size: { x: 300, y: 200 },
  opacity: 1,
  visible: true,
  children: [],
};

describe('generateReact', () => {
  it('generates component with PascalCase name from node name', () => {
    const ctx = makeContext(minimalNode);
    const results = generateReact(ctx);
    expect(results.length).toBeGreaterThanOrEqual(2);
    const body = results.find(r => r.title === 'Card');
    expect(body).toBeDefined();
    expect(body!.code).toContain('export function Card');
  });

  it('uses identity component name when available', () => {
    const ctx = makeContext(minimalNode, {
      identity: {
        componentName: 'MyCard',
        dslSourcePath: 'examples/card.dsl.ts',
        importTimestamp: '2026-01-01T00:00:00Z',
        originalNodeId: '1:1',
      },
    });
    const results = generateReact(ctx);
    const body = results.find(r => r.title === 'MyCard');
    expect(body).toBeDefined();
    expect(body!.code).toContain('export function MyCard');
  });

  it('generates imports section', () => {
    const ctx = makeContext(minimalNode);
    const results = generateReact(ctx);
    const imports = results.find(r => r.title === 'Imports');
    expect(imports).toBeDefined();
    expect(imports!.code).toContain("import styles from './Card.module.css'");
  });

  it('generates multi-section output', () => {
    const ctx = makeContext(minimalNode);
    const results = generateReact(ctx);
    expect(results.length).toBeGreaterThanOrEqual(2); // imports + body
  });

  it('maps text nodes to spans', () => {
    const textNode: PluginNodeDef = {
      type: 'TEXT',
      name: 'Label',
      size: { x: 100, y: 20 },
      opacity: 1,
      visible: true,
      children: [],
      characters: 'Hello',
    };
    const ctx = makeContext({
      ...minimalNode,
      children: [textNode],
    });
    const results = generateReact(ctx);
    const body = results.find(r => r.title === 'Card');
    expect(body!.code).toContain('<span>Hello</span>');
  });

  it('generates variant props for component sets', () => {
    const csNode: PluginNodeDef = {
      type: 'COMPONENT_SET',
      name: 'Button',
      size: { x: 200, y: 40 },
      opacity: 1,
      visible: true,
      children: [],
      componentPropertyDefinitions: {
        size: { type: 'VARIANT', defaultValue: 'medium' },
        variant: { type: 'VARIANT', defaultValue: 'primary' },
      },
    };
    const ctx = makeContext(csNode);
    const results = generateReact(ctx);
    const props = results.find(r => r.title === 'Props');
    expect(props).toBeDefined();
    expect(props!.code).toContain('interface ButtonProps');
    expect(props!.code).toContain("size?: 'medium'");
  });

  it('adds truncation comment when truncated', () => {
    const ctx = makeContext(minimalNode, { truncated: true });
    const results = generateReact(ctx);
    const body = results.find(r => r.title === 'Card');
    expect(body!.code).toContain('truncated');
  });
});
