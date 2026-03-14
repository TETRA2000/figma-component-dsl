/**
 * Organic Shapes — Soft natural colors, large rounded forms, warm palette.
 *
 * DSL features stressed: large cornerRadius, radialGradient, soft opacity fills,
 * ellipse nodes, warm color palette, nested padding.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, radialGradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function organicCard(title: string, desc: string, bgColor: string, accentColor: string) {
  return frame(`Card: ${title}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 36 }),
    fills: [solid(bgColor)],
    cornerRadius: 32,
    children: [
      ellipse('Accent', {
        size: { x: 48, y: 48 },
        fills: [solid(accentColor)],
      }),
      text(title, { fontSize: 24, fontWeight: 600, color: '#2d2d2d' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#6b6b6b',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('OrganicShapesPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48 }),
  fills: [solid('#faf7f2')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [radialGradient([
        { hex: '#fde68a40', position: 0 },
        { hex: '#faf7f200', position: 1 },
      ], { center: { x: 0.5, y: 0.4 }, radius: 0.6 })],
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [solid('#e8dcc8')],
          cornerRadius: 999,
          children: [
            text('ORGANIC DESIGN', {
              fontSize: 12,
              fontWeight: 600,
              color: '#8b6f47',
              letterSpacing: { value: 1, unit: 'PIXELS' },
            }),
          ],
        }),
        text('Nature Inspired', {
          fontSize: 64,
          fontWeight: 700,
          color: '#2d2d2d',
        }),
        text('Soft curves, warm tones, and the beauty of imperfection.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#888888',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        organicCard('Warmth', 'Earthy tones that ground the viewer.', '#f5e6d3', '#d4956a'),
        organicCard('Growth', 'Verdant hues inspired by forest canopies.', '#e2efdb', '#7cb66a'),
        organicCard('Calm', 'Serene blues reminiscent of still waters.', '#dde8f0', '#6a9fc4'),
      ],
    }),

    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
