# Research & Design Decisions

## Summary
- **Feature**: `bidirectional-sync`
- **Discovery Scope**: Complex Integration
- **Key Findings**:
  - Figma Plugin API provides `documentchange` event with `PROPERTY_CHANGE`, `CREATE`, `DELETE` types — sufficient for real-time edit tracking of most visual properties
  - `NodeChangeProperty` tracks fills, strokes, cornerRadius, characters, fontSize, fontName, lineHeight, letterSpacing, textAlign, width, height, opacity, visible — but does NOT directly track auto-layout properties (layoutMode, itemSpacing, padding). Auto-layout changes must be detected via snapshot comparison
  - `setPluginData`/`getPluginData` allows storing baseline snapshots per node (up to 100KB per entry), persisted in the document and available to all users

## Research Log

### Figma Plugin API: documentchange Event
- **Context**: Need to detect property changes on imported components in real time
- **Sources Consulted**: [Figma Plugin API — DocumentChange](https://developers.figma.com/docs/plugins/api/DocumentChange/), [figma.on](https://www.figma.com/plugin-docs/api/properties/figma-on/), [NodeChangeProperty](https://www.figma.com/plugin-docs/api/NodeChangeProperty/)
- **Findings**:
  - `figma.on("documentchange", callback)` fires asynchronously with batched `DocumentChange[]`
  - Change types: `CREATE`, `DELETE`, `PROPERTY_CHANGE`, `STYLE_CREATE`, `STYLE_DELETE`, `STYLE_PROPERTY_CHANGE`
  - `PROPERTY_CHANGE` includes `properties: NodeChangeProperty[]` listing which properties changed
  - `origin` field distinguishes `LOCAL` (current user) vs `REMOTE` (collaborator)
  - Limitations: does not fire for changes caused by the plugin itself in a callback, instance sublayer updates from main component changes, or style-driven node updates
- **Implications**: Core edit tracking mechanism. Must supplement with snapshot comparison for properties not in `NodeChangeProperty` (e.g., auto-layout padding, itemSpacing, layoutMode)

### Figma Plugin API: NodeChangeProperty Coverage
- **Context**: Need to know which properties can be tracked automatically vs need polling
- **Sources Consulted**: [NodeChangeProperty](https://www.figma.com/plugin-docs/api/NodeChangeProperty/)
- **Findings**:
  - **Tracked**: fills, strokes, strokeWeight, strokeAlign, cornerRadius, characters, fontName, fontSize, lineHeight, letterSpacing, textAlignHorizontal, textAlignVertical, textAutoResize, textCase, textDecoration, width, height, x, y, rotation, opacity, visible, blendMode, effects, name, parent, locked, constrainProportions, constraints, exportSettings, openTypeFeatures
  - **Not tracked** (notably absent): layoutMode, itemSpacing, paddingTop/Right/Bottom/Left, primaryAxisAlignItems, counterAxisAlignItems, layoutSizingHorizontal/Vertical, clipContent
- **Implications**: Auto-layout properties require snapshot-based diffing at export time rather than real-time event tracking

### Figma Plugin API: Node Metadata Storage
- **Context**: Need to store baseline snapshots and component identity on nodes
- **Sources Consulted**: [setPluginData](https://www.figma.com/plugin-docs/api/properties/nodes-setplugindata/), [figma.clientStorage](https://www.figma.com/plugin-docs/api/figma-clientStorage/)
- **Findings**:
  - `setPluginData(key, value)` stores string data on any node, private to plugin ID
  - 100KB limit per key-value entry
  - Data persists in the document, available to all users with access
  - `getPluginDataKeys()` lists all stored keys
  - `figma.clientStorage` offers 5MB local-only storage (not shared between users)
- **Implications**: Use `setPluginData` to store baseline snapshots (JSON-stringified) on each imported node. For large component trees, may need to split across multiple keys or compress. Use `figma.clientStorage` for edit log persistence across plugin sessions.

### Existing Codebase: Plugin Architecture
- **Context**: Understanding current plugin to plan extension points
- **Sources Consulted**: `packages/plugin/src/code.ts`, `packages/exporter/src/exporter.ts`
- **Findings**:
  - Plugin is a single-file IIFE bundle (`code.ts`) running in Figma sandbox
  - Currently import-only: parses `PluginInput` JSON, creates Figma nodes via `createNode()`
  - Already builds `componentIdMap: Record<string, string>` mapping component name → Figma node ID
  - UI is inline HTML string with textarea input and import button
  - No existing export/tracking/changeset functionality
  - `PluginNodeDef` interface in both plugin and exporter packages (duplicated)
- **Implications**: Must extend plugin with: (1) `documentchange` listener, (2) baseline snapshot storage, (3) export UI for changesets and complete JSON, (4) node-to-PluginNodeDef serialization (reverse of `createNode`)

### Existing Codebase: Pipeline Integration Points
- **Context**: Understanding how changeset application fits into the existing pipeline
- **Sources Consulted**: CLI commands, comparator, capturer, renderer packages
- **Findings**:
  - `compare` command already does image similarity scoring with configurable threshold
  - `pipeline` command chains compile → render → capture → compare
  - `capture` command takes a URL and CSS selector to screenshot React components
  - Component identification is by filename convention: `{ComponentName}.dsl.ts` ↔ `{ComponentName}.tsx`
  - Preview app component registry in `preview/src/components/index.ts` barrel exports
  - Shared skill references define component-to-Figma-node mappings
- **Implications**: Changeset applicator is a new package. Verification skill reuses existing comparator and capturer. Component name mapping follows existing conventions.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Plugin-side full tracking | Track all changes in real-time via documentchange + snapshot diff at export | Minimal new infrastructure, leverages Figma API | 100KB pluginData limit, auto-layout not in NodeChangeProperty | Selected approach |
| External polling service | Periodically read Figma file via REST API and diff | No plugin dependency | REST API rate limits, no real-time granularity, requires Figma API token | Rejected: too slow, complex auth |
| Widget-based tracker | Use Figma Widget API for persistent tracking UI | Richer UI, persistent state | Widget API constraints, different deployment model | Rejected: unnecessary complexity |

## Design Decisions

### Decision: Hybrid Change Detection (Event + Snapshot Diff)
- **Context**: `NodeChangeProperty` does not cover auto-layout properties, but `documentchange` provides efficient real-time tracking for most visual properties
- **Alternatives Considered**:
  1. Pure event-driven — miss auto-layout changes
  2. Pure snapshot comparison at export time — no real-time feedback, higher export cost
  3. Hybrid — events for real-time log, snapshot diff at export for completeness
- **Selected Approach**: Hybrid. Use `documentchange` for real-time edit logging of tracked properties. At export time, perform a full snapshot comparison against baseline to catch auto-layout and any other untracked changes.
- **Rationale**: Provides immediate feedback to designers while ensuring no changes are missed at export
- **Trade-offs**: Slightly more complex implementation, but comprehensive coverage
- **Follow-up**: Validate that snapshot comparison performance is acceptable for large component trees

### Decision: Baseline Storage via setPluginData
- **Context**: Need to persist baseline state across plugin sessions
- **Findings**: `setPluginData` persists in document, 100KB per entry
- **Selected Approach**: Store JSON-stringified baseline snapshot on each top-level imported component node using `setPluginData("dsl-baseline", serializedSnapshot)`. Store component identity metadata under `setPluginData("dsl-identity", JSON.stringify({name, filePath, importTimestamp}))`.
- **Rationale**: Document-level persistence means any user can export changesets. 100KB is sufficient for individual component snapshots (typical component JSON is 2-10KB).
- **Trade-offs**: Plugin-private data, not accessible to other plugins. If component tree is very deep, may approach size limit.

### Decision: Changeset Applicator as AI Skill (Not Automated Package)
- **Context**: Mapping DSL property changes to React/CSS modifications is inherently ambiguous — component structure varies, CSS approaches differ, and structural changes require human judgment
- **Alternatives Considered**:
  1. Fully automated npm package with AST manipulation
  2. AI skill that interprets changesets and applies them with context awareness
  3. Hybrid: automated for simple property changes, AI for complex ones
- **Selected Approach**: AI skill (Claude Desktop / Claude Code) that reads changesets and applies them using code editing tools, with the verification loop as a second skill
- **Rationale**: AI can handle the semantic gap between Figma properties and React/CSS code far better than rigid AST transforms. Leverages existing Claude Code capabilities. Aligns with project's AI-assisted workflow philosophy.
- **Trade-offs**: Requires Claude access, non-deterministic. Mitigated by the verification loop.

### Decision: Shared Changeset Types in dsl-core
- **Context**: Changeset schema must be shared between plugin, applicator skill, and verification skill
- **Selected Approach**: Define changeset TypeScript types in `@figma-dsl/core` package, since it is already the shared type foundation
- **Rationale**: Avoids new package for a small type definition. Core package already defines `DslNode`, `Fill`, `AutoLayoutConfig` etc.

### Decision: Plugin Types via esbuild Bundling (Design Review Fix #2)
- **Context**: Plugin runs in Figma sandbox without npm imports. Previously, types were duplicated inline. Design review identified risk of type drift.
- **Alternatives Considered**:
  1. (a) esbuild resolves @figma-dsl/core imports at build time — single source of truth
  2. (b) CI check validates plugin inline types match canonical definitions — manual sync
- **Selected Approach**: (a) esbuild bundling. The plugin imports from `@figma-dsl/core` in source code, and esbuild inlines the resolved modules into the IIFE bundle at build time.
- **Rationale**: Eliminates duplication entirely. No manual sync needed. Leverages existing esbuild toolchain.

### Decision: Verification Reference from Complete DSL Export (Design Review Fix #1)
- **Context**: After changeset application, the `.dsl.ts` file still reflects the original pre-edit state. Using it as the verification reference would always produce false mismatches.
- **Selected Approach**: The VerifySkill renders the **complete DSL JSON export** (Requirement 3 output) as the reference image, not the `.dsl.ts` file. The developer provides both the changeset and the complete export from the plugin.
- **Rationale**: The complete export reflects the designer's intended state in Figma, which is the correct baseline for verifying React code fidelity.

### Decision: Parent-Chain Traversal for Child Attribution (Design Review Fix #3)
- **Context**: `documentchange` fires for any node, including deeply nested children. Need to attribute changes to the correct top-level tracked component.
- **Selected Approach**: Walk `node.parent` chain upward until a node with `dsl-identity` pluginData is found. Attribute the change to that component. Discard changes with no tracked ancestor.
- **Rationale**: Simple, reliable, O(depth) per event. Figma component trees are typically <10 levels deep.

## Risks & Mitigations
- **100KB pluginData limit** — Mitigate: compress baseline snapshots, split across keys if needed, or store only property subset relevant to changeset generation
- **Auto-layout property tracking gap** — Mitigate: hybrid approach with snapshot diff at export time covers all properties
- **AI changeset application non-determinism** — Mitigate: verification loop with image comparison ensures correctness regardless of application approach
- **Plugin UI complexity** — Mitigate: incremental UI: add export tab to existing UI, keep import tab unchanged
- **Large component trees** — Mitigate: per-component snapshots (not whole-page), lazy serialization at export time

## References
- [Figma Plugin API — DocumentChange](https://developers.figma.com/docs/plugins/api/DocumentChange/) — core event for edit tracking
- [Figma Plugin API — NodeChangeProperty](https://www.figma.com/plugin-docs/api/NodeChangeProperty/) — tracked property list
- [Figma Plugin API — setPluginData](https://www.figma.com/plugin-docs/api/properties/nodes-setplugindata/) — node metadata storage
- [Figma Plugin API — figma.on](https://developers.figma.com/docs/plugins/api/properties/figma-on/) — event listener API
