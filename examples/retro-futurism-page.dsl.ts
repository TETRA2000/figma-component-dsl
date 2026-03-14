/**
 * Retro Futurism — 80s-inspired neon, CRT vibes, synthwave palette.
 *
 * DSL features stressed: gradients with multiple stops, strokes with neon colors,
 * cornerRadius, ellipse nodes, opacity, thick strokes.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function neonCard(title: string, desc: string, accentHex: string) {
  return frame(`Card: ${title}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 8,
    strokes: [{ color: hex(accentHex), weight: 2, align: 'INSIDE' }],
    children: [
      ellipse('Dot', {
        size: { x: 12, y: 12 },
        fills: [solid(accentHex)],
      }),
      text(title, {
        fontSize: 22,
        fontWeight: 700,
        color: '#ffffff',
      }),
      text(desc, {
        fontSize: 13,
        fontWeight: 400,
        color: '#8888aa',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('RetroFuturismPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0d0d1a')],
  children: [
    // Hero with gradient grid lines feel
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#0d0d1a', position: 0 },
        { hex: '#1a0a3e', position: 0.5 },
        { hex: '#0d0d1a', position: 1 },
      ], 180)],
      children: [
        text('RETRO FUTURISM', {
          fontSize: 14,
          fontWeight: 600,
          color: '#ff6ec7',
          letterSpacing: { value: 6, unit: 'PIXELS' },
        }),
        text('NEON DREAMS', {
          fontSize: 80,
          fontWeight: 900,
          color: '#ffffff',
        }),
        text('Back to the future of design', {
          fontSize: 20,
          fontWeight: 400,
          color: '#6666aa',
        }),
        frame('CTA', {
          autoLayout: horizontal({ padX: 36, padY: 14 }),
          fills: [gradient([
            { hex: '#ff6ec7', position: 0 },
            { hex: '#7b2ff7', position: 1 },
          ], 90)],
          cornerRadius: 4,
          children: [
            text('ENTER THE GRID', {
              fontSize: 14,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: { value: 2, unit: 'PIXELS' },
            }),
          ],
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        neonCard('SYNTHWAVE', 'Nostalgic beats meet futuristic visuals in a neon-drenched landscape.', '#ff6ec7'),
        neonCard('CYBERPUNK', 'High tech, low life. The aesthetic of tomorrow, today.', '#00ffff'),
        neonCard('OUTRUN', 'Speeding through digital highways under a purple sunset.', '#7b2ff7'),
      ],
    }),
  ],
});
