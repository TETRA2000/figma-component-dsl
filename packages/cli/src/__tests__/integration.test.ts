import { describe, it, expect } from 'vitest';
import {
  VirtualFigmaApi,
  solidPaint,
  gradientPaint,
  setAutoLayout,
} from '@figma-dsl/core';
import { Compiler, TextMeasurer, LayoutResolver } from '@figma-dsl/compiler';
import { Renderer } from '@figma-dsl/renderer';
import { Comparator } from '@figma-dsl/comparator';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const FONT_DIR = path.resolve(import.meta.dirname, '../../../dsl-core/fonts');

function createPipeline() {
  const api = new VirtualFigmaApi();
  const measurer = new TextMeasurer();
  measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
  const resolver = new LayoutResolver(measurer);
  const compiler = new Compiler();
  const renderer = new Renderer(FONT_DIR);
  return { api, resolver, compiler, renderer };
}

describe('Integration: compile → render', () => {
  it('renders a simple button component', async () => {
    const { api, resolver, compiler, renderer } = createPipeline();

    // Build button DSL
    const button = api.createFrame();
    button.name = 'Button';
    button.fills = [solidPaint('#7c3aed')];
    setAutoLayout(button, {
      direction: 'HORIZONTAL',
      spacing: 8,
      padX: 16,
      padY: 8,
      sizing: 'HUG',
    });
    button.cornerRadius = 9999;

    const label = await api.createText();
    label.characters = 'Click me';
    label.fontSize = 14;
    label.fontWeight = 500;
    label.fills = [solidPaint('#ffffff')];
    button.appendChild(label);

    // Resolve layout
    resolver.resolve(button);

    // Compile
    const result = compiler.compile(button);
    expect(result.errors).toEqual([]);
    expect(result.nodeCount).toBe(2);

    // Render
    const outPath = path.join(os.tmpdir(), `button-${Date.now()}.png`);
    try {
      const renderResult = await renderer.render(result.root, outPath);
      expect(fs.existsSync(outPath)).toBe(true);
      expect(renderResult.width).toBeGreaterThan(0);
      expect(renderResult.height).toBeGreaterThan(0);
    } finally {
      fs.rmSync(outPath, { force: true });
    }
  });

  it('renders a card with gradient and nested text', async () => {
    const { api, resolver, compiler, renderer } = createPipeline();

    const card = api.createFrame();
    card.name = 'CTABanner';
    card.resize(400, 0);
    card.fills = [
      gradientPaint(
        [
          { color: '#1e1b4b', position: 0 },
          { color: '#312e81', position: 0.5 },
          { color: '#4c1d95', position: 1 },
        ],
        135,
      ),
    ];
    card.cornerRadius = 24;
    setAutoLayout(card, {
      direction: 'VERTICAL',
      spacing: 16,
      padX: 32,
      padY: 32,
      align: 'CENTER',
      heightSizing: 'HUG',
    });

    const title = await api.createText();
    title.characters = 'Ready to get started?';
    title.fontSize = 24;
    title.fontWeight = 700;
    title.fills = [solidPaint('#ffffff')];
    card.appendChild(title);

    const subtitle = await api.createText();
    subtitle.characters = 'Join thousands of developers';
    subtitle.fontSize = 16;
    subtitle.fills = [solidPaint('#c4b5fd')];
    card.appendChild(subtitle);

    resolver.resolve(card);

    const result = compiler.compile(card);
    expect(result.errors).toEqual([]);

    const buffer = await renderer.renderToBuffer(result.root);
    // Verify it's a valid PNG
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50);
  });

  it('renders a component with variants', async () => {
    const { api, resolver, compiler, renderer } = createPipeline();

    const parent = api.createFrame();
    parent.name = 'Badges';
    parent.resize(400, 100);
    setAutoLayout(parent, {
      direction: 'HORIZONTAL',
      spacing: 8,
    });

    const variants = ['Default', 'Primary', 'Success', 'Warning'];
    const colors = ['#6b7280', '#7c3aed', '#22c55e', '#f97316'];
    const components = [];

    for (let i = 0; i < variants.length; i++) {
      const badge = api.createComponent();
      badge.name = `variant=${variants[i]}`;
      badge.fills = [solidPaint(colors[i]!, 0.1)];
      badge.cornerRadius = 9999;
      setAutoLayout(badge, {
        direction: 'HORIZONTAL',
        padX: 12,
        padY: 6,
        sizing: 'HUG',
      });

      const text = await api.createText();
      text.characters = variants[i]!;
      text.fontSize = 12;
      text.fontWeight = 500;
      text.fills = [solidPaint(colors[i]!)];
      badge.appendChild(text);

      badge.addComponentProperty('label', 'TEXT', variants[i]!);
      components.push(badge);
      parent.appendChild(badge);
    }

    resolver.resolve(parent);

    const result = compiler.compile(parent);
    expect(result.errors).toEqual([]);
    expect(result.nodeCount).toBe(9); // parent + 4 badges + 4 texts

    const outPath = path.join(os.tmpdir(), `badges-${Date.now()}.png`);
    try {
      const renderResult = await renderer.render(result.root, outPath);
      expect(fs.existsSync(outPath)).toBe(true);
      expect(renderResult.width).toBeGreaterThan(0);
    } finally {
      fs.rmSync(outPath, { force: true });
    }
  });
});

describe('Integration: comparator', () => {
  it('compares identical renders', async () => {
    const { api, resolver, compiler, renderer } = createPipeline();

    const frame = api.createFrame();
    frame.resize(100, 50);
    frame.fills = [solidPaint('#FF0000')];

    resolver.resolve(frame);
    const result = compiler.compile(frame);

    const img1 = path.join(os.tmpdir(), `cmp1-${Date.now()}.png`);
    const img2 = path.join(os.tmpdir(), `cmp2-${Date.now()}.png`);
    const diffPath = path.join(os.tmpdir(), `diff-${Date.now()}.png`);

    try {
      await renderer.render(result.root, img1);
      await renderer.render(result.root, img2);

      const comparator = new Comparator();
      const compareResult = await comparator.compare(img1, img2, diffPath);
      expect(compareResult.similarity).toBe(100);
      expect(compareResult.passed).toBe(true);
    } finally {
      fs.rmSync(img1, { force: true });
      fs.rmSync(img2, { force: true });
      fs.rmSync(diffPath, { force: true });
    }
  });
});
