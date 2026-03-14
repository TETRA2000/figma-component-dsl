/**
 * Pastel Dreams — Soft pastels, playful rounded shapes, warm whites.
 *
 * DSL features stressed: large cornerRadius, soft fills, ellipse shapes,
 * gentle opacity, warm palette, nested vertical layouts.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function pastelCard(title: string, desc: string, bgColor: string, dotColor: string) {
  return frame(`Card: ${title}`, {
    size: { x: 320, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
    fills: [solid('#ffffff')],
    cornerRadius: 24,
    strokes: [{ color: hex(bgColor), weight: 2, align: 'INSIDE' }],
    children: [
      frame('IconRow', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('Dot', { size: { x: 32, y: 32 }, fills: [solid(dotColor)] }),
          text(title, { fontSize: 18, fontWeight: 600, color: '#3d3d3d' }),
        ],
      }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#8a8a8a',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('PastelDreamsPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48 }),
  fills: [solid('#fef7f0')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [solid('#fce4ec')],
          cornerRadius: 999,
          children: [
            text('SOFT & SWEET', { fontSize: 12, fontWeight: 600, color: '#e91e63' }),
          ],
        }),
        text('Pastel Dreams', {
          fontSize: 56,
          fontWeight: 700,
          color: '#3d3d3d',
        }),
        text('Where softness speaks louder than bold.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#999999',
        }),
      ],
    }),

    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pastelCard('Blush', 'Gentle pinks that whisper elegance.', '#fce4ec', '#f48fb1'),
        pastelCard('Lavender', 'Calming purples for peaceful minds.', '#ede7f6', '#b39ddb'),
        pastelCard('Mint', 'Fresh greens that refresh the soul.', '#e8f5e9', '#81c784'),
        pastelCard('Sky', 'Light blues like a spring morning.', '#e3f2fd', '#64b5f6'),
      ],
    }),

    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
