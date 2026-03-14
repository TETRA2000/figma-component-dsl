# Gap Analysis: figma-component-dsl

## Analysis Summary

- **Scope**: 12 requirement groups (DSL core, layout, colors, typography, components, rendering, capture, comparison, plugin, CLI, AI skill, component patterns) — 32 acceptance criteria across Requirements 1–12
- **Overall coverage**: ~75% of acceptance criteria are implemented; the core pipeline (DSL → compile → layout → render → compare) is functional with 97 passing tests
- **Critical gap**: The Figma plugin package (`@figma-dsl/plugin`) is largely a stub — the exporter produces PluginInput JSON, but the plugin shim has no logic to consume it and create real Figma nodes
- **Secondary gaps**: Input validation, `layoutGrow` in layout resolver, image asset handling, CLI `export` command, compiler error reporting for unresolved components/tokens, variant naming validation
- **Recommendation**: Hybrid approach — extend existing packages to fill gaps; the plugin requires substantial new implementation

---

## 1. Requirement-to-Asset Map

### Requirement 1: DSL as Figma Plugin API Code

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 1.1 Mirror Figma node creation methods | ✅ Implemented | `virtual-api.ts` | — |
| 1.2 Same property names/value types | ✅ Implemented | `types.ts` | — |
| 1.3 Built-in helpers (hexToRGB, solidPaint, etc.) | ✅ Implemented | `helpers.ts` | — |
| 1.4 Run in Figma plugin without translation | ❌ Missing | `plugin-shim.ts` | Plugin shim is stub-only; no real Figma API delegation |
| 1.5 Produce intermediate node tree with GUIDs | ✅ Implemented | `compiler.ts` | — |
| 1.6 FRAME with size/position/fills/strokes/cornerRadius/clipContent/opacity | ✅ Implemented | `types.ts`, `virtual-api.ts` | Per-corner `cornerRadii` not implemented (only uniform) |
| 1.7 TEXT with characters/font/lineHeight/letterSpacing/alignment/color | ✅ Implemented | `types.ts`, `virtual-api.ts` | — |
| 1.8 RECTANGLE with size/fills/strokes/cornerRadius/opacity | ✅ Implemented | `types.ts`, `virtual-api.ts` | — |
| 1.9 ELLIPSE with size/fills/opacity | ✅ Implemented | `types.ts`, `virtual-api.ts` | — |
| 1.10 GROUP for logical grouping | ✅ Implemented | `virtual-api.ts` | — |
| 1.11 appendChild() hierarchy | ✅ Implemented | `virtual-api.ts` | — |
| 1.12 visible property | ✅ Implemented | `types.ts` | — |

### Requirement 2: Auto Layout System

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 2.1 setAutoLayout() helper | ✅ Implemented | `helpers.ts` | — |
| 2.2 Direction HORIZONTAL/VERTICAL | ✅ Implemented | `helpers.ts` | — |
| 2.3 Item spacing (gap) | ✅ Implemented | `helpers.ts` | — |
| 2.4 Padding (uniform/padXY/per-side) | ✅ Implemented | `helpers.ts` | — |
| 2.5 Primary axis alignment (MIN/CENTER/MAX/SPACE_BETWEEN) | ✅ Implemented | `layout-resolver.ts` | — |
| 2.6 Counter axis alignment (MIN/CENTER/MAX) | ✅ Implemented | `layout-resolver.ts` | — |
| 2.7 Sizing behavior (FIXED/HUG/FILL) | ✅ Implemented | `layout-resolver.ts` | — |
| 2.7+ layoutGrow for flex-grow/spacer | ⚠️ Partial | `types.ts` (property defined) | Property exists on DslFrameNode but **never read** by LayoutResolver |

### Requirement 3: Color and Fill System

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 3.1 solidPaint(hex, opacity?) | ✅ Implemented | `helpers.ts` | — |
| 3.2 gradientPaint(stops, angle) | ✅ Implemented | `helpers.ts` | — |
| 3.3 hexToRGB() | ✅ Implemented | `helpers.ts` | No format validation on hex input |
| 3.4 Stroke definitions with color/weight/alignment | ⚠️ Partial | `types.ts` | `strokeAlign` (INSIDE/CENTER/OUTSIDE) missing from type |
| 3.5 Multiple fills ordering | ✅ Implemented | `types.ts` | — |
| 3.6 Reusable color tokens | ✅ Implemented | `helpers.ts` (defineTokens, tokenPaint) | — |

### Requirement 4: Typography System

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 4.1 fontFamily/fontWeight/fontStyle | ✅ Implemented | `types.ts` | fontStyle not explicit in type (minor) |
| 4.2 fontSize in pixels | ✅ Implemented | `types.ts` | — |
| 4.3 lineHeight (PERCENT/PIXELS) | ✅ Implemented | `types.ts` | — |
| 4.4 letterSpacing (PERCENT/PIXELS) | ✅ Implemented | `types.ts` | — |
| 4.5 textAlignHorizontal | ✅ Implemented | `types.ts` | — |
| 4.6 Rendered output reflects typography | ✅ Implemented | `renderer.ts` | — |

### Requirement 5: Component and Variant System

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 5.1 createComponent() | ✅ Implemented | `virtual-api.ts` | — |
| 5.2 addComponentProperty() | ✅ Implemented | `virtual-api.ts` | — |
| 5.3 combineAsVariants() with Key=Value naming | ⚠️ Partial | `virtual-api.ts` | No naming convention enforcement/validation |
| 5.4 createInstance() with overrides | ✅ Implemented | `virtual-api.ts` | — |
| 5.5 Correct variant naming in compiled output | ⚠️ Partial | `compiler.ts` | Compiler does not validate variant Key=Value naming |

### Requirement 6: DSL Rendering

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 6.1 Render node tree as PNG | ✅ Implemented | `renderer.ts` | — |
| 6.2 Visual fidelity (hierarchy/layout/colors/text) | ✅ Implemented | `renderer.ts` | — |
| 6.3 Image asset resolution | ❌ Missing | `renderer.ts` | `assetDir` option defined but no loading/rendering logic |
| 6.4 Error reporting with DSL location | ⚠️ Partial | — | Generic error propagation; no DSL source location mapping |

### Requirement 7: React Component Screenshot Capture

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 7.1 Headless browser screenshot | ✅ Implemented | `capturer.ts` | — |
| 7.2 Configurable viewport | ✅ Implemented | `capturer.ts` | — |
| 7.3 Element-level isolation | ✅ Implemented | `capturer.ts` | — |
| 7.4 Background matching DSL renderer | ✅ Implemented | `capturer.ts` | — |
| 7.x Module path capture (Vite) | ❌ Missing | `capturer.ts:25-29` | Throws "Module capture not yet implemented" |

### Requirement 8: Visual Comparison

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 8.1 Pixel-level diff | ✅ Implemented | `comparator.ts` | — |
| 8.2 Similarity score | ✅ Implemented | `comparator.ts` | — |
| 8.3 Configurable threshold | ✅ Implemented | `comparator.ts` | — |
| 8.4 Diff image output | ✅ Implemented | `comparator.ts` | — |

### Requirement 9: Figma Plugin — Direct DSL Execution

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 9.1 Execute DSL in plugin environment | ❌ Missing | `plugin-shim.ts` | Stub only; no JSON parsing or node creation logic |
| 9.2 Async font loading | ⚠️ Partial | `plugin-shim.ts:30-31` | Hardcoded to Inter/Regular; no dynamic loading |
| 9.3 Component properties via addComponentProperty | ❌ Missing | — | No plugin-side implementation |
| 9.4 combineAsVariants in plugin | ❌ Missing | — | Stub returns empty node |
| 9.5 Instance creation with overrides | ❌ Missing | — | No implementation |
| 9.6 Page placement | ❌ Missing | — | No implementation |
| 9.7 JSON output of component→ID mapping | ❌ Missing | — | No implementation |
| 9.8 Error handling via figma.notify | ❌ Missing | — | No implementation |

### Requirement 10: CLI Interface

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 10.1 compile command | ✅ Implemented | `cli/index.ts` | — |
| 10.2 render command | ✅ Implemented | `cli/index.ts` | — |
| 10.3 capture command | ✅ Implemented | `cli/index.ts` | — |
| 10.4 compare command | ✅ Implemented | `cli/index.ts` | — |
| 10.5 pipeline command | ✅ Implemented | `cli/index.ts` | — |
| 10.6 bundle command | ✅ Implemented | `cli/index.ts` | — |
| 10.7 Error reporting + exit codes | ✅ Implemented | `cli/index.ts` | — |
| 10.x export command | ❌ Missing | `cli/index.ts` | Exporter class exists but not wired to CLI |
| 10.x doctor: token sync validation | ⚠️ Partial | `cli/index.ts` | Checks font/Node.js but not token sync |

### Requirement 11: AI-Powered React-to-DSL Generation

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 11.1–11.10 AI Skill definition | ✅ Implemented | `.claude/skills/react-to-dsl/SKILL.md` | — |

### Requirement 12: Supported React Component Patterns

| Criterion | Status | Asset | Gap |
|-----------|--------|-------|-----|
| 12.1–12.24 Supported patterns | ✅ Documented | `SKILL.md` instructions | Coverage depends on AI execution quality |
| 12.25–12.32 Out-of-scope patterns | ✅ Documented | `SKILL.md` instructions | Properly flagged as TODO/fallback |

---

## 2. Implementation Approach Options

### Option A: Extend Existing Packages (Fill Gaps Incrementally)

**When**: The core pipeline works; most gaps are additions to existing modules.

**Changes required**:
- `layout-resolver.ts`: Add `layoutGrow` to FILL distribution logic (~20 lines)
- `types.ts`: Add `strokeAlign`, `cornerRadii` (per-corner) properties
- `virtual-api.ts`: Add hex validation in `hexToRGB()`, variant naming validation in `combineAsVariants()`
- `compiler.ts`: Add unresolved componentRef error reporting, token resolution pass, COMPONENT_SET naming validation
- `renderer.ts`: Add image asset loading via `loadImage()`
- `cli/index.ts`: Add `export` command case (~15 lines)
- `capturer.ts`: Implement module-path capture with embedded Vite server

**Trade-offs**:
- ✅ Minimal new files; incremental improvements
- ✅ Preserves existing test infrastructure
- ❌ Plugin package remains a stub — this option doesn't address Requirement 9

### Option B: New Plugin Implementation (Address Critical Gap)

**When**: Requirement 9 (Figma plugin execution) is a top priority.

**New components required**:
- `plugin/src/runner.ts`: PluginInput JSON parser + recursive node creator
- `plugin/src/node-factory.ts`: Figma API delegation for each node type
- `plugin/src/layout-applier.ts`: Auto-layout property application
- `plugin/src/component-builder.ts`: Component registration, variant combining, instance creation
- `plugin/src/error-reporter.ts`: Error collection + figma.notify output
- Plugin UI (HTML): Minimal paste-JSON interface

**Trade-offs**:
- ✅ Completes the end-to-end story (DSL → offline iteration → Figma export)
- ✅ Clean separation from existing offline pipeline
- ❌ Requires Figma plugin testing infrastructure (can't test without Figma sandbox)
- ❌ Largest scope addition

### Option C: Hybrid (Recommended)

**Phase 1 — Fill pipeline gaps** (extend existing):
- layoutGrow, strokeAlign, cornerRadii, hex validation
- Compiler error reporting (unresolved refs, token resolution)
- CLI export command
- Image asset handling in renderer

**Phase 2 — Plugin implementation** (new):
- Full Figma plugin runner with JSON consumption
- Node creation, property application, variant combining
- Error reporting

**Phase 3 — Capture enhancement** (new):
- Module-path capture with embedded Vite server
- Doctor command token sync validation

**Trade-offs**:
- ✅ Delivers incremental value at each phase
- ✅ Phase 1 improves fidelity for existing users immediately
- ✅ Phase 2 can be deferred if plugin execution is not urgent
- ❌ Requires coordinated phasing

---

## 3. Effort and Risk Assessment

| Area | Effort | Risk | Justification |
|------|--------|------|---------------|
| Pipeline gap fills (layoutGrow, validation, errors) | **S** (1–3 days) | **Low** | Extend established patterns, all within existing test infrastructure |
| Image asset handling | **S** (1–2 days) | **Low** | @napi-rs/canvas `loadImage()` is well-documented |
| CLI export command | **S** (<1 day) | **Low** | Exporter class exists; just wiring |
| Compiler error reporting | **S** (1–2 days) | **Low** | Error structure exists; add detection logic |
| Figma plugin runner | **L** (1–2 weeks) | **High** | Cannot test without Figma sandbox; unfamiliar API surface for automated testing |
| Module-path capture (Vite) | **M** (3–5 days) | **Medium** | Requires embedded Vite server lifecycle management |
| Doctor token sync | **S** (1 day) | **Low** | Parse tokens.css and compare to constants |

**Overall**: **M–L** effort, **Medium** risk (driven primarily by plugin implementation)

---

## 4. Detailed Gap Inventory

### Missing Capabilities

| # | Gap | Severity | Requirement |
|---|-----|----------|-------------|
| G1 | Plugin runner (JSON → Figma nodes) | **Critical** | Req 9.1–9.8 |
| G2 | Module-path capture (Vite server) | **Medium** | Req 7.x |
| G3 | Image asset loading in renderer | **Medium** | Req 6.3 |
| G4 | CLI export command | **Low** | Req 10.x |
| G5 | layoutGrow in layout resolver | **Medium** | Req 2.7 |
| G6 | strokeAlign property | **Low** | Req 3.4 |
| G7 | Per-corner cornerRadii | **Low** | Req 1.6 |
| G8 | Hex string validation | **Low** | Req 1.x |
| G9 | Compiler: unresolved componentRef errors | **Low** | Req 5.x |
| G10 | Compiler: circular reference detection | **Low** | Req 5.x |
| G11 | Compiler: color token resolution pass | **Low** | Req 3.5 |
| G12 | Variant naming validation (Key=Value) | **Low** | Req 5.3, 5.5 |
| G13 | Instance overriddenProperties in compiled output | **Low** | Req 5.4 |
| G14 | Doctor: token sync validation | **Low** | Req 10.x |

### Constraints

- **Figma plugin testing**: Cannot unit-test real Figma API calls outside the Figma sandbox; plugin code must be tested via integration testing within Figma or via mock-based unit tests
- **Module capture**: Requires managing a Vite dev server lifecycle; adds complexity and a startup latency penalty
- **Font loading**: Currently only Inter variable font; extending to multiple font files requires TextMeasurer and Renderer updates in parallel

### Research Needed (for Design Phase)

1. **Figma plugin sandbox testing strategy**: Evaluate mock-based testing vs. Figma plugin headless testing (if available)
2. **Vite server embedding**: Research programmatic Vite API (`createServer()`) for module-path capture
3. **Per-corner cornerRadii**: Verify @napi-rs/canvas support for per-corner radius (may need manual path construction)

---

## 5. Recommendations for Design Phase

1. **Preferred approach**: Option C (Hybrid) — fill pipeline gaps first (Phase 1), then implement plugin (Phase 2)
2. **Key decisions needed**:
   - Plugin testing strategy: mock-based vs. manual Figma verification
   - Module capture priority: defer if URL-based capture is sufficient for current workflows
   - Validation strictness: whether to enforce variant naming at creation time or compile time
3. **Research items to carry forward**:
   - Figma plugin sandbox constraints and testing approaches
   - Vite programmatic API for embedded server
   - @napi-rs/canvas per-corner radius capabilities
