# Requirements Document

## Introduction

This specification defines a set of Claude AI Skills (`.claude/skills/`) that enable Claude Desktop (Claude Code) users to interactively create landing pages, React components, Figma design data, and HTML pages within the figma-component-dsl project. Each workflow is packaged as a discoverable AI Skill with a `SKILL.md` entrypoint, supporting files (templates, references, scripts), and `.claude/launch.json` integration for live visual previews.

The skills leverage the existing reference component library (`references/figma_design_playground/src`) as both the source of reusable components and the template for component creation constraints. Users work entirely within Claude Desktop, with Claude automatically discovering and invoking the appropriate skill based on conversational context.

### Key Capabilities

- **Landing Page Skill**: Compose full landing pages from registered React components with live preview via `.claude/launch.json`
- **React Component Skill**: Build new React components with dual preview modes (React-rendered and DSL-rendered) enforcing reference app constraints
- **Figma Export Skill**: Produce real Figma design data from registered components via the existing DSL compiler and exporter
- **HTML Export Skill**: Generate static HTML pages from React component compositions with preview

## Requirements

### Requirement 1: Skill Infrastructure and Discovery

**Objective:** As a Claude Code user, I want the project to provide AI Skills under `.claude/skills/` with proper `SKILL.md` frontmatter and `.claude/launch.json` preview configurations, so that Claude automatically discovers and invokes the right workflow based on my request.

#### Acceptance Criteria

1. The project shall provide AI Skills as directories under `.claude/skills/`, each containing a `SKILL.md` file with YAML frontmatter (`name`, `description`, `allowed-tools`) and markdown instructions.
2. Each skill's `description` field shall contain trigger phrases so that Claude can auto-invoke the skill when the user's request matches (e.g., "create a landing page", "new React component", "export to Figma", "generate HTML").
3. The project shall provide a `.claude/launch.json` file that defines at least two preview server configurations: a React Vite dev server and a static file server for DSL-rendered PNG previews.
4. When a preview server is launched via `.claude/launch.json`, the skill shall serve content on a local port accessible to Claude Desktop's Preview panel.
5. Each skill shall include supporting files (templates, reference docs, example outputs) organized under `references/`, `scripts/`, or `assets/` subdirectories within the skill folder.

### Requirement 2: Landing Page Creation Skill

**Objective:** As a Claude Code user, I want a skill that guides Claude to create landing pages by composing registered React components, so that I can rapidly prototype complete pages with live visual feedback in the Preview panel.

#### Acceptance Criteria

1. The landing page skill shall instruct Claude to expose all available landing page components (Navbar, Hero, FeatureGrid, Stats, LogoCloud, Testimonials, PricingTable, CTABanner, FAQ, Footer) with their prop interfaces for composition.
2. When a user requests a landing page, the skill shall guide Claude to generate a page component that imports and composes registered components with user-specified props.
3. The skill shall instruct Claude to launch the React dev server preview via `.claude/launch.json` so the user can see the generated page in the Preview panel.
4. When a user modifies component props or page composition, the skill shall guide Claude to update the source files so that hot-reload reflects changes in the Preview panel without manual restart.
5. The skill shall instruct Claude to validate that all component prop values conform to the registered component interfaces (e.g., `ButtonProps`, `HeroProps`, `PricingPlan`).
6. The skill shall include a reference document listing all available components, their prop interfaces, and usage examples derived from the reference implementation (`references/figma_design_playground/src`).
7. The generated landing page shall follow the same structural patterns as the reference implementation (`references/figma_design_playground/src/pages/LandingPage.tsx`), including proper imports, type-safe prop passing, and component ordering.

### Requirement 3: React Component Creation Skill

**Objective:** As a Claude Code user, I want a skill that guides Claude to create new React components interactively with dual preview modes, so that I can verify both the React rendering and the DSL representation simultaneously.

#### Acceptance Criteria

1. When a user creates a new React component, the skill shall instruct Claude to generate the component following the 3-file pattern: `{ComponentName}.tsx`, `{ComponentName}.module.css`, and `{ComponentName}.figma.tsx`.
2. The skill shall enforce the following constraints derived from the reference app:
   - Components shall use CSS Modules for styling (not inline styles or utility classes).
   - Components shall consume design tokens from a shared `tokens.css` file using CSS custom properties.
   - Component props interfaces shall extend standard HTML element attributes where applicable (e.g., `ButtonHTMLAttributes`).
   - Components shall support a `className` prop for external style composition using the filter+join pattern.
   - Component variant and size props shall use string literal union types (e.g., `'primary' | 'secondary'`).
3. The skill shall include template files for each of the 3 files (`.tsx`, `.module.css`, `.figma.tsx`) that Claude uses as scaffolding when generating a new component.
4. The skill shall instruct Claude to provide a React-based preview mode by launching the dev server via `.claude/launch.json` and rendering the new component.
5. The skill shall instruct Claude to provide a DSL-based preview mode by compiling the component definition to DSL using the `figma-dsl compile` command and rendering it as a PNG image via `figma-dsl render`.
6. When a user modifies the component source, the skill shall guide Claude to update both preview outputs so the user can compare React and DSL renderings.
7. The skill shall instruct Claude to auto-register newly created components in the barrel export file (`index.ts`) and, where applicable, in the shared type definitions (`types.ts`).

### Requirement 4: Figma Design Data Export Skill

**Objective:** As a Claude Code user, I want a skill that guides Claude to generate real Figma design data from registered components, so that I can create Figma designs programmatically without using the Figma UI.

#### Acceptance Criteria

1. The skill shall instruct Claude to compile React component definitions into DSL node structures using the existing `figma-dsl compile` command.
2. When a user requests Figma design data for a component or page, the skill shall guide Claude to produce a JSON export compatible with the Figma plugin import format using the `figma-dsl export` command.
3. The skill shall instruct Claude to generate Code Connect bindings (`.figma.tsx` files) for each component, mapping React props to Figma component properties using `figma.enum`, `figma.string`, and `figma.boolean` mappers.
4. The skill shall include a reference document describing the Figma export JSON schema and Code Connect binding patterns.
5. The generated Figma data shall preserve the design token values (colors, spacing, typography, shadows) defined in `tokens.css` as Figma styles or variables.
6. If a component references design tokens that cannot be mapped to Figma properties, the skill shall instruct Claude to emit a warning listing the unmapped tokens.
7. The skill shall support batch export of multiple components into a single Figma-importable JSON file via the existing `figma-dsl batch` and `figma-dsl export` CLI commands.

### Requirement 8: Multi-Approach Figma Design Creation

**Objective:** As a Claude Code user, I want to choose between multiple approaches for creating Figma designs from my React components, so that I can select the method that best balances speed, visual fidelity, and my available tooling.

#### Acceptance Criteria

1. The Figma Export Skill shall present the user with three distinct approaches for creating Figma designs and guide them to select the most appropriate one:
   - **Approach A — MCP Auto-Publish**: Publish designs directly to Figma via the Figma MCP server's `generate_figma_design` tool, with automatic Code Connect mapping via `add_code_connect_map`.
   - **Approach B — Plugin JSON Import**: Compile components to DSL, export to Figma plugin-compatible JSON via `figma-dsl export`, and import into Figma using the existing Figma plugin (`packages/plugin`).
   - **Approach C — Visual Fidelity Pipeline**: Run the full `figma-dsl pipeline` command (compile → render DSL PNG → capture React screenshot → pixel-diff compare) to verify visual fidelity before Figma import, then import via plugin or MCP.
2. When a user selects Approach C (Visual Fidelity Pipeline), the skill shall instruct Claude to run `figma-dsl pipeline <file.dsl.ts> -u <react-url>` and report the similarity percentage and pass/fail result.
3. If the pipeline comparison reports a similarity below the configured threshold (default 95%), the skill shall instruct Claude to iterate on the DSL definition — adjusting layout, spacing, colors, or typography — and re-run the pipeline until the similarity meets or exceeds the threshold.
4. The skill shall instruct Claude to generate a diff image (via `figma-dsl compare -d diff.png`) highlighting visual mismatches to aid in diagnosing fidelity issues.
5. After Approach B or C, the skill shall instruct Claude to use `figma-dsl capture-figma` to capture screenshots of the imported Figma components and run `figma-dsl batch-compare` against the DSL renders to produce a visual fidelity report.
6. The skill shall document the trade-offs of each approach in its reference materials:
   - **Approach A**: Fastest, no visual fidelity verification, requires MCP server configuration.
   - **Approach B**: Medium speed, relies on DSL-to-Figma translation accuracy, works offline.
   - **Approach C**: Slowest, highest visual fidelity confidence, requires running dev server for React captures.
7. When batch-exporting multiple components, the skill shall support running Approach C (Visual Fidelity Pipeline) across all components via `figma-dsl batch` combined with `figma-dsl batch-compare`.

### Requirement 5: HTML Page Generation Skill

**Objective:** As a Claude Code user, I want a skill that guides Claude to generate static HTML pages from React component compositions, so that I can produce deployable web pages directly from the development workflow.

#### Acceptance Criteria

1. When a user requests an HTML page, the skill shall instruct Claude to render the React component tree to static HTML using server-side rendering.
2. The generated HTML shall inline or bundle all CSS (from CSS Modules and design tokens) so the page is self-contained and renders correctly without a build server.
3. The generated HTML page shall preserve responsive behavior defined in the component CSS (media queries, container queries).
4. The skill shall instruct Claude to output the HTML file to a user-specified path or a default output directory.
5. If the component tree references external assets (images, fonts, icons), the skill shall instruct Claude to either inline them (for small assets) or emit them alongside the HTML file with correct relative paths.
6. The skill shall instruct Claude to provide a preview of the generated HTML page via `.claude/launch.json` before final export.

### Requirement 6: Component Registry Reference

**Objective:** As a Claude Code user, I want each skill to have access to a shared component registry reference, so that Claude can discover available components and their interfaces without reading source code on every invocation.

#### Acceptance Criteria

1. The project shall maintain a component registry reference file that catalogs all available React components with their prop interfaces, supported variants, default values, and usage examples.
2. Each skill that composes or creates components shall reference this shared registry document in its `SKILL.md` instructions.
3. When a user queries for available components, the skill shall instruct Claude to consult the registry reference and return a structured list including component name, description, and prop types.
4. Where a component has a corresponding `.figma.tsx` Code Connect binding, the registry shall include the Figma property mappings alongside the React prop interface.
5. The registry reference shall be updated whenever new components are created via the React Component Creation Skill.

### Requirement 7: Design Token Consistency

**Objective:** As a Claude Code user, I want all skills to use a consistent set of design tokens across all output formats (React, DSL, Figma, HTML), so that visual fidelity is maintained regardless of which skill generated the output.

#### Acceptance Criteria

1. All skills shall use the `tokens.css` file as the single source of truth for design tokens (colors, spacing, typography, shadows, borders, animations).
2. When a skill generates DSL output, it shall instruct Claude to resolve CSS custom property references to their computed values from `tokens.css`.
3. When a skill generates Figma export data, it shall instruct Claude to map design tokens to Figma styles or variables where a direct mapping exists.
4. When a skill generates HTML output, it shall instruct Claude to include the full `tokens.css` definitions so that CSS custom properties resolve correctly in the static page.
5. If a user defines a custom design token, the skill shall instruct Claude to propagate it to all relevant output formats.

