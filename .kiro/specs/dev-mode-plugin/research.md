# Research & Design Decisions

## Summary
- **Feature**: `dev-mode-plugin`
- **Discovery Scope**: Extension (adding codegen capability to existing plugin)
- **Key Findings**:
  - Figma Codegen API requires `editorType: ["dev"]` and `capabilities: ["codegen"]` in manifest; the generate callback has a strict 3-second timeout and prohibits `figma.showUI()`
  - Existing `serializeNode()` in `packages/plugin/src/serializer.ts` extracts Figma node properties for structural code generation (fallback tier)
  - Original source code (React TSX, CSS Module, DSL) should be embedded in Figma plugin data at export time, enabling direct retrieval during codegen without reverse-engineering (source-first tier)

## Research Log

### Figma Codegen Plugin API
- **Context**: Need to understand the exact API surface for registering a codegen plugin
- **Sources Consulted**: https://developers.figma.com/docs/plugins/codegen-plugins/
- **Findings**:
  - Manifest requires `editorType: ["dev"]`, `capabilities: ["codegen"]`, `codegenLanguages: [{label, value}]`
  - `figma.codegen.on("generate", ({node}) => CodegenResult[])` — synchronous or async callback
  - `CodegenResult = { title: string, language: string, code: string }`
  - Three preference types: `unit` (scaled values), `select` (dropdown), `action` (iframe-based)
  - `figma.codegen.preferences` provides read access to current preferences
  - `figma.codegen.refresh()` needed only for action-type preferences
  - 3-second timeout on the generate callback
  - `figma.showUI()` is prohibited inside the generate callback
  - Multiple `CodegenResult` entries returned as array → rendered as separate sections in Inspect panel
- **Implications**: The plugin can support both `"figma"` and `"dev"` editor types simultaneously. Preferences are declared in manifest, not in code. The 3-second timeout means depth limiting is essential for large trees.

### Dual Editor Type Support
- **Context**: Current plugin uses `editorType: ["figma"]`; codegen requires `"dev"`. Can both coexist?
- **Sources Consulted**: Figma Plugin API documentation
- **Findings**:
  - `editorType` accepts an array: `["figma", "dev"]` enables the plugin in both design mode and Dev Mode
  - The `capabilities` field is additive — existing plugin features continue to work
  - `codegenLanguages` and `codegenPreferences` are only used in Dev Mode
- **Implications**: No breaking changes to existing import/sync functionality. The manifest extension is purely additive.

### Serializer Reuse Analysis
- **Context**: Can the existing `serializeNode()` function serve as the node data extraction layer for codegen?
- **Sources Consulted**: `packages/plugin/src/serializer.ts`, `packages/dsl-core/src/plugin-types.ts`
- **Findings**:
  - `serializeNode()` reads: type, name, size, fills (solid/gradient/image), strokes, cornerRadius, clipContent, auto-layout (stackMode, itemSpacing, padding, alignment, sizing), text properties (characters, fontSize, fontName, fontWeight, textAlign, textAutoResize), component property definitions, instance references, rotation, boolean operations
  - Output is `PluginNodeDef` — matches `@figma-dsl/core` types used throughout the pipeline
  - The `SerializableNode` interface enables unit testing with plain objects (no Figma runtime)
  - Missing from serializer: effects (shadows, blur), constraints, absolute position — these would be needed for complete CSS generation
- **Implications**: `serializeNode()` covers ~90% of codegen needs. Shadow/effect data requires a minor extension. The testability pattern (`SerializableNode` interface) should be replicated for codegen modules.

### Code Connect Accessibility in Plugin Sandbox
- **Context**: Requirement 2 AC2 asks to display Code Connect snippets when available
- **Sources Consulted**: `packages/exporter/src/code-connect.ts`, Figma Code Connect documentation
- **Findings**:
  - Code Connect bindings exist in `.figma.tsx` source files on disk, not in Figma's runtime data model
  - The plugin sandbox cannot read external files; it can only access node properties and plugin data
  - During DSL export, `dsl-identity` plugin data stores component name and metadata — this IS accessible
  - Workaround: Store a code snippet or Code Connect URL in plugin data during export
- **Implications**: R2 AC2 (Code Connect display) cannot be implemented as originally specified. Two alternatives: (a) store Code Connect output as plugin data during export, or (b) generate a Code Connect-style snippet from `dsl-identity` metadata. Option (b) is more practical and doesn't require re-exporting.

### Token Reverse-Lookup Strategy
- **Context**: CSS codegen needs to map raw Figma color values back to CSS custom property names
- **Sources Consulted**: `preview/src/components/tokens.css`
- **Findings**:
  - `tokens.css` defines ~50 color tokens as CSS custom properties with hex values
  - Colors are in hex format (`#7c3aed`); Figma stores colors as `{r, g, b}` floats (0–1 range)
  - Exact match is feasible: convert Figma float RGB to hex, look up in a pre-built map
  - Spacing tokens (`--space-1` through `--space-24`) map to exact pixel values (4, 8, 12, ... 96)
  - Radius tokens (`--radius-sm` through `--radius-full`) map to exact pixel values
  - Approximate matching (color distance) adds complexity with marginal benefit for this use case
- **Implications**: Build a static token lookup map (hex → token name, px → spacing token) at plugin initialization. Exact match only — no fuzzy matching. The map is small enough to inline in the bundle.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Extend code.ts | Add codegen handler inline | No new files; direct state access | code.ts already ~1400 lines; testing harder | Not recommended |
| New codegen modules | Separate files per generator | Testable; follows serializer.ts pattern; clean SRP | More files; interface design needed | **Selected** |
| Single codegen file | One codegen.ts with all generators | Fewer files than option B | Could grow to 500+ lines | Balanced compromise |

## Design Decisions

### Decision: Modular Codegen Architecture
- **Context**: Need to add 3 code generators (React, CSS, DSL) to the plugin
- **Alternatives Considered**:
  1. Inline in code.ts — minimal files but bloats existing code
  2. One file per generator — maximum testability and SRP
  3. Single codegen.ts — compromise
- **Selected Approach**: One file per generator with a shared dispatcher
- **Rationale**: Follows the existing `serializer.ts` extraction pattern; each generator can be tested independently using `SerializableNode`-style interfaces
- **Trade-offs**: More files to navigate (+4), but each is focused (~100–150 lines) and independently testable
- **Follow-up**: Verify esbuild bundles all modules into single IIFE correctly

### Decision: Exact Token Matching Only
- **Context**: CSS codegen should reference design tokens when possible
- **Alternatives Considered**:
  1. Exact hex match — simple, no false positives
  2. Color distance (Delta-E) — handles slight variations but may produce wrong token names
- **Selected Approach**: Exact hex match with pre-built lookup map
- **Rationale**: Design tokens define precise values; Figma nodes created from DSL will have exact matches. Manually created nodes may not match, which is acceptable behavior (raw values are still correct)
- **Trade-offs**: Misses near-matches from manual Figma edits; but raw CSS values are always correct as fallback

### Decision: Source-Embedded Codegen (Two-Tier Strategy)
- **Context**: Codegen needs to show React/CSS/DSL code for Figma nodes. The original question: why reverse-engineer code from node properties when the original source files exist?
- **Alternatives Considered**:
  1. Reverse-engineer only — generate all code from Figma node properties via structural inference. Lossy, complex, never produces the actual original code.
  2. Store source in plugin data — embed original source file contents during export, retrieve during codegen. Simple, exact, instant.
  3. Store paths + fetch via MCP — store file paths only, fetch contents at codegen time via WebSocket. Always fresh, but requires MCP server running.
  4. Hybrid — store snapshots + paths for freshness checking. Best of both but most complex.
- **Selected Approach**: Store source code in plugin data (option 2) with structural inference as fallback for manually-created nodes
- **Rationale**: Plugin data is always available (no MCP dependency). Source snapshots are point-in-time (updated on re-export). The 100KB per-key limit is sufficient for typical component sources (3–10KB combined). Fallback generators handle nodes without stored sources.
- **Trade-offs**: Snapshots become stale after local file edits (until re-export). Plugin data storage increases per node. But: codegen returns the exact original code, not a reverse-engineered approximation.
- **Follow-up**: Extend `ComponentIdentity` type, extend `PluginInput` type, add `source-collector.ts` to CLI/exporter, modify plugin `storeIdentity` to also call `storeSourceSnapshots`

### Decision: Superseded — Code Connect from Plugin Data
- **Context**: Previously planned to generate Code Connect-style snippets from `dsl-identity` metadata
- **Status**: **Superseded** by source-embedded approach. R2 AC2 is now satisfied by storing the actual `.figma.tsx` Code Connect file content in `dsl-sources` plugin data. No need for synthetic generation.

## Risks & Mitigations
- **Source snapshot staleness**: Snapshots are point-in-time; local edits to .tsx/.module.css/.dsl.ts won't appear until re-export. Mitigate by adding `snapshotTimestamp` to `SourceSnapshots` so codegen can display a "last updated" note.
- **Plugin data size limit (100KB per key)**: Mitigate with 50KB per-file guard in source-collector and separate `dsl-sources` key (not merged into `dsl-identity`). If combined sources exceed 100KB, store only DSL source and log warning.
- **3-second timeout with deep trees**: Mitigate with depth-limited traversal (max 50 descendants) in fallback path. Source-first path is instant.
- **`@figma/plugin-typings` version**: `^1.0.0` is a broad range; verify codegen types exist at install time. If missing, update to latest version.
- **Bundle size increase**: Adding 3 generators + token map increases IIFE bundle by ~15KB. Source-collector runs in Node.js (CLI), not in bundle.
- **Dual editorType compatibility**: Test that existing import/sync features work when `"dev"` is added to editorType array
- **Backward compatibility**: Extended `ComponentIdentity` and `PluginInput` use optional fields only — existing export/import flows continue to work without sources

## References
- [Figma Codegen Plugins](https://developers.figma.com/docs/plugins/codegen-plugins/) — API docs, manifest schema, CodegenResult interface
- [Figma Plugin API](https://www.figma.com/plugin-docs/) — General plugin API reference
- `packages/plugin/src/serializer.ts` — Existing node serialization (primary reuse target)
- `packages/exporter/src/code-connect.ts` — Code Connect generation pattern
- `packages/dsl-core/src/nodes.ts` — DSL builder API (target syntax for DSL codegen output)
- `packages/dsl-core/src/plugin-types.ts` — PluginNodeDef type definition
