# Implementation Plan

- [ ] 1. Extend core types and update plugin manifest for codegen support
- [x] 1.1 Add the SourceSnapshots type and extend ComponentIdentity and PluginInput in dsl-core
  - Define the SourceSnapshots interface with optional react, css, dsl string fields and optional paths record
  - Add optional `sources` field to ComponentIdentity (backward-compatible)
  - Add optional `componentSources` field to PluginInput as a plain Record (not Map, for JSON serialization)
  - Export the new type and the `PLUGIN_DATA_SOURCES` constant from the package index
  - Verify existing tests still pass with the extended types (no breaking changes)
  - _Requirements: 2.1, 2.2, 3.1, 4.1_

- [x] 1.2 Update the plugin manifest to declare codegen capabilities, languages, and preferences
  - Add `"dev"` to the editorType array alongside `"figma"`
  - Add `"codegen"` to a new capabilities array
  - Declare codegenLanguages with React, CSS Module, and DSL entries (each with label and value)
  - Define codegenPreferences: a unit preference (rem with scale factor 16, CSS-only) and a select preference for CSS class naming (camelCase/kebab-case)
  - Verify the manifest remains valid JSON and existing network access config is preserved
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.1, 5.2, 5.3_

- [ ] 2. Build the source collection pipeline for export-time source embedding
- [x] 2.1 Create the source collector module in the exporter package
  - Implement a function that given a component name and search directories, locates the 3-file pattern: component TSX, CSS Module, and DSL file
  - Read found files as strings and return a SourceSnapshots object
  - Handle missing files gracefully (not all components have all 3 files)
  - Skip files larger than 50KB with a console warning to prevent plugin data bloat
  - Search component directories first, then examples directory for DSL files
  - _Requirements: 2.1, 2.2_
  - _Contracts: source-collector.ts Service_

- [x] 2.2 Write unit tests for the source collector
  - Test resolution when all 3 files exist in the component directory
  - Test resolution when some files are missing (only TSX, only DSL, etc.)
  - Test that files exceeding 50KB are skipped with appropriate warning
  - Test behavior with non-existent search paths (returns empty snapshots)
  - Test that file paths are correctly recorded in the returned snapshots
  - _Requirements: 2.1, 2.2_

- [ ] 3. Integrate source snapshots into the export pipeline
- [x] 3.1 Extend the exporter to accept and embed source snapshots in PluginInput
  - Modify the export function to accept an optional sources map alongside the compiled output
  - Populate the componentSources field on the generated PluginInput when sources are provided
  - Ensure backward compatibility — existing callers without sources continue to work
  - _Requirements: 2.1, 2.2, 3.1, 4.1_

- [x] 3.2 Extend the plugin to store source snapshots as plugin data during import
  - When receiving PluginInput with componentSources, store the matching SourceSnapshots on each imported component node using the dsl-sources plugin data key
  - Respect the 100KB per-key limit: if serialized sources exceed the limit, store only the DSL source and log a warning
  - Ensure the source storage happens alongside existing dsl-identity and dsl-baseline storage
  - Add tests verifying source snapshot storage and retrieval round-trip
  - _Requirements: 2.1, 2.2, 7.2_

- [ ] 4. Build the codegen dispatcher with two-tier routing
- [x] 4.1 Create the codegen dispatcher module in the plugin package
  - Register a handler for the codegen generate event during plugin initialization
  - Implement source-first path: read dsl-sources plugin data from the selected node, walking up parent chain to find the nearest ancestor with stored sources
  - Implement language-to-source mapping: map the requested language (react/css/dsl) to the corresponding SourceSnapshots field
  - When stored source is found, return it directly as a CodegenResult with appropriate title and language
  - _Requirements: 2.1, 2.2, 2.4, 3.4, 4.4, 7.1_
  - _Contracts: codegen.ts Service_

- [x] 4.2 Implement the fallback path with depth-limited serialization and generator routing
  - When no stored source is found, serialize the selected node using the existing serializer with a depth limit of 50 descendants
  - Build a CodegenContext including the serialized node, identity, baseline, preferences, and truncation flag
  - Read codegen preferences from the Figma API and map them to the internal preferences structure
  - Route to the appropriate structural generator based on the requested language
  - Indicate truncation in the output when the depth limit is exceeded
  - _Requirements: 2.3, 5.4, 7.1, 7.2_

- [x] 4.3 Add error boundary and constraint enforcement to the dispatcher
  - Wrap the entire generate callback in a try/catch that returns an error CodegenResult instead of throwing
  - Ensure figma.showUI() is never called inside the generate callback
  - Verify the callback completes within the 3-second timeout for typical component trees
  - Write unit tests for the dispatcher: source-first routing, fallback routing, error handling, depth limiting, parent-walking
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 5. Build the design token lookup map
- [x] 5.1 (P) Create the token map module with color, spacing, and radius lookups
  - Parse the project's design tokens CSS file to extract color hex values, spacing pixel values, and radius pixel values
  - Build static read-only maps: hex string to CSS custom property name, pixel value to spacing token, pixel value to radius token
  - Expose lookup functions that return the token reference or undefined for unrecognized values
  - Convert Figma float RGB (0–1 range) to lowercase hex for consistent matching
  - Write unit tests verifying lookup of known token values and unknown values returning undefined
  - _Requirements: 3.2_
  - _Contracts: token-map.ts State_

- [ ] 6. Build structural code generators (fallback tier)
- [x] 6.1 (P) Create the structural React TSX generator
  - Map Figma node types to JSX elements: frames to divs, text nodes to spans, rectangles and ellipses to styled divs, components to named components, instances to component references
  - When component identity is present, use the stored component name for the import and JSX tag
  - When no identity exists, derive a PascalCase component name from the node name
  - Generate multi-section output: separate CodegenResult entries for imports, props interface, and component body
  - For component sets with variants, generate a variant props type with union literal values
  - Write unit tests covering nodes with identity, without identity, with variants, and with component properties
  - _Requirements: 2.3, 6.1, 6.2, 6.3_
  - _Contracts: codegen-react.ts Service_

- [x] 6.2 (P) Create the structural CSS Module generator
  - Extract visual properties from the serialized node and map to CSS: fills to background-color, strokes to border, corner radius to border-radius, opacity, dimensions to width/height
  - Map auto-layout properties to flexbox: stack direction to flex-direction, item spacing to gap, padding values, and alignment to justify-content and align-items
  - Map text properties: font size, font family, font weight, and text alignment
  - Apply unit preference: convert pixel values to rem when rem is selected using the configured scale factor
  - Apply naming preference: format CSS class names in camelCase or kebab-case
  - Use the token map to replace exact-matching raw values with CSS custom property references
  - Write unit tests for auto-layout frames, text nodes, fills, token matching, and both preference modes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3_
  - _Contracts: codegen-css.ts Service_

- [x] 6.3 (P) Create the structural DSL definition generator
  - Convert serialized node types to DSL builder function calls: FRAME to frame(), TEXT to text(), RECTANGLE to rectangle(), ELLIPSE to ellipse(), COMPONENT to component(), COMPONENT_SET to componentSet()
  - Format fills as DSL color helpers: solid fills to solid() calls with hex values, gradients to gradient() calls with stop arrays
  - Format auto-layout as layout helpers: horizontal or vertical with spacing, padding, and alignment parameters
  - Generate proper indentation (2-space) for nested children
  - Produce a valid TypeScript import statement listing only the builder functions actually used
  - When baseline data exists in the context, use it as the source instead of the serialized node
  - Write unit tests for frame, text, rectangle nodes; import generation; baseline preference
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - _Contracts: codegen-dsl.ts Service_

- [ ] 7. Wire up the dispatcher to the plugin entry point and run integration tests
- [x] 7.1 Register the codegen handler in the plugin entry point
  - Import the codegen dispatcher module and call the registration function during plugin initialization
  - Ensure the codegen handler coexists with the existing import/sync message handlers without interference
  - Verify the esbuild build script bundles the new codegen modules into the existing IIFE output
  - Run the full plugin build and confirm no bundle errors
  - _Requirements: 1.4, 7.4_

- [x] 7.2 Run integration tests for the complete codegen pipeline
  - Test source-first flow: mock a codegen event on a node with dsl-sources plugin data and verify original source is returned verbatim for each language
  - Test fallback flow: mock a codegen event on a node without stored sources and verify structural generators produce valid output
  - Test export round-trip: verify source-collector → PluginInput → plugin storage → codegen retrieval returns the exact original source code
  - Test preference changes: verify CSS output reflects rem/px and naming preferences in fallback mode
  - Run all existing plugin tests to confirm no regressions from the codegen additions
  - _Requirements: 1.4, 2.1, 2.2, 2.3, 3.1, 4.1, 5.4, 7.1_

- [ ] 8. Add HTML Preview language to manifest and extend the codegen dispatcher for canvas-aware async flow
- [ ] 8.1 Add the HTML Preview language entry to the plugin manifest
  - Add a new entry to the codegenLanguages array with label "HTML Preview" and value "html"
  - Verify the manifest remains valid JSON and all existing languages are preserved
  - _Requirements: 9.1_

- [ ] 8.2 Convert the codegen dispatcher to an async callback with canvas detection
  - Change the generate handler from synchronous to async, returning a Promise of CodegenResult array
  - After the source-first check, call the existing canvas detection function on the selected node to discover DslCanvas regions
  - Build a simplified canvas region info list from the detection results, extracting canvas name, node ID, width, and height (no Figma node references passed to generators)
  - Detect if the directly selected node itself is a DslCanvas region by checking its own plugin data
  - When a DslCanvas node is directly selected, generate canvas-specific output instead of generic structural code
  - When no canvas regions are found, proceed with the existing fallback path unchanged
  - Extend the codegen context to carry the canvas region info list and an optional canvas images map
  - _Requirements: 8.1, 8.2, 8.3_
  - _Contracts: codegen.ts Service_

- [ ] 8.3 Add canvas image capture to the dispatcher for HTML language requests
  - When the requested language is HTML and canvas regions exist, call the existing image capture function with scale factor 1
  - Cap image capture at the first 3 canvas regions to stay within the 3-second timeout budget
  - Store captured images in the codegen context so generators can embed them
  - If any individual capture fails, continue processing remaining regions (graceful degradation)
  - Ensure no UI calls are made during the capture process
  - Add a base64 encoding utility that converts PNG byte arrays to data URI strings, verifying the actual Figma plugin API signature for base64 encoding at build time
  - _Requirements: 9.3, 11.1, 11.2, 11.3, 11.4_

- [ ] 8.4 Write unit tests for the extended dispatcher
  - Test async callback returns a valid Promise that resolves to CodegenResult array
  - Test canvas detection integration: mock a component with DslCanvas children and verify canvas region info is populated in context
  - Test direct DslCanvas node selection produces canvas-specific output
  - Test image capture capping: mock 5 canvas regions and verify only 3 are captured
  - Test graceful degradation when individual captures fail
  - Test that non-HTML languages do not trigger image capture even when canvas regions exist
  - Test that components without canvas regions pass through to the standard fallback path
  - _Requirements: 8.1, 8.2, 8.3, 9.3, 11.1, 11.2, 11.3, 11.4_

- [ ] 9. Build the HTML/CSS preview generator
- [ ] 9.1 (P) Create the HTML generator that produces self-contained HTML with inline CSS
  - Generate a semantic HTML structure with a root container element and child elements reflecting the component's node tree
  - Produce a style block with BEM-style class names mapping auto-layout properties to flexbox CSS (direction, gap, padding, alignment)
  - Map visual properties to CSS: fills to background-color, strokes to border, corner radius to border-radius, opacity, and dimensions
  - Use the token map to replace exact-matching raw values with CSS custom property references in the style block
  - Apply codegen preferences: unit system (rem/px) and naming convention (camelCase/kebab-case) to all generated CSS
  - When the context indicates truncation, append a truncation comment at the end of the HTML output
  - Return a single CodegenResult entry with language "HTML" and a descriptive title
  - _Requirements: 9.2, 9.4, 9.5_
  - _Contracts: codegen-html.ts Service_

- [ ] 9.2 (P) Add canvas image embedding to the HTML generator
  - For each DslCanvas region with a successfully captured image in the context, emit an img tag with the base64 data URI as the src attribute and width/height attributes matching the region dimensions
  - For each DslCanvas region where capture failed or no image exists, emit a placeholder div with a descriptive comment indicating the canvas name
  - When a component has more than 3 canvas regions, append an HTML comment noting that additional regions were omitted
  - Position canvas image elements within the HTML layout according to the component's auto-layout flow
  - _Requirements: 9.2, 9.3, 11.2, 11.3_

- [ ] 9.3 (P) Write unit tests for the HTML generator
  - Test HTML output for a simple auto-layout component without canvas regions (structural preview)
  - Test HTML output for a component with canvas regions and captured images (verify base64 img tags)
  - Test placeholder rendering when canvas image capture fails
  - Test omission comment when more than 3 canvas regions exist
  - Test CSS reflects flexbox layout, fills, borders, and token references
  - Test rem/px preference and naming preference are applied in the CSS output
  - Test truncation comment appears when context indicates truncated node tree
  - _Requirements: 9.2, 9.3, 9.4, 9.5, 11.2, 11.3_

- [ ] 10. Extend the React generator for DslCanvas-aware JSX output
- [ ] 10.1 Add DslCanvas JSX element generation to the React generator
  - When the codegen context contains canvas region info, match child nodes to canvas regions by comparing the child's canvas name from plugin data with the region's canvas name
  - For each matched child, emit a DslCanvas JSX element with a dsl prop placeholder referencing the canvas name, a width prop from the region dimensions, and an alt prop derived from the node name
  - For unmatched children, continue generating standard JSX elements as before
  - When any DslCanvas elements are present, prepend an import statement for the DslCanvas component to the imports section
  - _Requirements: 10.1, 10.2, 10.3, 10.4_
  - _Contracts: codegen-react.ts Service_

- [ ] 10.2 Write unit tests for DslCanvas-aware React generation
  - Test that a component with canvas regions produces DslCanvas JSX elements with correct props
  - Test that the DslCanvas import statement is included when canvas regions are present
  - Test that a component without canvas regions produces unchanged React output (backward compatibility)
  - Test mixed children: some DslCanvas, some regular nodes — verify correct element types for each
  - Test that the dsl prop placeholder, width, and alt values are correctly derived from region metadata
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 11. Integration testing and build verification for canvas-aware codegen
- [ ] 11.1 Run end-to-end integration tests for the canvas-aware codegen pipeline
  - Test HTML language with a component containing DslCanvas regions: verify the output contains base64 img tags embedded in a valid HTML structure with inline CSS
  - Test React language with a component containing DslCanvas regions: verify the output contains DslCanvas JSX elements with correct imports and props
  - Test CSS and DSL languages with a component containing DslCanvas regions: verify canvas regions do not interfere with standard codegen output
  - Test all 4 languages with a component without canvas regions: verify Phase 1 behavior is fully preserved
  - Test the 3-region capture cap: mock a component with 5 DslCanvas regions and verify only the first 3 appear as images in the HTML output with an omission comment
  - Test capture failure resilience: mock a failing exportAsync for one region and verify a placeholder appears while other regions render correctly
  - _Requirements: 8.1, 8.2, 8.3, 9.2, 9.3, 9.5, 10.1, 11.1, 11.2, 11.3, 11.4_

- [ ] 11.2 Verify the plugin build and confirm no regressions
  - Run the full plugin esbuild and confirm the new HTML generator and async dispatcher are bundled without errors
  - Run all existing Phase 1 codegen tests and verify no regressions
  - Run type checking across all changed packages to confirm no type errors
  - _Requirements: 7.1, 7.4_
