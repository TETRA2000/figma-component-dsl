// --- Node Serializer ---
// Extracted from code.ts for testability.
// Reads a Figma SceneNode and produces a PluginNodeDef.

import type { PluginNodeDef } from '@figma-dsl/core';

// Minimal interfaces for the Figma node properties we actually use.
// Using these instead of ambient Figma types allows unit-testing with plain objects.

export interface SerializableNode {
  readonly type: string;
  readonly name: string;
  readonly visible: boolean;
  readonly parent?: { type: string } | null;
  readonly width?: number;
  readonly height?: number;
  readonly opacity?: number;
  readonly fills?: ReadonlyArray<SerializablePaint>;
  readonly strokes?: ReadonlyArray<SerializablePaint>;
  readonly strokeWeight?: number;
  readonly cornerRadius?: number | symbol;
  readonly clipsContent?: boolean;
  readonly layoutMode?: string;
  readonly itemSpacing?: number;
  readonly paddingTop?: number;
  readonly paddingRight?: number;
  readonly paddingBottom?: number;
  readonly paddingLeft?: number;
  readonly primaryAxisAlignItems?: string;
  readonly counterAxisAlignItems?: string;
  readonly layoutSizingHorizontal?: string;
  readonly layoutSizingVertical?: string;
  // Text
  readonly characters?: string;
  readonly fontSize?: number | symbol;
  readonly fontName?: { family: string; style: string } | symbol;
  readonly fontWeight?: number | symbol;
  readonly textAlignHorizontal?: string;
  readonly textAutoResize?: string;
  // Component
  readonly componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  // Instance
  readonly mainComponent?: { name: string } | null;
  // Children
  readonly children?: ReadonlyArray<SerializableNode>;
}

export interface SerializablePaint {
  readonly type: string;
  readonly visible?: boolean;
  readonly color?: { r: number; g: number; b: number };
  readonly opacity?: number;
  readonly gradientStops?: ReadonlyArray<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
  readonly gradientTransform?: [[number, number, number], [number, number, number]];
}

export function serializeFills(node: SerializableNode): PluginNodeDef['fills'] {
  if (!node.fills) return undefined;
  const fills = node.fills;
  if (fills.length === 0) return undefined;

  return fills.filter(f => f.visible !== false).map(f => {
    if (f.type === 'SOLID' && f.color) {
      return {
        type: 'SOLID',
        color: { r: f.color.r, g: f.color.g, b: f.color.b, a: f.opacity ?? 1 },
        opacity: 1,
      };
    }
    if (f.type === 'GRADIENT_LINEAR' && f.gradientStops && f.gradientTransform) {
      return {
        type: 'GRADIENT_LINEAR',
        color: undefined,
        opacity: f.opacity ?? 1,
        gradientStops: f.gradientStops.map(s => ({
          color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
          position: s.position,
        })),
        gradientTransform: f.gradientTransform,
      };
    }
    return { type: f.type, opacity: f.opacity ?? 1 };
  });
}

export function serializeStrokes(node: SerializableNode): PluginNodeDef['strokes'] {
  if (!node.strokes) return undefined;
  const strokes = node.strokes;
  if (strokes.length === 0) return undefined;

  const weight = node.strokeWeight ?? 1;
  return strokes.filter(s => s.type === 'SOLID' && s.visible !== false).map(s => ({
    color: { r: s.color!.r, g: s.color!.g, b: s.color!.b, a: s.opacity ?? 1 },
    weight,
  }));
}

export function serializeNode(node: SerializableNode): PluginNodeDef {
  const result: Record<string, unknown> = {
    type: node.type,
    name: node.name,
    size: { x: node.width ?? 0, y: node.height ?? 0 },
    opacity: node.opacity ?? 1,
    visible: node.visible,
    children: [] as PluginNodeDef[],
  };

  // Fills and strokes
  const fills = serializeFills(node);
  if (fills && fills.length > 0) result.fills = fills;
  const strokes = serializeStrokes(node);
  if (strokes && strokes.length > 0) result.strokes = strokes;

  // Corner radius
  if (node.cornerRadius !== undefined) {
    const cr = node.cornerRadius;
    if (typeof cr === 'number' && cr > 0) result.cornerRadius = cr;
  }

  // Clip content
  if (node.clipsContent) {
    result.clipContent = true;
  }

  // Auto-layout
  if (node.layoutMode !== undefined) {
    if (node.layoutMode !== 'NONE') {
      result.stackMode = node.layoutMode;
      result.itemSpacing = node.itemSpacing;
      result.paddingTop = node.paddingTop;
      result.paddingRight = node.paddingRight;
      result.paddingBottom = node.paddingBottom;
      result.paddingLeft = node.paddingLeft;
      result.primaryAxisAlignItems = node.primaryAxisAlignItems;
      result.counterAxisAlignItems = node.counterAxisAlignItems;
    }
    if (node.layoutSizingHorizontal !== 'FIXED') result.layoutSizingHorizontal = node.layoutSizingHorizontal;
    if (node.layoutSizingVertical !== 'FIXED') result.layoutSizingVertical = node.layoutSizingVertical;
  }

  // Text properties
  if (node.type === 'TEXT') {
    result.characters = node.characters;
    if (typeof node.fontSize === 'number') result.fontSize = node.fontSize;
    if (node.fontName && typeof node.fontName !== 'symbol') {
      result.fontFamily = node.fontName.family;
      result.fontStyle = node.fontName.style;
    }
    if (typeof node.fontWeight === 'number') {
      result.fontWeight = node.fontWeight;
    }
    result.textAlignHorizontal = node.textAlignHorizontal;
    if (node.textAutoResize !== 'NONE') {
      result.textAutoResize = node.textAutoResize;
    }
  }

  // Component property definitions
  // Variant components (children of COMPONENT_SET) do NOT support componentPropertyDefinitions.
  // Only read from standalone COMPONENTs or COMPONENT_SET nodes.
  const isVariantComponent = node.type === 'COMPONENT' && node.parent?.type === 'COMPONENT_SET';
  if ((node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && !isVariantComponent && node.componentPropertyDefinitions) {
    const defs = node.componentPropertyDefinitions;
    if (Object.keys(defs).length > 0) {
      const propDefs: Record<string, { type: string; defaultValue: string | boolean }> = {};
      for (const [name, def] of Object.entries(defs)) {
        propDefs[name] = { type: def.type, defaultValue: def.defaultValue };
      }
      result.componentPropertyDefinitions = propDefs;
    }
  }

  // Instance properties
  if (node.type === 'INSTANCE' && node.mainComponent) {
    result.componentId = node.mainComponent.name;
  }

  // Children
  if (node.children) {
    result.children = node.children.map(child => serializeNode(child));
  }

  return result as unknown as PluginNodeDef;
}

// --- Component Set Helpers ---

export interface SharedPropDef {
  type: string;
  defaultValue: string | boolean;
}

/**
 * Collects shared component property definitions from the first child
 * that has them. Used when building a COMPONENT_SET — the properties
 * must be registered on the set, not on individual variant children.
 */
export function collectSharedPropDefs(
  children: ReadonlyArray<{ type: string; componentPropertyDefinitions?: Record<string, SharedPropDef> }>,
): Record<string, SharedPropDef> | undefined {
  for (const child of children) {
    if (child.type === 'COMPONENT' && child.componentPropertyDefinitions) {
      return child.componentPropertyDefinitions;
    }
  }
  return undefined;
}

/**
 * Filters shared property definitions to only those that should be
 * registered on a COMPONENT_SET (excludes VARIANT type properties).
 * Returns [propName, propDef] pairs ready for addComponentProperty.
 */
export function getRegistrableProperties(
  sharedPropDefs: Record<string, SharedPropDef>,
): Array<[string, SharedPropDef]> {
  return Object.entries(sharedPropDefs).filter(([, propDef]) => propDef.type !== 'VARIANT');
}

// --- Component Set Grid Layout ---

export const COMPONENT_SET_GAP = 20;
export const COMPONENT_SET_PAD = 40;

/**
 * Calculates the number of columns for a balanced grid layout.
 * Uses ceil(sqrt(N)) so e.g. 6 variants → 3 cols, 4 → 2, 9 → 3.
 */
export function calculateGridColumns(variantCount: number): number {
  if (variantCount <= 0) return 1;
  return Math.ceil(Math.sqrt(variantCount));
}

/**
 * Calculates the fixed width for a COMPONENT_SET to achieve a balanced
 * horizontal wrap grid. Takes the N widest children (where N = columns),
 * sums them, and adds gap + padding.
 */
export function calculateComponentSetWidth(
  variantWidths: ReadonlyArray<number>,
  gap: number = COMPONENT_SET_GAP,
  pad: number = COMPONENT_SET_PAD,
): number {
  if (variantWidths.length === 0) return pad * 2;
  const cols = calculateGridColumns(variantWidths.length);
  const sorted = [...variantWidths].sort((a, b) => b - a);
  const colWidths = sorted.slice(0, cols);
  return colWidths.reduce((sum, w) => sum + w, 0) + gap * (cols - 1) + pad * 2;
}
