import type { SeverityLevel, ValidationPreset } from './types.js';

/**
 * Severity presets for validation rules.
 *
 * - strict: Current defaults — all rules at their original severity.
 * - normal: Relaxes structural/boilerplate rules that don't affect rendering quality.
 * - loose:  Maximum flexibility — only keeps rules that prevent broken output.
 */
export const presets: Record<ValidationPreset, Record<string, SeverityLevel>> = {
  strict: {
    'three-file':            'warning',
    'barrel-export':         'warning',
    'css-modules':           'error',
    'no-inline-style':       'error',
    'design-tokens':         'warning',
    'token-exists':          'error',
    'classname-prop':        'error',
    'variant-union':         'error',
    'html-attrs':            'warning',
    'dsl-compatible-layout': 'warning',
    'image-refs':            'error',
  },

  normal: {
    'three-file':            'off',
    'barrel-export':         'off',
    'css-modules':           'warning',
    'no-inline-style':       'warning',
    'design-tokens':         'off',
    'token-exists':          'warning',
    'classname-prop':        'warning',
    'variant-union':         'warning',
    'html-attrs':            'off',
    'dsl-compatible-layout': 'warning',
    'image-refs':            'warning',
  },

  loose: {
    'three-file':            'off',
    'barrel-export':         'off',
    'css-modules':           'off',
    'no-inline-style':       'off',
    'design-tokens':         'off',
    'token-exists':          'off',
    'classname-prop':        'off',
    'variant-union':         'off',
    'html-attrs':            'off',
    'dsl-compatible-layout': 'off',
    'image-refs':            'warning',
  },
};

/**
 * Resolve the effective severity for a rule given options.
 * Priority: explicit severityOverrides > preset > rule's default severity.
 */
export function resolveRuleSeverity(
  ruleId: string,
  defaultSeverity: 'error' | 'warning',
  preset?: ValidationPreset,
  overrides?: Record<string, SeverityLevel>,
): SeverityLevel {
  // Explicit override wins
  if (overrides && ruleId in overrides) {
    return overrides[ruleId]!;
  }
  // Preset wins over default
  if (preset && preset in presets) {
    const presetConfig = presets[preset];
    if (ruleId in presetConfig) {
      return presetConfig[ruleId]!;
    }
  }
  // Fall back to rule's default
  return defaultSeverity;
}
