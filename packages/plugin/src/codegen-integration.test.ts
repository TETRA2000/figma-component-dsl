/**
 * Integration tests for the canvas-aware codegen pipeline.
 * Tests the full flow from CodegenContext through generators.
 */
import { describe, it, expect } from 'vitest';
import { generateReact } from './codegen-react.js';
import { generateCSS } from './codegen-css.js';
import { generateDSL } from './codegen-dsl.js';
import { generateHTML } from './codegen-html.js';
import type { CodegenContext, CanvasRegionInfo } from './codegen-types.js';
import type { CapturedCanvasImage } from './image-capture.js';
import type { PluginNodeDef } from '@figma-dsl/core';
// Dispatcher imports used in integration context
// (the actual dispatch is not tested here — generator-level integration only)

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

// --- Test fixtures ---

const canvasChild: PluginNodeDef = {
  type: 'FRAME',
  name: 'hero-canvas',
  size: { x: 400, y: 200 },
  opacity: 1,
  visible: true,
  children: [],
};

const regularChild: PluginNodeDef = {
  type: 'TEXT',
  name: 'Title',
  size: { x: 300, y: 24 },
  opacity: 1,
  visible: true,
  children: [],
  characters: 'Welcome',
  fontSize: 18,
};

const componentWithCanvas: PluginNodeDef = {
  type: 'COMPONENT',
  name: 'HeroSection',
  size: { x: 800, y: 400 },
  opacity: 1,
  visible: true,
  stackMode: 'VERTICAL',
  itemSpacing: 16,
  children: [regularChild, canvasChild],
};

const componentWithoutCanvas: PluginNodeDef = {
  type: 'COMPONENT',
  name: 'SimpleCard',
  size: { x: 300, y: 200 },
  opacity: 1,
  visible: true,
  stackMode: 'VERTICAL',
  itemSpacing: 8,
  children: [regularChild],
};

const canvasRegions: CanvasRegionInfo[] = [
  { canvasName: 'hero-canvas', nodeId: '1:1', width: 400, height: 200 },
];

const fakePng = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const canvasImages = new Map<string, CapturedCanvasImage>([
  ['hero-canvas', { pngBytes: fakePng, scale: 1, width: 400, height: 200 }],
]);

// --- Integration tests ---

describe('Canvas-aware codegen integration', () => {
  describe('HTML language with canvas regions', () => {
    it('generates HTML with embedded base64 img for captured canvas regions', () => {
      const ctx = makeContext(componentWithCanvas, { canvasRegions, canvasImages });
      const results = generateHTML(ctx);
      expect(results).toHaveLength(1);
      const html = results[0]!.code;
      expect(html).toContain('<img');
      expect(html).toContain('data:image/png;base64,');
      expect(html).toContain('width="400"');
      expect(html).toContain('height="200"');
      expect(html).toContain('<style>');
      expect(html).toContain('display: flex');
    });

    it('includes placeholder when canvas capture failed', () => {
      const ctx = makeContext(componentWithCanvas, {
        canvasRegions,
        canvasImages: new Map(), // empty = all captures failed
      });
      const results = generateHTML(ctx);
      const html = results[0]!.code;
      expect(html).toContain('canvas-placeholder');
      expect(html).toContain('hero-canvas');
      expect(html).not.toContain('<img');
    });
  });

  describe('React language with canvas regions', () => {
    it('generates DslCanvas JSX elements with correct props', () => {
      const ctx = makeContext(componentWithCanvas, { canvasRegions });
      const results = generateReact(ctx);
      const body = results.find(r => r.title === 'HeroSection');
      expect(body!.code).toContain('<DslCanvas');
      expect(body!.code).toContain('width={400}');
      expect(body!.code).toContain('alt="hero-canvas"');
      expect(body!.code).toContain('dsl={');
    });

    it('includes DslCanvas import', () => {
      const ctx = makeContext(componentWithCanvas, { canvasRegions });
      const results = generateReact(ctx);
      const imports = results.find(r => r.title === 'Imports');
      expect(imports!.code).toContain("import { DslCanvas } from './DslCanvas/DslCanvas'");
    });

    it('also renders regular children correctly', () => {
      const ctx = makeContext(componentWithCanvas, { canvasRegions });
      const results = generateReact(ctx);
      const body = results.find(r => r.title === 'HeroSection');
      expect(body!.code).toContain('<span>Welcome</span>');
    });
  });

  describe('CSS and DSL languages with canvas regions', () => {
    it('CSS output is unaffected by canvas regions', () => {
      const ctxWithCanvas = makeContext(componentWithCanvas, { canvasRegions });
      const ctxWithout = makeContext(componentWithCanvas);
      const cssWithCanvas = generateCSS(ctxWithCanvas);
      const cssWithout = generateCSS(ctxWithout);
      expect(cssWithCanvas[0]!.code).toBe(cssWithout[0]!.code);
    });

    it('DSL output is unaffected by canvas regions', () => {
      const ctxWithCanvas = makeContext(componentWithCanvas, { canvasRegions });
      const ctxWithout = makeContext(componentWithCanvas);
      const dslWithCanvas = generateDSL(ctxWithCanvas);
      const dslWithout = generateDSL(ctxWithout);
      expect(dslWithCanvas[0]!.code).toBe(dslWithout[0]!.code);
    });
  });

  describe('All 4 languages without canvas regions', () => {
    it('React generates standard JSX without DslCanvas', () => {
      const ctx = makeContext(componentWithoutCanvas);
      const results = generateReact(ctx);
      const body = results.find(r => r.title === 'SimpleCard');
      expect(body!.code).not.toContain('<DslCanvas');
      expect(body!.code).toContain('<span>Welcome</span>');
    });

    it('CSS generates valid CSS', () => {
      const ctx = makeContext(componentWithoutCanvas);
      const results = generateCSS(ctx);
      expect(results[0]!.code).toContain('display: flex');
      expect(results[0]!.language).toBe('CSS');
    });

    it('DSL generates valid DSL', () => {
      const ctx = makeContext(componentWithoutCanvas);
      const results = generateDSL(ctx);
      expect(results[0]!.code).toContain("import {");
      expect(results[0]!.language).toBe('TYPESCRIPT');
    });

    it('HTML generates valid structural HTML', () => {
      const ctx = makeContext(componentWithoutCanvas);
      const results = generateHTML(ctx);
      expect(results[0]!.code).toContain('<style>');
      expect(results[0]!.code).toContain('<div');
      expect(results[0]!.code).not.toContain('<img');
    });
  });

  describe('Canvas capture cap enforcement', () => {
    it('omission comment when more than 3 canvas regions in HTML', () => {
      const manyRegions: CanvasRegionInfo[] = Array.from({ length: 5 }, (_, i) => ({
        canvasName: `canvas-${i}`,
        nodeId: `1:${i}`,
        width: 100,
        height: 50,
      }));
      const manyChildren: PluginNodeDef[] = manyRegions.map(r => ({
        type: 'FRAME' as const,
        name: r.canvasName,
        size: { x: 100, y: 50 },
        opacity: 1,
        visible: true,
        children: [],
      }));
      const bigComponent: PluginNodeDef = {
        ...componentWithCanvas,
        children: manyChildren,
      };
      const ctx = makeContext(bigComponent, {
        canvasRegions: manyRegions,
        canvasImages: new Map(), // all captures "failed" but the region list has 5
      });
      const results = generateHTML(ctx);
      expect(results[0]!.code).toContain('<!-- additional canvas regions omitted');
    });
  });

  describe('Capture failure resilience', () => {
    it('HTML shows mix of images and placeholders when some captures succeed', () => {
      const twoRegions: CanvasRegionInfo[] = [
        { canvasName: 'hero-canvas', nodeId: '1:1', width: 400, height: 200 },
        { canvasName: 'footer-canvas', nodeId: '1:2', width: 300, height: 100 },
      ];
      // Only hero-canvas captured successfully
      const partialImages = new Map<string, CapturedCanvasImage>([
        ['hero-canvas', { pngBytes: fakePng, scale: 1, width: 400, height: 200 }],
      ]);
      const node: PluginNodeDef = {
        ...componentWithCanvas,
        children: [
          canvasChild,
          { ...canvasChild, name: 'footer-canvas', size: { x: 300, y: 100 } },
        ],
      };
      const ctx = makeContext(node, {
        canvasRegions: twoRegions,
        canvasImages: partialImages,
      });
      const results = generateHTML(ctx);
      const html = results[0]!.code;
      expect(html).toContain('<img'); // hero captured
      expect(html).toContain('canvas-placeholder'); // footer failed
      expect(html).toContain('footer-canvas');
    });
  });
});
