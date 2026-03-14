/**
 * Fashion Editorial — High-end fashion magazine layout, dramatic typography.
 *
 * DSL features stressed: extreme font sizes, thin/bold weight contrast,
 * uppercase letterSpacing, rectangles as image placeholders, SPACE_BETWEEN.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('FashionEditorialPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8f6f3')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('VOGUE', { fontSize: 24, fontWeight: 700, color: '#1a1a1a', letterSpacing: { value: 6, unit: 'PIXELS' } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('Fashion', { fontSize: 13, fontWeight: 400, color: '#666666' }),
            text('Beauty', { fontSize: 13, fontWeight: 400, color: '#666666' }),
            text('Culture', { fontSize: 13, fontWeight: 400, color: '#666666' }),
            text('Living', { fontSize: 13, fontWeight: 400, color: '#666666' }),
          ],
        }),
      ],
    }),

    rectangle('HeaderLine', { size: { x: 1, y: 1 }, fills: [solid('#e0dcd8')], layoutSizingHorizontal: 'FILL' }),

    // Hero
    frame('Hero', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Image placeholder
        rectangle('HeroImage', {
          size: { x: 600, y: 500 },
          fills: [gradient([
            { hex: '#d4c5b2', position: 0 },
            { hex: '#b8a999', position: 1 },
          ], 135)],
        }),
        // Right: Text
        frame('HeroText', {
          size: { x: 600, y: undefined },
          autoLayout: vertical({ spacing: 24, padY: 48 }),
          children: [
            text('SPRING / SUMMER 2026', {
              fontSize: 12,
              fontWeight: 400,
              color: '#999999',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
            text('The New\nSilhouette', {
              fontSize: 64,
              fontWeight: 300,
              color: '#1a1a1a',
              lineHeight: { value: 105, unit: 'PERCENT' },
            }),
            text('Exploring the boundary between structure and fluidity in contemporary fashion design.', {
              fontSize: 16,
              fontWeight: 400,
              color: '#888888',
              lineHeight: { value: 170, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
            }),
            frame('ReadMore', {
              autoLayout: horizontal({ padX: 0, padY: 0 }),
              children: [
                text('Read Article →', {
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  textDecoration: 'UNDERLINE',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Divider
    rectangle('Divider', { size: { x: 1, y: 1 }, fills: [solid('#e0dcd8')], layoutSizingHorizontal: 'FILL' }),

    // Bottom row
    frame('BottomRow', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Thumb1', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img1', { size: { x: 400, y: 240 }, fills: [solid('#e8e0d6')] }),
            text('EDITORIAL', { fontSize: 11, fontWeight: 400, color: '#999999', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Minimalism Redefined', { fontSize: 22, fontWeight: 600, color: '#1a1a1a' }),
          ],
        }),
        frame('Thumb2', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img2', { size: { x: 400, y: 240 }, fills: [solid('#d4cec6')] }),
            text('BEAUTY', { fontSize: 11, fontWeight: 400, color: '#999999', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('The Art of Subtlety', { fontSize: 22, fontWeight: 600, color: '#1a1a1a' }),
          ],
        }),
        frame('Thumb3', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('Img3', { size: { x: 400, y: 240 }, fills: [solid('#c8c0b8')] }),
            text('CULTURE', { fontSize: 11, fontWeight: 400, color: '#999999', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Heritage Meets Future', { fontSize: 22, fontWeight: 600, color: '#1a1a1a' }),
          ],
        }),
      ],
    }),
  ],
});
