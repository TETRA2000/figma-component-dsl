# Implementation Plan

- [x] 1. Define shared changeset types and consolidate PluginNodeDef
- [x] 1.1 (P) Add changeset schema types to the dsl-core package
  - Define `ChangeType`, `PropertyChange`, `ComponentChangeEntry`, `ChangesetSource`, and `ChangesetDocument` types as readonly interfaces
  - Use `unknown` for `oldValue`/`newValue` (never `any`)
  - Export all types from the package's public API
  - Add unit tests verifying type structure and export availability
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 1.2 (P) Move the canonical PluginNodeDef and PluginInput types to a shared location
  - Consolidate the duplicated `PluginNodeDef` and `PluginInput` interfaces currently in both the plugin and exporter packages into a single canonical definition (in dsl-core or exporter)
  - Update the exporter package to import from the canonical location
  - Add `ComponentIdentity` and `EditLogEntry` types for the edit tracker
  - Verify existing exporter tests still pass after the move
  - _Requirements: 7.1_

- [x] 2. Update plugin build configuration for workspace imports
  - Configure the plugin's esbuild build script to resolve `@figma-dsl/core` (and/or exporter) workspace imports at build time
  - Replace the plugin's inline `PluginNodeDef` and `PluginInput` type definitions with imports from the canonical shared package
  - Verify the plugin builds successfully as an IIFE bundle and that all Figma Plugin API typings still resolve
  - Run the existing plugin build to confirm no regressions
  - _Requirements: 7.1_

- [x] 3. Implement edit tracking with baseline snapshots
- [x] 3.1 Implement baseline snapshot storage on import
  - After each top-level component is created during import, serialize the `PluginNodeDef` used to create it and store it as JSON via `setPluginData("dsl-baseline", ...)`
  - Store component identity metadata (component name, DSL source path, import timestamp, original node ID) via `setPluginData("dsl-identity", ...)`
  - Register all imported top-level node IDs in an in-memory set for tracking
  - Handle the 100KB `setPluginData` limit gracefully: warn and truncate if a baseline exceeds it
  - _Requirements: 1.1, 1.6, 6.1, 6.2_

- [x] 3.2 Register the documentchange listener and implement parent-chain attribution
  - After import completes, register a `figma.on("documentchange")` listener
  - For each `PROPERTY_CHANGE`, `CREATE`, or `DELETE` event, walk the changed node's parent chain upward to find the nearest ancestor with `dsl-identity` pluginData
  - If a tracked ancestor is found, create an `EditLogEntry` with the node ID, component name, timestamp, change type, changed properties list, and origin (LOCAL/REMOTE)
  - Append the entry to an in-memory ordered edit log, grouped by component name
  - Discard changes on nodes with no tracked ancestor
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 6.3_

- [x] 4. Implement node serialization and changeset computation
- [x] 4.1 Build the Figma node-to-PluginNodeDef serializer
  - Implement a function that reads a Figma `SceneNode` and produces a `PluginNodeDef` by reading all relevant properties (fills, strokes, text, typography, auto-layout, geometry, visibility, component properties)
  - Handle each node type (FRAME, RECTANGLE, ELLIPSE, TEXT, GROUP, COMPONENT, COMPONENT_SET, INSTANCE) mirroring the structure of the existing `createNode()` import function in reverse
  - Recursively serialize child nodes into the `children` array
  - Only serialize properties defined in the `PluginNodeDef` schema; ignore Figma-specific properties not in scope (effects, constraints, etc.)
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 4.2 Implement snapshot diff and changeset generation
  - Implement a deep-diff function that compares a current `PluginNodeDef` (from serialization) against a baseline `PluginNodeDef` (from `getPluginData("dsl-baseline")`)
  - Generate `PropertyChange` entries with dot-notation property paths, change types (modified, added, removed), old/new values, and human-readable descriptions
  - Handle nested property comparison: fills arrays, stroke arrays, children arrays, auto-layout config
  - Consolidate changes into net diffs (baseline → current), not incremental edits
  - Support structural changes: detect added/removed children nodes with full property snapshots
  - Build a complete `ChangesetDocument` with schema version, timestamp, source metadata, and component change entries
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 7.2, 7.3, 7.4, 7.5_

- [x] 4.3 Implement complete DSL JSON export
  - Build a function that serializes all tracked components (or a selected subset) on the current page into a `PluginInput` document
  - The exported JSON reflects the current edited state of each component, not the original baseline
  - Verify round-trip fidelity: the exported `PluginInput` must be directly importable by the existing plugin import flow
  - Support both individual component export and full-page export
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5. Build the export UI in the plugin
- [x] 5.1 Add tabbed navigation to the plugin UI
  - Extend the existing inline HTML UI with an "Import" tab (existing functionality) and a new "Export" tab
  - Keep the existing import textarea, checkbox, and button on the Import tab unchanged
  - Add the Export tab shell with a toggle for export mode (Changeset vs Complete) and a scope selector (Selected Components vs All on Page)
  - _Requirements: 2.6, 3.4_

- [x] 5.2 Wire the export actions to the serializer
  - When the user clicks "Export Changeset", send a message to the plugin code with the selected scope and export type
  - The plugin code calls `computeChangeset()` or `computeCompleteExport()` based on the export mode
  - For selection-based export, read `figma.currentPage.selection` to get the selected node IDs
  - Display the resulting JSON in a scrollable, read-only textarea with a "Copy to Clipboard" button
  - Show progress feedback during serialization (matching the existing import progress pattern)
  - Handle errors gracefully: display warnings for nodes without baselines
  - _Requirements: 2.5, 2.6, 3.4_

- [x] 6. (P) Create the changeset application AI skill
- [x] 6.1 (P) Write the SKILL.md for the apply-changeset skill
  - Create the skill at `.claude/skills/apply-changeset/SKILL.md` with YAML frontmatter (name, description)
  - Define the skill's input: a changeset JSON file path (and optionally a complete DSL JSON export file path for verification)
  - Document the component-to-file mapping convention: DSL component name → `preview/src/components/{Name}/{Name}.tsx` and `.module.css`
  - Include property mapping rules: fills → CSS background-color/color, typography → CSS font properties, spacing → CSS padding/margin/gap, size → CSS width/height, text content → JSX string literals
  - Specify that structural changes (added/removed nodes) produce a markdown description for manual review rather than automatic code modification
  - Include error handling: skip unresolved components with a warning, produce a summary report of all applied, skipped, and manual-action changes
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 6.4_

- [x] 7. (P) Create the visual verification AI skill
- [x] 7.1 (P) Write the SKILL.md for the verify-changeset skill
  - Create the skill at `.claude/skills/verify-changeset/SKILL.md` with YAML frontmatter (name, description)
  - Define the skill's input: a complete DSL JSON export file path and the React component name (or URL)
  - Document the verification flow: render the complete DSL JSON export to a reference PNG, capture the React component to a PNG, compare using the comparator, iterate if below threshold
  - Specify the configurable threshold (default 95%) and max iteration rounds (default 3)
  - Include instructions for using Claude Desktop's preview feature to display side-by-side reference and React renders with diff highlighting
  - Define the final report format: pass/fail status, final similarity score, iteration count, list of code changes made during iteration
  - Reference the existing CLI commands to use: `figma-dsl render`, `figma-dsl capture`, `figma-dsl compare`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 8. Integration testing and end-to-end validation
- [x] 8.1 Test the plugin round-trip flow
  - Create a test fixture with a known `PluginInput` JSON containing multiple component types (FRAME, TEXT, RECTANGLE, COMPONENT)
  - Verify that importing the fixture, serializing the resulting Figma nodes back to `PluginNodeDef`, and comparing with the original input produces a match (round-trip fidelity)
  - Simulate property modifications and verify that changeset export produces the expected `ChangesetDocument` with correct property paths, values, and descriptions
  - Verify that complete export produces valid `PluginInput` reflecting the edited state
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

- [x] 8.2 Create sample changeset fixtures for skill testing
  - Create a sample changeset JSON file representing typical design changes (color updates, font size changes, spacing adjustments, text content edits)
  - Create a corresponding sample complete DSL JSON export file
  - Document the expected results when the apply-changeset and verify-changeset skills process these fixtures
  - Place fixtures in a discoverable location for skill development and testing
  - _Requirements: 4.1, 5.1, 7.2_

- [x]* 8.3 (P) Add unit tests for the diff algorithm and description generation
  - Test property-level diffing with known baseline and modified PluginNodeDef pairs
  - Verify dot-notation path generation for nested properties (e.g., `fills.0.color.r`, `children.2.characters`)
  - Verify human-readable description generation for common changes (color, font size, spacing, text content)
  - Test edge cases: empty baselines, identical snapshots (no changes), arrays with different lengths, structural additions/removals
  - _Requirements: 2.2, 2.3, 7.4, 7.5_
