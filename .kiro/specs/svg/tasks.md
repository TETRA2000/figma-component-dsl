# Implementation Plan

- [x] 1. Rename banner mode to canvas mode across all packages
- [x] 1.1 Update type definitions and internal mode handling
  - Change `CompilerMode` from `'standard' | 'banner'` to `'standard' | 'canvas'` in the compiler types
  - Update `PluginInput.mode` in dsl-core plugin-types to accept `'canvas'` instead of `'banner'`
  - Update `ValidationPreset` to use `'canvas'` instead of `'banner'` in the validator types and presets
  - Replace all internal `'banner'` string comparisons with `'canvas'` in the compiler, layout resolver, exporter, and renderer
  - Update all test assertions referencing `'banner'` to `'canvas'`
  - _Requirements: 6.3_

- [x] 1.2 Add backward-compatible banner alias with deprecation warning in CLI
  - Accept both `'canvas'` and `'banner'` as valid mode exports in DSL module loading
  - When `'banner'` is detected, normalize to `'canvas'` internally and emit a deprecation warning recommending migration
  - Update all user-facing CLI log messages, help text, and pipeline stage output to use "canvas mode" terminology
  - Verify existing `.dsl.ts` files with `export const mode = 'banner'` still work correctly with a deprecation warning
  - _Requirements: 6.1, 6.2, 6.4_

- [x] 1.3 Update DSL reference documentation
  - Rename the "Banner Mode" section heading to "Canvas Mode" throughout `docs/dsl-reference.md`
  - Update all code examples to use `export const mode = 'canvas'`
  - Add a note about the deprecated `'banner'` alias at the top of the Canvas Mode section
  - Update the Known Pipeline Limitations table to reference "Canvas Mode" instead of "Banner Mode"
  - _Requirements: 6.5_

- [x] 2. Define SVG node type in dsl-core
- [x] 2.1 Add SVG type definitions
  - Add `'SVG'` to the `NodeType` union type
  - Define `SvgProps` interface with `svgContent`, `src`, `size`, `fit` (defaulting to `'FIT'`), `cornerRadius`, `clipContent`, `opacity`, `visible`, `x`, `y`, `rotation`, `effects`, `blendMode`, and layout sizing modes
  - Add `svgContent`, `svgSrc`, and `svgScaleMode` fields to the `DslNode` interface
  - Add `svgContent` and `svgScaleMode` fields to the `PluginNodeDef` interface
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.7_

- [x] 2.2 Implement the svg() factory function and tests
  - Create the `svg(name, props)` factory function following the `image()` pattern
  - Validate that `name` is non-empty, and at least one of `svgContent` or `src` is provided — throw an error if neither is present
  - Map `props.src` to `svgSrc`, `props.svgContent` to `svgContent`, and `props.fit` to `svgScaleMode` (default `'FIT'`) on the returned DslNode
  - Export `svg` and `SvgProps` from the package index
  - Write unit tests: valid construction with svgContent only, src only, both provided, missing both throws, default property values, all visual properties pass through
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 3. Add SVG compilation and layout resolution
- [x] 3.1 (P) Extend the compiler to handle SVG nodes
  - Add SVG fields (`svgContent`, `svgSrc`, `svgScaleMode`) to the compiler's intermediate node type
  - Add `'SVG'` as a direct pass-through case in the node type mapping function
  - Add SVG data passthrough in the node compilation function — preserve `svgContent`, `svgSrc`, and `svgScaleMode` on the compiled output
  - Emit a compile error if an SVG node has neither `svgContent` nor `svgSrc`
  - When both `svgContent` and `svgSrc` are present, emit a warning that `src` is ignored and use `svgContent`
  - SVG nodes are leaf nodes — no children to compile
  - _Requirements: 3.1, 1.4_

- [x] 3.2 (P) Handle SVG nodes in the layout resolver
  - Treat SVG as a leaf node in measurement — use explicit `size` dimensions only, like IMAGE
  - In canvas mode, position SVG nodes using absolute `x`/`y` coordinates
  - In standard mode, SVG nodes participate in auto-layout containers according to standard layout rules
  - Write unit tests: SVG compilation preserves data, layout in both modes, compile error on missing content, warning on dual source
  - _Requirements: 3.2, 3.3_

- [x] 4. Implement SVG rendering with resvg-js
- [x] 4.1 (P) Add @resvg/resvg-js dependency and SVG preloading
  - Install `@resvg/resvg-js` as a production dependency in the renderer package
  - Create an SVG preloading function that collects SVG sources from the compiled node tree, reads file content for `svgSrc` references, rasterizes each SVG string to a PNG buffer via resvg-js, and loads the buffer as a canvas Image
  - Rasterize at the SVG's intrinsic aspect ratio scaled to the larger bounding box dimension for pixel accuracy
  - Cache rasterized images keyed by `svgSrc` (file-based) or content hash (inline)
  - Handle file read errors and resvg-js parse failures gracefully — log a warning and skip the entry so the renderer draws a placeholder
  - _Requirements: 2.1, 2.2_

- [x] 4.2 (P) Add SVG case to the render dispatch
  - Add `'SVG'` case in the renderer's node type switch — clip to bounding box with optional corner radius, draw the cached rasterized image using the node's scale mode (default `'FIT'`) via the existing draw instruction computation
  - On cache miss (SVG failed to preload), draw a placeholder rectangle with a crosshatch pattern and log a diagnostic message, matching the IMAGE placeholder behavior
  - Effects (DROP_SHADOW, LAYER_BLUR), blend modes, and rotation are applied by the existing generic infrastructure — no SVG-specific handling needed
  - Write integration test: compile and render a DSL file containing an SVG node with inline content, verify PNG output is non-empty and contains expected pixel data
  - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6_

- [x] 5. Add SVG export and Figma plugin creation
- [x] 5.1 Export SVG nodes to Figma plugin JSON
  - Add SVG case in the exporter's node conversion function — include `svgContent` on the output node
  - For nodes with `svgSrc` instead of inline content, read the SVG file and embed the content as the `svgContent` string
  - Include `svgScaleMode` on the exported node
  - Visual properties (effects, blend mode, rotation, opacity) are already handled generically by the exporter
  - Write unit test: SVG node exports with correct type, svgContent preserved, scale mode included
  - _Requirements: 4.1, 4.2_

- [x] 5.2 Create SVG nodes in the Figma plugin
  - Add `'SVG'` case in the plugin's node creation switch — call `createNodeFromSvg()` with the SVG content string to produce a FrameNode containing native vector nodes
  - Resize the resulting frame to match the declared node size
  - Apply visual properties: opacity, visible, cornerRadius
  - The FrameNode returned by `createNodeFromSvg()` naturally maintains multiple sub-paths as a single grouped node
  - _Requirements: 4.3, 4.4_

- [x] 6. Implement SVG identity tracking and bidirectional sync
- [x] 6.1 Tag SVG nodes with identity metadata in the plugin
  - After creating an SVG node via `createNodeFromSvg()`, compute a SHA-256 hash of the original SVG content string and store it as `dsl-svg-hash` via plugin data
  - Export the created node back to SVG via `exportAsync({ format: 'SVG_STRING' })`, hash the Figma-normalized result, and store as `dsl-svg-baseline-hash` via plugin data (hash only, not full SVG, to respect the 100KB plugin data size limit)
  - Apply standard `dsl-identity` tracking for sync workflow
  - _Requirements: 5.1_

- [x] 6.2 Detect and export SVG changes in changesets
  - During changeset export, identify SVG-tagged nodes by checking for `dsl-svg-hash` in plugin data
  - For each SVG node, export the current state via `exportAsync({ format: 'SVG_STRING' })` and hash it
  - Compare the hash against the stored `dsl-svg-baseline-hash` — if different, emit a PropertyChange entry with `propertyPath: 'svgContent'`, `changeType: 'modified'`, and `newValue` containing the full current SVG string
  - SVG changes use the existing PropertyChange schema — no new changeset types needed
  - The MCP server relays changeset data transparently without SVG-specific logic
  - _Requirements: 5.2, 5.3, 5.5_

- [x] 6.3 Support applying SVG changesets back to source
  - When the apply-changeset pipeline encounters a PropertyChange with `propertyPath: 'svgContent'`, update the corresponding `svgContent` in the DSL source file or write the new SVG data to the `src` file
  - If the original node used `src` (file reference), overwrite the referenced SVG file with the new content
  - If the original node used inline `svgContent`, update the string in the DSL source
  - _Requirements: 5.4_

- [x] 7. Add SVG validator rules
- [x] 7.1 (P) Create the svg-content validation rule
  - Create a new validator rule that checks SVG nodes for content presence — report an error if neither `svgContent` nor `src` is defined
  - Check file existence for `src` references — report a warning if the referenced file does not exist
  - In standard mode, report a warning if an SVG node uses effects, blend mode, or rotation (consistent with existing canvas-only property warnings)
  - In canvas mode, permit all SVG visual properties without warnings
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 7.2 (P) Register the rule in validator presets
  - Add `'svg-content'` to all validation presets: `'canvas'` preset sets it to `'off'`, other presets set it to `'error'` or `'warning'` as appropriate
  - Write unit tests: error on missing content, warning on missing file, mode-aware behavior for canvas-only properties
  - _Requirements: 7.3, 7.4_
