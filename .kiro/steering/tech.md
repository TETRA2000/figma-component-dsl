# Technology Stack

## Architecture

The DSL is implemented as a TypeScript monorepo with npm workspaces under `packages/`. The architecture combines two directions informed by reference implementations: define components in code, render them visually, and export to Figma.

**Core Pipeline**: DSL definition → compile (with layout) → render to PNG / export to Figma JSON → Figma plugin import

**Banner Mode Pipeline**: Same flow with mode-aware branching — absolute positioning in layout resolver, effects rendering (shadows, blur, blend modes), extended text rendering (transform, stroke, shadow, gradient fills), and custom font registration. Opted in per file via `export const mode = 'banner'`.

**Monorepo Packages** (all `@figma-dsl/` scoped):
- `dsl-core` — Node types, DSL builder API, bundled fonts
- `compiler` — `compileWithLayout` with text measurement via @napi-rs/canvas
- `renderer` — PNG rendering via @napi-rs/canvas
- `exporter` — Figma plugin-compatible JSON export
- `capturer` — Playwright-based React screenshot capture
- `comparator` — Pixel-diff image comparison with similarity scoring
- `cli` — 14-command CLI (`figma-dsl`) with bin stubs
- `plugin` — Figma plugin (esbuild → IIFE) for importing JSON into Figma
- `validator` — DSL compatibility validation with 10 rules (file structure, styling, AST-based checks) and Banner Mode preset
- `mcp-server` — MCP (Model Context Protocol) server for real-time Figma sync via stdio + WebSocket bridge

**Conversion & Testing Packages**:
- `react-to-dsl` — Browser-based React-to-DSL converter (extractor, mapper, codegen) with Playwright-driven visual regression tests (18 test pages, one per category)

**Reference implementations** (git submodules in `references/`):
- **figma_design_playground**: React 19 component library → Figma plugin → Figma component
- **figma-html-renderer**: Figma binary → parsed tree → classified nodes → rendered PNG → HTML output (Python)

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
| PNG rendering & text measurement | @napi-rs/canvas | Node-native Canvas 2D API (replaces PyCairo); also used for effects (shadows, blur, blend modes) |
| WOFF2 font decompression | @woff2/woff2-rs | Optional peer dep for custom .woff2 font loading in Banner Mode |
| Browser automation | Playwright | React screenshot capture |
| Figma node creation | Figma Plugin API | Export DSL to Figma via plugin |
| Design-to-code mapping | @figma/code-connect | Dev Mode integration (reference app) |
| Testing | vitest | All packages use vitest |
| Plugin bundling | esbuild | IIFE bundle for Figma sandbox |
| WebSocket server | ws | MCP server ↔ Figma plugin bridge |
| MCP protocol | @modelcontextprotocol/sdk | Stdio-based MCP server for Claude Code integration |

### Reference-only Libraries
| Purpose | Library | Context |
|---------|---------|---------|
| Figma binary parsing | fig2sketch, fig-kiwi | Decode `.fig` format (Python reference) |
| Vector rendering | PyCairo | Rasterize to PNG (Python reference, superseded by @napi-rs/canvas) |

## Development Standards

### Philosophy: No Framework Bloat
Both references are minimalist — CSS Modules (not Tailwind), stdlib HTTP server (not Express), hand-written CSS consuming design tokens. Follow this pattern.

### Code Quality
- **TypeScript**: Strict mode, no `any`, ES2023 target
- **ESLint 9**: Flat config with typescript-eslint, react-hooks, react-refresh plugins
- **Python**: pytest for testing, type hints encouraged

### Testing
- **DSL packages**: vitest for all packages (unit + integration)
- **Visual regression**: Playwright-based baseline tests in `react-to-dsl` package — React screenshots and DSL pipeline renders compared against committed PNGs (18 test pages, 1 per category). Baselines updated via `npm run update-baselines`. CI runs in a dedicated `visual-regression` job.
- React reference: No test infrastructure yet (gap identified)
- Python reference: pytest with Playwright for browser tests

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

1. **@napi-rs/canvas for rendering** — Node-native Canvas 2D API, replaces PyCairo to eliminate Python dependency; proven for Figma-accurate rasterization
2. **CSS Modules over utility CSS** — Scoped styles consuming design tokens, no utility class bloat
3. **Design tokens as CSS custom properties** — Single source of truth for colors, spacing, typography
4. **Pipeline architecture** — Sequential stages with single-responsibility modules and typed interfaces between stages
5. **Figma Plugin API (native)** — Direct manipulation of Figma's `figma` global, not wrapped in abstractions
6. **npm workspaces monorepo** — Each package independently buildable/testable, cross-referenced via workspace dependencies
7. **Node >= 22** — Required for native TypeScript support and top-level await in bin stubs
8. **MCP over stdio + WebSocket bridge** — MCP server communicates with Claude Code via stdio and with Figma plugin via WebSocket on localhost:9800; plugin UI relays messages between WebSocket and Figma sandbox
9. **Banner Mode as opt-in per file** — Mode detected from `export const mode = 'banner'` at module load time, threaded through the entire pipeline via `CompilerOptions.mode`. No new packages — effects, fonts, and text extensions are isolated modules within existing packages (renderer/effects.ts, renderer/font-manager.ts). Declarative font loading via `export const fonts` array (no module-level side effects)

---
_Document standards and patterns, not every dependency_
