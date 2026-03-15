// --- Node Types ---
export type NodeType = 'FRAME' | 'TEXT' | 'RECTANGLE' | 'ELLIPSE' | 'GROUP'
  | 'COMPONENT' | 'COMPONENT_SET' | 'INSTANCE'
  | 'LINE' | 'SECTION' | 'POLYGON' | 'STAR' | 'BOOLEAN_OPERATION';

// --- Stroke Cap ---
export type StrokeCap = 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW'
  | 'DIAMOND_FILLED' | 'CIRCLE_FILLED' | 'TRIANGLE_FILLED';

// --- Boolean Operation ---
export type BooleanOperationType = 'UNION' | 'SUBTRACT' | 'INTERSECT' | 'EXCLUDE';

// --- Color & Fill ---
export interface RgbaColor {
  r: number; // 0–1
  g: number;
  b: number;
  a: number;
}

export interface SolidFill {
  type: 'SOLID';
  color: RgbaColor;
  opacity: number;
  visible: boolean;
}

export interface GradientStop {
  color: RgbaColor;
  position: number; // 0–1
}

export interface GradientFill {
  type: 'GRADIENT_LINEAR';
  gradientStops: GradientStop[];
  gradientTransform: [[number, number, number], [number, number, number]];
  opacity: number;
  visible: boolean;
}

export type Fill = SolidFill | GradientFill;

export interface StrokePaint {
  color: RgbaColor;
  weight: number;
  align?: 'INSIDE' | 'CENTER' | 'OUTSIDE';
  strokeCap?: StrokeCap;
}

// --- Auto-Layout ---
export interface AutoLayoutConfig {
  direction: 'HORIZONTAL' | 'VERTICAL';
  spacing?: number;
  padX?: number;
  padY?: number;
  padTop?: number;
  padRight?: number;
  padBottom?: number;
  padLeft?: number;
  align?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAlign?: 'MIN' | 'CENTER' | 'MAX';
  sizing?: 'FIXED' | 'HUG' | 'FILL';
  widthSizing?: 'FIXED' | 'HUG' | 'FILL';
  heightSizing?: 'FIXED' | 'HUG' | 'FILL';
}

// --- Child Layout ---
export interface ChildLayoutProps {
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
  layoutGrow?: number;
}

// --- Typography ---
export interface TextStyle {
  fontFamily?: string;       // default: 'Inter'
  fontWeight?: 400 | 500 | 600 | 700;
  fontSize?: number;         // pixels
  lineHeight?: { value: number; unit: 'PERCENT' | 'PIXELS' };
  letterSpacing?: { value: number; unit: 'PERCENT' | 'PIXELS' };
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT';
  textAutoResize?: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';
  color?: string;            // hex string, convenience shorthand
}

// --- Component Properties ---
export type ComponentPropertyType = 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP';

export interface ComponentProperty {
  name: string;
  type: ComponentPropertyType;
  defaultValue: string | boolean;
  preferredValues?: string[];
}

// --- DSL Node (AST) ---
export interface DslNode {
  type: NodeType;
  name: string;
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  opacity?: number;
  visible?: boolean;
  clipContent?: boolean;
  children?: DslNode[];

  // Auto-layout container config (FRAME, COMPONENT only)
  autoLayout?: AutoLayoutConfig;

  // Child sizing within parent's auto-layout (any node type)
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';

  // Text (TEXT only)
  characters?: string;
  textStyle?: TextStyle;
  textAutoResize?: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT';

  // Component (COMPONENT only)
  componentProperties?: ComponentProperty[];

  // Component Set (COMPONENT_SET only)
  variantAxes?: Record<string, string[]>;

  // Instance (INSTANCE only)
  componentRef?: string;
  propertyOverrides?: Record<string, string | boolean>;

  // Geometry (POLYGON, STAR)
  pointCount?: number;
  innerRadius?: number; // STAR only, 0–1, default 0.382

  // Rotation (LINE, POLYGON, STAR)
  rotation?: number;

  // Boolean operation (BOOLEAN_OPERATION only)
  booleanOperation?: BooleanOperationType;

  // Section (SECTION only)
  contentsHidden?: boolean;
}

// --- Factory Prop Types ---
export interface FrameProps {
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  opacity?: number;
  visible?: boolean;
  clipContent?: boolean;
  children?: DslNode[];
  autoLayout?: AutoLayoutConfig;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface RectangleProps {
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  opacity?: number;
  visible?: boolean;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface EllipseProps {
  size?: { x: number; y: number };
  fills?: Fill[];
  opacity?: number;
  visible?: boolean;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface ComponentProps extends FrameProps {
  componentProperties?: ComponentProperty[];
}

export interface ComponentSetProps {
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  opacity?: number;
  visible?: boolean;
  children?: DslNode[];
  variantAxes?: Record<string, string[]>;
  autoLayout?: AutoLayoutConfig;
}

export interface LineProps {
  size?: { x: number };
  strokes?: StrokePaint[];
  rotation?: number;
  opacity?: number;
  visible?: boolean;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface SectionProps {
  size?: { x: number; y: number };
  fills?: Fill[];
  children?: DslNode[];
  contentsHidden?: boolean;
  visible?: boolean;
}

export interface PolygonProps {
  pointCount: number;
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  cornerRadius?: number;
  rotation?: number;
  opacity?: number;
  visible?: boolean;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface StarProps {
  pointCount: number;
  innerRadius?: number; // 0–1, default 0.382
  size?: { x: number; y: number };
  fills?: Fill[];
  strokes?: StrokePaint[];
  rotation?: number;
  opacity?: number;
  visible?: boolean;
  layoutGrow?: number;
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface BooleanOperationProps {
  children: DslNode[];
  fills?: Fill[];
  strokes?: StrokePaint[];
  opacity?: number;
  visible?: boolean;
}

export interface ColorTokenMap {
  readonly _tokens: Record<string, RgbaColor>;
}
