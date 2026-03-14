/**
 * Neon Noir — Film noir meets neon, moody dark with electric accents.
 *
 * DSL features stressed: gradient backgrounds, neon strokes, opacity fills,
 * mixed counterAlign, ellipse indicators, dark fills.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function noirCard(title: string, desc: string, neonColor: string) {
  return frame(`Card: ${title}`, {
    size: { x: 420, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid('#111118')],
    cornerRadius: 4,
    strokes: [{ color: hex(neonColor + '60'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('StatusRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(neonColor)] }),
          text('ACTIVE', { fontSize: 10, fontWeight: 600, color: neonColor, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        ],
      }),
      text(title, { fontSize: 24, fontWeight: 700, color: '#e8e8f0' }),
      text(desc, { fontSize: 14, fontWeight: 400, color: '#6a6a80', lineHeight: { value: 160, unit: 'PERCENT' }, layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

export default frame('NeonNoirPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#08080e')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#08080e', position: 0 },
        { hex: '#15152a', position: 0.5 },
        { hex: '#08080e', position: 1 },
      ], 180)],
      children: [
        text('NEON NOIR', { fontSize: 14, fontWeight: 600, color: '#ff4488', letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('City of Shadows', { fontSize: 72, fontWeight: 800, color: '#ffffff' }),
        text('Where darkness and light collide in electric tension.', { fontSize: 18, fontWeight: 400, color: '#5a5a70' }),
      ],
    }),
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        noirCard('Detective', 'Tracing digital footprints through the neon-lit corridors of cyberspace.', '#ff4488'),
        noirCard('Informant', 'Whispered data streams carry secrets of the underground network.', '#44ff88'),
        noirCard('Architect', 'Building invisible structures in the spaces between the lights.', '#4488ff'),
      ],
    }),
  ],
});
