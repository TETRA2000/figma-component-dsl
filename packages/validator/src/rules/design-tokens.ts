import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

const HARDCODED_COLOR_PATTERN = /(?<!var\()#[0-9a-fA-F]{3,8}\b/;

export const designTokensRule: ValidationRule = {
  id: 'design-tokens',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { cssContent, cssPath } = context;

    if (!cssContent || !cssPath) {
      return errors;
    }

    const hasVarReferences = /var\(--/.test(cssContent);
    if (!hasVarReferences) {
      errors.push({
        rule: 'design-tokens',
        message: 'CSS file does not reference any design tokens via var(--*). Use tokens from tokens.css.',
        filePath: cssPath,
        severity: 'warning',
      });
      return errors;
    }

    const lines = cssContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      // Skip comments
      if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
        continue;
      }
      // Check for hardcoded colors (not inside var())
      if (HARDCODED_COLOR_PATTERN.test(line) && !line.includes('var(')) {
        errors.push({
          rule: 'design-tokens',
          message: `Hardcoded color value found. Consider using a design token from tokens.css.`,
          filePath: cssPath,
          line: i + 1,
          severity: 'warning',
        });
      }
    }

    return errors;
  },
};
