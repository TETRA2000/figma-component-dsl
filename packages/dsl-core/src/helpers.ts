import type {
  DslSolidPaint,
  DslGradientPaint,
  DslFrameNode,
  DslSizingMode,
} from './types.js';

export function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return { r, g, b };
}

export function solidPaint(hex: string, opacity?: number): DslSolidPaint {
  const color = hexToRGB(hex);
  return opacity !== undefined
    ? { type: 'SOLID', color, opacity }
    : { type: 'SOLID', color };
}

export function gradientPaint(
  stops: Array<{ color: string; position: number }>,
  angle: number = 0,
): DslGradientPaint {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const gradientTransform: [[number, number, number], [number, number, number]] = [
    [cos, sin, 0.5 - (cos + sin) * 0.5],
    [-sin, cos, 0.5 - (-sin + cos) * 0.5],
  ];

  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: stops.map((s) => ({
      color: { ...hexToRGB(s.color), a: 1 },
      position: s.position,
    })),
    gradientTransform,
  };
}

export type ColorTokenMap = Record<string, string>;

export function defineTokens(tokens: ColorTokenMap): ColorTokenMap {
  return { ...tokens };
}

export function tokenPaint(tokens: ColorTokenMap, name: string): DslSolidPaint {
  const hex = tokens[name];
  if (hex === undefined) {
    throw new Error(`Unknown color token: ${name}`);
  }
  return solidPaint(hex);
}

// --- Auto-Layout Helper ---

export interface AutoLayoutOptions {
  direction: 'HORIZONTAL' | 'VERTICAL';
  spacing?: number;
  padX?: number;
  padY?: number;
  padTop?: number;
  padRight?: number;
  padBottom?: number;
  padLeft?: number;
  align?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAlign?: 'MIN' | 'CENTER' | 'MAX';
  sizing?: DslSizingMode;
  widthSizing?: DslSizingMode;
  heightSizing?: DslSizingMode;
}

export function setAutoLayout(
  node: DslFrameNode,
  options: AutoLayoutOptions,
): void {
  node.layoutMode = options.direction;

  if (options.spacing !== undefined) {
    node.itemSpacing = options.spacing;
  }

  // Padding: padX/padY as base, per-side overrides
  if (options.padX !== undefined) {
    node.paddingLeft = options.padX;
    node.paddingRight = options.padX;
  }
  if (options.padY !== undefined) {
    node.paddingTop = options.padY;
    node.paddingBottom = options.padY;
  }
  if (options.padTop !== undefined) node.paddingTop = options.padTop;
  if (options.padRight !== undefined) node.paddingRight = options.padRight;
  if (options.padBottom !== undefined) node.paddingBottom = options.padBottom;
  if (options.padLeft !== undefined) node.paddingLeft = options.padLeft;

  // Alignment
  if (options.align !== undefined) {
    node.primaryAxisAlignItems = options.align;
  }
  if (options.counterAlign !== undefined) {
    node.counterAxisAlignItems = options.counterAlign;
  }

  // Sizing
  if (options.sizing !== undefined) {
    node.layoutSizingHorizontal = options.sizing;
    node.layoutSizingVertical = options.sizing;
  }
  if (options.widthSizing !== undefined) {
    node.layoutSizingHorizontal = options.widthSizing;
  }
  if (options.heightSizing !== undefined) {
    node.layoutSizingVertical = options.heightSizing;
  }
}

// --- Reference Design Token Constants ---

export const REFERENCE_COLORS: ColorTokenMap = {
  'primary-50': '#f5f3ff',
  'primary-100': '#ede9fe',
  'primary-200': '#ddd6fe',
  'primary-300': '#c4b5fd',
  'primary-400': '#a78bfa',
  'primary-500': '#8b5cf6',
  'primary-600': '#7c3aed',
  'primary-700': '#6d28d9',
  'primary-800': '#5b21b6',
  'primary-900': '#4c1d95',
  'pink-400': '#f472b6',
  'pink-500': '#ec4899',
  'pink-600': '#db2777',
  'orange-400': '#fb923c',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
  'cyan-400': '#22d3ee',
  'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2',
  'green-400': '#4ade80',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'gray-50': '#f9fafb',
  'gray-100': '#f3f4f6',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  'gray-950': '#030712',
  'white': '#ffffff',
  'black': '#000000',
};

export const SEMANTIC_COLORS: ColorTokenMap = {
  'text-primary': '#111827',      // gray-900
  'text-secondary': '#4b5563',    // gray-600
  'text-tertiary': '#9ca3af',     // gray-400
  'text-inverse': '#ffffff',      // white
  'text-accent': '#7c3aed',       // primary-600
  'bg-primary': '#ffffff',        // white
  'bg-secondary': '#f9fafb',      // gray-50
  'bg-tertiary': '#f3f4f6',       // gray-100
  'bg-inverse': '#111827',        // gray-900
  'border-default': '#e5e7eb',    // gray-200
  'border-strong': '#d1d5db',     // gray-300
};

export const REFERENCE_GRADIENTS: Record<
  string,
  { stops: Array<{ color: string; position: number }>; angle: number }
> = {
  'gradient-primary': {
    stops: [
      { color: '#7c3aed', position: 0 },
      { color: '#4f46e5', position: 1 },
    ],
    angle: 135,
  },
  'gradient-hero': {
    stops: [
      { color: '#7c3aed', position: 0 },
      { color: '#ec4899', position: 0.5 },
      { color: '#f97316', position: 1 },
    ],
    angle: 135,
  },
  'gradient-cta': {
    stops: [
      { color: '#6d28d9', position: 0 },
      { color: '#db2777', position: 1 },
    ],
    angle: 135,
  },
  'gradient-subtle': {
    stops: [
      { color: '#f5f3ff', position: 0 },
      { color: '#fdf2f8', position: 0.5 },
      { color: '#fff7ed', position: 1 },
    ],
    angle: 135,
  },
  'gradient-dark': {
    stops: [
      { color: '#1e1b4b', position: 0 },
      { color: '#312e81', position: 0.5 },
      { color: '#4c1d95', position: 1 },
    ],
    angle: 135,
  },
  'gradient-text': {
    stops: [
      { color: '#7c3aed', position: 0 },
      { color: '#ec4899', position: 0.5 },
      { color: '#f97316', position: 1 },
    ],
    angle: 135,
  },
  'gradient-card': {
    stops: [
      { color: '#7c3aed', position: 0 },
      { color: '#ec4899', position: 1 },
    ],
    angle: 135,
  },
};

export const SPACING_SCALE: Record<string, number> = {
  'space-1': 4,
  'space-2': 8,
  'space-3': 12,
  'space-4': 16,
  'space-5': 20,
  'space-6': 24,
  'space-8': 32,
  'space-10': 40,
  'space-12': 48,
  'space-16': 64,
  'space-20': 80,
  'space-24': 96,
};

export const RADIUS_SCALE: Record<string, number> = {
  'radius-sm': 6,
  'radius-md': 10,
  'radius-lg': 16,
  'radius-xl': 24,
  'radius-2xl': 32,
  'radius-full': 9999,
};

export const FONT_SIZE_SCALE: Record<string, number> = {
  'text-xs': 12,
  'text-sm': 14,
  'text-base': 16,
  'text-lg': 18,
  'text-xl': 20,
  'text-2xl': 24,
  'text-3xl': 30,
  'text-4xl': 36,
  'text-5xl': 48,
  'text-6xl': 60,
};

export const FONT_WEIGHTS: Record<string, number> = {
  'regular': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
};
