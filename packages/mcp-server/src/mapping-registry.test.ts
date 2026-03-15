import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { MappingRegistry, type ComponentMapping } from './mapping-registry.js';

describe('MappingRegistry', () => {
  let tmpDir: string;
  let registry: MappingRegistry;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mapping-test-'));
    const filePath = path.join(tmpDir, '.figma-sync', 'mappings.json');
    registry = new MappingRegistry(filePath);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('CRUD operations', () => {
    it('list returns empty array initially', () => {
      expect(registry.list()).toEqual([]);
    });

    it('upsert adds a new mapping', () => {
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-1',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      expect(registry.list()).toHaveLength(1);
      expect(registry.get('Button')?.figmaNodeId).toBe('node-1');
    });

    it('upsert updates existing mapping', () => {
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-1',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-2',
        lastSyncedAt: '2026-03-15T01:00:00.000Z',
        status: 'active',
      });
      expect(registry.list()).toHaveLength(1);
      expect(registry.get('Button')?.figmaNodeId).toBe('node-2');
    });

    it('get returns undefined for missing component', () => {
      expect(registry.get('NonExistent')).toBeUndefined();
    });

    it('remove deletes a mapping', () => {
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-1',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.remove('Button');
      expect(registry.list()).toHaveLength(0);
      expect(registry.get('Button')).toBeUndefined();
    });

    it('remove is no-op for missing component', () => {
      registry.remove('NonExistent');
      expect(registry.list()).toHaveLength(0);
    });

    it('markStale sets status to stale', () => {
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-1',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.markStale('Button');
      expect(registry.get('Button')?.status).toBe('stale');
    });
  });

  describe('persistence', () => {
    it('save creates directory and file', () => {
      registry.upsert({
        componentName: 'Card',
        figmaFileKey: 'file-2',
        figmaNodeId: 'node-5',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.save();

      const filePath = path.join(tmpDir, '.figma-sync', 'mappings.json');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('load restores saved data', () => {
      registry.upsert({
        componentName: 'Card',
        figmaFileKey: 'file-2',
        figmaNodeId: 'node-5',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.save();

      const filePath = path.join(tmpDir, '.figma-sync', 'mappings.json');
      const registry2 = new MappingRegistry(filePath);
      registry2.load();
      expect(registry2.list()).toHaveLength(1);
      expect(registry2.get('Card')?.figmaNodeId).toBe('node-5');
    });

    it('load is no-op when file does not exist', () => {
      const filePath = path.join(tmpDir, 'nonexistent', 'mappings.json');
      const registry2 = new MappingRegistry(filePath);
      registry2.load();
      expect(registry2.list()).toEqual([]);
    });

    it('save writes atomically (temp file + rename)', () => {
      registry.upsert({
        componentName: 'Button',
        figmaFileKey: 'file-1',
        figmaNodeId: 'node-1',
        lastSyncedAt: '2026-03-15T00:00:00.000Z',
        status: 'active',
      });
      registry.save();

      // Verify the final file exists and no temp files remain
      const dir = path.join(tmpDir, '.figma-sync');
      const files = fs.readdirSync(dir);
      expect(files).toEqual(['mappings.json']);
    });
  });
});
