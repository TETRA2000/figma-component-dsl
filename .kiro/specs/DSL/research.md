# Research & Design Decisions

## Summary
- **Feature**: DSL Image Support Enhancement
- **Discovery Scope**: Extension
- **Key Findings**:
  - `@napi-rs/canvas loadImage()` is always async (decodes in background thread); renderer must adopt async rendering or pre-load images
  - Figma has no IMAGE node type — images are fills (`type: 'IMAGE'`) on rectangles/frames, with `imageHash` referencing stored image data
  - `figma.createImage(bytes)` accepts PNG/JPEG/GIF Uint8Array, max 4096px; `getImageByHash()` retrieves by hash, `getBytesAsync()` exports raw bytes

## Research Log

### @napi-rs/canvas loadImage() Behavior
- **Context**: Renderer is currently synchronous; need to understand if image loading forces async
- **Sources Consulted**: [npm @napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas), [GitHub repo](https://github.com/Brooooooklyn/canvas)
- **Findings**:
  - `loadImage(src)` returns `Promise<Image>` — always async
  - Accepts file paths, URLs, Buffer, and ArrayBuffer
  - Decoding always happens in a background thread (unlike older `canvas` package)
  - Supports PNG, JPEG, WebP, GIF, AVIF, SVG natively via Skia
  - Loaded `Image` object is used with `ctx.drawImage(image, dx, dy, dw, dh)` or the 9-arg overload for source cropping
- **Implications**:
  - Renderer `renderNode()` must become async, or all images must be pre-loaded into a cache (Map<string, Image>) before the synchronous render pass begins
  - Pre-loading approach is cleaner: collect all image sources from the compiled tree, load them all with `Promise.all()`, then pass the cache to the synchronous renderer

### Figma Plugin API Image Handling
- **Context**: Need to understand how to import images into Figma and how to read them back for changeset export
- **Sources Consulted**: [Image API](https://www.figma.com/plugin-docs/api/Image/), [Working with Images](https://www.figma.com/plugin-docs/working-with-images/), [createImage](https://www.figma.com/plugin-docs/api/properties/figma-createimage/), [createImageAsync](https://www.figma.com/plugin-docs/api/properties/figma-createimageasync/)
- **Findings**:
  - **No IMAGE node type in Figma** — images are fills on shapes (rectangles, frames, ellipses)
  - `figma.createImage(data: Uint8Array): Image` — creates image handle from raw bytes (PNG/JPEG/GIF only, max 4096px)
  - `figma.createImageAsync(url: string): Promise<Image>` — creates from URL
  - `figma.getImageByHash(hash: string): Image | null` — retrieves existing image
  - `image.hash: string` — unique identifier for the stored image
  - `image.getBytesAsync(): Promise<Uint8Array>` — exports raw image bytes
  - `image.getSizeAsync(): Promise<{width, height}>` — get image dimensions
  - Image fill format: `{ type: 'IMAGE', imageHash: string, scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE', imageTransform?: Transform }`
  - Figma's `scaleMode` values map 1:1 with our DSL scale modes
- **Implications**:
  - DSL `image()` node compiles to a RECTANGLE/FRAME with an IMAGE fill — not a separate node type in Figma
  - Plugin import: decode base64 → `Uint8Array` → `figma.createImage()` → get hash → set as IMAGE fill
  - Plugin export: iterate fills → find `type === 'IMAGE'` → `getImageByHash(hash)` → `getBytesAsync()` → base64 encode
  - Baseline snapshots store `imageHash` strings (tiny), not image bytes (large) — solves the 100KB limit concern
  - Changeset export must call `getBytesAsync()` only for changed images

### Plugin Data Size Strategy
- **Context**: Baselines are stored as JSON in plugin data with a 100KB limit
- **Findings**:
  - Image hashes are short strings (~40 chars) — negligible size impact
  - Only the `imageHash` and `scaleMode` need to be stored in baselines, not image bytes
  - The 100KB limit is not a concern for image metadata
- **Implications**: Store `imageHash` + `scaleMode` in baseline fills; retrieve actual bytes only during changeset export via `getBytesAsync()`

### Scale Mode Algorithms
- **Context**: Need to implement FILL/FIT/CROP/TILE rendering in the DSL renderer
- **Findings**:
  - **FILL** (CSS `object-fit: cover`): Scale image to cover entire frame, crop overflow. Scale factor = `max(frameW/imgW, frameH/imgH)`.
  - **FIT** (CSS `object-fit: contain`): Scale image to fit within frame, letterbox. Scale factor = `min(frameW/imgW, frameH/imgH)`.
  - **CROP**: Center the image at original size within the frame, clip overflow. No scaling.
  - **TILE** (CSS `background-repeat: repeat`): Tile image at original size to fill frame.
- **Implications**: All four modes require clipping to frame bounds. Canvas API provides `ctx.drawImage()` 9-arg form for source region, and `ctx.createPattern()` for tiling.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Pre-load cache | Collect image sources from tree, load all async, pass sync cache to renderer | Clean separation of async/sync, minimal renderer changes | Requires tree traversal pass before render | Recommended |
| Async renderer | Make renderNode() async throughout | Simple integration | Cascading async changes in entire renderer, performance overhead | Not recommended |
| Inline loading | Load each image during renderNode() | Simplest code | Cannot remain synchronous, no caching | Not viable |

## Design Decisions

### Decision: Pre-load Image Cache
- **Context**: Renderer is synchronous but `loadImage()` is async
- **Alternatives Considered**:
  1. Make entire renderer async
  2. Pre-load all images into a Map before rendering
- **Selected Approach**: Pre-load cache — traverse compiled tree to collect image sources, `Promise.all(loadImage(...))`, pass `Map<string, Image>` to renderer
- **Rationale**: Minimizes changes to synchronous renderer logic; enables batch image reuse naturally
- **Trade-offs**: Extra tree traversal pass, but this is fast for typical component trees
- **Follow-up**: Verify `loadImage()` can accept both file paths and URLs

### Decision: IMAGE as Internal Node Type, RECTANGLE/FRAME in Figma
- **Context**: Figma has no IMAGE node type — images are fills on shapes
- **Alternatives Considered**:
  1. DSL IMAGE type maps to a special RECTANGLE with IMAGE fill in Figma
  2. No IMAGE node type, only imageFill() on existing nodes
- **Selected Approach**: Both — `image()` creates a DslNode with `type: 'IMAGE'` that the compiler/exporter converts to a RECTANGLE with IMAGE fill for Figma; `imageFill()` works on any node
- **Rationale**: Provides clean DSL authoring experience (`image('Photo', {...})`) while respecting Figma's data model
- **Trade-offs**: Slight abstraction gap between DSL and Figma representation
- **Follow-up**: Document the mapping clearly in dsl-reference.md

### Decision: Hash-based Baseline, Bytes on Changeset Export
- **Context**: Plugin baselines have 100KB limit; image bytes can be megabytes
- **Selected Approach**: Store `imageHash` strings in baselines; call `getBytesAsync()` only during changeset export for changed images
- **Rationale**: Hashes are tiny (~40 chars), bytes are large; only materialize bytes when needed
- **Trade-offs**: Changeset export is slower (must fetch bytes), but this is an infrequent operation

### Decision: Split image-utils into pure and native modules
- **Context**: Design review identified that placing `image-utils.ts` (with `@napi-rs/canvas` dependency) in `dsl-core` would break its zero-runtime-dependency architecture
- **Alternatives Considered**:
  1. Single `image-utils.ts` in `dsl-core` (original design)
  2. Separate `image-helpers.ts` (pure, dsl-core) + `image-loader.ts` (native, renderer)
  3. New `@figma-dsl/image-utils` package
- **Selected Approach**: Option 2 — split into `dsl-core/src/image-helpers.ts` (pure math: `computeDrawInstruction`, `isSupportedImageFormat`) and `renderer/src/image-loader.ts` (native: `preloadImages`, `collectImageSources`, `resolveImageSource`)
- **Rationale**: Preserves `dsl-core`'s zero-dependency guarantee. Pure functions are importable anywhere without pulling in 50MB native binary. Native I/O stays in renderer which already depends on `@napi-rs/canvas`.
- **Trade-offs**: Exporter needs to inline trivial `imageToBase64()` (fs.readFile + Buffer.toString) rather than importing from a shared module
- **Follow-up**: Verify exporter does not need any other image-loader functions

### Decision: Discriminated union for DrawInstruction (TILE mode fix)
- **Context**: Design review identified that `ScaleResult` (single source→dest rectangle) cannot express TILE mode, which uses `ctx.createPattern()` instead of `ctx.drawImage()`
- **Alternatives Considered**:
  1. Single `ScaleResult` with special sentinel values for TILE
  2. Discriminated union: `SingleDrawInstruction | TileInstruction`
  3. Document TILE as handled separately, outside `computeScaleMode()`
- **Selected Approach**: Option 2 — `DrawInstruction = SingleDrawInstruction | TileInstruction` discriminated by `type: 'draw' | 'tile'`
- **Rationale**: Type-safe dispatch in renderer via exhaustive switch. No sentinel values or special cases. Renderer explicitly handles both branches.
- **Trade-offs**: Slightly more complex interface, but eliminates ambiguity
- **Follow-up**: None

## Risks & Mitigations
- **Image loading failures (network/disk)**: Draw crosshatch placeholder, log warning, continue rendering — never fail entire pipeline
- **Large images slowing pipeline**: Validator warns at >10 MB; exporter warns at >4 MB base64; no hard failures
- **Plugin sandbox restrictions**: `figma.createImage()` works in plugin sandbox; `fetch()` requires UI iframe relay for URLs — use `createImageAsync(url)` instead
- **GIF not in DSL spec**: Figma accepts GIF via `createImage()` but DSL specifies PNG/JPEG/WebP only — accept GIF silently if encountered

## References
- [@napi-rs/canvas npm](https://www.npmjs.com/package/@napi-rs/canvas)
- [@napi-rs/canvas GitHub](https://github.com/Brooooooklyn/canvas)
- [Figma Plugin API: Image](https://www.figma.com/plugin-docs/api/Image/)
- [Figma Plugin API: Working with Images](https://www.figma.com/plugin-docs/working-with-images/)
- [Figma Plugin API: createImage](https://www.figma.com/plugin-docs/api/properties/figma-createimage/)
- [Figma Plugin API: createImageAsync](https://www.figma.com/plugin-docs/api/properties/figma-createimageasync/)
