// DSL Core — Node primitives, color system, layout, typography, and components

// Node types and factory functions
export {
  component,
  componentSet,
  ellipse,
  frame,
  group,
  horizontal,
  instance,
  rectangle,
  text,
  vertical,
} from "./nodes/index.js";

export type {
  AutoLayoutConfig,
  ComponentProperty,
  ComponentPropertyType,
  ComponentProps,
  ComponentSetProps,
  DslNode,
  EllipseProps,
  Fill,
  FontWeight,
  FrameProps,
  GradientFill,
  GradientStop,
  LetterSpacing,
  LineHeight,
  NodeType,
  RectangleProps,
  RgbaColor,
  SizingMode,
  SolidFill,
  StrokePaint,
  TextStyle,
} from "./nodes/index.js";

// Color helpers
export {
  defineTokens,
  gradient,
  hex,
  solid,
  stroke,
  token,
} from "./colors/index.js";

export type { ColorTokenMap } from "./colors/index.js";

// Compiler
export { compile } from "./compiler/index.js";

export type {
  CompileError,
  CompileResult,
  CompiledNode,
  Guid,
  ResolvedFill,
  ResolvedStroke,
  ResolvedTextStyle,
  Transform,
} from "./compiler/index.js";
