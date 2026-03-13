# Requirements Document

## Introduction

This specification defines requirements for **Figma Component DSL** — a domain-specific language that bridges React components and Figma's internal data structure, enabling a Figma-free iteration loop for component development.

Two existing reference implementations make this possible:

- **figma_design_playground** (`./references/figma_design_playground`) — A React 19 + TypeScript component library with 16 production components (Button, Badge, Hero, FeatureCard, PricingCard, etc.), a Figma plugin that programmatically creates matching Figma components using the Plugin API, and Code Connect bindings (`.figma.tsx` files) that map React props to Figma properties.
- **figma-html-renderer** (`./references/figma-html-renderer`) — A Python CLI tool with a strict 5-stage pipeline (Parse → Build Tree → Classify → Render → Output) that converts Figma's `.fig` binary format into PNG images via PyCairo, using node dictionaries with `guid`, `type`, `transform`, `size`, `fillPaints`, `children`, and `parentIndex` fields.

The DSL serves as the missing bridge: it provides a declarative way to define component structures that can be rendered as images without Figma — enabling rapid visual iteration. When ready to ship, a Figma plugin can parse the DSL to create real Figma components.

**Target workflow:**
1. Create React components
2. Write/generate Figma DSL definitions from those components
3. Render DSL as images (via figma-html-renderer's CanvasRenderer)
4. Render React components as images (via Playwright)
5. Compare the two — iterate on the DSL without Figma
6. When ready, export DSL to Figma via the plugin

## Requirements

### Requirement 1: DSL Node Primitives

**Objective:** As a component developer, I want to define Figma node structures using a declarative DSL, so that I can describe component layouts without using the Figma Plugin API directly.

#### Acceptance Criteria

1. The DSL shall support defining FRAME nodes with properties for size, position, fills, strokes, corner radius (uniform or per-corner via `cornerRadii`), clip content, and opacity.
2. The DSL shall support defining TEXT nodes with properties for characters, font family, font weight, font size, line height, letter spacing, text alignment, and text color.
3. The DSL shall support defining RECTANGLE nodes with properties for size, fills, strokes, corner radius, and opacity.
4. The DSL shall support defining ELLIPSE nodes with properties for size, fills, and opacity.
5. The DSL shall support defining GROUP nodes that logically group child nodes without rendering a background.
6. When a node definition includes children, the DSL shall produce a hierarchical tree structure with correct parent-child relationships and automatically generated GUIDs.
7. The DSL shall support setting a node's `visible` property to false to hide it from rendering while preserving it in the tree.

### Requirement 2: Auto Layout System

**Objective:** As a component developer, I want to define flex-like layout behavior in the DSL, so that component layouts match Figma's Auto Layout semantics used in the reference plugin's `setAutoLayout()` helper.

#### Acceptance Criteria

1. The DSL shall support specifying layout direction as horizontal or vertical on FRAME nodes, mapping to Figma's `layoutMode` property.
2. The DSL shall support specifying item spacing (gap) between children in a layout container, mapping to `itemSpacing`.
3. The DSL shall support specifying padding as uniform, axis-based (horizontal/vertical via `padX`/`padY`), or per-side (top, right, bottom, left), mapping to `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`.
4. The DSL shall support specifying primary axis alignment (min, center, max, space-between) and counter axis alignment (min, center, max), mapping to `primaryAxisAlignItems` and `counterAxisAlignItems`.
5. The DSL shall support specifying sizing behavior for children as fixed, hug-contents, or fill-container, mapping to `layoutSizingHorizontal` and `layoutSizingVertical`.
6. The DSL shall support flex-grow behavior on child nodes for spacer elements.


### Requirement 3: Color and Fill System

**Objective:** As a component developer, I want to specify colors and fills using familiar formats, so that I can style components without manual conversion between hex strings and Figma's RGBA 0.0–1.0 color model.

#### Acceptance Criteria

1. The DSL shall accept colors in hex format (e.g., `#FF5733`, `#7c3aed`).
2. The DSL shall support solid color fills with optional opacity.
3. The DSL shall support linear gradient fills with multiple color stops (hex + position) and angle, matching the reference plugin's `gradientPaint()` helper.
4. The DSL shall support stroke definitions with color, weight (`strokeWeight`), and optional per-side configuration.
5. When multiple fills are specified on a single node, the DSL shall produce a `fillPaints` array preserving the order.
6. The DSL shall support defining reusable color tokens (named color constants) to enable design system consistency, similar to the reference plugin's color constant object.

### Requirement 4: Typography System

**Objective:** As a component developer, I want to define text styles that match common design system patterns, so that text rendering is consistent between DSL output and React components.

#### Acceptance Criteria

1. The DSL shall support specifying font family, weight (400/Regular, 500/Medium, 600/Semi Bold, 700/Bold), and style for text nodes.
2. The DSL shall support specifying font size in pixels.
3. The DSL shall support specifying line height as a percentage (`unit: "PERCENT"`) or absolute value.
4. The DSL shall support specifying letter spacing as a percentage (`unit: "PERCENT"`) or absolute value.
5. The DSL shall support text alignment (left, center, right) and produce the corresponding `textAlignHorizontal` property.
6. When a text node is defined with these properties, the rendered output shall accurately reflect the specified typography.

### Requirement 5: Component and Variant System

**Objective:** As a component developer, I want to define reusable components with variants and properties, so that I can model design system components with the same fidelity as Figma's component system.

#### Acceptance Criteria

1. The DSL shall support defining COMPONENT nodes that behave like FRAME nodes but carry component semantics (name, properties), mirroring `figma.createComponent()`.
2. The DSL shall support defining component properties of types: TEXT (`addComponentProperty(name, 'TEXT', default)`), BOOLEAN (`'BOOLEAN'`), and INSTANCE_SWAP (`'INSTANCE_SWAP'` with reference component ID).
3. The DSL shall support defining variant sets by grouping multiple component variants under a COMPONENT_SET, with variant axes specified as key-value pairs (e.g., `Variant=Primary, Size=Large`), mirroring `figma.combineAsVariants()`.
4. The DSL shall support defining INSTANCE nodes that reference a component definition and can override property values, mirroring `component.createInstance()`.
5. When a component set is defined, the DSL shall produce correctly named variant components following Figma's `Key=Value, Key=Value` naming convention.

### Requirement 6: DSL Rendering

**Objective:** As a component developer, I want to render DSL definitions as images, so that I can visually verify component appearance without Figma.

#### Acceptance Criteria

1. The system shall render a DSL definition as a PNG image in a single step.
2. The rendered image shall visually reflect the node hierarchy, layout, colors, typography, and component structure defined in the DSL.
3. If a DSL definition references image assets, the system shall resolve asset paths and include them in the rendered output.
4. If a DSL definition contains errors, the system shall report them with the originating DSL location.

### Requirement 7: React Component Screenshot Capture

**Objective:** As a component developer, I want to capture screenshots of React components, so that I can compare them against DSL-rendered images.

#### Acceptance Criteria

1. The system shall capture a screenshot of a rendered React component as a PNG image using a headless browser.
2. The system shall support configuring the viewport size for screenshot capture.
3. The system shall support capturing individual components in isolation (not full pages).
4. When a screenshot is captured, the system shall produce an image with a transparent or white background matching the DSL render background.

### Requirement 8: Visual Comparison

**Objective:** As a component developer, I want to compare DSL-rendered images against React component screenshots, so that I can iterate on the DSL until it matches the React component.

#### Acceptance Criteria

1. The system shall compare two PNG images and produce a visual diff highlighting pixel differences.
2. The system shall report a similarity score (e.g., percentage of matching pixels) for each comparison.
3. When the similarity score is below a configurable threshold, the system shall report the comparison as failing.
4. The system shall produce a diff image showing areas of divergence between the two inputs.

### Requirement 9: Figma Plugin — DSL to Figma Components

**Objective:** As a component developer, I want a Figma plugin that reads DSL definitions and creates real Figma components, so that I can export my DSL-defined components to Figma when needed without manually recreating them.

#### Acceptance Criteria

1. The plugin shall parse DSL definitions and create corresponding Figma nodes using the Plugin API (`figma.createFrame()`, `figma.createText()`, `figma.createRectangle()`, `figma.createEllipse()`, `figma.createComponent()`).
2. The plugin shall apply auto layout properties from DSL definitions to created frames, matching the reference plugin's `setAutoLayout()` behavior (`layoutMode`, `itemSpacing`, padding, alignment, sizing).
3. The plugin shall apply fill and stroke styles from DSL definitions, converting color values to Figma's `SolidPaint` and `GradientPaint` formats.
4. The plugin shall create text nodes with correct font family, weight, size, line height, letter spacing, and alignment, loading fonts asynchronously via `figma.loadFontAsync()`.
5. When a DSL definition includes COMPONENT nodes, the plugin shall create Figma components with registered properties (`addComponentProperty()` for TEXT, BOOLEAN, INSTANCE_SWAP types).
6. When a DSL definition includes COMPONENT_SET with variants, the plugin shall create individual variant components and combine them using `figma.combineAsVariants()` with correct `Key=Value` naming.
7. When a DSL definition includes INSTANCE nodes, the plugin shall create instances from the corresponding component definitions and apply property overrides.
8. The plugin shall place created components on a dedicated page (e.g., "Component Library"), positioning them sequentially on the canvas.
9. The plugin shall output a JSON mapping of component names to Figma node IDs, enabling subsequent Code Connect configuration.
10. If a DSL definition contains invalid or unsupported constructs, the plugin shall report errors via `figma.notify()` and skip the invalid node without crashing.

### Requirement 10: CLI Interface

**Objective:** As a component developer, I want a command-line interface for all pipeline operations, so that I can integrate DSL workflows into my development process.

#### Acceptance Criteria

1. The CLI shall provide a command to compile DSL definitions into Figma node dictionaries (JSON output).
2. The CLI shall provide a command to render DSL definitions as PNG images.
3. The CLI shall provide a command to capture React component screenshots.
4. The CLI shall provide a command to compare two images and report similarity.
5. The CLI shall provide a command to run the full pipeline (compile → render → capture → compare) in a single invocation.
6. The CLI shall provide a command to generate Figma plugin input from DSL definitions for import into Figma.
7. If any pipeline step fails, the CLI shall report the error with context and exit with a non-zero status code.
