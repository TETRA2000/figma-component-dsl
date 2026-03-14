/**
 * Swiss Design (International Typographic Style) — Grid-based, clean, structured.
 *
 * DSL features stressed: precise spacing, textAlignHorizontal, SPACE_BETWEEN,
 * dividers with FILL sizing, mixed font sizes/weights.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function gridItem(number: string, title: string, desc: string) {
  return frame(`Grid: ${title}`, {
    size: { x: 400, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 0, padY: 32 }),
    children: [
      text(number, {
        fontSize: 64,
        fontWeight: 900,
        color: '#e63946',
      }),
      text(title, {
        fontSize: 18,
        fontWeight: 700,
        color: '#1d3557',
        layoutSizingHorizontal: 'FILL',
      }),
      text(desc, {
        fontSize: 13,
        fontWeight: 400,
        color: '#457b9d',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('SwissDesignPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1faee')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#1d3557'), weight: 1, align: 'INSIDE' }],
      children: [
        text('SWISS STYLE', {
          fontSize: 14,
          fontWeight: 700,
          color: '#1d3557',
          letterSpacing: { value: 3, unit: 'PIXELS' },
        }),
        text('2024', {
          fontSize: 14,
          fontWeight: 400,
          color: '#457b9d',
        }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('International\nTypographic\nStyle', {
          fontSize: 80,
          fontWeight: 900,
          color: '#1d3557',
          lineHeight: { value: 95, unit: 'PERCENT' },
        }),
        rectangle('RedLine', {
          size: { x: 120, y: 4 },
          fills: [solid('#e63946')],
        }),
        text('Clean. Structured. Timeless.', {
          fontSize: 20,
          fontWeight: 400,
          color: '#457b9d',
        }),
      ],
    }),

    // Divider
    rectangle('Divider', {
      size: { x: 1, y: 1 },
      fills: [solid('#1d3557')],
      layoutSizingHorizontal: 'FILL',
    }),

    // Grid
    frame('Grid', {
      autoLayout: horizontal({ spacing: 40, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        gridItem('01', 'Grid Systems', 'Mathematical precision in every element placement.'),
        gridItem('02', 'Sans-Serif', 'Clarity over decoration. Function over form.'),
        gridItem('03', 'Asymmetry', 'Dynamic balance through intentional offset.'),
      ],
    }),
  ],
});
