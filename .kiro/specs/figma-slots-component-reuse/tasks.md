# Implementation Plan

- [x] 1. Core type extensions for slots and component reuse
- [x] 1.1 Add slot fields to DslNode and supporting types
  - Extend the DslNode interface with optional `isSlot`, `slotName`, `preferredInstances`, and `slotOverrides` fields
  - Add `'SLOT'` to the ComponentPropertyType union so the compiler can inject slot property definitions
  - Create a `SlotProps` interface capturing slot-specific options: size, auto-layout, fills, corner radius, layout sizing, default children, and preferred instances
  - Add unit tests verifying the new fields are accepted by the type system and default to undefined
  - _Requirements: 3.6_

- [x] 1.2 Add slot and registry fields to PluginNodeDef and PluginInput
  - Extend PluginNodeDef with `isSlot`, `slotPropertyName`, `slotProperties` map, and `slotOverrides` record
  - Extend PluginInput with `resolveExisting` boolean flag
  - Update the diff module's comparison property list to include the new slot fields
  - Add unit tests verifying the extended types serialize and deserialize correctly
  - _Requirements: 5.1, 5.2, 5.3, 2.5_

- [x] 1.3 Create the `slot()` builder function
  - Implement a builder that creates a FRAME-type DslNode with `isSlot: true` and `slotName` set from the name parameter
  - Accept optional SlotProps for size, auto-layout, fills, corner radius, layout sizing, default children, and preferred instances
  - Validate that name is a non-empty string (throw on empty)
  - Place default children into the node's children array
  - Add unit tests: valid slot creation, empty name rejection, default children propagation, all optional props
  - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - _Contracts: SlotBuilder_

- [x] 1.4 Extend the `instance()` builder with slot overrides
  - Add an optional third parameter for slot overrides — a record mapping slot names to arrays of DslNode
  - Store the slot overrides on the returned INSTANCE node
  - Preserve backward compatibility: existing two-argument calls must continue working unchanged
  - Add unit tests: instance with slot overrides, instance without slot overrides (regression), empty overrides record
  - _Requirements: 9.1_

- [x] 2. Compiler slot handling
- [x] 2.1 Validate slot placement within components
  - When the compiler encounters a node with `isSlot: true`, verify it is a descendant of a COMPONENT or COMPONENT_SET node
  - Emit a compile error with the node path if a slot appears outside a component context
  - Treat slot nodes as FRAME for layout resolution — use declared size and default children for dimension calculation
  - Pass `isSlot` and `slotName` through to the compiled output unchanged
  - Add tests: slot inside component (valid), slot inside plain frame (error), slot inside component set (valid), nested slot within component child frame (valid)
  - _Requirements: 3.5, 4.1, 4.2, 4.4_

- [x] 2.2 Inject SLOT property definitions on parent components
  - When a COMPONENT node contains one or more slot children, automatically add a SLOT-type entry to the component's property definitions for each slot
  - Use the slot name as the property key and include the default content reference
  - Add `'SLOT'` to the valid component property types set in the compiler
  - Add tests: component with one slot gets one SLOT property, component with multiple slots, component with no slots (unchanged)
  - _Requirements: 4.3_

- [x] 2.3 Compile slot overrides on instance nodes
  - When an INSTANCE node has slot overrides, include the override content in the compiled output under a `slotOverrides` key
  - Validate that each slot override key matches a slot defined on the referenced component; emit a warning for unrecognized slot names
  - Recursively compile the override content nodes (they need layout resolution too)
  - Add tests: valid slot override compilation, invalid slot name warning, override content with nested auto-layout
  - _Requirements: 9.2, 9.5_

- [x] 3. Exporter slot encoding
- [x] 3.1 Encode slot metadata in the plugin node conversion
  - When converting a compiled node with `isSlot: true`, include `isSlot` and `slotPropertyName` in the PluginNodeDef output
  - When converting a COMPONENT node, collect all slot children and produce a `slotProperties` map with each slot's name, default content node index, and preferred instances
  - When converting an INSTANCE with slot overrides, encode the override content as nested PluginNodeDef arrays
  - Add tests: slot node encoding, component-level slotProperties map, instance slotOverrides encoding
  - _Requirements: 5.1, 5.2, 5.3_
  - _Contracts: SlotEncoder_

- [x] 4. Plugin slot creation and instance resolution
- [x] 4.1 Scan the Figma file for existing components
  - Implement a file scanner function that uses the Figma API to find all existing component nodes in the file
  - Build a name-to-component map from the scan results and merge it with the session-local component map
  - Only activate when the `resolveExisting` flag is set in the import input
  - Cache results per import session to avoid repeated scans
  - Handle duplicate component names by using the first match and logging a warning
  - Wire the scanner into both the paste-JSON handler and the WebSocket push-components handler
  - Add tests: scanner finds existing components, scanner handles duplicates, scanner skipped when resolveExisting is false
  - _Requirements: 2.1, 2.2, 2.5_
  - _Contracts: FileScanner_

- [x] 4.2 Enhance instance resolution with file-wide lookup
  - When creating an INSTANCE node, first check the local component map (session-created components)
  - If not found locally, search the file-scanned component map (from the file scanner)
  - When found in the file, create an instance using the Figma API and apply property overrides
  - If no match is found anywhere, fall back to creating a flat FRAME and log a warning identifying the missing component
  - Add tests: instance from local map, instance from file scan, fallback to frame with warning
  - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - _Contracts: InstanceResolver_

- [x] 4.3 Create slot frames with naming convention
  - When creating a FRAME node that has `isSlot: true`, name it `[Slot] {slotName}` using the slot property name from the import data
  - Store slot metadata (`isSlot`, `slotName`, `preferredInstances`) in the node's plugin data for changeset tracking
  - Create default children inside the slot frame as normal child nodes
  - Log a guidance message indicating manual slot conversion is needed (since the Figma API lacks SLOT support)
  - Add tests: slot frame naming, plugin data storage, default children creation, guidance message logged
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - _Contracts: SlotFrameCreator_

- [x] 4.4 Implement detached-copy strategy for instance slot overrides
  - When the plugin encounters an INSTANCE node with slot overrides, create a detached FRAME copy instead of a true instance
  - Read the referenced component's full structure from the component map and reproduce its layout and children as a flat frame
  - For each `[Slot]` frame in the copy, replace the default children with the override content nodes
  - Name the detached copy `{ComponentName} (detached — slot override)` for designer discoverability
  - Store the original component reference in plugin data so re-import can upgrade to true instances when API support arrives
  - Add tests: detached copy created with correct structure, slot children replaced, naming convention applied, plugin data stored
  - _Requirements: 9.4_

- [x] 5. Structural hashing, component registry, and deduplication
- [x] 5.1 (P) Build the structural hashing utility
  - Implement a deterministic hash function that computes a structural signature for any PluginNodeDef tree
  - Include in the hash: node type, name pattern (with trailing digits stripped), auto-layout config (stack mode, spacing, padding, alignment), and child hashes recursively
  - Exclude from the hash: text content, fills, opacity, and size (these become property overrides)
  - Use SHA-256 of a JSON-serialized structural descriptor for determinism
  - Add tests: identical structures produce identical hashes, structures differing only in text/fills produce identical hashes, different layouts produce different hashes
  - _Requirements: 1.5, 8.2_
  - _Contracts: StructuralHasher_

- [x] 5.2 (P) Build the component registry
  - Implement a registry that loads component definitions from a JSON file or builds incrementally during batch export
  - Each entry stores the component name, optional Figma node ID, structural hash, property definitions, and slot names
  - Match incoming subtree roots against registry entries by name, then validate structural hash to detect divergence
  - Emit a warning when a matched component's structure has diverged from the registered definition
  - Support loading from the MCP server's mapping registry file as an alternative source
  - Add tests: load from file, build from batch, match by name, divergence warning, empty registry on missing file
  - _Requirements: 1.1, 1.2, 1.4, 1.5_
  - _Contracts: ComponentRegistry_

- [x] 5.3 Build the structural deduplicator
  - Walk a PluginNodeDef tree computing structural hashes per subtree and group structurally identical subtrees
  - Extract the first occurrence of each group as a COMPONENT definition and replace subsequent occurrences with INSTANCE nodes
  - Infer component properties from differences across instances: TEXT properties for differing text content, BOOLEAN properties for differing visibility
  - Generate property overrides for each instance based on its differences from the extracted component template
  - Maintain output ordering with components placed before their instances
  - Produce a summary indicating which components were extracted and how many instances were created
  - Emit warnings when structural differences cannot be expressed as property overrides (potential false dedup match)
  - Add tests: page with 3 identical cards → 1 component + 3 instances, property inference from text differences, visibility-based boolean property, ordering constraint, false match warning
  - Depends on structural hashing utility from 5.1
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - _Contracts: StructuralDeduplicator_

- [x] 6. (P) Code Connect generation
- [x] 6.1 (P) Build the Code Connect generator module
  - Implement a generator that produces `.figma.tsx` Code Connect binding files from component metadata
  - For each slot property on a component, generate a `figma.slot('SlotName')` mapping
  - When a component has a single slot, map it to the React `children` prop by default
  - When a component has multiple named slots, map each to a correspondingly named React prop in camelCase
  - Map text and boolean component properties to `figma.string()` and `figma.boolean()` respectively
  - Include the component's Figma URL (constructed from file key and node ID) in the `figma.connect()` call
  - Add tests: single-slot component → children mapping, multi-slot component → named props, text/boolean property mapping, Figma URL construction
  - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - _Contracts: CodeConnectGenerator_

- [x] 7. CLI flags and exporter integration
- [x] 7.1 Add registry and deduplication flags to the CLI export command
  - Add `--registry` option accepting a file path to a component registry JSON file
  - Add `--deduplicate` boolean flag to enable automatic page-level deduplication
  - Add `--resolve-existing` boolean flag to enable Figma file scanning for existing components on import
  - Pass these options through to the exporter's generate function
  - Add tests: flag parsing, options forwarded to exporter
  - _Requirements: 1.3, 8.1, 2.5_

- [x] 7.2 Wire registry and deduplication into the exporter pipeline
  - When a registry path is provided, load the component registry and pass it to the exporter
  - When deduplication is enabled, run the structural deduplicator before generating plugin output and log the dedup summary
  - When the batch command exports multiple files, automatically build a registry from earlier components and reuse them in subsequent exports
  - Set `resolveExisting` in the PluginInput when the flag is enabled
  - Add tests: export with registry matches → INSTANCE in output, export with dedup → extracted components, batch auto-registry
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 8.1, 8.4, 8.5_

- [x] 8. Bidirectional slot sync
- [x] 8.1 Add slot-aware change detection to the edit tracker
  - Extend the change categorization to include a `'slot-structure'` category when changes occur within `[Slot]`-named frames
  - Identify slot frames by checking plugin data for the `isSlot` marker stored during import
  - Detect additions, removals, and reordering of children within slot frames
  - Add tests: child added to slot frame → slot-structure category, child removed → slot-structure, reorder detected
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 8.2 Serialize slot content changes in changesets
  - When exporting a changeset containing slot structure changes, serialize the slot's current children as nested PluginNodeDef structures
  - Include the slot name and change type (addition, removal, reorder) in the changeset property change entry
  - Extend the serializer to capture slot metadata when reading back slot frames from Figma
  - Add tests: changeset with slot addition contains serialized children, slot name included, round-trip serialization
  - _Requirements: 10.4, 10.5_

- [x] 9. End-to-end integration and pipeline verification
- [x] 9.1 Full pipeline integration test: DSL with slots through to plugin JSON
  - Define a DSL component with two named slots and default content, compile it, export to plugin JSON, and verify the output contains slot metadata, slot property definitions, and correctly structured slot frames
  - Verify that an instance of the slotted component with slot overrides produces the expected detached-copy structure in the output
  - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.3, 5.1, 5.2_

- [x] 9.2 Deduplication integration test: page with repeated components
  - Define a page-level DSL with 3 structurally identical card components differing only in text content
  - Export with deduplication enabled and verify: 1 extracted COMPONENT + 3 INSTANCE nodes with TEXT property overrides
  - Verify components are ordered before instances in the output
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9.3 Registry integration test: batch export with cross-file reuse
  - Export two DSL files in batch mode where the second file references a component defined in the first
  - Verify the second file's output contains an INSTANCE reference (not a duplicated subtree)
  - Verify the registry is auto-built from the first file's components
  - _Requirements: 1.1, 1.2, 1.4_

- [x] 9.4* (P) Code Connect integration test
  - Generate Code Connect bindings for a component with 2 named slots and verify the output uses `figma.slot()` for each
  - Verify single-slot components map to `children` prop
  - Verify the Figma URL is included in the `figma.connect()` call
  - _Requirements: 7.1, 7.2, 7.3, 7.4_
