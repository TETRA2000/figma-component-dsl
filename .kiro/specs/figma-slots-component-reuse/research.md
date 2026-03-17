# Research & Design Decisions

## Summary
- **Feature**: `figma-slots-component-reuse`
- **Discovery Scope**: Complex Integration (extends 6+ existing packages)
- **Key Findings**:
  - Figma Plugin API does NOT support `SLOT` as a `ComponentPropertyType` — only `BOOLEAN`, `TEXT`, `INSTANCE_SWAP`, `VARIANT`. Slot creation requires a naming-convention fallback strategy.
  - Code Connect uses `figma.slot('Name')` and `figma.children('Name')` for slot mapping in Dev Mode — these are Code Connect helpers, not Plugin API methods.
  - The existing plugin already supports component instances via `componentMap`, but only within a single import session. Cross-session reuse requires searching the Figma file via `figma.root.findAll()`.

## Research Log

### Figma Plugin API Slot Support
- **Context**: Requirement 6 needs programmatic slot creation on components during import.
- **Sources Consulted**:
  - [ComponentPropertyType docs](https://developers.figma.com/docs/plugins/api/ComponentPropertyType/) — `type ComponentPropertyType = 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT'`
  - [plugin-typings master branch](https://github.com/figma/plugin-typings/blob/master/plugin-api.d.ts) — no SLOT type found
  - [Figma Help Center: Slots](https://help.figma.com/hc/en-us/articles/38231200344599) — slots are in open beta, created via UI only (Convert to slot / Wrap in new slot)
- **Findings**:
  - `addComponentProperty()` only accepts `'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT'`
  - No `convertToSlot()` or similar API method exists
  - Slots are a UI-only feature as of March 2026
  - The `figma.createNodeFromJSXAsync()` API doesn't support slots either
- **Implications**: The plugin must use a naming-convention approach (`[Slot] ContentArea`) for frames intended as slots, with documentation for manual conversion. When/if the API adds `SLOT` support, the plugin can be updated.

### Code Connect Slot Mapping
- **Context**: Requirement 7 needs Code Connect bindings with `figma.slot()`.
- **Sources Consulted**:
  - [Code Connect React docs](https://developers.figma.com/docs/code-connect/react/) — `figma.slot('SlotName')` API
  - [Code Connect HTML docs](https://developers.figma.com/docs/code-connect/html/#slots-open-beta)
  - [Code Connect GitHub issue #353](https://github.com/figma/code-connect/issues/353) — multiple slots support
- **Findings**:
  - `figma.slot('PropName')` returns a reference to slot content, usable as JSX children
  - `figma.children('LayerName')` is an alternative for child instances (not freeform content)
  - Code Connect doesn't traverse slot children — renders a clickable label only
  - Multiple slots per component are supported
  - Single slot maps naturally to React `children`; multiple slots map to named props
- **Implications**: Code Connect generation should use `figma.slot()` for true slot properties and `figma.children()` as a fallback for pre-slot Figma versions.

### Existing Component Instance Architecture
- **Context**: Requirements 1-2 need component reuse across import sessions.
- **Sources Consulted**: Codebase analysis of `packages/plugin/src/code.ts`, `packages/exporter/src/exporter.ts`
- **Findings**:
  - Plugin maintains `componentMap: Map<string, ComponentNode>()` (code.ts:23) — cleared on each import
  - INSTANCE nodes reference components by name via `componentId` field
  - `componentMap.get(def.componentId ?? def.name)` resolves instances (code.ts:432)
  - No mechanism to search existing Figma file for pre-existing components
  - `figma.root.findAll()` can search the entire file but is expensive on large files
  - `figma.root.findOne()` can find a single component by predicate
  - Component page patterns: existing components typically live on a "Component Library" page
- **Implications**:
  - Add a pre-import scan phase that builds `componentMap` from existing file components
  - Use `figma.root.findAllWithCriteria({ types: ['COMPONENT'] })` for efficient lookup
  - Cache results to avoid repeated scans during a session

### Page Export Deduplication
- **Context**: Requirement 8 needs automatic structural deduplication.
- **Sources Consulted**: Codebase analysis of `packages/exporter/src/exporter.ts`, `packages/compiler/src/compiler.ts`
- **Findings**:
  - Current exporter does a 1:1 conversion from FigmaNodeDict → PluginNodeDef
  - No structural analysis or deduplication exists
  - Structural hashing is feasible: hash node type + name pattern + auto-layout config + child structure
  - Differing values (text content, fills) become property overrides on instances
  - Component extraction must happen before PluginInput serialization to maintain creation order
- **Implications**: Add a deduplication pass between compilation and export that:
  1. Walks the tree computing structural hashes
  2. Groups identical subtrees
  3. Extracts first occurrence as COMPONENT
  4. Replaces subsequent occurrences with INSTANCE + overrides

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Extend existing pipeline | Add slot/registry fields to existing types and modules | Minimal disruption, follows existing patterns | Types grow larger, more conditional logic | Aligns with monorepo package pattern |
| New packages | Separate `@figma-dsl/slots` and `@figma-dsl/registry` packages | Clean separation | Additional dependencies, overhead | Over-engineered for the scope |
| Plugin-side deduplication | Move dedup logic to plugin instead of exporter | Simpler exporter | Plugin sandbox has limited compute, no filesystem | Rejected — plugin sandbox too constrained |

**Selected**: Extend existing pipeline — add fields to existing types and new functions to existing packages.

## Design Decisions

### Decision: Slot Representation in DSL AST
- **Context**: Need to represent slots in DslNode without changing the node type system
- **Alternatives Considered**:
  1. New `SLOT` node type — adds to the NodeType union, requires changes everywhere
  2. `isSlot` flag on FRAME nodes — minimal change, slot is conceptually a frame with metadata
- **Selected Approach**: `isSlot` boolean + `slotName` string on DslNode, with a `slot()` builder that creates a FRAME node with these flags
- **Rationale**: A slot IS a frame with extra semantics. New node type would require changes in compiler, renderer, exporter, and plugin for what is essentially a frame.
- **Trade-offs**: Less type safety (any frame could accidentally be flagged as slot) vs. minimal disruption
- **Follow-up**: Validate at compile time that `isSlot` only appears within COMPONENT/COMPONENT_SET

### Decision: Plugin Slot Creation Fallback
- **Context**: Figma Plugin API doesn't support programmatic slot creation
- **Alternatives Considered**:
  1. Wait for API support — blocks the entire feature
  2. Naming convention (`[Slot] SlotName`) — works now, manual conversion needed
  3. Skip slot creation in plugin — lose slot metadata on import
- **Selected Approach**: Naming convention with structured metadata in plugin data
- **Rationale**: Designers can manually convert named frames to slots until API support arrives. The naming convention is discoverable and the plugin can log guidance.
- **Trade-offs**: Manual step required, but all other pipeline stages (DSL, compiler, exporter, Code Connect) work correctly

### Decision: Component Registry File Format
- **Context**: Need a persistent registry for cross-session component reuse
- **Alternatives Considered**:
  1. JSON file with component name → Figma node ID mapping
  2. Figma plugin data on a sentinel node
  3. Scan-on-import with no persistent file
- **Selected Approach**: JSON registry file (`component-registry.json`) + scan-on-import fallback
- **Rationale**: JSON file is portable, versionable, and fast to read. Scan-on-import handles the case where no registry file exists.
- **Trade-offs**: Registry can become stale if Figma file changes outside the pipeline

### Decision: Structural Hashing for Deduplication
- **Context**: Need to identify structurally identical subtrees for dedup
- **Selected Approach**: Hash based on: node type, child count, auto-layout config, child structure (recursive). Exclude: text content, fills, opacity, size (these become overrides).
- **Rationale**: These properties define the "shape" of a component. Everything else is instance-specific content.
- **Follow-up**: Need to handle edge cases where structural match is coincidental (different components with same structure)

## Risks & Mitigations
- **Risk 1**: Figma Plugin API may never add SLOT support → Mitigation: naming convention + plugin data provides a functional workaround; update when API evolves
- **Risk 2**: `figma.root.findAllWithCriteria()` performance on large files → Mitigation: cache results, limit search to specific pages, make scan opt-in via `resolveExisting` flag
- **Risk 3**: Structural deduplication false positives (different components with identical structure) → Mitigation: require explicit component name match or user confirmation flag
- **Risk 4**: Slot override serialization complexity → Mitigation: reuse existing PluginNodeDef recursive structure for slot content

## References
- [Figma Plugin API: ComponentPropertyType](https://developers.figma.com/docs/plugins/api/ComponentPropertyType/) — confirmed SLOT not supported
- [Figma Code Connect: React](https://developers.figma.com/docs/code-connect/react/) — `figma.slot()` and `figma.children()` API
- [Figma Code Connect: HTML Slots](https://developers.figma.com/docs/code-connect/html/#slots-open-beta) — slot mapping syntax
- [Figma Help Center: Slots](https://help.figma.com/hc/en-us/articles/38231200344599) — slots feature overview
- [Figma Schema 2025](https://help.figma.com/hc/en-us/articles/35794667554839) — slots announcement context
- [Code Connect GitHub: Multiple Slots](https://github.com/figma/code-connect/issues/353) — multi-slot patterns
