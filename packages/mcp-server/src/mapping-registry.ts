import * as fs from 'node:fs';
import * as path from 'node:path';

export interface ComponentMapping {
  readonly componentName: string;
  readonly figmaFileKey: string;
  readonly figmaNodeId: string;
  readonly lastSyncedAt: string;
  readonly status: 'active' | 'stale';
}

interface MappingRegistryFile {
  readonly schemaVersion: string;
  readonly mappings: Record<string, ComponentMapping>;
}

export class MappingRegistry {
  private readonly filePath: string;
  private mappings = new Map<string, ComponentMapping>();

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  list(): ReadonlyArray<ComponentMapping> {
    return [...this.mappings.values()];
  }

  get(componentName: string): ComponentMapping | undefined {
    return this.mappings.get(componentName);
  }

  upsert(mapping: ComponentMapping): void {
    this.mappings.set(mapping.componentName, mapping);
  }

  remove(componentName: string): void {
    this.mappings.delete(componentName);
  }

  markStale(componentName: string): void {
    const existing = this.mappings.get(componentName);
    if (existing) {
      this.mappings.set(componentName, { ...existing, status: 'stale' });
    }
  }

  save(): void {
    const dir = path.dirname(this.filePath);
    fs.mkdirSync(dir, { recursive: true });

    const data: MappingRegistryFile = {
      schemaVersion: '1.0',
      mappings: Object.fromEntries(this.mappings),
    };

    const tmpPath = this.filePath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, this.filePath);
  }

  load(): void {
    if (!fs.existsSync(this.filePath)) {
      return;
    }

    const content = fs.readFileSync(this.filePath, 'utf-8');
    const data = JSON.parse(content) as MappingRegistryFile;
    this.mappings.clear();
    for (const [name, mapping] of Object.entries(data.mappings)) {
      this.mappings.set(name, mapping);
    }
  }
}
