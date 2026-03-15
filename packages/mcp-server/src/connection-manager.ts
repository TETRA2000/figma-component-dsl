import type {
  ClientMessage,
  ChangeNotificationMessage,
  ComponentDeletedMessage,
} from '@figma-dsl/core';

const DEFAULT_TIMEOUT_MS = 30_000;

interface PendingRequest {
  readonly resolve: (response: ClientMessage) => void;
  readonly reject: (error: Error) => void;
  readonly timer: ReturnType<typeof setTimeout>;
}

export interface ConnectionStatus {
  readonly connected: boolean;
  readonly figmaFileKey: string | null;
  readonly pluginVersion: string | null;
  readonly lastHeartbeat: string | null;
  readonly connectedSince: string | null;
}

export class ConnectionManager {
  private connected = false;
  private figmaFileKey: string | null = null;
  private pluginVersion: string | null = null;
  private lastHeartbeat: string | null = null;
  private connectedSince: string | null = null;
  private readonly pending = new Map<string, PendingRequest>();

  onChangeNotification?: (msg: ChangeNotificationMessage) => void;
  onComponentDeleted?: (msg: ComponentDeletedMessage) => void;

  getStatus(): ConnectionStatus {
    return {
      connected: this.connected,
      figmaFileKey: this.figmaFileKey,
      pluginVersion: this.pluginVersion,
      lastHeartbeat: this.lastHeartbeat,
      connectedSince: this.connectedSince,
    };
  }

  get pendingRequestCount(): number {
    return this.pending.size;
  }

  handleMessage(message: ClientMessage): void {
    switch (message.type) {
      case 'handshake':
        this.connected = true;
        this.figmaFileKey = message.figmaFileKey;
        this.pluginVersion = message.pluginVersion;
        this.connectedSince = new Date().toISOString();
        break;

      case 'heartbeat':
        this.lastHeartbeat = message.timestamp;
        break;

      case 'push-result':
      case 'changeset-result':
      case 'export-result': {
        const pendingReq = this.pending.get(message.requestId);
        if (pendingReq) {
          clearTimeout(pendingReq.timer);
          this.pending.delete(message.requestId);
          pendingReq.resolve(message);
        }
        break;
      }

      case 'change-notification':
        this.onChangeNotification?.(message);
        break;

      case 'component-deleted':
        this.onComponentDeleted?.(message);
        break;
    }
  }

  createPendingRequest(
    requestId: string,
    timeoutMs: number = DEFAULT_TIMEOUT_MS,
  ): Promise<ClientMessage> {
    return new Promise<ClientMessage>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error(`Request ${requestId} timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      this.pending.set(requestId, { resolve, reject, timer });
    });
  }

  handleDisconnect(): void {
    this.connected = false;
    this.figmaFileKey = null;
    this.pluginVersion = null;
    this.lastHeartbeat = null;
    this.connectedSince = null;

    // Reject all pending requests
    for (const [id, req] of this.pending) {
      clearTimeout(req.timer);
      req.reject(new Error(`Plugin disconnected, request ${id} cancelled`));
    }
    this.pending.clear();
  }

  dispose(): void {
    for (const [, req] of this.pending) {
      clearTimeout(req.timer);
    }
    this.pending.clear();
  }
}
