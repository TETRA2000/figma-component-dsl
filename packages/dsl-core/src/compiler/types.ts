import type { GradientStop, RgbaColor, SizingMode } from "../nodes/types.js";

// --- Resolved types (post-compilation) ---

export interface ResolvedFill {
  readonly type: "SOLID" | "GRADIENT_LINEAR";
  readonly color?: RgbaColor;
  readonly gradientStops?: readonly GradientStop[];
  readonly gradientTransform?: readonly [
    readonly [number, number, number],
    readonly [number, number, number],
  ];
  readonly opacity: number;
}

export interface ResolvedStroke {
  readonly color: RgbaColor;
  readonly weight: number;
  readonly align: "INSIDE" | "CENTER" | "OUTSIDE";
}

export interface ResolvedTextStyle {
  readonly fontFamily: string;
  readonly fontWeight: number;
  readonly fontSize: number;
  readonly lineHeight: number; // resolved to pixels
  readonly letterSpacing: number; // resolved to pixels
  readonly textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT";
  readonly color: RgbaColor;
}

// --- Compiled Node (renderer-ready format) ---

export type Guid = readonly [number, number]; // [sessionID, localID]

export type Transform = readonly [
  readonly [number, number, number],
  readonly [number, number, number],
  readonly [number, number, number],
];

export interface CompiledNode {
  readonly guid: Guid;
  readonly type: string;
  readonly name: string;
  readonly size: { readonly x: number; readonly y: number };
  readonly position: { readonly x: number; readonly y: number };
  readonly transform: Transform;
  readonly fills: readonly ResolvedFill[];
  readonly strokes?: readonly ResolvedStroke[];
  readonly cornerRadius?: number;
  readonly cornerRadii?: {
    readonly topLeft: number;
    readonly topRight: number;
    readonly bottomLeft: number;
    readonly bottomRight: number;
  };
  readonly opacity: number;
  readonly visible: boolean;
  readonly clipContent?: boolean;
  readonly children: readonly CompiledNode[];
  readonly parentIndex?: {
    readonly guid: Guid;
    readonly position: string;
  };

  // Auto-layout passthrough (for Figma plugin consumption)
  readonly stackMode?: "HORIZONTAL" | "VERTICAL";
  readonly itemSpacing?: number;
  readonly paddingTop?: number;
  readonly paddingRight?: number;
  readonly paddingBottom?: number;
  readonly paddingLeft?: number;
  readonly primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  readonly counterAxisAlignItems?: "MIN" | "CENTER" | "MAX";
  readonly layoutSizingHorizontal?: SizingMode;
  readonly layoutSizingVertical?: SizingMode;

  // Text
  readonly characters?: string;
  readonly textStyle?: ResolvedTextStyle;
  readonly textLines?: readonly string[];

  // Component
  readonly componentProperties?: Readonly<
    Record<string, { readonly type: string; readonly defaultValue: string | boolean }>
  >;

  // Instance
  readonly componentId?: string;
  readonly overriddenProperties?: Readonly<Record<string, string | boolean>>;
}

// --- Compile Result ---

export interface CompileError {
  readonly message: string;
  readonly nodePath: string;
  readonly nodeType: string;
}

export interface CompileResult {
  readonly root: CompiledNode;
  readonly nodeCount: number;
  readonly errors: readonly CompileError[];
}
