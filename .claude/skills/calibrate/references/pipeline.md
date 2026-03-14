# DSL Rendering Pipeline Architecture

## Data flow

```
DslNode (TypeScript)
  │  packages/dsl-core/src/nodes.ts — factory functions
  │  packages/dsl-core/src/types.ts — type definitions
  ▼
compile() / compileWithLayout()
  │  packages/compiler/src/compiler.ts — main compilation
  │  packages/compiler/src/layout-resolver.ts — size/position resolution
  │  packages/compiler/src/text-measurer.ts — text measurement with opentype.js
  ▼
FigmaNodeDict (intermediate representation)
  │  packages/compiler/src/types.ts — FigmaNodeDict, CompileResult
  ▼
  ├─► renderToFile()
  │     packages/renderer/src/renderer.ts — Canvas 2D rendering to PNG
  │     Output: PNG files
  │
  ├─► exportToFile() / generatePluginInput()
  │     packages/exporter/src/exporter.ts — JSON for Figma plugin
  │     Output: plugin-input.json
  │
  └─► Figma Plugin
        packages/plugin/src/code.ts — creates native Figma nodes
```

## Key types

### DslNode (input)
- `type`: FRAME | TEXT | RECTANGLE | ELLIPSE | GROUP | COMPONENT | COMPONENT_SET | INSTANCE
- `name`, `size: {x, y}`, `fills`, `strokes`, `cornerRadius`, `opacity`, `visible`
- `autoLayout`: direction, spacing, padding, align, sizing
- `textStyle`: fontSize, fontWeight, fontFamily, lineHeight, letterSpacing, textAlignHorizontal
- `textAutoResize`: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT'
- `componentProperties`, `componentRef`, `propertyOverrides`

### FigmaNodeDict (intermediate)
- Same visual properties as DslNode but flattened
- `guid`, `transform` (3x3 matrix), `parentIndex`
- `stackMode`, `itemSpacing`, `padding*`, `primaryAxisAlignItems`, `counterAxisAlignItems`
- `layoutSizingHorizontal`, `layoutSizingVertical`
- `textData`, `derivedTextData` (baselines, fontMetaData)
- `componentPropertyDefinitions`, `componentId`, `overriddenProperties`

## Common issues and where to fix them

| Symptom | Likely cause | File to check |
|---|---|---|
| Text overflows frame | textAutoResize not propagated | compiler.ts (text section), layout-resolver.ts |
| Wrong element size | Layout resolver not computing correctly | layout-resolver.ts |
| Missing gradient | convertFill doesn't handle gradient type | compiler.ts, renderer.ts |
| Strokes not visible | strokeWeight not passed through | compiler.ts, renderer.ts |
| Auto-layout children mispositioned | Alignment/spacing calculation wrong | layout-resolver.ts |
| Text wrong font weight | fontWeightToStyle mapping | compiler.ts |
| Component properties ignored | componentPropertyDefinitions not set | compiler.ts, exporter.ts |
| layoutSizing FILL not working | widthSizing/heightSizing not mapped | compiler.ts (auto-layout section) |
| Per-corner radius ignored | cornerRadii not in FigmaNodeDict type or not passed through | types.ts, compiler.ts, renderer.ts |
| Property works in DSL but not in render | FigmaNodeDict missing the field — compiler silently drops it | types.ts (add field), compiler.ts (add passthrough) |
| Renderer draws wrong shape | drawShape / renderNode doesn't check all property variants | renderer.ts (resolveCornerRadius, drawShape) |

## Pipeline diagnosis checklist

When a rendered PNG doesn't match expectations, trace the property through each layer:

1. **DslNode** (dsl-core/src/types.ts) — Is the property defined in the type?
2. **Factory function** (dsl-core/src/nodes.ts) — Does the constructor accept and store it?
3. **FigmaNodeDict** (compiler/src/types.ts) — Does the intermediate type have a field for it?
4. **compileNode** (compiler/src/compiler.ts) — Does the compiler copy it to the result object?
5. **renderNode** (renderer/src/renderer.ts) — Does the renderer read and act on it?

The first layer where the property is absent or mishandled is where the fix belongs. A common pattern: dsl-core defines a property (e.g., `cornerRadii`), but `FigmaNodeDict` doesn't include it, so the compiler silently drops it even though there are no TypeScript errors.

## Build commands

```bash
# Build all packages
npm run build

# Build specific package
cd packages/compiler && npm run build
cd packages/renderer && npm run build
cd packages/cli && npm run build

# Run tests
npm run test           # all packages
cd packages/compiler && npm run test  # specific
```
