/**
 * Kinetic Typography — Large bold text, overlapping sizes, dynamic weight contrast.
 *
 * DSL features stressed: extreme font sizes (120+), mixed font weights (100-900),
 * negative-looking tight layouts, text color variety, letterSpacing.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('KineticTypographyPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#111111')],
  children: [
    // Nav
    frame('Nav', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('KINETIC', {
          fontSize: 14,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: { value: 4, unit: 'PIXELS' },
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('Work', { fontSize: 14, fontWeight: 400, color: '#888888' }),
            text('About', { fontSize: 14, fontWeight: 400, color: '#888888' }),
            text('Contact', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
      ],
    }),

    // Main typography hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('TYPE', {
          fontSize: 160,
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: { value: 90, unit: 'PERCENT' },
        }),
        text('IS', {
          fontSize: 160,
          fontWeight: 100,
          color: '#333333',
          lineHeight: { value: 90, unit: 'PERCENT' },
        }),
        text('POWER', {
          fontSize: 160,
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: { value: 90, unit: 'PERCENT' },
        }),
      ],
    }),

    // Divider
    rectangle('Divider', {
      size: { x: 1, y: 1 },
      fills: [solid('#333333')],
      layoutSizingHorizontal: 'FILL',
    }),

    // Info row
    frame('InfoRow', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 48, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Col1', {
          size: { x: 400, y: undefined },
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('ABOUT', {
              fontSize: 11,
              fontWeight: 700,
              color: '#666666',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
            text('Typography is the art and technique of arranging type to make written language legible and appealing.', {
              fontSize: 16,
              fontWeight: 400,
              color: '#aaaaaa',
              lineHeight: { value: 160, unit: 'PERCENT' },
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        frame('Col2', {
          autoLayout: vertical({ spacing: 16 }),
          children: [
            text('SERVICES', {
              fontSize: 11,
              fontWeight: 700,
              color: '#666666',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
            text('Branding', { fontSize: 16, fontWeight: 400, color: '#aaaaaa' }),
            text('Typography', { fontSize: 16, fontWeight: 400, color: '#aaaaaa' }),
            text('Motion Design', { fontSize: 16, fontWeight: 400, color: '#aaaaaa' }),
          ],
        }),
      ],
    }),
  ],
});
