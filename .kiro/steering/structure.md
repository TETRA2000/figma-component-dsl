# Project Structure

## Organization Philosophy

The project follows a **specification-driven, research-first** approach. Reference implementations live as git submodules, MAGI-generated documentation captures their architecture, and the DSL specification evolves through a phased workflow (requirements → design → tasks → implementation).

## Directory Patterns

### Specifications
**Location**: `.kiro/specs/{feature-name}/`
**Purpose**: Phased feature specifications (requirements.md, design.md, tasks.md)
**Convention**: One directory per feature, tracked by spec.json

### Steering
**Location**: `.kiro/steering/`
**Purpose**: Project-wide context and conventions loaded as AI memory
**Convention**: One topic per file (product.md, tech.md, structure.md, custom files)

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

## Code Organization Principles

1. **Colocation**: Component logic, styles, and Figma bindings live together in one folder
2. **Single responsibility**: Each module/class handles one concern
3. **Immutable data flow**: Dataclasses passed between pipeline stages, no mutation
4. **Barrel exports**: Components re-exported from `index.ts` for clean imports
5. **Design tokens centralized**: One `tokens.css` file consumed by all component CSS Modules

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
