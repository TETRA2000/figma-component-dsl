# Figma Sync — Real-Time Bidirectional Sync via MCP

The `figma-sync` MCP server enables real-time bidirectional sync between React components and Figma via Claude Code. It acts as a thin JSON interface layer — Claude handles all code interpretation and modification.

## Architecture

```
Claude Code ←(stdio)→ figma-sync MCP Server ←(WebSocket :9800)→ Figma Plugin UI ←(postMessage)→ Plugin Sandbox
```

- **Claude Code** invokes MCP tools to push/pull JSON
- **MCP Server** relays messages between Claude and the Figma plugin
- **Figma Plugin** creates/updates nodes and computes changesets using existing import/export logic
- The MCP server never generates React or CSS code — it only relays JSON

## Setup

### Prerequisites

- Node.js >= 22
- Figma Desktop with the DSL Import plugin installed
- Claude Code CLI

### 1. Build the MCP server

```bash
git submodule update --init --recursive
npm install
npx tsc -b packages/mcp-server/
```

### 2. Enable the MCP server in Claude Code

The server is configured in `.claude/mcp.json` (already checked in). To enable it, add `enabledMcpjsonServers` to `.claude/settings.json`:

```json
{
  "enabledMcpjsonServers": ["figma-sync"],
  "enabledPlugins": {
    "skill-creator@claude-plugins-official": true
  }
}
```

This allowlists only the `figma-sync` server without enabling all project MCP servers globally.

### 3. Restart Claude Code

Restart Claude Code (or run `/mcp`) to initialize the MCP server. The server starts automatically as a managed child process.

### 4. Open the Figma plugin

Open Figma Desktop and run the "Figma DSL Import" plugin. The plugin UI will display a connection status indicator:

- **MCP: Connected** (green) — WebSocket connected to the MCP server
- **MCP: Connecting...** (yellow) — Attempting to connect
- **MCP: Disconnected** (red) — No connection; auto-retries every 5 seconds

## MCP Tools

Once connected, 8 tools are available as `mcp__figma-sync__*`:

### Core sync tools

| Tool | Description |
|------|-------------|
| `push-to-figma` | Push DSL-compiled PluginInput JSON to Figma. Creates or updates component nodes. |
| `pull-changeset` | Pull a ChangesetDocument showing property diffs since last sync. Returns raw JSON. |
| `pull-export` | Pull a complete PluginInput JSON snapshot of components from Figma. |

### Status and notifications

| Tool | Description |
|------|-------------|
| `get-status` | Connection status, Figma file key, plugin version, tracked components, pending changes. |
| `get-pending-changes` | Retrieve and clear pending change notifications from Figma edits. |

### Component mapping

| Tool | Description |
|------|-------------|
| `list-mappings` | List all component name-to-Figma node ID mappings with sync status. |
| `update-mapping` | Add or update a mapping between a component name and Figma node ID. |
| `remove-mapping` | Remove a component mapping. |

## Typical Workflows

### Push: Code to Figma

1. Developer edits a React component
2. Claude compiles the DSL and calls `push-to-figma` with the PluginInput JSON
3. Plugin creates/updates Figma nodes and returns node IDs
4. MCP server records the mapping for future syncs

### Pull: Figma to Code

1. Designer edits a component in Figma
2. Plugin sends a change notification (component name + changed categories)
3. Claude calls `get-pending-changes` to see what changed
4. Claude calls `pull-changeset` to get the full ChangesetDocument JSON
5. Claude interprets the changeset and modifies React/CSS files

### Real-time notifications

While the plugin is connected, `documentchange` events on tracked components are forwarded as change notifications. These include:

- Component name
- Changed property categories (fills, typography, layout, strokes, geometry, appearance, structure)
- Timestamp

Notifications are debounced (500ms) and queued until Claude polls with `get-pending-changes`.

## Configuration

### WebSocket port

Default: `9800`. Override with the `FIGMA_SYNC_PORT` environment variable:

```json
{
  "mcpServers": {
    "figma-sync": {
      "command": "node",
      "args": ["bin/figma-dsl-sync"],
      "env": { "FIGMA_SYNC_PORT": "9900" }
    }
  }
}
```

### Mapping registry

Component mappings are stored in `.figma-sync/mappings.json` in the project root. This file can be version-controlled to share mappings across the team.

## Unsyncable Property Warnings

The changeset includes warnings for Figma properties that have no DSL equivalent:

| Severity | Properties |
|----------|-----------|
| `error` | Boolean operations, masks, FILL sizing on top-level frames |
| `warning` | Effects (shadows, blurs), rotation |
| `info` | Blend modes, constraints |

Warnings are included in the `warnings` array of the ChangesetDocument and relayed to Claude without filtering.

## Package Structure

```
packages/mcp-server/
├── src/
│   ├── cli.ts                  # Entry point (bin stub)
│   ├── server.ts               # MCP server + WebSocket server
│   ├── connection-manager.ts   # WebSocket connection state + request-response correlation
│   ├── mapping-registry.ts     # Persistent component ↔ Figma node ID mappings
│   ├── pending-queue.ts        # In-memory change notification queue
│   ├── tools.ts                # 8 MCP tool registrations
│   └── index.ts                # Public API exports
├── package.json
└── tsconfig.json
```

Plugin additions:

```
packages/plugin/
├── src/
│   ├── ui.html                 # Extracted UI with WebSocket client
│   ├── html.d.ts               # TypeScript declaration for HTML imports
│   └── code.ts                 # Updated with WebSocket message handlers
└── manifest.json               # Updated with networkAccess for localhost
```

Shared types in `packages/dsl-core/src/`:

- `sync-messages.ts` — WebSocket message protocol (discriminated unions)
- `changeset.ts` — `ChangesetWarning` types with severity levels

## Troubleshooting

**Tools don't appear in Claude Code**
- Verify `.claude/settings.json` includes `"enabledMcpjsonServers": ["figma-sync"]`
- Run `/mcp` in Claude Code to check server status
- Ensure `packages/mcp-server/dist/` exists (run `npx tsc -b packages/mcp-server/`)

**Plugin shows "MCP: Disconnected"**
- Check that no other process holds port 9800: `lsof -i :9800`
- Kill orphaned processes if needed
- The plugin auto-retries every 5 seconds

**Port conflict**
- Set `FIGMA_SYNC_PORT` in the MCP config env to use a different port
- Update the plugin's `WS_PORT` variable in `ui.html` to match

**Request timeout (30s)**
- Check that the Figma plugin is responsive (not blocked by a modal)
- Large imports may take longer; the 30s timeout applies per request-response pair
