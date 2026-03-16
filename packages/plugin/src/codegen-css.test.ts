import { describe, it, expect } from 'vitest';
import { generateCSS } from './codegen-css.js';
import type { CodegenContext, CodegenPreferences } from './codegen-types.js';
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

describe('generateCSS', () => {
  it('generates CSS for a frame with auto-layout', () => {
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
    const ctx = makeContext(node);
    const results = generateCSS(ctx);
    expect(results).toHaveLength(1);
    const css = results[0]!.code;
    expect(css).toContain('display: flex');
    expect(css).toContain('flex-direction: row');
    expect(css).toContain('gap:');
    expect(css).toContain('justify-content: center');
    expect(css).toContain('align-items: center');
  });

  it('maps fills to background-color with token lookup', () => {
    const node: PluginNodeDef = {
      type: 'RECTANGLE',
      name: 'Box',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
      fills: [{ type: 'SOLID', color: { r: 0.486, g: 0.227, b: 0.929, a: 1 }, opacity: 1 }],
    };
    const ctx = makeContext(node);
    const results = generateCSS(ctx);
    const css = results[0]!.code;
    // Should match the primary-600 token
    expect(css).toContain('var(--color-primary-600)');
  });

  it('generates text CSS properties', () => {
    const node: PluginNodeDef = {
      type: 'TEXT',
      name: 'Heading',
      size: { x: 200, y: 32 },
      opacity: 1,
      visible: true,
      children: [],
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: 700,
      textAlignHorizontal: 'CENTER',
    };
    const ctx = makeContext(node);
    const results = generateCSS(ctx);
    const css = results[0]!.code;
    expect(css).toContain('font-size: 24px');
    expect(css).toContain("font-family: 'Inter'");
    expect(css).toContain('font-weight: 700');
    expect(css).toContain('text-align: center');
  });

  it('uses rem units when preference is rem', () => {
    const node: PluginNodeDef = {
      type: 'TEXT',
      name: 'Body',
      size: { x: 200, y: 20 },
      opacity: 1,
      visible: true,
      children: [],
      fontSize: 16,
    };
    const ctx = makeContext(node, {
      preferences: { unit: 'rem', scaleFactor: 16, naming: 'camelCase' },
    });
    const results = generateCSS(ctx);
    const css = results[0]!.code;
    expect(css).toContain('font-size: 1rem');
  });

  it('uses kebab-case class names when preference is kebab-case', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'MyButton',
      size: { x: 100, y: 40 },
      opacity: 1,
      visible: true,
      children: [],
      cornerRadius: 6,
    };
    const ctx = makeContext(node, {
      preferences: { unit: 'px', scaleFactor: 16, naming: 'kebab-case' },
    });
    const results = generateCSS(ctx);
    const css = results[0]!.code;
    expect(css).toContain('.my-button');
  });

  it('uses token references for spacing and radius', () => {
    const node: PluginNodeDef = {
      type: 'FRAME',
      name: 'Card',
      size: { x: 300, y: 200 },
      opacity: 1,
      visible: true,
      children: [],
      stackMode: 'VERTICAL',
      itemSpacing: 16,
      paddingTop: 24,
      paddingRight: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      cornerRadius: 10,
    };
    const ctx = makeContext(node);
    const results = generateCSS(ctx);
    const css = results[0]!.code;
    expect(css).toContain('var(--space-4)'); // 16px spacing
    expect(css).toContain('var(--space-6)'); // 24px padding
    expect(css).toContain('var(--radius-md)'); // 10px radius
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
    const results = generateCSS(ctx);
    expect(results[0]!.code).toContain('truncated');
  });
});
