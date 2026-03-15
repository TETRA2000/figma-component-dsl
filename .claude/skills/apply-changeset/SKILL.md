---
name: apply-changeset
description: >
  Apply a Figma design changeset to React component source code and CSS Modules.
  Parses a changeset JSON file exported from the Figma DSL plugin, maps DSL property
  changes to React/CSS code edits, and produces a summary report. Use this skill
  when the user wants to apply design changes from Figma to code, sync Figma edits
  to React components, or process a changeset file. Also trigger when the user says
  things like "apply changeset", "sync from Figma", "apply design changes",
  "update components from changeset", or provides a changeset JSON file.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Apply Changeset

Apply a Figma design changeset to React component source code and CSS Modules.

## Input

The user provides:
1. **Changeset JSON file path** — a `ChangesetDocument` exported from the Figma DSL plugin's Export tab (Changeset mode)
2. **Complete DSL JSON export file path** (optional) — for passing to the verify-changeset skill after application

## Changeset Schema

```typescript
interface ChangesetDocument {
  schemaVersion: string;       // "1.0"
  timestamp: string;           // ISO 8601
  source: { pluginVersion: string; figmaFileName: string };
  components: ComponentChangeEntry[];
}

interface ComponentChangeEntry {
  componentName: string;       // e.g. "Button", "Card"
  componentId: string;         // Figma node ID
  changes: PropertyChange[];
}

interface PropertyChange {
  propertyPath: string;        // Dot-notation, e.g. "fills.0.color.r", "fontSize"
  changeType: "modified" | "added" | "removed";
  oldValue?: unknown;
  newValue?: unknown;
  description: string;         // Human-readable description
}
```

## Component-to-File Mapping

Map component names to source files using this convention:
- React component: `preview/src/components/{Name}/{Name}.tsx`
- CSS Module: `preview/src/components/{Name}/{Name}.module.css`

If the standard path doesn't exist, search for the component name across the codebase using Glob/Grep.

## Property Mapping Rules

Apply DSL property changes to React/CSS code using these mappings:

### Visual Properties (CSS)

| DSL Property Path | CSS Property | Notes |
|---|---|---|
| `fills.N.color.{r,g,b,a}` | `background-color` or `color` | Use `background-color` for containers (FRAME, RECTANGLE), `color` for TEXT nodes. Convert 0-1 range to 0-255. |
| `fills.N.opacity` | `opacity` on the fill | Combine with color alpha |
| `strokes.N.color.{r,g,b,a}` | `border-color` | Convert 0-1 to 0-255 |
| `strokes.N.weight` | `border-width` | Value in px |
| `cornerRadius` | `border-radius` | Value in px |
| `opacity` | `opacity` | Direct value |

### Typography Properties (CSS)

| DSL Property Path | CSS Property |
|---|---|
| `fontSize` | `font-size` (px) |
| `fontFamily` | `font-family` |
| `fontWeight` | `font-weight` |
| `fontStyle` | `font-style` |
| `textAlignHorizontal` | `text-align` (LEFT->left, CENTER->center, RIGHT->right, JUSTIFIED->justify) |
| `lineHeight.value` | `line-height` |
| `letterSpacing.value` | `letter-spacing` |

### Spacing Properties (CSS)

| DSL Property Path | CSS Property |
|---|---|
| `paddingTop` | `padding-top` (px) |
| `paddingRight` | `padding-right` (px) |
| `paddingBottom` | `padding-bottom` (px) |
| `paddingLeft` | `padding-left` (px) |
| `itemSpacing` | `gap` (px) |

### Size Properties (CSS)

| DSL Property Path | CSS Property |
|---|---|
| `size.x` | `width` (px) |
| `size.y` | `height` (px) |

### Text Content (JSX)

| DSL Property Path | Target |
|---|---|
| `characters` | JSX string literal content |

### Layout Properties (CSS)

| DSL Property Path | CSS Property |
|---|---|
| `stackMode` | `display: flex; flex-direction` (HORIZONTAL->row, VERTICAL->column) |
| `primaryAxisAlignItems` | `justify-content` (MIN->flex-start, CENTER->center, MAX->flex-end, SPACE_BETWEEN->space-between) |
| `counterAxisAlignItems` | `align-items` (MIN->flex-start, CENTER->center, MAX->flex-end) |

## Execution Flow

1. **Parse** the changeset JSON file
2. **Iterate** over each `ComponentChangeEntry`:
   a. Resolve the component name to file paths
   b. If files not found, log a warning and skip
   c. Read the current React component and CSS module
   d. For each `PropertyChange`:
      - Map the DSL property path to the corresponding CSS property or JSX element
      - Apply the change using the Edit tool
   e. For structural changes (children added/removed), generate a markdown description for manual review instead of automatic code modification
3. **Produce summary report**

### New Node Type Mappings

#### LINE → CSS border or `<hr>`

| DSL Property Path | Target | Notes |
|---|---|---|
| Node type `LINE` | CSS `border-bottom` or `<hr>` element | Prefer `<hr>` for semantic dividers, CSS border for decorative lines |
| `strokes.N.color.{r,g,b,a}` | `border-bottom-color` or `<hr>` color | Convert 0-1 range to 0-255 |
| `strokes.N.weight` | `border-bottom-width` (px) | |
| `strokeCap` | Not mapped in CSS | Log in summary report |
| `rotation` | `transform: rotate({N}deg)` | Only if non-zero |
| `size.x` | `width` (px) | Line length |

#### POLYGON → Inline SVG `<polygon>`

| DSL Property Path | Target | Notes |
|---|---|---|
| Node type `POLYGON` | `<svg><polygon points="..." /></svg>` | Compute vertex coordinates from `pointCount` and `size` |
| `pointCount` | Vertex count | Distribute N points evenly around the inscribed ellipse, first vertex at top (-90°). Vertices: `cx + rx*cos(2πk/N - π/2), cy + ry*sin(2πk/N - π/2)` for k=0..N-1 |
| `fills.N.color` | SVG `fill` attribute | Convert to `rgb()` or `rgba()` |
| `strokes.N.color` | SVG `stroke` attribute | |
| `strokes.N.weight` | SVG `stroke-width` | |
| `rotation` | SVG `transform="rotate(deg, cx, cy)"` | |
| `cornerRadius` | Not directly mapped | Log as manual review item — SVG polygon vertices don't support corner rounding natively |

#### STAR → Inline SVG `<polygon>`

| DSL Property Path | Target | Notes |
|---|---|---|
| Node type `STAR` | `<svg><polygon points="..." /></svg>` | Compute star vertices: alternate outer and inner radius points, `pointCount * 2` total vertices |
| `pointCount` | Outer vertex count | |
| `innerRadius` | Inner vertex scaling factor (0-1) | Inner vertices at `innerRadius * outerRadius` from center |
| `fills.N.color` | SVG `fill` attribute | |
| `strokes.N.color` | SVG `stroke` attribute | |
| `rotation` | SVG `transform="rotate(deg, cx, cy)"` | |

Star vertex formula: For k=0..pointCount-1, outer vertex at angle `2πk/N - π/2`, inner vertex at angle `2π(k+0.5)/N - π/2` scaled by `innerRadius`.

#### BOOLEAN_OPERATION → Inline SVG with compositing

| DSL Property Path | Target | Notes |
|---|---|---|
| Node type `BOOLEAN_OPERATION` | `<svg>` with child paths | Complex — flag for **manual review** when possible |
| `booleanOperation: UNION` | SVG paths combined (simple concatenation) | Simplest case |
| `booleanOperation: SUBTRACT` | `<clipPath>` or `mask` with `fill-rule: evenodd` | May require manual adjustment |
| `booleanOperation: INTERSECT` | `<clipPath>` with intersection | Complex — flag for manual review |
| `booleanOperation: EXCLUDE` | `fill-rule: evenodd` on combined path | Complex — flag for manual review |

**Important**: BOOLEAN_OPERATION SVG mappings are inherently complex. The compositing semantics (especially SUBTRACT, INTERSECT, EXCLUDE) don't map cleanly to static SVG. Always flag these for **manual review** in the summary report.

#### SECTION → Skip (no React equivalent)

| DSL Property Path | Target | Notes |
|---|---|---|
| Node type `SECTION` | **Skip** — no React equivalent | Sections are Figma organizational containers |
| `sectionContentsHidden` | Not mapped | Log in summary report |

When a SECTION appears in a changeset:
- Log it in the summary report under "Skipped — Organizational Only"
- Do NOT create React elements for sections
- If a section's children have changes, apply those children's changes normally

### Geometry Property Changes

When `pointCount` or `innerRadius` change on an existing POLYGON or STAR node:
- Recalculate all vertex coordinates using the formulas above
- Update the SVG `points` attribute with the new coordinates
- These are **full recalculations** — do not try to incrementally adjust vertices

## Structural Changes

When `propertyPath` starts with `children.` and `changeType` is `added` or `removed`:
- Do NOT attempt automatic structural code changes
- Instead, produce a markdown block describing what changed:

```markdown
### Manual Review Required: {ComponentName}

- **Added child**: "{childName}" at position {index}
  - Type: {type}, Size: {width}x{height}
  - Properties: {key properties}

- **Removed child**: "{childName}" at position {index}
```

## Error Handling

- **Component file not found**: Log warning, skip component, continue with others
- **Ambiguous property mapping**: Report the property path and suggest manual edit
- **Multiple CSS rules match**: Apply to the most specific selector

## Summary Report

After processing all components, output:

```
## Changeset Application Report

**Source**: {figmaFileName} (plugin v{pluginVersion})
**Timestamp**: {timestamp}

### Applied Changes
- {ComponentName}: {N} properties updated
  - {description of each change}

### Skipped Components
- {ComponentName}: File not found at expected path

### Manual Review Required
- {ComponentName}: {N} structural changes need manual review
```

## Post-Application

After applying the changeset, suggest running the verify-changeset skill if a complete DSL JSON export file was provided:

> Changes applied. To verify visual fidelity, run the verify-changeset skill with the complete DSL JSON export.
