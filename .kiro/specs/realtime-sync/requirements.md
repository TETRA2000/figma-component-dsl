# Requirements Document

## Introduction

This specification defines the requirements for a **real-time bidirectional sync** feature between React components and Figma. The feature introduces an MCP (Model Context Protocol) server that acts as a bridge between Claude (AI assistant), a Figma Desktop plugin, and the local React development environment. Changes made in React code are propagated to Figma, and changes made in Figma are propagated back to React code. When the system detects changes that cannot be faithfully synced (due to DSL pipeline limitations or unsupported Figma features), it warns the user before proceeding.

**Key Actors:**
- **Developer** — Uses Claude Code CLI and edits React components locally
- **Designer** — Uses Figma Desktop on their local machine
- **Claude** — AI assistant that orchestrates sync operations via MCP tools
- **MCP Server** — Local process that mediates communication between Claude, Figma plugin, and the filesystem
- **Figma Plugin** — Runs inside Figma Desktop, listens for and pushes design changes

## Requirements

### Requirement 1: MCP Server Lifecycle

**Objective:** As a developer, I want a local MCP server that starts automatically and manages connections to both Claude and the Figma plugin, so that I have a reliable communication bridge without manual setup.

#### Acceptance Criteria
1. When the developer invokes a sync-related Claude skill or MCP tool, the Sync MCP Server shall start automatically if not already running.
2. The Sync MCP Server shall expose MCP-compliant tool endpoints that Claude can discover and invoke.
3. When the Figma plugin connects via WebSocket, the Sync MCP Server shall register the connection and maintain a persistent channel for bidirectional messaging.
4. If the Figma plugin disconnects unexpectedly, the Sync MCP Server shall notify Claude of the lost connection and attempt reconnection for up to 30 seconds.
5. If the MCP server fails to start (e.g., port conflict), the Sync MCP Server shall return a descriptive error to Claude indicating the failure reason.
6. While no Figma plugin is connected, the Sync MCP Server shall queue outbound messages and deliver them once a plugin connection is established.

### Requirement 2: React-to-Figma Sync (Code → Design)

**Objective:** As a developer, I want changes to my React components to be reflected in the corresponding Figma design components, so that the design system stays synchronized with the codebase.

#### Acceptance Criteria
1. When Claude detects a React component change (file save or explicit sync command), the Sync MCP Server shall compile the component through the DSL pipeline (compile → export) and produce Figma-compatible JSON.
2. When Figma-compatible JSON is generated, the Sync MCP Server shall send the JSON payload to the Figma plugin via the WebSocket channel.
3. When the Figma plugin receives the JSON payload, the Figma Plugin shall create or update the corresponding Figma component nodes to match the new structure.
4. When a component is synced for the first time, the Sync MCP Server shall create a mapping record linking the React component path to the Figma node ID.
5. When a component has been previously synced, the Figma Plugin shall update the existing Figma node in-place rather than creating a duplicate.
6. If the DSL compilation fails for a React component, the Sync MCP Server shall report the compilation errors to Claude without sending partial data to Figma.

### Requirement 3: Figma-to-React Sync (Design → Code)

**Objective:** As a developer, I want design changes made in Figma to be translated back into React component code, so that designer edits are captured in the codebase without manual re-implementation.

#### Acceptance Criteria
1. When a designer modifies a synced component in Figma, the Figma Plugin shall detect the change and send the updated node data to the Sync MCP Server via WebSocket.
2. When the Sync MCP Server receives updated Figma node data, the Sync MCP Server shall diff the incoming data against the last-known synced state to identify what changed.
3. When property-level changes are identified (colors, spacing, typography, layout), the Sync MCP Server shall generate a changeset describing the modifications in terms of React/CSS properties.
4. When a changeset is generated, Claude shall apply the changeset to the corresponding React component files (`.tsx` and `.module.css`).
5. When structural changes are detected (added/removed child nodes, reordered layers), the Sync MCP Server shall include structural diffs in the changeset for Claude to apply.
6. The Sync MCP Server shall preserve the last-synced snapshot of each component to enable accurate diffing.

### Requirement 4: Unsyncable Change Detection and Warnings

**Objective:** As a developer, I want to be warned when a change cannot be faithfully synced between React and Figma, so that I can take corrective action rather than ending up with silent data loss.

#### Acceptance Criteria
1. When the Sync MCP Server detects a Figma property that has no DSL equivalent (e.g., advanced blending modes, complex gradients, or plugin-specific data), the Sync MCP Server shall generate a warning listing each unsyncable property.
2. When the Sync MCP Server detects a React pattern that cannot be represented in Figma (e.g., dynamic conditional rendering, event handlers, complex state logic), the Sync MCP Server shall generate a warning describing the unsyncable pattern.
3. If the Figma plugin encounters `layoutSizingHorizontal: FILL` on a top-level frame or `VARIANT` properties on non-component-set nodes, the Sync MCP Server shall flag these as known DSL pipeline constraints and warn the user.
4. When warnings are generated, Claude shall present them to the developer before applying any partial sync, along with a recommendation for manual resolution.
5. The Sync MCP Server shall classify warnings by severity: `info` (cosmetic differences), `warning` (functional differences), and `error` (sync-blocking incompatibilities).
6. If an error-level incompatibility is detected, the Sync MCP Server shall block the sync operation and require explicit developer confirmation before proceeding.

### Requirement 5: Component Mapping Registry

**Objective:** As a developer, I want a persistent mapping between React component files and Figma node IDs, so that the system knows which components correspond across the two environments.

#### Acceptance Criteria
1. The Sync MCP Server shall maintain a mapping registry that associates React component file paths with Figma file keys and node IDs.
2. When a new component is synced for the first time, the Sync MCP Server shall prompt Claude to confirm the mapping before persisting it.
3. When a React component file is renamed or moved, the Sync MCP Server shall detect the path change and update the mapping registry accordingly.
4. When a Figma component is deleted or moved to a different page, the Figma Plugin shall notify the Sync MCP Server, which shall mark the mapping as stale.
5. The Sync MCP Server shall expose an MCP tool for Claude to list, add, update, and remove mappings.
6. The mapping registry shall be stored as a JSON file in the project directory so it can be version-controlled.

### Requirement 6: Sync Session Management

**Objective:** As a developer, I want to start and stop sync sessions explicitly, so that I have control over when bidirectional synchronization is active.

#### Acceptance Criteria
1. When the developer (via Claude) invokes the start-sync tool, the Sync MCP Server shall begin watching for changes on both the React and Figma sides.
2. When the developer (via Claude) invokes the stop-sync tool, the Sync MCP Server shall stop watching and close the sync session gracefully.
3. While a sync session is active, the Sync MCP Server shall display the session status (connected components, last sync timestamp, pending changes) when queried.
4. If the developer makes changes to a mapped component while no sync session is active, the Sync MCP Server shall not propagate those changes automatically.
5. When a sync session is started, the Sync MCP Server shall perform an initial reconciliation to detect and report any drift between React and Figma states since the last session.

### Requirement 7: Figma Plugin Communication

**Objective:** As a developer using Figma Desktop, I want the Figma plugin to reliably communicate with the local MCP server, so that design changes are captured and code changes are applied in real time.

#### Acceptance Criteria
1. The Figma Plugin shall connect to the Sync MCP Server via WebSocket on a configurable local port (default: `localhost:9800`).
2. When the Figma Plugin establishes a connection, the Figma Plugin shall send a handshake message containing the current Figma file key, user identity, and plugin version.
3. While connected, the Figma Plugin shall listen for `selectionchange` and `documentchange` events in Figma and forward relevant change data to the Sync MCP Server.
4. When the Figma Plugin receives an update payload from the Sync MCP Server, the Figma Plugin shall apply the changes to the Figma document using the Figma Plugin API.
5. If the WebSocket connection is lost, the Figma Plugin shall display a reconnection indicator in the plugin UI and retry connection every 5 seconds.
6. The Figma Plugin shall support Figma Desktop on macOS and Windows.

### Requirement 8: Conflict Resolution

**Objective:** As a developer, I want the system to detect and help resolve conflicts when both React and Figma have been modified simultaneously, so that neither side's changes are silently overwritten.

#### Acceptance Criteria
1. When the Sync MCP Server receives changes from both React and Figma for the same component within a single sync cycle, the Sync MCP Server shall detect the conflict.
2. When a conflict is detected, the Sync MCP Server shall pause sync for the affected component and report the conflict details to Claude.
3. When Claude presents a conflict to the developer, Claude shall show a diff of both sides' changes and offer resolution options: accept React, accept Figma, or manual merge.
4. When the developer chooses a resolution, the Sync MCP Server shall apply the chosen version to both sides and update the last-synced snapshot.
5. The Sync MCP Server shall not auto-resolve conflicts without developer input.
