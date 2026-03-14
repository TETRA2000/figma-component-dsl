export type DslNodeType =
  | 'FRAME'
  | 'TEXT'
  | 'RECTANGLE'
  | 'ELLIPSE'
  | 'GROUP'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE';

export interface DslSolidPaint {
  readonly type: 'SOLID';
  readonly color: { r: number; g: number; b: number };
  readonly opacity?: number;
  readonly visible?: boolean;
}

export interface DslGradientPaint {
  readonly type: 'GRADIENT_LINEAR';
  readonly gradientStops: ReadonlyArray<{
    color: { r: number; g: number; b: number; a: number };
    position: number;
  }>;
  readonly gradientTransform: [
    [number, number, number],
    [number, number, number],
  ];
  readonly opacity?: number;
  readonly visible?: boolean;
}

export type DslPaint = DslSolidPaint | DslGradientPaint;

export interface DslLineHeight {
  value: number;
  unit: 'PERCENT' | 'PIXELS';
}

export interface DslLineHeightAuto {
  unit: 'AUTO';
}

export interface DslLetterSpacing {
  value: number;
  unit: 'PERCENT' | 'PIXELS';
}

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
  clipContent: boolean;
  readonly children: readonly DslSceneNode[];
  appendChild(child: DslSceneNode): void;
  resize(width: number, height: number): void;
}

export type DslLayoutMode = 'NONE' | 'HORIZONTAL' | 'VERTICAL';
export type DslAxisAlign = 'MIN' | 'CENTER' | 'MAX';
export type DslPrimaryAxisAlign = 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
export type DslSizingMode = 'FIXED' | 'HUG' | 'FILL';

export interface DslFrameNode extends DslSceneNode {
  layoutMode: DslLayoutMode;
  itemSpacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  primaryAxisAlignItems: DslPrimaryAxisAlign;
  counterAxisAlignItems: DslAxisAlign;
  layoutSizingHorizontal: DslSizingMode;
  layoutSizingVertical: DslSizingMode;
  layoutGrow: number;
}

export interface DslTextNode extends DslSceneNode {
  characters: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: DslLineHeight | DslLineHeightAuto;
  letterSpacing: DslLetterSpacing;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT';
}

export interface DslRectangleNode extends DslSceneNode {
  cornerRadius: number;
}

export interface DslEllipseNode extends DslSceneNode {}

export interface DslGroupNode extends DslSceneNode {}

export type DslComponentPropertyType = 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP';

export interface DslComponentNode extends DslFrameNode {
  addComponentProperty(
    name: string,
    type: DslComponentPropertyType,
    defaultValue: string | boolean,
  ): void;
  createInstance(): DslInstanceNode;
}

export interface DslComponentSetNode extends DslFrameNode {}

export interface DslInstanceNode extends DslFrameNode {
  readonly mainComponent: DslComponentNode;
  setProperties(overrides: Record<string, string | boolean>): void;
}

export interface DslFigmaApi {
  createFrame(): DslFrameNode;
  createText(): Promise<DslTextNode>;
  createRectangle(): DslRectangleNode;
  createEllipse(): DslEllipseNode;
  createComponent(): DslComponentNode;
  createGroup(
    children: DslSceneNode[],
    parent: DslSceneNode,
  ): DslGroupNode;
  combineAsVariants(
    components: DslComponentNode[],
    parent: DslSceneNode,
  ): DslComponentSetNode;
}
