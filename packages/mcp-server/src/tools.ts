import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerMessage, ClientMessage } from '@figma-dsl/core';
import type { ConnectionManager } from './connection-manager.js';
import type { MappingRegistry } from './mapping-registry.js';
import type { PendingQueue } from './pending-queue.js';

export interface ToolDependencies {
  readonly connectionManager: ConnectionManager;
  readonly mappingRegistry: MappingRegistry;
  readonly pendingQueue: PendingQueue;
  readonly sendMessage: (msg: ServerMessage) => void;
}

function textResult(text: string) {
  return { content: [{ type: 'text' as const, text }] };
}

function notConnectedError() {
  return textResult(
    'Figma plugin is not connected. Open Figma Desktop and ensure the sync plugin is running.',
  );
}

function generateRequestId(): string {
  return crypto.randomUUID();
}

export function registerTools(mcpServer: McpServer, deps: ToolDependencies): void {
  const { connectionManager, mappingRegistry, pendingQueue, sendMessage } = deps;

  // --- push-to-figma ---
  mcpServer.tool(
    'push-to-figma',
    { pluginInput: z.string().describe('JSON-serialized PluginInput') },
    async ({ pluginInput }: { pluginInput: string }) => {
      if (!connectionManager.getStatus().connected) {
        return notConnectedError();
      }

      const requestId = generateRequestId();
      const responsePromise = connectionManager.createPendingRequest(requestId);

      sendMessage({
        type: 'push-components',
        requestId,
        pluginInput: JSON.parse(pluginInput),
      });

      const response = await responsePromise as Extract<ClientMessage, { type: 'push-result' }>;

      // Update mapping registry with returned node IDs
      for (const [name, nodeId] of Object.entries(response.nodeIds)) {
        mappingRegistry.upsert({
          componentName: name,
          figmaFileKey: connectionManager.getStatus().figmaFileKey!,
          figmaNodeId: nodeId,
          lastSyncedAt: new Date().toISOString(),
          status: 'active',
        });
      }

      return textResult(response.summary);
    },
  );

  // --- pull-changeset ---
  mcpServer.tool(
    'pull-changeset',
    {
      componentNames: z.array(z.string()).optional().describe('Filter by component names'),
    },
    async ({ componentNames }: { componentNames?: string[] }) => {
      if (!connectionManager.getStatus().connected) {
        return notConnectedError();
      }

      const requestId = generateRequestId();
      const responsePromise = connectionManager.createPendingRequest(requestId);

      sendMessage({
        type: 'request-changeset',
        requestId,
        ...(componentNames ? { componentNames } : {}),
      });

      const response = await responsePromise as Extract<ClientMessage, { type: 'changeset-result' }>;
      const json = JSON.stringify(response.changeset, null, 2);

      const componentCount = response.changeset.components.length;
      const changeCount = response.changeset.components.reduce(
        (sum, c) => sum + c.changes.length, 0,
      );
      const warningCount = response.changeset.warnings?.length ?? 0;

      let summary = `Changeset: ${componentCount} component(s), ${changeCount} change(s)`;
      if (warningCount > 0) {
        summary += `, ${warningCount} warning(s)`;
      }

      return textResult(`${summary}\n\n${json}`);
    },
  );

  // --- pull-export ---
  mcpServer.tool(
    'pull-export',
    {
      componentNames: z.array(z.string()).optional().describe('Filter by component names'),
      pageName: z.string().optional().describe('Figma page name to export from'),
    },
    async ({ componentNames, pageName }: { componentNames?: string[]; pageName?: string }) => {
      if (!connectionManager.getStatus().connected) {
        return notConnectedError();
      }

      const requestId = generateRequestId();
      const responsePromise = connectionManager.createPendingRequest(requestId);

      sendMessage({
        type: 'request-export',
        requestId,
        ...(componentNames ? { componentNames } : {}),
        ...(pageName ? { pageName } : {}),
      });

      const response = await responsePromise as Extract<ClientMessage, { type: 'export-result' }>;
      const json = JSON.stringify(response.pluginInput, null, 2);
      return textResult(json);
    },
  );

  // --- get-status ---
  mcpServer.tool(
    'get-status',
    {},
    async () => {
      const status = connectionManager.getStatus();
      const mappingCount = mappingRegistry.list().length;
      const pendingCount = pendingQueue.count();

      if (!status.connected) {
        return textResult(
          `Status: Disconnected\n` +
          `Tracked components: ${mappingCount}\n` +
          `Pending changes: ${pendingCount}\n\n` +
          `Setup: Open Figma Desktop, run the sync plugin, and it will connect automatically.`,
        );
      }

      return textResult(
        `Status: Connected\n` +
        `Figma file: ${status.figmaFileKey}\n` +
        `Plugin version: ${status.pluginVersion}\n` +
        `Connected since: ${status.connectedSince}\n` +
        `Last heartbeat: ${status.lastHeartbeat ?? 'N/A'}\n` +
        `Tracked components: ${mappingCount}\n` +
        `Pending changes: ${pendingCount}`,
      );
    },
  );

  // --- list-mappings ---
  mcpServer.tool(
    'list-mappings',
    {},
    async () => {
      const mappings = mappingRegistry.list();
      if (mappings.length === 0) {
        return textResult('No component mappings registered.');
      }

      const lines = mappings.map(
        (m) => `- ${m.componentName} [${m.status}] → ${m.figmaNodeId} (synced: ${m.lastSyncedAt})`,
      );
      return textResult(`Component mappings (${mappings.length}):\n${lines.join('\n')}`);
    },
  );

  // --- update-mapping ---
  mcpServer.tool(
    'update-mapping',
    {
      componentName: z.string().describe('Component name'),
      figmaFileKey: z.string().describe('Figma file key'),
      figmaNodeId: z.string().describe('Figma node ID'),
    },
    async ({ componentName, figmaFileKey, figmaNodeId }: {
      componentName: string;
      figmaFileKey: string;
      figmaNodeId: string;
    }) => {
      mappingRegistry.upsert({
        componentName,
        figmaFileKey,
        figmaNodeId,
        lastSyncedAt: new Date().toISOString(),
        status: 'active',
      });
      return textResult(`Updated mapping for ${componentName} → ${figmaNodeId}`);
    },
  );

  // --- remove-mapping ---
  mcpServer.tool(
    'remove-mapping',
    {
      componentName: z.string().describe('Component name to remove'),
    },
    async ({ componentName }: { componentName: string }) => {
      mappingRegistry.remove(componentName);
      return textResult(`Removed mapping for ${componentName}`);
    },
  );

  // --- get-pending-changes ---
  mcpServer.tool(
    'get-pending-changes',
    {},
    async () => {
      const changes = pendingQueue.getAndClear();
      if (changes.length === 0) {
        return textResult('No pending change notifications.');
      }

      const lines = changes.map(
        (c) => `- ${c.componentName}: ${c.changedCategories.join(', ')} (${c.timestamp})`,
      );
      return textResult(
        `Pending changes (${changes.length}):\n${lines.join('\n')}\n\nUse pull-changeset to get full details.`,
      );
    },
  );
}
