/**
 * Memphis Design — Bold colors, geometric shapes, playful patterns.
 *
 * DSL features stressed: bright fills, ellipse shapes, thick colored strokes,
 * large cornerRadius mixed with 0 radius, bold color combinations.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function memphisShape(color: string, size: number) {
  return ellipse('Shape', {
    size: { x: size, y: size },
    fills: [solid(color)],
  });
}

function memphisCard(title: string, desc: string, bgColor: string, shapeColor: string) {
  return frame(`Card: ${title}`, {
    size: { x: 340, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid(bgColor)],
    cornerRadius: 0,
    strokes: [{ color: hex('#222222'), weight: 3, align: 'INSIDE' }],
    children: [
      memphisShape(shapeColor, 40),
      text(title, { fontSize: 24, fontWeight: 900, color: '#222222' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#444444',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('MemphisDesignPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fef3e2')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ShapeRow', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            memphisShape('#ff6b6b', 24),
            memphisShape('#4ecdc4', 32),
            memphisShape('#ffe66d', 20),
            memphisShape('#a855f7', 28),
          ],
        }),
        text('MEMPHIS', {
          fontSize: 96,
          fontWeight: 900,
          color: '#222222',
        }),
        text('REVIVAL', {
          fontSize: 96,
          fontWeight: 900,
          color: '#ff6b6b',
        }),
        text('Bold. Playful. Unapologetic.', {
          fontSize: 20,
          fontWeight: 400,
          color: '#666666',
        }),
      ],
    }),

    // Thick divider
    rectangle('Divider', {
      size: { x: 1, y: 4 },
      fills: [solid('#222222')],
      layoutSizingHorizontal: 'FILL',
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        memphisCard('PATTERN', 'Zigzags, squiggles, and dots define the visual language.', '#ffe66d', '#ff6b6b'),
        memphisCard('COLOR', 'Unexpected combinations that challenge convention.', '#4ecdc4', '#222222'),
        memphisCard('FORM', 'Geometric shapes meet organic chaos.', '#ff6b6b', '#ffe66d'),
        memphisCard('PLAY', 'Design should be fun, never boring.', '#c4b5fd', '#a855f7'),
      ],
    }),
  ],
});
