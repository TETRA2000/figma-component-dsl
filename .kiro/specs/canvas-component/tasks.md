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
