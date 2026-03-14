# Research & Design Decisions

## Summary
- **Feature**: `claude-desktop-interactive-workflow`
- **Discovery Scope**: New Feature (greenfield skills + preview infrastructure + validation packages + Figma multi-approach + skill-creator methodology)
- **Key Findings**:
  - The project already has a complete visual fidelity pipeline (`capturer` + `comparator` + CLI `pipeline` command) — compile→render→capture→compare at 95% threshold — enabling a verify-before-import approach
  - Three Figma design creation approaches (MCP, Plugin JSON, Visual Fidelity Pipeline) provide users flexibility to balance speed vs visual accuracy
  - Anthropic's `skill-creator` provides a proven methodology for creating, testing, and iterating skills
  - Figma MCP server's `generate_figma_design` tool enables auto-publishing directly from Claude Desktop
  - `@figma-dsl/validator` package extends existing `CompileError[]` pattern with React-to-DSL structural validation

## Research Log

### Claude AI Skills SKILL.md Format
- **Context**: Need to understand exact frontmatter spec for skills
- **Sources**: [Claude Code Skills Docs](https://code.claude.com/docs/en/skills), [Anthropic Skills Repo](https://github.com/anthropics/skills)
- **Findings**:
  - Allowed frontmatter keys: `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`
  - `allowed-tools` grants tool access without per-use approval (CLI only, not SDK)
  - `description` field is the primary mechanism for auto-invocation — Claude matches user requests against descriptions
  - Skills support `$ARGUMENTS` and `$CLAUDE_SESSION_ID` string substitution
  - Supporting files go under subdirectories (`references/`, `scripts/`, `assets/`)
- **Implications**: Skills need descriptive `description` fields with trigger phrases. `allowed-tools` should include `Bash`, `Read`, `Write`, `Edit`, `Glob`, `Grep`.

### `.claude/launch.json` Preview Configuration
- **Context**: Need exact format for preview server configs
- **Sources**: [Claude Code Desktop Docs](https://code.claude.com/docs/en/desktop)
- **Findings**:
  - Format: `{ version, autoVerify, configurations: [{ name, runtimeExecutable, runtimeArgs, port, cwd, env, autoPort }] }`
  - Supports multiple concurrent configurations (e.g., frontend + API)
  - `autoVerify: true` (default) makes Claude take screenshots after edits to verify changes
  - `cwd` supports `${workspaceFolder}` variable
  - `autoPort: true` finds free port automatically if preferred port is in use
- **Implications**: Two configs needed — Vite dev server (port 5173) and static file server for PNG previews.

### HTML Export Strategy — Vite Build + Single File
- **Context**: Requirement 5 needs self-contained HTML from React components
- **Sources**: [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile), [Vite Build Docs](https://vite.dev/guide/build)
- **Findings**:
  - `vite-plugin-singlefile` inlines all JS+CSS into `dist/index.html` — 86K weekly downloads, mature
  - CSS Modules are handled natively by Vite's build pipeline
  - Design tokens (`tokens.css`) imported as global CSS are automatically bundled
  - No custom SSR needed — standard Vite build with single-file plugin produces a complete, self-contained page
- **Implications**: HTML export skill uses Vite build pipeline. No custom `packages/html-renderer` needed.

### Figma MCP Server — Auto-Publishing to Figma
- **Context**: User requested automatic publishing of designs to Figma, eliminating manual plugin import
- **Sources**: [Figma MCP Server Docs](https://developers.figma.com/docs/figma-mcp-server/), [Figma MCP Tools](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/), [Figma REST API](https://developers.figma.com/docs/rest-api/)
- **Findings**:
  - **`generate_figma_design`** (write): Sends live UI as design layers to new or existing Figma files. Remote server only. Exempt from standard rate limits. Requires edit permissions for existing files. New files created in team/organization drafts.
  - **`add_code_connect_map`** (write): Establishes mappings between Figma design nodes and code components. Figma Design files only.
  - **`send_code_connect_mappings`** (write): Confirms Code Connect mappings after `get_code_connect_suggestions` detection.
  - **`get_code_connect_suggestions`** (read): Detects and suggests Code Connect mappings from codebase.
  - **`get_design_context`** (read): Returns design context for a layer/selection. Default output is React + Tailwind, customizable to other frameworks.
  - **`get_variable_defs`** (read): Returns variables and styles (colors, spacing, typography) from Figma selection.
  - **`get_screenshot`** (read): Captures visual representations of selections.
  - **Authentication**: Figma MCP server handles auth internally when configured in Claude Desktop — users authenticate via Figma's OAuth flow.
  - **Figma REST API limitation**: REST API is read-only for file contents — cannot create files or components. Only Plugin API and MCP server can write.
- **Implications**:
  - The Figma Export Skill can auto-publish designs via MCP's `generate_figma_design` instead of manual plugin JSON import
  - Code Connect mappings can be auto-established via `add_code_connect_map` after design is published
  - The existing exporter JSON format (PluginInput) is still useful for the Figma plugin fallback path
  - MCP server must be configured in Claude Desktop's MCP settings — skill should document setup instructions
  - Two publishing paths: (1) MCP server direct publish (preferred), (2) plugin JSON import (fallback)

### Figma REST API — Read-Only Limitation
- **Context**: Investigated whether REST API could create/modify Figma files
- **Sources**: [Figma REST API Introduction](https://developers.figma.com/docs/rest-api/), [Figma API Comparison](https://developers.figma.com/compare-apis/)
- **Findings**:
  - REST API is for reading/extracting design data, not creating
  - `createComponent` exists only in the Plugin API (runs inside Figma editor)
  - 2025 platform changes introduced granular scopes (`file_content:read`, `file_metadata:read`) replacing broad `file_read`
  - No REST endpoint for creating components, frames, or files programmatically
- **Implications**: MCP server `generate_figma_design` is the only external-to-Figma write path. Plugin JSON import remains as fallback.

### DSL Compatibility Validation — Existing Pipeline Analysis
- **Context**: User requested validation for React components to ensure DSL compatibility, enabling AI iteration
- **Sources**: Codebase analysis of `packages/dsl-core`, `packages/compiler`, `packages/exporter`
- **Findings**:
  - **Existing validation** is minimal:
    - `dsl-core/src/nodes.ts`: Name validation (non-empty), text validation (non-empty characters), instance validation (non-empty componentRef)
    - `dsl-core/src/colors.ts`: Hex color pattern validation (`/^#?([0-9a-fA-F]{6})$/`), token existence check
    - `compiler/src/compiler.ts`: Accumulates `CompileError[]` with `{ message, nodePath, nodeType }`
    - `renderer/src/renderer.ts`: `RenderError` class with `nodePath` and `nodeType`
  - **DSL node types** (`DslNode` in `dsl-core/src/types.ts`):
    - `NodeType = 'FRAME' | 'TEXT' | 'RECTANGLE' | 'ELLIPSE' | 'GROUP' | 'COMPONENT' | 'COMPONENT_SET' | 'INSTANCE'`
    - Components have `componentProperties: ComponentProperty[]` (type: `TEXT | BOOLEAN | INSTANCE_SWAP`)
    - Auto-layout: direction, padding, spacing, alignment, sizing modes (`FIXED | HUG | FILL`)
  - **Compiler input format** (`.dsl.ts` files):
    - Import DSL factory functions from `@figma-dsl/core`
    - Export default `DslNode` (NOT React components)
    - Build tree using `frame()`, `text()`, `rectangle()`, `component()`, etc.
    - CLI loads via dynamic import and validates `mod.default` exists
  - **Exporter output** (`PluginInput`): `{ schemaVersion: "1.0.0", targetPage, components: PluginNodeDef[] }`
  - **No schema validation library** — relies on TypeScript type system only
- **Implications**:
  - A new `@figma-dsl/validator` package can provide programmatic validation of React component structure against DSL constraints
  - Validation rules: CSS Modules usage, design token references, prop interface patterns, className composition pattern
  - The validator runs as a CLI command (`figma-dsl validate`) and as a programmatic API for skill-driven iteration
  - Compiler errors (`CompileError[]`) already provide the reporting pattern — validator should follow the same interface
  - React components are NOT `.dsl.ts` files — the validator bridges the gap by checking if a React component can be faithfully represented as DSL nodes

### Figma Export Validation
- **Context**: User asked whether validation of Figma export output is needed
- **Sources**: Codebase analysis of `packages/exporter`
- **Findings**:
  - Exporter produces `PluginInput` JSON — the schema is well-defined (`PluginNodeDef` with typed fields)
  - The Figma plugin (`packages/plugin`) consumes this JSON and uses `figma.createComponent()` — errors surface there
  - MCP `generate_figma_design` accepts design layers, not raw JSON — validation is at the design-layer level
  - Compile errors are already reported by the compiler; exporter transforms compile output deterministically
- **Implications**:
  - Exporter validation is less critical since it's a deterministic transform of compiler output
  - Compile-time validation (`@figma-dsl/validator`) catches issues before they reach the exporter
  - MCP path validation happens at the Figma server side — errors returned to Claude for iteration
  - Recommend: Focus validation effort on the React→DSL compatibility gap (validator package), not on exporter output

### Visual Fidelity Pipeline — Existing CLI Infrastructure
- **Context**: User identified that DSL→Figma export is highly likely to cause visual mismatches; requested multiple approaches with visual verification
- **Sources**: Codebase analysis of `packages/capturer`, `packages/comparator`, `packages/cli`, `packages/plugin`
- **Findings**:
  - **`figma-dsl pipeline`**: Full pipeline command already exists — compile DSL→render PNG→capture React screenshot→pixel-diff compare. Returns exit code 0 (pass) or 1 (fail).
  - **`packages/capturer`**: Playwright-based screenshot capture via `captureUrl(url, outputPath, options)`. Supports viewport, CSS selector, device scale. Captures from any URL including `localhost` dev servers.
  - **`packages/comparator`**: Pixel-diff via pixelmatch library. Default 95% similarity threshold. Produces diff PNG highlighting mismatches. Handles dimension mismatches by padding smaller image.
  - **`figma-dsl capture-figma`**: Captures screenshots from Figma REST API using file key, token, and node ID map. Enables post-import verification.
  - **`figma-dsl batch-compare`**: Compares directories of DSL renders vs Figma captures. Produces JSON report and Markdown summary.
  - **`packages/plugin`**: Figma plugin imports `PluginInput` JSON, creates native Figma nodes (FRAME, TEXT, RECTANGLE, ELLIPSE, COMPONENT, COMPONENT_SET, INSTANCE), supports auto-layout, component properties, and auto-export to PNG. Does NOT update existing components — creates new ones each import.
  - **`figma-dsl calibrate`**: Full calibration orchestration command combining generate→compile→render→capture→compare.
- **Implications**:
  - Three approaches map naturally to existing tooling: (A) MCP direct publish, (B) plugin JSON import, (C) pipeline verify-then-import
  - Approach C uses `figma-dsl pipeline` for pre-import verification, then `capture-figma` + `batch-compare` for post-import verification
  - The 95% default threshold is configurable via `-t` flag — users can set stricter thresholds for high-fidelity requirements
  - The iteration loop for Approach C: compile→render→capture→compare→if fail: adjust DSL→repeat
  - Post-import verification via `capture-figma` + `batch-compare` works for both Approach B and C

### Anthropic skill-creator — Skill Authoring Methodology
- **Context**: User requested using the `skill-creator` from the Anthropic skills repository for better skill quality
- **Sources**: [skill-creator on GitHub](https://github.com/anthropics/skills/tree/main/skills/skill-creator), [skill-creator SKILL.md](https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md)
- **Findings**:
  - **Core workflow**: intent capture → skill drafting → testing → evaluation → improvement → repeat
  - **Progressive disclosure**: 3-level loading system — (1) Metadata (name+description, ~100 words, always in context), (2) SKILL.md body (<500 lines, loaded on trigger), (3) Bundled resources (loaded on demand, unlimited size)
  - **Description optimization**: Descriptions should be "pushy" — include both what the skill does AND specific trigger contexts. Claude tends to "undertrigger" skills, so descriptions need explicit trigger phrases and near-miss coverage
  - **Eval infrastructure**: `evals/evals.json` for test cases, `eval-viewer/generate_review.py` for HTML review UI, grading via assertions, benchmarking with `benchmark.json`
  - **Skill anatomy**: `SKILL.md` (required), optional `scripts/` (deterministic helpers), `references/` (docs loaded as needed), `assets/` (templates, icons)
  - **Writing style**: Explain "why" over rigid MUSTs. Use imperative form. Make instructions general, not overfitted to examples. Remove instructions that don't pull their weight.
  - **Bundled scripts pattern**: If all test runs independently write similar helper scripts, bundle that script into the skill's `scripts/` directory
  - **Description optimization script**: `scripts/run_loop.py` tests 20 trigger queries (mix of should/shouldn't trigger) and iterates descriptions up to 5 times using 60/40 train/test split
  - **Eval schemas**: `evals.json` (prompts+assertions), `grading.json` (pass/fail+evidence), `benchmark.json` (timing+tokens+pass_rate), `comparison.json` (blind A/B), `analysis.json` (patterns)
- **Implications**:
  - Install skill-creator as a git submodule under `references/skill-creator/` for access to eval infrastructure and scripts
  - Use skill-creator's eval loop during implementation: draft each skill → test with 2-3 prompts → evaluate → iterate
  - Follow progressive disclosure: keep SKILL.md <500 lines, put detailed reference docs in `references/` subdirectories
  - Make descriptions "pushy" with comprehensive trigger phrases and near-miss coverage
  - Bundle deterministic helper scripts (e.g., validation wrappers, preview launchers) in `scripts/` within each skill
  - Run description optimization via `run_loop.py` after each skill is functionally complete
  - Adopt eval infrastructure: `evals/evals.json` per skill for regression testing

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Skills as Pure Docs | SKILL.md instructs Claude, no tooling | Low complexity | No programmatic validation, inconsistent outputs | v1 approach |
| Skills + Validator Package | Add `@figma-dsl/validator` for React→DSL checks | Deterministic validation, AI iteration loop | New package to maintain | Selected approach |
| Skills + Full Package Suite | Add validator + html-renderer + token-resolver | Maximum determinism | Over-engineering for skill workflow | Rejected — Vite handles HTML/tokens |

**Selected**: Skills + Validator Package + Figma MCP. Skills provide workflow documentation, `@figma-dsl/validator` enables programmatic React→DSL compatibility checks, Figma MCP server handles auto-publishing.

## Design Decisions

### Decision: Preview App as Vite Scaffold at `preview/`
- **Context**: Skills need a writable directory with Vite+React for preview rendering
- **Alternatives Considered**:
  1. `packages/preview-app/` — monorepo package
  2. `preview/` — standalone directory at repo root
  3. User's own project directory — write into arbitrary locations
- **Selected Approach**: `preview/` at repo root with Vite config that aliases reference components
- **Rationale**: Not a publishable package. Keeps skill output isolated. Simple `cwd` in launch.json.
- **Trade-offs**: Extra directory, but clearly separated from source packages
- **Follow-up**: Verify Vite hot-reload for dynamically added files

### Decision: HTML Export via Vite Build + Single File Plugin
- **Context**: Requirement 5 needs self-contained HTML output
- **Alternatives Considered**:
  1. Custom SSR with `react-dom/server` + CSS extraction
  2. Vite build + `vite-plugin-singlefile`
  3. Claude-constructed HTML from scratch
- **Selected Approach**: Vite build with `vite-plugin-singlefile`
- **Rationale**: Vite handles CSS Modules, design tokens, and asset bundling natively. No custom SSR code to maintain.
- **Trade-offs**: Requires preview app scaffold; build step takes a few seconds
- **Follow-up**: Test with lucide-react icons (SVG inlining)

### Decision: Figma Auto-Publishing via MCP Server
- **Context**: User requested automatic design publishing to Figma without manual plugin import
- **Alternatives Considered**:
  1. Figma REST API — read-only, cannot create files
  2. Figma Plugin API — requires running inside Figma editor
  3. Figma MCP server `generate_figma_design` — remote write to Figma from Claude Desktop
- **Selected Approach**: Primary path: MCP `generate_figma_design` for direct Figma publishing. Fallback: plugin JSON import via existing exporter pipeline.
- **Rationale**: MCP server is the only external write path to Figma. No server-side code needed — Claude Desktop handles MCP communication. Exempt from rate limits.
- **Trade-offs**: Requires Figma MCP server configured in Claude Desktop; remote-only (not local MCP). Fallback plugin path covers cases where MCP is unavailable.
- **Follow-up**: Document MCP server setup in skill instructions. Test `generate_figma_design` with component hierarchies.

### Decision: New `@figma-dsl/validator` Package for DSL Compatibility
- **Context**: User requested validation enabling AI-driven iteration — Claude creates component, validates, fixes, repeats until valid
- **Alternatives Considered**:
  1. Validation logic embedded in SKILL.md instructions — Claude checks manually
  2. Extend existing compiler with pre-compilation checks
  3. New standalone validator package with CLI command
- **Selected Approach**: New `@figma-dsl/validator` package with both programmatic API and CLI command (`figma-dsl validate`)
- **Rationale**: Separates validation concerns from compilation. Enables programmatic validation in skill iteration loops. Follows existing monorepo pattern (`packages/validator`). CLI integration means skills can run `figma-dsl validate <file>` and parse structured output.
- **Trade-offs**: New package to maintain. But validation logic is distinct from compilation and benefits from isolation.
- **Follow-up**: Define validation rule set. Determine if rules are configurable or fixed.

### Decision: Three Figma Design Approaches with User Choice
- **Context**: DSL→Figma export causes visual mismatches. Users need flexibility to choose their preferred approach based on speed, fidelity, and available tooling.
- **Alternatives Considered**:
  1. Single approach (MCP only) — simplest but no fallback, no visual verification
  2. Two approaches (MCP + plugin) — good coverage but no fidelity verification
  3. Three approaches (MCP + plugin + visual fidelity pipeline) — maximum flexibility
- **Selected Approach**: Three approaches with the skill guiding user selection based on context
- **Rationale**: The project already has the full pipeline infrastructure (capturer, comparator, `pipeline` command). Adding it as Approach C costs no new code — only skill instructions. Users with strict visual requirements get a verify-before-import flow, while those prioritizing speed can use MCP or plugin directly.
- **Trade-offs**: More complex skill instructions. But the skill presents trade-offs upfront and guides selection, so complexity is managed.
- **Follow-up**: Determine if the skill should auto-detect MCP availability and narrow to available approaches.

### Decision: Use skill-creator Methodology and Eval Infrastructure
- **Context**: User requested using Anthropic's skill-creator for better skill quality
- **Alternatives Considered**:
  1. Write SKILL.md files manually based on existing magi-docs-writer pattern
  2. Copy skill-creator patterns without tooling
  3. Install skill-creator as submodule and use its full eval infrastructure
- **Selected Approach**: Install skill-creator as a reference submodule, adopt its writing patterns (progressive disclosure, pushy descriptions, imperative instructions), and use its eval infrastructure (`evals/evals.json`, grading, benchmarking) for quality assurance during implementation
- **Rationale**: skill-creator provides a proven, battle-tested methodology from Anthropic. The eval infrastructure enables measurable skill quality. Progressive disclosure keeps SKILL.md files focused and fast-loading. Description optimization ensures reliable triggering.
- **Trade-offs**: Additional submodule dependency. Eval infrastructure is optional but valuable. Python scripts for `run_loop.py` and `generate_review.py` require Python 3.
- **Follow-up**: Run description optimization for each skill after functional completion. Create 2-3 eval test cases per skill.

### Decision: Reference Components via Vite Alias
- **Context**: Skills need access to the 16 reference components
- **Selected Approach**: Vite `resolve.alias` — `@/components` resolves to reference app's `src/components/`
- **Rationale**: Avoids duplication, reference stays canonical

### Decision: Component Registry as Shared Markdown Reference
- **Context**: Requirement 6 needs a component catalog accessible to all skills
- **Selected Approach**: Markdown reference document under `.claude/skills/shared/references/component-registry.md`
- **Rationale**: Skills read markdown references naturally. No build step. Human-readable.
- **Trade-offs**: Manual maintenance (Component Creation Skill updates it per 6.5)

## Risks & Mitigations
- **Risk**: Figma MCP server is remote-only and may not be configured in all Claude Desktop environments → Mitigation: Plugin JSON import as fallback; skill documents both paths
- **Risk**: `generate_figma_design` input format may not map 1:1 to existing exporter JSON → Mitigation: Skill instructs Claude to use preview app's rendered output for MCP publishing (not raw JSON)
- **Risk**: Validator rules may be too strict/loose for AI iteration → Mitigation: Start with core rules (CSS Modules, tokens, prop patterns); extend based on usage feedback
- **Risk**: Vite hot-reload may not pick up newly added files → Mitigation: Skill instructs Claude to restart dev server if needed
- **Risk**: Code Connect requires valid FIGMA_URL that doesn't exist pre-publish → Mitigation: MCP's `add_code_connect_map` establishes mappings after design is published
- **Risk**: Design token CSS custom properties may not resolve identically across DSL and React → Mitigation: Token reference provides mapping table; validator checks token references
- **Risk**: Skill descriptions may not trigger reliably across varied user phrasings → Mitigation: Run skill-creator's description optimization (`run_loop.py`) with 20 trigger eval queries per skill
- **Risk**: Visual fidelity pipeline (Approach C) may be too slow for iterative workflows → Mitigation: Approach A (MCP) and B (plugin) available as faster alternatives; pipeline comparison typically completes in seconds
- **Risk**: Plugin creates new components on each import (no update) → Mitigation: Document in skill that re-imports create duplicates; user should delete old components before re-importing

## References
- [Figma MCP Server Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Figma MCP Tools & Prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma REST API](https://developers.figma.com/docs/rest-api/)
- [Figma API Comparison](https://developers.figma.com/compare-apis/)
- [Figma Code Connect React Docs](https://developers.figma.com/docs/code-connect/react/)
- [Figma Plugin API — createComponent](https://www.figma.com/plugin-docs/api/properties/figma-createcomponent/)
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Claude Code Desktop / Preview](https://code.claude.com/docs/en/desktop)
- [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)
- [Vite Build Docs](https://vite.dev/guide/build)
- [Anthropic skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [skill-creator SKILL.md](https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md)
