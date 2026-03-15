#!/usr/bin/env node
import { createSyncServer } from './server.js';

const wsPort = Number(process.env.FIGMA_SYNC_PORT) || 9800;
const server = createSyncServer({ wsPort });

server.start().then(() => {
  process.stderr.write(`figma-sync MCP server running (WebSocket port ${wsPort})\n`);
});

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await server.stop();
  process.exit(0);
});
