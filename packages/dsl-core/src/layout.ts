import type { AutoLayoutConfig } from './types.js';

export function horizontal(config?: Partial<Omit<AutoLayoutConfig, 'direction'>>): AutoLayoutConfig {
  return {
    direction: 'HORIZONTAL',
    ...config,
  };
}

export function vertical(config?: Partial<Omit<AutoLayoutConfig, 'direction'>>): AutoLayoutConfig {
  return {
    direction: 'VERTICAL',
    ...config,
  };
}
