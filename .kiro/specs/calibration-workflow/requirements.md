# Requirements Document

## Introduction

A calibration workflow that enables bulk creation of test components, batch export to Figma, and structured feedback of Figma-rendered results back into the DSL pipeline. The goal is to efficiently identify and fix rendering discrepancies between the DSL renderer and Figma — like the corner radius clamping issue — by testing many components at once and systematically comparing outputs. This workflow is designed to be driven from Claude Code during calibration sessions.

## Requirements

### Requirement 1: Bulk Test Component Generation

**Objective:** As a developer, I want to generate a suite of test components that exercise specific rendering properties (corner radius, gradients, auto-layout, typography, strokes, etc.) in isolation and combination, so that I can systematically detect rendering differences between the DSL renderer and Figma.

#### Acceptance Criteria

1. The CLI shall provide a `generate-test-suite` command that produces a set of DSL test component definitions covering core rendering properties.
2. When `generate-test-suite` is invoked, the CLI shall create test components for each of these property categories: corner radius, fills (solid and gradient), strokes, auto-layout (horizontal, vertical, nested), typography (font size, weight, alignment, line height, letter spacing), opacity, and clip content.
3. When `generate-test-suite` is invoked with a `--property` filter, the CLI shall generate test components for only the specified property category.
4. The CLI shall generate parameterized edge-case variants for numeric properties (e.g., cornerRadius values of 0, 1, half-height, larger-than-dimension, and 9999).
5. Each generated test component shall be a valid `.dsl.ts` file that can be independently compiled, rendered, and exported by the existing CLI commands.

### Requirement 2: Batch Export Pipeline

**Objective:** As a developer, I want to compile, render, and export an entire directory of DSL components in a single command, so that I can process many test components efficiently without running individual commands.

#### Acceptance Criteria

1. The CLI shall provide a `batch` command that accepts a glob pattern or directory path of `.dsl.ts` files.
2. When `batch` is invoked, the CLI shall compile, render to PNG, and export to Figma plugin JSON for every matched DSL file.
3. The CLI shall produce a single merged plugin-input JSON file containing all components, suitable for one-shot import into Figma via the plugin.
4. While batch processing, the CLI shall log progress for each component (name, status, errors).
5. If a single component fails compilation or rendering, the CLI shall log the error and continue processing remaining components.
6. The CLI shall generate a batch manifest JSON file listing all processed components with their output paths (PNG, plugin JSON) and any errors.

### Requirement 3: Figma Plugin Batch Import

**Objective:** As a developer, I want the Figma plugin to import a merged plugin-input JSON containing multiple components in one operation, so that I don't have to import components one at a time.

#### Acceptance Criteria

1. When the plugin receives a plugin-input JSON with multiple entries in the `components` array, the plugin shall create all components on the target Figma page.
2. The plugin shall arrange imported components in a grid layout on the Figma canvas with consistent spacing, so they don't overlap.
3. While importing multiple components, the plugin shall report progress (component count, current component name) via the plugin UI.
4. If a single component fails during import, the plugin shall log the error and continue importing remaining components.

### Requirement 4: Figma Screenshot Capture for Comparison

**Objective:** As a developer, I want to capture screenshots of the Figma-rendered components so I can compare them against the DSL renderer output to detect visual differences.

#### Acceptance Criteria

1. The CLI shall provide a `capture-figma` command (or equivalent integration) that captures screenshots of components from a Figma file or the plugin's rendered output.
2. Where the Figma REST API is available, the CLI shall use the Figma Image Export API to retrieve PNG renders of specific node IDs.
3. Where the Figma REST API is not available, the CLI shall accept manually exported PNGs from Figma and match them to DSL components by name.
4. When capturing from Figma, the CLI shall save images with filenames matching the corresponding DSL component names for automated pairing.

### Requirement 5: Batch Comparison and Report Generation

**Objective:** As a developer, I want to automatically compare DSL-rendered PNGs against Figma-rendered PNGs in bulk and get a structured report, so that I can quickly identify which components have rendering discrepancies and what properties are affected.

#### Acceptance Criteria

1. The CLI shall provide a `batch-compare` command that takes a directory of DSL-rendered PNGs and a directory of Figma-rendered PNGs.
2. When `batch-compare` is invoked, the CLI shall pair images by component name and run pixel-level comparison on each pair.
3. The CLI shall generate a JSON report listing each component with: similarity score, pass/fail status, dimension match, and diff image path.
4. The CLI shall generate a human-readable summary (Markdown or terminal output) grouping failing components by the property category they test.
5. If a DSL-rendered PNG has no corresponding Figma PNG (or vice versa), the CLI shall report it as "unpaired" rather than failing silently.
6. When `batch-compare` completes, the CLI shall output an overall pass rate and list the top discrepancies sorted by severity (lowest similarity first).

### Requirement 6: Calibration Feedback Loop

**Objective:** As a developer using Claude Code, I want the comparison report to be structured in a way that Claude Code can parse and act on, so that rendering fixes can be identified and applied iteratively during a calibration session.

#### Acceptance Criteria

1. The JSON comparison report shall include, for each failing component: the component name, the property category being tested, the similarity score, the DSL source file path, and the diff image path.
2. The CLI shall provide a `calibrate` command that runs the full loop: batch render → batch export → (manual Figma import + screenshot) → batch compare → output report.
3. When the `calibrate` command completes, the CLI shall print a structured summary to stdout that can be read and acted upon by Claude Code.
4. The comparison report shall include the rendered dimensions from both DSL and Figma sides to help diagnose size-related discrepancies.
5. While a calibration session is in progress, the CLI shall preserve previous run results in timestamped directories so that improvements can be tracked across iterations.

### Requirement 7: Test Suite Extensibility

**Objective:** As a developer, I want to easily add custom test components alongside the generated ones, so that I can test specific real-world components from my design system during calibration.

#### Acceptance Criteria

1. The `batch` command shall accept both generated test suite files and user-authored `.dsl.ts` files in the same run.
2. When a custom DSL file is placed in the test suite directory, the CLI shall include it in batch processing without requiring registration or configuration.
3. The CLI shall support a `--include` flag to add additional directories or files to the batch beyond the default test suite path.
