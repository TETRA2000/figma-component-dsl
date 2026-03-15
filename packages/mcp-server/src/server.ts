import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { WebSocketServer, WebSocket } from 'ws';
import * as path from 'node:path';
import type { ClientMessage, ServerMessage } from '@figma-dsl/core';
import { ConnectionManager } from './connection-manager.js';
import { MappingRegistry } from './mapping-registry.js';
import { PendingQueue } from './pending-queue.js';
import { registerTools } from './tools.js';

export interface SyncServerOptions {
  readonly wsPort?: number;
  readonly mappingFilePath?: string;
}

export interface SyncServer {
  readonly wsPort: number;
  start(): Promise<void>;
  stop(): Promise<void>;
}

export function createSyncServer(options?: SyncServerOptions): SyncServer {
  const wsPort = options?.wsPort ?? 9800;
  const mappingFilePath = options?.mappingFilePath ??
    path.join(process.cwd(), '.figma-sync', 'mappings.json');

  let wss: WebSocketServer | null = null;
  let mcpServer: McpServer | null = null;
  let activeSocket: WebSocket | null = null;

  const connectionManager = new ConnectionManager();
  const mappingRegistry = new MappingRegistry(mappingFilePath);
  const pendingQueue = new PendingQueue();

  // Load persisted mappings
  mappingRegistry.load();

  // Wire up change notifications
  connectionManager.onChangeNotification = (msg) => {
    pendingQueue.enqueue({
      componentName: msg.componentName,
      changedCategories: [...msg.changedCategories],
      timestamp: msg.timestamp,
    });
  };

  connectionManager.onComponentDeleted = (msg) => {
    mappingRegistry.markStale(msg.componentName);
    mappingRegistry.save();
  };

  function sendMessage(msg: ServerMessage): void {
    if (activeSocket && activeSocket.readyState === WebSocket.OPEN) {
      activeSocket.send(JSON.stringify(msg));
    }
  }

  return {
    wsPort,

    async start(): Promise<void> {
      // Initialize MCP server with stdio transport
      mcpServer = new McpServer({
        name: 'figma-sync',
        version: '0.1.0',
      });

      // Register all tools
      registerTools(mcpServer, {
        connectionManager,
        mappingRegistry,
        pendingQueue,
        sendMessage,
      });

      const transport = new StdioServerTransport();
      await mcpServer.connect(transport);

      // Start WebSocket server on localhost only
      wss = new WebSocketServer({ port: wsPort, host: '127.0.0.1' });

      wss.on('connection', (socket) => {
        activeSocket = socket;

        socket.on('message', (data) => {
          try {
            const message = JSON.parse(data.toString()) as ClientMessage;
            connectionManager.handleMessage(message);
          } catch {
            // Ignore malformed messages
          }
        });

        socket.on('close', () => {
          if (activeSocket === socket) {
            activeSocket = null;
            connectionManager.handleDisconnect();
          }
        });

        socket.on('error', () => {
          // Error handler to prevent unhandled exceptions
        });
      });
    },

    async stop(): Promise<void> {
      connectionManager.dispose();
      if (wss) {
        await new Promise<void>((resolve) => {
          wss!.close(() => resolve());
        });
        wss = null;
      }
    },
  };
}
