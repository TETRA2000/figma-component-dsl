# Gap Analysis: Component Catalog

## Executive Summary

The component catalog requires introducing Storybook into an existing Vite + React 19 preview app with 25+ components and 4 showcase pages. No catalog infrastructure exists today. The main challenges are: (1) Storybook compatibility with Vite 8 + React 19, (2) writing stories for 25+ components with variant coverage, (3) integrating DSL pipeline artifacts (source, JSON, PNG) into Storybook panels, and (4) resolving an existing merge conflict in the component barrel export.

---

## Current State Investigation

### Existing Assets

| Area | What Exists | Location |
|------|-------------|----------|
| React Components | 25+ components (16 reference + 9 dogfooding) | `preview/src/components/` |
| Page Templates | 4 showcase pages (Analytics, Banking, Pricing, DogfoodingGallery) | `preview/src/pages/` |
| DSL Examples | 5 `.dsl.ts` files (badge-variants, button, card, navbar, pricing-card) | `examples/` |
| Component Registry | Comprehensive props/variants documentation for 16 reference components | `.claude/skills/shared/references/component-registry.md` |
| Shared Types | `NavLink`, `Feature`, `Testimonial`, `PricingPlan`, `FAQItem`, `FooterColumn`, `StatItem` | `preview/src/components/types.ts` |
| Design Tokens | CSS custom properties | `preview/src/components/tokens.css` |
| DSL Compiler | `compileWithLayout` — compiles `.dsl.ts` → JSON | `packages/compiler/` |
| DSL Renderer | PNG rendering via @napi-rs/canvas | `packages/renderer/` |

### Architecture Patterns

- **Component folder pattern**: `{ComponentName}/` with `.tsx` + `.module.css` (+ optional `.figma.tsx`)
- **Barrel exports**: `preview/src/components/index.ts` re-exports all components
- **Variant pattern**: Components use typed union props (`variant`, `size`, `alignment`) with CSS Module class switching
- **Preview app**: Vite 8 + React 19 + `vite-plugin-singlefile`, path alias `@/` → `src/`
- **No routing**: `App.tsx` directly renders `<DogfoodingGallery />`; no React Router

### Conventions Extracted

- **Naming**: PascalCase component folders/files, camelCase CSS classes
- **Props**: Inline interfaces in component files (not exported separately), defaults via destructuring
- **Styling**: CSS Modules with design token consumption
- **Testing**: No tests in preview app (tests are in `packages/`)
- **Build**: `tsc -b && vite build` for preview app

### Issues Found

- **Merge conflict** in `preview/src/components/index.ts` (lines 29-35): Unresolved `<<<<<<< HEAD` markers between HEAD and commit `86217d8`. Four components (BalanceCard, TransactionRow, AccountSelector, PricingTier) are only in the conflict branch. **Must be resolved before proceeding.**

---

## Requirement-to-Asset Map

| Requirement | Existing Asset | Gap |
|-------------|---------------|-----|
| **Req 1: Storybook Integration** | Vite 8 + React 19 preview app | **Missing**: No Storybook installed. Need `@storybook/react-vite` compatible with Vite 8. |
| **Req 2: Variant Stories** | Props/variant info in component-registry.md and source | **Missing**: No `.stories.tsx` files. Need stories for all 25+ components. |
| **Req 3: Page Template Catalog** | 4 page files in `preview/src/pages/` | **Missing**: No page-level stories. Pages currently use inline styles (not CSS Modules). |
| **Req 4: DSL Source Display** | 5 `.dsl.ts` files in `examples/` | **Missing**: No Storybook addon/panel to display DSL source. Only 5 of 25+ components have DSL files. |
| **Req 5: Compiled JSON Display** | `@figma-dsl/compiler` package | **Missing**: No integration between Storybook and compiler. Compiler requires Node.js (@napi-rs/canvas) — cannot run in browser. **Constraint**: JSON must be pre-generated or fetched server-side. |
| **Req 6: DSL-Rendered Preview** | `@figma-dsl/renderer` package | **Missing**: Same Node.js constraint. PNG must be pre-rendered or generated via middleware. |
| **Req 7: Component-DSL Association** | Naming convention exists (e.g., `Button` → `button.dsl.ts`) | **Missing**: No formal mapping system. Kebab-case transform needed. Only 5 components have DSL files. |

---

## Implementation Approach Options

### Option A: Storybook with Static DSL Artifacts

**Strategy**: Install Storybook, write stories manually, pre-generate DSL JSON/PNG as static files via a build step, display in custom Storybook panels/addons.

- Write `.stories.tsx` colocated in each component folder
- Add npm script that runs `figma-dsl batch` + `figma-dsl compile` to generate JSON/PNG into a known directory
- Create a custom Storybook addon that reads pre-generated artifacts by convention

**Trade-offs**:
- ✅ Simple runtime — no Node.js server needed in Storybook
- ✅ DSL artifacts are cacheable and inspectable
- ✅ Follows existing CLI-driven workflow
- ❌ DSL previews stale until rebuild
- ❌ Custom addon development required

### Option B: Storybook with Live DSL Middleware

**Strategy**: Install Storybook with a custom middleware that compiles/renders DSL on-the-fly when requested.

- Write `.stories.tsx` colocated in each component folder
- Add Storybook middleware (Express handler) that invokes compiler/renderer on demand
- Custom panel fetches DSL source, compiled JSON, and rendered PNG via API

**Trade-offs**:
- ✅ Always up-to-date DSL previews
- ✅ No separate build step for DSL artifacts
- ❌ More complex setup (middleware, server-side rendering)
- ❌ Slower — compilation + rendering on every request
- ❌ @napi-rs/canvas dependency in Storybook server process

### Option C: Hybrid — Static Defaults with Optional Live Refresh

**Strategy**: Pre-generate DSL artifacts as static files (Option A), but also provide a "Refresh" button in the addon that calls a lightweight API to regenerate on demand.

- Stories reference pre-generated artifacts by default
- Custom addon includes "Compile & Render" action button
- API endpoint wraps CLI commands for on-demand regeneration

**Trade-offs**:
- ✅ Fast default experience (pre-generated)
- ✅ On-demand refresh when actively iterating on DSL
- ✅ Graceful degradation — works even without server
- ❌ Most complex to implement
- ❌ Two code paths to maintain

---

## Implementation Complexity & Risk

**Effort: L (1–2 weeks)** — 25+ components need stories, custom Storybook addon for DSL artifacts, Vite 8 compatibility verification, page template stories with viewport support.

**Risk: Medium** — Storybook 9 / `@storybook/react-vite` officially supports Vite 5+ and React 19 per documentation and community reports. Main risks: (1) potential edge cases with Vite 8's Rolldown backend, (2) custom addon development complexity for DSL integration, (3) @napi-rs/canvas as a native dependency may cause issues in some Storybook build contexts.

---

## Research Needed (for Design Phase)

1. **Storybook + Vite 8 + vite-plugin-singlefile**: Verify `@storybook/react-vite` works with the existing `vite-plugin-singlefile` plugin (may need to disable for Storybook config)
2. **Storybook addon API**: Evaluate Panel vs Tab vs Toolbar addon types for DSL code/JSON/PNG display
3. **@napi-rs/canvas in Storybook middleware**: Confirm native module compatibility in Storybook's Node process
4. **Story auto-generation**: Evaluate whether stories can be partially generated from `component-registry.md` or component source analysis

---

## Recommendations for Design Phase

1. **Preferred approach**: Option A (Static DSL Artifacts) — simplest runtime, aligns with existing CLI workflow, lowest risk. Can evolve to Option C later.
2. **Resolve merge conflict** in `preview/src/components/index.ts` before implementation.
3. **Story authoring strategy**: Start with the 16 reference components (well-documented in component-registry.md), then add dogfooding components.
4. **DSL coverage**: Only 5 of 25+ components have `.dsl.ts` files. The catalog should gracefully handle components without DSL definitions (per Req 4 AC 3).
5. **Storybook config**: Separate from existing Vite config; Storybook has its own `.storybook/` directory with `main.ts` and `preview.ts`.
