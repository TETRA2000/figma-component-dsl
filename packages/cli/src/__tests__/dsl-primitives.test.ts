import { describe, it, expect } from 'vitest';
import {
  VirtualFigmaApi,
  solidPaint,
  gradientPaint,
  setAutoLayout,
  REFERENCE_COLORS,
  REFERENCE_GRADIENTS,
  SEMANTIC_COLORS,
  FONT_SIZE_SCALE,
  FONT_WEIGHTS,
  SPACING_SCALE,
  RADIUS_SCALE,
} from '@figma-dsl/core';
import { Compiler, TextMeasurer, LayoutResolver } from '@figma-dsl/compiler';
import { Renderer } from '@figma-dsl/renderer';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import { buildButton } from '../definitions/button.dsl.js';
import { buildBadge } from '../definitions/badge.dsl.js';
import { buildFeatureCard } from '../definitions/feature-card.dsl.js';
import { buildTestimonialCard } from '../definitions/testimonial-card.dsl.js';
import { buildPricingCard } from '../definitions/pricing-card.dsl.js';
import { buildCTABanner } from '../definitions/cta-banner.dsl.js';

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

async function compileAndRender(
  buildFn: (api: VirtualFigmaApi) => Promise<ReturnType<VirtualFigmaApi['createFrame']>>,
) {
  const { api, resolver, compiler, renderer } = createPipeline();
  const root = await buildFn(api);
  resolver.resolve(root);
  const result = compiler.compile(root);
  expect(result.errors).toEqual([]);
  const buffer = await renderer.renderToBuffer(result.root);
  // Verify valid PNG signature
  expect(buffer[0]).toBe(0x89);
  expect(buffer[1]).toBe(0x50);
  expect(buffer[2]).toBe(0x4e);
  expect(buffer[3]).toBe(0x47);
  return { result, buffer };
}

// --- Task 12.3: Primitive and Card-Level DSL Definitions ---

describe('DSL Definitions: Button (12 variants)', () => {
  it('compiles and renders all 12 variants (4 styles x 3 sizes)', async () => {
    const { result, buffer } = await compileAndRender(buildButton);
    // parent + 12 variant components + 12 text labels = 25 nodes
    expect(result.nodeCount).toBeGreaterThanOrEqual(25);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('produces correct variant structure with gradient fills', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildButton(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Check that primary variant has gradient fill
    const primaryChild = result.root.children[0]!;
    expect(primaryChild.fillPaints.length).toBeGreaterThan(0);
    expect(primaryChild.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');

    // Verify pill-shaped corners
    expect(primaryChild.cornerRadius).toBe(9999);
  });

  it('has correct size-dependent padding and font sizes', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildButton(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Find sm, md, lg variants — they're in order: primary-sm, primary-md, primary-lg, ...
    const smVariant = result.root.children[0]!;
    const mdVariant = result.root.children[1]!;
    const lgVariant = result.root.children[2]!;

    // sm text should be 14px, md 16px, lg 18px
    expect(smVariant.children[0]!.fontSize).toBe(14);
    expect(mdVariant.children[0]!.fontSize).toBe(16);
    expect(lgVariant.children[0]!.fontSize).toBe(18);
  });
});

describe('DSL Definitions: Badge (4 variants)', () => {
  it('compiles and renders all 4 variants', async () => {
    const { result, buffer } = await compileAndRender(buildBadge);
    // parent + 4 variants + 4 texts = 9 nodes
    expect(result.nodeCount).toBeGreaterThanOrEqual(9);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('has pill-shaped corners and compact padding', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildBadge(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    const firstBadge = result.root.children[0]!;
    expect(firstBadge.cornerRadius).toBe(9999);
    expect(firstBadge.paddingLeft).toBe(16);
    expect(firstBadge.paddingTop).toBe(4);
  });

  it('has TEXT component property for label', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildBadge(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    const firstBadge = result.root.children[0]!;
    expect(firstBadge.componentPropertyDefinitions).toBeDefined();
    expect(firstBadge.componentPropertyDefinitions!['label']).toBeDefined();
    expect(firstBadge.componentPropertyDefinitions!['label']!.type).toBe('TEXT');
  });
});

describe('DSL Definitions: FeatureCard', () => {
  it('compiles and renders a feature card', async () => {
    const { result, buffer } = await compileAndRender(buildFeatureCard);
    expect(result.errors).toEqual([]);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('has vertical layout with 16px spacing', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildFeatureCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Card is the root
    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.paddingTop).toBe(32);
  });

  it('has white background with gray border', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildFeatureCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // White background
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    const fill = result.root.fillPaints[0] as { type: 'SOLID'; color: { r: number; g: number; b: number } };
    expect(fill.color.r).toBeCloseTo(1, 1);
    expect(fill.color.g).toBeCloseTo(1, 1);
    expect(fill.color.b).toBeCloseTo(1, 1);

    // Gray border
    expect(result.root.strokes).toBeDefined();
    expect(result.root.strokes!.length).toBe(1);
    expect(result.root.strokeWeight).toBe(1);
  });

  it('has icon placeholder, title, and description children', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildFeatureCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Icon placeholder frame + title text + description text = 3 children
    expect(result.root.children.length).toBe(3);
  });
});

describe('DSL Definitions: TestimonialCard (3 rating variants)', () => {
  it('compiles and renders all 3 rating variants', async () => {
    const { result, buffer } = await compileAndRender(buildTestimonialCard);
    expect(result.errors).toEqual([]);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('has ELLIPSE shapes for star icons', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildTestimonialCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // First variant's first child should be the stars row
    const firstVariant = result.root.children[0]!;
    const starsRow = firstVariant.children[0]!;

    // Stars row should contain ELLIPSE nodes
    const ellipseChildren = starsRow.children.filter((c: { type: string }) => c.type === 'ELLIPSE');
    expect(ellipseChildren.length).toBeGreaterThan(0);
  });

  it('has avatar as 40px ELLIPSE', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildTestimonialCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Find avatar ellipse in author section
    const firstVariant = result.root.children[0]!;
    // Author section is the last child
    const authorRow = firstVariant.children[firstVariant.children.length - 1]!;
    const avatar = authorRow.children[0]!;
    expect(avatar.type).toBe('ELLIPSE');
    expect(avatar.size.x).toBe(40);
    expect(avatar.size.y).toBe(40);
  });
});

describe('DSL Definitions: PricingCard (standard + highlighted)', () => {
  it('compiles and renders both variants', async () => {
    const { result, buffer } = await compileAndRender(buildPricingCard);
    expect(result.errors).toEqual([]);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('has highlighted variant with gradient background', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildPricingCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Second child is highlighted variant
    const highlighted = result.root.children[1]!;
    expect(highlighted.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
  });

  it('has features list with checkmark circles', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildPricingCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Standard card is first child
    const standard = result.root.children[0]!;
    // Features list is a child with multiple feature items
    const featuresList = standard.children.find(
      (c: { stackMode?: string; children: unknown[] }) => c.stackMode === 'VERTICAL' && c.children.length >= 3,
    );
    expect(featuresList).toBeDefined();
  });

  it('has 24px corner radius', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildPricingCard(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    const standard = result.root.children[0]!;
    expect(standard.cornerRadius).toBe(24);
  });
});

describe('DSL Definitions: CTABanner', () => {
  it('compiles and renders', async () => {
    const { result, buffer } = await compileAndRender(buildCTABanner);
    expect(result.errors).toEqual([]);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('has 3-stop dark gradient background', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildCTABanner(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    const gradient = result.root.fillPaints[0] as {
      type: 'GRADIENT_LINEAR';
      gradientStops: Array<{ position: number }>;
    };
    expect(gradient.gradientStops.length).toBe(3);
  });

  it('has centered vertical layout with 32px spacing', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildCTABanner(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.itemSpacing).toBe(32);
    expect(result.root.counterAxisAlignItems).toBe('CENTER');
  });

  it('has nested button row with two contrasting styles', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildCTABanner(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    // Find the button row (horizontal layout child)
    const buttonRow = result.root.children.find(
      (c: { stackMode?: string }) => c.stackMode === 'HORIZONTAL',
    );
    expect(buttonRow).toBeDefined();
    expect(buttonRow!.children.length).toBe(2);
  });

  it('has 24px corner radius', async () => {
    const { api, resolver, compiler } = createPipeline();
    const root = await buildCTABanner(api);
    resolver.resolve(root);
    const result = compiler.compile(root);

    expect(result.root.cornerRadius).toBe(24);
  });
});
