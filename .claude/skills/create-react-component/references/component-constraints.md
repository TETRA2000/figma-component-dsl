# Component Constraints

Rules and constraints for creating components compatible with the figma-component-dsl system.

## File Structure

Every component must have exactly 3 files in its directory:

```
preview/src/components/{ComponentName}/
  {ComponentName}.tsx          # React component
  {ComponentName}.module.css   # CSS Module styles
  {ComponentName}.figma.tsx    # Code Connect binding
```

## Naming Conventions

- **Directory**: PascalCase, matches component name
- **Files**: PascalCase, matching directory name
- **CSS classes**: camelCase in module, accessed via `styles.className`
- **Props interface**: `{ComponentName}Props`
- **Export**: Named export (not default)

## Required Patterns

### Component File (.tsx)

- Must use named export: `export function ComponentName`
- Must accept and spread `className` and `...props`
- Must extend appropriate HTML attributes interface
- Must use CSS Modules import: `import styles from './Name.module.css'`
- Must provide default values for variant/size props
- Class composition via `[].filter(Boolean).join(' ')` pattern

### CSS Module (.module.css)

- Must use `.root` as the base class selector
- Must use design token CSS variables (not raw values)
- Spacing: `var(--space-1)` through `var(--space-16)`
- Colors: `var(--text-primary)`, `var(--bg-secondary)`, `var(--color-primary-500)`, etc.
- Typography: `var(--font-sans)`, `var(--text-sm)`, `var(--text-base)`, etc.
- Borders: `var(--radius-sm)`, `var(--radius-lg)`, `var(--radius-full)`
- Shadows: `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`
- Transitions: `var(--transition-fast)`, `var(--transition-base)`

### Code Connect File (.figma.tsx)

- Must import from `@figma/code-connect`
- Must import the component from the same directory
- Must define a `FIGMA_URL` constant (use `PLACEHOLDER` initially)
- Must map variants to `figma.enum`
- Must map text props to `figma.string`
- Must map boolean props to `figma.boolean`
- Must include an `example` function

## Registration

After creating a component, add its export to `preview/src/components/index.ts`:

```ts
// --- END REFERENCE EXPORTS ---
export { NewComponent } from './NewComponent/NewComponent';
```

New exports go BELOW the `END REFERENCE EXPORTS` marker.

If the component introduces new shared types, add them to `preview/src/components/types.ts`.

## DSL Compatibility

Components must pass `figma-dsl validate`. Common issues:

- Raw color values instead of tokens
- Missing prop defaults
- Complex computed styles that can't be statically analyzed
- Dynamic class names that aren't variant-based
- Inline styles (use CSS Modules instead)

## Responsive Design

- Use relative units and design tokens for spacing
- Support dark mode via `@media (prefers-color-scheme: dark)` where appropriate
- Container queries are preferred over media queries for component-level responsiveness
