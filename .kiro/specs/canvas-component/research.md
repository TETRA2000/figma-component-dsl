# Research & Design Decisions

## Summary
- **Feature**: `canvas-component`
- **Discovery Scope**: Extension
- **Key Findings**:
  - The renderer uses @napi-rs/canvas (Node-native) and cannot run in browser; DslCanvas React component requires server-side rendering via Vite dev middleware or build-time pre-rendering
  - Slots pattern (FRAME with `isSlot: true`) provides a proven template for canvas nodes — canvas follows the same metadata-annotation approach on FRAME nodes
  - All pipeline packages (compiler, renderer, exporter, plugin) use a consistent passthrough pattern for node metadata that canvas can extend cleanly

## Research Log

### Browser vs Node Rendering Constraint
- **Context**: DslCanvas React component needs to display DSL-rendered PNGs, but the renderer uses @napi-rs/canvas which is Node-only
- **Sources Consulted**: packages/renderer/src/renderer.ts (imports @napi-rs/canvas), Vite dev server middleware patterns
- **Findings**:
  - @napi-rs/canvas provides Node-native Canvas 2D API; no browser equivalent
  - Vite exposes `configureServer()` hook for custom middleware in dev mode
  - Build-time rendering via Vite plugin `transform` hook can inline pre-rendered PNGs
- **Implications**: Two-mode architecture required — dev server middleware for HMR, build-time plugin for production. DslCanvas component communicates with server to obtain rendered PNGs.

### Slot Pattern Reuse for Canvas Nodes
- **Context**: Need to determine whether canvas uses a new NodeType or extends FRAME like slots
- **Sources Consulted**: dsl-core/src/types.ts (DslNode, SlotProps), dsl-core/src/nodes.ts (slot() builder), compiler/src/compiler.ts (slot validation/passthrough)
- **Findings**:
  - Slots are FRAME nodes with `isSlot: true` metadata — no new Figma node type needed
  - Compiler validates slots only inside COMPONENT/COMPONENT_SET; canvas nodes are standalone (no such restriction)
  - Exporter/plugin encode slot metadata as additional properties on PluginNodeDef — same approach works for canvas
- **Implications**: Canvas nodes should be FRAME-type with `isCanvas: true` metadata, following the slot pattern. This maximizes code reuse and Figma compatibility.

### Existing Pipeline Extension Points
- **Context**: Map all files requiring modification across the pipeline
- **Sources Consulted**: compiler/src/compiler.ts, compiler/src/types.ts, renderer/src/renderer.ts, exporter/src/exporter.ts, dsl-core/src/plugin-types.ts, plugin/src/code.ts
- **Findings**:
  - Compiler: `compileNode()` has a clear slot metadata passthrough block (lines 260-274) — canvas passthrough inserts directly after
  - Compiler: Unlike slots, canvas nodes do NOT need `componentPropertyDefinitions` injection (they are standalone, not component properties)
  - Renderer: `renderNode()` switch dispatches by type — canvas nodes render as FRAME (their actual type) with no special case needed
  - Exporter: `convertToPluginNode()` has slot metadata block (lines 171-197) — canvas metadata inserts after
  - CLI: `cmdRender()` can extract canvas nodes post-compilation for separate PNG output
- **Implications**: Changes are additive at each pipeline stage. Canvas metadata flows through the passthrough pattern unchanged. Renderer treats canvas as regular FRAME with children.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| FRAME with isCanvas metadata | Canvas nodes are FRAME type with `isCanvas: true` flag | Reuses slot pattern, Figma-compatible, no new node type | Must ensure canvas metadata propagates correctly | Selected approach |
| Dedicated CANVAS NodeType | New node type in NodeType union | Clear separation from frames | Requires changes to all type guards, renderer dispatch, plugin creation; Figma has no CANVAS node type | Rejected — too invasive |

## Design Decisions

### Decision: FRAME-based Canvas with Metadata Annotation
- **Context**: Canvas nodes need to flow through compilation, rendering, export, and plugin creation
- **Alternatives Considered**:
  1. New CANVAS NodeType — requires changes to every type union and switch dispatch
  2. FRAME with `isCanvas: true` — follows proven slot pattern
- **Selected Approach**: FRAME with `isCanvas: true` metadata, identical to how slots use FRAME with `isSlot: true`
- **Rationale**: Minimizes invasive changes; Figma has no native Canvas node type so FRAME is the correct Figma representation; proven pattern already working for slots
- **Trade-offs**: Canvas and slot metadata could theoretically conflict on same node (mitigated by validation)
- **Follow-up**: Add compiler validation that a node cannot be both `isSlot` and `isCanvas`

### Decision: Server-Side Rendering for DslCanvas Component
- **Context**: React components run in browser but renderer needs @napi-rs/canvas (Node-only)
- **Alternatives Considered**:
  1. Browser Canvas 2D API re-implementation — massive duplication of renderer
  2. Vite dev middleware + build-time pre-rendering — leverages existing renderer
  3. WebAssembly port of renderer — complex, uncertain compatibility
- **Selected Approach**: Vite plugin providing dev server middleware (POST endpoint) and build-time transform
- **Rationale**: Reuses existing renderer package without modification; Vite plugin ecosystem is well-suited for this pattern; HMR support comes naturally from Vite's module graph
- **Trade-offs**: Requires Vite-specific integration; won't work in non-Vite environments without adaptation
- **Follow-up**: Consider a generic HTTP rendering endpoint for framework-agnostic support

### Decision: Fixed Aspect Ratio via Intrinsic Image Dimensions
- **Context**: DslCanvas must maintain aspect ratio from rendered content
- **Selected Approach**: Rendered PNG carries intrinsic dimensions (width/height from DSL); DslCanvas uses CSS `aspect-ratio` based on render result metadata. Optional `width` prop scales proportionally.
- **Rationale**: CSS `aspect-ratio` is widely supported and prevents distortion without JS calculations

## Risks & Mitigations
- **Risk**: Vite dev server rendering latency on large DSL trees — Mitigation: cache rendered PNGs keyed by DSL content hash; invalidate on change
- **Risk**: Build-time rendering increases build duration for many canvas components — Mitigation: parallel rendering, incremental builds
- **Risk**: Canvas and slot metadata collision on same node — Mitigation: compiler validation error when both `isSlot` and `isCanvas` are true

## References
- Vite Plugin API: `configureServer()` for dev middleware, `transform()` for build-time
- @napi-rs/canvas: Node-native Canvas 2D, used by existing renderer package
- CSS `aspect-ratio` property: browser support >95% (caniuse.com)
