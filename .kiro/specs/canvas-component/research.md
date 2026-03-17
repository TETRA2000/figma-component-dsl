# Research & Design Decisions: canvas-component

## Summary
- **Feature**: canvas-component (DslCanvas + Figma Native Slot Detection + Unified Export)
- **Discovery Scope**: Extension (adding native slot detection and bundled export to existing DslCanvas pipeline)
- **Key Findings**:
  - Figma's `SLOT` NodeType is NOT in the official Plugin API typings yet (beta feature); slots likely appear as FRAME nodes
  - Slot detection must use `componentPropertyDefinitions` with type `"SLOT"` and naming conventions, not node type checking
  - `exportAsync` API is stable and supports PNG with SCALE constraint; already used in codebase
  - No ZIP utilities exist in codebase; base64 embedding is proven; fflate is a suitable sandbox-compatible ZIP library
  - The renderer uses @napi-rs/canvas (Node-native) and cannot run in browser; DslCanvas React component requires server-side rendering
  - Slots pattern (FRAME with `isSlot: true`) provides a proven template for canvas nodes

## Research Log

### Browser vs Node Rendering Constraint
- **Context**: DslCanvas React component needs to display DSL-rendered PNGs, but the renderer uses @napi-rs/canvas which is Node-only
- **Sources Consulted**: packages/renderer/src/renderer.ts, Vite dev server middleware patterns
- **Findings**:
  - @napi-rs/canvas provides Node-native Canvas 2D API; no browser equivalent
  - Vite exposes `configureServer()` hook for custom middleware in dev mode
  - Build-time rendering via Vite plugin `transform` hook can inline pre-rendered PNGs
- **Implications**: Two-mode architecture required — dev server middleware for HMR, build-time plugin for production.

### Slot Pattern Reuse for Canvas Nodes
- **Context**: Need to determine whether canvas uses a new NodeType or extends FRAME like slots
- **Sources Consulted**: dsl-core/src/types.ts, dsl-core/src/nodes.ts, compiler/src/compiler.ts
- **Findings**:
  - Slots are FRAME nodes with `isSlot: true` metadata — no new Figma node type needed
  - Compiler validates slots only inside COMPONENT/COMPONENT_SET; canvas nodes are standalone
  - Exporter/plugin encode slot metadata as additional properties on PluginNodeDef
- **Implications**: Canvas nodes should be FRAME-type with `isCanvas: true` metadata, following the slot pattern.

### Figma Slots API Status
- **Context**: User discovered that `componentPropertyDefinitions` with type SLOT doesn't programmatically create slots. Need to understand what IS available for detection.
- **Sources Consulted**:
  - [Figma Plugin API Node Types](https://www.figma.com/plugin-docs/api/nodes/)
  - [Use slots in Figma](https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma)
  - [Custom Elements Manifest and Figma Code Connect](https://jamesiv.es/blog/frontend/javascript/2025/09/21/custom-elements-manifest-and-figma-code-connect/)
  - [Schema 2025 announcements](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025)
  - **Actual DSL JSON captured from plugin** (before/after converting a RECTANGLE frame into a Slot)
- **Findings**:
  - `"SLOT"` is NOT in the `NodeType` union in current Plugin API **typings**, BUT the actual Figma runtime DOES expose `node.type === "SLOT"` for **wrapped** slot nodes
  - **Two distinct Figma slot creation methods** — confirmed via real export data:
    1. **"Wrap in new slot"** (e.g., on a RECTANGLE): Creates a NEW `type: "SLOT"` node that wraps the original element as its child. SLOT nodes have frame-like properties (size, opacity, visible, children, clipContent) but NO auto-layout properties.
    2. **"Convert to slot"** (e.g., on a FRAME with auto-layout): The FRAME **keeps its `type: "FRAME"`** — it does NOT become `type: "SLOT"`. Instead, only a `componentPropertyDefinitions` entry is added on the parent component (e.g., `"Footer#1:3": { "type": "SLOT" }`). The frame retains all its original properties including auto-layout.
  - `componentPropertyDefinitions` gets a `"Name#N:M": { "type": "SLOT" }` entry for BOTH creation methods — this is the **only reliable universal signal**
  - The property key format is `"{LayerName}#{N}:{M}"` where `{LayerName}` matches the child node's `name` property
  - **Cannot create** slots programmatically, but **can detect** existing ones
  - `ComponentPropertyType` already includes `'SLOT'` in dsl-core/src/types.ts
- **Implications**:
  - **`node.type === "SLOT"` is NOT sufficient** for detection — it only catches "Wrap in new slot" cases
  - **`componentPropertyDefinitions` is the universal detection method** — present for both creation methods
  - Detection requires: (1) read `componentPropertyDefinitions` on parent component, (2) match SLOT-type entries to children by layer name, (3) also check `node.type === "SLOT"` for wrapped slots
  - The serializer already captures `node.type` as-is, so SLOT nodes flow through naturally
  - Converted-to-slot FRAME nodes are indistinguishable from regular frames without checking `componentPropertyDefinitions`

### Figma exportAsync API
- **Context**: Need to capture pixel-perfect images of slot content at export time
- **Sources Consulted**:
  - [exportAsync API docs](https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/)
  - [ExportSettings API docs](https://developers.figma.com/docs/plugins/api/ExportSettings/)
- **Findings**:
  - `node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } })` → `Uint8Array`
  - Defaults to PNG at 1x if no settings provided
  - Supports SCALE, WIDTH, HEIGHT constraint types
  - Already used in codebase at code.ts lines 1420-1452
- **Implications**:
  - Proven pattern in existing code — extend for slot image capture
  - Scale constraint maps cleanly to user-configurable 1x/2x/3x/4x

### Existing Image Embedding Patterns
- **Context**: Need to embed slot images in export output
- **Sources Consulted**: packages/plugin/src/code.ts (lines 755-785, 188-240)
- **Findings**:
  - `embedImageDataForChange()` already embeds base64 image data in changesets
  - Uses `figma.base64Encode(bytes)` for encoding
  - Data URI format: `data:image/png;base64,{base64}`
  - `toFigmaPaints()` / `applyFillsWithImages()` handle round-trip base64 images
  - No ZIP utilities in codebase
- **Implications**:
  - Base64 embedding is proven and well-integrated
  - ZIP packaging needs new dependency

### ZIP Packaging in Figma Plugin Sandbox
- **Context**: Requirements specify ZIP for large payloads; plugin sandbox has limited APIs
- **Findings**:
  - Figma plugin sandbox has no fs, no Node.js built-ins
  - fflate (~8KB gzipped) is pure JS, no dependencies, proven in browser/sandbox environments
  - ZIP can be generated as Uint8Array in sandbox, sent to UI for download
  - Alternative: pako (deflate only, no ZIP container)
- **Implications**:
  - fflate is the best fit for plugin sandbox ZIP generation
  - ZIP generation in sandbox, download trigger via UI postMessage

### Existing Pipeline Extension Points
- **Context**: Map all files requiring modification across the pipeline
- **Sources Consulted**: compiler, renderer, exporter, plugin source code
- **Findings**:
  - Compiler: clear slot metadata passthrough block — canvas passthrough inserts after
  - Renderer: canvas nodes render as FRAME (their actual type) with no special case
  - Exporter: slot metadata block in `convertToPluginNode()` — canvas metadata inserts after
  - Plugin: export flow via `computeChangeset()` and `computeCompleteExport()` — image bundling hooks into both
  - Plugin: WebSocket relay via `handleWsMessage()` — export results sent to MCP server
- **Implications**: Changes are additive. Image bundling is a post-processing step after existing export logic.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| FRAME with isCanvas metadata | Canvas nodes are FRAME with `isCanvas: true` flag | Reuses slot pattern, Figma-compatible | Must ensure metadata propagates | Selected for DslCanvas |
| Inline base64 only | Always embed images as base64 in JSON | Simple, no new dependencies | Large payloads bloat JSON | Adequate for small exports |
| ZIP only | Always package as ZIP | Consistent format, handles any size | Overkill for small, requires ZIP lib | Too heavy for small |
| Hybrid base64/ZIP | Base64 below threshold, ZIP above | Best UX for both sizes | Two code paths, threshold tuning | Selected per requirements |
| componentPropertyDefs detection | Check SLOT type in componentPropertyDefinitions | Universal — works for BOTH slot creation methods | Requires access to parent component | **Selected as primary** — only universal method |
| node.type === SLOT detection | Check serialized node type directly | Direct, high confidence for wrapped slots | Only detects "Wrap in new slot" — misses "Convert to slot" frames | Secondary signal, not universal |
| Naming convention detection | Check `[Slot]` prefix on layer names | Works for DSL-created slots | Fragile for designer-created content | Last resort fallback |

## Design Decisions

### Decision: FRAME-based Canvas with Metadata Annotation
- **Context**: Canvas nodes need to flow through compilation, rendering, export, and plugin creation
- **Alternatives Considered**:
  1. New CANVAS NodeType — requires changes to every type union and switch dispatch
  2. FRAME with `isCanvas: true` — follows proven slot pattern
- **Selected Approach**: FRAME with `isCanvas: true` metadata
- **Rationale**: Minimizes invasive changes; Figma has no native Canvas node type; proven pattern for slots
- **Trade-offs**: Canvas and slot metadata could conflict (mitigated by validation)

### Decision: Server-Side Rendering for DslCanvas Component
- **Context**: React components run in browser but renderer needs @napi-rs/canvas (Node-only)
- **Selected Approach**: Vite plugin providing dev server middleware and build-time transform
- **Rationale**: Reuses existing renderer without modification; HMR support from Vite

### Decision: Slot Detection Strategy
- **Context**: Real export data reveals TWO distinct slot creation methods with different serialization:
  - "Wrap in new slot" → creates `type: "SLOT"` node (wraps original as child)
  - "Convert to slot" → keeps `type: "FRAME"` unchanged, only adds `componentPropertyDefinitions` entry
- **Alternatives Considered**:
  1. `node.type === "SLOT"` only — misses "Convert to slot" frames (they stay FRAME type)
  2. `componentPropertyDefinitions` only — universal, but requires parent component access and name matching
  3. Combined: `componentPropertyDefinitions` as primary, `node.type === "SLOT"` as supplementary
- **Selected Approach**: Primary: `componentPropertyDefinitions` for `type: "SLOT"` entries, matching children by layer name (universal). Supplementary: `node.type === "SLOT"` for direct identification of wrapped slots. DslCanvas plugin data for canvas regions.
- **Rationale**: `componentPropertyDefinitions` is the ONLY method that detects both creation paths. The key format `"{LayerName}#N:M"` allows matching to children by extracting the name before `#`. `node.type === "SLOT"` provides additional confirmation for wrapped slots.
- **Trade-offs**: Requires parsing `componentPropertyDefinitions` keys; name matching could break if layer names contain `#`. Still need `(node.type as string) === "SLOT"` for TypeScript.
- **Follow-up**: Monitor Figma typings for SLOT NodeType addition; test edge cases with renamed slot layers.

### Decision: Hybrid base64/ZIP Export
- **Context**: Bundle images with JSON, handling both small and large payloads
- **Selected Approach**: Hybrid with 1 MB default threshold
- **Rationale**: Matches user's request. Small exports stay as simple JSON. Large exports get proper packaging.
- **Trade-offs**: Two code paths; fflate dependency added to plugin

### Decision: Plugin-side Image Rendering
- **Context**: Where to render slot content images — plugin or UI thread?
- **Selected Approach**: All rendering in plugin sandbox via `exportAsync`
- **Rationale**: `exportAsync` runs in Figma's rendering engine, produces pixel-perfect output. UI thread has no access to canvas nodes.

### Design Review Findings (Post-Validation)
- **Context**: Design review identified three addressable issues before task generation
- **Findings**:
  1. **Native Slot round-trip limitation**: No public API exists to recreate SLOT nodes programmatically. Components re-imported via plugin will lose slot semantics. Mitigation: document as known limitation, store slot metadata in `pluginData` for future API availability.
  2. **`componentPropertyDefinitions` key parsing fragility**: The `"{LayerName}#{N}:{M}"` key format is an internal Figma convention. Layer names containing `#` break naive splitting; renamed layers cause match failures. Mitigation: split on **last** `#` instead of first; add positional fallback correlation when name matching fails, with warning logging.
  3. **No cancellation for long-running exports**: The detect → capture → bundle pipeline lacks abort support. For components with many slots at high scale, designers cannot cancel. Mitigation: add `AbortSignal` parameter to `CaptureOptions`, check between captures, wire to cancel button in plugin UI.
- **Implications**: All three issues are addressable without architectural changes. Issue #1 is a documentation addition, #2 is a parsing enhancement with fallback, #3 is an `AbortSignal` parameter addition.

## Risks & Mitigations
- **Slots API instability** — Beta feature, API may change → Pin plugin typings, graceful degradation
- **Large export performance** — Many slots × high scale = slow → Progress feedback, cancellation support
- **ZIP dependency in sandbox** — Plugin restrictions → Use fflate (pure JS, no deps)
- **Detection false positives** — Naming heuristics may misidentify → Priority order with user override
- **Vite rendering latency** — Large DSL trees → Cache by content hash, invalidate on change
- **Canvas/slot metadata collision** — Same node → Compiler validation error

## References
- [Figma exportAsync docs](https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/)
- [Figma ExportSettings docs](https://developers.figma.com/docs/plugins/api/ExportSettings/)
- [Figma Plugin API Node Types](https://www.figma.com/plugin-docs/api/nodes/)
- [Use slots in Figma](https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma)
- [Custom Elements Manifest and Figma Code Connect](https://jamesiv.es/blog/frontend/javascript/2025/09/21/custom-elements-manifest-and-figma-code-connect/)
- [fflate - lightweight compression library](https://github.com/101arrowz/fflate)
- Vite Plugin API: `configureServer()` for dev middleware, `transform()` for build-time
- @napi-rs/canvas: Node-native Canvas 2D, used by existing renderer package
- CSS `aspect-ratio` property: browser support >95%
