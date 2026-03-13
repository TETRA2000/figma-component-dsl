import type { AutoLayoutConfig } from "./types.js";

/**
 * Create a horizontal auto-layout configuration.
 */
export function horizontal(
  config: Partial<Omit<AutoLayoutConfig, "direction">> = {},
): AutoLayoutConfig {
  return {
    direction: "HORIZONTAL",
    ...config,
  };
}

/**
 * Create a vertical auto-layout configuration.
 */
export function vertical(
  config: Partial<Omit<AutoLayoutConfig, "direction">> = {},
): AutoLayoutConfig {
  return {
    direction: "VERTICAL",
    ...config,
  };
}
