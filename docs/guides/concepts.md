# Core Concepts

Audience: Both developers and designers

This page covers the key ideas behind the Figma Component DSL. Read this before diving into the workflow guides.

## The Pipeline

The DSL pipeline transforms component definitions through several stages:

```
                          +-----------+
                          |  DSL File |   (.dsl.ts — TypeScript)
                          +-----+-----+
                                |
                           [ compile ]
                                |
                      +---------+---------+
                      |                   |
                 [ render ]          [ export ]
                      |                   |
                  +---+---+         +-----+-----+
                  |  PNG  |         | Plugin JSON|
                  +---+---+         +-----+-----+
                      |                   |
                 [ compare ]       [ Figma Plugin ]
                      |                   |
              +-------+-------+     +-----+-----+
              | Similarity %  |     | Figma File |
              | + Diff Image  |     +-----+-----+
              +---------------+           |
                                     [ changeset ]
                                          |
                                   +------+------+
                                   | React / CSS |
                                   | Code Edits  |
                                   +-------------+
```

**Forward flow** (code to design): Write DSL or React components, compile, render to PNG, and export to Figma.

**Reverse flow** (design to code): A designer edits in Figma, exports a changeset via the plugin, and the changeset is applied back to React/CSS source code.

**Comparison loop**: Render both the DSL and the React component as PNGs, then pixel-diff them to verify fidelity.

## The 3-File Component Pattern

Every React component follows a consistent 3-file structure:

```
preview/src/components/{ComponentName}/
  {ComponentName}.tsx          # React implementation
  {ComponentName}.module.css   # Scoped styles with design tokens
  {ComponentName}.figma.tsx    # Code Connect binding for Figma
```

| File            | Purpose                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------|
| `.tsx`          | The React component itself. Uses named exports, CSS Modules, and extends HTML attribute interfaces. |
| `.module.css`   | Scoped CSS consuming design tokens as CSS custom properties (`var(--space-4)`, etc.).         |
| `.figma.tsx`    | Maps Figma component properties to React props using `@figma/code-connect`.                  |

This pattern ensures that every component is renderable in React, styled via tokens, and linked to its Figma counterpart.

## Design Tokens

Design tokens are centralized in `preview/src/components/tokens.css` as CSS custom properties. They define the visual language shared between React and Figma:

- **Colors**: `--color-primary`, `--text-primary`, `--bg-primary`, etc.
- **Spacing**: `--space-1` through `--space-16`
- **Typography**: `--font-sans`, `--font-mono`, `--text-sm`, `--text-lg`, etc.
- **Radii**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Components always reference tokens — never hard-coded values. This keeps styling consistent and makes theme changes straightforward.

## Component Properties

Figma component properties map to React props through Code Connect:

| Figma Property Type | React Equivalent | Example                                    |
|---------------------|------------------|--------------------------------------------|
| VARIANT             | String enum prop | `variant="primary"`, `size="lg"`           |
| TEXT                | String prop      | `title="Hello"`, `children="Click me"`     |
| BOOLEAN             | Boolean prop     | `fullWidth={true}`, `highlighted={false}`  |
| INSTANCE            | ReactNode prop   | `icon={<Zap />}`                           |

The `.figma.tsx` file defines these mappings using `figma.enum()`, `figma.string()`, `figma.boolean()`, and `figma.instance()`.

## Component Sets vs Components

In Figma, a **component set** is a collection of related variants (e.g., a Button with Primary/Secondary/Ghost variants and Small/Medium/Large sizes). A **component** is a single, standalone element.

In the DSL:

- Use `componentSet()` when your component has `variant`, `size`, or other enum-like props. Each variant combination becomes a child named with `Property=Value` format (e.g., `"Variant=Primary, Size=Large"`).
- Use `component()` for components without variant props.

Getting this wrong causes the Figma plugin to create the wrong node type.

## The Validator

The DSL validator checks components for compatibility before they enter the pipeline. It runs 10 rules covering:

- File structure (3-file pattern)
- Styling (CSS Modules usage, no inline styles)
- Code patterns (named exports, prop types)

Run `figma-dsl validate <path>` to check. The validator reports issues with severity levels (error, warning, info) and specific fix suggestions.

## Key Directories

| Directory       | What's in it                                                       |
|-----------------|--------------------------------------------------------------------|
| `packages/`     | Pipeline packages (compiler, renderer, exporter, etc.)             |
| `preview/`      | Vite + React app for live component preview                       |
| `bin/`           | CLI entry points                                                   |
| `examples/`     | DSL usage examples (`.dsl.ts` files)                              |
| `calibration/`  | Timestamped test results from pipeline calibration                |
| `docs/`         | Documentation (these guides, package docs, DSL reference)         |
| `docs/history/` | Persistent logs from calibration and dogfooding runs              |

## Glossary

| Term             | Definition                                                                                  |
|------------------|---------------------------------------------------------------------------------------------|
| **DSL**          | Domain-Specific Language — the TypeScript API for defining Figma node structures in code    |
| **Code Connect** | Figma's system for linking design components to code implementations                       |
| **Changeset**    | A JSON export from the Figma plugin describing property changes made in Figma               |
| **Calibration**  | Generating test components and batch-rendering to measure pipeline accuracy                 |
| **Dogfooding**   | Creating real-world themed components to stress-test the pipeline end-to-end                |
| **Component Set**| A Figma node containing multiple variants of a component                                    |
| **Pipeline**     | The chain of stages: compile → render → compare → export                                   |
| **Design Tokens**| Named values (colors, spacing, etc.) shared between code and design as CSS custom properties|
