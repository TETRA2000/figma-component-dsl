# Requirements Document

## Introduction

The canvas-component spec introduced two distinct concepts: **DslCanvas** (custom canvas rendering via `@figma-dsl/renderer`) and **Figma Native Slots** (slot detection, image capture via `exportAsync`, and export bundling with base64/ZIP). DslCanvas is working correctly and should remain untouched. However, the Figma native slot features add significant complexity — slot detection heuristics, image capture pipeline, ZIP bundling via fflate, and dual rendering paths — without providing proportional value in the current workflow.

This specification removes all Figma native slot features from the codebase while preserving DslCanvas functionality. The cleanup spans multiple packages (plugin, exporter, compiler, dsl-core, preview) and their associated documentation.

**Scope of removal:**
- Figma native slot detection (`SlotDetector`, `detectSlots()`)
- Slot image capture via `exportAsync` (`captureSlotImages()`)
- Export bundling with base64/ZIP threshold (`bundleExport()`, `fflate` dependency)
- `nativeSlot` source type classification and handling
- Slot-specific fields on types (`isSlot`, `slotName`, `slotPropertyName`, `slotProperties`, `slotOverrides`, `preferredInstances`)
- `slot()` DSL builder function and `SlotProps` type
- Code Connect `figma.slot()` generation
- Plugin `[Slot]` naming convention and slot plugin data
- `bundledImage` prop on DslCanvas component (nativeSlot path only)
- Changeset slot-specific fields (`slotChangeType`, `slotContent`)

**What is preserved:**
- DslCanvas React component and Vite plugin
- `canvas()` DSL builder, `isCanvas`, `canvasName`, `canvasScale` fields
- `renderCanvasNodes()` renderer utility
- CLI canvas integration (`--no-canvas` flag)
- DslCanvas plugin data (`dsl-canvas` key) for round-trip identification
- Canvas metadata in exporter output

## Requirements

### Requirement 1: Remove Slot Detection from Plugin

**Objective:** As a plugin maintainer, I want the slot detection subsystem removed, so that the plugin codebase is simpler and free of unused detection heuristics.

#### Acceptance Criteria

1. The plugin shall no longer contain a `detectSlots()` function or `SlotDetector` module.
2. The plugin shall no longer contain a `parsePropertyKey()` function used for slot detection (note: if used elsewhere, move rather than delete).
3. The plugin shall no longer contain `SlotDetectionResult`, `SlotSourceType`, or `SlotNodeKind` type definitions.
4. When exporting a component, the plugin shall not scan for native Figma slot children or `componentPropertyDefinitions` of type SLOT for detection purposes.
5. The plugin shall no longer classify nodes as `nativeSlot` source type.
6. The associated test file `slot-detector.test.ts` shall be removed.

### Requirement 2: Remove Slot Image Capture Pipeline

**Objective:** As a plugin maintainer, I want the slot image capture pipeline removed, so that the export flow no longer depends on `exportAsync`-based image rendering for slot content.

#### Acceptance Criteria

1. The plugin shall no longer contain a `captureSlotImages()` function or image capture module.
2. The plugin shall no longer call `node.exportAsync()` for the purpose of capturing slot content images.
3. The plugin shall no longer contain `CapturedSlotImage` type definitions.
4. The plugin UI shall no longer display slot-specific progress feedback (slot name, per-slot rendering status) during export.
5. The associated test file `image-capture.test.ts` shall be removed.

### Requirement 3: Remove Export Bundling and ZIP Support

**Objective:** As a plugin maintainer, I want the export bundler and ZIP packaging removed, so that the plugin produces simple JSON exports without image bundling logic or the fflate dependency.

#### Acceptance Criteria

1. The plugin shall no longer contain a `bundleExport()` function or export bundler module.
2. The plugin shall no longer contain `SlotImageEntry` or `SlotImageMap` type definitions.
3. The plugin shall no longer depend on the `fflate` package.
4. The exported JSON shall no longer contain a `slotImages` field.
5. The plugin UI shall no longer support ZIP file download for exports.
6. When exporting (changeset or complete), the plugin shall produce the standard JSON output without image bundling.
7. The associated test file `export-bundler.test.ts` shall be removed.

### Requirement 4: Remove Slot Fields from Core Types

**Objective:** As a pipeline maintainer, I want slot-specific fields removed from the shared type definitions, so that the type system reflects only the features actually in use.

#### Acceptance Criteria

1. The `DslNode` type in dsl-core shall no longer contain `isSlot`, `slotName`, `preferredInstances`, or `slotOverrides` fields.
2. The `FigmaNodeDict` type in the compiler shall no longer contain `isSlot`, `slotName`, `preferredInstances`, or `slotOverrides` fields.
3. The `PluginNodeDef` type in dsl-core shall no longer contain `isSlot`, `slotPropertyName`, `slotProperties`, `slotOverrides`, or `preferredInstances` fields.
4. The `ComponentPropertyType` in dsl-core shall no longer include `'SLOT'` as a union member.
5. The dsl-core package shall no longer export `SlotProps` type.
6. When existing code references removed fields, the compiler (tsc) shall produce type errors that are resolved as part of this cleanup.

### Requirement 5: Remove slot() DSL Builder

**Objective:** As a DSL author, I want the `slot()` builder removed from dsl-core, so that the API surface only exposes features that are supported in the pipeline.

#### Acceptance Criteria

1. The dsl-core package shall no longer export a `slot()` builder function.
2. The `instance()` builder shall no longer accept a `slotOverrides` parameter.
3. The associated test file `slot.test.ts` shall be removed.
4. If any existing DSL example files reference `slot()`, they shall be updated to remove the usage.

### Requirement 6: Remove Slot Handling from Compiler

**Objective:** As a pipeline maintainer, I want slot-specific compilation logic removed, so that the compiler only handles canvas and standard node types.

#### Acceptance Criteria

1. When the compiler encounters a node, the compiler shall no longer check for or propagate `isSlot` or `slotName` metadata.
2. The compiler shall no longer validate that slot nodes appear within COMPONENT context.
3. The compiler shall no longer inject SLOT-type entries into `componentPropertyDefinitions`.
4. The compiler shall no longer compile `slotOverrides` on instance nodes.
5. The mutual exclusivity check between `isSlot` and `isCanvas` shall be removed (since `isSlot` no longer exists).
6. The associated slot tests in compiler test files shall be removed or updated.

### Requirement 7: Remove Slot Encoding from Exporter

**Objective:** As a pipeline maintainer, I want slot-specific export logic removed, so that the exporter only handles canvas metadata without slot semantics.

#### Acceptance Criteria

1. When the exporter encounters a canvas node, the exporter shall set `isCanvas` and `canvasName` metadata but shall no longer set `isSlot` or `slotPropertyName`.
2. The exporter shall no longer build a `slotProperties` map on component-level nodes.
3. The exporter shall no longer encode `slotOverrides` on instance nodes.
4. The Code Connect generator shall no longer produce `figma.slot()` mappings.
5. The associated slot tests in exporter test files shall be removed or updated.

### Requirement 8: Remove Slot Handling from Plugin Import/Export

**Objective:** As a plugin maintainer, I want slot-specific node creation and serialization logic removed from the plugin, so that import and export only handle standard frames and canvas metadata.

#### Acceptance Criteria

1. The plugin shall no longer create frames using the `[Slot]` naming convention.
2. The plugin shall no longer store or read slot plugin data (the `PLUGIN_DATA_SLOT` key).
3. The plugin shall no longer contain slot utility functions (`formatSlotName`, `isSlotFrameName`, `extractSlotName`, `buildSlotPluginData`).
4. When importing a COMPONENT with SLOT-type `componentPropertyDefinitions`, the plugin shall skip the SLOT properties (deferred registration code removed since slots no longer exist).
5. The plugin serializer shall no longer serialize `isSlot` or `slotPropertyName` fields.
6. The associated test file `slot-utils.test.ts` shall be removed.

### Requirement 9: Simplify DslCanvas Component

**Objective:** As a developer, I want the DslCanvas component simplified to only support server-side rendering, so that the component is not burdened with bundled image and native slot rendering paths.

#### Acceptance Criteria

1. The DslCanvas component shall no longer accept a `bundledImage` prop.
2. The DslCanvas component shall no longer contain `BundledImage` type or `nativeSlot`/`dslCanvas` source type handling.
3. The DslCanvas component shall no longer contain `applySlotOverrides()` logic.
4. The DslCanvas component shall no longer accept a `slotOverrides` prop.
5. The DslCanvas component shall continue to function with its existing `dsl` prop and server-side rendering path via the Vite plugin.

### Requirement 10: Remove Slot Fields from Changeset Types

**Objective:** As a pipeline maintainer, I want slot-specific changeset fields removed, so that the diff and changeset system only tracks standard property changes.

#### Acceptance Criteria

1. The changeset types shall no longer contain `slotName`, `slotChangeType`, or `slotContent` fields.
2. The diff algorithm shall no longer filter or special-case `isSlot` or `slotPropertyName` during comparison.
3. The associated slot tests in changeset test files shall be removed or updated.

### Requirement 11: Update Documentation

**Objective:** As a developer, I want all documentation updated to reflect the removal of slot features, so that the docs accurately describe the current system capabilities.

#### Acceptance Criteria

1. The `docs/dsl-reference.md` shall no longer reference `slot()`, slot properties, or Figma native slot detection.
2. The `docs/packages/plugin.md` shall no longer describe slot detection, image capture, export bundling, or slot-related plugin data.
3. The `docs/packages/exporter.md` shall no longer reference `isSlot`, `slotPropertyName`, or slot-to-canvas dual-flagging.
4. The `docs/packages/dsl-core.md` shall no longer reference `slot()` builder, `SlotProps`, or slot-related DslNode fields.
5. The plugin constraint about SLOT property `defaultValue` (constraint 3b) in `docs/dsl-reference.md` shall be removed since SLOT property handling is no longer needed.
6. The troubleshooting entry for `defaultValue failed validation` in `docs/dsl-reference.md` shall be removed.
7. Where documentation references slot/canvas interoperability, the references shall be updated to describe canvas-only behavior.

### Requirement 12: Update Spec Metadata

**Objective:** As a project maintainer, I want the spec metadata updated to reflect that slot features have been superseded, so that the spec history accurately tracks the evolution.

#### Acceptance Criteria

1. The `figma-slots-component-reuse` spec shall be marked as deprecated with a note that its slot features have been removed by this spec.
2. The `canvas-component` spec shall be updated with a note that slot-related requirements (6, 9, 10, 11) have been removed by this spec, while DslCanvas requirements (1–5, 7, 8) remain valid.

### Requirement 13: Ensure No Regressions

**Objective:** As a pipeline maintainer, I want all existing tests to pass after the removal, so that the DslCanvas pipeline and all non-slot functionality remain fully operational.

#### Acceptance Criteria

1. When running `npx vitest run` from the project root, all tests shall pass.
2. When running `npx tsc --noEmit` on each modified package, no type errors shall be reported.
3. The DslCanvas React component shall continue to render DSL JSON to images in the preview app.
4. The CLI `render` command shall continue to produce per-canvas PNGs for DSL files containing canvas nodes.
5. The Figma plugin shall continue to import and export components without errors (excluding slot features).
