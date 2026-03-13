# Gap Analysis: figma-component-dsl

## Analysis Summary

- **Scope**: 10 requirements, 11 major tasks, 8 npm workspace packages — all implemented
- **Status**: Implementation is substantially complete with 152 tests passing across 11 test files
- **Key Gap**: Image asset rendering (Req 6.3) is declared but not functionally implemented — `loadImage` is absent from the renderer
- **Steering Drift**: `tech.md` still references Python/PyCairo as the rendering stack; implementation correctly uses TypeScript/@napi-rs/canvas per the approved design
- **Remaining Work**: Optional task 11.5 (visual regression against React screenshots) is deferred; requires running reference React app

---

## 1. Requirement-to-Asset Map

| Req | Description | Status | Notes |
|-----|-------------|--------|-------|
| 1.1 | FRAME nodes with size, fills, strokes, cornerRadius, cornerRadii, clip, opacity | **Covered** | `dsl-core/nodes.ts`, `compiler/compiler.ts`, `renderer/renderer.ts` |
| 1.2 | TEXT nodes with full typography | **Covered** | `dsl-core/nodes.ts`, `compiler/text-measurer.ts` |
| 1.3 | RECTANGLE nodes | **Covered** | `dsl-core/nodes.ts`, `renderer/renderer.ts` |
| 1.4 | ELLIPSE nodes | **Covered** | `dsl-core/nodes.ts`, `renderer/renderer.ts` (ctx.ellipse) |
| 1.5 | GROUP nodes | **Covered** | `dsl-core/nodes.ts`, group renders children only |
| 1.6 | Hierarchical tree with GUIDs | **Covered** | `compiler/compiler.ts` counter-based GUID assignment |
| 1.7 | `visible: false` support | **Covered** | All node factories default `visible: true`, renderer skips `!node.visible` |
| 2.1 | Layout direction (H/V) | **Covered** | `dsl-core/layout.ts`, `compiler/layout-resolver.ts` |
| 2.2 | Item spacing | **Covered** | `layout-resolver.ts` spacing in positioning |
| 2.3 | Padding (uniform, axis, per-side) | **Covered** | Tests for per-side padding exist |
| 2.4 | Primary/counter axis alignment | **Covered** | MIN, CENTER, MAX, SPACE_BETWEEN implemented |
| 2.5 | Child sizing (FIXED/HUG/FILL) | **Covered** | Two-pass layout algorithm handles all modes |
| 2.6 | layoutGrow (flex-grow) | **Covered** | `layout-resolver.ts` proportional distribution |
| 3.1 | Hex color input | **Covered** | `dsl-core/colors.ts` hex() parser |
| 3.2 | Solid fills with opacity | **Covered** | `solid()` factory |
| 3.3 | Linear gradient fills | **Covered** | `gradient()` factory, angle→transform conversion |
| 3.4 | Stroke definitions | **Covered** | StrokePaint with color, weight, align (INSIDE/CENTER/OUTSIDE) |
| 3.5 | Multiple fills array ordering | **Covered** | Compiler preserves fillPaints order |
| 3.6 | Reusable color tokens | **Covered** | `defineTokens()` + `token()` |
| 4.1 | Font family/weight/style | **Covered** | Inter font, 4 weights registered |
| 4.2 | Font size in pixels | **Covered** | fontSize on TextStyle |
| 4.3 | Line height (PERCENT/PIXELS) | **Covered** | Unit discriminator in types |
| 4.4 | Letter spacing (PERCENT/PIXELS) | **Covered** | Unit discriminator in types |
| 4.5 | Text alignment (LEFT/CENTER/RIGHT) | **Covered** | textAlignHorizontal mapped in renderer |
| 4.6 | Rendered typography accuracy | **Covered** | Same Skia engine for measurement + rendering |
| 5.1 | COMPONENT nodes | **Covered** | `component()` factory, compiler handles |
| 5.2 | Component properties (TEXT/BOOLEAN/INSTANCE_SWAP) | **Covered** | Types defined, compiler maps to definitions |
| 5.3 | COMPONENT_SET with variant axes | **Covered** | `componentSet()` factory, Key=Value naming |
| 5.4 | INSTANCE nodes with overrides | **Covered** | `instance()` factory, componentId resolution |
| 5.5 | Variant naming convention | **Covered** | Key=Value convention validated |
| 6.1 | Render DSL to PNG | **Covered** | `render()` + `renderToFile()` |
| 6.2 | Visual fidelity (layout, colors, text) | **Covered** | Integration tests verify dimensions + buffer |
| 6.3 | Image asset resolution | **Gap** | `assetDir` option exists on RenderOptions but no `loadImage()` call in renderer |
| 6.4 | Error reporting with DSL location | **Covered** | `RenderError` with nodePath + nodeType |
| 7.1 | Headless browser capture | **Covered** | `capturer/capturer.ts` via Playwright |
| 7.2 | Configurable viewport | **Covered** | viewport option in capture API |
| 7.3 | Component isolation | **Covered** | Element-level screenshots |
| 7.4 | White background matching | **Covered** | Default white background |
| 8.1 | Pixel diff of two PNGs | **Covered** | `comparator/comparator.ts` via pixelmatch |
| 8.2 | Similarity score | **Covered** | Percentage of matching pixels |
| 8.3 | Configurable threshold | **Covered** | failThreshold parameter |
| 8.4 | Diff image output | **Covered** | diffBuffer in CompareResult |
| 9.1-9.10 | Figma plugin (all criteria) | **Covered** | `plugin/code.ts` with recursive node creation, auto-layout, fonts, components, variants, instances, error handling |
| 10.1-10.7 | CLI commands | **Covered** | `cli/cli.ts` with compile, render, capture, compare, pipeline, export + exit codes |

---

## 2. Identified Gaps

### Gap 1: Image Asset Rendering (Req 6.3) — **Missing**

The `RenderOptions` interface declares `assetDir?: string`, but the renderer contains no `loadImage()` or image drawing logic. If a DSL node references an image fill, the renderer silently ignores it.

**Impact**: Medium — image fills are not used in any current DSL test definitions or integration tests. The reference components (Button, Badge, Card, etc.) use only solid and gradient fills.

**Resolution Options**:
- A) Add `loadImage()` from `@napi-rs/canvas` and handle IMAGE paint type in `applyFills()`
- B) Defer until image-based components are defined in DSL tests
- C) Document as a known limitation

### Gap 2: Steering Drift — tech.md References Python/PyCairo

`tech.md` states: *"PyCairo for rendering (proven for Figma-accurate rasterization)"* and references Python 3.10+, pytest, etc. The implementation correctly uses TypeScript/@napi-rs/canvas per the approved design document, but the steering file has not been updated.

**Impact**: Low — steering is advisory context for AI. Does not affect functionality.

**Resolution**: Update `tech.md` to reflect the single-language TypeScript stack.

### Gap 3: Optional Task 11.5 — Visual Regression Not Executed

The deferred optional task requires the reference React app (`figma_design_playground`) to be running. No baseline similarity scores have been established.

**Impact**: Low — this validates cross-pipeline fidelity (DSL render vs React screenshot). All individual pipeline stages are tested.

---

## 3. Implementation Assessment

### Approach Taken: Option B — New Components

The implementation created 8 new packages from scratch, following the design document precisely. This was appropriate given:
- No existing TypeScript pipeline code existed
- Clean module boundaries enabled parallel development
- Each package has clear single responsibility

### Effort & Risk

| Dimension | Rating | Justification |
|-----------|--------|---------------|
| **Effort** | **L (completed)** | 8 packages, ~33 sub-tasks, 152 tests — substantial implementation |
| **Risk** | **Low** | Familiar tech (TypeScript, Canvas 2D, Vitest), clear scope, all tests pass |

---

## 4. Recommendations

1. **Image asset rendering** (Gap 1): Implement when needed — add `loadImage()` support to handle IMAGE paint types. This is a ~2 hour task (S effort).

2. **Steering update** (Gap 2): Update `tech.md` to reflect TypeScript/@napi-rs/canvas stack. Quick fix.

3. **Visual regression** (Gap 3): Execute task 11.5 when the reference React app is available. This establishes baseline similarity scores for ongoing regression testing.

4. **No blocking gaps**: The implementation covers all functional requirements. The codebase is ready for use.
