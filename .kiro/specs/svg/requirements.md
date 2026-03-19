# Requirements Document

## Introduction

This specification defines SVG node support for the Figma Component DSL pipeline. SVG nodes enable rich vector graphics within DSL compositions, leveraging the existing banner mode (to be renamed "canvas mode") infrastructure for absolute positioning and visual effects. SVG content is maintained as a distinct node type separate from conventional DSL nodes (FRAME, TEXT, RECTANGLE, etc.), allowing the Figma plugin to track SVG data independently and import design changes made in Figma back as SVG data modifications.

The user also expressed intent to rename "banner mode" to a more general term (e.g., "canvas mode") to reflect its broader purpose beyond banners. This is captured as a requirement below.

## Requirements

### Requirement 1: SVG Node Type Definition

**Objective:** As a developer, I want to define SVG nodes in DSL files using a dedicated `svg()` constructor, so that I can include vector graphics in my compositions with full type safety.

#### Acceptance Criteria

1. The DSL pipeline shall provide a `svg(name, props)` node constructor in `@figma-dsl/core` that creates a node of type `'SVG'`.
2. The `svg()` constructor shall accept an `svgContent` property containing inline SVG markup as a string.
3. The `svg()` constructor shall accept an `src` property containing a file path or URL to an external `.svg` file, as an alternative to inline `svgContent`.
4. If both `svgContent` and `src` are provided, the compiler shall use `svgContent` and emit a warning that `src` is ignored.
5. The `svg()` constructor shall accept `size` (`{ x: number, y: number }`) to define the bounding box for the SVG content.
6. The `svg()` constructor shall accept standard visual properties: `opacity`, `visible`, `cornerRadius`, `clipContent`, `x`, `y`, `rotation`, `effects`, and `blendMode`.
7. The SVG node shall support all layout sizing modes (`layoutSizingHorizontal`, `layoutSizingVertical`) for participation in auto-layout containers.

### Requirement 2: SVG Rendering in the PNG Pipeline

**Objective:** As a developer, I want SVG nodes to render correctly in the PNG output, so that I can preview and compare SVG-containing compositions without opening Figma.

#### Acceptance Criteria

1. When an SVG node is encountered during rendering, the renderer shall rasterize the SVG content to fit within the node's declared bounding box.
2. The renderer shall support SVG features including paths, shapes, gradients, transforms, text, and clip paths.
3. When effects (DROP_SHADOW, LAYER_BLUR) are specified on an SVG node, the renderer shall apply those effects to the rasterized SVG output.
4. When a blend mode is specified on an SVG node, the renderer shall apply the blend mode during compositing.
5. When rotation is specified on an SVG node, the renderer shall rotate the SVG around its center point.
6. If the SVG content cannot be parsed or loaded, the renderer shall render a placeholder rectangle with a warning indicator and log a diagnostic message.

### Requirement 3: SVG Compilation and Layout Resolution

**Objective:** As a developer, I want SVG nodes to participate correctly in both auto-layout and absolute positioning modes, so that SVG content integrates seamlessly into any DSL composition.

#### Acceptance Criteria

1. The compiler shall recognize `'SVG'` as a valid node type and include it in the compiled output with the SVG data preserved.
2. While in canvas mode (formerly banner mode), the layout resolver shall position SVG nodes using absolute `x`/`y` coordinates.
3. While in standard mode, the layout resolver shall position SVG nodes within auto-layout containers according to the standard layout rules.
4. The compiler shall resolve relative `src` paths against the asset directory (consistent with IMAGE node path resolution).

### Requirement 4: SVG Export to Figma Plugin JSON

**Objective:** As a developer, I want SVG nodes to export as Figma-compatible data, so that the Figma plugin can create corresponding vector nodes from SVG content.

#### Acceptance Criteria

1. The exporter shall include SVG nodes in the plugin JSON output with type `'SVG'` and the full SVG data payload.
2. The exporter shall preserve all visual properties (effects, blend mode, rotation, opacity) on exported SVG nodes.
3. The Figma plugin shall create SVG nodes using Figma's `figma.createNodeFromSvg()` API to produce native vector nodes.
4. When the SVG contains multiple sub-paths, the plugin shall maintain them as a single grouped node within Figma.

### Requirement 5: SVG as Separate Node Identity for Bidirectional Sync

**Objective:** As a developer, I want SVG nodes maintained as distinct entities in the Figma plugin's data model, so that changes made to SVG content in Figma can be imported back as SVG data modifications.

#### Acceptance Criteria

1. The Figma plugin shall tag SVG-origin nodes with metadata (via `setPluginData`) identifying them as SVG nodes and storing the original SVG content hash.
2. When exporting a changeset from Figma, the plugin shall detect modifications to SVG-origin nodes and export the changed vector data as updated SVG markup.
3. The changeset format shall represent SVG node changes separately from conventional node property changes (e.g., text edits, fill changes).
4. When applying a changeset containing SVG modifications, the apply-changeset pipeline shall update the `svgContent` or `src` file with the new SVG data.
5. The MCP server shall support pulling SVG node changes as part of the bidirectional sync workflow.

### Requirement 6: Mode Rename — Banner Mode to Canvas Mode

**Objective:** As a developer, I want the pipeline mode formerly called "banner" renamed to "canvas", so that the mode name accurately reflects its general-purpose nature for rich visual compositions including SVG.

#### Acceptance Criteria

1. The DSL pipeline shall accept `export const mode = 'canvas'` as the mode declaration in `.dsl.ts` files.
2. The pipeline shall continue to accept `export const mode = 'banner'` as a deprecated alias, emitting a deprecation warning recommending migration to `'canvas'`.
3. The `CompilerMode` type shall include `'canvas'` as a valid value.
4. The CLI shall display `'canvas'` in all user-facing output (logs, warnings, help text).
5. The DSL reference documentation shall be updated to use "canvas mode" terminology throughout, with a note about the deprecated `'banner'` alias.

### Requirement 7: SVG Validator Rules

**Objective:** As a developer, I want the validator to check SVG nodes for common issues, so that I catch problems before compilation.

#### Acceptance Criteria

1. If an SVG node has neither `svgContent` nor `src` defined, the validator shall report an error.
2. If an SVG node uses `src` and the referenced file does not exist, the validator shall report a warning.
3. If an SVG node uses visual effects or rotation while in standard mode, the validator shall report a warning consistent with how other banner/canvas-only properties are handled.
4. Where canvas mode is active, the validator shall permit all SVG visual properties without warnings.
