# Research & Design Decisions

## Summary
- **Feature**: `component-catalog`
- **Discovery Scope**: New Feature (greenfield Storybook integration into existing preview app)
- **Key Findings**:
  - Storybook 10 (latest, ESM-only) fully supports React 19 + Vite 8 via `@storybook/react-vite`; auto-detects Vite config
  - Custom addon panels use `storybook/manager-api` registration with `AddonPanel` component; Manager/Preview communicate via channel events and globals
  - DSL compilation (`@figma-dsl/compiler`) and rendering (`@figma-dsl/renderer`) require Node-native `@napi-rs/canvas` — they cannot run in browser; DSL artifacts must be pre-generated or served via a local API

## Research Log

### Storybook Version Selection
- **Context**: Determine which Storybook version to use with the existing React 19 + Vite 8 + TypeScript 5.9 stack
- **Sources Consulted**: [npm storybook versions](https://www.npmjs.com/package/storybook), [Storybook 10 blog](https://storybook.js.org/blog/storybook-10/), [React-Vite framework docs](https://storybook.js.org/docs/get-started/frameworks/react-vite), [Vite 8 support issue #33789](https://github.com/storybookjs/storybook/issues/33789)
- **Findings**:
  - Storybook 10.x is current stable (10.2.17 for `@storybook/react-vite`)
  - ESM-only — requires Node 20.16+, 22.19+, or 24+ (project uses Node >= 22, compatible)
  - `@storybook/react-vite` auto-detects Vite config, respects path aliases
  - `react-docgen` (default) parses component props for automatic controls generation
  - Vite 8 Rolldown compatibility confirmed: Storybook builder handles `rolldownOptions` vs `rollupOptions` automatically
- **Implications**: Use Storybook 10 with `@storybook/react-vite`. No compatibility blockers.

### Custom Addon Development for DSL Panel
- **Context**: Requirements 4, 5, 6 need custom panels displaying DSL source, compiled JSON, and rendered PNG alongside stories
- **Sources Consulted**: [Writing addons guide](https://storybook.js.org/docs/addons/writing-addons), [Addon types](https://storybook.js.org/docs/addons/addon-types), [Addon knowledge base](https://storybook.js.org/docs/addons/addon-knowledge-base)
- **Findings**:
  - Panel addons register via `addons.register()` and `addons.add()` with `types.PANEL`
  - Manager (addon UI) and Preview (story iframe) communicate via channel events
  - `useParameter` hook reads per-story parameters (e.g., DSL file path, compiled JSON)
  - Story parameters can be set in CSF meta: `parameters: { dsl: { source: '...', json: '...', pngUrl: '...' } }`
  - Addon can be a local package (no npm publish required) — register in `.storybook/manager.ts`
  - Emotion for styling (Storybook convention)
- **Implications**: Build a local addon package at `preview/.storybook/addons/dsl-panel/` that reads DSL artifacts from story parameters.

### DSL Artifact Generation Strategy
- **Context**: DSL source display, compiled JSON, and rendered PNG must be available in Storybook
- **Sources Consulted**: Codebase analysis of `@figma-dsl/compiler` and `@figma-dsl/renderer`
- **Findings**:
  - `compileWithLayout(node, measurer)` requires `TextMeasurer` backed by `@napi-rs/canvas` — Node-only
  - `render(nodes, options)` returns `RenderResult { pngBuffer, width, height }` — Node-only
  - Existing CLI commands: `figma-dsl compile`, `figma-dsl render`, `figma-dsl batch`
  - DSL files are TypeScript modules using `@figma-dsl/core` — can be read as text for source display
  - Build-time approach: A Vite plugin or pre-build script compiles DSL files and generates JSON + PNG artifacts
  - Runtime approach: A local dev server endpoint that compiles/renders on demand
- **Implications**: Use a **build-time pre-generation** approach via a Storybook `viteFinal` plugin or npm script that generates `.dsl.json` and `.dsl.png` files from all `examples/*.dsl.ts` files before Storybook starts. This avoids runtime Node dependency in the browser.

### Component-DSL File Association
- **Context**: Requirement 7 needs automatic mapping between React components and DSL files
- **Sources Consulted**: Codebase analysis of `preview/src/components/` and `examples/` directories
- **Findings**:
  - 25 React components exist in `preview/src/components/{ComponentName}/`
  - 5 DSL files exist in `examples/`: `button.dsl.ts`, `badge-variants.dsl.ts`, `card.dsl.ts`, `navbar.dsl.ts`, `pricing-card.dsl.ts`
  - Naming convention: component PascalCase → DSL kebab-case (e.g., `Button` → `button.dsl.ts`, `PricingCard` → `pricing-card.dsl.ts`)
  - Exception: `badge-variants.dsl.ts` uses a suffix pattern — need to handle both `{name}.dsl.ts` and `{name}-variants.dsl.ts`
  - `card.dsl.ts` has no direct component match (generic) — demonstrates need for manual override
- **Implications**: Implement kebab-case convention mapping with glob fallback and optional manual override via story parameters.

### Autodocs and Story Discovery
- **Context**: Requirement 1.2 needs automatic component discovery
- **Sources Consulted**: [Storybook autodocs](https://storybook.js.org/docs/writing-docs/autodocs), [Doc blocks](https://storybook.js.org/docs/writing-docs/doc-blocks)
- **Findings**:
  - `stories` glob in `.storybook/main.ts` controls discovery: `'../src/**/*.stories.@(ts|tsx)'`
  - Autodocs generates doc pages automatically with `tags: ['autodocs']`
  - `react-docgen` extracts prop types from TypeScript interfaces for controls
  - Props defined in separate `types.ts` file may need import-following configuration
  - Story files must be created for each component (not auto-generated at runtime)
- **Implications**: Story files (`.stories.tsx`) must be authored per component. Use a template/generator script to scaffold initial stories.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Storybook inside preview app | Install Storybook directly in `preview/` package | Shares Vite config, components, and tokens; simplest setup | Adds dev dependencies to preview; Storybook becomes coupled to preview build | Recommended — aligns with Storybook conventions |
| Separate catalog package | New `packages/catalog/` workspace | Clean separation; independent versioning | Duplicates Vite/React config; must import components cross-package; complex CSS Module resolution | Over-engineered for this use case |

## Design Decisions

### Decision: Install Storybook in `preview/` app
- **Context**: Storybook needs access to React components, CSS Modules, design tokens, and Vite config
- **Alternatives Considered**:
  1. Separate `packages/catalog/` workspace — clean but duplicative
  2. Root-level Storybook config pointing into `preview/src/` — awkward path resolution
- **Selected Approach**: Install Storybook in `preview/` alongside existing Vite config
- **Rationale**: Components, tokens, and path aliases are already configured in `preview/vite.config.ts`; Storybook's `@storybook/react-vite` framework automatically reuses this config
- **Trade-offs**: Preview's `package.json` grows with Storybook dev dependencies, but they don't affect production build
- **Follow-up**: Add `storybook` and `build-storybook` scripts to `preview/package.json`

### Decision: Build-time DSL artifact generation
- **Context**: DSL compilation and rendering require Node-native `@napi-rs/canvas`; cannot run in browser
- **Alternatives Considered**:
  1. Runtime dev server endpoint — adds HTTP layer complexity, requires running two servers
  2. Build-time pre-generation — simple, deterministic, works with static Storybook builds
  3. Vite plugin with virtual modules — elegant but complex to implement and debug
- **Selected Approach**: npm pre-build script that generates artifacts, consumed as static imports in stories
- **Rationale**: Reuses existing `@figma-dsl/cli` batch processing; artifacts are deterministic and cacheable; works for both dev and static builds
- **Trade-offs**: Requires re-running generation when DSL files change (mitigated by watch mode or Storybook `predev` script)
- **Follow-up**: Implement `generate-dsl-artifacts` script using `processBatch` from `@figma-dsl/cli`

### Decision: Local addon for DSL panel (not published to npm)
- **Context**: Custom addon needed for DSL source, JSON, and PNG display
- **Alternatives Considered**:
  1. Published npm addon — unnecessary overhead for internal tooling
  2. Inline story decorators — limited to story area, no dedicated panel
  3. Local addon in `.storybook/addons/` — simple, version-controlled, no publish step
- **Selected Approach**: Local addon registered in `.storybook/manager.ts`
- **Rationale**: Keeps addon code in the repo; no external dependency; can evolve with the project
- **Trade-offs**: Must manually handle build/bundling (mitigated: Storybook handles local addon transpilation)

### Decision: Story file per component with shared template
- **Context**: 25 components need story files; maintaining consistency is important
- **Alternatives Considered**:
  1. Auto-generated stories at build time — fragile, hard to customize
  2. Manual stories per component — flexible but potentially inconsistent
  3. Shared story template utilities + manual stories — balanced approach
- **Selected Approach**: Manual `.stories.tsx` files per component using shared utility functions for variant grids and DSL panel integration
- **Rationale**: Allows per-component customization while enforcing consistent structure via shared helpers
- **Trade-offs**: Initial authoring effort for 25 components (mitigated by scaffold script)

## Risks & Mitigations
- **Risk**: Storybook 10 + Vite 8 edge cases — **Mitigation**: Pin to known-good versions; Storybook team actively tracks Vite 8 compat
- **Risk**: `react-docgen` fails to extract props from `types.ts` — **Mitigation**: Test with current component structure; fall back to manual argTypes if needed
- **Risk**: DSL artifact generation adds build step overhead — **Mitigation**: Only regenerate changed files; cache artifacts
- **Risk**: Merge conflict in `preview/src/components/index.ts` (existing conflict markers) — **Mitigation**: Resolve conflict before starting implementation

## References
- [Storybook 10 blog post](https://storybook.js.org/blog/storybook-10/) — ESM-only, latest features
- [Storybook React-Vite docs](https://storybook.js.org/docs/get-started/frameworks/react-vite) — Framework setup
- [Storybook addon authoring](https://storybook.js.org/docs/addons/writing-addons) — Custom panel development
- [Storybook autodocs](https://storybook.js.org/docs/writing-docs/autodocs) — Automatic documentation
- [Vite 8 announcement](https://vite.dev/blog/announcing-vite8) — Rolldown integration, plugin compat
- [Storybook Vite 8 support issue](https://github.com/storybookjs/storybook/issues/33789) — Compatibility tracking
