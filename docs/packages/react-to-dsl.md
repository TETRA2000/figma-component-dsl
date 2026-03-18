# @figma-dsl/react-to-dsl

> **Experimental** — This package is a research prototype for automated, rule-based React-to-DSL conversion. It uses DOM extraction and CSS-to-DSL property mapping, which works for simple layouts but loses semantic intent on complex components. **The regular workflow should use AI-based conversion** (e.g., Claude reading the React source and writing idiomatic DSL), which produces higher-quality, human-readable output. Use this package for batch benchmarking, visual regression testing, and measuring pipeline fidelity — not as the primary conversion method.

Browser-based React-to-DSL converter. Extracts DOM elements with computed styles from rendered React components via Playwright, maps them to the DSL node tree, and generates `.dsl.ts` source code.

## Architecture

```
React Page (browser) → Playwright DOM extraction → DomSnapshot tree
  → Mapper → DslNode tree → Codegen → .dsl.ts source
```

## Modules

| Module | Purpose |
|--------|---------|
| `extractor.ts` | Playwright-based DOM extraction with `getComputedStyle()` |
| `mapper.ts` | Maps `DomSnapshot` → `DslNode` (CSS→DSL property mapping) |
| `codegen.ts` | Generates `.dsl.ts` TypeScript source from `DslNode` tree |
| `color-utils.ts` | CSS color parsing (hex, rgb, gradients) |
| `naming.ts` | Derives DSL node names from DOM attributes |
| `test-server.ts` | HTTP server serving test pages as rendered React (inline React shim + esbuild TSX transform) |
| `test-registry.ts` | Registry of 18 test pages (one per category) |
| `batch-convert.ts` | Orchestrates batch conversion + comparison pipeline |

## Test Pages

18 representative test pages, one per category:

| Category | Features tested |
|----------|----------------|
| `layout-horizontal` | Horizontal flex, gap, alignment |
| `layout-vertical` | Vertical flex, gap, alignment |
| `layout-nested` | Nested horizontal + vertical layouts |
| `layout-sizing` | Fixed, hug, fill sizing modes |
| `typography` | Font size, weight, color, alignment, line height |
| `colors-solid` | Solid background and foreground colors |
| `colors-gradient` | Linear and radial gradients |
| `borders-strokes` | Border width, color, style |
| `corner-radius` | Border radius including per-corner |
| `spacing-padding` | Padding and gap values |
| `opacity` | Opacity on containers and nested elements |
| `clip-content` | Overflow clipping |
| `cards` | Card components (image, title, body, actions) |
| `navigation` | Navigation bars, tabs, breadcrumbs |
| `heroes-banners` | Hero sections and banners |
| `lists-grids` | List items and grid layouts |
| `badges-tags` | Badge and tag pill components |
| `combined-complex` | Complex pages combining multiple features |

Test pages are in `test-pages/{category}/{category}-01.tsx`. Each exports a default function component with a `data-testid="root"` wrapper div.

## Visual Regression Tests

Two test suites compare rendered output against committed baseline PNGs:

### React baselines (`visual-regression-react.test.ts`)
- Playwright screenshots of each test page compared against `baselines/react/{name}.png`
- Threshold: 99.0% similarity (configurable via `REACT_SIMILARITY_THRESHOLD` env var)

### DSL baselines (`visual-regression-dsl.test.ts`)
- Full pipeline: extract DOM → map → codegen → compile → render
- Rendered PNG compared against `baselines/dsl/{name}.png`
- Threshold: 99.5% similarity (configurable via `DSL_SIMILARITY_THRESHOLD` env var)

### Golden file pattern

Both test suites use a self-bootstrapping golden file approach:
- **No baseline exists**: the test generates the baseline PNG and passes
- **Baseline exists**: the test compares against it and fails on mismatch

This means the first CI run after clearing baselines auto-generates them. Subsequent runs detect regressions.

### Updating baselines

```bash
npx playwright install chromium     # one-time setup
npm run update-baselines            # regenerates all 36 baseline PNGs
```

Or simply delete the baseline PNGs and re-run the tests — they will regenerate automatically.

### CI

Visual regression tests run in a dedicated GitHub Actions job (`visual-regression`) that installs Chromium, uploads generated baselines as artifacts, and uploads diff images on failure.

## API

### `extractDom(options: ExtractOptions): Promise<DomSnapshot>`
Launches a headless browser, navigates to a URL, and extracts the DOM tree with computed styles.

### `extractFromPage(page: Page, selector: string): Promise<DomSnapshot>`
Extracts DOM from an existing Playwright page (for batch use).

### `mapToDsl(snapshot: DomSnapshot, componentName?: string): { node: DslNode; warnings: string[] }`
Maps a DOM snapshot to a DSL node tree.

### `generateDslCode(node: DslNode, options?: CodegenOptions): string`
Generates `.dsl.ts` TypeScript source code from a DSL node tree.

### `batchConvert(options: BatchConvertOptions): Promise<BatchConvertResult>`
Runs the full pipeline for multiple pages: extract → map → codegen → compile → render → compare.

### `startTestServer(options: TestServerOptions): Promise<{ server, port, stop }>`
Starts the HTTP test server that serves test pages as rendered React components.

## Dependencies

- `playwright` — Browser automation for DOM extraction and screenshots
- `esbuild` — TSX-to-JS transformation for test page serving
- `@figma-dsl/core` — DSL node types and builders
- `@figma-dsl/compiler` — Layout compilation
- `@figma-dsl/renderer` — PNG rendering
- `@figma-dsl/comparator` — Pixel-diff comparison
