// Figma Plugin — DSL to Figma Components
// This runs inside Figma's plugin sandbox with access to the `figma` global

import type {
  PluginNodeDef,
  PluginInput,
  ComponentIdentity,
  EditLogEntry,
  ChangesetDocument,
  ComponentChangeEntry,
} from '@figma-dsl/core';
import { diffNodes } from '@figma-dsl/core';
import {
  serializeNode as serializeNodeImpl,
  collectSharedPropDefs,
  getRegistrableProperties,
  calculateComponentSetWidth,
  COMPONENT_SET_GAP,
  COMPONENT_SET_PAD,
} from './serializer.js';
import type { SerializableNode } from './serializer.js';

const componentMap = new Map<string, ComponentNode>();
const errors: string[] = [];

// --- Edit Tracker State ---
const PLUGIN_DATA_BASELINE = 'dsl-baseline';
const PLUGIN_DATA_IDENTITY = 'dsl-identity';
const PLUGIN_DATA_SIZE_LIMIT = 100_000; // 100KB per setPluginData entry

const trackedNodeIds = new Set<string>();
const editLog: EditLogEntry[] = [];
let isTracking = false;

function storeBaseline(node: SceneNode, def: PluginNodeDef): void {
  const json = JSON.stringify(def);
  if (json.length > PLUGIN_DATA_SIZE_LIMIT) {
    errors.push(`Baseline for "${def.name}" exceeds 100KB limit (${json.length} bytes), truncating children`);
    const truncated: PluginNodeDef = { ...def, children: [] };
    node.setPluginData(PLUGIN_DATA_BASELINE, JSON.stringify(truncated));
  } else {
    node.setPluginData(PLUGIN_DATA_BASELINE, json);
  }
}

function storeIdentity(node: SceneNode, componentName: string, dslSourcePath: string): void {
  const identity: ComponentIdentity = {
    componentName,
    dslSourcePath,
    importTimestamp: new Date().toISOString(),
    originalNodeId: node.id,
  };
  node.setPluginData(PLUGIN_DATA_IDENTITY, JSON.stringify(identity));
}

function findTrackedAncestor(node: BaseNode | null): { node: SceneNode; identity: ComponentIdentity } | null {
  let current = node;
  while (current) {
    if ('getPluginData' in current) {
      const identityData = (current as SceneNode).getPluginData(PLUGIN_DATA_IDENTITY);
      if (identityData) {
        return {
          node: current as SceneNode,
          identity: JSON.parse(identityData) as ComponentIdentity,
        };
      }
    }
    current = current.parent;
  }
  return null;
}

function startTracking(): void {
  if (isTracking) return;
  isTracking = true;

  figma.on('documentchange', (event) => {
    for (const change of event.documentChanges) {
      if (change.type !== 'PROPERTY_CHANGE' && change.type !== 'CREATE' && change.type !== 'DELETE') {
        continue;
      }

      const changedNode = change.type === 'DELETE' ? null : (change as { node?: BaseNode }).node ?? null;
      if (!changedNode) continue;

      const ancestor = findTrackedAncestor(changedNode);
      if (!ancestor) continue;

      const entry: EditLogEntry = {
        nodeId: changedNode.id,
        componentName: ancestor.identity.componentName,
        timestamp: new Date().toISOString(),
        changeType: change.type as EditLogEntry['changeType'],
        properties: change.type === 'PROPERTY_CHANGE' && 'properties' in change
          ? (change as { properties: string[] }).properties
          : [],
        origin: 'LOCAL',
      };
      editLog.push(entry);
    }
  });
}

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

// Sets the node's OWN auto-layout configuration (makes it a layout container).
// Must be called BEFORE children are created so they can use FILL sizing.
function setAutoLayoutConfig(node: FrameNode | ComponentNode | ComponentSetNode, def: PluginNodeDef): void {
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
}

// Sets the node's sizing within its parent (FILL/HUG).
// Must be called AFTER parent.appendChild() because Figma requires the node
// to be a child of an auto-layout frame before FILL can be set.
function setLayoutSizing(node: SceneNode, def: PluginNodeDef): void {
  if (def.layoutSizingHorizontal && 'layoutSizingHorizontal' in node) {
    (node as FrameNode).layoutSizingHorizontal = def.layoutSizingHorizontal as 'FIXED' | 'HUG' | 'FILL';
  }
  if (def.layoutSizingVertical && 'layoutSizingVertical' in node) {
    (node as FrameNode).layoutSizingVertical = def.layoutSizingVertical as 'FIXED' | 'HUG' | 'FILL';
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
        setAutoLayoutConfig(frame, def);
        parent.appendChild(frame);
        setLayoutSizing(frame, def);
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
        setLayoutSizing(rect, def);
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
        setLayoutSizing(text, def);
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
        setAutoLayoutConfig(comp, def);

        // Register component properties
        // Skip VARIANT properties — they are only valid on COMPONENT_SET nodes.
        if (def.componentPropertyDefinitions) {
          for (const [propName, propDef] of Object.entries(def.componentPropertyDefinitions)) {
            if (propDef.type === 'VARIANT') continue;
            comp.addComponentProperty(propName, propDef.type as 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP', propDef.defaultValue as string);
          }
        }

        parent.appendChild(comp);
        setLayoutSizing(comp, def);
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
            if (child.clipContent !== undefined) comp.clipsContent = child.clipContent;
            comp.opacity = child.opacity;
            comp.visible = child.visible;
            setAutoLayoutConfig(comp, child);
            parent.appendChild(comp);
            setLayoutSizing(comp, child);
            for (const grandchild of child.children) {
              await createNode(grandchild, comp);
            }
            variants.push(comp);
          }
        }
        if (variants.length > 0) {
          const set = figma.combineAsVariants(variants, parent as FrameNode | PageNode);
          set.name = def.name;

          // Apply auto-layout to the COMPONENT_SET.
          // combineAsVariants() creates the set but may not arrange children optimally.
          // If the def specifies auto-layout, use it; otherwise default to horizontal wrap.
          if (def.stackMode) {
            setAutoLayoutConfig(set, def);
          } else {
            // Default: horizontal wrap grid using extracted helpers
            const variantWidths = variants.map(v => v.width);
            const totalWidth = calculateComponentSetWidth(variantWidths);

            set.layoutMode = 'HORIZONTAL';
            set.layoutWrap = 'WRAP';
            set.itemSpacing = COMPONENT_SET_GAP;
            set.counterAxisSpacing = COMPONENT_SET_GAP;
            set.paddingTop = COMPONENT_SET_PAD;
            set.paddingRight = COMPONENT_SET_PAD;
            set.paddingBottom = COMPONENT_SET_PAD;
            set.paddingLeft = COMPONENT_SET_PAD;
            set.resize(totalWidth, set.height);
            set.primaryAxisSizingMode = 'FIXED';
            set.counterAxisSizingMode = 'AUTO';
          }

          // Register shared component properties on the set (not on variant children).
          // Uses extracted helpers from serializer.ts for testability.
          const sharedPropDefs = collectSharedPropDefs(def.children);
          if (sharedPropDefs) {
            for (const [propName, propDef] of getRegistrableProperties(sharedPropDefs)) {
              try {
                set.addComponentProperty(propName, propDef.type as 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP', propDef.defaultValue as string);
              } catch (e) {
                errors.push(`Failed to add property "${propName}" to set "${def.name}": ${e instanceof Error ? e.message : String(e)}`);
              }
            }
          }
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

// --- Node Serializer ---
// Delegates to the extracted serializer module (src/serializer.ts) for testability.
// Thin wrapper bridges Figma ambient types → SerializableNode interface.

function serializeNode(node: SceneNode): PluginNodeDef {
  return serializeNodeImpl(node as unknown as SerializableNode);
}

function computeChangeset(nodeIds: ReadonlyArray<string>): ChangesetDocument {
  const components: ComponentChangeEntry[] = [];

  for (const nodeId of nodeIds) {
    const node = figma.getNodeById(nodeId) as SceneNode | null;
    if (!node) continue;

    const identityData = node.getPluginData(PLUGIN_DATA_IDENTITY);
    if (!identityData) continue;
    const identity = JSON.parse(identityData) as ComponentIdentity;

    const baselineData = node.getPluginData(PLUGIN_DATA_BASELINE);
    if (!baselineData) continue;
    const baseline = JSON.parse(baselineData) as PluginNodeDef;

    const current = serializeNode(node);
    const changes = diffNodes(baseline, current);

    if (changes.length > 0) {
      components.push({
        componentName: identity.componentName,
        componentId: nodeId,
        changes,
      });
    }
  }

  return {
    schemaVersion: '1.0',
    timestamp: new Date().toISOString(),
    source: {
      pluginVersion: '0.1.0',
      figmaFileName: figma.root.name,
    },
    components,
  };
}

function computeCompleteExport(nodeIds: ReadonlyArray<string>, pageName: string): PluginInput {
  const components: PluginNodeDef[] = [];

  for (const nodeId of nodeIds) {
    const node = figma.getNodeById(nodeId) as SceneNode | null;
    if (!node) continue;
    components.push(serializeNode(node));
  }

  return {
    schemaVersion: '1.0.0',
    targetPage: pageName,
    components,
  };
}

function getTrackedNodeIdsOnPage(): string[] {
  const page = figma.currentPage;
  const ids: string[] = [];
  for (const child of page.children) {
    if (child.getPluginData(PLUGIN_DATA_IDENTITY)) {
      ids.push(child.id);
    }
  }
  return ids;
}

const GRID_COLUMNS = 5;
const GRID_SPACING = 50;

figma.showUI(`<div style="padding:16px;font-family:Inter,sans-serif">
  <style>
    .tab-bar { display:flex; border-bottom:1px solid #ccc; margin-bottom:12px; }
    .tab-bar button { padding:8px 16px; border:none; background:none; cursor:pointer; font-size:14px; border-bottom:2px solid transparent; }
    .tab-bar button.active { border-bottom-color:#18A0FB; font-weight:600; }
    .tab-panel { display:none; }
    .tab-panel.active { display:block; }
    .export-btn { padding:8px 16px; cursor:pointer; margin-right:8px; }
    .copy-btn { padding:4px 12px; cursor:pointer; font-size:12px; }
  </style>
  <div class="tab-bar">
    <button class="active" onclick="switchTab('import')">Import</button>
    <button onclick="switchTab('export')">Export</button>
  </div>

  <div id="tab-import" class="tab-panel active">
    <textarea id="input" style="width:100%;height:160px" placeholder="Paste plugin input JSON here..."></textarea>
    <br><br>
    <label><input type="checkbox" id="autoExport" checked> Auto-export PNGs after import</label>
    <br><br>
    <button id="import" style="padding:8px 16px;cursor:pointer">Import Components</button>
  </div>

  <div id="tab-export" class="tab-panel">
    <div style="margin-bottom:8px">
      <label><strong>Mode:</strong></label>
      <select id="exportMode" style="margin-left:8px">
        <option value="changeset">Changeset (diff)</option>
        <option value="complete">Complete DSL JSON</option>
      </select>
    </div>
    <div style="margin-bottom:12px">
      <label><strong>Scope:</strong></label>
      <select id="exportScope" style="margin-left:8px">
        <option value="selection">Selected Components</option>
        <option value="page">All on Page</option>
      </select>
    </div>
    <button class="export-btn" id="exportBtn">Export</button>
    <br><br>
    <textarea id="exportOutput" style="width:100%;height:200px" readonly placeholder="Export result will appear here..."></textarea>
    <br>
    <button class="copy-btn" id="copyBtn">Copy to Clipboard</button>
  </div>

  <div id="progress" style="font-size:12px;margin-top:8px;color:#666"></div>
  <pre id="output" style="font-size:12px;margin-top:8px;max-height:200px;overflow:auto"></pre>
  <script>
    function switchTab(tab) {
      document.querySelectorAll('.tab-bar button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelector('.tab-bar button:nth-child(' + (tab === 'import' ? '1' : '2') + ')').classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
    }
    document.getElementById('import').onclick = () => {
      const input = document.getElementById('input').value;
      const autoExport = document.getElementById('autoExport').checked;
      parent.postMessage({ pluginMessage: { type: 'import', data: input, autoExport } }, '*');
    };
    document.getElementById('exportBtn').onclick = () => {
      const mode = document.getElementById('exportMode').value;
      const scope = document.getElementById('exportScope').value;
      parent.postMessage({ pluginMessage: { type: 'export-' + mode, scope: scope } }, '*');
    };
    document.getElementById('copyBtn').onclick = () => {
      const ta = document.getElementById('exportOutput');
      ta.select();
      document.execCommand('copy');
      document.getElementById('progress').textContent = 'Copied to clipboard!';
      setTimeout(() => { document.getElementById('progress').textContent = ''; }, 2000);
    };
    onmessage = (e) => {
      const msg = e.data.pluginMessage;
      if (msg.type === 'progress') {
        document.getElementById('progress').textContent = msg.text;
      } else if (msg.type === 'export-data') {
        const output = document.getElementById('output');
        output.textContent = msg.summary;
        if (msg.nodeIdMap) {
          output.textContent += '\\n\\nnode-id-map.json:\\n' + JSON.stringify(msg.nodeIdMap, null, 2);
        }
        document.getElementById('progress').textContent = 'Export complete!';
      } else if (msg.type === 'export-result') {
        document.getElementById('exportOutput').value = msg.json;
        document.getElementById('progress').textContent = msg.summary;
      } else if (msg.result) {
        document.getElementById('output').textContent = msg.result;
        document.getElementById('progress').textContent = '';
      }
    };
  </script>
</div>`, { width: 500, height: 560 });

figma.ui.onmessage = async (msg: { type: string; data: string; autoExport?: boolean; scope?: string }) => {
  // Handle export requests
  if (msg.type === 'export-changeset' || msg.type === 'export-complete') {
    try {
      figma.ui.postMessage({ type: 'progress', text: 'Serializing...' });

      let nodeIds: string[];
      if (msg.scope === 'selection') {
        nodeIds = figma.currentPage.selection
          .filter(n => n.getPluginData(PLUGIN_DATA_IDENTITY))
          .map(n => n.id);
        if (nodeIds.length === 0) {
          figma.ui.postMessage({ type: 'export-result', json: '', summary: 'No tracked components selected. Select imported components first.' });
          return;
        }
      } else {
        nodeIds = getTrackedNodeIdsOnPage();
        if (nodeIds.length === 0) {
          figma.ui.postMessage({ type: 'export-result', json: '', summary: 'No tracked components on this page. Import components first.' });
          return;
        }
      }

      if (msg.type === 'export-changeset') {
        const changeset = computeChangeset(nodeIds);
        const totalChanges = changeset.components.reduce((sum, c) => sum + c.changes.length, 0);
        const json = JSON.stringify(changeset, null, 2);
        figma.ui.postMessage({
          type: 'export-result',
          json,
          summary: `Changeset: ${changeset.components.length} components, ${totalChanges} changes`,
        });
      } else {
        const pageName = figma.currentPage.name;
        const complete = computeCompleteExport(nodeIds, pageName);
        const json = JSON.stringify(complete, null, 2);
        figma.ui.postMessage({
          type: 'export-result',
          json,
          summary: `Complete export: ${complete.components.length} components`,
        });
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      figma.ui.postMessage({ type: 'export-result', json: '', summary: `Export error: ${errMsg}` });
    }
    return;
  }

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

          // Store baseline snapshot and identity for edit tracking
          // IMPORTANT: serialize the *created* Figma node (not the DSL input) so
          // the baseline uses the same serialization path as changeset export.
          // This eliminates false diffs from Figma defaults, opacity compounding,
          // float precision, and property normalization differences.
          storeBaseline(node, serializeNode(node));
          storeIdentity(node, compDef.name, `${compDef.name}.dsl.ts`);
          trackedNodeIds.add(node.id);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Error creating "${compDef.name}": ${errMsg}`);
      }
    }

    // Start edit tracking after import
    if (createdNodes.length > 0) {
      startTracking();
    }

    if (errors.length > 0) {
      figma.notify(`Import completed with ${errors.length} errors`, { error: true });
    } else {
      figma.notify(`Import completed: ${createdNodes.length} components with tracking enabled`);
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
