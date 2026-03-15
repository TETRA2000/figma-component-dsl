import { describe, it, expect } from 'vitest';
import type {
  HandshakeMessage,
  HeartbeatMessage,
  PushComponentsMessage,
  RequestChangesetMessage,
  RequestExportMessage,
  PushResultMessage,
  ChangesetResultMessage,
  ExportResultMessage,
  ChangeNotificationMessage,
  ComponentDeletedMessage,
  ClientMessage,
  ServerMessage,
  SyncMessage,
} from './sync-messages.js';

describe('SyncMessage types', () => {
  it('should create a valid HandshakeMessage', () => {
    const msg: HandshakeMessage = {
      type: 'handshake',
      figmaFileKey: 'abc123',
      pluginVersion: '1.0.0',
      userId: 'user-1',
    };
    expect(msg.type).toBe('handshake');
    expect(msg.figmaFileKey).toBe('abc123');
  });

  it('should create a valid HeartbeatMessage', () => {
    const msg: HeartbeatMessage = {
      type: 'heartbeat',
      timestamp: '2026-03-15T00:00:00Z',
    };
    expect(msg.type).toBe('heartbeat');
  });

  it('should create a valid PushComponentsMessage with requestId', () => {
    const msg: PushComponentsMessage = {
      type: 'push-components',
      requestId: 'req-001',
      pluginInput: {
        schemaVersion: '1.0.0',
        targetPage: 'Test Page',
        components: [],
      },
    };
    expect(msg.type).toBe('push-components');
    expect(msg.requestId).toBe('req-001');
  });

  it('should create a valid RequestChangesetMessage', () => {
    const msg: RequestChangesetMessage = {
      type: 'request-changeset',
      requestId: 'req-002',
      componentNames: ['Button', 'Card'],
    };
    expect(msg.type).toBe('request-changeset');
    expect(msg.componentNames).toEqual(['Button', 'Card']);
  });

  it('should create a valid RequestChangesetMessage without component filter', () => {
    const msg: RequestChangesetMessage = {
      type: 'request-changeset',
      requestId: 'req-003',
    };
    expect(msg.componentNames).toBeUndefined();
  });

  it('should create a valid RequestExportMessage', () => {
    const msg: RequestExportMessage = {
      type: 'request-export',
      requestId: 'req-004',
      componentNames: ['Button'],
      pageName: 'Components',
    };
    expect(msg.type).toBe('request-export');
    expect(msg.pageName).toBe('Components');
  });

  it('should create a valid PushResultMessage', () => {
    const msg: PushResultMessage = {
      type: 'push-result',
      requestId: 'req-001',
      nodeIds: { Button: '1:2', Card: '3:4' },
      summary: 'Created 2 components',
    };
    expect(msg.type).toBe('push-result');
    expect(msg.nodeIds['Button']).toBe('1:2');
  });

  it('should create a valid ChangesetResultMessage', () => {
    const msg: ChangesetResultMessage = {
      type: 'changeset-result',
      requestId: 'req-002',
      changeset: {
        schemaVersion: '1.0',
        timestamp: '2026-03-15T00:00:00Z',
        source: { pluginVersion: '1.0.0', figmaFileName: 'test.fig' },
        components: [],
      },
    };
    expect(msg.type).toBe('changeset-result');
    expect(msg.changeset.schemaVersion).toBe('1.0');
  });

  it('should create a valid ExportResultMessage', () => {
    const msg: ExportResultMessage = {
      type: 'export-result',
      requestId: 'req-004',
      pluginInput: {
        schemaVersion: '1.0.0',
        targetPage: 'Test',
        components: [],
      },
    };
    expect(msg.type).toBe('export-result');
  });

  it('should create a valid ChangeNotificationMessage', () => {
    const msg: ChangeNotificationMessage = {
      type: 'change-notification',
      componentName: 'HeroSection',
      changedCategories: ['fills', 'typography'],
      timestamp: '2026-03-15T00:00:00Z',
    };
    expect(msg.type).toBe('change-notification');
    expect(msg.changedCategories).toContain('fills');
  });

  it('should create a valid ComponentDeletedMessage', () => {
    const msg: ComponentDeletedMessage = {
      type: 'component-deleted',
      componentName: 'OldButton',
      nodeId: '5:6',
    };
    expect(msg.type).toBe('component-deleted');
  });

  it('should allow ClientMessage union to hold any client message', () => {
    const messages: ClientMessage[] = [
      { type: 'handshake', figmaFileKey: 'f1', pluginVersion: '1.0', userId: 'u1' },
      { type: 'heartbeat', timestamp: '2026-03-15T00:00:00Z' },
      { type: 'push-result', requestId: 'r1', nodeIds: {}, summary: '' },
      { type: 'changeset-result', requestId: 'r2', changeset: { schemaVersion: '1.0', timestamp: '', source: { pluginVersion: '1.0', figmaFileName: '' }, components: [] } },
      { type: 'export-result', requestId: 'r3', pluginInput: { schemaVersion: '1.0.0', targetPage: '', components: [] } },
      { type: 'change-notification', componentName: 'A', changedCategories: [], timestamp: '' },
      { type: 'component-deleted', componentName: 'B', nodeId: '1:1' },
    ];
    expect(messages).toHaveLength(7);
  });

  it('should allow ServerMessage union to hold any server message', () => {
    const messages: ServerMessage[] = [
      { type: 'push-components', requestId: 'r1', pluginInput: { schemaVersion: '1.0.0', targetPage: '', components: [] } },
      { type: 'request-changeset', requestId: 'r2' },
      { type: 'request-export', requestId: 'r3' },
    ];
    expect(messages).toHaveLength(3);
  });

  it('should allow SyncMessage union to hold any message', () => {
    const msg: SyncMessage = { type: 'heartbeat', timestamp: '' };
    expect(msg.type).toBe('heartbeat');
  });

  it('should discriminate messages by type field', () => {
    const msg: SyncMessage = {
      type: 'push-result',
      requestId: 'r1',
      nodeIds: { Button: '1:1' },
      summary: 'done',
    };
    if (msg.type === 'push-result') {
      // Type narrowing should work
      expect(msg.nodeIds['Button']).toBe('1:1');
    }
  });
});
