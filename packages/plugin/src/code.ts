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
  textAutoResize?: string;
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
        // Only constrain text size when textAutoResize is explicitly set (e.g. 'HEIGHT' for wrapping)
        // Without this guard, auto-sized text gets incorrectly constrained and wraps
        if (def.textAutoResize) {
          text.textAutoResize = def.textAutoResize as 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
          if (def.size && def.size.x > 0 && def.size.y > 0) {
            text.resize(def.size.x, def.size.y);
          }
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

const GRID_COLUMNS = 5;
const GRID_SPACING = 50;

figma.showUI(`<div style="padding:16px;font-family:Inter,sans-serif">
  <h3>Figma DSL Import</h3>
  <textarea id="input" style="width:100%;height:160px" placeholder="Paste plugin input JSON here..."></textarea>
  <br><br>
  <label><input type="checkbox" id="autoExport" checked> Auto-export PNGs after import</label>
  <br><br>
  <button id="import" style="padding:8px 16px;cursor:pointer">Import Components</button>
  <div id="progress" style="font-size:12px;margin-top:8px;color:#666"></div>
  <pre id="output" style="font-size:12px;margin-top:8px;max-height:200px;overflow:auto"></pre>
  <a id="downloadLink" style="display:none"></a>
  <script>
    document.getElementById('import').onclick = () => {
      const input = document.getElementById('input').value;
      const autoExport = document.getElementById('autoExport').checked;
      parent.postMessage({ pluginMessage: { type: 'import', data: input, autoExport } }, '*');
    };
    onmessage = (e) => {
      const msg = e.data.pluginMessage;
      if (msg.type === 'progress') {
        document.getElementById('progress').textContent = msg.text;
      } else if (msg.type === 'export-data') {
        // Build and download ZIP-like bundle as individual data URLs
        const output = document.getElementById('output');
        output.textContent = msg.summary;
        // Store node-id-map for copy
        if (msg.nodeIdMap) {
          output.textContent += '\\n\\nnode-id-map.json:\\n' + JSON.stringify(msg.nodeIdMap, null, 2);
        }
        document.getElementById('progress').textContent = 'Export complete!';
      } else if (msg.result) {
        document.getElementById('output').textContent = msg.result;
        document.getElementById('progress').textContent = '';
      }
    };
  </script>
</div>`, { width: 500, height: 500 });

figma.ui.onmessage = async (msg: { type: string; data: string; autoExport?: boolean }) => {
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

    const total = input.components.length;
    const createdNodes: Array<{ name: string; node: SceneNode }> = [];
    const componentIdMap: Record<string, string> = {};

    // Grid layout: arrange in rows of GRID_COLUMNS
    let col = 0;
    let rowX = 0;
    let rowY = 0;
    let rowMaxHeight = 0;

    for (let i = 0; i < total; i++) {
      const compDef = input.components[i]!;
      figma.ui.postMessage({ type: 'progress', text: `Importing ${i + 1}/${total}: ${compDef.name}` });

      try {
        const node = await createNode(compDef, page);
        if (node) {
          // Grid positioning
          node.x = rowX;
          node.y = rowY;
          rowX += compDef.size.x + GRID_SPACING;
          rowMaxHeight = Math.max(rowMaxHeight, compDef.size.y);

          col++;
          if (col >= GRID_COLUMNS) {
            col = 0;
            rowX = 0;
            rowY += rowMaxHeight + GRID_SPACING;
            rowMaxHeight = 0;
          }

          componentIdMap[compDef.name] = node.id;
          createdNodes.push({ name: compDef.name, node });
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Error creating "${compDef.name}": ${errMsg}`);
      }
    }

    if (errors.length > 0) {
      figma.notify(`Import completed with ${errors.length} errors`, { error: true });
    } else {
      figma.notify(`Import completed: ${createdNodes.length} components`);
    }

    // Auto-export PNGs if requested
    if (msg.autoExport && createdNodes.length > 0) {
      figma.ui.postMessage({ type: 'progress', text: 'Exporting PNGs...' });

      const exportedImages: Array<{ name: string; data: Uint8Array }> = [];
      const exportErrors: string[] = [];

      for (let i = 0; i < createdNodes.length; i++) {
        const { name, node } = createdNodes[i]!;
        figma.ui.postMessage({ type: 'progress', text: `Exporting ${i + 1}/${createdNodes.length}: ${name}` });

        try {
          const pngData = await node.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 1 },
          });
          exportedImages.push({ name, data: pngData });
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          exportErrors.push(`Export failed for "${name}": ${errMsg}`);
        }
      }

      const summary = `Exported ${exportedImages.length}/${createdNodes.length} PNGs.` +
        (exportErrors.length > 0 ? `\n${exportErrors.length} export errors:\n${exportErrors.join('\n')}` : '') +
        (errors.length > 0 ? `\n${errors.length} import errors:\n${errors.join('\n')}` : '');

      figma.ui.postMessage({
        type: 'export-data',
        summary,
        nodeIdMap: componentIdMap,
        imageCount: exportedImages.length,
      });
    } else {
      const result = errors.length > 0
        ? `Created ${createdNodes.length} components with ${errors.length} errors:\n${errors.join('\n')}\n\nIDs: ${JSON.stringify(componentIdMap, null, 2)}`
        : `Successfully created ${createdNodes.length} components.\n\nIDs: ${JSON.stringify(componentIdMap, null, 2)}`;
      figma.ui.postMessage({ result });
    }
  } catch (err) {
    const msg2 = err instanceof Error ? err.message : String(err);
    figma.notify(`Import failed: ${msg2}`, { error: true });
    figma.ui.postMessage({ result: `Error: ${msg2}` });
  }
};
