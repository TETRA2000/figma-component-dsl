import { describe, it, expect } from 'vitest';
import { PendingQueue, type ChangeNotification } from './pending-queue.js';

describe('PendingQueue', () => {
  it('starts empty', () => {
    const queue = new PendingQueue();
    expect(queue.count()).toBe(0);
    expect(queue.getAndClear()).toEqual([]);
  });

  it('enqueue adds a notification', () => {
    const queue = new PendingQueue();
    queue.enqueue({
      componentName: 'Button',
      changedCategories: ['fills'],
      timestamp: '2026-03-15T00:00:00.000Z',
    });
    expect(queue.count()).toBe(1);
  });

  it('enqueue adds multiple notifications', () => {
    const queue = new PendingQueue();
    queue.enqueue({
      componentName: 'Button',
      changedCategories: ['fills'],
      timestamp: '2026-03-15T00:00:00.000Z',
    });
    queue.enqueue({
      componentName: 'Card',
      changedCategories: ['typography', 'layout'],
      timestamp: '2026-03-15T00:01:00.000Z',
    });
    expect(queue.count()).toBe(2);
  });

  it('getAndClear returns all and clears', () => {
    const queue = new PendingQueue();
    const n1: ChangeNotification = {
      componentName: 'Button',
      changedCategories: ['fills'],
      timestamp: '2026-03-15T00:00:00.000Z',
    };
    const n2: ChangeNotification = {
      componentName: 'Card',
      changedCategories: ['layout'],
      timestamp: '2026-03-15T00:01:00.000Z',
    };
    queue.enqueue(n1);
    queue.enqueue(n2);

    const result = queue.getAndClear();
    expect(result).toEqual([n1, n2]);
    expect(queue.count()).toBe(0);
    expect(queue.getAndClear()).toEqual([]);
  });
});
