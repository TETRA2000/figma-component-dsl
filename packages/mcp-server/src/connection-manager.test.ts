import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConnectionManager } from './connection-manager.js';
import type { ClientMessage } from '@figma-dsl/core';

describe('ConnectionManager', () => {
  let manager: ConnectionManager;

  beforeEach(() => {
    manager = new ConnectionManager();
  });

  afterEach(() => {
    manager.dispose();
  });

  describe('connection state', () => {
    it('starts disconnected', () => {
      const status = manager.getStatus();
      expect(status.connected).toBe(false);
      expect(status.figmaFileKey).toBeNull();
      expect(status.pluginVersion).toBeNull();
      expect(status.lastHeartbeat).toBeNull();
    });

    it('updates state on handshake', () => {
      manager.handleMessage({
        type: 'handshake',
        figmaFileKey: 'abc123',
        pluginVersion: '1.0.0',
        userId: 'user1',
      });
      const status = manager.getStatus();
      expect(status.connected).toBe(true);
      expect(status.figmaFileKey).toBe('abc123');
      expect(status.pluginVersion).toBe('1.0.0');
      expect(status.connectedSince).toBeTruthy();
    });

    it('updates lastHeartbeat on heartbeat message', () => {
      manager.handleMessage({
        type: 'handshake',
        figmaFileKey: 'abc123',
        pluginVersion: '1.0.0',
        userId: 'user1',
      });
      const ts = '2026-03-15T00:00:00.000Z';
      manager.handleMessage({ type: 'heartbeat', timestamp: ts });
      expect(manager.getStatus().lastHeartbeat).toBe(ts);
    });

    it('resets state on disconnect', () => {
      manager.handleMessage({
        type: 'handshake',
        figmaFileKey: 'abc123',
        pluginVersion: '1.0.0',
        userId: 'user1',
      });
      manager.handleDisconnect();
      const status = manager.getStatus();
      expect(status.connected).toBe(false);
      expect(status.figmaFileKey).toBeNull();
    });
  });

  describe('request-response correlation', () => {
    it('sendRequest resolves when matching response arrives', async () => {
      manager.handleMessage({
        type: 'handshake',
        figmaFileKey: 'abc123',
        pluginVersion: '1.0.0',
        userId: 'user1',
      });

      // Simulate: we create a pending request, then resolve it
      const requestId = 'test-req-1';
      const responsePromise = manager.createPendingRequest(requestId);

      // Simulate incoming response
      const response: ClientMessage = {
        type: 'push-result',
        requestId: 'test-req-1',
        nodeIds: { Button: 'node-1' },
        summary: 'Created 1 component',
      };
      manager.handleMessage(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('rejects with timeout after specified duration', async () => {
      vi.useFakeTimers();

      const requestId = 'test-req-timeout';
      const responsePromise = manager.createPendingRequest(requestId, 100);

      vi.advanceTimersByTime(101);

      await expect(responsePromise).rejects.toThrow('timed out');

      vi.useRealTimers();
    });

    it('cleans up pending request after resolution', async () => {
      const requestId = 'test-cleanup';
      const responsePromise = manager.createPendingRequest(requestId);

      manager.handleMessage({
        type: 'push-result',
        requestId,
        nodeIds: {},
        summary: 'Done',
      });

      await responsePromise;
      expect(manager.pendingRequestCount).toBe(0);
    });

    it('cleans up pending request after timeout', async () => {
      vi.useFakeTimers();

      const requestId = 'test-cleanup-timeout';
      const responsePromise = manager.createPendingRequest(requestId, 100);

      vi.advanceTimersByTime(101);

      await expect(responsePromise).rejects.toThrow();
      expect(manager.pendingRequestCount).toBe(0);

      vi.useRealTimers();
    });

    it('rejects all pending requests on disconnect', async () => {
      const p1 = manager.createPendingRequest('req-1');
      const p2 = manager.createPendingRequest('req-2');

      manager.handleDisconnect();

      await expect(p1).rejects.toThrow('disconnected');
      await expect(p2).rejects.toThrow('disconnected');
      expect(manager.pendingRequestCount).toBe(0);
    });
  });

  describe('message routing', () => {
    it('invokes onChangeNotification callback', () => {
      const cb = vi.fn();
      manager.onChangeNotification = cb;

      manager.handleMessage({
        type: 'change-notification',
        componentName: 'Button',
        changedCategories: ['fills'],
        timestamp: '2026-03-15T00:00:00.000Z',
      });

      expect(cb).toHaveBeenCalledWith({
        type: 'change-notification',
        componentName: 'Button',
        changedCategories: ['fills'],
        timestamp: '2026-03-15T00:00:00.000Z',
      });
    });

    it('invokes onComponentDeleted callback', () => {
      const cb = vi.fn();
      manager.onComponentDeleted = cb;

      manager.handleMessage({
        type: 'component-deleted',
        componentName: 'Button',
        nodeId: 'node-1',
      });

      expect(cb).toHaveBeenCalledWith({
        type: 'component-deleted',
        componentName: 'Button',
        nodeId: 'node-1',
      });
    });
  });
});
