# Implementation Plan

- [ ] 1. Storybook project setup and configuration
- [ ] 1.1 Install Storybook and configure the framework for the existing preview app
  - Install Storybook 10.x with the React-Vite framework into the preview workspace
  - Create the `.storybook/main.ts` configuration with stories glob pattern covering `src/components/` and `src/pages/`
  - Preserve the existing Vite path alias (`@/` → `src/`) via `viteFinal` hook
  - Add `staticDirs` entry pointing to `./dsl-artifacts` for serving generated PNGs
  - Configure addon list (essentials, docs, viewport)
  - Verify Storybook starts and renders a blank canvas without errors
  - _Requirements: 1.1, 1.2, 1.4_

- [ ] 1.2 Configure global decorators, autodocs, and viewport presets
  - Create `.storybook/preview.ts` importing design tokens CSS for all stories
  - Enable `autodocs` tag globally so every story auto-generates a docs page
  - Configure viewport addon presets for desktop, tablet, and mobile breakpoints
  - Add sidebar sorting to enforce hierarchical organization (Components, Pages)
  - _Requirements: 1.4, 3.4_

- [ ] 2. Component-to-DSL file association utility
- [ ] 2.1 Build the naming convention resolver that maps component names to DSL file paths
  - Implement PascalCase-to-kebab-case conversion (e.g., `PricingCard` → `pricing-card`)
  - Glob the examples directory for matching `{kebab-name}.dsl.ts` or `{kebab-name}-*.dsl.ts` patterns
  - Support manual override mappings passed via configuration object
  - Return `null` when no DSL file matches a given component name
  - _Requirements: 7.1, 7.2_
  - _Contracts: DslAssociationMap Service_

- [ ] 2.2 (P) Unit tests for the association resolver
  - Test PascalCase-to-kebab conversion with edge cases (single word, multi-word, acronyms)
  - Test glob matching against a mock file system
  - Test that manual overrides take precedence over naming convention
  - Test that unmatched components return null
  - _Requirements: 7.1, 7.2_

- [ ] 3. DSL artifact generation pipeline
- [ ] 3.1 Build the artifact generator script that pre-compiles DSL files into browsable assets
  - Scan the examples directory for all `.dsl.ts` files using the association resolver
  - For each DSL file: read source text, compile via the compiler pipeline, render to PNG via the renderer pipeline
  - Write artifacts to the Storybook artifacts directory (source text, compiled JSON, rendered PNG per component)
  - Generate a manifest JSON file mapping component names to their artifact paths
  - Record compilation or rendering errors in the manifest without halting the entire build
  - Output a summary to the console (total processed, successes, failures)
  - _Requirements: 4.1, 5.1, 5.2, 6.1, 6.2, 7.1, 7.3_
  - _Contracts: ArtifactGenerator Service_

- [ ] 3.2 Wire artifact generation into npm scripts with monorepo build coordination
  - Add a `prestorybook` script that first builds all monorepo packages, then runs the artifact generator
  - Add a matching `prebuild-storybook` script for static builds
  - Add the artifacts output directory to `.gitignore`
  - Verify the full script chain works: build packages → generate artifacts → start Storybook
  - _Requirements: 5.2, 6.2, 7.3_

- [ ] 3.3 (P) Integration tests for the artifact generation pipeline
  - Test end-to-end generation using real DSL example files through the compiler and renderer
  - Validate the manifest schema matches the expected structure
  - Verify error recording when a DSL file has intentional compilation errors
  - Confirm artifact files exist on disk after generation
  - _Requirements: 4.1, 5.1, 5.2, 6.1, 6.2_

- [ ] 4. DSL parameter helper and AllVariants template utility
- [ ] 4.1 Create the story helper that loads DSL artifacts from the manifest into story parameters
  - Implement the manifest-reading helper that statically imports the generated manifest JSON
  - Add a type declaration file so TypeScript resolves the JSON module import
  - Resolve DSL data for a given component name and return a typed parameter object (source, JSON, PNG URL, error)
  - Return null fields when no DSL file exists for a component
  - _Requirements: 4.1, 4.3, 5.1, 6.1_

- [ ] 4.2 (P) Build the AllVariants grid template for rendering all variant combinations
  - Create a React component that accepts a component reference and variant axis definitions
  - Render a single-row layout when one axis is provided, and a grid layout for two axes
  - Label each cell with the variant values, defaulting to string conversion
  - Apply shared base props to every cell alongside axis-specific prop values
  - _Requirements: 2.3_
  - _Contracts: AllVariantsTemplate State_

- [ ] 5. Component story files
- [ ] 5.1 Author story files for all React components with variants and controls
  - Create a CSF 3 story file for each component in the preview app
  - Set `title: 'Components/{ComponentName}'` for hierarchical sidebar grouping
  - Define named story exports for each meaningful visual variant (e.g., Primary, Secondary, Disabled, Sizes)
  - Configure `args` and `argTypes` to enable interactive controls for variant props
  - Inject DSL parameters using the manifest helper for components that have DSL files
  - Include an `AllVariants` story export using the grid template utility
  - _Requirements: 1.2, 1.3, 2.1, 2.2, 2.3_

- [ ]* 5.2 (P) Smoke tests for component stories
  - Verify each story file exports valid CSF meta and at least one story
  - Confirm that the AllVariants story renders the expected number of grid cells
  - Validate that DSL parameters are populated for components with known DSL files
  - _Requirements: 1.2, 1.3, 2.1, 2.3_

- [ ] 6. Page template story files
- [ ] 6.1 (P) Author story files for all page templates with full-width layout
  - Create a CSF 3 story file for each page template in the pages directory
  - Set `title: 'Pages/{PageName}'` for sidebar grouping under the Pages section
  - Configure `parameters.layout: 'fullscreen'` for realistic full-width rendering
  - Render the page component directly without decorators or wrappers
  - Viewport switching is provided by the global viewport addon configuration
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 7. DSL Panel addon
- [ ] 7.1 Register the DSL Panel as a custom Storybook addon with tabbed sub-panels
  - Register the addon in the Storybook manager entry point with a unique addon ID
  - Create a panel component that reads DSL data from story parameters
  - Implement a tabbed interface with Source Code, Compiled JSON, and Rendered Preview tabs
  - Show a placeholder message when no DSL file exists for the current component
  - Show an error message when DSL compilation or rendering failed
  - _Requirements: 4.1, 4.3, 5.1, 6.1, 6.5_
  - _Contracts: DSLPanelAddon State_

- [ ] 7.2 Implement source code display with syntax highlighting and copy-to-clipboard
  - Display the DSL source code using Storybook's built-in syntax highlighter (TypeScript language)
  - Add a copy-to-clipboard button that copies the raw source text with visual feedback
  - _Requirements: 4.1, 4.2_

- [ ] 7.3 Implement compiled JSON display with highlighting, expand/collapse, and copy-to-clipboard
  - Display the compiled JSON with proper indentation and JSON syntax highlighting
  - Add expand/collapse toggle for large JSON payloads
  - Add a copy-to-clipboard button for the raw JSON text with visual feedback
  - _Requirements: 5.1, 5.3, 5.4_

- [ ] 7.4 Implement DSL-rendered PNG preview with side-by-side comparison and view toggle
  - Display the rendered PNG image loaded from the static artifacts directory
  - Implement a view mode toggle: React only, DSL only, and Side-by-side
  - In side-by-side mode, display React and DSL previews in a flexbox layout with labels
  - _Requirements: 6.1, 6.3, 6.4_

- [ ] 8. End-to-end integration verification
- [ ] 8.1 Verify the complete catalog workflow from artifact generation through story browsing
  - Run the full prestorybook script chain and confirm artifact generation succeeds
  - Start Storybook and verify all component stories appear in the sidebar with hierarchical grouping
  - Verify interactive controls work for at least one component with multiple variants
  - Verify the DSL Panel displays source, JSON, and PNG for a component with a DSL file
  - Verify the DSL Panel shows a placeholder for a component without a DSL file
  - Verify page templates render at full width and viewport switching works
  - Verify copy-to-clipboard functions for source and JSON
  - Verify the side-by-side view toggle switches between React, DSL, and combined views
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 5.1, 5.3, 5.4, 6.1, 6.3, 6.4, 6.5, 7.1, 7.3_
