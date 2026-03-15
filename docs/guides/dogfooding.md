# Dogfooding

Audience: Developers maintaining the rendering pipeline

This guide covers the dogfooding workflow — creating real-world themed components to stress-test the DSL pipeline end-to-end and find bugs that synthetic test suites miss.

## How Dogfooding Differs from Calibration

| Aspect         | Calibration                                    | Dogfooding                                      |
|----------------|------------------------------------------------|--------------------------------------------------|
| **Components** | Synthetic, targeting one property category     | Real-world, using many properties together       |
| **Goal**       | Measure accuracy of specific features          | Find bugs from realistic property combinations   |
| **Themes**     | N/A                                            | Each iteration uses a different visual theme     |
| **Output**     | Batch-rendered PNGs with similarity scores     | Side-by-side browser vs. DSL renders             |

Calibration tests features in isolation. Dogfooding tests them as they appear in practice — nested layouts with gradients, mixed typography, opacity layers, and more.

## The Pipeline-First Mindset

The most important rule of dogfooding: **fix the pipeline, not the DSL.**

When a DSL render doesn't match the browser render, it's tempting to restructure the DSL to work around the issue. But if the DSL correctly expresses the design and the output is wrong, the bug is in the pipeline (compiler, layout-resolver, or renderer), not the DSL.

Red flags that you're masking a pipeline bug:

- Restructuring a DSL layout to avoid a feature that "doesn't work"
- Adding extra wrapper nodes to compensate for broken spacing
- Using different DSL primitives than the design naturally calls for
- Manually calculating sizes instead of using auto-layout

## The Iteration Loop

Each dogfooding session runs 3 iterations, each with a different theme to maximize feature coverage.

### 1. Pick a theme

Choose a visual theme that hasn't been used recently. Each theme should stress different DSL features:

| Theme Example     | DSL Features Stressed                                    |
|-------------------|----------------------------------------------------------|
| Travel Cards      | Per-corner radii, nested auto-layout, text wrapping      |
| Neon Gaming       | Opacity, strokes, gradient fills, bold typography        |
| Banking Dashboard | FILL sizing, complex backgrounds, icon layouts           |
| Food Delivery     | Image fills, mixed radii, shadow simulation              |

Check `docs/history/README.md` for previously used themes.

### 2. Create React components

Create 2-4 React components following the [Creating Components](creating-components.md) workflow. Place them at `preview/src/components/_generated/{ComponentName}/`.

### 3. Create a showcase page

Build a page composing all the theme's components (see [Composing Pages](composing-pages.md)). Temporarily update `preview/src/App.tsx` to render it.

### 4. Render via browser

Start the preview dev server and capture a screenshot of the page.

### 5. Create the DSL equivalent

Write a `.dsl.ts` file that recreates the same layout using DSL primitives. Compile and render it:

```bash
bin/figma-dsl compile workspace/dsl/theme-page.dsl.ts -o output/compiled.json
bin/figma-dsl render output/compiled.json -o output/dsl.png
```

### 6. Compare renders

Place the browser screenshot and DSL render side by side. For an automated similarity score:

```bash
bin/figma-dsl compare output/browser.png output/dsl.png -d output/diff.png
```

Note which DSL features were *attempted* — this is critical for triage.

### 7. Investigate and fix

For each visual difference:

1. **Write the DSL as intended** — use the natural feature mapping, don't preemptively avoid features
2. **Compile and inspect the JSON** — is the property present in the compiled output?
3. **Check the PNG** — does the rendered image reflect the compiled JSON?
4. **Trace through pipeline layers** — find the first layer where the property disappears (see [Calibrating the Pipeline](calibrating-the-pipeline.md) for the layer table)
5. **Fix the pipeline code**, add tests, type-check, rebuild, re-render
6. Only after pipeline investigation: fix the DSL if it was genuinely incorrect

### 8. Document and commit

For each iteration:

1. Write a history log at `docs/history/<date>-<theme-slug>.md`
2. Copy relevant PNGs to `docs/history/images/`
3. Update `docs/history/README.md` with a new entry
4. Commit pipeline fixes to `packages/`

After all iterations, restore `preview/src/App.tsx` to its original state.

## What's Next

- [Calibrating the Pipeline](calibrating-the-pipeline.md) — targeted testing of specific DSL features
- [Creating Components](creating-components.md) — component authoring rules
