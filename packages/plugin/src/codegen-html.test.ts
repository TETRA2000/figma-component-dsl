import { describe, it, expect } from 'vitest';
import { generateHTML } from './codegen-html.js';
import type { CodegenContext, CanvasRegionInfo } from './codegen-types.js';
import type { CapturedCanvasImage } from './image-capture.js';
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

const autoLayoutNode: PluginNodeDef = {
  type: 'FRAME',
  name: 'Card',
  size: { x: 300, y: 200 },
  opacity: 1,
  visible: true,
  stackMode: 'VERTICAL',
  itemSpacing: 16,
  paddingTop: 24,
  paddingRight: 24,
  paddingBottom: 24,
  paddingLeft: 24,
  primaryAxisAlignItems: 'MIN',
  counterAxisAlignItems: 'CENTER',
  children: [
    {
      type: 'TEXT',
      name: 'Title',
      size: { x: 252, y: 24 },
      opacity: 1,
      visible: true,
      children: [],
      characters: 'Hello World',
      fontSize: 18,
      fontWeight: 700,
    },
  ],
};

describe('generateHTML', () => {
  it('returns a single CodegenResultEntry with language HTML', () => {
    const ctx = makeContext(autoLayoutNode);
    const results = generateHTML(ctx);
    expect(results).toHaveLength(1);
    expect(results[0]!.language).toBe('HTML');
    expect(results[0]!.title).toBe('HTML Preview');
  });

  it('generates a self-contained HTML snippet with style block', () => {
    const ctx = makeContext(autoLayoutNode);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('<style>');
    expect(result!.code).toContain('</style>');
    expect(result!.code).toContain('<div');
  });

  it('maps auto-layout to flexbox CSS', () => {
    const ctx = makeContext(autoLayoutNode);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('display: flex');
    expect(result!.code).toContain('flex-direction: column');
    // 16px maps to var(--space-4) token
    expect(result!.code).toContain('gap:');
  });

  it('includes dimensions and padding in CSS', () => {
    const ctx = makeContext(autoLayoutNode);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('width: 300px');
    expect(result!.code).toContain('height: 200px');
    // 24px maps to var(--space-6) token
    expect(result!.code).toContain('padding:');
  });

  it('renders text nodes as span elements', () => {
    const ctx = makeContext(autoLayoutNode);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('Hello World');
    expect(result!.code).toContain('<span');
  });

  it('embeds canvas images as base64 img tags', () => {
    const pngBytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47]);
    const canvasRegions: CanvasRegionInfo[] = [
      { canvasName: 'hero', nodeId: '1:1', width: 200, height: 100 },
    ];
    const canvasImages = new Map<string, CapturedCanvasImage>([
      ['hero', { pngBytes, scale: 1, width: 200, height: 100 }],
    ]);

    const node: PluginNodeDef = {
      ...autoLayoutNode,
      children: [
        {
          type: 'FRAME',
          name: 'hero',
          size: { x: 200, y: 100 },
          opacity: 1,
          visible: true,
          children: [],
        },
      ],
    };

    const ctx = makeContext(node, { canvasRegions, canvasImages });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('<img');
    expect(result!.code).toContain('data:image/png;base64,');
    expect(result!.code).toContain('width="200"');
    expect(result!.code).toContain('height="100"');
  });

  it('renders placeholder for failed canvas captures', () => {
    const canvasRegions: CanvasRegionInfo[] = [
      { canvasName: 'hero', nodeId: '1:1', width: 200, height: 100 },
    ];
    // Empty map = capture failed for 'hero'
    const canvasImages = new Map<string, CapturedCanvasImage>();

    const node: PluginNodeDef = {
      ...autoLayoutNode,
      children: [
        {
          type: 'FRAME',
          name: 'hero',
          size: { x: 200, y: 100 },
          opacity: 1,
          visible: true,
          children: [],
        },
      ],
    };

    const ctx = makeContext(node, { canvasRegions, canvasImages });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('canvas-placeholder');
    expect(result!.code).toContain('hero');
  });

  it('adds omission comment when more than 3 canvas regions', () => {
    const regions: CanvasRegionInfo[] = [
      { canvasName: 'c1', nodeId: '1:1', width: 100, height: 50 },
      { canvasName: 'c2', nodeId: '1:2', width: 100, height: 50 },
      { canvasName: 'c3', nodeId: '1:3', width: 100, height: 50 },
      { canvasName: 'c4', nodeId: '1:4', width: 100, height: 50 },
    ];
    const ctx = makeContext(autoLayoutNode, {
      canvasRegions: regions,
      canvasImages: new Map(),
    });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('<!-- additional canvas regions omitted');
  });

  it('applies rem unit preference', () => {
    const ctx = makeContext(autoLayoutNode, {
      preferences: { unit: 'rem', scaleFactor: 16, naming: 'camelCase' },
    });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('rem');
    // 300/16 = 18.75rem
    expect(result!.code).toContain('18.75rem');
  });

  it('applies kebab-case naming preference', () => {
    const node: PluginNodeDef = {
      ...autoLayoutNode,
      name: 'MyCard',
    };
    const ctx = makeContext(node, {
      preferences: { unit: 'px', scaleFactor: 16, naming: 'kebab-case' },
    });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('my-card');
  });

  it('adds truncation comment when context is truncated', () => {
    const ctx = makeContext(autoLayoutNode, { truncated: true });
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('<!-- ... truncated');
  });

  it('generates valid HTML for component without canvas regions', () => {
    const ctx = makeContext(autoLayoutNode);
    const [result] = generateHTML(ctx);
    // Should be valid structural HTML preview
    expect(result!.code).toContain('<div');
    expect(result!.code).toContain('</div>');
    expect(result!.code).not.toContain('<img');
    expect(result!.code).not.toContain('canvas-placeholder');
  });

  it('maps fills to background-color', () => {
    const nodeWithFill: PluginNodeDef = {
      type: 'FRAME',
      name: 'Box',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
      fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 }],
    };
    const ctx = makeContext(nodeWithFill);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('background-color:');
    expect(result!.code).toContain('#ff0000');
  });

  it('maps corner radius to border-radius', () => {
    const nodeWithRadius: PluginNodeDef = {
      type: 'FRAME',
      name: 'Rounded',
      size: { x: 100, y: 100 },
      opacity: 1,
      visible: true,
      children: [],
      cornerRadius: 8,
    };
    const ctx = makeContext(nodeWithRadius);
    const [result] = generateHTML(ctx);
    expect(result!.code).toContain('border-radius:');
  });
});
