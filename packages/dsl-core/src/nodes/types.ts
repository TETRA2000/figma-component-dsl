// --- Node Types ---
export type NodeType =
  | "FRAME"
  | "TEXT"
  | "RECTANGLE"
  | "ELLIPSE"
  | "GROUP"
  | "COMPONENT"
  | "COMPONENT_SET"
  | "INSTANCE";

// --- Color & Fill ---
export interface RgbaColor {
  readonly r: number; // 0–1
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

export interface SolidFill {
  readonly type: "SOLID";
  readonly color: RgbaColor;
  readonly opacity: number;
  readonly visible: boolean;
}

export interface GradientStop {
  readonly color: RgbaColor;
  readonly position: number; // 0–1
}

export interface GradientFill {
  readonly type: "GRADIENT_LINEAR";
  readonly gradientStops: readonly GradientStop[];
  readonly gradientTransform: readonly [
    readonly [number, number, number],
    readonly [number, number, number],
  ];
  readonly opacity: number;
  readonly visible: boolean;
}

export type Fill = SolidFill | GradientFill;

export interface StrokePaint {
  readonly color: RgbaColor;
  readonly weight: number;
  readonly align?: "INSIDE" | "CENTER" | "OUTSIDE";
}

// --- Auto-Layout ---
export interface AutoLayoutConfig {
  readonly direction: "HORIZONTAL" | "VERTICAL";
  readonly spacing?: number;
  readonly padX?: number;
  readonly padY?: number;
  readonly padTop?: number;
  readonly padRight?: number;
  readonly padBottom?: number;
  readonly padLeft?: number;
  readonly align?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  readonly counterAlign?: "MIN" | "CENTER" | "MAX";
  readonly sizing?: SizingMode;
  readonly widthSizing?: SizingMode;
  readonly heightSizing?: SizingMode;
}

export type SizingMode = "FIXED" | "HUG" | "FILL";

// --- Typography ---
export type FontWeight = 400 | 500 | 600 | 700;

export interface LineHeight {
  readonly value: number;
  readonly unit: "PERCENT" | "PIXELS";
}

export interface LetterSpacing {
  readonly value: number;
  readonly unit: "PERCENT" | "PIXELS";
}

export interface TextStyle {
  readonly fontFamily?: string;
  readonly fontWeight?: FontWeight;
  readonly fontSize?: number;
  readonly lineHeight?: LineHeight;
  readonly letterSpacing?: LetterSpacing;
  readonly textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT";
  readonly color?: string; // hex string convenience shorthand
}

// --- Component Properties ---
export type ComponentPropertyType = "TEXT" | "BOOLEAN" | "INSTANCE_SWAP";

export interface ComponentProperty {
  readonly name: string;
  readonly type: ComponentPropertyType;
  readonly defaultValue: string | boolean;
  readonly preferredValues?: readonly string[];
}

// --- DSL Node (AST) ---
export interface DslNode {
  readonly type: NodeType;
  readonly name: string;
  readonly size?: { readonly x: number; readonly y: number };
  readonly fills?: readonly Fill[];
  readonly strokes?: readonly StrokePaint[];
  readonly cornerRadius?: number;
  readonly cornerRadii?: {
    readonly topLeft: number;
    readonly topRight: number;
    readonly bottomLeft: number;
    readonly bottomRight: number;
  };
  readonly opacity?: number;
  readonly visible?: boolean;
  readonly clipContent?: boolean;
  readonly children?: readonly DslNode[];

  // Auto-layout (FRAME, COMPONENT)
  readonly autoLayout?: AutoLayoutConfig;
  readonly layoutGrow?: number;
  readonly layoutSizingHorizontal?: SizingMode;
  readonly layoutSizingVertical?: SizingMode;

  // Text (TEXT only)
  readonly characters?: string;
  readonly textStyle?: TextStyle;

  // Component (COMPONENT only)
  readonly componentProperties?: readonly ComponentProperty[];

  // Component Set (COMPONENT_SET only)
  readonly variantAxes?: Readonly<Record<string, readonly string[]>>;

  // Instance (INSTANCE only)
  readonly componentRef?: string;
  readonly propertyOverrides?: Readonly<Record<string, string | boolean>>;
}
