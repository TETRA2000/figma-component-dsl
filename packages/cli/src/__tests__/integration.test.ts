import { describe, it, expect, beforeAll } from 'vitest';
import { compile, compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import { compare } from '@figma-dsl/comparator';
import { generatePluginInput } from '@figma-dsl/exporter';
import {
  frame, text, rectangle, ellipse, group,
  component, componentSet, instance,
} from '@figma-dsl/core';
import { solid, gradient, defineTokens, token } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
import type { DropShadowEffect, LayerBlurEffect, BlendMode } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const fontDir = join(__dirname2, '../../../dsl-core/fonts');

beforeAll(() => {
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);
});

describe('Integration: compile → render pipeline', () => {
  it('compiles and renders a simple frame', () => {
    const dsl = frame('Box', {
      size: { x: 200, y: 100 },
      fills: [solid('#7c3aed')],
      cornerRadius: 12,
    });
    const compiled = compileWithLayout(dsl, textMeasurer);
    const result = render(compiled.root);
    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.pngBuffer.length).toBeGreaterThan(100);
  });

  it('compiles and renders a button with auto-layout', () => {
    const button = frame('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      cornerRadius: 9999,
      children: [
        text('Click me', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
      ],
    });
    const compiled = compileWithLayout(button, textMeasurer);
    expect(compiled.root.size.x).toBeGreaterThan(50);
    expect(compiled.root.size.y).toBeGreaterThan(20);

    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(100);
  });

  it('compiles and renders identical images consistently', () => {
    const dsl = frame('Box', {
      size: { x: 100, y: 100 },
      fills: [solid('#ff0000')],
    });
    const c1 = compileWithLayout(dsl, textMeasurer);
    const c2 = compileWithLayout(dsl, textMeasurer);
    const r1 = render(c1.root);
    const r2 = render(c2.root);
    const diff = compare(r1.pngBuffer, r2.pngBuffer);
    expect(diff.similarity).toBe(100);
  });

  it('reports render errors for invalid nodes', () => {
    const dsl = frame('Empty', {});
    const compiled = compile(dsl);
    expect(() => render(compiled.root)).toThrow();
  });
});

describe('Integration: compile → export pipeline', () => {
  it('generates valid plugin input from compiled DSL', () => {
    const dsl = component('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      componentProperties: [
        { name: 'Label', type: 'TEXT', defaultValue: 'Click' },
      ],
      children: [text('Click', { fontSize: 14, color: '#ffffff' })],
    });
    const compiled = compileWithLayout(dsl, textMeasurer);
    const pluginInput = generatePluginInput(compiled);

    expect(pluginInput.schemaVersion).toBe('1.0.0');
    expect(pluginInput.components[0]!.type).toBe('COMPONENT');
    expect(pluginInput.components[0]!.componentPropertyDefinitions).toBeDefined();
    expect(pluginInput.components[0]!.stackMode).toBe('HORIZONTAL');
  });
});

describe('DSL test definitions: Button variants', () => {
  const colors = defineTokens({
    purple: '#7c3aed',
    indigo: '#4f46e5',
    white: '#ffffff',
    gray100: '#f3f4f6',
    gray900: '#111827',
  });

  function createButton(
    variant: string,
    size: string,
    fills: ReturnType<typeof solid>[],
    textColor: string,
    fontSize: number,
    padX: number,
    padY: number,
  ) {
    return component(`Variant=${variant}, Size=${size}`, {
      autoLayout: horizontal({ spacing: 8, padX, padY, align: 'CENTER', counterAlign: 'CENTER' }),
      fills,
      cornerRadius: 9999,
      children: [
        text(`${variant} ${size}`, { fontSize, fontWeight: 500, color: textColor }),
      ],
    });
  }

  it('compiles all 12 button variants (4 styles × 3 sizes)', () => {
    const styles = ['Primary', 'Secondary', 'Outline', 'Ghost'];
    const sizes = ['Small', 'Medium', 'Large'];

    for (const style of styles) {
      for (const size of sizes) {
        const fontSize = size === 'Small' ? 12 : size === 'Medium' ? 14 : 16;
        const padX = size === 'Small' ? 12 : size === 'Medium' ? 16 : 20;
        const padY = size === 'Small' ? 6 : size === 'Medium' ? 8 : 10;
        const fills = style === 'Primary'
          ? [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4f46e5', position: 1 }])]
          : style === 'Secondary'
            ? [solid('#f3f4f6')]
            : [];
        const textColor = style === 'Primary' ? '#ffffff' : '#111827';

        const btn = createButton(style, size, fills as ReturnType<typeof solid>[], textColor, fontSize, padX, padY);
        const compiled = compileWithLayout(btn, textMeasurer);
        expect(compiled.root.size.x).toBeGreaterThan(30);

        const result = render(compiled.root);
        expect(result.pngBuffer.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('DSL test definitions: Badge variants', () => {
  it('compiles Badge with 4 variants', () => {
    const variants = [
      { name: 'Default', bg: '#f3f4f6', border: '#e5e7eb', text: '#374151' },
      { name: 'Primary', bg: '#ede9fe', border: '#c4b5fd', text: '#7c3aed' },
      { name: 'Success', bg: '#dcfce7', border: '#86efac', text: '#16a34a' },
      { name: 'Warning', bg: '#fef3c7', border: '#fcd34d', text: '#d97706' },
    ];

    for (const v of variants) {
      const badge = component(`Variant=${v.name}`, {
        autoLayout: horizontal({ padX: 12, padY: 6 }),
        fills: [solid(v.bg)],
        strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 }],
        cornerRadius: 9999,
        componentProperties: [
          { name: 'Label', type: 'TEXT', defaultValue: v.name },
        ],
        children: [text(v.name, { fontSize: 12, fontWeight: 500, color: v.text })],
      });
      const compiled = compileWithLayout(badge, textMeasurer);
      expect(compiled.root.type).toBe('COMPONENT');

      const result = render(compiled.root);
      expect(result.pngBuffer.length).toBeGreaterThan(0);
    }
  });
});

describe('DSL test definitions: FeatureCard', () => {
  it('compiles and renders a FeatureCard', () => {
    const card = component('FeatureCard', {
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1 }],
      cornerRadius: 16,
      componentProperties: [
        { name: 'Icon', type: 'INSTANCE_SWAP', defaultValue: 'StarIcon', preferredValues: ['StarIcon', 'HeartIcon'] },
      ],
      children: [
        ellipse('IconPlaceholder', { size: { x: 48, y: 48 }, fills: [solid('#ede9fe')] }),
        text('Feature Title', { fontSize: 18, fontWeight: 600, color: '#111827' }),
        text('Feature description goes here with more detail.', { fontSize: 14, color: '#6b7280' }),
      ],
    });
    const compiled = compileWithLayout(card, textMeasurer);
    expect(compiled.root.size.x).toBeGreaterThan(100);

    const result = render(compiled.root);
    expect(result.width).toBeGreaterThan(100);
  });
});

describe('DSL test definitions: Nested layouts', () => {
  it('compiles a Navbar with spacers', () => {
    const navbar = frame('Navbar', {
      size: { x: 1200, y: 64 },
      autoLayout: horizontal({ padX: 24, padY: 0, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1 }],
      children: [
        text('Logo', { fontSize: 20, fontWeight: 700, color: '#111827' }),
        frame('Spacer', { layoutGrow: 1 }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Home', { fontSize: 14, color: '#6b7280' }),
            text('About', { fontSize: 14, color: '#6b7280' }),
            text('Contact', { fontSize: 14, color: '#6b7280' }),
          ],
        }),
        frame('Spacer2', { layoutGrow: 1 }),
        frame('CTA', {
          autoLayout: horizontal({ padX: 16, padY: 8 }),
          fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4f46e5', position: 1 }])],
          cornerRadius: 8,
          children: [
            text('Get Started', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          ],
        }),
      ],
    });

    const compiled = compileWithLayout(navbar, textMeasurer);
    expect(compiled.root.size.x).toBe(1200);
    expect(compiled.root.size.y).toBe(64);

    const result = render(compiled.root);
    expect(result.width).toBe(1200);
  });

  it('compiles a Hero section with nested components', () => {
    const hero = frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
      size: { x: 1200, y: 600 },
      fills: [solid('#ffffff')],
      children: [
        text('Build Better Components', {
          fontSize: 60,
          fontWeight: 700,
          color: '#111827',
          letterSpacing: { value: -2.5, unit: 'PIXELS' },
          textAlignHorizontal: 'CENTER',
        }),
        text('A DSL for Figma component development', {
          fontSize: 20,
          color: '#6b7280',
          textAlignHorizontal: 'CENTER',
        }),
        frame('ButtonRow', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryCTA', {
              autoLayout: horizontal({ padX: 24, padY: 12 }),
              fills: [solid('#7c3aed')],
              cornerRadius: 8,
              children: [text('Get Started', { fontSize: 16, fontWeight: 600, color: '#ffffff' })],
            }),
            frame('SecondaryCTA', {
              autoLayout: horizontal({ padX: 24, padY: 12 }),
              strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1 }],
              cornerRadius: 8,
              children: [text('Learn More', { fontSize: 16, fontWeight: 600, color: '#111827' })],
            }),
          ],
        }),
      ],
    });

    const compiled = compileWithLayout(hero, textMeasurer);
    expect(compiled.root.size.x).toBe(1200);

    const result = render(compiled.root);
    expect(result.width).toBe(1200);
    expect(result.height).toBe(600);
  });
});

describe('DSL test definitions: Component set with variants', () => {
  it('compiles a ButtonSet with variant naming', () => {
    const primary = component('Variant=Primary, Size=Medium', {
      autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#7c3aed')],
      cornerRadius: 8,
      children: [text('Primary', { fontSize: 14, fontWeight: 500, color: '#ffffff' })],
    });
    const secondary = component('Variant=Secondary, Size=Medium', {
      autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#f3f4f6')],
      cornerRadius: 8,
      children: [text('Secondary', { fontSize: 14, fontWeight: 500, color: '#111827' })],
    });

    const buttonSet = componentSet('Button', {
      variantAxes: { Variant: ['Primary', 'Secondary'], Size: ['Medium'] },
      children: [primary, secondary],
    });

    const compiled = compile(buttonSet);
    expect(compiled.root.type).toBe('COMPONENT_SET');
    expect(compiled.root.children).toHaveLength(2);
    expect(compiled.root.children[0]!.name).toBe('Variant=Primary, Size=Medium');
  });
});

describe('DSL test definitions: Instance references', () => {
  it('compiles instances with property overrides', () => {
    const layout = frame('CardGrid', {
      size: { x: 800, y: 400 },
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        instance('FeatureCard', { Title: 'Feature 1' }),
        instance('FeatureCard', { Title: 'Feature 2' }),
        instance('FeatureCard', { Title: 'Feature 3' }),
      ],
    });

    const compiled = compile(layout);
    expect(compiled.root.children).toHaveLength(3);
    expect(compiled.root.children[0]!.type).toBe('INSTANCE');
    expect(compiled.root.children[0]!.componentId).toBe('FeatureCard');
    expect(compiled.root.children[0]!.overriddenProperties).toEqual({ Title: 'Feature 1' });
  });
});

// --- Banner Mode Integration Tests ---

describe('Integration: Banner Mode full pipeline (DSL → compile → render → export)', () => {
  it('compiles, renders, and exports a Banner Mode frame with effects and absolute positioning', () => {
    const shadow: DropShadowEffect = {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.5 },
      offsetX: 4,
      offsetY: 4,
      blur: 12,
      spread: 0,
    };

    const banner = frame('PromoBanner', {
      size: { x: 800, y: 400 },
      fills: [gradient([
        { hex: '#1e1b4b', position: 0 },
        { hex: '#312e81', position: 1 },
      ])],
      effects: [shadow],
      children: [
        text('BIG SALE', {
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          textTransform: 'uppercase',
          textStroke: { color: '#fbbf24', width: 2 },
          textShadow: {
            color: { r: 0, g: 0, b: 0, a: 0.8 },
            offsetX: 3,
            offsetY: 3,
            blur: 6,
          },
        }),
        rectangle('Accent', {
          size: { x: 200, y: 4 },
          fills: [solid('#fbbf24')],
          blendMode: 'SCREEN',
        }),
        text('Up to 70% off', {
          fontSize: 24,
          color: '#c4b5fd',
        }),
      ],
    });

    // Stage 1: Compile
    const compiled = compileWithLayout(banner, textMeasurer, { mode: 'banner' });
    expect(compiled.mode).toBe('banner');
    expect(compiled.errors).toHaveLength(0);
    expect(compiled.root.size.x).toBe(800);
    expect(compiled.root.size.y).toBe(400);

    // Verify effects are preserved through compilation
    expect(compiled.root.effects).toBeDefined();
    expect(compiled.root.effects).toHaveLength(1);
    expect(compiled.root.effects![0]!.type).toBe('DROP_SHADOW');

    // Verify child properties
    const accentChild = compiled.root.children.find(c => c.name === 'Accent');
    expect(accentChild?.blendMode).toBe('SCREEN');

    // Verify text properties
    const titleChild = compiled.root.children.find(c => c.name === 'BIG SALE');
    expect(titleChild?.textTransform).toBe('uppercase');
    expect(titleChild?.textStroke).toBeDefined();
    expect(titleChild?.textShadow).toBeDefined();

    // Stage 2: Render
    const result = render(compiled.root);
    expect(result.width).toBe(800);
    expect(result.height).toBe(400);
    expect(result.pngBuffer.length).toBeGreaterThan(1000);

    // Stage 3: Export
    const pluginInput = generatePluginInput(compiled);
    expect(pluginInput.mode).toBe('banner');
    expect(pluginInput.components).toHaveLength(1);

    const root = pluginInput.components[0]!;
    const effects = (root as Record<string, unknown>).effects as Array<Record<string, unknown>>;
    expect(effects).toBeDefined();
    expect(effects).toHaveLength(1);
    expect(effects[0]!.type).toBe('DROP_SHADOW');
    expect(effects[0]!.visible).toBe(true);
    expect(effects[0]!.radius).toBe(12);
  });

  it('handles Banner Mode with layer blur effect', () => {
    const blur: LayerBlurEffect = { type: 'LAYER_BLUR', radius: 8 };

    const blurredFrame = frame('Blurred', {
      size: { x: 200, y: 200 },
      fills: [solid('#3b82f6')],
      effects: [blur],
    });

    const compiled = compileWithLayout(blurredFrame, textMeasurer, { mode: 'banner' });
    expect(compiled.root.effects).toHaveLength(1);
    expect(compiled.root.effects![0]!.type).toBe('LAYER_BLUR');

    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(100);

    const pluginInput = generatePluginInput(compiled);
    const effects = (pluginInput.components[0]! as Record<string, unknown>).effects as Array<Record<string, unknown>>;
    expect(effects[0]!.type).toBe('LAYER_BLUR');
    expect(effects[0]!.radius).toBe(8);
  });

  it('exports mode field in plugin input for Banner Mode', () => {
    const simple = frame('Simple', { size: { x: 100, y: 100 } });
    const compiled = compileWithLayout(simple, textMeasurer, { mode: 'banner' });
    const pluginInput = generatePluginInput(compiled);
    expect(pluginInput.mode).toBe('banner');
  });
});

describe('Integration: Standard mode backward compatibility', () => {
  it('standard mode produces identical output without Banner Mode features', () => {
    const dsl = frame('StandardBox', {
      size: { x: 200, y: 100 },
      fills: [solid('#7c3aed')],
      cornerRadius: 12,
    });

    // Compile without mode (defaults to standard)
    const compiled1 = compileWithLayout(dsl, textMeasurer);
    // Compile with explicit standard mode
    const compiled2 = compileWithLayout(dsl, textMeasurer, { mode: 'standard' });

    // Both should produce the same result
    expect(compiled1.root.size).toEqual(compiled2.root.size);
    expect(compiled1.root.type).toEqual(compiled2.root.type);

    // No Banner Mode properties should be present
    expect(compiled1.root.effects).toBeUndefined();
    expect(compiled1.root.blendMode).toBeUndefined();
    expect(compiled2.root.effects).toBeUndefined();
    expect(compiled2.root.blendMode).toBeUndefined();

    // Renders should be identical
    const r1 = render(compiled1.root);
    const r2 = render(compiled2.root);
    const diff = compare(r1.pngBuffer, r2.pngBuffer);
    expect(diff.similarity).toBe(100);
  });

  it('standard mode with auto-layout works unchanged', () => {
    const button = frame('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      cornerRadius: 9999,
      children: [
        text('Click me', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
      ],
    });

    const compiled = compileWithLayout(button, textMeasurer);
    expect(compiled.root.size.x).toBeGreaterThan(50);
    // Default mode is 'standard' when not explicitly set
    expect(compiled.mode === 'standard' || compiled.mode === undefined).toBe(true);

    const result = render(compiled.root);
    expect(result.pngBuffer.length).toBeGreaterThan(100);

    const pluginInput = generatePluginInput(compiled);
    // Standard mode should not set 'banner' mode in plugin input
    expect(pluginInput.mode).not.toBe('banner');
    expect(pluginInput.components[0]!.stackMode).toBe('HORIZONTAL');
  });

  it('standard mode export does not include effects array', () => {
    const dsl = frame('Plain', {
      size: { x: 100, y: 100 },
      fills: [solid('#ff0000')],
    });
    const compiled = compileWithLayout(dsl, textMeasurer);
    const pluginInput = generatePluginInput(compiled);
    const root = pluginInput.components[0]! as Record<string, unknown>;
    expect(root.effects).toBeUndefined();
    expect(root.blendMode).toBeUndefined();
  });
});
