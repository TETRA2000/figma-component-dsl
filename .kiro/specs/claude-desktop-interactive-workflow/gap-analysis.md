# Gap Analysis: Claude Desktop Interactive Workflow

## 1. Current State Investigation

### Existing Assets Inventory

| Asset | Location | Status | Relevance |
|-------|----------|--------|-----------|
| CLI with 11 commands | `packages/cli/src/cli.ts` | Mature | Compile, render, export, batch — directly usable by skills |
| DSL Compiler | `packages/compiler/` | Mature | `compileWithLayout` + text measurement |
| PNG Renderer | `packages/renderer/` | Mature | `renderToFile` via @napi-rs/canvas |
| Figma Exporter | `packages/exporter/` | Mature | `exportToFile` → plugin-compatible JSON |
| Figma Plugin | `packages/plugin/` | Mature | Imports JSON, creates real Figma nodes |
| React Capturer | `packages/capturer/` | Mature | Playwright-based screenshot capture |
| Image Comparator | `packages/comparator/` | Mature | Pixel-diff with similarity scoring |
| Reference components | `references/figma_design_playground/src/` | Read-only | 16 components + landing page + tokens |
| Existing MAGI skill | `.claude/skills/magi-docs-writer/` | Mature | Proves skill pattern, reference for structure |
| Kiro commands | `.claude/commands/kiro/` | Mature | 11 slash commands, proves command pattern |

### Missing Assets

| Asset | Required By | Status |
|-------|-------------|--------|
| `.claude/launch.json` | Req 1 | **Missing** — no preview config exists |
| Skills directories | Req 1-5 | **Missing** — no interactive workflow skills exist yet |
| Component registry reference | Req 6 | **Missing** — no catalog of components/props |
| Vite preview app for workspace | Req 1, 2, 3 | **Missing** — only reference app has Vite; no workspace preview app |
| SSR / HTML generation | Req 5 | **Missing** — no server-side rendering or static HTML export exists |
| Component scaffolding templates | Req 3 | **Missing** — no template files for component generation |
| Design token resolver | Req 7 | **Missing** — no utility to parse `tokens.css` and resolve CSS custom properties to values |

### Conventions Observed

- **Monorepo**: npm workspaces under `packages/`, each with `src/`, `dist/`, `vitest`
- **Skill pattern**: `SKILL.md` with YAML frontmatter (`name`, `description`), markdown body, optional `references/` subdirectory (see `magi-docs-writer`)
- **Command pattern**: `.claude/commands/kiro/*.md` — markdown files with frontmatter
- **Reference app is read-only**: git submodule, not to be modified directly
- **Component 3-file pattern**: `{Name}.tsx` + `{Name}.module.css` + `{Name}.figma.tsx`
- **Design tokens**: CSS custom properties in `tokens.css`, consumed via `var(--token-name)`
- **Type sharing**: `types.ts` for shared interfaces, `index.ts` for barrel exports
- **CLI commands**: All invocable as `figma-dsl <command>` or `bin/figma-dsl-<command>`

### Integration Surfaces

- **CLI → Skills**: Skills can invoke CLI commands via `Bash` tool (`figma-dsl compile`, `figma-dsl render`, `figma-dsl export`, `figma-dsl batch`)
- **launch.json → Vite**: Preview panel connects to a Vite dev server running the workspace app
- **Reference app → Workspace**: Components must be copied/adapted from `references/figma_design_playground/src/` into a workspace preview app that skills can modify
- **Exporter → Plugin**: JSON output from `figma-dsl export` is pasted into the Figma plugin UI

---

## 2. Requirements Feasibility Analysis

### Requirement-to-Asset Map

| Requirement | Existing Assets | Gaps | Tag |
|-------------|----------------|------|-----|
| **1. Skill Infrastructure** | Skill pattern proven (magi-docs-writer) | No `.claude/launch.json`, no preview app, no skill directories | Missing |
| **2. Landing Page Skill** | LandingPage.tsx reference, 16 components, all types | No workspace preview app, no component registry doc, no skill | Missing |
| **3. React Component Skill** | 3-file pattern documented, tokens.css, types.ts | No scaffold templates, no dual-preview workflow, no skill | Missing |
| **4. Figma Export Skill** | `figma-dsl compile` + `figma-dsl export` + plugin | No skill wrapping CLI, no Code Connect generation guidance doc | Missing |
| **5. HTML Page Skill** | No SSR capability exists | No SSR tooling, no CSS inlining, no static HTML pipeline | Missing |
| **6. Component Registry** | types.ts + barrel index.ts + reference components | No structured registry reference document | Missing |
| **7. Design Token Consistency** | tokens.css exists in reference app | No token parser/resolver, no Figma variable mapping utility | Constraint |

### Complexity Signals

| Area | Complexity | Notes |
|------|-----------|-------|
| Skill SKILL.md files | Low | Markdown with YAML frontmatter; pattern already proven |
| `.claude/launch.json` | Low | Simple JSON config pointing to Vite dev server |
| Workspace preview app (Vite + React) | Medium | Need a Vite app in workspace that imports/renders user-generated components |
| Component registry reference doc | Low | Extract prop interfaces from reference components, write markdown |
| Component scaffold templates | Low | Template files for .tsx, .module.css, .figma.tsx |
| Dual preview (React + DSL) | Medium | React: Vite hot-reload. DSL: CLI compile+render to PNG |
| SSR / HTML generation | Medium-High | Need `react-dom/server` renderToString + CSS extraction + asset inlining |
| Design token resolution | Medium | Parse tokens.css, resolve var() references, map to Figma values |

### Research Needed

1. **SSR approach**: Evaluate `react-dom/server` renderToString vs. Vite SSR mode vs. a build-time static export. Consider whether to add as a new `packages/html-renderer` package or as a CLI command extension.
2. **CSS extraction for HTML export**: CSS Modules produce scoped class names at build time; extracting and inlining these into a standalone HTML file requires either a Vite build step or a custom CSS collector.
3. **Design token → Figma variable mapping**: Determine if Figma Variables API (via plugin) can programmatically create variables from `tokens.css`, or if this must remain a manual/documented mapping.
4. **Workspace preview app architecture**: Decide whether skills write components into a dedicated `preview/` app directory or into the user's own project structure. The preview app needs Vite, React, and the reference components/tokens.

---

## 3. Implementation Approach Options

### Option A: Extend Existing Patterns (Skills as Pure Documentation)

Skills are pure markdown instruction files — no new TypeScript packages. Each skill's SKILL.md instructs Claude how to use existing CLI commands and write React files following reference patterns. The workspace preview app is a minimal Vite+React scaffold committed to the repo.

**Which assets to extend:**
- Add SKILL.md files under `.claude/skills/` (4 new skill directories)
- Add `.claude/launch.json` pointing to a simple Vite preview app
- Add a `preview/` directory with a minimal Vite+React app scaffold
- Add component registry reference doc (markdown) under skill references
- Add scaffold templates (`.tsx`, `.module.css`, `.figma.tsx`) under skill directories

**Trade-offs:**
- ✅ No new TypeScript packages needed
- ✅ Skills leverage existing CLI commands (`compile`, `render`, `export`, `batch`)
- ✅ Follows proven MAGI skill pattern
- ✅ Low risk — mostly markdown + minimal scaffold
- ❌ HTML export requires Claude to manually construct the SSR pipeline each time
- ❌ Design token resolution is manual (Claude reads tokens.css, extracts values)

**Effort**: M (3-7 days) | **Risk**: Low

### Option B: New Packages + Skills

Create new TypeScript packages (`packages/html-renderer`, `packages/token-resolver`) alongside the skills. Skills reference these as tool dependencies. The preview app is a proper package with Vite config.

**New assets:**
- `packages/html-renderer/` — SSR with CSS extraction and asset inlining
- `packages/token-resolver/` — Parse tokens.css, resolve CSS custom properties to values, map to Figma variables
- `packages/preview-app/` — Vite+React app wired into the monorepo
- `.claude/skills/` — 4 skill directories with SKILL.md + references
- `.claude/launch.json` — Preview config
- New CLI commands: `figma-dsl html-export`, `figma-dsl resolve-tokens`

**Trade-offs:**
- ✅ Deterministic HTML export (not dependent on Claude's ad-hoc construction)
- ✅ Token resolution as a reusable utility
- ✅ Preview app integrated into monorepo build
- ❌ More code to write and maintain
- ❌ Longer implementation timeline
- ❌ SSR with CSS Modules extraction is non-trivial

**Effort**: L (1-2 weeks) | **Risk**: Medium

### Option C: Hybrid — Skills-First with Incremental Tooling

Start with Option A (skills as documentation, minimal scaffold). Add `packages/html-renderer` and token resolution as follow-up tasks only when the skill workflows prove the need.

**Phase 1 (Skills-first):**
- 4 skill directories with SKILL.md + reference docs + templates
- `.claude/launch.json` + minimal preview app scaffold
- Component registry reference document
- Landing Page, Component Creation, and Figma Export skills fully functional
- HTML Export skill works via Claude-constructed SSR (documented instructions)

**Phase 2 (If needed):**
- `packages/html-renderer` for deterministic HTML export
- Token resolver utility
- Additional CLI commands

**Trade-offs:**
- ✅ Fast time-to-value for 3 of 4 workflows
- ✅ Validates skill patterns before investing in tooling
- ✅ HTML export works immediately (Claude follows instructions), improves later
- ❌ HTML export quality depends on Claude's execution consistency
- ❌ Two-phase planning requires tracking deferred work

**Effort**: M (3-7 days) for Phase 1, S-M for Phase 2 | **Risk**: Low

---

## 4. Effort & Risk Summary

| Approach | Effort | Risk | Justification |
|----------|--------|------|---------------|
| **A: Pure Skills** | M (3-7 days) | Low | Mostly markdown, proven patterns, existing CLI |
| **B: New Packages + Skills** | L (1-2 weeks) | Medium | SSR/CSS extraction is non-trivial, more moving parts |
| **C: Hybrid** | M + S-M (phased) | Low | Fast start, defers complexity, validates approach |

---

## 5. Recommendations for Design Phase

### Preferred Approach

**Option C (Hybrid)** — Delivers immediate value through skills while deferring tooling investment to proven needs.

### Key Design Decisions to Make

1. **Preview app location**: `preview/` at repo root vs. `packages/preview-app/` in monorepo. Affects launch.json `cwd` and monorepo integration.
2. **Component source location**: Should skills write user-generated components into the preview app's `src/components/` or into a separate `workspace/` directory?
3. **Reference component reuse strategy**: Copy reference components into the preview app, or import them via path alias from `references/`? (The submodule is read-only but can be aliased in Vite.)
4. **HTML export approach**: Phase 1 uses Claude-constructed SSR. Should the instructions specify `react-dom/server` + Vite build, or a simpler string-template approach?

### Research Items to Carry Forward

1. **Vite SSR for HTML export** — Feasibility and complexity of using Vite's SSR mode with CSS Modules extraction for standalone HTML generation
2. **Figma Variables API** — Whether the plugin can programmatically create Figma variables from tokens.css values (extends Req 4, 7)
3. **CSS Modules in SSR** — How to extract scoped CSS class names and inline styles when rendering React components to static HTML outside of Vite's build pipeline
4. **Preview app hot-reload for new files** — Verify that Vite hot-reloads when new component files are added to the preview app (not just when existing files change)
