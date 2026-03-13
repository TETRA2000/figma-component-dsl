# figma-component-dsl

AI-DLC and Spec-Driven Development for Figma component DSL.

## References

Reference implementations used for research and specification development:

- **figma_design_playground** — React 19 + TypeScript component library with 16 landing page components and Figma Code Connect integration. Includes a Figma plugin that programmatically generates matching design components.
- **figma-html-renderer** — Python CLI tool that converts Figma `.fig` files into interactive HTML pages via a five-stage pipeline (Parse, Tree, Classify, Render, Output) using PyCairo for rasterization.

See `references/` for the full source of each project.

## Documentation

MAGI consensus-generated documentation for each reference project:

- [`docs/figma_design_playground.md`](docs/figma_design_playground.md) — Architecture, component APIs, Figma integration workflow, design tokens, and known gaps.
- [`docs/figma-html-renderer.md`](docs/figma-html-renderer.md) — Pipeline architecture, CLI reference, classification system, security considerations, and performance characteristics.

Documentation was generated using a multi-agent consensus system (3 independent analysts + 3 validators per project) for high-confidence, verified results.