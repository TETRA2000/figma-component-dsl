# Product Overview

A domain-specific language (DSL) for defining Figma component structures declaratively in code. It bridges the gap between React component development and Figma's internal data model, enabling rapid visual iteration without opening the Figma UI.

## Core Capabilities

1. **Declarative Component Definition** — Define Figma nodes (FRAME, TEXT, RECTANGLE, ELLIPSE, GROUP) using a structured DSL with auto-layout, colors, typography, and variants
2. **Visual Rendering** — Render DSL definitions to PNG images for inspection and comparison
3. **React Screenshot Capture** — Capture React component screenshots via headless browser for side-by-side comparison
4. **Visual Comparison** — Image diff with similarity scoring between DSL-rendered and React-rendered outputs
5. **Figma Export** — Parse DSL and create real Figma nodes via a Figma plugin

## Target Use Cases

- **Figma-free iteration**: Developers define and refine component structures in code, render to images, compare against live React components, and iterate — all without Figma's UI
- **Design system synchronization**: Keep React component libraries and Figma design systems in sync programmatically
- **Automated component generation**: Generate Figma components from React code via DSL as an intermediate representation
- **Claude Desktop interactive workflows**: AI Skills enable conversational creation of landing pages, React components, Figma designs, and HTML pages with live preview

## Value Proposition

- **Speed**: Code-based iteration is faster than manual Figma manipulation for developers
- **Automation**: Programmatic generation eliminates manual duplication between code and design
- **Fidelity**: DSL maps directly to Figma's data model (auto-layout, component sets, variants, design tokens)
- **Pipeline**: CLI-driven workflow (`figma-dsl` with 11 commands: compile, render, capture, compare, export, pipeline, batch, batch-compare, calibrate, generate-test-suite, capture-figma) integrates into development toolchains
- **AI-assisted**: Claude AI Skills provide guided, conversational workflows for component and page creation with live preview

## Reference Implementations

Two working projects inform the DSL design (available as submodules in `references/`):

- **figma_design_playground** — React 19 component library with 16 production components, a Figma plugin for programmatic component creation, and Code Connect bindings. Demonstrates the target workflow end-to-end.
- **figma-html-renderer** — Python CLI that converts `.fig` files to HTML via a 5-stage pipeline using PyCairo. Demonstrates Figma binary format parsing and rendering techniques.

MAGI consensus documentation for both is in `docs/`.

---
_Focus on patterns and purpose, not exhaustive feature lists_
