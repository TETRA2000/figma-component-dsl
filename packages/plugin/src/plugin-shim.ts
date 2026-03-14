// Plugin shim module — maps DSL imports to real Figma Plugin API.
// This file is bundled into the Figma plugin via esbuild.
// DSL code imports: import { createFrame, createText, ... } from 'figma-dsl'
// In plugin env, these resolve to this module.

import type {
  DslFrameNode,
  DslTextNode,
  DslRectangleNode,
  DslEllipseNode,
  DslComponentNode,
  DslComponentSetNode,
  DslSceneNode,
} from '@figma-dsl/core';

// These functions are only usable inside a Figma plugin sandbox
// where the `figma` global exists. They exist as source code that
// gets bundled by esbuild into the plugin output.

export function createFrame(): DslFrameNode {
  return (globalThis as Record<string, unknown>).figma
    ? ((globalThis as Record<string, { createFrame: () => DslFrameNode }>).figma.createFrame())
    : ({} as DslFrameNode);
}

export async function createText(): Promise<DslTextNode> {
  const f = (globalThis as Record<string, unknown>).figma as Record<string, unknown> | undefined;
  if (f) {
    const node = (f as Record<string, () => DslTextNode>).createText();
    await (f as Record<string, (arg: { family: string; style: string }) => Promise<void>>)
      .loadFontAsync({ family: 'Inter', style: 'Regular' });
    return node;
  }
  return {} as DslTextNode;
}

export function createRectangle(): DslRectangleNode {
  return {} as DslRectangleNode;
}

export function createEllipse(): DslEllipseNode {
  return {} as DslEllipseNode;
}

export function createComponent(): DslComponentNode {
  return {} as DslComponentNode;
}

export function combineAsVariants(
  _components: DslComponentNode[],
  _parent: DslSceneNode,
): DslComponentSetNode {
  return {} as DslComponentSetNode;
}
