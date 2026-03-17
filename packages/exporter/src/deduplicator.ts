// --- Structural Deduplicator ---
// Walks a PluginNodeDef tree, groups structurally identical subtrees,
// extracts the first occurrence as a COMPONENT, and replaces subsequent
// occurrences with INSTANCE nodes.

import type { PluginNodeDef } from '@figma-dsl/core';
import { computeStructuralHash } from './structural-hash.js';

export interface DeduplicationSummary {
  extractedComponents: Array<{ name: string; instanceCount: number }>;
  warnings: string[];
}

export interface DeduplicationResult {
  components: PluginNodeDef[];
  summary: DeduplicationSummary;
}

interface SubtreeGroup {
  hash: string;
  occurrences: PluginNodeDef[];
}

/**
 * Deduplicate a list of top-level nodes (e.g., page children).
 * Groups structurally identical subtrees, extracts components,
 * and replaces duplicates with instances.
 */
export function deduplicateNodes(nodes: readonly PluginNodeDef[]): DeduplicationResult {
  const warnings: string[] = [];

  // Group nodes by structural hash
  const groups = new Map<string, SubtreeGroup>();
  for (const node of nodes) {
    const hash = computeStructuralHash(node);
    const group = groups.get(hash);
    if (group) {
      group.occurrences.push(node);
    } else {
      groups.set(hash, { hash, occurrences: [node] });
    }
  }

  const extractedComponents: Array<{ name: string; instanceCount: number }> = [];
  const componentDefs: PluginNodeDef[] = [];
  const outputNodes: PluginNodeDef[] = [];

  // Process groups: extract components from groups with 2+ occurrences
  for (const group of groups.values()) {
    if (group.occurrences.length < 2) {
      // Unique node — keep as-is
      outputNodes.push(group.occurrences[0]!);
      continue;
    }

    const template = group.occurrences[0]!;
    const componentName = template.name.replace(/\s*\d+\s*$/, ''); // Strip trailing number

    // Infer property differences across instances
    const propertyDefs: Record<string, { type: string; defaultValue: string | boolean }> = {};
    const instanceOverrides: Array<Record<string, string | boolean>> = [];

    // Check for text differences
    const textDiffs = inferTextProperties(template, group.occurrences);
    for (const [propName, defaultValue] of Object.entries(textDiffs.defs)) {
      propertyDefs[propName] = { type: 'TEXT', defaultValue };
    }

    // Check for visibility differences
    const visDiffs = inferBooleanProperties(template, group.occurrences);
    for (const [propName, defaultValue] of Object.entries(visDiffs.defs)) {
      propertyDefs[propName] = { type: 'BOOLEAN', defaultValue };
    }

    // Build instance overrides
    for (let i = 0; i < group.occurrences.length; i++) {
      const overrides: Record<string, string | boolean> = {};
      if (textDiffs.overrides[i]) {
        for (const [k, v] of Object.entries(textDiffs.overrides[i]!)) {
          overrides[k] = v;
        }
      }
      if (visDiffs.overrides[i]) {
        for (const [k, v] of Object.entries(visDiffs.overrides[i]!)) {
          overrides[k] = v;
        }
      }
      instanceOverrides.push(overrides);
    }

    // Create component definition
    const componentDef: PluginNodeDef = {
      ...template,
      type: 'COMPONENT',
      name: componentName,
      componentPropertyDefinitions: Object.keys(propertyDefs).length > 0 ? propertyDefs : undefined,
    } as PluginNodeDef;

    componentDefs.push(componentDef);
    extractedComponents.push({
      name: componentName,
      instanceCount: group.occurrences.length,
    });

    // Create instance nodes
    for (let i = 0; i < group.occurrences.length; i++) {
      const overrides = instanceOverrides[i]!;
      const instanceDef: PluginNodeDef = {
        type: 'INSTANCE',
        name: group.occurrences[i]!.name,
        size: group.occurrences[i]!.size,
        opacity: group.occurrences[i]!.opacity,
        visible: group.occurrences[i]!.visible,
        children: [],
        componentId: componentName,
        overriddenProperties: Object.keys(overrides).length > 0 ? overrides : undefined,
      } as PluginNodeDef;
      outputNodes.push(instanceDef);
    }
  }

  // Components first, then instances/unique nodes
  return {
    components: [...componentDefs, ...outputNodes],
    summary: { extractedComponents, warnings },
  };
}

// --- Property Inference ---

interface PropertyInference {
  defs: Record<string, string | boolean>;
  overrides: Array<Record<string, string | boolean>>;
}

function collectTextNodes(node: PluginNodeDef): Array<{ path: string; characters: string }> {
  const results: Array<{ path: string; characters: string }> = [];
  if (node.characters !== undefined) {
    results.push({ path: node.name, characters: node.characters });
  }
  for (let i = 0; i < node.children.length; i++) {
    const childResults = collectTextNodes(node.children[i]!);
    for (const cr of childResults) {
      results.push({ path: `${node.name}.${cr.path}`, characters: cr.characters });
    }
  }
  return results;
}

function inferTextProperties(
  template: PluginNodeDef,
  occurrences: PluginNodeDef[],
): PropertyInference {
  const defs: Record<string, string> = {};
  const overrides: Array<Record<string, string>> = occurrences.map(() => ({}));

  const templateTexts = collectTextNodes(template);
  for (let t = 0; t < templateTexts.length; t++) {
    const entry = templateTexts[t]!;
    const values: string[] = [];
    for (const occ of occurrences) {
      const occTexts = collectTextNodes(occ);
      values.push(occTexts[t]?.characters ?? entry.characters);
    }

    // If all values are the same, no property needed
    if (values.every(v => v === values[0])) continue;

    const propName = entry.path;
    defs[propName] = entry.characters;
    for (let i = 0; i < occurrences.length; i++) {
      if (values[i] !== entry.characters) {
        overrides[i]![propName] = values[i]!;
      }
    }
  }

  return { defs, overrides };
}

function inferBooleanProperties(
  template: PluginNodeDef,
  occurrences: PluginNodeDef[],
): PropertyInference {
  const defs: Record<string, boolean> = {};
  const overrides: Array<Record<string, boolean>> = occurrences.map(() => ({}));

  // Check visibility of direct children
  for (let c = 0; c < template.children.length; c++) {
    const templateChild = template.children[c]!;
    const values: boolean[] = [];
    for (const occ of occurrences) {
      values.push(occ.children[c]?.visible ?? templateChild.visible);
    }

    if (values.every(v => v === values[0])) continue;

    const propName = `${templateChild.name}_visible`;
    defs[propName] = templateChild.visible;
    for (let i = 0; i < occurrences.length; i++) {
      if (values[i] !== templateChild.visible) {
        overrides[i]![propName] = values[i]!;
      }
    }
  }

  return { defs, overrides };
}
