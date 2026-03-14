/**
 * Brutalist Design — Awwwards-style raw, honest, functional design.
 *
 * DSL features stressed: thick strokes, zero cornerRadius, high-contrast fills,
 * letter spacing, nested auto-layout, FILL sizing, SPACE_BETWEEN.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helpers ---

function brutalistBadge(label: string) {
  return frame('Badge', {
    autoLayout: horizontal({ padX: 12, padY: 4 }),
    fills: [solid('#000000')],
    children: [
      text(label, {
        fontSize: 12,
        fontWeight: 700,
        color: '#f5f5f0',
        letterSpacing: { value: 2, unit: 'PIXELS' },
      }),
    ],
  });
}

function brutalistCard(num: string, title: string, desc: string) {
  return frame(`Card ${num}`, {
    size: { x: 400, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
    children: [
      text(num, {
        fontSize: 48,
        fontWeight: 900,
        color: '#000000',
        lineHeight: { value: 100, unit: 'PERCENT' },
      }),
      rectangle('Divider', {
        size: { x: 60, y: 4 },
        fills: [solid('#000000')],
      }),
      text(title, {
        fontSize: 20,
        fontWeight: 700,
        color: '#000000',
        letterSpacing: { value: 2, unit: 'PIXELS' },
      }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#555555',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

// --- Page ---

export default frame('BrutalistPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f5f0')],
  children: [
    // Hero Section
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#000000'), weight: 4, align: 'INSIDE' }],
      children: [
        brutalistBadge('BRUTALIST'),
        text('DESIGN IS NOT DECORATION', {
          fontSize: 72,
          fontWeight: 900,
          color: '#000000',
          lineHeight: { value: 100, unit: 'PERCENT' },
          size: { x: 900 },
          textAutoResize: 'HEIGHT',
        }),
        text('Raw. Honest. Functional.', {
          fontSize: 24,
          fontWeight: 400,
          color: '#333333',
        }),
        frame('CTA', {
          autoLayout: horizontal({ padX: 32, padY: 16 }),
          strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
          children: [
            text('EXPLORE NOW →', {
              fontSize: 16,
              fontWeight: 700,
              color: '#000000',
              letterSpacing: { value: 1, unit: 'PIXELS' },
            }),
          ],
        }),
      ],
    }),

    // Cards Section
    frame('Cards', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        brutalistCard('01', 'TYPOGRAPHY', 'Type is the voice of design. Make it loud.'),
        brutalistCard('02', 'GRID SYSTEMS', 'Structure brings clarity. Break it with purpose.'),
        brutalistCard('03', 'RAW EDGES', 'Perfection is overrated. Embrace the rough.'),
      ],
    }),
  ],
});
