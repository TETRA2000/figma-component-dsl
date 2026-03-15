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
