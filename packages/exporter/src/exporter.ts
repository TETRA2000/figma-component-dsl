import type { FigmaNodeDict, CompileResult } from '@figma-dsl/compiler';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export interface PluginNodeDef {
  type: string;
  name: string;
  size: { x: number; y: number };
  fills?: Array<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
    opacity: number;
    gradientStops?: Array<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
    gradientTransform?: [[number, number, number], [number, number, number]];
  }>;
  strokes?: Array<{
    color: { r: number; g: number; b: number; a: number };
    weight: number;
    align?: string;
  }>;
  cornerRadius?: number;
  opacity: number;
  visible: boolean;
  clipContent?: boolean;
  children: PluginNodeDef[];

  // Auto-layout
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

  // Text
  characters?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: string;
  textAlignHorizontal?: string;
  lineHeight?: { value: number; unit: string };
  letterSpacing?: { value: number; unit: string };

  // Component
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;

  // Instance
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

export interface PluginInput {
  schemaVersion: string;
  targetPage: string;
  components: PluginNodeDef[];
}

function convertToPluginNode(node: FigmaNodeDict): PluginNodeDef {
  const result: PluginNodeDef = {
    type: node.type,
    name: node.name,
    size: node.size,
    opacity: node.opacity,
    visible: node.visible,
    children: node.children.map(convertToPluginNode),
  };

  if (node.fillPaints.length > 0) {
    result.fills = node.fillPaints.map(p => ({
      type: p.type,
      color: p.color,
      opacity: p.opacity,
      gradientStops: p.gradientStops,
      gradientTransform: p.gradientTransform,
    }));
  }

  if (node.strokes?.length) {
    result.strokes = node.strokes.map(s => ({
      color: s.color,
      weight: s.weight,
      align: s.align,
    }));
  }

  if (node.cornerRadius !== undefined) result.cornerRadius = node.cornerRadius;
  if (node.clipContent) result.clipContent = node.clipContent;

  // Auto-layout
  if (node.stackMode) {
    result.stackMode = node.stackMode;
    result.itemSpacing = node.itemSpacing;
    result.paddingTop = node.paddingTop;
    result.paddingRight = node.paddingRight;
    result.paddingBottom = node.paddingBottom;
    result.paddingLeft = node.paddingLeft;
    result.primaryAxisAlignItems = node.primaryAxisAlignItems;
    result.counterAxisAlignItems = node.counterAxisAlignItems;
  }

  if (node.layoutSizingHorizontal) result.layoutSizingHorizontal = node.layoutSizingHorizontal;
  if (node.layoutSizingVertical) result.layoutSizingVertical = node.layoutSizingVertical;

  // Text
  if (node.textData) {
    result.characters = node.textData.characters;
    result.fontSize = node.fontSize;
    result.fontFamily = node.fontFamily;
    result.textAlignHorizontal = node.textAlignHorizontal;
    if (node.derivedTextData?.fontMetaData[0]) {
      const meta = node.derivedTextData.fontMetaData[0];
      result.fontWeight = meta.fontWeight;
      result.fontStyle = meta.fontStyle;
    }
  }

  // Component
  if (node.componentPropertyDefinitions) {
    result.componentPropertyDefinitions = node.componentPropertyDefinitions;
  }

  // Instance
  if (node.componentId) {
    result.componentId = node.componentId;
    result.overriddenProperties = node.overriddenProperties;
  }

  return result;
}

export function generatePluginInput(
  compileResult: CompileResult,
  pageName = 'Component Library',
): PluginInput {
  const rootNode = convertToPluginNode(compileResult.root);

  // Extract top-level components or treat root as single component
  const components = rootNode.type === 'COMPONENT_SET'
    ? [rootNode]
    : rootNode.type === 'COMPONENT'
      ? [rootNode]
      : [rootNode];

  return {
    schemaVersion: '1.0.0',
    targetPage: pageName,
    components,
  };
}

export function exportToFile(
  compileResult: CompileResult,
  outputPath: string,
  pageName?: string,
): PluginInput {
  const pluginInput = generatePluginInput(compileResult, pageName);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(pluginInput, null, 2));
  return pluginInput;
}
