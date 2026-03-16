# DslCanvas to Figma Plugin JSON

Audience: Developers working with the DSL pipeline

This guide covers the end-to-end workflow of embedding a DslCanvas component in a React page, writing the matching DSL source file, and exporting it to `.figma.json` for the Figma plugin.

## When to Use This Workflow

Use this when you want to:

- Preview DSL-rendered content inside a React page (via the `DslCanvas` component)
- Export the same DSL definition as a `.figma.json` file for import into Figma via the plugin
- Maintain a single source of truth (the `.dsl.ts` file) that drives both browser preview and Figma import

## Prerequisites

```bash
# Initialize submodules (first time only)
git submodule update --init --recursive

# Build all packages (compiler, exporter, renderer, CLI)
npm run build

# Install preview dependencies
cd preview && npm install
```

## Overview

```
.dsl.ts file (DSL source)
    |
    +---> [bin/figma-dsl compile] ---> compiled JSON (FigmaNodeDict)
    |                                      |
    |                                      +---> [bin/figma-dsl export] ---> .figma.json (PluginInput)
    |                                      |
    |                                      +---> [bin/figma-dsl render] ---> PNG visualization
    |
    +---> [inline JSON in React page] ---> <DslCanvas dsl={...} /> ---> browser preview
```

The DSL source is the single source of truth. From it you can:

1. **Compile** to internal Figma node representation (FigmaNodeDict JSON)
2. **Export** to Figma plugin input format (`.figma.json`)
3. **Render** to PNG for visual inspection
4. **Embed** in a React page via the `DslCanvas` component for browser preview

## Step 1: Write the DSL Source File

Create a `.dsl.ts` file in the `examples/` directory (or any location). The file must have a default export that returns a DSL node.

```typescript
// examples/my-card.dsl.ts
import { frame, text, solid, vertical } from '@figma-dsl/core';

export default frame('MyCard', {
  size: { x: 400, y: 300 },
  fills: [solid('#fafaff')],
  cornerRadius: 16,
  strokes: [solid('#d1c7fd')],
  strokeWeight: 1,
  autoLayout: vertical({
    spacing: 16,
    padX: 32,
    padY: 32,
    align: 'CENTER',
    counterAlign: 'CENTER',
  }),
  children: [
    text('Hello from DSL', {
      fontSize: 24,
      fontWeight: 700,
      color: '#451cd9',
      textAlignHorizontal: 'CENTER',
    }),
    text('Description text goes here.', {
      fontSize: 14,
      fontWeight: 400,
      color: '#4a5468',
      textAlignHorizontal: 'CENTER',
    }),
  ],
});
```

Key rules:

- Use `solid('#hex')` for fills and strokes — RGB objects are not accepted by the `solid()` helper
- Use `vertical()` / `horizontal()` helpers for auto-layout configuration
- Use `component()` for standalone components, `componentSet()` for components with variants
- See the [DSL API Reference](../dsl-reference.md) for the full API

## Step 2: Compile and Export to `.figma.json`

### Quick Export (compile + export in one step)

```bash
bin/figma-dsl export examples/my-card.dsl.ts \
  -o output/my-card.figma.json \
  -p "My Components"
```

| Flag | Description | Default |
|------|-------------|---------|
| `-o` | Output file path | stdout |
| `-p` | Target page name in Figma | `"Component Library"` |

### Two-Step Process (for intermediate inspection)

```bash
# Step 2a: Compile to internal JSON
bin/figma-dsl compile examples/my-card.dsl.ts -o output/my-card.compiled.json

# Step 2b: Export compiled JSON to plugin format
bin/figma-dsl export output/my-card.compiled.json -o output/my-card.figma.json -p "My Components"
```

The two-step process is useful when you want to inspect the intermediate FigmaNodeDict representation before exporting.

### Optional: Render to PNG

```bash
bin/figma-dsl render examples/my-card.dsl.ts -o output/my-card.png
```

This produces a visual preview of the compiled DSL, useful for verifying layout and styling before importing into Figma.

## Step 3: Verify the `.figma.json` Output

The exported file follows the `PluginInput` schema:

```json
{
  "schemaVersion": "1.0.0",
  "targetPage": "My Components",
  "components": [
    {
      "type": "FRAME",
      "name": "MyCard",
      "size": { "x": 400, "y": 300 },
      "opacity": 1,
      "visible": true,
      "children": [ ... ],
      "fills": [ ... ],
      "strokes": [ ... ],
      "cornerRadius": 16,
      "stackMode": "VERTICAL",
      "itemSpacing": 16,
      "paddingTop": 32,
      "paddingRight": 32,
      "paddingBottom": 32,
      "paddingLeft": 32,
      "primaryAxisAlignItems": "CENTER",
      "counterAxisAlignItems": "CENTER",
      "layoutSizingHorizontal": "FIXED",
      "layoutSizingVertical": "FIXED"
    }
  ]
}
```

Key fields:

| Field | Description |
|-------|-------------|
| `schemaVersion` | Always `"1.0.0"` |
| `targetPage` | The Figma page where the plugin will create the component |
| `components` | Array of root `PluginNodeDef` nodes (one per exported component) |

See the [@figma-dsl/exporter documentation](../packages/exporter.md) for the full `PluginNodeDef` schema.

## Step 4: Embed in a React Page with DslCanvas

The `DslCanvas` component renders compiled DSL JSON as a PNG image in the browser via a server-side render endpoint.

### Create the Page

```tsx
// preview/src/pages/_generated/MyPage.tsx
import { DslCanvas } from '@/components';

// This JSON matches the structure produced by the compiler.
// In production, import it from a compiled .json file or fetch it from an API.
const myCardDsl = {
  type: 'FRAME',
  name: 'MyCard',
  size: { x: 400, y: 300 },
  fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 1 } }],
  cornerRadius: 16,
  strokes: [{ type: 'SOLID', color: { r: 0.82, g: 0.78, b: 0.99 } }],
  strokeWeight: 1,
  layoutMode: 'VERTICAL',
  primaryAxisAlignItems: 'CENTER',
  counterAxisAlignItems: 'CENTER',
  itemSpacing: 16,
  paddingLeft: 32,
  paddingRight: 32,
  paddingTop: 32,
  paddingBottom: 32,
  children: [
    {
      type: 'TEXT',
      name: 'Title',
      size: { x: 336, y: 32 },
      characters: 'Hello from DSL',
      style: { fontSize: 24, fontWeight: 700, textAlignHorizontal: 'CENTER' },
      fills: [{ type: 'SOLID', color: { r: 0.27, g: 0.11, b: 0.85 } }],
    },
    {
      type: 'TEXT',
      name: 'Body',
      size: { x: 336, y: 48 },
      characters: 'Description text goes here.',
      style: { fontSize: 14, fontWeight: 400, textAlignHorizontal: 'CENTER' },
      fills: [{ type: 'SOLID', color: { r: 0.29, g: 0.33, b: 0.41 } }],
    },
  ],
};

export function MyPage() {
  return (
    <section style={{ display: 'flex', justifyContent: 'center', padding: '80px 24px' }}>
      <DslCanvas dsl={myCardDsl} width={400} alt="My card rendered via DSL" />
    </section>
  );
}
```

### DslCanvas Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dsl` | `FigmaNodeDict` | (required) | Compiled DSL JSON to render |
| `slotOverrides` | `Record<string, FigmaNodeDict[]>` | `undefined` | Slot content keyed by slot name |
| `width` | `number` | `undefined` | Display width in pixels; height calculated from aspect ratio |
| `scale` | `number` | `1` | Render scale factor for high-DPI |
| `className` | `string` | `undefined` | CSS class for layout integration |
| `style` | `CSSProperties` | `undefined` | Inline styles for layout integration |
| `alt` | `string` | `'DSL rendered content'` | Alt text for accessibility |

### How DslCanvas Works

1. Receives compiled DSL JSON as the `dsl` prop
2. If `slotOverrides` are provided, merges them into the DSL tree (replaces children of nodes matching slot names)
3. Sends the resolved DSL JSON to `/api/dsl-canvas/render` via POST
4. The server compiles and renders the DSL to a PNG, returning a base64 data URL
5. Displays the PNG as an `<img>` element with proper aspect ratio

### Wire Up App.tsx

```tsx
// preview/src/App.tsx
import { MyPage } from './pages/_generated/MyPage';

function App() {
  return <MyPage />;
}

export default App;
```

### Launch the Preview

```bash
cd preview && npm run dev
```

The dev server runs on port 5173 (with auto-port fallback). Vite's HMR updates the page instantly when you edit the DSL JSON or page layout.

## Step 5: Import into Figma

Open the Figma plugin and load or paste the `.figma.json` file. The plugin reads the `PluginInput` schema and creates the component on the target page.

See [Exporting to Figma](exporting-to-figma.md) for detailed import instructions and the three approach options (MCP, Plugin, Pipeline).

## Batch Export

To export multiple DSL files at once:

```bash
bin/figma-dsl batch examples/ -o output/ -p "Component Library"
```

This compiles and exports all `.dsl.ts` files in the directory, producing one merged `plugin-input.json` with all components.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `Invalid hex color: "[object Object]"` | Passing an RGB object to `solid()` | Use hex strings: `solid('#ff0000')` |
| `vertical is not a function` | Using `...vertical()` spread syntax | Use `autoLayout: vertical({...})` instead |
| `ERR_MODULE_NOT_FOUND` | Packages not built | Run `npm run build` from the project root |
| DslCanvas shows "DslCanvas" placeholder | Render API not available or DSL JSON invalid | Check that the DSL JSON has `type`, `name`, and `size` fields |
| DslCanvas shows "Loading..." indefinitely | `/api/dsl-canvas/render` endpoint not running | Ensure the render API server is running alongside the dev server |

## Example: Complete Walkthrough

```bash
# 1. Write DSL file
cat examples/dsl-canvas-sample.dsl.ts

# 2. Build packages (if not already built)
npm run build

# 3. Export to .figma.json
bin/figma-dsl export examples/dsl-canvas-sample.dsl.ts \
  -o output/dsl-canvas-sample.figma.json \
  -p "DslCanvas Showcase"

# 4. Verify the output
cat output/dsl-canvas-sample.figma.json | head -20

# 5. (Optional) Render to PNG for visual check
bin/figma-dsl render examples/dsl-canvas-sample.dsl.ts \
  -o output/dsl-canvas-sample.png

# 6. Start preview server (DslCanvas embedded in React page)
cd preview && npm run dev
```

## What's Next

- [DSL API Reference](../dsl-reference.md) — complete DSL node constructors, layout helpers, and styling API
- [Exporting to Figma](exporting-to-figma.md) — three approaches for getting components into Figma
- [Creating Components](creating-components.md) — scaffold new React components with DSL compatibility
- [Composing Pages](composing-pages.md) — build multi-section pages from existing components
- [@figma-dsl/exporter](../packages/exporter.md) — detailed exporter API and PluginNodeDef schema
