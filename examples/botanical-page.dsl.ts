/**
 * Botanical — Nature-inspired, green palette, organic curves.
 *
 * DSL features stressed: green color palette, large cornerRadius,
 * ellipse leaf shapes, warm/cool contrast, nested layouts.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function plantCard(name: string, latin: string, desc: string, accentColor: string) {
  return frame(`Plant: ${name}`, {
    size: { x: 300, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid('#ffffff')],
    cornerRadius: 20,
    strokes: [{ color: hex('#e8ece5'), weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('ImgPlaceholder', { size: { x: 252, y: 160 }, fills: [solid(accentColor)], cornerRadius: 12 }),
      text(name, { fontSize: 20, fontWeight: 600, color: '#2d3b2d' }),
      text(latin, { fontSize: 12, fontWeight: 400, color: '#7a8e7a', letterSpacing: { value: 1, unit: 'PIXELS' } }),
      text(desc, { fontSize: 13, fontWeight: 400, color: '#8a9e8a', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

export default frame('BotanicalPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48 }),
  fills: [solid('#f0f4ed')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeafRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('L1', { size: { x: 16, y: 16 }, fills: [solid('#4a7c59')] }),
            ellipse('L2', { size: { x: 12, y: 12 }, fills: [solid('#6b9e7a')] }),
            ellipse('L3', { size: { x: 8, y: 8 }, fills: [solid('#8ebe9c')] }),
          ],
        }),
        text('Botanical', { fontSize: 64, fontWeight: 700, color: '#2d3b2d' }),
        text('GARDEN', { fontSize: 16, fontWeight: 400, color: '#7a8e7a', letterSpacing: { value: 8, unit: 'PIXELS' } }),
        text('Cultivating beauty through nature and design.', { fontSize: 18, fontWeight: 400, color: '#8a9e8a' }),
      ],
    }),
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        plantCard('Monstera', 'Monstera deliciosa', 'Iconic split leaves that bring tropical vibes.', '#c8e6c9'),
        plantCard('Fern', 'Nephrolepis exaltata', 'Delicate fronds cascading with ancient grace.', '#a5d6a7'),
        plantCard('Succulent', 'Echeveria elegans', 'Geometric rosettes storing desert wisdom.', '#81c784'),
        plantCard('Bamboo', 'Bambusoideae', 'Tall, resilient, bending but never breaking.', '#66bb6a'),
      ],
    }),
    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
