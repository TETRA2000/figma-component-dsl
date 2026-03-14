---
name: react-to-dsl
description: >
  Generate Figma DSL definitions from React component source code.
  Analyzes JSX structure, CSS styles, and prop interfaces to produce
  DSL code using Figma Plugin API patterns (createFrame, solidPaint,
  setAutoLayout, etc.) and Code Connect binding stubs.
---

# React-to-DSL Generator

Generate a Figma DSL definition (`.dsl.ts`) and Code Connect stub (`.figma.tsx`) from a React component.

## Instructions

Given a React component file path as argument:

### Step 1: Read Source Files
1. Read the target React component file (`.tsx`)
2. Read its associated `.module.css` file (look in same directory)
3. Read `tokens.css` to resolve CSS custom property values to concrete hex/px values
4. Read the component's prop type interface (from `types.ts` or inline in the component file)

### Step 2: Analyze Component Structure
5. Analyze the JSX tree structure and map each element to DSL node creation calls:
   - `<div>` / semantic containers → `createFrame()`
   - `<p>`, `<span>`, `<h1>`-`<h6>` → `createText()`
   - Conditional `{value && <Element>}` → conditional node creation or `visible: false`

6. Parse CSS Modules classes referenced by the component:
   - Resolve `styles[variant]` dynamic key access to identify variant-specific styling
   - Map each CSS class to its properties

### Step 3: Map CSS to DSL Properties

7. **Flexbox layout** → `setAutoLayout()`:
   - `display: flex` + `flex-direction: row` → `direction: 'HORIZONTAL'`
   - `display: flex` + `flex-direction: column` → `direction: 'VERTICAL'`
   - `justify-content` → `align` (start→MIN, center→CENTER, end→MAX, space-between→SPACE_BETWEEN)
   - `align-items` → `counterAlign` (start→MIN, center→CENTER, end→MAX)
   - `gap` → `spacing`
   - `padding` → `padX`/`padY` or per-side

8. **CSS Grid** → nested Auto Layout:
   - `grid-template-columns: repeat(N, 1fr)` with `gap` → vertical container with N horizontal child frames per row, each containing FILL-width cards

9. **Container patterns**:
   - `max-width` + `margin: 0 auto` → FRAME with `layoutSizingHorizontal: 'FIXED'` at container width

10. **Colors** → `solidPaint()` / `gradientPaint()`:
    - CSS custom property refs (`var(--color-primary-600)`) → resolve through tokens.css → `solidPaint('#7c3aed')`
    - Use `REFERENCE_COLORS` and `SEMANTIC_COLORS` constants from `@figma-dsl/core`
    - `linear-gradient()` → `gradientPaint()` with stops and angle

11. **Typography** → text node properties:
    - Map HTML heading elements (`<h1>`-`<h3>`, `<p>`, `<span>`) to TEXT nodes
    - Use `FONT_SIZE_SCALE` for font size mapping (e.g., `--text-xl` → 20px)
    - Use `FONT_WEIGHTS` for weight mapping (e.g., `font-weight: 600` → `fontWeight: 600`)

12. **Borders** → stroke and cornerRadius:
    - `border` → `strokes: [solidPaint(...)]` + `strokeWeight`
    - `border-radius` → `cornerRadius`

### Step 4: Handle Variants and Props

13. **Variant props** (union types like `variant: 'primary' | 'secondary'`):
    - Generate a `combineAsVariants()` COMPONENT_SET
    - Each variant value creates a separate COMPONENT node

14. **Size props** (union types like `size: 'sm' | 'md' | 'lg'`):
    - Generate an additional variant axis
    - **Cartesian product**: When both variant and size props exist, generate all combinations
      (e.g., 4 variants × 3 sizes = 12 variant components named `variant=primary, size=sm`, etc.)

15. **Boolean props** (e.g., `disabled`, `fullWidth`):
    - Generate `addComponentProperty(name, 'BOOLEAN', defaultValue)`

16. **String props** (e.g., `title?: string`, `subtitle?: string`):
    - Generate `addComponentProperty(name, 'TEXT', defaultValue)`

### Step 5: Handle Out-of-Scope Patterns

For patterns that cannot be represented in the DSL, emit `// TODO:` comments with fallback nodes:

17. **Animations** (`transition`, `animation`, `@keyframes`): Ignore; render static state
18. **Scroll state** (scroll-based conditional styling): Ignore; render default (unscrolled) state
19. **Backdrop filter** (`backdrop-filter: blur(...)`): Emit `// TODO: backdrop-filter not supported`
20. **Gradient text** (`background-clip: text`): Emit `// TODO: gradient text not supported`; use fallback solid color from first gradient stop
21. **SVG icons** (Lucide React, inline SVGs): Emit `// TODO: replace with icon asset`; generate placeholder RECTANGLE or ELLIPSE with icon dimensions
22. **External images** (CDN URLs like `api.dicebear.com`): Emit `// TODO: external image`; generate placeholder RECTANGLE with URL in comment
23. **Box shadow** (`box-shadow`): Emit `// TODO: box-shadow not supported`
24. **Dark mode** (`prefers-color-scheme: dark`): Generate for light mode only; note dark mode requires separate invocation

### Step 6: Generate Output Files

25. Output the DSL definition file (`.dsl.ts`):
    - Import from `@figma-dsl/core`: `VirtualFigmaApi`, `solidPaint`, `gradientPaint`, `setAutoLayout`, token constants
    - Export default async function accepting `DslFigmaApi` and returning root node
    - Use Figma Plugin API naming conventions for all nodes

26. Output a Code Connect stub file (`.figma.tsx`):
    - Use `figma.connect()` with component reference
    - Map props using `figma.enum()`, `figma.string()`, `figma.boolean()`, `figma.instance()`

## Example Output Structure

```typescript
// Button.dsl.ts
import type { DslFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout, REFERENCE_COLORS } from '@figma-dsl/core';

export default async function buildButton(api: DslFigmaApi) {
  const root = api.createFrame();
  // ... component definition
  return root;
}
```

## Quality Guidelines

- Read existing DSL examples in the project for style consistency
- Prefer `REFERENCE_COLORS` and `SEMANTIC_COLORS` over hardcoded hex values
- Use `FONT_SIZE_SCALE` and `FONT_WEIGHTS` for typography values
- Use `SPACING_SCALE` for spacing and padding values
- Use `RADIUS_SCALE` for corner radius values
- Generated code should compile without errors and be ready for visual comparison
