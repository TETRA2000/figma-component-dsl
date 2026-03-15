# Getting Started (Developer)

Audience: Developers writing React components

This guide walks you through setting up the project and understanding the component workflow.

## Prerequisites

- **Node.js >= 22** (required for native TypeScript support)
- **Git** (for submodule management)

## Installation

```bash
git clone <repo-url>
cd figma-component-dsl

# Initialize reference implementations (read-only submodules)
git submodule update --init --recursive

# Install dependencies
npm install

# Build all packages
npm run build
```

Verify the setup by running the test suite:

```bash
npx vitest run
```

## The Preview App

The project includes a Vite + React app at `preview/` for live component development. Start it with:

```bash
cd preview
npm run dev
```

This launches a dev server (typically at `http://localhost:5173`) with hot module replacement — edits to components appear instantly.

## Understanding the Component Structure

Every component follows a 3-file pattern inside `preview/src/components/`:

```
preview/src/components/Button/
  Button.tsx            # React component (named export, CSS Modules)
  Button.module.css     # Scoped styles using design tokens
  Button.figma.tsx      # Code Connect binding for Figma
```

- **`.tsx`** — The React implementation. Uses named exports and CSS Modules for styling.
- **`.module.css`** — Scoped CSS that consumes design tokens from `tokens.css` (e.g., `var(--radius-md)`, `var(--color-primary)`).
- **`.figma.tsx`** — Maps Figma component properties to React props, so Figma's Dev Mode shows the correct code snippets.

See [Core Concepts](concepts.md) for more on this pattern.

## Design Tokens

All visual values (colors, spacing, typography, radii, shadows) are defined as CSS custom properties in:

```
preview/src/components/tokens.css
```

Components reference these tokens instead of hard-coded values. When you create or edit components, always use token variables.

## Validating Components

Before exporting a component to Figma, run the validator to check DSL compatibility:

```bash
bin/figma-dsl validate preview/src/components/Button/
```

The validator checks 10 rules covering file structure, styling patterns, and code conventions. It reports issues with severity levels and specific fix suggestions. Run `figma-dsl validate --help` for all options.

## What's Next

- [Creating Components](creating-components.md) — scaffold new React components with DSL compatibility
- [Composing Pages](composing-pages.md) — build full pages from existing components
- [Exporting to Figma](exporting-to-figma.md) — get your components into Figma
- [Core Concepts](concepts.md) — deeper look at the pipeline, tokens, and glossary
- [DSL API Reference](../dsl-reference.md) — complete DSL node constructors and styling API
