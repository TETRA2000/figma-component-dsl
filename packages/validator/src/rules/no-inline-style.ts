import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const noInlineStyleRule: ValidationRule = {
  id: 'no-inline-style',
  severity: 'error',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { tsxContent, tsxPath } = context;

    if (!tsxContent || !tsxPath) {
      return errors;
    }

    const lines = tsxContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (/style=\{\{/.test(lines[i]!)) {
        errors.push({
          rule: 'no-inline-style',
          message: 'Inline style attribute detected. Use CSS Modules instead.',
          filePath: tsxPath,
          line: i + 1,
          severity: 'error',
        });
      }
    }

    return errors;
  },
};
