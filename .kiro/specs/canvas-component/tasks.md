# Implementation Plan

- [x] 1. Define canvas types and builder in dsl-core
- [x] 1.1 Add canvas-related fields to the DslNode interface and create the CanvasProps type
  - Extend the node interface with `isCanvas`, `canvasName`, and `canvasScale` optional fields
  - Define CanvasProps with the same layout properties as slots (size, autoLayout, fills, cornerRadius, layoutSizing) plus a `scale` property for render resolution
  - Add canvas fields to the plugin node definition type for Figma export compatibility
  - Export CanvasProps from the package public API
  - _Requirements: 2.2, 2.5_

- [x] 1.2 Implement the canvas() builder function
  - Create a `canvas(name, props?)` function that returns a FRAME-type node with `isCanvas: true` and `canvasName` set from the name parameter
  - Validate that name is non-empty (throw Error, matching slot() behavior)
  - Accept children from props and place them as the node's children array
  - Apply layout properties (size, autoLayout, fills, cornerRadius, layoutSizing) from CanvasProps
  - Export canvas() from the package public API
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 1.3 Add unit tests for canvas types and builder
  - Test that canvas() creates a FRAME node with correct canvas metadata
  - Test name validation (empty string throws error)
  - Test that children are populated from props
  - Test that all CanvasProps fields (size, autoLayout, fills, cornerRadius, layoutSizing, scale) are applied
  - Test that canvas nodes are distinct from slot nodes (isSlot is not set)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Add compiler support for canvas nodes
- [x] 2.1 Implement canvas metadata passthrough in the compiler
  - Preserve `isCanvas`, `canvasName`, and `canvasScale` on the compiled output when processing canvas nodes
  - Add canvas fields to the compiled node dictionary type definition
  - Canvas children compile using the standard layout resolution pipeline (text measurement, auto-layout) — no special handling needed since they are regular FRAME children
  - Canvas nodes are valid both inside and outside COMPONENT/COMPONENT_SET context (unlike slots)
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 2.2 Add mutual exclusivity validation for canvas and slot flags
  - Emit a compile error when a node has both `isSlot` and `isCanvas` set to true
  - Include descriptive error message with node path for debugging
  - When a slot override targets a canvas-typed slot, ensure the override content preserves canvas rendering metadata
  - _Requirements: 3.2, 6.1_

- [x] 2.3 Add unit tests for compiler canvas support
  - Test that canvas metadata passes through compilation unchanged
  - Test that canvas children are compiled with correct layout resolution
  - Test that canvas nodes outside COMPONENT context compile without errors
  - Test that canvas nodes with nested slots compile correctly (slots still validated)
  - Test that a node with both isSlot and isCanvas produces a compile error
  - Test that canvasScale property is preserved on compiled output
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 6.1_

- [x] 3. (P) Implement renderCanvasNodes utility in the renderer
- [x] 3.1 Create the canvas node extraction and rendering utility
  - Implement a function that walks a compiled node tree and collects all nodes with `isCanvas: true`
  - For each canvas node found, render it independently using the existing render function
  - Apply the node's `canvasScale` as the scale factor, falling back to the caller's options or default of 1
  - Return a Map keyed by canvas name, with each value containing the PNG buffer, intrinsic width, intrinsic height, and scale used
  - Export the utility from the renderer package public API
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 3.2 Add unit tests for renderCanvasNodes
  - Test that canvas nodes are correctly extracted from nested tree structures
  - Test that each canvas subtree renders to a standalone PNG buffer
  - Test that canvasScale is applied to the render output
  - Test that rendering a canvas node standalone produces identical output to rendering it as part of the full tree
  - Test behavior when no canvas nodes exist in the tree (returns empty Map)
  - Test behavior with multiple canvas nodes at different depths
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 4. (P) Add canvas support to exporter and plugin
- [x] 4.1 Encode canvas metadata in the Figma export format
  - When converting a compiled node with `isCanvas: true`, set the canvas metadata fields on the plugin node output
  - Also set the slot flag so the Figma plugin creates the canvas frame with slot behavior, allowing designers to add content
  - Preserve canvas children for Figma-side rendering
  - _Requirements: 5.1_

- [x] 4.2 Handle canvas frames in the Figma plugin
  - Add a plugin data key for canvas identification on created frames
  - Store canvas metadata (name, isCanvas flag) as plugin data for round-trip identification
  - Canvas frames are created as standard frames with slot behavior — existing slot creation code handles the frame setup
  - Ensure changeset export captures modifications to canvas frame content using existing slot change tracking
  - _Requirements: 5.2, 5.3_

- [x] 4.3 Add canvas serialization to the plugin serializer
  - Include canvas metadata fields in the serializable node type
  - Serialize isCanvas, canvasName when present during node serialization
  - _Requirements: 5.1, 5.2_

- [x] 4.4* Add tests for exporter and plugin canvas handling
  - Test that canvas metadata is correctly encoded in the plugin node format
  - Test that canvas nodes are also marked as slots for Figma compatibility
  - Test that canvas plugin data is stored and retrievable
  - Test serialization round-trip preserves canvas metadata
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 5. (P) Add CLI canvas integration
- [x] 5.1 Extend the render command to produce per-canvas PNGs
  - After the full-tree render, call the canvas extraction utility to render each canvas node independently
  - Write each canvas render result as a separate PNG file named after the canvas
  - Add a `--no-canvas` flag to skip per-canvas PNG extraction
  - Compile command needs no changes — canvas metadata flows through automatically
  - Batch command inherits canvas support since it delegates to the render command
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 5.2* Add tests for CLI canvas output
  - Test that render command produces per-canvas PNG files alongside the full-tree render
  - Test that `--no-canvas` flag suppresses per-canvas output
  - Test that compiled JSON output includes canvas metadata
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 6. Create the Vite plugin for server-side canvas rendering
- [x] 6.1 Implement the dev server middleware endpoint
  - Create a Vite plugin that registers a POST endpoint for rendering DSL JSON to PNG on the server side
  - The endpoint accepts compiled DSL JSON and an optional scale factor
  - Use the compiler and renderer packages to produce a PNG, then return the base64-encoded data URL with intrinsic dimensions
  - Cache rendered results keyed by a hash of the input JSON to avoid redundant renders
  - Initialize the renderer with bundled fonts on plugin startup
  - _Requirements: 1.4, 1.5, 8.2_

- [x] 6.2 Implement HMR support for DSL file changes
  - Watch for changes to `.dsl.ts` files and invalidate the render cache for affected entries
  - Trigger Vite module graph invalidation so DslCanvas components that depend on changed DSL files re-render
  - _Requirements: 8.2_

- [x] 7. Build the DslCanvas React component
- [x] 7.1 Implement the core DslCanvas component with fixed aspect ratio
  - Create a React component that accepts a `dsl` prop (compiled DSL JSON) and renders it as an `<img>` element
  - On mount and when `dsl` or `scale` props change, send a render request to the Vite plugin endpoint
  - Compute aspect ratio from the returned intrinsic dimensions and apply it via CSS `aspect-ratio` on the image
  - When `width` prop is provided, set the image width and let height auto-calculate from the aspect ratio
  - Accept `className`, `style`, and `alt` props for layout integration and accessibility
  - Use CSS Modules for component styling, following the 3-file component pattern
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.8, 8.1, 8.3_

- [x] 7.2 Add loading, error, and fallback states
  - Show the previous image or a placeholder while a new render is in progress to avoid layout shifts
  - Display a fallback placeholder (gray box with "DslCanvas" label) when the dsl prop is invalid or empty
  - Cancel in-flight render requests when the dsl prop changes before the previous render completes (AbortController)
  - Set error state on render failure and display the fallback
  - _Requirements: 1.5, 1.6, 1.7_

- [x] 7.3 Support slot override content in DslCanvas
  - Accept slot override content (compiled node arrays) as an additional prop
  - When slot overrides are provided, merge them into the DSL tree before sending the render request
  - Handle mixed regular and canvas slots — only canvas-typed overrides go through image rendering
  - _Requirements: 6.2, 6.3_

- [x] 8. End-to-end integration and validation
- [x] 8.1 Create an example DSL file using canvas nodes
  - Write a DSL example that defines a component with canvas regions containing text, shapes, and nested layouts
  - Verify the example compiles, renders to PNG via CLI, and exports to Figma JSON without errors
  - Use this example as the integration test fixture
  - _Requirements: 2.1, 2.3, 2.4, 3.1, 4.1_

- [x] 8.2 Verify full pipeline round-trip
  - Compile the example DSL through the full pipeline: canvas() → compile → render → export
  - Confirm canvas PNGs are produced by CLI render with correct filenames
  - Confirm exported Figma JSON contains canvas metadata with slot compatibility
  - Confirm the DslCanvas component displays the rendered image in the preview app with correct aspect ratio
  - _Requirements: 1.1, 1.2, 4.4, 5.1, 7.1_

- [x] 8.3 Run type checks and existing test suite
  - Run TypeScript type checking on all modified packages to ensure no type errors
  - Run the full vitest suite to confirm no regressions in existing slot, compiler, renderer, or exporter functionality
  - _Requirements: 2.5, 3.2, 4.3_

- [x] 9. Implement Figma native slot detection in the plugin
- [x] 9.1 Build the slot detector using componentPropertyDefinitions as primary detection
  - Read the parent component's property definitions and filter for entries with SLOT type
  - Parse the property key format by splitting on the last hash character to extract the layer name, handling layer names that contain hash characters
  - Match extracted names to direct children by their layer name
  - When name matching fails (e.g., layer renamed after slot creation), fall back to positional correlation — match Nth unmatched SLOT-type property to the Nth unmatched child, and log a warning
  - Determine the slot node kind: if the matched child has type SLOT it is a wrapped slot; if it has type FRAME it is a converted slot
  - Use string casting for the SLOT type check since it is not yet in the official plugin typings
  - _Requirements: 9.1, 9.6_
  - _Contracts: SlotDetector_

- [x] 9.2 Add supplementary detection and DslCanvas classification
  - Scan component children for nodes with type SLOT even when componentPropertyDefinitions is absent or empty, to catch edge cases
  - Check each detected node for DslCanvas plugin data — if present, classify as dslCanvas source type; otherwise classify as nativeSlot
  - For nodes with DslCanvas plugin data that were not detected via property definitions or type check, include them as dslCanvas entries
  - Record the detection method used (componentPropertyDefinitions, nodeType, or pluginData) on each result
  - _Requirements: 9.4, 9.5_

- [x] 9.3 Add unit tests for slot detection
  - Test detection via componentPropertyDefinitions with both wrapped and converted slots
  - Test supplementary detection via node type SLOT when no property definitions exist
  - Test DslCanvas classification takes priority over nativeSlot when plugin data is present
  - Test name-match fallback triggers and logs a warning when layer name doesn't match
  - Test that detection works on designer-authored components (not just DSL-created ones)
  - Test key parsing handles layer names containing hash characters
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 10. (P) Implement image capture via exportAsync
- [x] 10.1 Build the image capture service with progress and cancellation
  - For each detected slot, call the Figma export API to produce a PNG at the configured scale factor (default 2x, configurable 1x–4x)
  - Calculate pixel dimensions from the node's width and height multiplied by the scale factor
  - Report progress after each successful capture via the progress callback
  - Check the abort signal before each capture and return partial results if aborted
  - On per-slot capture failure, log the error, omit that slot from results, and continue with remaining slots
  - _Requirements: 10.1, 10.2, 10.5, 10.6, 10.7_
  - _Contracts: ImageCapture_

- [x] 10.2 Add unit tests for image capture
  - Test that exportAsync is called with correct PNG format and scale constraint for each slot
  - Test that progress callback is invoked with correct current/total/slotName values
  - Test that a failed capture for one slot does not prevent remaining captures
  - Test that abort signal causes early return with partial results
  - Test that dimensions are calculated correctly from node size × scale
  - _Requirements: 10.1, 10.2, 10.5, 10.6, 10.7_

- [x] 11. (P) Implement export bundling with base64/ZIP threshold
- [x] 11.1 Build the export bundler with dual format support
  - Calculate total payload size from JSON string length plus all image byte lengths
  - When below the size threshold (default 1 MB), embed each image as a base64 data URI in a slotImages map within the JSON, tagged with source type, scale, and dimensions
  - When above the threshold, package the JSON and PNG files into a ZIP archive using a pure-JS ZIP library, with images stored as separate files
  - Add the ZIP library as a dev dependency in the plugin package (bundled by esbuild into the IIFE)
  - Return a result indicating the chosen format, the bundled data, image count, and total image byte size
  - If ZIP generation fails, fall back to base64-only format even when above threshold, and log a warning
  - _Requirements: 10.3, 10.4_
  - _Contracts: ExportBundler_

- [x] 11.2 Add unit tests for export bundling
  - Test that payloads below threshold produce JSON with embedded base64 data URIs
  - Test that payloads above threshold produce a ZIP archive containing the JSON file and separate PNG files
  - Test that each slotImages entry includes source type, scale, width, and height
  - Test that an empty captured images map produces JSON without a slotImages field
  - Test that ZIP generation failure falls back to base64 mode with a warning
  - Test that mixed dslCanvas and nativeSlot source types are correctly tagged
  - _Requirements: 10.3, 10.4_

- [x] 12. Integrate slot detection, image capture, and bundling into the export flow
- [x] 12.1 Wire the detection-capture-bundle pipeline into existing export actions
  - After the existing changeset or complete export produces JSON, run the slot detector on each exported component
  - For instance nodes, resolve to the main component before detection; skip detection if the main component is null (remote component)
  - Pass detected slots to the image capture service with the user-configured scale factor and an abort controller
  - Pass captured images and export JSON to the bundler, then send the bundled result to the plugin UI
  - _Requirements: 10.1, 10.6, 11.1_

- [x] 12.2 Add export progress feedback and cancellation UI
  - Send progress messages to the plugin UI indicating which slot is being rendered and overall completion status
  - Add a cancel button in the plugin UI that sends a cancellation message to the plugin core, which aborts the image capture via the abort controller
  - _Requirements: 10.6_

- [x] 12.3 Handle both JSON and ZIP download formats in the plugin UI
  - For JSON format exports, use the existing clipboard copy behavior
  - For ZIP format exports, create a downloadable file from the archive bytes and trigger a browser download via a hidden link element
  - Update the WebSocket relay to send the bundled result (including format indicator) to the MCP server
  - _Requirements: 10.3, 10.4_

- [x] 13. Add bundled image support to DslCanvas component
- [x] 13.1 Extend DslCanvas to accept and prefer bundled images
  - Add a bundledImage prop that provides a pre-rendered data URL with dimensions and source type
  - When bundledImage is provided, display it directly without sending a render request to the Vite plugin
  - When bundledImage is not provided, fall back to the existing server-side render path
  - For native slot images (source type nativeSlot), the bundled image is the only rendering path since there is no DSL representation to render
  - _Requirements: 11.4, 11.5_

- [x] 13.2 Verify dual rendering path coexistence
  - Confirm the existing renderCanvasNodes utility and CLI render --no-canvas behavior remain unchanged after adding the bundled image path
  - Confirm that when a DslCanvas node has a scale property in the DSL, the Figma plugin export uses the user-selected scale factor (not the DSL-defined scale)
  - Confirm the Figma plugin's bundled images are produced independently of the renderer-based renderCanvasNodes pipeline
  - _Requirements: 11.1, 11.2, 11.3_

- [x] 14. End-to-end integration and final validation
- [x] 14.1 Integration test: export with slot detection and image bundling
  - Create a test component with both DslCanvas regions and native Figma slots
  - Run the export flow and verify the output JSON contains a slotImages map with entries for both source types
  - Verify each entry has correct data (base64 URI or file path), source type tag, scale, and dimensions
  - Verify that when total payload exceeds 1 MB, the output switches to ZIP format
  - _Requirements: 9.1, 10.1, 10.2, 10.3, 10.4_

- [x] 14.2 Integration test: DslCanvas with bundled images from export
  - Load an export package containing slotImages into the DslCanvas component via the bundledImage prop
  - Verify the component displays the bundled image without triggering a server-side render
  - Verify aspect ratio is maintained from the bundled image dimensions
  - Verify native slot images render correctly despite having no DSL representation
  - _Requirements: 1.1, 1.2, 11.4, 11.5_

- [x] 14.3 Run type checks and full test suite across all modified packages
  - Run TypeScript type checking on the plugin, preview, dsl-core, and CLI packages
  - Run vitest across all packages to confirm no regressions
  - Verify the fflate dependency is correctly bundled by esbuild into the plugin IIFE
  - _Requirements: 9.1, 10.1, 11.1_

- [x] 15. Add user-configurable export scale with validation (gap fix)
- [x] 15.1 Add export scale selector to the plugin UI and wire it through the export flow
  - Add a dropdown control to the export tab with 1x, 2x (default), 3x, and 4x scale options
  - Pass the selected scale value in the export message to the plugin core
  - Read the scale value in the export handler and pass it to the image capture pipeline instead of the hardcoded 2x default
  - _Requirements: 9.3_

- [x] 15.2 Add scale range validation in the image capture service
  - Clamp the scale value to the valid 1–4 range before calling exportAsync, rounding to the nearest integer
  - Ensure that out-of-range or non-numeric scale values cannot produce unexpected export results
  - _Requirements: 9.3_

- [x] 15.3 Add tests for scale configuration and validation
  - Test that the image capture service clamps scale values outside the 1–4 range
  - Test that the export flow passes the user-selected scale from the UI message to the capture pipeline
  - Rebuild the plugin and run the full test suite to confirm no regressions
  - _Requirements: 9.3_
