# Exporting to Figma

Audience: Both developers and designers

This guide covers how to get your React components into Figma. There are three approaches depending on your setup.

## When to Use This Workflow

Use this when your React components are ready and you want them available as real Figma components with proper variants, properties, and Code Connect bindings.

## Choosing an Approach

```
Do you have the Figma MCP server?
  |
  +-- Yes --> Approach A (MCP) — fully automated
  |
  +-- No ---> Do you have the Figma plugin installed?
                |
                +-- Yes --> Approach B (Plugin) — semi-automated
                |
                +-- No ---> Approach C (Pipeline) — manual with pixel verification
```

## Approach A: MCP (Fully Automated)

Best when you have the Figma MCP server configured. This is the most streamlined path.

**Steps:**

1. **Compile** the component to DSL JSON
2. **Export** the JSON in Figma plugin format
3. **Generate** the Figma design via MCP (`generate_figma_design`)
4. **Connect** the code via MCP (`add_code_connect_map`)
5. **Update** the `.figma.tsx` file with the real Figma URL (replacing the placeholder)
6. **Verify** via MCP (`get_code_connect_suggestions`)

The Claude AI skill `/export-to-figma` automates this entire sequence.

## Approach B: Plugin (Semi-Automated)

Best when you have the Figma plugin installed but not the MCP server.

**Steps:**

1. **Compile and export** to plugin JSON:
   ```bash
   bin/figma-dsl compile my-component.dsl.ts -o output/compiled.json
   bin/figma-dsl export output/compiled.json -o output/plugin-input.json
   ```
2. **Import in Figma** — open the Figma plugin, paste or load the JSON file
3. **Get the Figma URL** — copy the node URL from Figma after import
4. **Update Code Connect** — replace the placeholder URL in your `.figma.tsx` file with the real Figma URL

Run `figma-dsl compile --help` and `figma-dsl export --help` for all options.

## Approach C: Pipeline (Manual with Pixel Verification)

Best when you want to verify pixel-perfect fidelity between the DSL render and the Figma result.

**Steps:**

1. **Compile** the DSL file to JSON
2. **Render** the JSON to PNG for visual inspection
3. **Import** into Figma (via plugin or MCP)
4. **Capture** the Figma component as a PNG
5. **Compare** the DSL render against the Figma capture:
   ```bash
   bin/figma-dsl compare dsl-render.png figma-capture.png -d diff.png
   ```
6. **Iterate** until the similarity score meets your threshold (typically >= 95%)

Run `figma-dsl compare --help` for threshold and diff output options.

## Component Sets and Variants

If your component has variant props (e.g., `variant`, `size`), you **must** use `componentSet()` in the DSL file — not `component()`. Each variant combination becomes a named child:

```
"Variant=Primary, Size=Small"
"Variant=Primary, Size=Medium"
"Variant=Secondary, Size=Small"
"Variant=Secondary, Size=Medium"
```

Using `component()` for a component with variants will create a standalone Figma component instead of a component set, losing the variant switching behavior.

## Updating Code Connect After Import

After importing into Figma, update the placeholder URL in your `.figma.tsx` file:

```tsx
// Before
figma.connect(Button, 'https://www.figma.com/design/PLACEHOLDER', { ... })

// After
figma.connect(Button, 'https://www.figma.com/design/ABC123/file?node-id=5:1229', { ... })
```

This links Figma's Dev Mode to the correct code implementation.

## What's Next

- [Syncing Design Changes](syncing-design-changes.md) — apply Figma edits back to code
- [Creating Components](creating-components.md) — if you need to build a component first
