# figma-component-dsl

A domain-specific language for declaratively defining Figma component structures in TypeScript. Define components in code, render them as images, compare against React screenshots, and export to Figma — all without opening Figma.

## Workflow

```
Define DSL → Compile → Render PNG → Compare with React screenshot → Export to Figma
```

1. Write component definitions using the TypeScript DSL
2. Compile to Figma's internal node dictionary format
3. Render as PNG images via PyCairo
4. Capture React component screenshots via Playwright
5. Compare the two images pixel-by-pixel — iterate until they match
6. Export to Figma via the plugin when ready

## Prerequisites

- **Node.js** 22+
- **Python** 3.10+ with **PyCairo** 1.27+
- **Inter** font files (bundled in `packages/dsl-core/fonts/`)

Verify your environment:

```sh
npx figma-dsl doctor
```

## Setup

```sh
git submodule update --init --recursive
npm install
pip install -e packages/renderer
npm run build
```

## Quick Start

Define a button component:

```typescript
// button.dsl.ts
import { frame, text } from '@figma-dsl/core/nodes';
import { solid } from '@figma-dsl/core/colors';
import { horizontal } from '@figma-dsl/core/layout';

export default frame('Button', {
  size: { x: 160, y: 44 },
  fills: [solid('#7c3aed')],
  cornerRadius: 8,
  autoLayout: horizontal({ spacing: 8, padX: 16, padY: 10, align: 'CENTER' }),
  children: [
    text('Click me', {
      fontSize: 16,
      fontWeight: 600,
      color: '#ffffff',
    }),
  ],
});
```

Run the pipeline:

```sh
# Compile + render only
figma-dsl pipeline button.dsl.ts

# Full pipeline with React comparison
figma-dsl pipeline button.dsl.ts --url http://localhost:3000/button --threshold 0.95
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `figma-dsl compile <input.dsl.ts> [-o out.json]` | Compile DSL to JSON |
| `figma-dsl render --input <json> [-o out.png] [--scale 2] [--bg white\|transparent]` | Render JSON to PNG |
| `figma-dsl capture --url <url> [-s selector] [-o capture.png] [-v 1280x720]` | Screenshot a React component |
| `figma-dsl compare <img1> <img2> [--threshold 0.95] [--diff diff.png]` | Compare two images |
| `figma-dsl export <input.dsl.ts> [-o out.json] [--page "Component Library"]` | Generate Figma plugin input |
| `figma-dsl pipeline <input.dsl.ts> [--url <url>] [--threshold 0.95]` | Run full pipeline |
| `figma-dsl doctor` | Verify environment |

Exit codes: `0` success, `1` comparison failure, `2` runtime error.

## DSL API

### Nodes

```typescript
import { frame, text, rectangle, ellipse, group } from '@figma-dsl/core/nodes';
import { component, componentSet, instance } from '@figma-dsl/core/components';

frame('Card', {
  size: { x: 320, y: 200 },
  fills: [solid('#ffffff')],
  cornerRadius: 12,
  // or per-corner: cornerRadii: { topLeft: 8, topRight: 16, bottomLeft: 4, bottomRight: 12 }
  opacity: 0.9,
  clipContent: true,
  children: [/* ... */],
});

text('Hello', { fontSize: 16, fontWeight: 600, color: '#1a1a1a' });

rectangle('Divider', { size: { x: 280, y: 1 }, fills: [solid('#e5e7eb')] });

ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid('#22c55e')] });

group('Row', [child1, child2]);
```

### Auto Layout

```typescript
import { horizontal, vertical } from '@figma-dsl/core/layout';

frame('Row', {
  autoLayout: horizontal({
    spacing: 8,                           // gap between children
    padX: 16, padY: 12,                   // axis-based padding
    padTop: 8, padRight: 16,              // per-side overrides
    padBottom: 8, padLeft: 16,
    align: 'CENTER',                      // MIN | CENTER | MAX | SPACE_BETWEEN
    counterAlign: 'CENTER',               // MIN | CENTER | MAX
  }),
  layoutSizingHorizontal: 'FILL',        // FIXED | HUG | FILL
  layoutSizingVertical: 'HUG',
  children: [
    frame('Spacer', { layoutGrow: 1 }),   // flex-grow
  ],
});
```

### Colors and Fills

```typescript
import { hex, solid, gradient, stroke, defineTokens, token } from '@figma-dsl/core/colors';

solid('#7c3aed');               // solid fill
solid('#7c3aed', 0.5);         // with opacity

gradient([
  { hex: '#7c3aed', position: 0 },
  { hex: '#6366f1', position: 1 },
], 90);                         // angle in degrees

stroke('#e5e7eb', 1, 'INSIDE');  // color, weight, alignment (INSIDE | CENTER | OUTSIDE)

// Design tokens
const colors = defineTokens({
  primary: '#7c3aed',
  surface: '#ffffff',
  border: '#e5e7eb',
});
frame('Card', { fills: [token(colors, 'surface')] });
```

### Typography

```typescript
text('Heading', {
  fontFamily: 'Inter',
  fontWeight: 700,                                  // 400 | 500 | 600 | 700
  fontSize: 24,
  lineHeight: { value: 32, unit: 'PIXELS' },       // or { value: 150, unit: 'PERCENT' }
  letterSpacing: { value: -0.5, unit: 'PIXELS' },  // or PERCENT
  textAlignHorizontal: 'CENTER',                    // LEFT | CENTER | RIGHT
  color: '#1a1a1a',
});
```

### Components and Variants

```typescript
const button = component('Button', {
  size: { x: 160, y: 44 },
  fills: [solid('#7c3aed')],
  autoLayout: horizontal({ padX: 16, padY: 10 }),
  componentProperties: [
    { name: 'Label', type: 'TEXT', defaultValue: 'Button' },
    { name: 'Disabled', type: 'BOOLEAN', defaultValue: false },
  ],
  children: [text('Button', { fontSize: 16, color: '#ffffff' })],
});

// Variant set with Key=Value naming
componentSet('ButtonSet', {
  variantAxes: { Variant: ['Primary', 'Secondary'], Size: ['Small', 'Large'] },
  children: [primarySmall, primaryLarge, secondarySmall, secondaryLarge],
});

// Instance with property overrides
instance('Button', { Label: 'Submit', Disabled: false });
```

## Packages

| Package | Description |
|---------|-------------|
| `@figma-dsl/core` | Node factories, color helpers, layout helpers, type definitions |
| `@figma-dsl/compiler` | DSL-to-JSON compiler, layout resolver, text measurement (opentype.js) |
| `@figma-dsl/renderer` | PyCairo PNG renderer (Python) |
| `@figma-dsl/capturer` | Playwright screenshot capture |
| `@figma-dsl/comparator` | pixelmatch image comparison |
| `@figma-dsl/exporter` | Figma plugin input generator |
| `@figma-dsl/plugin` | Figma plugin for creating nodes from DSL |
| `@figma-dsl/cli` | CLI orchestration |

## Testing

```sh
npm test                                        # TypeScript tests (vitest)
npm run test:watch                              # watch mode
python3 -m pytest packages/renderer/tests/ -v   # Python renderer tests
```

## Project Structure

```
packages/
  dsl-core/       TypeScript DSL primitives, types, and bundled Inter fonts
  compiler/       Compile DSL tree -> FigmaNodeDict JSON (layout, text expansion)
  renderer/       Python PyCairo renderer (JSON -> PNG)
  capturer/       Playwright screenshot capture
  comparator/     pixelmatch image comparison
  exporter/       Figma plugin input generation
  plugin/         Figma plugin (Plugin API node creation)
  cli/            CLI interface
references/
  figma_design_playground/    React component library + Figma plugin reference
  figma-html-renderer/        .fig -> PNG rendering pipeline reference
```

## References

Reference implementations used for research and specification:

- **figma_design_playground** — React 19 + TypeScript component library with 16 landing page components, Figma Code Connect integration, and a Figma plugin that programmatically generates matching design components.
- **figma-html-renderer** — Python CLI tool that converts Figma `.fig` files into interactive HTML pages via a five-stage pipeline (Parse, Tree, Classify, Render, Output) using PyCairo for rasterization.

See `references/` for the full source of each project.

## Documentation

MAGI consensus-generated documentation for each reference project:

- [`docs/figma_design_playground.md`](docs/figma_design_playground.md)
- [`docs/figma-html-renderer.md`](docs/figma-html-renderer.md)

## License

Private.
