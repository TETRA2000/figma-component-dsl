import type {
  AutoLayoutConfig,
  ComponentProperty,
  DslNode,
  Fill,
  SizingMode,
  StrokePaint,
  TextStyle,
} from "./types.js";

// --- Props types for factory functions ---

export interface FrameProps {
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
  readonly autoLayout?: AutoLayoutConfig;
  readonly layoutGrow?: number;
  readonly layoutSizingHorizontal?: SizingMode;
  readonly layoutSizingVertical?: SizingMode;
}

export interface RectangleProps {
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
  readonly layoutGrow?: number;
  readonly layoutSizingHorizontal?: SizingMode;
  readonly layoutSizingVertical?: SizingMode;
}

export interface EllipseProps {
  readonly size?: { readonly x: number; readonly y: number };
  readonly fills?: readonly Fill[];
  readonly strokes?: readonly StrokePaint[];
  readonly opacity?: number;
  readonly visible?: boolean;
  readonly layoutGrow?: number;
  readonly layoutSizingHorizontal?: SizingMode;
  readonly layoutSizingVertical?: SizingMode;
}

export interface ComponentProps extends FrameProps {
  readonly componentProperties?: readonly ComponentProperty[];
}

export interface ComponentSetProps {
  readonly size?: { readonly x: number; readonly y: number };
  readonly fills?: readonly Fill[];
  readonly strokes?: readonly StrokePaint[];
  readonly cornerRadius?: number;
  readonly opacity?: number;
  readonly visible?: boolean;
  readonly children?: readonly DslNode[];
  readonly variantAxes?: Readonly<Record<string, readonly string[]>>;
  readonly autoLayout?: AutoLayoutConfig;
}

// --- Validation helpers ---

function assertNonEmptyName(name: string): void {
  if (name.length === 0) {
    throw new Error("Node name must be a non-empty string");
  }
}

function assertPositiveSize(
  size: { readonly x: number; readonly y: number } | undefined,
): void {
  if (size !== undefined) {
    if (size.x <= 0 || size.y <= 0) {
      throw new Error(
        `Size values must be positive, got x=${String(size.x)}, y=${String(size.y)}`,
      );
    }
  }
}

function copyChildren(
  children: readonly DslNode[] | undefined,
): readonly DslNode[] | undefined {
  if (children === undefined) return undefined;
  return [...children];
}

function copyFills(
  fills: readonly Fill[] | undefined,
): readonly Fill[] | undefined {
  if (fills === undefined) return undefined;
  return [...fills];
}

function copyStrokes(
  strokes: readonly StrokePaint[] | undefined,
): readonly StrokePaint[] | undefined {
  if (strokes === undefined) return undefined;
  return [...strokes];
}

// --- Factory Functions ---

export function frame(name: string, props: FrameProps = {}): DslNode {
  assertNonEmptyName(name);
  assertPositiveSize(props.size);
  return {
    type: "FRAME",
    name,
    ...(props.size !== undefined && { size: props.size }),
    ...(props.fills !== undefined && { fills: copyFills(props.fills) }),
    ...(props.strokes !== undefined && {
      strokes: copyStrokes(props.strokes),
    }),
    ...(props.cornerRadius !== undefined && {
      cornerRadius: props.cornerRadius,
    }),
    ...(props.cornerRadii !== undefined && {
      cornerRadii: props.cornerRadii,
    }),
    ...(props.opacity !== undefined && { opacity: props.opacity }),
    ...(props.visible !== undefined && { visible: props.visible }),
    ...(props.clipContent !== undefined && {
      clipContent: props.clipContent,
    }),
    ...(props.children !== undefined && {
      children: copyChildren(props.children),
    }),
    ...(props.autoLayout !== undefined && {
      autoLayout: props.autoLayout,
    }),
    ...(props.layoutGrow !== undefined && {
      layoutGrow: props.layoutGrow,
    }),
    ...(props.layoutSizingHorizontal !== undefined && {
      layoutSizingHorizontal: props.layoutSizingHorizontal,
    }),
    ...(props.layoutSizingVertical !== undefined && {
      layoutSizingVertical: props.layoutSizingVertical,
    }),
  };
}

export function text(characters: string, style?: TextStyle): DslNode {
  if (characters.length === 0) {
    throw new Error("Text node must have non-empty characters");
  }
  return {
    type: "TEXT",
    name: characters.length > 30 ? characters.slice(0, 30) + "…" : characters,
    characters,
    ...(style !== undefined && { textStyle: style }),
  };
}

export function rectangle(
  name: string,
  props: RectangleProps = {},
): DslNode {
  assertNonEmptyName(name);
  assertPositiveSize(props.size);
  return {
    type: "RECTANGLE",
    name,
    ...(props.size !== undefined && { size: props.size }),
    ...(props.fills !== undefined && { fills: copyFills(props.fills) }),
    ...(props.strokes !== undefined && {
      strokes: copyStrokes(props.strokes),
    }),
    ...(props.cornerRadius !== undefined && {
      cornerRadius: props.cornerRadius,
    }),
    ...(props.cornerRadii !== undefined && {
      cornerRadii: props.cornerRadii,
    }),
    ...(props.opacity !== undefined && { opacity: props.opacity }),
    ...(props.visible !== undefined && { visible: props.visible }),
    ...(props.layoutGrow !== undefined && {
      layoutGrow: props.layoutGrow,
    }),
    ...(props.layoutSizingHorizontal !== undefined && {
      layoutSizingHorizontal: props.layoutSizingHorizontal,
    }),
    ...(props.layoutSizingVertical !== undefined && {
      layoutSizingVertical: props.layoutSizingVertical,
    }),
  };
}

export function ellipse(name: string, props: EllipseProps = {}): DslNode {
  assertNonEmptyName(name);
  assertPositiveSize(props.size);
  return {
    type: "ELLIPSE",
    name,
    ...(props.size !== undefined && { size: props.size }),
    ...(props.fills !== undefined && { fills: copyFills(props.fills) }),
    ...(props.strokes !== undefined && {
      strokes: copyStrokes(props.strokes),
    }),
    ...(props.opacity !== undefined && { opacity: props.opacity }),
    ...(props.visible !== undefined && { visible: props.visible }),
    ...(props.layoutGrow !== undefined && {
      layoutGrow: props.layoutGrow,
    }),
    ...(props.layoutSizingHorizontal !== undefined && {
      layoutSizingHorizontal: props.layoutSizingHorizontal,
    }),
    ...(props.layoutSizingVertical !== undefined && {
      layoutSizingVertical: props.layoutSizingVertical,
    }),
  };
}

export function group(name: string, children: readonly DslNode[]): DslNode {
  assertNonEmptyName(name);
  return {
    type: "GROUP",
    name,
    children: copyChildren(children),
  };
}

export function component(
  name: string,
  props: ComponentProps = {},
): DslNode {
  assertNonEmptyName(name);
  assertPositiveSize(props.size);
  return {
    type: "COMPONENT",
    name,
    ...(props.size !== undefined && { size: props.size }),
    ...(props.fills !== undefined && { fills: copyFills(props.fills) }),
    ...(props.strokes !== undefined && {
      strokes: copyStrokes(props.strokes),
    }),
    ...(props.cornerRadius !== undefined && {
      cornerRadius: props.cornerRadius,
    }),
    ...(props.cornerRadii !== undefined && {
      cornerRadii: props.cornerRadii,
    }),
    ...(props.opacity !== undefined && { opacity: props.opacity }),
    ...(props.visible !== undefined && { visible: props.visible }),
    ...(props.clipContent !== undefined && {
      clipContent: props.clipContent,
    }),
    ...(props.children !== undefined && {
      children: copyChildren(props.children),
    }),
    ...(props.autoLayout !== undefined && {
      autoLayout: props.autoLayout,
    }),
    ...(props.layoutGrow !== undefined && {
      layoutGrow: props.layoutGrow,
    }),
    ...(props.layoutSizingHorizontal !== undefined && {
      layoutSizingHorizontal: props.layoutSizingHorizontal,
    }),
    ...(props.layoutSizingVertical !== undefined && {
      layoutSizingVertical: props.layoutSizingVertical,
    }),
    ...(props.componentProperties !== undefined && {
      componentProperties: [...props.componentProperties],
    }),
  };
}

export function componentSet(
  name: string,
  props: ComponentSetProps = {},
): DslNode {
  assertNonEmptyName(name);
  assertPositiveSize(props.size);
  // Validate variant children naming
  if (props.children !== undefined) {
    for (const child of props.children) {
      if (child.type !== "COMPONENT") {
        throw new Error(
          `COMPONENT_SET children must be COMPONENT nodes, got ${child.type}`,
        );
      }
    }
  }
  return {
    type: "COMPONENT_SET",
    name,
    ...(props.size !== undefined && { size: props.size }),
    ...(props.fills !== undefined && { fills: copyFills(props.fills) }),
    ...(props.strokes !== undefined && {
      strokes: copyStrokes(props.strokes),
    }),
    ...(props.cornerRadius !== undefined && {
      cornerRadius: props.cornerRadius,
    }),
    ...(props.opacity !== undefined && { opacity: props.opacity }),
    ...(props.visible !== undefined && { visible: props.visible }),
    ...(props.children !== undefined && {
      children: copyChildren(props.children),
    }),
    ...(props.variantAxes !== undefined && {
      variantAxes: props.variantAxes,
    }),
    ...(props.autoLayout !== undefined && {
      autoLayout: props.autoLayout,
    }),
  };
}

export function instance(
  componentRef: string,
  overrides?: Readonly<Record<string, string | boolean>>,
): DslNode {
  if (componentRef.length === 0) {
    throw new Error("Instance componentRef must be a non-empty string");
  }
  return {
    type: "INSTANCE",
    name: componentRef,
    componentRef,
    ...(overrides !== undefined && {
      propertyOverrides: { ...overrides },
    }),
  };
}
