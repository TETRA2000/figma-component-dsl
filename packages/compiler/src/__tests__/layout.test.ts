import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi, solidPaint, setAutoLayout } from '@figma-dsl/core';
import { Compiler } from '../compiler.js';
import { LayoutResolver } from '../layout-resolver.js';
import { TextMeasurer } from '../text-measurer.js';
import path from 'node:path';

const FONT_DIR = path.resolve(import.meta.dirname, '../../../dsl-core/fonts');

function createMeasurer(): TextMeasurer {
  const m = new TextMeasurer();
  m.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
  return m;
}

describe('LayoutResolver', () => {
  describe('Example 1: Horizontal button', () => {
    it('resolves HUG button with padded text', async () => {
      const api = new VirtualFigmaApi();
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
      const label = await api.createText();
      label.characters = 'Click me';
      label.fontSize = 14;
      button.appendChild(label);

      const measurer = createMeasurer();
      const resolver = new LayoutResolver(measurer);
      resolver.resolve(button);

      // Button HUG: text width + padX*2, text height + padY*2
      expect(button.width).toBeGreaterThan(30); // text has measurable width
      expect(button.height).toBeGreaterThan(20); // text height + padding
      // Label at (16, 8) offset (padding)
      expect(label.x).toBe(16);
      expect(label.y).toBe(8);
    });
  });

  describe('Example 2: Vertical card with FILL-width children', () => {
    it('resolves FILL children to use available width', async () => {
      const api = new VirtualFigmaApi();
      const card = api.createFrame();
      card.name = 'Card';
      card.resize(300, 200);
      setAutoLayout(card, {
        direction: 'VERTICAL',
        spacing: 12,
        padX: 16,
        padY: 16,
      });

      const title = await api.createText();
      title.characters = 'Title';
      title.fontSize = 18;
      title.layoutSizingHorizontal = 'FILL';
      card.appendChild(title);

      const measurer = createMeasurer();
      const resolver = new LayoutResolver(measurer);
      resolver.resolve(card);

      // Available width = 300 - 16 - 16 = 268
      expect(title.width).toBe(268);
      expect(title.x).toBe(16);
      expect(title.y).toBe(16);
    });
  });

  describe('Example 3: 3-column grid', () => {
    it('resolves 3 FILL columns with spacing', () => {
      const api = new VirtualFigmaApi();
      const grid = api.createFrame();
      grid.name = 'Grid';
      grid.resize(1024, 0);
      setAutoLayout(grid, {
        direction: 'VERTICAL',
        spacing: 32,
        heightSizing: 'HUG',
      });

      const row = api.createFrame();
      row.name = 'Row';
      setAutoLayout(row, {
        direction: 'HORIZONTAL',
        spacing: 32,
        widthSizing: 'FILL',
        heightSizing: 'HUG',
      });

      for (let i = 0; i < 3; i++) {
        const card = api.createFrame();
        card.name = `Card${i}`;
        card.resize(0, 120);
        card.layoutSizingHorizontal = 'FILL';
        row.appendChild(card);
      }
      grid.appendChild(row);

      const measurer = createMeasurer();
      const resolver = new LayoutResolver(measurer);
      resolver.resolve(grid);

      // Row gets FILL width = 1024
      expect(row.width).toBe(1024);
      // 3 FILL cards = (1024 - 32 - 32) / 3 = 320
      expect(row.children[0]!.width).toBe(320);
      expect(row.children[1]!.width).toBe(320);
      expect(row.children[2]!.width).toBe(320);
      // Positions: 0, 352, 704
      expect((row.children[0] as { x: number }).x).toBe(0);
      expect((row.children[1] as { x: number }).x).toBe(352);
      expect((row.children[2] as { x: number }).x).toBe(704);
    });
  });

  describe('alignment', () => {
    it('applies CENTER primary axis alignment', () => {
      const api = new VirtualFigmaApi();
      const container = api.createFrame();
      container.resize(200, 50);
      setAutoLayout(container, {
        direction: 'HORIZONTAL',
        align: 'CENTER',
      });

      const child = api.createFrame();
      child.resize(60, 30);
      container.appendChild(child);

      const resolver = new LayoutResolver(createMeasurer());
      resolver.resolve(container);

      // Centered: (200 - 60) / 2 = 70
      expect(child.x).toBe(70);
    });

    it('applies MAX primary axis alignment', () => {
      const api = new VirtualFigmaApi();
      const container = api.createFrame();
      container.resize(200, 50);
      setAutoLayout(container, {
        direction: 'HORIZONTAL',
        align: 'MAX',
      });

      const child = api.createFrame();
      child.resize(60, 30);
      container.appendChild(child);

      const resolver = new LayoutResolver(createMeasurer());
      resolver.resolve(container);

      // Right-aligned: 200 - 60 = 140
      expect(child.x).toBe(140);
    });

    it('applies CENTER counter axis alignment', () => {
      const api = new VirtualFigmaApi();
      const container = api.createFrame();
      container.resize(200, 100);
      setAutoLayout(container, {
        direction: 'HORIZONTAL',
        counterAlign: 'CENTER',
      });

      const child = api.createFrame();
      child.resize(60, 30);
      container.appendChild(child);

      const resolver = new LayoutResolver(createMeasurer());
      resolver.resolve(container);

      // Counter centered: (100 - 30) / 2 = 35
      expect(child.y).toBe(35);
    });
  });

  describe('SPACE_BETWEEN', () => {
    it('distributes children with equal spacing', () => {
      const api = new VirtualFigmaApi();
      const container = api.createFrame();
      container.resize(300, 50);
      setAutoLayout(container, {
        direction: 'HORIZONTAL',
        align: 'SPACE_BETWEEN',
      });

      const a = api.createFrame();
      a.resize(50, 30);
      const b = api.createFrame();
      b.resize(50, 30);
      const c = api.createFrame();
      c.resize(50, 30);
      container.appendChild(a);
      container.appendChild(b);
      container.appendChild(c);

      const resolver = new LayoutResolver(createMeasurer());
      resolver.resolve(container);

      // Total children width = 150, remaining = 150, gaps = 2, space = 75 each
      expect(a.x).toBe(0);
      expect(b.x).toBe(125);
      expect(c.x).toBe(250);
    });
  });

  describe('FILL inside HUG treated as HUG', () => {
    it('treats FILL children inside HUG parent as HUG', async () => {
      const api = new VirtualFigmaApi();
      const container = api.createFrame();
      setAutoLayout(container, {
        direction: 'VERTICAL',
        sizing: 'HUG',
      });

      const child = await api.createText();
      child.characters = 'Hello';
      child.fontSize = 16;
      child.layoutSizingHorizontal = 'FILL';
      container.appendChild(child);

      const resolver = new LayoutResolver(createMeasurer());
      resolver.resolve(container);

      // FILL in HUG = treated as HUG, container sizes to content
      expect(container.width).toBeGreaterThan(0);
      expect(child.width).toBeGreaterThan(0);
    });
  });
});
