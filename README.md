# figma-component-dsl

A domain-specific language for defining Figma component structures declaratively in TypeScript. Enables a Figma-free iteration loop: define components as code, render them as images, compare against React screenshots, and export to Figma when ready.

## Quick Start

```bash
# Prerequisites: Node.js >= 22
git submodule update --init --recursive
npm install

# Run all tests (170 tests across 12 files)
npx vitest run
```

## Packages

| Package | Description |
|---------|-------------|
| `@figma-dsl/core` | DSL node primitives, color/fill helpers, layout config, component/variant system |
| `@figma-dsl/compiler` | Compiles DslNode trees to FigmaNodeDict with GUID assignment, text measurement, and two-pass auto-layout |
| `@figma-dsl/renderer` | Renders compiled nodes to PNG via @napi-rs/canvas (Skia) |
| `@figma-dsl/capturer` | Captures React component screenshots via Playwright |
| `@figma-dsl/comparator` | Pixel-level image comparison with similarity scoring via pixelmatch |
| `@figma-dsl/exporter` | Generates Figma plugin input JSON from compiled DSL |
| `@figma-dsl/plugin` | Figma plugin that creates real Figma nodes from DSL definitions |
| `@figma-dsl/cli` | CLI interface for all pipeline operations |

## CLI Usage

```bash
# Compile DSL to Figma node dictionary
npx figma-dsl compile button.dsl.ts -o compiled.json

# Render DSL to PNG
npx figma-dsl render button.dsl.ts -o button.png

# Capture a React component screenshot
npx figma-dsl capture http://localhost:5173 -o screenshot.png -v 1280x720

# Compare two images
npx figma-dsl compare dsl-render.png react-screenshot.png -t 95 -d diff.png

# Full pipeline: compile → render → capture → compare
npx figma-dsl pipeline button.dsl.ts -u http://localhost:5173 -t 95

# Export for Figma plugin
npx figma-dsl export button.dsl.ts -o plugin-input.json
```

**Exit codes:** 0 = success, 1 = comparison below threshold, 2 = runtime error.

## DSL Example

```typescript
import { frame, text, component } from '@figma-dsl/core';
import { solid, gradient } from '@figma-dsl/core';
import { horizontal } from '@figma-dsl/core';

export default component('Button', {
  autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4f46e5', position: 1 }])],
  cornerRadius: 9999,
  componentProperties: [
    { name: 'Label', type: 'TEXT', defaultValue: 'Click' },
  ],
  children: [
    text('Click', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
  ],
});
```

## Pipeline

```
DSL Definition (.dsl.ts)
    │
    ▼
┌─────────┐     ┌──────────┐     ┌────────────┐
│ Compile  │────▶│  Render  │────▶│  Compare   │
│ (layout) │     │  (PNG)   │     │  (diff)    │
└─────────┘     └──────────┘     └─────┬──────┘
                                       │
                     ┌──────────┐      │
                     │ Capture  │──────┘
                     │ (React)  │
                     └──────────┘

    │
    ▼
┌─────────┐     ┌──────────┐
│  Export  │────▶│  Plugin  │──▶ Figma
│  (JSON)  │     │ (import) │
└─────────┘     └──────────┘
```

## Technology

- **TypeScript 5.9+** — strict mode, no `any`
- **@napi-rs/canvas** — Skia-based Canvas 2D for rendering and text measurement
- **Playwright** — headless Chromium for React screenshot capture
- **pixelmatch + pngjs** — pixel-level image comparison
- **Vitest** — test runner
- **Inter font** — bundled (Regular, Medium, SemiBold, Bold)

## References

Reference implementations used for research and specification development:

- **figma_design_playground** — React 19 + TypeScript component library with 16 landing page components and Figma Code Connect integration. Includes a Figma plugin that programmatically generates matching design components.
- **figma-html-renderer** — Python CLI tool that converts Figma `.fig` files into interactive HTML pages via a five-stage pipeline (Parse, Tree, Classify, Render, Output) using PyCairo for rasterization.

See `references/` for the full source of each project.

## Documentation

MAGI consensus-generated documentation for each reference project:

- [`docs/figma_design_playground.md`](docs/figma_design_playground.md) — Architecture, component APIs, Figma integration workflow, design tokens, and known gaps.
- [`docs/figma-html-renderer.md`](docs/figma-html-renderer.md) — Pipeline architecture, CLI reference, classification system, security considerations, and performance characteristics.
