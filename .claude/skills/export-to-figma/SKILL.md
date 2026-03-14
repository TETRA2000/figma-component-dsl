---
name: export-to-figma
description: >
  Export React components to Figma with automatic publishing via MCP server.
  Use this skill whenever the user wants to get their components into Figma,
  create Figma design components from code, publish designs, generate Figma-
  compatible data, set up Code Connect bindings, or bridge the gap between
  their React code and Figma design files. Also trigger when the user mentions
  Figma in the context of their components, even casually — e.g., "can we
  see this in Figma?", "push this to our design file", "I need the Figma
  version". Covers: "export to Figma", "Figma publish", "Code Connect",
  "design export", "figma import", "push to Figma", "create Figma components",
  "sync with Figma".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Export to Figma

Export React components to Figma using three approaches depending on environment capabilities: MCP server (automated), Plugin (semi-automated), or Pipeline (manual).

## Workflow

### Step 1: MCP Pre-Check

Probe for Figma MCP server availability by attempting to call:

```
get_code_connect_suggestions
```

If the MCP tool is available, Approach A is preferred. If not, fall back to Approach B or C.

Present the user with available approaches:

- **Approach A (MCP)** — Fully automated via Figma MCP server. Requires MCP connection.
- **Approach B (Plugin)** — Semi-automated. Exports JSON for manual Figma plugin import.
- **Approach C (Pipeline)** — Manual pipeline. Compile, render, capture, compare, iterate.

### Step 2: Compile the Component

Regardless of approach, start by compiling the component DSL:

```bash
bin/figma-dsl compile preview/src/components/{ComponentName}/{ComponentName}.tsx -o output/
```

This produces `output/{ComponentName}.json` — the intermediate DSL representation.

### Step 3: Execute Chosen Approach

---

#### Approach A: MCP Server (Automated)

**Prerequisites**: Figma MCP server connected and configured. See `references/mcp-setup-guide.md`.

1. **Export the DSL data**:
   ```bash
   bin/figma-dsl export output/{ComponentName}.json -o output/{ComponentName}.figma.json
   ```

2. **Generate Figma design** via MCP:
   Call `generate_figma_design` with the exported JSON data. This creates the component in your Figma file.

3. **Add Code Connect mapping** via MCP:
   Call `add_code_connect_map` with:
   - The Figma node ID returned from step 2
   - The Code Connect file path: `preview/src/components/{ComponentName}/{ComponentName}.figma.tsx`

4. **Update the Code Connect file** with the real Figma URL:
   Replace the `PLACEHOLDER` URL in `{ComponentName}.figma.tsx` with the actual Figma node URL.

5. **Verify** by calling `get_code_connect_suggestions` for the component to confirm the mapping.

---

#### Approach B: Plugin Import (Semi-Automated)

**Use when**: MCP is not available but user has access to a Figma plugin for import.

1. **Export JSON for plugin**:
   ```bash
   bin/figma-dsl export output/{ComponentName}.json -o output/{ComponentName}.figma.json --format plugin
   ```

2. **Provide the JSON file** to the user:
   - File location: `output/{ComponentName}.figma.json`
   - Tell the user to open Figma and use the import plugin

3. **Document the schema** — refer the user to `references/figma-export-schema.md` for the JSON structure if they need to customize before import.

4. **After import**, ask the user for the Figma node URL and update the Code Connect file.

---

#### Approach C: Full Pipeline (Manual)

**Use when**: No MCP, no plugin, or when pixel-perfect verification is needed.

1. **Compile**:
   ```bash
   bin/figma-dsl compile preview/src/components/{ComponentName}/{ComponentName}.tsx -o output/
   ```

2. **Render** to PNG:
   ```bash
   bin/figma-dsl render output/{ComponentName}.json -o output/{ComponentName}.png
   ```

3. **Capture** the Figma component (if it already exists in Figma):
   ```bash
   bin/figma-dsl-capture-figma --node-url "{figma_node_url}" -o output/{ComponentName}-figma.png
   ```

4. **Compare** rendered vs. Figma:
   ```bash
   bin/figma-dsl-compare output/{ComponentName}.png output/{ComponentName}-figma.png -o output/{ComponentName}-diff.png
   ```

5. **Iterate** — if visual differences are found:
   - Review the diff image
   - Adjust the component code
   - Re-compile and re-render
   - Compare again
   - Repeat until acceptable match

6. **Import** — provide the rendered PNG and JSON to the user for manual Figma import.

### Step 4: Post-Import Verification

After the component is in Figma (any approach):

1. **Capture the Figma result**:
   ```bash
   bin/figma-dsl-capture-figma --node-url "{figma_node_url}" -o output/{ComponentName}-figma.png
   ```

2. **Batch compare** all variants:
   ```bash
   bin/figma-dsl-batch-compare --source output/ --target output/figma-captures/ -o output/comparison-report/
   ```

3. **Review the comparison report** and flag any visual discrepancies.

### Step 5: Token Unmapping Warnings

Run the validator to check for token compatibility issues:

```bash
bin/figma-dsl validate preview/src/components/{ComponentName}/{ComponentName}.tsx --check-tokens
```

Warn the user about:
- CSS custom properties that don't map to Figma design tokens
- Color values not in the Figma color library
- Typography values that don't match Figma text styles
- Spacing values that don't align with Figma auto-layout settings

## Reference Files

- `references/figma-export-schema.md` — JSON schema for plugin import format
- `references/code-connect-pattern.md` — Code Connect binding patterns
- `references/mcp-setup-guide.md` — MCP server configuration guide

## Tips

- Always compile before export — the DSL JSON is the source of truth
- MCP approach is fastest but requires server setup
- Plugin approach is most common for teams without MCP
- Pipeline approach gives the most control and visual verification
- Keep Code Connect files updated with real Figma URLs after import
- Run batch-compare after bulk imports to catch drift
