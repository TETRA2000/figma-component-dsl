# Requirements Document

## Introduction

The current DSL-to-Figma export pipeline creates all nodes as **flat frames** — even when the page is composed of reusable React components (Navbar, Hero, Footer, etc.). When a full landing page is exported to Figma, each section becomes an independent frame with duplicated structure. There is no mechanism to:

1. **Reuse existing Figma components** — If a Button or Card component already exists in the Figma file (from a previous import or a design library), the page export creates a fresh copy instead of referencing the existing component as an instance.
2. **Define slots** — Figma's Slot property (released 2025) allows flexible areas within components where designers can freely add and arrange content without detaching. This maps directly to React's `children` pattern, but the DSL has no way to express it. Without slots, components in Figma are rigid — content is baked in and cannot be composed flexibly by designers.

This specification adds two capabilities:

- **Component reuse on page export**: When exporting a page, the pipeline detects nodes that match existing Figma components (by name or explicit reference) and creates instances instead of duplicating the full subtree. This reduces file size, enables global updates, and produces a proper Figma component architecture.
- **Slot support**: A new `slot()` DSL primitive marks regions of a component as composable areas. The compiler, exporter, and plugin propagate slot semantics so that Figma components are created with slot properties, and Code Connect bindings use `figma.slot()` for Dev Mode integration.

Together, these features bridge the gap between React's compositional model (components + children) and Figma's component system (components + instances + slots), producing Figma files that behave like hand-crafted design systems.

## Requirements

### Requirement 1: Component Registry for Reuse

**Objective:** As a page author, I want the export pipeline to maintain a registry of known components (both previously exported and explicitly declared), so that the pipeline can create instances instead of duplicating component subtrees when exporting pages.

#### Acceptance Criteria

1. The `@figma-dsl/exporter` package shall accept an optional `componentRegistry` option containing a map of component names to their definitions (node structure hash, component properties, slot definitions).
2. When the exporter encounters a subtree whose root node name matches a registered component, the Exporter shall emit an INSTANCE reference instead of the full subtree.
3. The CLI `export` command shall accept a `--registry` option pointing to a JSON file that lists previously exported component names and their Figma node IDs.
4. When the CLI `pipeline` or `batch` command exports multiple DSL files, the CLI shall automatically build a registry from components exported earlier in the batch and reuse them in subsequent exports.
5. The Exporter shall compare the structure of a matched subtree against the registered component definition and emit a warning if the structures diverge (indicating the component may have changed).

### Requirement 2: Instance Creation from Registry on Import

**Objective:** As a Figma plugin user, I want the plugin to create Figma instances that reference existing components in the file when the import JSON specifies instance references, so that page imports produce a proper component-instance hierarchy.

#### Acceptance Criteria

1. When the plugin encounters an INSTANCE node in the import JSON, the Plugin shall first search the local `componentMap` (components created during the current import session) for the referenced component.
2. If the component is not found in the local `componentMap`, the Plugin shall search the current Figma file for an existing component node whose name matches the `componentId` field.
3. When an existing Figma component is found by name, the Plugin shall create an instance of that component using `component.createInstance()` and apply any property overrides from the import JSON.
4. If no matching component is found locally or in the Figma file, the Plugin shall fall back to creating the node as a flat FRAME and log a warning identifying the missing component.
5. The Plugin shall support a `resolveExisting: true` flag in the PluginInput schema that enables searching the Figma file for pre-existing components during import.

### Requirement 3: DSL Slot Primitive

**Objective:** As a DSL author, I want to declare slot regions within component definitions, so that I can mark areas where designers can freely insert content in Figma instances.

#### Acceptance Criteria

1. The `@figma-dsl/core` package shall export a `slot(name, options?)` builder function that creates a FRAME node with slot semantics.
2. The `slot()` builder shall accept a `name` parameter that becomes the slot property name in Figma (e.g., `'Content'`, `'Actions'`, `'Leading Icon'`).
3. The `slot()` builder shall accept optional `defaultChildren` — an array of DslNode that serve as the slot's default content in the main component.
4. The `slot()` builder shall accept standard frame options: `size`, `autoLayout`, `fills`, `cornerRadius`, `layoutSizingHorizontal`, `layoutSizingVertical`.
5. When a `slot()` node is placed inside a non-COMPONENT parent, the DSL Core shall throw a validation error — slots are only valid within COMPONENT or COMPONENT_SET definitions.
6. The DslNode type shall include an `isSlot` boolean flag and a `slotName` string field to distinguish slot frames from regular frames in the AST.

### Requirement 4: Compiler Slot Handling

**Objective:** As a pipeline consumer, I want the compiler to process slot nodes and propagate slot metadata through the intermediate JSON, so that downstream stages can create Figma slot properties correctly.

#### Acceptance Criteria

1. When the compiler encounters a node with `isSlot: true`, the Compiler shall include `isSlot` and `slotName` in the compiled output and treat the node as a FRAME for layout resolution purposes.
2. The Compiler shall validate that slot nodes only appear as descendants of COMPONENT or COMPONENT_SET nodes and emit an error otherwise.
3. When a COMPONENT node contains one or more slot children, the Compiler shall add a SLOT-type entry to the component's `componentPropertyDefinitions` for each slot, with the slot name as the property key.
4. While resolving auto-layout for a slot node, the Compiler shall use the slot's declared `size` and its `defaultChildren` for dimension calculation, consistent with regular FRAME handling.

### Requirement 5: Exporter Slot Encoding

**Objective:** As a Figma workflow user, I want the exporter to include slot metadata in the plugin JSON, so that the Figma plugin can create components with slot properties.

#### Acceptance Criteria

1. When the exporter encounters a node with `isSlot: true`, the Exporter shall include `isSlot: true` and `slotPropertyName` in the PluginNodeDef output.
2. The Exporter shall include a `slotProperties` map in the component-level PluginNodeDef, listing each slot's name, default content reference, and preferred instances (if specified).
3. When an INSTANCE node overrides a slot's content, the Exporter shall include the slot override in the instance's `overriddenProperties` as a structural reference (not a simple string value).

### Requirement 6: Plugin Slot Creation

**Objective:** As a designer importing DSL components, I want slots to appear as proper Figma slot properties on imported components, so that I can freely insert and arrange content in instances.

#### Acceptance Criteria

1. When the Plugin creates a COMPONENT node containing a child with `isSlot: true`, the Plugin shall convert that child frame to a slot using the Figma Plugin API's slot creation method (`component.addComponentProperty(name, 'SLOT', ...)` or the equivalent frame-to-slot conversion).
2. The Plugin shall set the slot's name from the `slotPropertyName` field in the import JSON.
3. When the Plugin creates slot default content, the Plugin shall create the `defaultChildren` nodes inside the slot frame as normal child nodes.
4. If the Figma Plugin API does not support programmatic slot creation (API limitation), the Plugin shall create the frame with a naming convention (`[Slot] ContentArea`) and log a message indicating manual slot conversion is needed.
5. When preferred instances are specified for a slot, the Plugin shall configure the slot's preferred instances list if the API supports it.

### Requirement 7: Code Connect Slot Integration

**Objective:** As a developer using Dev Mode, I want Code Connect bindings to use `figma.slot()` for slot regions, so that Dev Mode shows the correct slot mapping between Figma slots and React children/render props.

#### Acceptance Criteria

1. The export pipeline shall generate Code Connect binding snippets (`.figma.tsx` files) that use `figma.slot('SlotName')` for each slot property defined on a component.
2. When a component has a single slot, the Code Connect binding shall map it to the React component's `children` prop by default.
3. When a component has multiple named slots, the Code Connect binding shall map each slot to a correspondingly named React prop (e.g., `slot('Leading')` maps to `leadingContent` prop).
4. The generated Code Connect snippet shall include the component's Figma URL (using the node ID from the import) for the `figma.connect()` call.

### Requirement 8: Page-Level Component Deduplication

**Objective:** As a page author, I want the export pipeline to automatically detect repeated component patterns within a page and deduplicate them into shared components with instances, so that page exports produce clean Figma files without manual registry management.

#### Acceptance Criteria

1. When the CLI `export` command processes a page-level DSL file with `--deduplicate` flag, the Exporter shall analyze the node tree for structurally identical subtrees.
2. The Exporter shall consider two subtrees structurally identical when they share the same node types, names, auto-layout configuration, and child structure — differing only in text content, fills, or property values.
3. When structurally identical subtrees are found, the Exporter shall extract the first occurrence as a COMPONENT definition and replace subsequent occurrences with INSTANCE nodes carrying property overrides for the differing values.
4. The Exporter shall place extracted component definitions before instances in the output JSON, so that the plugin creates components before attempting to instantiate them.
5. When deduplication extracts a component, the Exporter shall log a summary indicating which component was extracted and how many instances were created.

### Requirement 9: Slot Override in Instance Nodes

**Objective:** As a DSL author, I want to override slot content when creating instances of slotted components, so that each instance can display different content in its slots.

#### Acceptance Criteria

1. The `instance()` builder shall accept a `slotOverrides` option — a record mapping slot names to arrays of DslNode that replace the slot's default content.
2. When the compiler encounters an INSTANCE node with `slotOverrides`, the Compiler shall include the override content in the compiled output under a `slotOverrides` key.
3. When the exporter encounters an INSTANCE with `slotOverrides`, the Exporter shall encode the override content as nested PluginNodeDef arrays in the instance's output.
4. When the Plugin creates an instance with slot overrides, the Plugin shall replace the slot's default children with the override content nodes.
5. If a `slotOverrides` key references a slot name that does not exist on the referenced component, the Compiler shall emit a warning identifying the invalid slot name.

### Requirement 10: Bidirectional Slot Sync

**Objective:** As a designer, I want changes I make to slot content in Figma (adding, removing, or rearranging slot children) to be captured in changesets, so that slot edits flow back to code.

#### Acceptance Criteria

1. When a designer adds content to a slot in a Figma instance, the Plugin shall detect the structural change and record it in the edit log with the slot name and the added node structure.
2. When a designer removes content from a slot in a Figma instance, the Plugin shall record the removal as a structural change referencing the slot name and removed node.
3. When a designer reorders content within a slot, the Plugin shall record the reorder as a structural change with the new child order.
4. When a changeset is exported containing slot content changes, the Plugin shall serialize the slot's current children as nested PluginNodeDef structures in the changeset JSON.
5. When the Changeset Applicator encounters a slot content change, the Changeset Applicator shall update the corresponding `slot()` node's `defaultChildren` or the `instance()` node's `slotOverrides` in the DSL source code.
