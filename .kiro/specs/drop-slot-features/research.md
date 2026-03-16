# Research & Design Decisions

## Summary
- **Feature**: `drop-slot-features`
- **Discovery Scope**: Extension (refactoring existing system)
- **Key Findings**:
  - The image capture and export bundling pipeline is cleanly isolated in 3 files (`slot-detector.ts`, `image-capture.ts`, `export-bundler.ts`) with thin integration in `code.ts:runImageBundlePipeline()`. Refactoring to canvas-only requires removing Phase 1+2 from detector and updating types — the core `exportAsync` and `fflate` logic is reusable.
  - The plugin UI already has a scale selector in the export tab; adding a canvas export mode toggle requires minimal HTML changes and one additional field in the export message protocol.
  - Slot removal touches 8 packages but each touch is shallow — removing fields from interfaces, deleting builder functions, removing conditional branches. No deep architectural changes needed.

## Research Log

### Current Export Pipeline Structure
- **Context**: Need to understand integration depth before refactoring
- **Findings**:
  - `runImageBundlePipeline()` in code.ts (lines 1031-1083) orchestrates: detect → capture → bundle
  - Detection (`detectSlots()`) has 3 phases: componentPropertyDefinitions (Phase 1), node.type SLOT (Phase 2), dsl-canvas pluginData (Phase 3). Only Phase 3 is needed for canvas-only detection.
  - Image capture (`captureSlotImages()`) accepts `SlotDetectionResult[]` — needs new `CanvasRegion` input type
  - Export bundler (`bundleExport()`) depends on `CapturedSlotImage` which has `sourceType` — can simplify to remove sourceType
  - Output field `slotImages` embedded in JSON by bundler — rename to `canvasImages`
- **Implications**: Replace slot-detector.ts with a simpler canvas-detector.ts. Refactor image-capture.ts and export-bundler.ts types. Thin changes in code.ts integration.

### Plugin UI Toggle Integration
- **Context**: Need to add canvas export mode selector to the export tab
- **Findings**:
  - Current UI has: mode selector (changeset/complete), scale selector (1x-4x), scope selector (selection/page)
  - Message format: `{ type: 'export-changeset'|'export-complete', scope, scale }`
  - Adding `canvasExportMode: 'images' | 'nodes'` to the message is straightforward
  - Scale selector only relevant when mode is 'images' — can conditionally show/hide
- **Implications**: Add one select element, pass one additional field in message, check in code.ts before calling pipeline

### Slot Field Removal Scope
- **Context**: Catalog all slot-specific fields across packages
- **Findings**:
  - dsl-core types.ts: `isSlot`, `slotName`, `preferredInstances`, `slotOverrides` on DslNode; `SlotProps`
  - dsl-core plugin-types.ts: `isSlot`, `slotPropertyName`, `slotProperties`, `slotOverrides`, `preferredInstances` on PluginNodeDef
  - compiler types.ts: `isSlot`, `slotName`, `preferredInstances`, `slotOverrides` on FigmaNodeDict
  - changeset.ts: `slotName`, `slotChangeType`, `slotContent`
  - diff.ts: filters on `isSlot`, `slotPropertyName`
  - exporter.ts: sets `isSlot`, `slotPropertyName`, builds `slotProperties` map
  - code-connect.ts: generates `figma.slot()` mappings
  - code.ts: `[Slot]` naming, PLUGIN_DATA_SLOT, slot utils integration
  - DslCanvas.tsx: `slotOverrides` prop, `applySlotOverrides()`, `nativeSlot` sourceType
- **Implications**: All removals are field deletions or conditional branch removals — no new architecture needed

## Design Decisions

### Decision: Canvas Detection via Plugin Data Only
- **Context**: Need to detect DslCanvas regions without native slot detection
- **Alternatives**:
  1. Keep full 3-phase detection, just filter results to dslCanvas only
  2. Replace with simple plugin data scan (Phase 3 only)
- **Selected Approach**: Simple plugin data scan — walk component children, check `dsl-canvas` plugin data
- **Rationale**: Phase 1 and 2 are entirely about native Figma slots. Phase 3 is independent and self-contained.
- **Trade-offs**: Loses ability to detect native slots (intentional). Simpler, faster, no false positives.

### Decision: Rename slotImages to canvasImages
- **Context**: Export JSON field name should reflect canvas-only content
- **Alternatives**:
  1. Keep `slotImages` for backward compatibility
  2. Rename to `canvasImages`
- **Selected Approach**: Rename to `canvasImages`
- **Rationale**: Clean break — no external consumers depend on the field name yet. Clearer semantics.
- **Trade-offs**: Breaking change for any existing exports that reference `slotImages`. Acceptable since feature is internal.

### Decision: Default Canvas Export Mode to "As DSL Nodes"
- **Context**: Need a sensible default for the new toggle
- **Alternatives**:
  1. Default to "As Images" (captures by default)
  2. Default to "As DSL Nodes" (no capture by default)
- **Selected Approach**: Default to "As DSL Nodes"
- **Rationale**: Matches current behavior when no slots are detected. Avoids unexpected image capture overhead. Users opt-in to image export.

## Risks & Mitigations
- **Risk**: Removing slot fields from types causes cascading type errors across packages → **Mitigation**: Process packages in dependency order (dsl-core → compiler → exporter → plugin → preview)
- **Risk**: Existing test fixtures reference slot fields → **Mitigation**: Update/remove test fixtures alongside type changes
- **Risk**: Export format change (`slotImages` → `canvasImages`) breaks MCP server relay → **Mitigation**: Check WebSocket relay code for field references
