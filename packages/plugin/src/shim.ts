/**
 * Plugin shim: adapts Figma Plugin API to DslFigmaApi interface.
 * This module is used when DSL code runs inside a Figma plugin.
 */

import type { DslFrameNode, DslTextNode, DslRectangleNode, DslEllipseNode, DslComponentNode, DslGroupNode, DslComponentSetNode, DslSceneNode, DslFigmaApi } from '@figma-dsl/core';

// Re-export shared helpers — identical in both environments
export { hexToRGB, solidPaint, gradientPaint, defineTokens, tokenPaint, setAutoLayout } from '@figma-dsl/core';

const FONT_WEIGHT_TO_STYLE: Record<number, string> = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
};

/**
 * Asynchronously set fontWeight on a text node, loading the required font first.
 * This replaces the previous Proxy-based approach to avoid race conditions.
 */
export async function setFontWeight(
  node: DslTextNode,
  weight: number
): Promise<void> {
  const style = FONT_WEIGHT_TO_STYLE[weight] ?? 'Regular';
  const family = (node as Record<string, unknown>).fontFamily as string ?? 'Inter';
  await figma.loadFontAsync({ family, style });
  (node as Record<string, unknown>).fontWeight = weight;
}

/**
 * Create a Figma Plugin API-backed DslFigmaApi implementation.
 * All calls delegate to the global `figma` object.
 */
export function createPluginApi(): DslFigmaApi {
  return {
    createFrame(): DslFrameNode {
      return figma.createFrame() as unknown as DslFrameNode;
    },

    async createText(): Promise<DslTextNode> {
      const node = figma.createText();
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      return node as unknown as DslTextNode;
    },

    createRectangle(): DslRectangleNode {
      return figma.createRectangle() as unknown as DslRectangleNode;
    },

    createEllipse(): DslEllipseNode {
      return figma.createEllipse() as unknown as DslEllipseNode;
    },

    createComponent(): DslComponentNode {
      return figma.createComponent() as unknown as DslComponentNode;
    },

    createGroup(children: DslSceneNode[], parent: DslSceneNode): DslGroupNode {
      return figma.group(
        children as unknown as readonly SceneNode[],
        parent as unknown as BaseNode & ChildrenMixin,
      ) as unknown as DslGroupNode;
    },

    combineAsVariants(components: DslComponentNode[], parent: DslSceneNode): DslComponentSetNode {
      return figma.combineAsVariants(
        components as unknown as ComponentNode[],
        parent as unknown as BaseNode & ChildrenMixin,
      ) as unknown as DslComponentSetNode;
    },
  };
}
