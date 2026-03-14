# Implementation Plan

- [x]1. Preview app scaffold and launch configuration
- [x]1.1 Create the preview app with Vite, React, and TypeScript configuration
  - Initialize `preview/` directory with `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, and `App.tsx`
  - Configure Vite with React plugin, `vite-plugin-singlefile`, and `@` path alias pointing to `src/`
  - Configure TypeScript strict mode with `react-jsx`, bundler module resolution, and matching path alias
  - Add `dev` and `build` scripts to `package.json`
  - Verify `npm install` succeeds and `npm run dev` starts the Vite dev server
  - _Requirements: 1.3, 1.4, 2.3, 3.4, 5.1_

- [x]1.2 Create the reference component sync script with marker-based barrel export merge
  - Write `preview/scripts/sync-reference-components.sh` that copies the 16 reference component directories, `tokens.css`, and `types.ts` from the reference app into `preview/src/components/`
  - Implement marker-based merge for `index.ts`: place reference exports between `// --- BEGIN REFERENCE EXPORTS ---` and `// --- END REFERENCE EXPORTS ---` markers, preserving any custom exports below the end marker
  - Make the script idempotent — safe to re-run without destroying user-added components or barrel exports
  - Run the sync script to populate the initial component set and commit the copied components to version control
  - Verify the preview app builds and renders with the copied reference components
  - _Requirements: 1.3, 2.1, 3.7_

- [x]1.3 Create the `.claude/launch.json` preview server configuration
  - Define two preview configurations: `preview-app` (Vite dev server on port 5173) and `dsl-preview` (static file server on port 8080 for DSL-rendered PNGs)
  - Enable `autoPort` on both configurations to avoid port conflicts
  - Verify Claude Desktop can discover and launch both preview servers
  - _Requirements: 1.3, 1.4_

- [x]2. DSL compatibility validator package
- [x]2.1 Create the validator package with project scaffolding and core interfaces
  - Initialize `packages/validator/` following the existing monorepo package pattern (`src/`, `package.json` scoped as `@figma-dsl/validator`, vitest config, `tsconfig.json`)
  - Define the `ValidationError`, `ValidationResult`, `ValidatorOptions`, and `DslValidator` interfaces as specified in design
  - Implement the `validateComponent` and `validateAll` entry points that discover component files and dispatch to individual rules
  - Wire up `@figma-dsl/dsl-core` as a workspace dependency for DSL node type reference
  - _Requirements: 3.2_
  - _Contracts: DslValidator Service Interface_

- [x]2.2 (P) Implement Phase 1 file-structure validation rules
  - Implement `three-file` rule: verify component directory contains `.tsx`, `.module.css`, and `.figma.tsx` files
  - Implement `barrel-export` rule: verify component is exported from the parent `index.ts` barrel file
  - Write vitest test cases for each rule with passing and failing component fixtures
  - _Requirements: 3.2_

- [x]2.3 (P) Implement Phase 1 regex-based styling validation rules
  - Implement `css-modules` rule: verify component imports a `.module.css` file
  - Implement `no-inline-style` rule: detect `style={{` JSX attributes in component source
  - Implement `design-tokens` rule: verify CSS file uses `var(--token-*)` references instead of hardcoded values
  - Implement `token-exists` rule: cross-reference all `var(--*)` references in CSS against entries in `tokens.css`
  - Write vitest test cases for each rule with passing and failing fixtures
  - _Requirements: 3.2, 4.6, 7.2_

- [x]2.4 Register the `validate` command in the CLI
  - Add `figma-dsl validate <path>` command to the CLI alongside existing commands
  - Support `--tokens`, `--rules`, `--skip`, `--format` (text/json), and `--strict` options
  - Wire the CLI command to the validator's `validateComponent` and `validateAll` APIs
  - Verify JSON output matches the `ValidationResult` schema for machine-readable consumption by skills
  - _Requirements: 3.2_

- [x]2.5* Implement Phase 2 AST-based validation rules
  - Implement `classname-prop` rule: verify component accepts a `className` prop with the filter+join composition pattern
  - Implement `variant-union` rule: verify variant/size props use string literal union types
  - Implement `html-attrs` rule: verify props interface extends appropriate `HTMLAttributes`
  - Implement `dsl-compatible-layout` rule: verify component uses flexbox/grid patterns that map to DSL auto-layout
  - Use TypeScript compiler API (`ts.createSourceFile`) for AST traversal, with fallback to source-text pattern matching if heuristics prove unreliable
  - Write vitest test cases for each rule
  - _Requirements: 3.2_

- [x]3. Shared reference documents
- [x]3.1 (P) Create the component registry reference document
  - Catalog all 16 reference components with their prop interfaces, supported variants, default values, and usage examples
  - Include Figma Code Connect property mappings for each component that has a `.figma.tsx` binding
  - Place the registry at `.claude/skills/shared/references/component-registry.md`
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x]3.2 (P) Create the design token reference document
  - Extract all design tokens from `tokens.css` and map each to its CSS value, DSL RGBA value, and Figma style name
  - Organize tokens by category (colors, spacing, typography, shadows, borders, animations)
  - Place the reference at `.claude/skills/shared/references/design-tokens.md`
  - _Requirements: 7.1, 7.2, 7.3_

- [x]4. Landing Page Creation Skill
- [x]4.1 Author the Landing Page Skill with SKILL.md and supporting files
  - Write `SKILL.md` with YAML frontmatter (`name: create-landing-page`, pushy description with trigger phrases, `allowed-tools: Bash, Read, Write, Edit, Glob, Grep`)
  - Follow progressive disclosure: keep SKILL.md body under 500 lines, with detailed reference patterns in `references/landing-page-example.md`
  - Include instructions for Claude to read the component registry, compose pages from registered components, validate prop types, and launch preview via `launch.json`
  - Create `scripts/launch-preview.sh` for deterministic preview launching
  - Create `references/landing-page-example.md` documenting reference patterns from `LandingPage.tsx`
  - Ensure skill instructs Claude to write pages to `preview/src/pages/` and update `App.tsx` as the render target
  - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x]4.2 Create eval infrastructure for the Landing Page Skill
  - Write `evals/evals.json` with 2-3 realistic test prompts and assertions (e.g., "create a SaaS landing page with pricing")
  - Run test prompts to verify skill triggers correctly and produces valid page output
  - Verify all referenced files exist (templates, references, registry)
  - _Requirements: 1.1, 1.2_

- [x]5. Component Creation Skill
- [x]5.1 Author the Component Creation Skill with SKILL.md, templates, and supporting files
  - Write `SKILL.md` with YAML frontmatter (`name: create-react-component`, pushy description, `allowed-tools`)
  - Create template files in `assets/`: `Component.tsx.template`, `Component.module.css.template`, `Component.figma.tsx.template` following the 3-file pattern with template variables
  - Include instructions for the create→validate→fix iteration loop: generate component from template, run `figma-dsl validate`, fix errors, repeat until valid
  - Include instructions for dual preview: launch Vite dev server for React preview, run `figma-dsl compile` + `render` for DSL PNG preview
  - Include instructions to auto-register new components in `index.ts` (below the reference exports end marker) and update `types.ts`
  - Create `scripts/validate-and-preview.sh` for the validation + dual preview pipeline
  - Create `references/component-constraints.md` documenting reference app constraints
  - _Requirements: 1.1, 1.2, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x]5.2 Create eval infrastructure for the Component Creation Skill
  - Write `evals/evals.json` with 2-3 test prompts (e.g., "create a Card component with primary/secondary variants")
  - Run test prompts to verify skill triggers correctly, validates via CLI, and produces dual preview
  - Verify all template files and referenced files exist
  - _Requirements: 1.1, 1.2_

- [x]6. Figma Export Skill
- [x]6.1 Author the Figma Export Skill with SKILL.md, three-approach flow, and MCP pre-check
  - Write `SKILL.md` with YAML frontmatter (`name: export-to-figma`, pushy description, `allowed-tools`)
  - Include MCP availability pre-check: instruct Claude to probe with `get_code_connect_suggestions` before presenting approaches; exclude Approach A if MCP is unavailable
  - Document Approach A (MCP Auto-Publish): compile, export, `generate_figma_design`, `add_code_connect_map`, optional post-publish verification via `capture-figma` + `compare`
  - Document Approach B (Plugin JSON Import): compile, export to JSON, manual plugin import, update `.figma.tsx` with node URLs
  - Document Approach C (Visual Fidelity Pipeline): `figma-dsl pipeline` with 95% threshold, iterate until pass, then import via plugin or MCP, post-import verification via `capture-figma` + `batch-compare`
  - Include approach trade-offs reference and batch operation instructions
  - Create `scripts/compile-and-export.sh` for deterministic compile→export pipeline
  - Create `references/figma-export-schema.md`, `references/code-connect-pattern.md`, and `references/mcp-setup-guide.md`
  - Include token unmapping warnings via validator's `token-exists` rule
  - _Requirements: 1.1, 1.2, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x]6.2 Create eval infrastructure for the Figma Export Skill
  - Write `evals/evals.json` with 2-3 test prompts covering approach selection and export flow
  - Run test prompts to verify skill triggers correctly and presents approach options
  - Verify all referenced files exist
  - _Requirements: 1.1, 1.2_

- [x]7. HTML Export Skill
- [x]7.1 Author the HTML Export Skill with SKILL.md and supporting files
  - Write `SKILL.md` with YAML frontmatter (`name: export-to-html`, pushy description, `allowed-tools`)
  - Include instructions for Claude to set the target page as the preview app's root in `App.tsx`, launch preview for verification, run `vite build` with `vite-plugin-singlefile`, and copy `dist/index.html` to the user-specified output path
  - Include guidance on external asset handling: inline SVGs for small assets, copy large images alongside HTML with correct relative paths
  - Include instructions to preserve responsive behavior (media queries, container queries) in the exported HTML
  - Create `scripts/build-and-export.sh` for deterministic Vite build + copy pipeline
  - Create `references/html-export-guide.md` documenting asset handling and export patterns
  - _Requirements: 1.1, 1.2, 1.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 7.4_

- [x]7.2 Create eval infrastructure for the HTML Export Skill
  - Write `evals/evals.json` with 2-3 test prompts (e.g., "export the current page as a standalone HTML file")
  - Run test prompts to verify skill triggers correctly and produces self-contained HTML
  - Verify all referenced files exist
  - _Requirements: 1.1, 1.2_

- [x]8. Install skill-creator reference submodule
  - Add `anthropics/skills/skills/skill-creator` as a git submodule at `references/skill-creator/`
  - Verify the submodule initializes correctly and key assets are accessible (`scripts/run_loop.py`, `eval-viewer/generate_review.py`, `agents/grader.md`, `references/schemas.md`)
  - The submodule is read-only reference material — not modified by skills
  - _Requirements: 1.1, 1.2_

- [x]9. Skill description optimization and cross-skill integration testing
- [x]9.1 Run description optimization for all four skills
  - Run `references/skill-creator/scripts/run_loop.py` with 20 trigger queries per skill (mix of should-trigger and shouldn't-trigger prompts)
  - Verify trigger phrases are distinct across skills with no overlapping invocations
  - Iterate descriptions based on optimization results (up to 5 iterations per skill)
  - _Requirements: 1.2_

- [x]9.2 Validate cross-skill integration and end-to-end workflows
  - Verify the landing page workflow: compose a page from registered components, preview renders in Preview panel, hot-reload works on prop changes
  - Verify the component workflow: scaffold a 3-file component, validate via CLI, fix errors via iteration loop, dual preview (React + DSL PNG), auto-register in barrel exports
  - Verify the Figma export workflow: approach selection with MCP pre-check, compile and export via CLI, post-import verification
  - Verify the HTML export workflow: set page as root, preview, build self-contained HTML with inlined CSS and JS
  - Verify design token consistency across all output formats (React, DSL, Figma, HTML) using the shared token reference
  - Verify the component registry is consulted by all skills and updated by the Component Creation Skill
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 5.1, 5.2, 5.6, 6.5, 7.1, 7.5_
