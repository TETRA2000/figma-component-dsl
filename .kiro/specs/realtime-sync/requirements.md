# Requirements Document

## Introduction

This specification defines the requirements for a **real-time bidirectional sync** feature between React components and Figma via an MCP (Model Context Protocol) server.

The MCP server acts as a **thin interface layer** — it does not generate React code or CSS. It surfaces DSL changeset JSON (analogous to the existing Figma plugin's export feature) and forwards Figma operations. Claude AI consumes the changeset data and handles all code modifications autonomously.

**Architecture Principle:** The MCP server is an interface for DSL changes and Figma operations. It relays JSON between Claude, the Figma plugin, and the local filesystem. All code generation, changeset interpretation, and React/CSS modification is delegated to Claude.

**Key Actors:**
- **Developer** — Uses Claude Code CLI and edits React components locally
- **Designer** — Uses Figma Desktop on their local machine
- **Claude** — AI assistant that consumes changeset JSON from MCP tools and applies code changes
- **Sync MCP Server** — Local stdio process that exposes MCP tools to Claude and maintains a WebSocket connection to the Figma plugin
- **Figma Plugin** — Runs inside Figma Desktop, detects design changes and applies incoming updates

## Requirements

### Requirement 1: MCP Server Lifecycle

**Objective:** As a developer, I want a local MCP server that Claude can discover and invoke via standard MCP tooling, so that I have a reliable communication bridge without manual setup.

#### Acceptance Criteria
1. The Sync MCP Server shall expose MCP-compliant tool endpoints over stdio transport that Claude can discover and invoke.
2. The Sync MCP Server shall be configurable via `.claude/mcp.json` in the project directory, following the standard MCP server configuration format.
3. When the Figma plugin connects via WebSocket, the Sync MCP Server shall register the connection and maintain a persistent channel for bidirectional messaging.
4. If the Figma plugin disconnects unexpectedly, the Sync MCP Server shall report the disconnection status when Claude queries connection state.
5. If the MCP server fails to bind the WebSocket port (e.g., port conflict), the Sync MCP Server shall return a descriptive error to Claude indicating the failure reason.
6. While no Figma plugin is connected, the Sync MCP Server shall report the disconnected state when any Figma-dependent tool is invoked.

### Requirement 2: Code-to-Figma Sync (Push to Figma)

**Objective:** As a developer, I want to push DSL-compiled JSON to Figma via an MCP tool, so that React component changes are reflected in the Figma design file.

#### Acceptance Criteria
1. The Sync MCP Server shall expose an MCP tool that accepts PluginInput JSON (the existing Figma-compatible export format) and forwards it to the connected Figma plugin via WebSocket.
2. When the Figma plugin receives the PluginInput JSON, the Figma Plugin shall create or update the corresponding Figma component nodes using the existing import handler.
3. When a component is pushed for the first time, the Sync MCP Server shall record the mapping between the component name and the Figma node ID returned by the plugin.
4. When a component has been previously pushed, the Figma Plugin shall update the existing Figma node in-place rather than creating a duplicate.
5. If the Figma plugin is not connected when a push is invoked, the Sync MCP Server shall return an error indicating the plugin is unavailable.
6. When the Figma plugin completes the import operation, the Figma Plugin shall send an acknowledgment message to the Sync MCP Server containing the created/updated node IDs.

### Requirement 3: Figma-to-Code Sync (Pull Changeset from Figma)

**Objective:** As a developer, I want to pull design changes from Figma as structured changeset JSON, so that Claude can interpret the changes and apply them to React code.

#### Acceptance Criteria
1. The Sync MCP Server shall expose an MCP tool that requests the Figma plugin to compute and return a changeset for specified components (or all tracked components).
2. When the Figma plugin receives a changeset request, the Figma Plugin shall diff the current node state against the stored baseline and return a ChangesetDocument JSON.
3. The Sync MCP Server shall return the ChangesetDocument JSON directly to Claude without interpreting, transforming, or generating any React/CSS code from it.
4. The Sync MCP Server shall expose an MCP tool that requests a complete DSL JSON export (full PluginInput snapshot) of specified components from the Figma plugin.
5. When the Figma plugin returns the complete export, the Sync MCP Server shall return the PluginInput JSON directly to Claude.
6. The Sync MCP Server shall not modify, filter, or transform the changeset or export JSON — it acts as a transparent relay.

### Requirement 4: Real-Time Change Notification

**Objective:** As a developer, I want to be notified when a designer makes changes in Figma, so that Claude can proactively offer to sync those changes.

#### Acceptance Criteria
1. While connected, the Figma Plugin shall listen for `documentchange` events on tracked components and forward change summaries to the Sync MCP Server via WebSocket.
2. When the Sync MCP Server receives a change notification from the plugin, the Sync MCP Server shall store the notification as a pending change record.
3. The Sync MCP Server shall expose an MCP tool that returns a list of pending change notifications (component names, change types, timestamps) since the last pull.
4. When Claude retrieves pending notifications, the Sync MCP Server shall clear the retrieved notifications from the pending queue.
5. The change notification shall include only a summary (component name, changed property categories, timestamp) — the full changeset is retrieved via the pull tool (Requirement 3).

### Requirement 5: Component Mapping Registry

**Objective:** As a developer, I want a persistent mapping between React component names and Figma node IDs, so that the system knows which components correspond across the two environments.

#### Acceptance Criteria
1. The Sync MCP Server shall maintain a mapping registry that associates component names with Figma file keys and node IDs.
2. When a component is pushed to Figma for the first time (Requirement 2), the Sync MCP Server shall automatically create a mapping entry from the acknowledgment.
3. The Sync MCP Server shall expose an MCP tool for Claude to list all current mappings.
4. The Sync MCP Server shall expose an MCP tool for Claude to add, update, or remove individual mappings.
5. The mapping registry shall be stored as a JSON file in the project directory (default: `.figma-sync/mappings.json`) so it can be version-controlled.
6. When a Figma component is deleted, the Figma Plugin shall notify the Sync MCP Server, which shall mark the mapping as stale.

### Requirement 6: Connection Status and Diagnostics

**Objective:** As a developer, I want to check the sync system status through Claude, so that I can diagnose connection issues and understand the current state.

#### Acceptance Criteria
1. The Sync MCP Server shall expose an MCP tool that returns the current connection status: WebSocket connected/disconnected, Figma file key, plugin version, and number of tracked components.
2. While the Figma plugin is connected, the Sync MCP Server shall report the plugin's last heartbeat timestamp.
3. The Sync MCP Server shall expose an MCP tool that returns the list of tracked components with their last-synced timestamps and pending change status.
4. If the Figma plugin has never connected during the current server session, the Sync MCP Server shall indicate this in the status response with setup instructions.

### Requirement 7: Figma Plugin WebSocket Communication

**Objective:** As a developer using Figma Desktop, I want the Figma plugin to reliably communicate with the local MCP server, so that design changes and code updates flow in real time.

#### Acceptance Criteria
1. The Figma Plugin shall connect to the Sync MCP Server via WebSocket on a configurable local port (default: `localhost:9800`).
2. When the Figma Plugin establishes a connection, the Figma Plugin shall send a handshake message containing the current Figma file key, user identity, and plugin version.
3. The Sync MCP Server and Figma Plugin shall communicate using a typed JSON message protocol with a `type` field discriminator and typed payloads.
4. When the Figma Plugin receives a `push-components` message from the Sync MCP Server, the Figma Plugin shall import the components using the existing import handler and return the resulting node IDs.
5. When the Figma Plugin receives a `request-changeset` message, the Figma Plugin shall compute the changeset using the existing serializer/diff logic and return the ChangesetDocument JSON.
6. When the Figma Plugin receives a `request-export` message, the Figma Plugin shall serialize the requested components and return the complete PluginInput JSON.
7. If the WebSocket connection is lost, the Figma Plugin shall display a reconnection indicator in the plugin UI and retry connection every 5 seconds.

### Requirement 8: Sync Activity Visibility

**Objective:** As a developer, I want to see clear, human-readable output in Claude Desktop describing what components were edited and how, so that I understand exactly what changed on both the React and Figma sides without inspecting raw JSON.

#### Acceptance Criteria
1. When Claude pushes a component to Figma (Requirement 2), Claude shall output a summary describing which component was pushed and what properties it contains.
2. When Claude pulls a changeset from Figma (Requirement 3), Claude shall output a human-readable summary of each property change (e.g., "Button: background color changed from #7c3aed to #3b82f6, font size increased from 16px to 18px").
3. When the Sync MCP Server returns a changeset, the ChangesetDocument shall include a `description` field on each `PropertyChange` entry containing a human-readable explanation of the change.
4. When Claude applies changeset modifications to React/CSS files, Claude shall output which files were modified and what edits were made.
5. When real-time change notifications arrive (Requirement 4), Claude shall output a notification summary listing the affected component names and the categories of changed properties (e.g., "Designer edited HeroSection: fills, typography").
6. When warnings or unsyncable properties are detected, Claude shall present them inline with the change summary, clearly distinguishing warnings from successful changes.

### Requirement 9: Unsyncable Change Detection

**Objective:** As a developer, I want the changeset to include warnings about properties that cannot be faithfully represented across the React-Figma boundary, so that I can take corrective action.

#### Acceptance Criteria
1. When the Figma plugin computes a changeset, the Figma Plugin shall include a `warnings` array listing any properties that have no DSL equivalent (e.g., advanced blending modes, effects, constraints).
2. When the Figma plugin detects known DSL pipeline constraints (e.g., `layoutSizingHorizontal: FILL` on a top-level frame), the Figma Plugin shall include these as warnings in the changeset.
3. The Figma Plugin shall classify each warning by severity: `info` (cosmetic), `warning` (functional difference), `error` (sync-blocking).
4. The Sync MCP Server shall relay warnings to Claude as part of the changeset response without filtering or modifying them.
5. The warning data shall include: property path, severity level, description, and the unsupported value.
