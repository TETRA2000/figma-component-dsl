# Requirements Document

## Introduction

This specification defines the interactive development workflows for Claude Desktop (Claude Code) users working with the figma-component-dsl project. The goal is to enable Claude Code users to interactively create landing pages, React components, Figma design data, and HTML pages — all with real-time visual previews via `.claude/launch.json` integration.

The feature leverages the existing reference component library (`references/figma_design_playground/src`) as both the source of reusable components and the template for component creation constraints. Users work entirely within Claude Desktop, using conversational AI to compose, preview, and iterate on designs without leaving the development environment.

### Key Capabilities

- **Landing Page Creation**: Compose full landing pages from registered React components with live preview
- **React Component Creation**: Build new React components with dual preview modes (React-rendered and DSL-rendered)
- **Figma Design Data Generation**: Produce real Figma design data from registered components via the existing DSL compiler and exporter
- **HTML Page Generation**: Generate static HTML pages from React component compositions

## Requirements

### Requirement 1: Claude Desktop Preview Infrastructure

**Objective:** As a Claude Code user, I want the project to provide `.claude/launch.json` configuration for preview servers, so that I can see visual previews of my work directly in Claude Desktop.

#### Acceptance Criteria

1. The figma-component-dsl project shall provide a `.claude/launch.json` file that defines preview server configurations for React-based and DSL-based rendering.
2. When a user opens the project in Claude Desktop, the system shall make preview launch configurations discoverable without additional setup.
3. The preview infrastructure shall support at least two preview modes: a React dev server preview and a DSL-rendered image preview.
4. When a preview server is launched via `.claude/launch.json`, the system shall serve content on a configurable local port accessible to Claude Desktop.
5. The preview infrastructure shall support hot-reload so that changes to components or pages are reflected in the preview without manual restart.

### Requirement 2: Interactive Landing Page Creation

**Objective:** As a Claude Code user, I want to create landing pages by composing registered React components through conversation, so that I can rapidly prototype complete pages with live visual feedback.

#### Acceptance Criteria

1. The system shall provide a component registry that exposes all available landing page components (Navbar, Hero, FeatureGrid, Stats, LogoCloud, Testimonials, PricingTable, CTABanner, FAQ, Footer) for composition.
2. When a user requests a landing page, the system shall generate a page component that imports and composes registered components with user-specified props.
3. The system shall render the generated landing page in a React dev server preview accessible via `.claude/launch.json`.
4. When a user modifies component props or page composition, the system shall update the preview to reflect changes in real time via hot-reload.
5. The system shall validate that all component prop values conform to the registered component interfaces (e.g., `ButtonProps`, `HeroProps`, `PricingPlan`).
6. The generated landing page shall follow the same structural patterns as the reference implementation (`references/figma_design_playground/src/pages/LandingPage.tsx`), including proper imports, type-safe prop passing, and component ordering.

### Requirement 3: Interactive React Component Creation

**Objective:** As a Claude Code user, I want to create new React components interactively with dual preview modes, so that I can verify both the React rendering and the DSL representation simultaneously.

#### Acceptance Criteria

1. When a user creates a new React component, the system shall generate the component following the 3-file pattern: `{ComponentName}.tsx`, `{ComponentName}.module.css`, and `{ComponentName}.figma.tsx`.
2. The system shall enforce the following constraints derived from the reference app:
   - Components shall use CSS Modules for styling (not inline styles or utility classes).
   - Components shall consume design tokens from a shared `tokens.css` file using CSS custom properties.
   - Component props interfaces shall extend standard HTML element attributes where applicable (e.g., `ButtonHTMLAttributes`).
   - Components shall support a `className` prop for external style composition using the filter+join pattern.
   - Component variant and size props shall use string literal union types (e.g., `'primary' | 'secondary'`).
3. The system shall provide a React-based preview mode that renders the new component in a live dev server via `.claude/launch.json`.
4. The system shall provide a DSL-based preview mode that compiles the component definition to DSL and renders it as a PNG image for visual comparison.
5. When a user modifies the component source, both the React preview and the DSL preview shall update to reflect the changes.
6. The system shall auto-register newly created components in the barrel export file (`index.ts`) and, where applicable, in the shared type definitions (`types.ts`).

### Requirement 4: Figma Design Data Generation

**Objective:** As a Claude Code user, I want to generate real Figma design data from registered components, so that I can create Figma designs programmatically without using the Figma UI.

#### Acceptance Criteria

1. The system shall compile registered React component definitions into DSL node structures using the existing `compileWithLayout` pipeline.
2. When a user requests Figma design data for a component or page, the system shall produce a JSON export compatible with the Figma plugin import format.
3. The system shall generate Code Connect bindings (`.figma.tsx` files) for each component, mapping React props to Figma component properties using `figma.enum`, `figma.string`, and `figma.boolean` mappers.
4. The generated Figma data shall preserve the design token values (colors, spacing, typography, shadows) defined in `tokens.css` as Figma styles or variables.
5. If a component references design tokens that cannot be mapped to Figma properties, the system shall emit a warning listing the unmapped tokens.
6. The system shall support batch export of multiple components into a single Figma-importable JSON file via the existing `batch` and `export` CLI commands.

### Requirement 5: HTML Page Generation

**Objective:** As a Claude Code user, I want to generate static HTML pages from React component compositions, so that I can produce deployable web pages directly from the development workflow.

#### Acceptance Criteria

1. When a user requests an HTML page, the system shall render the React component tree to static HTML using server-side rendering.
2. The generated HTML shall inline or bundle all CSS (from CSS Modules and design tokens) so the page is self-contained and renders correctly without a build server.
3. The generated HTML page shall preserve responsive behavior defined in the component CSS (media queries, container queries).
4. The system shall output the HTML file to a user-specified path or a default output directory.
5. If the component tree references external assets (images, fonts, icons), the system shall either inline them (for small assets) or emit them alongside the HTML file with correct relative paths.
6. The system shall provide a preview of the generated HTML page via `.claude/launch.json` before final export.

### Requirement 6: Component Registry and Discovery

**Objective:** As a Claude Code user, I want a unified registry of available components with their interfaces, so that I can discover and use components without reading source code.

#### Acceptance Criteria

1. The system shall maintain a component registry that catalogs all available React components with their prop interfaces, supported variants, and usage examples.
2. When a user queries for available components, the system shall return a structured list including component name, description, prop types, and default values.
3. The registry shall automatically update when new components are created or existing components are modified.
4. The system shall provide type-safe component instantiation, rejecting invalid prop combinations at generation time rather than at runtime.
5. Where a component has a corresponding `.figma.tsx` Code Connect binding, the registry shall include the Figma property mappings alongside the React prop interface.

### Requirement 7: Design Token Consistency

**Objective:** As a Claude Code user, I want all generated outputs (React, DSL, Figma, HTML) to use a consistent set of design tokens, so that visual fidelity is maintained across all output formats.

#### Acceptance Criteria

1. The system shall use a single `tokens.css` file as the source of truth for all design tokens (colors, spacing, typography, shadows, borders, animations).
2. When generating DSL output, the system shall resolve CSS custom property references to their computed values from `tokens.css`.
3. When generating Figma export data, the system shall map design tokens to Figma styles or variables where a direct mapping exists.
4. When generating HTML output, the system shall include the full `tokens.css` definitions so that CSS custom properties resolve correctly in the static page.
5. If a user defines a custom design token, the system shall propagate it to all output formats (React preview, DSL render, Figma export, HTML export).

