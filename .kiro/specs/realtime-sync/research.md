# Research & Design Decisions — Real-Time Sync MCP Server

## Summary
- **Feature**: realtime-sync
- **Discovery Scope**: Complex Integration
- **Key Findings**:
  - MCP TypeScript SDK (`@modelcontextprotocol/sdk@1.27.x`) provides `McpServer` + `StdioServerTransport` for local stdio servers; uses Zod for tool input schemas
  - Figma plugins can open WebSocket to localhost from the UI iframe — confirmed via official docs and community implementations
  - Existing plugin already has a message-based architecture (`figma.ui.onmessage` with `type` discriminator) — WebSocket relay maps directly to existing message types

## Research Log

### MCP TypeScript SDK API
- **Context**: Need to create a local MCP server that Claude can discover and invoke
- **Sources Consulted**: [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk), [npm @modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk), [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- **Findings**:
  - Latest version: `1.27.x` with Zod v3.25+ peer dependency (SDK uses `zod/v4` internally)
  - Server creation: `new McpServer({ name, version })` → `server.registerTool(name, schema, handler)` → `server.connect(new StdioServerTransport())`
  - Tool schemas use Zod: `inputSchema: z.object({ ... })`, optional `outputSchema`
  - Tool handlers receive parsed input + `ServerContext` with logging
  - Return format: `{ content: [{ type: 'text', text: string }] }` or structured content
  - Stdio transport is standard for local servers launched by Claude Code/Desktop
  - Configuration via `.claude/mcp.json`: `{ "mcpServers": { "name": { "command": "node", "args": [...] } } }`
- **Implications**: New package `@figma-dsl/mcp-server` needs `@modelcontextprotocol/sdk` and `zod` as dependencies. Server entry point uses stdio transport. Tools defined with Zod schemas.

### Figma Plugin WebSocket Communication
- **Context**: Plugin must communicate with local MCP server in real time
- **Sources Consulted**: [Figma Plugin Network Requests](https://developers.figma.com/docs/plugins/making-network-requests/), [figma-plugin-websockets PoC](https://github.com/mattdesl/figma-plugin-websockets), [Figma Plugin Manifest](https://developers.figma.com/docs/plugins/manifest/)
- **Findings**:
  - Plugin sandbox code (`code.ts`) cannot open network connections directly
  - Plugin UI iframe can open WebSocket connections to allowed domains
  - `manifest.json` must declare `networkAccess.allowedDomains` (e.g., `["ws://localhost:9800"]`)
  - For development: `devAllowedDomains` field allows localhost without production restrictions
  - CORS: Plugin UI iframe has `null` origin — WebSocket servers generally do not enforce origin checks (unlike HTTP), so this is not a blocker
  - Communication bridge: UI iframe opens WebSocket → relays messages to/from plugin code via `parent.postMessage` / `figma.ui.onmessage`
  - Proven pattern: multiple published Figma plugins use WebSocket to localhost (e.g., figma-console-mcp bridge on ports 9223-9232)
- **Implications**: Thin WebSocket client in plugin UI HTML; messages bridged to existing `figma.ui.onmessage` handler. Minimal plugin code changes required.

### Existing Plugin Message Protocol
- **Context**: Understanding current plugin message flow to minimize changes
- **Sources Consulted**: `packages/plugin/src/code.ts` (850 lines)
- **Findings**:
  - Plugin already uses typed messages with `type` discriminator
  - Existing message types: `import`, `export-changeset`, `export-complete`, `progress`, `export-result`, `export-data`
  - Response messages include: JSON payloads, summary text, node ID maps
  - Edit tracking via `documentchange` collects `EditLogEntry[]` but only stores in-memory
  - `computeChangeset()` and `computeCompleteExport()` already produce the exact JSON formats needed
- **Implications**: WebSocket messages can reuse existing `type` discriminators. New types needed only for: `handshake`, `heartbeat`, `change-notification`, `push-components` (alias for `import`).

### Unsyncable Property Detection
- **Context**: Requirement 9 needs warning system for properties without DSL equivalents
- **Sources Consulted**: `packages/dsl-core/src/plugin-types.ts`, `packages/plugin/src/serializer.ts`
- **Findings**:
  - `PluginNodeDef` covers: fills (solid, gradient, image), strokes, typography, auto-layout, corner radius, opacity, visibility, component properties
  - Not covered in DSL: effects (drop shadow, inner shadow, blur), constraints, blend modes, rotation, boolean operations, masks, export settings, grids, guides
  - `diffNodes()` already skips unknown properties — warnings can be generated at the same point
- **Implications**: Add `warnings` field to `ChangesetDocument`. During diff computation, when a Figma property has no `PluginNodeDef` equivalent, emit a warning entry instead of silently skipping.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Hybrid (selected) | Thin WebSocket relay in plugin UI + new `packages/mcp-server/` | Minimal plugin risk, clean boundary, reuses message protocol | New message types for handshake/heartbeat | Recommended by gap analysis |
| Full plugin extension | All logic in plugin | No new package | Plugin already 850+ lines, sandbox limits | Rejected — violates separation of concerns |
| REST polling | MCP server polls Figma REST API | No plugin changes | No real-time, requires auth token, rate limits | Rejected — does not meet Req 4 |

## Design Decisions

### Decision: Stdio Transport for MCP Server
- **Context**: MCP server needs to communicate with Claude
- **Alternatives Considered**:
  1. Stdio transport — Standard for local servers launched by Claude Code
  2. Streamable HTTP — Standard for remote servers
- **Selected Approach**: Stdio transport
- **Rationale**: Local server launched per-project; Claude Code expects stdio for `.claude/mcp.json` configured servers
- **Trade-offs**: Cannot serve multiple clients simultaneously; acceptable since one Claude instance per project
- **Follow-up**: Verify Claude Code MCP discovery works with project-level `.claude/mcp.json`

### Decision: WebSocket for Plugin Communication (Separate from MCP)
- **Context**: Plugin must send/receive data in real time
- **Alternatives Considered**:
  1. WebSocket server embedded in MCP server process
  2. Separate bridge process
  3. Figma REST API polling
- **Selected Approach**: WebSocket server embedded in MCP server process
- **Rationale**: Single process manages both stdio (Claude) and WebSocket (plugin); simpler deployment and lifecycle. WebSocket server starts on MCP server init, listens on configurable port (default 9800).
- **Trade-offs**: MCP server has dual responsibility (stdio + WebSocket); acceptable given thin interface role.

### Decision: MCP Server as Transparent JSON Relay
- **Context**: User requirement — MCP server should not generate React/CSS
- **Selected Approach**: MCP server forwards JSON payloads without transformation. It wraps plugin responses in MCP tool result format but does not interpret changeset content.
- **Rationale**: Keeps MCP server simple and stateless for data flow. Claude handles all code intelligence.
- **Trade-offs**: Claude must understand ChangesetDocument format; already does via existing apply-changeset skill.

## Risks & Mitigations
- **Plugin WebSocket reliability** — Figma may close plugin UI on inactivity → mitigate with reconnection logic and heartbeat (Req 7.7)
- **CORS/CSP in plugin iframe** — `null` origin → WebSocket protocol does not enforce CORS; confirmed safe
- **Plugin data size limits** — `setPluginData` has 100KB per entry → already handled by existing baseline truncation
- **MCP SDK breaking changes** — Pin `@modelcontextprotocol/sdk` version in package.json

## References
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) — Server API, tool registration, transports
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) — Protocol requirements
- [Figma Plugin Network Requests](https://developers.figma.com/docs/plugins/making-network-requests/) — Fetch API, WebSocket, networkAccess manifest
- [figma-plugin-websockets PoC](https://github.com/mattdesl/figma-plugin-websockets) — Proof of concept for localhost WebSocket
- [figma-console-mcp Desktop Bridge](https://deepwiki.com/southleft/figma-console-mcp/2.2-desktop-bridge-plugin-setup) — Production example of Figma plugin + MCP + WebSocket
