# Syncing Design Changes

Audience: Both developers and designers

This guide covers the two-part workflow: **applying** design changes from Figma to code, then **verifying** that the code matches the design.

## When to Use This Workflow

Use this when a designer has edited a component's properties in Figma (colors, typography, spacing, etc.) and those changes need to be reflected in the React/CSS source code.

## Part 1: Applying a Changeset

### What Is a Changeset?

A changeset is a JSON file exported from the Figma plugin that describes exactly what changed. Each entry specifies:

- Which component was changed
- Which property changed (e.g., `fills.0.color.r`, `fontSize`, `paddingLeft`)
- The old and new values

### How Designers Export a Changeset

1. Open the Figma plugin on the component you edited
2. Go to the **Export** tab
3. Select **Changeset** mode
4. Export the JSON file

### How Changes Map to Code

The system translates Figma property changes to React/CSS edits:

| Figma Property Category | Code Target    | Examples                                  |
|--------------------------|---------------|-------------------------------------------|
| Fills (solid, gradient)  | CSS           | `background-color`, `background-image`    |
| Strokes                  | CSS           | `border-color`, `border-width`            |
| Corner radius            | CSS           | `border-radius`                           |
| Opacity                  | CSS           | `opacity`                                 |
| Typography               | CSS           | `font-size`, `font-weight`, `line-height` |
| Spacing / Layout         | CSS           | `padding`, `gap`, `flex-direction`        |
| Text content             | JSX           | String literals in component markup       |

### What Gets Applied Automatically vs. Manually

- **Auto-applied**: Property value changes (colors, sizes, spacing, typography, text content)
- **Manual review required**: Structural changes — added or removed child nodes, reordered children, new layers. These produce a markdown summary for human review rather than automatic code edits.

### The Application Report

After applying a changeset, you get a summary report listing:

- **Applied changes** — which properties were updated in which files
- **Skipped components** — components not found in the codebase
- **Manual review items** — structural changes that need human attention

## Part 2: Verifying Visual Fidelity

After applying changes (or at any time you want to check that code matches design), run the verification workflow.

### What Gets Compared

The system compares two images:

1. **Reference image** — rendered from the complete DSL JSON export (representing the designer's intended state)
2. **Code image** — a screenshot of the React component running in the browser

### The Verification Loop

```
  +-----------------+
  | Render reference |  (from DSL JSON export)
  | image (PNG)      |
  +--------+--------+
           |
  +--------v--------+
  | Capture React    |  (via browser screenshot)
  | component (PNG)  |
  +--------+--------+
           |
  +--------v--------+
  | Compare images   |  (pixel diff + similarity %)
  +--------+--------+
           |
     >= threshold? ----Yes----> PASS
           |
          No
           |
  +--------v--------+
  | Analyze diff,    |
  | fix code, re-run |
  +--------+--------+
           |
           +----------> (up to 3 iterations)
```

### Configuration

- **Similarity threshold**: Default 95%. A score at or above this means the renders match acceptably.
- **Max iterations**: Default 3. The system tries to fix differences up to this many times before reporting a failure.

### Running a Comparison

To manually compare two images:

```bash
bin/figma-dsl compare reference.png react-capture.png -d diff.png
```

The diff image highlights pixel differences, making it easy to spot where the renders diverge. Run `figma-dsl compare --help` for threshold and output options.

### When Verification Fails Repeatedly

Common causes of persistent mismatches:

- **Unsupported DSL features** — the React component uses CSS effects (shadows, animations, pseudo-elements) that the DSL renderer doesn't yet support
- **Font rendering differences** — anti-aliasing and subpixel rendering differ between the DSL renderer and the browser
- **Dynamic content** — the React component has interactive states (hover, focus) that differ from the static DSL render

In these cases, review the diff image to determine whether the differences are acceptable or indicate a real bug.

## What's Next

- [Exporting to Figma](exporting-to-figma.md) — how components get from code to Figma
- [Calibrating the Pipeline](calibrating-the-pipeline.md) — if you suspect the renderer has bugs
