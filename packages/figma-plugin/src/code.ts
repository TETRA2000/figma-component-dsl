// Figma Plugin — Creates Figma nodes from DSL-generated PluginInput JSON

interface PluginNodeDef {
  type: string;
  name: string;
  size: { x: number; y: number };
  fills: PluginFill[];
  strokes?: PluginStroke[];
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  opacity: number;
  visible: boolean;
  clipContent?: boolean;
  children: PluginNodeDef[];
  autoLayout?: {
    direction: "HORIZONTAL" | "VERTICAL";
    spacing?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    primaryAxisAlignItems?: string;
    counterAxisAlignItems?: string;
  };
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  characters?: string;
  textStyle?: {
    fontFamily: string;
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
    textAlignHorizontal: string;
    color: { r: number; g: number; b: number; a: number };
  };
  componentProperties?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentRef?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

interface PluginFill {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
  gradientStops?: { position: number; color: { r: number; g: number; b: number; a: number } }[];
  gradientTransform?: [[number, number, number], [number, number, number]];
  opacity: number;
}

interface PluginStroke {
  color: { r: number; g: number; b: number; a: number };
  weight: number;
  align: string;
}

interface PluginInput {
  version: string;
  components: PluginComponentDef[];
  page: string;
}

interface PluginComponentDef {
  name: string;
  type: "COMPONENT" | "COMPONENT_SET";
  node: PluginNodeDef;
  properties?: { name: string; type: string; defaultValue: string | boolean }[];
  variants?: { name: string; axes: Record<string, string>; node: PluginNodeDef }[];
}

interface PluginOutput {
  nodeIds: Record<string, string>;
  created: number;
  errors: string[];
}

// Listen for messages from the plugin UI
figma.ui.onmessage = async (msg: { type: string; data?: string }) => {
  if (msg.type === "create-components" && msg.data) {
    try {
      const input: PluginInput = JSON.parse(msg.data);
      const output = await run(input);
      figma.ui.postMessage({ type: "result", data: output });
      figma.notify(`Created ${String(output.created)} components${output.errors.length > 0 ? ` with ${String(output.errors.length)} errors` : ""}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      figma.notify(`Error: ${message}`, { error: true });
    }
  }
};

figma.showUI(__html__, { width: 400, height: 300 });

async function run(input: PluginInput): Promise<PluginOutput> {
  const output: PluginOutput = { nodeIds: {}, created: 0, errors: [] };
  const componentMap = new Map<string, ComponentNode>();

  // Find or create target page
  let page = figma.root.children.find((p) => p.name === input.page);
  if (!page) {
    page = figma.createPage();
    page.name = input.page;
  }
  figma.currentPage = page;

  let xOffset = 0;

  for (const compDef of input.components) {
    try {
      if (compDef.type === "COMPONENT") {
        const comp = await createComponentNode(compDef.node);
        comp.x = xOffset;
        xOffset += comp.width + 100;

        if (compDef.properties) {
          for (const prop of compDef.properties) {
            comp.addComponentProperty(prop.name, prop.type as ComponentPropertyType, prop.defaultValue);
          }
        }

        page.appendChild(comp);
        componentMap.set(compDef.name, comp);
        output.nodeIds[compDef.name] = comp.id;
        output.created++;
      } else if (compDef.type === "COMPONENT_SET") {
        const variantComponents: ComponentNode[] = [];

        if (compDef.variants) {
          for (const variant of compDef.variants) {
            const comp = await createComponentNode(variant.node);
            comp.name = variant.name;
            variantComponents.push(comp);
          }
        }

        if (variantComponents.length > 0) {
          const setNode = figma.combineAsVariants(variantComponents, page);
          setNode.name = compDef.name;
          setNode.x = xOffset;
          xOffset += setNode.width + 100;
          output.nodeIds[compDef.name] = setNode.id;
          output.created++;
        }
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      output.errors.push(`Failed to create ${compDef.name}: ${message}`);
    }
  }

  // Create instances after all components are registered
  await createInstances(input, componentMap, page, output);

  // Output node ID mapping
  console.log(JSON.stringify(output.nodeIds, null, 2));

  return output;
}

async function createComponentNode(def: PluginNodeDef): Promise<ComponentNode> {
  const node = figma.createComponent();
  await applyNodeProperties(node, def);
  return node;
}

async function createInstances(
  input: PluginInput,
  componentMap: Map<string, ComponentNode>,
  page: PageNode,
  output: PluginOutput,
): Promise<void> {
  // Walk the input looking for INSTANCE nodes
  for (const compDef of input.components) {
    walkForInstances(compDef.node, componentMap, page, output);
  }
}

function walkForInstances(
  def: PluginNodeDef,
  componentMap: Map<string, ComponentNode>,
  _page: PageNode,
  output: PluginOutput,
): void {
  if (def.type === "INSTANCE" && def.componentRef) {
    const comp = componentMap.get(def.componentRef);
    if (!comp) {
      output.errors.push(`Unresolved component reference: ${def.componentRef}`);
      return;
    }
    const instance = comp.createInstance();
    instance.name = def.name;

    if (def.overriddenProperties) {
      for (const [key, value] of Object.entries(def.overriddenProperties)) {
        try {
          instance.setProperties({ [key]: value });
        } catch {
          output.errors.push(`Failed to set property ${key} on instance ${def.name}`);
        }
      }
    }
  }

  for (const child of def.children) {
    walkForInstances(child, componentMap, _page, output);
  }
}

async function applyNodeProperties(
  node: SceneNode & { resize: (w: number, h: number) => void },
  def: PluginNodeDef,
): Promise<void> {
  node.name = def.name;

  if (def.size.x > 0 && def.size.y > 0) {
    node.resize(def.size.x, def.size.y);
  }

  node.opacity = def.opacity;
  node.visible = def.visible;

  // Apply fills
  if ("fills" in node && def.fills.length > 0) {
    const fills: Paint[] = [];
    for (const fill of def.fills) {
      if (fill.type === "SOLID" && fill.color) {
        fills.push({
          type: "SOLID",
          color: { r: fill.color.r, g: fill.color.g, b: fill.color.b },
          opacity: fill.color.a * fill.opacity,
        });
      } else if (fill.type === "GRADIENT_LINEAR" && fill.gradientStops) {
        fills.push({
          type: "GRADIENT_LINEAR",
          gradientTransform: fill.gradientTransform ?? [[1, 0, 0], [0, 1, 0]],
          gradientStops: fill.gradientStops.map((s) => ({
            position: s.position,
            color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
          })),
        });
      }
    }
    (node as FrameNode).fills = fills;
  }

  // Apply strokes
  if ("strokes" in node && def.strokes && def.strokes.length > 0) {
    const strokes: Paint[] = def.strokes.map((s) => ({
      type: "SOLID" as const,
      color: { r: s.color.r, g: s.color.g, b: s.color.b },
      opacity: s.color.a,
    }));
    (node as FrameNode).strokes = strokes;
    (node as FrameNode).strokeWeight = def.strokes[0]!.weight;
    if (def.strokes[0]!.align === "INSIDE") {
      (node as FrameNode).strokeAlign = "INSIDE";
    } else if (def.strokes[0]!.align === "OUTSIDE") {
      (node as FrameNode).strokeAlign = "OUTSIDE";
    }
  }

  // Apply corner radius
  if ("cornerRadius" in node) {
    if (def.cornerRadii) {
      (node as RectangleNode).topLeftRadius = def.cornerRadii.topLeft;
      (node as RectangleNode).topRightRadius = def.cornerRadii.topRight;
      (node as RectangleNode).bottomLeftRadius = def.cornerRadii.bottomLeft;
      (node as RectangleNode).bottomRightRadius = def.cornerRadii.bottomRight;
    } else if (def.cornerRadius) {
      (node as RectangleNode).cornerRadius = def.cornerRadius;
    }
  }

  // Apply clip content
  if ("clipsContent" in node && def.clipContent !== undefined) {
    (node as FrameNode).clipsContent = def.clipContent;
  }

  // Apply auto-layout
  if (def.autoLayout && "layoutMode" in node) {
    const frame = node as FrameNode;
    frame.layoutMode = def.autoLayout.direction;
    if (def.autoLayout.spacing !== undefined) frame.itemSpacing = def.autoLayout.spacing;
    if (def.autoLayout.paddingTop !== undefined) frame.paddingTop = def.autoLayout.paddingTop;
    if (def.autoLayout.paddingRight !== undefined) frame.paddingRight = def.autoLayout.paddingRight;
    if (def.autoLayout.paddingBottom !== undefined) frame.paddingBottom = def.autoLayout.paddingBottom;
    if (def.autoLayout.paddingLeft !== undefined) frame.paddingLeft = def.autoLayout.paddingLeft;

    if (def.autoLayout.primaryAxisAlignItems) {
      frame.primaryAxisAlignItems = def.autoLayout.primaryAxisAlignItems as "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
    }
    if (def.autoLayout.counterAxisAlignItems) {
      frame.counterAxisAlignItems = def.autoLayout.counterAxisAlignItems as "MIN" | "CENTER" | "MAX";
    }

    if (def.layoutSizingHorizontal) {
      frame.layoutSizingHorizontal = def.layoutSizingHorizontal as "FIXED" | "HUG" | "FILL";
    }
    if (def.layoutSizingVertical) {
      frame.layoutSizingVertical = def.layoutSizingVertical as "FIXED" | "HUG" | "FILL";
    }
  }

  // Create children
  for (const childDef of def.children) {
    const child = await createNode(childDef);
    if (child && "appendChild" in node) {
      (node as FrameNode).appendChild(child);
    }
  }
}

async function createNode(def: PluginNodeDef): Promise<SceneNode | null> {
  let node: SceneNode;

  switch (def.type) {
    case "FRAME":
    case "GROUP": {
      const frame = figma.createFrame();
      await applyNodeProperties(frame, def);
      return frame;
    }
    case "RECTANGLE": {
      const rect = figma.createRectangle();
      await applyNodeProperties(rect, def);
      return rect;
    }
    case "ELLIPSE": {
      const ellipse = figma.createEllipse();
      await applyNodeProperties(ellipse, def);
      return ellipse;
    }
    case "TEXT": {
      const textNode = figma.createText();
      if (def.textStyle) {
        const fontName: FontName = {
          family: def.textStyle.fontFamily,
          style: weightToStyle(def.textStyle.fontWeight),
        };
        await figma.loadFontAsync(fontName);
        textNode.fontName = fontName;
        textNode.fontSize = def.textStyle.fontSize;

        if (def.textStyle.lineHeight > 0) {
          textNode.lineHeight = { value: def.textStyle.lineHeight, unit: "PIXELS" };
        }
        if (def.textStyle.letterSpacing !== 0) {
          textNode.letterSpacing = { value: def.textStyle.letterSpacing, unit: "PIXELS" };
        }

        const align = def.textStyle.textAlignHorizontal;
        if (align === "CENTER") textNode.textAlignHorizontal = "CENTER";
        else if (align === "RIGHT") textNode.textAlignHorizontal = "RIGHT";

        textNode.fills = [
          {
            type: "SOLID",
            color: {
              r: def.textStyle.color.r,
              g: def.textStyle.color.g,
              b: def.textStyle.color.b,
            },
          },
        ];
      }

      if (def.characters) {
        textNode.characters = def.characters;
      }

      textNode.name = def.name;
      textNode.opacity = def.opacity;
      textNode.visible = def.visible;

      if (def.size.x > 0 && def.size.y > 0) {
        textNode.resize(def.size.x, def.size.y);
      }

      return textNode;
    }
    case "COMPONENT": {
      const comp = figma.createComponent();
      await applyNodeProperties(comp, def);
      return comp;
    }
    default:
      return null;
  }
}

function weightToStyle(weight: number): string {
  switch (weight) {
    case 100: return "Thin";
    case 200: return "Extra Light";
    case 300: return "Light";
    case 400: return "Regular";
    case 500: return "Medium";
    case 600: return "Semi Bold";
    case 700: return "Bold";
    case 800: return "Extra Bold";
    case 900: return "Black";
    default: return "Regular";
  }
}
