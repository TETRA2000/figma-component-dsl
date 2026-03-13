import { writeFileSync } from "node:fs";
import type { CompileResult, CompiledNode, ResolvedFill, ResolvedStroke, ResolvedTextStyle } from "./types.js";

export interface PluginNodeDef {
  readonly type: string;
  readonly name: string;
  readonly size: { readonly x: number; readonly y: number };
  readonly fills: readonly ResolvedFill[];
  readonly strokes?: readonly ResolvedStroke[];
  readonly cornerRadius?: number;
  readonly cornerRadii?: {
    readonly topLeft: number;
    readonly topRight: number;
    readonly bottomLeft: number;
    readonly bottomRight: number;
  };
  readonly opacity: number;
  readonly visible: boolean;
  readonly clipContent?: boolean;
  readonly children: readonly PluginNodeDef[];
  readonly autoLayout?: {
    readonly direction: "HORIZONTAL" | "VERTICAL";
    readonly spacing?: number;
    readonly paddingTop?: number;
    readonly paddingRight?: number;
    readonly paddingBottom?: number;
    readonly paddingLeft?: number;
    readonly primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
    readonly counterAxisAlignItems?: "MIN" | "CENTER" | "MAX";
  };
  readonly layoutSizingHorizontal?: string;
  readonly layoutSizingVertical?: string;
  readonly characters?: string;
  readonly textStyle?: ResolvedTextStyle;
  readonly componentProperties?: Readonly<
    Record<string, { readonly type: string; readonly defaultValue: string | boolean }>
  >;
  readonly componentRef?: string;
  readonly overriddenProperties?: Readonly<Record<string, string | boolean>>;
}

export interface PluginVariantDef {
  readonly name: string;
  readonly axes: Readonly<Record<string, string>>;
  readonly node: PluginNodeDef;
}

export interface PluginComponentDef {
  readonly name: string;
  readonly type: "COMPONENT" | "COMPONENT_SET";
  readonly node: PluginNodeDef;
  readonly properties?: readonly {
    readonly name: string;
    readonly type: string;
    readonly defaultValue: string | boolean;
  }[];
  readonly variants?: readonly PluginVariantDef[];
}

export interface PluginInput {
  readonly version: string;
  readonly components: readonly PluginComponentDef[];
  readonly page: string;
}

/**
 * Transform a CompileResult into PluginInput format for the Figma plugin.
 */
export function generatePluginInput(
  compiled: CompileResult,
  pageName = "Component Library",
): PluginInput {
  const components: PluginComponentDef[] = [];
  collectComponents(compiled.root, components);

  return {
    version: "1.0",
    components,
    page: pageName,
  };
}

/**
 * Write PluginInput JSON to a file.
 */
export function writePluginInput(input: PluginInput, outputPath: string): void {
  writeFileSync(outputPath, JSON.stringify(input, null, 2));
}

function collectComponents(
  node: CompiledNode,
  out: PluginComponentDef[],
): void {
  if (node.type === "COMPONENT") {
    const properties = node.componentProperties
      ? Object.entries(node.componentProperties).map(([name, def]) => ({
          name,
          type: def.type,
          defaultValue: def.defaultValue,
        }))
      : undefined;

    out.push({
      name: node.name,
      type: "COMPONENT",
      node: toPluginNodeDef(node),
      properties,
    });
  } else if (node.type === "COMPONENT_SET") {
    const variants: PluginVariantDef[] = [];
    for (const child of node.children) {
      if (child.type === "COMPONENT") {
        const axes = parseVariantName(child.name);
        variants.push({
          name: child.name,
          axes,
          node: toPluginNodeDef(child),
        });
      }
    }

    out.push({
      name: node.name,
      type: "COMPONENT_SET",
      node: toPluginNodeDef(node),
      variants,
    });
  }

  for (const child of node.children) {
    collectComponents(child, out);
  }
}

function toPluginNodeDef(node: CompiledNode): PluginNodeDef {
  const result: PluginNodeDef = {
    type: node.type,
    name: node.name,
    size: node.size,
    fills: node.fills,
    strokes: node.strokes,
    cornerRadius: node.cornerRadius,
    cornerRadii: node.cornerRadii,
    opacity: node.opacity,
    visible: node.visible,
    clipContent: node.clipContent,
    children: node.children.map(toPluginNodeDef),
    characters: node.characters,
    textStyle: node.textStyle,
    componentProperties: node.componentProperties,
    componentRef: node.componentId,
    overriddenProperties: node.overriddenProperties,
    autoLayout: node.stackMode
      ? {
          direction: node.stackMode,
          spacing: node.itemSpacing,
          paddingTop: node.paddingTop,
          paddingRight: node.paddingRight,
          paddingBottom: node.paddingBottom,
          paddingLeft: node.paddingLeft,
          primaryAxisAlignItems: node.primaryAxisAlignItems,
          counterAxisAlignItems: node.counterAxisAlignItems,
        }
      : undefined,
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
  };

  return result;
}

function parseVariantName(name: string): Record<string, string> {
  const axes: Record<string, string> = {};
  const parts = name.split(",").map((s) => s.trim());
  for (const part of parts) {
    const [key, value] = part.split("=").map((s) => s.trim());
    if (key && value) {
      axes[key] = value;
    }
  }
  return axes;
}
