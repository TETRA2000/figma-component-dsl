// Figma Plugin — DSL to Figma Components
// This runs inside Figma's plugin sandbox with access to the `figma` global

interface PluginNodeDef {
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
  characters?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: string;
  textAlignHorizontal?: string;
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

interface PluginInput {
  schemaVersion: string;
  targetPage: string;
  components: PluginNodeDef[];
}

const componentMap = new Map<string, ComponentNode>();
const errors: string[] = [];

function toFigmaPaints(fills: PluginNodeDef['fills']): Paint[] {
  if (!fills) return [];
  return fills.map(f => {
    if (f.type === 'SOLID' && f.color) {
      return {
        type: 'SOLID' as const,
        color: { r: f.color.r, g: f.color.g, b: f.color.b },
        opacity: f.opacity * f.color.a,
        visible: true,
      };
    }
    if (f.type === 'GRADIENT_LINEAR' && f.gradientStops && f.gradientTransform) {
      return {
        type: 'GRADIENT_LINEAR' as const,
        gradientStops: f.gradientStops.map(s => ({
          color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
          position: s.position,
        })),
        gradientTransform: f.gradientTransform,
        opacity: f.opacity,
        visible: true,
      };
    }
    return { type: 'SOLID' as const, color: { r: 0, g: 0, b: 0 }, opacity: 1, visible: true };
  });
}

function setAutoLayout(node: FrameNode | ComponentNode, def: PluginNodeDef): void {
  if (!def.stackMode) return;

  node.layoutMode = def.stackMode === 'HORIZONTAL' ? 'HORIZONTAL' : 'VERTICAL';
  node.itemSpacing = def.itemSpacing ?? 0;
  node.paddingTop = def.paddingTop ?? 0;
  node.paddingRight = def.paddingRight ?? 0;
  node.paddingBottom = def.paddingBottom ?? 0;
  node.paddingLeft = def.paddingLeft ?? 0;

  if (def.primaryAxisAlignItems) {
    node.primaryAxisAlignItems = def.primaryAxisAlignItems as 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
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

async function createNode(def: PluginNodeDef, parent: BaseNode & ChildrenMixin): Promise<SceneNode | null> {
  try {
    let node: SceneNode;

    switch (def.type) {
      case 'FRAME':
      case 'ROUNDED_RECTANGLE': {
        const frame = figma.createFrame();
        frame.name = def.name;
        frame.resize(def.size.x, def.size.y);
        frame.fills = toFigmaPaints(def.fills);
        if (def.cornerRadius) frame.cornerRadius = def.cornerRadius;
        if (def.clipContent !== undefined) frame.clipsContent = def.clipContent;
        frame.opacity = def.opacity;
        frame.visible = def.visible;
        setAutoLayout(frame, def);
        parent.appendChild(frame);
        for (const child of def.children) {
          await createNode(child, frame);
        }
        node = frame;
        break;
      }

      case 'RECTANGLE': {
        const rect = figma.createRectangle();
        rect.name = def.name;
        rect.resize(def.size.x, def.size.y);
        rect.fills = toFigmaPaints(def.fills);
        if (def.cornerRadius) rect.cornerRadius = def.cornerRadius;
        rect.opacity = def.opacity;
        rect.visible = def.visible;
        parent.appendChild(rect);
        node = rect;
        break;
      }

      case 'ELLIPSE': {
        const ellipse = figma.createEllipse();
        ellipse.name = def.name;
        ellipse.resize(def.size.x, def.size.y);
        ellipse.fills = toFigmaPaints(def.fills);
        ellipse.opacity = def.opacity;
        ellipse.visible = def.visible;
        parent.appendChild(ellipse);
        node = ellipse;
        break;
      }

      case 'TEXT': {
        const text = figma.createText();
        const family = def.fontFamily ?? 'Inter';
        const style = def.fontStyle ?? 'Regular';
        await figma.loadFontAsync({ family, style });
        text.name = def.name;
        text.fontName = { family, style };
        if (def.fontSize) text.fontSize = def.fontSize;
        if (def.characters) text.characters = def.characters;
        if (def.textAlignHorizontal) {
          text.textAlignHorizontal = def.textAlignHorizontal as 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
        }
        text.fills = toFigmaPaints(def.fills);
        text.opacity = def.opacity;
        text.visible = def.visible;
        parent.appendChild(text);
        node = text;
        break;
      }

      case 'GROUP': {
        const groupChildren: SceneNode[] = [];
        const tempFrame = figma.createFrame();
        parent.appendChild(tempFrame);
        for (const child of def.children) {
          const childNode = await createNode(child, tempFrame);
          if (childNode) groupChildren.push(childNode);
        }
        const group = figma.group(groupChildren, parent);
        group.name = def.name;
        tempFrame.remove();
        node = group;
        break;
      }

      case 'COMPONENT': {
        const comp = figma.createComponent();
        comp.name = def.name;
        comp.resize(def.size.x, def.size.y);
        comp.fills = toFigmaPaints(def.fills);
        if (def.cornerRadius) comp.cornerRadius = def.cornerRadius;
        if (def.clipContent !== undefined) comp.clipsContent = def.clipContent;
        comp.opacity = def.opacity;
        comp.visible = def.visible;
        setAutoLayout(comp, def);

        // Register component properties
        if (def.componentPropertyDefinitions) {
          for (const [propName, propDef] of Object.entries(def.componentPropertyDefinitions)) {
            comp.addComponentProperty(propName, propDef.type as 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP', propDef.defaultValue as string);
          }
        }

        parent.appendChild(comp);
        for (const child of def.children) {
          await createNode(child, comp);
        }
        componentMap.set(def.name, comp);
        node = comp;
        break;
      }

      case 'COMPONENT_SET': {
        const variants: ComponentNode[] = [];
        for (const child of def.children) {
          if (child.type === 'COMPONENT') {
            const comp = figma.createComponent();
            comp.name = child.name;
            comp.resize(child.size.x, child.size.y);
            comp.fills = toFigmaPaints(child.fills);
            if (child.cornerRadius) comp.cornerRadius = child.cornerRadius;
            comp.opacity = child.opacity;
            comp.visible = child.visible;
            setAutoLayout(comp, child);
            parent.appendChild(comp);
            for (const grandchild of child.children) {
              await createNode(grandchild, comp);
            }
            variants.push(comp);
          }
        }
        if (variants.length > 0) {
          const set = figma.combineAsVariants(variants, parent as FrameNode | PageNode);
          set.name = def.name;
          node = set;
        } else {
          return null;
        }
        break;
      }

      case 'INSTANCE': {
        const refComp = componentMap.get(def.componentId ?? def.name);
        if (!refComp) {
          errors.push(`Component not found for instance: ${def.name}`);
          return null;
        }
        const inst = refComp.createInstance();
        inst.name = def.name;
        if (def.overriddenProperties) {
          for (const [key, value] of Object.entries(def.overriddenProperties)) {
            try {
              inst.setProperties({ [key]: value });
            } catch {
              errors.push(`Failed to set property "${key}" on instance "${def.name}"`);
            }
          }
        }
        parent.appendChild(inst);
        node = inst;
        break;
      }

      default:
        errors.push(`Unsupported node type: ${def.type}`);
        return null;
    }

    // Apply strokes
    if (def.strokes?.length && 'strokes' in node) {
      const strokes = def.strokes.map(s => ({
        type: 'SOLID' as const,
        color: { r: s.color.r, g: s.color.g, b: s.color.b },
        opacity: s.color.a,
        visible: true,
      }));
      (node as GeometryMixin).strokes = strokes;
      (node as GeometryMixin).strokeWeight = def.strokes[0]!.weight;
    }

    return node;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`Error creating ${def.type} "${def.name}": ${msg}`);
    return null;
  }
}

figma.showUI(`<div style="padding:16px;font-family:Inter,sans-serif">
  <h3>Figma DSL Import</h3>
  <textarea id="input" style="width:100%;height:200px" placeholder="Paste plugin input JSON here..."></textarea>
  <br><br>
  <button id="import" style="padding:8px 16px;cursor:pointer">Import Components</button>
  <pre id="output" style="font-size:12px;margin-top:12px"></pre>
  <script>
    document.getElementById('import').onclick = () => {
      const input = document.getElementById('input').value;
      parent.postMessage({ pluginMessage: { type: 'import', data: input } }, '*');
    };
    onmessage = (e) => {
      document.getElementById('output').textContent = e.data.pluginMessage.result;
    };
  </script>
</div>`, { width: 500, height: 400 });

figma.ui.onmessage = async (msg: { type: string; data: string }) => {
  if (msg.type !== 'import') return;

  try {
    const input: PluginInput = JSON.parse(msg.data);
    errors.length = 0;
    componentMap.clear();

    // Create or find target page
    let page = figma.root.children.find(p => p.name === input.targetPage);
    if (!page) {
      page = figma.createPage();
      page.name = input.targetPage;
    }
    await figma.setCurrentPageAsync(page);

    let xOffset = 0;
    const componentIdMap: Record<string, string> = {};

    for (const compDef of input.components) {
      const node = await createNode(compDef, page);
      if (node) {
        node.x = xOffset;
        node.y = 0;
        xOffset += compDef.size.x + 50;
        componentIdMap[compDef.name] = node.id;
      }
    }

    const result = errors.length > 0
      ? `Created ${input.components.length} components with ${errors.length} errors:\n${errors.join('\n')}\n\nIDs: ${JSON.stringify(componentIdMap, null, 2)}`
      : `Successfully created ${input.components.length} components.\n\nIDs: ${JSON.stringify(componentIdMap, null, 2)}`;

    if (errors.length > 0) {
      figma.notify(`Import completed with ${errors.length} errors`, { error: true });
    } else {
      figma.notify('Import completed successfully!');
    }

    figma.ui.postMessage({ result });
  } catch (err) {
    const msg2 = err instanceof Error ? err.message : String(err);
    figma.notify(`Import failed: ${msg2}`, { error: true });
    figma.ui.postMessage({ result: `Error: ${msg2}` });
  }
};
