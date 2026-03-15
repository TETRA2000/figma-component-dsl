# User Guides

Figma Component DSL lets you define Figma components in code, render them as images, compare against React screenshots, and export to Figma — all without opening the Figma UI.

These guides cover the workflows available to **developers** and **designers** working with the DSL pipeline.

## Where to Start

| If you are...                          | Start here                                                |
|----------------------------------------|-----------------------------------------------------------|
| A developer new to the project         | [Getting Started (Developer)](getting-started-developer.md) |
| A designer who works with this system  | [Getting Started (Designer)](getting-started-designer.md)   |
| Curious about the pipeline and terms   | [Core Concepts](concepts.md)                               |

## Common Questions

| Question                                                        | Guide                                                         |
|-----------------------------------------------------------------|---------------------------------------------------------------|
| How do I create a new React component?                          | [Creating Components](creating-components.md)                 |
| How do I build a landing page from existing components?         | [Composing Pages](composing-pages.md)                         |
| How do I push my components to Figma?                           | [Exporting to Figma](exporting-to-figma.md)                   |
| A designer changed my component — how do I get those changes?   | [Syncing Design Changes](syncing-design-changes.md)           |
| How do I check that code and design still match?                | [Syncing Design Changes](syncing-design-changes.md)           |
| How do I test the rendering pipeline for accuracy?              | [Calibrating the Pipeline](calibrating-the-pipeline.md)       |
| How do I stress-test and find pipeline bugs?                    | [Dogfooding](dogfooding.md)                                   |

## All Guides

### Foundations
- [Core Concepts](concepts.md) — pipeline architecture, component patterns, design tokens, glossary

### Getting Started
- [For Developers](getting-started-developer.md) — install, preview, validate, first component
- [For Designers](getting-started-designer.md) — plugin, Code Connect, changeset overview

### Workflows
- [Creating Components](creating-components.md) — scaffold React components with DSL compatibility
- [Composing Pages](composing-pages.md) — build pages from registered section components
- [Exporting to Figma](exporting-to-figma.md) — three approaches: MCP, Plugin, Pipeline
- [Syncing Design Changes](syncing-design-changes.md) — apply changesets and verify visual fidelity
- [Calibrating the Pipeline](calibrating-the-pipeline.md) — test suite generation, batch render, root cause triage
- [Dogfooding](dogfooding.md) — themed stress testing with pipeline-first investigation

## Reference Documentation

These existing docs cover the technical details:

- [DSL API Reference](../dsl-reference.md) — complete DSL node constructors, layout helpers, and styling API
- [Package Documentation](../packages/) — detailed API docs for each pipeline package (compiler, renderer, exporter, etc.)
- [Rendering History](../history/) — logs from calibration and dogfooding runs
