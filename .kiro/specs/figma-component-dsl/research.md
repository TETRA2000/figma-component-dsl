# Research & Design Decisions

## Summary
- **Feature**: figma-component-dsl
- **Discovery Scope**: New Feature (greenfield) — major architectural revision from v1 design
- **Key Findings**:
  - Figma's own plugin architecture uses a membrane/adapter pattern to bridge sandboxed VM and host environment — validates our dual-environment adapter approach
  - The DSL-as-Plugin-API-code approach eliminates the Exporter translation layer entirely; DSL code runs directly in both environments through a shared interface
  - Claude Code skills follow the Agent Skills open standard with SKILL.md files; the AI React-to-DSL generator fits naturally as a project skill invocable via `/react-to-dsl`

## Research Log

### Figma Node Data Model (from figma-html-renderer)
- **Context**: Understanding the intermediate representation that the DSL must compile to
- **Sources**: `references/figma-html-renderer/src/figma_html_renderer/renderer.py`, `tree_builder.py`
- **Findings**:
  - Nodes are dictionaries with fields: `guid` (tuple: sessionID, localID), `type`, `name`, `size` ({x, y}), `transform` (3×3 affine matrix), `fillPaints` (array of paint objects), `children`, `parentIndex` ({guid, position}), `opacity`, `visible`, `clipContent`, `cornerRadius`
  - Text nodes add: `textData` ({characters, lines}), `derivedTextData` ({baselines, fontMetaData}), `fontSize`, `fontFamily`
  - Fill types: SOLID ({type, color: {r,g,b,a}, opacity, visible}), IMAGE ({type, image: {hash}, opacity, visible})
  - Colors use 0.0–1.0 float range (not 0–255)
  - Transform format: `[[a, c, tx], [b, d, ty], [0, 0, 1]]` — converts to Cairo Matrix(a, b, c, d, tx, ty)
  - Supported render types: FRAME, COMPONENT, COMPONENT_SET, INSTANCE, RECTANGLE, ROUNDED_RECTANGLE, ELLIPSE, TEXT, VECTOR
- **Implications**: The Compiler must produce node dictionaries in this exact format. Auto-layout must be resolved to absolute transforms before rendering.

### Figma Plugin API Patterns (from figma_design_playground)
- **Context**: Understanding the Figma Plugin API patterns that become the DSL vocabulary
- **Sources**: `references/figma_design_playground/figma-plugin/code.ts` (1,646 lines), Figma Plugin API docs
- **Findings**:
  - **Color helpers**: `hexToRGB(hex)` converts `#RRGGBB` to `{r, g, b}` in 0–1 range; `solidPaint(hex)` creates `{type: 'SOLID', color}`; `gradientPaint(stops, angle)` creates `{type: 'GRADIENT_LINEAR', gradientStops, gradientTransform}` with rotation matrix
  - **setAutoLayout()** accepts: `direction` (HORIZONTAL|VERTICAL), `spacing`, `padX`/`padY`/`padTop`/`padBottom`/`padLeft`/`padRight`, `align` (MIN|CENTER|MAX → primaryAxisAlignItems), `counterAlign` (MIN|CENTER|MAX → counterAxisAlignItems), `sizing`/`widthSizing`/`heightSizing` (FIXED|HUG|FILL)
  - **createText()** is async (requires `figma.loadFontAsync`), maps font weight to Inter font styles
  - **Component properties**: `addComponentProperty(name, type, defaultValue)` with types TEXT, BOOLEAN, INSTANCE_SWAP
  - **Variant naming**: Components named `Key=Value, Key=Value` then combined with `figma.combineAsVariants(components, parent)`
  - **Instance creation**: `component.createInstance()` then override properties
- **Implications**: These exact function signatures and patterns become the DSL's public API. The DSL runtime provides either virtual or real implementations depending on execution environment.

### Figma Plugin Sandbox Architecture (Membrane Pattern)
- **Context**: Validating the dual-environment adapter approach for DSL execution
- **Sources**: Figma engineering blog "How we built the Figma plugin system", Figma Plugin API docs
- **Findings**:
  - Figma uses a "membrane pattern" to bridge sandboxed plugin VM and host environment
  - Node properties are proxied via getters/setters that translate between VM and internal objects (~500 LOC bridge)
  - Plugins run in a QuickJS sandbox compiled to WebAssembly for security
  - The dual-context architecture (worker sandbox + UI iframe via postMessage) is the standard plugin execution model
- **Implications**: Our adapter pattern mirrors Figma's own architecture. In our case, the "membrane" is the `FigmaApi` interface: one side delegates to virtual node construction, the other to real Figma API calls. This is a proven pattern at Figma's own scale.

### PyCairo Rendering Capabilities
- **Context**: Evaluating the rendering engine for DSL-to-PNG conversion
- **Sources**: PyCairo docs, figma-html-renderer renderer.py
- **Findings**:
  - PyCairo renders to PNG via `ImageSurface` with `FORMAT_ARGB32`
  - Supports: rectangles, ellipses, rounded rectangles, text, clipping, transform matrices, alpha compositing
  - No built-in auto-layout — positions must be pre-computed
  - Gradient rendering is NOT implemented in figma-html-renderer (identified gap)
- **Implications**: Gradient fill support must be added. Auto-layout computation happens in the Compiler.

### Playwright Screenshot & pixelmatch Comparison
- **Context**: Evaluating screenshot capture and image comparison tools
- **Sources**: Playwright docs, pixelmatch GitHub repo
- **Findings**:
  - Playwright `element.screenshot()` captures specific DOM elements as PNG with configurable viewport
  - pixelmatch: `pixelmatch(img1, img2, output, width, height, options)` returns mismatched pixel count
  - Both images must be same dimensions — may need resize/padding step
- **Implications**: Satisfies Requirements 7 and 8. Can be invoked from TypeScript CLI.

### Claude Code Skills System (for AI React-to-DSL Generator)
- **Context**: Designing the AI skill architecture for Requirement 11
- **Sources**: Claude Code docs (code.claude.com/docs/en/skills), community best practices
- **Findings**:
  - Skills defined via `SKILL.md` files with YAML frontmatter (name, description, triggers) and markdown body (instructions)
  - Stored in `.claude/skills/` (project-level) or `~/.claude/skills/` (global)
  - Best practices: be directive not conversational, include output format, add examples, keep under 500 words, one skill per workflow
  - Skills can launch subagents for parallel analysis (up to 10 simultaneous)
  - The skill description budget scales at 2% of context window
- **Implications**: The React-to-DSL generator fits as a project skill at `.claude/skills/react-to-dsl/SKILL.md`. The skill instructs Claude to read a React component, analyze its structure/styles/props, and generate DSL code using the Figma Plugin API patterns. Code Connect stubs are generated alongside.

### opentype.js for Text Measurement
- **Context**: Font metric lookup for auto-layout HUG sizing in the Compiler
- **Sources**: opentype.js docs
- **Findings**:
  - Parses .otf/.ttf files, provides per-glyph advance widths with GPOS/GSUB kerning
  - Runs in Node.js (TypeScript), no system font dependency when fonts are bundled
  - Minor width discrepancies vs PyCairo (< 1px per glyph)
- **Implications**: Keeps single-pass pipeline intact. Inter font files bundled for offline measurement.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Adapter with Pipeline | Shared FigmaApi interface with Virtual and Plugin adapters; Virtual path feeds into compilation pipeline | DSL code IS plugin code, zero translation overhead in Figma, dual-environment from single codebase | Adapter interface must stay in sync with Figma API subset | **Selected** — maximizes code reuse between environments |
| Pipeline with AST Core (v1) | Custom factory functions → AST → Compiled nodes → Exporter → Plugin input | Clear separation, proven pipeline pattern | Requires translation layer (Exporter), custom API deviates from Figma API | Previous design, replaced by adapter approach |
| Monolithic Single-Language | All TypeScript or all Python | Simpler deployment | Loses either TypeScript type safety or PyCairo rendering | Rejected |

## Design Decisions

### Decision: Adapter Pattern — DSL as Figma Plugin API Code
- **Context**: Requirement 1 specifies that DSL code should use Figma Plugin API patterns and run directly in a Figma plugin without a translation layer
- **Alternatives Considered**:
  1. Custom factory functions with Exporter translation (v1 design) — requires maintaining two parallel APIs
  2. Figma Plugin API adapter with virtual/real implementations — single API, dual environments
  3. Code generation (emit Figma plugin code from DSL AST) — complex, fragile
- **Selected Approach**: Adapter pattern with a `FigmaApi` interface providing `createFrame()`, `createText()`, `createRectangle()`, `createEllipse()`, `createComponent()`, `createGroup()` methods. Two implementations: `VirtualFigmaApi` (produces virtual node trees for offline rendering) and real Figma Plugin API (direct delegation in plugin environment). Helper functions (`setAutoLayout()`, `solidPaint()`, `gradientPaint()`, `hexToRGB()`) are pure data transforms shared between both environments.
- **Rationale**: Users write one codebase that runs everywhere. The same `setAutoLayout(frame, { direction: 'HORIZONTAL', spacing: 8 })` call works both offline and in Figma. No translation step, no format mismatch, no API divergence.
- **Trade-offs**: The `FigmaApi` interface must be kept in sync with the Figma Plugin API subset we support. Not all Figma API features are covered (scoped to requirements). Virtual nodes must faithfully simulate the Plugin API's property assignment behavior.
- **Follow-up**: Define the exact subset of Figma Plugin API properties that the adapter covers. Test that identical DSL code produces equivalent results in both environments.

### Decision: Eliminate Exporter — Plugin Executes DSL Code Directly
- **Context**: Requirement 9 specifies direct DSL execution in Figma plugin, no translation step
- **Alternatives Considered**:
  1. Keep Exporter that generates PluginInput JSON (v1 design) — extra component, extra format
  2. Bundle DSL code for direct execution in plugin environment — simpler, fewer moving parts
- **Selected Approach**: The CLI `bundle` command packages DSL definition files into a single JS bundle (via esbuild) that the Figma plugin loads and executes. In the plugin environment, the DSL's `createFrame()` calls delegate directly to `figma.createFrame()`.
- **Rationale**: Eliminates the Exporter component entirely. Reduces the number of intermediate formats. Users debug one codebase, not two representations.
- **Trade-offs**: The plugin must load and execute arbitrary DSL code, which requires error isolation. Mitigated by wrapping execution in try/catch with per-node error reporting via `figma.notify()`.

### Decision: AI React-to-DSL Skill via Claude Code Skills System
- **Context**: Requirement 11 specifies an AI-powered tool to generate DSL from React components
- **Alternatives Considered**:
  1. Standalone CLI tool with AST parsing — limited to structural analysis, misses design intent
  2. Claude Code skill — leverages LLM understanding of both React patterns and Figma API semantics
  3. Figma MCP tool integration — would require Figma context, not needed for code-to-code translation
- **Selected Approach**: A Claude Code project skill at `.claude/skills/react-to-dsl/SKILL.md` that instructs Claude to analyze React component source, CSS, and props, then generate DSL code and Code Connect stubs.
- **Rationale**: LLM excels at the semantic mapping between React patterns (flexbox → Auto Layout, CSS colors → solidPaint, prop variants → COMPONENT_SET). Deterministic AST parsing would miss design intent and require extensive heuristics. The skill system provides a natural invocation point (`/react-to-dsl`) integrated into the developer workflow.
- **Trade-offs**: Output quality depends on the LLM's understanding; generated code needs human review. Mitigated by generating `// TODO:` comments for uncertain mappings and by the visual comparison loop (render DSL → compare → iterate).

### Decision: Shared DSL Type Hierarchy for Cross-Environment Compatibility
- **Context**: DSL code must type-check against both VirtualFigmaApi (offline) and Figma Plugin API (in-plugin). These are different type systems — `@figma/plugin-typings` defines `FrameNode`, VirtualFigmaApi defines `VirtualFrameNode`.
- **Alternatives Considered**:
  1. Make VirtualNode explicitly implement `@figma/plugin-typings` interfaces — tight coupling to Figma's full API, many unused properties
  2. Use `any` or type assertions — unsafe, violates project standards
  3. Define shared DSL type hierarchy (`DslFrameNode`, etc.) that both implementations satisfy via structural typing
- **Selected Approach**: Shared DSL types in `packages/dsl-core/types.ts`. `DslFrameNode` is a strict subset of Figma's `FrameNode`. `VirtualFrameNode` implements `DslFrameNode`. Figma's `FrameNode` satisfies `DslFrameNode` structurally (TypeScript structural typing, no `implements` needed). DSL code targets `DslFrameNode`.
- **Rationale**: Decouples DSL from the full Figma Plugin API surface. Only the properties used by the DSL are in scope. TypeScript's structural typing guarantees compatibility without runtime overhead.
- **Trade-offs**: DSL users cannot access Figma-only properties (e.g., `effects`, `constraints`) through DSL types. This is intentional — the DSL covers the component definition subset only.

### Decision: Async `createText()` for Unified Font-Loading Semantics
- **Context**: In the Figma Plugin API, text node creation requires `figma.loadFontAsync()` before setting `characters` or font properties. In virtual mode, no font loading is needed. This asymmetry would cause DSL code that works offline to fail in the plugin.
- **Alternatives Considered**:
  1. Sync `createText()` in both environments, plugin pre-scans and pre-loads all fonts — requires AST analysis of DSL code, complex and fragile
  2. Async `createText()` in both environments — uniform API, plugin shim loads font before returning node
  3. Separate async wrapper for plugin only — breaks "same code" promise
- **Selected Approach**: `createText()` returns `Promise<DslTextNode>` in both environments. Virtual implementation resolves immediately. Plugin shim loads Inter Regular before returning. Additional font weights loaded on demand via property setters.
- **Rationale**: DSL code always uses `const text = await createText()` — works identically in both environments. The async overhead in virtual mode is negligible (immediate Promise resolution). This is the simplest approach that maintains the "same code" guarantee.
- **Trade-offs**: All DSL entry point functions that call `createText()` must be async. This is acceptable since component builders are naturally async (matching the reference plugin pattern).

### Decision: Explicit `combineAsVariants` and `createInstance` Virtual Behavior
- **Context**: `combineAsVariants()` and `createInstance()` have complex behavior in the Figma Plugin API that must be faithfully simulated in virtual mode.
- **Selected Approach**: Define explicit postconditions for both methods. `combineAsVariants(components, parent)` creates a `DslComponentSetNode`, reparents input components as children, validates `Key=Value` naming. `createInstance()` creates a `DslInstanceNode` with `mainComponent` back-pointer and inherited default properties.
- **Rationale**: Without specified behavior, implementers may interpret differently, causing inconsistent rendering vs. Figma output. Explicit postconditions serve as both documentation and test specifications.

### Decision: Two-Pass Layout Algorithm (preserved from v1)
- **Context**: Auto-layout resolution requires both bottom-up measurement and top-down positioning
- **Selected Approach**: Two-pass algorithm: Pass 1 bottom-up measurement, Pass 2 top-down positioning
- **Rationale**: Standard approach for single-axis flex layout (CSS Flexbox, Flutter, Yoga). Cleanly separates measurement from positioning.

### Decision: opentype.js for Text Measurement (preserved from v1)
- **Context**: Compiler must know text node dimensions for HUG-contents sizing
- **Selected Approach**: opentype.js 2.0+ for in-process font metric lookup
- **Rationale**: Keeps single-pass pipeline intact. Bundled Inter font files ensure offline measurement.

### Decision: Counter-Based GUID Generation (preserved from v1)
- **Context**: Each node needs a unique GUID in the Figma data model
- **Selected Approach**: Counter-based with sessionID=0, auto-incrementing localID
- **Rationale**: Deterministic output enables snapshot testing.

### Decision: Cross-Language Environment Management (preserved from v1)
- **Context**: System spans TypeScript and Python
- **Selected Approach**: CLI preflight checks with `figma-dsl doctor` command
- **Rationale**: Minimal overhead, actionable diagnostics.

## Risks & Mitigations
- **Figma API surface drift** — Figma Plugin API may change, requiring adapter updates → Pin to supported Figma Plugin API version; adapter covers only the subset used by DSL
- **Auto-layout fidelity** — DSL layout may not match Figma's exact pixel calculations → Two-pass layout algorithm verified against worked examples; visual comparison tests
- **Text measurement accuracy** — opentype.js may differ from PyCairo by < 1px per glyph → Threshold-based visual comparison (default 95%)
- **Gradient rendering gap** — figma-html-renderer lacks gradient support → Must implement in Python renderer
- **AI skill output quality** — Generated DSL may not perfectly represent React components → `// TODO:` comments for uncertain mappings; visual comparison loop for iteration; human review expected
- **Cross-language error propagation** — Python subprocess errors may be opaque → Structured error JSON format

## References
- [Figma Plugin API Reference](https://www.figma.com/plugin-docs/api/api-reference/) — Official API docs
- [How Figma built the plugin system](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/) — Membrane pattern, sandbox architecture
- [Figma Plugin API Node Types](https://www.figma.com/plugin-docs/api/nodes/) — Node type hierarchy
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills) — Skill system, SKILL.md format
- [pixelmatch](https://github.com/mapbox/pixelmatch) — Pixel-level image comparison
- [Playwright Screenshots](https://playwright.dev/docs/test-snapshots) — Visual comparison
- [PyCairo](https://pycairo.readthedocs.io/) — Python bindings for Cairo
- [opentype.js](https://opentype.js.org/) — JavaScript font parser for text measurement
