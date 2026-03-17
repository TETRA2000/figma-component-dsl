import { frame, canvas, text, rectangle } from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { vertical } from '@figma-dsl/core';

export default frame('Page', {
  size: { x: 800, y: 600 },
  fills: [solid('#ffffff')],
  autoLayout: { direction: 'VERTICAL', spacing: 24, padX: 32, padY: 32 },
  children: [
    text('Canvas Demo', { fontSize: 32, fontWeight: 700, color: '#1a1a1a' }),

    canvas('HeroBanner', {
      size: { x: 736, y: 300 },
      fills: [solid('#2563eb')],
      children: [
        ...vertical('Content', {
          size: { x: 736, y: 300 },
          spacing: 16,
          align: 'CENTER',
          counterAlign: 'CENTER',
          children: [
            text('Welcome', { fontSize: 48, fontWeight: 700, color: '#ffffff' }),
            text('This is rendered as a pixel-perfect image', { fontSize: 18, color: '#e0e7ff' }),
          ],
        }),
      ],
    }),

    canvas('StatsBar', {
      size: { x: 736, y: 80 },
      fills: [solid('#f8fafc')],
      scale: 2,
      children: [
        rectangle('Border', {
          size: { x: 736, y: 80 },
          fills: [solid('#e2e8f0')],
          cornerRadius: 8,
        }),
      ],
    }),
  ],
});
