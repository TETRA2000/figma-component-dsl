# Implementation Plan

- [ ] 1. Define shared sync message types and changeset warning schema
- [ ] 1.1 Add WebSocket message protocol types to the shared types package
  - Define the discriminated union of client-to-server and server-to-client message types (handshake, heartbeat, push-components, request-changeset, request-export, push-result, changeset-result, export-result, change-notification, component-deleted)
  - Include `requestId` field on all request-response message pairs for correlation
  - Export the union types and individual message interfaces for use by both MCP server and plugin
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 1.2 (P) Add changeset warning type and extend the changeset document schema
  - Define warning severity levels (info, warning, error) and the warning data structure (property path, severity, description, unsupported value)
  - Add an optional `warnings` array to the existing changeset document type for backward compatibility
  - _Requirements: 9.1, 9.3, 9.5_

- [ ] 2. Create the MCP server package with core infrastructure
- [ ] 2.1 Set up the MCP server package in the monorepo
  - Create the new package with standard monorepo conventions (package manifest, TypeScript config, test setup)
  - Add dependencies: MCP SDK, WebSocket server library, Zod schema validation
  - Create the server entry point that initializes the MCP server with stdio transport and starts a WebSocket server on a configurable port (default 9800)
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 2.2 Implement WebSocket connection management with request-response correlation
  - Accept plugin connections, track connection state (connected/disconnected, file key, plugin version, last heartbeat)
  - Process handshake messages from the plugin to register connection metadata
  - Implement request-response correlation: generate UUID per outbound request, maintain a map of pending requests with 30-second timeouts, resolve on matching response
  - Report disconnection when connection state is queried
  - _Requirements: 1.3, 1.4, 1.6, 6.2, 7.3_

- [ ] 2.3 Implement the component mapping registry
  - Create a persistent JSON-file-backed registry that associates component names with Figma file keys and node IDs
  - Support CRUD operations: list all, get by name, add/update, remove, mark as stale
  - Auto-create the storage directory if it does not exist; write atomically (temp file + rename)
  - Load registry on server start; save after each mutation
  - _Requirements: 5.1, 5.2, 5.5_

- [ ] 2.4 (P) Implement the pending change notification queue
  - Accept change notification messages from the WebSocket connection and store them in an in-memory queue
  - Return all pending notifications on poll and clear the queue
  - Provide a count for status queries
  - _Requirements: 4.2, 4.3, 4.4_

- [ ] 3. Register MCP tools for push, pull, and status operations
- [ ] 3.1 Register the push-to-figma tool
  - Accept PluginInput JSON from Claude, validate with Zod, forward to the plugin via WebSocket as a push-components message
  - Wait for the push-result response (with requestId correlation and 30s timeout)
  - Update the mapping registry with returned node IDs for first-time components
  - Return a human-readable summary of created/updated nodes to Claude
  - Return an error if the plugin is not connected
  - _Requirements: 2.1, 2.3, 2.5, 2.6, 8.1_

- [ ] 3.2 Register the pull-changeset and pull-export tools
  - **pull-changeset**: Send a request-changeset message to the plugin, wait for the changeset-result response, return the raw ChangesetDocument JSON to Claude without transformation, including any warnings
  - **pull-export**: Send a request-export message to the plugin, wait for the export-result response, return the raw PluginInput JSON to Claude without transformation
  - Both tools accept an optional component name filter; both return errors if the plugin is not connected
  - Include human-readable summaries of changes and warnings in the tool result text
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.2, 8.6, 9.4_

- [ ] 3.3 (P) Register status, mapping, and notification tools
  - **get-status**: Return connection status, Figma file key, plugin version, heartbeat timestamp, tracked component count, and setup instructions if never connected
  - **list-mappings**: Return all component mappings with last-synced timestamps and stale status
  - **update-mapping** and **remove-mapping**: CRUD operations on individual mappings
  - **get-pending-changes**: Return and clear pending change notifications with human-readable summary
  - _Requirements: 4.3, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 8.5_

- [ ] 4. Extend the Figma plugin with WebSocket communication
- [ ] 4.1 Extract the plugin UI HTML into a separate file
  - Move the inline HTML UI string from the plugin code into a dedicated HTML file
  - Update the plugin build configuration to bundle the HTML file into the IIFE output
  - Verify the existing Import/Export UI functionality is preserved after extraction
  - _Requirements: 7.1_

- [ ] 4.2 Add WebSocket client to the plugin UI
  - Implement a WebSocket client in the extracted UI HTML that connects to the local MCP server on a configurable port
  - Send a handshake message on connection with the Figma file key, user identity, and plugin version
  - Relay incoming WebSocket messages to the plugin code via the existing postMessage bridge
  - Relay outgoing plugin messages to the WebSocket connection
  - Display a connection status indicator in the plugin UI
  - Implement automatic reconnection with 5-second retry interval and visual indicator
  - Send periodic heartbeat messages (every 30 seconds) to keep the connection alive
  - _Requirements: 7.1, 7.2, 7.3, 7.7_

- [ ] 4.3 Update the plugin manifest for network access
  - Add WebSocket localhost domains to the manifest network access configuration
  - Ensure the plugin can connect to `ws://localhost:9800` in both development and production modes
  - _Requirements: 7.1_

- [ ] 5. Add WebSocket message handlers to the plugin
- [ ] 5.1 Handle push-components messages from the MCP server
  - When a push-components message arrives via WebSocket, delegate to the existing import handler to create or update Figma nodes
  - For previously synced components, update existing nodes in-place rather than creating duplicates
  - Store baseline snapshots and component identity metadata on imported nodes
  - Return a push-result message with the created/updated node IDs and a summary
  - _Requirements: 2.2, 2.4, 2.6, 7.4_

- [ ] 5.2 Handle request-changeset and request-export messages
  - When a request-changeset message arrives, compute the changeset using the existing diff logic, generate warnings for unsyncable properties, and return the ChangesetDocument JSON as a changeset-result message
  - When a request-export message arrives, serialize the requested components and return the complete PluginInput JSON as an export-result message
  - Both handlers support optional component name filtering
  - _Requirements: 3.2, 7.5, 7.6, 9.1, 9.2_

- [ ] 5.3 Forward real-time change notifications via WebSocket
  - When the existing edit tracker detects a `documentchange` event on a tracked component, send a change-notification message via WebSocket with the component name, changed property categories, and timestamp
  - Send summary-level data only (not the full changeset); the full changeset is retrieved via pull-changeset
  - Notify when a tracked component is deleted so the MCP server can mark the mapping as stale
  - _Requirements: 4.1, 4.5, 5.6_

- [ ] 5.4 Implement unsyncable property warning generation
  - During changeset computation, detect Figma properties that have no DSL equivalent (effects, constraints, blend modes, rotation, masks, boolean operations)
  - Detect known DSL pipeline constraints (FILL sizing on top-level frames, VARIANT properties on non-component-set nodes)
  - Classify each warning by severity (info for cosmetic, warning for functional, error for sync-blocking)
  - Include warnings in the changeset response
  - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [ ] 6. Configure MCP server discovery and create bin stub
- [ ] 6.1 Create the MCP server configuration and bin entry point
  - Add the MCP server configuration file for Claude Code project-level discovery
  - Create a bin stub entry point for launching the MCP server process
  - Register the bin stub in the root package manifest
  - Verify Claude can discover and invoke the MCP tools
  - _Requirements: 1.2, 1.1_

- [ ] 7. Integration testing and end-to-end validation
- [ ] 7.1 Write unit tests for MCP server components
  - Test mapping registry CRUD operations (list, get, upsert, remove, markStale, atomic save/load)
  - Test pending queue behavior (enqueue, dequeue-and-clear, count)
  - Test request-response correlation (requestId matching, 30-second timeout, cleanup)
  - Test Zod schema validation for all MCP tool inputs
  - _Requirements: 5.1, 5.2, 5.5, 4.2, 4.3, 4.4_

- [ ] 7.2 Write integration tests for MCP tool flows
  - Test push flow: push-to-figma tool call → WebSocket message → mock plugin response → mapping created → human-readable result
  - Test pull flow: pull-changeset tool call → WebSocket request → mock changeset response → raw JSON returned with warnings
  - Test status/mapping/notification tools with mock connection state
  - Test error cases: plugin disconnected, request timeout, invalid input
  - _Requirements: 2.1, 2.3, 2.5, 3.1, 3.3, 3.6, 6.1, 8.1, 8.2, 8.5, 8.6_

- [ ]* 7.3 (P) Write plugin WebSocket communication tests
  - Test WebSocket client connection, handshake, reconnection behavior
  - Test message relay between WebSocket and plugin code postMessage bridge
  - Test change notification forwarding from edit tracker to WebSocket
  - Test unsyncable property warning generation for known edge cases
  - _Requirements: 7.1, 7.2, 7.7, 4.1, 9.1, 9.2, 9.3_
