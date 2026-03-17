# Gap Analysis: Dev Mode Codegen Plugin

## 1. Current State Investigation

### Key Files & Modules

| Asset | Path | Relevance |
|-------|------|-----------|
| Plugin entry | `packages/plugin/src/code.ts` (~1400 lines) | Main plugin sandbox code; handles import, sync, edit tracking |
| Serializer | `packages/plugin/src/serializer.ts` | `serializeNode()` reads Figma nodes → `PluginNodeDef` — **directly reusable for DSL codegen** |
| Manifest | `packages/plugin/manifest.json` | Currently `editorType: ["figma"]` only; **no codegen or dev mode** |
| Code Connect generator | `packages/exporter/src/code-connect.ts` | `generateCodeConnect()` produces `.figma.tsx` content — **pattern for React codegen** |
| DSL builder API | `packages/dsl-core/src/nodes.ts` | 15+ node constructors (`frame`, `text`, `rect`, etc.) — **target syntax for DSL output** |
| Layout helpers | `packages/dsl-core/src/layout.ts` | `horizontal()`, `vertical()` — needed to map auto-layout to DSL syntax |
| Color API | `packages/dsl-core/src/colors.ts` | `hex()`, `solid()`, `gradient()`, `token()` — needed for fill/color output |
| Design tokens | `preview/src/components/tokens.css` | CSS custom properties for colors, spacing, typography, radius, shadows |
| Compiler types | `packages/compiler/src/types.ts` | `FigmaNodeDict` intermediate format |
| Plugin typings | `@figma/plugin-typings` | Already a dependency — includes `CodegenResult`, `codegen` event types |

### Conventions Observed

- **Plugin sandbox pattern**: Single `code.ts` entry point, esbuild → IIFE bundle, `figma.ui.postMessage` for communication
- **Serializer is extracted and tested**: `serializer.ts` with `SerializableNode` interface enables unit testing without Figma runtime
- **Plugin data for metadata**: `dsl-baseline`, `dsl-identity`, `dsl-canvas` keys used via `setPluginData`/`getPluginData`
- **Code Connect pattern**: `generateCodeConnect()` in exporter maps component props → `figma.string()`, `figma.boolean()`, `figma.enum()`, `figma.instance()`, `figma.slot()`

### Integration Surfaces

- `serializeNode()` already reads all node properties needed for codegen (fills, strokes, auto-layout, text, component properties)
- `PluginNodeDef` (from `@figma-dsl/core`) is the shared data model between serializer and exporter
- Plugin data keys `dsl-identity` and `dsl-baseline` store component metadata that codegen can read
- `figma.codegen.on("generate")` event is the Figma API entry point (from `@figma/plugin-typings`)

---

## 2. Requirements Feasibility Analysis

### Requirement-to-Asset Map

| Requirement | Existing Asset | Gap |
|-------------|---------------|-----|
| **R1: Manifest Config** | `manifest.json` exists | **Missing**: `"dev"` in editorType, `capabilities`, `codegenLanguages`, `codegenPreferences` |
| **R2: React Codegen** | `code-connect.ts` generates React snippets; `dsl-identity` plugin data stores component metadata | **Missing**: Figma node → React TSX conversion logic; structural inference for nodes without identity |
| **R3: CSS Module Codegen** | `serializeNode()` extracts visual properties; `tokens.css` defines token values | **Missing**: PluginNodeDef → CSS Module conversion; token value reverse-lookup map |
| **R4: DSL Codegen** | `serializeNode()` produces `PluginNodeDef`; DSL builder API defines target syntax | **Missing**: `PluginNodeDef` → DSL builder syntax formatter (the reverse of the compiler) |
| **R5: Preferences** | None | **Missing**: Preference definitions in manifest; preference-aware code formatting |
| **R6: Multi-Section** | `CodegenResult[]` API supports multiple entries natively | **Missing**: Logic to split output into sections |
| **R7: Performance** | `serializeNode()` is synchronous and fast | **Missing**: Depth-limited traversal; error boundary wrapper |

### Technical Needs

- **Data Models**: `PluginNodeDef` already sufficient; may need lightweight intermediate for CSS generation
- **APIs/Services**: `figma.codegen.on("generate")` event handler; `figma.codegen.preferences` access
- **UI**: None required inside `generate` callback (prohibited by Figma API)
- **Business Rules**: Token matching heuristic (color proximity matching against known token values)
- **Non-Functionals**: 3-second timeout constraint; depth-limited traversal for large trees

### Complexity Signals

- **R1 (Manifest)**: Trivial configuration change
- **R2 (React)**: Medium — structural inference from arbitrary nodes is the most complex part
- **R3 (CSS)**: Medium — requires reverse-mapping Figma properties to CSS, plus token matching
- **R4 (DSL)**: Medium — reverse of the compiler pipeline (PluginNodeDef → DSL builder calls)
- **R5 (Preferences)**: Simple — Figma's preference API handles persistence and change events
- **R6 (Multi-Section)**: Simple — splitting logic over existing code generation
- **R7 (Performance)**: Simple — adding depth guards and try/catch

### Research Needed

- **Figma Codegen API version requirements**: Verify `@figma/plugin-typings` version includes full codegen types (`CodegenResult`, `CodegenPreference`, `CodegenEvent`)
- **Code Connect retrieval in sandbox**: Investigate whether Code Connect bindings are accessible from the plugin sandbox (R2 AC2) — they may only exist in the `.figma.tsx` source files, not in Figma's runtime data

---

## 3. Implementation Approach Options

### Option A: Extend Existing `code.ts`

**Rationale**: Add the `figma.codegen.on("generate")` handler directly in `code.ts` alongside existing import/sync handlers.

- **Files to modify**: `code.ts` (add codegen handler), `manifest.json` (add dev/codegen config)
- **New files**: None; all codegen logic inline

**Trade-offs**:
- ✅ No new files; codegen can directly access existing state (`componentMap`, plugin data readers)
- ✅ Single esbuild bundle entry remains unchanged
- ❌ `code.ts` is already ~1400 lines — adding 3 generators (React, CSS, DSL) would push it to ~2000+ lines
- ❌ Violates single-responsibility; makes testing harder

### Option B: New Codegen Module(s)

**Rationale**: Create dedicated codegen modules alongside existing serializer pattern.

- **Files to create**:
  - `src/codegen.ts` — `generate` event handler + dispatcher
  - `src/codegen-react.ts` — React TSX generation
  - `src/codegen-css.ts` — CSS Module generation
  - `src/codegen-dsl.ts` — DSL builder syntax generation
- **Files to modify**: `code.ts` (register codegen handler), `manifest.json`

**Trade-offs**:
- ✅ Clean separation; each generator independently testable (following serializer pattern)
- ✅ `code.ts` stays manageable — only adds handler registration (~10 lines)
- ✅ Generators can share `SerializableNode` interface for testing
- ❌ More files to navigate
- ❌ Needs careful interface design for shared state (plugin data access, token map)

### Option C: Hybrid — Codegen Module + Inline Registration

**Rationale**: Single `src/codegen.ts` module containing all generators, registered from `code.ts`.

- **Files to create**: `src/codegen.ts` (all codegen logic)
- **Files to modify**: `code.ts` (register handler), `manifest.json`

**Trade-offs**:
- ✅ Simpler than Option B (fewer files)
- ✅ Keeps `code.ts` clean
- ❌ Single codegen file could still grow large (~500+ lines)
- ❌ Less granular testability than Option B

---

## 4. Implementation Complexity & Risk

**Effort: M (3–7 days)**
- Most codegen logic is straightforward property mapping
- `serializeNode()` already handles the hard part (reading Figma nodes)
- The reverse-formatting (PluginNodeDef → DSL syntax, → CSS, → React) is mechanical but requires careful formatting
- Token matching adds moderate complexity

**Risk: Medium**
- **Codegen API constraints**: 3-second timeout is tight for deep trees — needs depth limiting
- **Code Connect accessibility**: Uncertain whether Code Connect bindings are readable from plugin sandbox (may need to drop R2 AC2 or implement differently)
- **Token matching accuracy**: Reverse-mapping raw color values to token names requires proximity matching or exact lookup — may produce false positives
- **`@figma/plugin-typings` version**: Must verify codegen types are available in the installed version

---

## 5. Recommendations for Design Phase

### Preferred Approach: **Option B** (New Codegen Modules)

This follows the established pattern of `serializer.ts` — extracted, testable modules with typed interfaces. The plugin codebase is already large; keeping codegen separate preserves maintainability.

### Key Decisions for Design Phase

1. **Token reverse-lookup strategy**: Exact hex match vs. color proximity threshold
2. **React structural inference depth**: How deep to recurse for nodes without DSL identity
3. **Code Connect in R2 AC2**: Feasibility check — may need to store Code Connect data as plugin data during export, or remove this criterion
4. **DSL formatting style**: Compact single-line vs. formatted multi-line output

### Research Items to Carry Forward

- Verify `@figma/plugin-typings` includes `CodegenResult`, `CodegenPreference`, `figma.codegen` API
- Test whether `figma.codegen.preferences` persistence works across sessions
- Investigate Code Connect data accessibility from plugin sandbox
- Confirm `manifest.json` schema for `capabilities` and `codegenPreferences` fields
