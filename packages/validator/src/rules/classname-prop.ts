import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const classnamePropRule: ValidationRule = {
  id: 'classname-prop',
  severity: 'error',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { tsxContent, tsxPath, componentName } = context;

    if (!tsxContent || !tsxPath) {
      return errors;
    }

    // Check if component accepts a className prop
    const classNamePropPattern = /className[\s?]*[:\s]/;
    const hasClassNameProp = classNamePropPattern.test(tsxContent);

    if (!hasClassNameProp) {
      errors.push({
        rule: 'classname-prop',
        message: `Component "${componentName}" does not accept a className prop. Components should support className for composition.`,
        filePath: tsxPath,
        severity: 'error',
      });
    }

    // Check for the filter+join composition pattern for combining classNames
    const filterJoinPattern = /\.filter\(Boolean\)\.join\(\s*['"][  ]['"]?\s*\)/;
    const clsxPattern = /\bclsx\b|\bcn\b|\bclassnames\b/;

    if (hasClassNameProp && !filterJoinPattern.test(tsxContent) && !clsxPattern.test(tsxContent)) {
      errors.push({
        rule: 'classname-prop',
        message: `Component "${componentName}" accepts className but does not use filter(Boolean).join() or a classnames utility for composing class names.`,
        filePath: tsxPath,
        severity: 'error',
      });
    }

    return errors;
  },
};
