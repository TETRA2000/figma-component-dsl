---
name: calibrate
description: >
  Run DSL rendering calibration: generate test suite components, batch compile
  and render to PNGs, visually inspect results, and fix rendering issues in an
  iterative loop. When issues are found, performs root cause analysis to determine
  whether the problem is in the DSL file or in the pipeline packages code
  (compiler, renderer, layout-resolver, types). Use this skill whenever the user
  wants to calibrate, run the test suite, check rendering accuracy, diagnose
  rendering bugs, fix pipeline code, add new test components, batch render,
  or verify that code changes haven't regressed the renderer or compiler output.
  Also trigger when the user says things like "run calibration", "check the
  renders", "fix the pipeline", "why does this render wrong", "add these to the
  test suite", "batch render", "generate test cases", "how do the PNGs look",
  "fix packages codes", or mentions calibration in the context of the DSL pipeline.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# DSL Rendering Calibration

Calibration validates that the DSL pipeline (dsl-core -> compiler -> renderer -> exporter -> plugin) produces correct visual output. The workflow generates test components, batch-renders them to PNGs, inspects the results, and iteratively fixes issues — including diagnosing and fixing bugs in the pipeline packages themselves when the root cause isn't in the DSL.

## When to use each mode

| User intent | Mode |
|---|---|
| "Run calibration" / "check renders" | **Full run** -- generate + batch + inspect |
| "Add X to calibration" / "new test theme" | **Add components** -- create category + batch |
| "Re-run just the hamburger theme" | **Partial run** -- batch specific category |
| "The gradient renders look wrong, fix them" | **Fix loop** -- inspect + fix + re-render |
| "Fix the pipeline" / "why does X render wrong" | **Pipeline diagnosis** -- triage + fix packages + test |
| "Can you fix by analyzing the render?" | **Full run + pipeline diagnosis** -- render, inspect, triage, fix |

## Quick reference: CLI commands

All commands run from the project root via `bin/figma-dsl`:

```bash
# Generate test DSL files (all categories or specific ones)
bin/figma-dsl generate-test-suite -o <output-dir> [--property <category>...]

# Batch compile + render + export
bin/figma-dsl batch <input-dir-or-glob> -o <output-dir> [--include <extra-glob>...]

# Compare DSL renders vs Figma captures (when Figma PNGs are available)
bin/figma-dsl batch-compare <dsl-dir> <figma-dir> [-o report.json] [-t <threshold>]

# Capture React component screenshot from dev server
bin/figma-dsl capture <url> -o output.png [-v WxH] [--selector <css>]

# Validate components for DSL compatibility
bin/figma-dsl validate <component-dir> [--format json] [--strict] [--skip <rules>]

# Full orchestrated pipeline
bin/figma-dsl calibrate -o <output-dir> [--property <category>...] [-t <threshold>]
```

## Available test categories

### Layout & styling
`corner-radius`, `fills-solid`, `fills-gradient`, `strokes`, `auto-layout-horizontal`, `auto-layout-vertical`, `auto-layout-nested`, `typography`, `opacity`, `clip-content`, `combined`

### Shape & geometry
`line-shapes`, `polygon-star-shapes`, `boolean-operations`, `section-layout`

### Themed suites
`hamburger-theme`

Categories are defined in `packages/cli/src/test-suite-generator.ts`. Each category contains multiple test variants as `.dsl.ts` files.

### Shape category details

| Category | DSL factories used | What it tests |
|---|---|---|
| `line-shapes` | `line()` | Basic lines, thick strokes with round caps, rotated lines |
| `polygon-star-shapes` | `polygon()`, `star()` | Triangles, hexagons with corner radius, 5-point stars, custom inner radius, star-as-polygon (innerRadius=1.0) |
| `boolean-operations` | `subtract()`, `union()`, `intersect()`, `exclude()` | All 4 boolean operations with rectangle/ellipse children |
| `section-layout` | `section()` | Basic sections, hidden contents, multiple children |

When running shape categories, note that **boolean operations may show lower similarity scores** (around 85%) due to anti-aliasing artifacts at compositing edges — this is expected and not a bug.

## Full calibration run

### Step 0: Install dependencies and build

Always start by ensuring dependencies are installed and packages are built:

```bash
npm i && npm run build
```

This guarantees the CLI and all pipeline packages are up to date before generating or rendering anything.

### Step 0.5: Create history directory

Create a directory under `docs/history/` for this calibration run, named with a timestamp and the theme/category being tested:

```bash
mkdir -p docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>
```

Examples:
- `docs/history/2026-03-14_15-30-corner-radius`
- `docs/history/2026-03-14_16-00-hamburger-theme`
- `docs/history/2026-03-14_16-30-full-suite`

For full runs across all categories, use `full-suite` as the theme name. For fix iterations, append `-fix<N>` (e.g., `2026-03-14_15-30-corner-radius-fix1`).

Copy rendered PNGs and the batch manifest into this directory after each batch render step so there is a persistent record of every iteration's output.

### Step 0.7: Validate components

Run the validator on all components that will be part of this calibration to catch structural issues early. This step serves two purposes: (1) catching problems before rendering, and (2) building a log of common validation errors that informs how components should be authored.

```bash
bin/figma-dsl validate preview/src/components --format json > docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/validation.json
bin/figma-dsl validate preview/src/components --format text > docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/validation.log
```

The validator checks 10 rules including `css-modules`, `no-inline-style`, `classname-prop`, `variant-union`, `html-attrs`, `design-tokens`, `dsl-compatible-layout`, and others. See `packages/validator/src/rules/` for the full rule set.

**Review the validation output.** Errors (not warnings) indicate components that will likely cause issues downstream. Common patterns to watch for:

| Rule | What it means | Impact on calibration |
|---|---|---|
| `no-inline-style` | Uses `style={{}}` instead of CSS Modules | DSL can't map inline styles — renders will diverge |
| `dsl-compatible-layout` | Missing `display: flex/grid` | Auto-layout won't compile correctly |
| `variant-union` | `variant: string` instead of literal union | Component properties won't map to Figma variants |
| `css-modules` | No CSS Module import | Styling won't be captured in DSL conversion |

The accumulated `validation.json` files in `docs/history/` create a record of recurring issues. When the same rule fails repeatedly across iterations, it signals a pattern that component creation guidance (e.g., in the create-react-component skill or steering docs) should address to prevent the issue at authoring time.

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

After batch completes, copy outputs to the history directory created in Step 0.5:

```bash
cp calibration/<timestamp>/dsl/*.png docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/
cp calibration/<timestamp>/batch-manifest.json docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/
```

### Step 2.5: Capture React component renders

Capture browser screenshots of the React components via the preview dev server. This gives a ground-truth reference to compare against DSL-rendered PNGs.

1. **Start the preview dev server** (if not already running):
   ```bash
   cd preview && npm run dev &
   DEV_PID=$!
   cd ..
   ```
   Wait for the server to be ready (typically at `http://localhost:5173`).

2. **Capture each component or showcase page**:
   ```bash
   # Capture a showcase page
   bin/figma-dsl capture http://localhost:5173/<page-path> \
     -o docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/react-render.png

   # Capture a specific component with a CSS selector
   bin/figma-dsl capture http://localhost:5173 \
     --selector ".component-class" \
     -o docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/react-<ComponentName>.png
   ```

   If a showcase page exists for the theme (e.g., `preview/src/pages/TravelShowcase.tsx`), capture that. Otherwise capture individual components.

3. **Stop the dev server** when done:
   ```bash
   kill $DEV_PID 2>/dev/null
   ```

The React renders saved in the history directory serve as the browser baseline for visual comparison. When inspecting DSL renders in Step 3, compare them side-by-side with these screenshots to spot divergences.

### Step 3: Inspect rendered PNGs

Read the rendered PNG files to visually verify correctness. Compare against the React renders captured in Step 2.5. Focus on:

- **Layout** -- Are children positioned correctly? Is spacing right?
- **Text** -- Does text wrap properly? Are font sizes/weights correct?
- **Fills** -- Are colors and gradients rendering accurately?
- **Strokes** -- Are borders visible with correct weight?
- **Corner radius** -- Are rounded corners smooth and correct? (both uniform and per-corner)
- **Sizing** -- Do HUG/FIXED/FILL modes produce expected dimensions?
- **Clipping** -- Does clipContent work as expected?
- **Shapes** -- Are polygon vertices correctly positioned? Do star inner radii look right?
- **Boolean operations** -- Are compositing results clean? (Some edge artifacts are acceptable)
- **Lines** -- Are stroke caps rendering correctly? Is rotation applied properly?
- **Sections** -- Is the section label rendered? Are children positioned correctly?

Report findings as a table: component name, status (pass/issue), and description of any problems.

### Step 3.5: Root cause triage

Before jumping to fixes, determine whether each issue is a **DSL authoring problem** or a **pipeline code bug**. This distinction is critical — fixing the wrong layer wastes time and can mask real bugs.

#### How to triage

For each issue found in Step 3, run through this checklist:

1. **Check the DSL source** -- Read the `.dsl.ts` file. Does the DSL correctly express the intended design? If the DSL is wrong (missing property, wrong value), fix the DSL file.

2. **Check the compiled output** -- Compile the DSL to JSON and inspect the intermediate `FigmaNodeDict`:
   ```bash
   bin/figma-dsl compile <file.dsl.ts> -o /tmp/debug.json
   ```
   Read the JSON and check whether the property in question made it through compilation. If the DSL sets `cornerRadii` but the JSON only has `cornerRadius`, the compiler is dropping the property.

3. **Check the rendered output** -- If the JSON looks correct but the PNG is wrong, the renderer isn't handling that property. Read the renderer source to confirm.

4. **Check the type definitions** -- A common pattern is that `dsl-core` defines a property, but the intermediate `FigmaNodeDict` type doesn't include it, so the compiler silently drops it. Check `packages/compiler/src/types.ts` to see if the field exists on `FigmaNodeDict`.

#### Triage decision tree

```
Issue found in rendered PNG
  │
  ├─ DSL source is wrong (missing prop, wrong value, bad structure)
  │   └─► Fix the DSL file (Step 4a)
  │
  ├─ DSL source is correct, but compiled JSON is wrong
  │   ├─ Property missing from FigmaNodeDict type
  │   │   └─► Fix types.ts + compiler.ts (Step 4b)
  │   ├─ Property exists in type but compiler doesn't pass it through
  │   │   └─► Fix compiler.ts (Step 4b)
  │   └─ Layout/sizing is computed incorrectly
  │       └─► Fix layout-resolver.ts (Step 4b)
  │
  └─ DSL correct, JSON correct, but PNG is wrong
      ├─ Renderer doesn't handle the property/value
      │   └─► Fix renderer.ts (Step 4b)
      └─ Canvas API usage issue (wrong draw calls, transform bugs)
          └─► Fix renderer.ts (Step 4b)
```

Tag each issue as **DSL fix** or **pipeline fix** before proceeding.

### Step 4: Fix loop (configurable, default 3 iterations)

When issues are found, apply fixes based on the triage from Step 3.5:

#### Step 4a: DSL file fixes

For issues tagged as DSL problems:
- Edit the `.dsl.ts` file directly
- No rebuild needed — just re-run the batch

#### Step 4b: Pipeline code fixes

For issues tagged as pipeline bugs, follow this systematic process. The key insight is that properties flow through multiple layers, and a fix often requires changes at every layer the property touches.

**The pipeline layers (in order):**

| Layer | File | Role |
|---|---|---|
| 1. DSL types | `packages/dsl-core/src/types.ts` | DslNode type definition |
| 2. DSL constructors | `packages/dsl-core/src/nodes.ts` | Factory functions that create DslNode |
| 3. Intermediate types | `packages/compiler/src/types.ts` | FigmaNodeDict type definition |
| 4. Compiler | `packages/compiler/src/compiler.ts` | Transforms DslNode → FigmaNodeDict |
| 5. Layout resolver | `packages/compiler/src/layout-resolver.ts` | Computes sizes and positions |
| 6. Text measurer | `packages/compiler/src/text-measurer.ts` | Measures text for layout |
| 7. Renderer | `packages/renderer/src/renderer.ts` | Renders FigmaNodeDict → PNG via Canvas |
| 8. Exporter | `packages/exporter/src/exporter.ts` | Converts to plugin JSON |

**Diagnosis procedure for a missing/broken property:**

1. **Trace the property top-down.** Start at layer 1 and follow it through each layer. The first layer where the property disappears or gets mangled is where the bug is.

2. **Check the type at each boundary.** A property defined in `DslNode` (layer 1) but absent from `FigmaNodeDict` (layer 3) will be silently dropped by the compiler — TypeScript won't complain because the compiler function just doesn't reference it.

3. **Read the compiler passthrough section.** In `compiler.ts`, look at the `compileNode` function where it builds the `result` object. Properties must be explicitly copied from the DslNode to the FigmaNodeDict. If a property isn't in the assignment, it's dropped.

4. **Read the renderer switch/case.** In `renderer.ts`, look at `renderNode`'s switch statement and the helper functions it calls. If a property exists in the FigmaNodeDict but the renderer never reads it, it won't affect the output.

**Common pipeline bug patterns:**

| Pattern | Symptom | Root cause | Fix |
|---|---|---|---|
| Missing type field | Property silently dropped | `FigmaNodeDict` in types.ts doesn't have the field | Add field to types.ts, add passthrough in compiler.ts |
| No compiler passthrough | Property in DSL but not in compiled JSON | `compileNode` doesn't copy the property | Add assignment in compiler.ts |
| Renderer ignores property | JSON correct but PNG wrong | `renderNode` or helpers don't read the field | Update renderer.ts drawing logic |
| Partial support | Works for some values, not others | Renderer handles simple case but not variants | Extend renderer logic (e.g., uniform radius works but per-corner doesn't) |
| Transform accumulation | Children positioned wrong | `compileNodeWithLayout` transform math incorrect | Fix transform composition in compiler.ts |
| Text measurement drift | Text overflows or has wrong height | `text-measurer.ts` metrics don't match renderer's canvas metrics | Align measurement with canvas font rendering |

**After fixing pipeline code:**

1. **Add tests** -- For every pipeline fix, add tests to the relevant `*.test.ts`:
   - Compiler fixes → `packages/compiler/src/compiler.test.ts`
   - Renderer fixes → `packages/renderer/src/renderer.test.ts`
   - Layout fixes → `packages/compiler/src/layout-resolver.test.ts`

2. **Run tests:**
   ```bash
   npx vitest run
   ```

3. **Type-check changed packages:**
   ```bash
   npx tsc --noEmit -p packages/<changed-pkg>/
   ```

4. **Rebuild:**
   ```bash
   npm run build
   ```

5. **Re-render** -- Re-run the batch for affected components:
   ```bash
   bin/figma-dsl batch calibration/<timestamp>/test-suite/<category> -o calibration/<timestamp>-fix<N>
   ```

6. **Save to history** -- Copy outputs to a new history directory for this fix iteration:
   ```bash
   mkdir -p docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>-fix<N>
   cp calibration/<timestamp>-fix<N>/dsl/*.png docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>-fix<N>/
   cp calibration/<timestamp>-fix<N>/batch-manifest.json docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>-fix<N>/
   ```

7. **Re-inspect** -- Read the new PNGs and compare with previous iteration.

8. **Repeat** until all issues are resolved or max iterations reached.

Ask the user before starting the fix loop: "Found N issues (M in DSL files, K in pipeline code). Want me to attempt fixes? (default: up to 3 iterations)"

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

Place `.dsl.ts` files in the workspace and batch them directly:

```bash
bin/figma-dsl batch workspace/dsl/my-component.dsl.ts -o output/
```

Or batch an entire directory:

```bash
bin/figma-dsl batch workspace/dsl/ -o output/ --include "workspace/dsl/my-*.dsl.ts"
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

docs/history/<YYYY-MM-DD_HH-mm>-<theme-name>/
  *.png                 # DSL-rendered PNGs (copied from calibration)
  react-render.png      # React browser screenshot (from capture)
  react-<Component>.png # Per-component React screenshots (optional)
  batch-manifest.json   # Component metadata
  validation.json       # Validator output (JSON)
  validation.log        # Validator output (text)
```

## Commit policy

When committing changes from a calibration run, only commit files under these paths:

- `packages/` — pipeline code fixes (compiler, renderer, dsl-core, etc.)
- `docs/` — history logs, validation results, rendered PNGs

Do **not** commit changes under `preview/`, `examples/`, `workspace/`, `dogfooding/`, `calibration/`, or other directories. Those are working artifacts for local use, not tracked output. Stage files explicitly by path — never use `git add .` or `git add -A`.

## Reference

- See `references/pipeline.md` for the full rendering pipeline architecture
- See `references/categories.md` for the complete list of test variants per category
