# Implementation Plan

- [ ] 1. Extend DSL core type system with new node types and properties
- [ ] 1.1 Add five new node type literals and supporting types to the type definitions
  - Extend the `NodeType` union with `'LINE' | 'SECTION' | 'POLYGON' | 'STAR' | 'BOOLEAN_OPERATION'`
  - Add `StrokeCap` type with all 8 Figma stroke cap values
  - Add `BooleanOperationType` with the 4 operation values
  - Add `strokeCap` to the stroke paint interface
  - Add `rotation`, `pointCount`, `innerRadius`, `booleanOperation`, and `contentsHidden` as optional properties on the node interface
  - _Requirements: 6.1, 6.2_

- [ ] 1.2 (P) Create props interfaces for each new node type
  - Define `LineProps` with size (length), strokes, rotation, opacity, visibility, and layout sizing
  - Define `SectionProps` with size, fills, children, contentsHidden, and visibility — intentionally omitting opacity, strokes, rotation, and auto-layout (not supported by Figma sections)
  - Define `PolygonProps` with required `pointCount`, size, fills, strokes, corner radius, rotation, opacity, and layout sizing
  - Define `StarProps` with required `pointCount`, optional `innerRadius` (default 0.382), size, fills, strokes, rotation, opacity, and layout sizing
  - Define `BooleanOperationProps` with required children, fills, strokes, opacity, and visibility
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [ ] 2. Implement factory functions with validation
- [ ] 2.1 Create `line()` factory function
  - Accept name and line props, return a node with type LINE
  - Default to a 1px black stroke when no strokes are provided
  - Set height to 0 (lines have zero height)
  - Follow the existing factory pattern: validate name, spread props, return node
  - _Requirements: 1.1, 1.8_

- [ ] 2.2 (P) Create `section()` factory function
  - Accept name and section props, return a node with type SECTION
  - Map `contentsHidden` to the node's `contentsHidden` property
  - Do not accept or propagate auto-layout, opacity, strokes, or rotation properties
  - _Requirements: 2.1_

- [ ] 2.3 (P) Create `polygon()` factory function
  - Accept name and polygon props with required `pointCount`
  - Validate that `pointCount` is an integer >= 3, throw if invalid
  - Map all shape properties (fills, strokes, corner radius, rotation, opacity)
  - _Requirements: 3.1, 3.2_

- [ ] 2.4 (P) Create `star()` factory function
  - Accept name and star props with required `pointCount` and optional `innerRadius`
  - Validate that `pointCount` is an integer >= 3, throw if invalid
  - Default `innerRadius` to 0.382 when not specified
  - _Requirements: 4.1, 4.2_

- [ ] 2.5 (P) Create four boolean operation factory functions
  - Implement `union()`, `subtract()`, `intersect()`, `exclude()` — each accepting name, children array, and optional shape props
  - Validate that at least 2 children are provided, throw if fewer
  - Set `booleanOperation` to the corresponding operation type
  - _Requirements: 5.1, 5.2_

- [ ] 2.6 Export all new factory functions from the package entry point
  - Ensure `line`, `section`, `polygon`, `star`, `union`, `subtract`, `intersect`, `exclude` are re-exported
  - Verify all new types and props interfaces are also exported
  - _Requirements: 6.7_

- [ ] 3. Extend compiler for new node types
- [ ] 3.1 Add new type literals to the compiled node type system
  - Extend the Figma node type union with LINE, SECTION, POLYGON, STAR, BOOLEAN_OPERATION
  - Add `pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `rotation`, and `sectionContentsHidden` to the compiled node dictionary
  - _Requirements: 6.3_

- [ ] 3.2 Extend node type mapping and compilation logic
  - Add 5 new cases to the type mapping function, each returning its type directly
  - Map `pointCount` and `rotation` for POLYGON nodes
  - Map `pointCount`, `innerRadius` (default 0.382), and `rotation` for STAR nodes
  - Map `sectionContentsHidden` for SECTION nodes and skip auto-layout property assignment
  - Map `booleanOperation` for BOOLEAN_OPERATION nodes
  - Map `strokeCap` from the first stroke and `rotation` for LINE nodes
  - Emit a warning and skip unknown node types instead of throwing
  - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.3, 4.3, 5.3, 6.6_

- [ ] 3.3 Extend layout resolver for new node types
  - Handle LINE as a leaf node with height always 0 and width equal to the specified length
  - Handle POLYGON and STAR as leaf shapes using their specified size
  - Handle SECTION as an absolute-positioned container — position children at explicit coordinates or stack sequentially (no auto-layout)
  - Handle BOOLEAN_OPERATION by computing the union bounding box of all children (reuse GROUP logic)
  - _Requirements: 2.4, 5.4_

- [ ] 4. Extend renderer for new node types
- [ ] 4.1 Implement LINE rendering
  - Draw a horizontal stroke from origin to (width, 0) using the node's stroke color and weight
  - Apply rotation transform around the start point when rotation is specified
  - Apply opacity via global alpha
  - _Requirements: 1.4, 1.5_

- [ ] 4.2 (P) Implement SECTION rendering
  - Draw the section as a filled rectangle using the node's fill colors
  - Render the section name as a text label above the content area
  - Render children without clipping
  - _Requirements: 2.5_

- [ ] 4.3 (P) Implement POLYGON rendering with vertex calculation
  - Calculate regular polygon vertices by distributing `pointCount` points evenly around the inscribed ellipse, first vertex at -90 degrees (top)
  - Draw a filled and/or stroked closed path through all vertices
  - Apply corner radius at vertices when specified (quadratic bezier approximation)
  - Apply rotation transform when specified
  - _Requirements: 3.4, 3.5, 3.6_

- [ ] 4.4 (P) Implement STAR rendering with vertex calculation
  - Calculate star vertices by alternating outer and inner radius points, producing `pointCount * 2` vertices total, first outer vertex at -90 degrees
  - Scale inner vertices by the `innerRadius` factor (0–1)
  - When `innerRadius` is 1.0, produce a regular polygon identical to POLYGON rendering
  - Draw filled and/or stroked closed path
  - _Requirements: 4.4, 4.5_

- [ ] 4.5 Implement BOOLEAN_OPERATION rendering with canvas compositing
  - Create an offscreen canvas matching the boolean operation's bounding box
  - Render the first child normally, then render subsequent children using the appropriate composite operation: `source-over` for UNION, `destination-out` for SUBTRACT, `destination-in` for INTERSECT, `xor` for EXCLUDE
  - Composite the offscreen result onto the main canvas
  - When the boolean operation has its own fills or strokes, apply them to the composited result shape
  - _Requirements: 5.5, 5.6_

- [ ] 4.6 Ensure renderer dispatch handles all new types without throwing
  - Add all 5 new types to the rendering dispatch
  - Verify that unknown types fall through gracefully (no crash)
  - _Requirements: 6.4_

- [ ] 5. Extend exporter for new node types
- [ ] 5.1 Add new properties to the plugin node definition
  - Add `pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `rotation`, and `sectionContentsHidden` as optional fields
  - _Requirements: 1.6, 2.6, 3.7, 4.6, 5.7_

- [ ] 5.2 Extend the node conversion function to map new properties
  - Pass through `pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `rotation`, and `sectionContentsHidden` from compiled nodes to plugin node definitions
  - Ensure children are recursively converted for SECTION and BOOLEAN_OPERATION nodes
  - _Requirements: 1.6, 2.6, 3.7, 4.6, 5.7_

- [ ] 6. Extend Figma plugin for new node types
- [ ] 6.1 Implement LINE node creation in the plugin
  - Create a line via the Figma API, set width (resize to length, 0), apply strokes, stroke cap, and rotation
  - _Requirements: 1.7_

- [ ] 6.2 (P) Implement SECTION node creation in the plugin
  - Create a section via the Figma API, resize using `resizeWithoutConstraints` (not `resize`), set fills and `sectionContentsHidden`
  - Do not set opacity (sections don't support it) — recursively create children
  - _Requirements: 2.7_

- [ ] 6.3 (P) Implement POLYGON node creation in the plugin
  - Create a polygon via the Figma API, set `pointCount`, fills, strokes, corner radius, and rotation
  - _Requirements: 3.8_

- [ ] 6.4 (P) Implement STAR node creation in the plugin
  - Create a star via the Figma API, set `pointCount`, `innerRadius`, fills, strokes, and rotation
  - _Requirements: 4.7_

- [ ] 6.5 Implement BOOLEAN_OPERATION node creation in the plugin
  - Create child nodes first in a temporary frame container
  - Combine children using the appropriate Figma boolean method (`figma.union`, `figma.subtract`, `figma.intersect`, or `figma.exclude`) with the parent
  - Remove the temporary frame after combining
  - Apply fills, strokes, and opacity to the resulting boolean operation node
  - _Requirements: 5.8_

- [ ] 7. Extend plugin serializer for bidirectional sync
- [ ] 7.1 Serialize LINE nodes in the serializer
  - Extract width (length), strokes, stroke cap, and rotation from Figma LINE nodes into the plugin node definition format
  - _Requirements: 7.1_

- [ ] 7.2 (P) Serialize POLYGON nodes in the serializer
  - Extract `pointCount`, fills, strokes, and corner radius from Figma POLYGON nodes
  - _Requirements: 7.2_

- [ ] 7.3 (P) Serialize STAR nodes in the serializer
  - Extract `pointCount`, `innerRadius`, fills, and strokes from Figma STAR nodes
  - _Requirements: 7.3_

- [ ] 7.4 (P) Serialize BOOLEAN_OPERATION nodes in the serializer
  - Extract `booleanOperation`, recursively serialize child nodes, and extract shape properties
  - _Requirements: 7.4_

- [ ] 7.5 (P) Serialize SECTION nodes in the serializer
  - Extract fills and `sectionContentsHidden`, recursively serialize children
  - _Requirements: 7.5_

- [ ] 7.6 Verify changeset property paths support new node type properties
  - Confirm that `propertyPath` strings for `pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `contentsHidden`, and `rotation` are valid in the existing changeset schema
  - Verify structural change tracking (add/remove) captures full property snapshots for new node types
  - No schema changes needed — existing string-based property paths already support arbitrary paths
  - _Requirements: 7.6, 7.7, 7.8_

- [ ] 8. Update apply-changeset and verify-changeset skills
- [ ] 8.1 Add React/CSS mapping rules for new node types to the apply-changeset skill
  - Document LINE mapping: stroke → CSS `border-bottom` or `<hr>` element (color, weight, width)
  - Document POLYGON mapping: compute vertex coordinates from `pointCount` and size, render as inline SVG `<polygon>`
  - Document STAR mapping: compute star vertex coordinates from `pointCount`, `innerRadius`, and size, render as inline SVG `<polygon>`
  - Document BOOLEAN_OPERATION mapping: render as inline SVG with composited paths or `<clipPath>`
  - Document SECTION skip rule: log in summary report, no React equivalent
  - Add handling for geometry property changes (`pointCount`, `innerRadius`) that require vertex recalculation
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 8.2 Update verify-changeset skill for new node type verification
  - Ensure the renderer produces accurate reference PNGs for new types (already covered by renderer extension)
  - Document that SVG captures from React components must use matching scale and viewport
  - Add per-node-type similarity threshold configuration (lower thresholds for boolean operations)
  - Add guidance for identifying which node type elements contribute to visual differences
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 9. Update validator for new node type patterns
- [ ] 9.1 Extend layout compatibility rule to recognize SVG and CSS border patterns
  - Accept inline SVG elements (`<svg>`, `<polygon>`, `<line>`, `<clipPath>`) as valid DSL-compatible patterns
  - Accept CSS `border-bottom` patterns as valid LINE representations
  - Emit informational suggestion (not error) when a PNG image could be replaced by a shape node
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 10. Add unit and integration tests
- [ ] 10.1 Add factory function tests
  - Test that each factory returns a node with the correct type and properties
  - Test validation: `pointCount < 3` throws for polygon and star; `children < 2` throws for boolean operations
  - Test default values: LINE default 1px black stroke, STAR default `innerRadius` 0.382
  - Test that section props don't include opacity, strokes, rotation, or auto-layout
  - _Requirements: 1.1, 1.8, 2.1, 3.1, 3.2, 4.1, 4.2, 5.1, 5.2_

- [ ] 10.2 (P) Add compiler tests
  - Test type mapping for all 5 new types
  - Test compilation output includes node-specific properties (pointCount, innerRadius, booleanOperation, strokeCap, sectionContentsHidden)
  - Test that SECTION compilation skips auto-layout
  - Test unknown type warning and skip behavior
  - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.3, 4.3, 5.3, 6.3, 6.6_

- [ ] 10.3 (P) Add renderer tests
  - Test vertex calculation accuracy for polygon (correct count, first vertex at top)
  - Test star vertex calculation (alternating radii, correct count = pointCount * 2)
  - Test that star with `innerRadius` 1.0 matches a polygon with same `pointCount`
  - Test compile-to-render round-trip for each type (no exceptions)
  - _Requirements: 3.4, 3.5, 4.4, 4.5, 5.5_

- [ ] 10.4 (P) Add exporter tests
  - Test that converted plugin node definitions include all new properties
  - Test children are recursively converted for SECTION and BOOLEAN_OPERATION
  - _Requirements: 1.6, 2.6, 3.7, 4.6, 5.7_

- [ ] 11. Add calibration examples and round-trip tests
- [ ] 11.1 (P) Create example DSL files for each new node type
  - Add a divider line example (horizontal line with stroke)
  - Add a hexagonal badge example (6-sided polygon with fills and corner radius)
  - Add a 5-point star example (star with default inner radius)
  - Add a boolean-subtracted icon example (circle minus rectangle)
  - Add a section grouping example (section containing multiple components)
  - _Requirements: 11.3_

- [ ] 11.2 Add calibration categories for new node types
  - Register `line-shapes`, `polygon-star-shapes`, `boolean-operations`, and `section-layout` as calibration categories
  - Configure lower similarity thresholds for boolean operations (anti-aliasing artifacts)
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 11.3 Add round-trip fidelity test
  - Compile a DSL file, export to Figma JSON, serialize back via the plugin serializer, and compare the serialized output against the original node tree
  - Verify new node-specific properties survive the round-trip
  - _Requirements: 11.5_
