/**
 * Art Deco — Geometric patterns, gold/black palette, symmetrical layouts.
 *
 * DSL features stressed: symmetrical counterAlign CENTER, gold gradients,
 * rectangles as decorative elements, strokes, letterSpacing.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function decoCard(title: string, desc: string) {
  return frame(`DecoCard: ${title}`, {
    size: { x: 360, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 40, counterAlign: 'CENTER' }),
    fills: [solid('#1a1a1a')],
    strokes: [{ color: hex('#c9a84c'), weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('TopLine', { size: { x: 40, y: 2 }, fills: [solid('#c9a84c')] }),
      text(title, {
        fontSize: 20,
        fontWeight: 600,
        color: '#c9a84c',
        letterSpacing: { value: 3, unit: 'PIXELS' },
        textAlignHorizontal: 'CENTER',
      }),
      text(desc, {
        fontSize: 13,
        fontWeight: 400,
        color: '#999999',
        lineHeight: { value: 160, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
        layoutSizingHorizontal: 'FILL',
      }),
      rectangle('BottomLine', { size: { x: 40, y: 2 }, fills: [solid('#c9a84c')] }),
    ],
  });
}

export default frame('ArtDecoPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0d0d0d')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('TopDeco', { size: { x: 200, y: 2 }, fills: [gradient([
          { hex: '#c9a84c00', position: 0 },
          { hex: '#c9a84c', position: 0.5 },
          { hex: '#c9a84c00', position: 1 },
        ], 90)] }),
        text('ART DECO', {
          fontSize: 14,
          fontWeight: 400,
          color: '#c9a84c',
          letterSpacing: { value: 8, unit: 'PIXELS' },
        }),
        text('THE GOLDEN AGE', {
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: { value: 6, unit: 'PIXELS' },
        }),
        text('Geometric elegance meets modern sophistication', {
          fontSize: 18,
          fontWeight: 300,
          color: '#666666',
          textAlignHorizontal: 'CENTER',
        }),
        rectangle('BottomDeco', { size: { x: 200, y: 2 }, fills: [gradient([
          { hex: '#c9a84c00', position: 0 },
          { hex: '#c9a84c', position: 0.5 },
          { hex: '#c9a84c00', position: 1 },
        ], 90)] }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        decoCard('ARCHITECTURE', 'Symmetry and proportion define the eternal structures of the era.'),
        decoCard('FASHION', 'Bold geometric patterns adorned the fabrics of sophistication.'),
        decoCard('TYPOGRAPHY', 'Letters became art, each stroke a deliberate geometric form.'),
      ],
    }),
  ],
});
