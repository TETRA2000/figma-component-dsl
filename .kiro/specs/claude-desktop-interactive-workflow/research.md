# Research & Design Decisions

## Summary
- **Feature**: `claude-desktop-interactive-workflow`
- **Discovery Scope**: New Feature (greenfield skills + preview infrastructure)
- **Key Findings**:
  - Claude Skills use YAML frontmatter (`name`, `description`, `allowed-tools`) in SKILL.md; `description` is the primary auto-invocation trigger
  - `vite-plugin-singlefile` (86K weekly downloads) solves HTML export by inlining all CSS/JS into a single file — avoids custom SSR+CSS extraction
  - Figma Code Connect uses `figma.connect(Component, URL, { props, example })` with `figma.enum`, `figma.string`, `figma.boolean` mappers; reference app already demonstrates the exact pattern
  - `.claude/launch.json` supports multiple configurations with `runtimeExecutable`, `runtimeArgs`, `port`, `cwd`, and `autoPort`; no custom schema needed

## Research Log

### Claude AI Skills SKILL.md Format
- **Context**: Need to understand exact frontmatter spec for skills
- **Sources**: [Claude Code Skills Docs](https://code.claude.com/docs/en/skills), [Anthropic Skills Repo](https://github.com/anthropics/skills), [SKILL.md Format Spec](https://deepwiki.com/anthropics/skills/2.2-skill.md-format-specification)
- **Findings**:
  - Allowed frontmatter keys: `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`
  - `allowed-tools` grants tool access without per-use approval (CLI only, not SDK)
  - `description` field is the primary mechanism for auto-invocation — Claude matches user requests against descriptions
  - Skills support `$ARGUMENTS` and `$CLAUDE_SESSION_ID` string substitution
  - Supporting files go under subdirectories (`references/`, `scripts/`, `assets/`)
  - Existing project skill (`magi-docs-writer`) uses `name` + `description` only (no `allowed-tools`)
- **Implications**: Skills need descriptive `description` fields with trigger phrases. `allowed-tools` should include `Bash` (for CLI commands), `Read`, `Write`, `Edit`, `Glob`, `Grep` for file operations.

### `.claude/launch.json` Preview Configuration
- **Context**: Need exact format for preview server configs
- **Sources**: [Claude Code Desktop Docs](https://code.claude.com/docs/en/desktop)
- **Findings**:
  - Format: `{ version, autoVerify, configurations: [{ name, runtimeExecutable, runtimeArgs, port, cwd, env, autoPort }] }`
  - Supports multiple concurrent configurations (e.g., frontend + API)
  - `autoVerify: true` (default) makes Claude take screenshots after edits to verify changes
  - `cwd` supports `${workspaceFolder}` variable
  - `autoPort: true` finds free port automatically if preferred port is in use
  - JSON with comments supported
- **Implications**: Two configs needed — Vite dev server (port 5173) and static file server for PNG previews. `autoVerify` should stay enabled for interactive workflows.

### HTML Export Strategy — Vite Build + Single File
- **Context**: Requirement 5 needs self-contained HTML from React components
- **Sources**: [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile), [Vite Build Docs](https://vite.dev/guide/build)
- **Findings**:
  - `vite-plugin-singlefile` inlines all JS+CSS into `dist/index.html` — 86K weekly downloads, mature
  - CSS Modules are handled natively by Vite's build pipeline — scoped class names resolved at build time
  - Design tokens (`tokens.css`) imported as global CSS are automatically bundled
  - No custom SSR needed — standard Vite build with single-file plugin produces a complete, self-contained page
  - Fonts/images require additional handling (base64 inline or asset copy)
- **Implications**: HTML export skill instructs Claude to: (1) add `vite-plugin-singlefile` to the preview app, (2) run `vite build`, (3) output `dist/index.html` as the self-contained page. This eliminates the need for a custom `packages/html-renderer` package.

### Figma Code Connect Binding Pattern
- **Context**: Requirement 4.3 needs Code Connect generation guidance
- **Sources**: [Figma Code Connect React Docs](https://developers.figma.com/docs/code-connect/react/), [npm @figma/code-connect](https://www.npmjs.com/package/@figma/code-connect)
- **Findings**:
  - Pattern: `figma.connect(Component, FIGMA_URL, { props: { ... }, example: (props) => <Component {...props} /> })`
  - Prop mappers: `figma.enum('PropertyName', { FigmaValue: 'codeValue' })`, `figma.string('PropertyName')`, `figma.boolean('PropertyName')`
  - Reference app already has 16 `.figma.tsx` files demonstrating this pattern
  - Code Connect CLI can publish bindings to Figma, but creation is manual (no auto-generation from React interfaces)
  - FIGMA_URL must point to an existing Figma component node
- **Implications**: The Figma Export Skill provides a template and reference doc showing the Code Connect pattern. Claude generates `.figma.tsx` files by mapping React prop types to `figma.enum/string/boolean`. The FIGMA_URL is a placeholder until the component is published to Figma.

### Preview App Architecture
- **Context**: Skills need a Vite+React app where Claude writes user-generated pages/components
- **Sources**: Gap analysis, reference app structure
- **Findings**:
  - Reference app (`references/figma_design_playground/`) is a git submodule — read-only, cannot be modified
  - Preview app needs: Vite config, React 19, CSS Modules, tokens.css, shared types
  - Two approaches: (A) copy reference components into preview app, (B) alias `references/` via Vite `resolve.alias`
  - Approach B is cleaner — avoids duplication, reference stays canonical
  - Vite hot-reload works for new files added to watched directories
  - Preview app should be at repo root as `preview/` (not in `packages/`) since it's not a publishable package
- **Implications**: A `preview/` directory with minimal Vite+React scaffold. Vite config aliases `@/components` to reference app components. Skills write new pages/components into `preview/src/`. Launch.json `cwd` points to `preview/`.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Skills as Pure Docs | SKILL.md instructs Claude, no tooling code | Low complexity, fast delivery | HTML export consistency varies | Gap analysis Option A |
| Skills + New Packages | Add packages/html-renderer, packages/token-resolver | Deterministic outputs | Over-engineering for skill-based workflow | Gap analysis Option B |
| Skills + Vite Build | Skills instruct Claude, Vite build for HTML export | Leverages Vite ecosystem, deterministic HTML | Requires preview app scaffold | Selected approach |

**Selected**: Skills + Vite Build. Skills are documentation (SKILL.md), preview app provides the Vite scaffold, and HTML export uses `vite build` + `vite-plugin-singlefile` for deterministic output. No new TypeScript packages needed.

## Design Decisions

### Decision: Preview App as Vite Scaffold at `preview/`
- **Context**: Skills need a writable directory with Vite+React for preview rendering
- **Alternatives Considered**:
  1. `packages/preview-app/` — monorepo package
  2. `preview/` — standalone directory at repo root
  3. User's own project directory — write into arbitrary locations
- **Selected Approach**: `preview/` at repo root with Vite config that aliases reference components
- **Rationale**: Not a publishable package (no need for monorepo integration). Keeps skill output isolated. Simple `cwd` in launch.json.
- **Trade-offs**: Extra directory, but clearly separated from source packages
- **Follow-up**: Verify Vite hot-reload for dynamically added files

### Decision: HTML Export via Vite Build + Single File Plugin
- **Context**: Requirement 5 needs self-contained HTML output
- **Alternatives Considered**:
  1. Custom SSR with `react-dom/server` + CSS extraction
  2. Vite build + `vite-plugin-singlefile`
  3. Claude-constructed HTML from scratch
- **Selected Approach**: Vite build with `vite-plugin-singlefile` — Claude updates `preview/src/App.tsx` with the target page, runs `vite build`, and copies `dist/index.html`
- **Rationale**: Vite handles CSS Modules, design tokens, and asset bundling natively. Single-file plugin produces a complete, self-contained HTML file. No custom SSR code to maintain.
- **Trade-offs**: Requires the preview app scaffold; build step takes a few seconds
- **Follow-up**: Test with lucide-react icons (SVG inlining)

### Decision: Reference Components via Vite Alias (Not Copy)
- **Context**: Skills need access to the 16 reference components
- **Alternatives Considered**:
  1. Copy components from `references/` into `preview/src/`
  2. Vite `resolve.alias` to `references/figma_design_playground/src/`
- **Selected Approach**: Vite alias — `@/components` resolves to reference app's `src/components/`
- **Rationale**: Avoids duplication, reference stays canonical, changes to reference components are reflected immediately
- **Trade-offs**: Tighter coupling to reference app structure; if reference app reorganizes, alias breaks
- **Follow-up**: None — reference app is a stable submodule

### Decision: Component Registry as Shared Markdown Reference
- **Context**: Requirement 6 needs a component catalog accessible to all skills
- **Alternatives Considered**:
  1. JSON schema file auto-generated from TypeScript
  2. Markdown reference document with prop tables
  3. TypeScript module exporting component metadata
- **Selected Approach**: Markdown reference document under `.claude/skills/shared/references/component-registry.md`
- **Rationale**: Skills read markdown references naturally. No build step. Human-readable. Easy to update. Claude can grep for prop interfaces.
- **Trade-offs**: Manual maintenance (but Requirement 6.5 says the Component Creation Skill updates it)
- **Follow-up**: Generate initial registry from reference app components

## Risks & Mitigations
- **Risk**: Vite hot-reload may not pick up newly added files in all cases → Mitigation: Skill instructs Claude to restart dev server if hot-reload fails
- **Risk**: `vite-plugin-singlefile` may not inline all assets (fonts, external images) → Mitigation: Skill instructs Claude to use inline SVGs and base64 for small assets; emit separate files for large assets
- **Risk**: Code Connect bindings require a valid FIGMA_URL that doesn't exist until component is published → Mitigation: Use placeholder URL in template, document update process after Figma plugin import
- **Risk**: Design token CSS custom properties may not resolve identically across DSL render and React render → Mitigation: Skill references provide token-to-value mapping table for DSL context

## References
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Claude Code Desktop / Preview](https://code.claude.com/docs/en/desktop)
- [Figma Code Connect React Docs](https://developers.figma.com/docs/code-connect/react/)
- [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)
- [Vite Build Docs](https://vite.dev/guide/build)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
