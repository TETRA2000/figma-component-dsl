# Requirements Document

## Introduction

The current DSL pipeline (`@figma-dsl/*` packages) supports FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP, COMPONENT, COMPONENT_SET, and INSTANCE node types — but has **no image or bitmap support**. Fill types are limited to SOLID, GRADIENT_LINEAR, and GRADIENT_RADIAL. This means DSL definitions cannot include photographs, icons, illustrations, or any raster/bitmap content.

When communicating design intention — especially for hero sections, product cards, avatars, or marketing pages — placeholder rectangles with gradient fills are a poor substitute for actual images. Designers and developers reviewing DSL-rendered PNGs or Figma exports cannot assess visual fidelity without real image content.

This specification enhances the DSL pipeline end-to-end with image support: a new DSL API for referencing images, compiler handling, renderer image drawing, exporter image encoding, Figma plugin image import, and bidirectional image sync so that image changes made by designers in Figma flow back to code via changesets.

## Requirements

### Requirement 1: DSL Image Node API

**Objective:** As a DSL author, I want to declare image nodes in `.dsl.ts` files referencing local or remote image sources, so that I can include real visual content in my component definitions.

#### Acceptance Criteria

1. The `@figma-dsl/core` package shall export an `image(name, options)` builder function that creates an IMAGE node type.
2. When `image()` is called with a `src` option containing a local file path, the DSL Core shall resolve the path relative to the DSL source file's directory.
3. When `image()` is called with a `src` option containing an HTTPS URL, the DSL Core shall accept the URL as a valid image source.
4. The `image()` builder shall accept `size` (`{ x: number, y: number }`), `cornerRadius`, `opacity`, `visible`, `layoutSizingHorizontal`, and `layoutSizingVertical` options consistent with existing node constructors.
5. The `image()` builder shall accept a `fit` option with values `'FILL'`, `'FIT'`, `'CROP'`, or `'TILE'` to control how the image is scaled within the node bounds, defaulting to `'FILL'`.
6. If `image()` is called without a required `src` option, the DSL Core shall throw a descriptive validation error at definition time.
7. The IMAGE node type shall be addable as a child of FRAME, GROUP, COMPONENT, and COMPONENT_SET nodes, consistent with other leaf nodes like RECTANGLE and ELLIPSE.

### Requirement 2: Image Fill on Existing Nodes

**Objective:** As a DSL author, I want to apply image fills to existing node types (FRAME, RECTANGLE), so that I can use images as backgrounds without creating a dedicated image node.

#### Acceptance Criteria

1. The `@figma-dsl/core` package shall export an `imageFill(src, options?)` fill builder function that creates an IMAGE-type fill.
2. When `imageFill()` is used in a node's `fills` array, the DSL Core shall accept it alongside existing fill types (solid, gradient, radialGradient).
3. The `imageFill()` builder shall accept `scaleMode` (`'FILL'` | `'FIT'` | `'CROP'` | `'TILE'`) and `opacity` options.
4. When multiple fills include image fills, the DSL Core shall layer them in array order consistent with how solid and gradient fills are layered.

### Requirement 3: Compiler Image Handling

**Objective:** As a pipeline consumer, I want the compiler to process IMAGE nodes and IMAGE fills into the intermediate JSON format, so that downstream stages (renderer, exporter) receive well-formed image data.

#### Acceptance Criteria

1. When the compiler encounters an IMAGE node, the Compiler shall include it in the compiled FigmaNodeDict output with type, size, positioning, and image source metadata.
2. When the compiler encounters an IMAGE fill on any node, the Compiler shall include the fill in the node's paint list with type `'IMAGE'` and the source reference.
3. The compiler shall validate that image source paths or URLs are syntactically valid and emit a warning if a local file path does not exist at compile time.
4. While compiling nodes with auto-layout, the Compiler shall measure IMAGE nodes using their declared `size` dimensions for layout resolution, consistent with RECTANGLE and ELLIPSE handling.

### Requirement 4: Renderer Image Drawing

**Objective:** As a developer previewing DSL output, I want the renderer to draw actual images in the PNG output, so that rendered previews show real visual content instead of empty placeholders.

#### Acceptance Criteria

1. When the renderer encounters an IMAGE node or IMAGE fill, the Renderer shall load the image from the source path or URL and draw it onto the canvas.
2. When the image source is a local file path, the Renderer shall resolve it relative to the `assetDir` render option (already defined in RenderOptions).
3. When the image source is an HTTPS URL, the Renderer shall fetch the image data and cache it locally for the duration of the render session to avoid redundant network requests.
4. The Renderer shall scale and position the loaded image according to the node's `size` and `fit`/`scaleMode` property (`FILL` = cover, `FIT` = contain, `CROP` = centered crop, `TILE` = repeat pattern).
5. When the renderer applies `cornerRadius` to an IMAGE node, the Renderer shall clip the image to the rounded rectangle boundary.
6. If an image source cannot be loaded (file not found, network error, corrupt data), the Renderer shall draw a placeholder rectangle with a distinguishable pattern (e.g., diagonal stripes or crosshatch) and log a warning — not fail the entire render.
7. The Renderer shall support PNG, JPEG, and WebP image formats via @napi-rs/canvas's `loadImage()` capability.
8. While performing batch rendering, the Renderer shall reuse loaded image data across multiple renders of components that reference the same image source.

### Requirement 5: Exporter Image Encoding

**Objective:** As a Figma workflow user, I want the exporter to include image data in the Figma plugin JSON, so that images appear when components are imported into Figma.

#### Acceptance Criteria

1. When the exporter encounters an IMAGE node or IMAGE fill, the Exporter shall embed the image data as a base64-encoded string in the `.figma.json` output.
2. The Exporter shall include image metadata (original dimensions, scale mode, format) in the exported JSON alongside the base64 data.
3. When the exported JSON contains embedded images, the Exporter shall keep individual image payloads under 4 MB (base64-encoded) and log a warning if an image exceeds this limit.
4. If an image source cannot be loaded during export, the Exporter shall omit the image data, include an error marker in the JSON, and log a warning — not fail the entire export.

### Requirement 6: Figma Plugin Image Import

**Objective:** As a designer importing DSL components into Figma, I want images to appear correctly in the imported Figma nodes, so that the design matches the DSL-rendered preview.

#### Acceptance Criteria

1. When the Figma plugin encounters a node with embedded image data, the Plugin shall create the image using `figma.createImage()` from the base64 data and apply it as an image fill.
2. The Plugin shall apply the `scaleMode` property from the exported JSON to the Figma image fill's `scaleMode` property.
3. When the Plugin creates image fills with cornerRadius, the Plugin shall clip the node using Figma's native corner radius to match the DSL-rendered appearance.
4. If the embedded image data is invalid or missing, the Plugin shall create a placeholder rectangle fill and log an error to the Figma console.

### Requirement 7: CLI Image Asset Resolution

**Objective:** As a CLI user, I want image paths in DSL files to resolve correctly regardless of which directory I run the CLI from, so that the pipeline works reliably in any working directory.

#### Acceptance Criteria

1. When the CLI `compile` command processes a DSL file with image references, the CLI shall resolve relative image paths from the DSL source file's location, not the current working directory.
2. When the CLI `render` command is invoked with `--asset-dir`, the Renderer shall use the specified directory as the base for resolving image paths in the compiled JSON.
3. If `--asset-dir` is not specified, the CLI shall default the asset directory to the parent directory of the input file.
4. When the CLI `batch` command processes multiple DSL files with image references, the CLI shall resolve each file's image paths independently relative to that file's location.

### Requirement 8: Image Format and Validation

**Objective:** As a DSL author, I want clear feedback when image references are invalid, so that I can fix issues before they propagate through the pipeline.

#### Acceptance Criteria

1. The `@figma-dsl/validator` package shall include an image validation rule that checks whether referenced image files exist and are in supported formats (PNG, JPEG, WebP).
2. When the `validate` CLI command encounters an image reference with an unsupported format, the Validator shall report a descriptive error identifying the file and supported formats.
3. When the `validate` CLI command encounters an HTTPS image URL, the Validator shall verify the URL is syntactically valid without performing a network request.
4. If an image file exceeds 10 MB, the Validator shall report a warning recommending optimization for pipeline performance.

### Requirement 9: Bidirectional Image Sync via Plugin

**Objective:** As a designer, I want image changes I make in Figma (swapping images, adjusting scale mode, adding/removing image fills) to be captured in changesets that developers can apply back to code, so that the bidirectional sync workflow covers images end-to-end.

#### Acceptance Criteria

1. When a component with image fills is imported via the plugin, the Plugin shall include image fill data (image hash, scale mode, original source reference) in the baseline snapshot stored in plugin data.
2. When a designer replaces an image fill on an imported component in Figma, the Plugin shall detect the change and record it in the edit log with the old image hash and the new image hash.
3. When a designer changes the `scaleMode` of an image fill (e.g., FILL to FIT) on an imported component, the Plugin shall record the scale mode change as a property change in the edit log.
4. When a designer adds a new image fill to an imported component, the Plugin shall record the addition as a structural change including the new image data and scale mode.
5. When a designer removes an image fill from an imported component, the Plugin shall record the removal as a structural change referencing the removed image hash.
6. When a changeset is exported containing image changes, the Plugin shall embed the new image data as base64 in the changeset JSON alongside the property change metadata.
7. When the Changeset Applicator encounters an image change in a changeset, the Changeset Applicator shall extract the embedded image data, save it to the project's asset directory, and update the corresponding `image()` or `imageFill()` source reference in the DSL or React code.
8. When the Changeset Applicator encounters an image scale mode change, the Changeset Applicator shall update the `fit` or `scaleMode` property in the DSL source or the corresponding CSS `object-fit` property in the React component.
9. The Plugin shall serialize image fills using `figma.getImageByHash()` to retrieve image bytes for export, and include the image dimensions in the serialized output.
10. If the Plugin cannot retrieve image bytes for a changed image (e.g., the image was deleted from Figma), the Plugin shall include an error marker in the changeset entry and log a warning — not fail the entire changeset export.
