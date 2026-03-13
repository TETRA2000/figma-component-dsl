import type { AutoLayoutConfig } from './types.js';

export function horizontal(config?: Partial<Omit<AutoLayoutConfig, 'direction'>>): AutoLayoutConfig {
  return Object.freeze({
    direction: 'HORIZONTAL' as const,
    ...config,
  });
}

export function vertical(config?: Partial<Omit<AutoLayoutConfig, 'direction'>>): AutoLayoutConfig {
  return Object.freeze({
    direction: 'VERTICAL' as const,
    ...config,
  });
}
