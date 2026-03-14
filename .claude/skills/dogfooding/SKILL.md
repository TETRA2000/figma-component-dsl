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

Dogfooding validates the entire DSL rendering pipeline by creating real components, rendering them two ways (browser and DSL), and fixing any differences found. Each iteration uses a different visual theme to surface bugs that only appear with specific property combinations.

The core insight: if a React component renders correctly in the browser but looks different when expressed as DSL and rendered via the pipeline, there's a bug in the pipeline — not the component. This skill systematically finds those bugs.

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

### Step 2: Create React components

Use the `/create-react-component` skill pattern to generate 2-4 components matching the theme. Create them at `preview/src/components/{ComponentName}/` with the standard 3-file structure (`.tsx`, `.module.css`, `.figma.tsx`).

Then create a showcase page at `preview/src/pages/{Theme}Showcase.tsx` that renders all the components together. Temporarily point `preview/src/App.tsx` at the new page.

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

### Step 4: Create DSL equivalent and render

Write a `.dsl.ts` file that recreates the same page layout using DSL primitives (`frame`, `text`, `rectangle`, `solid`, `gradient`, `horizontal`, `vertical`, etc.). Place it at `examples/{theme-name}-page.dsl.ts`.

Then compile and render:
```bash
bin/figma-dsl compile examples/{theme-name}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/compiled.json
bin/figma-dsl render dogfooding/<timestamp>/iteration-<N>/compiled.json -o dogfooding/<timestamp>/iteration-<N>/dsl.png
```

### Step 5: Compare renders

Visually inspect both renders side by side by reading both PNG files. Create a comparison report:

| Area | Browser | DSL | Match? | Issue |
|---|---|---|---|---|
| Header layout | correct | correct | yes | — |
| Card corners | rounded | square | NO | cornerRadii not supported |
| Text wrapping | wraps at 200px | overflows | NO | textAutoResize lost |

Also run the CLI comparison if both images are the same dimensions:
```bash
bin/figma-dsl compare dogfooding/<timestamp>/iteration-<N>/browser.png dogfooding/<timestamp>/iteration-<N>/dsl.png -t 85
```

### Step 6: Fix root causes

For each difference found, follow the calibrate skill's **root cause triage** process (see `.claude/skills/calibrate/SKILL.md`, Step 3.5):

1. **Check the DSL source** — Is the DSL correctly expressing the design?
2. **Check the compiled JSON** — Did the property make it through compilation?
3. **Check the rendered PNG** — Is the renderer handling it?
4. **Check type definitions** — Is `FigmaNodeDict` missing a field?

Tag each issue as **DSL fix** (fix the `.dsl.ts` file) or **pipeline fix** (fix packages code).

For pipeline fixes, trace the property through each layer:
1. `packages/dsl-core/src/types.ts` — DslNode type
2. `packages/dsl-core/src/nodes.ts` — Factory functions
3. `packages/compiler/src/types.ts` — FigmaNodeDict type
4. `packages/compiler/src/compiler.ts` — Compilation passthrough
5. `packages/compiler/src/layout-resolver.ts` — Layout resolution
6. `packages/renderer/src/renderer.ts` — Canvas rendering

Fix the first layer where the property disappears. Then rebuild and re-render to verify.

### Step 7: Update docs and tests

For every pipeline fix:

1. **Add tests** to the relevant `*.test.ts` file
2. **Run all tests:** `npx vitest run`
3. **Type-check:** `npx tsc --noEmit -p packages/<pkg>/`
4. **Update docs** if the fix changes behavior documented in `docs/packages/*.md`

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

## Commits
- `<hash>` — <commit message summary>
```

**Copy render PNGs to history:** Also copy the browser and DSL render PNGs into `docs/history/images/` with descriptive names so they persist even if the `dogfooding/` working directory is cleaned up:

```bash
mkdir -p docs/history/images
cp dogfooding/<timestamp>/iteration-<N>/browser.png docs/history/images/<date>-<theme-slug>-browser.png
cp dogfooding/<timestamp>/iteration-<N>/dsl.png docs/history/images/<date>-<theme-slug>-dsl.png
```

Update the image paths in the log file to reference these local copies.

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
