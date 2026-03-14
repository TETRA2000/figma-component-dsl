/**
 * Maximalist Color — Everything loud, every color, anti-minimalist.
 *
 * DSL features stressed: multiple bright fills, many gradients, thick strokes,
 * large cornerRadius, bold type, ellipse + rectangle mix.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('MaximalistPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [gradient([
    { hex: '#ff006e', position: 0 },
    { hex: '#8338ec', position: 0.5 },
    { hex: '#3a86ff', position: 1 },
  ], 135)],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Dots', { autoLayout: horizontal({ spacing: 12 }),
          children: [
            ellipse('D1', { size: { x: 24, y: 24 }, fills: [solid('#ffbe0b')] }),
            ellipse('D2', { size: { x: 24, y: 24 }, fills: [solid('#fb5607')] }),
            ellipse('D3', { size: { x: 24, y: 24 }, fills: [solid('#ff006e')] }),
            ellipse('D4', { size: { x: 24, y: 24 }, fills: [solid('#8338ec')] }),
            ellipse('D5', { size: { x: 24, y: 24 }, fills: [solid('#3a86ff')] }),
          ],
        }),
        text('MORE IS MORE', { fontSize: 96, fontWeight: 900, color: '#ffffff', lineHeight: { value: 95, unit: 'PERCENT' } }),
        text('AND THEN SOME', { fontSize: 96, fontWeight: 900, color: '#ffbe0b', lineHeight: { value: 95, unit: 'PERCENT' } }),
        text('Why whisper when you can shout? Maximalism celebrates excess.', {
          fontSize: 20, fontWeight: 400, color: '#ffffffCC',
        }),
      ],
    }),
    frame('Cards', {
      autoLayout: horizontal({ spacing: 16, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('C1', { size: { x: 300, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
          fills: [solid('#ffbe0b')], cornerRadius: 20, strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
          children: [
            text('BOLD', { fontSize: 32, fontWeight: 900, color: '#000000' }),
            text('Dare to be seen. Dare to be loud.', { fontSize: 14, fontWeight: 500, color: '#333333', layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('C2', { size: { x: 300, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
          fills: [solid('#fb5607')], cornerRadius: 20, strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
          children: [
            text('VIVID', { fontSize: 32, fontWeight: 900, color: '#ffffff' }),
            text('Colors that demand attention.', { fontSize: 14, fontWeight: 500, color: '#ffffffCC', layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('C3', { size: { x: 300, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
          fills: [solid('#ff006e')], cornerRadius: 20, strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
          children: [
            text('WILD', { fontSize: 32, fontWeight: 900, color: '#ffffff' }),
            text('Break every rule with style.', { fontSize: 14, fontWeight: 500, color: '#ffffffCC', layoutSizingHorizontal: 'FILL' }),
          ],
        }),
        frame('C4', { size: { x: 300, y: undefined }, autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
          fills: [solid('#3a86ff')], cornerRadius: 20, strokes: [{ color: hex('#000000'), weight: 3, align: 'INSIDE' }],
          children: [
            text('FREE', { fontSize: 32, fontWeight: 900, color: '#ffffff' }),
            text('Expression without boundaries.', { fontSize: 14, fontWeight: 500, color: '#ffffffCC', layoutSizingHorizontal: 'FILL' }),
          ],
        }),
      ],
    }),
    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
