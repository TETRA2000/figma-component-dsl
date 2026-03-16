// --- Slot Detector ---
// Detects Figma native Slots and DslCanvas regions within exported components.
// Uses componentPropertyDefinitions as primary detection (universal),
// supplemented by node.type === "SLOT" and DslCanvas plugin data.

// --- Types ---

export type SlotSourceType = 'dslCanvas' | 'nativeSlot';
export type SlotNodeKind = 'wrapped' | 'converted';

export interface SlotDetectionResult {
  /** The detected slot/canvas node */
  node: SlotDetectableNode;
  /** Name for the slot (from componentPropertyDefinitions key or canvasName) */
  slotName: string;
  /** Source classification */
  sourceType: SlotSourceType;
  /** Whether this is a wrapped slot (type: SLOT) or converted slot (type: FRAME) */
  slotNodeKind: SlotNodeKind;
  /** The componentPropertyDefinitions key (e.g., "Footer#1:3") if detected via property definitions */
  propertyKey?: string;
  /** Detection method used */
  detectedVia: 'componentPropertyDefinitions' | 'nodeType' | 'pluginData';
}

// Minimal interface for testability — mirrors Figma SceneNode subset
export interface SlotDetectableNode {
  readonly type: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly id: string;
  getPluginData?(key: string): string;
}

// Minimal interface for component nodes with property definitions
export interface SlotDetectableComponent {
  readonly type: string;
  readonly name: string;
  readonly id: string;
  readonly children: readonly SlotDetectableNode[];
  readonly componentPropertyDefinitions?: Record<string, { type: string; defaultValue?: unknown }>;
}

// --- Key Parsing ---

/**
 * Parse a componentPropertyDefinitions key to extract the layer name.
 * Key format: "{LayerName}#{N}:{M}" — split on the LAST `#` to handle
 * layer names that contain `#`.
 */
export function parsePropertyKey(key: string): string | undefined {
  const lastHash = key.lastIndexOf('#');
  if (lastHash <= 0) return undefined;
  return key.substring(0, lastHash);
}

// --- Detection ---

/**
 * Detect all slot and canvas regions within a component node tree.
 * Uses componentPropertyDefinitions as primary detection (universal),
 * supplemented by node.type === "SLOT" and DslCanvas plugin data.
 */
export function detectSlots(componentNode: SlotDetectableComponent): SlotDetectionResult[] {
  const results: SlotDetectionResult[] = [];
  const detectedNodeIds = new Set<string>();

  // Phase 1: Primary detection via componentPropertyDefinitions
  const propDefs = componentNode.componentPropertyDefinitions;
  if (propDefs) {
    // Collect SLOT-type property definitions
    const slotProps: Array<{ key: string; layerName: string }> = [];
    for (const [key, def] of Object.entries(propDefs)) {
      if (def.type === 'SLOT') {
        const layerName = parsePropertyKey(key);
        if (layerName) {
          slotProps.push({ key, layerName });
        }
      }
    }

    // Track unmatched properties and children for positional fallback
    const unmatchedProps: Array<{ key: string; layerName: string }> = [];
    const matchedChildIds = new Set<string>();

    for (const slotProp of slotProps) {
      // Try name match first
      const matchedChild = componentNode.children.find(
        child => child.name === slotProp.layerName && !matchedChildIds.has(child.id)
      );

      if (matchedChild) {
        matchedChildIds.add(matchedChild.id);
        const result = classifyNode(matchedChild, slotProp.layerName, slotProp.key, 'componentPropertyDefinitions');
        results.push(result);
        detectedNodeIds.add(matchedChild.id);
      } else {
        unmatchedProps.push(slotProp);
      }
    }

    // Positional fallback for unmatched properties
    if (unmatchedProps.length > 0) {
      const unmatchedChildren = componentNode.children.filter(
        child => !matchedChildIds.has(child.id) && (
          (child.type as string) === 'SLOT' || child.type === 'FRAME'
        )
      );

      for (let i = 0; i < unmatchedProps.length && i < unmatchedChildren.length; i++) {
        const child = unmatchedChildren[i]!;
        const prop = unmatchedProps[i]!;
        console.warn(
          `[SlotDetector] Name mismatch for slot property "${prop.key}": ` +
          `expected child named "${prop.layerName}", using positional fallback to "${child.name}"`
        );
        const result = classifyNode(child, prop.layerName, prop.key, 'componentPropertyDefinitions');
        results.push(result);
        detectedNodeIds.add(child.id);
      }
    }
  }

  // Phase 2: Supplementary detection via node.type === "SLOT"
  for (const child of componentNode.children) {
    if (detectedNodeIds.has(child.id)) continue;
    if ((child.type as string) === 'SLOT') {
      const result = classifyNode(child, child.name, undefined, 'nodeType');
      results.push(result);
      detectedNodeIds.add(child.id);
    }
  }

  // Phase 3: DslCanvas plugin data detection for nodes not yet detected
  for (const child of componentNode.children) {
    if (detectedNodeIds.has(child.id)) continue;
    if (hasDslCanvasPluginData(child)) {
      const canvasName = getDslCanvasName(child) ?? child.name;
      results.push({
        node: child,
        slotName: canvasName,
        sourceType: 'dslCanvas',
        slotNodeKind: child.type === 'FRAME' ? 'converted' : 'wrapped',
        detectedVia: 'pluginData',
      });
      detectedNodeIds.add(child.id);
    }
  }

  return results;
}

// --- Internal Helpers ---

function classifyNode(
  node: SlotDetectableNode,
  slotName: string,
  propertyKey: string | undefined,
  detectedVia: SlotDetectionResult['detectedVia'],
): SlotDetectionResult {
  const slotNodeKind: SlotNodeKind = (node.type as string) === 'SLOT' ? 'wrapped' : 'converted';

  // DslCanvas plugin data overrides source type classification
  const sourceType: SlotSourceType = hasDslCanvasPluginData(node) ? 'dslCanvas' : 'nativeSlot';

  return {
    node,
    slotName,
    sourceType,
    slotNodeKind,
    propertyKey,
    detectedVia,
  };
}

function hasDslCanvasPluginData(node: SlotDetectableNode): boolean {
  if (!node.getPluginData) return false;
  const data = node.getPluginData('dsl-canvas');
  if (!data) return false;
  try {
    const parsed = JSON.parse(data) as { isCanvas?: boolean };
    return parsed.isCanvas === true;
  } catch {
    return false;
  }
}

function getDslCanvasName(node: SlotDetectableNode): string | undefined {
  if (!node.getPluginData) return undefined;
  const data = node.getPluginData('dsl-canvas');
  if (!data) return undefined;
  try {
    const parsed = JSON.parse(data) as { canvasName?: string };
    return parsed.canvasName;
  } catch {
    return undefined;
  }
}
