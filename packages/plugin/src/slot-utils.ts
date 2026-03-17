// --- Canvas & Component Utilities ---
// Extracted from plugin code for testability.
// Handles canvas naming, file scanning map building, instance resolution strategy,
// and detached copy structure generation.

import type { PluginNodeDef } from '@figma-dsl/core';

// --- Canvas Naming Convention ---

const CANVAS_PREFIX = '[Canvas] ';

export function formatCanvasName(canvasName: string): string {
  return `${CANVAS_PREFIX}${canvasName}`;
}

export function isCanvasFrameName(name: string): boolean {
  return name.startsWith(CANVAS_PREFIX);
}

export function extractCanvasName(frameName: string): string | undefined {
  if (!isCanvasFrameName(frameName)) return undefined;
  return frameName.slice(CANVAS_PREFIX.length);
}

// --- File Scanner Map ---

export interface ComponentEntry {
  readonly name: string;
  readonly nodeId: string;
}

export function buildComponentMap(entries: readonly ComponentEntry[]): Map<string, ComponentEntry> {
  const map = new Map<string, ComponentEntry>();

  for (const entry of entries) {
    if (map.has(entry.name)) {
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

  // Deep copy children, replacing canvas frames with override content
  const children = componentDef.children.map(child => {
    if (child.isCanvas && child.canvasName) {
      const overrideContent = slotOverrides[child.canvasName];
      if (overrideContent) {
        return {
          ...child,
          children: overrideContent,
          name: formatCanvasName(child.canvasName),
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
