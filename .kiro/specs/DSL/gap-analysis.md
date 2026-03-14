# Gap Analysis: DSL Image Support Enhancement

## 1. Current State Investigation

### Key Files and Modules

| Package | File | Lines | Role |
|---------|------|-------|------|
| `dsl-core` | `src/types.ts` | NodeType union, Fill discriminated union, DslNode interface | Core type system |
| `dsl-core` | `src/nodes.ts` | 8 builder functions (frame, text, rectangle, ellipse, group, component, componentSet, instance) | DSL API |
| `dsl-core` | `src/colors.ts` | Fill builders: `solid()`, `gradient()`, `radialGradient()`, `hex()`, `defineTokens()`, `token()` | Fill API |
| `dsl-core` | `src/plugin-types.ts` | `PluginNodeDef`, `PluginInput` interfaces | Figma plugin format |
| `dsl-core` | `src/diff.ts` | `diffNodes()`, `diffValues()` with epsilon tolerances | Changeset diffing |
| `dsl-core` | `src/changeset.ts` | `ChangesetDocument`, `PropertyChange`, `ComponentChangeEntry` types | Changeset schema |
| `compiler` | `src/compiler.ts` | `compileWithLayout()`, `compileNode()`, `mapNodeType()`, `convertFill()` | DSL → intermediate JSON |
| `compiler` | `src/types.ts` | `FigmaNodeDict`, `FigmaNodeType`, `FigmaPaint` | Compiled output types |
| `renderer` | `src/renderer.ts` | `renderNode()`, `applyFills()`, `RenderOptions` (with unused `assetDir`) | JSON → PNG |
| `exporter` | `src/exporter.ts` | `convertToPluginNode()`, `generatePluginInput()` | JSON → Figma plugin JSON |
| `plugin` | `src/code.ts` | 814 lines: import, serialize, baseline, changeset, edit tracking | Figma plugin |
| `validator` | `src/rules/` | 10 validation rules for React components | DSL compatibility |
| `cli` | `src/cli.ts` | 859 lines: 12 commands, no `--asset-dir` option | CLI orchestration |

### Architecture Patterns

- **Builder pattern**: All node factories (`frame()`, `rectangle()`) follow validate → create → spread defaults
- **Fill discriminated union**: `Fill = SolidFill | GradientFill | RadialGradientFill` (no IMAGE type)
- **Pipeline stages**: Each stage transforms types — DslNode → FigmaNodeDict → PluginNodeDef → Figma nodes
- **Synchronous rendering**: `@napi-rs/canvas` rendering is synchronous; `loadImage()` from the same library is async
- **Epsilon-based diffing**: Float comparisons use `COLOR_EPSILON`, `SIZE_EPSILON` tolerances
- **Plugin data storage**: Baselines stored as JSON in Figma plugin data, 100KB limit per entry

### Integration Surfaces

- **Fill system**: `fills: Fill[]` on DslNode → `fillPaints: FigmaPaint[]` on FigmaNodeDict → `fills` on PluginNodeDef → Figma `Paint[]`
- **Changeset flow**: `serializeNode()` → `diffNodes(baseline, current)` → `ChangesetDocument` → apply-changeset skill
- **CLI path resolution**: `resolve()` from cwd, `pathToFileURL()` for dynamic imports

---

## 2. Requirements-to-Asset Map

### Requirement 1: DSL Image Node API
| Need | Status | Gap |
|------|--------|-----|
| `IMAGE` in NodeType union | **Missing** | Must add to `dsl-core/src/types.ts` |
| `image()` builder function | **Missing** | Must add to `dsl-core/src/nodes.ts` |
| `src` option (path/URL) | **Missing** | New field on DslNode: `imageSrc?: string` |
| `fit` option (FILL/FIT/CROP/TILE) | **Missing** | New field on DslNode: `imageScaleMode?: string` |
| Export from index.ts | **Missing** | Already auto-exported via `export * from './nodes.js'` — no change needed |

### Requirement 2: Image Fill on Existing Nodes
| Need | Status | Gap |
|------|--------|-----|
| `ImageFill` in Fill union | **Missing** | Must extend `Fill` discriminated union in `types.ts` |
| `imageFill()` builder | **Missing** | Must add to `colors.ts` |
| Image fill layering | **Existing pattern** | Fill array ordering already works for layering |

### Requirement 3: Compiler Image Handling
| Need | Status | Gap |
|------|--------|-----|
| `IMAGE` in FigmaNodeType | **Missing** | `VECTOR` exists but `IMAGE` does not in `compiler/src/types.ts` |
| `IMAGE` in FigmaPaint type | **Missing** | Only SOLID, GRADIENT_LINEAR, GRADIENT_RADIAL |
| Image metadata in FigmaNodeDict | **Missing** | Need `imageSrc`, `imageScaleMode` fields |
| `convertFill()` IMAGE case | **Missing** | Must extend switch statement |
| `mapNodeType()` IMAGE case | **Missing** | Must extend switch/mapping |
| Layout measurement for IMAGE | **Existing pattern** | IMAGE nodes use declared `size` like RECTANGLE/ELLIPSE — minimal change |

### Requirement 4: Renderer Image Drawing
| Need | Status | Gap |
|------|--------|-----|
| `assetDir` in RenderOptions | **Existing** | Declared but **unused** — wiring needed |
| `loadImage()` from @napi-rs/canvas | **Research Needed** | Available in library; is it async-only or sync-compatible? |
| IMAGE case in renderNode() switch | **Missing** | Must add case alongside RECTANGLE, ELLIPSE |
| Scale mode rendering (FILL/FIT/CROP/TILE) | **Missing** | Requires sizing/clipping math |
| cornerRadius clipping on images | **Existing pattern** | Already done for ROUNDED_RECTANGLE — reusable |
| Placeholder on load failure | **Missing** | Need crosshatch/stripe drawing utility |
| URL fetching + caching | **Missing** | Need HTTP fetch with session-level cache |
| Batch image reuse | **Missing** | Need image cache keyed by source path/URL |

### Requirement 5: Exporter Image Encoding
| Need | Status | Gap |
|------|--------|-----|
| Base64 image embedding | **Missing** | Must read image file and encode to base64 |
| Image metadata in PluginNodeDef | **Missing** | Need `imageData`, `imageScaleMode`, `imageDimensions` fields |
| 4 MB size limit | **Missing** | Size check + warning logic |
| Graceful error on load failure | **Missing** | Error marker pattern |

### Requirement 6: Figma Plugin Image Import
| Need | Status | Gap |
|------|--------|-----|
| `figma.createImage()` | **Missing** | Not used anywhere in plugin code |
| Image fill application | **Missing** | `toFigmaPaints()` doesn't handle IMAGE type |
| scaleMode mapping | **Missing** | Map DSL scale mode → Figma `ImagePaint.scaleMode` |
| cornerRadius on image nodes | **Existing** | Plugin already sets `cornerRadius` on all node types |

### Requirement 7: CLI Asset Resolution
| Need | Status | Gap |
|------|--------|-----|
| `--asset-dir` CLI option | **Missing** | Not in parseArgs; `assetDir` in RenderOptions is unused |
| Relative path resolution from DSL source | **Missing** | CLI currently resolves from cwd |
| Per-file resolution in batch mode | **Missing** | Batch processor uses uniform options |

### Requirement 8: Image Format and Validation
| Need | Status | Gap |
|------|--------|-----|
| Image validation rule | **Missing** | No image-related rule in validator's 10 rules |
| Format checking (PNG/JPEG/WebP) | **Missing** | Need file extension + magic byte check |
| URL syntax validation | **Missing** | Simple URL.parse() check |
| File size warning (>10 MB) | **Missing** | Need stat check |

### Requirement 9: Bidirectional Image Sync
| Need | Status | Gap |
|------|--------|-----|
| Image fills in baseline snapshot | **Missing** | `serializeFills()` skips IMAGE paints |
| Image change detection | **Missing** | Edit log doesn't track image hash changes |
| `figma.getImageByHash()` for export | **Missing** | Not used in plugin |
| Image data in changeset JSON | **Missing** | `ChangesetDocument` has no image payload field |
| Changeset application for images | **Missing** | apply-changeset skill has no image property mapping |
| Scale mode change tracking | **Missing** | `PROPS_TO_COMPARE` in diff.ts doesn't include image properties |

---

## 3. Implementation Approach Options

### Option A: Extend Existing Components (Recommended)

Add image support by extending existing types, functions, and switch statements across all packages.

**Changes per package:**

| Package | Files Modified | Nature of Change |
|---------|---------------|-----------------|
| `dsl-core` | `types.ts`, `nodes.ts`, `colors.ts`, `plugin-types.ts`, `diff.ts` | Add IMAGE to unions, new builders, new fields |
| `compiler` | `types.ts`, `compiler.ts` | Add IMAGE cases to mapNodeType, convertFill |
| `renderer` | `renderer.ts` | Add IMAGE rendering with loadImage, scale modes |
| `exporter` | `exporter.ts` | Add base64 encoding, image metadata mapping |
| `plugin` | `code.ts` | Add createImage, serializeFills IMAGE case, changeset image data |
| `validator` | `rules/image-validation.ts` | New rule file (only new file needed) |
| `cli` | `cli.ts` | Add `--asset-dir` option, pass to renderer |

**Trade-offs:**
- ✅ Follows established pipeline architecture perfectly
- ✅ Each change is small and localized within its package
- ✅ No new packages or architectural concepts
- ✅ Image nodes and fills integrate naturally with existing auto-layout, opacity, clipping
- ❌ Touches many files across many packages (wide but shallow)
- ❌ Renderer becomes async (loadImage is async in @napi-rs/canvas)

### Option B: New Image Asset Package

Create a new `@figma-dsl/image-assets` package responsible for all image loading, caching, format validation, and base64 encoding.

**New package responsibilities:**
- Image loading (local files + URL fetching)
- Format detection and validation
- Base64 encoding/decoding
- Session-level caching
- Scale mode calculations (FILL/FIT/CROP/TILE)

**Trade-offs:**
- ✅ Clean separation of image concerns
- ✅ Reusable across renderer, exporter, and CLI
- ✅ Easier to test image logic in isolation
- ❌ Introduces a new package and dependency between packages
- ❌ Overkill for what is primarily a data-flow concern
- ❌ More files to navigate for a conceptually simple feature

### Option C: Hybrid Approach

Extend existing packages for type definitions and pipeline integration (Option A), but extract image loading/caching utilities into a shared module within `dsl-core`.

**Structure:**
- `dsl-core/src/image-utils.ts` — shared loading, caching, format validation, scale math
- All other packages extend their existing files, importing from `image-utils`

**Trade-offs:**
- ✅ Keeps pipeline integration in existing files
- ✅ Shared image utilities avoid duplication between renderer and exporter
- ✅ No new npm package, just one new module
- ❌ Slightly more complex than pure Option A

---

## 4. Research Needed (for Design Phase)

1. **@napi-rs/canvas `loadImage()` behavior**: Is it async-only? Can the renderer remain synchronous by pre-loading all images before rendering? What formats does it support natively?
2. **Figma Plugin API `createImage()` + `getImageByHash()`**: Exact API signatures, size limits, supported formats, and whether base64 or Uint8Array is required
3. **Plugin data size limits**: Baseline snapshots with embedded image data may exceed the 100KB `PLUGIN_DATA_SIZE_LIMIT` — need strategy (hash references vs. embedded data)
4. **URL image fetching**: Use Node's native `fetch()` (Node 22+) or `@napi-rs/canvas` `loadImage(url)` directly? Caching strategy for batch operations.
5. **Scale mode math**: Exact algorithms for FILL (cover), FIT (contain), CROP (centered crop), TILE (repeat) — particularly for non-square images in non-square frames

---

## 5. Implementation Complexity & Risk

**Effort: L (1–2 weeks)**
Justification: 9 requirements across 7+ packages, each requiring type changes, logic additions, and tests. The renderer async migration and Figma plugin image APIs add integration complexity.

**Risk: Medium**
Justification: All changes extend established patterns (new node type, new fill type, new switch cases). The main unknowns are @napi-rs/canvas async image loading and Figma plugin image API behavior, both of which are well-documented libraries. No architectural shifts required.

---

## 6. Recommendations for Design Phase

### Preferred Approach
**Option C (Hybrid)**: Extend all existing packages (Option A) plus create a shared `image-utils.ts` module in `dsl-core` for loading, caching, and format validation. This avoids a new npm package while preventing code duplication between renderer and exporter.

### Key Design Decisions Needed
1. **Image data flow**: Should compiled JSON embed image bytes or keep source references? (Impacts file sizes and portability)
2. **Renderer async strategy**: Pre-load all images before render pass, or make renderNode() async?
3. **Plugin baseline storage**: Store image hashes only (not full image data) in baselines to stay under 100KB limit?
4. **Changeset image embedding**: Inline base64 in changeset JSON, or write image files and reference by path?

### Research Items to Carry Forward
- @napi-rs/canvas `loadImage()` async behavior and format support
- Figma Plugin API `figma.createImage()` and `figma.getImageByHash()` exact signatures
- Plugin data size constraints with image content
- Scale mode rendering algorithms
