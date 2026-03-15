import * as fs from 'fs';

export interface DslAssociationConfig {
  dslDir: string;
  overrides: Record<string, string>;
}

/**
 * Convert PascalCase to kebab-case.
 * Handles consecutive capitals (acronyms) like CTABanner → cta-banner.
 */
export function toKebabCase(name: string): string {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Resolve the DSL file path for a given React component name.
 * Returns null when no association exists.
 */
export function resolveDslFile(
  componentName: string,
  config: DslAssociationConfig,
): string | null {
  if (config.overrides[componentName]) {
    return config.overrides[componentName];
  }

  const kebabName = toKebabCase(componentName);
  const dir = config.dslDir.endsWith('/') ? config.dslDir : `${config.dslDir}/`;

  const files = fs.readdirSync(dir.replace(/\/$/, '')).map(String);
  const match = files.find(
    (f) => f === `${kebabName}.dsl.ts` || f.startsWith(`${kebabName}-`) && f.endsWith('.dsl.ts'),
  );

  return match ? `${dir}${match}` : null;
}
