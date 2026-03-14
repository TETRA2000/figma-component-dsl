# Implementation Plan

- [x] 1. Test suite generator
- [x] 1.1 (P) Implement property category test component generation
  - Build a generator that produces valid `.dsl.ts` files for each property category: corner-radius, fills-solid, fills-gradient, strokes, auto-layout-horizontal, auto-layout-vertical, auto-layout-nested, typography, opacity, clip-content, and combined
  - Each generated file must export a single `DslNode` using DSL factory functions (`component()`, `frame()`, `rectangle()`, `text()`)
  - Organize output files into property-category subdirectories
  - File names follow the `{category}-{variant}.dsl.ts` convention
  - _Requirements: 1.1, 1.2, 1.5_
  - _Contracts: TestSuiteGenerator Service_

- [x] 1.2 (P) Add parameterized edge-case variants and property filtering
  - Generate edge-case variants for numeric properties (e.g., cornerRadius values of 0, 1, half-height, larger-than-dimension, 9999)
  - Generate gradient variants: 0°, 45°, 90° angles, with and without alpha stops
  - Generate typography variants: sizes (12, 16, 24, 48), weights (400, 600, 700), alignments (LEFT, CENTER, RIGHT)
  - Support a `--property` filter to generate only specific categories
  - _Requirements: 1.3, 1.4_

- [x] 2. Batch processor
- [x] 2.1 Implement multi-file batch compile, render, and export pipeline
  - Discover `.dsl.ts` files via glob pattern or directory traversal
  - For each file: load the DSL module, compile with layout, render to PNG, and generate plugin input
  - Merge all plugin node definitions into a single plugin-input JSON file suitable for one-shot Figma import
  - Log progress for each component: name, status, and any errors
  - Continue processing when individual components fail — log the error and skip the failed component in merged output
  - Generate a batch manifest JSON summarizing all processed components, output paths, and error details
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - _Contracts: BatchProcessor Service, Batch Manifest_

- [x] 2.2 Support custom test files and additional include paths
  - Accept user-authored `.dsl.ts` files alongside generated test suite files in the same batch run
  - Support an `--include` flag for specifying additional directories or glob patterns beyond the default input path
  - Merge all matched files into the same processing pipeline without requiring registration or configuration
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 3. Figma plugin enhancements
- [x] 3.1 (P) Replace horizontal layout with grid layout and add progress reporting
  - Arrange imported components in a grid with a configurable number of columns (default 5) instead of the current horizontal-only layout
  - Row height is determined by the tallest component in the row plus consistent spacing
  - Report import progress to the plugin UI via `postMessage` with current count, total count, and component name
  - Wrap individual `createNode` calls in try/catch — log errors and continue importing remaining components
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3.2 (P) Add automatic PNG export after import
  - After all components are created on the canvas, iterate over created nodes and call `exportAsync` on each to capture Figma-rendered PNGs
  - Collect exported images as name/data pairs along with a node ID map (`componentName → figmaNodeId`)
  - Send results to the plugin UI via `postMessage`; the UI bundles them for download as a ZIP containing `figma/{componentName}.png` files and a `node-id-map.json`
  - Report export progress (separate from import progress) to the UI
  - Handle individual export failures gracefully — log and skip, continue with remaining components
  - _Requirements: 4.1_

- [x] 4. Figma REST API capturer
- [x] 4.1 (P) Implement REST API-based Figma screenshot capture
  - Read a node ID map (from plugin-exported `node-id-map.json` or CLI flag) to determine which Figma nodes to capture
  - Use the Figma REST API `GET /v1/images/:file_key` endpoint with batched node IDs to retrieve PNG render URLs
  - Download and save each image as `{componentName}.png` in the output directory
  - Handle rate limiting (429) with exponential backoff and 3 retries; abort on auth errors (403) with a clear message
  - Report any components that could not be captured as missing
  - _Requirements: 4.2, 4.3, 4.4_
  - _Contracts: FigmaCapturer Service_

- [x] 5. Calibration reporter
- [x] 5.1 (P) Implement batch image comparison and JSON report generation
  - Pair images by component name across a DSL-rendered directory and a Figma-rendered directory
  - Run pixel-level comparison on each pair using the existing comparator
  - Generate a JSON report with per-component results: similarity score, pass/fail status, dimension match, diff image path, and both DSL and Figma dimensions
  - Report unpaired images (DSL-only and Figma-only) instead of failing silently
  - Include an overall summary: total count, passed, failed, pass rate, and top 5 worst discrepancies sorted by lowest similarity
  - Group results by property category (extracted from filename convention) with per-category statistics
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  - _Contracts: CalibrationReporter Service_

- [x] 5.2 (P) Generate Markdown summary from comparison report
  - Produce a human-readable Markdown summary grouping failing components by property category
  - Include per-category pass rates and average similarity scores
  - List DSL source file paths and diff image paths for each failing component so Claude Code can locate and fix issues
  - _Requirements: 6.1, 6.4_

- [x] 6. Calibrate orchestrator and CLI wiring
- [x] 6.1 Wire all new commands into the CLI dispatcher
  - Add `calibrate`, `batch`, `batch-compare`, and `capture-figma` commands to the CLI switch dispatcher
  - Parse command-line arguments for each command using `parseArgs` following the existing pattern
  - Each command initializes services via `initServices()` and delegates to the corresponding service function
  - Print structured summaries to stdout suitable for Claude Code consumption
  - _Requirements: 6.3_

- [x] 6.2 Implement the calibrate orchestrator for the full pipeline
  - Create timestamped run directories under the output base directory
  - Orchestrate: generate test suite → batch compile/render/export → (optionally compare when Figma PNGs are available)
  - Support `--capture-mode api` with `--file-key`, `--token`, and `--node-id-map` flags for fully automated REST API capture and comparison
  - Support `--skip-generate` to skip test suite generation and use existing DSL files
  - Support `--property` filter to limit test generation to specific categories
  - Preserve all run artifacts in timestamped directories for cross-iteration improvement tracking
  - _Requirements: 6.2, 6.3, 6.5_
  - _Contracts: CalibrateOrchestrator Service_

- [x] 7. Integration testing
- [x] 7.1 End-to-end batch pipeline test
  - Verify the full generate → batch → PNG + merged JSON flow produces valid outputs
  - Verify error continuation: a deliberately malformed DSL file does not halt processing of valid files
  - Verify CLI command parsing: all new commands accept documented flags and produce correct exit codes
  - _Requirements: 1.5, 2.4, 2.5, 2.6_

- [x] 7.2 Batch comparison and report accuracy test
  - Use known-good and known-bad image pair fixtures to verify report accuracy
  - Verify category grouping, unpaired detection, and severity sorting in the JSON report
  - Verify the Markdown summary correctly groups failures by property category
  - _Requirements: 5.3, 5.5, 5.6, 6.1_

- [ ]*7.3 (P) Unit tests for generated test components
  - Verify each generated `.dsl.ts` file compiles without errors through the existing pipeline
  - Verify file naming conventions and directory organization match the property category convention
  - _Requirements: 1.2, 1.5_
