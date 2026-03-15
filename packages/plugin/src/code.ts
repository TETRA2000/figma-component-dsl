// Figma Plugin — DSL to Figma Components
// This runs inside Figma's plugin sandbox with access to the `figma` global

import type {
  PluginNodeDef,
  PluginInput,
  ComponentIdentity,
  EditLogEntry,
  ChangesetDocument,
  ComponentChangeEntry,
  PropertyChange,
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
import {
  formatSlotName,
  buildSlotPluginData,
  buildComponentMap as buildComponentEntryMap,
  formatDetachedCopyName,
} from './slot-utils.js';
import type { ComponentEntry } from './slot-utils.js';
import uiHtml from './ui.html';

const componentMap = new Map<string, ComponentNode>();
const fileScannedComponents = new Map<string, ComponentNode>();
const PLUGIN_DATA_SLOT = 'dsl-slot';
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

// Debounce timer for batching change notifications
let notificationDebounce: ReturnType<typeof setTimeout> | null = null;
const pendingNotifications = new Map<string, EditLogEntry[]>();

function flushNotifications(): void {
  for (const [componentName, entries] of pendingNotifications) {
    const categories = categorizeChanges(entries);
    wsSend({
      type: 'change-notification',
      componentName,
      changedCategories: categories,
      timestamp: new Date().toISOString(),
    });
  }
  pendingNotifications.clear();
}

function startTracking(): void {
  if (isTracking) return;
  isTracking = true;

  figma.on('documentchange', (event) => {
    for (const change of event.documentChanges) {
      if (change.type !== 'PROPERTY_CHANGE' && change.type !== 'CREATE' && change.type !== 'DELETE') {
        continue;
      }

      // Handle deletion of tracked top-level component nodes
      if (change.type === 'DELETE' && 'id' in change) {
        const deletedId = (change as { id: string }).id;
        if (trackedNodeIds.has(deletedId)) {
          // Find the component name from the edit log or tracked data
          trackedNodeIds.delete(deletedId);
          wsSend({
            type: 'component-deleted',
            componentName: deletedId, // Best effort — identity data is gone
            nodeId: deletedId,
          });
          continue;
        }
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

      // Batch notifications by component name with debounce
      const existing = pendingNotifications.get(entry.componentName) ?? [];
      existing.push(entry);
      pendingNotifications.set(entry.componentName, existing);
    }

    // Debounce: send notifications 500ms after last change
    if (notificationDebounce) clearTimeout(notificationDebounce);
    notificationDebounce = setTimeout(flushNotifications, 500);
  });
}

// Pending image fills that need async processing after node creation
interface PendingImageFill {
  fillIndex: number;
  imageData: string;
  scaleMode: string;
}

function toFigmaPaints(fills: PluginNodeDef['fills']): { paints: Paint[]; pendingImages: PendingImageFill[] } {
  if (!fills) return { paints: [], pendingImages: [] };
  const pendingImages: PendingImageFill[] = [];
  const paints = fills.map((f, index) => {
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
    if (f.type === 'IMAGE' && f.imageData) {
      // Queue for async processing — return placeholder that will be replaced
      pendingImages.push({
        fillIndex: index,
        imageData: f.imageData,
        scaleMode: f.imageScaleMode ?? 'FILL',
      });
      // Temporary gray placeholder — will be replaced after image creation
      return { type: 'SOLID' as const, color: { r: 0.8, g: 0.8, b: 0.8 }, opacity: f.opacity, visible: true };
    }
    if (f.type === 'IMAGE' && f.imageError) {
      // Image had an error during export — gray placeholder
      console.error(`Image fill error: ${f.imageError}`);
      return { type: 'SOLID' as const, color: { r: 0.8, g: 0.8, b: 0.8 }, opacity: 1, visible: true };
    }
    return { type: 'SOLID' as const, color: { r: 0, g: 0, b: 0 }, opacity: 1, visible: true };
  });
  return { paints, pendingImages };
}

async function applyFillsWithImages(
  node: SceneNode & MinimalFillsMixin,
  fills: PluginNodeDef['fills'],
): Promise<void> {
  const { paints, pendingImages } = toFigmaPaints(fills);
  node.fills = paints;

  if (pendingImages.length === 0) return;

  const currentFills = [...paints];
  for (const pending of pendingImages) {
    try {
      // Decode base64 data URI to bytes
      const base64 = pending.imageData.replace(/^data:image\/[^;]+;base64,/, '');
      const bytes = figma.base64Decode(base64);
      const imageHash = figma.createImage(bytes);

      const scaleMode = pending.scaleMode as 'FILL' | 'FIT' | 'CROP' | 'TILE';

      currentFills[pending.fillIndex] = {
        type: 'IMAGE',
        imageHash: imageHash.hash,
        scaleMode,
        visible: true,
        opacity: currentFills[pending.fillIndex]?.opacity ?? 1,
      } as ImagePaint;
    } catch (err) {
      console.error(`Failed to create Figma image: ${err}`);
      // Keep the placeholder gray fill
    }
  }
  node.fills = currentFills;
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

function scanFileForComponents(): void {
  fileScannedComponents.clear();
  const allComponents = figma.root.findAll(n => n.type === 'COMPONENT') as ComponentNode[];
  const duplicateNames: string[] = [];
  for (const comp of allComponents) {
    if (fileScannedComponents.has(comp.name)) {
      duplicateNames.push(comp.name);
      continue; // First match wins
    }
    fileScannedComponents.set(comp.name, comp);
  }
  if (duplicateNames.length > 0) {
    console.warn(`[DSL] Duplicate component names found during file scan: ${duplicateNames.join(', ')}. Using first match.`);
  }
}

async function createNode(def: PluginNodeDef, parent: BaseNode & ChildrenMixin): Promise<SceneNode | null> {
  try {
    let node: SceneNode;

    switch (def.type) {
      case 'FRAME':
      case 'ROUNDED_RECTANGLE': {
        const frame = figma.createFrame();
        // Slot frame naming convention: [Slot] {name}
        if (def.isSlot && def.slotPropertyName) {
          frame.name = formatSlotName(def.slotPropertyName);
          // Store slot metadata in plugin data for changeset tracking
          const slotData = buildSlotPluginData(
            def.slotPropertyName,
            def.slotProperties?.[def.slotPropertyName]?.preferredInstances as string[] | undefined,
          );
          frame.setPluginData(PLUGIN_DATA_SLOT, JSON.stringify(slotData));
          console.log(`[DSL] Slot "${def.slotPropertyName}" created as frame. Manual conversion to slot property may be needed (Figma API lacks SLOT support).`);
        } else {
          frame.name = def.name;
        }
        frame.resize(def.size.x, def.size.y);
        await applyFillsWithImages(frame, def.fills);
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
        await applyFillsWithImages(rect, def.fills);
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
        await applyFillsWithImages(ellipse, def.fills);
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
        await applyFillsWithImages(text, def.fills);
        text.opacity = def.opacity;
        text.visible = def.visible;
        parent.appendChild(text);
        setLayoutSizing(text, def);
        node = text;
        break;
      }

      case 'IMAGE': {
        // In Figma, IMAGE nodes are rectangles with an IMAGE fill
        const imgRect = figma.createRectangle();
        imgRect.name = def.name;
        imgRect.resize(def.size.x, def.size.y);
        if (def.cornerRadius) imgRect.cornerRadius = def.cornerRadius;
        imgRect.opacity = def.opacity;
        imgRect.visible = def.visible;

        // Apply image fills from the node's fills array
        await applyFillsWithImages(imgRect, def.fills);

        parent.appendChild(imgRect);
        setLayoutSizing(imgRect, def);
        node = imgRect;
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
        await applyFillsWithImages(comp, def.fills);
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
            await applyFillsWithImages(comp, child.fills);
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
        // If instance has slot overrides, create detached FRAME copy instead
        if (def.slotOverrides && Object.keys(def.slotOverrides).length > 0) {
          const refComp = componentMap.get(def.componentId ?? def.name);
          if (refComp) {
            // Create detached frame copy with slot overrides
            const detachedFrame = figma.createFrame();
            detachedFrame.name = formatDetachedCopyName(def.componentId ?? def.name);
            detachedFrame.resize(refComp.width, refComp.height);
            // Store original component reference for future re-import
            detachedFrame.setPluginData('dsl-detached-ref', def.componentId ?? def.name);
            parent.appendChild(detachedFrame);

            // Copy component's auto-layout config
            if (refComp.layoutMode && refComp.layoutMode !== 'NONE') {
              detachedFrame.layoutMode = refComp.layoutMode as 'HORIZONTAL' | 'VERTICAL';
              detachedFrame.itemSpacing = refComp.itemSpacing;
              detachedFrame.paddingTop = refComp.paddingTop;
              detachedFrame.paddingRight = refComp.paddingRight;
              detachedFrame.paddingBottom = refComp.paddingBottom;
              detachedFrame.paddingLeft = refComp.paddingLeft;
            }

            // Recreate children, replacing slot frames with override content
            for (const child of refComp.children) {
              const slotPluginData = child.getPluginData(PLUGIN_DATA_SLOT);
              if (slotPluginData) {
                try {
                  const slotData = JSON.parse(slotPluginData);
                  const overrideContent = def.slotOverrides[slotData.slotName];
                  if (overrideContent) {
                    // Create slot frame with override children
                    const slotFrame = figma.createFrame();
                    slotFrame.name = formatSlotName(slotData.slotName);
                    slotFrame.resize(child.width, child.height);
                    slotFrame.setPluginData(PLUGIN_DATA_SLOT, slotPluginData);
                    detachedFrame.appendChild(slotFrame);
                    for (const overrideChild of overrideContent) {
                      await createNode(overrideChild, slotFrame);
                    }
                    continue;
                  }
                } catch { /* fall through to clone */ }
              }
              // Non-slot child or no override — clone from component
              const cloned = child.clone();
              detachedFrame.appendChild(cloned);
            }

            node = detachedFrame;
          } else {
            // Component not found — fall back to frame
            const fallback = figma.createFrame();
            fallback.name = `${def.name} (unresolved)`;
            errors.push(`Component not found for detached instance: ${def.name}`);
            parent.appendChild(fallback);
            node = fallback;
          }
          break;
        }

        // Standard instance (no slot overrides)
        const refComp = componentMap.get(def.componentId ?? def.name)
          ?? fileScannedComponents.get(def.componentId ?? def.name);
        if (!refComp) {
          // Fall back to FRAME with warning
          const fallback = figma.createFrame();
          fallback.name = def.name;
          fallback.resize(def.size.x, def.size.y);
          errors.push(`Component "${def.name}" not found in local or file-scanned components — created as FRAME fallback`);
          parent.appendChild(fallback);
          node = fallback;
          break;
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

      case 'LINE': {
        const lineNode = figma.createLine();
        lineNode.name = def.name;
        lineNode.resize(def.size.x, 0);
        if (def.strokes?.length) {
          const strokes = def.strokes.map(s => ({
            type: 'SOLID' as const,
            color: { r: s.color.r, g: s.color.g, b: s.color.b },
            opacity: s.color.a,
            visible: true,
          }));
          lineNode.strokes = strokes;
          lineNode.strokeWeight = def.strokes[0]!.weight;
        }
        if (def.strokeCap) {
          lineNode.strokeCap = def.strokeCap as StrokeCap;
        }
        if (def.rotation) {
          lineNode.rotation = def.rotation;
        }
        lineNode.opacity = def.opacity;
        lineNode.visible = def.visible;
        parent.appendChild(lineNode);
        node = lineNode;
        break;
      }

      case 'SECTION': {
        const sectionNode = figma.createSection();
        sectionNode.name = def.name;
        sectionNode.resizeWithoutConstraints(def.size.x, def.size.y);
        if (def.fills?.length) {
          const { paints } = toFigmaPaints(def.fills);
          sectionNode.fills = paints;
        }
        if (def.sectionContentsHidden !== undefined) {
          sectionNode.devStatus = def.sectionContentsHidden ? { type: 'READY_FOR_DEV' } : undefined as unknown as typeof sectionNode.devStatus;
        }
        parent.appendChild(sectionNode);
        for (const child of def.children) {
          await createNode(child, sectionNode);
        }
        node = sectionNode;
        break;
      }

      case 'POLYGON': {
        const polyNode = figma.createPolygon();
        polyNode.name = def.name;
        polyNode.resize(def.size.x, def.size.y);
        if (def.pointCount) polyNode.pointCount = def.pointCount;
        await applyFillsWithImages(polyNode, def.fills);
        if (def.cornerRadius) polyNode.cornerRadius = def.cornerRadius;
        if (def.rotation) polyNode.rotation = def.rotation;
        polyNode.opacity = def.opacity;
        polyNode.visible = def.visible;
        parent.appendChild(polyNode);
        setLayoutSizing(polyNode, def);
        node = polyNode;
        break;
      }

      case 'STAR': {
        const starNode = figma.createStar();
        starNode.name = def.name;
        starNode.resize(def.size.x, def.size.y);
        if (def.pointCount) starNode.pointCount = def.pointCount;
        if (def.innerRadius !== undefined) starNode.innerRadius = def.innerRadius;
        await applyFillsWithImages(starNode, def.fills);
        if (def.rotation) starNode.rotation = def.rotation;
        starNode.opacity = def.opacity;
        starNode.visible = def.visible;
        parent.appendChild(starNode);
        setLayoutSizing(starNode, def);
        node = starNode;
        break;
      }

      case 'BOOLEAN_OPERATION': {
        // Create children first in a temporary frame
        const boolChildren: SceneNode[] = [];
        const tempContainer = figma.createFrame();
        parent.appendChild(tempContainer);
        for (const child of def.children) {
          const childNode = await createNode(child, tempContainer);
          if (childNode) boolChildren.push(childNode);
        }
        if (boolChildren.length < 2) {
          errors.push(`Boolean operation "${def.name}" requires at least 2 children`);
          tempContainer.remove();
          return null;
        }
        // Combine using the appropriate boolean method
        const opMap: Record<string, 'union' | 'subtract' | 'intersect' | 'exclude'> = {
          'UNION': 'union',
          'SUBTRACT': 'subtract',
          'INTERSECT': 'intersect',
          'EXCLUDE': 'exclude',
        };
        const method = opMap[def.booleanOperation ?? 'UNION'] ?? 'union';
        const boolNode = figma[method](boolChildren, parent);
        boolNode.name = def.name;
        if (def.fills?.length) {
          await applyFillsWithImages(boolNode, def.fills);
        }
        boolNode.opacity = def.opacity;
        boolNode.visible = def.visible;
        tempContainer.remove();
        node = boolNode;
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

async function embedImageDataForChange(
  change: PropertyChange,
  node: SceneNode,
): Promise<PropertyChange> {
  // Only embed image data for image hash changes
  if (!change.propertyPath.includes('imageHash') || change.changeType === 'removed') {
    return change;
  }

  try {
    // Find the image fill on the node and get its bytes
    if ('fills' in node) {
      const fills = node.fills as ReadonlyArray<Paint>;
      for (const fill of fills) {
        if (fill.type === 'IMAGE') {
          const imgPaint = fill as ImagePaint;
          const image = figma.getImageByHash(imgPaint.imageHash);
          if (image) {
            const bytes = await image.getBytesAsync();
            const base64 = figma.base64Encode(bytes);
            return { ...change, imageData: `data:image/png;base64,${base64}` };
          }
        }
      }
    }
  } catch (err) {
    console.warn(`Failed to retrieve image bytes: ${err}`);
  }

  return change;
}

// Unsyncable property detection — properties that exist in Figma but have no DSL equivalent
interface UnsyncableWarning {
  readonly propertyPath: string;
  readonly severity: 'info' | 'warning' | 'error';
  readonly description: string;
  readonly unsupportedValue?: unknown;
}

function detectUnsyncableProperties(node: SceneNode): UnsyncableWarning[] {
  const warnings: UnsyncableWarning[] = [];

  // Effects (drop shadow, inner shadow, blur, background blur)
  if ('effects' in node) {
    const effects = (node as FrameNode).effects;
    if (effects && effects.length > 0) {
      for (let i = 0; i < effects.length; i++) {
        const effect = effects[i]!;
        if (effect.visible !== false) {
          warnings.push({
            propertyPath: `effects.${i}`,
            severity: 'warning',
            description: `${effect.type} effect has no DSL equivalent`,
            unsupportedValue: effect.type,
          });
        }
      }
    }
  }

  // Blend mode (non-default)
  if ('blendMode' in node) {
    const blendMode = (node as FrameNode).blendMode;
    if (blendMode && blendMode !== 'PASS_THROUGH' && blendMode !== 'NORMAL') {
      warnings.push({
        propertyPath: 'blendMode',
        severity: 'info',
        description: `Blend mode ${blendMode} has no DSL equivalent`,
        unsupportedValue: blendMode,
      });
    }
  }

  // Rotation
  if ('rotation' in node) {
    const rotation = (node as FrameNode).rotation;
    if (rotation && rotation !== 0) {
      warnings.push({
        propertyPath: 'rotation',
        severity: 'warning',
        description: `Rotation of ${rotation} degrees has no DSL equivalent`,
        unsupportedValue: rotation,
      });
    }
  }

  // Constraints
  if ('constraints' in node) {
    const constraints = (node as FrameNode).constraints;
    if (constraints && (constraints.horizontal !== 'MIN' || constraints.vertical !== 'MIN')) {
      warnings.push({
        propertyPath: 'constraints',
        severity: 'info',
        description: `Constraints ${constraints.horizontal}/${constraints.vertical} may not be preserved`,
        unsupportedValue: constraints,
      });
    }
  }

  // Boolean operations (on groups)
  if (node.type === 'BOOLEAN_OPERATION') {
    warnings.push({
      propertyPath: 'booleanOperation',
      severity: 'error',
      description: `Boolean operation ${(node as BooleanOperationNode).booleanOperation} has no DSL equivalent`,
      unsupportedValue: (node as BooleanOperationNode).booleanOperation,
    });
  }

  // Masks
  if ('isMask' in node && (node as FrameNode).isMask) {
    warnings.push({
      propertyPath: 'isMask',
      severity: 'error',
      description: 'Mask property has no DSL equivalent',
    });
  }

  // FILL sizing on top-level frames (known DSL constraint)
  if (node.type === 'FRAME' && (!node.parent || node.parent.type === 'PAGE')) {
    if ('layoutSizingHorizontal' in node) {
      const sizing = (node as FrameNode).layoutSizingHorizontal;
      if (sizing === 'FILL') {
        warnings.push({
          propertyPath: 'layoutSizingHorizontal',
          severity: 'error',
          description: 'FILL sizing on top-level frames is not supported in the DSL pipeline',
          unsupportedValue: 'FILL',
        });
      }
    }
  }

  // Recursively check children
  if ('children' in node) {
    for (const child of (node as FrameNode).children) {
      const childWarnings = detectUnsyncableProperties(child);
      for (const w of childWarnings) {
        warnings.push({
          ...w,
          propertyPath: `${node.name}.${w.propertyPath}`,
        });
      }
    }
  }

  return warnings;
}

async function computeChangeset(nodeIds: ReadonlyArray<string>): Promise<ChangesetDocument> {
  const components: ComponentChangeEntry[] = [];
  const allWarnings: UnsyncableWarning[] = [];

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

    // Detect unsyncable properties
    const nodeWarnings = detectUnsyncableProperties(node);
    allWarnings.push(...nodeWarnings);

    if (changes.length > 0) {
      // Embed image data for image-related changes
      let enrichedChanges = await Promise.all(
        changes.map(c => embedImageDataForChange(c, node)),
      );

      // Enrich slot-related changes with serialized slot content
      enrichedChanges = enrichedChanges.map(change => {
        if (change.propertyPath.includes('children')) {
          // Check if this change is within a slot frame
          const slotInfo = findSlotContext(node, change.propertyPath);
          if (slotInfo) {
            return {
              ...change,
              slotName: slotInfo.slotName,
              slotChangeType: inferSlotChangeType(change),
              slotContent: slotInfo.currentChildren,
            };
          }
        }
        return change;
      });

      components.push({
        componentName: identity.componentName,
        componentId: nodeId,
        changes: enrichedChanges,
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
    ...(allWarnings.length > 0 ? { warnings: allWarnings } : {}),
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

figma.showUI(uiHtml, { width: 500, height: 560 });

// Helper to send a message via the WebSocket through the UI bridge
function wsSend(payload: Record<string, unknown>): void {
  figma.ui.postMessage({ type: 'ws-send', payload });
}

// Categorize edit log entries into change categories
function categorizeChanges(entries: EditLogEntry[]): string[] {
  const categories = new Set<string>();
  for (const entry of entries) {
    // Check if changes occurred within a slot frame
    const isSlotChange = isChangeInSlotFrame(entry.nodeId);
    if (isSlotChange) {
      categories.add('slot-structure');
    }

    for (const prop of entry.properties) {
      if (prop.includes('fill') || prop.includes('color')) categories.add('fills');
      else if (prop.includes('font') || prop.includes('text') || prop.includes('character')) categories.add('typography');
      else if (prop.includes('layout') || prop.includes('spacing') || prop.includes('padding') || prop.includes('width') || prop.includes('height') || prop.includes('x') || prop.includes('y')) categories.add('layout');
      else if (prop.includes('stroke')) categories.add('strokes');
      else if (prop.includes('corner') || prop.includes('radius')) categories.add('geometry');
      else if (prop.includes('opacity') || prop.includes('visible')) categories.add('appearance');
      else categories.add('other');
    }
    if (entry.changeType === 'CREATE') categories.add('structure');
    if (entry.changeType === 'DELETE') categories.add('structure');
  }
  return [...categories];
}

// Find slot context for a change path within a node
function findSlotContext(
  rootNode: SceneNode,
  propertyPath: string,
): { slotName: string; currentChildren: PluginNodeDef[] } | undefined {
  // Walk through children to find a slot frame matching the property path
  if (!('children' in rootNode)) return undefined;
  const parent = rootNode as FrameNode;
  for (const child of parent.children) {
    const slotData = child.getPluginData(PLUGIN_DATA_SLOT);
    if (slotData) {
      try {
        const parsed = JSON.parse(slotData) as { slotName: string };
        // Serialize current slot children
        const serializedChildren: PluginNodeDef[] = [];
        if ('children' in child) {
          for (const grandchild of (child as FrameNode).children) {
            serializedChildren.push(serializeNode(grandchild));
          }
        }
        return {
          slotName: parsed.slotName,
          currentChildren: serializedChildren,
        };
      } catch { /* skip malformed data */ }
    }
  }
  return undefined;
}

function inferSlotChangeType(
  change: PropertyChange,
): 'child-added' | 'child-removed' | 'child-reordered' {
  if (change.changeType === 'added') return 'child-added';
  if (change.changeType === 'removed') return 'child-removed';
  return 'child-reordered';
}

// Check if a node or any of its ancestors is a slot frame
function isChangeInSlotFrame(nodeId: string): boolean {
  let node = figma.getNodeById(nodeId);
  while (node) {
    if ('getPluginData' in node) {
      const slotData = (node as SceneNode).getPluginData(PLUGIN_DATA_SLOT);
      if (slotData) return true;
    }
    node = node.parent;
  }
  return false;
}

// Handle WebSocket messages relayed from the UI iframe
async function handleWsMessage(payload: { type: string; requestId?: string; pluginInput?: PluginInput; componentNames?: string[]; pageName?: string }): Promise<void> {
  switch (payload.type) {
    case 'push-components': {
      try {
        const input = payload.pluginInput!;
        errors.length = 0;
        componentMap.clear();
        fileScannedComponents.clear();

        // Scan file for existing components when resolveExisting is enabled
        if (input.resolveExisting) {
          scanFileForComponents();
        }

        let page = figma.root.children.find(p => p.name === input.targetPage);
        if (!page) {
          page = figma.createPage();
          page.name = input.targetPage;
        }
        await figma.setCurrentPageAsync(page);

        const nodeIds: Record<string, string> = {};
        const total = input.components.length;
        let col = 0;
        let rowX = 0;
        let rowY = 0;
        let rowMaxHeight = 0;

        for (let i = 0; i < total; i++) {
          const compDef = input.components[i]!;
          try {
            // Check if we already have this component tracked (update in-place)
            let existingNode: SceneNode | null = null;
            for (const trackedId of trackedNodeIds) {
              const n = figma.getNodeById(trackedId);
              if (n && 'getPluginData' in n) {
                const identityData = (n as SceneNode).getPluginData(PLUGIN_DATA_IDENTITY);
                if (identityData) {
                  const identity = JSON.parse(identityData) as ComponentIdentity;
                  if (identity.componentName === compDef.name) {
                    existingNode = n as SceneNode;
                    break;
                  }
                }
              }
            }

            if (existingNode) {
              // Remove existing node and recreate (simpler than in-place update)
              trackedNodeIds.delete(existingNode.id);
              existingNode.remove();
            }

            const node = await createNode(compDef, page);
            if (node) {
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

              nodeIds[compDef.name] = node.id;
              storeBaseline(node, serializeNode(node));
              storeIdentity(node, compDef.name, `${compDef.name}.dsl.ts`);
              trackedNodeIds.add(node.id);
            }
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            errors.push(`Error creating "${compDef.name}": ${errMsg}`);
          }
        }

        if (Object.keys(nodeIds).length > 0) {
          startTracking();
        }

        const summary = errors.length > 0
          ? `Created ${Object.keys(nodeIds).length} components with ${errors.length} errors`
          : `Created ${Object.keys(nodeIds).length} components`;

        wsSend({
          type: 'push-result',
          requestId: payload.requestId,
          nodeIds,
          summary,
        });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        wsSend({
          type: 'push-result',
          requestId: payload.requestId,
          nodeIds: {},
          summary: `Push failed: ${errMsg}`,
        });
      }
      break;
    }

    case 'request-changeset': {
      try {
        let nodeIds: string[];
        if (payload.componentNames && payload.componentNames.length > 0) {
          nodeIds = filterTrackedByNames(payload.componentNames);
        } else {
          nodeIds = getTrackedNodeIdsOnPage();
        }

        const changeset = await computeChangeset(nodeIds);
        wsSend({
          type: 'changeset-result',
          requestId: payload.requestId,
          changeset,
        });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        wsSend({
          type: 'changeset-result',
          requestId: payload.requestId,
          changeset: {
            schemaVersion: '1.0',
            timestamp: new Date().toISOString(),
            source: { pluginVersion: '0.1.0', figmaFileName: figma.root.name },
            components: [],
            warnings: [{ propertyPath: '', severity: 'error', description: `Error: ${errMsg}` }],
          },
        });
      }
      break;
    }

    case 'request-export': {
      try {
        let nodeIds: string[];
        if (payload.componentNames && payload.componentNames.length > 0) {
          nodeIds = filterTrackedByNames(payload.componentNames);
        } else {
          nodeIds = getTrackedNodeIdsOnPage();
        }

        const pageName = payload.pageName ?? figma.currentPage.name;
        const pluginInput = computeCompleteExport(nodeIds, pageName);
        wsSend({
          type: 'export-result',
          requestId: payload.requestId,
          pluginInput,
        });
      } catch (_err) {
        wsSend({
          type: 'export-result',
          requestId: payload.requestId,
          pluginInput: { targetPage: '', components: [] },
        });
      }
      break;
    }
  }
}

// Filter tracked node IDs by component names
function filterTrackedByNames(names: string[]): string[] {
  const nameSet = new Set(names);
  const result: string[] = [];
  for (const id of trackedNodeIds) {
    const node = figma.getNodeById(id);
    if (node && 'getPluginData' in node) {
      const identityData = (node as SceneNode).getPluginData(PLUGIN_DATA_IDENTITY);
      if (identityData) {
        const identity = JSON.parse(identityData) as ComponentIdentity;
        if (nameSet.has(identity.componentName)) {
          result.push(id);
        }
      }
    }
  }
  return result;
}

figma.ui.onmessage = async (msg: { type: string; data: string; autoExport?: boolean; scope?: string; payload?: Record<string, unknown> }) => {
  // Handle WebSocket messages relayed from UI
  if (msg.type === 'ws-connected') {
    // Send handshake with file key
    wsSend({
      type: 'handshake',
      figmaFileKey: figma.root.name,
      pluginVersion: '0.1.0',
      userId: figma.currentUser?.name ?? 'unknown',
    });
    return;
  }

  if (msg.type === 'ws-message' && msg.payload) {
    await handleWsMessage(msg.payload as Parameters<typeof handleWsMessage>[0]);
    return;
  }

  if (msg.type === 'ws-disconnected') {
    // Connection lost — UI handles reconnection
    return;
  }

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
        const changeset = await computeChangeset(nodeIds);
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
    fileScannedComponents.clear();

    // Scan file for existing components when resolveExisting is enabled
    if (input.resolveExisting) {
      scanFileForComponents();
    }

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
