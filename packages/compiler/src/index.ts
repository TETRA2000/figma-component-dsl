// @figma-dsl/compiler — Layout resolution and node compilation

export { compile, compileToJson } from './compiler.js';
export { TextMeasurer } from './text-measurer.js';
export type { TextMeasurement } from './text-measurer.js';
export { resolveLayout } from './layout-resolver.js';
export type { ResolvedNode } from './layout-resolver.js';
export { expandTextData } from './text-expander.js';
export type {
  FigmaNodeDict,
  FigmaPaint,
  CompileResult,
  CompileError,
  Baseline,
  FontMeta,
  Transform,
} from './types.js';
