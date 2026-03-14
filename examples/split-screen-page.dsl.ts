/**
 * Split Screen — Dramatic two-tone layout, half dark / half light.
 *
 * DSL features stressed: horizontal FILL children side by side,
 * contrasting fills, mixed alignment, SPACE_BETWEEN footer.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('SplitScreenPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Main split
    frame('Split', {
      size: { x: 1440, y: 600 },
      autoLayout: horizontal({ spacing: 0 }),
      children: [
        // Dark side
        frame('DarkSide', {
          size: { x: 720, y: 600 },
          autoLayout: vertical({ spacing: 24, padX: 80, padY: 80, align: 'MAX' }),
          fills: [solid('#111111')],
          children: [
            text('DARK SIDE', {
              fontSize: 12,
              fontWeight: 600,
              color: '#666666',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
            text('Embrace\nthe Void', {
              fontSize: 56,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: { value: 105, unit: 'PERCENT' },
            }),
            text('Where silence becomes the loudest statement.', {
              fontSize: 16,
              fontWeight: 400,
              color: '#888888',
              lineHeight: { value: 160, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
        // Light side
        frame('LightSide', {
          size: { x: 720, y: 600 },
          autoLayout: vertical({ spacing: 24, padX: 80, padY: 80, align: 'MAX' }),
          fills: [solid('#f5f5f0')],
          children: [
            text('LIGHT SIDE', {
              fontSize: 12,
              fontWeight: 600,
              color: '#aaaaaa',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
            text('Find\nthe Light', {
              fontSize: 56,
              fontWeight: 700,
              color: '#111111',
              lineHeight: { value: 105, unit: 'PERCENT' },
            }),
            text('Where clarity illuminates every intention and purpose.', {
              fontSize: 16,
              fontWeight: 400,
              color: '#666666',
              lineHeight: { value: 160, unit: 'PERCENT' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),

    // Footer bar
    frame('Footer', {
      autoLayout: horizontal({ padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex('#e0e0e0'), weight: 1, align: 'INSIDE' }],
      children: [
        text('© 2026 DUALITY STUDIO', {
          fontSize: 12,
          fontWeight: 400,
          color: '#999999',
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
        frame('FooterLinks', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Instagram', { fontSize: 12, fontWeight: 400, color: '#999999' }),
            text('Twitter', { fontSize: 12, fontWeight: 400, color: '#999999' }),
            text('Dribbble', { fontSize: 12, fontWeight: 400, color: '#999999' }),
          ],
        }),
      ],
    }),
  ],
});
