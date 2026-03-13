/**
 * Badge component set — small status labels with multiple variants.
 *
 * Demonstrates:
 *  - componentSet() with variantAxes
 *  - Multiple component() variants using naming convention "Prop=Value, ..."
 *  - Shared helper function for building variants
 *  - ellipse() for a status dot indicator
 */
import {
  component, componentSet, text, ellipse,
  solid,
  horizontal,
} from '@figma-dsl/core';

interface BadgeVariant {
  variant: string;
  size: string;
  bg: string;
  fg: string;
  dot: string;
  fontSize: number;
  padX: number;
  padY: number;
  dotSize: number;
}

function badge(v: BadgeVariant) {
  return component(`Variant=${v.variant}, Size=${v.size}`, {
    autoLayout: horizontal({
      spacing: 6,
      padX: v.padX,
      padY: v.padY,
      align: 'CENTER',
      counterAlign: 'CENTER',
    }),
    fills: [solid(v.bg)],
    cornerRadius: 9999,
    children: [
      ellipse('Dot', {
        size: { x: v.dotSize, y: v.dotSize },
        fills: [solid(v.dot)],
      }),
      text(v.variant, {
        fontSize: v.fontSize,
        fontWeight: 500,
        color: v.fg,
      }),
    ],
  });
}

const variants: BadgeVariant[] = [
  // Success
  { variant: 'Success', size: 'Small',  bg: '#ecfdf5', fg: '#065f46', dot: '#10b981', fontSize: 12, padX: 8,  padY: 2, dotSize: 6 },
  { variant: 'Success', size: 'Medium', bg: '#ecfdf5', fg: '#065f46', dot: '#10b981', fontSize: 14, padX: 10, padY: 4, dotSize: 8 },
  // Warning
  { variant: 'Warning', size: 'Small',  bg: '#fffbeb', fg: '#92400e', dot: '#f59e0b', fontSize: 12, padX: 8,  padY: 2, dotSize: 6 },
  { variant: 'Warning', size: 'Medium', bg: '#fffbeb', fg: '#92400e', dot: '#f59e0b', fontSize: 14, padX: 10, padY: 4, dotSize: 8 },
  // Error
  { variant: 'Error', size: 'Small',  bg: '#fef2f2', fg: '#991b1b', dot: '#ef4444', fontSize: 12, padX: 8,  padY: 2, dotSize: 6 },
  { variant: 'Error', size: 'Medium', bg: '#fef2f2', fg: '#991b1b', dot: '#ef4444', fontSize: 14, padX: 10, padY: 4, dotSize: 8 },
  // Info
  { variant: 'Info', size: 'Small',  bg: '#eff6ff', fg: '#1e40af', dot: '#3b82f6', fontSize: 12, padX: 8,  padY: 2, dotSize: 6 },
  { variant: 'Info', size: 'Medium', bg: '#eff6ff', fg: '#1e40af', dot: '#3b82f6', fontSize: 14, padX: 10, padY: 4, dotSize: 8 },
];

export default componentSet('Badge', {
  variantAxes: {
    Variant: ['Success', 'Warning', 'Error', 'Info'],
    Size: ['Small', 'Medium'],
  },
  children: variants.map(badge),
});
