import type { FigmaNodeDict } from '@figma-dsl/compiler';
import { render, type RenderOptions, type RenderResult } from './renderer.js';

export interface RenderResultMeta extends RenderResult {
  /** Scale factor used for rendering */
  scale: number;
}

/**
 * Recursively collect all nodes with `isCanvas: true` from a compiled tree.
 */
function collectCanvasNodes(node: FigmaNodeDict, result: FigmaNodeDict[]): void {
  if (node.isCanvas) {
    result.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      collectCanvasNodes(child, result);
    }
  }
}

/**
 * Extract all canvas nodes from a compiled tree and render each independently.
 * Returns a Map keyed by canvasName with RenderResultMeta values.
 */
export function renderCanvasNodes(
  root: FigmaNodeDict,
  options?: Partial<RenderOptions>,
): Map<string, RenderResultMeta> {
  const canvasNodes: FigmaNodeDict[] = [];
  collectCanvasNodes(root, canvasNodes);

  const results = new Map<string, RenderResultMeta>();
  for (const node of canvasNodes) {
    const scale = node.canvasScale ?? options?.scale ?? 1;
    const renderResult = render(node, { ...options, scale });
    const name = node.canvasName ?? node.name;
    results.set(name, {
      ...renderResult,
      scale,
    });
  }
  return results;
}
