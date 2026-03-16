# Gap Analysis — canvas-component

## Summary

- **Scope**: 11 requirements spanning 7 packages (`dsl-core`, `compiler`, `renderer`, `exporter`, `plugin`, `cli`, `preview`) plus new plugin modules (SlotDetector, ImageCapture, ExportBundler) and a Vite plugin
- **Current state**: Core pipeline infrastructure (types, builders, compiler, renderer, exporter) is **complete** (~60% of total work). Plugin-layer slot detection, image capture, and export bundling are **entirely missing** (~30% of total work). Preview app integration (DslCanvas component, Vite plugin) is **partial** (~10%).
- **Relationship to `figma-slots-component-reuse`**: Both specs are **additive and non-overlapping**. Slot infrastructure from that spec is fully implemented. Canvas-component extends it with canvas metadata, slot detection, and image bundling — all orthogonal. No conflicts identified. Where canvas-component requirements overlap with `figma-slots-component-reuse` scope (e.g., Requirement 10's bidirectional sync), canvas-component takes precedence.
- **Highest risk**: Plugin-layer work — native slot detection relies on undocumented Figma internal conventions (`componentPropertyDefinitions` key format); image capture at scale may cause performance issues.
- **Recommended approach**: Hybrid — existing pipeline code is already extended; focus remaining effort on new plugin modules and preview app integration.

---

## 1. Current State Investigation

### Requirement-to-Asset Map

| Requirement | Existing Assets | Gap Status |
|-------------|----------------|------------|
| **Req 1**: DslCanvas React Component | `/preview/src/components/DslCanvas/DslCanvas.tsx` — skeleton exists | **Partial** — missing render logic, bundled image support, CSS Module styling, error/fallback states |
| **Req 2**: DSL Canvas Node Type | `canvas()` builder in `nodes.ts:209-229`; `CanvasProps` in `types.ts:307-316`; `DslNode` has `isCanvas`, `canvasName`, `canvasScale` | **Complete** |
| **Req 3**: Compiler Canvas Support | Canvas passthrough in `compiler.ts:285-292`; mutual exclusivity check `compiler.ts:261-267`; layout resolution for canvas children | **Complete** |
| **Req 4**: Renderer Canvas Integration | `renderCanvasNodes()` in `canvas-renderer.ts:27-45`; scale factor support; Map return keyed by canvasName | **Complete** |
| **Req 5**: Figma Plugin DslCanvas Handling | Canvas frame creation in `code.ts:298-318`; plugin data storage `code.ts:307-317`; exporter canvas encoding `exporter.ts:177-185` | **Complete** |
| **Req 6**: DslCanvas–Slot Interoperability | Compiler handles slot overrides targeting canvas-typed slots `compiler.ts:438-448` | **Partial** — DslCanvas component needs `bundledImage` prop to consume override images |
| **Req 7**: CLI Canvas Integration | Canvas metadata flows through compiler automatically | **Partial** — missing per-canvas PNG extraction, `--no-canvas` flag, batch handling |
| **Req 8**: Preview App Integration | DslCanvas component skeleton exists | **Partial** — missing `vite-plugin-dsl-canvas.ts`, dev server endpoint, HMR support |
| **Req 9**: Figma Native Slot Detection | No slot detection code exists in plugin | **Missing** — entire `SlotDetector` module needed |
| **Req 10**: Unified Export with Image Bundling | No image capture or bundling code exists; base64 encoding pattern proven in `code.ts:755-785` | **Missing** — `ImageCapture`, `ExportBundler` modules; `fflate` dependency; export flow integration |
| **Req 11**: Dual Rendering Path Coexistence | `renderCanvasNodes()` exists for renderer path; no bundled image consumption | **Partial** — DslCanvas component needs `bundledImage` fallback logic |

### Conventions Observed

| Convention | Pattern | Location |
|-----------|---------|----------|
| Plugin modules | Single-responsibility files, exported from `code.ts` | `slot-utils.ts`, `serializer.ts` |
| Plugin data keys | Separate keys per concern (`'dsl-slot'`, `'dsl-canvas'`) | `code.ts:302-317` |
| Image export | `node.exportAsync({ format: 'PNG', constraint: ... })` | `code.ts:1420-1452` |
| Base64 encoding | `figma.base64Encode(bytes)` → `data:image/png;base64,{encoded}` | `code.ts:755-785` |
| New exporter modules | Standalone files with typed interfaces, own test files | `structural-hash.ts`, `component-registry.ts`, `deduplicator.ts` |
| Test colocation | `.test.ts` alongside source in same directory | All packages |

### Integration Surfaces

| Surface | Current State | Impact |
|---------|--------------|--------|
| `PluginNodeDef` | Has `isCanvas`, `canvasName`, slot fields | Add `slotImages: SlotImageMap` to export output (NOT the type — it's a runtime addition) |
| `code.ts` export flow | `computeChangeset()` + `computeCompleteExport()` produce JSON | Hook SlotDetector → ImageCapture → ExportBundler after JSON generation |
| `handleWsMessage()` | Handles push/export messages via WebSocket | Send `BundledExport` result instead of raw JSON |
| `figma.ui.postMessage` | Sends `export-result` message type | Extend to include `format: 'json' | 'zip'` and image data |
| Plugin dependencies | `esbuild` IIFE bundle, no external runtime deps | Add `fflate` as dev dependency (bundled by esbuild) |
| Preview Vite config | Standard Vite 8 setup | Add `vite-plugin-dsl-canvas` to plugin array |
| CLI render command | Renders full tree to PNG | Add per-canvas extraction + `--no-canvas` flag |

---

## 2. Requirements Feasibility Analysis

### Complexity Signals

| Requirement | Complexity | Signal |
|-------------|-----------|--------|
| Req 1: DslCanvas React Component | Medium | State management, async rendering, fallback logic |
| Req 2: Canvas Node Type | ✅ Done | — |
| Req 3: Compiler Canvas Support | ✅ Done | — |
| Req 4: Renderer Canvas Integration | ✅ Done | — |
| Req 5: Plugin DslCanvas Handling | ✅ Done | — |
| Req 6: DslCanvas–Slot Interop | Low | Prop addition to existing component |
| Req 7: CLI Canvas Integration | Low | Add extraction loop + flag |
| Req 8: Preview App Integration | Medium | Vite plugin with dev server middleware + HMR |
| Req 9: Slot Detection | Medium–High | Undocumented key format parsing, fallback logic, two detection strategies |
| Req 10: Export Bundling | Medium | New modules, ZIP dependency, size threshold logic, progress/abort |
| Req 11: Dual Path Coexistence | Low | DslCanvas `bundledImage` prop priority logic |

### Constraints

1. **Figma Plugin sandbox**: No Node.js APIs — fflate (pure JS) required for ZIP; no filesystem access
2. **`componentPropertyDefinitions` key format**: `"{LayerName}#{N}:{M}"` is undocumented — fallback logic essential
3. **`SLOT` not in typings**: Must cast `(node.type as string) === "SLOT"` for TypeScript
4. **@napi-rs/canvas is Node-only**: DslCanvas React component cannot render in browser — requires Vite dev server bridge
5. **`exportAsync` is async**: Image capture loop must be sequential per-node; AbortSignal checked between captures

### Research Needed

- Benchmark `exportAsync` performance with 10+ slots at 4x scale (large file scenario)
- Verify `fflate`'s `zipSync()` works in Figma plugin sandbox without polyfills
- Test `componentPropertyDefinitions` access on ComponentSetNode (vs ComponentNode) for variant components

---

## 3. Implementation Approach Options

### Option A: Extend Existing Only

**Approach**: Add SlotDetector, ImageCapture, ExportBundler logic inline in `code.ts`

**Trade-offs**:
- ✅ No new files
- ❌ `code.ts` is already 1500+ lines — becomes unmanageable
- ❌ Cannot unit test detection/capture/bundling in isolation

### Option B: All New Modules

**Approach**: Create `slot-detector.ts`, `image-capture.ts`, `export-bundler.ts` in plugin; `vite-plugin-dsl-canvas.ts` in preview; complete `DslCanvas.tsx`

**Trade-offs**:
- ✅ Clean separation, independently testable
- ✅ Follows pattern established by `slot-utils.ts`, `serializer.ts`
- ❌ More files and import wiring

### Option C: Hybrid (Recommended)

**Approach**: New modules for distinct responsibilities (detector, capture, bundler, Vite plugin). Extend `code.ts` only for the export flow integration hook (SlotDetector → ImageCapture → ExportBundler pipeline call). Extend `cli.ts` for `--no-canvas` flag and per-canvas extraction. Complete `DslCanvas.tsx` with full implementation.

**Trade-offs**:
- ✅ Balanced: existing files grow minimally, new concerns get clean modules
- ✅ Aligns with approved design document's component breakdown
- ✅ Each module independently unit-testable
- ❌ Export flow integration requires careful coordination between 3 new modules

---

## 4. Implementation Complexity & Risk

**Effort: M (3–7 days)**
Justification: Core pipeline work is done. Remaining work is 3 new plugin modules (slot detection, image capture, bundling), 1 Vite plugin, 1 React component completion, and CLI flag additions. The plugin modules are the most complex but follow established patterns.

**Risk: Medium**
Justification: Medium risk from: (a) `componentPropertyDefinitions` key format parsing relies on undocumented convention with fallback, (b) `fflate` in Figma sandbox is unverified, (c) `exportAsync` performance at scale is unknown. Low risk for: all core pipeline work (already implemented and tested).

---

## 5. Conflict Analysis with `figma-slots-component-reuse`

### Resolution: No Conflicts — Additive and Orthogonal

Both specs modify complementary parts of the pipeline:

| Area | figma-slots-component-reuse | canvas-component | Conflict? |
|------|---------------------------|------------------|-----------|
| DslNode types | `isSlot`, `slotName`, `slotOverrides` | `isCanvas`, `canvasName`, `canvasScale` | No — separate fields |
| Builder functions | `slot()` | `canvas()` | No — separate functions |
| Compiler | Slot validation, SLOT property injection | Canvas passthrough, mutual exclusivity | No — separate branches |
| Exporter | Slot encoding, registry, dedup | Canvas metadata encoding | No — separate encoding blocks |
| Plugin creation | Slot frame naming, detached copy | Canvas frame creation | No — separate code paths |
| Plugin detection | N/A | SlotDetector (NEW) | No — entirely new |
| Plugin capture | N/A | ImageCapture (NEW) | No — entirely new |
| Plugin bundling | N/A | ExportBundler (NEW) | No — entirely new |
| Plugin data keys | `'dsl-slot'` | `'dsl-canvas'` | No — separate keys |
| CLI flags | `--registry`, `--deduplicate` | `--no-canvas` | No — separate flags |

### Override Notice

The following `figma-slots-component-reuse` areas are being **superseded** by `canvas-component`:

1. **Requirement 10 (Bidirectional Slot Sync)**: The `canvas-component` spec's Unified Export (Req 10) captures slot images via `exportAsync`, which provides a more complete export package. The `figma-slots-component-reuse` Req 10 changeset-based slot sync remains valid for structural changes, but image-based slot content is now handled by canvas-component's export bundling.

2. **Plugin data for slot identification**: Canvas-component's `SlotDetector` uses `componentPropertyDefinitions` and `node.type === "SLOT"` for detection (more robust than relying solely on the `[Slot]` naming convention from `figma-slots-component-reuse`). The naming convention remains as a secondary signal.

---

## 6. Recommendations for Design Phase

### Preferred Approach
**Option C (Hybrid)** — aligns with approved design document. Focus on 3 new plugin modules + Vite plugin + DslCanvas completion.

### Implementation Phasing (Remaining Work)

| Phase | Scope | Requirements | Blocking? |
|-------|-------|-------------|-----------|
| 1. DslCanvas Component | Complete React component with bundledImage support, CSS Module | 1.1-1.8, 6.2, 11.4-11.5 | No — parallel with Phase 2 |
| 2. Vite Plugin | Dev server endpoint, build-time transform, HMR | 8.2 | Yes for preview integration |
| 3. SlotDetector | Native slot detection via componentPropertyDefinitions + node.type | 9.1-9.6 | Yes — ImageCapture depends on detection results |
| 4. ImageCapture | exportAsync with scale, progress, abort | 10.1-10.2, 10.5-10.7 | Yes — ExportBundler depends on captured images |
| 5. ExportBundler | base64/ZIP bundling with threshold | 10.3-10.4 | Yes — export flow integration depends on bundler |
| 6. Export Flow Integration | Wire SlotDetector → ImageCapture → ExportBundler into code.ts | 10.1, 10.6, 11.1 | No |
| 7. CLI Canvas Integration | Per-canvas PNG extraction, --no-canvas flag | 7.1-7.3 | No — parallel with Phase 6 |

### Research Items to Carry Forward
- `fflate` sandbox compatibility verification
- `exportAsync` performance benchmarking with many slots at high scale
- `componentPropertyDefinitions` behavior on ComponentSetNode (variant components)
