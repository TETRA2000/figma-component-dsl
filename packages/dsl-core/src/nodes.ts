import type {
  DslNode, FrameProps, RectangleProps, EllipseProps,
  ComponentProps, ComponentSetProps, TextStyle, ChildLayoutProps,
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
  };
}

export function text(
  characters: string,
  style?: TextStyle & ChildLayoutProps,
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
    color: style.color,
  } : undefined;

  // Auto-convert color shorthand to fill
  const fills = style?.color
    ? [{ type: 'SOLID' as const, color: parseHex(style.color), opacity: 1, visible: true }]
    : undefined;

  return {
    type: 'TEXT',
    name: characters,
    characters,
    textStyle,
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
