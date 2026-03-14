---
name: verify-changeset
description: >
  Verify visual fidelity between a Figma design export and a React component
  by rendering both, comparing images, and iteratively fixing differences.
  Uses the complete DSL JSON export as the reference image (reflecting the
  designer's intended state) and compares against the React component's browser
  rendering. Use this skill whenever the user wants to verify design-code
  consistency, compare Figma exports against React renders, check visual fidelity,
  or validate that changeset application produced correct results. Also trigger
  when the user says things like "verify changeset", "check visual fidelity",
  "compare design vs code", "does the component match", "verify the renders",
  or mentions visual comparison between Figma and React.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Verify Changeset

Verify visual fidelity between a complete DSL JSON export (from Figma) and a React component by rendering both, comparing images, and iteratively fixing code differences.

## Input

The user provides:
1. **Complete DSL JSON export file path** — a `PluginInput` JSON file exported from the Figma DSL plugin's Export tab (Complete mode). This reflects the designer's intended state and serves as the reference image.
2. **React component name or URL** — the React component to compare against. Either a component name (resolved to `preview/src/components/{Name}/{Name}.tsx`) or a URL to capture.

## Configuration

| Parameter | Default | Description |
|---|---|---|
| Similarity threshold | 95% | Minimum similarity score to pass |
| Max iterations | 3 | Maximum correction rounds |
| Scale | 1x | PNG export scale |

## Verification Flow

### Step 1: Render Reference Image

Render the complete DSL JSON export to a PNG using the existing pipeline:

```bash
# Compile the exported JSON to render-ready format, then render to PNG
npx figma-dsl render <complete-export.json> -o reference.png
```

If the `render` command doesn't accept JSON directly, use the exporter to first process it, then render:

```bash
npx figma-dsl export <file> -o plugin-input.json
npx figma-dsl render plugin-input.json -o reference.png
```

The reference image represents the designer's intended visual state — it is the source of truth.

### Step 2: Capture React Component

Capture the React component to a PNG using the existing capturer:

```bash
npx figma-dsl capture <url> -o react-capture.png
```

If the user provided a component name instead of a URL:
1. Check if the dev server is running (default: `http://localhost:5173`)
2. Navigate to the component's preview page
3. Capture the component

### Step 3: Compare Images

Compare the reference and React capture using the existing comparator:

```bash
npx figma-dsl compare reference.png react-capture.png -d diff.png
```

This outputs a similarity score (0-100%) and optionally a diff image highlighting differences.

### Step 4: Evaluate Result

- If similarity >= threshold (default 95%): **PASS** — report success
- If similarity < threshold: **FAIL** — proceed to correction

### Step 5: Iterative Correction (if needed)

For each iteration (up to max iterations):

1. **Analyze the diff image**: Read the diff PNG to identify visual differences
2. **Identify the cause**: Determine which CSS properties or JSX elements differ
3. **Fix the React code**: Apply targeted edits to the React component and CSS module
4. **Re-capture**: Take a new screenshot of the React component
5. **Re-compare**: Run the comparison again
6. **Check threshold**: If now passing, stop iteration

### Step 6: Display Results

Use Claude Desktop's preview feature to display side-by-side comparison:

- Reference image (DSL export render)
- React capture
- Diff image (if applicable)

## Final Report

```
## Visual Verification Report

**Component**: {ComponentName}
**Reference**: {complete-export-file}
**Status**: PASS / FAIL

### Comparison Results
- **Final similarity**: {score}%
- **Threshold**: {threshold}%
- **Iterations**: {count}/{max}

### Changes Made During Iteration
1. {description of fix applied in iteration 1}
2. {description of fix applied in iteration 2}
...

### Visual Comparison
- Reference: reference.png
- React: react-capture.png
- Diff: diff.png (if applicable)
```

## Error Handling

- **Render failure**: Report error, suggest checking the DSL JSON export format
- **Capture failure**: Report error, suggest checking the dev server URL
- **Comparison timeout**: Report last known similarity score
- **Max iterations reached without passing**: Report final score and remaining differences

## CLI Commands Reference

The verification skill uses these existing CLI commands:

| Command | Purpose |
|---|---|
| `npx figma-dsl render <input> -o <output.png>` | Render DSL input to PNG |
| `npx figma-dsl capture <url> -o <output.png>` | Capture web page to PNG |
| `npx figma-dsl compare <a.png> <b.png> [-d diff.png] [-t threshold]` | Compare two images |

## Notes

- The reference image comes from the **complete DSL JSON export**, NOT the original `.dsl.ts` file. The `.dsl.ts` file has not been updated yet — the complete export reflects the designer's edits in Figma.
- Each iteration should make minimal, targeted changes. Avoid over-correcting.
- If structural differences exist (missing or extra DOM elements), report them as manual review items rather than attempting automatic structural changes.
