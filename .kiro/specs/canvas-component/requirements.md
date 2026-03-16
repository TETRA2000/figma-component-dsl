# Requirements Document

## Introduction

This specification covers two distinct but complementary concepts for embedding rich visual content in the DSL pipeline:

**1. DslCanvas (Custom Slot-like Feature):** The DslCanvas component is an original feature of this application that bridges Figma and React with pixel-perfect visual consistency. Instead of converting DSL content to HTML/CSS (which inevitably diverges from Figma rendering), the DslCanvas component accepts Figma DSL JSON and renders it as an image using the existing `@figma-dsl/renderer` package. Designers use DslCanvas regions to place arbitrary content that gets rendered identically in both environments. The name "DslCanvas" distinguishes it from the HTML `<canvas>` element.

**2. Figma Native Slots (Plugin Image API):** Figma's native Slots allow designers to compose components with freeform content areas. However, **there is no public API** to programmatically create or define Slots — setting `componentPropertyDefinitions` to `SLOT` does not work. Since any component can serve as a Figma Slot, the plugin must detect slot-like children at export time and use Figma's `node.exportAsync()` image API to capture their rendered content as pixel-perfect images. This approach works regardless of how the slot was created in Figma.

**Relationship between the two:** DslCanvas is authored in DSL code and rendered via `@figma-dsl/renderer`. Figma native Slots are created by designers in Figma and captured via the plugin's image API. Both produce image-based output, but through different pipelines. The DslCanvas pipeline can also handle newly created frames that designers add inside DslCanvas regions in Figma.

The Figma plugin's export action bundles both types of image content alongside the DSL JSON in a single export step — base64 for small payloads, ZIP for larger ones.

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

### Requirement 5: Figma Plugin DslCanvas Handling

**Objective:** As a designer, I want DslCanvas components in Figma to behave as editable frame regions, so that I can place any content inside them and have the DSL pipeline process those additions.

#### Acceptance Criteria

1. When exporting a DSL definition containing DslCanvas nodes, the exporter shall encode them as standard frames in the Figma plugin JSON format, preserving the `isCanvas` and `canvasName` metadata.
2. The Figma plugin shall create DslCanvas nodes as standard frames, allowing designers to add any child content inside them.
3. When a designer modifies content inside a DslCanvas frame in Figma and exports a changeset, the changeset pipeline shall capture those changes as DslCanvas content updates.
4. The DSL pipeline shall process newly created frames that designers add inside DslCanvas regions, compiling and rendering them through the existing `@figma-dsl/renderer` path.

### Requirement 6: DslCanvas–Slot Interoperability

**Objective:** As a developer, I want DslCanvas nodes to work seamlessly with the existing Slots system, so that slot overrides can provide content that gets rendered as images in the DslCanvas component.

#### Acceptance Criteria

1. When an instance node provides slot overrides for a DslCanvas-typed slot, the compiler shall compile the override content and mark it for canvas rendering.
2. The DslCanvas React component shall accept slot override content (compiled DslNode arrays) and render them as images.
3. Where a component defines both regular slots and DslCanvas slots, the pipeline shall handle each slot type according to its rendering mode (HTML for regular slots, image for DslCanvas slots).

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

### Requirement 9: Figma Native Slot Detection

**Objective:** As a plugin developer, I want the Figma plugin to detect components that act as Figma native Slots at export time, so that their rendered content can be captured as pixel-perfect images regardless of how the slot was created.

#### Acceptance Criteria

1. The Figma plugin shall detect slot-like children within exported components by examining node properties, layer naming conventions, and component structure (e.g., children with `type: "SLOT"` in the Figma API response, or children matching known slot naming patterns).
2. When the plugin detects a Figma native Slot, the plugin shall call `node.exportAsync()` on the slot's content to capture a pixel-perfect PNG image of the rendered content.
3. The plugin shall render detected slot images as PNG at 2x scale by default, with an optional user-configurable scale factor (1x, 2x, 3x, 4x) in the export settings.
4. The plugin shall distinguish between DslCanvas regions (identified by `isCanvas`/`canvasName` plugin data) and Figma native Slots (identified by slot detection heuristics), tagging each with its source type in the export output.
5. If a node matches both DslCanvas metadata and Figma native Slot detection, the plugin shall prefer the DslCanvas classification, since the DSL pipeline provides richer metadata for those regions.
6. The plugin shall support detecting slots in any component, not limited to components created by the DSL pipeline — any designer-authored component with slot-like children shall be eligible for image capture.

### Requirement 10: Unified Export with Image Bundling

**Objective:** As a designer, I want the Figma plugin's existing export action to automatically include rendered images for both DslCanvas regions and detected Figma native Slots alongside the DSL JSON, so that I get a complete, self-contained export package in a single step.

#### Acceptance Criteria

1. When the user triggers the existing export action (changeset or complete export), the Figma plugin shall automatically render each DslCanvas region and each detected Figma native Slot using `node.exportAsync()` and include the image data in the export output.
2. The exported JSON shall include a `slotImages` field containing a map of slot/canvas names to their image data, with each entry tagged by source type (`"dslCanvas"` or `"nativeSlot"`).
3. When the total export payload size is below a configurable threshold (default: 1 MB), the plugin shall embed slot images as base64-encoded data URIs within the JSON output under the `slotImages` map.
4. When the total export payload size exceeds the threshold, the plugin shall package the JSON and image files together as a ZIP archive, with images stored as separate files named `{slot-name}.png`.
5. The plugin shall export only the contents of each slot/canvas frame (the frame itself and its children), not the parent component or surrounding nodes.
6. While the export is in progress, the plugin shall display progress feedback indicating which slot/canvas frame is being rendered and the overall completion status.
7. If a slot/canvas frame render fails, the plugin shall report the error for that specific frame, omit it from the bundled output, and continue exporting the remaining frames.

### Requirement 11: Dual Rendering Path Coexistence

**Objective:** As a pipeline maintainer, I want the Figma-native image capture path to coexist with the existing `@figma-dsl/renderer`-based DslCanvas rendering pipeline, so that both rendering paths remain functional and consumers can use whichever is appropriate for their context.

#### Acceptance Criteria

1. The Figma plugin's bundled images (Requirement 10) shall be produced independently of the existing `@figma-dsl/renderer`-based `renderCanvasNodes()` pipeline.
2. The existing `renderCanvasNodes()` function and CLI `render --no-canvas` behavior shall remain unchanged after adding the Figma-native image capture path.
3. Where a DslCanvas node has a `scale` property defined in the DSL, the Figma plugin export shall use the user-selected scale factor (not the DSL-defined scale), since the Figma-native export reflects the designer's export intent rather than the DSL author's rendering intent.
4. When consuming an export package, the DslCanvas React component shall prefer bundled `slotImages` data (from either source type) over re-rendering via `@figma-dsl/renderer`, falling back to renderer-based rendering when no bundled image is available.
5. For Figma native Slots (source type `"nativeSlot"`), the bundled image shall be the only rendering path, since these slots have no DSL representation for `@figma-dsl/renderer` to process.
