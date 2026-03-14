export { threeFileRule } from './three-file.js';
export { barrelExportRule } from './barrel-export.js';
export { cssModulesRule } from './css-modules.js';
export { noInlineStyleRule } from './no-inline-style.js';
export { designTokensRule } from './design-tokens.js';
export { tokenExistsRule } from './token-exists.js';
export { classnamePropRule } from './classname-prop.js';
export { variantUnionRule } from './variant-union.js';
export { htmlAttrsRule } from './html-attrs.js';
export { dslCompatibleLayoutRule } from './dsl-compatible-layout.js';

import type { ValidationRule } from '../types.js';
import { threeFileRule } from './three-file.js';
import { barrelExportRule } from './barrel-export.js';
import { cssModulesRule } from './css-modules.js';
import { noInlineStyleRule } from './no-inline-style.js';
import { designTokensRule } from './design-tokens.js';
import { tokenExistsRule } from './token-exists.js';
import { classnamePropRule } from './classname-prop.js';
import { variantUnionRule } from './variant-union.js';
import { htmlAttrsRule } from './html-attrs.js';
import { dslCompatibleLayoutRule } from './dsl-compatible-layout.js';

export const allRules: ValidationRule[] = [
  threeFileRule,
  barrelExportRule,
  cssModulesRule,
  noInlineStyleRule,
  designTokensRule,
  tokenExistsRule,
  classnamePropRule,
  variantUnionRule,
  htmlAttrsRule,
  dslCompatibleLayoutRule,
];
