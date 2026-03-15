// --- Slot Utilities ---
// Extracted from plugin code for testability.
// Handles slot naming, file scanning map building, instance resolution strategy,
// and detached copy structure generation.

import type { PluginNodeDef } from '@figma-dsl/core';

// --- Slot Naming Convention ---

const SLOT_PREFIX = '[Slot] ';

export function formatSlotName(slotName: string): string {
  return `${SLOT_PREFIX}${slotName}`;
}

export function isSlotFrameName(name: string): boolean {
  return name.startsWith(SLOT_PREFIX);
}

export function extractSlotName(frameName: string): string | undefined {
  if (!isSlotFrameName(frameName)) return undefined;
  return frameName.slice(SLOT_PREFIX.length);
}

// --- File Scanner Map ---

export interface ComponentEntry {
  readonly name: string;
  readonly nodeId: string;
}

export function buildComponentMap(entries: readonly ComponentEntry[]): Map<string, ComponentEntry> {
  const map = new Map<string, ComponentEntry>();
  const duplicates: string[] = [];

  for (const entry of entries) {
    if (map.has(entry.name)) {
      duplicates.push(entry.name);
      continue; // First match wins
    }
    map.set(entry.name, entry);
  }

  return map;
}

export function findDuplicateNames(entries: readonly ComponentEntry[]): string[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const entry of entries) {
    if (seen.has(entry.name)) {
      if (!duplicates.includes(entry.name)) {
        duplicates.push(entry.name);
      }
    }
    seen.add(entry.name);
  }
  return duplicates;
}

// --- Instance Resolution Strategy ---

export type ResolutionSource = 'local' | 'file-scan' | 'not-found';

export interface ResolutionResult {
  source: ResolutionSource;
  componentName: string;
  nodeId?: string;
}

export function resolveInstance(
  componentRef: string,
  localMap: Map<string, { nodeId: string }>,
  fileMap: Map<string, ComponentEntry>,
): ResolutionResult {
  // Local map takes priority
  const local = localMap.get(componentRef);
  if (local) {
    return { source: 'local', componentName: componentRef, nodeId: local.nodeId };
  }

  // File-scanned map
  const fileEntry = fileMap.get(componentRef);
  if (fileEntry) {
    return { source: 'file-scan', componentName: componentRef, nodeId: fileEntry.nodeId };
  }

  return { source: 'not-found', componentName: componentRef };
}

// --- Detached Copy Naming ---

export function formatDetachedCopyName(componentName: string): string {
  return `${componentName} (detached — slot override)`;
}

// --- Detached Copy Structure ---
// When an instance has slot overrides, we create a detached FRAME copy
// of the component's structure and replace slot children with overrides.

export function buildDetachedCopy(
  componentDef: PluginNodeDef,
  slotOverrides: Record<string, readonly PluginNodeDef[]>,
): PluginNodeDef {
  const name = formatDetachedCopyName(componentDef.name);

  // Deep copy children, replacing slot frames with override content
  const children = componentDef.children.map(child => {
    if (child.isSlot && child.slotPropertyName) {
      const overrideContent = slotOverrides[child.slotPropertyName];
      if (overrideContent) {
        // Replace the slot's children with override content
        return {
          ...child,
          children: overrideContent,
          name: formatSlotName(child.slotPropertyName),
        } as PluginNodeDef;
      }
    }
    return child;
  });

  return {
    ...componentDef,
    type: 'FRAME',
    name,
    children,
    // Store reference for future re-import
    componentId: componentDef.name,
  } as PluginNodeDef;
}

// --- Slot Plugin Data ---

export interface SlotPluginData {
  readonly isSlot: true;
  readonly slotName: string;
  readonly preferredInstances?: readonly string[];
}

export function buildSlotPluginData(
  slotName: string,
  preferredInstances?: readonly string[],
): SlotPluginData {
  return {
    isSlot: true,
    slotName,
    ...(preferredInstances?.length ? { preferredInstances } : {}),
  };
}
