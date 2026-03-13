import type { DslNode, ComponentProps, ComponentSetProps, InstanceProps } from './types.js';

export function component(name: string, props: ComponentProps): DslNode {
  if (!name) {
    throw new Error('Component name must be a non-empty string');
  }
  return Object.freeze({
    type: 'COMPONENT' as const,
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
    componentProperties: props.componentProperties
      ? Object.freeze([...props.componentProperties])
      : undefined,
  });
}

export function componentSet(name: string, props: ComponentSetProps): DslNode {
  if (!name) {
    throw new Error('ComponentSet name must be a non-empty string');
  }
  return Object.freeze({
    type: 'COMPONENT_SET' as const,
    name,
    size: props.size,
    fills: props.fills ? [...props.fills] : undefined,
    opacity: 1,
    visible: props.visible ?? true,
    children: Object.freeze([...(props.children ?? [])]),
    variantAxes: props.variantAxes,
  });
}

export function instance(
  componentRef: string,
  overrides?: Readonly<Record<string, string | boolean>>,
): DslNode {
  if (!componentRef) {
    throw new Error('Instance componentRef must be a non-empty string');
  }
  return Object.freeze({
    type: 'INSTANCE' as const,
    name: componentRef,
    componentRef,
    propertyOverrides: overrides ? Object.freeze({ ...overrides }) : undefined,
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
  });
}
