import { existsSync } from 'fs';
import { join } from 'path';
import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const threeFileRule: ValidationRule = {
  id: 'three-file',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { componentDir, componentName } = context;

    const expectedFiles = [
      { ext: '.tsx', desc: 'React component' },
      { ext: '.module.css', desc: 'CSS Module' },
      { ext: '.figma.tsx', desc: 'Code Connect binding' },
    ];

    for (const { ext, desc } of expectedFiles) {
      const filePath = join(componentDir, `${componentName}${ext}`);
      if (!existsSync(filePath)) {
        errors.push({
          rule: 'three-file',
          message: `Missing ${desc} file: ${componentName}${ext}`,
          filePath: componentDir,
          severity: 'warning',
        });
      }
    }

    return errors;
  },
};
