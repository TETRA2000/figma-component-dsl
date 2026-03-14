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

### `get_code_connect_suggestions`
Probe for available Code Connect mappings. Used to verify MCP is active.

### `generate_figma_design`
Create a Figma component from DSL JSON data.
- Input: Component DSL JSON
- Output: Figma node ID and URL

### `add_code_connect_map`
Link a Code Connect file to a Figma component.
- Input: Figma node URL, Code Connect file path
- Output: Confirmation of mapping

## Generating a Figma Token

1. Go to Figma → Settings → Account → Personal Access Tokens
2. Click "Generate new token"
3. Give it a descriptive name (e.g., "MCP Server")
4. Select scopes: File read/write, Code Connect
5. Copy the token immediately (it won't be shown again)

## Verifying Setup

After configuration, restart Claude and try:
- "Can you check if Figma MCP is connected?"
- The skill will call `get_code_connect_suggestions` to verify

If the tool is not available, fall back to Approach B (Plugin) or C (Pipeline).
