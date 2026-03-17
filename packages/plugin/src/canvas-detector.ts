// --- Canvas Detector ---
// Detects DslCanvas regions within exported components by scanning
// for dsl-canvas plugin data. Replaces the 3-phase SlotDetector.

// --- Types ---

/** Minimal exportable node interface for testability */
export interface ExportableNode {
  readonly width: number;
  readonly height: number;
  exportAsync(settings: { format: 'PNG'; constraint: { type: 'SCALE'; value: number } }): Promise<Uint8Array>;
}

/** Minimal interface for canvas-detectable child nodes */
export interface CanvasDetectableNode {
  readonly type: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly id: string;
  getPluginData?(key: string): string;
}

/** Minimal interface for component nodes with children */
export interface CanvasDetectableComponent {
  readonly type: string;
  readonly children: readonly CanvasDetectableNode[];
}

/** A detected DslCanvas region */
export interface CanvasRegion {
  readonly node: CanvasDetectableNode;
  readonly canvasName: string;
}

// --- Detection ---

/**
 * Detect all DslCanvas regions within a component node tree.
 * Walks direct children and checks for dsl-canvas plugin data.
 */
export function detectCanvasRegions(componentNode: CanvasDetectableComponent): CanvasRegion[] {
  const results: CanvasRegion[] = [];

  for (const child of componentNode.children) {
    if (!child.getPluginData) continue;

    const data = child.getPluginData('dsl-canvas');
    if (!data) continue;

    try {
      const parsed = JSON.parse(data) as { isCanvas?: boolean; canvasName?: string };
      if (parsed.isCanvas === true) {
        results.push({
          node: child,
          canvasName: parsed.canvasName ?? child.name,
        });
      }
    } catch {
      // Invalid JSON — skip this node
    }
  }

  return results;
}
