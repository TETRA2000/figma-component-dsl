# Calibrating the Pipeline

Audience: Developers maintaining the rendering pipeline

This guide covers how to test and improve the accuracy of the DSL rendering pipeline by generating test components, batch-rendering them, and triaging any visual issues.

## When to Calibrate

- After changing compiler, renderer, or layout-resolver code
- After adding a new DSL feature (new node type, new property)
- Periodically, to catch regressions
- When rendered PNGs don't match expected output

## What Calibration Does

Calibration generates synthetic test components across specific property categories, batch-renders them through the pipeline, and produces PNGs for visual inspection. You then compare these PNGs against expected output and triage any differences.

## Test Categories

The test suite generator produces components targeting specific DSL features:

| Category                  | What it tests                                        |
|---------------------------|------------------------------------------------------|
| `corner-radius`           | Per-corner radii, uniform radii, mixed radii         |
| `fills-solid`             | Solid color fills, multiple fills                    |
| `fills-gradient`          | Linear and radial gradients                          |
| `strokes`                 | Stroke widths, colors, alignment, dashes             |
| `auto-layout-horizontal`  | Horizontal layout, spacing, alignment, padding       |
| `auto-layout-vertical`    | Vertical layout, spacing, alignment, padding         |
| `auto-layout-nested`      | Nested layout combinations                           |
| `typography`              | Font sizes, weights, line heights, text alignment    |
| `opacity`                 | Node-level and fill-level opacity                    |
| `clip-content`            | Overflow clipping behavior                           |
| `combined`                | Multiple properties together                         |

## The Calibration Cycle

### 1. Prepare

Ensure all packages are built from latest source:

```bash
npm install && npm run build
```

### 2. Validate existing components

Check that existing components pass validation before testing:

```bash
bin/figma-dsl validate preview/src/components
```

### 3. Generate test suite

Generate DSL files targeting specific categories:

```bash
bin/figma-dsl generate-test-suite -o calibration/test-suite
```

Run `figma-dsl generate-test-suite --help` for category filtering and output options.

### 4. Batch compile and render

Process all generated DSL files at once:

```bash
bin/figma-dsl batch calibration/test-suite -o calibration/output
```

This produces PNGs in `calibration/output/dsl/` and a `batch-manifest.json` listing any compilation errors.

### 5. Inspect results

Visually review the rendered PNGs. Look for:

- Missing or misplaced elements
- Wrong colors, sizes, or spacing
- Clipped or overflowing content
- Text rendering issues

### 6. Root cause triage

This is the critical step. When something looks wrong, determine **where** the problem is:

```
Is the DSL file correct?
  |
  +-- No --> Fix the .dsl.ts file, re-run batch
  |
  +-- Yes -> Is the compiled JSON correct?
               |
               +-- No --> Bug in compiler or layout-resolver
               |
               +-- Yes -> Is the PNG correct?
                            |
                            +-- No --> Bug in renderer
                            |
                            +-- Yes -> (no issue)
```

### Pipeline Layers

When tracing a bug through the pipeline, check these layers in order:

| Layer               | File(s)                                    | What it does                              |
|---------------------|--------------------------------------------|-------------------------------------------|
| DSL types           | `packages/dsl-core/src/types.ts`           | Defines the property on the DslNode type  |
| DSL constructors    | `packages/dsl-core/src/nodes.ts`           | Passes the property through node factory  |
| Compiler types      | `packages/compiler/src/types.ts`           | Defines the property on FigmaNodeDict     |
| Compiler            | `packages/compiler/src/compiler.ts`        | Maps DslNode property to compiled output  |
| Layout resolver     | `packages/compiler/src/layout-resolver.ts` | Calculates layout positions and sizes     |
| Renderer            | `packages/renderer/src/renderer.ts`        | Draws the property to the canvas          |

A property that exists in the DSL but is missing from the PNG is usually missing at one of these layers. Trace from top to bottom to find where it disappears.

### 7. Fix and re-test

For each bug found:

1. Fix the code in the appropriate package
2. Add or update tests: `npx vitest run`
3. Type-check: `npx tsc --noEmit -p packages/<pkg>/`
4. Rebuild: `npm run build`
5. Re-run the batch to verify the fix

Repeat up to 3 iterations per calibration session.

### 8. Save to history

Record the calibration results for future reference:

```
docs/history/<YYYY-MM-DD_HH-mm>-<theme>/
```

Include rendered PNGs, any diff images, and a markdown log describing issues found and fixes applied. Update `docs/history/README.md` with an entry linking to the new log.

## What's Next

- [Dogfooding](dogfooding.md) — stress-test with real-world themed components
- [Package Documentation](../packages/) — detailed API docs for compiler, renderer, etc.
