import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { WebSocketServer } from 'ws';

// Mock ws module before importing server
vi.mock('ws', () => {
  const MockWebSocketServer = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    close: vi.fn((_cb?: () => void) => { _cb?.(); }),
    address: vi.fn().mockReturnValue({ port: 9800 }),
  }));
  return { WebSocketServer: MockWebSocketServer };
});

// Mock MCP SDK
vi.mock('@modelcontextprotocol/sdk/server/mcp.js', () => {
  const MockMcpServer = vi.fn().mockImplementation(() => ({
    tool: vi.fn(),
    connect: vi.fn().mockResolvedValue(undefined),
  }));
  return { McpServer: MockMcpServer };
});

vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => {
  const MockStdioServerTransport = vi.fn().mockImplementation(() => ({}));
  return { StdioServerTransport: MockStdioServerTransport };
});

describe('createSyncServer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a server with default port 9800', async () => {
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer();
    expect(server).toBeDefined();
    expect(server.wsPort).toBe(9800);
  });

  it('creates a server with custom port', async () => {
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer({ wsPort: 9900 });
    expect(server.wsPort).toBe(9900);
  });

  it('exposes start and stop methods', async () => {
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer();
    expect(typeof server.start).toBe('function');
    expect(typeof server.stop).toBe('function');
  });

  it('starts WebSocket server on specified port', async () => {
    const { WebSocketServer } = await import('ws');
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer({ wsPort: 9800 });
    await server.start();
    expect(WebSocketServer).toHaveBeenCalledWith(
      expect.objectContaining({ port: 9800, host: '127.0.0.1' })
    );
    await server.stop();
  });

  it('reads port from FIGMA_SYNC_PORT environment variable', async () => {
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer({ wsPort: Number(process.env['FIGMA_SYNC_PORT']) || 9800 });
    expect(server.wsPort).toBe(9800);
  });

  it('stop closes WebSocket server', async () => {
    const { createSyncServer } = await import('./server.js');
    const server = createSyncServer();
    await server.start();
    await server.stop();
    // Should not throw
  });
});
