# Gap Analysis: SVG Node Support

## 1. Current State Investigation

### Existing Architecture Summary

The DSL pipeline follows a strict package separation: `dsl-core` (types + constructors) → `compiler` (compile + layout) → `renderer` (PNG via @napi-rs/canvas) → `exporter` (Figma plugin JSON) → `plugin` (Figma API calls). Mode is threaded through the entire pipeline as `CompilerMode = 'standard' | 'banner'`.

### Relevant Existing Assets

| Asset | Location | Relevance |
|-------|----------|-----------|
| NodeType union | `dsl-core/src/types.ts:2-4` | Must add `'SVG'` |
| DslNode interface | `dsl-core/src/types.ts:152-208` | Must add SVG-specific fields |
| Node constructors | `dsl-core/src/nodes.ts` | Must add `svg()` factory |
| IMAGE node pattern | `dsl-core/src/nodes.ts:180-197` | Closest analog for SVG constructor |
| ImageProps interface | `dsl-core/src/types.ts:278-287` | Template for SvgProps |
| image-helpers.ts | `dsl-core/src/image-helpers.ts` | `isSupportedImageFormat()` explicitly rejects `.svg` |
| Compiler mapNodeType | `compiler/src/compiler.ts:19-43` | Must add SVG case |
| Compiler compileNode | `compiler/src/compiler.ts:195-447` | Must add SVG data passthrough |
| Compiler IMAGE handling | `compiler/src/compiler.ts:259-263` | Pattern for SVG compilation |
| Layout resolver | `compiler/src/layout-resolver.ts` | SVG treated as leaf node (like IMAGE) |
| Renderer switch | `renderer/src/renderer.ts:531-602` | Must add SVG case |
| IMAGE rendering | `renderer/src/renderer.ts:549-569` | Pattern for SVG rendering |
| Image loader | `renderer/src/image-loader.ts` | May need SVG-aware loading |
| Exporter IMAGE | `exporter/src/exporter.ts:142-151` | Pattern for SVG export |
| Plugin createNode | `plugin/src/code.ts:263-610` | Must add SVG case using `figma.createNodeFromSvg()` |
| Plugin data keys | `plugin/src/code.ts:28-29` | Identity tracking for sync |
| Changeset types | `dsl-core/src/changeset.ts` | Must extend for SVG-specific changes |
| Validator presets | `validator/src/presets.ts` | Must add SVG-aware rules |
| CompilerMode type | `compiler/src/types.ts:123` | Must add `'canvas'` |
| PluginInput mode | `dsl-core/src/plugin-types.ts:89` | Must add `'canvas'` |

### Conventions Observed

- **Node pattern**: Each node type has: type in union → props interface → factory function → compiler case → renderer case → exporter case → plugin case
- **Banner mode threading**: Mode detected in CLI, passed to compiler, layout resolver, exporter, and plugin as a string flag
- **Image loading**: Async preload into `ImageCache` map, renderer draws placeholder on miss
- **Plugin data**: `dsl-baseline` and `dsl-identity` keys for changeset tracking
- **Naming**: `'banner'` string literal appears in ~20 files across 7 packages

---

## 2. Requirements Feasibility Analysis

### Requirement-to-Asset Map

| Requirement | Technical Needs | Gap Status |
|-------------|----------------|------------|
| **Req 1: SVG Node Type** | NodeType union, SvgProps, svg() factory | **Missing** — straightforward addition following IMAGE pattern |
| **Req 2: SVG Rendering** | SVG → Canvas rasterization | **Missing + Research Needed** — @napi-rs/canvas does NOT natively render SVG strings. Need external library (resvg-js, sharp, or canvas SVG path) |
| **Req 3: Compilation & Layout** | Compiler SVG case, layout resolver leaf handling | **Missing** — straightforward following IMAGE pattern |
| **Req 4: Figma Plugin Export** | Exporter SVG case, plugin `figma.createNodeFromSvg()` | **Missing** — Figma API supports `createNodeFromSvg()` natively |
| **Req 5: Bidirectional Sync** | Plugin data tagging, changeset SVG diff, MCP relay | **Missing + Research Needed** — Figma `exportAsync({ format: 'SVG' })` can extract SVG from vector nodes, but round-trip fidelity is unknown |
| **Req 6: Mode Rename** | String literal changes across ~20 files | **Missing** — mechanical refactor, low risk |
| **Req 7: Validator Rules** | New rule functions, preset updates | **Missing** — follows existing rule pattern |

### Complexity Signals

- **Req 1, 3, 6, 7**: Standard pattern extension (CRUD-level)
- **Req 2**: Algorithmic — requires SVG rasterization library integration
- **Req 4**: External integration — Figma Plugin API (`createNodeFromSvg`)
- **Req 5**: Workflow integration — changeset schema extension + SVG extraction from Figma

### Research Needed

1. **SVG Rasterization Library**: Which library to use for SVG → Canvas/PNG in Node.js? Options:
   - `@resvg/resvg-js` — Rust-based, high fidelity, renders SVG to PNG buffer directly
   - `@napi-rs/canvas` `loadImage()` — may support SVG if passed as data URL or buffer (needs testing)
   - `sharp` — can convert SVG to PNG but adds a large dependency

2. **Figma SVG Round-Trip**: Can `figma.createNodeFromSvg()` + `node.exportAsync({ format: 'SVG' })` produce semantically equivalent SVG? What information is lost?

3. **SVG Content Hashing**: How to detect meaningful changes in SVG content vs. cosmetic reformatting (attribute order, whitespace)?

4. **Large SVG Performance**: What are reasonable size limits for inline SVG content in DSL files?

---

## 3. Implementation Approach Options

### Option A: Extend Existing Packages (Recommended)

Add SVG support by extending each existing package with a new case, following the IMAGE node pattern exactly.

**Files to modify per package:**

| Package | Files | Change Type |
|---------|-------|-------------|
| dsl-core | `types.ts`, `nodes.ts`, `index.ts` | Add SVG to NodeType, SvgProps interface, svg() factory |
| compiler | `types.ts`, `compiler.ts`, `layout-resolver.ts` | Add SVG case in mapNodeType, compileNode, leaf handling |
| renderer | `renderer.ts`, `image-loader.ts` | Add SVG case, SVG preloading/rasterization |
| exporter | `exporter.ts` | Add SVG case with content embedding |
| plugin | `code.ts` | Add SVG case using `figma.createNodeFromSvg()` |
| validator | New rule file, `presets.ts` | Add SVG validation rule |
| cli | `cli.ts` | Add `'canvas'` mode detection alongside `'banner'` |

**For mode rename** — update string literals and types across all packages.

**Trade-offs:**
- ✅ Follows established patterns exactly — minimal learning curve
- ✅ No new packages — keeps monorepo lean
- ✅ Leverages existing image loading, effects, and transform infrastructure
- ❌ Renderer needs new dependency for SVG rasterization
- ❌ Plugin SVG creation uses different Figma API than other node types

### Option B: New SVG-Specific Package

Create `packages/svg-handler/` with SVG parsing, validation, rasterization, and Figma conversion as a standalone module.

**Trade-offs:**
- ✅ Clean separation — SVG complexity isolated
- ✅ Independently testable SVG processing
- ❌ Over-engineered for the scope — SVG is just another node type
- ❌ Adds package coordination overhead
- ❌ Violates "single responsibility per existing package" — renderer already handles all rendering

### Option C: Hybrid — Extend Packages + Shared SVG Utilities

Extend existing packages (Option A) but extract SVG-specific utilities (parsing, rasterization, hashing) into a shared module within `dsl-core` or a new `packages/svg-utils/`.

**Trade-offs:**
- ✅ Keeps pipeline integration in existing packages
- ✅ Reusable SVG utilities across compiler, renderer, exporter
- ❌ Premature if SVG utilities are small enough to inline
- ❌ Extra package dependency chain

---

## 4. Implementation Complexity & Risk

**Effort: M (3–7 days)**
- Justification: Most work follows established IMAGE node patterns. The SVG rasterization library integration and Figma round-trip sync are the primary complexity drivers. Mode rename is mechanical but touches many files.

**Risk: Medium**
- Justification: SVG rasterization library choice is a known-unknown (need to verify @resvg/resvg-js compatibility with @napi-rs/canvas pipeline). Figma SVG round-trip fidelity for bidirectional sync is an unknown that could affect Req 5 scope. Core pipeline changes (Req 1, 3, 4, 6, 7) are low risk.

---

## 5. Recommendations for Design Phase

### Preferred Approach
**Option A (Extend Existing Packages)** — most aligned with project conventions. SVG is architecturally equivalent to IMAGE: a leaf node with external content, a bounding box, and visual properties.

### Key Design Decisions

1. **SVG rasterization library**: Evaluate `@resvg/resvg-js` as primary candidate (Rust-based, NAPI, high fidelity). Test if `@napi-rs/canvas` `loadImage()` can handle SVG data URLs as a simpler alternative.

2. **SVG content storage**: Inline string (`svgContent`) vs. file reference (`src`) vs. both. Requirements specify both — design should clarify precedence and resolution.

3. **Changeset granularity**: Should SVG changes be tracked as full content replacement or as property-level diffs? Full replacement is simpler and more reliable for vector data.

4. **Mode rename strategy**: Big-bang rename with deprecated alias vs. phased migration. Requirements specify deprecated alias — design should define the deprecation timeline.

### Research Items to Carry Forward

- [ ] Test `@resvg/resvg-js` integration with existing @napi-rs/canvas pipeline
- [ ] Test `@napi-rs/canvas` `loadImage()` with SVG data URLs
- [ ] Verify `figma.createNodeFromSvg()` API behavior and limitations
- [ ] Test `node.exportAsync({ format: 'SVG' })` round-trip fidelity
- [ ] Assess SVG content hashing strategies for changeset detection
