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
  using the word "component". Covers: "create a component", "new component",
  "build a button", "design a card", "scaffold component", "make a widget",
  "I need a dropdown", "add a tooltip component".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create React Component

Generate React components with CSS Modules and Code Connect bindings, validate DSL compatibility, and preview in dual mode (React dev server + DSL-rendered PNG).

## Workflow

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

Create a 3-file component at `preview/src/components/{ComponentName}/`:

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
cd /home/user/figma-component-dsl && npx figma-dsl validate preview/src/components/{ComponentName}/{ComponentName}.tsx
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
cd /home/user/figma-component-dsl && npx figma-dsl compile preview/src/components/{ComponentName}/{ComponentName}.tsx -o output/
cd /home/user/figma-component-dsl && npx figma-dsl render output/{ComponentName}.json -o output/{ComponentName}.png
```

This produces a PNG rendering of how the component will look in Figma.

### Step 7: Register the Component

Add the new component export to `preview/src/components/index.ts`, inserting it **below the END marker comment**:

```ts
// --- END REFERENCE EXPORTS ---
export { ComponentName } from './ComponentName/ComponentName';
```

If the component defines new shared types, add them to `preview/src/components/types.ts`.

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
