# Research & Design Decisions — dsl-node-types

## Summary
- **Feature**: dsl-node-types
- **Discovery Scope**: Extension — adding 5 new node types to existing pipeline
- **Key Findings**:
  - SectionNode is fundamentally different from other node types — no strokes, no blend/opacity, no rotation, no GeometryMixin. Requires special handling throughout the pipeline.
  - StrokeCap in the Figma API has 8 values (NONE, ROUND, SQUARE, ARROW_LINES, ARROW_EQUILATERAL, DIAMOND_FILLED, TRIANGLE_FILLED, CIRCLE_FILLED), 3 more than originally specified.
  - Boolean operation creation requires pre-existing child nodes and a parent — `figma.union(nodes, parent)` pattern, not standalone `figma.createBooleanOperation()` (which is deprecated).

## Research Log

### Figma Plugin API Node Types
- **Context**: Need exact API contracts for all 5 new node types
- **Sources Consulted**: @figma/plugin-typings v1.123.0, Figma Plugin API docs
- **Findings**:
  - `figma.createLine()` → `LineNode` — width=100, height=0, black stroke by default
  - `figma.createSection()` → `SectionNode` — unique: `sectionContentsHidden`, `resizeWithoutConstraints()` only (no `resize()`)
  - `figma.createPolygon()` → `PolygonNode` — unique: `pointCount` (≥3), default 3 sides
  - `figma.createStar()` → `StarNode` — unique: `pointCount` (≥3), `innerRadius` (0–1), default 5 points
  - `figma.union/subtract/intersect/exclude(nodes, parent, index?)` → `BooleanOperationNode` — unique: `booleanOperation`, `expanded`
- **Implications**:
  - Plugin code for BOOLEAN_OPERATION must create child nodes first, then combine with `figma.union()` etc.
  - SectionNode has no `resize()` — must use `resizeWithoutConstraints()`
  - SectionNode has `MinimalFillsMixin` (fills only), not `GeometryMixin` (no strokes, strokeWeight, outlineStroke)

### SectionNode Limitations
- **Context**: SECTION has the most restricted API surface of all node types
- **Sources Consulted**: @figma/plugin-typings SectionNode interface, mixin analysis
- **Findings**:
  - No BlendMixin → no `opacity`, `blendMode`, `effects`, `isMask`
  - No LayoutMixin → no `resize()`, `layoutAlign`, `layoutGrow`, `layoutSizingHorizontal/Vertical`, `rotation`, `constraints`
  - No GeometryMixin → no `strokes`, `strokeWeight`, `strokeCap`, `strokeJoin`, `dashPattern`
  - No AutoLayoutMixin → cannot be an auto-layout container
  - Has OpaqueNodeMixin → `visible`, `locked`, `x`, `y`, `width` (readonly), `height` (readonly)
  - Has MinimalFillsMixin → `fills`, `fillStyleId` only
  - Has DevStatusMixin → `devStatus` (only settable on nodes directly under page/section)
- **Implications**:
  - Compiler must NOT assign opacity, rotation, strokes, or auto-layout to SECTION
  - DSL `section()` factory should not accept opacity, strokes, rotation, or layout sizing props
  - Layout resolver must position section children absolutely (no auto-layout fallback)

### StrokeCap Full Enum
- **Context**: Requirements listed 5 StrokeCap values; Figma API has 8
- **Sources Consulted**: @figma/plugin-typings StrokeCap type
- **Findings**:
  ```
  'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL'
  | 'DIAMOND_FILLED' | 'TRIANGLE_FILLED' | 'CIRCLE_FILLED'
  ```
- **Implications**: DSL should support all 8 values for forward compatibility, even if initial examples only use the common ones.

### Mixin Inheritance Map
- **Context**: Understanding which properties each new node type supports
- **Findings**:

  | Mixin | LINE | SECTION | POLYGON | STAR | BOOLEAN_OP |
  |-------|:----:|:-------:|:-------:|:----:|:----------:|
  | DefaultShapeMixin | Y | - | Y | Y | Y |
  | ChildrenMixin | - | Y | - | Y | - |
  | CornerMixin | - | - | Y | Y | Y |
  | ConstraintMixin | Y | - | Y | Y | - |
  | ContainerMixin | - | - | - | - | Y |
  | ComplexStrokesMixin | Y | - | Y | Y | Y |
  | AnnotationsMixin | Y | - | Y | Y | - |
  | AspectRatioLockMixin | - | Y | Y | Y | Y |
  | BlendMixin (via DefaultShape) | Y | - | Y | Y | Y |
  | GeometryMixin (via DefaultShape) | Y | - | Y | Y | Y |
  | LayoutMixin (via DefaultShape) | Y | - | Y | Y | Y |

- **Implications**: LINE, POLYGON, STAR, BOOLEAN_OPERATION share `DefaultShapeMixin` and can be handled uniformly for fills/strokes/opacity/rotation. SECTION is the outlier.

### Existing Pipeline Extension Points
- **Context**: Identify all files that need modification
- **Sources Consulted**: Codebase analysis via grep and file reading
- **Findings**:
  - `packages/dsl-core/src/types.ts` — NodeType union (line 2), DslNode interface (lines 88–123), StrokePaint (lines 35–39)
  - `packages/dsl-core/src/nodes.ts` — Factory functions follow `rectangle()` pattern: validate name, spread props, return DslNode
  - `packages/compiler/src/types.ts` — FigmaNodeType (lines 1–2), FigmaNodeDict (lines 33–79)
  - `packages/compiler/src/compiler.ts` — `mapNodeType()` switch (lines 18–34), `compileNode()` (lines 88–249)
  - `packages/compiler/src/layout-resolver.ts` — `measureNode()` (lines 47–184), `positionChildren()` (lines 186–336)
  - `packages/renderer/src/renderer.ts` — `renderNode()` switch dispatch (lines 178–203)
  - `packages/exporter/src/exporter.ts` — PluginNodeDef (lines 5–56), `convertToPluginNode()` (lines 64–143)
  - `packages/plugin/src/code.ts` — `createNode()` switch (lines 112–276), PluginNodeDef (lines 4–45)
  - `packages/plugin/src/serializer.ts` — `serializeNode()` for bidirectional export
  - `packages/validator/src/rules/dsl-compatible-layout.ts` — Layout compatibility checks
- **Implications**: All 10 files require modification. No new packages needed — all changes extend existing modules.

### Boolean Operation Creation Pattern
- **Context**: figma.createBooleanOperation() is deprecated; need to understand the replacement
- **Sources Consulted**: Figma Plugin API docs, @figma/plugin-typings
- **Findings**:
  - `figma.createBooleanOperation()` is deprecated — "empty boolean operation nodes can have surprising, unpredictable behavior"
  - Replacement: `figma.union(nodes, parent, index?)`, `figma.subtract(...)`, `figma.intersect(...)`, `figma.exclude(...)`
  - These methods require an array of pre-existing SceneNode objects and a parent container
  - The nodes are moved into the boolean operation (removed from previous parent)
  - Returns `BooleanOperationNode` with `booleanOperation` property
  - BooleanOperationNode auto-sizes to fit children (like GROUP)
- **Implications**:
  - Plugin must create child nodes first (in a temporary container), then combine with boolean operation
  - Cannot create empty boolean operation and add children later
  - Exporter must include full child node trees in the output

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Uniform extension | Add all 5 types to existing switch/dispatch patterns | Minimal architectural change, follows established patterns | More LOC in existing files | Aligns with existing pipeline architecture |
| Type-class dispatch | Replace switch statements with per-type handler modules | Better extensibility for future types | Over-engineering for 5 types, breaks existing patterns | Deferred to future refactoring if needed |

**Selected**: Uniform extension — follows the existing pattern exactly, keeping changes predictable.

## Design Decisions

### Decision: StrokeCap on StrokePaint vs DslNode
- **Context**: StrokeCap applies per-stroke in Figma but is conceptually a line-level property
- **Alternatives Considered**:
  1. Add `strokeCap` to `StrokePaint` interface
  2. Add `strokeCap` to `DslNode` as a top-level property
- **Selected Approach**: Add to `StrokePaint` — matches Figma's model where strokeCap is per-stroke, and enables future use on non-LINE nodes
- **Rationale**: Closer to Figma's data model; StrokePaint already has `align`, adding `strokeCap` is natural
- **Trade-offs**: Slightly more verbose for simple line definitions, but more correct

### Decision: Rotation on DslNode
- **Context**: Currently no `rotation` property on DslNode. Needed by LINE, POLYGON, STAR.
- **Alternatives Considered**:
  1. Add `rotation` to DslNode (available for all types)
  2. Add rotation only to new type props interfaces
- **Selected Approach**: Add to DslNode as optional property — rotation is a general transform that Figma supports on all DefaultShapeMixin nodes
- **Rationale**: Future-proofs for rotation on existing types (RECTANGLE, ELLIPSE, etc.); consistent with Figma's model
- **Trade-offs**: Slight API surface increase, but matches Figma's universal rotation support

### Decision: Boolean Operation Factory Signature
- **Context**: Need convenient API for boolean operations with validation
- **Alternatives Considered**:
  1. Single `booleanOperation(name, op, children, props)` function
  2. Four separate functions: `union()`, `subtract()`, `intersect()`, `exclude()`
- **Selected Approach**: Four separate functions — matches Figma Plugin API and reads more naturally
- **Rationale**: `union('icon', [circle, rect])` is clearer than `booleanOperation('icon', 'UNION', [circle, rect])`
- **Trade-offs**: More exports, but better DX and Figma API alignment

### Decision: React Mapping for Geometric Shapes
- **Context**: POLYGON, STAR, BOOLEAN_OPERATION need React/CSS equivalents for bidirectional sync
- **Alternatives Considered**:
  1. CSS `clip-path: polygon()` for all shapes
  2. Inline SVG elements
  3. Canvas-based rendering
- **Selected Approach**: Inline SVG — most faithful representation, supports fills, strokes, and complex shapes
- **Rationale**: SVG `<polygon>` maps directly to vertex-based shapes; SVG compositing handles boolean operations; CSS clip-path can't represent strokes
- **Trade-offs**: SVG is more verbose than CSS clip-path, but supports the full property set

## Risks & Mitigations
- **Risk**: Boolean operation rendering fidelity — canvas composite operations may produce anti-aliasing artifacts vs Figma's vector-based boolean math → **Mitigation**: Lower similarity threshold for boolean operation calibration tests; document known gaps
- **Risk**: SectionNode API asymmetry — SECTION lacks so many properties that it may cause type errors in generic pipeline code → **Mitigation**: Guard all SECTION-related code paths explicitly; skip unsupported properties
- **Risk**: Plugin boolean creation order — child nodes must exist before combining → **Mitigation**: Create children in temporary frame, then combine; remove temporary frame after

## References
- [Figma Plugin API Nodes](https://developers.figma.com/docs/plugins/api/nodes/) — Official node type reference
- [@figma/plugin-typings v1.123.0](https://github.com/figma/plugin-typings) — TypeScript definitions for all node interfaces and mixins
- `docs/pipeline-improvement-ideas.md` sections 2.1–2.5 — Original improvement proposals
- `.kiro/specs/bidirectional-sync/` — Bidirectional sync architecture and changeset types
