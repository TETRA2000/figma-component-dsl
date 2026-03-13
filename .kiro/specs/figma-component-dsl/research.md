# Research & Design Decisions

## Summary
- **Feature**: figma-component-dsl
- **Discovery Scope**: Extension (removing Python dependencies from existing design)
- **Key Findings**:
  - @napi-rs/canvas (Skia-based) provides a zero-system-dependency Canvas 2D API in Node.js, eliminating the need for PyCairo and the cross-language bridge entirely
  - A single-language TypeScript pipeline removes subprocess overhead, simplifies error handling, and eliminates the `FIGMA_DSL_PYTHON` environment management and `figma-dsl doctor` Python checks
  - opentype.js for text measurement remains valid — and the Skia renderer's text output is closer to Chrome's Canvas than PyCairo's toy text API, reducing the measurement discrepancy risk

## Research Log

### Figma Node Data Model (from figma-html-renderer)
- **Context**: Understanding the intermediate representation that the DSL must compile to
- **Sources**: `references/figma-html-renderer/src/figma_html_renderer/renderer.py`, `tree_builder.py`
- **Findings**:
  - Nodes are dictionaries with fields: `guid` (tuple: sessionID, localID), `type`, `name`, `size` ({x, y}), `transform` (3×3 affine matrix), `fillPaints` (array of paint objects), `children`, `parentIndex` ({guid, position}), `opacity`, `visible`, `clipContent`, `cornerRadius`
  - Text nodes add: `textData` ({characters, lines}), `derivedTextData` ({baselines, fontMetaData}), `fontSize`, `fontFamily`
  - Fill types: SOLID ({type, color: {r,g,b,a}, opacity, visible}), IMAGE ({type, image: {hash}, opacity, visible})
  - Colors use 0.0–1.0 float range (not 0–255)
  - Transform format: `[[a, c, tx], [b, d, ty], [0, 0, 1]]` — converts to canvas `setTransform(a, b, c, d, tx, ty)`
  - Supported render types: FRAME, COMPONENT, COMPONENT_SET, INSTANCE, RECTANGLE, ROUNDED_RECTANGLE, ELLIPSE, TEXT, VECTOR
- **Implications**: The DSL compiler produces node dictionaries in this format. The TypeScript renderer consumes them directly — no cross-language serialization needed.

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
- **Implications**: The DSL API mirrors these patterns for ergonomic component definition. The hex-to-RGBA conversion, auto-layout helper signature, and variant naming convention are adopted directly.

### Node.js Canvas Rendering Alternatives (Python Replacement)
- **Context**: Evaluating TypeScript/Node.js alternatives to PyCairo for rendering FigmaNodeDict to PNG
- **Sources**: npm registry, GitHub repos, official documentation for each library
- **Findings**:

  **@napi-rs/canvas v0.1.96** (Recommended):
  - Skia backend via Node-API (N-API), zero system dependencies
  - Pre-built native binaries for Linux (x64/arm64), macOS (x64/arm64), Windows (x64)
  - Full HTML5 Canvas 2D API: `fillRect`, `arc`, `roundRect`, `fillText`, `createLinearGradient`, `setTransform`, `clip`, `globalAlpha`, `save/restore`
  - Fastest in benchmarks: ~68 ops/s vs ~60 for node-canvas, ~47 for skia-canvas
  - Built-in `loadImage()` for image fills; PNG/JPEG/AVIF/WebP encoding
  - `registerFonts()` API for custom font loading (Inter family)
  - TypeScript declarations included
  - 332 dependents, actively maintained (last publish: days ago)
  - No node-gyp, no Cairo/Pango system library installation required

  **node-canvas (canvas) v3.2.1** (Rejected):
  - Cairo backend — requires system Cairo, Pango, libpng, libjpeg, giflib
  - Same native dependency problem as PyCairo (would not solve the goal)
  - 3,076 dependents, mature ecosystem
  - Rejected: system dependency requirement contradicts the goal of removing native deps

  **skia-canvas v3.0.8** (Alternative):
  - Also Skia-based, GPU acceleration, multi-threading
  - Pre-built binaries, no system deps
  - Extra features: multi-page PDF, 3D perspective, CSS filters
  - Slower than @napi-rs/canvas in benchmarks (~47 ops/s)
  - 65 dependents, less actively maintained
  - Could work but @napi-rs/canvas is faster and more actively maintained

  **canvaskit-wasm v0.40.0** (Rejected):
  - Pure WASM Skia — no native binaries needed at all
  - ~6MB WASM bundle, slower startup
  - API differs significantly from Canvas 2D (Skia-native API)
  - Last published ~1 year ago
  - Rejected: non-standard API, performance overhead, maintenance concerns

- **Implications**: @napi-rs/canvas is the clear winner — zero system deps, fastest performance, standard Canvas 2D API, active maintenance, TypeScript native. The renderer becomes a TypeScript module in the same process, eliminating the cross-language bridge entirely.

### Canvas 2D API Mapping to PyCairo Operations
- **Context**: Verifying that @napi-rs/canvas can replicate all PyCairo rendering operations used by figma-html-renderer
- **Sources**: MDN Canvas 2D API docs, @napi-rs/canvas README, figma-html-renderer renderer.py
- **Findings**:

  | PyCairo Operation | Canvas 2D Equivalent | Notes |
  |---|---|---|
  | `ImageSurface(FORMAT_ARGB32, w, h)` | `createCanvas(w, h)` | Direct mapping |
  | `ctx.rectangle(x, y, w, h)` | `ctx.fillRect(x, y, w, h)` or `ctx.rect(x, y, w, h)` | Direct mapping |
  | `ctx.arc(cx, cy, r, 0, 2*PI)` | `ctx.arc(cx, cy, r, 0, 2*Math.PI)` | Direct mapping |
  | Rounded rectangle (4 arcs) | `ctx.roundRect(x, y, w, h, radii)` | Built-in in Canvas API |
  | `ctx.set_source_rgba(r, g, b, a)` | `ctx.fillStyle = rgba(...)` | Direct mapping |
  | `ctx.fill()` / `ctx.fill_preserve()` | `ctx.fill()` | Canvas fill does not consume path |
  | `ctx.stroke()` | `ctx.stroke()` | Direct mapping |
  | `ctx.clip()` | `ctx.clip()` | Direct mapping |
  | `ctx.save()` / `ctx.restore()` | `ctx.save()` / `ctx.restore()` | Direct mapping |
  | `Matrix(a, b, c, d, tx, ty)` | `ctx.setTransform(a, b, c, d, tx, ty)` | Direct mapping |
  | `ctx.select_font_face(family, slant, weight)` | `ctx.font = '600 14px Inter'` | CSS font syntax |
  | `ctx.show_text(text)` | `ctx.fillText(text, x, y)` | fillText uses baseline |
  | `LinearGradient(x0, y0, x1, y1)` | `ctx.createLinearGradient(x0, y0, x1, y1)` | Direct mapping |
  | `gradient.add_color_stop_rgba(pos, r, g, b, a)` | `gradient.addColorStop(pos, color)` | Direct mapping |
  | `ctx.set_source(pattern)` | `ctx.fillStyle = gradient` | Direct mapping |
  | `surface.write_to_png(path)` | `canvas.toBuffer('image/png')` + `fs.writeFileSync` | Buffer or stream |
  | N/A (gap in PyCairo renderer) | `ctx.createLinearGradient()` | Gradient was missing in PyCairo renderer — Canvas has it natively |

- **Implications**: Every PyCairo operation maps directly to Canvas 2D API equivalents. The Canvas API is actually more ergonomic (built-in `roundRect`, CSS font syntax, gradient fills already supported). The gradient rendering gap identified in the previous design is resolved for free by switching to Canvas API.

### Playwright Screenshot Capabilities
- **Context**: Evaluating headless browser screenshot for React components (unchanged from previous design)
- **Sources**: Playwright docs
- **Findings**:
  - `page.screenshot()` captures full page or element-level screenshots
  - Element-level: `element.screenshot()` captures a specific DOM element as PNG
  - Supports configurable viewport via `page.setViewportSize({width, height})`
  - Available for Node.js (TypeScript) — same language as CLI
- **Implications**: No change from previous design. Playwright screenshot capture is already TypeScript-native.

### pixelmatch Image Comparison
- **Context**: Evaluating pixel-level image comparison for visual diff (unchanged from previous design)
- **Sources**: pixelmatch GitHub repo
- **Findings**:
  - API: `pixelmatch(img1, img2, output, width, height, options)` → returns number of mismatched pixels
  - Works on raw typed arrays (Uint8Array) — requires PNG decoding first
  - ~150 lines, zero dependencies, works in Node.js
- **Implications**: No change from previous design. Already TypeScript-native.

### Font Loading in @napi-rs/canvas
- **Context**: The renderer needs to load Inter font family for text rendering
- **Sources**: @napi-rs/canvas API documentation
- **Findings**:
  - `GlobalFonts.registerFromPath(fontPath, familyName)` registers a font file (.otf/.ttf)
  - Fonts are available globally once registered
  - Font weight/style is selected via CSS font syntax: `ctx.font = 'bold 14px Inter'`
  - Weight mapping: `400` → normal, `500` → `500`, `600` → `600`, `700` → bold
  - Kerning and ligatures are handled by Skia's text layout engine
- **Implications**: Inter font files bundled in `packages/dsl-core/fonts/` are registered at renderer initialization. No system font dependency. Skia's text rendering is closer to Chrome's than PyCairo's toy text API, potentially reducing visual discrepancy vs React screenshots.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Single-Language TypeScript Pipeline | All stages in TypeScript with @napi-rs/canvas for rendering | Single process, no IPC overhead, shared types, simplified deployment | Relies on @napi-rs/canvas pre-built binaries for target platforms | Best fit: eliminates cross-language complexity |
| Cross-Language Pipeline (previous) | TypeScript DSL + Python/PyCairo renderer via subprocess | Proven PyCairo rendering patterns | Cross-language overhead, error propagation complexity, dual dependency management | Rejected: unnecessary complexity now that viable TS rendering exists |
| WASM Canvas (canvaskit-wasm) | Skia via WebAssembly, pure JS | No native binaries at all | Larger bundle, slower startup, non-standard API | Rejected: performance and API concerns |

## Design Decisions

### Decision: Replace PyCairo with @napi-rs/canvas (Single-Language Pipeline)
- **Context**: The previous design used a cross-language bridge (TypeScript DSL → JSON → Python/PyCairo renderer). This added subprocess management, error handling complexity, dual dependency management (npm + pip), and required system Cairo libraries.
- **Alternatives Considered**:
  1. Keep PyCairo — proven but adds unnecessary cross-language complexity
  2. node-canvas (Cairo bindings for Node.js) — same system dependency problem as PyCairo
  3. skia-canvas — viable but slower and less actively maintained than @napi-rs/canvas
  4. canvaskit-wasm — no native deps but non-standard API and performance overhead
  5. @napi-rs/canvas — Skia backend, zero system deps, pre-built binaries, fastest benchmarks, standard Canvas 2D API
- **Selected Approach**: @napi-rs/canvas as the rendering backend, making the entire pipeline single-language TypeScript
- **Rationale**: Zero system dependencies (pre-built Skia binaries for all major platforms). Standard Canvas 2D API means well-understood, well-documented drawing operations. Fastest in benchmarks. TypeScript-native means the renderer is an in-process module call, not a subprocess — eliminating IPC overhead and cross-language error handling. Gradient fills (a gap in the PyCairo renderer) are natively supported.
- **Trade-offs**: @napi-rs/canvas is v0.1.x (pre-1.0) but actively maintained with 332 dependents. Skia text rendering differs slightly from both PyCairo and browser Canvas — but is actually closer to Chrome's rendering than PyCairo was, which benefits the visual comparison workflow.
- **Follow-up**: Verify @napi-rs/canvas roundRect and gradient rendering against Figma's visual output for reference components.

### Decision: Declarative Factory Functions as Primary DSL API
- **Context**: Need ergonomic API for defining Figma component structures (unchanged from previous design)
- **Selected Approach**: Declarative factory functions with TypeScript type inference
- **Rationale**: Factory functions produce readable nested tree structures that mirror the component hierarchy.

### Decision: Auto-Layout Resolution in TypeScript Compiler
- **Context**: Figma's auto-layout computes child positions from layout properties (unchanged from previous design)
- **Selected Approach**: TypeScript compiler resolves auto-layout to absolute positions (transforms)
- **Rationale**: Keeps the renderer simple (just draw at given coordinates).

### Decision: Counter-Based GUID Generation
- **Context**: Each node has a unique GUID (unchanged from previous design)
- **Selected Approach**: Counter-based with sessionID=0 and auto-incrementing localID

### Decision: Skia ctx.measureText() for Text Measurement in Compiler (revised)
- **Context**: The Compiler must resolve HUG-contents sizing, which requires knowing child text node dimensions. Design review identified that using opentype.js (a separate text shaping engine) creates a dual-engine discrepancy risk with Skia-based rendering.
- **Alternatives Considered**:
  1. opentype.js — separate font parser, < 1px/glyph discrepancy vs Skia, compounds across multiple text nodes
  2. @napi-rs/canvas `ctx.measureText()` — same Skia engine as Renderer, zero discrepancy
- **Selected Approach**: @napi-rs/canvas `ctx.measureText()` for text measurement. opentype.js removed from dependencies.
- **Rationale**: Since the Renderer is now in-process (not a subprocess), the Compiler can use the same Skia text shaping engine for measurement. This eliminates measurement-rendering discrepancy entirely. A lightweight scratch canvas context is created for measurement (no pixel buffer allocation needed).
- **Trade-offs**: Adds @napi-rs/canvas as a Compiler dependency (previously only a Renderer dependency). Acceptable since both packages are in the same monorepo and share the dependency anyway.

### Decision: Two-Pass Layout Algorithm
- **Context**: Auto-layout resolution requires bottom-up measurement and top-down positioning (unchanged from previous design)
- **Selected Approach**: Two-pass algorithm: Pass 1 bottom-up measurement, Pass 2 top-down positioning

## Risks & Mitigations
- **@napi-rs/canvas pre-1.0 stability** — v0.1.x may have edge-case bugs → Mitigate with comprehensive rendering test suite; skia-canvas as fallback option with compatible Canvas 2D API
- **Auto-layout fidelity** — DSL layout may not match Figma's exact pixel calculations → Mitigate with two-pass layout algorithm verified against worked examples; visual comparison tests against Figma screenshots
- **Text measurement accuracy** — Eliminated as a risk. Compiler now uses `ctx.measureText()` from the same Skia engine as the Renderer, producing zero measurement-rendering discrepancy
- **Platform binary availability** — @napi-rs/canvas ships pre-built binaries for major platforms (Linux x64/arm64, macOS x64/arm64, Windows x64). Unsupported platforms cannot fall back to compilation → Mitigate by documenting supported platforms; CI runs on Linux x64
- **Font rendering differences** — Skia and Chrome may render text slightly differently → Expected to be minimal (both use Skia internally); absorbed by comparison threshold
- **Image dimension mismatch** — DSL render and React screenshot may differ in size → Implement resize/pad utility before comparison; report dimension differences as warnings

## References
- [@napi-rs/canvas npm](https://www.npmjs.com/package/@napi-rs/canvas) — Skia-based Canvas API for Node.js
- [@napi-rs/canvas GitHub](https://github.com/Brooooooklyn/canvas) — Source, API docs, benchmarks
- [skia-canvas npm](https://www.npmjs.com/package/skia-canvas) — Alternative Skia-based Canvas (fallback option)
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) — Standard Canvas 2D API reference
- [Figma Plugin API - createComponent](https://developers.figma.com/docs/plugins/api/properties/figma-createcomponent/) — Component creation API
- [Figma Plugin API - combineAsVariants](https://developers.figma.com/docs/plugins/api/properties/figma-combineasvariants/) — Variant grouping API
- [Figma Plugin API - layoutMode](https://developers.figma.com/docs/plugins/api/properties/nodes-layoutmode/) — Auto-layout properties
- [pixelmatch](https://github.com/mapbox/pixelmatch) — Pixel-level image comparison library
- [Playwright Screenshots](https://playwright.dev/docs/test-snapshots) — Visual comparison and screenshot automation
- [MDN TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) — Canvas measureText() return type documentation
