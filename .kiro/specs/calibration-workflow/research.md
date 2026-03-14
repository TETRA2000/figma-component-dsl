# Research Log — Calibration Workflow

## Summary

Light discovery for an extension feature. The calibration workflow builds on the existing CLI, exporter, comparator, and Figma plugin. Key findings: (1) the plugin already supports multiple components in a single import, (2) Figma offers two paths for screenshot capture (REST API image export and plugin `exportAsync`), (3) the CLI command pattern is straightforward to extend.

## Research Log

### Topic 1: Plugin Multi-Component Support

**Investigation**: Does the Figma plugin already handle multiple components?

**Findings**: Yes. `packages/plugin/src/code.ts` loops over `input.components` and lays them out horizontally with 50px spacing. No plugin changes needed for batch import — only the layout could be improved to a grid.

**Source**: Direct code analysis of `packages/plugin/src/code.ts` lines 66-78.

**Implication**: Requirement 3 (Figma Plugin Batch Import) is partially satisfied. Grid layout and progress reporting are the only additions needed.

### Topic 2: Figma Image Export Options

**Investigation**: How to capture screenshots of Figma-rendered components for comparison.

**Findings**:
1. **REST API** — `GET /v1/images/:file_key?ids=nodeId1,nodeId2&format=png&scale=1` returns URLs to rendered PNGs. Requires a personal access token or OAuth token with `file_content:read` scope. Rate-limited.
2. **Plugin API** — `node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } })` returns a `Uint8Array` from within the plugin. Can be sent to the UI iframe and downloaded.
3. **Manual fallback** — User exports PNGs from Figma and drops them in a directory for comparison.

**Source**: Figma Developer Docs — REST API endpoints, Plugin API `exportAsync`.

**Implication**: Design should support all three paths. The REST API path enables full automation; the plugin path works without a token; the manual path works offline. The `calibrate` command can detect which path is available.

### Topic 3: Existing CLI Extension Points

**Investigation**: How to add batch commands to the CLI.

**Findings**: The CLI uses a `switch` dispatcher in `run()`. Each command is a standalone async function returning an exit code. Services (`textMeasurer`, renderer fonts) are initialized once per command via `initServices()`. DSL modules are loaded via dynamic `import()`.

**Pattern**: Add new case branches for `generate-test-suite`, `batch`, `batch-compare`, `capture-figma`, and `calibrate`. Each follows the existing `cmdXxx(args)` pattern.

**Source**: `packages/cli/src/cli.ts`

### Topic 4: Test Component Generation Strategy

**Investigation**: What property categories and edge cases should the test suite cover?

**Findings**: Based on the corner-radius bug and the gap analysis (which identified 8 rendering gaps), the test suite should cover:
- Corner radius: 0, 1, half-height, > dimension, 9999
- Fills: solid single, solid multi, linear gradient (0°, 45°, 90°), gradient with alpha
- Strokes: thin (1px), medium (2px), thick (4px), with different alignments
- Auto-layout: horizontal, vertical, nested, with spacing, padding combinations
- Typography: sizes (12, 16, 24, 48), weights (400, 600, 700), alignments (LEFT, CENTER, RIGHT), line height, letter spacing
- Opacity: 0, 0.5, 1
- Clip content: true/false with overflowing children
- Combined: gradient + corner radius, stroke + auto-layout, etc.

**Implication**: Test components are simple DSL files using the existing `component()`, `frame()`, `text()`, `rectangle()` factories. They can be generated programmatically as TypeScript source strings.

## Architecture Pattern Evaluation

**Extension pattern chosen**: New CLI commands + new `calibration` package (or module within CLI) for test generation and batch orchestration. No changes to core DSL types, compiler, or renderer APIs. Exporter gets a thin `mergePluginInputs` utility. Plugin gets grid layout + progress reporting.

## Design Decisions

1. **Separate PNGs per component** (not composite grid) — enables per-component comparison and diff images.
2. **Test components as generated `.dsl.ts` files** (not runtime objects) — ensures they go through the full pipeline and can be inspected/modified by the user.
3. **Timestamped output directories** — enables tracking improvement across calibration iterations.
4. **JSON report format** — machine-readable for Claude Code, with Markdown summary for human review.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Figma API rate limiting | Medium | Support manual fallback; batch REST API calls to minimize requests |
| Test suite size grows large | Low | Property filter flag; keep defaults focused on known gap areas |
| GUID collisions in merged exports | Medium | Use unified GUID counter across batch compilation |
