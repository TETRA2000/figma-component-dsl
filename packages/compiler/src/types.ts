// --- Compiled Output (matches figma-html-renderer node dict format) ---

export interface Baseline {
  readonly lineY: number;
  readonly lineHeight: number;
  readonly firstCharIndex: number;
  readonly endCharIndex: number;
}

export interface FontMeta {
  readonly fontFamily: string;
  readonly fontStyle: string;
  readonly fontWeight: number;
  readonly fontSize: number;
}

export interface FigmaPaint {
  readonly type: 'SOLID' | 'GRADIENT_LINEAR';
  readonly color?: { readonly r: number; readonly g: number; readonly b: number; readonly a: number };
  readonly opacity?: number;
  readonly visible?: boolean;
  readonly gradientStops?: readonly { readonly color: { readonly r: number; readonly g: number; readonly b: number; readonly a: number }; readonly position: number }[];
  readonly gradientTransform?: readonly [readonly [number, number, number], readonly [number, number, number]];
}

export type Transform = readonly [
  readonly [number, number, number],
  readonly [number, number, number],
  readonly [number, number, number],
];

export interface FigmaNodeDict {
  guid: [number, number];
  type: string;
  name: string;
  size: { x: number; y: number };
  transform: Transform;
  fillPaints: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity: number;
  visible: boolean;
  clipContent?: boolean;
  children: FigmaNodeDict[];
  parentIndex?: { guid: [number, number]; position: string };

  // Auto-layout passthrough
  stackMode?: 'HORIZONTAL' | 'VERTICAL';
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX';
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';

  // Text
  textData?: { characters: string; lines: string[] };
  derivedTextData?: { baselines: Baseline[]; fontMetaData: FontMeta[] };
  fontSize?: number;
  fontFamily?: string;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT';
  letterSpacing?: { value: number; unit: 'PERCENT' | 'PIXELS' };

  // Corner radii (per-corner)
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };

  // Component
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;

  // Instance
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

export interface CompileError {
  readonly message: string;
  readonly nodePath: string;
  readonly nodeType: string;
}

export interface CompileResult {
  readonly root: FigmaNodeDict;
  readonly nodeCount: number;
  readonly errors: readonly CompileError[];
}
