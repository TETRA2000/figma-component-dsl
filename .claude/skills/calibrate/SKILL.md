---
name: calibrate
description: >
  Run DSL rendering calibration: generate test suite components, batch compile
  and render to PNGs, visually inspect results, and fix rendering issues in an
  iterative loop. Use this skill whenever the user wants to calibrate, run the
  test suite, check rendering accuracy, add new test components, batch render,
  or verify that code changes haven't regressed the renderer or compiler output.
  Also trigger when the user says things like "run calibration", "check the
  renders", "add these to the test suite", "batch render", "generate test cases",
  "how do the PNGs look", or mentions calibration in the context of the DSL
  pipeline.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# DSL Rendering Calibration

Calibration validates that the DSL pipeline (dsl-core -> compiler -> renderer -> exporter -> plugin) produces correct visual output. The workflow generates test components, batch-renders them to PNGs, inspects the results, and iteratively fixes issues.

## When to use each mode

| User intent | Mode |
|---|---|
| "Run calibration" / "check renders" | **Full run** -- generate + batch + inspect |
| "Add X to calibration" / "new test theme" | **Add components** -- create category + batch |
| "Re-run just the hamburger theme" | **Partial run** -- batch specific category |
| "The gradient renders look wrong, fix them" | **Fix loop** -- inspect + fix + re-render |

## Quick reference: CLI commands

All commands run from the project root via `bin/figma-dsl`:

```bash
# Generate test DSL files (all categories or specific ones)
bin/figma-dsl generate-test-suite -o <output-dir> [--property <category>...]

# Batch compile + render + export
bin/figma-dsl batch <input-dir-or-glob> -o <output-dir> [--include <extra-glob>...]

# Compare DSL renders vs Figma captures (when Figma PNGs are available)
bin/figma-dsl batch-compare <dsl-dir> <figma-dir> [-o report.json] [-t <threshold>]

# Full orchestrated pipeline
bin/figma-dsl calibrate -o <output-dir> [--property <category>...] [-t <threshold>]
```

## Available test categories

`corner-radius`, `fills-solid`, `fills-gradient`, `strokes`, `auto-layout-horizontal`, `auto-layout-vertical`, `auto-layout-nested`, `typography`, `opacity`, `clip-content`, `combined`, `hamburger-theme`

Categories are defined in `packages/cli/src/test-suite-generator.ts`. Each category contains multiple test variants as `.dsl.ts` files.

## Full calibration run

### Step 1: Generate test suite

```bash
bin/figma-dsl generate-test-suite -o calibration/<timestamp>/test-suite [--property <category>]
```

Use a timestamp directory name like `2026-03-14T15-30-00` for organization. Omit `--property` to generate all categories, or specify one or more to focus on specific areas.

### Step 2: Batch compile and render

```bash
bin/figma-dsl batch calibration/<timestamp>/test-suite -o calibration/<timestamp>
```

This produces:
- `dsl/*.png` -- rendered PNGs for each component
- `plugin-input.json` -- merged Figma plugin input (for later Figma import)
- `batch-manifest.json` -- metadata with dimensions and status per component

Check the batch output for errors. Any component that fails compilation shows in the manifest with `"status": "error"`.

### Step 3: Inspect rendered PNGs

Read the rendered PNG files to visually verify correctness. Focus on:

- **Layout** -- Are children positioned correctly? Is spacing right?
- **Text** -- Does text wrap properly? Are font sizes/weights correct?
- **Fills** -- Are colors and gradients rendering accurately?
- **Strokes** -- Are borders visible with correct weight?
- **Corner radius** -- Are rounded corners smooth and correct?
- **Sizing** -- Do HUG/FIXED/FILL modes produce expected dimensions?

Report findings as a table: component name, status (pass/issue), and description of any problems.

### Step 4: Fix loop (configurable, default 3 iterations)

When issues are found:

1. **Diagnose** -- Read the relevant source files to understand the root cause. The rendering pipeline is:
   - `packages/dsl-core/src/` -- DSL node constructors and types
   - `packages/compiler/src/compiler.ts` -- Compiles DslNode to FigmaNodeDict
   - `packages/compiler/src/layout-resolver.ts` -- Resolves sizes and positions
   - `packages/compiler/src/text-measurer.ts` -- Measures text for layout
   - `packages/renderer/src/renderer.ts` -- Renders FigmaNodeDict to PNG via Canvas
   - `packages/exporter/src/exporter.ts` -- Converts to plugin-consumable JSON

2. **Fix** -- Edit the source files. Common fix locations:
   - Text wrapping issues -> `text-measurer.ts` or `renderer.ts` (renderText)
   - Layout/sizing issues -> `layout-resolver.ts` or `compiler.ts` (auto-layout section)
   - Fill/stroke issues -> `compiler.ts` (convertFill/convertStroke) or `renderer.ts`
   - Missing properties -> Check the full pipeline from types.ts through to renderer

3. **Rebuild** -- After editing source:
   ```bash
   npm run build  # rebuilds all packages
   ```

4. **Re-render** -- Re-run the batch for affected components:
   ```bash
   bin/figma-dsl batch calibration/<timestamp>/test-suite/<category> -o calibration/<timestamp>-fix<N>
   ```

5. **Re-inspect** -- Read the new PNGs and compare with previous iteration.

6. **Repeat** until all issues are resolved or max iterations reached.

Ask the user before starting the fix loop: "Found N issues. Want me to attempt fixes? (default: up to 3 iterations)"

## Adding new test components

To add a new theme or component category to calibration:

### Option A: Add to the generator (recommended for reusable test suites)

1. Edit `packages/cli/src/test-suite-generator.ts`:
   - Add the category name to `PropertyCategory` union type
   - Add it to `ALL_CATEGORIES` array
   - Write a `yourCategoryVariants(): TestVariant[]` function that returns `{ name, code }` pairs
   - Register it in `CATEGORY_GENERATORS`

2. Each variant's `code` is a complete `.dsl.ts` file as a string template:
   ```typescript
   {
     name: 'my-component',
     code: `import { frame, text, solid, horizontal } from '@figma-dsl/core';

   export default frame('MyComponent', {
     size: { x: 200, y: 100 },
     fills: [solid('#ffffff')],
     autoLayout: horizontal({ spacing: 8, padX: 16, padY: 16 }),
     children: [
       text('Hello', { fontSize: 16, color: '#000000' }),
     ],
   });
   `,
   }
   ```

3. Rebuild CLI and generate:
   ```bash
   cd packages/cli && npm run build && cd ../..
   bin/figma-dsl generate-test-suite -o calibration/<timestamp>/test-suite --property <new-category>
   ```

### Option B: Use standalone DSL files (quick one-off testing)

Place `.dsl.ts` files anywhere and batch them directly:

```bash
bin/figma-dsl batch examples/my-component.dsl.ts -o output/
```

Or batch an entire directory:

```bash
bin/figma-dsl batch examples/ -o output/ --include "examples/my-*.dsl.ts"
```

## Analyzing previous calibration results

To check an existing calibration run:

1. Read `calibration/<timestamp>/batch-manifest.json` for the component list and any errors
2. Read `calibration/<timestamp>/report.json` (if it exists) for DSL-vs-Figma comparison data
3. Read individual PNGs from `calibration/<timestamp>/dsl/` to visually inspect

The report includes:
- Per-component similarity scores (0-100%)
- Pass/fail against threshold (default 95%)
- Category breakdown with average similarity
- Worst 5 discrepancies highlighted

## Output directory structure

```
calibration/<timestamp>/
  test-suite/           # Generated .dsl.ts files by category
    corner-radius/
    hamburger-theme/
    ...
  dsl/                  # Rendered PNGs
  plugin-input.json     # For Figma plugin import
  batch-manifest.json   # Component metadata
  report.json           # Comparison report (if Figma captures exist)
```

## Reference

- See `references/pipeline.md` for the full rendering pipeline architecture
- See `references/categories.md` for the complete list of test variants per category
