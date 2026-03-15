# Gap Analysis — Real-Time Sync MCP Server

## Requirement-to-Asset Map

| Req | Area | Existing Assets | Gap |
|-----|------|----------------|-----|
| 1 | MCP Server Lifecycle | No MCP server exists. `.claude/mcp.json` does not exist. `.claude/launch.json` has debug configs only. | **Missing** — Entire `packages/mcp-server/` package and MCP config must be created |
| 2 | Code-to-Figma Push | Plugin import handler (`createNode()`) works. `PluginInput` type defined in `dsl-core`. Exporter produces valid JSON. | **Partially exists** — Import logic works; needs WebSocket message routing and MCP tool wrapper |
| 3 | Figma-to-Code Pull | `computeChangeset()` and `computeCompleteExport()` implemented in plugin. `ChangesetDocument` type in `dsl-core`. `diffNodes()` algorithm works. | **Partially exists** — Changeset computation works; needs WebSocket request/response and MCP tool wrapper |
| 4 | Real-Time Notifications | `documentchange` listener exists in plugin. `EditLogEntry` type defined. Edit log is collected but never sent externally. | **Partially exists** — Edit tracking works; needs forwarding via WebSocket + pending queue in MCP server |
| 5 | Component Mapping | `ComponentIdentity` type exists. `node-id-map.json` pattern used by plugin. Import handler returns `componentIdMap`. | **Partially exists** — Types exist; needs persistent registry file, CRUD MCP tools |
| 6 | Connection Status | No connection management exists. | **Missing** — Needs WebSocket connection tracking, heartbeat, status MCP tool |
| 7 | Plugin WebSocket | Plugin uses `figma.ui.onmessage` only. No external networking. | **Missing** — Plugin UI iframe can open WebSocket to localhost (confirmed feasible). Needs `networkAccess` manifest update and WebSocket client code in plugin UI. |
| 8 | Unsyncable Warnings | No warning system exists. `diffNodes()` silently skips unknown properties. | **Missing** — Needs warning generation logic in serializer/diff + `warnings` field in ChangesetDocument |

## Current State Summary

### What Works Well
1. **Edit tracking** — Plugin already has `documentchange` listener, baseline snapshots via `setPluginData`, `EditLogEntry` type
2. **Serialization** — `serializeNode()` handles all node types (FRAME, TEXT, RECTANGLE, ELLIPSE, IMAGE, COMPONENT, etc.)
3. **Diff algorithm** — `diffNodes()` with float epsilon tolerance (colors: 1e-4, sizes: 1px, general: 1e-6)
4. **Changeset schema** — `ChangesetDocument`, `PropertyChange`, `ComponentChangeEntry` types defined in `@figma-dsl/core`
5. **PluginInput format** — Stable schema, exporter produces valid JSON, plugin import handler tested
6. **Type safety** — Strict TypeScript, no `any`, readonly properties, discriminated unions
7. **Monorepo infrastructure** — npm workspaces, vitest, esbuild plugin build, consistent package pattern

### Architecture Constraints
- Plugin runs in Figma sandbox — **cannot** access filesystem or spawn processes
- Plugin UI iframe **can** open WebSocket to localhost (confirmed via [Figma docs](https://developers.figma.com/docs/plugins/making-network-requests/) and [community proof-of-concept](https://github.com/mattdesl/figma-plugin-websockets))
- Plugin `manifest.json` must declare `networkAccess.allowedDomains` for WebSocket
- MCP server uses **stdio transport** to communicate with Claude (standard for local MCP servers)
- MCP server needs a **separate WebSocket server** (port 9800) for plugin communication
- Two communication channels: MCP server ←(stdio)→ Claude, MCP server ←(WebSocket)→ Figma plugin

### Conventions to Follow
- Package at `packages/mcp-server/` with `@figma-dsl/mcp-server` scope
- `src/index.ts` re-exports public API, vitest for tests
- TypeScript strict mode, no `any`, ES2023 target
- esbuild for plugin bundling (IIFE)
- Shared types in `@figma-dsl/core`

## Implementation Approach Options

### Option A: Extend Existing Plugin + New MCP Server Package

**Strategy**: Add WebSocket client to existing plugin UI; create new `packages/mcp-server/` package.

**Plugin changes** (`packages/plugin/`):
- Add WebSocket client in plugin UI HTML (connects to `ws://localhost:9800`)
- Bridge `figma.ui.onmessage` ↔ WebSocket messages
- Wire `documentchange` edit log to WebSocket notifications
- Update `manifest.json` with `networkAccess.devAllowedDomains: ["ws://localhost:9800"]`
- Existing import/export/serialization/diff logic reused as-is

**New package** (`packages/mcp-server/`):
- MCP server with stdio transport (for Claude)
- WebSocket server on port 9800 (for plugin)
- Message router: MCP tool calls → WebSocket requests → plugin responses → MCP tool results
- Mapping registry (JSON file I/O)
- Pending changes queue (in-memory)

**Trade-offs**:
- ✅ Leverages all existing plugin logic (no duplication)
- ✅ Minimal plugin changes (add WebSocket client, wire existing functions)
- ✅ Clean separation: MCP server is new package, plugin extended
- ❌ Plugin `code.ts` is already 850+ lines; adding WebSocket routing increases complexity
- ❌ Plugin UI HTML string grows with WebSocket client code

### Option B: New MCP Server + New Plugin Communication Layer

**Strategy**: Create new `packages/mcp-server/` and extract plugin communication into a separate module.

**Plugin changes**:
- Extract WebSocket communication into `src/ws-bridge.ts`
- Extract message handling into `src/message-handler.ts`
- Keep `code.ts` focused on Figma API operations
- UI HTML refactored to separate file with WebSocket client

**New package**:
- Same as Option A

**Trade-offs**:
- ✅ Cleaner plugin architecture (separation of concerns)
- ✅ Easier to test WebSocket bridge independently
- ❌ More files, more refactoring
- ❌ Plugin still builds to single IIFE; separation is logical, not physical

### Option C: Hybrid — Minimal Plugin Changes + MCP Server (Recommended)

**Strategy**: Keep plugin changes minimal — add only a thin WebSocket relay in the UI iframe. All new logic goes in `packages/mcp-server/`.

**Plugin changes** (minimal):
- Add WebSocket client code in UI HTML (~50 lines)
- Add message handler that translates WebSocket messages to existing `figma.ui.onmessage` format
- No changes to `code.ts` core logic — it already handles import/export/changeset via messages
- Update `manifest.json` for network access

**Key insight**: The plugin already has a message-based architecture (`figma.ui.onmessage`). The WebSocket client in the UI iframe simply becomes another message source/sink alongside the UI buttons. Messages from WebSocket use the same `type` discriminator (`import`, `export-changeset`, `export-complete`) that the UI already sends.

**New package** (`packages/mcp-server/`):
- Stdio MCP server exposing tools to Claude
- WebSocket server accepting plugin connections
- Maps MCP tool calls to plugin message format
- Mapping registry, pending queue, connection status

**Trade-offs**:
- ✅ Minimal risk to existing plugin (thin relay only)
- ✅ Reuses existing message protocol — no new plugin message types needed
- ✅ Clear boundary: all new logic in MCP server, plugin just relays
- ✅ Aligns with requirements: "MCP server is the interface"
- ❌ Some new message types still needed (handshake, heartbeat, change notification)

## Complexity and Risk Assessment

**Effort: M (3–7 days)**
- New `packages/mcp-server/` package creation (M)
- Plugin WebSocket client addition (S)
- MCP tool definitions with Zod schemas (S)
- Mapping registry CRUD (S)
- Integration testing (M)
- Warning system in changeset (S)

**Risk: Medium**
- WebSocket from Figma plugin UI to localhost is proven but requires careful CORS/CSP handling (null origin)
- MCP SDK is stable (TypeScript SDK well-documented, stdio transport standard)
- Plugin sandbox constraints are well-understood
- No architectural shifts — extends existing pipeline pattern
- Unknown: Plugin UI WebSocket reconnection reliability across Figma restarts

## Research Items for Design Phase

1. **MCP SDK version and API** — Confirm `@modelcontextprotocol/sdk` latest version, Zod v4 requirement, server creation patterns
2. **Plugin WebSocket CORS** — Figma plugin UI iframe has `null` origin; WebSocket server must handle this
3. **Plugin `networkAccess` manifest** — Verify `devAllowedDomains` vs `allowedDomains` for localhost WebSocket in production
4. **Message protocol design** — Define typed JSON message envelope for WebSocket communication
5. **Warning detection rules** — Catalog unsyncable Figma properties vs DSL capabilities

## Recommendation

**Option C (Hybrid)** is recommended. It minimizes risk to the existing working plugin, keeps new logic contained in the MCP server package, and leverages the plugin's existing message-based architecture. The MCP server becomes the "brain" while the plugin remains a thin Figma API executor.

Key design decisions to resolve:
- Exact MCP tool names and Zod schemas
- WebSocket message protocol types
- Mapping registry file location and schema
- Warning classification rules
