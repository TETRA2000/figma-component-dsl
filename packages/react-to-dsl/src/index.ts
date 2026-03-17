/**
 * @figma-dsl/react-to-dsl
 *
 * Browser-based React-to-DSL converter.
 * Uses Playwright to extract computed styles from rendered DOM
 * and generates equivalent DSL code.
 */

export { extractDom, extractFromPage } from './extractor.js';
export { mapToDsl } from './mapper.js';
export { generateDslCode } from './codegen.js';
export { deriveName } from './naming.js';
export {
  cssColorToHex,
  cssColorToOpacity,
  parseLinearGradient,
  isTransparent,
} from './color-utils.js';

export type {
  DomSnapshot,
  ExtractedStyles,
  ExtractOptions,
  CodegenOptions,
  ConvertResult,
  ComparisonResult,
  ComparisonReport,
  BoundingRect,
} from './types.js';

// --- High-level API ---

import { extractDom } from './extractor.js';
import { mapToDsl } from './mapper.js';
import { generateDslCode } from './codegen.js';
import type { ExtractOptions, CodegenOptions, ConvertResult } from './types.js';

/**
 * Convert a React component at a URL to DSL code.
 * This is the main entry point for single-component conversion.
 */
export async function convert(
  extractOptions: ExtractOptions,
  codegenOptions: CodegenOptions = {},
): Promise<ConvertResult> {
  // 1. Extract DOM snapshot
  const snapshot = await extractDom(extractOptions);

  // 2. Map to DslNode tree
  const { node, warnings } = mapToDsl(snapshot, codegenOptions.componentName);

  // 3. Generate DSL source code
  const dslCode = generateDslCode(node, codegenOptions);

  // Count nodes
  let nodeCount = 0;
  function countNodes(n: { children?: unknown[] }): void {
    nodeCount++;
    if (n.children) {
      for (const child of n.children) {
        countNodes(child as { children?: unknown[] });
      }
    }
  }
  countNodes(node);

  return { dslCode, warnings, nodeCount };
}
