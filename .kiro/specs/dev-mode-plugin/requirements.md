# Requirements Document

## Introduction

This specification covers adding **Figma Dev Mode Codegen Plugin** capabilities to the existing `@figma-dsl/plugin` package. The plugin currently supports importing DSL-defined components into Figma and real-time sync via MCP/WebSocket. This feature extends the plugin to also operate as a **Codegen Plugin** in Figma's Dev Mode, generating code snippets (React component code, CSS Module styles, and DSL definitions) from selected Figma nodes. This enables developers inspecting components in Dev Mode to instantly see the corresponding source code and DSL representation, closing the loop between design and code.

**Phase 2 — DslCanvas Support**: The codegen plugin is extended to handle components containing `DslCanvas` regions. When a component includes DslCanvas sections (detected via `dsl-canvas` plugin data), the Dev Mode output includes an **HTML/CSS preview** with DslCanvas regions embedded as PNG images captured by the Figma Plugin API. This bridges the gap between Figma's visual representation and the React `<DslCanvas>` component that renders compiled DSL JSON client-side.

## Requirements

### Requirement 1: Codegen Plugin Manifest Configuration

**Objective:** As a plugin developer, I want the Figma plugin manifest to declare codegen capabilities and supported languages, so that the plugin appears in Figma's Dev Mode code snippet panel.

#### Acceptance Criteria
1. The plugin manifest shall include `"dev"` in the `editorType` array alongside `"figma"`.
2. The plugin manifest shall include `"codegen"` in a `capabilities` array.
3. The plugin manifest shall declare a `codegenLanguages` array with entries for at least: `"React"`, `"CSS"`, and `"DSL"`.
4. When a developer opens Dev Mode and selects a node, the plugin's languages shall appear in the code language dropdown.

### Requirement 2: React Code Generation

**Objective:** As a developer using Dev Mode, I want to see generated React component code for the selected Figma node, so that I can quickly reference or copy the corresponding implementation.

#### Acceptance Criteria
1. When a node with DSL identity plugin data is selected, the Codegen Plugin shall generate a React TSX code snippet based on the stored component metadata (component name, props, variant properties).
2. When a node with stored source snapshots (`dsl-sources` plugin data) is selected, the Codegen Plugin shall return the original stored React TSX source code verbatim.
3. When a node without DSL identity or stored source data is selected, the Codegen Plugin shall generate a structural React snippet inferred from the node's hierarchy, auto-layout properties, and text content.
4. The Codegen Plugin shall return `CodegenResult` objects with `language` set to `"TYPESCRIPT"` and descriptive `title` values.

### Requirement 3: CSS Module Code Generation

**Objective:** As a developer using Dev Mode, I want to see generated CSS Module styles for the selected node, so that I can reference the styling rules that correspond to the design.

#### Acceptance Criteria
1. When a node is selected, the Codegen Plugin shall generate a CSS Module snippet extracting the node's visual properties (colors, spacing, typography, border radius, shadows).
2. When design token values are recognized (matching known token patterns from `tokens.css`), the Codegen Plugin shall output CSS custom property references (e.g., `var(--color-primary)`) instead of raw values.
3. When an auto-layout frame is selected, the Codegen Plugin shall generate flexbox CSS properties reflecting the layout direction, gap, padding, and alignment.
4. The Codegen Plugin shall return `CodegenResult` objects with `language` set to `"CSS"` and descriptive `title` values.

### Requirement 4: DSL Definition Code Generation

**Objective:** As a developer using Dev Mode, I want to see the DSL representation of the selected Figma node, so that I can use or adapt the DSL definition in my codebase.

#### Acceptance Criteria
1. When a node is selected, the Codegen Plugin shall serialize the node tree into a DSL definition using the existing `serializeNode` function from the plugin's serializer module.
2. The Codegen Plugin shall format the DSL output as valid TypeScript code using the DSL builder API syntax (e.g., `frame(...)`, `text(...)`, `rect(...)`).
3. When a node has stored DSL baseline data (via `dsl-baseline` plugin data), the Codegen Plugin shall use the baseline as the source of truth for the DSL output.
4. The Codegen Plugin shall return `CodegenResult` objects with `language` set to `"TYPESCRIPT"` and `title` indicating "DSL Definition".

### Requirement 5: Codegen Preferences

**Objective:** As a developer, I want to configure codegen output preferences (e.g., unit system, naming convention), so that generated code matches my project's conventions.

#### Acceptance Criteria
1. The Codegen Plugin shall support a `"unit"` preference allowing developers to choose between `px` and `rem` for dimension values in generated CSS.
2. When `rem` is selected, the Codegen Plugin shall apply a configurable scale factor (default: 16) to convert pixel values.
3. The Codegen Plugin shall support a `"naming"` select preference allowing choice between `camelCase` and `kebab-case` for CSS class names.
4. When codegen preferences change, the Codegen Plugin shall regenerate code snippets reflecting the updated preferences.

### Requirement 6: Multi-Section Code Output

**Objective:** As a developer, I want code generation results organized into clear sections, so that I can quickly find the specific piece of code I need.

#### Acceptance Criteria
1. When a component with variants is selected, the Codegen Plugin shall generate separate code sections for the component definition and each variant's props interface.
2. When generating React code, the Codegen Plugin shall provide separate sections for imports, component body, and props type definition.
3. The Codegen Plugin shall return multiple `CodegenResult` entries per language when the selected node warrants multi-section output.

### Requirement 7: Performance and Constraints

**Objective:** As a developer, I want code generation to complete quickly and reliably, so that my Dev Mode workflow is not disrupted.

#### Acceptance Criteria
1. The Codegen Plugin shall complete the `generate` callback within the 3-second timeout imposed by the Figma Codegen API.
2. While processing nodes with deep hierarchies (more than 50 descendants), the Codegen Plugin shall limit traversal depth and indicate truncation in the output.
3. If the `generate` callback encounters an error, the Codegen Plugin shall return a `CodegenResult` with an error message in the code field rather than throwing an exception.
4. The Codegen Plugin shall not call `figma.showUI()` inside the `generate` callback.

### Requirement 8: DslCanvas Detection in Dev Mode Codegen

**Objective:** As a developer inspecting a component in Dev Mode, I want the codegen plugin to detect DslCanvas regions within the selected component, so that the generated code accurately represents the component's structure including its dynamic canvas sections.

#### Acceptance Criteria
1. When a component node containing children with `dsl-canvas` plugin data is selected, the Codegen Plugin shall detect all DslCanvas regions using the existing `detectCanvasRegions` function.
2. When a child node marked as DslCanvas is directly selected, the Codegen Plugin shall identify it as a DslCanvas region and generate canvas-specific output instead of generic structural code.
3. When a component contains no DslCanvas regions, the Codegen Plugin shall fall back to the standard codegen pipeline (Requirements 2–4) without modification.

### Requirement 9: HTML/CSS Preview with Embedded Canvas Images

**Objective:** As a developer using Dev Mode, I want to see an HTML/CSS preview of the selected component where DslCanvas sections are rendered as embedded PNG images, so that I can visualize the complete component layout including its dynamic canvas areas.

#### Acceptance Criteria
1. The plugin manifest shall declare an `"HTML"` entry in the `codegenLanguages` array for HTML/CSS preview output.
2. When a component containing DslCanvas regions is selected and the HTML language is chosen, the Codegen Plugin shall generate a self-contained HTML snippet with inline CSS representing the component's layout.
3. When generating HTML output, the Codegen Plugin shall capture each DslCanvas region as a PNG image using the Figma Plugin API `exportAsync` method and embed the resulting image as a base64 data URI within an `<img>` tag.
4. The Codegen Plugin shall generate CSS for the HTML preview that reflects the component's auto-layout properties (flexbox direction, gap, padding, alignment) and visual properties (background, borders, corner radius).
5. When a component contains no DslCanvas regions, the Codegen Plugin shall still generate a valid HTML/CSS preview based on the component's structural properties.

### Requirement 10: DslCanvas React Integration Code

**Objective:** As a developer using Dev Mode, I want the React codegen to produce correct `<DslCanvas>` usage code for canvas regions, so that I can integrate the DslCanvas component into my React code with the right props.

#### Acceptance Criteria
1. When a component containing DslCanvas regions is selected and the React language is chosen, the Codegen Plugin shall generate `<DslCanvas>` JSX elements for each detected canvas region instead of generic `<div>` elements.
2. The generated React code shall include the correct `import` statement for the `DslCanvas` component (e.g., `import { DslCanvas } from './DslCanvas/DslCanvas'`).
3. When the DslCanvas region has associated `dsl-canvas` plugin data with a `canvasName`, the Codegen Plugin shall include a `dsl` prop placeholder referencing the compiled DSL JSON for that canvas name.
4. The generated `<DslCanvas>` element shall include `width` and `alt` props derived from the Figma node's dimensions and name.

### Requirement 11: Canvas Image Capture Performance

**Objective:** As a developer, I want canvas image capture during codegen to be fast enough that the Dev Mode experience remains responsive, even for components with multiple DslCanvas regions.

#### Acceptance Criteria
1. While capturing canvas images for HTML preview, the Codegen Plugin shall use a scale factor of 1 (not 2) to minimize capture time within the 3-second codegen timeout.
2. When a component contains more than 3 DslCanvas regions, the Codegen Plugin shall capture only the first 3 regions and append a comment indicating that additional regions were omitted.
3. If a canvas image capture fails (e.g., node inaccessible), the Codegen Plugin shall substitute a placeholder element in the HTML output and continue processing remaining regions.
4. The Codegen Plugin shall not invoke `figma.showUI()` or display progress notifications during canvas image capture within the codegen callback.
