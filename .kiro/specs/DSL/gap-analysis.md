# Gap Analysis: DSL Image Support Enhancement (Post-Implementation)

## Analysis Summary

- **Implementation Status**: All 10 task groups are marked complete with 390 tests passing across 20 test files. The core image pipeline (DSL → compile → render → export → plugin import → bidirectional sync) is fully implemented.
- **Minor Gaps Identified**: 2 minor gaps found against requirements — one non-functional (informational metadata), one functional but low-impact.
- **No Regressions**: Full test suite passes; existing non-image DSL files compile, render, and export without regression.
- **Architecture Alignment**: Implementation follows the hybrid approach (Option C from design) — extending existing pipeline stages with new IMAGE handling while adding new files (`image-helpers.ts`, `image-loader.ts`, `image-refs.ts`) for distinct responsibilities.
- **Effort**: Implementation is complete (was L scope as estimated). Remaining gaps are S (< 1 day).

---

## Requirement-to-Asset Map

| Req | Summary | Status | Assets | Notes |
|-----|---------|--------|--------|-------|
| 1.1–1.7 | IMAGE node builder | ✅ Complete | `dsl-core/src/nodes.ts:166` (`image()`), `types.ts` (IMAGE NodeType, ImageProps, ImageScaleMode) | Exported via index.ts |
| 2.1–2.4 | Image fill builder | ✅ Complete | `dsl-core/src/colors.ts:76` (`imageFill()`), `types.ts` (ImageFill) | Layering with solid/gradient fills verified in tests |
| 3.1–3.4 | Compiler handling | ✅ Complete | `compiler/src/compiler.ts` (IMAGE fill conversion, node passthrough, path validation) | Auto-layout sizing consistent with RECT/ELLIPSE |
| 4.1–4.8 | Renderer drawing | ✅ Complete | `renderer/src/renderer.ts` (IMAGE case, fills), `renderer/src/image-loader.ts` (preload/cache/resolve), `dsl-core/src/image-helpers.ts` (scale math) | All 4 scale modes, cornerRadius clipping, crosshatch placeholder |
| 5.1 | Base64 embedding | ✅ Complete | `exporter/src/exporter.ts` (`embedImageData()`, `convertFillForPlugin()`) | Synchronous via readFileSync |
| 5.2 | Image metadata | ⚠️ Partial | `exporter/src/exporter.ts:27` | `imageDimensions` declared in return type but never populated — format and scaleMode are included |
| 5.3 | 4 MB size warning | ✅ Complete | `exporter/src/exporter.ts:42` | Checks buffer.length against 4 MB threshold |
| 5.4 | Error handling | ✅ Complete | `exporter/src/exporter.ts:50` | Returns `imageError` marker on read failure |
| 6.1–6.4 | Plugin import | ✅ Complete | `plugin/src/code.ts` (`toFigmaPaints()`, `applyFillsWithImages()`) | Uses `figma.base64Decode` + `figma.createImage`, placeholder on failure |
| 7.1 | Compile path resolution | ✅ N/A | Compiler validates syntax only; resolution happens at render time | Correct per design |
| 7.2–7.3 | Render --asset-dir | ✅ Complete | `cli/src/cli.ts:119,162` | Defaults to input file's parent directory |
| 7.4 | Batch image resolution | ⚠️ Gap | `cli/src/batch-processor.ts` | No image preloading or --asset-dir in batch command |
| 8.1–8.4 | Image validation | ✅ Complete | `validator/src/rules/image-refs.ts` | File existence, format check, URL syntax, 10 MB warning |
| 9.1 | Baseline serialization | ✅ Complete | `plugin/src/code.ts` (`serializeFills()`) | Stores imageHash + scaleMode (not bytes) |
| 9.2–9.6 | Change detection | ✅ Complete | `plugin/src/code.ts` (`computeChangeset()`), `dsl-core/src/diff.ts` | Async changeset with `getBytesAsync()`, error markers for missing images |
| 9.7–9.8 | Changeset application | ✅ Complete | `dsl-core/src/changeset.ts` (`imageData` field on PropertyChange) | Type infrastructure in place |
| 9.9–9.10 | Image byte retrieval | ✅ Complete | `plugin/src/code.ts` (`embedImageDataForChange()`) | Uses `figma.getImageByHash()` + `getBytesAsync()` |

---

## Gap Details

### Gap 1: Exporter `imageDimensions` Not Populated (Req 5.2) — Low Risk

**Current state**: The `embedImageData()` function at `exporter/src/exporter.ts:24` declares `imageDimensions` in its return type but never populates it. The function returns `imageData` (base64) and `imageFormat` but has no code to extract image width/height.

**Impact**: Plugin import works correctly because Figma's API creates images from bytes and determines dimensions internally. This metadata is informational only — no downstream consumer uses it.

**Options**:
- **A) Parse image headers**: Read PNG/JPEG/WebP header bytes to extract dimensions without loading the full image. No new dependency, ~20 lines of code.
- **B) Accept as-is**: The dimensions are unused by any consumer. Remove the field from the return type to avoid confusion.

**Recommendation**: Option B — remove unused `imageDimensions` from the return type signature, or add a TODO comment.

### Gap 2: Batch Command Missing Image Support (Req 7.4) — Medium Risk

**Current state**: `cmdBatch()` at `cli/src/cli.ts:466` delegates to `processBatch()` at `cli/src/batch-processor.ts`, which has no image awareness — no `--asset-dir` option, no `collectImageSources()` call, no `preloadImages()` call.

**Impact**: Batch rendering of DSL files containing images will show crosshatch placeholders instead of real images. The pipeline won't crash (graceful degradation), but visual output will be incorrect for image-containing DSL files.

**Fix**: Modify `processBatch()` to:
1. Accept optional `assetDir` parameter
2. For each DSL file, collect image sources from compiled output
3. Preload images using file's parent directory (or provided assetDir) as base
4. Pass image cache to renderer
5. Add `--asset-dir` option to `cmdBatch()` parseArgs

**Effort**: S (< 1 day)

---

## Design Deviations (Acceptable)

| Deviation | Design Spec | Actual Implementation | Assessment |
|-----------|------------|----------------------|------------|
| Exporter sync/async | `async generatePluginInput()` | Synchronous with `readFileSync` | ✅ Acceptable — simpler, no API break needed |
| Validator rule ID | `'image-references'` | `'image-refs'` | ✅ Functionally identical |
| collectImageSources return | `string[]` | `Set<string>` | ✅ Improvement — deduplicates |
| ImageCache type | `Map<string, Image>` | `ReadonlyMap<string, Image>` | ✅ Improvement — better immutability |
| image-helpers file name | `image-helpers.ts` | `image-helpers.ts` | ✅ Matches design |
| image-loader file name | `image-loader.ts` | `image-loader.ts` | ✅ Matches design |

---

## Test Coverage Summary

| Package | Image Tests | Key Areas Covered |
|---------|------------|-------------------|
| dsl-core | ~25 tests | Builders, scale math (4 modes × multiple ratios), format detection, diff, changeset types |
| compiler | 14 tests | IMAGE nodes, fills, validation warnings, auto-layout sizing |
| renderer | 18 tests | IMAGE rendering, placeholder fallback, cornerRadius clipping, image-loader (collect, resolve, preload) |
| exporter | 5 tests | Base64 embedding, 4 MB size warning, error handling, test PNG generation |
| validator | 6 tests | Format checking, file existence, URL syntax, size warnings |
| dsl-core/diff | 6 tests | Image hash comparison, scaleMode comparison, fill additions/removals |

**Total**: 390 tests across 20 files, all passing.

---

## Implementation Complexity & Risk

| Area | Effort | Risk | Justification |
|------|--------|------|---------------|
| Core implementation (Tasks 1-10) | L (complete) | Low | All 390 tests pass, architecture aligned with design |
| Gap 1: imageDimensions | S (< 1 hour) | Low | Informational only, no consumer |
| Gap 2: Batch image support | S (< 1 day) | Medium | Batch is used in calibration pipeline; affects visual output correctness |

---

## Recommendations

1. **Fix Gap 2 (batch image support)**: Wire image preloading into `processBatch()` to enable batch rendering of DSL files with images. This is the only functional gap.

2. **Clean up Gap 1**: Either populate `imageDimensions` by parsing image headers, or remove the unused field from the `embedImageData()` return type.

3. **Consider E2E test with committed image**: Task 10 verification was done manually. A small committed test image (~1KB PNG) with an automated E2E test would prevent regressions in CI.
