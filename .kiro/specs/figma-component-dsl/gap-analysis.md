# Gap Analysis: figma-component-dsl

## Analysis Summary

- **Scope**: 10 requirements covering DSL definition → compilation → rendering → screenshot capture → visual comparison → Figma export → CLI orchestration. Currently at ~15% implementation (DslCore node primitives, colors, layout helpers complete; 4 out of 5 packages are stubs).
- **Key Challenge**: The **Compiler** (Yoga layout + text measurement + GUID assignment + component registry) is the critical bottleneck — every downstream stage depends on it. Two external WASM/native dependencies (`yoga-layout`, `opentype.js`) require integration research.
- **Architecture Fit**: The all-TypeScript monorepo with npm workspaces is already established. Package structure and dependency graph match the approved design exactly. No architectural changes needed.
- **Risk Concentration**: Rendering fidelity (Skia via @napi-rs/canvas matching Figma's output) and text measurement accuracy (opentype.js glyph metrics vs. Figma's built-in text engine) are the two highest-risk areas requiring empirical validation.
- **Recommendation**: Proceed with **Option B (New Components)** — all remaining work is greenfield implementation within the existing package structure. No existing code needs refactoring.

## Current State Investigation

### Implemented Assets

| Module | Files | LOC | Tests | Status |
|--------|-------|-----|-------|--------|
| Node types & factories | `dsl-core/src/nodes/types.ts`, `factories.ts` | 485 | 34 | Complete |
| Color system | `dsl-core/src/colors/index.ts` | 130 | 15 | Complete |
| Layout helpers | `dsl-core/src/nodes/layout.ts` | 26 | (covered in factories) | Complete |
| Barrel exports | `dsl-core/src/index.ts`, `nodes/index.ts` | 45 | — | Complete |
| **Total implemented** | 8 source files | **~686** | **49 passing** | |

### Stub Packages (0% implemented)

| Package | Status | Missing Dependencies |
|---------|--------|---------------------|
| `renderer` | Placeholder `index.ts` only | `@napi-rs/canvas` |
| `comparator` | Placeholder `index.ts` only | `playwright`, `pixelmatch`, `pngjs`, `sharp`, `vite` |
| `cli` | Placeholder `main.ts` only | None (uses Node.js `parseArgs`) |
| `figma-plugin` | Placeholder `code.ts` + `ui.html` | `@figma/plugin-typings` (installed) |
| `dsl-core/compiler/` | Empty directory | `yoga-layout`, `opentype.js` |

### Conventions Observed

- **Naming**: PascalCase interfaces, camelCase functions, `.test.ts` co-located with source
- **Layering**: Barrel exports at each level (`nodes/index.ts` → `src/index.ts`)
- **Immutability**: All `DslNode` properties are `readonly`; factory functions defensively copy arrays
- **Validation**: Construction-time validation (non-empty names, positive sizes, COMPONENT-only auto-layout)
- **Testing**: Vitest with `describe`/`it` blocks, co-located test files

### Integration Surfaces

- **DslNode → CompilerService**: The `DslNode` interface is the primary input contract. All 8 node types, fills, strokes, auto-layout, text styles, and component properties are fully typed.
- **CompiledNode → RendererService**: Contract defined in design.md (lines 421–463) but no types implemented yet.
- **CompiledNode → ExporterService**: Same contract, different consumer (generates PluginInput JSON).
- **PluginInput → FigmaPlugin**: Schema defined in design.md (lines 935–993).

## Requirements Feasibility Analysis

### Requirement-to-Asset Map

| Req | Summary | Implementation State | Gap |
|-----|---------|---------------------|-----|
| **1.1–1.7** | DSL Node Primitives | ✅ Complete — all node types, factories, hierarchy, visibility | None |
| **2.1–2.6** | Auto Layout System | ✅ Types defined — `AutoLayoutConfig`, `horizontal()`, `vertical()` | **Missing**: Yoga mapping and layout computation (Compiler) |
| **3.1–3.6** | Color & Fill System | ✅ Complete — `hex()`, `solid()`, `gradient()`, `stroke()`, `defineTokens()`, `token()` | **Missing**: Token resolution during compilation |
| **4.1–4.6** | Typography System | ✅ Types defined — `TextStyle` with all properties | **Missing**: Text measurement via opentype.js, font metric resolution |
| **5.1–5.5** | Component & Variant System | ✅ Types defined — `component()`, `componentSet()`, `instance()` factories | **Missing**: ComponentRegistry, instance resolution, variant naming validation |
| **6.1–6.4** | DSL Rendering | ❌ Not started | **Missing**: Entire RendererService (@napi-rs/canvas integration) |
| **7.1–7.4** | Screenshot Capture | ❌ Not started | **Missing**: Entire CaptureService (Playwright + Vite dev server) |
| **8.1–8.4** | Visual Comparison | ❌ Not started | **Missing**: Entire CompareService (pixelmatch integration) |
| **9.1–9.10** | Figma Plugin | ❌ Not started | **Missing**: ExporterService + PluginRunner (Figma API integration) |
| **10.1–10.7** | CLI Interface | ❌ Not started | **Missing**: Entire CLI (parseArgs, subcommands, pipeline orchestration) |

### Critical Gaps

1. **Compiler Pipeline** (blocks Req 1.6, 2.1–2.6, 3.5–3.6, 4.1–4.6, 5.1–5.5)
   - GUID assignment and parent reference generation
   - Color token resolution to concrete RGBA
   - Yoga WASM integration for flexbox layout
   - opentype.js integration for text measurement
   - ComponentRegistry for instance resolution
   - Transform matrix composition

2. **Renderer** (blocks Req 6.1–6.4)
   - @napi-rs/canvas (Skia) for rasterization
   - Font registration for text rendering
   - Fill/stroke/corner radius application
   - PNG output encoding

3. **External Dependencies Not Yet Installed**
   - `yoga-layout` 3.x — WASM flexbox engine
   - `opentype.js` 2.0+ — Font metric parser
   - `@napi-rs/canvas` 0.1.x — Skia canvas bindings
   - `playwright` 1.50+ — Browser automation
   - `pixelmatch` 6.0+ — Pixel comparison
   - `pngjs` 7.0+ — PNG codec
   - `sharp` 0.33+ — Image processing

### Complexity Signals

| Area | Complexity | Reason |
|------|-----------|--------|
| Yoga layout mapping | **Algorithmic** | Property mapping table is well-defined but edge cases (nested auto-layout, FILL sizing, spacers) require careful handling |
| Text measurement | **Integration** | opentype.js API for glyph advance widths + kerning; multi-line measurement with line-height computation |
| Skia rendering | **Integration + Fidelity** | Canvas API is straightforward but matching Figma's rendering exactly (gradient angles, text baseline, anti-aliasing) is empirical work |
| Playwright capture | **Integration** | Vite dev server API + browser automation; fresh context per capture; cleanup |
| Figma Plugin API | **External integration** | Runs in Figma sandbox; font loading async; combineAsVariants() behavior |

### Research Needed

- **Yoga WASM API**: Exact API surface for `yoga-layout` 3.x (differs from 2.x). Verify `gap` support, measure function registration, and WASM initialization.
- **opentype.js kerning**: GPOS/GSUB kerning accuracy for Inter font family. May need fallback to per-character advance widths.
- **@napi-rs/canvas gradient rendering**: Verify Figma gradient transform matrix can be directly applied to Canvas gradient coordinates.
- **Playwright Vite dev server mode**: `createServer()` API usage for ephemeral dev servers — startup time, cleanup, port management.

## Implementation Approach Options

### Option A: Extend Existing Components
**Not applicable** — the existing codebase only has DslCore node primitives. All remaining work is new functionality in new packages/modules.

### Option B: Create New Components ✅ Recommended
**Rationale**: The monorepo package structure is already established. Each remaining task maps to a well-defined module within an existing package directory.

| New Module | Package | Key Files to Create |
|------------|---------|-------------------|
| CompilerService | `dsl-core/src/compiler/` | `compiler.ts`, `guid.ts`, `token-resolver.ts`, `yoga-mapper.ts`, `text-measurer.ts`, `component-registry.ts` |
| RendererService | `renderer/src/` | `renderer.ts`, `shape-renderer.ts`, `text-renderer.ts`, `gradient-renderer.ts` |
| CaptureService | `comparator/src/` | `capturer.ts`, `vite-server.ts` |
| CompareService | `comparator/src/` | `comparator.ts`, `image-utils.ts` |
| ExporterService | `dsl-core/src/` or `cli/src/` | `exporter.ts` |
| PluginRunner | `figma-plugin/src/` | `code.ts` (replace stub), `node-creator.ts`, `property-handler.ts` |
| CliCommands | `cli/src/` | `main.ts` (replace stub), `commands/compile.ts`, `commands/render.ts`, etc. |

**Integration points**: All modules connect through the existing `DslNode` → `CompiledNode` → `PNG/JSON` data flow defined in the design.

**Trade-offs**:
- ✅ Clean separation of concerns — each module is independently testable
- ✅ Matches the approved design exactly
- ✅ No risk of bloating existing working code
- ❌ Substantial new code (~5,500–8,500 LOC estimated)
- ❌ Multiple external dependency integrations needed

### Option C: Hybrid Approach
**Not applicable** — there is no existing code to extend for the missing capabilities.

## Implementation Complexity & Risk

| Component | Effort | Risk | Justification |
|-----------|--------|------|---------------|
| Compiler (Tasks 4.1–4.4) | **L** (1–2 weeks) | **Medium** | Well-defined contracts but Yoga WASM + opentype.js integration is new; 3 worked examples in design help |
| Text Measurer (Task 5.1) | **M** (3–5 days) | **Medium** | opentype.js API is documented but kerning accuracy is uncertain |
| Yoga Mapper (Task 5.2) | **M** (3–5 days) | **Medium** | Property mapping table is explicit; edge cases in nested layout need validation |
| Renderer (Tasks 6.1–6.4) | **L** (1–2 weeks) | **High** | @napi-rs/canvas API is straightforward but visual fidelity matching Figma is empirical |
| Capturer (Task 7) | **M** (3–5 days) | **Medium** | Playwright is well-documented; Vite dev server API needs research |
| Comparator (Task 8) | **S** (1–3 days) | **Low** | pixelmatch is de facto standard; well-understood API |
| Exporter (Task 9.1) | **S** (1–3 days) | **Low** | JSON transformation; no external deps |
| Figma Plugin (Tasks 9.2–9.3) | **L** (1–2 weeks) | **High** | Figma sandbox constraints; async font loading; combineAsVariants() edge cases |
| CLI (Tasks 10.1–10.3) | **M** (3–5 days) | **Low** | Node.js parseArgs is simple; orchestration logic is straightforward |
| Test Definitions (Tasks 11.1–11.5) | **L** (1–2 weeks) | **Low** | High volume but each definition follows established patterns |
| **Overall** | **XL** (6–10 weeks) | **Medium** | Well-specified design reduces risk; external deps and fidelity are main unknowns |

## Recommendations for Design Phase

The design phase is already complete and approved. These recommendations apply to the **implementation phase**:

### Preferred Approach
**Option B — New Components** within the existing monorepo structure. Implement in dependency order:
1. Compiler → 2. Renderer → 3. Capturer/Comparator → 4. CLI → 5. Figma Plugin → 6. Test Definitions

### Key Decisions (Already Made in Design)
- All-TypeScript pipeline (no Python/PyCairo)
- Yoga WASM for layout (not CSS-in-JS)
- @napi-rs/canvas (Skia) for rendering (same engine as Figma)
- opentype.js for text measurement (same approach as Satori)

### Research Items to Carry Forward
1. `yoga-layout` 3.x WASM initialization and `gap` property support
2. opentype.js kerning accuracy for Inter font family
3. @napi-rs/canvas gradient transform matrix compatibility with Figma
4. Vite `createServer()` API for ephemeral dev servers in capture mode
5. Figma Plugin `combineAsVariants()` behavior with large variant sets

### Critical Path
```
DslCore types (✅ done) → Compiler → Renderer → CLI → E2E Tests
                                    ↘ Comparator (parallel) ↗
                       Figma Plugin (parallel, independent)
```

Tasks 4.2, 4.3, 4.4 and 5.1 are marked parallel in tasks.md. Tasks 7, 8 are also parallel and independent of the compiler-renderer path.
