// Static lookup maps for design tokens — values from preview/src/components/tokens.css

export const COLOR_TOKENS: ReadonlyMap<string, string> = new Map([
  ['#f5f3ff', 'var(--color-primary-50)'],
  ['#ede9fe', 'var(--color-primary-100)'],
  ['#ddd6fe', 'var(--color-primary-200)'],
  ['#c4b5fd', 'var(--color-primary-300)'],
  ['#a78bfa', 'var(--color-primary-400)'],
  ['#8b5cf6', 'var(--color-primary-500)'],
  ['#7c3aed', 'var(--color-primary-600)'],
  ['#6d28d9', 'var(--color-primary-700)'],
  ['#5b21b6', 'var(--color-primary-800)'],
  ['#4c1d95', 'var(--color-primary-900)'],
  ['#f472b6', 'var(--color-pink-400)'],
  ['#ec4899', 'var(--color-pink-500)'],
  ['#db2777', 'var(--color-pink-600)'],
  ['#fb923c', 'var(--color-orange-400)'],
  ['#f97316', 'var(--color-orange-500)'],
  ['#ea580c', 'var(--color-orange-600)'],
  ['#22d3ee', 'var(--color-cyan-400)'],
  ['#06b6d4', 'var(--color-cyan-500)'],
  ['#0891b2', 'var(--color-cyan-600)'],
  ['#4ade80', 'var(--color-green-400)'],
  ['#22c55e', 'var(--color-green-500)'],
  ['#16a34a', 'var(--color-green-600)'],
  ['#f9fafb', 'var(--color-gray-50)'],
  ['#f3f4f6', 'var(--color-gray-100)'],
  ['#e5e7eb', 'var(--color-gray-200)'],
  ['#d1d5db', 'var(--color-gray-300)'],
  ['#9ca3af', 'var(--color-gray-400)'],
  ['#6b7280', 'var(--color-gray-500)'],
  ['#4b5563', 'var(--color-gray-600)'],
  ['#374151', 'var(--color-gray-700)'],
  ['#1f2937', 'var(--color-gray-800)'],
  ['#111827', 'var(--color-gray-900)'],
  ['#030712', 'var(--color-gray-950)'],
  ['#ffffff', 'var(--color-white)'],
  ['#000000', 'var(--color-black)'],
]);

export const SPACING_TOKENS: ReadonlyMap<number, string> = new Map([
  [4, 'var(--space-1)'],
  [8, 'var(--space-2)'],
  [12, 'var(--space-3)'],
  [16, 'var(--space-4)'],
  [20, 'var(--space-5)'],
  [24, 'var(--space-6)'],
  [32, 'var(--space-8)'],
  [40, 'var(--space-10)'],
  [48, 'var(--space-12)'],
  [64, 'var(--space-16)'],
  [80, 'var(--space-20)'],
  [96, 'var(--space-24)'],
]);

export const RADIUS_TOKENS: ReadonlyMap<number, string> = new Map([
  [6, 'var(--radius-sm)'],
  [10, 'var(--radius-md)'],
  [16, 'var(--radius-lg)'],
  [24, 'var(--radius-xl)'],
  [32, 'var(--radius-2xl)'],
  [9999, 'var(--radius-full)'],
]);

export function lookupColorToken(hex: string): string | undefined {
  return COLOR_TOKENS.get(hex.toLowerCase());
}

export function lookupSpacingToken(px: number): string | undefined {
  return SPACING_TOKENS.get(px);
}

export function lookupRadiusToken(px: number): string | undefined {
  return RADIUS_TOKENS.get(px);
}

export function figmaColorToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
