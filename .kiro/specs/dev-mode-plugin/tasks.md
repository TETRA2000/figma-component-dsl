# Implementation Plan

- [ ] 1. Extend core types and update plugin manifest for codegen support
- [ ] 1.1 Add the SourceSnapshots type and extend ComponentIdentity and PluginInput in dsl-core
  - Define the SourceSnapshots interface with optional react, css, dsl string fields and optional paths record
  - Add optional `sources` field to ComponentIdentity (backward-compatible)
  - Add optional `componentSources` field to PluginInput as a plain Record (not Map, for JSON serialization)
  - Export the new type and the `PLUGIN_DATA_SOURCES` constant from the package index
  - Verify existing tests still pass with the extended types (no breaking changes)
  - _Requirements: 2.1, 2.2, 3.1, 4.1_

- [ ] 1.2 Update the plugin manifest to declare codegen capabilities, languages, and preferences
  - Add `"dev"` to the editorType array alongside `"figma"`
  - Add `"codegen"` to a new capabilities array
  - Declare codegenLanguages with React, CSS Module, and DSL entries (each with label and value)
  - Define codegenPreferences: a unit preference (rem with scale factor 16, CSS-only) and a select preference for CSS class naming (camelCase/kebab-case)
  - Verify the manifest remains valid JSON and existing network access config is preserved
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.1, 5.2, 5.3_

- [ ] 2. Build the source collection pipeline for export-time source embedding
- [ ] 2.1 Create the source collector module in the exporter package
  - Implement a function that given a component name and search directories, locates the 3-file pattern: component TSX, CSS Module, and DSL file
  - Read found files as strings and return a SourceSnapshots object
  - Handle missing files gracefully (not all components have all 3 files)
  - Skip files larger than 50KB with a console warning to prevent plugin data bloat
  - Search component directories first, then examples directory for DSL files
  - _Requirements: 2.1, 2.2_
  - _Contracts: source-collector.ts Service_

- [ ] 2.2 Write unit tests for the source collector
  - Test resolution when all 3 files exist in the component directory
  - Test resolution when some files are missing (only TSX, only DSL, etc.)
  - Test that files exceeding 50KB are skipped with appropriate warning
  - Test behavior with non-existent search paths (returns empty snapshots)
  - Test that file paths are correctly recorded in the returned snapshots
  - _Requirements: 2.1, 2.2_

- [ ] 3. Integrate source snapshots into the export pipeline
- [ ] 3.1 Extend the exporter to accept and embed source snapshots in PluginInput
  - Modify the export function to accept an optional sources map alongside the compiled output
  - Populate the componentSources field on the generated PluginInput when sources are provided
  - Ensure backward compatibility — existing callers without sources continue to work
  - _Requirements: 2.1, 2.2, 3.1, 4.1_

- [ ] 3.2 Extend the plugin to store source snapshots as plugin data during import
  - When receiving PluginInput with componentSources, store the matching SourceSnapshots on each imported component node using the dsl-sources plugin data key
  - Respect the 100KB per-key limit: if serialized sources exceed the limit, store only the DSL source and log a warning
  - Ensure the source storage happens alongside existing dsl-identity and dsl-baseline storage
  - Add tests verifying source snapshot storage and retrieval round-trip
  - _Requirements: 2.1, 2.2, 7.2_

- [ ] 4. Build the codegen dispatcher with two-tier routing
- [ ] 4.1 Create the codegen dispatcher module in the plugin package
  - Register a handler for the codegen generate event during plugin initialization
  - Implement source-first path: read dsl-sources plugin data from the selected node, walking up parent chain to find the nearest ancestor with stored sources
  - Implement language-to-source mapping: map the requested language (react/css/dsl) to the corresponding SourceSnapshots field
  - When stored source is found, return it directly as a CodegenResult with appropriate title and language
  - _Requirements: 2.1, 2.2, 2.4, 3.4, 4.4, 7.1_
  - _Contracts: codegen.ts Service_

- [ ] 4.2 Implement the fallback path with depth-limited serialization and generator routing
  - When no stored source is found, serialize the selected node using the existing serializer with a depth limit of 50 descendants
  - Build a CodegenContext including the serialized node, identity, baseline, preferences, and truncation flag
  - Read codegen preferences from the Figma API and map them to the internal preferences structure
  - Route to the appropriate structural generator based on the requested language
  - Indicate truncation in the output when the depth limit is exceeded
  - _Requirements: 2.3, 5.4, 7.1, 7.2_

- [ ] 4.3 Add error boundary and constraint enforcement to the dispatcher
  - Wrap the entire generate callback in a try/catch that returns an error CodegenResult instead of throwing
  - Ensure figma.showUI() is never called inside the generate callback
  - Verify the callback completes within the 3-second timeout for typical component trees
  - Write unit tests for the dispatcher: source-first routing, fallback routing, error handling, depth limiting, parent-walking
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 5. Build the design token lookup map
- [ ] 5.1 (P) Create the token map module with color, spacing, and radius lookups
  - Parse the project's design tokens CSS file to extract color hex values, spacing pixel values, and radius pixel values
  - Build static read-only maps: hex string to CSS custom property name, pixel value to spacing token, pixel value to radius token
  - Expose lookup functions that return the token reference or undefined for unrecognized values
  - Convert Figma float RGB (0–1 range) to lowercase hex for consistent matching
  - Write unit tests verifying lookup of known token values and unknown values returning undefined
  - _Requirements: 3.2_
  - _Contracts: token-map.ts State_

- [ ] 6. Build structural code generators (fallback tier)
- [ ] 6.1 (P) Create the structural React TSX generator
  - Map Figma node types to JSX elements: frames to divs, text nodes to spans, rectangles and ellipses to styled divs, components to named components, instances to component references
  - When component identity is present, use the stored component name for the import and JSX tag
  - When no identity exists, derive a PascalCase component name from the node name
  - Generate multi-section output: separate CodegenResult entries for imports, props interface, and component body
  - For component sets with variants, generate a variant props type with union literal values
  - Write unit tests covering nodes with identity, without identity, with variants, and with component properties
  - _Requirements: 2.3, 6.1, 6.2, 6.3_
  - _Contracts: codegen-react.ts Service_

- [ ] 6.2 (P) Create the structural CSS Module generator
  - Extract visual properties from the serialized node and map to CSS: fills to background-color, strokes to border, corner radius to border-radius, opacity, dimensions to width/height
  - Map auto-layout properties to flexbox: stack direction to flex-direction, item spacing to gap, padding values, and alignment to justify-content and align-items
  - Map text properties: font size, font family, font weight, and text alignment
  - Apply unit preference: convert pixel values to rem when rem is selected using the configured scale factor
  - Apply naming preference: format CSS class names in camelCase or kebab-case
  - Use the token map to replace exact-matching raw values with CSS custom property references
  - Write unit tests for auto-layout frames, text nodes, fills, token matching, and both preference modes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3_
  - _Contracts: codegen-css.ts Service_

- [ ] 6.3 (P) Create the structural DSL definition generator
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
- [ ] 7.1 Register the codegen handler in the plugin entry point
  - Import the codegen dispatcher module and call the registration function during plugin initialization
  - Ensure the codegen handler coexists with the existing import/sync message handlers without interference
  - Verify the esbuild build script bundles the new codegen modules into the existing IIFE output
  - Run the full plugin build and confirm no bundle errors
  - _Requirements: 1.4, 7.4_

- [ ] 7.2 Run integration tests for the complete codegen pipeline
  - Test source-first flow: mock a codegen event on a node with dsl-sources plugin data and verify original source is returned verbatim for each language
  - Test fallback flow: mock a codegen event on a node without stored sources and verify structural generators produce valid output
  - Test export round-trip: verify source-collector → PluginInput → plugin storage → codegen retrieval returns the exact original source code
  - Test preference changes: verify CSS output reflects rem/px and naming preferences in fallback mode
  - Run all existing plugin tests to confirm no regressions from the codegen additions
  - _Requirements: 1.4, 2.1, 2.2, 2.3, 3.1, 4.1, 5.4, 7.1_
