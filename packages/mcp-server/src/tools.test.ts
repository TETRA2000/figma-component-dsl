import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerTools } from './tools.js';
import { ConnectionManager } from './connection-manager.js';
import { MappingRegistry } from './mapping-registry.js';
import { PendingQueue } from './pending-queue.js';
import type { ClientMessage } from '@figma-dsl/core';

function createMockMcpServer() {
  const tools = new Map<string, { schema: unknown; handler: (...args: unknown[]) => unknown }>();
  return {
    tool: vi.fn((name: string, schema: unknown, handler: (...args: unknown[]) => unknown) => {
      tools.set(name, { schema, handler });
    }),
    tools,
  };
}

function createToolContext() {
  const mcpServer = createMockMcpServer();
  const connectionManager = new ConnectionManager();
  const mappingRegistry = new MappingRegistry('/tmp/test-mappings.json');
  const pendingQueue = new PendingQueue();
  const sendMessage = vi.fn<(msg: unknown) => void>();

  registerTools(mcpServer as never, {
    connectionManager,
    mappingRegistry,
    pendingQueue,
    sendMessage,
  });

  return { mcpServer, connectionManager, mappingRegistry, pendingQueue, sendMessage };
}

describe('MCP Tools Registration', () => {
  it('registers all 8 tools', () => {
    const { mcpServer } = createToolContext();
    expect(mcpServer.tool).toHaveBeenCalledTimes(8);
    const names = mcpServer.tool.mock.calls.map((c: unknown[]) => c[0]);
    expect(names).toContain('push-to-figma');
    expect(names).toContain('pull-changeset');
    expect(names).toContain('pull-export');
    expect(names).toContain('get-status');
    expect(names).toContain('list-mappings');
    expect(names).toContain('update-mapping');
    expect(names).toContain('remove-mapping');
    expect(names).toContain('get-pending-changes');
  });
});

describe('push-to-figma tool', () => {
  it('returns error when plugin not connected', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('push-to-figma')!.handler;
    const result = await handler({ pluginInput: '{"components":[]}' }) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('not connected');
  });

  it('sends push-components message and returns result', async () => {
    const { mcpServer, connectionManager, sendMessage } = createToolContext();

    // Connect plugin
    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'abc',
      pluginVersion: '1.0.0',
      userId: 'u1',
    });

    const handler = mcpServer.tools.get('push-to-figma')!.handler;

    // Simulate async response
    sendMessage.mockImplementation((msg: unknown) => {
      const m = msg as { requestId: string };
      setTimeout(() => {
        connectionManager.handleMessage({
          type: 'push-result',
          requestId: m.requestId,
          nodeIds: { Button: 'node-1' },
          summary: 'Created 1 component',
        });
      }, 5);
    });

    const result = await handler({ pluginInput: '{"components":[]}' }) as { content: Array<{ text: string }> };
    expect(sendMessage).toHaveBeenCalled();
    expect(result.content[0].text).toContain('Created 1 component');
  });
});

describe('pull-changeset tool', () => {
  it('returns error when plugin not connected', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('pull-changeset')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('not connected');
  });

  it('sends request-changeset and returns raw JSON', async () => {
    const { mcpServer, connectionManager, sendMessage } = createToolContext();

    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'abc',
      pluginVersion: '1.0.0',
      userId: 'u1',
    });

    const handler = mcpServer.tools.get('pull-changeset')!.handler;

    const mockChangeset = {
      schemaVersion: '1.0',
      timestamp: '2026-03-15T00:00:00.000Z',
      source: { pluginVersion: '1.0.0', figmaFileName: 'test.fig' },
      components: [],
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

    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('schemaVersion');
  });
});

describe('pull-export tool', () => {
  it('returns error when plugin not connected', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('pull-export')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('not connected');
  });

  it('sends request-export and returns raw JSON', async () => {
    const { mcpServer, connectionManager, sendMessage } = createToolContext();

    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'abc',
      pluginVersion: '1.0.0',
      userId: 'u1',
    });

    const handler = mcpServer.tools.get('pull-export')!.handler;

    const mockPluginInput = { components: [] };

    sendMessage.mockImplementation((msg: unknown) => {
      const m = msg as { requestId: string };
      setTimeout(() => {
        connectionManager.handleMessage({
          type: 'export-result',
          requestId: m.requestId,
          pluginInput: mockPluginInput as never,
        });
      }, 5);
    });

    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('components');
  });
});

describe('get-status tool', () => {
  it('returns disconnected status with setup instructions', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('get-status')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Disconnected');
  });

  it('returns connected status with details', async () => {
    const { mcpServer, connectionManager } = createToolContext();

    connectionManager.handleMessage({
      type: 'handshake',
      figmaFileKey: 'abc123',
      pluginVersion: '1.0.0',
      userId: 'u1',
    });

    const handler = mcpServer.tools.get('get-status')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Connected');
    expect(result.content[0].text).toContain('abc123');
  });
});

describe('list-mappings tool', () => {
  it('returns empty list when no mappings', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('list-mappings')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('No component mappings');
  });

  it('returns mappings list', async () => {
    const { mcpServer, mappingRegistry } = createToolContext();
    mappingRegistry.upsert({
      componentName: 'Button',
      figmaFileKey: 'file-1',
      figmaNodeId: 'node-1',
      lastSyncedAt: '2026-03-15T00:00:00.000Z',
      status: 'active',
    });

    const handler = mcpServer.tools.get('list-mappings')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Button');
    expect(result.content[0].text).toContain('active');
  });
});

describe('update-mapping tool', () => {
  it('creates a new mapping', async () => {
    const { mcpServer, mappingRegistry } = createToolContext();
    const handler = mcpServer.tools.get('update-mapping')!.handler;
    const result = await handler({
      componentName: 'Card',
      figmaFileKey: 'file-1',
      figmaNodeId: 'node-5',
    }) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Card');
    expect(mappingRegistry.get('Card')?.figmaNodeId).toBe('node-5');
  });
});

describe('remove-mapping tool', () => {
  it('removes an existing mapping', async () => {
    const { mcpServer, mappingRegistry } = createToolContext();
    mappingRegistry.upsert({
      componentName: 'Button',
      figmaFileKey: 'file-1',
      figmaNodeId: 'node-1',
      lastSyncedAt: '2026-03-15T00:00:00.000Z',
      status: 'active',
    });

    const handler = mcpServer.tools.get('remove-mapping')!.handler;
    const result = await handler({ componentName: 'Button' }) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Removed');
    expect(mappingRegistry.get('Button')).toBeUndefined();
  });
});

describe('get-pending-changes tool', () => {
  it('returns empty when no pending changes', async () => {
    const { mcpServer } = createToolContext();
    const handler = mcpServer.tools.get('get-pending-changes')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('No pending');
  });

  it('returns and clears pending changes', async () => {
    const { mcpServer, pendingQueue } = createToolContext();
    pendingQueue.enqueue({
      componentName: 'Button',
      changedCategories: ['fills'],
      timestamp: '2026-03-15T00:00:00.000Z',
    });

    const handler = mcpServer.tools.get('get-pending-changes')!.handler;
    const result = await handler({}) as { content: Array<{ text: string }> };
    expect(result.content[0].text).toContain('Button');
    expect(pendingQueue.count()).toBe(0);
  });
});
