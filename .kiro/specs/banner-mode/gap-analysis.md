# Gap Analysis: Banner Mode

## 1. Current State Summary

The DSL pipeline is a well-structured TypeScript monorepo with clear package boundaries:

| Package | Role | Key Files |
|---------|------|-----------|
| `dsl-core` | Node types, builder API, bundled fonts | `types.ts`, `nodes.ts`, `colors.ts`, `layout.ts`, `patterns.ts` |
| `compiler` | Layout resolution, node compilation, validation | `compiler.ts`, `layout-resolver.ts`, `text-measurer.ts` |
| `renderer` | PNG rendering via @napi-rs/canvas | `renderer.ts`, `image-loader.ts` |
| `exporter` | Figma plugin JSON export | `exporter.ts` |
| `validator` | 11-rule system with severity presets | `validator.ts`, `presets.ts`, `rules/` |
| `cli` | 12-command CLI dispatcher | `cli.ts`, `batch-processor.ts` |

### Key Conventions
- **No mode system exists**: No per-file configuration, metadata exports, or mode flags anywhere in the pipeline
- **Default export only**: DSL files export a single root `DslNode`; CLI loads via `mod.default`
- **Auto-layout only**: All positioning goes through layout-resolver; absolute `x`/`y` on children only used for non-auto-layout contexts (currently underdeveloped)
- **Two bundled fonts**: Inter (4 weights) + Noto Sans JP (1 file, 9.5 MB); CJK auto-detected by regex
- **No effects support**: Shadows, blur, blend modes are explicitly unsupported; renderer logs warnings
- **Validation is React-centric**: 11 rules check three-file pattern, CSS Modules, barrel exports, etc.

---

## 2. Requirement-to-Asset Map

### Requirement 1: Banner Mode Flag and Pipeline Integration

| Need | Current State | Gap |
|------|--------------|-----|
| Per-file `mode: 'banner'` export | Only `default` export loaded (cli.ts line 40-48) | **Missing** — need named export detection |
| Mode propagation through pipeline | No mode concept in `CompilerOptions` or renderer | **Missing** — thread mode through compile → render → export |
| `"mode": "banner"` in compiled JSON | `CompileResult` has no mode field | **Missing** — extend `CompileResult` and `FigmaNodeDict` |
| CLI support without extra flags | CLI uses `parseArgs` for options | **Constraint** — auto-detect from file export preferred over `--mode` flag |

### Requirement 2: Absolute Positioning

| Need | Current State | Gap |
|------|--------------|-----|
| Children positioned by `x`/`y` without auto-layout | `layout-resolver.ts` only handles auto-layout; non-auto-layout children placed at (0,0) | **Partially exists** — `x`/`y` properties exist on `DslNode` but layout resolver ignores them for non-auto-layout frames |
| `rotation` property | `rotation` exists in `DslNode` and `FigmaNodeDict` types | **Partially exists** — type defined but renderer does not apply rotation transforms |
| Source-order z-stacking | Renderer paints children in tree order | **Exists** — natural behavior |

### Requirement 3: Extended Typography

| Need | Current State | Gap |
|------|--------------|-----|
| `textTransform` | Not in `TextStyle` interface | **Missing** |
| `textStroke` (outline) | Not supported | **Missing** — canvas supports `strokeText()` |
| `textShadow` | Not supported (effects unsupported) | **Missing** — canvas supports `shadowColor`/`shadowBlur` |
| Gradient text fills | `fills` on text nodes exist; renderer applies solid fills only to text | **Research Needed** — canvas clip + gradient fill technique |
| Text `opacity` | `opacity` exists on all nodes | **Exists** |

### Requirement 4: Japanese Font Support

| Need | Current State | Gap |
|------|--------------|-----|
| Noto Sans JP bundled | `NotoSansJP.ttf` bundled in `dsl-core/fonts/` | **Exists** |
| Explicit `fontFamily: 'Noto Sans JP'` | `chooseFontFamily()` auto-selects based on CJK regex | **Partially exists** — auto-detect works but explicit selection path not tested |
| Weight 100-900 support | Single `NotoSansJP.ttf` file (variable or single weight) | **Research Needed** — verify if bundled file is variable-weight or single-weight |
| Mixed Latin-Japanese rendering | CJK detection is per-node, not per-glyph | **Constraint** — current implementation uses single font per text node |

### Requirement 5: Local Font Loading

| Need | Current State | Gap |
|------|--------------|-----|
| `registerFont(path, options)` API | No user-facing font registration API | **Missing** — `GlobalFonts.registerFromPath()` exists in @napi-rs/canvas but not exposed to DSL authors |
| `.ttf`, `.otf`, `.woff2` support | @napi-rs/canvas handles `.ttf` and `.otf`; `.woff2` unknown | **Research Needed** — verify @napi-rs/canvas woff2 support |
| Relative path resolution with `--asset-dir` | `--asset-dir` exists for image paths in CLI | **Partially exists** — extend to cover font paths |
| Error on missing font file | No font validation exists | **Missing** |

### Requirement 6: Enhanced Visual Effects

| Need | Current State | Gap |
|------|--------------|-----|
| Drop shadow | Not supported; renderer warns | **Missing** — canvas supports `shadow*` context properties |
| Layer blur | Not supported | **Missing** — requires off-screen rendering + blur filter |
| Background blur | Not supported | **Missing** — complex: render behind, blur, composite |
| Blend modes | Not supported | **Missing** — canvas supports `globalCompositeOperation` |

### Requirement 7: Figma Export Compatibility

| Need | Current State | Gap |
|------|--------------|-----|
| Export absolute `x`/`y` | `convertToPluginNode()` exports position data | **Partially exists** — need to verify absolute position export path |
| Export `rotation` | `rotation` mapped in exporter | **Exists** |
| Export effects (shadow, blur, blendMode) | `FigmaNodeDict` has no effect properties | **Missing** — add to types and exporter |
| Export font family name | `fontFamily` exported in text nodes | **Exists** |

### Requirement 8: React Compatibility Exclusion

| Need | Current State | Gap |
|------|--------------|-----|
| Skip React validation rules | Validator preset system supports turning rules off | **Exists** — create `banner` preset |
| Skip `capture` for Banner Mode | `cmdCapture` has no mode awareness | **Missing** — add mode check |
| Allow `compare` without React screenshot | `cmdCompare` compares any two PNGs | **Exists** — no change needed |

---

## 3. Implementation Approach Options

### Option A: Extend Existing Components (Hybrid-Light)

**Strategy**: Add `mode` field to existing types and thread through existing functions. No new packages.

**Changes per package**:
- `dsl-core`: Add `mode` to types, add `registerFont()` to API, extend `TextStyle` with new properties
- `compiler`: Add `mode` to `CompilerOptions`, conditionally skip React validation, handle absolute positioning in `layout-resolver.ts`
- `renderer`: Add shadow/blur/blendMode rendering in `renderNode()`, add rotation transform, extend text rendering for stroke/shadow/gradient
- `exporter`: Add effects/mode to export format
- `validator`: Add `banner` preset
- `cli`: Detect mode from module exports, thread through pipeline

**Trade-offs**:
- ✅ Minimal new files; leverages existing architecture
- ✅ Faster development; fewer integration seams
- ❌ Renderer (~922 lines) and compiler grow significantly
- ❌ Mode conditionals scattered through codebase

### Option B: New Banner-Specific Modules

**Strategy**: Create `packages/banner-renderer/` and `packages/banner-compiler/` that extend base packages with Banner Mode features.

**Trade-offs**:
- ✅ Clean separation; standard mode untouched
- ✅ Easier to test Banner features in isolation
- ❌ Significant code duplication (renderer/compiler logic)
- ❌ Two parallel codepaths to maintain
- ❌ Breaks monorepo "single responsibility per package" convention

### Option C: Hybrid — Extend Core, New Effects Module (Recommended)

**Strategy**: Extend existing packages for mode detection, absolute positioning, and font registration. Extract effects (shadow, blur, blendMode) into a new `packages/effects/` utility that both renderer and exporter consume.

**Changes**:
- `dsl-core`: Extend types + API (same as Option A)
- `compiler`: Mode-aware layout resolution (extend existing)
- `renderer`: Import effects module; add rotation + text enhancements inline
- `packages/effects/` (new): Shadow, blur, blendMode canvas operations as composable functions
- `exporter`: Import effects module for Figma property mapping
- `validator`: New `banner` preset
- `cli`: Mode detection + threading (same as Option A)

**Trade-offs**:
- ✅ Effects logic reusable and testable in isolation
- ✅ Core packages grow moderately, not excessively
- ✅ Follows monorepo single-responsibility pattern
- ❌ One new package to create and maintain
- ❌ Slightly more integration work than Option A

---

## 4. Implementation Complexity & Risk

**Effort: L (1–2 weeks)**
Justification: Touches all pipeline packages (dsl-core, compiler, renderer, exporter, validator, cli). New canvas rendering techniques (shadow, blur, blend modes) require careful implementation. Font registration API is new surface area.

**Risk: Medium**
Justification:
- Canvas shadow/blur APIs are well-documented but background blur is complex (off-screen render + composite)
- @napi-rs/canvas compatibility with `.woff2` needs verification
- Noto Sans JP weight coverage needs verification (may need additional font files)
- Absolute positioning in layout resolver is partially implemented but untested
- Mode detection via named exports is a new pattern for the CLI loader

---

## 5. Research Items for Design Phase

1. **@napi-rs/canvas `.woff2` support** — Verify if `GlobalFonts.registerFromPath()` accepts woff2 format
2. **Noto Sans JP weight coverage** — Check if bundled `.ttf` is variable-weight; if not, identify additional weight files needed
3. **Canvas background blur technique** — Research off-screen rendering + Gaussian blur composition approach in @napi-rs/canvas
4. **Gradient text rendering** — Validate canvas clip-path + gradient fill approach for text nodes
5. **Mixed-script font fallback** — Determine if per-glyph font selection is feasible with @napi-rs/canvas or if per-run segmentation is needed

---

## 6. Recommendations for Design Phase

**Preferred approach**: Option C (Hybrid — extend core + new effects module)

**Key design decisions to make**:
1. Mode detection mechanism: named export (`export const mode = 'banner'`) vs. wrapper function (`bannerMode(node)`) vs. file extension (`.banner.dsl.ts`)
2. Effects module scope: shadow + blur + blendMode, or also include rotation/transform utilities
3. Font registration API surface: top-level `registerFont()` call vs. compiler option vs. CLI flag
4. How `layout-resolver.ts` handles mixed auto-layout + absolute-positioned children within the same frame
5. Whether Banner Mode should be a compiler-level concept (affects layout resolution) or renderer-level only (affects visual output)
