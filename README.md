# figma-component-dsl

A domain-specific language for defining Figma component structures declaratively in TypeScript. Enables a Figma-free iteration loop: define components as code, render them as images, compare against React screenshots, and export to Figma when ready.

## Quick Start

```bash
# Prerequisites: Node.js >= 22
git submodule update --init --recursive
npm install

# Run all tests (273 tests across 17 files)
npx vitest run
```

## Packages

| Package | Description |
|---------|-------------|
| `@figma-dsl/core` | DSL node primitives, color/fill helpers, layout config, component/variant system, changeset schema, canonical PluginNodeDef types, diff algorithm |
| `@figma-dsl/compiler` | Compiles DslNode trees to FigmaNodeDict with GUID assignment, text measurement, and two-pass auto-layout |
| `@figma-dsl/renderer` | Renders compiled nodes to PNG via @napi-rs/canvas (Skia) |
| `@figma-dsl/capturer` | Captures React component screenshots via Playwright |
| `@figma-dsl/comparator` | Pixel-level image comparison with similarity scoring via pixelmatch |
| `@figma-dsl/exporter` | Generates Figma plugin input JSON from compiled DSL |
| `@figma-dsl/plugin` | Figma plugin: imports DSL definitions as Figma nodes, tracks edits, exports changesets and complete DSL JSON |
| `@figma-dsl/validator` | DSL compatibility validator with 10 rules (file-structure, styling, AST-based) |
| `@figma-dsl/cli` | CLI interface for all pipeline operations |

## CLI Usage

```bash
# Compile DSL to Figma node dictionary
bin/figma-dsl-compile button.dsl.ts -o compiled.json

# Render DSL to PNG
bin/figma-dsl-render button.dsl.ts -o button.png

# Capture a React component screenshot
bin/figma-dsl-capture http://localhost:5173 -o screenshot.png -v 1280x720

# Compare two images
bin/figma-dsl-compare dsl-render.png react-screenshot.png -t 95 -d diff.png

# Full pipeline: compile → render → capture → compare
bin/figma-dsl-pipeline button.dsl.ts -u http://localhost:5173 -t 95

# Export for Figma plugin
bin/figma-dsl-export button.dsl.ts -o plugin-input.json

# Validate component DSL compatibility
bin/figma-dsl-validate src/components/Button
bin/figma-dsl-validate src/components/ --format json --strict

# Batch compile, render, and export multiple DSL files
bin/figma-dsl-batch examples/ -o output/

# Batch compare DSL renders against Figma captures
bin/figma-dsl-batch-compare output/dsl/ output/figma/ -o output/report.json

# Capture component images from Figma via REST API
bin/figma-dsl-capture-figma --file-key FILE_KEY --node-map node-map.json -o output/figma/

# Generate calibration test suite DSL files
bin/figma-dsl-generate-test-suite -o calibration/tests/

# Run full calibration pipeline (generate → batch → capture-figma → compare)
bin/figma-dsl-calibrate -o calibration/ --file-key FILE_KEY
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
┌─────────┐     ┌──────────────────────────────┐
│  Export  │────▶│  Plugin (import + tracking)  │──▶ Figma
│  (JSON)  │     └──────────┬───────────────────┘
└─────────┘                 │
                            ▼
               ┌────────────────────────┐
               │ Export (changeset/JSON) │
               └────────────┬───────────┘
                            │
                            ▼
               ┌────────────────────────┐
               │  Apply Changeset Skill │──▶ React/CSS
               └────────────┬───────────┘
                            │
                            ▼
               ┌────────────────────────┐
               │  Verify Changeset Skill│──▶ Visual comparison
               └────────────────────────┘
```

## Calibration

The calibration pipeline measures rendering fidelity by comparing DSL-rendered PNGs against Figma's own output. It auto-generates test DSL files covering property categories (corner radius, fills, strokes, auto-layout, typography, opacity, etc.), batch compiles and renders them, optionally captures the corresponding components from a Figma file via REST API, and produces a detailed comparison report with per-category similarity breakdowns and worst-case differences.

```bash
# Full calibration workflow (all steps in one command)
bin/figma-dsl-calibrate -o calibration/ --file-key FILE_KEY

# Or run each step individually:
bin/figma-dsl-generate-test-suite -o calibration/tests/
bin/figma-dsl-batch calibration/tests/ -o calibration/output/
bin/figma-dsl-capture-figma --file-key FILE_KEY --node-map calibration/output/node-map.json -o calibration/figma/
bin/figma-dsl-batch-compare calibration/output/dsl/ calibration/figma/ -o calibration/report.json
```

## Preview App

The `preview/` directory contains a Vite + React app for live previewing components and landing pages. It includes 25 React components and 4 page templates.

```bash
cd preview && npm install --legacy-peer-deps && npm run dev
```

A sync script keeps reference components up to date:

```bash
preview/scripts/sync-reference-components.sh
```

## Component Catalog (Storybook)

A Storybook-based catalog for browsing all components and page templates with interactive controls, variant grids, and DSL artifact inspection.

```bash
cd preview && npm run storybook
```

Features:
- **29 stories** — 25 component stories + 4 page template stories with interactive controls
- **All Variants grid** — every component includes a grid view showing all variant combinations
- **DSL Panel addon** — view DSL source code, compiled JSON, and rendered PNG alongside React previews
- **Side-by-side comparison** — toggle between React-only, DSL-only, and side-by-side views
- **Viewport switching** — desktop, tablet, and mobile presets for page templates
- **Pre-built artifacts** — DSL files are compiled and rendered to PNG before Storybook starts (`prestorybook` script)

## Claude Desktop Skills

Six AI skills for Claude Desktop are available in `.claude/skills/`:

| Skill | Description |
|-------|-------------|
| `create-landing-page` | Compose landing pages from registered components with live preview |
| `create-react-component` | Scaffold 3-file components with validation and dual preview (React + DSL PNG) |
| `export-to-figma` | Export components to Figma via MCP auto-publish, plugin JSON, or visual fidelity pipeline |
| `export-to-html` | Build self-contained HTML files from React pages via vite-plugin-singlefile |
| `apply-changeset` | Apply Figma design changesets to React/CSS source code with property mapping |
| `verify-changeset` | Verify visual fidelity between Figma exports and React components with iterative correction |

Shared references (component registry and design tokens) are in `.claude/skills/shared/references/`.

Preview server configurations for Claude Desktop are defined in `.claude/launch.json`.

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

- **skill-creator** — Anthropic's skill authoring toolkit with description optimization, eval grading, and review generation scripts.

See `references/` for the full source of each project.

## Documentation

MAGI consensus-generated documentation (multi-agent analysis with confidence scoring):

### Package Documentation

- [`docs/packages/dsl-core.md`](docs/packages/dsl-core.md) — Node factories, color/fill system, auto-layout, component/variant types
- [`docs/packages/compiler.md`](docs/packages/compiler.md) — Two-pass layout algorithm, text measurement, GUID assignment
- [`docs/packages/renderer.md`](docs/packages/renderer.md) — Skia canvas rendering, fill/stroke/text pipeline, transform model
- [`docs/packages/capturer.md`](docs/packages/capturer.md) — Playwright screenshot capture, viewport/selector/delay options
- [`docs/packages/comparator.md`](docs/packages/comparator.md) — Pixel-level comparison, dimension padding, threshold configuration
- [`docs/packages/exporter.md`](docs/packages/exporter.md) — Plugin JSON generation, corner radius clamping, schema versioning
- [`docs/packages/plugin.md`](docs/packages/plugin.md) — Figma node creation, component/instance linking, grid layout
- [`docs/packages/validator.md`](docs/packages/validator.md) — 10-rule validation system, severity model, pattern matching
- [`docs/packages/cli.md`](docs/packages/cli.md) — 12-command CLI, batch processing, calibration workflows

### Reference Project Documentation

- [`docs/figma_design_playground.md`](docs/figma_design_playground.md) — Architecture, component APIs, Figma integration workflow, design tokens, and known gaps.
- [`docs/figma-html-renderer.md`](docs/figma-html-renderer.md) — Pipeline architecture, CLI reference, classification system, security considerations, and performance characteristics.
