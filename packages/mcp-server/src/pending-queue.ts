export interface ChangeNotification {
  readonly componentName: string;
  readonly changedCategories: ReadonlyArray<string>;
  readonly timestamp: string;
}

export class PendingQueue {
  private readonly queue: ChangeNotification[] = [];

  enqueue(notification: ChangeNotification): void {
    this.queue.push(notification);
  }

  getAndClear(): ReadonlyArray<ChangeNotification> {
    const items = [...this.queue];
    this.queue.length = 0;
    return items;
  }

  count(): number {
    return this.queue.length;
  }
}
