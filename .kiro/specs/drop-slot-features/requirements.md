# Requirements Document

## Introduction

The canvas-component spec introduced two distinct concepts: **DslCanvas** (custom canvas rendering via `@figma-dsl/renderer`) and **Figma Native Slots** (slot detection, image capture via `exportAsync`, and export bundling with base64/ZIP). DslCanvas is working correctly. However, the Figma native slot features add complexity — slot detection heuristics, `nativeSlot` classification, and dual rendering paths — without providing proportional value in the current workflow.

This specification:
1. **Removes** all Figma native slot features (slot detection, `nativeSlot` type, `slot()` DSL builder, slot-specific fields in types, slot plugin data, Code Connect `figma.slot()` generation)
2. **Repurposes** the image capture and export bundling pipeline exclusively for DslCanvas regions
3. **Adds** a plugin UI toggle to choose between exporting DslCanvas regions as **images** (base64/ZIP via `exportAsync`) or as **DSL nodes** (JSON structure)

**Scope of removal:**
- Figma native slot detection (`SlotDetector`, `detectSlots()`, `nativeSlot` source type)
- Slot-specific fields on types (`isSlot`, `slotName`, `slotPropertyName`, `slotProperties`, `slotOverrides`, `preferredInstances`)
- `slot()` DSL builder function and `SlotProps` type
- Code Connect `figma.slot()` generation
- Plugin `[Slot]` naming convention and slot plugin data (`PLUGIN_DATA_SLOT`)
- `slotOverrides` prop on DslCanvas component
- Changeset slot-specific fields (`slotChangeType`, `slotContent`)

**What is preserved and repurposed:**
- Image capture pipeline (`captureSlotImages()` → renamed/refactored for canvas-only use)
- Export bundling (`bundleExport()` with base64/ZIP threshold, `fflate` dependency)
- `slotImages` field in export JSON (renamed to `canvasImages`)
- `bundledImage` prop on DslCanvas component (simplified to canvas-only)
- DslCanvas React component, Vite plugin, `canvas()` DSL builder
- `renderCanvasNodes()` renderer utility, CLI canvas integration

## Requirements

### Requirement 1: Remove Slot Detection from Plugin

**Objective:** As a plugin maintainer, I want the slot detection subsystem replaced with a simpler canvas-only detection, so that the plugin no longer depends on Figma native slot heuristics.

#### Acceptance Criteria

1. The plugin shall no longer contain a `detectSlots()` function or `SlotDetector` module.
2. The plugin shall no longer contain `SlotDetectionResult`, `SlotSourceType`, or `SlotNodeKind` type definitions.
3. When exporting a component, the plugin shall not scan for native Figma slot children or `componentPropertyDefinitions` of type SLOT for detection purposes.
4. The plugin shall no longer classify nodes as `nativeSlot` source type.
5. The plugin shall detect DslCanvas regions by scanning component children for `dsl-canvas` plugin data (the existing Phase 3 of `detectSlots()`), without relying on `componentPropertyDefinitions` or node type heuristics.
6. The associated test file `slot-detector.test.ts` shall be removed or replaced with a canvas detection test.

### Requirement 2: Repurpose Image Capture Pipeline for Canvas

**Objective:** As a plugin maintainer, I want the image capture pipeline refactored to operate on DslCanvas regions only, so that it no longer references slot types or detection results.

#### Acceptance Criteria

1. The image capture function shall accept a list of DslCanvas regions (identified by canvas name and node reference) instead of `SlotDetectionResult[]`.
2. The image capture function shall no longer reference `SlotSourceType` or `CapturedSlotImage` types.
3. The image capture function shall retain its existing capabilities: `exportAsync`-based PNG capture, configurable scale (1x–4x), progress reporting, abort/cancellation support, and per-node error resilience.
4. The associated test file shall be updated to test canvas-only image capture.

### Requirement 3: Repurpose Export Bundling for Canvas

**Objective:** As a plugin maintainer, I want the export bundler refactored to bundle canvas images, so that it no longer references slot types while retaining base64/ZIP dual-format support.

#### Acceptance Criteria

1. The export bundler shall accept canvas image data instead of `CapturedSlotImage` maps.
2. The export bundler shall no longer reference `SlotSourceType`, `SlotImageEntry`, or `SlotImageMap` types.
3. The bundler shall retain its existing capabilities: base64 inline embedding below the size threshold, ZIP packaging above the threshold, and fallback from ZIP to base64 on failure.
4. The exported JSON shall use a `canvasImages` field (renamed from `slotImages`) containing a map of canvas names to their image data.
5. The `fflate` dependency shall be retained for ZIP support.
6. The associated test file shall be updated to test canvas-only bundling.

### Requirement 4: Plugin UI Toggle for Canvas Export Mode

**Objective:** As a designer, I want a toggle in the plugin's export UI to choose how DslCanvas regions are exported, so that I can get either pixel-perfect images or editable DSL node structures.

#### Acceptance Criteria

1. The plugin export tab shall display a toggle or selector with two options for DslCanvas export: **"As Images"** and **"As DSL Nodes"**.
2. When "As Images" is selected, the plugin shall capture DslCanvas regions via `exportAsync` and bundle the images in the export output (base64 or ZIP, using the existing bundling pipeline).
3. When "As DSL Nodes" is selected, the plugin shall export DslCanvas regions as standard frame structures in the JSON without image capture — matching the current non-image export behavior.
4. The default selection shall be "As DSL Nodes" to match the current default behavior when no slots are detected.
5. The toggle state shall be passed in the export message from UI to plugin core alongside the existing scale selector.
6. When "As Images" is selected, the existing export scale selector (1x–4x) shall remain visible and functional for controlling image resolution.
7. When "As DSL Nodes" is selected, the export scale selector shall be hidden or disabled since it is not applicable.

### Requirement 5: Remove Slot Fields from Core Types

**Objective:** As a pipeline maintainer, I want slot-specific fields removed from the shared type definitions, so that the type system reflects only the features actually in use.

#### Acceptance Criteria

1. The `DslNode` type in dsl-core shall no longer contain `isSlot`, `slotName`, `preferredInstances`, or `slotOverrides` fields.
2. The `FigmaNodeDict` type in the compiler shall no longer contain `isSlot`, `slotName`, `preferredInstances`, or `slotOverrides` fields.
3. The `PluginNodeDef` type in dsl-core shall no longer contain `isSlot`, `slotPropertyName`, `slotProperties`, `slotOverrides`, or `preferredInstances` fields.
4. The `ComponentPropertyType` in dsl-core shall no longer include `'SLOT'` as a union member.
5. The dsl-core package shall no longer export `SlotProps` type.
6. When existing code references removed fields, the compiler (tsc) shall produce type errors that are resolved as part of this cleanup.

### Requirement 6: Remove slot() DSL Builder

**Objective:** As a DSL author, I want the `slot()` builder removed from dsl-core, so that the API surface only exposes features that are supported in the pipeline.

#### Acceptance Criteria

1. The dsl-core package shall no longer export a `slot()` builder function.
2. The `instance()` builder shall no longer accept a `slotOverrides` parameter.
3. The associated test file `slot.test.ts` shall be removed.
4. If any existing DSL example files reference `slot()`, they shall be updated to remove the usage.

### Requirement 7: Remove Slot Handling from Compiler

**Objective:** As a pipeline maintainer, I want slot-specific compilation logic removed, so that the compiler only handles canvas and standard node types.

#### Acceptance Criteria

1. When the compiler encounters a node, the compiler shall no longer check for or propagate `isSlot` or `slotName` metadata.
2. The compiler shall no longer validate that slot nodes appear within COMPONENT context.
3. The compiler shall no longer inject SLOT-type entries into `componentPropertyDefinitions`.
4. The compiler shall no longer compile `slotOverrides` on instance nodes.
5. The mutual exclusivity check between `isSlot` and `isCanvas` shall be removed (since `isSlot` no longer exists).
6. The associated slot tests in compiler test files shall be removed or updated.

### Requirement 8: Remove Slot Encoding from Exporter

**Objective:** As a pipeline maintainer, I want slot-specific export logic removed, so that the exporter only handles canvas metadata without slot semantics.

#### Acceptance Criteria

1. When the exporter encounters a canvas node, the exporter shall set `isCanvas` and `canvasName` metadata but shall no longer set `isSlot` or `slotPropertyName`.
2. The exporter shall no longer build a `slotProperties` map on component-level nodes.
3. The exporter shall no longer encode `slotOverrides` on instance nodes.
4. The Code Connect generator shall no longer produce `figma.slot()` mappings.
5. The associated slot tests in exporter test files shall be removed or updated.

### Requirement 9: Remove Slot Handling from Plugin Import/Export

**Objective:** As a plugin maintainer, I want slot-specific node creation and serialization logic removed from the plugin, so that import and export only handle standard frames and canvas metadata.

#### Acceptance Criteria

1. The plugin shall no longer create frames using the `[Slot]` naming convention.
2. The plugin shall no longer store or read slot plugin data (the `PLUGIN_DATA_SLOT` key).
3. The plugin shall no longer contain slot utility functions (`formatSlotName`, `isSlotFrameName`, `extractSlotName`, `buildSlotPluginData`).
4. When importing a COMPONENT with SLOT-type `componentPropertyDefinitions`, the plugin shall skip the SLOT properties (deferred registration code removed since slots no longer exist).
5. The plugin serializer shall no longer serialize `isSlot` or `slotPropertyName` fields.
6. The associated test file `slot-utils.test.ts` shall be removed.

### Requirement 10: Simplify DslCanvas Component

**Objective:** As a developer, I want the DslCanvas component simplified to remove slot-specific logic while retaining bundled image support for the canvas image export mode.

#### Acceptance Criteria

1. The DslCanvas component shall no longer accept a `slotOverrides` prop.
2. The DslCanvas component shall no longer contain `applySlotOverrides()` logic.
3. The DslCanvas component shall no longer contain `nativeSlot` source type handling.
4. The DslCanvas component shall retain the `bundledImage` prop for displaying pre-captured canvas images from the plugin's "As Images" export mode.
5. The DslCanvas component shall continue to function with its existing `dsl` prop and server-side rendering path via the Vite plugin when no bundled image is provided.

### Requirement 11: Remove Slot Fields from Changeset Types

**Objective:** As a pipeline maintainer, I want slot-specific changeset fields removed, so that the diff and changeset system only tracks standard property changes.

#### Acceptance Criteria

1. The changeset types shall no longer contain `slotName`, `slotChangeType`, or `slotContent` fields.
2. The diff algorithm shall no longer filter or special-case `isSlot` or `slotPropertyName` during comparison.
3. The associated slot tests in changeset test files shall be removed or updated.

### Requirement 12: Update Documentation

**Objective:** As a developer, I want all documentation updated to reflect the removal of slot features and the new canvas export toggle, so that the docs accurately describe the current system capabilities.

#### Acceptance Criteria

1. The `docs/dsl-reference.md` shall no longer reference `slot()`, slot properties, or Figma native slot detection.
2. The `docs/packages/plugin.md` shall no longer describe slot detection or slot-related plugin data.
3. The `docs/packages/plugin.md` shall document the new canvas export mode toggle (As Images / As DSL Nodes) and its interaction with the export scale selector.
4. The `docs/packages/exporter.md` shall no longer reference `isSlot`, `slotPropertyName`, or slot-to-canvas dual-flagging.
5. The `docs/packages/dsl-core.md` shall no longer reference `slot()` builder, `SlotProps`, or slot-related DslNode fields.
6. The plugin constraint about SLOT property `defaultValue` (constraint 3b) in `docs/dsl-reference.md` shall be removed since SLOT property handling is no longer needed.
7. The troubleshooting entry for `defaultValue failed validation` in `docs/dsl-reference.md` shall be removed.
8. Where documentation references slot/canvas interoperability, the references shall be updated to describe canvas-only behavior.
9. The `canvasImages` export field shall be documented in the exported JSON schema section.

### Requirement 13: Update Spec Metadata

**Objective:** As a project maintainer, I want the spec metadata updated to reflect that slot features have been superseded, so that the spec history accurately tracks the evolution.

#### Acceptance Criteria

1. The `figma-slots-component-reuse` spec shall be marked as deprecated with a note that its slot features have been removed by this spec.
2. The `canvas-component` spec shall be updated with a note that slot-related requirements (6, 9, 10, 11) have been removed by this spec, while DslCanvas requirements (1–5, 7, 8) remain valid and are extended with the export toggle feature.

### Requirement 14: Ensure No Regressions

**Objective:** As a pipeline maintainer, I want all existing tests to pass after the changes, so that the DslCanvas pipeline and all non-slot functionality remain fully operational.

#### Acceptance Criteria

1. When running `npx vitest run` from the project root, all tests shall pass.
2. When running `npx tsc --noEmit` on each modified package, no type errors shall be reported.
3. The DslCanvas React component shall continue to render DSL JSON to images in the preview app.
4. The CLI `render` command shall continue to produce per-canvas PNGs for DSL files containing canvas nodes.
5. The Figma plugin shall continue to import and export components without errors (excluding slot features).
6. When the plugin exports with "As Images" mode, DslCanvas regions shall be captured and bundled using the refactored image capture pipeline.
7. When the plugin exports with "As DSL Nodes" mode, the export shall produce standard JSON without image capture.
