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
- **Findings**:
  - `"SLOT"` is NOT in the `NodeType` union in current Plugin API typings
  - Slots are in open beta; SlotNodes likely appear as FRAME nodes in Plugin API
  - Detection approach: check `componentPropertyDefinitions` for entries with `type: "SLOT"`, and examine children layer names for slot naming patterns
  - Code Connect uses `figma.slot`, `figma.instance`, `figma.children` for slot mapping — these are Code Connect APIs, not Plugin API node types
  - Slots are "inherently open" — they accept any content, no enforcement
  - **Cannot create** slots programmatically, but **can detect** existing ones
- **Implications**:
  - Cannot rely on `node.type === "SLOT"` for detection
  - Must use heuristic detection: componentPropertyDefinitions → naming patterns → plugin data
  - Detection is best-effort since the API is still in beta

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
| componentPropertyDefs detection | Check SLOT type in property definitions | Most reliable signal | May not cover all cases | Primary detection method |
| Naming convention detection | Check `[Slot]` prefix on layer names | Works for DSL-created slots | Fragile for designer-created content | Secondary fallback |

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
- **Context**: Need to identify Figma native slots without a public SLOT NodeType
- **Alternatives Considered**:
  1. `node.type === "SLOT"` — not available in typings
  2. `componentPropertyDefinitions` for `type: "SLOT"` — available on ComponentNode
  3. Naming convention detection (`[Slot]` prefix) — fragile but usable
- **Selected Approach**: Tiered detection: (1) DslCanvas plugin data (highest priority), (2) `componentPropertyDefinitions` for SLOT-type, (3) naming convention fallback
- **Rationale**: `componentPropertyDefinitions` is the most reliable signal for designer-created slots. Plugin data provides certainty for DSL-created content.
- **Trade-offs**: Detection may miss edge cases; beta API may change

### Decision: Hybrid base64/ZIP Export
- **Context**: Bundle images with JSON, handling both small and large payloads
- **Selected Approach**: Hybrid with 1 MB default threshold
- **Rationale**: Matches user's request. Small exports stay as simple JSON. Large exports get proper packaging.
- **Trade-offs**: Two code paths; fflate dependency added to plugin

### Decision: Plugin-side Image Rendering
- **Context**: Where to render slot content images — plugin or UI thread?
- **Selected Approach**: All rendering in plugin sandbox via `exportAsync`
- **Rationale**: `exportAsync` runs in Figma's rendering engine, produces pixel-perfect output. UI thread has no access to canvas nodes.

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
