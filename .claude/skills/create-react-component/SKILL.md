---
name: create-react-component
description: >
  Create new React components with live preview and automatic DSL validation.
  Use this skill whenever the user wants to create any kind of UI component,
  widget, element, or building block — buttons, cards, modals, forms, inputs,
  badges, alerts, or any custom component. Supports dual preview: React dev
  server rendering and DSL-rendered PNG for Figma comparison. Automatically
  validates DSL compatibility and iterates until the component passes all
  checks. Also trigger when the user asks to scaffold, design, or prototype
  a component, even if they just describe what it should look like without
  using the word "component". Also trigger when the user provides a reference
  website URL and wants to extract or replicate a specific component from it.
  Covers: "create a component", "new component", "build a button", "design a
  card", "scaffold component", "make a widget", "I need a dropdown", "add a
  tooltip component", "make a component like this one on [URL]".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create React Component

Generate React components with CSS Modules and Code Connect bindings, validate DSL compatibility, and preview in dual mode (React dev server + DSL-rendered PNG).

## Workflow

### Step 0: Reference Website Analysis (if URL provided)

If the user provides a reference website URL (e.g., "build a card like the one on https://example.com" or "replicate this component from [URL]"), use Playwright MCP tools to capture the component's design before coding.

#### 0a. Navigate and capture

```
mcp__playwright__browser_navigate  → URL
mcp__playwright__browser_snapshot  → accessibility tree for structure/content
mcp__playwright__browser_take_screenshot  → full page or specific element screenshot
```

If the user points to a specific component, use the element ref from the snapshot to take a targeted screenshot:
```
mcp__playwright__browser_take_screenshot  → element: "the card component", ref: "e42"
```

#### 0b. Extract component styles

Use `mcp__playwright__browser_evaluate` to extract computed styles from the target element. Adapt the selector to match the component:

```js
(el) => {
  const cs = getComputedStyle(el);
  return {
    bg: cs.backgroundColor, color: cs.color,
    fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
    padding: cs.padding, margin: cs.margin,
    borderRadius: cs.borderRadius, border: cs.border,
    boxShadow: cs.boxShadow, gap: cs.gap,
    display: cs.display, flexDirection: cs.flexDirection,
    width: cs.width, height: cs.height,
  };
}
```

Run this on the target element ref, or use a CSS selector via page-level evaluate.

#### 0c. Use findings to guide component creation

From the screenshot, snapshot, and extracted styles, determine:
- **Visual properties** — colors, border radius, shadows, spacing, typography
- **Layout** — flex direction, gap, alignment, padding
- **Content structure** — what child elements exist, their hierarchy
- **Variants** — if multiple variations are visible, capture each

Use these extracted values as the basis for CSS Module styles and component structure. Then proceed to Step 1 as usual.

### Step 1: Load References

Read these files to understand constraints and available patterns:

```
.claude/skills/shared/references/component-registry.md
.claude/skills/shared/references/design-tokens.md
.claude/skills/create-react-component/references/component-constraints.md
```

If shared references do not exist yet, scan `preview/src/components/` to understand existing patterns. Read at least one existing component (e.g., `Button/Button.tsx`, `Button/Button.module.css`, `Button/Button.figma.tsx`) as a reference.

### Step 2: Plan the Component

From the user's request, determine:

- **Component name** — PascalCase (e.g., `AlertBanner`, `ProgressBar`)
- **Variants** — Visual variants (e.g., `'info' | 'warning' | 'error' | 'success'`)
- **Sizes** — Size options if applicable (e.g., `'sm' | 'md' | 'lg'`)
- **Props** — All props with types, defaults, and descriptions
- **Children** — Whether the component accepts children
- **HTML element** — Base element to extend (e.g., `HTMLDivElement`, `HTMLButtonElement`)

### Step 3: Generate Component Files

Create a 3-file component at `preview/src/components/_generated/{ComponentName}/`:

#### 3a. `{ComponentName}.tsx` — React component

Follow this structure:
```tsx
import type { ReactNode, HTMLAttributes } from 'react';
import styles from './{ComponentName}.module.css';

type Variant = 'primary' | 'secondary';  // customize per component
type Size = 'sm' | 'md' | 'lg';

interface {ComponentName}Props extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function {ComponentName}({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: {ComponentName}Props) {
  const cls = [
    styles.root,
    styles[variant],
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
```

Key rules:
- Named export, not default
- Extend appropriate HTML attributes interface
- Spread remaining props onto root element
- Use CSS Modules with `styles` import
- Class composition via array filter/join pattern
- Default values for variant/size props

#### 3b. `{ComponentName}.module.css` — CSS Module

Follow this structure:
```css
.root {
  /* Base styles using design tokens */
  font-family: var(--font-sans);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

/* Sizes */
.sm { /* ... */ }
.md { /* ... */ }
.lg { /* ... */ }

/* Variants */
.primary { /* ... */ }
.secondary { /* ... */ }
```

Key rules:
- Always use design token CSS variables (from `tokens.css`)
- Use `.root` for the base class (not the component name)
- Organize: base styles, then sizes, then variants
- Support dark mode via `@media (prefers-color-scheme: dark)` where appropriate
- Use spacing tokens: `var(--space-1)` through `var(--space-16)`
- Use color tokens: `var(--text-primary)`, `var(--bg-secondary)`, etc.

#### 3c. `{ComponentName}.figma.tsx` — Code Connect binding

Follow this structure:
```tsx
import figma from '@figma/code-connect';
import { ComponentName } from './{ComponentName}';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(ComponentName, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <ComponentName variant={props.variant} size={props.size}>
      {props.label}
    </ComponentName>
  ),
});
```

Key rules:
- Use `PLACEHOLDER` as Figma URL (user updates after import)
- Map each variant/size to a `figma.enum`
- Map text props to `figma.string`
- Map boolean props to `figma.boolean`
- The example should demonstrate typical usage

### Step 4: Validate DSL Compatibility

Run the figma-dsl validator:

```bash
bin/figma-dsl validate preview/src/components/_generated/{ComponentName}/{ComponentName}.tsx
```

If validation fails:
1. Read the error output
2. Fix the identified issues in the component files
3. Re-run validation
4. Repeat until all checks pass (max 3 iterations)

Common validation fixes:
- Missing prop defaults
- Incorrect token usage
- Missing CSS Module class references

### Step 5: Launch React Preview

Use the preview-app configuration from `.claude/launch.json`:

```bash
cd preview && npm run dev
```

Create a quick preview page or update `App.tsx` to render the new component with sample props.

### Step 6: DSL Preview (Optional)

For DSL-rendered PNG comparison:

```bash
bin/figma-dsl compile preview/src/components/_generated/{ComponentName}/{ComponentName}.tsx -o output/
bin/figma-dsl render output/{ComponentName}.json -o output/{ComponentName}.png
```

This produces a PNG rendering of how the component will look in Figma.

### Step 6b: Using Shape Primitives in Components

The DSL supports geometric shape primitives that can be used in component DSL files. When the component design includes geometric shapes, dividers, or composite icons, use the appropriate DSL factory instead of approximating with rectangles or images:

| Visual element | DSL factory | Example |
|---|---|---|
| Horizontal divider / separator | `line()` | `line('Divider', { size: { x: 200 }, strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1 }] })` |
| Badge / hex shape / triangle | `polygon()` | `polygon('Hex', { pointCount: 6, size: { x: 40, y: 40 }, fills: [solid('#3498DB')] })` |
| Star rating / decorative star | `star()` | `star('Rating', { pointCount: 5, size: { x: 24, y: 24 }, fills: [solid('#F1C40F')] })` |
| Icon with cutout / composite shape | `subtract()`, `union()`, `intersect()`, `exclude()` | `subtract('Icon', { children: [ellipse('Circle', { size: { x: 40, y: 40 } }), rectangle('Bar', { size: { x: 20, y: 4 } })] })` |
| Organizational section (Figma only) | `section()` | `section('Group', { size: { x: 400, y: 300 }, children: [...] })` |

Import these from `@figma-dsl/core`:
```ts
import { line, polygon, star, subtract, union, intersect, exclude, section } from '@figma-dsl/core';
```

**Validation note**: When components use inline `<svg>`, `<polygon>`, `<line>`, or `<clipPath>` elements, or CSS `border-bottom` for dividers, the DSL validator recognizes these as valid DSL-compatible patterns.

### Step 6c: Create DSL File for Figma Export (if component has variants)

If the component has `variant`, `size`, or similar visual variant props, create a DSL file at `output/{ComponentName}.dsl.ts` using `componentSet()` instead of `component()`. Figma requires a COMPONENT_SET to support variant properties.

```ts
import { component, componentSet, frame, text, solid, horizontal, vertical } from '@figma-dsl/core';

// Helper to build one variant combination
function myVariant(variant: string, size: string) {
  return component(`Variant=${variant}, Size=${size}`, {
    size: { x: sizeMap[size].width, y: undefined },
    autoLayout: vertical({ spacing: 0, widthSizing: 'FIXED', heightSizing: 'HUG' }),
    // Vary visual properties based on variant/size
    componentProperties: [
      { name: 'Label', type: 'TEXT', defaultValue: 'Text' },
    ],
    children: [/* ... */],
  });
}

// Generate all combinations
const variants = ['Default', 'Active'];
const sizes = ['Small', 'Medium', 'Large'];
const children = variants.flatMap(v => sizes.map(s => myVariant(v, s)));

export default componentSet('ComponentName', { children });
```

Key rules:
- Child component names **must** use `Property=Value, Property=Value` format
- Only use `type: 'TEXT'` and `type: 'BOOLEAN'` in `componentProperties` — never `type: 'VARIANT'`
- Vary the visual design between variants (width, colors, borders, font sizes)
- Use a helper function + `flatMap` to generate all variant × size combinations

If the component has **no variants** (just text/boolean props), use a standalone `component()` instead.

### Step 7: Register the Component

Append the new component export to `preview/src/components/_generated.ts` (create this file if it doesn't exist):

```ts
export { ComponentName } from './_generated/ComponentName/ComponentName';
```

Do **not** modify `preview/src/components/index.ts` — that file is reserved for reference exports only. If the component defines new shared types, add them to `preview/src/components/types.ts`.

## Template Files

The `assets/` directory contains starter templates with placeholder variables:
- `Component.tsx.template` — React component scaffold
- `Component.module.css.template` — CSS Module scaffold
- `Component.figma.tsx.template` — Code Connect scaffold

Use these as starting points and customize based on the user's requirements.

## Tips

- Always check existing components first to avoid duplicating functionality
- Match the styling patterns of existing components for consistency
- Use the `Container` component for layout wrapping when building section-level components
- Prefer composition over complexity — small, focused components are easier to maintain
- Test with multiple variants and sizes before declaring the component complete
