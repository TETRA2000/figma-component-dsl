# Requirements Document

## Introduction

The DslCanvas component extends the existing Slots feature by introducing a new component type that bridges Figma and React with pixel-perfect visual consistency. Instead of converting DSL content to HTML/CSS (which inevitably diverges from Figma rendering), the DslCanvas component accepts Figma DSL JSON and renders it as an image using the existing `@figma-dsl/renderer` package. In Figma, designers use Slots to place arbitrary content inside DslCanvas components. The DSL pipeline compiles these slot contents and the renderer produces identical PNG output in both environments — ensuring that what designers see in Figma matches exactly what users see in React. The name "DslCanvas" is used to distinguish from the HTML `<canvas>` element.

This approach creates a class of "image-rendered" UI regions where visual fidelity is guaranteed, complementing traditional HTML/CSS components for interactive content.

Additionally, the Figma plugin's export action automatically bundles rendered slot and canvas images alongside the DSL JSON in a single export step. For small payloads, slot images are embedded as base64 data URIs directly in the JSON; for larger exports, the plugin packages everything as a ZIP archive. This unified export path complements the existing `@figma-dsl/renderer`-based rendering pipeline and gives designers a complete, self-contained export without requiring a separate image extraction workflow.

## Requirements

### Requirement 1: DslCanvas React Component

**Objective:** As a developer, I want a React `<DslCanvas>` component that accepts DSL JSON and displays a rendered image, so that I can embed pixel-perfect Figma-consistent visuals in my React application without writing HTML/CSS for that content.

#### Acceptance Criteria

1. The DslCanvas component shall accept a `dsl` prop containing compiled DSL JSON (FigmaNodeDict) and render it as an `<img>` element displaying the PNG output.
2. The DslCanvas component shall maintain the fixed aspect ratio derived from the rendered DSL content dimensions, preventing distortion when the component is resized.
3. The DslCanvas component shall accept an optional `width` prop; when provided, the height shall be calculated automatically from the aspect ratio of the rendered image.
4. The DslCanvas component shall accept an optional `scale` prop (default: 1) to control the rendering resolution for high-DPI displays.
5. When the `dsl` prop value changes, the DslCanvas component shall re-render the image to reflect the updated DSL content.
6. While the DslCanvas component is rendering, the DslCanvas component shall display a placeholder or the previous image to avoid layout shifts.
7. If the `dsl` prop contains invalid or empty DSL JSON, the DslCanvas component shall display a fallback placeholder image or empty state rather than crashing.
8. The DslCanvas component shall expose a `className` prop and an optional `style` prop for layout integration within parent components.

### Requirement 2: DSL Canvas Node Type

**Objective:** As a DSL author, I want a `canvas()` builder function in dsl-core, so that I can declare canvas regions in my DSL definitions that will be rendered as images rather than converted to HTML.

#### Acceptance Criteria

1. The dsl-core package shall export a `canvas(name: string, props?: CanvasProps)` builder function that creates a FRAME-type node marked as a canvas component.
2. The canvas node shall support the same layout properties as `slot()` (size, autoLayout, fills, cornerRadius, layoutSizing) plus an optional `scale` property.
3. The canvas node shall accept `children` — an array of DslNode — representing the content to be rendered as an image.
4. When a canvas node is used outside a COMPONENT or COMPONENT_SET, the compiler shall treat it as valid (unlike slots, canvas nodes are standalone).
5. The dsl-core package shall export a `CanvasProps` type definition with all supported canvas properties.

### Requirement 3: Compiler Support for Canvas Nodes

**Objective:** As a pipeline maintainer, I want the compiler to recognize and process canvas nodes, so that they flow through the compilation pipeline with correct layout resolution and metadata.

#### Acceptance Criteria

1. When the compiler encounters a canvas node, the compiler shall compile its children using the standard layout resolution pipeline (text measurement, auto-layout).
2. The compiler shall preserve the canvas metadata (`isCanvas: true`, `canvasName`) on the compiled FigmaNodeDict output.
3. The compiler shall preserve the `scale` property on the compiled canvas node if specified.
4. When a canvas node contains nested slot nodes, the compiler shall validate and compile the slots according to existing slot compilation rules.

### Requirement 4: Renderer Integration for Canvas Nodes

**Objective:** As a pipeline maintainer, I want canvas nodes to be renderable independently, so that the renderer can produce standalone PNG images for each canvas region.

#### Acceptance Criteria

1. The renderer shall render a canvas node and its children subtree to a standalone PNG buffer, using the same rendering logic as top-level render calls.
2. When a canvas node specifies a `scale` property, the renderer shall use that scale factor for the PNG output resolution.
3. The renderer package shall export a utility function `renderCanvasNodes(root: FigmaNodeDict): Map<string, RenderResult>` that extracts all canvas nodes from a compiled tree and renders each one independently.
4. The render output for a canvas node shall be identical whether rendered as part of a full tree or extracted and rendered standalone.

### Requirement 5: Figma Plugin Canvas Handling

**Objective:** As a designer, I want canvas components in Figma to behave as regular Slot frames, so that I can place any content inside them using familiar Figma workflows.

#### Acceptance Criteria

1. When exporting a DSL definition containing canvas nodes, the exporter shall encode them as slot-compatible frames in the Figma plugin JSON format.
2. The Figma plugin shall create canvas nodes as standard frames with slot behavior, allowing designers to add any child content.
3. When a designer modifies content inside a canvas frame in Figma and exports a changeset, the changeset pipeline shall capture those changes as canvas content updates.

### Requirement 6: Canvas-Slot Interoperability

**Objective:** As a developer, I want canvas nodes to work seamlessly with the existing Slots system, so that slot overrides can provide content that gets rendered as images in the Canvas component.

#### Acceptance Criteria

1. When an instance node provides slot overrides for a canvas-typed slot, the compiler shall compile the override content and mark it for canvas rendering.
2. The DslCanvas React component shall accept slot override content (compiled DslNode arrays) and render them as images.
3. Where a component defines both regular slots and canvas slots, the pipeline shall handle each slot type according to its rendering mode (HTML for regular slots, image for canvas slots).

### Requirement 7: CLI Integration

**Objective:** As a developer, I want CLI commands to support canvas components, so that I can compile, render, and inspect canvas content through the existing toolchain.

#### Acceptance Criteria

1. When running `figma-dsl render` on a DSL file containing canvas nodes, the CLI shall produce separate PNG files for each named canvas region in addition to the full-tree render.
2. When running `figma-dsl compile` on a DSL file containing canvas nodes, the compiled JSON output shall include canvas metadata on the relevant nodes.
3. When running `figma-dsl batch` on a directory, the CLI shall process canvas nodes in all DSL files consistently.

### Requirement 8: Preview App Integration

**Objective:** As a developer, I want to use the DslCanvas component in the preview app with live reload, so that I can iterate on canvas content with immediate visual feedback.

#### Acceptance Criteria

1. The DslCanvas component shall be available as a standard import from the preview app's component library.
2. When a DSL file used as a DslCanvas source changes during development, the preview app shall re-render the canvas image automatically via Vite's HMR.
3. The DslCanvas component shall work within the preview app's existing layout system (CSS Modules, design tokens) without requiring special configuration.

### Requirement 9: Unified Export with Slot Image Bundling

**Objective:** As a designer, I want the Figma plugin's existing export action to automatically include rendered slot and canvas images alongside the DSL JSON, so that I get a complete, self-contained export package in a single step without a separate export workflow.

#### Acceptance Criteria

1. When the user triggers the existing export action (changeset or complete export), the Figma plugin shall automatically render each slot and canvas frame using Figma's `node.exportAsync()` and include the image data in the export output.
2. The plugin shall render slot and canvas images as PNG at 2x scale by default, with an optional user-configurable scale factor (1x, 2x, 3x, 4x) in the export settings.
3. When the total export payload size is below a configurable threshold (default: 1 MB), the plugin shall embed slot images as base64-encoded data URIs within the JSON output under a `slotImages` map keyed by slot/canvas name.
4. When the total export payload size exceeds the threshold, the plugin shall package the JSON and image files together as a ZIP archive, with images stored as separate files named `{slot-name}.png`.
5. The plugin shall export only the contents of each slot/canvas frame (the frame itself and its children), not the parent component or surrounding nodes.
6. While the export is in progress, the plugin shall display progress feedback indicating which slot/canvas frame is being rendered and the overall completion status.
7. If a slot/canvas frame render fails, the plugin shall report the error for that specific frame, omit it from the bundled output, and continue exporting the remaining frames.
8. The exported JSON shall include a `slotImages` field containing a map of slot/canvas names to their image data (base64 string for inline mode, or relative file path for ZIP mode).

### Requirement 10: Dual Rendering Path Coexistence

**Objective:** As a pipeline maintainer, I want the Figma-native slot image bundling to coexist with the existing `@figma-dsl/renderer`-based canvas rendering pipeline, so that both rendering paths remain functional and consumers can use whichever is appropriate for their context.

#### Acceptance Criteria

1. The Figma plugin's bundled slot images (Requirement 9) shall be produced independently of the existing `@figma-dsl/renderer`-based `renderCanvasNodes()` pipeline.
2. The existing `renderCanvasNodes()` function and CLI `render --no-canvas` behavior shall remain unchanged after adding the Figma-native bundled export.
3. Where a canvas node has a `scale` property defined in the DSL, the Figma plugin export shall use the user-selected scale factor (not the DSL-defined scale), since the Figma-native export reflects the designer's export intent rather than the DSL author's rendering intent.
4. When consuming an export package containing bundled `slotImages`, the DslCanvas React component shall prefer the bundled image data over re-rendering via `@figma-dsl/renderer`, falling back to renderer-based rendering when no bundled image is available.
