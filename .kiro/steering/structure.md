# Project Structure

## Organization Philosophy

The project follows a **specification-driven, research-first** approach. Reference implementations live as git submodules, MAGI-generated documentation captures their architecture, and the DSL specification evolves through a phased workflow (requirements → design → tasks → implementation).

## Directory Patterns

### DSL Packages (Monorepo)
**Location**: `packages/{package-name}/`
**Purpose**: npm workspace packages implementing the DSL pipeline
**Convention**: Each package has `src/`, `dist/`, `package.json`, and uses vitest. Scoped as `@figma-dsl/{name}`. Pattern: `index.ts` re-exports public API, one module per concern.

### CLI Bin Stubs
**Location**: `bin/`
**Purpose**: Per-command entry points for the CLI (`figma-dsl`, `figma-dsl-compile`, etc.)
**Convention**: Each stub imports from `packages/cli/dist/cli.js` and injects its command name. Also registered in root `package.json` `"bin"` field. Exception: `figma-dsl-sync` imports directly from `packages/mcp-server/dist/cli.js` (standalone MCP server entry point).

### MCP Server Config
**Location**: `.mcp.json` (project root)
**Purpose**: Claude Code MCP server configuration for the figma-sync server
**Convention**: Enabled via `enabledMcpjsonServers` in `.claude/settings.json`. Server runs stdio transport for MCP + WebSocket on localhost:9800 for Figma plugin.

### AI Skills
**Location**: `.claude/skills/{skill-name}/`
**Purpose**: Claude AI Skills with SKILL.md entrypoint and supporting files
**Convention**: SKILL.md with YAML frontmatter (`name`, `description`), markdown instructions, optional `references/` subdirectory, optional `evals/`, `scripts/`
**Active Skills**: apply-changeset, calibrate, create-landing-page, create-react-component, dogfooding, export-to-figma, export-to-html, magi-docs-writer, playwright-cli, verify-changeset (plus `shared/` for common references like component-registry and design-tokens)

### Specifications
**Location**: `.kiro/specs/{feature-name}/`
**Purpose**: Phased feature specifications (requirements.md, design.md, tasks.md)
**Convention**: One directory per feature, tracked by spec.json

### Steering
**Location**: `.kiro/steering/`
**Purpose**: Project-wide context and conventions loaded as AI memory
**Convention**: One topic per file (product.md, tech.md, structure.md, custom files)

### DSL Examples
**Location**: `examples/`
**Purpose**: DSL usage examples demonstrating component definitions
**Convention**: `{component-name}.dsl.ts` files. Batch-processable via `bin/figma-dsl-batch examples/ -o output/`.

### Preview App
**Location**: `preview/`
**Purpose**: Vite + React app for live previewing components and landing pages
**Convention**: Components in `src/components/{ComponentName}/` following the 3-file pattern (tsx, module.css, figma.tsx). Storybook stories in `src/storybook/`. Shared design tokens in `src/components/tokens.css`. Optional `.stories.tsx` files may accompany components.

### Calibration Output
**Location**: `calibration/`
**Purpose**: Timestamped test suite results measuring rendering fidelity (DSL PNG vs Figma reference)
**Convention**: Timestamped subdirectories containing `dsl/`, `figma/`, `test-suite/`, `report.json`. Generated via `bin/figma-dsl-calibrate`.

### Reference Implementations
**Location**: `references/{project-name}/`
**Purpose**: Git submodules of working projects that inform DSL design
**Convention**: Read-only research material, not modified directly

### Documentation
**Location**: `docs/`
**Purpose**: MAGI consensus-generated documentation for reference projects
**Convention**: One markdown file per reference project

## Reference: Component Folder Pattern (figma_design_playground)

Each component follows a strict 3-file pattern:

```
src/components/{ComponentName}/
├── {ComponentName}.tsx          # React implementation
├── {ComponentName}.module.css   # Scoped CSS Module
└── {ComponentName}.figma.tsx    # Code Connect binding
```

Supporting files at the components root:
- `tokens.css` — Design tokens as CSS custom properties
- `types.ts` — Shared TypeScript interfaces
- `index.ts` — Barrel exports

## Reference: Pipeline Pattern (figma-html-renderer)

Each pipeline stage is a single Python module with one class + one dataclass:

```
src/figma_html_renderer/
├── parser.py           # Stage 1: FigParser
├── tree_builder.py     # Stage 2: TreeBuilder
├── classifier.py       # Stage 3: NodeClassifier
├── section_detector.py # Stage 3.5: SectionDetector
├── renderer.py         # Stage 4: CanvasRenderer
└── output.py           # Stage 5: HTML output
```

**Pattern**: Single responsibility per module, immutable dataclasses for inter-stage data, no inheritance hierarchy.

## Naming Conventions

- **React components**: PascalCase (`Button`, `Navbar`, `HeroSection`)
- **CSS Modules**: `{ComponentName}.module.css` with camelCase class names
- **Code Connect**: `{ComponentName}.figma.tsx`
- **Python modules**: snake_case (`tree_builder.py`, `section_detector.py`)
- **TypeScript interfaces**: PascalCase, suffixed with `Props` for component props or descriptive names for data types (`NavLink`, `Feature`, `Testimonial`)
- **Directories**: PascalCase for component folders, kebab-case for project-level directories

## Import Organization

### TypeScript (figma_design_playground)
```typescript
// Absolute imports via path alias
import { Button } from '@/components/Button/Button'

// Relative imports within component
import styles from './Button.module.css'
import type { ButtonProps } from '../types'
```

**Path Aliases**: `@/` maps to `src/`

### Python (figma-html-renderer)
```python
# Absolute package imports
from figma_html_renderer.parser import FigParser
from figma_html_renderer.tree_builder import TreeBuilder
```

## DSL Package Pattern

Each package in `packages/` follows a consistent structure:

```
packages/{package-name}/
├── src/
│   ├── index.ts          # Public API re-exports
│   ├── {module}.ts       # Implementation
│   └── {module}.test.ts  # Tests (colocated)
├── dist/                 # Compiled output
├── package.json          # @figma-dsl/{name}, vitest, tsc build
└── tsconfig.json         # Composite project references
```

**Pattern**: Single responsibility per package. Typed interfaces between packages. No circular dependencies. CLI orchestrates all packages.

## Code Organization Principles

1. **Colocation**: Component logic, styles, and Figma bindings live together in one folder (reference app); tests colocated with source (DSL packages)
2. **Single responsibility**: Each module/package handles one concern
3. **Typed interfaces**: Packages communicate via typed exports, no shared mutable state
4. **Barrel exports**: Public API re-exported from `index.ts` in each package and component directory
5. **Design tokens centralized**: One `tokens.css` file consumed by all component CSS Modules

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
