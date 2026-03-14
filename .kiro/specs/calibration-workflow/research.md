# Research Log — Calibration Workflow

## Summary

- **Feature**: calibration-workflow
- **Discovery Scope**: Extension
- **Key Findings**:
  1. Plugin already supports multi-component import with horizontal layout; adding auto-export via `exportAsync` eliminates the manual Figma screenshot step
  2. Plugin already emits `componentIdMap` (name → nodeId) after import; this can be persisted to enable REST API capture on subsequent runs
  3. CLI command pattern is a simple switch dispatcher with `cmdXxx(args)` handlers; new commands follow the same pattern

## Research Log

### Topic 1: Plugin Multi-Component Support & Auto-Export

**Context**: Can the plugin eliminate the manual Figma export step?

**Sources Consulted**: Direct code analysis of `packages/plugin/src/code.ts` lines 294-356; Figma Plugin API `exportAsync` documentation.

**Findings**:
- The plugin loops over `input.components`, creates nodes, and lays them out horizontally with 50px spacing
- After creation, `componentIdMap` is already built mapping `compDef.name → node.id` (line 336)
- Figma Plugin API provides `node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } })` returning `Uint8Array`
- The plugin UI iframe can receive binary data via `postMessage` and offer downloads or bundle results

**Implications**:
- Adding `exportAsync` calls after all nodes are created provides automatic screenshot capture
- The `componentIdMap` can be included in the plugin output for REST API use on subsequent runs
- Grid layout replaces horizontal-only layout for better canvas organization
- Progress reporting via `figma.ui.postMessage({ type: 'progress', ... })` during import loop

### Topic 2: Figma REST API for Subsequent Captures

**Context**: Can REST API fully automate screenshot capture after initial plugin import?

**Sources Consulted**: Figma REST API v1 documentation — `GET /v1/images/:file_key`

**Findings**:
1. `GET /v1/images/:file_key?ids=nodeId1,nodeId2&format=png&scale=1` returns URLs to rendered PNGs
2. Requires personal access token with `file_content:read` scope
3. Rate-limited but supports batching multiple node IDs in one request
4. Node IDs persist across sessions — once captured from plugin, reusable indefinitely

**Implications**:
- First calibration run: plugin auto-export provides initial screenshots + node ID mapping
- Subsequent runs: REST API uses persisted node IDs for faster, fully automated capture
- Design should persist `componentIdMap` in the batch manifest

### Topic 3: Combining Generate + Batch into Single Command

**Context**: User requested merging `generate-test-suite` and `batch` into one command.

**Findings**:
- Both operations share the output directory context
- Generated `.dsl.ts` files are immediately consumed by batch processing
- Separating them forces the user to manage intermediate paths
- A single `calibrate` command can: generate → compile → render → export → (optionally compare)

**Implications**:
- `calibrate` becomes the primary command orchestrating the full pipeline
- `batch` remains as a standalone command for processing existing DSL files
- `generate-test-suite` can be kept as a standalone for users who want to inspect/edit generated files before processing

### Topic 4: Existing CLI Extension Points

**Context**: How to add new commands to the CLI.

**Sources Consulted**: `packages/cli/src/cli.ts`

**Findings**:
- Switch dispatcher in `run()` with `cmdXxx(args)` handlers
- `initServices()` initializes fonts once per command
- `loadDslModule()` does dynamic ESM import of `.dsl.ts` files
- `parseArgs()` with options per command

**Implications**: Add new case branches. Straightforward extension.

### Topic 5: Test Component Generation Strategy

**Context**: What property categories and edge cases to cover.

**Findings**: Based on gap analysis (8 rendering gaps identified):
- Corner radius: 0, 1, half-height, > dimension, 9999
- Fills: solid single, solid multi, linear gradient (0°, 45°, 90°), gradient with alpha
- Strokes: thin (1px), medium (2px), thick (4px)
- Auto-layout: horizontal, vertical, nested, with spacing/padding
- Typography: sizes (12, 16, 24, 48), weights (400, 600, 700), alignments (LEFT, CENTER, RIGHT), line height
- Opacity: 0, 0.5, 1
- Clip content: true/false with overflowing children
- Combined: gradient + corner radius, stroke + auto-layout

**Implications**: Test components use existing DSL factory functions (`component()`, `frame()`, `text()`, `rectangle()`). Generated as TypeScript source strings.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Extension of CLI commands | New commands in existing switch dispatcher | Minimal architecture changes, follows established patterns | CLI module grows larger | Selected approach |
| Separate calibration package | New `@figma-dsl/calibration` package | Better separation, independent testing | Over-engineering for CLI-only functionality | Considered but rejected — unnecessary boundary |

## Design Decisions

### Decision: Single `calibrate` Command for Full Pipeline
- **Context**: User requested combining `generate-test-suite` and `batch`
- **Alternatives**: (1) Keep separate commands (2) Single combined command
- **Selected Approach**: `calibrate` command orchestrates generate → batch → compare with optional flags to run partial pipeline
- **Rationale**: Reduces friction in calibration sessions; partial flags allow advanced usage
- **Trade-offs**: Less granular control vs. simpler primary workflow
- **Follow-up**: Keep `batch` and `batch-compare` as standalone for advanced use

### Decision: Plugin Auto-Export Eliminates Manual Step
- **Context**: Manual Figma export was identified as workflow bottleneck in design review
- **Alternatives**: (1) Keep manual export (2) Plugin auto-export via `exportAsync` (3) REST API only
- **Selected Approach**: Plugin calls `exportAsync` on each created component after import, sends PNGs + node ID mapping back to UI
- **Rationale**: Eliminates manual step entirely on first run; node IDs enable REST API for subsequent runs
- **Trade-offs**: Slightly longer plugin execution (export adds time); user still must run plugin to import
- **Follow-up**: Plugin UI should show export progress

### Decision: Separate PNGs per Component
- **Context**: Grid vs. individual exports
- **Selected Approach**: Individual PNGs per component for per-component comparison and diff
- **Rationale**: Enables granular comparison reporting and targeted fixes

## Risks & Mitigations

- Figma API rate limiting — Support plugin auto-export as primary path; batch REST API calls to minimize requests
- Test suite size grows large — Property filter flag; keep defaults focused on known gap areas
- GUID collisions in merged exports — Use unified GUID counter across batch compilation
- Plugin `exportAsync` timing — Sequential export with progress reporting to avoid memory pressure

## References

- Figma REST API Image Export: `GET /v1/images/:file_key` — PNG export of specific nodes
- Figma Plugin API `exportAsync` — In-plugin rasterization returning `Uint8Array`
- Existing CLI patterns: `packages/cli/src/cli.ts` — switch dispatcher, `parseArgs`, `cmdXxx` handlers
