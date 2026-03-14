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
  solid, gradient,
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
| `opacity` | `number` | 0–1 opacity |
| `visible` | `boolean` | Visibility toggle |
| `children` | `Node[]` | Child nodes |
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | Horizontal sizing mode (see [constraints](#figma-plugin-constraints)) |
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
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | Horizontal sizing mode |

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

**Stop format:**

| Property | Type | Description |
|----------|------|-------------|
| `hex` | `string` | Color in hex format |
| `position` | `number` | Position along gradient (0–1) |

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

**Supported types:**

| Type | Description | `defaultValue` |
|------|-------------|----------------|
| `'TEXT'` | Editable text content | `string` |
| `'BOOLEAN'` | Toggle visibility/state | `boolean` |
| `'VARIANT'` | Variant selector | `string` with `options: string[]` |

> **Warning:** `type: 'VARIANT'` only works on **component sets** (groups of variants), NOT on standalone components. See [Figma Plugin Constraints](#figma-plugin-constraints).

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
```

### `validate` — Check token compatibility

```bash
bin/figma-dsl validate examples/navbar.dsl.ts --check-tokens
```

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

### Helper Functions

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

> **Note:** Without `layoutSizingHorizontal: 'FILL'`, dividers import as 1x1 px in Figma. This is a known trade-off due to plugin constraints. Manually stretch them in Figma after import, or set an explicit width matching the parent.

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

### 1. `layoutSizingHorizontal: 'FILL'` is not supported

**Error:** `"FILL can only be set on children of auto-layout frames"`

**Cause:** The Figma plugin creates nodes top-down. When setting `layoutSizingHorizontal: 'FILL'` on a child node, its parent's auto-layout has not yet been configured. This fails at every nesting level, not just the root.

**Solution:** Never use `layoutSizingHorizontal: 'FILL'` (or `layoutSizingVertical: 'FILL'`) in any DSL file intended for Figma plugin export. Use explicit `size` values instead, or rely on parent auto-layout defaults.

**Affected patterns:**
- Cards inside grid rows (feature cards, stat cards, testimonial cards)
- FAQ items and dividers inside lists
- Text nodes that should stretch to fill parent width
- Any child frame meant to fill its parent

### 2. `type: 'VARIANT'` only works on component sets

**Error:** `"Can only add variant property to a component set"`

**Cause:** The Figma Plugin API restricts VARIANT-type component properties to component sets (collections of variants), not standalone components.

**Solution:** Only use `type: 'TEXT'` and `type: 'BOOLEAN'` in `componentProperties` for standalone components. If you need variant support, the component must be part of a component set.

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

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `EISDIR: illegal operation on a directory` | `-o` flag points to a directory | Use a full file path: `-o output/name.json` |
| `Module needs import attribute of type: json` | Passed compiled `.json` to `export` | Use the `.dsl.ts` source file instead |
| `Unknown option '--format'` | `--format` flag not supported | Remove `--format plugin` from the command |
| `FILL can only be set on children of auto-layout frames` | `layoutSizingHorizontal: 'FILL'` used | Remove all `layoutSizingHorizontal: 'FILL'` |
| `Can only add variant property to a component set` | `type: 'VARIANT'` on standalone component | Use `type: 'TEXT'` or `type: 'BOOLEAN'` only |
| `Component not found for instance: X` | `instance()` referencing missing component | Replace with inline `frame()` |
| Sections scattered on canvas | No parent wrapper in merged JSON | Wrap sections in a parent FRAME with vertical layout |
| Dividers are 1x1 px | No `layoutSizingHorizontal: 'FILL'` (can't use it) | Set explicit width or manually adjust in Figma |

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
