# Research & Design Decisions

## Summary
- **Feature**: figma-component-dsl
- **Discovery Scope**: New Feature (greenfield) — redesigned after comprehensive external landscape research (2026-03-13)
- **Key Findings**:
  - Every comparable project (Satori, @react-pdf/renderer, Ink, react-figma, Red Otter) operates in a single language; the cross-language Python bridge is unnecessary complexity
  - @napi-rs/canvas provides Skia-based rendering in Node.js with zero system dependencies and prebuilt binaries — Skia is the same engine Figma uses internally, providing highest rendering fidelity
  - Yoga WASM is the industry-standard layout engine for this category (used by Satori, react-pdf, Ink, react-figma); it replaces the need for a custom two-pass layout algorithm
  - The declarative factory DSL approach is unique — no existing project provides a TypeScript DSL that models Figma node types directly (FRAME, COMPONENT, COMPONENT_SET, variants)
  - The figma_design_playground's plugin code demonstrates the exact Figma Plugin API patterns (setAutoLayout, combineAsVariants, addComponentProperty) that the DSL must model

## Research Log

### Figma Node Data Model (from figma-html-renderer)
- **Context**: Understanding the intermediate representation that the DSL must compile to
- **Sources**: `references/figma-html-renderer/src/figma_html_renderer/renderer.py`, `tree_builder.py`
- **Findings**:
  - Nodes are dictionaries with fields: `guid` (tuple: sessionID, localID), `type`, `name`, `size` ({x, y}), `transform` (3×3 affine matrix), `fillPaints` (array of paint objects), `children`, `parentIndex` ({guid, position}), `opacity`, `visible`, `clipContent`, `cornerRadius`
  - Text nodes add: `textData` ({characters, lines}), `derivedTextData` ({baselines, fontMetaData}), `fontSize`, `fontFamily`
  - Fill types: SOLID ({type, color: {r,g,b,a}, opacity, visible}), IMAGE ({type, image: {hash}, opacity, visible})
  - Colors use 0.0–1.0 float range (not 0–255)
  - Transform format: `[[a, c, tx], [b, d, ty], [0, 0, 1]]` — converts to Cairo Matrix(a, b, c, d, tx, ty)
  - Supported render types: FRAME, COMPONENT, COMPONENT_SET, INSTANCE, RECTANGLE, ROUNDED_RECTANGLE, ELLIPSE, TEXT, VECTOR
- **Implications**: The DSL compiler must produce node dictionaries in this exact format. Auto-layout must be resolved to absolute transforms before rendering, since the Python renderer does not implement layout algorithms.

### Figma Plugin API Patterns (from figma_design_playground)
- **Context**: Understanding how Figma nodes are created programmatically to define DSL semantics
- **Sources**: `references/figma_design_playground/figma-plugin/code.ts` (1,646 lines), Figma Plugin API docs
- **Findings**:
  - **Color helpers**: `hexToRGB(hex)` converts `#RRGGBB` to `{r, g, b}` in 0–1 range; `solidPaint(hex)` creates `{type: 'SOLID', color}; `gradientPaint(stops, angle)` creates `{type: 'GRADIENT_LINEAR', gradientStops, gradientTransform}` with rotation matrix
  - **setAutoLayout()** accepts: `direction` (HORIZONTAL|VERTICAL), `spacing`, `padX`/`padY`/`padTop`/`padBottom`/`padLeft`/`padRight`, `align` (MIN|CENTER|MAX → primaryAxisAlignItems), `counterAlign` (MIN|CENTER|MAX → counterAxisAlignItems), `sizing`/`widthSizing`/`heightSizing` (FIXED|HUG|FILL)
  - **createText()** is async (requires `figma.loadFontAsync`), maps font weight to Inter font styles (400→Regular, 500→Medium, 600→Semi Bold, 700→Bold), supports `lineHeight` ({value, unit:'PERCENT'}), `letterSpacing` ({value, unit:'PERCENT'}), `textAlignHorizontal`
  - **Component properties**: `addComponentProperty(name, type, defaultValue)` with types TEXT, BOOLEAN, INSTANCE_SWAP. INSTANCE_SWAP references component by ID
  - **Variant naming**: Components named `Key=Value, Key=Value` then combined with `figma.combineAsVariants(components, parent)` → returns ComponentSetNode
  - **Instance creation**: `component.createInstance()` then override properties
  - **Canvas placement**: Components placed sequentially on a "Component Library" page with y-offset tracking
  - **Node ID output**: Plugin logs JSON mapping `{componentName: figmaNodeId}` for Code Connect sync
- **Implications**: The DSL API should mirror these patterns for ergonomic component definition. The hex-to-RGBA conversion, auto-layout helper signature, and variant naming convention should be adopted directly.

### PyCairo Rendering Capabilities
- **Context**: Evaluating the rendering engine for DSL-to-PNG conversion
- **Sources**: PyCairo docs, figma-html-renderer renderer.py
- **Findings**:
  - PyCairo renders to PNG via `ImageSurface` with `FORMAT_ARGB32`
  - Supports: rectangles, ellipses (via arc+scale), rounded rectangles (via arcs), text (via select_font_face + show_text), clipping, transform matrices, alpha compositing
  - Text rendering uses Cairo's toy text API or Pango for advanced layout; figma-html-renderer uses toy API with baseline data
  - No built-in auto-layout — positions must be pre-computed
  - Gradient rendering is NOT implemented in figma-html-renderer (identified gap)
  - Image fills supported via Cairo surface patterns scaled to cover bounds
- **Implications**: The renderer can be extended from figma-html-renderer patterns. Gradient fill support must be added. Auto-layout computation must happen in the compiler stage, not the renderer.

### Playwright Screenshot Capabilities
- **Context**: Evaluating headless browser screenshot for React components
- **Sources**: Playwright docs, BrowserStack guides
- **Findings**:
  - `page.screenshot()` captures full page or element-level screenshots
  - Element-level: `element.screenshot()` captures a specific DOM element as PNG
  - Supports configurable viewport via `page.setViewportSize({width, height})`
  - Component testing mode allows rendering React components in isolation
  - Background can be controlled via CSS (white or transparent)
  - Available for Node.js (TypeScript) — same language as CLI
- **Implications**: Playwright's element-level screenshot with configurable viewport satisfies Requirement 7. Can be invoked directly from the TypeScript CLI.

### pixelmatch Image Comparison
- **Context**: Evaluating pixel-level image comparison for visual diff
- **Sources**: pixelmatch GitHub repo
- **Findings**:
  - API: `pixelmatch(img1, img2, output, width, height, options)` → returns number of mismatched pixels
  - Works on raw typed arrays (Uint8Array) — requires PNG decoding first
  - Options: `threshold` (0–1, default 0.1), `includeAA` (anti-aliasing detection), `diffColor` ([R,G,B]), `diffMask` (transparent diff background)
  - Similarity score = `1 - (mismatchedPixels / totalPixels)`
  - ~150 lines, zero dependencies, works in Node.js
  - Requires both images to be same dimensions — may need resize/padding step
- **Implications**: pixelmatch satisfies Requirement 8. Images must be decoded to raw RGBA buffers. A resize/pad utility may be needed when DSL render and React screenshot differ in dimensions.

### TypeScript DSL Design Patterns
- **Context**: Choosing between builder pattern and declarative factories
- **Sources**: dev.to/effect DSL article, Martin Fowler DSL Catalog
- **Findings**:
  - **Builder pattern**: Fluent API with method chaining (`.size(w,h).fills([...]).children([...])`) — flexible for conditional construction, but verbose
  - **Declarative factories**: Function calls that return node objects (`frame('name', { size, fills, children })`) — matches tree structure naturally, concise
  - **Internal DSL in TypeScript**: Leverages TypeScript's type system for compile-time validation; discriminated unions for node types; generics for type-safe property access
  - Both approaches can coexist: factories for simple definitions, builders for dynamic construction
- **Implications**: Declarative factory functions chosen as primary API — they produce readable tree structures matching the conceptual model. Builder pattern available for advanced/dynamic use cases.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| All-TypeScript Pipeline with Skia | DSL → AST → Yoga Layout → Skia Render/Export | Single language, zero cross-language bridge, Skia matches Figma's engine, proven pattern (Satori, react-pdf) | @napi-rs/canvas is newer than PyCairo | **Selected**: validated by Satori, react-pdf, Ink |
| Pipeline with JSON interchange (v1) | TypeScript DSL → JSON → Python/PyCairo render | Leverages figma-html-renderer patterns | Cross-language bridge adds subprocess overhead, error propagation complexity, dual environment setup | Previous design; rejected after landscape research |
| Hexagonal / Ports & Adapters | Core DSL domain with adapters for each output | Clean separation of concerns, easy to add new outputs | Over-engineered for initial scope | Consider if many output formats needed |

## Design Decisions

### Decision: All-TypeScript Pipeline Architecture (Revised)
- **Context**: The previous design used a TypeScript-to-Python cross-language bridge. Research revealed that every comparable project (Satori, @react-pdf/renderer, Ink, react-figma, Red Otter) operates in a single language.
- **Alternatives Considered**:
  1. Pipeline with JSON interchange (TypeScript → JSON → Python/PyCairo) — previous design; adds subprocess overhead, dual environment setup, cross-language error propagation
  2. All-TypeScript with @napi-rs/canvas (Skia) — single language, Skia matches Figma's engine, zero system dependencies via prebuilt binaries
  3. All-TypeScript with node-canvas (Cairo) — single language but requires system Cairo library installation
  4. All-TypeScript with Satori + resvg (SVG intermediate) — proven pipeline but SVG is a lossy intermediate for Figma semantics
- **Selected Approach**: All-TypeScript pipeline using @napi-rs/canvas for Skia-based rendering. DSL → Compiler (Yoga layout) → Renderer (@napi-rs/canvas) → PNG.
- **Rationale**: Eliminates the cross-language bridge entirely. @napi-rs/canvas provides Skia rendering (same engine Figma uses) with zero system dependencies via prebuilt binaries. This is the same architectural pattern proven by Satori (JSX → Yoga → SVG), @react-pdf/renderer (React → Yoga → pdfkit), and Ink (React → Yoga → terminal).
- **Trade-offs**: Loses direct reuse of figma-html-renderer's Python rendering code. Mitigated because the rendering logic (draw rectangles, ellipses, text, apply transforms) is straightforward to reimplement using the Canvas API, and the Canvas API is familiar to web developers.
- **Follow-up**: Benchmark @napi-rs/canvas rendering speed vs. PyCairo subprocess for the 16 reference components.

### Decision: Declarative Factory Functions as Primary DSL API
- **Context**: Need ergonomic API for defining Figma component structures
- **Alternatives Considered**:
  1. Builder pattern (fluent chaining) — flexible but verbose for nested trees
  2. Declarative factories (`frame('name', {...children})`) — natural tree representation
  3. Template DSL (custom syntax with parser) — maximum expressiveness but requires tooling
- **Selected Approach**: Declarative factory functions with TypeScript type inference
- **Rationale**: Factory functions produce readable nested tree structures that mirror the component hierarchy. TypeScript's type system provides compile-time validation without a custom parser. The API style mirrors the reference plugin's component creation pattern.
- **Trade-offs**: Less flexible for highly dynamic construction. Mitigated by exposing raw node builder for advanced cases.
- **Follow-up**: Design factory function signatures to support all requirement scenarios.

### Decision: Yoga WASM for Layout Resolution (Revised)
- **Context**: Auto-layout resolution requires a flexbox-like layout algorithm. The previous design proposed a custom two-pass implementation. Research revealed that Yoga WASM is the industry standard, used by Satori, @react-pdf/renderer, Ink, and react-figma.
- **Alternatives Considered**:
  1. Custom two-pass algorithm (~600 LOC based on Red Otter reference) — full control, no WASM dependency, but must handle edge cases manually
  2. Yoga WASM (`yoga-layout` npm package, ~200KB) — battle-tested by React Native, handles all flexbox edge cases, 18k+ stars
  3. Typeflex (pure TypeScript port of Yoga) — no WASM but unmaintained
  4. Taffy (Rust/WASM) — supports Flexbox + Grid but over-engineered for current scope
- **Selected Approach**: Yoga WASM via `yoga-layout` npm package
- **Rationale**: Yoga is the de facto standard for non-browser flexbox layout. It handles all the edge cases (min/max sizing, flex-grow distribution, baseline alignment) that a custom implementation would need to discover and fix over time. The WASM binary is ~200KB — negligible for a CLI tool. Figma's auto-layout is a subset of flexbox that maps cleanly to Yoga properties.
- **Trade-offs**: Adds a WASM dependency. Figma auto-layout has minor semantic differences from CSS Flexbox (e.g., `space-between` behavior, `HUG` vs `fit-content`). These differences are small and can be handled by a thin mapping layer.
- **Follow-up**: Map all Figma auto-layout properties to Yoga equivalents. Test with the 16 reference components.

### Decision: Counter-Based GUID Generation
- **Context**: Each node in the Figma data model has a unique GUID (sessionID, localID tuple)
- **Alternatives Considered**:
  1. UUID v4 — universally unique but doesn't match Figma's format
  2. Counter-based (0, N) — matches Figma model, deterministic, simple
- **Selected Approach**: Counter-based with sessionID=0 and auto-incrementing localID
- **Rationale**: Matches the Figma data model. Deterministic output enables snapshot testing of compiled JSON.
- **Trade-offs**: Not globally unique across sessions. Acceptable since DSL output is consumed within a single pipeline run.

### Decision: opentype.js for Text Measurement in Compiler
- **Context**: The Compiler must resolve HUG-contents sizing on auto-layout frames, which requires knowing child text node dimensions. Text rendering happens in Python/PyCairo — the Compiler has no rendering engine.
- **Alternatives Considered**:
  1. Two-pass compile (first pass sends text nodes to Python renderer for measurement, second pass resolves layout) — accurate but adds subprocess round-trip and couples compile to render
  2. Precomputed glyph width tables for Inter at supported weights — fast lookup but must be regenerated for each font, no kerning/ligature support
  3. opentype.js for font metric lookup — parses .otf/.ttf files, provides per-glyph advance widths with GPOS/GSUB kerning, runs in TypeScript
- **Selected Approach**: opentype.js 2.0+ for in-process font metric lookup
- **Rationale**: Keeps the single-pass pipeline intact (no subprocess dependency for measurement). Provides accurate glyph widths with kerning support. Runs in Node.js, matching the Compiler's TypeScript environment. The Inter font files are bundled (~500KB for 4 weights) so no system font dependency.
- **Trade-offs**: Minor width discrepancies vs. PyCairo's text rendering (< 1px per glyph due to different rasterization hinting). Acceptable for the visual comparison workflow with threshold-based matching. Does not handle complex text layout (RTL, CJK line breaking) — initial scope is Latin script only.
- **Follow-up**: Measure width discrepancy between opentype.js and PyCairo for the full Inter glyph set. Establish tolerance baseline.

### Decision: Single-Language Environment (Revised — Python No Longer Required)
- **Context**: The previous design required both TypeScript and Python environments. Moving to @napi-rs/canvas eliminates the Python dependency.
- **Selected Approach**: TypeScript-only with npm workspaces. No Python, no cross-language bridge, no `FIGMA_DSL_PYTHON` environment variable.
- **Rationale**: @napi-rs/canvas ships prebuilt binaries for macOS (x64/arm64), Linux (x64/arm64), and Windows (x64). `npm install` handles everything. The `figma-dsl doctor` command is simplified to checking Node.js version and font availability.
- **Trade-offs**: Cannot directly reuse figma-html-renderer Python code. Acceptable because the rendering logic is straightforward Canvas API operations.

## Risks & Mitigations (Revised)
- **Auto-layout fidelity** — Yoga's Flexbox semantics have minor differences from Figma's auto-layout → Mitigate with a thin mapping layer (Figma property → Yoga property); verify against the 16 reference components; document known deviations
- **Text measurement accuracy** — opentype.js glyph widths may differ slightly from Skia's text rendering → Mitigate with threshold-based visual comparison (default 95%); both opentype.js and Skia handle kerning, so discrepancy should be minimal
- **@napi-rs/canvas maturity** — Newer than PyCairo (~1.7k stars vs. mature Cairo) → Mitigate: @napi-rs/canvas is actively maintained, uses Skia (same engine as Figma/Chrome), and has prebuilt binaries; fallback to node-canvas (10k+ stars, Cairo-based) if issues arise
- **Font availability** — Skia text rendering uses bundled fonts or system fonts → Bundle Inter font files in the package; opentype.js uses the same bundled files for measurement; `figma-dsl doctor` warns if Inter is not installed system-wide
- **Image dimension mismatch** — DSL render and React screenshot may differ in size → Implement resize/pad utility before comparison using sharp; report dimension differences as warnings
- **Yoga WASM binary size** — ~200KB WASM module → Acceptable for a CLI tool; tree-shaking not needed since this is server-side

---

## External Landscape Research: Visual Regression, Rendering, and Figma Tooling

> Research conducted 2026-03-13. Covers open-source projects and tools relevant to the figma-component-dsl pipeline: renderers, image comparators, screenshot capturers, and Figma file parsers.

---

### 1. Image Comparison / Pixel Diff Libraries

These are the core engines that perform pixel-level or perceptual comparison between two images. In the figma-component-dsl pipeline, this is the **comparator** stage.

#### 1.1 pixelmatch

- **GitHub**: [mapbox/pixelmatch](https://github.com/mapbox/pixelmatch)
- **What it does**: The smallest, simplest and fastest JavaScript pixel-level image comparison library (~150 lines, zero dependencies).
- **Architecture**: Operates on raw RGBA `Uint8Array` buffers. Computes per-pixel color distance with YIQ-based perceptual difference. Includes anti-aliasing detection heuristic.
- **Stack**: Pure JavaScript (browser + Node.js)
- **Status**: ~6k stars. Mature and stable. Widely used as the default engine in jest-image-snapshot, Playwright, Vitest, and others.
- **Pipeline relevance**: **Already selected** as the comparator engine. Simple, fast, and sufficient for component-level screenshots. The `threshold` and `includeAA` options give adequate control.

#### 1.2 ODiff

- **GitHub**: [dmtrKovalenko/odiff](https://github.com/dmtrKovalenko/odiff)
- **What it does**: A very fast SIMD-first image comparison library with Node.js API. 6x faster than pixelmatch and ImageMagick.
- **Architecture**: Written in Zig with SIMD optimizations (SSE2, AVX2, AVX512, NEON). Provides a native Node.js binding. Compares images pixel-by-pixel with antialiasing detection.
- **Stack**: Zig + Node.js binding (N-API)
- **Status**: ~2.7k stars. Actively maintained.
- **Pipeline relevance**: **Potential upgrade** if performance becomes a bottleneck (e.g., comparing hundreds of component screenshots in CI). Drop-in replacement for pixelmatch with significantly better throughput. The Zig binary is a heavier dependency than pixelmatch's pure JS.

#### 1.3 Honeydiff

- **GitHub**: Closed-source engine by Vizzly (blog posts only)
- **What it does**: Rust-powered image diffing engine that processes screenshots at 231.8 million pixels/second. Provides spatial clustering, SSIM scoring, and anti-aliasing detection with 4x fewer false positives.
- **Architecture**: Rust with SIMD, tile-based comparison. Outputs rich diff metadata (cluster locations, intensity stats, SSIM per-region).
- **Stack**: Rust (proprietary, no public repo)
- **Status**: Not open-source. Benchmarks published in Vizzly blog posts.
- **Pipeline relevance**: **Informational** — the spatial clustering and per-region SSIM approach is architecturally interesting for future enhancements. Not usable directly.

#### 1.4 Resemble.js

- **GitHub**: [rsmbl/Resemble.js](https://github.com/rsmbl/Resemble.js)
- **What it does**: Image analysis and comparison library using HTML5 Canvas. Generates visual diff images with pink-highlighted mismatches.
- **Architecture**: Uses Canvas API (browser) or node-canvas (Node.js/Cairo). Computes color distance per pixel, supports bounding box narrowing.
- **Stack**: JavaScript + node-canvas (Cairo dependency)
- **Status**: ~4.7k stars. Mature but less active than pixelmatch.
- **Pipeline relevance**: **Not recommended** — heavier than pixelmatch (depends on node-canvas/Cairo), and BackstopJS's usage of it is being replaced by other engines. pixelmatch is simpler and faster.

#### 1.5 looks-same

- **GitHub**: [gemini-testing/looks-same](https://github.com/gemini-testing/looks-same)
- **What it does**: Node.js image comparison library using CIEDE2000 perceptual color distance (tolerance 2.3 by default). Built for visual regression testing in the Testplane framework.
- **Architecture**: Per-pixel CIEDE2000 comparison with configurable antialiasingTolerance and caret ignoring. Uses PNG decoding internally.
- **Stack**: Pure Node.js
- **Status**: ~700 stars. Maintained by the Yandex/Testplane team.
- **Pipeline relevance**: **Alternative comparator** with better perceptual accuracy than pixelmatch's YIQ-based approach. The CIEDE2000 metric correlates more closely with human perception. Worth considering if pixelmatch produces too many false positives on subtle color differences.

#### 1.6 ssim.js

- **GitHub**: [obartra/ssim](https://github.com/obartra/ssim)
- **What it does**: JavaScript implementation of SSIM (Structural Similarity Index) that measures image similarity on a 0-1 scale, correlating better with human perception than pixel-level metrics.
- **Architecture**: Window-based SSIM computation over luminance, contrast, and structure. Outputs an overall similarity index.
- **Stack**: Pure JavaScript (browser + Node.js)
- **Status**: ~300 stars. Stable.
- **Pipeline relevance**: **Complementary metric** — SSIM could be reported alongside pixel mismatch count to give a more meaningful "similarity score" (e.g., SSIM 0.98 vs. "5% pixel mismatch"). jest-image-snapshot already supports SSIM as an alternative comparison method.

---

### 2. Visual Regression Testing Frameworks

These are higher-level frameworks that orchestrate screenshot capture, comparison, reporting, and CI integration. They could inform the **CLI workflow** and **report generation** of figma-component-dsl.

#### 2.1 BackstopJS

- **GitHub**: [garris/BackstopJS](https://github.com/garris/BackstopJS)
- **What it does**: Visual regression testing framework that captures screenshots via Puppeteer/Playwright, compares them with Resemble.js, and generates an interactive React-based HTML report.
- **Architecture**: JSON config defines scenarios (URL + selectors + viewports). Three commands: `reference` (capture baselines), `test` (compare), `approve` (promote). Supports Docker for cross-platform consistency.
- **Stack**: Node.js, Puppeteer/Playwright, Resemble.js, React (report UI)
- **Status**: ~6.7k stars. Mature and widely used.
- **Pipeline relevance**: **Architecture reference** for the CLI workflow. The `reference` / `test` / `approve` command pattern maps well to figma-component-dsl's `render` / `compare` / `approve` flow. The HTML report design is a good model.

#### 2.2 Lost Pixel

- **GitHub**: [lost-pixel/lost-pixel](https://github.com/lost-pixel/lost-pixel)
- **What it does**: Open-source visual regression testing tool (alternative to Percy/Chromatic). Captures screenshots from Storybook, Ladle, Next.js pages, or Playwright/Cypress runs.
- **Architecture**: Three modes: Storybook mode (crawls stories), Page mode (visits URLs), Custom mode (pipes external screenshots). Stores baselines in the repo or cloud. GitHub App for PR review workflow.
- **Stack**: TypeScript, Playwright (for screenshot capture)
- **Status**: ~1.3k stars. Actively maintained with both OSS and cloud tiers.
- **Pipeline relevance**: **Architecture reference** for integrating screenshot capture + comparison into a CI-friendly workflow. The "custom mode" pattern (accepting external screenshots) is relevant — figma-component-dsl could support piping its DSL renders and React screenshots into Lost Pixel for team review.

#### 2.3 Argos CI

- **GitHub**: [argos-ci/argos](https://github.com/argos-ci/argos)
- **What it does**: Open-source visual testing platform that detects unintended visual changes in PRs. Integrates with Playwright, Cypress, Puppeteer, Storybook, and deployment providers (Vercel, Netlify).
- **Architecture**: SDK captures screenshots and uploads to Argos platform. Server-side comparison with built-in stabilization (retries to eliminate flakiness). GitHub Check integration for PR feedback. Self-hostable.
- **Stack**: TypeScript, Node.js, PostgreSQL (platform backend)
- **Status**: ~2.5k stars. Used by MUI for their component ecosystem.
- **Pipeline relevance**: **Future integration target** — the Argos SDK could be used to upload figma-component-dsl comparison results for team review. The stabilization approach (multiple screenshot captures to confirm stability) is a good technique.

#### 2.4 Creevey

- **GitHub**: [creevey/creevey](https://github.com/creevey/creevey)
- **What it does**: Cross-browser screenshot testing tool for Storybook with a built-in web UI runner. Captures screenshots from stories in Docker-based Selenium grid.
- **Architecture**: Reads Storybook parameters directly (no addon needed). Docker-based browser fleet. Web UI for reviewing/approving diffs.
- **Stack**: TypeScript, Selenium WebDriver, Docker
- **Status**: ~400 stars. Actively maintained.
- **Pipeline relevance**: **Limited** — Docker+Selenium is heavyweight for the figma-component-dsl use case. The built-in web UI for review/approval is an interesting feature.

#### 2.5 Happo

- **GitHub**: [happo/happo.io](https://github.com/happo/happo.io)
- **What it does**: Cross-browser screenshot testing service that captures screenshots in real browsers (Chrome, Firefox, Safari, Edge, iOS Safari). Integrates with Storybook, Cypress, Playwright.
- **Architecture**: Client library captures component state. Screenshots taken on Happo's cloud infrastructure in multiple real browsers. Diff and review in web UI.
- **Stack**: TypeScript (client), cloud-based (server)
- **Status**: ~300 stars (client library). Commercial SaaS with free tier.
- **Pipeline relevance**: **Limited direct use** — the cross-browser rendering aspect is interesting for validating that React component screenshots are consistent, but it's a SaaS dependency.

---

### 3. Component Screenshot Capture Tools

These tools capture isolated component screenshots, which is what the figma-component-dsl pipeline needs for the "React side" of the comparison.

#### 3.1 Playwright Visual Comparisons (built-in)

- **GitHub**: [microsoft/playwright](https://github.com/microsoft/playwright)
- **What it does**: Built-in `toHaveScreenshot()` assertion that captures page/element screenshots and compares against stored baselines using pixelmatch.
- **Architecture**: Full-page or locator-based element screenshots. Automatic baseline management with `--update-snapshots` flag. Configurable `maxDiffPixels`, `maxDiffPixelRatio`, threshold. Supports custom CSS injection to mask dynamic content.
- **Stack**: TypeScript, Chromium/Firefox/WebKit
- **Status**: ~70k stars. Extremely active.
- **Pipeline relevance**: **Already selected** for React component screenshots (Requirement 7). The element-level `locator.screenshot()` API provides isolated component capture. Can also be used in the pipeline's comparison step via `toHaveScreenshot()` for CI validation.

#### 3.2 Playwright Component Testing (experimental)

- **GitHub**: [microsoft/playwright](https://github.com/microsoft/playwright) (same repo, experimental feature)
- **What it does**: Renders isolated React/Vue/Svelte/Solid components in a real browser for testing. Components run with real layout and rendering.
- **Architecture**: Tests run in Node.js. Components are mounted in a real browser via a dev server. Supports `toHaveScreenshot()` on mounted components. Uses Vite under the hood for component serving.
- **Stack**: TypeScript, Vite, Chromium/Firefox/WebKit
- **Status**: Experimental since Playwright 1.22 (2022). Still experimental as of 2026.
- **Pipeline relevance**: **Strong candidate** for the `capture` stage. Instead of navigating to a Storybook URL, component testing mode can mount a React component directly and screenshot it. This avoids the Storybook dependency for screenshot capture. However, the "experimental" status is a risk.

#### 3.3 Storycap

- **GitHub**: [reg-viz/storycap](https://github.com/reg-viz/storycap)
- **What it does**: Storybook addon that crawls all stories and captures screenshots via Puppeteer. Designed to feed into reg-suit for visual regression.
- **Architecture**: Runs as a Storybook decorator. Crawls all stories automatically. Supports `waitImages` (waits for `<img>` loads), `omitBackground` (transparent screenshots), and variant generation from single stories.
- **Stack**: TypeScript, Puppeteer, Storybook
- **Status**: ~600 stars. Part of the reg-viz ecosystem.
- **Pipeline relevance**: **Reference for batch capture** — the "crawl all stories" pattern is useful if figma-component-dsl adds a batch mode that captures screenshots for all components in a Storybook. The `waitImages` and `omitBackground` patterns should be adopted.

#### 3.4 storycap-testrun

- **GitHub**: [storycap-testrun (Storybook addon)](https://storybook.js.org/addons/storycap-testrun)
- **What it does**: Provides stable screenshot functionality using Playwright for Storybook Test Runner. Monitors browser rendering metrics via CDP to determine content stability before capture.
- **Architecture**: Uses Chrome DevTools Protocol to monitor rendering metrics (paint timing, layout stability) before triggering screenshot. Hash verification ensures consistency across multiple captures.
- **Stack**: TypeScript, Playwright, CDP
- **Status**: Newer project, actively maintained.
- **Pipeline relevance**: **Technique reference** — the stability detection via CDP metrics is a good approach to reduce flaky screenshots. Could be adopted in figma-component-dsl's capture stage.

#### 3.5 Loki

- **GitHub**: [oblador/loki](https://github.com/oblador/loki)
- **What it does**: Visual regression testing tool specifically for Storybook. Supports Chrome (Docker), local Chrome, iOS Simulator, and Android Emulator.
- **Architecture**: Generates reference images per-story. Creates `current`, `difference`, and `reference` directories. Uses Docker-based Chrome for cross-platform consistency.
- **Stack**: JavaScript, Docker (Chrome)
- **Status**: ~1.8k stars. Maintained.
- **Pipeline relevance**: **Limited** — Docker-based approach is heavier than needed. The directory structure pattern (current/reference/difference) is a good convention to adopt for figma-component-dsl's output organization.

---

### 4. reg-viz Ecosystem (reg-suit + reg-cli)

#### 4.1 reg-suit

- **GitHub**: [reg-viz/reg-suit](https://github.com/reg-viz/reg-suit)
- **What it does**: Visual regression testing suite with plugin system. Compares screenshot images, stores snapshots in cloud storage (S3/GCS), and notifies GitHub PRs.
- **Architecture**: Plugin-based: `reg-keygen-git-hash` for baseline resolution, `reg-publish-s3` for cloud storage, `reg-notify-github` for PR comments. Core comparison engine is separate (reg-cli).
- **Stack**: TypeScript, plugin system
- **Status**: ~1k stars. Stable with plugin ecosystem.
- **Pipeline relevance**: **Architecture reference** for plugin-based design. The separation of comparison engine (reg-cli) from workflow orchestration (reg-suit) and storage (plugins) is a clean architecture that figma-component-dsl could follow if extensibility becomes important.

#### 4.2 reg-cli

- **GitHub**: [reg-viz/reg-cli](https://github.com/reg-viz/reg-cli)
- **What it does**: CLI visual regression test tool that compares directories of images and generates an HTML report. Configurable matching threshold (0-1).
- **Architecture**: Takes two directories (expected/actual), compares matching filenames, outputs diff images and HTML report. Matching threshold 0 by default (strictest).
- **Stack**: TypeScript, Node.js
- **Status**: ~400 stars. Stable.
- **Pipeline relevance**: **Potential integration** — reg-cli could be used directly as the comparison engine for figma-component-dsl. Feed it the DSL render directory and React screenshot directory, and it produces the comparison report. This would save building a custom comparison CLI.

---

### 5. Figma File Parsing Tools

These tools parse Figma's proprietary `.fig` binary format without the Figma application. They are relevant to understanding the Figma data model and potentially extending the pipeline.

#### 5.1 Kiwi (binary schema format)

- **GitHub**: [evanw/kiwi](https://github.com/evanw/kiwi)
- **What it does**: Schema-based binary format library created by Evan Wallace (Figma co-founder/former CTO). Figma internally uses Kiwi to store `.fig` files.
- **Architecture**: Protocol-Buffers-like format with variable-length encoding, zero-overhead struct nesting, and schema evolution. Compilers for JavaScript, C++, Rust, and others.
- **Stack**: Multi-language (JS, C++, Rust, Skew)
- **Status**: ~500 stars. The foundational format underlying all .fig parsers.
- **Pipeline relevance**: **Foundational knowledge** — understanding Kiwi is necessary for any .fig file parsing. Not directly used (the pipeline uses the Figma REST API and Plugin API instead), but important for future `.fig` import features.

#### 5.2 Evan Wallace's .fig File Parser

- **URL**: [madebyevan.com/figma/fig-file-parser](https://madebyevan.com/figma/fig-file-parser/)
- **What it does**: Online parser for Figma's file format. Decodes `.fig` files and displays the internal node tree.
- **Architecture**: Browser-based. Decompresses the file (ZIP → deflate/zstd), decodes the Kiwi binary using a reverse-engineered schema, and renders the tree.
- **Stack**: JavaScript (browser-only)
- **Status**: Reference implementation by Figma's former CTO. Not a library, just a demo page.
- **Pipeline relevance**: **Reference for .fig parsing** — if the pipeline ever needs to import directly from `.fig` files (bypassing the REST API), this parser demonstrates the decode pipeline.

#### 5.3 fig2json

- **GitHub**: [kreako/fig2json](https://github.com/kreako/fig2json)
- **What it does**: CLI tool to convert Figma `.fig` files to LLM-friendly JSON format. Strips Figma metadata, removes defaults, and produces a clean design tree.
- **Architecture**: Rust CLI. Reads `.fig` file, decompresses, decodes Kiwi binary, and outputs either raw JSON (all Figma fields) or transformed JSON (clean, optimized for AI consumption).
- **Stack**: Rust
- **Status**: Newer project (2025). Published on crates.io.
- **Pipeline relevance**: **High relevance for future `.fig` import**. The "transformed JSON" output (clean structure with defaults stripped) could be parsed to reconstruct DSL definitions from existing Figma files. This would enable reverse engineering: `.fig` → JSON → DSL. The Rust binary is fast but adds a non-Node.js dependency.

#### 5.4 figma-to-json

- **GitHub**: [yagudaev/figma-to-json](https://github.com/yagudaev/figma-to-json)
- **What it does**: Read/write Figma files as JSON. Includes both a Figma plugin and a web-based converter. Bidirectional: `figToJson()` and `jsonToFig()`.
- **Architecture**: Uses Kiwi schema decoding. Available as both a Figma plugin (UI for export/import) and a web tool at figma2json.com. TypeScript implementation.
- **Stack**: TypeScript, Kiwi schema
- **Status**: Actively maintained. Multiple releases.
- **Pipeline relevance**: **High relevance** — the bidirectional conversion capability (JSON ↔ .fig) is unique. The `figToJson()` function could be used to inspect Figma file contents without the REST API. The TypeScript implementation matches the pipeline's language.

#### 5.5 figma-parser

- **GitHub**: [rihardsgravis/figma-parser](https://github.com/rihardsgravis/figma-parser)
- **What it does**: Parses Figma design files via the Figma REST API. Extracts design tokens (colors, spacing, fonts, icons).
- **Architecture**: REST API client that fetches file data and transforms it into structured design token formats.
- **Stack**: TypeScript
- **Status**: Maintained.
- **Pipeline relevance**: **Limited** — operates via REST API (not file parsing). The design token extraction patterns could inform a future "extract tokens from Figma" feature.

---

### 6. Design Rendering Engines

These tools render vector graphics or design definitions to images. They are relevant to the figma-component-dsl **renderer** stage.

#### 6.1 PyCairo (current selection)

- **URL**: [pycairo.readthedocs.io](https://pycairo.readthedocs.io/)
- **What it does**: Python bindings for the Cairo 2D graphics library. Renders to PNG, PDF, SVG surfaces.
- **Architecture**: Imperative drawing API (move_to, line_to, arc, fill, stroke). Transform matrix support. Anti-aliased rendering. Text via "toy" API or Pango integration.
- **Stack**: Python + C (Cairo native library)
- **Status**: Mature, stable. Cairo itself is used by GTK, Firefox, and many Linux desktop tools.
- **Pipeline relevance**: **Currently selected** as the renderer. Proven in figma-html-renderer. The main gap is gradient rendering (not yet implemented).

#### 6.2 @napi-rs/canvas

- **GitHub**: [Brooooooklyn/canvas](https://github.com/Brooooooklyn/canvas)
- **What it does**: High-performance Google Skia binding to Node.js via Node-API. Zero system dependencies (prebuilt binaries). Implements the HTML Canvas API.
- **Architecture**: Skia C++ engine compiled to native Node.js addon. Provides `Canvas`, `CanvasRenderingContext2D`, `Image`, `ImageData` matching the browser Canvas API. Also supports Skottie (Lottie animations).
- **Stack**: Rust (napi-rs bindings), Skia (C++), Node.js
- **Status**: ~1.7k stars. Actively maintained. Prebuilt binaries for macOS, Linux, Windows.
- **Pipeline relevance**: **Strong alternative to PyCairo** that would eliminate the cross-language bridge. If the renderer were rewritten in TypeScript using @napi-rs/canvas, the entire pipeline could be single-language (TypeScript). The Canvas API is familiar to web developers. Skia is the same rendering engine used by Chrome and Figma itself, so rendering fidelity would be higher than Cairo. **Key consideration for v2**.

#### 6.3 skia-canvas

- **GitHub**: [samizdatco/skia-canvas](https://github.com/samizdatco/skia-canvas)
- **What it does**: A multi-threaded, GPU-powered, 2D vector graphics environment for Node.js. Implements the HTML Canvas drawing API using Skia. Supports multi-page output (PDF, image sequences).
- **Architecture**: Skia engine with Rayon-based thread pool for background rendering. Canvas API interface. Supports 3D perspective transforms in addition to standard 2D transforms.
- **Stack**: Rust (bindings), Skia (C++), Node.js
- **Status**: ~2k stars. Actively maintained.
- **Pipeline relevance**: **Alternative to @napi-rs/canvas** with additional features (multi-threading, GPU acceleration, perspective transforms). The multi-page PDF output could be useful for generating component catalogs. Similar trade-offs as @napi-rs/canvas.

#### 6.4 node-canvas (Cairo-based)

- **GitHub**: [Automattic/node-canvas](https://github.com/Automattic/node-canvas)
- **What it does**: Cairo-backed Canvas implementation for Node.js. Provides the HTML Canvas API using Cairo.
- **Architecture**: Cairo C library with Node.js bindings. Supports PNG, JPEG, PDF, SVG output formats. Optional librsvg support for SVG rendering.
- **Stack**: C (Cairo), Node.js (native addon)
- **Status**: ~10k stars. Mature and widely used.
- **Pipeline relevance**: **Bridge option** — uses the same Cairo rendering engine as PyCairo but accessed from Node.js. Would allow consolidating to a single-language pipeline while keeping Cairo's rendering characteristics. However, requires system-level Cairo installation (unlike the prebuilt Skia-based alternatives).

#### 6.5 resvg / resvg-js

- **GitHub**: [linebender/resvg](https://github.com/linebender/resvg) (core) / [thx/resvg-js](https://github.com/thx/resvg-js) (Node.js binding)
- **What it does**: High-performance SVG rendering library. Converts SVG to PNG with correct text rendering and system font support.
- **Architecture**: Written entirely in Rust with no unsafe code. Node.js binding via napi-rs with prebuilt binaries (no node-gyp). Also available as WASM for browser use.
- **Stack**: Rust, Node.js (napi-rs)
- **Status**: ~3k stars (core), ~1.5k stars (js binding). Actively maintained.
- **Pipeline relevance**: **Useful for SVG-to-PNG conversion** in the pipeline. If the DSL compiler emits SVG (instead of the Figma node dictionary), resvg-js could render it to PNG. Also useful in combination with Satori (see below) for a JSX-to-SVG-to-PNG pipeline.

#### 6.6 Satori

- **GitHub**: [vercel/satori](https://github.com/vercel/satori)
- **What it does**: Converts HTML/CSS (JSX) to SVG. Uses the same Flexbox layout engine as React Native (Yoga). Built for generating Open Graph images.
- **Architecture**: JSX input → Yoga layout calculation → SVG output. Supports a subset of CSS (Flexbox, colors, fonts, borders, text). Font data must be provided explicitly (no system font access).
- **Stack**: TypeScript, Yoga WASM
- **Status**: ~11k stars. Very active (Vercel-maintained).
- **Pipeline relevance**: **Architecturally very relevant**. Satori solves a similar problem to the figma-component-dsl renderer: it takes a declarative tree definition with layout properties and renders it to an image. The key difference is that Satori uses HTML/CSS semantics while figma-component-dsl uses Figma semantics. The Satori + resvg-js combination (JSX → SVG → PNG) demonstrates an all-TypeScript rendering pipeline that avoids PyCairo entirely. **Yoga layout engine usage in Satori validates the approach of resolving layout in TypeScript**.

#### 6.7 CanvasKit (Skia WASM)

- **URL**: [skia.org/docs/user/modules/canvaskit](https://skia.org/docs/user/modules/canvaskit/)
- **What it does**: Official WebAssembly port of Skia. Full Skia rendering capabilities in browser or Node.js via WASM.
- **Architecture**: C++ Skia compiled to WASM. WebGL2/WebGPU GPU acceleration. Complete Skia API (paths, text with Harfbuzz, shaders, Lottie via Skottie). Manual memory management (no GC for WASM objects).
- **Stack**: C++ (Skia), WASM, JavaScript
- **Status**: Official Google project. Used by Flutter web.
- **Pipeline relevance**: **Highest fidelity rendering option**. Since Figma itself uses Skia, rendering with CanvasKit would produce the closest match to Figma's own output. However, the WASM binary is large (~7MB) and requires manual memory management. Best suited for a future "high-fidelity mode" if pixel-perfect Figma matching is required.

#### 6.8 Penpot (rendering architecture reference)

- **GitHub**: [penpot/penpot](https://github.com/penpot/penpot)
- **What it does**: Open-source design tool (Figma alternative). Recently replaced SVG-based rendering with a custom Rust+WASM renderer.
- **Architecture**: New engine uses tile-based rendering with viewport culling and tile caching. Binary state serialization from JS to Rust/WASM. Custom tiling system for large canvas performance.
- **Stack**: Clojure (backend), TypeScript (frontend), Rust+WASM (renderer)
- **Status**: ~35k stars. Very active. Full design tool.
- **Pipeline relevance**: **Architecture reference only** — Penpot's rendering engine is tightly coupled to their design tool. The tile-based rendering with viewport culling is a technique to note for very large component sheets, but overkill for individual component rendering.

---

### 7. Figma REST API Image Export

- **URL**: [developers.figma.com/docs/rest-api/file-endpoints](https://developers.figma.com/docs/rest-api/file-endpoints/)
- **What it does**: Renders specific nodes from a Figma file as PNG/SVG/PDF images via the REST API.
- **Architecture**: `GET /v1/images/:file_key?ids=nodeId&format=png&scale=2` returns URLs to rendered images. Images expire after 30 days. Max 32 megapixels per image. Null values indicate render failure.
- **Stack**: HTTP REST API
- **Pipeline relevance**: **Baseline source** — the REST API can export Figma component screenshots as the "ground truth" to compare against DSL renders. This enables a three-way comparison: Figma screenshot vs. DSL render vs. React screenshot. Rate-limited and requires authentication, so best used for CI validation rather than development iteration.

---

### 8. Figma View / Rendering Components

#### 8.1 figma-view

- **GitHub**: [gridaco/figma-view](https://github.com/gridaco/figma-view)
- **What it does**: React component that renders Figma documents using multiple backends: HTML elements, HTML5 Canvas, or iframe embedding.
- **Architecture**: Three rendering backends — `html-backend` (DOM elements), `canvas-backend` (Canvas 2D), `iframe-backend` (Figma embed). Takes Figma API response data as input.
- **Stack**: TypeScript, React
- **Status**: Maintained by Gridaco.
- **Pipeline relevance**: **Limited** — renders Figma API data in-browser, not headless. The multi-backend approach is interesting but not directly applicable. The canvas-backend could theoretically be used for headless rendering if combined with node-canvas.

#### 8.2 react-figma

- **GitHub**: [react-figma/react-figma](https://github.com/react-figma/react-figma)
- **What it does**: A React renderer for Figma. Defines Figma nodes using React components (reverse of the typical direction — React → Figma, not Figma → React).
- **Architecture**: Custom React reconciler that creates Figma nodes. Supports Yoga layout. Runs inside Figma as a plugin.
- **Stack**: TypeScript, React, Yoga, Figma Plugin API
- **Status**: ~2.5k stars. Less active recently.
- **Pipeline relevance**: **Conceptual similarity** — react-figma takes a declarative tree (React components) and creates Figma nodes, similar to how figma-component-dsl takes DSL definitions and creates Figma nodes. The Yoga layout integration validates using a flexbox engine for Figma layout calculation.

---

### 9. Layout Engines

#### 9.1 Yoga

- **GitHub**: [facebook/yoga](https://github.com/facebook/yoga)
- **What it does**: Cross-platform flexbox layout engine. Used by React Native, Satori, Litho, and ComponentKit.
- **Architecture**: C++ core with bindings for JavaScript (WASM), Java, C#, Rust, and others. Implements a subset of CSS Flexbox (direction, wrapping, alignment, padding, margins, min/max sizes).
- **Stack**: C++ core, JavaScript WASM binding (`yoga-layout` npm package)
- **Status**: ~17k stars. Very active (Meta-maintained).
- **Pipeline relevance**: **Alternative to custom layout implementation**. Instead of implementing a custom two-pass layout algorithm, the compiler could delegate to Yoga via the `yoga-layout` npm package. This would provide more accurate Flexbox behavior and handle edge cases. Trade-off: adds a WASM dependency (~200KB) and requires mapping Figma auto-layout properties to Yoga properties.

---

### 10. Image Processing Utilities

#### 10.1 sharp

- **GitHub**: [lovell/sharp](https://github.com/lovell/sharp)
- **What it does**: High-performance Node.js image processing library. Resizes, converts, and transforms images using libvips. 4-5x faster than ImageMagick.
- **Architecture**: libvips C library with Node.js native addon. Streaming pipeline API. Supports JPEG, PNG, WebP, AVIF, TIFF, SVG.
- **Stack**: C (libvips), Node.js
- **Status**: ~29k stars. Extremely active and widely used.
- **Pipeline relevance**: **Useful for image pre-processing** before comparison. When DSL render and React screenshot have different dimensions, sharp can resize/pad images to match before feeding to pixelmatch. Also useful for generating thumbnails for comparison reports.

---

### 11. Summary: Pipeline Component Mapping

| Pipeline Stage | Current Selection | Best Alternative | Notes |
|---|---|---|---|
| **DSL Definition** | TypeScript factory functions | — | No external tool needed |
| **Layout Engine** | Custom two-pass algorithm | **Yoga** (`yoga-layout` npm) | Would provide more accurate Flexbox behavior |
| **Renderer** | PyCairo (Python subprocess) | **@napi-rs/canvas** or **skia-canvas** (all-TypeScript) | Eliminates cross-language bridge; Skia matches Figma's engine |
| **React Screenshot** | Playwright `locator.screenshot()` | — | Best choice; built-in, well-maintained |
| **Comparator** | pixelmatch | **ODiff** (speed) or **looks-same** (perceptual) | pixelmatch is sufficient for v1 |
| **Diff Report** | Custom CLI output | **reg-cli** (ready-made HTML report) | Could save building custom report UI |
| **Image Preprocessing** | Resize/pad utility (custom) | **sharp** | Handles dimension normalization |
| **Figma Export** | Figma Plugin API | — | No external tool; direct API |
| **Figma Import (.fig)** | Not in scope | **fig2json** or **figma-to-json** | For future reverse-engineering |
| **CI Integration** | Custom | **Lost Pixel** or **Argos** patterns | Reference for team review workflow |

### 12. Key Architectural Insights

1. **Single-language pipeline is achievable**: Tools like @napi-rs/canvas, skia-canvas, and node-canvas prove that high-quality image rendering is possible entirely in TypeScript/Node.js. The Satori project demonstrates JSX → SVG → PNG with Yoga layout, entirely in TypeScript. This validates a future migration path away from the PyCairo cross-language bridge.

2. **Skia is the ideal rendering engine for Figma parity**: Figma itself uses Skia. Both @napi-rs/canvas and CanvasKit-WASM provide Skia in Node.js. Rendering with Skia would produce the closest possible match to Figma's actual output, reducing false positives in comparison.

3. **Yoga is battle-tested for Flexbox layout**: Facebook's Yoga is used by React Native, Satori, and react-figma for layout calculation. It handles the same subset of Flexbox that Figma's auto-layout implements. Using Yoga instead of a custom two-pass algorithm would provide more accurate behavior and reduce implementation risk.

4. **pixelmatch is the de facto standard**: Nearly every visual regression tool (Playwright, jest-image-snapshot, Vitest, Lost Pixel) uses pixelmatch as the default comparison engine. ODiff is faster but pixelmatch's simplicity and zero-dependency nature make it ideal for v1.

5. **The comparison workflow pattern is well-established**: BackstopJS, reg-suit, Lost Pixel, and Argos all follow a similar pattern: capture → compare → report → approve. The figma-component-dsl CLI should follow this convention. reg-cli in particular could be used directly as the comparison engine.

6. **Figma file parsing is possible but fragile**: Tools like fig2json and figma-to-json can decode `.fig` files, but the format is undocumented and subject to change. For the figma-component-dsl pipeline, the REST API and Plugin API remain the safer integration points.

---

### 13. TypeScript UI DSL and Design-as-Code Projects

Research conducted 2026-03-13. Covers open-source projects with similar architectural approaches to figma-component-dsl: TypeScript DSLs for programmatic UI definition, React renderers for design tools, and design-system-as-code patterns.

#### 13.1 Satori (Vercel) -- Deep Architectural Analysis

- **GitHub**: [vercel/satori](https://github.com/vercel/satori) (~12.9k stars, ~212k weekly npm downloads)
- **What it does**: Converts JSX (HTML + CSS subset) to SVG. Primarily designed for Open Graph image generation.
- **Architecture (detailed)**:
  1. Accepts JSX element tree + configuration via `satori()` function
  2. Preprocesses: style expansion and CSS computation
  3. Layout: Uses Yoga layout (WASM, v3.2.1) to compute positions/sizes. YogaNode tree mirrors the JSX tree. Each node configured with CSS properties converted to Yoga equivalents.
  4. Font System: `FontLoader` class manages font files, resolves families with weight/style matching. Uses `@shuding/opentype.js` (v1.4.0-beta.0) to parse fonts and extract glyph information.
  5. SVG Generation: Text rendered as `<path>` elements (font paths inlined as vector data, no font files needed downstream). WASM binary bundled as base64-encoded string for automatic loading.
  6. Combined with resvg for SVG-to-PNG rasterization.
- **Stack**: TypeScript, Yoga WASM, opentype.js, resvg-js
- **Status**: Actively maintained by Vercel. 5x faster than Puppeteer-based alternatives, 100x more lightweight (500KB vs 50MB).
- **Pipeline relevance**: **Most architecturally similar project found**. Satori is the closest existing open-source analog to figma-component-dsl's architecture:
  - Both: TypeScript input DSL -> layout engine -> visual output (image)
  - Both: use opentype.js for font measurement
  - Both: produce images without a browser DOM
  - Key difference: Satori's DSL is HTML/CSS; figma-component-dsl's DSL models Figma node types directly
  - Key lesson: Satori validates that Yoga WASM + opentype.js + resvg is a viable all-TypeScript image generation pipeline. The Satori + resvg combination eliminates Python entirely.
  - Satori's limitation (only flexbox CSS subset, no Figma-specific semantics like COMPONENT, COMPONENT_SET, variant naming) means it cannot be used as-is but its internals provide the best reference implementation.

#### 13.2 @react-pdf/renderer -- Pipeline Architecture Reference

- **GitHub**: [diegomura/react-pdf](https://github.com/diegomura/react-pdf)
- **npm**: `@react-pdf/renderer`
- **What it does**: Create PDF documents using React components. Two-phase architecture mirrors figma-component-dsl's design.
- **Architecture**:
  1. React reconciler builds component tree
  2. **Layout phase**: Yoga computes positions/sizes. This phase is **PDF-agnostic** -- it does not know about the output format.
  3. **Rendering phase**: pdfkit draws borders, backgrounds, images, text to PDF
  4. Page breaking based on customizable heuristics
- **Stack**: TypeScript, React reconciler, Yoga WASM (@react-pdf/yoga), pdfkit
- **Status**: Actively maintained. Widely used for PDF generation.
- **Pipeline relevance**: **Excellent architecture reference**. The explicit separation of layout (format-agnostic, Yoga-based) from rendering (format-specific, pdfkit-based) directly parallels figma-component-dsl's compiler -> renderer split. Validates the design decision to keep layout computation separate from visual rendering.

#### 13.3 Ink (Vadim Demedes) -- Yoga for Non-Browser Rendering

- **GitHub**: [vadimdemedes/ink](https://github.com/vadimdemedes/ink)
- **What it does**: React for command-line applications. Renders React component trees to terminal output using Yoga for flexbox layout.
- **Architecture**: Custom React reconciler -> Yoga layout engine -> terminal ANSI escape code output. Full Flexbox layout via Yoga, but renders to text instead of pixels.
- **Stack**: TypeScript, React reconciler, yoga-layout-prebuilt
- **Status**: Actively maintained. Used by Gatsby, Parcel, Yarn, Terraform, Prisma, Shopify.
- **Pipeline relevance**: Demonstrates Yoga layout applied to a non-browser, non-visual context. Validates that Yoga works well as an embedded layout engine in TypeScript CLI tools. The declarative component API -> Yoga layout -> output format pattern is the same as figma-component-dsl.

#### 13.4 react-figma -- React-to-Figma Renderer

- **GitHub**: [react-figma/react-figma](https://github.com/react-figma/react-figma) (~2.5k stars)
- **npm**: `react-figma`
- **What it does**: React renderer for Figma. Write React components that output Figma nodes. Compatible with react-native, react-sketchapp, and react-primitives APIs.
- **Architecture**: Custom React reconciler that maps React component tree to Figma Plugin API calls. Supports Yoga layout for positioning within Figma.
- **Stack**: TypeScript, React reconciler, Figma Plugin API, Yoga
- **Status**: Less active recently but maintained.
- **Pipeline relevance**: Solves the same "code -> Figma" direction as figma-component-dsl but via React JSX instead of a custom DSL. The React reconciler adds dependency weight. figma-component-dsl's declarative factory approach is lighter and maps more directly to Figma concepts (FRAME, COMPONENT, variant naming). However, react-figma's reconciler source code is a useful reference for how React component trees map to Figma Plugin API calls.

#### 13.5 react-sketchapp (Airbnb) -- Historical Precedent

- **GitHub**: [airbnb/react-sketchapp](https://github.com/airbnb/react-sketchapp)
- **What it does**: Rendered React components to Sketch. Built for managing design systems. Used flexbox layout. Supported "universal rendering" across platforms.
- **Stack**: JavaScript, React reconciler
- **Status**: Effectively archived. Sketch's market share has declined.
- **Pipeline relevance**: **Conceptual predecessor** to figma-component-dsl. Demonstrated that "design as code" is viable: design teams will adopt code-defined components when tooling is good. Its decline tracks Sketch's decline, not a failure of the concept. figma-component-dsl carries this torch for the Figma ecosystem.

#### 13.6 Red Otter -- Self-Contained Layout + Rendering in TypeScript

- **GitHub**: [tchayen/red-otter](https://github.com/tchayen/red-otter)
- **Website**: [red-otter.dev](https://www.red-otter.dev/)
- **What it does**: Self-contained flexbox layout engine with TTF font parser, text rasterizer, UI renderer, and declarative UI API. Described as "like a mini Flutter" or "like Dear ImGui with full flexbox."
- **Architecture**: Layered and modular with WebGPU, WebGL, and Canvas renderers. Pipeline: `layout()` (screen positions/sizes from component tree) -> `compose()` (scrolling, transforms) -> `paint()` (renderer commands) -> `Renderer.render()` (styled rectangles, text to screen).
- **Stack**: TypeScript. WebGL/WebGPU/Canvas rendering.
- **Status**: Active personal project. Flexbox implementation is ~600 lines of TypeScript.
- **Pipeline relevance**: **Highest relevance as architecture reference**. Red Otter demonstrates that layout + font measurement + rendering can be done entirely in TypeScript. The accompanying blog post ([tchayen.com/how-to-write-a-flexbox-layout-engine](https://tchayen.com/how-to-write-a-flexbox-layout-engine)) is the best available tutorial for implementing a two-pass flexbox algorithm from scratch in TypeScript. Could theoretically replace both the layout engine AND the renderer, eliminating the Python dependency.

#### 13.7 Remotion -- Code-to-Video Pipeline

- **GitHub**: [remotion-dev/remotion](https://github.com/remotion-dev/remotion)
- **Website**: [remotion.dev](https://www.remotion.dev/)
- **What it does**: Create videos programmatically using React. Renders React components to video frames via headless Chromium.
- **Architecture**: React components define scenes -> headless Chromium renders per frame -> FFmpeg composites to video. Supports batch rendering from JSON datasets.
- **Stack**: TypeScript, React, Chromium, FFmpeg
- **Status**: Actively maintained. Commercial product.
- **Pipeline relevance**: Demonstrates the "code -> visual output" pipeline at scale. The headless browser approach is too heavyweight for component image generation (50MB+ Chromium dependency). However, the concept of "programmatic visual content from TypeScript" is the same domain.

#### 13.8 tldraw -- Shape Rendering Architecture

- **GitHub**: [tldraw/tldraw](https://github.com/tldraw/tldraw) (~44k stars)
- **What it does**: Infinite canvas SDK for React. Whiteboard, diagramming, and drawing.
- **Architecture**: Editor class as central orchestrator. Store -> Editor -> Canvas rendering pipeline. ShapeUtil pattern: each shape type has its own renderer class that handles rendering, hit testing, and bounds calculation.
- **Stack**: TypeScript, React, WebGL.
- **Status**: Very actively maintained. MIT license.
- **Pipeline relevance**: The ShapeUtil pattern (each shape type registers its own renderer) is conceptually similar to figma-component-dsl's per-node-type rendering. Study as reference for type-discriminated rendering dispatch. Too coupled to interactive canvas use case for direct use.

---

### 14. Design System as Code Tools

#### 14.1 Panda CSS (Chakra UI)

- **GitHub**: [chakra-ui/panda](https://github.com/chakra-ui/panda)
- **What it does**: Universal, type-safe CSS-in-JS framework. Build-time CSS generation with TypeScript type safety for tokens, conditions, and recipes.
- **Architecture**: `panda.config.ts` defines tokens, conditions, recipes -> build step generates atomic CSS -> zero runtime. `createTokens()` generates strict TypeScript types preventing invalid values.
- **Stack**: TypeScript. Build-time extraction.
- **Status**: Actively maintained by Chakra UI team.
- **Pipeline relevance**: **Pattern reference** for how TypeScript types can express design system constraints. The typed token API (`createTokens()` -> strict types) is analogous to figma-component-dsl's typed color and spacing helpers. Not a replacement for any layer.

#### 14.2 Vanilla Extract

- **Website**: [vanilla-extract.style](https://vanilla-extract.style/)
- **What it does**: Zero-runtime CSS-in-TypeScript. Styles in `.css.ts` files are extracted to static CSS at build time.
- **Architecture**: TypeScript files define styles -> build plugin extracts to CSS -> zero runtime cost. Inspired the utilities API in Panda CSS.
- **Stack**: TypeScript. Build-time extraction.
- **Status**: Actively maintained.
- **Pipeline relevance**: Pattern reference for "TypeScript as a design DSL" -- styles defined in TypeScript are compiled to a different output format. figma-component-dsl does the same: TypeScript DSL definitions compile to Figma node dictionaries (and then to images).

#### 14.3 Style Dictionary (Amazon)

- **GitHub**: [amzn/style-dictionary](https://github.com/amzn/style-dictionary)
- **npm**: `style-dictionary`
- **What it does**: Build system for cross-platform styles from design tokens. JSON/JS token definitions -> transforms -> platform-specific output (CSS, iOS, Android).
- **Architecture**: Token definitions (JSON/JS) -> Transforms (value mutations per token type/platform) -> Formats (output templates). First-class TypeScript annotations.
- **Stack**: Node.js. TypeScript types included.
- **Status**: Actively maintained. Industry standard for design token pipelines.
- **Pipeline relevance**: **Potential integration point**. Style Dictionary tokens could feed into figma-component-dsl definitions, providing a shared vocabulary between the DSL and other platforms. The transform -> format pipeline pattern parallels figma-component-dsl's compile -> render pipeline.

#### 14.4 Tokens Studio for Figma

- **GitHub**: [tokens-studio/figma-plugin](https://github.com/tokens-studio/figma-plugin)
- **What it does**: Open-source Figma plugin for design token management. Syncs tokens with GitHub. Style Dictionary integration.
- **Stack**: TypeScript, Figma Plugin API.
- **Status**: Actively maintained. Industry standard for Figma token management.
- **Pipeline relevance**: **Complementary tool**. Tokens Studio manages tokens inside Figma; figma-component-dsl creates components inside Figma from code. A shared token format could enable DSL definitions to reference Tokens Studio tokens.

#### 14.5 Figma Code Connect (Official)

- **Docs**: [developers.figma.com/docs/code-connect](https://developers.figma.com/docs/code-connect/quickstart-guide/)
- **What it does**: Official Figma feature bridging codebases with Dev Mode. Links code components to Figma components via `.figma.ts` files.
- **Stack**: TypeScript CLI, Figma API. VS Code integration.
- **Status**: Actively developed by Figma.
- **Pipeline relevance**: **Complementary, not competitive**. Code Connect links existing code to existing Figma components. figma-component-dsl creates Figma components from code. A natural workflow: figma-component-dsl creates the Figma component, then Code Connect links it to the React implementation.

#### 14.6 Figmagic

- **GitHub**: [mikaelvesavuori/figmagic](https://github.com/mikaelvesavuori/figmagic)
- **npm**: `figmagic`
- **What it does**: CLI that generates design tokens, exports graphics, and extracts design token-driven React components from Figma documents via the REST API.
- **Stack**: TypeScript, Node.js CLI.
- **Status**: Maintained.
- **Pipeline relevance**: Solves the reverse direction (Figma -> tokens/components). Complementary: Figmagic extracts from Figma, figma-component-dsl writes to Figma.

#### 14.7 Tamagui

- **GitHub**: [tamagui/tamagui](https://github.com/tamagui/tamagui)
- **What it does**: Style React with 100% parity across React Native and web. Optimizing compiler extracts styles at build time.
- **Architecture**: `tamagui.config.ts` defines tokens, themes, fonts. Compiler outputs platform-specific optimizations: atomic CSS on web, hoisted style objects on native. `createTokens()` generates strict TypeScript types. Tokens mapped to CSS variables at build time.
- **Stack**: TypeScript, React. Compile-time optimization.
- **Status**: Actively maintained.
- **Pipeline relevance**: Pattern reference for compile-time design system processing. The `createTokens()` -> strict types pattern reinforces the approach figma-component-dsl takes with typed design primitives.

---

### 15. Flexbox Layout Engine Implementations (Pure TypeScript)

#### 15.1 Typeflex

- **GitHub**: [dead/typeflex](https://github.com/dead/typeflex)
- **npm**: `typeflex`
- **What it does**: Pure TypeScript port of Facebook's Yoga layout engine. Created for environments lacking asm.js/WASM support.
- **Architecture**: Direct TypeScript reimplementation of Yoga's C-based algorithm. No native dependencies, no WASM.
- **Stack**: Pure TypeScript.
- **Status**: Low activity. Last significant commits were several years ago.
- **Pipeline relevance**: Reference for understanding flexbox layout in TypeScript. Could serve as a starting point if the custom layout algorithm needs more complete flexbox foundation, but maintenance risk is high. Yoga WASM is a better choice for production use.

#### 15.2 Taffy (DioxusLabs)

- **GitHub**: [DioxusLabs/taffy](https://github.com/DioxusLabs/taffy)
- **What it does**: High-performance Rust layout library implementing CSS Block, Flexbox, and CSS Grid.
- **Architecture**: Rust core with WASM compilation target. High-level and low-level APIs. Used by Dioxus and Bevy.
- **Stack**: Rust, WASM bindings available.
- **Status**: Actively maintained. Most feature-rich layout engine.
- **Pipeline relevance**: Over-engineered for Figma's auto-layout subset (single-axis flex). Interesting for future Grid support. Yoga is simpler for the current scope.

#### 15.3 flexbox.js

- **GitHub**: [Planning-nl/flexbox.js](https://github.com/Planning-nl/flexbox.js/)
- **What it does**: Pure JavaScript flexbox layout engine, developed for the tree2d framework.
- **Architecture**: `FlexTarget` class for constructing layout trees. Embeddable in other frameworks.
- **Stack**: Pure JavaScript. Apache 2.0.
- **Status**: Low activity.
- **Pipeline relevance**: Minimal advantage over the custom implementation or Yoga. Niche project.

---

### 16. Comprehensive Architecture Comparison

| Project | Input Format | Layout Engine | Rendering | Output | Cross-Language? | Figma-Specific? |
|---------|-------------|--------------|-----------|--------|----------------|-----------------|
| **figma-component-dsl** (current) | TypeScript factory DSL | Custom two-pass | PyCairo subprocess | PNG | **Yes** (TS->Python) | **Yes** |
| **Satori** | JSX (HTML/CSS) | Yoga WASM | SVG generation | SVG (+ resvg PNG) | No | No |
| **@react-pdf/renderer** | React components | Yoga WASM | pdfkit | PDF | No | No |
| **Ink** | React components | Yoga prebuilt | ANSI escape codes | Terminal | No | No |
| **Red Otter** | Declarative API | Custom ~600 LOC | WebGL/Canvas | Screen | No | No |
| **react-figma** | React components | Figma built-in | Figma Plugin API | Figma nodes | No | **Yes** |
| **Remotion** | React components | Browser CSS | Chromium screenshots | Video frames | No | No |
| **tldraw** | Editor data store | Custom | WebGL | Screen | No | No |
| **Penpot** | User interaction | CSS Flexbox/Grid | SVG/Rust+WASM | Screen | No | No |

**Key observation**: figma-component-dsl is the **only** project in this comparison that requires a cross-language bridge. Every comparable project achieves its full pipeline within a single language runtime. This reinforces that eliminating the Python/PyCairo dependency (via skia-canvas, @napi-rs/canvas, or node-canvas) is the highest-impact architectural improvement available.

---

### 17. Revised Key Architectural Insights (Incorporating DSL/Design-System Research)

1. **The declarative factory DSL approach is unique and well-positioned**: No existing project provides a TypeScript DSL that models Figma node types directly (FRAME, COMPONENT, COMPONENT_SET, variants). Satori models HTML/CSS; react-figma models React components. The factory function DSL is figma-component-dsl's core differentiator and should be preserved.

2. **Yoga WASM is the industry-standard layout engine for this category**: Satori, @react-pdf/renderer, Ink, and react-figma all use Yoga for layout. The custom two-pass algorithm is a valid approach for v1 (Red Otter demonstrates it in ~600 LOC), but Yoga provides a well-tested fallback if edge cases prove difficult.

3. **The all-TypeScript pipeline is proven and preferable**: Satori demonstrates JSX -> Yoga -> SVG -> resvg PNG entirely in TypeScript. @react-pdf/renderer demonstrates React -> Yoga -> pdfkit entirely in TypeScript. The pattern works. Replacing PyCairo with a Node.js renderer (skia-canvas, @napi-rs/canvas, or node-canvas) would align with this industry-standard approach.

4. **Design token integration is a future expansion opportunity**: Style Dictionary, Tokens Studio, Panda CSS, and Vanilla Extract all demonstrate typed token systems. figma-component-dsl could accept Style Dictionary token files as input, enabling shared design vocabulary across platforms.

5. **Code Connect is the natural complement**: Figma's Code Connect links code to Figma components; figma-component-dsl creates Figma components from code. Together they form a complete bidirectional bridge between React codebases and Figma design files.

6. **Skia provides the highest Figma rendering fidelity**: Figma uses Skia internally. Rendering DSL output with Skia (via skia-canvas, @napi-rs/canvas, or CanvasKit WASM) would produce the closest possible match to Figma's actual visual output.

---

## References
- [Figma Plugin API - createComponent](https://developers.figma.com/docs/plugins/api/properties/figma-createcomponent/) -- Component creation API
- [Figma Plugin API - combineAsVariants](https://developers.figma.com/docs/plugins/api/properties/figma-combineasvariants/) -- Variant grouping API
- [Figma Plugin API - layoutMode](https://developers.figma.com/docs/plugins/api/properties/nodes-layoutmode/) -- Auto-layout properties
- [Figma Code Connect](https://developers.figma.com/docs/code-connect/quickstart-guide/) -- Figma's code-design bridge
- [pixelmatch](https://github.com/mapbox/pixelmatch) -- Pixel-level image comparison library
- [ODiff](https://github.com/dmtrKovalenko/odiff) -- SIMD-first image comparison in Zig
- [looks-same](https://github.com/gemini-testing/looks-same) -- Perceptual image comparison (CIEDE2000)
- [ssim.js](https://github.com/obartra/ssim) -- Structural similarity index in JavaScript
- [Resemble.js](https://github.com/rsmbl/Resemble.js) -- Canvas-based image comparison
- [BackstopJS](https://github.com/garris/BackstopJS) -- Visual regression testing framework
- [Lost Pixel](https://github.com/lost-pixel/lost-pixel) -- Open-source alternative to Percy/Chromatic
- [Argos CI](https://github.com/argos-ci/argos) -- Open-source visual testing platform
- [reg-suit](https://github.com/reg-viz/reg-suit) -- Visual regression testing suite with plugins
- [reg-cli](https://github.com/reg-viz/reg-cli) -- CLI visual regression tool with HTML reporter
- [Creevey](https://github.com/creevey/creevey) -- Cross-browser screenshot testing for Storybook
- [Happo](https://github.com/happo/happo.io) -- Cross-browser screenshot testing service
- [Storycap](https://github.com/reg-viz/storycap) -- Storybook screenshot capture addon
- [Loki](https://github.com/oblador/loki) -- Visual regression testing for Storybook
- [Playwright Screenshots](https://playwright.dev/docs/test-snapshots) -- Visual comparison and screenshot automation
- [Playwright Component Testing](https://playwright.dev/docs/test-components) -- Experimental component testing
- [Vitest Visual Testing](https://vitest.dev/guide/browser/visual-regression-testing) -- Vitest browser-mode screenshot testing
- [PyCairo](https://pycairo.readthedocs.io/) -- Python bindings for Cairo graphics library
- [@napi-rs/canvas](https://github.com/Brooooooklyn/canvas) -- Skia Canvas for Node.js (zero system deps)
- [skia-canvas](https://github.com/samizdatco/skia-canvas) -- Multi-threaded Skia Canvas for Node.js
- [node-canvas](https://github.com/Automattic/node-canvas) -- Cairo-backed Canvas for Node.js
- [CanvasKit](https://skia.org/docs/user/modules/canvaskit/) -- Skia WASM module (~7MB)
- [resvg-js](https://github.com/thx/resvg-js) -- Rust SVG renderer with Node.js binding
- [Satori](https://github.com/vercel/satori) -- HTML/CSS to SVG converter (Vercel, ~12.9k stars)
- [Penpot](https://github.com/penpot/penpot) -- Open-source design tool with CSS Flexbox/Grid
- [Kiwi](https://github.com/evanw/kiwi) -- Schema-based binary format (Figma file format)
- [fig2json](https://github.com/kreako/fig2json) -- Figma .fig to JSON converter (Rust)
- [figma-to-json](https://github.com/yagudaev/figma-to-json) -- Bidirectional Figma/JSON converter
- [figma-parser](https://github.com/rihardsgravis/figma-parser) -- Figma REST API parser
- [Evan Wallace .fig parser](https://madebyevan.com/figma/fig-file-parser/) -- Reference .fig format parser
- [figma-view](https://github.com/gridaco/figma-view) -- React Figma renderer component
- [react-figma](https://github.com/react-figma/react-figma) -- React renderer for Figma (~2.5k stars)
- [react-sketchapp](https://github.com/airbnb/react-sketchapp) -- Airbnb's React-to-Sketch renderer (archived)
- [@react-pdf/renderer](https://react-pdf.org/) -- React PDF generation with Yoga layout
- [Yoga](https://github.com/facebook/yoga) -- Cross-platform Flexbox layout engine (~18.4k stars)
- [yoga-layout npm](https://www.npmjs.com/package/yoga-layout) -- Yoga WASM bindings for JavaScript
- [Typeflex](https://github.com/dead/typeflex) -- Pure TypeScript port of Yoga
- [Taffy](https://github.com/DioxusLabs/taffy) -- Rust layout engine (Flexbox + Grid)
- [flexbox.js](https://github.com/Planning-nl/flexbox.js/) -- Pure JavaScript flexbox layout
- [Red Otter](https://github.com/tchayen/red-otter) -- Self-contained WebGL flexbox engine
- [How to Write a Flexbox Layout Engine](https://tchayen.com/how-to-write-a-flexbox-layout-engine) -- TypeScript flexbox implementation guide
- [css-layout](https://www.npmjs.com/package/css-layout) -- Facebook's original JS layout (predecessor to Yoga)
- [Ink](https://github.com/vadimdemedes/ink) -- React for terminal UIs (uses Yoga)
- [Remotion](https://github.com/remotion-dev/remotion) -- Programmatic video creation with React
- [tldraw](https://github.com/tldraw/tldraw) -- Infinite canvas SDK (~44k stars)
- [Konva.js](https://konvajs.org/) -- 2D canvas scene graph library
- [Tree2D](https://www.npmjs.com/package/tree2d) -- TypeScript canvas render tree
- [FigmaToCode](https://github.com/bernaferrari/FigmaToCode) -- Figma plugin for code generation
- [Figmagic](https://github.com/mikaelvesavuori/figmagic) -- Design tokens and components from Figma
- [Panda CSS](https://github.com/chakra-ui/panda) -- Type-safe CSS-in-JS framework
- [Vanilla Extract](https://vanilla-extract.style/) -- Zero-runtime CSS-in-TypeScript
- [Style Dictionary](https://github.com/amzn/style-dictionary) -- Amazon's design token build system
- [Tokens Studio](https://github.com/tokens-studio/figma-plugin) -- Design token management for Figma
- [Tamagui](https://github.com/tamagui/tamagui) -- Cross-platform UI with compile-time optimization
- [sharp](https://github.com/lovell/sharp) -- High-performance Node.js image processing
- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) -- Jest matcher for image comparisons
- [awesome-regression-testing](https://github.com/mojoaxel/awesome-regression-testing) -- Curated list of visual regression testing resources
- [Building Custom DSLs in TypeScript](https://dev.to/effect/building-custom-dsls-in-typescript-29el) -- DSL patterns with TypeScript type system
