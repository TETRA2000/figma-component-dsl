export { compile } from "./compiler.js";
export { ComponentRegistry, resolveInstance } from "./component-registry.js";

export type {
  CompileError,
  CompileResult,
  CompiledNode,
  Guid,
  ResolvedFill,
  ResolvedStroke,
  ResolvedTextStyle,
  Transform,
} from "./types.js";

export { measureText, resolveLineHeight, resolveLetterSpacing, FONTS_DIR } from "./text-measurer.js";
export type { TextMeasurement } from "./text-measurer.js";

export { computeLayout } from "./yoga-mapper.js";
export type { LayoutResult, LayoutData } from "./yoga-mapper.js";
