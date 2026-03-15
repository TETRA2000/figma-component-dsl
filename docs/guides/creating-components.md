# Creating Components

Audience: Primarily developers; designers benefit from understanding the process

This guide covers how to create new React components that are compatible with the DSL pipeline and ready for Figma export.

## When to Use This Workflow

Use this when you need a new UI component (button, card, modal, input, etc.) that will also exist as a Figma component.

## Planning Your Component

Before writing code, decide:

- **Name** — PascalCase, descriptive (e.g., `PricingCard`, `HeroSection`)
- **Variants** — Does it have visual variants? (e.g., `variant: 'primary' | 'secondary'`, `size: 'sm' | 'md' | 'lg'`)
- **Props** — What data does it accept? (strings, booleans, children, etc.)
- **HTML base** — What semantic element should it extend? (`button`, `a`, `div`, `section`)

## The 3-File Output

Create your component at `preview/src/components/{ComponentName}/` (or `preview/src/components/_generated/{ComponentName}/` for AI-generated components):

```
{ComponentName}/
  {ComponentName}.tsx
  {ComponentName}.module.css
  {ComponentName}.figma.tsx
```

See [Core Concepts](concepts.md) for what each file does.

## Key Authoring Rules

### React Component (`.tsx`)

- **Named export**, not default: `export function Button(...)` not `export default function Button(...)`
- **Extend HTML attributes** for the base element:
  ```tsx
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  ```
- **CSS Modules** for all styling — import as `import styles from './Button.module.css'`
- **Class composition** — merge component classes with consumer `className`:
  ```tsx
  className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
  ```
- **Prop defaults** — destructure with defaults:
  ```tsx
  function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  ```

### CSS Module (`.module.css`)

- Use **design tokens** from `tokens.css`: `var(--space-4)`, `var(--radius-md)`, `var(--color-primary)`
- No hard-coded colors, spacing, or font sizes
- Use **camelCase** class names: `.featureCard`, `.heroSection`

### Code Connect (`.figma.tsx`)

- Map each Figma property to its React prop equivalent:
  ```tsx
  figma.connect(Button, 'FIGMA_URL', {
    props: {
      variant: figma.enum('Variant', { Primary: 'primary', Secondary: 'secondary' }),
      children: figma.string('Label'),
      fullWidth: figma.boolean('Full Width'),
    },
    example: (props) => <Button {...props} />,
  })
  ```
- The Figma URL is a placeholder until the component is exported to Figma — update it afterward

## Validation

After creating your component, validate it:

```bash
bin/figma-dsl validate preview/src/components/Button/
```

The validator checks 10 rules. Common issues:

| Issue                         | Fix                                                     |
|-------------------------------|----------------------------------------------------------|
| Missing `.module.css` file    | Create the CSS Module file                               |
| Missing `.figma.tsx` file     | Create the Code Connect file                             |
| Default export used           | Switch to named export                                   |
| Inline styles detected        | Move styles to CSS Module                                |
| Hard-coded colors             | Replace with design token variables                      |

Run `figma-dsl validate --help` for output format options.

## Registering the Component

Add your component's export to `preview/src/components/_generated.ts` (for generated components) or the appropriate barrel export file:

```tsx
export { Button } from './_generated/Button/Button'
```

## Creating a DSL File (Optional)

If you want to render your component via the DSL pipeline or export to Figma, create a `.dsl.ts` file. This step is optional — the component works in React without it.

**Important**: If your component has variant props, use `componentSet()`:

```tsx
componentSet('Button', { /* children named "Variant=Primary, Size=Medium" */ })
```

If it has no variants, use `component()`:

```tsx
component('Divider', { /* ... */ })
```

See the [DSL API Reference](../dsl-reference.md) for the full API.

## Previewing

**React preview**: Start the dev server (`cd preview && npm run dev`) and view your component in the browser.

**DSL preview**: Render the DSL file to a PNG:

```bash
bin/figma-dsl render my-component.dsl.ts -o output.png
```

Run `figma-dsl render --help` for scale, debug, and asset options.

## What's Next

- [Composing Pages](composing-pages.md) — use your component in a full page layout
- [Exporting to Figma](exporting-to-figma.md) — push the component to Figma
- [DSL API Reference](../dsl-reference.md) — DSL node constructors and styling
