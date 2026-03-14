import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const barrelExportRule: ValidationRule = {
  id: 'barrel-export',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { componentName, barrelContent, barrelPath } = context;

    if (!barrelContent || !barrelPath) {
      errors.push({
        rule: 'barrel-export',
        message: 'No barrel export file (index.ts) found in parent directory',
        filePath: context.componentDir,
        severity: 'warning',
      });
      return errors;
    }

    const exportPattern = new RegExp(
      `export\\s+\\{[^}]*\\b${componentName}\\b[^}]*\\}\\s+from`
    );

    if (!exportPattern.test(barrelContent)) {
      errors.push({
        rule: 'barrel-export',
        message: `Component "${componentName}" is not exported from ${barrelPath}`,
        filePath: barrelPath,
        severity: 'warning',
      });
    }

    return errors;
  },
};
