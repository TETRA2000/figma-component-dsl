# Requirements Document

## Introduction

This specification defines requirements for **Figma Component DSL** — a domain-specific language that bridges React components and Figma's internal data structure, enabling a Figma-free iteration loop for component development.

**Key design principle:** The DSL language IS Figma Plugin API code. Rather than inventing a new syntax that must be translated, the DSL uses TypeScript functions that mirror Figma's Plugin API patterns (`figma.createFrame()`, `figma.createText()`, `setAutoLayout()`, `solidPaint()`, etc.). This means DSL definitions can run directly inside a Figma plugin with minimal adaptation, and developers already familiar with the Figma Plugin API can write DSL code immediately.

Two existing reference implementations inform this design:

- **figma_design_playground** (`./references/figma_design_playground`) — A React 19 + TypeScript component library with 16 production components (Button, Badge, Hero, FeatureCard, PricingCard, etc.), a Figma plugin that programmatically creates matching Figma components using the Plugin API, and Code Connect bindings (`.figma.tsx` files) that map React props to Figma properties. The plugin's helper functions (`setAutoLayout()`, `solidPaint()`, `gradientPaint()`, `hexToRGB()`) and component builder patterns form the basis of the DSL vocabulary.
- **figma-html-renderer** (`./references/figma-html-renderer`) — A Python CLI tool with a strict 5-stage pipeline (Parse → Build Tree → Classify → Render → Output) that converts Figma's `.fig` binary format into PNG images via PyCairo, using node dictionaries with `guid`, `type`, `transform`, `size`, `fillPaints`, `children`, and `parentIndex` fields.

**Target workflow:**
1. Create React components
2. Generate Figma DSL definitions from those components using AI skill (or write manually)
3. Render DSL as images (via figma-html-renderer's CanvasRenderer)
4. Render React components as images (via Playwright)
5. Compare the two — iterate on the DSL without Figma
6. When ready, run DSL code directly in Figma plugin to create real components

## Requirements

### Requirement 1: DSL as Figma Plugin API Code

**Objective:** As a component developer, I want to write DSL definitions using Figma Plugin API patterns, so that the same code can be used both for offline rendering and for direct execution inside a Figma plugin.

#### Acceptance Criteria

1. The DSL shall use TypeScript functions that mirror Figma Plugin API node creation methods (`createFrame()`, `createText()`, `createRectangle()`, `createEllipse()`, `createComponent()`, `createGroup()`).
2. The DSL shall use the same property names and value types as the Figma Plugin API (e.g., `layoutMode: 'HORIZONTAL'`, `primaryAxisAlignItems: 'CENTER'`, `fills: [solidPaint('#FF5733')]`).
3. The DSL shall include the reference plugin's helper functions as built-in utilities: `hexToRGB()`, `solidPaint()`, `gradientPaint()`, `setAutoLayout()`, and `createText()` (async font-loading wrapper).
4. When DSL code is executed in a Figma plugin environment, the DSL shall produce valid Figma nodes without requiring a translation layer.
5. When DSL code is executed outside Figma, the DSL shall produce an intermediate node tree (JSON-compatible dictionaries) with auto-generated GUIDs for offline rendering.
6. The DSL shall support defining FRAME nodes with properties for size, position, fills, strokes, corner radius (uniform or per-corner via `cornerRadii`), clip content, and opacity.
7. The DSL shall support defining TEXT nodes with properties for characters, font family, font weight, font size, line height, letter spacing, text alignment, and text color.
8. The DSL shall support defining RECTANGLE nodes with properties for size, fills, strokes, corner radius, and opacity.
9. The DSL shall support defining ELLIPSE nodes with properties for size, fills, and opacity.
10. The DSL shall support defining GROUP nodes that logically group child nodes without rendering a background.
11. When a node definition includes children via `appendChild()`, the DSL shall produce a hierarchical tree structure with correct parent-child relationships.
12. The DSL shall support setting a node's `visible` property to false to hide it from rendering while preserving it in the tree.

### Requirement 2: Auto Layout System

**Objective:** As a component developer, I want to define flex-like layout behavior using Figma's Auto Layout properties, so that component layouts match Figma's Auto Layout semantics using the same `setAutoLayout()` helper from the reference plugin.

#### Acceptance Criteria

1. The DSL shall provide a `setAutoLayout()` helper that accepts direction, spacing, padding, alignment, and sizing options, mapping to Figma's `layoutMode`, `itemSpacing`, `paddingTop/Right/Bottom/Left`, `primaryAxisAlignItems`, `counterAxisAlignItems`, `layoutSizingHorizontal`, and `layoutSizingVertical` properties.
2. The DSL shall support specifying layout direction as `'HORIZONTAL'` or `'VERTICAL'` on FRAME nodes.
3. The DSL shall support specifying item spacing (gap) between children in a layout container.
4. The DSL shall support specifying padding as uniform, axis-based (`padX`/`padY`), or per-side (`padTop`, `padRight`, `padBottom`, `padLeft`).
5. The DSL shall support specifying primary axis alignment (`'MIN'`, `'CENTER'`, `'MAX'`, `'SPACE_BETWEEN'`) and counter axis alignment (`'MIN'`, `'CENTER'`, `'MAX'`).
6. The DSL shall support specifying sizing behavior for children as `'FIXED'`, `'HUG'`, or `'FILL'`.
7. The DSL shall support flex-grow behavior on child nodes for spacer elements.

### Requirement 3: Color and Fill System

**Objective:** As a component developer, I want to specify colors and fills using the same helper functions as the reference Figma plugin, so that I can style components with familiar `solidPaint()` and `gradientPaint()` calls.

#### Acceptance Criteria

1. The DSL shall provide a `solidPaint(hex, opacity?)` helper that accepts hex color strings (e.g., `'#FF5733'`, `'#7c3aed'`) and returns a `SolidPaint` object compatible with Figma's paint format.
2. The DSL shall provide a `gradientPaint(stops, angle?)` helper that accepts an array of color stops (`{ color: hex, position: number }`) and an angle in degrees, returning a `GradientPaint` object with the correct gradient transform matrix.
3. The DSL shall provide a `hexToRGB(hex)` helper that converts hex color strings to Figma's `{ r, g, b }` format (0.0–1.0 range).
4. The DSL shall support stroke definitions with color, `strokeWeight`, and optional per-side configuration.
5. When multiple fills are assigned to a node's `fills` array, the DSL shall preserve the order.
6. The DSL shall support defining reusable color token objects (named color constants) to enable design system consistency, matching the reference plugin's color constant pattern.

### Requirement 4: Typography System

**Objective:** As a component developer, I want to define text styles using Figma's text property model, so that text rendering is consistent between DSL output and React components.

#### Acceptance Criteria

1. The DSL shall support specifying `fontFamily`, `fontWeight` (400/Regular, 500/Medium, 600/Semi Bold, 700/Bold), and font style for text nodes.
2. The DSL shall support specifying `fontSize` in pixels.
3. The DSL shall support specifying `lineHeight` as `{ value: number, unit: 'PERCENT' }` or `{ value: number, unit: 'PIXELS' }`.
4. The DSL shall support specifying `letterSpacing` as `{ value: number, unit: 'PERCENT' }` or `{ value: number, unit: 'PIXELS' }`.
5. The DSL shall support `textAlignHorizontal` (`'LEFT'`, `'CENTER'`, `'RIGHT'`) for text alignment.
6. When a text node is defined with these properties, the rendered output shall accurately reflect the specified typography.

### Requirement 5: Component and Variant System

**Objective:** As a component developer, I want to define reusable components with variants and properties using Figma's component API patterns, so that I can model design system components with the same fidelity as Figma's component system.

#### Acceptance Criteria

1. The DSL shall support defining COMPONENT nodes via `createComponent()` that behave like FRAME nodes but carry component semantics (name, properties).
2. The DSL shall support defining component properties via `addComponentProperty(name, type, defaultValue)` for types: `'TEXT'`, `'BOOLEAN'`, and `'INSTANCE_SWAP'`.
3. The DSL shall support defining variant sets by grouping multiple component variants under a COMPONENT_SET via `combineAsVariants(components[], parent)`, with variant axes specified as key-value pairs (e.g., `Button=primary, size=sm`).
4. The DSL shall support defining INSTANCE nodes via `component.createInstance()` that reference a component definition and can override property values.
5. When a component set is defined, the DSL shall produce correctly named variant components following Figma's `Key=Value, Key=Value` naming convention.

### Requirement 6: DSL Rendering

**Objective:** As a component developer, I want to render DSL definitions as images, so that I can visually verify component appearance without Figma.

#### Acceptance Criteria

1. The system shall render a DSL node tree as a PNG image in a single step.
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

### Requirement 9: Figma Plugin — Direct DSL Execution

**Objective:** As a component developer, I want to run my DSL definitions directly inside a Figma plugin, so that I can create real Figma components from the same code I used for offline iteration — with no translation step.

#### Acceptance Criteria

1. The plugin shall execute DSL TypeScript code in the Figma plugin environment, where DSL helper functions (`createFrame()`, `solidPaint()`, `setAutoLayout()`, etc.) delegate to the real Figma Plugin API (`figma.createFrame()`, etc.).
2. The plugin shall load fonts asynchronously via `figma.loadFontAsync()` before setting text properties, matching the reference plugin's async text creation pattern.
3. When DSL code defines COMPONENT nodes with properties, the plugin shall register them via `addComponentProperty()` for TEXT, BOOLEAN, and INSTANCE_SWAP types.
4. When DSL code defines COMPONENT_SET with variants, the plugin shall combine them using `figma.combineAsVariants()` with correct `Key=Value` naming.
5. When DSL code defines INSTANCE nodes, the plugin shall create instances from the corresponding component definitions and apply property overrides.
6. The plugin shall place created components on a dedicated page (e.g., "Component Library"), positioning them sequentially on the canvas.
7. The plugin shall output a JSON mapping of component names to Figma node IDs, enabling subsequent Code Connect configuration.
8. If DSL code produces runtime errors, the plugin shall report them via `figma.notify()` and skip the failed node without crashing.

### Requirement 10: CLI Interface

**Objective:** As a component developer, I want a command-line interface for all pipeline operations, so that I can integrate DSL workflows into my development process.

#### Acceptance Criteria

1. The CLI shall provide a command to compile DSL definitions into Figma node dictionaries (JSON output).
2. The CLI shall provide a command to render DSL definitions as PNG images.
3. The CLI shall provide a command to capture React component screenshots.
4. The CLI shall provide a command to compare two images and report similarity.
5. The CLI shall provide a command to run the full pipeline (compile → render → capture → compare) in a single invocation.
6. The CLI shall provide a command to bundle DSL definitions for direct execution in the Figma plugin.
7. If any pipeline step fails, the CLI shall report the error with context and exit with a non-zero status code.

### Requirement 11: AI-Powered React-to-DSL Generation

**Objective:** As a component developer, I want an AI skill that analyzes React component source code and generates corresponding Figma DSL definitions, so that I can bootstrap DSL code from existing React components without writing it manually.

#### Acceptance Criteria

1. The AI skill shall accept a React component file (`.tsx`) as input and produce a DSL definition file as output.
2. The AI skill shall analyze the component's JSX structure, CSS styles (CSS Modules, inline styles, or design tokens), and prop interfaces to infer the corresponding Figma node hierarchy.
3. The AI skill shall map React layout patterns (flexbox, grid, padding, gap) to Figma Auto Layout properties (`layoutMode`, `itemSpacing`, padding, alignment, sizing).
4. The AI skill shall map CSS color values (hex, rgb, CSS custom properties / design tokens) to DSL `solidPaint()` and `gradientPaint()` calls.
5. The AI skill shall map typography CSS properties (font-family, font-size, font-weight, line-height, letter-spacing) to DSL text node properties.
6. When a React component defines variants via props (e.g., `variant: 'primary' | 'secondary'`, `size: 'sm' | 'lg'`), the AI skill shall generate a COMPONENT_SET with corresponding variant components using `combineAsVariants()`.
7. When a React component uses boolean props (e.g., `disabled`, `loading`), the AI skill shall generate BOOLEAN component properties via `addComponentProperty()`.
8. The AI skill shall generate Code Connect binding suggestions (`.figma.tsx` stubs) that map the generated DSL component properties back to the React component's props using `figma.enum()`, `figma.string()`, `figma.boolean()`, and `figma.instance()` helpers.
9. The AI skill shall be invocable as a Claude Code slash command (e.g., `/react-to-dsl <ComponentPath>`) for seamless integration into the development workflow.
10. If the AI skill cannot confidently infer a Figma property from the React source, it shall emit a `// TODO:` comment in the generated DSL code indicating what needs manual review.
