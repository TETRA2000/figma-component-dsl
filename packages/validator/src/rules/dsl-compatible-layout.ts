import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const dslCompatibleLayoutRule: ValidationRule = {
  id: 'dsl-compatible-layout',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { cssContent, cssPath, componentName } = context;

    if (!cssContent || !cssPath) {
      return errors;
    }

    // Check if component CSS uses flexbox or grid patterns that map to DSL auto-layout
    const flexPattern = /display\s*:\s*flex/;
    const gridPattern = /display\s*:\s*grid/;

    if (!flexPattern.test(cssContent) && !gridPattern.test(cssContent)) {
      errors.push({
        rule: 'dsl-compatible-layout',
        message: `Component "${componentName}" CSS does not use flexbox or grid layout. DSL auto-layout maps to flex/grid; consider using display: flex or display: grid.`,
        filePath: cssPath,
        severity: 'warning',
      });
    }

    return errors;
  },
};
