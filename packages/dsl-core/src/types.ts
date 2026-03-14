// Shared DSL Type Hierarchy
// DSL code targets these types. Both VirtualNode and Figma Plugin API
// types satisfy them via TypeScript structural typing.

export type DslNodeType = 'FRAME' | 'TEXT' | 'RECTANGLE' | 'ELLIPSE' | 'GROUP'
  | 'COMPONENT' | 'COMPONENT_SET' | 'INSTANCE';

// --- Paint Types (match Figma Plugin API paint format) ---
export interface DslSolidPaint {
  type: 'SOLID';
  color: { r: number; g: number; b: number };
  opacity?: number;
  visible?: boolean;
}

export interface DslGradientPaint {
  type: 'GRADIENT_LINEAR';
  gradientStops: Array<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
  gradientTransform: [[number, number, number], [number, number, number]];
  opacity?: number;
  visible?: boolean;
}

export type DslPaint = DslSolidPaint | DslGradientPaint;

// --- Line Height / Letter Spacing ---
export type DslLineHeight =
  | { value: number; unit: 'PERCENT' | 'PIXELS' }
  | { unit: 'AUTO' };

export type DslLetterSpacing = { value: number; unit: 'PERCENT' | 'PIXELS' };

// --- Component Property Types ---
export type DslComponentPropertyType = 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP';

export interface DslComponentProperty {
  type: DslComponentPropertyType;
  defaultValue: string | boolean;
}

// --- Node Interfaces ---
export interface DslSceneNode {
  readonly type: DslNodeType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  fills: DslPaint[];
  strokes: DslPaint[];
  strokeWeight: number;
  cornerRadius: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  clipContent: boolean;
  readonly children: readonly DslSceneNode[];
  appendChild(child: DslSceneNode): void;
  resize(width: number, height: number): void;
}

export interface DslFrameNode extends DslSceneNode {
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  itemSpacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX';
  layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical: 'FIXED' | 'HUG' | 'FILL';
}

export interface DslTextNode extends DslSceneNode {
  characters: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: DslLineHeight;
  letterSpacing: DslLetterSpacing;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT';
  fontStyle?: 'Normal' | 'Italic';
}

export interface DslRectangleNode extends DslSceneNode {
  cornerRadius: number;
}

export interface DslEllipseNode extends DslSceneNode {}

export interface DslGroupNode extends DslSceneNode {}

export interface DslComponentNode extends DslFrameNode {
  readonly componentProperties: Record<string, DslComponentProperty>;
  addComponentProperty(name: string, type: DslComponentPropertyType, defaultValue: string | boolean): void;
  createInstance(): DslInstanceNode;
}

export interface DslComponentSetNode extends DslFrameNode {}

export interface DslInstanceNode extends DslFrameNode {
  readonly mainComponent: DslComponentNode;
  setProperties(overrides: Record<string, string | boolean>): void;
}

// --- FigmaApi Interface ---
export interface DslFigmaApi {
  createFrame(): DslFrameNode;
  createText(): Promise<DslTextNode>;
  createRectangle(): DslRectangleNode;
  createEllipse(): DslEllipseNode;
  createComponent(): DslComponentNode;
  createGroup(children: DslSceneNode[], parent: DslSceneNode): DslGroupNode;
  combineAsVariants(components: DslComponentNode[], parent: DslSceneNode): DslComponentSetNode;
}

// --- Auto-Layout Options ---
export interface AutoLayoutOptions {
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

// --- Color Token System ---
export type ColorTokenMap = Record<string, string>;
