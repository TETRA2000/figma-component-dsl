# Research & Design Decisions — Banner Mode

## Summary
- **Feature**: `banner-mode`
- **Discovery Scope**: Extension (complex — touches all pipeline packages)
- **Key Findings**:
  - @napi-rs/canvas supports shadows, `globalCompositeOperation`, and `filter` natively via Skia; background blur requires off-screen compositing
  - WOFF2 is NOT supported by @napi-rs/canvas; requires `@woff2/woff2-rs` for conversion to TTF
  - Noto Sans JP is available as a variable font (single .ttf covering all weights); the bundled file likely already supports weight 100–900
  - Gradient text is achievable by setting `fillStyle` to a `CanvasGradient` before calling `fillText()`

## Research Log

### @napi-rs/canvas WOFF2 Font Support
- **Context**: Requirement 5 specifies `.woff2` support for `registerFont()`
- **Sources**: [npm @napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas), [node-woff2-rs](https://github.com/yisibl/node-woff2-rs), [Skia font discussion](https://groups.google.com/g/skia-discuss/c/cTYop75mDnQ)
- **Findings**:
  - Skia (the underlying engine) does NOT support `.woff` or `.woff2` natively
  - `GlobalFonts.registerFromPath()` only accepts `.ttf` and `.otf`
  - `@woff2/woff2-rs` can decode WOFF2 → TTF in memory (Rust-based, cross-platform)
  - `GlobalFonts.register(buffer, familyName)` can accept the decoded TTF buffer
  - Known issue: buffer-registered fonts must keep a reference to avoid GC invalidation
- **Implications**: `registerFont()` DSL API must transparently detect `.woff2` files and decompress them before registering with @napi-rs/canvas. Add `@woff2/woff2-rs` as an optional dependency.

### @napi-rs/canvas Shadow and Effects Support
- **Context**: Requirements 3 and 6 require shadows, blur, and blend modes
- **Sources**: [Brooooooklyn/canvas roadmap #113](https://github.com/Brooooooklyn/canvas/issues/113), [shadow bug #856](https://github.com/Brooooooklyn/canvas/issues/856), [ctx.rs source](https://github.com/Brooooooklyn/canvas/blob/main/src/ctx.rs)
- **Findings**:
  - `shadowBlur`, `shadowColor`, `shadowOffsetX`, `shadowOffsetY` are implemented in Rust
  - `globalCompositeOperation` is supported (maps to Skia blend modes)
  - `filter` property is on the roadmap and supports CSS-like filter syntax (`blur()`, `grayscale()`, etc.)
  - Known bug: shadows with `ctx.translate()` may offset incorrectly — mitigate by applying shadow before transforms
  - Background blur requires multi-step: render background → apply blur filter on off-screen canvas → composite
- **Implications**: Drop shadows and blend modes can use native canvas API. Layer blur via `filter: 'blur(Xpx)'`. Background blur requires manual off-screen rendering pipeline.

### Gradient Text Rendering
- **Context**: Requirement 3.4 — gradient fills on text glyphs
- **Sources**: [MDN strokeText](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText), [W3Schools gradients](https://www.w3schools.com/graphics/canvas_gradients.asp)
- **Findings**:
  - `fillStyle` can be set to a `CanvasGradient` object before calling `fillText()`
  - `strokeStyle` can also be a gradient for outlined gradient text
  - No clipping workaround needed — gradient fills work directly with text methods
  - Gradient coordinates are relative to canvas, so text position must inform gradient bounds
- **Implications**: Gradient text is straightforward. Create gradient matching text bounding box, set as `fillStyle`, call `fillText()`. No special compositing required.

### Noto Sans JP Weight Coverage
- **Context**: Requirement 4 — Japanese fonts with weights 100–900
- **Sources**: [Google Fonts Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP), [Fontsource](https://fontsource.org/fonts/noto-sans-jp), [Google Fonts issue #6187](https://github.com/google/fonts/issues/6187)
- **Findings**:
  - Noto Sans JP is available as a variable font (single file, all weights)
  - Static fonts come in 7 weights: ExtraLight, Light, Normal, Regular, Medium, Bold, Heavy
  - Variable font maps to CSS `font-weight: 100` through `900`
  - The bundled `NotoSansJP.ttf` (9.5 MB) is likely the variable font given its size
  - @napi-rs/canvas uses Skia, which supports OpenType variable font `wght` axis
- **Implications**: If the bundled file is variable, weights 100–900 already work. Verify during implementation by rendering different weights. If it's a single static weight, replace with the variable version from Google Fonts.

### Mixed-Script Font Fallback
- **Context**: Requirement 4.4 — mixed Latin-Japanese text in single node
- **Findings**:
  - Current `chooseFontFamily()` returns one font per text node based on CJK regex
  - @napi-rs/canvas does not provide per-glyph font fallback
  - Skia's `FontMgr` can do fallback but it's not exposed in the JS API
  - Alternative: text run segmentation — split text into Latin/CJK runs, measure and render each with appropriate font
- **Implications**: Per-glyph fallback is not feasible with current API. For Banner Mode, document that mixed text nodes should use Noto Sans JP (which includes Latin glyphs) or split into separate text nodes. Phase 2 enhancement could add run segmentation.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| A: Extend Only | Add mode/effects inline to existing packages | Minimal new files, fast | Renderer bloat, scattered conditionals | Viable for MVP |
| B: New Packages | Separate banner-renderer, banner-compiler | Clean isolation | Code duplication, breaks conventions | Over-engineered |
| C: Hybrid | Extend core + new effects module | Balanced growth, testable effects | One new package | Recommended |

## Design Decisions

### Decision: Mode Detection Mechanism
- **Context**: How does the pipeline know a DSL file uses Banner Mode?
- **Alternatives Considered**:
  1. Named export: `export const mode = 'banner'`
  2. File extension: `.banner.dsl.ts`
  3. Wrapper function: `bannerMode(node)`
- **Selected Approach**: Named export (`export const mode = 'banner'`)
- **Rationale**: Least disruptive to existing tooling. CLI already does dynamic import; checking for `mod.mode` is trivial. No file naming convention changes. TypeScript gives autocomplete on the export.
- **Trade-offs**: Requires DSL authors to add a named export; not enforced by file system conventions
- **Follow-up**: Add TypeScript type for valid mode values; update CLI module loader

### Decision: Effects Architecture
- **Context**: Where do shadow, blur, and blend mode implementations live?
- **Alternatives Considered**:
  1. Inline in renderer (Option A)
  2. New `packages/effects/` module (Option C)
- **Selected Approach**: Inline in renderer, with helper functions extracted into a local `effects.ts` file within the renderer package
- **Rationale**: Effects are renderer-specific canvas operations. Creating a separate package adds overhead without clear reuse beyond renderer. The exporter maps to Figma properties, not canvas operations. Keep effects co-located with rendering logic; extract to a package later if reuse emerges.
- **Trade-offs**: Renderer grows by ~200 lines; but effects helpers are testable in isolation within the package
- **Follow-up**: If effects mapping for exporter grows complex, revisit extraction

### Decision: Font Registration API
- **Context**: How do DSL authors register custom fonts?
- **Alternatives Considered**:
  1. DSL-level function: `registerFont(path, options)` called in `.dsl.ts` file
  2. CLI flag: `--font-dir` pointing to a directory
  3. Config file: `fonts.json` in project root
- **Selected Approach**: DSL-level function `registerFont(path, { family, weight?, style? })`
- **Rationale**: Co-located with the DSL file that uses the font. Explicit and discoverable. Allows per-file font declarations. CLI already has `--asset-dir` for path resolution.
- **Trade-offs**: Font registration happens at module load time (side effect); fonts must be registered before compilation
- **Follow-up**: Collect registered fonts during module import; pass to compiler and renderer initialization

### Decision: WOFF2 Handling
- **Context**: Requirement 5 specifies `.woff2` support but Skia doesn't support it
- **Selected Approach**: Transparent WOFF2 → TTF decompression using `@woff2/woff2-rs`
- **Rationale**: Users expect `.woff2` to "just work". Conversion is fast and lossless.
- **Trade-offs**: Adds optional dependency (~2 MB); conversion adds minor latency on first load
- **Follow-up**: Make `@woff2/woff2-rs` a peer dependency; graceful error if not installed when `.woff2` is used

## Risks & Mitigations
- **Shadow + translate bug** — Apply shadow properties before coordinate transforms; test with absolute-positioned nodes
- **Background blur complexity** — Implement as off-screen canvas composite; may have performance cost for large areas. Consider limiting to Banner Mode only (already the case by design)
- **Variable font weight verification** — If bundled NotoSansJP.ttf is not variable, replace with variable version from Google Fonts (adds ~5 MB)
- **Buffer GC for woff2 fonts** — Keep references to decoded TTF buffers in a module-level Map to prevent garbage collection

## References
- [@napi-rs/canvas npm](https://www.npmjs.com/package/@napi-rs/canvas) — Canvas API documentation
- [Brooooooklyn/canvas roadmap](https://github.com/Brooooooklyn/canvas/issues/113) — Feature support status
- [node-woff2-rs](https://github.com/yisibl/node-woff2-rs) — WOFF2 decompression library
- [Google Fonts Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) — Font specimen and downloads
- [MDN globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) — Blend mode reference
- [MDN CanvasRenderingContext2D filter](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) — CSS filter syntax for canvas
