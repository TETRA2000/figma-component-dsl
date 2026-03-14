# Implementation Plan

- [x] 1. Project setup and monorepo infrastructure
- [x] 1.1 Initialize npm workspaces monorepo with shared TypeScript configuration
  - Set up workspace packages for DSL core, compiler, renderer, capturer, comparator, plugin, and CLI
  - Configure TypeScript 5.9+ strict mode with no `any` and ES2023 target as shared base configuration
  - Add vitest as the shared test runner across all packages
  - Bundle Inter font files (Regular, Medium, Semi Bold, Bold .otf) in the DSL core package for text measurement and rendering
  - Install @napi-rs/canvas 0.1.96+ in the renderer package
  - Install opentype.js 2.0+ in the compiler package for text measurement
  - Install pixelmatch 6.0+ and pngjs 7.0+ in the comparator package
  - Install Playwright 1.50+ in the capturer package
  - _Requirements: 10.1_

- [x] 2. DSL Core — Node primitives and color system
- [x] 2.1 Implement the node type system and factory functions for basic shapes
  - Define the DslNode discriminated union type covering FRAME, TEXT, RECTANGLE, ELLIPSE, and GROUP node types
  - Implement factory functions (createFrame, createText, createRectangle, createEllipse, createGroup) that construct virtual node objects satisfying DSL type interfaces
  - Support size, fills, strokes, corner radius (uniform and per-corner via cornerRadii), opacity, visibility, and clipContent on applicable node types
  - Ensure children arrays are defensively copied to maintain immutability
  - Validate constraints at construction time: non-empty names, positive size values, valid hex strings
  - Implement VirtualFigmaApi class returning DSL type interfaces, with createText() as async to match Figma Plugin API semantics
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12_
  - _Contracts: FigmaApiAdapter, DslFigmaApi_

- [x] 2.2 (P) Implement color helpers and fill/stroke system
  - Implement hexToRGB converting 6-digit hex strings to RGBA colors in 0.0-1.0 float range
  - Implement solidPaint for creating solid fills with optional opacity
  - Implement gradientPaint for creating linear gradient fills with multiple color stops and angle-based gradient transform matrix
  - Implement stroke paint definition with color, weight, and optional alignment (INSIDE/CENTER/OUTSIDE)
  - Implement defineTokens and tokenPaint for creating and resolving named color constants
  - Implement reference design token constants (REFERENCE_COLORS, SEMANTIC_COLORS, REFERENCE_GRADIENTS, SPACING_SCALE, RADIUS_SCALE, FONT_SIZE_SCALE, FONT_WEIGHTS) matching the reference library's tokens.css
  - Ensure multiple fills per node preserve array ordering
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 12.2, 12.3_
  - _Contracts: SharedHelpers (color helpers, token constants)_

- [x] 3. DSL Core — Layout, typography, and component system
- [x] 3.1 Implement auto-layout configuration and layout helpers
  - Implement AutoLayoutConfig with direction (HORIZONTAL/VERTICAL), spacing, padding (uniform, padX/padY axis-based, per-side top/right/bottom/left), primary axis alignment (MIN/CENTER/MAX/SPACE_BETWEEN), and counter axis alignment (MIN/CENTER/MAX)
  - Implement setAutoLayout helper function matching the reference plugin signature
  - Support sizing modes (FIXED/HUG/FILL) at both unified and per-axis (widthSizing/heightSizing) levels
  - Support layoutGrow property on child nodes for spacer and flex-grow behavior
  - Support per-child layoutSizingHorizontal and layoutSizingVertical overrides
  - Validate that auto-layout is only applied to FRAME and COMPONENT node types
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  - _Contracts: SharedHelpers (AutoLayoutOptions)_

- [x] 3.2 (P) Implement typography system and text node properties
  - Implement TextStyle with font family (default: Inter), weight (400/500/600/700), and font size in pixels
  - Support line height with value and unit discriminator (PERCENT or PIXELS) or AUTO
  - Support letter spacing with value and unit discriminator (PERCENT or PIXELS)
  - Support text alignment (LEFT/CENTER/RIGHT) mapped to textAlignHorizontal property
  - Support convenience color shorthand on TextStyle (hex string auto-converted to text fill)
  - Validate that characters is required on TEXT nodes and forbidden on other node types
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 12.10, 12.11_
  - _Contracts: DslTextNode_

- [x] 3.3 (P) Implement component, variant, and instance definitions
  - Implement createComponent factory creating COMPONENT nodes with component semantics and optional property definitions
  - Support component property types: TEXT with string default, BOOLEAN with boolean default, INSTANCE_SWAP with component reference
  - Implement combineAsVariants creating COMPONENT_SET nodes that group variants by axis key-value definitions
  - Validate that COMPONENT_SET children follow Figma's Key=Value, Key=Value naming convention
  - Implement createInstance creating INSTANCE nodes referencing a component by name with optional property overrides via setProperties
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 12.21, 12.22, 12.23_
  - _Contracts: DslComponentNode, DslComponentSetNode, DslInstanceNode_

- [x] 4. Compiler — Core pipeline
- [x] 4.1 Implement GUID assignment, parent references, and compile result structure
  - Traverse the DslNode tree depth-first, assigning counter-based GUIDs ([0, N] with auto-incrementing N) to each node
  - Generate parentIndex references linking each non-root node to its parent's GUID and position
  - Produce the CompileResult structure containing the root FigmaNodeDict, total node count, and accumulated errors
  - Implement compileToJson for serializing the result to JSON matching the FigmaNodeDict format
  - Ensure deterministic GUID generation for reproducible snapshot testing
  - _Requirements: 1.5, 1.11_
  - _Contracts: CompilerService_

- [x] 4.2 (P) Implement color token resolution and fill format conversion
  - Resolve color token references to concrete RGBA values during the compilation pass
  - Convert DslNode Fill types (SolidPaint, GradientPaint) to FigmaNodeDict fillPaints array format
  - Convert DslNode StrokePaint to FigmaNodeDict stroke entries with strokeWeight
  - Preserve fill array ordering when multiple fills are specified on a single node
  - Report unresolved token references as CompileErrors with the originating node path
  - _Requirements: 3.5, 3.6_

- [x] 4.3 (P) Implement transform matrix computation for fixed-position nodes
  - Compose 3x3 affine transform matrices: parent transform x child offset = child absolute transform
  - Use identity matrix for the root node
  - Output transforms in [[a, c, tx], [b, d, ty], [0, 0, 1]] format
  - Handle nodes without auto-layout parents by using their explicit position as the offset
  - Auto-layout containers delegate positioning to the layout algorithm (Task 5.2)
  - _Requirements: 1.6_

- [x] 4.4 (P) Implement component, variant, and instance compilation
  - Compile COMPONENT nodes by mapping componentProperties into the componentPropertyDefinitions format expected by the plugin
  - Compile COMPONENT_SET nodes by validating variant child naming follows Key=Value convention
  - Compile INSTANCE nodes by resolving componentRef to a componentId and recording property overrides as overriddenProperties
  - Track component definitions within the compilation unit for instance reference resolution
  - Report circular component references and unresolved componentRef as CompileErrors with node path
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 5. Compiler — Text measurement and auto-layout algorithm
- [x] 5.1 Integrate opentype.js and implement the text measurer
  - Load Inter font files (.otf) for four weights (Regular, Medium, Semi Bold, Bold) via opentype.js
  - Measure text width by summing scaled glyph advance widths with kerning support
  - Compute text height as line count x line height (defaulting to fontSize x 1.2 when line height is unspecified)
  - Handle multi-line text (split on \n) returning width as the maximum line width across all lines
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - _Contracts: TextMeasurer_

- [x] 5.2 (P) Implement the two-pass auto-layout resolution algorithm
  - Pass 1 (bottom-up): compute intrinsic sizes for leaf nodes (TEXT via TextMeasurer, shapes via explicit size); resolve HUG sizing from children (primary axis sum + spacing + padding, counter axis max + padding); defer FILL sizing
  - Pass 2 (top-down): compute available space in each container, allocate FIXED and HUG children first, distribute remaining space equally among FILL children, position children sequentially with spacing gaps
  - Apply primary axis alignment: MIN packs start, CENTER centers the block, MAX packs end, SPACE_BETWEEN distributes spacing between children
  - Apply counter axis alignment: MIN aligns to start edge, CENTER centers, MAX aligns to end edge
  - Treat FILL children inside HUG parents as HUG (FILL has no meaning when parent is content-sized)
  - Support layoutGrow for proportional space distribution among flex-grow children
  - Verify correctness against the three design document worked examples: horizontal button, vertical card with FILL-width titles, 3-column grid layout
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 12.6, 12.7_

- [x] 5.3 (P) Implement text data expansion for renderer consumption
  - Generate textData containing characters and lines array (split by \n) for each TEXT node
  - Compute text dimensions (computedWidth, computedHeight) using TextMeasurer for accurate layout and rendering
  - Set top-level fontSize, fontFamily, fontWeight, textAlignHorizontal, lineHeight, and letterSpacing fields on the compiled node
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 6. Renderer — @napi-rs/canvas rendering pipeline
- [x] 6.1 (P) Implement frame and shape rendering with Skia Canvas 2D API
  - Register Inter font files via GlobalFonts.registerFromPath at module load time
  - Render FRAME, COMPONENT, COMPONENT_SET, and INSTANCE nodes as rectangles with solid color fills, strokes, corner radius, opacity, and content clipping using ctx.fillRect, ctx.roundRect, ctx.clip
  - Render RECTANGLE nodes with solid fills, stroke outlines, and rounded corners
  - Render ELLIPSE nodes using ctx.arc and scale transformations
  - Apply node affine transforms via ctx.setTransform with context save/restore
  - Skip invisible nodes (visible=false) while continuing to traverse their subtrees
  - Accept FigmaNodeDict object directly (in-process, no serialization boundary)
  - Output PNG via canvas.toBuffer('image/png')
  - _Requirements: 6.1, 6.2_
  - _Contracts: RendererService_

- [x] 6.2 Implement text rendering with Skia text engine
  - Render TEXT nodes using ctx.fillText with correct font family, weight, and size
  - Position each text line using textData lines array and computed line height
  - Apply text color from the first fillPaint entry
  - Implement horizontal text alignment (LEFT/CENTER/RIGHT) by computing x-offset based on textAlignHorizontal and container width
  - _Requirements: 6.1, 6.2_

- [x] 6.3 (P) Implement linear gradient fill rendering
  - Create Canvas 2D linear gradients via ctx.createLinearGradient from gradientStops color/position data
  - Convert Figma gradient transform matrices (rotation angle) to Canvas 2D point-to-point gradient coordinates
  - Apply gradient fills alongside solid fills on multi-fill nodes
  - _Requirements: 6.2_

- [x] 6.4 Implement image asset handling and error reporting
  - Resolve image asset paths relative to a configurable asset directory
  - Load images via @napi-rs/canvas loadImage and draw scaled to fill node bounds
  - Implement render and renderToBuffer methods accepting FigmaNodeDict, output path, and options (scale, background color, asset dir)
  - Report errors with node path, node type, and error description
  - _Requirements: 6.3, 6.4_

- [x] 7. (P) Screenshot capturer — React component isolation via Playwright
  - Launch headless Chromium via Playwright and render a single React component in isolation
  - Support capture from a component module path (with minimal Vite server) and from a running dev server URL
  - Capture element-level screenshots of the isolated component, not the full page
  - Configure viewport dimensions per capture request and device scale factor
  - Support configurable scroll position for components with scroll-dependent styling
  - Produce PNG output with white background matching the DSL renderer's default background
  - Ensure each capture uses a fresh browser context to prevent state leakage between captures
  - Clean up browser and server resources after capture completes
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 12.9, 12.25, 12.26_
  - _Contracts: CaptureService_

- [x] 8. (P) Visual comparator — Pixel-level image diff via pixelmatch
  - Decode two PNG images to raw RGBA buffers using pngjs
  - When images differ in dimensions, pad the smaller image with background color to match the larger and flag dimensionMatch as false
  - Run pixelmatch comparison with configurable sensitivity threshold (default 0.1) and anti-aliasing detection
  - Calculate similarity score as percentage of matching pixels
  - Generate a diff image highlighting mismatched pixels in configurable diff color (default red)
  - Report pass/fail against a configurable fail threshold (default 95% similarity)
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - _Contracts: CompareService_

- [x] 9. Figma export pipeline
- [x] 9.1 (P) Implement plugin input JSON exporter
  - Transform CompileResult into PluginInput format with schema version, component definitions, and target page name
  - Preserve auto-layout properties on nodes (not just computed transforms) so the plugin creates real auto-layout frames
  - Extract component property definitions and structure them for plugin registration via addComponentProperty
  - Generate variant definitions with correct Key=Value naming and axis metadata for combineAsVariants
  - Include instance definitions with component references and property overrides
  - Write PluginInput JSON to the specified output path
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

- [x] 9.2 Implement Figma plugin — basic node creation with fills, auto-layout, and text
  - Parse PluginInput JSON from plugin UI (pasted or loaded)
  - Recursively create Figma nodes by type: figma.createFrame, figma.createRectangle, figma.createEllipse
  - Apply solid and gradient fills, strokes, corner radius, and opacity to created nodes
  - Apply auto-layout properties using the setAutoLayout pattern from the reference plugin
  - Load Inter fonts asynchronously via figma.loadFontAsync before text node creation
  - Create text nodes with correct font family, weight, size, line height, letter spacing, and alignment
  - Build with esbuild matching the reference plugin's build configuration
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 9.3 Implement Figma plugin — components, variants, instances, and error handling
  - Create COMPONENT nodes with registered properties via addComponentProperty for TEXT, BOOLEAN, and INSTANCE_SWAP types
  - Create variant components with Key=Value naming and combine them using figma.combineAsVariants
  - Create INSTANCE nodes from corresponding component definitions and apply property overrides
  - Place created components on a dedicated page (default: "Component Library") with sequential canvas positioning
  - Output JSON mapping of component names to Figma node IDs for Code Connect configuration
  - Wrap each node creation in error handling: accumulate errors, report via figma.notify, and continue without crashing
  - _Requirements: 9.5, 9.6, 9.7, 9.8_

- [x] 10. CLI interface — Pipeline orchestration
- [x] 10.1 Implement compile and render commands
  - Implement the compile command: import and execute a DSL module (.dsl.ts), compile the resulting DslNode tree, and output FigmaNodeDict JSON to file or stdout
  - Implement the render command: invoke RendererService.render in-process with compiled FigmaNodeDict, passing output path, scale, and background options
  - _Requirements: 10.1, 10.2_
  - _Contracts: CliCommands_

- [x] 10.2 (P) Implement capture and compare commands
  - Implement the capture command: invoke the screenshot capturer with component path or URL, viewport specification (WxH format), optional props JSON, and output path
  - Implement the compare command: invoke the visual comparator with two image paths, configurable threshold, and diff output path; display similarity score and pass/fail result
  - _Requirements: 10.3, 10.4_

- [x] 10.3 Implement pipeline, export, bundle commands, and error handling
  - Implement the pipeline command chaining: compile -> render -> capture -> compare, stopping on first error and reporting which stage failed
  - Implement the export command: compile DSL, generate plugin input JSON, write to output path with optional page name override
  - Implement the bundle command: use esbuild to package DSL definitions for Figma plugin execution
  - Define exit codes: 0 for success, 1 for pipeline failure (comparison below threshold), 2 for runtime errors
  - Report all errors with context (originating stage, input that caused failure, relevant file paths)
  - Build CLI with Node.js parseArgs (no framework dependency)
  - _Requirements: 10.5, 10.6, 10.7_

- [x] 10.4 (P) Implement the doctor command for environment verification
  - Verify Node.js version (22+) and Inter font file availability in the DSL core package
  - Validate design token sync: parse tokens.css (if present) and verify REFERENCE_COLORS, FONT_SIZE_SCALE, SPACING_SCALE, RADIUS_SCALE constants match CSS custom property values
  - Report status of each dependency with actionable error messages for missing items
  - _Requirements: 10.7, 12.2, 12.3_
  - _Contracts: CliCommands (doctor)_

- [x] 11. AI Skill — React-to-DSL generation
- [x] 11.1 Create the react-to-dsl Claude Code skill definition
  - Create .claude/skills/react-to-dsl/SKILL.md with skill frontmatter (name, description) and instruction body
  - Skill accepts a React component file path as argument and produces a DSL definition file and Code Connect stub
  - Include instructions for analyzing JSX structure, CSS Modules, design tokens, and prop interfaces
  - Include instructions for mapping CSS flexbox to setAutoLayout, grid to nested Auto Layout, colors to solidPaint/gradientPaint, typography to text node properties
  - Include instructions for generating combineAsVariants for variant props, addComponentProperty for boolean and string props, and Cartesian product for multi-axis variants
  - Include instructions for handling out-of-scope patterns with TODO comments and fallback nodes (animations, scroll state, backdrop-filter, gradient text, SVG icons, external images, box-shadow, dark mode)
  - Reference REFERENCE_COLORS, SEMANTIC_COLORS, FONT_SIZE_SCALE, FONT_WEIGHTS, SPACING_SCALE, RADIUS_SCALE imports from SharedHelpers
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10, 12.1, 12.4, 12.5, 12.6, 12.7, 12.8, 12.10, 12.11, 12.12, 12.13, 12.14, 12.15, 12.16, 12.17, 12.18, 12.19, 12.20, 12.21, 12.22, 12.23, 12.24, 12.25, 12.26, 12.27, 12.28, 12.29, 12.30, 12.31, 12.32_
  - _Contracts: ReactToDslSkill (SKILL.md)_

- [x] 12. Integration and end-to-end testing
- [x] 12.1 Implement compile-to-render integration tests
  - Test the full compile -> render pipeline: create DSL definitions, compile to FigmaNodeDict, render via RendererService in-process, verify output PNG exists with expected dimensions
  - Test error propagation: verify that renderer errors are captured and reported with context by the pipeline
  - Test that the FigmaNodeDict format produced by the compiler is correctly consumed by the renderer
  - _Requirements: 6.1, 6.2, 10.1, 10.2_

- [x] 12.2 Implement CLI end-to-end tests
  - Test each CLI subcommand (compile, render, capture, compare, pipeline, export, bundle) with sample inputs and verify expected outputs
  - Test the pipeline command end-to-end: DSL -> compile -> render -> capture -> compare, verifying similarity score and output files
  - Test error scenarios: invalid DSL input (non-zero exit code, descriptive error), comparison below threshold (exit code 1)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 12.3 Create DSL test definitions for primitive and card-level components
  - **Button** (all 12 variants: 4 styles x 3 sizes) — gradient fills (purple to indigo), pill-shaped corners (9999), horizontal auto-layout with center alignment, size-dependent padding and font sizes, Full Width boolean property
  - **Badge** (4 variants: Default, Primary, Success, Warning) — solid fills with matching border colors, pill-shaped corners, compact horizontal padding (12x6), TEXT component property for label
  - **FeatureCard** — vertical card layout with 16px spacing, white background with 1px gray border, nested icon placeholder using INSTANCE_SWAP property, 24px uniform padding, 16px corner radius
  - **TestimonialCard** (3 rating variants: 3/4/5 stars) — repeated ELLIPSE shapes for star icons, avatar circle (40px ELLIPSE), multi-section vertical layout with author info row, 165% line height on quote text
  - **PricingCard** (standard + highlighted variants) — highlighted variant with dark gradient background and inverted text colors, features list with checkmark circles, 1px divider line, conditional CTA button styling, 24px corner radius
  - **CTABanner** — 3-stop dark gradient background (indigo to purple), centered vertical layout with 32px spacing, nested horizontal button row with contrasting styles (solid white + transparent outline), 24px corner radius
  - These definitions exercise: gradient fills, auto-layout (H+V), sizing variants, component properties (TEXT/BOOLEAN/INSTANCE_SWAP), ELLIPSE shapes, multi-fill nodes, border strokes, and nested component structures
  - Compile each definition and verify the compiler produces valid FigmaNodeDict JSON with correct transforms and layout
  - Render each definition via RendererService and verify output PNG dimensions and visual correctness
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.5, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 12.4, 12.5, 12.13, 12.14, 12.15_

- [ ] 12.4 Create DSL test definitions for section and page-level compositions
  - **Navbar** — fixed-width (1200px) horizontal layout with spacers (layoutGrow) between logo, nav links, and CTA button; 1px bottom border stroke; gradient CTA button nested inside; tests flex-grow distribution
  - **Hero** (center + left alignment variants) — vertical layout with 24px spacing, multi-size text (60px title with -2.5px letter-spacing, 20px subtitle), nested badge component, horizontal button row with two CTA styles; tests large text measurement and alignment variants
  - **Stats** (inline + cards variants) — inline variant: horizontal layout with divider separators between stat groups; cards variant: stat values in individual white card frames with borders; purple stat values (36px, 700 weight) with gray labels; tests variant-based layout switching
  - **Footer** — dark background (#030712), multi-column horizontal layout with 64px spacing, 3 link columns (Product/Company/Support), 1px divider line, vertical stacking of top section + copyright; tests dark theme, multi-column auto-layout
  - **FeatureGrid** (2/3/4 column variants) — vertical layout with header section + grid of FeatureCard instances; tests INSTANCE nodes referencing FeatureCard component, variant-based column count, CSS grid to nested Auto Layout mapping
  - **LogoCloud** (grid + scroll variants) — horizontal logo row with 48px spacing, logo text placeholders, centered header; tests simple horizontal distribution
  - **FAQ** — vertically stacked items with 1px borders between them, 720px constrained width, question text + chevron indicator per item; tests vertical list with separators
  - **Testimonials** — section header (badge + title + subtitle) with horizontal row of 3 TestimonialCard instances; tests INSTANCE nodes with property overrides
  - **PricingTable** — section header with 3 PricingCard instances in horizontal row, middle card highlighted; tests mixed variant instances in a single row
  - **Container** (4 width variants: 640/768/1024/1200px) — pure layout component with no fills, centered content with 24px horizontal padding; tests minimal layout-only components
  - These page-level compositions exercise: layoutGrow spacers, INSTANCE nodes with overrides, multi-column layouts, dark backgrounds, fixed-width containers, and deeply nested auto-layout trees (3+ levels)
  - _Requirements: 1.6, 2.5, 2.6, 2.7, 3.6, 4.3, 4.4, 4.6, 5.3, 5.4, 5.5, 6.1, 6.2, 12.6, 12.7, 12.8, 12.16, 12.17, 12.18, 12.19, 12.20_

- [ ]* 12.5 Run full visual regression comparison against React component screenshots
  - Capture React component screenshots for all 16 reference components using the screenshot capturer with matching viewport sizes
  - Run visual comparison (DSL render vs React screenshot) for each component and establish baseline similarity scores
  - Document expected similarity ranges per component type: simple shapes (>98%), text-heavy layouts (>92%), gradient components (>90%)
  - Track regression over time by committing baseline scores and diffing against subsequent runs
  - _Requirements: 6.2, 7.1, 8.1, 8.2, 8.3, 8.4_
