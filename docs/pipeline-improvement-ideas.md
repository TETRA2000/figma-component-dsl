# Pipeline Improvement Ideas

Based on an audit of the [Figma Plugin API node set](https://developers.figma.com/docs/plugins/api/nodes/), this document captures gaps between the DSL pipeline and Figma's capabilities, organized into two areas: property coverage and node type expansion.

**Current DSL node types:** FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP, COMPONENT, COMPONENT_SET, INSTANCE, IMAGE

---

## 1. Property Coverage Expansion

Properties missing from existing node types. All additions would be optional fields — zero breaking changes to existing DSL files.

### 1.1 Effects (Drop Shadow, Inner Shadow, Blur)

**Priority:** Highest — nearly every production design uses shadows.

**Figma API:** `BlendMixin.effects` — array of `Effect` objects (`DropShadowEffect`, `InnerShadowEffect`, `BlurEffect`, `BackgroundBlurEffect`).

**DSL type to add:**
```typescript
interface Effect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  color?: RgbaColor;                    // shadows only
  offset?: { x: number; y: number };   // shadows only
  radius: number;                       // blur radius
  spread?: number;                      // shadow spread
  visible: boolean;
}
```

Add `effects?: Effect[]` to `DslNode` and all `*Props` interfaces.

**Helper functions:** `dropShadow()`, `innerShadow()`, `blur()` in a new `effects.ts` module.

**Pipeline impact:**

| Package | Change |
|---------|--------|
| `dsl-core` | Types + node factories + helpers |
| `compiler` | Convert DSL effects → Figma effects in `compileNode()` |
| `exporter` | Add `effects` field to `PluginNodeDef` |
| `plugin` | Apply `node.effects = [...]` via Plugin API |
| `renderer` | `ctx.shadowColor/shadowBlur/shadowOffsetX/Y` for drop shadows; offscreen canvas for inner shadows; `ctx.filter = 'blur()'` for blur |

**Rendering notes:** Inner shadows and background blur are significantly harder to render on Canvas 2D than drop shadows. May need to accept lower fidelity or use offscreen canvas compositing tricks.

---

### 1.2 Blend Modes

**Figma API:** `BlendMixin.blendMode` — 16 modes (NORMAL, MULTIPLY, SCREEN, OVERLAY, DARKEN, LIGHTEN, COLOR_DODGE, COLOR_BURN, HARD_LIGHT, SOFT_LIGHT, DIFFERENCE, EXCLUSION, HUE, SATURATION, COLOR, LUMINOSITY).

**DSL type to add:**
```typescript
type BlendMode = 'NORMAL' | 'MULTIPLY' | 'SCREEN' | 'OVERLAY' | 'DARKEN'
  | 'LIGHTEN' | 'COLOR_DODGE' | 'COLOR_BURN' | 'HARD_LIGHT' | 'SOFT_LIGHT'
  | 'DIFFERENCE' | 'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY';
```

Add `blendMode?: BlendMode` to `DslNode`.

**Pipeline impact:** Same 5-package pattern as effects. Renderer maps to `ctx.globalCompositeOperation`. Note: Canvas 2D supports most but not all Figma blend modes (HUE, SATURATION, COLOR, LUMINOSITY may not have direct equivalents).

---

### 1.3 Min/Max Size Constraints

**Figma API:** `LayoutMixin.minWidth`, `maxWidth`, `minHeight`, `maxHeight` — available on auto-layout children.

**DSL type to add:** `minWidth?: number`, `maxWidth?: number`, `minHeight?: number`, `maxHeight?: number` on `DslNode` and all `*Props`.

**Pipeline impact:**

| Package | Change |
|---------|--------|
| `dsl-core` | Type additions |
| `compiler/layout-resolver` | Clamp resolved sizes between min/max bounds in `measureNode()` |
| `exporter` | Pass through |
| `plugin` | Set `node.minWidth` etc. |
| `renderer` | No change — layout resolver handles it |

---

### 1.4 Layout Wrap

**Figma API:** `AutoLayoutMixin.layoutWrap` (`'NO_WRAP' | 'WRAP'`) and `counterAxisSpacing` (gap between wrapped rows/columns).

**DSL type to add:** `wrap?: 'NO_WRAP' | 'WRAP'` and `counterAxisSpacing?: number` on `AutoLayoutConfig`.

**Pipeline impact:** The main complexity is in `layout-resolver.ts` — children exceeding the primary axis available space must wrap to the next line, with `counterAxisSpacing` between lines. This is essentially a flexbox wrap algorithm.

---

### 1.5 Individual Stroke Weights

**Figma API:** `IndividualStrokesMixin` — `strokeTopWeight`, `strokeBottomWeight`, `strokeLeftWeight`, `strokeRightWeight` (available on FRAME, COMPONENT, COMPONENT_SET, INSTANCE, RECTANGLE).

**DSL type to add:** `strokeTopWeight?: number`, `strokeBottomWeight?: number`, `strokeLeftWeight?: number`, `strokeRightWeight?: number` on `DslNode`.

**Pipeline impact:** In renderer, draw per-side strokes as individual line segments instead of a uniform `ctx.lineWidth` + `ctx.strokeRect()`.

---

### 1.6 Corner Smoothing

**Figma API:** `CornerMixin.cornerSmoothing` — `number` (0 to 1, where ~0.6 produces iOS-style superellipse corners).

**DSL type to add:** `cornerSmoothing?: number` on `DslNode`.

**Pipeline impact:** Plugin sets `node.cornerSmoothing` directly. **Renderer limitation:** Canvas 2D `roundRect()` does not support superellipse curves — this would render as standard circular arcs. Document as a known fidelity gap.

---

### 1.7 Rotation

**Figma API:** `LayoutMixin.rotation` — degrees (counterclockwise).

**DSL type to add:** `rotation?: number` on `DslNode`.

**Pipeline impact:**
- `compiler` — incorporate rotation into the 3×3 transform matrix
- `renderer` — already applies transforms, so rotation flows through naturally
- `plugin` — set `node.rotation`
- `layout-resolver` — rotated nodes affect bounding box calculation (use axis-aligned bounding box of rotated rect)

---

### 1.8 Text Truncation

**Figma API:** `TextNode.textTruncation` (`'DISABLED' | 'ENDING'`) and `TextNode.maxLines` (integer).

**DSL type to add:** `textTruncation?: 'DISABLED' | 'ENDING'` and `maxLines?: number` on `TextStyle` / `DslNode`.

**Pipeline impact:** Renderer must measure text lines, truncate with ellipsis (`...`) when exceeding maxLines or bounding box. Plugin sets `node.textTruncation` and `node.maxLines`.

---

### 1.9 Masks

**Figma API:** `BlendMixin.isMask` — boolean. When true, the node acts as a mask for its siblings below it in the layer order.

**DSL type to add:** `isMask?: boolean` on `DslNode`.

**Pipeline impact:** Complex renderer change — requires compositing masked children through the mask shape. Plugin sets `node.isMask = true`. Likely a P2 item due to rendering complexity.

---

## 2. Node Type Expansion

Design-relevant Figma node types not currently in the DSL. For each, changes are needed across all 6 pipeline stages (types → nodes → compiler → renderer → exporter → plugin).

### 2.1 LINE

**Figma API:** `figma.createLine()` → `LineNode` (type `'LINE'`)

**Key properties:** `width` (length), `rotation` (angle), `height` (always 0), strokes (required to be visible), `strokeCap` (`'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL'`).

**DSL constructor:**
```typescript
function line(name: string, props: {
  length: number;
  strokes?: StrokePaint[];
  strokeCap?: 'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL';
  rotation?: number;
  opacity?: number;
}): DslNode
```

**Complexity:** Low — degenerate shape with stroke-only rendering. Renderer: `ctx.moveTo()` → `ctx.lineTo()` → `ctx.stroke()`.

---

### 2.2 SECTION

**Figma API:** `figma.createSection()` → `SectionNode` (type `'SECTION'`)

**Key properties:** `fills`, `fillStyleId`, `sectionContentsHidden`, `devStatus`. No auto-layout, no strokes, no effects, no blend modes, no corner radius, no clipping. Simpler than FRAME.

**DSL constructor:**
```typescript
function section(name: string, props: {
  size?: { x: number; y: number };
  fills?: Fill[];
  children?: DslNode[];
  contentsHidden?: boolean;
}): DslNode
```

**Complexity:** Low — container like FRAME but with fewer capabilities. Useful for organizing the canvas (e.g., grouping multiple component frames under a labeled section).

---

### 2.3 POLYGON

**Figma API:** `figma.createPolygon()` → `PolygonNode` (type `'POLYGON'`)

**Key properties:** `pointCount` (integer ≥ 3), plus all geometry/blend/layout mixins. A regular convex polygon.

**DSL constructor:**
```typescript
function polygon(name: string, props: {
  size?: { x: number; y: number };
  pointCount: number;          // 3 = triangle, 5 = pentagon, 6 = hexagon, ...
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  rotation?: number;
  opacity?: number;
}): DslNode
```

**Complexity:** Medium — renderer must calculate regular polygon vertices:
```
for i in 0..pointCount:
  angle = (2π * i / pointCount) - π/2
  x = cx + rx * cos(angle)
  y = cy + ry * sin(angle)
```

---

### 2.4 STAR

**Figma API:** `figma.createStar()` → `StarNode` (type `'STAR'`)

**Key properties:** `pointCount` (integer ≥ 3), `innerRadius` (0.0–1.0, controls spikiness; 1.0 = regular polygon). Plus all geometry/blend/layout mixins.

**DSL constructor:**
```typescript
function star(name: string, props: {
  size?: { x: number; y: number };
  pointCount: number;
  innerRadius?: number;        // 0–1, default 0.382 (golden ratio)
  fills?: Fill[];
  strokes?: StrokePaint[];
  rotation?: number;
  opacity?: number;
}): DslNode
```

**Complexity:** Medium — renderer alternates between outer and inner radius vertices:
```
for i in 0..pointCount*2:
  radius = (i % 2 === 0) ? outerRadius : innerRadius * outerRadius
  angle = (π * i / pointCount) - π/2
  x = cx + radius * cos(angle)
  y = cy + radius * sin(angle)
```

---

### 2.5 BOOLEAN_OPERATION

**Figma API:** `figma.union()`, `figma.subtract()`, `figma.intersect()`, `figma.exclude()` → `BooleanOperationNode` (type `'BOOLEAN_OPERATION'`)

**Key properties:** `booleanOperation` (`'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'`), `children` (the shapes being combined), `expanded` (whether the result shape is expanded/flattened). Auto-sizes to fit children like GROUP.

**DSL constructors:**
```typescript
function union(name: string, children: DslNode[], props?: ShapeProps): DslNode
function subtract(name: string, children: DslNode[], props?: ShapeProps): DslNode
function intersect(name: string, children: DslNode[], props?: ShapeProps): DslNode
function exclude(name: string, children: DslNode[], props?: ShapeProps): DslNode
```

**Complexity:** High — the rendering is the hard part.

**Renderer strategy** using Canvas 2D compositing:

| Operation | Canvas composite mode |
|-----------|----------------------|
| UNION | Draw all children normally (default compositing) |
| SUBTRACT | Draw first child, then `globalCompositeOperation = 'destination-out'` for subsequent children |
| INTERSECT | Draw first child, then `globalCompositeOperation = 'destination-in'` for subsequent children |
| EXCLUDE | Draw first child, then `globalCompositeOperation = 'xor'` for subsequent children |

Each boolean op renders to an offscreen canvas first, then composites the result onto the main canvas with the boolean op's own fills/strokes applied.

**Known limitation:** Canvas 2D boolean operations on anti-aliased edges will have slight fringing artifacts compared to Figma's vector math approach.

---

### 2.6 TABLE / TABLE_CELL (Deferred)

**Figma API:** `figma.createTable()` → `TableNode` with `TableCellNode` children.

**Why deferred:** Newer Figma feature, less commonly used in component design. Tables can be approximated with nested auto-layout frames. Consider adding in a future phase if demand arises.

---

### 2.7 VECTOR (Excluded)

**Figma API:** `VectorNode` with full `vectorNetwork` (vertices, segments, regions) and `vectorPaths`.

**Why excluded:** The DSL is a declarative, code-first API. Vector paths require pen-tool-level path editing which doesn't fit the DSL's ergonomics. Vectors can be represented as IMAGE nodes (rasterized) or approximated with combinations of shapes + boolean operations.

---

## Summary: Priority Matrix

| Item | Priority | Complexity | Impact |
|------|----------|-----------|--------|
| Effects (shadows, blur) | P0 | Medium | Very High — used in ~90% of designs |
| Blend modes | P0 | Low | Medium — used in layered designs |
| Min/max constraints | P0 | Low | High — essential for responsive layouts |
| Layout wrap | P0 | Medium | High — needed for tag lists, grids |
| Rotation | P0 | Low | Medium — used in decorative elements |
| Text truncation | P0 | Low | High — common in card/list components |
| Individual stroke weights | P1 | Low | Medium — used in table-like borders |
| Corner smoothing | P1 | Trivial | Low — iOS aesthetic preference |
| Masks | P2 | High | Medium — advanced compositing |
| LINE | P1 | Low | Medium — dividers, separators |
| SECTION | P1 | Low | Low — canvas organization |
| POLYGON | P1 | Medium | Medium — decorative shapes |
| STAR | P1 | Medium | Low — decorative shapes |
| BOOLEAN_OPERATION | P1 | High | Medium — complex icons/logos |
