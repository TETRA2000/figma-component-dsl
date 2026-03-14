import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

export const tokenExistsRule: ValidationRule = {
  id: 'token-exists',
  severity: 'error',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { cssContent, cssPath, tokensContent } = context;

    if (!cssContent || !cssPath) {
      return errors;
    }

    if (!tokensContent) {
      // Cannot validate without tokens.css
      return errors;
    }

    // Extract all token definitions from tokens.css
    const definedTokens = new Set<string>();
    const tokenDefPattern = /--([\w-]+)\s*:/g;
    let match;
    while ((match = tokenDefPattern.exec(tokensContent)) !== null) {
      definedTokens.add(`--${match[1]}`);
    }

    // Extract all var(--*) references from the CSS file
    const lines = cssContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      let refMatch;
      const linePattern = /var\((--[\w-]+)/g;
      while ((refMatch = linePattern.exec(line)) !== null) {
        const tokenName = refMatch[1]!;
        if (!definedTokens.has(tokenName)) {
          errors.push({
            rule: 'token-exists',
            message: `Token "${tokenName}" is referenced but not defined in tokens.css`,
            filePath: cssPath,
            line: i + 1,
            severity: 'error',
          });
        }
      }
    }

    return errors;
  },
};
