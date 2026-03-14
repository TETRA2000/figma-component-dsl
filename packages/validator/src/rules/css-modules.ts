import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const cssModulesRule: ValidationRule = {
  id: 'css-modules',
  severity: 'error',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { tsxContent, tsxPath, componentName } = context;

    if (!tsxContent || !tsxPath) {
      return errors;
    }

    const cssModuleImport = /import\s+\w+\s+from\s+['"]\.\/\w+\.module\.css['"]/;
    if (!cssModuleImport.test(tsxContent)) {
      errors.push({
        rule: 'css-modules',
        message: `Component "${componentName}" does not import a CSS Module (.module.css)`,
        filePath: tsxPath,
        severity: 'error',
      });
    }

    return errors;
  },
};
