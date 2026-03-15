# Figma MCP Server Setup Guide

The Figma MCP server enables automated design generation and Code Connect mapping directly from Claude.

## Prerequisites

- Figma account with edit access to the target file
- Figma Personal Access Token
- MCP server configured in Claude Desktop or Claude Code

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or equivalent:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

### Claude Code

Add to `.claude/mcp.json` in your project:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

## Available MCP Tools

Once configured, these tools become available:

### `whoami`
Check authentication status and verify the connected Figma user. Use this to confirm MCP is active.

### `generate_figma_design`
Capture a **running web page by URL** and convert it into a Figma design. This tool does NOT accept JSON data — it captures what's visible in the browser.

**Multi-step workflow:**
1. Call without `outputMode` to get capture instructions and a `captureId`
2. Call again with `outputMode` (`newFile`, `existingFile`, or `clipboard`) to start capture
3. Poll with `captureId` every 5 seconds (up to 10 times) until `status === "completed"`

**Parameters:**
- `captureId` — ID from initial call, used for polling (single-use per page)
- `outputMode` — `"newFile"` | `"existingFile"` | `"clipboard"`
- `fileKey` — target Figma file key (required for `existingFile`)
- `nodeId` — target node in existing file (optional, creates new page if omitted)
- `fileName` — name for new file (required for `newFile`)
- `planKey` — team/org key for new file (optional, lists available plans if omitted)

**Important:** Each `captureId` is single-use. For multiple pages, generate separate capture IDs.

### `get_code_connect_suggestions`
Get AI-suggested strategy for linking a Figma node to code components. Returns suggestions that can be confirmed via `send_code_connect_mappings`.
- Input: `nodeId`, `fileKey`
- Output: Suggested component mappings

### `send_code_connect_mappings`
Save multiple Code Connect mappings in bulk. Use after `get_code_connect_suggestions` to confirm and save approved mappings.
- Input: `nodeId`, `fileKey`, `mappings[]` (each with `nodeId`, `componentName`, `source`, `label`)

### `add_code_connect_map`
Map a single Figma node to a code component using Code Connect.
- Input: `nodeId`, `fileKey`, `source`, `componentName`, `label` (e.g., `"React"`)
- Optional: `template`, `templateDataJson` for full Code Connect templates

### `get_code_connect_map`
Get existing Code Connect mappings for a node. Returns `{[nodeId]: {codeConnectSrc, codeConnectName}}`.
- Input: `nodeId`, `fileKey`

## Generating a Figma Token

1. Go to Figma → Settings → Account → Personal Access Tokens
2. Click "Generate new token"
3. Give it a descriptive name (e.g., "MCP Server")
4. Select scopes: File read/write, Code Connect
5. Copy the token immediately (it won't be shown again)

## Verifying Setup

After configuration, restart Claude and try:
- "Can you check if Figma MCP is connected?"
- The skill will call `whoami` to verify authentication and connection

If the tool is not available, fall back to Approach B (Plugin) or C (Pipeline).
