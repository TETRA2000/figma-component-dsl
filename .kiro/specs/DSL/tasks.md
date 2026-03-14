# Implementation Plan

- [x] 1. Core image type system and builders
- [x] 1.1 Add IMAGE node type and ImageFill to the type system
  - Extend the NodeType union with `'IMAGE'` and add `imageSrc` and `imageScaleMode` optional fields to the DslNode interface
  - Add `ImageFill` interface to the Fill discriminated union with `type: 'IMAGE'`, `src`, `scaleMode`, `opacity`, and `visible` fields
  - Export the `ImageScaleMode` type alias (`'FILL' | 'FIT' | 'CROP' | 'TILE'`) for reuse across packages
  - Ensure IMAGE is accepted as a child of FRAME, GROUP, COMPONENT, and COMPONENT_SET in the existing child-validation logic
  - _Requirements: 1.1, 1.7, 2.1, 2.4_

- [x] 1.2 (P) Implement the image() node builder function
  - Create a builder that accepts a name and ImageProps (src, size, fit, cornerRadius, opacity, visible, layoutSizing) and returns a DslNode with type IMAGE
  - Default `fit` to `'FILL'` when not specified
  - Throw a descriptive error when `src` is missing or empty
  - Accept both local file paths and HTTPS URLs as valid `src` values
  - Support `size`, `cornerRadius`, `opacity`, `visible`, `layoutSizingHorizontal`, `layoutSizingVertical` consistent with rectangle and ellipse builders
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 1.3 (P) Implement the imageFill() fill builder function
  - Create a builder that accepts a source string and optional scaleMode and opacity, returning an ImageFill with sensible defaults (scaleMode: FILL, opacity: 1, visible: true)
  - Validate that src is non-empty
  - Ensure image fills layer correctly alongside solid and gradient fills in the fills array
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 1.4* Test coverage for image builders
  - Verify image() creates correct DslNode shape with all properties
  - Verify image() throws on missing or empty src
  - Verify imageFill() creates correct ImageFill with defaults and overrides
  - Verify IMAGE nodes are accepted as children of container nodes
  - Verify image fills coexist with solid and gradient fills
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 2.1, 2.2, 2.3, 2.4_

- [x] 2. (P) Implement pure image helpers with scale mode math and format detection
  - Implement `computeDrawInstruction()` returning a discriminated union: `SingleDrawInstruction` for FILL (cover), FIT (contain), and CROP (centered, no scaling), and `TileInstruction` for TILE (renderer uses pattern fill)
  - FILL: compute source crop region to cover destination while maintaining aspect ratio
  - FIT: compute destination rect to fit image within frame bounds, centered with letterboxing
  - CROP: center image at original size within frame, clip overflow
  - TILE: return `{ type: 'tile' }` — renderer handles via canvas pattern API
  - Implement `isSupportedImageFormat()` to check file extensions for PNG, JPEG, and WebP
  - Write unit tests for all four scale modes with various aspect ratios (landscape, portrait, square, extreme ratios), and format detection with supported and unsupported extensions
  - _Requirements: 4.4, 8.1_

- [x] 3. Extend the compiler to handle IMAGE nodes and IMAGE fills
- [x] 3.1 Add IMAGE node compilation and IMAGE fill conversion
  - Add IMAGE to the compiled node type mapping so IMAGE DslNodes pass through to the intermediate JSON with type, size, positioning, and image source metadata
  - Extend fill conversion to handle ImageFill, producing a paint with type IMAGE and the source reference and scale mode
  - Validate that image source paths and URLs are syntactically valid at compile time, emitting a warning for missing local files (non-blocking)
  - Ensure IMAGE nodes use their declared size for auto-layout measurement, consistent with rectangles and ellipses
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3.2* Test coverage for compiler image handling
  - Verify IMAGE nodes appear in compiled output with correct type and metadata
  - Verify IMAGE fills on frames and rectangles produce correct paint entries
  - Verify compile-time warning for missing local file paths
  - Verify IMAGE nodes participate correctly in auto-layout sizing
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Image loading, caching, and renderer integration
- [x] 4.1 Implement the image loader with pre-load cache and source collection
  - Create `collectImageSources()` to traverse a compiled node tree and gather all image source references (from IMAGE nodes and IMAGE fills)
  - Create `preloadImages()` to load all collected sources in parallel via the canvas library's async loadImage, returning an immutable image cache
  - Create `resolveImageSource()` to resolve relative paths against an asset directory, pass through absolute paths, and pass through HTTPS URLs unchanged
  - Handle load failures gracefully: log a warning and omit the entry from the cache (do not throw)
  - Support PNG, JPEG, and WebP formats natively via the canvas library
  - _Requirements: 4.1, 4.2, 4.3, 4.7, 4.8_

- [x] 4.2 Render IMAGE nodes with scale modes, clipping, and placeholder fallback
  - Add an IMAGE case to the node rendering switch that looks up the image from the cache and draws it using the draw instruction from image helpers
  - For SingleDrawInstruction results (FILL, FIT, CROP), use the 9-argument drawImage with source and destination coordinates
  - For TileInstruction results (TILE), create a canvas pattern from the image and fill the frame rectangle
  - Apply cornerRadius clipping before drawing, reusing the existing rounded-rectangle clip path logic
  - If the image is not in the cache (load failed), draw a crosshatch placeholder — diagonal gray lines on transparent background
  - _Requirements: 4.1, 4.4, 4.5, 4.6, 4.7_

- [x] 4.3 Render IMAGE fills on existing node types
  - Extend the fill rendering function to handle IMAGE-type paints, using the same image lookup, draw instruction, and clipping logic as IMAGE nodes
  - Ensure image fills layer correctly with other fill types in paint order
  - _Requirements: 4.1, 4.4_

- [x] 4.4* Test coverage for image loading and rendering
  - Verify collectImageSources traverses nested trees and collects all references
  - Verify resolveImageSource handles relative paths, absolute paths, and URLs
  - Verify preloadImages returns a cache with loaded images and logs warnings for failures
  - Verify IMAGE node rendering produces correct visual output for each scale mode
  - Verify cornerRadius clipping works on image nodes
  - Verify placeholder is drawn when image is missing from cache
  - Verify image fills on frames and rectangles render correctly alongside other fills
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [x] 5. (P) Extend the exporter to embed images as base64 in plugin JSON
- [x] 5.1 Embed image data with metadata, size checks, and error handling
  - When encountering IMAGE nodes or IMAGE fills during export, read the image file and encode it as a base64 string inline (using Node built-in fs and Buffer — no external dependencies)
  - Include image metadata alongside the base64 data: original dimensions, scale mode, and format (PNG/JPEG/WEBP)
  - Check encoded payload size and log a warning if it exceeds 4 MB
  - If the image file cannot be read, omit the image data, set an error marker on the fill, and log a warning — do not fail the export
  - Make the export function async to support file reading
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 5.2* Test coverage for exporter image encoding
  - Verify IMAGE fills produce base64 data and metadata in exported JSON
  - Verify 4 MB size warning is emitted for large images
  - Verify graceful error handling when image file is missing
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6. (P) Implement image validation rule
  - Create a validation rule that checks whether referenced image files exist at the specified paths and are in supported formats (PNG, JPEG, WebP)
  - Report a descriptive error identifying the file and listing supported formats when an unsupported format is encountered
  - For HTTPS URLs, validate syntactic correctness without performing network requests
  - Report a warning when an image file exceeds 10 MB, recommending optimization
  - Register the new rule in the validator's rule set
  - Write tests covering valid images, unsupported formats, missing files, oversized files, valid URLs, and malformed URLs
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 7. Add CLI --asset-dir option and image path resolution
  - Add an `--asset-dir` option to the CLI's argument parsing for the render and batch commands
  - In the compile command, resolve relative image paths from the DSL source file's directory, not the current working directory
  - In the render command, pass the `--asset-dir` value (or default to the input file's parent directory) through to the renderer options
  - In the batch command, resolve each file's image paths independently using that file's parent directory as the asset base
  - Wire the image pre-loading step into the CLI render and batch pipelines: collect sources → preload images → pass cache to renderer
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 8. Implement Figma plugin IMAGE import
- [x] 8.1 Create Figma images from embedded base64 data and apply as fills
  - When the plugin encounters a fill with embedded image data during import, decode the base64 string to a byte array and create a Figma image handle
  - Apply the image as an IMAGE fill on the node with the correct scale mode from the exported JSON
  - Corner radius is already applied by the existing plugin import logic — verify it clips image fills correctly
  - If the image data is missing or invalid, create a solid gray placeholder fill and log an error to the Figma console
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 8.2* Test coverage for plugin image import
  - Verify IMAGE fills with valid base64 data produce correct Figma image paints
  - Verify scaleMode is applied correctly
  - Verify placeholder fill is created for invalid or missing image data
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Bidirectional image sync via plugin changesets
- [x] 9.1 Serialize IMAGE fills in baseline snapshots
  - Extend the fill serialization function to handle IMAGE paint type, storing the image hash, scale mode, and opacity — not the image bytes (stays under 100KB plugin data limit)
  - When importing a component with image fills, include the image hash and original source reference in the baseline snapshot
  - _Requirements: 9.1_

- [x] 9.2 Detect image changes and export changesets with embedded image data
  - Extend the diff logic to compare image hashes (string equality, no epsilon) and scale modes on IMAGE fills
  - When the plugin detects an image fill change (different hash or scale mode), record it in the edit log
  - Detect additions and removals of image fills as structural changes
  - During changeset export, retrieve the changed image bytes via the Figma API, encode to base64, and embed in the changeset JSON alongside the property change metadata
  - If image bytes cannot be retrieved (image deleted from Figma), include an error marker and log a warning — do not fail the changeset export
  - Make the changeset computation async to support image byte retrieval
  - _Requirements: 9.2, 9.3, 9.4, 9.5, 9.6, 9.9, 9.10_

- [x] 9.3 Apply image changesets to DSL and React source code
  - When the changeset applicator encounters an image change, extract the embedded base64 data, save it as an image file in the project's asset directory, and update the corresponding image() or imageFill() source reference in the DSL code
  - When the changeset contains a scale mode change, update the fit or scaleMode property in the DSL source, or the corresponding CSS object-fit property in the React component
  - _Requirements: 9.7, 9.8_

- [x] 10. End-to-end pipeline integration and verification
  - Create a sample DSL file using image() and imageFill() with a test image asset, run it through the full pipeline: compile → render → export → verify outputs
  - Verify batch rendering reuses cached images when multiple components reference the same source
  - Verify error recovery: a DSL file referencing a missing image compiles, renders with a placeholder, and exports with an error marker — no pipeline crash
  - Verify existing non-image DSL files continue to compile, render, and export without regression
  - Run full test suite across all packages and verify type checking passes
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 4.6, 4.8, 5.1, 5.4, 7.1, 8.1_
