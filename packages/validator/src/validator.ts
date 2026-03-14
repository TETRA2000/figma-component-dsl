import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';
import type {
  ValidationResult,
  ValidatorOptions,
  ValidationContext,
  ValidationError,
  ValidationRule,
} from './types.js';
import { allRules } from './rules/index.js';

function buildContext(
  componentDir: string,
  options?: ValidatorOptions
): ValidationContext {
  const componentName = basename(componentDir);
  const tsxPath = join(componentDir, `${componentName}.tsx`);
  const cssPath = join(componentDir, `${componentName}.module.css`);
  const figmaPath = join(componentDir, `${componentName}.figma.tsx`);
  const barrelPath = join(dirname(componentDir), 'index.ts');

  const context: ValidationContext = {
    componentDir,
    componentName,
  };

  if (existsSync(tsxPath)) {
    context.tsxPath = tsxPath;
    context.tsxContent = readFileSync(tsxPath, 'utf-8');
  }

  if (existsSync(cssPath)) {
    context.cssPath = cssPath;
    context.cssContent = readFileSync(cssPath, 'utf-8');
  }

  if (existsSync(figmaPath)) {
    context.figmaPath = figmaPath;
    context.figmaContent = readFileSync(figmaPath, 'utf-8');
  }

  if (existsSync(barrelPath)) {
    context.barrelPath = barrelPath;
    context.barrelContent = readFileSync(barrelPath, 'utf-8');
  }

  // Load tokens.css
  if (options?.tokensPath && existsSync(options.tokensPath)) {
    context.tokensContent = readFileSync(options.tokensPath, 'utf-8');
  } else {
    // Auto-detect tokens.css in the parent directory
    const autoTokensPath = join(dirname(componentDir), 'tokens.css');
    if (existsSync(autoTokensPath)) {
      context.tokensContent = readFileSync(autoTokensPath, 'utf-8');
    }
  }

  return context;
}

function selectRules(options?: ValidatorOptions): ValidationRule[] {
  let rules = [...allRules];

  if (options?.rules && options.rules.length > 0) {
    rules = rules.filter((r) => options.rules!.includes(r.id));
  }

  if (options?.skipRules && options.skipRules.length > 0) {
    rules = rules.filter((r) => !options.skipRules!.includes(r.id));
  }

  return rules;
}

export async function validateComponent(
  componentDir: string,
  options?: ValidatorOptions
): Promise<ValidationResult> {
  const context = buildContext(componentDir, options);
  const rules = selectRules(options);

  const allErrors: ValidationError[] = [];

  for (const rule of rules) {
    const ruleErrors = await rule.validate(context);
    allErrors.push(...ruleErrors);
  }

  const errors = allErrors.filter((e) => e.severity === 'error');
  const warnings = allErrors.filter((e) => e.severity === 'warning');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    checkedRules: rules.map((r) => r.id),
  };
}

export async function validateAll(
  baseDir: string,
  options?: ValidatorOptions
): Promise<Map<string, ValidationResult>> {
  const results = new Map<string, ValidationResult>();

  if (!existsSync(baseDir)) {
    return results;
  }

  const entries = readdirSync(baseDir);
  for (const entry of entries) {
    const entryPath = join(baseDir, entry);
    if (!statSync(entryPath).isDirectory()) {
      continue;
    }

    // Check if directory contains a .tsx file matching its name (component pattern)
    const tsxFile = join(entryPath, `${entry}.tsx`);
    if (existsSync(tsxFile)) {
      const result = await validateComponent(entryPath, options);
      results.set(entry, result);
    }
  }

  return results;
}
