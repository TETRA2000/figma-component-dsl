# Figma Component DSL — Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [File Conventions](#file-conventions)
3. [Core API](#core-api)
   - [Node Constructors](#node-constructors)
   - [Layout Helpers](#layout-helpers)
   - [Fill & Stroke Builders](#fill--stroke-builders)
   - [Token System](#token-system)
   - [Component Properties](#component-properties)
4. [CLI Commands](#cli-commands)
   - [Validator Severity Presets](#validator-severity-presets)
   - [Compiler Validation Levels](#compiler-validation-levels)
5. [Figma Plugin Export](#figma-plugin-export)
   - [Single Component Export](#single-component-export)
   - [Page-Level Export (Multiple Sections)](#page-level-export-multiple-sections)
   - [Exported JSON Schema](#exported-json-schema)
6. [Authoring Patterns](#authoring-patterns)
   - [Helper Functions](#helper-functions)
   - [Section Layout Template](#section-layout-template)
   - [Common UI Patterns](#common-ui-patterns)
   - [Dark Theme Color Palette](#dark-theme-color-palette)
7. [Figma Plugin Constraints](#figma-plugin-constraints)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Figma Component DSL is a TypeScript-based domain-specific language for declaratively describing Figma design components. DSL files compile to an intermediate JSON representation and can be exported to Figma plugin-compatible JSON for direct import into Figma.

The pipeline is:

```
.dsl.ts source  →  compile  →  .json (intermediate)
                →  export   →  .figma.json (Figma plugin format)
                →  render   →  .png (visual preview)
```

## File Conventions

| Convention | Details |
|------------|---------|
| Extension | `.dsl.ts` |
| Location | `examples/` directory |
| Import | `from '@figma-dsl/core'` |
| Default export | A single root node (`frame(...)` or `component(...)`) |
| Naming | Kebab-case filenames: `feature-grid.dsl.ts`, `glass-card.dsl.ts` |

Example skeleton:

```ts
import {
  frame, text, rectangle,
  solid, gradient, radialGradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('SectionName', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 96 }),
  fills: [solid('#000000')],
  children: [
    // ...
  ],
});
```

---

## Core API

### Node Constructors

#### `frame(name, options)`

Creates an auto-layout container (Figma FRAME node). This is the primary building block for all layouts.

```ts
frame('Card', {
  size: { x: 320, y: undefined },
  autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
  fills: [solid('#111111')],
  cornerRadius: 16,
  strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' }],
  children: [
    text('Title', { fontSize: 18, fontWeight: 600, color: '#f5f5f7' }),
  ],
})
```

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| `size` | `{ x: number, y?: number }` | Width (required) and optional height |
| `autoLayout` | `horizontal(...)` \| `vertical(...)` | Auto-layout configuration |
| `fills` | `Fill[]` | Background fills |
| `strokes` | `Stroke[]` | Border strokes |
| `cornerRadius` | `number` | Border radius for all corners |
| `cornerRadii` | `{ topLeft, topRight, bottomLeft, bottomRight }` | Per-corner border radii (overrides `cornerRadius`) |
| `opacity` | `number` | 0–1 opacity |
| `visible` | `boolean` | Visibility toggle |
| `children` | `Node[]` | Child nodes |
| `clipContent` | `boolean` | Clip children that overflow the frame bounds |
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | Horizontal sizing mode |
| `layoutSizingVertical` | `'FIXED' \| 'HUG' \| 'FILL'` | Vertical sizing mode |

#### `text(content, options)`

Creates a text node with typography properties.

```ts
text('Hello World', {
  fontSize: 16,
  fontWeight: 600,
  color: '#f5f5f7',
  textAlignHorizontal: 'CENTER',
  lineHeight: { value: 150, unit: 'PERCENT' },
  letterSpacing: { value: -0.5, unit: 'PERCENT' },
})

// Constrained-width text that wraps automatically
text('Long description text that wraps at 228px width.', {
  fontSize: 13,
  color: '#6f6f6f',
  lineHeight: { value: 150, unit: 'PERCENT' },
  size: { x: 228 },
  textAutoResize: 'HEIGHT',
})
```

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| `fontSize` | `number` | Font size in pixels |
| `fontWeight` | `number` | Font weight (100–900) |
| `color` | `string` | Hex color shorthand (sets fills internally) |
| `textAlignHorizontal` | `'LEFT' \| 'CENTER' \| 'RIGHT'` | Horizontal text alignment |
| `textAutoResize` | `'NONE' \| 'WIDTH_AND_HEIGHT' \| 'HEIGHT'` | Text sizing mode. `HEIGHT` = fixed width (via `size.x`), auto height |
| `size` | `{ x: number, y?: number }` | Explicit size constraint. Used with `textAutoResize: 'HEIGHT'` for width-constrained wrapping |
| `lineHeight` | `{ value: number, unit: 'PERCENT' \| 'PIXELS' }` | Line height |
| `letterSpacing` | `{ value: number, unit: 'PERCENT' \| 'PIXELS' }` | Letter spacing |
| `textDecoration` | `'NONE' \| 'UNDERLINE' \| 'STRIKETHROUGH'` | Text decoration (underline or strikethrough) |
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | Horizontal sizing mode |

#### `ellipse(name, options)`

Creates an ellipse shape. Commonly used for circular indicators, status dots, and chart elements.

```ts
// Status dot
ellipse('StatusDot', {
  size: { x: 8, y: 8 },
  fills: [solid('#22c55e')],
})

// Chart donut ring (stroke-only circle)
ellipse('Ring', {
  size: { x: 120, y: 120 },
  fills: [],
  strokes: [{ color: hex('#7c3aed'), weight: 12, align: 'INSIDE' }],
})
```

**Options:** Same as `rectangle()` (see below).

#### `rectangle(name, options)`

Creates a rectangle shape. Commonly used for dividers, avatar placeholders, and icon backgrounds.

```ts
// Divider line
rectangle('Divider', {
  size: { x: 1, y: 1 },
  fills: [solid('#222222')],
})

// Circular avatar placeholder
rectangle('Avatar', {
  size: { x: 40, y: 40 },
  fills: [gradient([
    { hex: '#7c3aed', position: 0 },
    { hex: '#4f46e5', position: 1 },
  ], 135)],
  cornerRadius: 20,  // half of size = circle
})
```

**Options:**

| Property | Type | Description |
|----------|------|-------------|
| `size` | `{ x: number, y: number }` | Width and height (both required) |
| `fills` | `Fill[]` | Background fills |
| `cornerRadius` | `number` | Border radius (use half of size for circle) |
| `x` | `number` | Absolute X position (for non-auto-layout children) |
| `y` | `number` | Absolute Y position (for non-auto-layout children) |

#### `image(name, options)`

Creates an image node. Renders an image from a local file path or URL.

```ts
// Simple image
image('Logo', {
  src: './assets/logo.png',
  size: { x: 120, y: 40 },
})

// Image with rounded corners and fit mode
image('Avatar', {
  src: './assets/avatar.jpg',
  size: { x: 48, y: 48 },
  cornerRadius: 24,  // circle
  fit: 'FILL',
})
```

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | *(required)* | Image source — relative path, absolute path, or URL |
| `size` | `{ x: number, y: number }` | | Width and height |
| `fit` | `ImageScaleMode` | `'FILL'` | How the image fills its bounds |
| `cornerRadius` | `number` | | Border radius (use half of size for circle) |
| `opacity` | `number` | `1` | Opacity (0–1) |
| `visible` | `boolean` | `true` | Visibility |
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | | Horizontal sizing in auto-layout |
| `layoutSizingVertical` | `'FIXED' \| 'HUG' \| 'FILL'` | | Vertical sizing in auto-layout |

**ImageScaleMode values:** `'FILL'` (cover, may crop), `'FIT'` (contain, may letterbox), `'CROP'` (center crop), `'TILE'` (repeat pattern).

> **Note:** Use `--asset-dir` in CLI commands to set the base directory for resolving relative image paths. Supported formats: PNG, JPG, JPEG, WebP.

#### `component(name, options)`

Creates a Figma component node. Same options as `frame()` plus `componentProperties`.

```ts
component('GlassCard', {
  size: { x: 320, y: undefined },
  autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, widthSizing: 'FIXED', heightSizing: 'HUG' }),
  fills: [solid('#ffffff', 0.72)],
  cornerRadius: 16,
  componentProperties: [
    { name: 'Title', type: 'TEXT', defaultValue: 'Card Title' },
    { name: 'Description', type: 'TEXT', defaultValue: 'Description text' },
  ],
  children: [
    text('Card Title', { fontSize: 20, fontWeight: 600, color: '#1d1d1f' }),
  ],
})
```

#### `instance(componentName, overrides)`

Creates an instance of a named component. The referenced component must exist in the same import batch.

```ts
instance('Button', { Label: 'Sign Up' })
```

> **Warning:** See [Figma Plugin Constraints](#figma-plugin-constraints) for limitations.

#### `group(name, children)`

Creates a logical grouping without visual styling (no fills, strokes, or auto-layout).

```ts
group('Links', [
  navLink('Products'),
  navLink('Pricing'),
  navLink('Docs'),
])
```

---

### Layout Helpers

#### `horizontal(options)` / `vertical(options)`

Configure auto-layout direction with spacing, padding, and alignment.

```ts
autoLayout: horizontal({
  spacing: 24,           // Gap between children
  padX: 32,              // Horizontal padding (left + right)
  padY: 16,              // Vertical padding (top + bottom)
  align: 'SPACE_BETWEEN', // Primary axis alignment
  counterAlign: 'CENTER',  // Cross axis alignment
  widthSizing: 'FIXED',   // Width sizing mode
  heightSizing: 'HUG',    // Height sizing mode
})
```

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `spacing` | `number` | `0` | Gap between children (maps to `itemSpacing`) |
| `padX` | `number` | `0` | Horizontal padding (both sides) |
| `padY` | `number` | `0` | Vertical padding (both sides) |
| `align` | `'MIN' \| 'CENTER' \| 'MAX' \| 'SPACE_BETWEEN'` | `'MIN'` | Primary axis alignment |
| `counterAlign` | `'MIN' \| 'CENTER' \| 'MAX'` | `'MIN'` | Cross axis alignment |
| `widthSizing` | `'FIXED' \| 'HUG' \| 'FILL'` | — | How width is determined |
| `heightSizing` | `'FIXED' \| 'HUG' \| 'FILL'` | — | How height is determined |

**Alignment reference:**

| `align` value | `horizontal()` effect | `vertical()` effect |
|---------------|----------------------|---------------------|
| `'MIN'` | Pack left | Pack top |
| `'CENTER'` | Center horizontally | Center vertically |
| `'MAX'` | Pack right | Pack bottom |
| `'SPACE_BETWEEN'` | Distribute evenly with space between | Distribute evenly with space between |

| `counterAlign` value | `horizontal()` effect | `vertical()` effect |
|----------------------|----------------------|---------------------|
| `'MIN'` | Align children to top | Align children to left |
| `'CENTER'` | Vertically center children | Horizontally center children |
| `'MAX'` | Align children to bottom | Align children to right |

> **Common gotcha — `align` vs `counterAlign` in `vertical()` layouts:**
> - `align` controls the **vertical** (primary) axis — top/center/bottom/distribute
> - `counterAlign` controls the **horizontal** (cross) axis — left/center/right
>
> To horizontally center children in a vertical layout, use `counterAlign: 'CENTER'`, NOT `align: 'CENTER'`.
> `align: 'CENTER'` in vertical layouts centers children vertically (between top and bottom padding).

**Practical alignment examples:**

```ts
// Horizontally center a heading inside a vertical layout
frame('Header', {
  autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
  layoutSizingHorizontal: 'FILL',
  children: [
    text('Centered Title', { fontSize: 32, fontWeight: 700, color: '#fff' }),
  ],
})

// Push content to the bottom of a fixed-height container
frame('Poster', {
  size: { x: 230, y: 130 },
  autoLayout: vertical({ spacing: 4, padX: 8, padY: 8, align: 'MAX' }),
  fills: [gradient([...], 135)],
  children: [
    text('Title at bottom', { fontSize: 12, fontWeight: 600, color: '#fff' }),
  ],
})

// Push a CTA button to the bottom using FILL sizing on the middle section
frame('Card', {
  autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
  size: { x: 320, y: 480 },
  children: [
    text('Title', { fontSize: 20, fontWeight: 700, color: '#fff' }),
    frame('Features', {
      autoLayout: vertical({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',   // ← acts like CSS flex: 1
      children: [/* feature items */],
    }),
    frame('CTA', { /* button pinned to bottom */ }),
  ],
})
```

---

### Fill & Stroke Builders

#### `solid(hex, opacity?)`

Creates a solid color fill from a hex string. Optional opacity (0–1).

```ts
fills: [solid('#000000')]           // Opaque black
fills: [solid('#ffffff', 0.72)]     // 72% white (frosted glass effect)
```

#### `gradient(stops, angleDeg)`

Creates a linear gradient fill.

```ts
fills: [
  gradient([
    { hex: '#7c3aed', position: 0 },      // Start color
    { hex: '#6d28d9', position: 0.5 },     // Midpoint (optional)
    { hex: '#4f46e5', position: 1 },       // End color
  ], 135)  // Angle in degrees (135 = top-left to bottom-right)
]
```

**Angle convention (differs from CSS!):** Angles follow Figma's coordinate system:
- `0°` = left → right
- `90°` = bottom → top
- `180°` = right → left
- `270°` = top → bottom

> **Tip:** CSS `linear-gradient(180deg, ...)` (top→bottom) maps to DSL `gradient(stops, 270)`.

Gradient stops support 8-digit hex with alpha (e.g., `#FF000080` for 50% red). This is useful for semi-transparent overlays on top of other fills.

#### `radialGradient(stops, opts?)`

Creates a radial gradient fill.

```ts
fills: [
  radialGradient([
    { hex: '#ffffff', position: 0 },       // Center color
    { hex: '#000000', position: 1 },       // Edge color
  ], { center: { x: 0.5, y: 0.3 }, radius: 0.6 })
]
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `center` | `{ x: number, y: number }` | `{ x: 0.5, y: 0.5 }` | Center position (0–1 normalized) |
| `radius` | `number` | `0.5` | Gradient radius (0–1 normalized) |

**Stop format (shared by `gradient` and `radialGradient`):**

| Property | Type | Description |
|----------|------|-------------|
| `hex` | `string` | Color in hex format (6 or 8 digit, e.g., `#ff0000` or `#ff000080`) |
| `position` | `number` | Position along gradient (0–1) |

#### `imageFill(src, options?)`

Creates an image fill that can be applied to any node's `fills` array. Useful for adding background images to frames or rectangles.

```ts
// Background image on a frame
frame('Hero', {
  size: { x: 800, y: 400 },
  fills: [imageFill('./assets/hero-bg.jpg')],
  children: [
    text('Welcome', { fontSize: 32, color: '#ffffff' }),
  ],
})

// Tiled pattern fill
rectangle('Pattern', {
  size: { x: 200, y: 200 },
  fills: [imageFill('./assets/texture.png', { scaleMode: 'TILE' })],
})

// Multi-fill stacking: background image + gradient overlay
// (Use this instead of a separate overlay rectangle)
frame('Hero', {
  size: { x: 800, y: 300 },
  fills: [
    imageFill('./assets/hero-bg.jpg'),
    gradient([
      { hex: '#00000033', position: 0 },  // 20% black at top
      { hex: '#000000cc', position: 1 },  // 80% black at bottom
    ], 270),
  ],
  autoLayout: vertical({ widthSizing: 'FIXED', heightSizing: 'FIXED', align: 'MAX', padX: 32, padBottom: 32 }),
  children: [
    text('Heading', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
  ],
})
```

**Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scaleMode` | `ImageScaleMode` | `'FILL'` | How the image fills the node |
| `opacity` | `number` | `1` | Fill opacity (0–1) |

**ImageScaleMode values:** `'FILL'`, `'FIT'`, `'CROP'`, `'TILE'` (same as `image()` node).

#### `hex(colorStr)`

Converts a hex string to an RGBA color object. Used for inline stroke colors.

```ts
strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }]
```

#### Stroke format (no builder — inline object)

```ts
strokes: [{
  color: { r: 1, g: 1, b: 1, a: 0.06 },  // RGBA, 0–1 range
  weight: 1,                                // Stroke width in pixels
  align: 'INSIDE' | 'OUTSIDE' | 'CENTER',  // Stroke alignment
}]
```

---

### Token System

#### `defineTokens(map)`

Defines a named color palette for reuse across a DSL file.

```ts
const colors = defineTokens({
  bg: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  primary: '#7c3aed',
  border: '#e5e7eb',
});
```

#### `token(tokenMap, key)`

References a token value as a fill.

```ts
fills: [token(colors, 'bg')]
```

---

### Component Properties

Available for `component()` nodes only. Define configurable properties in Figma.

```ts
componentProperties: [
  { name: 'Title', type: 'TEXT', defaultValue: 'Card Title' },
  { name: 'Checked', type: 'BOOLEAN', defaultValue: false },
]
```

**Supported types on standalone `component()`:**

| Type | Description | `defaultValue` |
|------|-------------|----------------|
| `'TEXT'` | Editable text content | `string` |
| `'BOOLEAN'` | Toggle visibility/state | `boolean` |

> **Note:** `type: 'VARIANT'` is NOT valid on standalone components. The compiler will report an error and skip VARIANT properties. Use `componentSet()` instead (see below).

### Component Sets (Variants)

To create a component with Figma variants (e.g., size, style), use `componentSet()` with child `component()` nodes. Each child's name encodes its variant values using Figma's `Property=Value` naming convention.

```ts
import { component, componentSet, text } from '@figma-dsl/core';

function myVariant(style: string, size: string) {
  return component(`Style=${style}, Size=${size}`, {
    // Each child is a full component definition
    componentProperties: [
      { name: 'Label', type: 'TEXT', defaultValue: 'Click me' },
    ],
    children: [text('Click me', { fontSize: size === 'Large' ? 18 : 14 })],
  });
}

export default componentSet('Button', {
  children: [
    myVariant('Primary', 'Small'),
    myVariant('Primary', 'Large'),
    myVariant('Secondary', 'Small'),
    myVariant('Secondary', 'Large'),
  ],
});
```

Figma automatically creates variant properties (`Style`, `Size`) from the child component names. Use a helper function to generate all combinations:

```ts
const styles = ['Primary', 'Secondary'];
const sizes = ['Small', 'Medium', 'Large'];
const children = styles.flatMap(s => sizes.map(sz => myVariant(s, sz)));

export default componentSet('Button', { children });
```

**When to use `component()` vs `componentSet()`:**

| Scenario | Use |
|----------|-----|
| Single visual design, no variants | `component()` |
| Multiple visual variants (size, style, state) | `componentSet()` with child `component()` nodes |
| Configurable text/boolean props only | `component()` with `componentProperties` |

---

## CLI Commands

All commands use the `bin/figma-dsl` binary.

### `compile` — DSL source to intermediate JSON

```bash
bin/figma-dsl compile examples/navbar.dsl.ts -o output/navbar.json
```

| Parameter | Description |
|-----------|-------------|
| First argument | Path to `.dsl.ts` source file |
| `-o` | Output file path (**must be a file, not a directory**) |

### `export` — DSL source to Figma plugin JSON

```bash
bin/figma-dsl export examples/navbar.dsl.ts -o output/navbar.figma.json
```

| Parameter | Description |
|-----------|-------------|
| First argument | Path to `.dsl.ts` source file (**not** compiled JSON) |
| `-o` | Output file path for Figma plugin JSON |

> **Important:** Pass the `.dsl.ts` source file, not the compiled `.json`. Passing `.json` causes: `"Module needs import attribute of type: json"`.

> **Important:** The `--format` flag is not supported.

### `render` — Compiled JSON to PNG

```bash
bin/figma-dsl render output/navbar.json -o output/navbar.png
bin/figma-dsl render output/navbar.json -o output/navbar-debug.png --debug-layout
```

| Parameter | Description |
|-----------|-------------|
| First argument | Path to compiled `.json` file |
| `-o` | Output PNG file path |
| `--debug-layout` | Overlay layout debug info (frame borders, padding areas, computed sizes) |

### `compare` — Compare two rendered PNGs

```bash
bin/figma-dsl compare image-a.png image-b.png -t 85
```

| Parameter | Description |
|-----------|-------------|
| First argument | Path to first PNG |
| Second argument | Path to second PNG |
| `-t` | Similarity threshold percentage (e.g., 85 = 85% match required) |

Both images must have the same dimensions.

### `validate` — Check token compatibility

```bash
bin/figma-dsl validate examples/navbar.dsl.ts --check-tokens
```

#### Validator Severity Presets

The validator supports three severity presets that control how strictly rules are enforced:

| Preset | Description |
|--------|-------------|
| `strict` | All rules at original severity (default) |
| `normal` | Relaxes structural/boilerplate rules (`three-file`, `barrel-export` off; `css-modules`, `no-inline-style` downgraded to warning) |
| `loose` | Maximum flexibility — most rules off, only `image-refs` as warning |

**Programmatic usage:**

```ts
import { validateComponent } from '@figma-dsl/validator';

const result = await validateComponent('./components/Button', {
  preset: 'normal',
});
// result.skippedRules — rules turned off by preset
// result.preset — the preset that was applied
```

**Per-rule severity overrides** take priority over presets:

```ts
const result = await validateComponent('./components/Button', {
  preset: 'normal',
  severityOverrides: {
    'css-modules': 'error',    // escalate back to error
    'image-refs': 'off',       // turn off entirely
  },
});
```

Available severity levels: `'error'` | `'warning'` | `'off'`

#### Compiler Validation Levels

The compiler's `validateNode()` also supports three validation levels via `CompilerOptions.validationLevel`:

| Level | Behavior |
|-------|----------|
| `strict` | Current behavior — all checks are errors (default) |
| `normal` | `strokeWeight === 0` becomes a warning instead of error |
| `loose` | Negative `cornerRadius` and zero `fontSize` also become warnings instead of errors |

> **Note:** RGBA out-of-range and missing `imageSrc` are always errors regardless of level (Figma API hard constraints).

```ts
import { compile } from '@figma-dsl/compiler';

const result = compile(dslNode, { validationLevel: 'normal' });
// result.errors may now include items with severity: 'warning'
```

`CompileError` objects now include an optional `severity` field (`'error' | 'warning'`). Errors without an explicit severity should be treated as errors.

### Batch workflow

```bash
# Compile and export all DSL files
for f in examples/*.dsl.ts; do
  name=$(basename "$f" .dsl.ts)
  bin/figma-dsl compile "$f" -o "output/${name}.json"
  bin/figma-dsl export "$f" -o "output/${name}.figma.json"
done
```

---

## Figma Plugin Export

### Single Component Export

```bash
bin/figma-dsl export examples/glass-card.dsl.ts -o output/glass-card.figma.json
```

Import the resulting `.figma.json` file using the Figma plugin.

### Page-Level Export (Multiple Sections)

To import multiple sections as a single continuous page, merge individual exports into a parent frame:

```js
const fs = require('fs');

const sections = [
  'navbar', 'hero-section', 'feature-grid', 'stats-section',
  'testimonials-section', 'faq-section', 'footer-section'
];
const standalone = ['glass-card', 'toggle-switch', 'segmented-control'];

function getRoot(name) {
  const data = JSON.parse(fs.readFileSync(`output/${name}.figma.json`, 'utf-8'));
  return data.components ? data.components[0] : data;
}

const pageFrame = {
  type: 'FRAME',
  name: 'Landing Page',
  size: { x: 1440, y: undefined },
  opacity: 1,
  visible: true,
  children: sections.map(getRoot),
  fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 }, opacity: 1 }],
  stackMode: 'VERTICAL',
  itemSpacing: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  primaryAxisAlignItems: 'MIN',
  counterAxisAlignItems: 'CENTER',
  layoutMode: 'VERTICAL',
};

const merged = {
  schemaVersion: '1.0.0',
  targetPage: 'Landing Page',
  components: [pageFrame, ...standalone.map(getRoot)]
};

fs.writeFileSync('output/landing-page.figma.json', JSON.stringify(merged, null, 2));
```

### Exported JSON Schema

Each `.figma.json` file follows this structure:

```json
{
  "schemaVersion": "1.0.0",
  "targetPage": "Component Library",
  "components": [
    {
      "type": "FRAME",
      "name": "ComponentName",
      "size": { "x": 1440, "y": 720 },
      "opacity": 1,
      "visible": true,
      "children": [],
      "fills": [
        {
          "type": "SOLID",
          "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
          "opacity": 1
        }
      ],
      "stackMode": "VERTICAL",
      "itemSpacing": 48,
      "paddingLeft": 120,
      "paddingRight": 120,
      "paddingTop": 96,
      "paddingBottom": 96,
      "primaryAxisAlignItems": "CENTER",
      "counterAxisAlignItems": "CENTER",
      "layoutMode": "VERTICAL"
    }
  ]
}
```

**Node types in exported JSON:** `FRAME`, `TEXT`, `RECTANGLE`, `COMPONENT`, `INSTANCE`, `GROUP`

---

## Authoring Patterns

### Built-in Pattern Helpers

The `@figma-dsl/core` package includes pre-built pattern helpers for common UI elements. Import them alongside the core API:

```ts
import { card, badge, statBlock, navBar, sectionHeader, divider } from '@figma-dsl/core';
```

#### `card(name, opts?)`
Frame with `clipContent`, `cornerRadius`, and vertical layout.
```ts
card('ProductCard', { width: 300, cornerRadius: 16, spacing: 12, children: [...] })
```

#### `badge(label, bgColor?, textColor?, opts?)`
Pill-shaped frame (9999 radius) with centered text.
```ts
badge('NEW', '#7C3AED', '#FFFFFF', { fontSize: 11 })
```

#### `statBlock(value, label, opts?)`
Vertical frame with large value + small label.
```ts
statBlock('1,234', 'Users', { valueColor: '#1d1d1f' })
```

#### `navBar(brand, links, opts?)`
Horizontal SPACE_BETWEEN layout with brand text and nav links.
```ts
navBar('Acme', ['Products', 'Pricing', 'Docs'], { width: 1440 })
```

#### `sectionHeader(title, opts?)`
Padded frame with large title text.
```ts
sectionHeader('Features', { fontSize: 32, color: '#111827' })
```

#### `divider(color?, height?)`
Thin horizontal line spanning full width via `layoutSizingHorizontal: 'FILL'`.
```ts
divider('#E5E7EB')
```

### Custom Helper Functions

Extract repeated structures into TypeScript functions for reuse:

```ts
function featureCard(title: string, description: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid('#111111')],
    cornerRadius: 16,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('Icon', {
        size: { x: 40, y: 40 },
        fills: [gradient([
          { hex: '#7c3aed', position: 0 },
          { hex: '#4f46e5', position: 1 },
        ], 135)],
        cornerRadius: 20,
      }),
      text(title, { fontSize: 18, fontWeight: 600, color: '#f5f5f7' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#86868b',
        lineHeight: { value: 150, unit: 'PERCENT' },
      }),
    ],
  });
}
```

### Section Layout Template

Standard full-width section with centered content:

```ts
export default frame('SectionName', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({
    spacing: 48,
    padX: 120,
    padY: 96,
    align: 'CENTER',
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid('#000000')],
  children: [
    // Header (badge + heading)
    frame('Header', {
      autoLayout: vertical({ spacing: 16, align: 'CENTER' }),
      children: [
        // Badge
        // Heading
      ],
    }),
    // Main content
  ],
});
```

### Common UI Patterns

#### Badge (Pill Label)

```ts
frame('Badge', {
  autoLayout: horizontal({ padX: 16, padY: 6 }),
  fills: [solid('#1a1a2e')],
  cornerRadius: 999,
  strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 0.4 }, weight: 1, align: 'INSIDE' }],
  children: [
    text('Label', { fontSize: 13, fontWeight: 500, color: '#a78bfa' }),
  ],
})
```

#### Divider (Horizontal Line)

```ts
rectangle('Divider', {
  size: { x: 1, y: 1 },
  fills: [solid('#222222')],
})
```

> **Tip:** Use `layoutSizingHorizontal: 'FILL'` on dividers so they stretch to fill their parent's width in Figma.

#### Card with Subtle Border

```ts
frame('Card', {
  autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
  fills: [solid('#111111')],
  cornerRadius: 16,
  strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' }],
  children: [/* ... */],
})
```

#### Primary CTA Button (Gradient)

```ts
frame('PrimaryCTA', {
  autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [gradient([
    { hex: '#7c3aed', position: 0 },
    { hex: '#6d28d9', position: 0.5 },
    { hex: '#4f46e5', position: 1 },
  ], 135)],
  cornerRadius: 999,
  children: [
    text('Get Started', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
  ],
})
```

#### Secondary CTA Button (Outlined)

```ts
frame('SecondaryCTA', {
  autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
  cornerRadius: 999,
  strokes: [{ color: { r: 0.53, g: 0.53, b: 0.55, a: 1 }, weight: 1, align: 'INSIDE' }],
  children: [
    text('Learn More', { fontSize: 16, fontWeight: 600, color: '#f5f5f7' }),
  ],
})
```

#### Circular Avatar Placeholder

```ts
rectangle('Avatar', {
  size: { x: 40, y: 40 },
  fills: [gradient([
    { hex: '#7c3aed', position: 0 },
    { hex: '#4f46e5', position: 1 },
  ], 135)],
  cornerRadius: 20,
})
```

#### Invisible Spacer

Use a zero-opacity rectangle to add vertical space inside auto-layout frames (useful when you can't use padding alone):

```ts
rectangle('Spacer', { size: { x: 1, y: 40 }, opacity: 0 })
```

#### Progress Bar

```ts
frame('ProgressTrack', {
  size: { x: 300, y: 4 },
  fills: [solid('#5a5a5a')],
  cornerRadius: 2,
  clipContent: true,
  autoLayout: horizontal({ spacing: 0 }),
  children: [
    rectangle('ProgressFill', {
      size: { x: 180, y: 4 },  // width = track width × percentage
      fills: [solid('#e50914')],
    }),
  ],
})
```

#### Thumbnail Card with Gradient Background

```ts
frame('Thumbnail', {
  size: { x: 230, y: 130 },
  fills: [gradient([
    { hex: '#4a2a0a', position: 0 },
    { hex: '#1a0a00', position: 1 },
  ], 135)],
  autoLayout: vertical({ spacing: 4, padX: 8, padY: 8, align: 'MAX' }),
  cornerRadius: 4,
  clipContent: true,
  children: [
    text('Title', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
  ],
})
```

#### Metadata Badge with Stroke Border

```ts
frame('Badge: 16+', {
  autoLayout: horizontal({ padX: 6, padY: 1, align: 'CENTER', counterAlign: 'CENTER' }),
  strokes: [{ color: { r: 0.5, g: 0.5, b: 0.5, a: 1 }, weight: 1, align: 'INSIDE' }],
  cornerRadius: 2,
  children: [
    text('16+', { fontSize: 11, fontWeight: 600, color: '#bcbcbc' }),
  ],
})
```

#### SPACE_BETWEEN Row (e.g., Navbar, Copyright)

```ts
frame('Row', {
  autoLayout: horizontal({
    spacing: 0,
    align: 'SPACE_BETWEEN',
    counterAlign: 'CENTER',
  }),
  children: [
    // Left content
    // Right content
  ],
})
```

#### Frosted Glass Effect

```ts
component('GlassCard', {
  fills: [solid('#ffffff', 0.72)],
  cornerRadius: 16,
  strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.18 }, weight: 1, align: 'INSIDE' }],
  // ...
})
```

### Dark Theme Color Palette

Apple-style dark theme colors used across the landing page:

| Purpose | Hex | RGBA (0–1) |
|---------|-----|------------|
| Page background | `#000000` | `{ r: 0, g: 0, b: 0, a: 1 }` |
| Footer background | `#0a0a0a` | — |
| Card background | `#111111` | — |
| Card border | — | `{ r: 1, g: 1, b: 1, a: 0.06 }` |
| Primary text | `#f5f5f7` | — |
| Secondary text | `#86868b` | — |
| Tertiary text | `#555555` | — |
| Quote text | `#d1d1d6` | — |
| Accent purple | `#a78bfa` | — |
| Gradient start | `#7c3aed` | — |
| Gradient mid | `#6d28d9` | — |
| Gradient end | `#4f46e5` | — |
| Badge background | `#1a1a2e` | — |
| Badge border | — | `{ r: 0.49, g: 0.23, b: 0.93, a: 0.4 }` |
| Divider | `#222222` | — |

---

## Figma Plugin Constraints

These are critical limitations of the Figma Plugin API that affect how DSL files must be authored for successful import.

### ~~1. `layoutSizingHorizontal: 'FILL'` — FIXED~~

This was previously broken because the plugin set `layoutSizingHorizontal` before calling `parent.appendChild()`. The plugin now splits auto-layout setup into two phases: `setAutoLayoutConfig()` (own layout mode, called before appendChild) and `setLayoutSizing()` (sizing within parent, called after appendChild). **`FILL` is now fully supported** for both `layoutSizingHorizontal` and `layoutSizingVertical`.

### 2. `type: 'VARIANT'` only works on component sets

**Error:** `"Can only add variant property to a component set"`

**Cause:** The Figma Plugin API restricts VARIANT-type component properties to component sets (collections of variants), not standalone components.

**Solution:** Only use `type: 'TEXT'` and `type: 'BOOLEAN'` in `componentProperties` for standalone components. If you need variant support, the component must be part of a component set.

> **Note:** The exporter now automatically strips VARIANT properties from standalone COMPONENT nodes during export, and the plugin skips them during import. DSL files with VARIANT properties on standalone components will export and import without errors, but the VARIANT properties will be silently removed.

```ts
// Bad — fails on standalone component
componentProperties: [
  { name: 'Size', type: 'VARIANT', defaultValue: 'Medium', options: ['Small', 'Medium', 'Large'] },
]

// Good — works on standalone component
componentProperties: [
  { name: 'Title', type: 'TEXT', defaultValue: 'Card Title' },
  { name: 'Checked', type: 'BOOLEAN', defaultValue: false },
]
```

### ~~2b. `componentPropertyDefinitions` on variant children — FIXED~~

**Error:** `"Can only get component property definitions of a component set or non-variant component"`

**Cause:** After `combineAsVariants()`, child COMPONENT nodes become "variant components". Figma's Plugin API does not allow reading `componentPropertyDefinitions` from variant components — this property is only accessible on the parent COMPONENT_SET or standalone COMPONENTs.

**Fix:** The plugin serializer (`serializeNode()`) now checks `node.parent?.type === 'COMPONENT_SET'` and skips `componentPropertyDefinitions` for variant children. Component property definitions are instead read from the COMPONENT_SET node itself, where `combineAsVariants()` promotes them.

### 3. `instance()` requires the component in the same import

**Error:** `"Component not found for instance: ComponentName"`

**Cause:** The plugin resolves instance references within the current import scope. External components are not available.

**Solution:** Replace `instance()` with an inline `frame()` that replicates the visual appearance.

```ts
// Bad — references external component
instance('Button', { Label: 'Sign Up' })

// Good — inline frame
frame('Button', {
  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [solid('#7c3aed')],
  cornerRadius: 9999,
  children: [
    text('Sign Up', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
  ],
})
```

### 4. Sections import as separate frames

**Cause:** Each top-level entry in the `components` array becomes an independent frame on the Figma canvas.

**Solution:** Wrap sections in a parent frame with vertical auto-layout in the merged JSON. See [Page-Level Export](#page-level-export-multiple-sections).

---

## Known Pipeline Limitations

These are limitations of the DSL pipeline itself (compiler/renderer), distinct from the Figma Plugin constraints above.

| Limitation | Description | Workaround |
|------------|-------------|------------|
| No absolute positioning in auto-layout | DSL auto-layout does not support overlapping children like CSS `position: absolute`. | Use invisible spacers (`opacity: 0` rectangles) to push content, or use separate stacked frames. |
| Gradient angle differs from CSS | DSL gradient angles follow Figma convention (0°=L→R, 90°=B→T, 270°=T→B), not CSS convention (180deg=T→B). | See gradient angle convention table in Fill & Stroke Builders section. |
| No shadow/blur effects | Drop shadows, inner shadows, and blur effects are not supported. | Use layered frames with gradient fills to approximate shadow effects. |
| No dashed/dotted strokes | Stroke dash patterns are not supported. | Use rectangles as visual separators. |
| CJK font coverage | CJK text uses Noto Sans JP; other CJK scripts (Chinese, Korean) may render with fallback glyphs. | Stick to Japanese text for best results. |

### Resolved Limitations

These limitations from earlier versions have been fixed:

| Previously | Resolution |
|------------|------------|
| ~~No per-stop gradient alpha~~ | 8-digit hex (`#rrggbbaa`) is supported in gradient stops. Renderer now correctly applies per-stop alpha (fixed `rgbaToString` defaulting to alpha=1). |
| ~~Single stroke only~~ | Multiple strokes are now rendered (layered in order). |
| ~~Stroke alignment ignored~~ | `INSIDE`, `CENTER`, and `OUTSIDE` alignment are now implemented. |
| ~~No radial gradients~~ | `radialGradient()` is now supported. |
| ~~Inter font only~~ | CJK text is auto-detected and rendered using Noto Sans JP. |
| ~~No canvas reuse~~ | Canvas pooling (`acquireCanvas`/`releaseCanvas`) is now used in batch operations. |
| ~~No text decoration~~ | `textDecoration: 'UNDERLINE' \| 'STRIKETHROUGH'` is now supported. |
| ~~No compiler validation~~ | `validateNode()` now checks cornerRadius, RGBA bounds, strokeWeight, fontSize. Supports configurable `validationLevel` (`strict`/`normal`/`loose`) via `CompilerOptions`. |

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `EISDIR: illegal operation on a directory` | `-o` flag points to a directory | Use a full file path: `-o output/name.json` |
| `Module needs import attribute of type: json` | Passed compiled `.json` to `export` | Use the `.dsl.ts` source file instead |
| `Unknown option '--format'` | `--format` flag not supported | Remove `--format plugin` from the command |
| `FILL can only be set on children of auto-layout frames` | Plugin version too old | Update plugin — this was fixed by splitting setAutoLayout into config + sizing phases |
| `Can only add variant property to a component set` | `type: 'VARIANT'` on standalone component | Now auto-filtered by exporter and plugin; use `type: 'TEXT'` or `type: 'BOOLEAN'` for clarity |
| `Component not found for instance: X` | `instance()` referencing missing component | Replace with inline `frame()` |
| Sections scattered on canvas | No parent wrapper in merged JSON | Wrap sections in a parent FRAME with vertical layout |
| Dividers are 1x1 px | Missing `layoutSizingHorizontal: 'FILL'` | Add `layoutSizingHorizontal: 'FILL'` to the divider rectangle |

---

## File Locations

| Path | Description |
|------|-------------|
| `examples/*.dsl.ts` | DSL source files |
| `output/*.json` | Compiled intermediate JSON |
| `output/*.figma.json` | Figma plugin-compatible JSON |
| `output/MacOSLanding-page.figma.json` | Merged page-level export |
| `preview/src/components/*/` | React component implementations |
| `preview/src/pages/` | Page compositions |
| `bin/figma-dsl` | CLI binary |
| `.claude/skills/` | Claude Code skill definitions |
