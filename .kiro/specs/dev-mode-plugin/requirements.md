# Requirements Document

## Introduction

This specification covers adding **Figma Dev Mode Codegen Plugin** capabilities to the existing `@figma-dsl/plugin` package. The plugin currently supports importing DSL-defined components into Figma and real-time sync via MCP/WebSocket. This feature extends the plugin to also operate as a **Codegen Plugin** in Figma's Dev Mode, generating code snippets (React component code, CSS Module styles, and DSL definitions) from selected Figma nodes. This enables developers inspecting components in Dev Mode to instantly see the corresponding source code and DSL representation, closing the loop between design and code.

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
2. When a node with Code Connect bindings is selected, the Codegen Plugin shall retrieve and display the linked Code Connect snippet.
3. When a node without DSL identity or Code Connect data is selected, the Codegen Plugin shall generate a structural React snippet inferred from the node's hierarchy, auto-layout properties, and text content.
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
