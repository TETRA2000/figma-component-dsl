import type {
  DslNode,
  FrameProps,
  RectangleProps,
  EllipseProps,
  TextStyle,
} from './types.js';

function validateName(name: string): void {
  if (!name) {
    throw new Error('Node name must be a non-empty string');
  }
}

function validateSize(size: { readonly x: number; readonly y: number } | undefined): void {
  if (size && (size.x <= 0 || size.y <= 0)) {
    throw new Error('Node size values must be positive');
  }
}

function freeze<T extends object>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

export function frame(name: string, props: FrameProps): DslNode {
  validateName(name);
  validateSize(props.size);
  return freeze({
    type: 'FRAME' as const,
    name,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    cornerRadii: props.cornerRadii,
    opacity: props.opacity ?? 1,
    visible: props.visible ?? true,
    clipContent: props.clipContent,
    children: Object.freeze([...(props.children ?? [])]),
    autoLayout: props.autoLayout,
    layoutGrow: props.layoutGrow,
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  });
}

export function text(
  characters: string,
  style?: TextStyle,
  name?: string,
): DslNode {
  if (!characters) {
    throw new Error('Text characters must be a non-empty string');
  }
  return freeze({
    type: 'TEXT' as const,
    name: name ?? characters,
    characters,
    textStyle: style,
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
  });
}

export function rectangle(name: string, props: RectangleProps): DslNode {
  validateName(name);
  validateSize(props.size);
  return freeze({
    type: 'RECTANGLE' as const,
    name,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    strokes: props.strokes ? [...props.strokes] : undefined,
    cornerRadius: props.cornerRadius,
    cornerRadii: props.cornerRadii,
    opacity: props.opacity ?? 1,
    visible: props.visible ?? true,
    children: Object.freeze([]),
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  });
}

export function ellipse(name: string, props: EllipseProps): DslNode {
  validateName(name);
  validateSize(props.size);
  return freeze({
    type: 'ELLIPSE' as const,
    name,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    opacity: props.opacity ?? 1,
    visible: props.visible ?? true,
    children: Object.freeze([]),
    layoutSizingHorizontal: props.layoutSizingHorizontal,
    layoutSizingVertical: props.layoutSizingVertical,
  });
}

export function group(name: string, children: readonly DslNode[]): DslNode {
  validateName(name);
  return freeze({
    type: 'GROUP' as const,
    name,
    opacity: 1,
    visible: true,
    children: Object.freeze([...children]),
  });
}
