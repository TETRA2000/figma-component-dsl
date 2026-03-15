# Dogfooding Workflow — Detailed Steps

## Pre-flight checklist

Before starting any iteration, ensure the environment is ready:

```bash
# Build all packages (compiler, renderer, exporter, CLI)
npm run build

# Verify CLI works
bin/figma-dsl --help

# Check font directory
ls packages/dsl-core/fonts/

# Ensure preview app deps are installed
cd preview && npm ls vite && cd ..
```

### Detecting available browser rendering tools

Check in this order and use the first available:

1. **Claude Preview** — Check if `preview_start` / `preview_screenshot` tools are accessible. This is the preferred option because it's integrated and doesn't require external setup.

2. **Playwright MCP** — Check if `browser_navigate` / `browser_take_screenshot` are accessible. Good alternative with full browser control.

3. **Chrome DevTools MCP** — Check if `navigate_page` / `take_screenshot` are accessible. Also works well.

If none are available, the skill cannot perform browser rendering comparison. Inform the user.

## Step 1: Pick a theme (detailed)

Read `references/themes.md` for the full theme catalog. Selection criteria:

1. **Don't repeat** — Track which themes have been used in this session
2. **Maximize feature coverage** — Each iteration should stress different DSL features
3. **For 3 iterations, recommended:** Travel Cards → Neon Gaming → Banking App

When picking, announce the theme and explain what DSL features it will stress:

> "Iteration 1: **Travel Cards** theme — This will stress per-corner radii, nested auto-layout, text wrapping, and strokes."

## Step 2: Create React components (detailed)

### Component creation

For each theme, create 2-4 components. Follow the create-react-component skill's 3-file pattern:

```
preview/src/components/_generated/{ComponentName}/
  ├── {ComponentName}.tsx         # React component
  ├── {ComponentName}.module.css  # CSS Module
  └── {ComponentName}.figma.tsx   # Code Connect binding
```

Key rules from the create-react-component skill:
- Named exports, not default
- Extend appropriate HTML attributes
- Use CSS Modules with `styles` import
- Class composition: `[styles.root, styles[variant], className ?? ''].filter(Boolean).join(' ')`
- Use design token CSS variables where available

### Page creation

Create a showcase page at `preview/src/pages/_generated/{Theme}Showcase.tsx`:

```tsx
import { ComponentA } from '../components/ComponentA/ComponentA';
import { ComponentB } from '../components/ComponentB/ComponentB';

export function ThemeShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '...' }}>
      {/* Header section */}
      {/* Component demos */}
      {/* Footer */}
    </div>
  );
}
```

Temporarily update `preview/src/App.tsx`:
```tsx
import { ThemeShowcase } from './pages/ThemeShowcase';
function App() { return <ThemeShowcase />; }
```

**Remember to save the original App.tsx import** so it can be restored after dogfooding.

### Register components

Append exports to `preview/src/components/_generated.ts` (create if missing). Do **not** modify `index.ts`.

### Validate

Run the DSL validator on each new component:
```bash
bin/figma-dsl validate preview/src/components/_generated/{ComponentName}/{ComponentName}.tsx
```

Fix any validation errors before proceeding.

## Step 3: Browser rendering (detailed)

### Using Claude Preview

```
1. preview_list — check if server already running
2. preview_start (if needed) — starts Vite dev server
3. Wait for HMR to pick up changes (usually instant)
4. preview_screenshot — captures the page
5. Save the screenshot image for comparison
```

### Using Playwright MCP

```
1. browser_navigate to http://localhost:5173
2. Wait for page to load (browser_wait_for network idle or specific element)
3. browser_take_screenshot — full page capture
4. Save to dogfooding/<timestamp>/iteration-<N>/browser.png
```

### Using Chrome DevTools MCP

```
1. navigate_page to http://localhost:5173
2. take_screenshot — captures current viewport
3. Save to dogfooding/<timestamp>/iteration-<N>/browser.png
```

### Handling the preview server

If no preview server is running:
```bash
cd preview && npm run dev &
# Wait a few seconds for Vite to start
```

Or use `preview_start` if Claude Preview is available.

## Step 4: DSL rendering (detailed)

### Writing the DSL equivalent

The DSL file should recreate the same visual layout as the React page. Key mappings:

| React pattern | DSL equivalent |
|---|---|
| `<div style={{background: '#fff'}}>` | `frame('Name', { fills: [solid('#ffffff')] })` |
| `display: flex; flex-direction: row` | `autoLayout: horizontal({...})` |
| `display: flex; flex-direction: column` | `autoLayout: vertical({...})` |
| `gap: 8px` | `spacing: 8` |
| `padding: 16px 24px` | `padX: 24, padY: 16` |
| `border-radius: 8px` | `cornerRadius: 8` |
| `border-radius: 8px 8px 0 0` | `cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 }` |
| `<p>Text</p>` | `text('Text', { fontSize: 14 })` |
| `border: 1px solid #ccc` | `strokes: [{ color: {...}, weight: 1 }]` |
| `opacity: 0.5` | `opacity: 0.5` |
| `overflow: hidden` | `clipContent: true` |
| `width: 100%` (in flex child) | `layoutSizingHorizontal: 'FILL'` |

### Writing tips

- Use `defineTokens()` for repeated colors
- Create helper functions for repeated component patterns (cards, badges, etc.)
- Set the root frame to `size: { x: 1440, y: <calculated> }` to match browser viewport
- Use rectangle placeholders for images (gray fills)
- Text nodes need explicit `fontSize` and optionally `fontWeight`, `color`

### Write DSL as-intended — don't preemptively avoid features

This is critical for effective dogfooding. Write the DSL using the features that most naturally match the React/CSS patterns — even if you suspect they might not work perfectly. The goal is to expose pipeline gaps, and you can't find gaps in features you never use.

**Do this:**
- Browser uses `opacity: 0.4` on background → use `opacity: 0.4` on the fill, or add a dedicated fill opacity
- Browser centers children → use `counterAlign: 'CENTER'` or `align: 'CENTER'`
- Children stretch to fill parent → use `layoutSizingHorizontal: 'FILL'`
- Text wraps within a container → use `textAutoResize: 'HEIGHT'` with a fixed width

**Don't do this:**
- Pre-bake low-opacity colors (e.g., calculating `#2a1520` instead of using pink at 10% opacity)
- Add extra wrapper frames to force centering
- Use fixed pixel widths instead of FILL sizing
- Restructure the nesting to work around spacing bugs

If a feature doesn't work, that's a discovery — not a reason to restructure the DSL. Log it, investigate the pipeline, and fix it there.

### Compile, render, and export Figma Plugin JSON

```bash
# Compile DSL to intermediate JSON
bin/figma-dsl compile workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/compiled.json

# Render JSON to PNG for visual comparison
bin/figma-dsl render dogfooding/<timestamp>/iteration-<N>/compiled.json -o dogfooding/<timestamp>/iteration-<N>/dsl.png

# Export Figma Plugin JSON — ready to import into Figma via the DSL Import plugin
bin/figma-dsl export workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/figma-plugin.json -p "<Theme Name> Dogfooding"
```

### Why export the Figma Plugin JSON

The `figma-plugin.json` file is the `PluginInput` payload that the Figma DSL Import plugin consumes directly. Generating it during dogfooding serves two purposes:

1. **Validates the full pipeline end-to-end.** The export step runs through `compile → exporter` (the `generatePluginInput` path), which is a different code path than `compile → render`. Bugs that only affect the exporter (e.g., missing property passthrough, incorrect fill conversion, corner radius clamping issues) would go undetected if we only render to PNG.

2. **Produces a ready-to-import artifact.** The user (or a future session) can paste this JSON into the Figma plugin to see exactly how the pipeline's output looks in Figma. This is especially useful for verifying things the PNG renderer can't fully represent — like component property definitions, instance overrides, and auto-layout behavior in Figma's native engine.

The `-p` flag sets the `targetPage` name in the JSON, making it easy to identify which dogfooding iteration the import came from inside Figma.

## Step 5: Compare renders (detailed)

### Visual inspection

Read both PNG files and compare them side by side. Create a detailed comparison table:

```
| Area | Browser | DSL | Match? | Issue type | Root cause guess |
|---|---|---|---|---|---|
| Header background | Navy gradient | Navy gradient | YES | — | — |
| Card corners | Top-rounded | All square | NO | Pipeline | cornerRadii not in renderer |
| Price text | Wraps at card width | Overflows | NO | Pipeline | textAutoResize lost |
| Star rating | 5 orange stars | 5 orange rects | YES (close enough) | DSL | rectangles approximate stars |
| Button gradient | Linear gradient | Solid color | NO | DSL | Missing gradient() in DSL |
```

### Automated comparison (when possible)

```bash
bin/figma-dsl compare \
  dogfooding/<timestamp>/iteration-<N>/browser.png \
  dogfooding/<timestamp>/iteration-<N>/dsl.png \
  -t 85
```

Note: Image dimensions must match for pixel comparison. Browser screenshots may be a different size than DSL renders. This is expected — focus on visual inspection for size-mismatched comparisons.

### Categorizing issues — pipeline investigation is mandatory

Each difference falls into one of these categories, but you must investigate before classifying:

1. **Expected/acceptable** — Stars rendered as rectangles, placeholder images vs real images
2. **DSL authoring error** — Genuine typo or wrong API choice (e.g., `align: 'MIN'` when `SPACE_BETWEEN` was intended)
3. **Pipeline bug** — DSL correctly expresses the design but the compiled JSON or rendered PNG is wrong
4. **Pipeline gap** — The DSL API doesn't offer a way to express what the browser does (e.g., no fill-level opacity separate from node opacity)

Category 3 and 4 are the primary goal of dogfooding. Category 4 is especially important — these are features the pipeline should support but doesn't yet.

**Before classifying anything as category 2, you must rule out categories 3 and 4.** The question to ask: "If I restructure the DSL to work around this, am I hiding a feature the pipeline should support?"

### Example: What pipeline investigation looks like

Suppose the browser shows a card with a subtly tinted background (pink at 8% opacity), but the DSL render shows nothing or the wrong color.

**Wrong approach (DSL workaround):** Calculate the pre-baked color (`#2a1520`) and use `solid('#2a1520')`. Log it as "DSL fix." This hides the fact that the pipeline can't handle low-opacity fills properly.

**Right approach (pipeline investigation):**
1. Write the DSL with `solid('#ff2d55', 0.08)` — expressing the intent directly
2. Compile and check the JSON — does the fill have `opacity: 0.08`?
3. If yes, check the renderer — does it use fill opacity when painting?
4. If the renderer ignores fill opacity, fix the renderer
5. If the DSL core doesn't pass opacity through to the fill, fix the factory function

Even if you can't fix the pipeline bug right now (maybe it's too complex), log it as a known pipeline gap in the history — don't silently work around it.

## Step 6: Investigate and fix root causes (detailed)

### Step 6.1 — For every mismatch, investigate the pipeline first

This is not optional. Before touching the `.dsl.ts` file, trace the property through the pipeline:

1. **Compile and inspect JSON:**
   ```bash
   bin/figma-dsl compile workspace/dsl/{theme}-page.dsl.ts -o /tmp/debug.json
   ```
   Read the JSON — is the property present and correct?

2. **Read the actual source code at each pipeline layer:**
   - Layer 1: `packages/dsl-core/src/types.ts` — Is the property in DslNode?
   - Layer 2: `packages/dsl-core/src/nodes.ts` — Does the factory accept and pass it through?
   - Layer 3: `packages/compiler/src/types.ts` — Is it in FigmaNodeDict?
   - Layer 4: `packages/compiler/src/compiler.ts` — Does compileNode copy it?
   - Layer 5: `packages/compiler/src/layout-resolver.ts` — Does layout resolution handle it?
   - Layer 6: `packages/renderer/src/renderer.ts` — Does the renderer actually use it?

   You must actually read these files — don't guess based on whether the output looks right.

3. **Fix the first layer where the property disappears or is mishandled**

4. **Rebuild, re-render, and re-export:**
   ```bash
   npm run build
   bin/figma-dsl compile workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/compiled.json
   bin/figma-dsl render dogfooding/<timestamp>/iteration-<N>/compiled.json -o dogfooding/<timestamp>/iteration-<N>/dsl-fix1.png
   bin/figma-dsl export workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/figma-plugin.json -p "<Theme Name> Dogfooding"
   ```

5. **Re-inspect** the new render to verify the fix

### Step 6.2 — Only then consider DSL authoring fixes

After pipeline investigation, if the issue is genuinely a DSL authoring error (wrong API, typo, logical mistake in the helper function), fix the `.dsl.ts` file:

```bash
bin/figma-dsl compile workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/compiled.json
bin/figma-dsl render dogfooding/<timestamp>/iteration-<N>/compiled.json -o dogfooding/<timestamp>/iteration-<N>/dsl-fix1.png
bin/figma-dsl export workspace/dsl/{theme}-page.dsl.ts -o dogfooding/<timestamp>/iteration-<N>/figma-plugin.json -p "<Theme Name> Dogfooding"
```

### Step 6.3 — Log pipeline gaps even when unfixed

If you discover a pipeline limitation you can't fix in this iteration (too complex, needs design discussion, etc.), log it in the history under a "Known Pipeline Gaps" section:

```markdown
## Known pipeline gaps (not fixed)
- **Fill-level opacity**: The renderer applies opacity to the entire node, not per-fill.
  Workaround: pre-bake colors. Pipeline fix needed in `renderer.ts` paint logic.
- **Child centering without explicit parent width**: Layout resolver requires parent
  to have fixed width for `counterAlign: 'CENTER'` to work on children.
```

This ensures future sessions can pick up where you left off instead of rediscovering the same gaps.

## Step 7: Update docs and tests (detailed)

### Adding tests

For compiler fixes, add to `packages/compiler/src/compiler.test.ts`:
```typescript
it('passes <property> through to compiled output', () => {
  const node = frame('Root', { /* ... with the property */ });
  const result = compile(node);
  expect(result.root.<property>).toEqual(/* expected */);
});
```

For renderer fixes, add to `packages/renderer/src/renderer.test.ts`:
```typescript
it('renders <feature> correctly', () => {
  const node = frame('Root', {
    size: { x: 100, y: 100 },
    fills: [solid('#0000ff')],
    /* ... with the feature */
  });
  const compiled = compile(node);
  const result = render(compiled.root);
  expect(result.pngBuffer.length).toBeGreaterThan(0);
});
```

### Running tests

```bash
# Run all tests
npx vitest run

# Type-check affected packages
npx tsc --noEmit -p packages/compiler/
npx tsc --noEmit -p packages/renderer/
```

### Updating docs

Check if the fix changes behavior documented in:
- `docs/packages/compiler.md` — Type System, Known Limitations sections
- `docs/packages/renderer.md` — Shape Rendering, Known Limitations sections

Update the relevant sections. If a known limitation is resolved, mark it with strikethrough.

## Step 8: Commit (detailed)

### Separate pipeline fixes from component additions

**Pipeline fix commit:**
```bash
git add packages/ docs/
git commit -m "fix(renderer): support <feature> in rendering pipeline

Discovered via dogfooding iteration <N> (<theme> theme).
<Root cause>: <what was missing/broken>
<Fix>: <what was changed>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Component addition commit** (optional, only if the user wants components committed):
```bash
git add preview/src/components/_generated/<New>/ preview/src/pages/_generated/ workspace/dsl/<theme>.dsl.ts
git commit -m "feat: add <theme> components and DSL for dogfooding

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Important: Ask before committing components

Pipeline fixes should be committed (they're the whole point of dogfooding). But component/page additions are more optional — ask the user if they want those committed too, since they may be considered throwaway test artifacts.

## Step 9: Log to history (detailed)

After each iteration completes (including any fixes), create a permanent record in `docs/history/`. This prevents future sessions from repeating themes and preserves visual evidence of what was found and fixed.

### Create the iteration log file

Write to `docs/history/<date>-<theme-slug>.md` (e.g., `2026-03-14-travel-cards.md`):

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
![Browser render](images/<date>-<theme-slug>-browser.png)

### DSL Pipeline
![DSL render](images/<date>-<theme-slug>-dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| <area> | YES/NO | <description> | DSL/Pipeline | YES/NO |

## Pipeline fixes
- **<fix title>**: <root cause> → <what was changed> (files: <list>)
- ...

## Known pipeline gaps (not fixed)
- **<gap title>**: <description of what the pipeline can't do>
  Workaround used: <what the DSL did instead>
  Fix needed in: <which pipeline layer>

## Figma Plugin JSON
Ready-to-import file: [figma-plugin/<date>-<theme-slug>-plugin.json](figma-plugin/<date>-<theme-slug>-plugin.json)

## Commits
- `<hash>` — <commit message summary>
```

### Copy render images and Figma Plugin JSON to history

The `dogfooding/` working directory may be cleaned up later, so copy artifacts to a persistent location:

```bash
mkdir -p docs/history/images docs/history/figma-plugin
cp dogfooding/<timestamp>/iteration-<N>/browser.png docs/history/images/<date>-<theme-slug>-browser.png
cp dogfooding/<timestamp>/iteration-<N>/dsl.png docs/history/images/<date>-<theme-slug>-dsl.png
cp dogfooding/<timestamp>/iteration-<N>/figma-plugin.json docs/history/figma-plugin/<date>-<theme-slug>-plugin.json
```

Update the image paths in the log file to reference these local copies (relative paths from `docs/history/`). Include a link to the Figma Plugin JSON so the user can find and import it into Figma.

### Update the history index

Prepend a new entry to `docs/history/README.md`, immediately below the `<!-- New entries are prepended below this line -->` comment:

```markdown
- [<date> — <Theme Name>](<date>-<theme-slug>.md) — <N> issues found, <M> pipeline fixes | Features: <list>
```

### Why this matters

Without persistent history, future dogfooding sessions have no way to know which themes and features have already been tested. The history log enables:
1. **Theme deduplication** — Step 1 reads history to avoid repeating themes
2. **Visual regression tracking** — Render PNGs show exactly what the pipeline produced at each point in time
3. **Fix audit trail** — Pipeline fixes are linked to the specific visual difference that motivated them

## Iteration report template

After each iteration, provide a brief summary:

```
### Iteration <N>: <Theme Name>

**Components created:** <list>
**DSL features exercised:** <list>

**Issues found:** <count>
| # | Description | Type | Fixed? | Affected file |
|---|---|---|---|---|
| 1 | Per-corner radii dropped | Pipeline | YES | types.ts, compiler.ts, renderer.ts |
| 2 | Missing gradient in DSL | DSL | YES | workspace/dsl/{theme}-page.dsl.ts |

**Pipeline commits:** <commit hashes>
```
