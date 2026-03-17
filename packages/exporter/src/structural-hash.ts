// --- Structural Hashing ---
// Computes a deterministic structural signature for PluginNodeDef trees.
// Used for detecting structurally identical subtrees during deduplication.
//
// Included: node type, name pattern (digits stripped), auto-layout config, child structure
// Excluded: text content, fills, opacity, size (these become property overrides)

import type { PluginNodeDef } from '@figma-dsl/core';
import { createHash } from 'crypto';

interface StructuralDescriptor {
  type: string;
  namePattern: string;
  stackMode?: string;
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  childHashes: string[];
}

/**
 * Strip trailing digits from a name to create a pattern.
 * e.g., "Card 1" → "Card ", "Item3" → "Item"
 */
function stripTrailingDigits(name: string): string {
  return name.replace(/\d+\s*$/, '');
}

function buildDescriptor(node: PluginNodeDef): StructuralDescriptor {
  return {
    type: node.type,
    namePattern: stripTrailingDigits(node.name),
    stackMode: node.stackMode,
    itemSpacing: node.itemSpacing,
    paddingTop: node.paddingTop,
    paddingRight: node.paddingRight,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
    childHashes: node.children.map(child => computeStructuralHash(child)),
  };
}

export function computeStructuralHash(node: PluginNodeDef): string {
  const descriptor = buildDescriptor(node);
  const json = JSON.stringify(descriptor);
  return createHash('sha256').update(json).digest('hex');
}
