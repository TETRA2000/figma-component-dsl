# Requirements Document

## Introduction

This specification defines the **bidirectional sync** feature for the Figma Component DSL pipeline. The feature enables a round-trip workflow where React components are imported into Figma via DSL JSON, designers edit them in Figma, and those edits are captured as structured changesets that developers can apply back to React source code. An AI-assisted verification loop (via Claude Desktop) compares rendered outputs to ensure fidelity across the code-design boundary.

The workflow proceeds in five stages:
1. **Import** — React components are compiled to DSL JSON and imported into Figma via the plugin
2. **Edit** — Designers modify imported components directly in Figma
3. **Capture** — The plugin tracks all edits and exports them as changesets or complete DSL JSON snapshots
4. **Apply** — Developers apply changesets to React component source code
5. **Verify** — Claude AI compares DSL-rendered and React-rendered images, iterating until they match

## Requirements

### Requirement 1: Edit Tracking in Figma Plugin

**Objective:** As a designer, I want the Figma plugin to automatically track all my edits to imported components, so that my design changes are captured without manual effort.

#### Acceptance Criteria

1. When a component is imported via the plugin, the Plugin shall record a baseline snapshot of the component's full property tree (fills, strokes, text content, layout, size, typography, corner radius, opacity, visibility).
2. When the designer modifies any tracked property of an imported component, the Plugin shall detect and record the change with the property path, old value, and new value.
3. The Plugin shall track edits to the following property categories: fills (color, gradient), strokes (color, weight), text content (characters), typography (font family, font size, font weight, font style, line height, letter spacing, text alignment), layout (auto-layout direction, spacing, padding, alignment, sizing mode), geometry (size, corner radius), and visibility (opacity, visible).
4. While the plugin is active, the Plugin shall maintain an ordered log of all tracked edits per component, preserving the sequence in which changes were made.
5. When the designer adds or removes child nodes within an imported component, the Plugin shall track the structural change including the node type, name, position in the child list, and full property snapshot of any added node.
6. The Plugin shall associate each tracked edit with a component identifier that maps back to the original DSL import source.

### Requirement 2: Changeset Export

**Objective:** As a designer, I want to export my tracked edits as a structured changeset, so that developers can see exactly what I changed and apply those changes to code.

#### Acceptance Criteria

1. When the designer requests a changeset export, the Plugin shall generate a JSON document containing only the properties that differ from the baseline snapshot.
2. The Plugin shall structure each change entry with: component name, property path (dot-notation), old value, new value, and change type (modified, added, removed).
3. When multiple edits affect the same property, the Plugin shall consolidate them into a single change entry reflecting the net difference from baseline to current state.
4. The Plugin shall include a schema version identifier in the exported changeset JSON to support future format evolution.
5. When the designer selects specific components, the Plugin shall export changesets for only the selected components rather than all tracked components.
6. The Plugin shall provide the exported changeset as copyable JSON text within the plugin UI.

### Requirement 3: Complete DSL JSON Export

**Objective:** As a designer, I want to export the complete current state of components as DSL JSON, so that the full component state can be re-imported or used as a new baseline.

#### Acceptance Criteria

1. When the designer requests a complete export, the Plugin shall generate a full DSL-compatible JSON representation of the current component state (matching the existing `PluginInput` schema).
2. The exported JSON shall be directly importable by the existing plugin import functionality, enabling round-trip fidelity.
3. When the designer has made edits to imported components, the complete export shall reflect the current (edited) state, not the original baseline.
4. The Plugin shall support exporting both individual components and all components on the current page.

### Requirement 4: Changeset Application to React Components

**Objective:** As a developer, I want to apply Figma changesets to my React component source code, so that design changes are reflected in code without manual translation.

#### Acceptance Criteria

1. When a developer provides a changeset JSON file, the Changeset Applicator shall parse the changeset and identify the target React component files based on component name mapping.
2. The Changeset Applicator shall map DSL property changes to corresponding React/CSS modifications: fill color changes to CSS color properties, typography changes to CSS font properties, spacing changes to CSS margin/padding properties, and size changes to CSS width/height properties.
3. When a changeset contains text content changes (characters), the Changeset Applicator shall update the corresponding JSX text content in the React component.
4. If a changeset references a component that cannot be found in the project, the Changeset Applicator shall report the unresolved component with its name and skip it without failing.
5. When a changeset contains structural changes (added/removed nodes), the Changeset Applicator shall generate a description of the required structural change for the developer to review, rather than attempting automatic structural modification.
6. The Changeset Applicator shall produce a summary report listing all applied changes, skipped changes, and any manual actions required.

### Requirement 5: AI-Assisted Verification Loop

**Objective:** As a developer, I want Claude AI to automatically verify that applied changesets produce visually correct results, so that design-code fidelity is maintained without manual visual inspection.

#### Acceptance Criteria

1. When changesets have been applied to React components, the Verification Skill shall render both the DSL representation and the React component as PNG images.
2. The Verification Skill shall compare the DSL-rendered and React-rendered images using the existing comparator package and report a similarity score.
3. If the similarity score falls below a configurable threshold (default: 95%), the Verification Skill shall identify the visual differences and suggest specific code changes to improve fidelity.
4. The Verification Skill shall iterate up to a configurable maximum number of rounds (default: 3), applying corrections and re-comparing until the threshold is met or the maximum is reached.
5. The Verification Skill shall present comparison results using Claude Desktop's preview feature, showing side-by-side DSL and React renders with annotated differences.
6. When the verification loop completes, the Verification Skill shall produce a final report containing: pass/fail status, final similarity score, number of iterations performed, and a list of all changes made during iteration.

### Requirement 6: Component Identity and Mapping

**Objective:** As a developer, I want a reliable mapping between Figma components and React source files, so that changesets can be accurately routed to the correct code files.

#### Acceptance Criteria

1. When components are imported into Figma, the Plugin shall embed metadata linking each Figma node to its DSL source component name and original file path.
2. The Plugin shall persist the component identity map as a JSON artifact (`node-id-map.json`) alongside the import, mapping Figma node IDs to DSL component names.
3. When a component is renamed in Figma, the Plugin shall preserve the original component identity mapping and track the rename as a changeset entry.
4. The Changeset Applicator shall use a configurable component-to-file mapping that resolves DSL component names to React component file paths in the project.

### Requirement 7: Changeset Data Schema

**Objective:** As a developer, I want a well-defined changeset schema, so that tooling can reliably produce and consume changesets across the pipeline.

#### Acceptance Criteria

1. The changeset schema shall be defined as a TypeScript type in a shared package, ensuring type safety across the plugin, applicator, and verification skill.
2. Each changeset document shall contain: schema version, timestamp, source (plugin version, Figma file name), and an array of component change entries.
3. Each component change entry shall contain: component name, component ID, and an array of property changes.
4. Each property change shall contain: property path, change type (enum: "modified", "added", "removed"), and value fields appropriate to the change type (old value and new value for "modified", new value for "added", old value for "removed").
5. The changeset schema shall support a human-readable description field on each change entry, summarizing the edit in natural language (e.g., "Increase heading font size from 24px to 32px").
