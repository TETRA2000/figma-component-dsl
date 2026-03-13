/**
 * Figma Plugin — DSL to Figma Components.
 *
 * This module contains the logic for creating Figma nodes from PluginInput JSON.
 * It runs inside the Figma plugin sandbox where `figma` global is available.
 *
 * Note: This code cannot be tested with vitest directly since it requires
 * the Figma Plugin API. Tests use mocked figma globals.
 */

export interface PluginInput {
  schemaVersion: string;
  targetPage: string;
  components: PluginComponent[];
}

export interface PluginComponent {
  name: string;
  node: PluginNodeDef;
  properties?: Record<string, { type: string; defaultValue: string | boolean }>;
  variants?: { axes: Record<string, string[]>; children: PluginComponent[] };
}

export interface PluginNodeDef {
  type: string;
  name: string;
  size: { x: number; y: number };
  fillPaints?: FillPaint[];
  strokes?: FillPaint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity?: number;
  visible?: boolean;
  clipContent?: boolean;
  children?: PluginNodeDef[];
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
  textData?: { characters: string };
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  textAlignHorizontal?: string;
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

interface FillPaint {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
  opacity?: number;
  visible?: boolean;
  gradientStops?: { color: { r: number; g: number; b: number; a: number }; position: number }[];
  gradientTransform?: number[][];
}

/**
 * Convert a PluginInput fill to a Figma Paint.
 */
function toFigmaPaint(fill: FillPaint): Paint {
  if (fill.type === 'SOLID' && fill.color) {
    return {
      type: 'SOLID',
      color: { r: fill.color.r, g: fill.color.g, b: fill.color.b },
      opacity: fill.color.a * (fill.opacity ?? 1),
      visible: fill.visible ?? true,
    } as SolidPaint;
  }
  if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
    const stops: ColorStop[] = fill.gradientStops.map((s) => ({
      color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
      position: s.position,
    }));
    return {
      type: 'GRADIENT_LINEAR',
      gradientStops: stops,
      gradientTransform: (fill.gradientTransform ?? [[1, 0, 0], [0, 1, 0]]) as Transform,
      opacity: fill.opacity ?? 1,
      visible: fill.visible ?? true,
    } as GradientPaint;
  }
  return { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, visible: true } as SolidPaint;
}

/**
 * Apply auto-layout properties to a frame node.
 */
function setAutoLayout(node: FrameNode, def: PluginNodeDef): void {
  if (!def.stackMode) return;
  node.layoutMode = def.stackMode as 'HORIZONTAL' | 'VERTICAL';
  node.itemSpacing = def.itemSpacing ?? 0;
  node.paddingTop = def.paddingTop ?? 0;
  node.paddingRight = def.paddingRight ?? 0;
  node.paddingBottom = def.paddingBottom ?? 0;
  node.paddingLeft = def.paddingLeft ?? 0;
  if (def.primaryAxisAlignItems) {
    node.primaryAxisAlignItems = def.primaryAxisAlignItems as
      'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  }
  if (def.counterAxisAlignItems) {
    node.counterAxisAlignItems = def.counterAxisAlignItems as 'MIN' | 'CENTER' | 'MAX';
  }
  if (def.layoutSizingHorizontal) {
    node.layoutSizingHorizontal = def.layoutSizingHorizontal as 'FIXED' | 'HUG' | 'FILL';
  }
  if (def.layoutSizingVertical) {
    node.layoutSizingVertical = def.layoutSizingVertical as 'FIXED' | 'HUG' | 'FILL';
  }
}

/**
 * The weight-to-style mapping for Inter font.
 */
const WEIGHT_STYLES: Record<number, string> = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
};

/**
 * Recursively create a Figma node from a PluginNodeDef.
 * This function is meant to run inside the Figma plugin sandbox.
 */
export async function createNode(
  def: PluginNodeDef,
  figmaApi: typeof figma,
  errors: string[],
): Promise<SceneNode | null> {
  try {
    switch (def.type) {
      case 'FRAME':
      case 'COMPONENT':
      case 'INSTANCE':
      case 'COMPONENT_SET': {
        const isComponent = def.type === 'COMPONENT';
        const node = isComponent
          ? figmaApi.createComponent()
          : figmaApi.createFrame();

        node.name = def.name;
        node.resize(def.size.x, def.size.y);

        if (def.fillPaints) {
          node.fills = def.fillPaints.map(toFigmaPaint);
        }
        if (def.strokes && def.strokeWeight) {
          node.strokes = def.strokes.map(toFigmaPaint);
          node.strokeWeight = def.strokeWeight;
        }
        if (def.cornerRadius) node.cornerRadius = def.cornerRadius;
        if (def.opacity !== undefined) node.opacity = def.opacity;
        if (def.clipContent) node.clipsContent = true;

        setAutoLayout(node, def);

        // Register component properties
        if (isComponent && def.componentPropertyDefinitions) {
          for (const [propName, propDef] of Object.entries(def.componentPropertyDefinitions)) {
            (node as ComponentNode).addComponentProperty(
              propName,
              propDef.type as ComponentPropertyType,
              propDef.defaultValue as string,
            );
          }
        }

        // Create children
        if (def.children) {
          for (const childDef of def.children) {
            const child = await createNode(childDef, figmaApi, errors);
            if (child) node.appendChild(child);
          }
        }

        return node;
      }

      case 'RECTANGLE': {
        const rect = figmaApi.createRectangle();
        rect.name = def.name;
        rect.resize(def.size.x, def.size.y);
        if (def.fillPaints) rect.fills = def.fillPaints.map(toFigmaPaint);
        if (def.strokes && def.strokeWeight) {
          rect.strokes = def.strokes.map(toFigmaPaint);
          rect.strokeWeight = def.strokeWeight;
        }
        if (def.cornerRadius) rect.cornerRadius = def.cornerRadius;
        if (def.opacity !== undefined) rect.opacity = def.opacity;
        return rect;
      }

      case 'ELLIPSE': {
        const ellipse = figmaApi.createEllipse();
        ellipse.name = def.name;
        ellipse.resize(def.size.x, def.size.y);
        if (def.fillPaints) ellipse.fills = def.fillPaints.map(toFigmaPaint);
        if (def.opacity !== undefined) ellipse.opacity = def.opacity;
        return ellipse;
      }

      case 'TEXT': {
        const text = figmaApi.createText();
        text.name = def.name;

        const fontFamily = def.fontFamily ?? 'Inter';
        const fontWeight = def.fontWeight ?? 400;
        const fontStyle = WEIGHT_STYLES[fontWeight] ?? 'Regular';

        await figmaApi.loadFontAsync({ family: fontFamily, style: fontStyle });

        text.fontName = { family: fontFamily, style: fontStyle };
        text.fontSize = def.fontSize ?? 14;

        if (def.textData?.characters) {
          text.characters = def.textData.characters;
        }

        if (def.textAlignHorizontal) {
          text.textAlignHorizontal = def.textAlignHorizontal as 'LEFT' | 'CENTER' | 'RIGHT';
        }

        if (def.fillPaints) text.fills = def.fillPaints.map(toFigmaPaint);
        if (def.opacity !== undefined) text.opacity = def.opacity;

        return text;
      }

      default:
        errors.push(`Unsupported node type: ${def.type}`);
        return null;
    }
  } catch (err) {
    errors.push(`Error creating ${def.type} "${def.name}": ${String(err)}`);
    return null;
  }
}

/**
 * Process the full PluginInput and create all components on a dedicated page.
 */
export async function processPluginInput(
  input: PluginInput,
  figmaApi: typeof figma,
): Promise<{ nodeIds: Record<string, string>; errors: string[] }> {
  const errors: string[] = [];
  const nodeIds: Record<string, string> = {};

  // Find or create target page
  let page = figmaApi.root.findChild(
    (n) => n.type === 'PAGE' && n.name === input.targetPage,
  ) as PageNode | null;

  if (!page) {
    page = figmaApi.createPage();
    page.name = input.targetPage;
  }

  await figmaApi.setCurrentPageAsync(page);

  let yOffset = 0;

  for (const comp of input.components) {
    if (comp.variants) {
      // Create variant components and combine
      const variants: ComponentNode[] = [];
      for (const variantComp of comp.variants.children) {
        const node = await createNode(variantComp.node, figmaApi, errors);
        if (node && node.type === 'COMPONENT') {
          variants.push(node as ComponentNode);
        }
      }
      if (variants.length > 0) {
        const componentSet = figmaApi.combineAsVariants(variants, page);
        componentSet.name = comp.name;
        componentSet.y = yOffset;
        yOffset += componentSet.height + 40;
        nodeIds[comp.name] = componentSet.id;
      }
    } else {
      const node = await createNode(comp.node, figmaApi, errors);
      if (node) {
        page.appendChild(node);
        node.y = yOffset;
        yOffset += node.height + 40;
        nodeIds[comp.name] = node.id;
      }
    }
  }

  // Report errors via notify
  if (errors.length > 0) {
    figmaApi.notify(`DSL Import: ${errors.length} error(s) occurred`, { error: true });
  }

  return { nodeIds, errors };
}
