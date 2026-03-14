import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const htmlAttrsRule: ValidationRule = {
  id: 'html-attrs',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { tsxContent, tsxPath, componentName } = context;

    if (!tsxContent || !tsxPath) {
      return errors;
    }

    // Check if the props interface/type extends HTML attribute types
    const htmlAttrsPattern = /extends\s+(HTML\w*Attributes|React\.HTML\w*Attributes|ButtonHTMLAttributes|InputHTMLAttributes|AnchorHTMLAttributes|FormHTMLAttributes|TextareaHTMLAttributes|SelectHTMLAttributes|SVGAttributes)\s*</;
    const componentPropsPattern = /extends\s+React\.ComponentPropsWithoutRef\s*<|extends\s+React\.ComponentPropsWithRef\s*<|extends\s+ComponentPropsWithoutRef\s*<|extends\s+ComponentPropsWithRef\s*</;
    const omitPattern = /Omit\s*<\s*(HTML\w*Attributes|React\.HTML\w*Attributes|ButtonHTMLAttributes|InputHTMLAttributes)\s*</;

    if (
      !htmlAttrsPattern.test(tsxContent) &&
      !componentPropsPattern.test(tsxContent) &&
      !omitPattern.test(tsxContent)
    ) {
      errors.push({
        rule: 'html-attrs',
        message: `Component "${componentName}" props do not extend HTMLAttributes or similar HTML attribute types. Consider extending HTMLAttributes<HTMLElement> for native HTML prop support.`,
        filePath: tsxPath,
        severity: 'warning',
      });
    }

    return errors;
  },
};
