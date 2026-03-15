// --- Sync WebSocket Message Protocol ---
// Typed message protocol shared by the MCP server and Figma plugin
// for real-time bidirectional communication.

import type { PluginInput } from './plugin-types.js';
import type { ChangesetDocument } from './changeset.js';

// --- Client → Server messages (Plugin → MCP Server) ---

export interface HandshakeMessage {
  readonly type: 'handshake';
  readonly figmaFileKey: string;
  readonly pluginVersion: string;
  readonly userId: string;
}

export interface HeartbeatMessage {
  readonly type: 'heartbeat';
  readonly timestamp: string;
}

export interface PushResultMessage {
  readonly type: 'push-result';
  readonly requestId: string;
  readonly nodeIds: Record<string, string>;
  readonly summary: string;
}

export interface ChangesetResultMessage {
  readonly type: 'changeset-result';
  readonly requestId: string;
  readonly changeset: ChangesetDocument;
}

export interface ExportResultMessage {
  readonly type: 'export-result';
  readonly requestId: string;
  readonly pluginInput: PluginInput;
}

export interface ChangeNotificationMessage {
  readonly type: 'change-notification';
  readonly componentName: string;
  readonly changedCategories: ReadonlyArray<string>;
  readonly timestamp: string;
}

export interface ComponentDeletedMessage {
  readonly type: 'component-deleted';
  readonly componentName: string;
  readonly nodeId: string;
}

// --- Server → Client messages (MCP Server → Plugin) ---

export interface PushComponentsMessage {
  readonly type: 'push-components';
  readonly requestId: string;
  readonly pluginInput: PluginInput;
}

export interface RequestChangesetMessage {
  readonly type: 'request-changeset';
  readonly requestId: string;
  readonly componentNames?: ReadonlyArray<string>;
}

export interface RequestExportMessage {
  readonly type: 'request-export';
  readonly requestId: string;
  readonly componentNames?: ReadonlyArray<string>;
  readonly pageName?: string;
}

// --- Union types ---

export type ClientMessage =
  | HandshakeMessage
  | HeartbeatMessage
  | PushResultMessage
  | ChangesetResultMessage
  | ExportResultMessage
  | ChangeNotificationMessage
  | ComponentDeletedMessage;

export type ServerMessage =
  | PushComponentsMessage
  | RequestChangesetMessage
  | RequestExportMessage;

export type SyncMessage = ClientMessage | ServerMessage;
