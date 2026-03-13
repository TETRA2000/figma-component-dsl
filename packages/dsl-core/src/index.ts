// @figma-dsl/core — DSL node primitives and factory functions

// Types
export type {
  NodeType,
  RgbaColor,
  SolidFill,
  GradientStop,
  GradientFill,
  Fill,
  StrokePaint,
  AutoLayoutConfig,
  SizingMode,
  TextStyle,
  ComponentPropertyType,
  ComponentProperty,
  CornerRadii,
  DslNode,
  FrameProps,
  RectangleProps,
  EllipseProps,
  ComponentProps,
  ComponentSetProps,
  InstanceProps,
} from './types.js';

// Node factories
export { frame, text, rectangle, ellipse, group } from './nodes.js';

// Color helpers
export { hex, solid, gradient, stroke, defineTokens, token } from './colors.js';
export type { ColorTokenMap } from './colors.js';

// Layout helpers
export { horizontal, vertical } from './layout.js';

// Component factories
export { component, componentSet, instance } from './components.js';
