# Gap Analysis — Figma Slots & Component Reuse

## Summary

- **Scope**: 10 requirements spanning 6 packages (`dsl-core`, `compiler`, `exporter`, `plugin`, `cli`, `mcp-server`) plus a new Code Connect generation module
- **Current state**: Zero slot or registry infrastructure exists. All required types, builders, validation, encoding, and plugin handling are entirely absent.
- **Key enabler**: The recently merged real-time sync system (MCP server + WebSocket plugin bridge) provides infrastructure for component mapping and change tracking that can be leveraged for Requirements 1–2 and 10.
- **Highest risk**: Plugin slot creation (Req 6) is constrained by Figma API limitations; instance slot overrides (Req 9) require the detached-copy workaround. Both are documented in the design's Known Limitations.
- **Recommended approach**: Hybrid — extend existing types/functions in all packages, add new modules for registry, deduplication, Code Connect, and structural hashing in the exporter.

---

## 1. Current State Investigation

### Requirement-to-Asset Map

| Requirement | Existing Assets | Gap Status |
|-------------|----------------|------------|
| **Req 1**: Component Registry | `ExportOptions` has `assetDir` only; no registry concept | **Missing** — new `ComponentRegistry` class, `loadRegistry()`, `buildRegistryFromBatch()`, `matchComponent()` needed in exporter |
| **Req 2**: Instance Creation from Registry | `componentMap` populated only during import session (code.ts:401); INSTANCE case queries `componentMap` (code.ts:474); no file scanning | **Missing** — `FileScanner` using `figma.root.findAllWithCriteria()`, `resolveExisting` flag on `PluginInput` |
| **Req 3**: DSL Slot Primitive | `nodes.ts` has 17 builders; no `slot()`; `DslNode` has no `isSlot`/`slotName`; `ComponentPropertyType` = `'TEXT' \| 'BOOLEAN' \| 'INSTANCE_SWAP'` | **Missing** — `slot()` builder, `SlotProps` interface, `isSlot`/`slotName`/`preferredInstances` on `DslNode` |
| **Req 4**: Compiler Slot Handling | `compileNode()` handles all 13 node types; `validTypes` = `Set(['TEXT', 'BOOLEAN', 'INSTANCE_SWAP'])` (compiler.ts:337); no slot validation | **Missing** — slot-in-COMPONENT validation, `'SLOT'` property injection into `componentPropertyDefinitions`, `isSlot`/`slotName` passthrough to `FigmaNodeDict` |
| **Req 5**: Exporter Slot Encoding | `convertToPluginNode()` maps 25+ fields; no slot fields | **Missing** — `isSlot`, `slotPropertyName`, `slotProperties` encoding; `slotOverrides` on instances |
| **Req 6**: Plugin Slot Creation | `createNode()` has 14 type cases; FRAME case (code.ts:269) has no `isSlot` check | **Missing** — `[Slot] {name}` naming, plugin data storage, slot guidance logging |
| **Req 7**: Code Connect | No `.figma.tsx` generation anywhere in the codebase; no `CodeConnectGenerator` module | **Missing** — entire module (new file in exporter) |
| **Req 8**: Deduplication | No structural hashing or dedup logic anywhere | **Missing** — `StructuralHasher`, `StructuralDeduplicator`, `inferComponentProperties()`, `--deduplicate` CLI flag |
| **Req 9**: Slot Override in Instances | `instance()` accepts `(componentRef, overrides?)` where overrides is `Record<string, string \| boolean>` (nodes.ts:187); no `slotOverrides` | **Missing** — `slotOverrides` parameter on `instance()`, compiler passthrough, exporter encoding, plugin detached-copy strategy |
| **Req 10**: Bidirectional Slot Sync | Edit tracker captures `PROPERTY_CHANGE`/`CREATE`/`DELETE` events (code.ts:95–143); `categorizeChanges()` emits `'structure'` for CREATE/DELETE; `PropertyChange.oldValue`/`newValue` are `unknown` (flexible) | **Partial** — change detection infrastructure exists but lacks slot-specific awareness; needs `'slot-structure'` category, slot frame identification via plugin data, nested content serialization |

### Conventions Observed

| Convention | Pattern | Location |
|-----------|---------|----------|
| Builder functions | One function per node type, returns `DslNode` | `packages/dsl-core/src/nodes.ts` |
| Type extensions | Add optional fields to existing interfaces | `DslNode`, `PluginNodeDef`, `FigmaNodeDict` |
| Compiler validation | `errors.push()` array, fail-soft within `compileNode()` | `packages/compiler/src/compiler.ts:336` |
| Exporter conversion | `convertToPluginNode()` maps FigmaNodeDict → PluginNodeDef field-by-field | `packages/exporter/src/exporter.ts:80` |
| Plugin node creation | `createNode()` switch on `def.type`, returns `SceneNode \| null` | `packages/plugin/src/code.ts:263` |
| CLI options | `parseArgs()` with `options` object, short flags | `packages/cli/src/cli.ts` |
| Tests | Colocated `.test.ts` files, vitest, pure unit tests using builders directly | All packages |
| Plugin data | `setPluginData(key, JSON.stringify(value))` for baseline/identity | `code.ts:36–55` |

### Integration Surfaces

| Surface | Current State | Impact |
|---------|--------------|--------|
| `DslNode` interface | 50+ fields, extensible via optional properties | Add 4 fields (`isSlot`, `slotName`, `slotOverrides`, `preferredInstances`) |
| `PluginNodeDef` interface | 30+ readonly fields | Add 4 fields (`isSlot`, `slotPropertyName`, `slotProperties`, `slotOverrides`) |
| `PluginInput` interface | 3 fields (`schemaVersion`, `targetPage`, `components`) | Add `resolveExisting` field |
| `FigmaNodeDict` type (compiler) | Mutable record in compiler | Add `isSlot`, `slotName`, `slotOverrides` |
| `componentMap` (plugin) | `Map<string, ComponentNode>`, cleared per session | Extended by FileScanner pre-population |
| `handleWsMessage` (plugin) | Handles `push-components`, `request-changeset`, `request-export` | Add `resolveExisting` check before node creation |
| `MappingRegistry` (MCP) | Maps `componentName` → `{figmaNodeId, status}`, persisted JSON | Potential bridge to exporter's `ComponentRegistry` |
| `PROPS_TO_COMPARE` (diff) | 25 fields compared | Add slot-related fields when they exist on PluginNodeDef |

---

## 2. Requirements Feasibility Analysis

### Complexity Signals

| Requirement | Complexity | Signal |
|-------------|-----------|--------|
| Req 1: Registry | Medium | New data structure + file I/O + batch coordination |
| Req 2: Instance from Registry | Medium | Figma API search + componentMap pre-population |
| Req 3: Slot Primitive | Low | Follows existing builder pattern exactly |
| Req 4: Compiler Slot Handling | Medium | Validation logic + property injection + ancestor traversal |
| Req 5: Exporter Slot Encoding | Low | Field passthrough, follows existing pattern |
| Req 6: Plugin Slot Creation | Low–Medium | Naming convention + plugin data + guidance logging |
| Req 7: Code Connect | Medium | New module, string template generation, no existing precedent |
| Req 8: Deduplication | High | Recursive hashing, tree transformation, property inference |
| Req 9: Slot Override | Medium–High | Detached copy strategy, plugin-side tree reconstruction |
| Req 10: Bidirectional Sync | Medium | Extends existing edit tracker, slot-aware categorization |

### Constraints from Existing Architecture

1. **Figma Plugin API**: `ComponentPropertyType` lacks `'SLOT'` — forces naming convention fallback for Req 6
2. **Instance children are locked**: Cannot add/remove children of instance nested frames — forces detached-copy strategy for Req 9
3. **Plugin sandbox**: No filesystem, limited memory — FileScanner must cache results and be opt-in
4. **PluginNodeDef readonly arrays**: Extensions must use optional fields, not modify existing field types
5. **Compiler is synchronous**: Slot validation and property injection must not introduce async operations

### Research Needed (Deferred to Implementation)

- **SHA-256 in plugin sandbox**: Verify `crypto.subtle.digest` is available for structural hashing (if any hashing runs plugin-side)
- **`findAllWithCriteria` performance**: Benchmark on files with 500+ components to validate FileScanner approach
- **Code Connect publish workflow**: How generated `.figma.tsx` files integrate with `@figma/code-connect` CLI publish step

---

## 3. Implementation Approach Options

### Option A: Extend Existing Components Only

**Files modified**: `types.ts`, `nodes.ts`, `plugin-types.ts`, `compiler.ts`, `exporter.ts`, `code.ts`, `serializer.ts`, `diff.ts`, `cli.ts`

- Add optional fields to `DslNode`, `PluginNodeDef`, `FigmaNodeDict`
- Add `slot()` builder to `nodes.ts`, extend `instance()` signature
- Add slot validation/injection to `compileNode()`
- Add slot encoding to `convertToPluginNode()`
- Add slot frame creation to `createNode()` FRAME case
- Add registry/dedup/Code Connect logic inline in `exporter.ts`

**Trade-offs**:
- (+) Minimal new files
- (-) `exporter.ts` becomes very large (currently 221 lines, would grow to ~600+)
- (-) Registry, dedup, and Code Connect are distinct responsibilities crammed into one file

### Option B: Create New Modules

**New files**: `structural-hash.ts`, `component-registry.ts`, `structural-deduplicator.ts`, `code-connect-generator.ts` (all in exporter), `file-scanner.ts` (in plugin)

- Each new responsibility gets its own module
- Existing files only get the minimal type extensions and dispatch calls

**Trade-offs**:
- (+) Clean separation of concerns, each module independently testable
- (+) Follows monorepo pattern of one module per concern
- (-) More files, more imports
- (-) Interface design between modules requires care

### Option C: Hybrid (Recommended)

**Extend**: `types.ts`, `nodes.ts`, `plugin-types.ts`, `compiler.ts`, `exporter.ts`, `code.ts`, `serializer.ts`, `diff.ts`, `cli.ts`, `changeset.ts`
**New modules**: `structural-hash.ts`, `component-registry.ts`, `structural-deduplicator.ts`, `code-connect-generator.ts` (exporter); no separate file-scanner module (inline in `code.ts` as a function)

- Type extensions and builder changes go in existing files (natural extension)
- Registry, dedup, hashing, and Code Connect are distinct responsibilities → new files
- Plugin FileScanner is a single function, not complex enough for its own module — add to `code.ts`
- Slot frame creation is a conditional branch in the existing FRAME case — add to `code.ts`

**Trade-offs**:
- (+) Balanced: existing files grow minimally, new concerns get clean modules
- (+) Aligns with design document's component breakdown
- (+) Each new module is independently unit-testable
- (-) Need to coordinate import/export between new modules and existing exporter

---

## 4. Implementation Complexity & Risk

**Effort: L (1–2 weeks)**
Justification: 6 packages modified, 4 new modules, 10 requirements across the full pipeline. Core type/builder/compiler changes are straightforward but deduplication and detached-copy strategy add significant complexity.

**Risk: Medium**
Justification: Core patterns are well-established and slot support follows them. Medium risk from: (a) Figma API limitations requiring workarounds (naming convention, detached copies), (b) structural deduplication false positives, (c) Code Connect generation has no existing precedent in the codebase.

---

## 5. Recommendations for Design Phase

### Preferred Approach
**Option C (Hybrid)** — aligns with the approved design document. Extend existing types/files for natural integrations, create new modules for distinct responsibilities.

### Implementation Phasing (Suggested)

| Phase | Requirements | Blocking? |
|-------|-------------|-----------|
| Phase 1: Types & Builders | Req 3 (slot primitive), Req 9.1 (instance slotOverrides) | Yes — all downstream work depends on type definitions |
| Phase 2: Compiler | Req 4 (slot validation + property injection) | Yes — exporter needs compiled output with slot metadata |
| Phase 3: Exporter Core | Req 5 (slot encoding) | Yes — plugin needs slot fields in PluginNodeDef |
| Phase 4: Plugin | Req 2 (instance from registry), Req 6 (slot creation), Req 9.4 (detached copies) | Partially — can run in parallel with Phase 5 |
| Phase 5: Registry & Dedup | Req 1 (registry), Req 8 (deduplication) | No — independent of plugin work |
| Phase 6: Code Connect | Req 7 | No — independent module |
| Phase 7: CLI | Req 1.3, 8.1 (flags) | No — wires options to exporter |
| Phase 8: Bidirectional Sync | Req 10 | No — extends existing edit tracker |

### Key Decisions Already Made (in Design)
- Slot as `isSlot` flag on FRAME (not new node type) — confirmed appropriate
- Naming convention `[Slot] {name}` for plugin — confirmed necessary (API limitation)
- Detached copy for slot overrides — confirmed necessary (instance children locked)
- `StructuralHasher` as shared utility — confirmed appropriate (avoids duplication)
- JSON registry file + scan-on-import — confirmed appropriate

### Research Items to Carry Forward
- Benchmark `figma.root.findAllWithCriteria()` on large files
- Verify `crypto.subtle` availability in Figma plugin sandbox for SHA-256
- Determine Code Connect CLI publish integration requirements
