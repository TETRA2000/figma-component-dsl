export type FigmaNodeType = 'FRAME' | 'TEXT' | 'RECTANGLE' | 'ROUNDED_RECTANGLE'
  | 'ELLIPSE' | 'GROUP' | 'COMPONENT' | 'COMPONENT_SET' | 'INSTANCE' | 'VECTOR';

export interface FigmaPaint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL';
  color?: { r: number; g: number; b: number; a: number };
  opacity: number;
  visible: boolean;
  gradientStops?: Array<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
  gradientTransform?: [[number, number, number], [number, number, number]];
  center?: { x: number; y: number };
  radius?: number;
}

export interface FigmaStroke {
  color: { r: number; g: number; b: number; a: number };
  weight: number;
  align?: 'INSIDE' | 'CENTER' | 'OUTSIDE';
}

export interface Baseline {
  lineY: number;
  lineHeight: number;
  firstCharIndex: number;
  endCharIndex: number;
}

export interface FontMeta {
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  fontSize: number;
}

export interface FigmaNodeDict {
  guid: [number, number];
  type: FigmaNodeType;
  name: string;
  size: { x: number; y: number };
  transform: [[number, number, number],
              [number, number, number],
              [number, number, number]];
  fillPaints: FigmaPaint[];
  strokes?: FigmaStroke[];
  strokeWeight?: number;
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
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
  textAutoResize?: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';

  // Component
  componentProperties?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;

  // Instance
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

export interface CompileError {
  message: string;
  nodePath: string;
  nodeType: string;
}

export interface CompileResult {
  root: FigmaNodeDict;
  nodeCount: number;
  errors: CompileError[];
}

export interface TextMeasurement {
  width: number;
  height: number;
}

export interface TextMeasurer {
  initialize(fontDir: string): void;
  measure(characters: string, style: { fontFamily?: string; fontWeight?: number; fontSize?: number; lineHeight?: { value: number; unit: string }; letterSpacing?: { value: number; unit: string } }): TextMeasurement;
  measureWrapped(characters: string, maxWidth: number, style: { fontFamily?: string; fontWeight?: number; fontSize?: number; lineHeight?: { value: number; unit: string }; letterSpacing?: { value: number; unit: string } }): TextMeasurement;
}
