# Implementation Plan

- [x] 1. Project setup and monorepo infrastructure
- [x] 1.1 Initialize npm workspaces monorepo with shared TypeScript configuration
  - Set up workspace packages: `packages/dsl-core` (types, virtual API, helpers, compiler), `packages/cli` (pipeline orchestration), `packages/plugin` (Figma plugin runtime)
  - Configure TypeScript 5.9+ strict mode with no `any` and ES2023 target as shared base configuration
  - Add vitest as the shared test runner across TypeScript packages
  - Set up Python package `renderer/` with pyproject.toml following figma-html-renderer conventions, declaring PyCairo 1.27+ and Pillow as dependencies, pytest as dev dependency
  - Bundle Inter font files (Regular, Medium, Semi Bold, Bold .otf) in `packages/dsl-core/fonts/` for offline text measurement
  - Verify development installation works: `npm install` for TypeScript packages, `pip install -e .` for Python renderer
  - _Requirements: 10.1_

- [x] 2. DSL Core — Shared type hierarchy and VirtualFigmaApi
- [x] 2.1 Define the shared DSL type hierarchy
  - Define `DslSceneNode` base interface with common properties: name, x, y, width, height, rotation, opacity, visible, fills, strokes, strokeWeight, cornerRadius, clipContent, children, appendChild(), resize()
  - Define `DslFrameNode` extending `DslSceneNode` with auto-layout properties: layoutMode, itemSpacing, paddingTop/Right/Bottom/Left, primaryAxisAlignItems, counterAxisAlignItems, layoutSizingHorizontal, layoutSizingVertical
  - Define `DslTextNode` extending `DslSceneNode` with text properties: characters, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, textAlignHorizontal
  - Define `DslRectangleNode`, `DslEllipseNode`, `DslGroupNode` extending `DslSceneNode`
  - Define `DslComponentNode` extending `DslFrameNode` with addComponentProperty() and createInstance()
  - Define `DslComponentSetNode` extending `DslFrameNode`
  - Define `DslInstanceNode` extending `DslFrameNode` with mainComponent back-pointer and setProperties()
  - Define paint types: `DslSolidPaint`, `DslGradientPaint`, `DslPaint` union
  - Define `DslNodeType` discriminated union: FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP, COMPONENT, COMPONENT_SET, INSTANCE
  - _Requirements: 1.1, 1.2, 1.6, 1.7, 1.8, 1.9, 1.10_

- [x] 2.2 Implement the DslFigmaApi interface and VirtualFigmaApi
  - Define the `DslFigmaApi` interface with factory methods: createFrame(), createText() (async, returning Promise<DslTextNode>), createRectangle(), createEllipse(), createComponent(), createGroup(), combineAsVariants()
  - Implement `VirtualFigmaApi` returning VirtualNode objects that implement the DSL type interfaces with mutable property setters
  - Implement appendChild() on container nodes, maintaining insertion-order children arrays with correct parent-child relationships
  - Implement createText() as async in both environments — virtual mode resolves immediately, ensuring DSL code always uses `await createText()`
  - Implement combineAsVariants(): create VirtualComponentSetNode, reparent input components as children, validate Key=Value naming convention
  - Implement createInstance() on DslComponentNode: create VirtualInstanceNode with mainComponent back-pointer, shallow copy of default property values, and setProperties() for overrides
  - Implement addComponentProperty() for TEXT, BOOLEAN, and INSTANCE_SWAP component property types
  - Implement resize() setting both width and height, and visible property for hiding nodes
  - Validate property constraints at assignment time (e.g., layoutMode only on FRAME/COMPONENT types)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.11, 1.12, 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Contracts: DslFigmaApi, FigmaApiAdapter_

- [x] 2.3 (P) Add unit tests for VirtualFigmaApi and DSL types
  - Test that createFrame(), createText(), createRectangle(), createEllipse(), createComponent() produce nodes with correct types and default values
  - Test that appendChild() builds correct tree hierarchies with parent-child relationships and insertion-order children
  - Test combineAsVariants() postconditions: reparenting, Key=Value naming validation, ComponentSetNode creation
  - Test createInstance() postconditions: mainComponent back-pointer, default property copying, setProperties() overrides
  - Test that createText() returns a Promise in virtual mode
  - Test property constraint validation: layoutMode rejection on non-container nodes, characters on non-TEXT nodes
  - _Requirements: 1.1, 1.5, 1.11, 5.3, 5.4, 5.5_

- [x] 3. DSL Core — Shared helper functions
- [x] 3.1 (P) Implement color and fill helpers
  - Implement hexToRGB() converting 6-digit hex strings (with # prefix) to { r, g, b } in 0.0–1.0 range
  - Implement solidPaint() accepting hex string and optional opacity, returning DslSolidPaint compatible with Figma's paint format
  - Implement gradientPaint() accepting color stops array and angle in degrees, computing rotation transform matrix [[cos(θ), sin(θ), 0.5], [-sin(θ), cos(θ), 0.5]]
  - Implement defineTokens() and tokenPaint() for named color constants: defineTokens returns a token map, tokenPaint resolves a token name to a DslSolidPaint
  - Validate hex string format and report clear errors for invalid inputs
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [x] 3.2 (P) Implement auto-layout and typography helpers
  - Implement setAutoLayout() accepting a DslFrameNode and AutoLayoutOptions, setting layoutMode, itemSpacing, padding (uniform via padX/padY, or per-side padTop/padRight/padBottom/padLeft), primaryAxisAlignItems, counterAxisAlignItems, and sizing mode properties
  - Support separate widthSizing and heightSizing overrides alongside unified sizing option
  - Map padX to paddingLeft + paddingRight, padY to paddingTop + paddingBottom
  - Validate that setAutoLayout() only operates on DslFrameNode-compatible nodes
  - These helpers are pure data transforms identical in both virtual and plugin environments
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.4_

- [x] 3.3 (P) Add unit tests for shared helpers
  - Test hexToRGB with valid hex strings, edge cases (black #000000, white #FFFFFF), and invalid inputs
  - Test solidPaint output matches Figma SolidPaint format with type, color, and opacity fields
  - Test gradientPaint rotation matrix correctness for 0°, 45°, 90°, 180° angles
  - Test setAutoLayout maps all padding shorthand combinations correctly
  - Test defineTokens/tokenPaint round-trip: define tokens → resolve by name → correct DslSolidPaint
  - _Requirements: 2.1, 3.1, 3.2, 3.3, 3.6_

- [x] 4. Compiler — Layout resolution and FigmaNodeDict output
- [x] 4.1 Implement GUID assignment, parent references, and basic compilation
  - Traverse VirtualNode tree depth-first, assigning counter-based GUIDs ([0, N] with auto-incrementing N) to each node
  - Generate parentIndex references linking each non-root node to its parent's GUID and position
  - Convert DSL paint types to FigmaNodeDict fillPaints array format, preserving fill array ordering
  - Resolve color token references to concrete RGBA values, reporting unresolved tokens as CompileErrors with node path
  - Produce the CompileResult structure containing root FigmaNodeDict, total node count, and accumulated errors
  - Implement compileToJson() for JSON serialization matching figma-html-renderer node dictionary format
  - Ensure deterministic GUID generation for reproducible snapshot testing
  - _Requirements: 1.5, 1.11, 3.5, 3.6_
  - _Contracts: CompilerService_

- [x] 4.2 Integrate opentype.js text measurer
  - Load Inter font files (.otf) for four weights (Regular 400, Medium 500, Semi Bold 600, Bold 700) via opentype.js
  - Measure text width by summing scaled glyph advance widths with kerning support
  - Compute text height as line count × line height (defaulting to fontSize × 1.2 when line height is unspecified)
  - Handle multi-line text (split on \n) returning width as the maximum line width across all lines
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - _Contracts: TextMeasurer_

- [x] 4.3 Implement two-pass auto-layout resolution algorithm
  - Pass 1 (bottom-up measurement): compute intrinsic sizes for leaf nodes (TEXT via TextMeasurer, shapes via explicit size); resolve HUG sizing from children (primary axis sum + spacing + padding, counter axis max + padding); FIXED uses explicit size; FILL defers sizing to Pass 2
  - Pass 2 (top-down positioning): compute available space per container, allocate FIXED and HUG children first, distribute remaining space equally among FILL children, position children sequentially with spacing gaps
  - Apply primary axis alignment: MIN packs start, CENTER centers the block, MAX packs end, SPACE_BETWEEN distributes gaps between children
  - Apply counter axis alignment: MIN aligns to start edge, CENTER centers, MAX aligns to end edge
  - Handle FILL children inside HUG parents by treating them as HUG (parent's computed size wraps child's intrinsic size, not expanding)
  - Support layoutGrow for proportional space distribution among flex-grow children
  - Compute absolute 3×3 affine transform matrices: parent transform × child offset for each node
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 4.4 (P) Implement text data expansion and component compilation
  - Generate textData containing characters and lines array (split by \n) for each TEXT node
  - Generate derivedTextData with baseline entries per line: lineY position, lineHeight, first and end character indices
  - Generate fontMetaData with fontFamily, fontStyle name (Regular/Medium/Semi Bold/Bold from weight), fontWeight, and fontSize
  - Compile COMPONENT nodes by mapping componentProperties into componentPropertyDefinitions format
  - Compile COMPONENT_SET nodes by validating variant child naming follows Key=Value convention
  - Compile INSTANCE nodes by resolving mainComponent reference to componentId and recording overriddenProperties
  - Report circular component references and unresolved references as CompileErrors
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 4.5 Add compiler unit tests
  - Test GUID assignment produces unique, deterministic IDs across a multi-node tree
  - Test parent-child reference generation with correct position ordering
  - Test two-pass layout against design document worked examples: horizontal button (HUG sizing), vertical card with FILL-width children, nested badge row with counter-axis centering
  - Test FILL-inside-HUG edge case: verify FILL child treated as HUG, parent size wraps intrinsic size
  - Test primary axis alignment modes (MIN, CENTER, MAX, SPACE_BETWEEN) produce correct child positions
  - Test counter axis alignment modes (MIN, CENTER, MAX) produce correct cross-axis positions
  - Test text measurement integration: TEXT node with known characters produces expected dimensions
  - Test component/variant/instance compilation produces correct FigmaNodeDict fields
  - _Requirements: 1.5, 2.1, 2.5, 2.6, 4.6, 5.5_

- [x] 5. Python renderer — PyCairo rendering pipeline
- [x] 5.1 (P) Implement frame and shape rendering with CLI entry point
  - Render FRAME, COMPONENT, COMPONENT_SET, and INSTANCE nodes as rectangles with solid color fills, strokes, corner radius, opacity, and content clipping
  - Render RECTANGLE nodes with solid fills, stroke outlines, and rounded corners using Cairo arcs
  - Render ELLIPSE nodes using Cairo arc and scale transformations
  - Apply node affine transforms via Cairo matrix operations with context save/restore
  - Skip invisible nodes (visible=false) while continuing tree traversal
  - Accept FigmaNodeDict JSON from stdin or file path argument
  - Implement Python CLI entry point: `python -m figma_component_dsl.renderer --input nodes.json --output render.png [--scale 2] [--bg white|transparent] [--assets dir]`
  - Output structured JSON error messages to stderr with node path, node type, and error description
  - _Requirements: 6.1, 6.2, 6.4_
  - _Contracts: DslRenderer_

- [x] 5.2 Implement text rendering and gradient fills
  - Render TEXT nodes using Cairo select_font_face and show_text with correct font family, weight, and size
  - Map font weight to Cairo values: 400→FONT_WEIGHT_NORMAL, 500–700→FONT_WEIGHT_BOLD
  - Position each text line using baseline data from derivedTextData (lineY and lineHeight)
  - Apply text color from the first fillPaint entry
  - Implement horizontal text alignment (LEFT/CENTER/RIGHT) by computing x-offset based on textAlignHorizontal and measured text width
  - Create Cairo LinearGradient patterns from gradientStops color/position data
  - Convert Figma gradient transform matrices to Cairo point-to-point gradient coordinates
  - Apply gradient fills alongside solid fills on multi-fill nodes
  - _Requirements: 6.1, 6.2_

- [x] 5.3 (P) Implement image asset handling and renderer tests
  - Resolve image asset paths relative to a configurable asset directory
  - Load images as Cairo surface patterns scaled to fill node bounds
  - Test frame/rectangle rendering: verify output PNG dimensions, solid fill colors, corner radius, opacity
  - Test text rendering: verify text appears with correct positioning and alignment
  - Test gradient rendering: verify gradient direction and color stops
  - Test error handling: missing font fallback, unsupported node type skip with warning
  - _Requirements: 6.3, 6.4_

- [x] 6. (P) Screenshot capturer — React component isolation via Playwright
  - Launch headless Chromium via Playwright and render a single React component in isolation
  - Implement capture from a component module path by spinning up a minimal Vite server for isolated rendering
  - Implement captureUrl for navigating to an existing dev server URL
  - Capture element-level screenshots of the isolated component via element.screenshot(), not full page
  - Configure viewport dimensions and device scale factor per capture request
  - Produce PNG output with white background matching the DSL renderer's default background
  - Ensure each capture uses a fresh browser context to prevent state leakage between captures
  - Clean up browser and server resources after capture completes
  - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - _Contracts: CaptureService_

- [x] 7. (P) Visual comparator — Pixel-level image diff via pixelmatch
  - Decode two PNG images to raw RGBA buffers using pngjs
  - When images differ in dimensions, pad the smaller image with background color and flag dimensionMatch as false
  - Run pixelmatch comparison with configurable sensitivity threshold (default 0.1) and anti-aliasing detection
  - Calculate similarity score as percentage of matching pixels out of total pixels
  - Generate a diff image highlighting mismatched pixels in configurable diff color (default red)
  - Report pass/fail against a configurable fail threshold (default 95% similarity)
  - Test with identical images (100%), completely different images (~0%), and known diff patterns
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - _Contracts: CompareService_

- [ ] 8. Figma plugin runtime — Direct DSL execution via bundled code
- [ ] 8.1 (P) Implement the plugin shim module and esbuild bundling
  - Create the plugin shim module that re-exports DSL functions backed by real Figma Plugin API: createFrame() → figma.createFrame(), createRectangle() → figma.createRectangle(), createEllipse() → figma.createEllipse(), createComponent() → figma.createComponent()
  - Implement async createText() shim: calls figma.createText(), awaits figma.loadFontAsync({ family: 'Inter', style: 'Regular' }), returns the text node
  - Implement async font-weight property setter: when fontWeight is set on a text node, intercept the assignment, map weight to style name (400→Regular, 500→Medium, 600→Semi Bold, 700→Bold), await figma.loadFontAsync() for that style before applying the value
  - Re-export shared helpers (solidPaint, gradientPaint, hexToRGB, setAutoLayout) — identical in both environments
  - Implement combineAsVariants() shim delegating to figma.combineAsVariants() with type widening
  - Configure esbuild to bundle DSL definitions into a single IIFE that exports an async main() function, resolving 'figma-dsl' imports to the shim module
  - _Requirements: 9.1, 9.2, 9.3_
  - _Contracts: PluginRuntime_

- [ ] 8.2 Implement plugin UI, page management, and error handling
  - Create plugin UI with text area for pasting bundle JS or file picker for loading it
  - Execute bundled DSL code where all factory calls delegate to real Figma Plugin API
  - Register component properties via addComponentProperty() for TEXT, BOOLEAN, and INSTANCE_SWAP types
  - Combine variant components using figma.combineAsVariants() with Key=Value naming
  - Create instances from component definitions and apply property overrides
  - Place created components on a dedicated page ("Component Library") with sequential canvas positioning
  - Output JSON mapping of component names to Figma node IDs for Code Connect configuration
  - Wrap each node creation in try/catch: accumulate errors, report via figma.notify(), continue without crashing
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

- [ ] 9. CLI — Pipeline orchestration
- [ ] 9.1 Implement compile, render, and bundle commands
  - Implement compile command: dynamically import a DSL module (.dsl.ts), execute it with VirtualFigmaApi, compile the resulting node tree, output FigmaNodeDict JSON to file or stdout
  - Implement render command: invoke Python renderer as subprocess with JSON input (via stdin or temp file), passing --output, --scale, and --bg flags
  - Implement bundle command: use esbuild to package DSL definitions for Figma plugin execution, resolving 'figma-dsl' imports to the plugin shim module
  - Discover Python interpreter via FIGMA_DSL_PYTHON environment variable, falling back to python3 on PATH
  - Report subprocess errors by parsing the renderer's structured JSON stderr output
  - _Requirements: 10.1, 10.2, 10.6_
  - _Contracts: CliCommands_

- [ ] 9.2 (P) Implement capture, compare, and pipeline commands
  - Implement capture command: invoke screenshot capturer with component path or URL, viewport specification (WxH format), optional props JSON, and output path
  - Implement compare command: invoke visual comparator with two image paths, configurable threshold, and diff output path; display similarity score and pass/fail result
  - Implement pipeline command chaining: compile → render → capture → compare, stopping on first error and reporting which stage failed
  - Define exit codes: 0 for success, 1 for comparison below threshold, 2 for runtime errors
  - Report all errors with context: originating stage, input that caused failure, relevant file paths
  - Build CLI with Node.js parseArgs (no framework dependency)
  - _Requirements: 10.3, 10.4, 10.5, 10.7_

- [ ] 9.3 (P) Implement doctor command for environment verification
  - Verify Node.js version (22+), Python version (3.10+), PyCairo availability, and Inter font file presence
  - Run preflight checks: Python interpreter discovery, `import cairo` validation, font file existence
  - Report status of each dependency with actionable error messages for missing items
  - _Requirements: 10.7_

- [ ] 10. (P) AI skill — React-to-DSL generation
  - Create `.claude/skills/react-to-dsl/SKILL.md` with name, description frontmatter, and detailed instruction body
  - Document supported patterns: CSS Modules with design tokens, flexbox layout, CSS Grid, variant props (union types), boolean props, string content props, array data props via .map(), up to 3 composition levels, up to 15 nested elements
  - Document unsupported pattern handling: absolute/fixed positioning → `// TODO:` and skip; CSS animations/transitions/hover → generate default state only; responsive breakpoints → single viewport 1200px; dynamic state → initial state only; third-party UI libraries → report unsupported and skip
  - Document generation workflow: read .tsx → read .module.css + types.ts + tokens.css → classify patterns → map JSX to createFrame()/createText()/createRectangle() → resolve CSS custom properties to solidPaint() → map flexbox to setAutoLayout() → map typography to text node properties → generate variant COMPONENT_SET with combineAsVariants() → generate boolean properties via addComponentProperty() → generate representative array child → output .dsl.ts + .figma.tsx Code Connect stub
  - Include examples of CSS-to-DSL mapping for reference (flex-direction → direction, gap → spacing, padding → padX/padY, align-items → counterAlign, justify-content → align)
  - Include examples of Code Connect stub generation using figma.enum(), figma.string(), figma.boolean(), figma.instance()
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10, 11.11, 11.12, 11.13, 11.14, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10, 12.11, 12.12_

- [ ] 11. Integration and end-to-end testing
- [ ] 11.1 Implement compile-to-render integration tests
  - Test full compile → render pipeline: create DSL definitions using VirtualFigmaApi, compile to FigmaNodeDict JSON, render via Python subprocess, verify output PNG exists with expected dimensions
  - Test error propagation: verify renderer subprocess errors are captured and reported with context by the TypeScript pipeline
  - Test JSON interchange format: verify compiler output is correctly consumed by the Python renderer
  - _Requirements: 6.1, 6.2, 10.1, 10.2_

- [ ] 11.2 (P) Implement CLI end-to-end tests
  - Test each CLI subcommand (compile, render, capture, compare, pipeline, bundle, doctor) with sample inputs and verify expected outputs
  - Test pipeline command end-to-end: DSL → compile → render → capture → compare, verifying similarity score and output files
  - Test error scenarios: invalid DSL input (non-zero exit code, descriptive error), missing Python environment (actionable message), comparison below threshold (exit code 1)
  - Test bundle command: verify output is valid JS that references expected Figma API call patterns
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 11.3 Create DSL test definitions for primitive and card-level components
  - **Button** (all 12 variants: 4 styles × 3 sizes) — gradient fills, pill-shaped corners, horizontal auto-layout with center alignment, size-dependent padding and font sizes, Full Width boolean property, using createComponent() + combineAsVariants()
  - **Badge** (4 variants) — solid fills with matching border colors, pill-shaped corners, compact padding, TEXT component property
  - **FeatureCard** — vertical layout, white background with border, nested icon placeholder using INSTANCE_SWAP, 24px padding, 16px corner radius
  - **TestimonialCard** (3 rating variants) — repeated ELLIPSE for star icons, avatar circle, multi-section vertical layout, 165% line height on quote text
  - **PricingCard** (standard + highlighted) — highlighted variant with dark gradient background and inverted text, features list with checkmark circles, divider line, conditional CTA button styling
  - **CTABanner** — 3-stop gradient background, centered vertical layout, nested horizontal button row with contrasting styles
  - All definitions use DslFigmaApi (createFrame, await createText, solidPaint, setAutoLayout, createComponent, combineAsVariants) patterns
  - Compile each definition and verify valid FigmaNodeDict JSON with correct transforms and layout
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.5, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2_

- [ ] 11.4 Create DSL test definitions for section and page-level compositions
  - **Navbar** — fixed-width horizontal layout with layoutGrow spacers, border stroke, gradient CTA button, testing flex-grow distribution
  - **Hero** (center + left variants) — multi-size text (60px title, 20px subtitle), nested badge component, horizontal button row, testing large text measurement
  - **Stats** (inline + cards variants) — inline with dividers, cards with individual frames, testing variant-based layout switching
  - **Footer** — dark background, multi-column horizontal layout, 3 link columns, divider line, testing dark theme
  - **FeatureGrid** (2/3/4 column variants) — header + grid of FeatureCard instances, testing INSTANCE node references
  - **Testimonials** — section header with horizontal row of TestimonialCard instances, testing INSTANCE nodes with property overrides
  - **PricingTable** — 3 PricingCard instances in horizontal row with middle card highlighted, testing mixed variant instances
  - These compositions exercise: layoutGrow spacers, INSTANCE nodes with overrides, multi-column layouts, 3+ level nesting depth
  - _Requirements: 1.6, 1.11, 2.5, 2.6, 2.7, 3.6, 4.3, 4.4, 4.6, 5.3, 5.4, 5.5, 6.1, 6.2_

- [ ]* 11.5 Run full visual regression comparison against React component screenshots
  - Capture React component screenshots for all 16 reference components using the screenshot capturer with matching viewport sizes
  - Run visual comparison (DSL render vs React screenshot) for each component and establish baseline similarity scores
  - Document expected similarity ranges per component type: simple shapes (>98%), text-heavy layouts (>92%), gradient components (>90%)
  - Track regression over time by committing baseline scores
  - _Requirements: 6.2, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3, 8.4_
