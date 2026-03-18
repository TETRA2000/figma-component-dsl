/**
 * Test page registry — manifest of all 18 test pages (one per category)
 * used by the batch converter, test server, and visual regression tests.
 */

export interface TestPageEntry {
  /** Unique name, e.g., 'layout-horizontal-01' */
  name: string;
  /** Category, e.g., 'layout-horizontal' */
  category: string;
  /** Human description */
  description: string;
  /** URL path for serving, e.g., '/test/layout-horizontal-01' */
  urlPath: string;
  /** File path relative to test-pages dir */
  filePath: string;
  /** Viewport size */
  viewport: { width: number; height: number };
  /** DSL features expected in this test */
  expectedFeatures: string[];
}

export const ALL_CATEGORIES: string[] = [
  'layout-horizontal',
  'layout-vertical',
  'layout-nested',
  'layout-sizing',
  'typography',
  'colors-solid',
  'colors-gradient',
  'borders-strokes',
  'corner-radius',
  'spacing-padding',
  'opacity',
  'clip-content',
  'cards',
  'navigation',
  'heroes-banners',
  'lists-grids',
  'badges-tags',
  'combined-complex',
  'svg-basic',
  'canvas-effects',
];

/** Number of test pages per category (1 representative page each). */
const CATEGORY_COUNTS: Record<string, number> = {
  'layout-horizontal': 1,
  'layout-vertical': 1,
  'layout-nested': 1,
  'layout-sizing': 1,
  'typography': 1,
  'colors-solid': 1,
  'colors-gradient': 1,
  'borders-strokes': 1,
  'corner-radius': 1,
  'spacing-padding': 1,
  'opacity': 1,
  'clip-content': 1,
  'cards': 1,
  'navigation': 1,
  'heroes-banners': 1,
  'lists-grids': 1,
  'badges-tags': 1,
  'combined-complex': 1,
  'svg-basic': 1,
  'canvas-effects': 1,
};

/** Human-readable descriptions per category (templates). */
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'layout-horizontal': 'Horizontal flex layout with varying alignment, gap, and child sizing',
  'layout-vertical': 'Vertical flex layout with varying alignment, gap, and child sizing',
  'layout-nested': 'Nested horizontal and vertical layouts with mixed configurations',
  'layout-sizing': 'Fixed, hug, and fill sizing modes for width and height',
  'typography': 'Text rendering with font size, weight, color, alignment, and line height',
  'colors-solid': 'Solid background and foreground colors across the spectrum',
  'colors-gradient': 'Linear and radial gradient backgrounds',
  'borders-strokes': 'Border width, color, style, and per-side configuration',
  'corner-radius': 'Border radius including per-corner and pill shapes',
  'spacing-padding': 'Padding and gap values including asymmetric padding',
  'opacity': 'Opacity on containers and nested elements',
  'clip-content': 'Overflow clipping behaviour on containers',
  'cards': 'Card-style components with image, title, body, and actions',
  'navigation': 'Navigation bars, tabs, and breadcrumb patterns',
  'heroes-banners': 'Hero sections and banner layouts with background imagery',
  'lists-grids': 'Repeated list items and grid layouts',
  'badges-tags': 'Small badge and tag pill components',
  'combined-complex': 'Complex pages combining multiple DSL features',
  'svg-basic': 'Inline SVG elements with paths, shapes, and icons',
  'canvas-effects': 'Canvas Mode features: box-shadow, text-shadow, rotation, blend mode, text-transform',
};

/** Expected DSL features per category. */
const CATEGORY_FEATURES: Record<string, string[]> = {
  'layout-horizontal': ['horizontal', 'gap', 'align', 'justify'],
  'layout-vertical': ['vertical', 'gap', 'align', 'justify'],
  'layout-nested': ['horizontal', 'vertical', 'gap', 'nested-layout'],
  'layout-sizing': ['width', 'height', 'hug', 'fill', 'fixed'],
  'typography': ['font-size', 'font-weight', 'color', 'text-align', 'line-height'],
  'colors-solid': ['background-color', 'color', 'solid-fill'],
  'colors-gradient': ['gradient', 'linear-gradient', 'radial-gradient'],
  'borders-strokes': ['border-width', 'border-color', 'border-style'],
  'corner-radius': ['border-radius', 'per-corner-radius'],
  'spacing-padding': ['padding', 'gap', 'asymmetric-padding'],
  'opacity': ['opacity'],
  'clip-content': ['overflow', 'clip'],
  'cards': ['horizontal', 'vertical', 'border-radius', 'padding', 'gap', 'typography'],
  'navigation': ['horizontal', 'gap', 'padding', 'typography', 'background-color'],
  'heroes-banners': ['vertical', 'padding', 'background-color', 'typography', 'gradient'],
  'lists-grids': ['vertical', 'horizontal', 'gap', 'padding', 'repeated-items'],
  'badges-tags': ['horizontal', 'padding', 'border-radius', 'background-color', 'typography'],
  'combined-complex': [
    'horizontal', 'vertical', 'gap', 'padding', 'border-radius',
    'typography', 'background-color', 'opacity', 'gradient',
  ],
  'svg-basic': ['svg', 'svgContent', 'inline-svg'],
  'canvas-effects': ['box-shadow', 'text-shadow', 'rotation', 'blend-mode', 'text-transform', 'canvas-mode'],
};

/** Pad a number to two digits. */
function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

/**
 * Build the full test page registry.
 * Returns entries for all 18 test pages (one per category).
 */
export function buildRegistry(): TestPageEntry[] {
  const entries: TestPageEntry[] = [];

  for (const category of ALL_CATEGORIES) {
    const count = CATEGORY_COUNTS[category] ?? 0;
    const baseDescription = CATEGORY_DESCRIPTIONS[category] ?? category;
    const features = CATEGORY_FEATURES[category] ?? [];
    const isComplex = category === 'combined-complex';
    const viewport = isComplex
      ? { width: 1280, height: 720 }
      : { width: 800, height: 600 };

    for (let i = 1; i <= count; i++) {
      const name = `${category}-${pad(i)}`;
      entries.push({
        name,
        category,
        description: `${baseDescription} (variant ${i} of ${count})`,
        urlPath: `/test/${name}`,
        filePath: `${category}/${name}.tsx`,
        viewport,
        expectedFeatures: features,
      });
    }
  }

  return entries;
}
