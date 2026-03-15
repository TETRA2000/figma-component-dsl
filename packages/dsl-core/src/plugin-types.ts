// --- Plugin Node Definition ---
// Canonical type for the Figma plugin import/export format.
// Previously duplicated in packages/plugin and packages/exporter.

export interface PluginNodeDef {
  readonly type: string;
  readonly name: string;
  readonly size: { x: number; y: number };
  readonly fills?: ReadonlyArray<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
    opacity: number;
    gradientStops?: ReadonlyArray<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
    gradientTransform?: [[number, number, number], [number, number, number]];
    imageData?: string;
    imageScaleMode?: string;
    imageDimensions?: { width: number; height: number };
    imageFormat?: string;
    imageHash?: string;
    imageError?: string;
  }>;
  readonly strokes?: ReadonlyArray<{
    color: { r: number; g: number; b: number; a: number };
    weight: number;
    align?: string;
  }>;
  readonly cornerRadius?: number;
  readonly opacity: number;
  readonly visible: boolean;
  readonly clipContent?: boolean;
  readonly children: ReadonlyArray<PluginNodeDef>;

  // Auto-layout
  readonly stackMode?: string;
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
  readonly fontSize?: number;
  readonly fontFamily?: string;
  readonly fontWeight?: number;
  readonly fontStyle?: string;
  readonly textAlignHorizontal?: string;
  readonly textAutoResize?: string;
  readonly lineHeight?: { value: number; unit: string };
  readonly letterSpacing?: { value: number; unit: string };

  // Component
  readonly componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;

  // Instance
  readonly componentId?: string;
  readonly overriddenProperties?: Record<string, string | boolean>;
}

export interface PluginInput {
  readonly schemaVersion: string;
  readonly targetPage: string;
  readonly components: ReadonlyArray<PluginNodeDef>;
}

// --- Edit Tracker Types ---

export interface ComponentIdentity {
  readonly componentName: string;
  readonly dslSourcePath: string;
  readonly importTimestamp: string;
  readonly originalNodeId: string;
}

export interface EditLogEntry {
  readonly nodeId: string;
  readonly componentName: string;
  readonly timestamp: string;
  readonly changeType: 'PROPERTY_CHANGE' | 'CREATE' | 'DELETE';
  readonly properties: ReadonlyArray<string>;
  readonly origin: 'LOCAL' | 'REMOTE';
}
