# Figma Export JSON Schema

The `figma-dsl export` command produces a JSON file compatible with Figma plugin import. This document describes the schema.

## Top-Level Structure

```json
{
  "version": "1.0",
  "component": {
    "name": "ComponentName",
    "description": "Component description",
    "variants": [...],
    "properties": [...],
    "nodes": [...]
  }
}
```

## Component Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | PascalCase component name |
| `description` | string | Human-readable description |
| `variants` | array | List of variant configurations |
| `properties` | array | Component property definitions |
| `nodes` | array | Tree of Figma node definitions |

## Variant Object

```json
{
  "name": "Variant",
  "values": ["primary", "secondary", "outline"],
  "default": "primary"
}
```

## Property Object

```json
{
  "name": "Label",
  "type": "TEXT",
  "default": "Button"
}
```

Property types: `TEXT`, `BOOLEAN`, `INSTANCE_SWAP`, `VARIANT`

## Node Object

```json
{
  "type": "FRAME",
  "name": "Root",
  "layoutMode": "HORIZONTAL",
  "padding": { "top": 12, "right": 24, "bottom": 12, "left": 24 },
  "itemSpacing": 8,
  "fills": [{ "type": "SOLID", "color": { "r": 0.49, "g": 0.23, "b": 0.93 } }],
  "cornerRadius": 999,
  "children": [...]
}
```

Node types: `FRAME`, `TEXT`, `RECTANGLE`, `ELLIPSE`, `VECTOR`, `COMPONENT`, `INSTANCE`

## Token Mapping

Design tokens are mapped to Figma styles:

| CSS Token | Figma Equivalent |
|-----------|-----------------|
| `var(--color-primary-500)` | Fill style "Primary/500" |
| `var(--text-base)` | Text style "Body/Base" |
| `var(--space-4)` | Auto-layout padding 16px |
| `var(--radius-lg)` | Corner radius 12px |
| `var(--shadow-md)` | Effect style "Elevation/Medium" |

## Plugin Import

To import via Figma plugin:
1. Open the target Figma file
2. Run the import plugin
3. Paste or upload the `.figma.json` file
4. The plugin creates the component with all variants and properties
