---
name: dogfooding
description: >
  End-to-end dogfooding loop that stress-tests the DSL rendering pipeline by
  creating React components with a random theme, rendering them both via browser
  and DSL, comparing the results, and fixing any pipeline bugs found. Each
  iteration uses a different visual style to maximize coverage. Use this skill
  whenever the user wants to dogfood the pipeline, run an end-to-end rendering
  comparison, stress-test the compiler/renderer, find pipeline bugs automatically,
  or improve rendering fidelity. Also trigger when the user says things like
  "dogfood", "e2e test the pipeline", "find rendering bugs", "compare React vs
  DSL", "stress test rendering", "run the full loop", or wants to systematically
  discover and fix differences between browser rendering and DSL rendering.
---

# Dogfooding: End-to-End Pipeline Stress Test

Dogfooding validates the entire DSL rendering pipeline by creating real React components first, rendering them in the browser, then recreating them as DSL and comparing the results. Each iteration uses a different visual theme to surface bugs that only appear with specific property combinations.

## CRITICAL: Execution Order — React Pages First, DSL Second

**You MUST create React components and pages BEFORE writing any DSL.** The workflow is strictly sequential:

1. **First:** Create React components (`.tsx`, `.module.css`, `.figma.tsx`)
2. **Second:** Create a showcase page that renders the components
3. **Third:** Capture a browser screenshot of the React page
4. **Fourth (only after React is done and screenshot captured):** Write the DSL equivalent

The React components are the **source of truth**. The DSL file is a translation of the already-working React page. You cannot write DSL without first having a concrete React page to translate from.

**Do NOT skip ahead to DSL creation.** Even if the user's request mentions DSL, pages, or Figma — always start by building the React components and pages first.

## Pipeline-First Investigation Mindset

The core insight: if a React component renders correctly in the browser but looks different when expressed as DSL and rendered via the pipeline, there's a bug in the pipeline — not the component. This skill systematically finds those bugs.

The entire purpose of dogfooding is to **find and fix bugs in `packages/`** — the compiler, renderer, layout resolver, and type definitions. When you find a difference between browser and DSL renders, your default assumption should be that the pipeline has a gap, not that the DSL was written wrong.

**A "DSL fix" that restructures the DSL to avoid a feature is not a fix — it's hiding a bug.** Every time you consider patching the `.dsl.ts` file, first ask: "Am I working around a missing or broken pipeline feature?" If the answer is yes, the fix belongs in `packages/`, not in the DSL.

Here's why this matters: if you "fix" a centering issue by adding a wrapper frame to the DSL, the pipeline still can't center things. The next person who writes DSL will hit the same problem. But if you fix the layout resolver to handle centering, every DSL file benefits forever.

**Red flags that a "DSL fix" is masking a pipeline bug:**
- Adding wrapper frames for centering or alignment → layout resolver may not handle centering within a parent
- Switching from opacity on fills to pre-baked colors → renderer may not support independent fill opacity vs. node opacity
- Avoiding `layoutSizingHorizontal: 'FILL'` → layout resolver may not compute FILL correctly
- Using fixed pixel sizes instead of HUG → HUG content sizing may be broken in the layout resolver
- Restructuring nesting to get correct spacing → nested auto-layout calculation may be off

**The only legitimate "DSL fix"** is when the DSL genuinely had a typo or used the wrong API for the author's intent — e.g., writing `align: 'MIN'` when `SPACE_BETWEEN` was clearly what was meant. If the DSL correctly expressed the design but the pipeline doesn't support it, that's a pipeline bug, period.

**Pipeline investigation is mandatory.** For every visual difference found, you must trace through the pipeline layers (see Step 6) before classifying it. Even if you end up concluding it's a genuine DSL error, the investigation itself may reveal pipeline gaps worth logging for future work.

## Prerequisites check

Before starting, verify that the necessary tools are available. Run these checks and report any missing dependencies:

```bash
# 1. Check CLI is built
bin/figma-dsl --help

# 2. Check preview app dependencies
cd preview && npm ls vite && cd ..

# 3. Check packages are built
npm run build

# 4. Check fonts are available
ls packages/dsl-core/fonts/*.otf
```

For browser rendering, one of these tools is needed (in priority order):
1. **Claude Preview** (`preview_start`, `preview_screenshot`) — preferred, integrated
2. **Playwright MCP** (`browser_navigate`, `browser_take_screenshot`) — good alternative
3. **Chrome DevTools MCP** (`take_screenshot`, `navigate_page`) — also works

Check which is available and use the first one found. If none are available, inform the user and stop.

## Configuration

| Setting | Default | Description |
|---|---|---|
| Iterations | 3 | Number of theme loops to run |
| Fix attempts per iteration | 3 | Max pipeline fix attempts per issue |
| Comparison threshold | 85% | Similarity score to consider "passing" |
| Output directory | `dogfooding/<timestamp>/` | Where renders and reports go |

Before starting, ask the user: **"I'll run N iterations, each with a different theme. Each iteration creates components, renders both ways, compares, and fixes any pipeline bugs. Ready to start?"**

## The iteration loop

Each iteration follows these 8 steps. See `references/workflow.md` for detailed instructions on each step.

**Reminder: Steps 2-3 (React components + browser screenshot) MUST be completed before Step 4 (DSL). Never jump ahead to DSL creation.**

### Step 1: Pick a theme

Before selecting a theme, read `docs/history/README.md` to see which themes have been used in past sessions. Then check `references/themes.md` for the full catalog.

**Theme selection rules:**
1. Read `docs/history/README.md` — note every theme already used (across all past sessions, not just this one)
2. Eliminate those from the candidate pool
3. From the remaining themes, pick one that maximizes DSL feature coverage relative to what's already been tested
4. If all 10 catalog themes have been used, invent a new one — use a different visual domain (e.g., healthcare, education, real estate, fitness) and tag it with which DSL features it stresses

The goal is variety — each iteration should stress a different combination of DSL features:
- Iteration 1 might focus on gradients and rounded corners
- Iteration 2 might stress nested auto-layout and text wrapping
- Iteration 3 might test opacity, strokes, and clip content

### Step 2: Create React components ⬅ START HERE (before any DSL)

Use the `/create-react-component` skill pattern to generate 2-4 components matching the theme. Create them at `preview/src/components/_generated/{ComponentName}/` with the standard 3-file structure (`.tsx`, `.module.css`, `.figma.tsx`).

Then create a showcase page at `preview/src/pages/_generated/{Theme}Showcase.tsx` that renders all the components together. Temporarily point `preview/src/App.tsx` at the new page.

### Step 3: Render via browser

Start the preview server (or use an existing one) and capture a screenshot:

**Using Claude Preview:**
```
preview_start (if not running)
preview_screenshot → save to dogfooding/<timestamp>/iteration-<N>/browser.png
```

**Using Playwright MCP:**
```
browser_navigate to http://localhost:5173
browser_take_screenshot → save to dogfooding/<timestamp>/iteration-<N>/browser.png
```

**Using Chrome DevTools MCP:**
```
navigate_page to http://localhost:5173
take_screenshot → save to dogfooding/<timestamp>/iteration-<N>/browser.png
```

### Step 4: Create DSL equivalent, render, and export Figma Plugin JSON (AFTER Steps 2-3 are complete)

**Prerequisite:** Steps 2 and 3 must be fully complete — React components created, showcase page rendering in browser, and browser screenshot captured. Only then write the DSL.

Write a `.dsl.ts` file that recreates the same page layout using DSL primitives (`frame`, `text`, `rectangle`, `solid`, `gradient`, `horizontal`, `vertical`, etc.). Place it at `workspace/dsl/{theme-name}-page.dsl.ts`.

Then compile, render, and export the Figma Plugin JSON:
```bash
# Compile DSL to intermediate JSON
bin/figma-dsl compile workspace/dsl/{theme-name}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/compiled.json

# Render to PNG for visual comparison
bin/figma-dsl render dogfooding/<timestamp>/iteration-<N>/compiled.json -o dogfooding/<timestamp>/iteration-<N>/dsl.png

# Export Figma Plugin JSON — this is the file the Figma plugin can import directly
bin/figma-dsl export workspace/dsl/{theme-name}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/figma-plugin.json -p "<Theme Name> Dogfooding"
```

The `figma-plugin.json` file is the Figma-importable payload (`PluginInput` format with `schemaVersion`, `targetPage`, and `components` array). Keeping it alongside the compiled JSON and rendered PNG serves two purposes: (1) it validates the full compile → export pipeline end-to-end, and (2) it gives the user a ready-to-import artifact they can paste into the Figma DSL Import plugin to verify the design in Figma itself.

### Step 5: Compare renders

Visually inspect both renders side by side by reading both PNG files. Create a comparison report. For each mismatch, note whether the DSL **attempted** the correct feature — this is critical for determining whether the issue is a DSL error or a pipeline gap:

| Area | Browser | DSL attempted? | DSL result | Match? | Likely cause |
|---|---|---|---|---|---|
| Header layout | correct | correct API | correct | YES | — |
| Card corners | rounded | used cornerRadii | square | NO | Pipeline: cornerRadii not compiled |
| Text wrapping | wraps at 200px | used textAutoResize | overflows | NO | Pipeline: textAutoResize lost |
| Button gradient | gradient | used gradient() | solid color | NO | Pipeline: gradient rendering bug |

The "DSL attempted?" column is key — if the DSL correctly used the right API and the output is still wrong, that's a pipeline bug, not a DSL error.

Also run the CLI comparison if both images are the same dimensions:
```bash
bin/figma-dsl compare dogfooding/<timestamp>/iteration-<N>/browser.png dogfooding/<timestamp>/iteration-<N>/dsl.png -t 85
```

### Step 6: Investigate and fix root causes (pipeline first!)

For every visual difference, follow this investigation sequence. Do not skip steps or jump to "DSL fix" without completing the investigation.

**Step 6.1 — Write the DSL as-intended first.** Express the design using the DSL features that most naturally match the CSS/React pattern. Don't preemptively avoid features you think might not work — use them and let the pipeline fail visibly. For example:
- If the browser uses `opacity: 0.4`, use `opacity: 0.4` on the fill (not pre-baked colors)
- If the browser centers children, use `counterAlign: 'CENTER'` (not wrapper frames)
- If children stretch to fill, use `layoutSizingHorizontal: 'FILL'` (not fixed widths)

**Step 6.2 — Compile and inspect the JSON.** Read the compiled JSON output. Is the property present and correct? If it's missing or wrong, the bug is in the compiler or DSL-core types.

**Step 6.3 — Check the rendered PNG.** If the JSON looks correct but the PNG doesn't match, the bug is in the renderer or layout resolver.

**Step 6.4 — Trace through the pipeline layers.** For any property that's missing or wrong, read the actual source code at each layer to find where it drops:
1. `packages/dsl-core/src/types.ts` — DslNode type definition
2. `packages/dsl-core/src/nodes.ts` — Factory functions
3. `packages/compiler/src/types.ts` — FigmaNodeDict type
4. `packages/compiler/src/compiler.ts` — Compilation passthrough
5. `packages/compiler/src/layout-resolver.ts` — Layout resolution
6. `packages/renderer/src/renderer.ts` — Canvas rendering

**Step 6.5 — Fix the pipeline.** Fix the first layer where the property disappears or is mishandled. Then `npm run build`, re-compile, re-render, and verify the fix.

**Step 6.6 — Only then consider DSL fixes.** After pipeline investigation is complete, if a difference is genuinely caused by incorrect DSL authoring (wrong API choice, typo, logical error), fix the DSL file. But log any pipeline limitations you discovered during investigation — even if you can't fix them now, they should appear in the history log as "known pipeline gaps."

See `references/workflow.md` for detailed examples of the investigation process.

### Step 7: Update docs and tests

For every pipeline fix:

1. **Add tests** to the relevant `*.test.ts` file
2. **Run all tests:** `npx vitest run`
3. **Type-check:** `npx tsc --noEmit -p packages/<pkg>/`
4. **Update docs** if the fix changes behavior documented in `docs/packages/*.md`

**Update `docs/dsl-reference.md`** whenever you:
- Fix a DSL authoring error (e.g., wrong `align` vs `counterAlign` usage) — add/update the relevant pattern or gotcha
- Discover a new pipeline limitation — add it to the "Known Pipeline Limitations" table
- Find a useful DSL pattern not yet documented (new UI patterns, layout tricks, workarounds) — add it to the "Authoring Patterns" section
- Fix a pipeline bug that changes how a documented feature works — update the affected section

This is the project's canonical DSL authoring reference. Keeping it current ensures future DSL authors don't hit the same issues.

### Step 8: Commit

Stage and commit the changes from this iteration:

```bash
git add packages/ docs/
git commit -m "fix(<area>): <what was fixed>

Discovered via dogfooding iteration <N> (<theme-name> theme).
<brief description of the root cause and fix>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Keep pipeline fixes in their own commit, separate from component/page additions.

**Figma Plugin JSON files** are always left in `dogfooding/<timestamp>/iteration-<N>/figma-plugin.json` (and persisted to `docs/history/figma-plugin/` — see Step 9). These are generated artifacts so they're not committed to git by default, but they remain on disk for the user to import into Figma at any time.

### Step 9: Log to history

After each iteration, write a history log to `docs/history/`. This is the project's permanent record of dogfooding work — it prevents future sessions from repeating themes and preserves visual evidence of what was found and fixed.

**Create the iteration log file:** `docs/history/<date>-<theme-slug>.md`

```markdown
# Dogfooding: <Theme Name>
> Date: <YYYY-MM-DD> | Iteration: <N> of <total>

## Theme
**<Theme Name>** — <one-line description of visual style>
DSL features stressed: <comma-separated list>

## Components created
- `<ComponentName>` — <brief description>
- ...

## Renders

### Browser (React)
![Browser render](../../dogfooding/<timestamp>/iteration-<N>/browser.png)

### DSL Pipeline
![DSL render](../../dogfooding/<timestamp>/iteration-<N>/dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| <area> | YES/NO | <description> | DSL/Pipeline | YES/NO |

## Pipeline fixes
- **<fix title>**: <root cause> → <what was changed> (files: <list>)
- ...

## Known pipeline gaps (not fixed)
- **<gap title>**: <description>. Workaround: <what DSL did instead>. Fix needed in: <pipeline layer>.

## Figma Plugin JSON
Ready-to-import file: [figma-plugin/<date>-<theme-slug>-plugin.json](figma-plugin/<date>-<theme-slug>-plugin.json)

## Commits
- `<hash>` — <commit message summary>
```

**Copy render PNGs and Figma Plugin JSON to history:** Also copy the browser/DSL render PNGs and the Figma Plugin JSON into `docs/history/` with descriptive names so they persist even if the `dogfooding/` working directory is cleaned up:

```bash
mkdir -p docs/history/images docs/history/figma-plugin
cp dogfooding/<timestamp>/iteration-<N>/browser.png docs/history/images/<date>-<theme-slug>-browser.png
cp dogfooding/<timestamp>/iteration-<N>/dsl.png docs/history/images/<date>-<theme-slug>-dsl.png
cp dogfooding/<timestamp>/iteration-<N>/figma-plugin.json docs/history/figma-plugin/<date>-<theme-slug>-plugin.json
```

Update the image paths in the log file to reference these local copies. Add a link to the Figma Plugin JSON in the log file so the user can find it easily:

```markdown
## Figma Plugin JSON
Ready-to-import file: [figma-plugin/<date>-<theme-slug>-plugin.json](figma-plugin/<date>-<theme-slug>-plugin.json)
```

**Update the index:** Prepend an entry to `docs/history/README.md`:

```markdown
- [<date> — <Theme Name>](<date>-<theme-slug>.md) — <N> issues found, <M> pipeline fixes | Features: <list>
```

## After all iterations

Summarize what was found and fixed across all iterations:

```
## Dogfooding Report — <date>

### Iterations completed: N/N

| # | Theme | Components | Issues found | Pipeline fixes | DSL fixes |
|---|---|---|---|---|---|
| 1 | Spotify Dark | 3 | 2 | 1 | 1 |
| 2 | Travel Cards | 4 | 1 | 1 | 0 |
| 3 | Dashboard | 2 | 0 | 0 | 0 |

### Pipeline fixes applied:
- <list of fixes with affected files>

### Remaining known issues:
- <any issues that couldn't be resolved>
```

## Restoring App.tsx

After dogfooding is complete, restore `preview/src/App.tsx` to its previous state (before the skill modified it). The showcase pages remain in `preview/src/pages/` for future reference.

## Reference files

- `references/themes.md` — Pool of visual themes with DSL feature coverage tags
- `references/workflow.md` — Detailed step-by-step instructions for each phase
