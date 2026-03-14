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
      // Wrap fontWeight setter to auto-load fonts
      const original = node;
      return new Proxy(original as unknown as DslTextNode, {
        set(target: Record<string, unknown>, prop: string, value: unknown) {
          if (prop === 'fontWeight' && typeof value === 'number') {
            const style = FONT_WEIGHT_TO_STYLE[value] ?? 'Regular';
            // Queue font loading - the setter will apply after load
            figma.loadFontAsync({ family: (target as Record<string, unknown>).fontFamily as string ?? 'Inter', style }).then(() => {
              (original as unknown as Record<string, unknown>)[prop] = value;
            });
            return true;
          }
          (target as Record<string, unknown>)[prop] = value;
          return true;
        },
        get(target: Record<string, unknown>, prop: string) {
          return (target as Record<string, unknown>)[prop];
        },
      });
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
