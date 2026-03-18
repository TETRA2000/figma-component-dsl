import type {
  DslNode, FrameProps, RectangleProps, EllipseProps,
  ComponentProps, ComponentSetProps, TextStyle, ChildLayoutProps,
  ImageProps, SvgProps,
  LineProps, SectionProps, PolygonProps, StarProps, BooleanOperationProps,
  BooleanOperationType,
} from './types.js';
import { hex as parseHex } from './colors.js';

function validateName(name: string): void {
  if (!name) {
    throw new Error('Node name must be a non-empty string.');
  }
}

export function frame(name: string, props: FrameProps): DslNode {
  validateName(name);
  return {
    type: 'FRAME',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    cornerRadii: props.cornerRadii,
    clipContent: props.clipContent,
    children: props.children ? [...props.children] : undefined,
    autoLayout: props.autoLayout,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
    effects: props.effects ? [...props.effects] : undefined,
    blendMode: props.blendMode,
    rotation: props.rotation,
  };
}

export function text(
  characters: string,
  style?: TextStyle & ChildLayoutProps & { size?: { x: number; y?: number } },
): DslNode {
  if (!characters) {
    throw new Error('Text characters must be a non-empty string.');
  }
  const textStyle: TextStyle | undefined = style ? {
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textAlignHorizontal: style.textAlignHorizontal,
    textAutoResize: style.textAutoResize,
    textDecoration: style.textDecoration,
    color: style.color,
    textTransform: style.textTransform,
    textStroke: style.textStroke,
    textShadow: style.textShadow,
  } : undefined;

  // Auto-convert color shorthand to fill
  const fills = style?.color
    ? (() => {
        const parsed = parseHex(style.color!);
        return [{ type: 'SOLID' as const, color: { ...parsed, a: 1 }, opacity: parsed.a, visible: true }];
      })()
    : undefined;

  // Text node size — if width specified, pass it through for constrained text
  const size = style?.size
    ? { x: style.size.x, y: style.size.y ?? 0 }
    : undefined;

  return {
    type: 'TEXT',
    name: characters,
    characters,
    textStyle,
    textAutoResize: style?.textAutoResize,
    size,
    fills,
    visible: true,
    opacity: 1,
    layoutGrow: style?.layoutGrow,
    layoutSizingHorizontal: style?.layoutSizingHorizontal,
    layoutSizingVertical: style?.layoutSizingVertical,
  };
}

export function rectangle(name: string, props: RectangleProps): DslNode {
  validateName(name);
  return {
    type: 'RECTANGLE',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    cornerRadii: props.cornerRadii,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
    effects: props.effects ? [...props.effects] : undefined,
    blendMode: props.blendMode,
    rotation: props.rotation,
  };
}

export function ellipse(name: string, props: EllipseProps): DslNode {
  validateName(name);
  return {
    type: 'ELLIPSE',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
    effects: props.effects ? [...props.effects] : undefined,
    blendMode: props.blendMode,
    rotation: props.rotation,
  };
}

export function group(name: string, children: DslNode[]): DslNode {
  validateName(name);
  return {
    type: 'GROUP',
    name,
    visible: true,
    opacity: 1,
    children: [...children],
  };
}

export function component(name: string, props: ComponentProps): DslNode {
  validateName(name);
  return {
    type: 'COMPONENT',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    cornerRadii: props.cornerRadii,
    clipContent: props.clipContent,
    children: props.children ? [...props.children] : undefined,
    autoLayout: props.autoLayout,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
    componentProperties: props.componentProperties ? [...props.componentProperties] : undefined,
  };
}

export function componentSet(name: string, props: ComponentSetProps): DslNode {
  validateName(name);
  return {
    type: 'COMPONENT_SET',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    children: props.children ? [...props.children] : undefined,
    variantAxes: props.variantAxes,
    autoLayout: props.autoLayout,
  };
}

export function image(name: string, props: ImageProps): DslNode {
  validateName(name);
  if (!props.src) {
    throw new Error('Image src must be a non-empty string.');
  }
  return {
    type: 'IMAGE',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    cornerRadius: props.cornerRadius,
    imageSrc: props.src,
    imageScaleMode: props.fit ?? 'FILL',
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  };
}

export function svg(name: string, props: SvgProps): DslNode {
  validateName(name);
  if (!props.svgContent && !props.src) {
    throw new Error('SVG node must have svgContent or src.');
  }
  return {
    type: 'SVG',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    cornerRadius: props.cornerRadius,
    clipContent: props.clipContent,
    svgContent: props.svgContent,
    svgSrc: props.src,
    svgScaleMode: props.fit ?? 'FIT',
    rotation: props.rotation,
    effects: props.effects ? [...props.effects] : undefined,
    blendMode: props.blendMode,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  };
}

export function instance(
  componentRef: string,
  overrides?: Record<string, string | boolean>,
): DslNode {
  if (!componentRef) {
    throw new Error('Instance componentRef must be a non-empty string.');
  }
  return {
    type: 'INSTANCE',
    name: componentRef,
    componentRef,
    propertyOverrides: overrides,
    visible: true,
    opacity: 1,
  };
}

export function line(name: string, props: LineProps = {}): DslNode {
  validateName(name);
  const defaultStroke = { color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 };
  return {
    type: 'LINE',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: { x: props.size?.x ?? 0, y: 0 },
    strokes: props.strokes ? [...props.strokes] : [defaultStroke],
    rotation: props.rotation,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  };
}

export function section(name: string, props: SectionProps = {}): DslNode {
  validateName(name);
  return {
    type: 'SECTION',
    name,
    visible: props.visible ?? true,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    children: props.children ? [...props.children] : undefined,
    contentsHidden: props.contentsHidden,
  };
}

function validatePointCount(pointCount: number): void {
  if (!Number.isInteger(pointCount) || pointCount < 3) {
    throw new Error('pointCount must be an integer >= 3.');
  }
}

export function polygon(name: string, props: PolygonProps): DslNode {
  validateName(name);
  validatePointCount(props.pointCount);
  return {
    type: 'POLYGON',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    rotation: props.rotation,
    pointCount: props.pointCount,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  };
}

export function star(name: string, props: StarProps): DslNode {
  validateName(name);
  validatePointCount(props.pointCount);
  return {
    type: 'STAR',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    rotation: props.rotation,
    pointCount: props.pointCount,
    innerRadius: props.innerRadius ?? 0.382,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  };
}

function createBooleanOp(
  name: string,
  operation: BooleanOperationType,
  props: BooleanOperationProps,
): DslNode {
  validateName(name);
  if (!props.children || props.children.length < 2) {
    throw new Error('Boolean operations require at least 2 children.');
  }
  return {
    type: 'BOOLEAN_OPERATION',
    name,
    visible: props.visible ?? true,
    opacity: props.opacity ?? 1,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    children: [...props.children],
    booleanOperation: operation,
  };
}

export function union(name: string, props: BooleanOperationProps): DslNode {
  return createBooleanOp(name, 'UNION', props);
}

export function subtract(name: string, props: BooleanOperationProps): DslNode {
  return createBooleanOp(name, 'SUBTRACT', props);
}

export function intersect(name: string, props: BooleanOperationProps): DslNode {
  return createBooleanOp(name, 'INTERSECT', props);
}

export function exclude(name: string, props: BooleanOperationProps): DslNode {
  return createBooleanOp(name, 'EXCLUDE', props);
}
