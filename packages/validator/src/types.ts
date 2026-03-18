export type SeverityLevel = 'error' | 'warning' | 'off';

export type ValidationPreset = 'strict' | 'normal' | 'loose' | 'canvas' | 'banner';

export interface ValidationError {
  rule: string;
  message: string;
  filePath: string;
  line?: number;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  checkedRules: string[];
  skippedRules: string[];
  preset?: ValidationPreset;
}

export interface ValidatorOptions {
  /** Path to tokens.css for token reference validation */
  tokensPath?: string;
  /** Specific rules to run (default: all) */
  rules?: string[];
  /** Skip specific rules */
  skipRules?: string[];
  /** Override severity per rule (takes priority over preset) */
  severityOverrides?: Record<string, SeverityLevel>;
  /** Apply a preset severity configuration */
  preset?: ValidationPreset;
}

export interface ValidationRule {
  id: string;
  severity: 'error' | 'warning';
  validate(context: ValidationContext): Promise<ValidationError[]>;
}

export interface ValidationContext {
  /** Path to the component directory */
  componentDir: string;
  /** Component name (derived from directory name) */
  componentName: string;
  /** Content of the .tsx file, if present */
  tsxContent?: string;
  /** Path to the .tsx file */
  tsxPath?: string;
  /** Content of the .module.css file, if present */
  cssContent?: string;
  /** Path to the .module.css file */
  cssPath?: string;
  /** Content of the .figma.tsx file, if present */
  figmaContent?: string;
  /** Path to the .figma.tsx file */
  figmaPath?: string;
  /** Content of tokens.css, if available */
  tokensContent?: string;
  /** Path to the barrel export index.ts file */
  barrelPath?: string;
  /** Content of the barrel export index.ts file */
  barrelContent?: string;
}
