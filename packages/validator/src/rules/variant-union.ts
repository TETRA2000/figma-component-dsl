import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const variantUnionRule: ValidationRule = {
  id: 'variant-union',
  severity: 'error',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { tsxContent, tsxPath, componentName } = context;

    if (!tsxContent || !tsxPath) {
      return errors;
    }

    const lines = tsxContent.split('\n');

    // Check for variant/size props typed as bare `string`
    const bareStringPattern = /\b(variant|size)\??:\s*string\b/;

    for (let i = 0; i < lines.length; i++) {
      if (bareStringPattern.test(lines[i])) {
        const match = lines[i].match(bareStringPattern);
        const propName = match ? match[1] : 'variant/size';
        errors.push({
          rule: 'variant-union',
          message: `Prop "${propName}" in "${componentName}" is typed as plain string. Use a string literal union type (e.g., 'primary' | 'secondary') instead.`,
          filePath: tsxPath,
          line: i + 1,
          severity: 'error',
        });
      }
    }

    // Check that variant/size props use string literal unions
    const literalUnionPattern = /\b(variant|size)\??:\s*['"][^'"]+['"]\s*(\|\s*['"][^'"]+['"]\s*)*/;
    const hasVariantOrSize = /\b(variant|size)\??:/.test(tsxContent);

    if (hasVariantOrSize && !literalUnionPattern.test(tsxContent) && errors.length === 0) {
      errors.push({
        rule: 'variant-union',
        message: `Component "${componentName}" has variant/size props but they do not use string literal union types.`,
        filePath: tsxPath,
        severity: 'error',
      });
    }

    return errors;
  },
};
