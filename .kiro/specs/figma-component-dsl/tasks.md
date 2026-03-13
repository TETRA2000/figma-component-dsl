# Implementation Plan

- [x] 1. Project setup and monorepo infrastructure
- [x] 1.1 Initialize npm workspaces monorepo with shared TypeScript configuration
  - Set up root package.json with workspaces pointing to packages/dsl-core, packages/renderer, packages/comparator, packages/cli, and packages/figma-plugin
  - Configure a shared TypeScript base config (tsconfig.base.json) with strict mode, no `any`, ES2023 target, and project references for inter-package imports
  - Add vitest as the shared test runner across all TypeScript packages
  - Bundle Inter font files (Regular, Medium, Semi Bold, Bold .otf) in packages/dsl-core/fonts/ for text measurement and rendering
  - Configure each package with its own package.json and tsconfig.json extending the shared base
  - _Requirements: 10.1_

- [x] 2. DSL Core — Node primitives and color system
- [x] 2.1 Implement the node type system and factory functions for basic shapes
  - Define the DslNode interface and NodeType discriminated union covering FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP, COMPONENT, COMPONENT_SET, and INSTANCE
  - Implement factory functions (frame, text, rectangle, ellipse, group) that construct immutable DslNode objects with defensive array copying for children
  - Support size, fills, strokes, corner radius (uniform and per-corner via cornerRadii), opacity, visibility, and clipContent on applicable node types
  - Validate constraints at construction time: non-empty names, positive size values, auto-layout only on FRAME and COMPONENT, characters required on TEXT and forbidden on others
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  - _Contracts: DslCore Service_

- [x] 2.2 (P) Implement color helpers and fill/stroke system
  - Implement hex() converting 6-digit hex strings to RgbaColor in 0.0–1.0 float range
  - Implement solid() for creating SolidFill with optional opacity
  - Implement gradient() for creating GradientFill with multiple color stops, position values, and angle-based gradient transform matrix
  - Implement stroke paint definition with color, weight, and optional alignment (INSIDE/CENTER/OUTSIDE)
  - Implement defineTokens() and token() for creating named color constants (ColorTokenMap) and resolving them to SolidFill
  - Ensure multiple fills per node preserve array ordering in the fills property
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - _Contracts: DslCore Service (color helpers)_

- [x] 3. DSL Core — Layout, typography, and component system
- [x] 3.1 Implement auto-layout configuration and layout helpers
  - Implement AutoLayoutConfig with direction (HORIZONTAL/VERTICAL), spacing, padding (uniform, padX/padY axis-based, per-side top/right/bottom/left), primary axis alignment (MIN/CENTER/MAX/SPACE_BETWEEN), and counter axis alignment (MIN/CENTER/MAX)
  - Implement horizontal() and vertical() convenience functions that set direction and merge default values
  - Support sizing modes (FIXED/HUG/FILL) at both unified and per-axis (widthSizing/heightSizing) levels
  - Support layoutGrow property on child nodes for spacer and flex-grow behavior
  - Support per-child layoutSizingHorizontal and layoutSizingVertical overrides
  - Validate that auto-layout is only applied to FRAME and COMPONENT node types
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - _Contracts: DslCore Service (AutoLayoutConfig)_

- [x] 3.2 (P) Implement typography system and text node properties
  - Implement TextStyle with font family (default: Inter), weight (400/500/600/700), and font size in pixels
  - Support line height with value and unit discriminator (PERCENT or PIXELS)
  - Support letter spacing with value and unit discriminator (PERCENT or PIXELS)
  - Support text alignment (LEFT/CENTER/RIGHT) mapped to textAlignHorizontal property
  - Support convenience color shorthand on TextStyle (hex string auto-converted to text fill)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - _Contracts: DslCore Service (TextStyle)_

- [x] 3.3 (P) Implement component, variant, and instance definitions
  - Implement component() factory creating COMPONENT nodes with component semantics and optional component property definitions (TEXT, BOOLEAN, INSTANCE_SWAP types)
  - Implement componentSet() factory creating COMPONENT_SET nodes that group variant children by axis key-value definitions (variantAxes)
  - Validate that COMPONENT_SET children follow Figma's Key=Value, Key=Value naming convention
  - Implement instance() factory creating INSTANCE nodes referencing a component by name (componentRef) with optional property overrides
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Contracts: DslCore Service (ComponentProperty, DslNode variant types)_

- [x] 4. Compiler — Core pipeline
- [x] 4.1 Implement GUID assignment, parent references, and compile result structure
  - Traverse the DslNode tree depth-first, assigning counter-based GUIDs ([0, N] with auto-incrementing N) to each node
  - Generate parentIndex references linking each non-root node to its parent's GUID and position
  - Produce the CompileResult structure containing the root CompiledNode, total node count, and accumulated errors
  - Compose 3×3 affine transform matrices: parent transform × child offset = child absolute transform, with identity matrix for the root node
  - Ensure deterministic GUID generation for reproducible snapshot testing
  - _Requirements: 1.6_
  - _Contracts: CompilerService_

- [x] 4.2 (P) Implement color token resolution and fill format conversion
  - Resolve color token references to concrete RgbaColor values during the compilation pass
  - Convert DslNode Fill types (SolidFill, GradientFill) to ResolvedFill format for renderer consumption
  - Convert DslNode StrokePaint to ResolvedStroke entries
  - Preserve fill array ordering when multiple fills are specified on a single node
  - Report unresolved token references as CompileErrors with the originating node path
  - _Requirements: 3.5, 3.6_

- [x] 4.3 (P) Implement ComponentRegistry and instance resolution
  - Implement the ComponentRegistry with register(), resolve(), and names() methods for tracking COMPONENT definitions within a compilation unit
  - Perform a registration pass (depth-first traversal) before layout computation, registering COMPONENT nodes by name and COMPONENT_SET variant children with their full Key=Value names
  - Resolve INSTANCE nodes by looking up componentRef in the registry, cloning the referenced component subtree, and applying propertyOverrides (TEXT replacement, BOOLEAN visibility toggle, INSTANCE_SWAP child swap)
  - Report unresolved component references as CompileErrors; compile unresolved INSTANCE nodes as empty frames with a warning
  - Scope the registry to a single compile() call — created fresh and freed after each compilation
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Contracts: ComponentRegistry_

- [x] 4.4 (P) Implement component and variant compilation output
  - Compile COMPONENT nodes by mapping componentProperties into the componentPropertyDefinitions format for the exporter
  - Compile COMPONENT_SET nodes by validating variant child naming follows Key=Value convention and extracting variant axis metadata
  - Set componentId on compiled nodes for exporter and plugin consumption
  - Report circular component references as CompileErrors with the full node path
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 5. Compiler — Text measurement and Yoga layout
- [x] 5.1 Integrate opentype.js and implement the text measurer
  - Load Inter font files (.otf) for four weights (Regular, Medium, Semi Bold, Bold) via opentype.js
  - Measure text width by summing scaled glyph advance widths with GPOS/GSUB kerning
  - Compute text height as line count × line height (defaulting to fontSize × 1.2 when line height is unspecified)
  - Handle multi-line text (split on \n) returning width as the maximum line width across all lines
  - Implement createYogaMeasureFunc() that returns a function Yoga calls during layout to determine text node intrinsic size
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - _Contracts: TextMeasurer_

- [x] 5.2 Implement Yoga layout mapping and layout resolution
  - Build a parallel Yoga node tree mirroring the DslNode tree, mapping Figma auto-layout properties to Yoga equivalents (direction→flexDirection, spacing→gap, padding, alignment→justifyContent/alignItems)
  - Map sizing modes: FIXED→explicit width/height, HUG→no explicit size (Yoga auto-sizes), FILL→flexGrow:1 + flexBasis:0
  - Register custom Yoga measure functions for TEXT nodes using the TextMeasurer
  - Set layoutGrow values as flexGrow on child Yoga nodes for spacer elements
  - Call yogaRoot.calculateLayout() and extract computed positions (getComputedLeft/Top/Width/Height) into the CompiledNode tree
  - Free Yoga nodes after extraction to prevent memory leaks
  - Verify correctness against the three design document worked examples: button with label, card with FILL-width titles, nested badge row with counter-axis centering
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - _Contracts: YogaMapper_

- [x] 6. Renderer — Skia rendering via @napi-rs/canvas
- [x] 6.1 Implement frame and shape rendering
  - Register bundled Inter font files via GlobalFonts.registerFromPath() at startup
  - Create a Canvas with dimensions from the root CompiledNode and optional background color and scale factor
  - Render FRAME, COMPONENT, COMPONENT_SET, and INSTANCE nodes as rectangles with solid color fills, strokes, corner radius (including per-corner via roundRect), opacity, and content clipping (save/clip/restore)
  - Render RECTANGLE nodes with solid fills, stroke outlines, and rounded corners
  - Render ELLIPSE nodes using arc transformations
  - Apply node transforms via canvas context transformations
  - Skip invisible nodes (visible=false) while preserving tree traversal order
  - _Requirements: 6.1, 6.2_
  - _Contracts: RendererService_

- [x] 6.2 (P) Implement text rendering
  - Render TEXT nodes using Skia's text API with correct font family, weight, and size from ResolvedTextStyle
  - Position each text line using baseline data from the compiled node
  - Apply text color from the resolved text style
  - Implement horizontal text alignment (LEFT/CENTER/RIGHT) by computing x-offset relative to the node's available width
  - Handle multi-line text by rendering each line at its computed y position
  - _Requirements: 6.1, 6.2_

- [x] 6.3 (P) Implement gradient fill and image asset rendering
  - Create CanvasRenderingContext2D linear gradient patterns from GradientFill data (stops, positions, gradient transform)
  - Convert Figma gradient transform matrices (rotation angle) to Canvas gradient start/end coordinates
  - Apply gradient fills alongside solid fills on multi-fill nodes, respecting fill ordering and opacity
  - Resolve image asset paths relative to a configurable asset directory
  - Load and draw images scaled to fill node bounds
  - _Requirements: 6.2, 6.3_

- [x] 6.4 Implement PNG output and render error reporting
  - Encode the final canvas to PNG buffer and write to the specified output path
  - Report render errors as typed RenderError objects with message, node path, and node type
  - Handle unsupported node types and invalid fills gracefully (skip with warning, continue rendering)
  - _Requirements: 6.1, 6.4_

- [x] 7. (P) Screenshot capturer — React component isolation via Playwright
  - Launch headless Chromium via Playwright and render a single React component in isolation
  - Implement capture() mode: generate a temporary HTML file importing the target React component module, launch an ephemeral Vite dev server via createServer() API with path alias resolution, navigate Playwright to the server, capture the component element, then clean up server and temp directory
  - Implement captureUrl() mode: navigate Playwright to a provided URL (running Storybook or dev server) and capture the target element
  - Capture element-level screenshots via element.screenshot() — not the full page
  - Configure viewport dimensions and device scale factor per capture request
  - Produce PNG output with white background matching the DSL renderer's default background
  - Ensure each capture uses a fresh browser context to prevent state leakage between captures
  - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - _Contracts: CaptureService_

- [x] 8. (P) Visual comparator — Pixel-level image diff via pixelmatch
  - Decode two PNG images to raw RGBA buffers using pngjs
  - When images differ in dimensions, pad the smaller image with background color using sharp and flag dimensionMatch as false
  - Run pixelmatch comparison with configurable sensitivity threshold (default 0.1) and anti-aliasing detection
  - Calculate similarity score as percentage of matching pixels
  - Generate a diff image highlighting mismatched pixels in configurable diff color (default red)
  - Report pass/fail against a configurable fail threshold (default 95% similarity)
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - _Contracts: CompareService_

- [x] 9. Figma export pipeline
- [x] 9.1 (P) Implement plugin input JSON exporter
  - Transform CompileResult into PluginInput format with schema version, component definitions, and target page name
  - Preserve auto-layout properties on PluginNodeDef nodes (direction, spacing, padding, alignment, sizing) so the plugin creates real auto-layout frames — not just computed transforms
  - Extract component property definitions and structure them for plugin registration via addComponentProperty()
  - Generate variant definitions with correct Key=Value naming and axis metadata for combineAsVariants()
  - Include instance definitions with component references and property overrides
  - Write PluginInput JSON to the specified output path
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_
  - _Contracts: ExporterService_

- [x] 9.2 Implement Figma plugin — basic node creation with fills, auto-layout, and text
  - Parse PluginInput JSON from plugin UI (pasted or loaded via file)
  - Recursively create Figma nodes by type: figma.createFrame(), figma.createRectangle(), figma.createEllipse()
  - Apply solid and gradient fills, strokes, corner radius, and opacity to created nodes
  - Apply auto-layout properties using the setAutoLayout pattern from the reference plugin (layoutMode, itemSpacing, padding, alignment, sizing)
  - Load Inter fonts asynchronously via figma.loadFontAsync() before text node creation
  - Create text nodes with correct font family, weight, size, line height, letter spacing, and alignment
  - Build plugin with esbuild matching the reference plugin's build configuration
  - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - _Contracts: PluginRunner_

- [x] 9.3 Implement Figma plugin — components, variants, instances, and error handling
  - Create COMPONENT nodes with registered properties via addComponentProperty() for TEXT, BOOLEAN, and INSTANCE_SWAP types
  - Create variant components with Key=Value naming and combine them using figma.combineAsVariants()
  - Create INSTANCE nodes from corresponding component definitions and apply property overrides
  - Place created components on a dedicated page (default: "Component Library") with sequential canvas positioning
  - Output JSON mapping of component names to Figma node IDs for Code Connect configuration
  - Wrap each node creation in error handling: accumulate errors, report via figma.notify(), and continue without crashing
  - _Requirements: 9.5, 9.6, 9.7, 9.8, 9.9, 9.10_

- [x] 10. CLI interface — Pipeline orchestration
- [x] 10.1 Implement compile and render commands
  - Implement the compile command: dynamically import and execute a DSL module (.dsl.ts), compile the resulting DslNode tree via the Compiler, and output CompiledNode JSON to file or stdout
  - Implement the render command: compile DSL then invoke the Renderer in-process to produce a PNG, passing output path, scale factor, and background color options
  - All pipeline stages are in-process TypeScript calls — no subprocess management needed
  - _Requirements: 10.1, 10.2_
  - _Contracts: CliCommands_

- [x] 10.2 (P) Implement capture and compare commands
  - Implement the capture command: invoke the CaptureService with component path or URL, viewport specification (WxH format), optional props JSON, and output path
  - Implement the compare command: invoke the CompareService with two image paths, configurable threshold, and diff output path; display similarity score and pass/fail result
  - _Requirements: 10.3, 10.4_

- [x] 10.3 Implement pipeline, export commands, and error handling
  - Implement the pipeline command chaining: compile → render → capture → compare, stopping on first error and reporting which stage failed
  - Implement the export command: compile DSL, generate plugin input JSON via the Exporter, write to output path with optional page name override
  - Implement the doctor command: verify Node.js version (22+), @napi-rs/canvas availability, Playwright browsers installed, Inter font registration status
  - Define exit codes: 0 for success, 1 for pipeline failure (comparison below threshold), 2 for runtime errors
  - Report all errors with context (originating stage, input that caused failure, relevant file paths)
  - Build CLI with Node.js parseArgs (no framework dependency)
  - _Requirements: 10.5, 10.6, 10.7_

- [x] 11. Integration and end-to-end testing
- [x] 11.1 Implement compile-to-render integration tests
  - Test the full compile → render pipeline: create DSL definitions, compile to CompiledNode, render via Skia renderer in-process, verify output PNG exists with expected dimensions
  - Test error propagation: verify that renderer errors are correctly captured and reported with context by the pipeline
  - Test round-trip consistency: compile a DSL tree, render it, verify pixel-level determinism across repeated runs
  - _Requirements: 6.1, 6.2, 10.1, 10.2_

- [x] 11.2 Implement CLI end-to-end tests
  - Test each CLI subcommand (compile, render, capture, compare, pipeline, export, doctor) with sample inputs and verify expected outputs
  - Test the pipeline command end-to-end: DSL → compile → render → capture → compare, verifying similarity score and output files
  - Test error scenarios: invalid DSL input (non-zero exit code, descriptive error), comparison below threshold (exit code 1), runtime errors (exit code 2)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [x] 11.3 Create DSL test definitions for primitive and card-level components
  - **Button** (all 12 variants: 4 styles × 3 sizes) — gradient fills (purple→indigo), pill-shaped corners (9999), horizontal auto-layout with center alignment, size-dependent padding and font sizes, Full Width boolean property
  - **Badge** (4 variants: Default, Primary, Success, Warning) — solid fills with matching border colors, pill-shaped corners, compact horizontal padding (12×6), TEXT component property for label
  - **FeatureCard** — vertical card layout with 16px spacing, white background with 1px gray border, nested icon placeholder using INSTANCE_SWAP property, 24px uniform padding, 16px corner radius
  - **TestimonialCard** (3 rating variants: 3/4/5 stars) — repeated ELLIPSE shapes for star icons, avatar circle (40px ELLIPSE), multi-section vertical layout with author info row, 165% line height on quote text
  - **PricingCard** (standard + highlighted variants) — highlighted variant with dark gradient background and inverted text colors, features list with checkmark circles, 1px divider line, conditional CTA button styling, 24px corner radius
  - **CTABanner** — 3-stop dark gradient background (indigo→purple), centered vertical layout with 32px spacing, nested horizontal button row with contrasting styles (solid white + transparent outline), 24px corner radius
  - These definitions exercise: gradient fills, auto-layout (H+V), sizing variants, component properties (TEXT/BOOLEAN/INSTANCE_SWAP), ELLIPSE shapes, multi-fill nodes, border strokes, and nested component structures
  - Compile each definition and verify the compiler produces valid CompiledNode trees with correct transforms and layout
  - Render each definition via the Skia renderer and verify output PNG dimensions and visual correctness
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.5, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2_

- [x] 11.4 Create DSL test definitions for section and page-level compositions
  - **Navbar** — fixed-width (1200px) horizontal layout with spacers (layoutGrow) between logo, nav links, and CTA button; 1px bottom border stroke; gradient CTA button nested inside; tests flex-grow distribution
  - **Hero** (center + left alignment variants) — vertical layout with 24px spacing, multi-size text (60px title with -2.5px letter-spacing, 20px subtitle), nested badge component, horizontal button row with two CTA styles; tests large text measurement and alignment variants
  - **Stats** (inline + cards variants) — inline variant: horizontal layout with divider separators between stat groups; cards variant: stat values in individual white card frames with borders; purple stat values (36px, 700 weight) with gray labels; tests variant-based layout switching
  - **Footer** — dark background (#030712), multi-column horizontal layout with 64px spacing, 3 link columns (Product/Company/Support), 1px divider line, vertical stacking of top section + copyright; tests dark theme, multi-column auto-layout
  - **FeatureGrid** (2/3/4 column variants) — vertical layout with header section + grid of FeatureCard instances; tests INSTANCE nodes referencing FeatureCard component, variant-based column count
  - **LogoCloud** (grid + scroll variants) — horizontal logo row with 48px spacing, logo text placeholders, centered header; tests simple horizontal distribution
  - **FAQ** — vertically stacked items with 1px borders between them, 720px constrained width, question text + chevron indicator per item; tests vertical list with separators
  - **Testimonials** — section header (badge + title + subtitle) with horizontal row of 3 TestimonialCard instances; tests INSTANCE nodes with property overrides
  - **PricingTable** — section header with 3 PricingCard instances in horizontal row, middle card highlighted; tests mixed variant instances in a single row
  - **Container** (4 width variants: 640/768/1024/1200px) — pure layout component with no fills, centered content with 24px horizontal padding; tests minimal layout-only components
  - These page-level compositions exercise: layoutGrow spacers, INSTANCE nodes with overrides, multi-column layouts, dark backgrounds, fixed-width containers, and deeply nested auto-layout trees (3+ levels)
  - _Requirements: 1.6, 2.5, 2.6, 3.6, 4.3, 4.4, 4.6, 5.3, 5.4, 5.5, 6.1, 6.2_

- [x]* 11.5 Run full visual regression comparison against React component screenshots
  - Capture React component screenshots for all 16 reference components using the screenshot capturer with matching viewport sizes
  - Run visual comparison (DSL render vs React screenshot) for each component and establish baseline similarity scores
  - Document expected similarity ranges per component type: simple shapes (>98%), text-heavy layouts (>92%), gradient components (>90%)
  - Track regression over time by committing baseline scores and diffing against subsequent runs
  - _Requirements: 6.2, 7.1, 8.1, 8.2, 8.3, 8.4_
