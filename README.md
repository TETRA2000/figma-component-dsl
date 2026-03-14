# figma-component-dsl

A TypeScript DSL for declaratively defining Figma components, rendering them as PNGs, comparing against React screenshots, and exporting to Figma.

## Overview

Define component structures in code, iterate on visual accuracy without Figma, and synchronize components between React and Figma — all in TypeScript.

```
DSL Definition → Compile (Yoga layout) → Render (Skia PNG) → Compare (pixelmatch) → Export (Figma plugin)
```

## Quick Start

```bash
# Prerequisites: Node.js 22+
git submodule update --init --recursive
npm install
npm run build
npm test
```

## Packages

| Package | Description |
|---|---|
| `@figma-dsl/core` | Node primitives, color system, auto-layout, typography, components, compiler |
| `@figma-dsl/renderer` | Skia PNG rendering via @napi-rs/canvas |
| `@figma-dsl/comparator` | Playwright screenshot capture + pixelmatch visual diff |
| `@figma-dsl/cli` | Pipeline orchestrator (compile, render, capture, compare, export, doctor) |
| `@figma-dsl/figma-plugin` | Figma plugin that creates real components from DSL definitions |

## DSL Example

```typescript
import { frame, text, component, solid, gradient, hex, horizontal, vertical } from "@figma-dsl/core";

const Button = component("Button", {
  autoLayout: horizontal({ padX: 24, padY: 12, align: "CENTER", counterAlign: "CENTER" }),
  fills: [gradient([{ hex: "#7c3aed", position: 0 }, { hex: "#4f46e5", position: 1 }], 135)],
  cornerRadius: 9999,
  componentProperties: [
    { name: "label", type: "TEXT", defaultValue: "Click me" },
  ],
  children: [
    text("Click me", { fontSize: 14, fontWeight: 600, color: "#ffffff" }),
  ],
});
```

## CLI Usage

```bash
# Compile DSL to JSON
figma-dsl compile button.dsl.ts -o compiled.json

# Compile and render to PNG
figma-dsl render button.dsl.ts -o button.png --scale 2

# Capture React component screenshot
figma-dsl capture ./src/Button.tsx -o capture.png --viewport 800x600

# Compare two images
figma-dsl compare render.png capture.png -o diff.png -t 95

# Full pipeline: compile → render → capture → compare
figma-dsl pipeline button.dsl.ts --component ./src/Button.tsx

# Export plugin input JSON for Figma
figma-dsl export button.dsl.ts -o plugin-input.json

# Check environment
figma-dsl doctor
```

## DSL API

### Nodes

- `frame(name, props?)` — Container with optional auto-layout
- `text(characters, style?)` — Text node with typography options
- `rectangle(name, props?)` — Rectangle shape
- `ellipse(name, props?)` — Ellipse/circle shape
- `group(name, props?)` — Group container
- `component(name, props?)` — Reusable component definition
- `componentSet(name, props?)` — Variant group (children use `Key=Value` naming)
- `instance(componentRef, overrides?)` — Instance referencing a component

### Layout

- `horizontal(config?)` — Horizontal auto-layout
- `vertical(config?)` — Vertical auto-layout
- Config: `spacing`, `padX`, `padY`, `padTop/Right/Bottom/Left`, `align`, `counterAlign`
- Sizing: `FIXED`, `HUG`, `FILL` via `layoutSizingHorizontal`/`layoutSizingVertical`
- Spacers: `layoutGrow: 1` on child frames

### Colors

- `hex("#rrggbb")` — Parse hex to RGBA
- `solid("#rrggbb", opacity?)` — Solid fill
- `gradient(stops, angle)` — Linear gradient fill
- `stroke({ color, weight, align? })` — Stroke paint
- `defineTokens({ name: "#hex" })` / `token(map, "name")` — Named color tokens

### Typography

```typescript
text("Hello", {
  fontSize: 16,
  fontWeight: 700,        // 400 | 500 | 600 | 700
  color: "#111827",
  lineHeight: { value: 150, unit: "PERCENT" },
  letterSpacing: { value: -0.5, unit: "PIXELS" },
  textAlignHorizontal: "CENTER",
});
```

## Architecture

- **Compiler**: Traverses DslNode tree → registers components → computes Yoga flexbox layout → resolves fills/strokes → produces CompiledNode tree with GUIDs and transforms
- **Renderer**: Walks CompiledNode tree → draws to Skia canvas (frames, shapes, text, gradients) → encodes PNG
- **Capturer**: Playwright + ephemeral Vite server → renders React component in isolation → element screenshot
- **Comparator**: pixelmatch pixel diff with dimension padding, configurable thresholds, diff image output
- **Exporter**: Transforms CompileResult → PluginInput JSON preserving auto-layout semantics
- **Plugin**: Reads PluginInput → creates Figma nodes with fills, auto-layout, text, components, variants, instances

## Tech Stack

- TypeScript 5.9+ (strict, ES2023, Node16 modules)
- [yoga-layout](https://github.com/nicolo-ribaudo/yoga) 3.x — Flexbox layout (WASM)
- [@napi-rs/canvas](https://github.com/nicolo-ribaudo/canvas) — Skia rendering (native)
- [opentype.js](https://github.com/nicolo-ribaudo/opentype.js) — Font glyph measurement
- [pixelmatch](https://github.com/nicolo-ribaudo/pixelmatch) — Pixel-level image comparison
- [Playwright](https://playwright.dev) — React component screenshot capture
- [Vitest](https://vitest.dev) — Test runner

## References

Reference implementations used for research and specification development:

- **figma_design_playground** — React 19 + TypeScript component library with 16 landing page components and Figma Code Connect integration
- **figma-html-renderer** — Python CLI tool that converts Figma `.fig` files into interactive HTML pages

See `references/` for the full source. See [`docs/`](docs/) for MAGI consensus-generated documentation.

## Specifications

This project uses spec-driven development. See `.kiro/specs/figma-component-dsl/` for requirements, design, and task documents.
