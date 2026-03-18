# Research & Design Decisions

## Summary
- **Feature**: `svg`
- **Discovery Scope**: Extension (existing pipeline system)
- **Key Findings**:
  - `@resvg/resvg-js` is the best SVG rasterization library — Rust/NAPI-based (like @napi-rs/canvas), zero dependencies, 12 ops/s benchmark, renders SVG string → PNG buffer directly
  - `@napi-rs/canvas` `loadImage()` has limited SVG support — SVG data URLs may fail, embedded `<image>` elements render blank; not reliable for arbitrary SVGs
  - `figma.createNodeFromSvg()` returns a `FrameNode` wrapping native vector nodes; `exportAsync({ format: 'SVG_STRING' })` can export back to SVG, but path data may differ from input (Figma normalizes vector paths)

## Research Log

### SVG Rasterization in Node.js
- **Context**: The renderer uses @napi-rs/canvas for PNG output. SVG nodes need rasterization to PNG within this pipeline.
- **Sources Consulted**:
  - [@resvg/resvg-js npm](https://www.npmjs.com/package/@resvg/resvg-js)
  - [@resvg/resvg-js GitHub](https://github.com/thx/resvg-js)
  - [@napi-rs/canvas SVG issues](https://github.com/Brooooooklyn/canvas/issues/859)
- **Findings**:
  - `@resvg/resvg-js`: Rust-based, NAPI binding (same approach as @napi-rs/canvas). Renders SVG string → PNG `Buffer` directly. Supports system fonts, custom fonts, all SVG features. Benchmarks show 12 ops/s vs sharp at 9 ops/s. v2 supports width/height detection and simplified SVG output.
  - `@napi-rs/canvas loadImage()`: Can load PNG/JPG from paths and URLs. SVG support is partial — basic shapes/paths work from file paths, but SVG data URLs cause "Unsupported image type" errors. Embedded `<image>` elements in SVGs render blank. Not reliable for arbitrary SVG content.
  - `sharp`: Can convert SVG to PNG but is a large dependency with libvips; overkill for this use case.
- **Implications**: Use `@resvg/resvg-js` for SVG rasterization. It produces a PNG buffer that can be drawn onto the @napi-rs/canvas via `loadImage()` from the buffer. This two-step approach (resvg → PNG buffer → canvas drawImage) integrates cleanly with the existing renderer.

### Figma Plugin SVG APIs
- **Context**: Need to create SVG nodes in Figma and export them back for bidirectional sync.
- **Sources Consulted**:
  - [Figma Plugin API: figma global](https://developers.figma.com/docs/plugins/api/figma/)
  - [Figma exportAsync](https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/)
  - [Figma VectorNode](https://developers.figma.com/docs/plugins/api/VectorNode/)
  - [Figma Forum: SVG round-trip issues](https://forum.figma.com/t/exporting-svg-elements-using-figma-api-issue/37188)
- **Findings**:
  - `figma.createNodeFromSvg(svgString)` → returns `FrameNode` containing native vector nodes. Figma decomposes the SVG into its internal node types (VectorNode, GroupNode, etc.).
  - `node.exportAsync({ format: 'SVG_STRING' })` → returns SVG string from any node. Available since Plugin API Update 64.
  - **Round-trip fidelity issue**: Exported SVG path data may differ from input. Figma normalizes vector paths internally, so `createNodeFromSvg(svg) → exportAsync('SVG_STRING')` may produce semantically equivalent but textually different SVG.
  - Export settings: `svgOutlineText` (default true, renders text as outlines), `svgIdAttribute` (include layer names as IDs), `svgSimplifyStroke` (approximate inside/outside strokes).
- **Implications**: SVG round-trip is lossy at the text level. For changeset detection, content hashing on the original SVG is insufficient — must compare exported SVG against a stored baseline export, not the original source. Plugin should store both the original SVG content hash AND the Figma-normalized SVG baseline.

### Changeset Schema for SVG Nodes
- **Context**: Existing changeset uses `PropertyChange` with `propertyPath` strings. SVG changes are fundamentally different — they're vector data, not discrete properties.
- **Sources Consulted**: `packages/dsl-core/src/changeset.ts` (lines 1-43)
- **Findings**:
  - Current `PropertyChange` has `propertyPath`, `changeType`, `oldValue`, `newValue`, `description`, optional `imageData`.
  - SVG changes don't map well to property paths. The entire SVG content is the value.
  - Using `propertyPath: 'svgContent'` with `newValue` containing the full exported SVG string is the simplest approach.
- **Implications**: Treat SVG changes as full content replacement via existing `PropertyChange` structure with `propertyPath: 'svgContent'` and `newValue: '<svg>...</svg>'`. No need for a new changeset type — leverage existing schema.

### Banner-to-Canvas Mode Rename Scope
- **Context**: Need to understand the blast radius of renaming 'banner' to 'canvas' across the codebase.
- **Sources Consulted**: Grep across all packages
- **Findings**:
  - `CompilerMode` type: `compiler/src/types.ts:123`
  - `PluginInput.mode`: `dsl-core/src/plugin-types.ts:89`
  - `ValidationPreset`: `validator/src/types.ts:3` and `validator/src/presets.ts:53-65`
  - Compiler mode checks: `compiler/src/compiler.ts` (lines 421-488)
  - Layout resolver: `compiler/src/layout-resolver.ts:359-369`
  - Exporter: `exporter/src/exporter.ts:239`
  - CLI mode detection: `cli/src/cli.ts:70-78`
  - Test files: `compiler/src/compiler.test.ts`, `exporter/src/exporter.test.ts`
  - Documentation: `docs/dsl-reference.md`
- **Implications**: ~20 files need changes. Strategy: add `'canvas'` as the primary value to `CompilerMode`, keep `'banner'` accepted, normalize `'banner'` → `'canvas'` at CLI entry point with deprecation warning.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Extend existing packages | Add SVG case to each pipeline package | Follows IMAGE pattern, minimal new code, no new packages | Renderer gets a new dependency (@resvg/resvg-js) | Recommended; aligns with steering |
| New SVG package | Dedicated `packages/svg-handler/` | Isolated SVG complexity | Over-engineered, breaks single-responsibility per package | Rejected |
| Hybrid utilities | Shared SVG utils in dsl-core | Reusable parsing/hashing | Premature abstraction if utilities are small | Deferred; can extract later if needed |

## Design Decisions

### Decision: SVG Rasterization via @resvg/resvg-js
- **Context**: Renderer needs to convert SVG content to pixels on canvas
- **Alternatives Considered**:
  1. `@napi-rs/canvas loadImage()` with SVG — unreliable for arbitrary SVGs
  2. `sharp` — large dependency, overkill
  3. `@resvg/resvg-js` — Rust/NAPI, purpose-built for SVG rendering
- **Selected Approach**: `@resvg/resvg-js` renders SVG string → PNG buffer, then `@napi-rs/canvas loadImage(buffer)` draws it on canvas
- **Rationale**: Same NAPI/Rust architecture as existing canvas dependency. Zero additional system dependencies. Highest benchmark performance. Supports custom fonts.
- **Trade-offs**: New production dependency (+1), but it's a focused, well-maintained library
- **Follow-up**: Verify font loading compatibility between resvg-js and the existing font-manager

### Decision: SVG Changeset as Full Content Replacement
- **Context**: Need to represent SVG changes in the existing changeset schema
- **Alternatives Considered**:
  1. Property-level SVG diffs — complex, fragile, requires SVG DOM parsing
  2. Full content replacement via existing `PropertyChange` — simple, reliable
  3. New changeset type — unnecessary schema extension
- **Selected Approach**: Use existing `PropertyChange` with `propertyPath: 'svgContent'` and `newValue` containing the full exported SVG string
- **Rationale**: SVG is opaque vector data best treated atomically. Property-level diffing adds complexity without meaningful benefit.
- **Trade-offs**: Larger changeset payloads for big SVGs, but simplicity outweighs bandwidth concerns

### Decision: Mode Rename Strategy — Canonical Canvas with Banner Alias
- **Context**: 'banner' mode is too narrow for SVG and general canvas-mode use cases
- **Alternatives Considered**:
  1. Big-bang rename — removes banner entirely, breaks existing files
  2. Canonical `'canvas'` with `'banner'` deprecated alias — backward compatible
- **Selected Approach**: `'canvas'` is the canonical mode. `'banner'` accepted at CLI entry and normalized to `'canvas'` with deprecation warning. Internal pipeline uses `'canvas'` only.
- **Rationale**: Backward compatibility with existing `.dsl.ts` files. Single internal representation avoids mode-string proliferation.
- **Trade-offs**: Temporary dual-string support at entry points; clean internally

## Risks & Mitigations
- **SVG round-trip fidelity** — Figma normalizes SVG paths, so exported SVG differs from input. Mitigation: store Figma-normalized baseline for comparison, not original source.
- **Large SVG performance** — Very complex SVGs may slow rasterization. Mitigation: log render time, add optional size limit warning in validator.
- **@resvg/resvg-js platform support** — NAPI binary must be available for all target platforms. Mitigation: resvg-js supports all major platforms (Linux, macOS, Windows, ARM) and has WASM fallback.

## References
- [@resvg/resvg-js npm](https://www.npmjs.com/package/@resvg/resvg-js)
- [@resvg/resvg-js GitHub](https://github.com/thx/resvg-js)
- [Figma Plugin API: figma global](https://developers.figma.com/docs/plugins/api/figma/)
- [Figma exportAsync](https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/)
- [Figma VectorNode](https://developers.figma.com/docs/plugins/api/VectorNode/)
- [@napi-rs/canvas GitHub](https://github.com/Brooooooklyn/canvas)
