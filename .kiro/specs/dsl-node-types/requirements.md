# Requirements Document

## Introduction

This specification adds five design-critical Figma node types to the DSL pipeline: LINE, SECTION, POLYGON, STAR, and BOOLEAN_OPERATION. The current DSL supports 9 node types (FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP, COMPONENT, COMPONENT_SET, INSTANCE, IMAGE), leaving a gap for common geometric shapes, organizational containers, and boolean operations found in real-world Figma designs.

Each new node type must be supported across all seven pipeline stages: type definitions (`dsl-core`), node constructors (`dsl-core`), compiler (`compiler`), renderer (`renderer`), exporter (`exporter`), Figma plugin (`plugin`), and bidirectional sync (serializer, changeset types, apply/verify skills). Since the project maintains a bidirectional sync workflow between React components and Figma components, new node types must also map to React/CSS representations to maintain round-trip fidelity.

The full round-trip workflow is:
1. **Forward**: DSL (.dsl.ts) → compile → render/export → Figma plugin import
2. **Reverse**: Designer edits in Figma → changeset export → apply to React code → verify visual fidelity

Reference: `docs/pipeline-improvement-ideas.md` sections 2.1–2.5, `.kiro/specs/bidirectional-sync/`.

## Requirements

### Requirement 1: LINE Node Type

**Objective:** As a DSL author, I want to define line elements declaratively, so that I can create dividers, separators, and ruled lines without workarounds using zero-height rectangles.

#### Acceptance Criteria

1. The DSL shall provide a `line()` factory function that accepts a name, length, optional stroke configuration, optional stroke cap, optional rotation, and optional opacity, and returns a `DslNode` with `type: 'LINE'`.
2. The Compiler shall map a DSL `LINE` node to a Figma `LINE` node type with width equal to the specified length and height of 0.
3. When a `LINE` node specifies `strokeCap`, the Compiler shall include the stroke cap value (`'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL'`) in the compiled output.
4. The Renderer shall draw a `LINE` node as a horizontal stroke from (0, 0) to (length, 0), applying the node's stroke color, weight, and opacity.
5. When a `LINE` node specifies `rotation`, the Renderer shall apply a rotation transform around the line's start point before drawing.
6. The Exporter shall include `LINE` nodes in the plugin JSON output with all line-specific properties (length, strokeCap, rotation).
7. The Plugin shall create Figma `LINE` nodes via `figma.createLine()` and apply stroke, strokeCap, width, and rotation properties.
8. If a `LINE` node has no strokes defined, the DSL shall default to a 1px black stroke so the line is visible.

### Requirement 2: SECTION Node Type

**Objective:** As a DSL author, I want to define section containers, so that I can organize multiple components on the Figma canvas under labeled groups matching Figma's native section feature.

#### Acceptance Criteria

1. The DSL shall provide a `section()` factory function that accepts a name, optional size, optional fills, optional children, and optional `contentsHidden` flag, and returns a `DslNode` with `type: 'SECTION'`.
2. The Compiler shall map a DSL `SECTION` node to a Figma `SECTION` node type.
3. The Compiler shall not apply auto-layout properties to `SECTION` nodes, since Figma sections do not support auto-layout.
4. The Layout Resolver shall treat `SECTION` nodes as absolute-positioned containers where children are placed at their explicit (x, y) coordinates or stacked sequentially if no coordinates are specified.
5. The Renderer shall draw a `SECTION` node as a filled rectangle with the section name rendered as a label above the content area.
6. The Exporter shall include `SECTION` nodes in the plugin JSON output with fills and contentsHidden properties.
7. The Plugin shall create Figma section nodes via `figma.createSection()` and set `sectionContentsHidden` when the `contentsHidden` flag is true.

### Requirement 3: POLYGON Node Type

**Objective:** As a DSL author, I want to define regular polygon shapes (triangles, pentagons, hexagons, etc.), so that I can create geometric decorative elements and icons without relying on external images.

#### Acceptance Criteria

1. The DSL shall provide a `polygon()` factory function that accepts a name, a required `pointCount` (integer >= 3), optional size, optional fills, optional strokes, optional corner radius, optional rotation, and optional opacity, and returns a `DslNode` with `type: 'POLYGON'`.
2. If `pointCount` is less than 3, the DSL shall throw a validation error at construction time.
3. The Compiler shall map a DSL `POLYGON` node to a Figma `POLYGON` node type and include `pointCount` in the compiled output.
4. The Renderer shall calculate regular polygon vertices by distributing `pointCount` points evenly around an ellipse inscribed in the node's bounding box, with the first vertex pointing upward (at -90 degrees).
5. The Renderer shall draw the polygon as a filled and/or stroked closed path using the calculated vertices.
6. When a `POLYGON` node specifies `cornerRadius`, the Renderer shall apply rounded corners at each vertex.
7. The Exporter shall include `POLYGON` nodes in the plugin JSON output with `pointCount` and all shape properties.
8. The Plugin shall create Figma polygon nodes via `figma.createPolygon()` and set `pointCount`, fills, strokes, corner radius, and rotation.

### Requirement 4: STAR Node Type

**Objective:** As a DSL author, I want to define star shapes with configurable point count and inner radius, so that I can create star ratings, badges, and decorative elements.

#### Acceptance Criteria

1. The DSL shall provide a `star()` factory function that accepts a name, a required `pointCount` (integer >= 3), optional `innerRadius` (number 0–1, default 0.382), optional size, optional fills, optional strokes, optional rotation, and optional opacity, and returns a `DslNode` with `type: 'STAR'`.
2. If `pointCount` is less than 3, the DSL shall throw a validation error at construction time.
3. The Compiler shall map a DSL `STAR` node to a Figma `STAR` node type and include `pointCount` and `innerRadius` in the compiled output.
4. The Renderer shall calculate star vertices by alternating between outer radius points and inner radius points (scaled by `innerRadius`), producing `pointCount * 2` vertices total, with the first outer vertex pointing upward.
5. When `innerRadius` is 1.0, the Renderer shall produce a regular polygon identical to a `POLYGON` node with the same `pointCount`.
6. The Exporter shall include `STAR` nodes in the plugin JSON output with `pointCount`, `innerRadius`, and all shape properties.
7. The Plugin shall create Figma star nodes via `figma.createStar()` and set `pointCount`, `innerRadius`, fills, strokes, and rotation.

### Requirement 5: BOOLEAN_OPERATION Node Type

**Objective:** As a DSL author, I want to combine shapes using boolean operations (union, subtract, intersect, exclude), so that I can create complex icons and composite shapes from simpler primitives.

#### Acceptance Criteria

1. The DSL shall provide four factory functions — `union()`, `subtract()`, `intersect()`, `exclude()` — each accepting a name, an array of child `DslNode` elements, and optional shape properties (fills, strokes, opacity), and returning a `DslNode` with `type: 'BOOLEAN_OPERATION'` and the corresponding `booleanOperation` value.
2. If fewer than 2 children are provided, the DSL shall throw a validation error at construction time.
3. The Compiler shall map a DSL `BOOLEAN_OPERATION` node to a Figma `BOOLEAN_OPERATION` node type with the `booleanOperation` field set to `'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'`.
4. The Layout Resolver shall compute the bounding box of a `BOOLEAN_OPERATION` node as the union bounding box of all its children (auto-sizing, like GROUP).
5. The Renderer shall render boolean operations using offscreen canvas compositing: draw children to an offscreen canvas using the appropriate `globalCompositeOperation` mode (`source-over` for UNION, `destination-out` for SUBTRACT, `destination-in` for INTERSECT, `xor` for EXCLUDE), then composite the result onto the main canvas.
6. When a `BOOLEAN_OPERATION` node has its own fills or strokes, the Renderer shall apply them to the composite result shape rather than to individual children.
7. The Exporter shall include `BOOLEAN_OPERATION` nodes in the plugin JSON output with the `booleanOperation` value, children, and shape properties.
8. The Plugin shall create Figma boolean operation nodes via the corresponding Figma API method (`figma.union()`, `figma.subtract()`, `figma.intersect()`, `figma.exclude()`) with the child nodes.

### Requirement 6: Cross-Cutting Pipeline Support

**Objective:** As a pipeline maintainer, I want all new node types to be consistently integrated across all pipeline stages, so that the compile-render-export-import workflow remains reliable and testable.

#### Acceptance Criteria

1. The DSL shall extend the `NodeType` union type to include `'LINE' | 'SECTION' | 'POLYGON' | 'STAR' | 'BOOLEAN_OPERATION'`.
2. The DSL shall add supporting property types required by new nodes: `strokeCap` on `StrokePaint`, `pointCount` and `innerRadius` on `DslNode`, `booleanOperation` on `DslNode`, and `contentsHidden` on `DslNode`.
3. The Compiler shall extend the `FigmaNodeType` union to include all five new node types and handle them in the `mapNodeType()` function.
4. The Renderer shall handle all five new node types in its rendering dispatch without throwing for unknown types.
5. The Plugin serializer (`serializer.ts`) shall support serializing all five new node types for bidirectional export, enabling round-trip fidelity.
6. When a new node type is encountered by an older pipeline version that does not recognize it, the Compiler shall emit a warning and skip the node rather than throwing an error.
7. The DSL shall export all new factory functions (`line`, `section`, `polygon`, `star`, `union`, `subtract`, `intersect`, `exclude`) from the `@figma-dsl/core` package entry point.

### Requirement 7: Bidirectional Sync — Changeset Support for New Node Types

**Objective:** As a developer, I want the bidirectional sync workflow to fully support new node types, so that designer edits to lines, polygons, stars, sections, and boolean operations in Figma can be tracked, exported as changesets, and applied back to React source code.

#### Acceptance Criteria

1. The Plugin serializer shall serialize LINE nodes including length, stroke, strokeCap, and rotation into the `PluginNodeDef` format, preserving round-trip fidelity when re-imported.
2. The Plugin serializer shall serialize POLYGON nodes including `pointCount`, fills, strokes, and corner radius into the `PluginNodeDef` format.
3. The Plugin serializer shall serialize STAR nodes including `pointCount`, `innerRadius`, fills, and strokes into the `PluginNodeDef` format.
4. The Plugin serializer shall serialize BOOLEAN_OPERATION nodes including `booleanOperation`, child nodes, and shape properties into the `PluginNodeDef` format.
5. The Plugin serializer shall serialize SECTION nodes including fills and `sectionContentsHidden` into the `PluginNodeDef` format.
6. When a designer modifies a new node type property (e.g., changes a polygon's `pointCount` or a star's `innerRadius`), the changeset export shall include a `PropertyChange` entry with the correct `propertyPath`, old value, and new value.
7. When a designer adds or removes a new node type within an imported component, the changeset export shall track the structural change with the full property snapshot of the added/removed node.
8. The changeset schema (`ChangesetDocument`) shall support property paths for all new node-type-specific properties (e.g., `"pointCount"`, `"innerRadius"`, `"booleanOperation"`, `"strokeCap"`, `"contentsHidden"`).

### Requirement 8: Bidirectional Sync — React/CSS Mapping for New Node Types

**Objective:** As a developer, I want changesets involving new node types to map to appropriate React and CSS representations, so that design changes flow correctly into component code.

#### Acceptance Criteria

1. The apply-changeset skill shall map LINE node changes to CSS `border-bottom` or `<hr>` elements in React, translating stroke color to `border-color`, stroke weight to `border-width`, and length to `width`.
2. The apply-changeset skill shall map POLYGON node changes to inline SVG `<polygon>` elements in React, computing vertex coordinates from `pointCount` and size, and mapping fills to SVG `fill` and strokes to SVG `stroke`/`stroke-width`.
3. The apply-changeset skill shall map STAR node changes to inline SVG `<polygon>` elements in React, computing star vertex coordinates from `pointCount`, `innerRadius`, and size.
4. The apply-changeset skill shall map BOOLEAN_OPERATION node changes to inline SVG elements using `<clipPath>` or composited `<path>` elements, preserving the boolean operation semantics (union, subtract, intersect, exclude).
5. When a changeset contains a SECTION node, the apply-changeset skill shall skip it with a note in the summary report, since sections are Figma canvas-level organization and have no React equivalent.
6. When a changeset modifies geometry-specific properties (`pointCount`, `innerRadius`, `booleanOperation`), the apply-changeset skill shall update the corresponding SVG attributes or regenerate vertex coordinates in the React component.
7. The apply-changeset skill shall produce a summary report entry for each new node type change, indicating whether the change was applied automatically or requires manual review.

### Requirement 9: Bidirectional Sync — Verification for New Node Types

**Objective:** As a developer, I want the visual verification loop to handle new node types, so that fidelity between DSL-rendered and React-rendered outputs can be validated after changeset application.

#### Acceptance Criteria

1. When the verify-changeset skill renders a complete DSL JSON export containing new node types, the Renderer shall produce a reference PNG that accurately represents LINE, POLYGON, STAR, BOOLEAN_OPERATION, and SECTION nodes.
2. When the verify-changeset skill captures a React component containing SVG elements generated from new node type mappings, the Capturer shall capture the SVG rendering at the same scale and viewport as the DSL reference render.
3. When the similarity score between DSL-rendered and React-rendered images falls below the threshold for components containing new node types, the verify-changeset skill shall identify which new node type elements are contributing to the visual difference.
4. The verify-changeset skill shall accept a configurable per-node-type similarity threshold, allowing lower thresholds for node types with known rendering fidelity gaps (e.g., boolean operations with anti-aliasing artifacts).

### Requirement 10: Validator Support for New Node Types

**Objective:** As a developer, I want the validator to recognize React patterns corresponding to new node types, so that components using SVG polygons, stars, lines, and boolean shapes pass DSL compatibility validation.

#### Acceptance Criteria

1. The Validator shall recognize inline SVG elements (`<svg>`, `<polygon>`, `<line>`, `<clipPath>`) as valid DSL-compatible patterns in React component files, and not flag them as incompatible.
2. The Validator shall accept CSS `border-bottom` patterns as valid representations of LINE nodes when checking layout compatibility.
3. When a React component uses non-DSL-compatible patterns for shapes that could be expressed as new node types (e.g., using a PNG image where a POLYGON would suffice), the Validator should emit an informational suggestion, not an error.

### Requirement 11: Rendering Fidelity and Calibration

**Objective:** As a pipeline maintainer, I want calibration test coverage for all new node types, so that rendering fidelity between the DSL renderer and Figma can be measured and maintained.

#### Acceptance Criteria

1. The test suite generator shall include calibration categories for each new node type: `line-shapes`, `polygon-star-shapes`, `boolean-operations`, and `section-layout`.
2. When the `calibrate` command is run, the Pipeline shall generate test DSL files for each new node type category, compile and render them, and include them in the calibration report.
3. The DSL shall include example files in `examples/` demonstrating each new node type with representative use cases (e.g., a divider line, a hexagonal badge, a 5-point star, a boolean-subtracted icon, a section grouping components).
4. When a new node type renders with a known fidelity gap (e.g., boolean operation anti-aliasing artifacts), the calibration report shall document the gap with an expected similarity threshold lower than the default.
5. The calibration suite shall include round-trip test cases that compile a DSL file, export to Figma JSON, serialize back via the plugin serializer, and compare the serialized output against the original DSL node tree.
