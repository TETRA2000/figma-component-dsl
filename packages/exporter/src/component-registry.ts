// --- Component Registry ---
// Stores component definitions for cross-session reuse.
// Can load from a JSON file or build incrementally during batch export.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { computeStructuralHash } from './structural-hash.js';
import type { PluginNodeDef } from '@figma-dsl/core';

export interface RegistryEntry {
  name: string;
  figmaNodeId?: string;
  structuralHash: string;
  propertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  slotNames?: string[];
}

export interface RegistryData {
  version: string;
  entries: Record<string, RegistryEntry>;
}

export class ComponentRegistry {
  private entries: Map<string, RegistryEntry>;

  constructor() {
    this.entries = new Map();
  }

  static loadFromFile(filePath: string): ComponentRegistry {
    const registry = new ComponentRegistry();
    try {
      const data = JSON.parse(readFileSync(filePath, 'utf-8')) as RegistryData;
      for (const [name, entry] of Object.entries(data.entries)) {
        registry.entries.set(name, entry);
      }
    } catch {
      // Missing file → empty registry
    }
    return registry;
  }

  static fromData(data: RegistryData): ComponentRegistry {
    const registry = new ComponentRegistry();
    for (const [name, entry] of Object.entries(data.entries)) {
      registry.entries.set(name, entry);
    }
    return registry;
  }

  register(node: PluginNodeDef, figmaNodeId?: string): RegistryEntry {
    const hash = computeStructuralHash(node);
    const slotNames: string[] = [];
    for (const child of node.children) {
      if (child.isSlot && child.slotPropertyName) {
        slotNames.push(child.slotPropertyName);
      }
    }

    const entry: RegistryEntry = {
      name: node.name,
      figmaNodeId,
      structuralHash: hash,
      propertyDefinitions: node.componentPropertyDefinitions,
      slotNames: slotNames.length > 0 ? slotNames : undefined,
    };

    this.entries.set(node.name, entry);
    return entry;
  }

  get(name: string): RegistryEntry | undefined {
    return this.entries.get(name);
  }

  has(name: string): boolean {
    return this.entries.has(name);
  }

  /**
   * Match a subtree against the registry by name, then validate structural hash.
   * Returns the entry if matched, or undefined if not found or diverged.
   */
  match(node: PluginNodeDef): { entry: RegistryEntry; diverged: boolean } | undefined {
    const entry = this.entries.get(node.name);
    if (!entry) return undefined;

    const currentHash = computeStructuralHash(node);
    return {
      entry,
      diverged: currentHash !== entry.structuralHash,
    };
  }

  get size(): number {
    return this.entries.size;
  }

  toData(): RegistryData {
    const entries: Record<string, RegistryEntry> = {};
    for (const [name, entry] of this.entries) {
      entries[name] = entry;
    }
    return { version: '1.0.0', entries };
  }

  saveToFile(filePath: string): void {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, JSON.stringify(this.toData(), null, 2));
  }
}
