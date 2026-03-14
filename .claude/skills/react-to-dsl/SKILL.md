---
name: react-to-dsl
description: Generate Figma Component DSL definitions from React components
---

# React-to-DSL Generation

Convert React component source files into Figma Component DSL definitions (`.dsl.ts`) and Code Connect stubs (`.figma.tsx`).

## Supported Patterns

### Layout and Styling
- **CSS Modules with design tokens** -- `.module.css` files using CSS custom properties (`var(--token-name)`)
- **Flexbox layout** -- `flex-direction`, `gap`, `padding`, `align-items`, `justify-content`
- **CSS Grid** -- basic grids only (single-level `grid-template-columns`/`grid-template-rows`)

### Component Props
- **Variant props** -- union type props such as `variant: 'primary' | 'secondary'`
- **Boolean props** -- e.g. `disabled`, `fullWidth`, `loading`
- **String content props** -- e.g. `label`, `title`, `description`
- **Array data props via `.map()`** -- generate a representative child for the first item, up to 3 items rendered

### Composition Limits
- Up to **3 composition levels** (component nesting depth)
- Up to **15 nested elements** total per component

## Unsupported Pattern Handling

| Pattern | Action |
|---------|--------|
| Absolute/fixed positioning (`position: absolute\|fixed`) | Add `// TODO: absolute/fixed positioning not supported` comment and skip the element |
| CSS animations, transitions, hover states | Generate the **default state only**; ignore `:hover`, `:focus`, `@keyframes`, `transition` |
| Responsive breakpoints (`@media`) | Use a single viewport of **1200px**; ignore all media queries |
| Dynamic state (`useState`, `useEffect`, `useReducer`) | Use **initial state values** only (the argument to `useState()`) |
| Third-party UI libraries (e.g. MUI, Chakra, Radix) | Report as unsupported in a comment and skip; do not attempt to map |

## Generation Workflow

### Step 1: Read source files

1. Read the `.tsx` source file for the target component.
2. Read companion files if they exist:
   - `ComponentName.module.css` -- CSS module styles
   - `types.ts` or `ComponentName.types.ts` -- TypeScript prop definitions
   - `tokens.css` or design token files -- CSS custom property definitions

### Step 2: Classify patterns

Scan the component for:
- Layout strategy (flexbox, grid, or static)
- Prop types (variant unions, booleans, strings, arrays)
- Composition depth (nested components or elements)
- Unsupported patterns (see table above)

### Step 3: Map JSX elements to DSL calls

| JSX Element | DSL Call |
|-------------|----------|
| `<div>`, `<section>`, `<header>`, `<footer>`, `<nav>`, `<main>`, `<article>` | `createFrame()` |
| Text content (string children, `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>`) | `await createText()` |
| `<img>`, `<svg>`, icon components | `createRectangle()` as placeholder |

### Step 4: Resolve CSS custom properties

Map CSS `var(--token-name)` references to `solidPaint()` calls. If a `tokens.css` or token map exists, use `defineTokens()` and `tokenPaint()` for named constants.

### Step 5: Map flexbox to setAutoLayout()

| CSS Property | DSL `AutoLayoutOptions` |
|---|---|
| `flex-direction: row` | `direction: 'HORIZONTAL'` |
| `flex-direction: column` | `direction: 'VERTICAL'` |
| `gap: 8px` | `spacing: 8` |
| `padding: 16px` | `padX: 16, padY: 16` |
| `padding: 8px 16px` | `padX: 16, padY: 8` |
| `align-items: center` | `counterAlign: 'CENTER'` |
| `align-items: flex-start` | `counterAlign: 'MIN'` |
| `align-items: flex-end` | `counterAlign: 'MAX'` |
| `justify-content: center` | `align: 'CENTER'` |
| `justify-content: flex-start` | `align: 'MIN'` |
| `justify-content: flex-end` | `align: 'MAX'` |
| `justify-content: space-between` | `align: 'SPACE_BETWEEN'` |

### Step 6: Map typography to text node properties

Set these on the `DslTextNode` returned by `await createText()`:

| CSS | Text Node Property |
|---|---|
| `font-size: 14px` | `fontSize = 14` |
| `font-weight: 600` | `fontWeight = 600` |
| `font-family: 'Inter'` | `fontFamily = 'Inter'` |
| `line-height: 1.5` | `lineHeight = { value: 150, unit: 'PERCENT' }` |
| `line-height: 20px` | `lineHeight = { value: 20, unit: 'PIXELS' }` |
| `letter-spacing: 0.5px` | `letterSpacing = { value: 0.5, unit: 'PIXELS' }` |
| `text-align: center` | `textAlignHorizontal = 'CENTER'` |

### Step 7: Generate variant COMPONENT_SET

When the component has variant props (union types), generate one `createComponent()` per variant combination and combine them with `combineAsVariants()`:

```ts
const primaryComp = api.createComponent();
primaryComp.name = 'Variant=primary';
// ... build primary variant tree

const secondaryComp = api.createComponent();
secondaryComp.name = 'Variant=secondary';
// ... build secondary variant tree

const componentSet = api.combineAsVariants([primaryComp, secondaryComp]);
componentSet.name = 'Button';
```

### Step 8: Generate boolean properties

For boolean props, use `addComponentProperty()`:

```ts
component.addComponentProperty('disabled', 'BOOLEAN', false);
component.addComponentProperty('fullWidth', 'BOOLEAN', false);
```

### Step 9: Generate representative array children

For props rendered via `.map()`, generate only the first item as a representative child. If the source renders up to N items, include up to 3 in the DSL output.

### Step 10: Output files

Generate two files:

1. **`ComponentName.dsl.ts`** -- the DSL definition
2. **`ComponentName.figma.tsx`** -- the Code Connect stub

## CSS-to-DSL Mapping Reference

| CSS | DSL |
|-----|-----|
| `flex-direction: row` | `direction: 'HORIZONTAL'` |
| `flex-direction: column` | `direction: 'VERTICAL'` |
| `gap: 8px` | `spacing: 8` |
| `padding: 16px` | `padX: 16, padY: 16` |
| `padding: 8px 16px` | `padX: 16, padY: 8` |
| `align-items: center` | `counterAlign: 'CENTER'` |
| `justify-content: center` | `align: 'CENTER'` |
| `justify-content: space-between` | `align: 'SPACE_BETWEEN'` |
| `background-color: var(--primary)` | `fills: [solidPaint(tokens.primary)]` |
| `border-radius: 8px` | `cornerRadius: 8` |
| `font-size: 14px` | `fontSize: 14` |
| `font-weight: 600` | `fontWeight: 600` |

## Code Connect Stub Generation

The `.figma.tsx` stub maps Figma component properties back to React props using the Code Connect API.

### Mapping functions

| Figma Property Type | Code Connect Function | Example |
|---|---|---|
| Variant enum | `figma.enum()` | `figma.enum('Variant', { primary: 'primary', secondary: 'secondary' })` |
| Text content | `figma.string()` | `figma.string('label')` |
| Boolean toggle | `figma.boolean()` | `figma.boolean('disabled')` |
| Composition slot | `figma.instance()` | `figma.instance('icon')` |

### Stub template

```tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'FIGMA_NODE_URL', {
  props: {
    variant: figma.enum('Variant', {
      primary: 'primary',
      secondary: 'secondary',
    }),
    label: figma.string('label'),
    disabled: figma.boolean('disabled'),
    icon: figma.instance('icon'),
  },
  example: (props) => (
    <Button
      variant={props.variant}
      disabled={props.disabled}
      icon={props.icon}
    >
      {props.label}
    </Button>
  ),
});
```

## Example Input/Output

### Input: `Button.tsx`

```tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ variant = 'primary', label, disabled = false, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

### Input: `Button.module.css`

```css
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.secondary {
  background-color: var(--color-secondary);
  color: var(--color-on-secondary);
}
```

### Output: `Button.dsl.ts`

```ts
import { VirtualFigmaApi, setAutoLayout, solidPaint, defineTokens, tokenPaint } from '@anthropic/dsl-core';

const tokens = defineTokens({
  primary: '#2563EB',
  onPrimary: '#FFFFFF',
  secondary: '#6B7280',
  onSecondary: '#FFFFFF',
});

export async function buildButton(api: VirtualFigmaApi) {
  // --- Primary variant ---
  const primaryComp = api.createComponent();
  primaryComp.name = 'Variant=primary';
  setAutoLayout(primaryComp, {
    direction: 'HORIZONTAL',
    spacing: 8,
    padX: 16,
    padY: 8,
    counterAlign: 'CENTER',
    align: 'CENTER',
  });
  primaryComp.cornerRadius = 8;
  primaryComp.fills = [tokenPaint(tokens, 'primary')];

  const primaryLabel = await api.createText();
  primaryLabel.name = 'label';
  primaryLabel.characters = 'Button';
  primaryLabel.fontSize = 14;
  primaryLabel.fontWeight = 600;
  primaryLabel.fills = [tokenPaint(tokens, 'onPrimary')];
  primaryComp.appendChild(primaryLabel);

  primaryComp.addComponentProperty('disabled', 'BOOLEAN', false);

  // --- Secondary variant ---
  const secondaryComp = api.createComponent();
  secondaryComp.name = 'Variant=secondary';
  setAutoLayout(secondaryComp, {
    direction: 'HORIZONTAL',
    spacing: 8,
    padX: 16,
    padY: 8,
    counterAlign: 'CENTER',
    align: 'CENTER',
  });
  secondaryComp.cornerRadius = 8;
  secondaryComp.fills = [tokenPaint(tokens, 'secondary')];

  const secondaryLabel = await api.createText();
  secondaryLabel.name = 'label';
  secondaryLabel.characters = 'Button';
  secondaryLabel.fontSize = 14;
  secondaryLabel.fontWeight = 600;
  secondaryLabel.fills = [tokenPaint(tokens, 'onSecondary')];
  secondaryComp.appendChild(secondaryLabel);

  secondaryComp.addComponentProperty('disabled', 'BOOLEAN', false);

  // --- Combine into component set ---
  const componentSet = api.combineAsVariants([primaryComp, secondaryComp]);
  componentSet.name = 'Button';

  return componentSet;
}
```

### Output: `Button.figma.tsx`

```tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'FIGMA_NODE_URL', {
  props: {
    variant: figma.enum('Variant', {
      primary: 'primary',
      secondary: 'secondary',
    }),
    label: figma.string('label'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Button variant={props.variant} disabled={props.disabled}>
      {props.label}
    </Button>
  ),
});
```
