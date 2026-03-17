# Implementation Plan

- [x] 1. Remove slot fields from dsl-core shared types
- [x] 1.1 Remove slot fields from DslNode, PluginNodeDef, and ComponentPropertyType
  - Remove `isSlot`, `slotName`, `preferredInstances`, `slotOverrides` from the DslNode type
  - Remove `isSlot`, `slotPropertyName`, `slotProperties`, `slotOverrides`, `preferredInstances` from the PluginNodeDef type
  - Remove `'SLOT'` from the ComponentPropertyType union
  - Remove the `SlotProps` type export
  - Resolve any type errors in dsl-core caused by these removals
  - _Requirements: 5.1, 5.3, 5.4, 5.5_
  - _Contracts: DslCore Types_

- [x] 1.2 Remove slot() builder and slotOverrides from instance()
  - Remove the `slot()` builder function from the nodes module
  - Remove the `slotOverrides` parameter from the `instance()` builder
  - Remove slot-related test cases from the nodes test file
  - Update any DSL example files that reference `slot()`
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 1.3 Remove slot fields from changeset types and diff logic
  - Remove `slotName`, `slotChangeType`, `slotContent` from the changeset property change type
  - Remove `isSlot` and `slotPropertyName` filtering from the diff algorithm
  - Remove or update slot-related changeset test cases
  - _Requirements: 11.1, 11.2, 11.3_

- [x] 2. Remove slot handling from compiler
- [x] 2.1 (P) Remove slot compilation logic and slot fields from FigmaNodeDict
  - Remove `isSlot`, `slotName`, `preferredInstances`, `slotOverrides` from the FigmaNodeDict type
  - Remove `isSlot`/`slotName` metadata propagation during compilation
  - Remove the validation that slot nodes appear within COMPONENT context
  - Remove SLOT-type entry injection into `componentPropertyDefinitions`
  - Remove `slotOverrides` compilation on instance nodes
  - Remove the mutual exclusivity check between `isSlot` and `isCanvas`
  - Remove or update slot-related compiler test cases
  - Verify `npx tsc --noEmit -p packages/compiler/` passes
  - _Requirements: 5.2, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - _Contracts: Compiler_

- [x] 3. Remove slot encoding from exporter
- [x] 3.1 (P) Remove slot export logic and Code Connect slot generation
  - Stop setting `isSlot` and `slotPropertyName` on canvas nodes (keep `isCanvas` and `canvasName`)
  - Remove `slotProperties` map building on component-level nodes
  - Remove `slotOverrides` encoding on instance nodes
  - Remove `figma.slot()` mapping generation from Code Connect output
  - Remove or update slot-related exporter test cases
  - Verify `npx tsc --noEmit -p packages/exporter/` passes
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - _Contracts: Exporter_

- [x] 4. Refactor plugin canvas detection pipeline
- [x] 4.1 Create canvas-only detector replacing the slot detector
  - Replace the 3-phase slot detection module with a single-phase canvas detector
  - Walk component children and check for `dsl-canvas` plugin data to identify canvas regions
  - Extract canvas name from parsed plugin data JSON
  - Return canvas regions with node references and canvas names
  - Remove all slot detection types (SlotDetectionResult, SlotSourceType, SlotNodeKind)
  - Remove the slot-detector test file and create canvas-detector tests covering: detection via plugin data, empty results, non-canvas nodes skipped
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - _Contracts: CanvasDetector service interface_

- [x] 4.2 Refactor image capture to accept canvas regions instead of slot results
  - Change the capture function to accept a list of canvas regions (canvas name + node reference) instead of slot detection results
  - Remove references to SlotSourceType and CapturedSlotImage types
  - Retain existing capabilities: exportAsync PNG capture, configurable 1x–4x scale, progress reporting, abort/cancellation, per-node error resilience
  - Update image capture tests for canvas-only input types
  - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - _Contracts: ImageCapture service interface_

- [x] 4.3 Refactor export bundler to use canvas image types
  - Change the bundler to accept canvas image data instead of captured slot image maps
  - Remove references to SlotSourceType, SlotImageEntry, and SlotImageMap types
  - Rename the `slotImages` output field to `canvasImages` in the exported JSON
  - Retain existing capabilities: base64 inline below size threshold, ZIP above threshold, ZIP-to-base64 fallback
  - Keep fflate dependency for ZIP support
  - Update export bundler tests for canvas-only bundling
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - _Contracts: ExportBundler service interface_

- [x] 5. Refactor plugin slot utilities and import/export
- [x] 5.1 Refactor slot naming utilities to canvas equivalents
  - Rename `formatSlotName` to `formatCanvasName` using the `[Canvas]` prefix
  - Rename `isSlotFrameName` to `isCanvasFrameName`
  - Rename `extractSlotName` to `extractCanvasName`
  - Remove `buildSlotPluginData` function
  - Retain non-slot utilities: `buildComponentMap`, `findDuplicateNames`, `resolveInstance`, `formatDetachedCopyName`, `buildDetachedCopy`
  - Update the slot-utils test file to test canvas naming utilities while retaining non-slot utility tests
  - _Requirements: 9.3, 9.6_

- [x] 5.2 Update plugin import/export to remove slot handling
  - Replace `[Slot]` naming convention with `[Canvas]` for DslCanvas frames in the import flow
  - Remove reading and writing of slot plugin data (PLUGIN_DATA_SLOT key)
  - When importing a COMPONENT with SLOT-type componentPropertyDefinitions, skip the SLOT properties entirely (remove deferred registration)
  - Remove `isSlot` and `slotPropertyName` from the plugin serializer output
  - Update frame creation logic to use `[Canvas]` naming for DslCanvas frames
  - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [x] 6. Add plugin UI canvas export mode toggle
- [x] 6.1 (P) Add canvas export mode selector to the export tab
  - Add a select element with "As Images" and "As DSL Nodes" options, placed before the scale selector
  - Default selection to "As DSL Nodes"
  - Show the scale selector only when "As Images" is selected; hide or disable it for "As DSL Nodes"
  - Include `canvasExportMode` field in the export message sent from UI to plugin core
  - Update progress display to show canvas name instead of slot name
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  - _Contracts: PluginUI state, ExportMessage protocol_

- [x] 7. Wire up canvas image pipeline orchestration
- [x] 7.1 Replace the slot image pipeline with canvas-only orchestration in the plugin core
  - Replace `runImageBundlePipeline()` with a canvas-only pipeline function
  - When `canvasExportMode` is "images": execute detect → capture → bundle flow
  - When `canvasExportMode` is "nodes": return plain JSON without image capture
  - Remove all imports of slot detector types and functions
  - Remove PLUGIN_DATA_SLOT references from the plugin core
  - Wire the canvas export mode from the UI message into the pipeline decision
  - _Requirements: 9.1, 9.2, 14.6, 14.7_
  - _Contracts: PluginCore runCanvasImagePipeline_

- [x] 8. Simplify DslCanvas component
- [x] 8.1 (P) Remove slot-specific props and logic from the DslCanvas component
  - Remove the `slotOverrides` prop
  - Remove the `applySlotOverrides()` function
  - Remove `nativeSlot` source type handling and the `sourceType` field from BundledImage
  - Retain the `bundledImage` prop for displaying pre-captured canvas images
  - Verify the component continues to render via the `dsl` prop and Vite plugin when no bundled image is provided
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  - _Contracts: DslCanvas state_

- [x] 9. Update documentation
- [x] 9.1 (P) Remove slot references from documentation and document canvas export toggle
  - Remove `slot()`, slot properties, and Figma native slot detection references from the DSL reference doc
  - Remove slot detection and slot-related plugin data descriptions from the plugin doc
  - Document the new canvas export mode toggle (As Images / As DSL Nodes) and its interaction with the scale selector in the plugin doc
  - Remove `isSlot`, `slotPropertyName`, and slot-to-canvas dual-flagging from the exporter doc
  - Remove `slot()` builder, `SlotProps`, and slot-related DslNode field references from the dsl-core doc
  - Remove the SLOT property `defaultValue` constraint (constraint 3b) from the DSL reference
  - Remove the `defaultValue failed validation` troubleshooting entry from the DSL reference
  - Update slot/canvas interoperability references to describe canvas-only behavior
  - Document the `canvasImages` export field in the exported JSON schema section
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9_

- [x] 9.2 (P) Update spec metadata for superseded specifications
  - Mark the `figma-slots-component-reuse` spec as deprecated with a note that its slot features have been removed by this spec
  - Update the `canvas-component` spec with a note that slot-related requirements (6, 9, 10, 11) have been removed, while DslCanvas requirements (1–5, 7, 8) remain valid and are extended with the export toggle
  - _Requirements: 13.1, 13.2_

- [x] 10. Regression testing and validation
- [x] 10.1 Run full test suite and type checks across all modified packages
  - Run `npx tsc --noEmit` on each modified package (dsl-core, compiler, exporter, plugin) and resolve any type errors
  - Run `npx vitest run` from the project root and ensure all tests pass
  - Verify the DslCanvas component renders DSL JSON to images in the preview app
  - Verify the CLI `render` command produces per-canvas PNGs for DSL files with canvas nodes
  - Verify the plugin builds successfully via esbuild
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_
