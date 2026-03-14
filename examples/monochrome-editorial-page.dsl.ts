/**
 * Monochrome Editorial — Black and white magazine-style, large type, dramatic contrast.
 *
 * DSL features stressed: extreme font sizes, lineHeight, letterSpacing,
 * textAlignHorizontal, SPACE_BETWEEN rows, dividers with FILL.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('MonochromeEditorialPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Masthead
    frame('Masthead', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#000000'), weight: 1, align: 'INSIDE' }],
      children: [
        text('THE EDITORIAL', {
          fontSize: 14,
          fontWeight: 700,
          color: '#000000',
          letterSpacing: { value: 4, unit: 'PIXELS' },
        }),
        text('ISSUE 47 — MARCH 2026', {
          fontSize: 11,
          fontWeight: 400,
          color: '#666666',
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
      ],
    }),

    // Hero headline
    frame('Hero', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('THE ART OF\nLESS IS MORE', {
          fontSize: 96,
          fontWeight: 900,
          color: '#000000',
          lineHeight: { value: 92, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        rectangle('Divider', {
          size: { x: 80, y: 2 },
          fills: [solid('#000000')],
        }),
        text('A deep dive into minimalism, intention, and the power of restraint in modern design.', {
          fontSize: 18,
          fontWeight: 300,
          color: '#444444',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 600 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // Full-width divider
    rectangle('FullDivider', {
      size: { x: 1, y: 1 },
      fills: [solid('#000000')],
      layoutSizingHorizontal: 'FILL',
    }),

    // Article teasers
    frame('Articles', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Article1', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12, padX: 0, padY: 0 }),
          children: [
            text('01', { fontSize: 48, fontWeight: 100, color: '#cccccc' }),
            text('White Space', { fontSize: 24, fontWeight: 700, color: '#000000' }),
            text('The unsung hero of visual communication. How emptiness creates meaning.', {
              fontSize: 14, fontWeight: 400, color: '#666666',
              lineHeight: { value: 160, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        frame('Article2', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12, padX: 40, padY: 0 }),
          strokes: [{ color: hex('#e0e0e0'), weight: 1, align: 'INSIDE' }],
          children: [
            text('02', { fontSize: 48, fontWeight: 100, color: '#cccccc' }),
            text('Contrast', { fontSize: 24, fontWeight: 700, color: '#000000' }),
            text('When black meets white, stories emerge from the tension between opposites.', {
              fontSize: 14, fontWeight: 400, color: '#666666',
              lineHeight: { value: 160, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        frame('Article3', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 12, padX: 0, padY: 0 }),
          children: [
            text('03', { fontSize: 48, fontWeight: 100, color: '#cccccc' }),
            text('Hierarchy', { fontSize: 24, fontWeight: 700, color: '#000000' }),
            text('Size, weight, and position guide the eye through visual narratives.', {
              fontSize: 14, fontWeight: 400, color: '#666666',
              lineHeight: { value: 160, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
      ],
    }),
  ],
});
