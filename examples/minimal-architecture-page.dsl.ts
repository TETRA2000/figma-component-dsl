/**
 * Minimal Architecture — Clean lines, concrete tones, structural beauty.
 *
 * DSL features stressed: muted palette, generous whitespace, thin strokes,
 * precise typography, FIXED sizing, rectangle image placeholders.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('MinimalArchitecturePage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f5f0')],
  children: [
    frame('Nav', {
      autoLayout: horizontal({ padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#d0d0c8'), weight: 1, align: 'INSIDE' }],
      children: [
        text('ATELIER', { fontSize: 14, fontWeight: 500, color: '#333333', letterSpacing: { value: 4, unit: 'PIXELS' } }),
        frame('Links', { autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('Projects', { fontSize: 13, fontWeight: 400, color: '#888888' }),
            text('Studio', { fontSize: 13, fontWeight: 400, color: '#888888' }),
            text('Contact', { fontSize: 13, fontWeight: 400, color: '#888888' }),
          ],
        }),
      ],
    }),
    frame('Hero', {
      autoLayout: horizontal({ spacing: 64, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('HeroImage', { size: { x: 640, y: 480 }, fills: [gradient([
          { hex: '#c8c4bc', position: 0 },
          { hex: '#a8a49c', position: 1 },
        ], 135)] }),
        frame('HeroText', { size: { x: 500, y: undefined }, autoLayout: vertical({ spacing: 24, padY: 48 }),
          children: [
            text('RESIDENTIAL', { fontSize: 11, fontWeight: 400, color: '#aaaaaa', letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('House of\nSilence', { fontSize: 56, fontWeight: 300, color: '#333333', lineHeight: { value: 105, unit: 'PERCENT' } }),
            text('A meditation on space, light, and the relationship between interior and landscape. Every line serves a purpose.', {
              fontSize: 16, fontWeight: 400, color: '#888888', lineHeight: { value: 170, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL',
            }),
            frame('Arrow', { autoLayout: horizontal({ padX: 0 }),
              children: [
                text('View Project →', { fontSize: 14, fontWeight: 500, color: '#333333' }),
              ],
            }),
          ],
        }),
      ],
    }),
    rectangle('Divider', { size: { x: 1, y: 1 }, fills: [solid('#d0d0c8')], layoutSizingHorizontal: 'FILL' }),
    frame('Projects', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('P1', { size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img1', { size: { x: 400, y: 280 }, fills: [solid('#d4d0c8')] }),
            text('Chapel of Light', { fontSize: 20, fontWeight: 500, color: '#333333' }),
            text('Sacred geometry in concrete and glass.', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('P2', { size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img2', { size: { x: 400, y: 280 }, fills: [solid('#c8c4bc')] }),
            text('Urban Void', { fontSize: 20, fontWeight: 500, color: '#333333' }),
            text('Negative space as the primary material.', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
        frame('P3', { size: { x: 400, y: undefined }, autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img3', { size: { x: 400, y: 280 }, fills: [solid('#bbb8b0')] }),
            text('Water Pavilion', { fontSize: 20, fontWeight: 500, color: '#333333' }),
            text('Where architecture meets reflection.', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
      ],
    }),
  ],
});
