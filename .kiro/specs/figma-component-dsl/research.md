# Research & Design Decisions

## Summary
- **Feature**: figma-component-dsl
- **Discovery Scope**: New Feature (greenfield)
- **Key Findings**:
  - The figma-html-renderer's node dictionary format and PyCairo rendering pipeline provide a proven rendering foundation; the DSL compiler must produce output matching this format
  - The figma_design_playground's plugin code demonstrates the exact Figma Plugin API patterns (setAutoLayout, combineAsVariants, addComponentProperty) that the DSL must model
  - A cross-language bridge (TypeScript DSL → JSON → Python renderer) is necessary since the DSL and Figma plugin are TypeScript while proven rendering is Python/PyCairo

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
| Pipeline with AST Core | DSL → AST → Compiled Nodes → Render/Export | Clear data flow, proven in renderer reference, each stage independently testable | Cross-language bridge adds complexity | Best fit: matches figma-html-renderer pattern |
| Hexagonal / Ports & Adapters | Core DSL domain with adapters for each output | Clean separation of concerns, easy to add new outputs | Over-engineered for initial scope | Consider for v2 if many output formats needed |
| Monolithic Single-Language | All in Python or all in TypeScript | Simpler deployment, no cross-language bridge | Loses TypeScript type safety for DSL or loses PyCairo for rendering | Rejected: compromises quality in either direction |

## Design Decisions

### Decision: Pipeline with AST Core Architecture
- **Context**: Need to connect TypeScript DSL definition with Python rendering and Figma plugin export
- **Alternatives Considered**:
  1. All-TypeScript with canvas/skia-canvas for rendering — avoids cross-language but loses proven PyCairo patterns
  2. All-Python with YAML/JSON DSL — avoids cross-language but loses TypeScript type safety
  3. Pipeline with JSON interchange — TypeScript for DSL+CLI+plugin, Python for rendering
- **Selected Approach**: Pipeline with JSON interchange. TypeScript DSL compiles to Figma node dictionary JSON, which Python renderer consumes.
- **Rationale**: Leverages proven patterns from both references. TypeScript provides type-safe DSL authoring. PyCairo provides accurate Figma-compatible rendering. JSON is a natural serialization boundary.
- **Trade-offs**: Cross-language adds subprocess overhead and error handling complexity. Mitigated by well-defined JSON schema as contract.
- **Follow-up**: Validate JSON schema covers all node types. Benchmark subprocess latency for pipeline command.

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

### Decision: Auto-Layout Resolution in TypeScript Compiler
- **Context**: Figma's auto-layout computes child positions from layout properties. The Python renderer expects pre-computed absolute positions.
- **Alternatives Considered**:
  1. Implement layout in Python renderer — keeps renderer complex, duplicates logic
  2. Implement layout in TypeScript compiler — single source of truth, renderer stays simple
  3. Use CSS/browser layout engine — accurate but heavyweight dependency
- **Selected Approach**: TypeScript compiler resolves auto-layout to absolute positions (transforms)
- **Rationale**: Keeps the renderer simple (just draw at given coordinates). Layout algorithm is deterministic and testable in isolation. Matches the "compile" conceptual model.
- **Trade-offs**: Must implement a subset of Figma's flex-like layout algorithm. Mitigated by focusing on the properties used in the reference plugin (direction, spacing, padding, alignment, sizing modes).
- **Follow-up**: Verify layout algorithm against Figma's actual behavior using reference component screenshots.

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

### Decision: Cross-Language Environment Management
- **Context**: The system spans TypeScript (npm workspaces) and Python (PyCairo subprocess). Development setup and CI must handle both environments reliably.
- **Alternatives Considered**:
  1. Docker container with all dependencies — guarantees consistency but adds complexity for local development
  2. Makefile with setup targets — simple but not cross-platform
  3. CLI preflight checks with `figma-dsl doctor` — lightweight, actionable error messages, no container overhead
- **Selected Approach**: CLI preflight checks with environment variable configuration
- **Rationale**: Minimal overhead for the common case (developer already has Python). Actionable diagnostics for missing dependencies. Environment variable (`FIGMA_DSL_PYTHON`) allows custom Python paths (e.g., virtualenv). The `doctor` command provides one-command verification.
- **Trade-offs**: Does not guarantee consistent Python versions across machines. Mitigated by specifying minimum Python version (3.10+) and running `doctor` in CI as a prerequisite step.

### Decision: Two-Pass Layout Algorithm
- **Context**: Auto-layout resolution requires both bottom-up measurement (to determine HUG sizes) and top-down positioning (to allocate FILL space and compute absolute positions).
- **Alternatives Considered**:
  1. Single top-down pass — simple but cannot resolve HUG sizing (requires children to be measured first)
  2. Constraint-based solver (e.g., Cassowary) — powerful but over-engineered for single-axis layout
  3. Two-pass (bottom-up measurement + top-down positioning) — matches CSS Flexbox layout model
- **Selected Approach**: Two-pass algorithm: Pass 1 bottom-up measurement, Pass 2 top-down positioning
- **Rationale**: The two-pass model is the standard approach for single-axis flex layout (used by CSS Flexbox, Flutter, Yoga). It cleanly separates measurement from positioning. Each pass has clear pre/postconditions, making the algorithm testable and debuggable.
- **Trade-offs**: Two passes over the tree instead of one. Acceptable since component trees are typically small (< 100 nodes). The worked examples in design.md serve as test specifications for verifying correctness.

## Risks & Mitigations
- **Auto-layout fidelity** — DSL layout may not match Figma's exact pixel calculations → Mitigate with two-pass layout algorithm verified against worked examples; visual comparison tests against Figma screenshots; document known deviations
- **Text measurement accuracy** — opentype.js glyph widths may differ from PyCairo rendering by < 1px per glyph → Mitigate with threshold-based visual comparison (default 95%); measure discrepancy baseline for Inter font
- **Gradient rendering gap** — figma-html-renderer lacks gradient support → Must implement gradient fill rendering in the Python renderer extension
- **Cross-language error propagation** — Python subprocess errors may be opaque → Define structured error JSON format for subprocess output; CLI wraps and reports with context
- **Font availability** — PyCairo text rendering depends on system fonts → Document required fonts (Inter); fall back to system sans-serif; report font mismatch warnings
- **Image dimension mismatch** — DSL render and React screenshot may differ in size → Implement resize/pad utility before comparison; report dimension differences as warnings

## References
- [Figma Plugin API - createComponent](https://developers.figma.com/docs/plugins/api/properties/figma-createcomponent/) — Component creation API
- [Figma Plugin API - combineAsVariants](https://developers.figma.com/docs/plugins/api/properties/figma-combineasvariants/) — Variant grouping API
- [Figma Plugin API - layoutMode](https://developers.figma.com/docs/plugins/api/properties/nodes-layoutmode/) — Auto-layout properties
- [pixelmatch](https://github.com/mapbox/pixelmatch) — Pixel-level image comparison library
- [Playwright Screenshots](https://playwright.dev/docs/test-snapshots) — Visual comparison and screenshot automation
- [PyCairo](https://pycairo.readthedocs.io/) — Python bindings for Cairo graphics library
- [Building Custom DSLs in TypeScript](https://dev.to/effect/building-custom-dsls-in-typescript-29el) — DSL patterns with TypeScript type system
