# Technology Stack

## Architecture

The DSL project is currently in specification phase. The architecture is informed by two reference implementations that demonstrate complementary parts of the pipeline:

- **figma_design_playground**: React component → Figma plugin → Figma component (TypeScript/React)
- **figma-html-renderer**: Figma binary → parsed tree → classified nodes → rendered PNG → HTML output (Python)

The DSL will need to combine both directions: define components in code, render them visually, and export to Figma.

## Core Technologies

### Reference: figma_design_playground
- **Language**: TypeScript 5.9 (strict mode)
- **Framework**: React 19, Vite 8
- **Styling**: CSS Modules with design tokens as CSS custom properties
- **Figma Integration**: Figma Plugin API (`@figma/plugin-typings`), Code Connect (`@figma/code-connect`)
- **Bundler**: esbuild (for plugin), Vite (for app)
- **Module System**: ES Modules

### Reference: figma-html-renderer
- **Language**: Python 3.10+
- **Rendering**: PyCairo (vector-to-PNG rasterization)
- **Figma Parsing**: fig2sketch (binary format decoder), fig-kiwi (optional Rust-accelerated)
- **Image Processing**: Pillow
- **Testing**: pytest, Playwright (browser tests)
- **Packaging**: setuptools

## Key Libraries

| Purpose | Library | Context |
|---------|---------|---------|
| Figma binary parsing | fig2sketch, fig-kiwi | Decode `.fig` format |
| Vector rendering | PyCairo | Rasterize DSL to PNG |
| Browser automation | Playwright | React screenshot capture |
| Figma node creation | Figma Plugin API | Export DSL to Figma |
| Design-to-code mapping | @figma/code-connect | Dev Mode integration |

## Development Standards

### Philosophy: No Framework Bloat
Both references are minimalist — CSS Modules (not Tailwind), stdlib HTTP server (not Express), hand-written CSS consuming design tokens. Follow this pattern.

### Code Quality
- **TypeScript**: Strict mode, no `any`, ES2023 target
- **ESLint 9**: Flat config with typescript-eslint, react-hooks, react-refresh plugins
- **Python**: pytest for testing, type hints encouraged

### Testing
- React reference: No test infrastructure yet (gap identified)
- Python reference: pytest with Playwright for browser tests
- DSL project should include tests from the start

## Development Environment

### Reference Commands
```bash
# figma_design_playground
npm run dev            # Vite dev server
npm run build          # TypeScript + production build
npm run lint           # ESLint
npm run plugin:build   # esbuild → figma-plugin/code.js

# figma-html-renderer
pip install -e ".[dev]"  # Dev installation
figma-render design.fig  # CLI render
pytest                   # Unit tests
```

## Key Technical Decisions

1. **PyCairo for rendering** — Same technology as figma-html-renderer, proven for Figma-accurate rasterization
2. **CSS Modules over utility CSS** — Scoped styles consuming design tokens, no utility class bloat
3. **Design tokens as CSS custom properties** — Single source of truth for colors, spacing, typography
4. **Pipeline architecture** — Sequential stages with single-responsibility classes and immutable dataclasses between stages
5. **Figma Plugin API (native)** — Direct manipulation of Figma's `figma` global, not wrapped in abstractions

---
_Document standards and patterns, not every dependency_
