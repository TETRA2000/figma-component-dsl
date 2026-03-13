# Gap Analysis: figma-component-dsl

## Analysis Summary

- **Overall status**: ~90% of requirements are fully implemented across 8 packages (7 TypeScript + 1 Python), with 293 passing tests (281 TS + 12 Python)
- **4 specific gaps identified**: per-corner cornerRadii not compiled/rendered, letterSpacing not processed through pipeline, pipeline CLI command is a stub, image asset resolution not implemented
- **Architecture is sound**: Monorepo with clean package boundaries, two-pass layout algorithm, cross-language JSON interchange, comprehensive test coverage
- **Recommendation**: Fix the 4 identified gaps (estimated S effort, Low risk) before marking the feature complete
- **No architectural changes needed**: All gaps are localized additions to existing code paths

---

## Requirement-to-Implementation Map

### Req 1: DSL Node Primitives — **MOSTLY COMPLETE**

| Acceptance Criteria | Status | Location |
|---|---|---|
| 1.1 FRAME nodes with size, fills, strokes, cornerRadius, clipContent, opacity | ✅ Implemented | `dsl-core/src/nodes.ts:24-52` |
| 1.2 TEXT nodes with characters, font, alignment, color | ✅ Implemented | `dsl-core/src/nodes.ts:54-72` |
| 1.3 RECTANGLE nodes | ✅ Implemented | `dsl-core/src/nodes.ts:74-93` |
| 1.4 ELLIPSE nodes | ✅ Implemented | `dsl-core/src/nodes.ts:95-112` |
| 1.5 GROUP nodes | ✅ Implemented | `dsl-core/src/nodes.ts:114-128` |
| 1.6 Hierarchical tree with GUIDs | ✅ Implemented | `compiler/src/compiler.ts:78` |
| 1.7 visible property | ✅ Implemented | `dsl-core/src/types.ts:106` |
| 1.1 (partial) Per-corner cornerRadii | ⚠️ **Gap** | Type exists (`types.ts:91-97`) but compiler only passes `cornerRadius` (not `cornerRadii`) and renderer only handles uniform radius |

**Gap detail — cornerRadii**: The `CornerRadii` type with `topLeft/topRight/bottomLeft/bottomRight` is defined and accepted by node factories, but:
- `compiler.ts:107` only emits `cornerRadius: node.cornerRadius` — does not emit the per-corner object
- `renderer.py:232` only reads `cornerRadius` — has no per-corner arc logic

### Req 2: Auto Layout System — **FULLY COMPLETE** ✅

All 6 acceptance criteria implemented. Two-pass layout resolver with correct HUG/FILL/FIXED semantics, SPACE_BETWEEN alignment, and layoutGrow support. Comprehensive test coverage in `layout-resolver.test.ts` (16 tests).

### Req 3: Color and Fill System — **FULLY COMPLETE** ✅

All 6 acceptance criteria implemented. hex(), solid(), gradient(), stroke(), defineTokens(), token() all working with proper validation and 14 tests in `colors.test.ts`.

### Req 4: Typography System — **MOSTLY COMPLETE**

| Acceptance Criteria | Status | Location |
|---|---|---|
| 4.1 Font family, weight, style | ✅ Implemented | `text-expander.ts:25-28` |
| 4.2 Font size in pixels | ✅ Implemented | `text-expander.ts:25` |
| 4.3 Line height (PERCENT/PIXELS) | ✅ Implemented | `text-expander.ts:32-40` |
| 4.4 Letter spacing (PERCENT/PIXELS) | ⚠️ **Gap** | Type defined in `types.ts:76` but not processed by `text-expander.ts` or rendered |
| 4.5 Text alignment | ✅ Implemented | `text-expander.ts:28` |
| 4.6 Rendered output reflects typography | ✅ Implemented | `renderer.py:131-192` |

**Gap detail — letterSpacing**: `TextStyle.letterSpacing` with `{ value, unit }` is defined and accepted, but:
- `text-expander.ts` doesn't extract or return letterSpacing in expanded text data
- `renderer.py` doesn't apply letterSpacing to rendered text
- `text-measurer.ts` doesn't account for letterSpacing in width calculations

### Req 5: Component and Variant System — **FULLY COMPLETE** ✅

All 5 acceptance criteria implemented. component(), componentSet(), instance() factories with property definitions, variant axes, Key=Value naming, and instance overrides. 8 tests in `components.test.ts`.

### Req 6: DSL Rendering — **MOSTLY COMPLETE**

| Acceptance Criteria | Status | Location |
|---|---|---|
| 6.1 Render DSL as PNG in one step | ✅ Implemented | `renderer.py:262-294` |
| 6.2 Visual fidelity (layout, colors, typography) | ✅ Implemented | Full PyCairo pipeline |
| 6.3 Image asset resolution | ⚠️ **Gap** | `RenderOptions.assets_dir` parameter exists but no asset loading logic |
| 6.4 Error reporting with DSL location | ✅ Implemented | `renderer.py:245-249` |

**Gap detail — image assets**: The `--assets` CLI flag and `assets_dir` option are plumbed through, but there's no code to resolve image paths, load images as Cairo surfaces, or render them into node bounds.

### Req 7: React Component Screenshot Capture — **FULLY COMPLETE** ✅

All 4 acceptance criteria implemented. `captureFromUrl()` with Playwright, viewport config, component isolation via selector, white/transparent background. `captureFromModule()` intentionally deferred (throws with helpful message).

### Req 8: Visual Comparison — **FULLY COMPLETE** ✅

All 4 acceptance criteria implemented. pixelmatch integration, similarity scoring, configurable thresholds, diff image output, dimension mismatch padding. 12 tests across 2 test files.

### Req 9: Figma Plugin — **FULLY COMPLETE** ✅

All 10 acceptance criteria implemented in `plugin.ts` (305 lines) and `exporter.ts` (237 lines). Node creation, auto-layout, fills/strokes, text with async font loading, component properties, variant combining, instances, page placement, node ID mapping, error handling with figma.notify().

### Req 10: CLI Interface — **MOSTLY COMPLETE**

| Acceptance Criteria | Status | Location |
|---|---|---|
| 10.1 Compile command | ✅ Implemented | `cli.ts:39-84` |
| 10.2 Render command | ✅ Implemented | `cli.ts:86-133` |
| 10.3 Capture command | ✅ Implemented | `cli.ts:135-165` |
| 10.4 Compare command | ✅ Implemented | `cli.ts:167-204` |
| 10.5 Pipeline command (full chain) | ⚠️ **Gap** | `cli.ts:247-251` — stub that prints error message |
| 10.6 Export command | ✅ Implemented | `cli.ts:206-245` |
| 10.7 Error handling with exit codes | ✅ Implemented | EXIT_SUCCESS=0, EXIT_PIPELINE_FAILURE=1, EXIT_RUNTIME_ERROR=2 |

**Gap detail — pipeline command**: The `pipelineCommand()` function is a stub:
```typescript
export async function pipelineCommand(args: string[]): Promise<number> {
  console.error('Pipeline command chains: compile → render → capture → compare');
  console.error('Use individual commands for now.');
  return EXIT_RUNTIME_ERROR;
}
```
Should orchestrate: compile → render → capture → compare, chaining outputs and stopping on first error.

---

## Implementation Approach

### Option A: Targeted Fixes (Recommended)

Fix the 4 identified gaps in existing code. No new files needed.

| Gap | Files to Modify | Change |
|---|---|---|
| Per-corner cornerRadii | `compiler.ts`, `renderer.py` | Pass `cornerRadii` in compiled node; add per-corner arc rendering |
| letterSpacing | `text-expander.ts`, `text-measurer.ts`, `renderer.py` | Extract/pass letterSpacing; apply in measurement and rendering |
| Pipeline command | `cli.ts` | Implement compile→render→capture→compare chain with temp files |
| Image assets | `renderer.py` | Add Cairo image surface loading and rendering in node bounds |

**Trade-offs**:
- ✅ Minimal scope, localized changes
- ✅ No architectural impact
- ✅ All gaps are in existing, well-tested code paths
- ❌ Image asset rendering may require additional test fixtures

### Option B: Enhanced Pipeline with Streaming

Extend the pipeline command to support streaming JSON between stages rather than temp files, and add progress reporting.

**Trade-offs**:
- ✅ Better developer experience for large pipelines
- ❌ Overengineered for current scope
- ❌ Adds complexity to what should be a simple fix

---

## Effort and Risk Assessment

| Gap | Effort | Risk | Justification |
|---|---|---|---|
| Per-corner cornerRadii | **S** (1 day) | Low | Extend existing rendering path, add 4-corner arc logic |
| letterSpacing | **S** (1 day) | Low | Add field passthrough in 3 locations |
| Pipeline command | **S** (1 day) | Low | Chain existing commands with temp file I/O |
| Image assets | **M** (2-3 days) | Medium | Cairo image surface API, path resolution, test fixtures needed |
| **Total** | **M** (3-5 days) | Low | All changes are additive to stable codebase |

---

## Recommendations for Next Steps

1. **Fix gaps** using Option A (targeted fixes) — estimated M effort, Low risk
2. **Priority order**: Pipeline command > letterSpacing > cornerRadii > image assets
   - Pipeline command blocks the end-to-end workflow (Req 10.5)
   - letterSpacing affects typography fidelity (Reqs 4.4, 4.6)
   - cornerRadii is cosmetic for most components (many use uniform radius)
   - Image assets are lowest priority (no current test definitions use images)
3. **No design phase changes needed** — all gaps are implementation-level, not architectural
4. **Research needed**: Cairo image surface loading patterns for the image asset gap

---

## Test Coverage Summary

| Package | Test File(s) | Test Count |
|---|---|---|
| dsl-core | workspace, nodes, colors, layout, components | 86 |
| compiler | compiler, text-measurer, layout-resolver, integration, components-dsl, sections-dsl | ~146 |
| comparator | comparator, visual-regression | 12 |
| exporter | exporter | 12 |
| capturer | capturer | 3 |
| plugin | plugin (type-level) | 2 |
| cli | cli | ~10 |
| renderer (Python) | test_renderer, test_package | 12 |
| **Total** | **17 TS + 2 Python files** | **~293** |
