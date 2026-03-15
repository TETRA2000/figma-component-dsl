import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { registerTools } from './tools.js';
import { ConnectionManager } from './connection-manager.js';
import { MappingRegistry } from './mapping-registry.js';
import { PendingQueue } from './pending-queue.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

function createMockMcpServer() {
  const tools = new Map<string, { schema: unknown; handler: (...args: unknown[]) => unknown }>();
  return {
    tool: vi.fn((name: string, schema: unknown, handler: (...args: unknown[]) => unknown) => {
      tools.set(name, { schema, handler });
    }),
    tools,
  };
}

describe('Integration: Push flow', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('push-to-figma → WebSocket message → mock response → mapping created → result', async () => {
    const mcpServer = createMockMcpServer();
    const connectionManager = new ConnectionManager();
    const mappingRegistry = new MappingRegistry(path.join(tmpDir, 'mappings.json'));
    const pendingQueue = new PendingQueue();
    const sendMessage = vi.fn();

    registerTools(mcpServer as never, {
      connectionManager,
      mappingRegistry,
      pendingQueue,
      sendMessage,
    });

    // Connect plugin
    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'test-file',
      pluginVersion: '1.0.0',
      userId: 'user1',
    });

    const pushHandler = mcpServer.tools.get('push-to-figma')!.handler;

    // Simulate plugin response
    sendMessage.mockImplementation((msg: unknown) => {
      const m = msg as { requestId: string };
      setTimeout(() => {
        connectionManager.handleMessage({
          type: 'push-result',
          requestId: m.requestId,
          nodeIds: { Button: 'node-btn-1', Card: 'node-card-1' },
          summary: 'Created 2 components',
        });
      }, 5);
    });

    const result = await pushHandler({
      pluginInput: JSON.stringify({
        schemaVersion: '1.0.0',
        targetPage: 'Test',
        components: [
          { name: 'Button', type: 'FRAME', size: { x: 100, y: 40 } },
          { name: 'Card', type: 'FRAME', size: { x: 200, y: 150 } },
        ],
      }),
    }) as { content: Array<{ text: string }> };

    // Verify WebSocket message was sent
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'push-components',
        requestId: expect.any(String),
      }),
    );

    // Verify result
    expect(result.content[0].text).toContain('Created 2 components');

    // Verify mappings were created
    expect(mappingRegistry.get('Button')?.figmaNodeId).toBe('node-btn-1');
    expect(mappingRegistry.get('Card')?.figmaNodeId).toBe('node-card-1');
    expect(mappingRegistry.list()).toHaveLength(2);
  });
});

describe('Integration: Pull flow', () => {
  it('pull-changeset → WebSocket request → mock response → raw JSON with warnings', async () => {
    const mcpServer = createMockMcpServer();
    const connectionManager = new ConnectionManager();
    const mappingRegistry = new MappingRegistry('/tmp/test-pull.json');
    const pendingQueue = new PendingQueue();
    const sendMessage = vi.fn();

    registerTools(mcpServer as never, {
      connectionManager,
      mappingRegistry,
      pendingQueue,
      sendMessage,
    });

    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'test-file',
      pluginVersion: '1.0.0',
      userId: 'user1',
    });

    const pullHandler = mcpServer.tools.get('pull-changeset')!.handler;

    const mockChangeset = {
      schemaVersion: '1.0',
      timestamp: '2026-03-15T00:00:00.000Z',
      source: { pluginVersion: '1.0.0', figmaFileName: 'test.fig' },
      components: [
        {
          componentName: 'Button',
          componentId: 'node-1',
          changes: [
            {
              propertyPath: 'fills.0.color.r',
              changeType: 'modified',
              oldValue: 0.2,
              newValue: 0.8,
              description: 'Changed primary color',
            },
          ],
        },
      ],
      warnings: [
        {
          propertyPath: 'effects.0',
          severity: 'warning',
          description: 'Drop shadow not supported in DSL',
        },
      ],
    };

    sendMessage.mockImplementation((msg: unknown) => {
      const m = msg as { requestId: string };
      setTimeout(() => {
        connectionManager.handleMessage({
          type: 'changeset-result',
          requestId: m.requestId,
          changeset: mockChangeset,
        });
      }, 5);
    });

    const result = await pullHandler({ componentNames: ['Button'] }) as { content: Array<{ text: string }> };

    // Verify request was sent with component filter
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'request-changeset',
        componentNames: ['Button'],
      }),
    );

    // Verify result contains raw JSON
    const text = result.content[0].text;
    expect(text).toContain('1 component(s), 1 change(s), 1 warning(s)');
    expect(text).toContain('"schemaVersion"');
    expect(text).toContain('Drop shadow not supported');
  });
});

describe('Integration: Status and notification flow', () => {
  it('status shows setup instructions when disconnected', async () => {
    const mcpServer = createMockMcpServer();
    const connectionManager = new ConnectionManager();
    const mappingRegistry = new MappingRegistry('/tmp/test-status.json');
    const pendingQueue = new PendingQueue();

    registerTools(mcpServer as never, {
      connectionManager,
      mappingRegistry,
      pendingQueue,
      sendMessage: vi.fn(),
    });

    const statusHandler = mcpServer.tools.get('get-status')!.handler;
    const result = await statusHandler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Disconnected');
    expect(result.content[0].text).toContain('Setup');
  });

  it('notifications flow: enqueue → get-pending-changes → cleared', async () => {
    const mcpServer = createMockMcpServer();
    const connectionManager = new ConnectionManager();
    const mappingRegistry = new MappingRegistry('/tmp/test-notify.json');
    const pendingQueue = new PendingQueue();

    registerTools(mcpServer as never, {
      connectionManager,
      mappingRegistry,
      pendingQueue,
      sendMessage: vi.fn(),
    });

    // Simulate notification via connectionManager callback
    connectionManager.onChangeNotification = (msg) => {
      pendingQueue.enqueue({
        componentName: msg.componentName,
        changedCategories: [...msg.changedCategories],
        timestamp: msg.timestamp,
      });
    };

    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'test',
      pluginVersion: '1.0.0',
      userId: 'u1',
    });

    // Simulate change notification
    connectionManager.handleMessage({
      type: 'change-notification',
      componentName: 'Button',
      changedCategories: ['fills', 'typography'],
      timestamp: '2026-03-15T00:00:00.000Z',
    });

    const handler = mcpServer.tools.get('get-pending-changes')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Button');
    expect(result.content[0].text).toContain('fills');

    // Verify cleared
    const result2 = await handler({}) as { content: Array<{ text: string }> };
    expect(result2.content[0].text).toContain('No pending');
  });
});

describe('Integration: Error cases', () => {
  it('push returns error when disconnected', async () => {
    const mcpServer = createMockMcpServer();
    const connectionManager = new ConnectionManager();
    const mappingRegistry = new MappingRegistry('/tmp/test-err.json');
    const pendingQueue = new PendingQueue();

    registerTools(mcpServer as never, {
      connectionManager,
      mappingRegistry,
      pendingQueue,
      sendMessage: vi.fn(),
    });

    const handler = mcpServer.tools.get('push-to-figma')!.handler;
    const result = await handler({ pluginInput: '{}' }) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('not connected');
  });

  it('request timeout rejects pending request', async () => {
    vi.useFakeTimers();

    const connectionManager = new ConnectionManager();
    const promise = connectionManager.createPendingRequest('timeout-test', 100);

    vi.advanceTimersByTime(101);

    await expect(promise).rejects.toThrow('timed out');

    vi.useRealTimers();
  });
});
