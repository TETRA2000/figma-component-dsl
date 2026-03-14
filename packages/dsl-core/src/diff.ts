// --- PluginNodeDef Diff Algorithm ---
// Computes property-level diff between baseline and current PluginNodeDef trees.
// Shared between plugin (at build time via esbuild) and unit tests.

import type { PluginNodeDef } from './plugin-types.js';
import type { PropertyChange, ChangeType } from './changeset.js';

export function describeChange(path: string, oldVal: unknown, newVal: unknown): string {
  if (path.match(/\.color\./)) return `Color changed at ${path}`;
  if (path.includes('fontSize')) return `Font size changed from ${String(oldVal)} to ${String(newVal)}`;
  if (path.includes('characters')) return `Text content changed`;
  if (path.includes('cornerRadius')) return `Corner radius changed from ${String(oldVal)} to ${String(newVal)}`;
  if (path.includes('opacity')) return `Opacity changed from ${String(oldVal)} to ${String(newVal)}`;
  if (path.includes('Spacing') || path.includes('padding')) return `Spacing changed at ${path}`;
  if (path.includes('size')) return `Size changed at ${path}`;
  return `Property ${path} changed`;
}

export function diffValues(path: string, oldVal: unknown, newVal: unknown, changes: PropertyChange[]): void {
  if (oldVal === newVal) return;

  if (oldVal === undefined && newVal !== undefined) {
    changes.push({ propertyPath: path, changeType: 'added' as ChangeType, newValue: newVal, description: describeChange(path, oldVal, newVal) });
    return;
  }
  if (oldVal !== undefined && newVal === undefined) {
    changes.push({ propertyPath: path, changeType: 'removed' as ChangeType, oldValue: oldVal, description: describeChange(path, oldVal, newVal) });
    return;
  }

  if (typeof oldVal !== typeof newVal) {
    changes.push({ propertyPath: path, changeType: 'modified' as ChangeType, oldValue: oldVal, newValue: newVal, description: describeChange(path, oldVal, newVal) });
    return;
  }

  if (Array.isArray(oldVal) && Array.isArray(newVal)) {
    const maxLen = Math.max(oldVal.length, newVal.length);
    for (let i = 0; i < maxLen; i++) {
      diffValues(`${path}.${i}`, oldVal[i], newVal[i], changes);
    }
    return;
  }

  if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null) {
    const allKeys = new Set([...Object.keys(oldVal as Record<string, unknown>), ...Object.keys(newVal as Record<string, unknown>)]);
    for (const key of allKeys) {
      diffValues(`${path}.${key}`, (oldVal as Record<string, unknown>)[key], (newVal as Record<string, unknown>)[key], changes);
    }
    return;
  }

  if (oldVal !== newVal) {
    changes.push({ propertyPath: path, changeType: 'modified' as ChangeType, oldValue: oldVal, newValue: newVal, description: describeChange(path, oldVal, newVal) });
  }
}

const PROPS_TO_COMPARE: ReadonlyArray<keyof PluginNodeDef> = [
  'name', 'size', 'opacity', 'visible', 'fills', 'strokes', 'cornerRadius',
  'clipContent', 'stackMode', 'itemSpacing', 'paddingTop', 'paddingRight',
  'paddingBottom', 'paddingLeft', 'primaryAxisAlignItems', 'counterAxisAlignItems',
  'layoutSizingHorizontal', 'layoutSizingVertical', 'characters', 'fontSize',
  'fontFamily', 'fontWeight', 'fontStyle', 'textAlignHorizontal', 'textAutoResize',
];

export function diffNodes(baseline: PluginNodeDef, current: PluginNodeDef): PropertyChange[] {
  const changes: PropertyChange[] = [];

  for (const prop of PROPS_TO_COMPARE) {
    diffValues(prop, baseline[prop], current[prop], changes);
  }

  // Diff children recursively
  const maxChildren = Math.max(baseline.children.length, current.children.length);
  for (let i = 0; i < maxChildren; i++) {
    const baseChild = baseline.children[i];
    const currChild = current.children[i];
    if (!baseChild && currChild) {
      changes.push({ propertyPath: `children.${i}`, changeType: 'added', newValue: currChild, description: `Child node "${currChild.name}" added` });
    } else if (baseChild && !currChild) {
      changes.push({ propertyPath: `children.${i}`, changeType: 'removed', oldValue: baseChild, description: `Child node "${baseChild.name}" removed` });
    } else if (baseChild && currChild) {
      const childChanges = diffNodes(baseChild, currChild);
      for (const cc of childChanges) {
        changes.push({ ...cc, propertyPath: `children.${i}.${cc.propertyPath}` });
      }
    }
  }

  return changes;
}
