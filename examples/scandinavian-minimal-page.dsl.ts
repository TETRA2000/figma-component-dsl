/**
 * Scandinavian Minimal — Clean, airy, functional with warm wood tones.
 *
 * DSL features stressed: generous padding, light fills, subtle strokes,
 * clean typography, FILL sizing, balanced horizontal layouts.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function scanCard(title: string, desc: string, number: string) {
  return frame(`Card: ${title}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 20, padX: 32, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 4,
    children: [
      text(number, { fontSize: 48, fontWeight: 200, color: '#c8b8a4' }),
      text(title, { fontSize: 22, fontWeight: 500, color: '#2d2d2d' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#8a8a8a',
        lineHeight: { value: 170, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('ScandinavianPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f0eb')],
  children: [
    // Nav
    frame('Nav', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('HYGGE', { fontSize: 16, fontWeight: 500, color: '#2d2d2d', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        frame('Links', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('Home', { fontSize: 14, fontWeight: 400, color: '#8a8a8a' }),
            text('About', { fontSize: 14, fontWeight: 400, color: '#8a8a8a' }),
            text('Shop', { fontSize: 14, fontWeight: 400, color: '#8a8a8a' }),
          ],
        }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 96 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Less, but\nbetter.', {
          fontSize: 72,
          fontWeight: 300,
          color: '#2d2d2d',
          lineHeight: { value: 105, unit: 'PERCENT' },
        }),
        text('The Scandinavian approach to living with intention and simplicity.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#8a8a8a',
          lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        scanCard('Simplicity', 'Every object has a purpose. Nothing more, nothing less.', '01'),
        scanCard('Function', 'Beauty follows function. Good design serves life.', '02'),
        scanCard('Nature', 'Organic materials and earthy tones ground the space.', '03'),
      ],
    }),

    rectangle('Spacer', { size: { x: 1, y: 64 }, opacity: 0 }),
  ],
});
