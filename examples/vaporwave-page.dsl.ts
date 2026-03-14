/**
 * Vaporwave — 90s internet aesthetics, pink/purple/cyan palette, retro vibes.
 *
 * DSL features stressed: gradient fills with neon stops, cornerRadius,
 * mixed strokes, opacity, ellipse shapes, letterSpacing.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function vaporCard(title: string, desc: string, num: string) {
  return frame(`Card: ${title}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
    fills: [solid('#1a0033', 0.8)],
    cornerRadius: 16,
    strokes: [{ color: hex('#ff71ce80'), weight: 1, align: 'INSIDE' }],
    children: [
      text(num, { fontSize: 48, fontWeight: 200, color: '#ff71ce' }),
      text(title, { fontSize: 20, fontWeight: 600, color: '#ffffff' }),
      text(desc, {
        fontSize: 13,
        fontWeight: 400,
        color: '#b4b4d0',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('VaporwavePage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [gradient([
    { hex: '#0f0028', position: 0 },
    { hex: '#1a0044', position: 0.5 },
    { hex: '#0f0028', position: 1 },
  ], 180)],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [gradient([
            { hex: '#ff71ce', position: 0 },
            { hex: '#01cdfe', position: 1 },
          ], 90)],
          cornerRadius: 999,
          children: [
            text('AESTHETIC', { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        text('V A P O R W A V E', {
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
        text('A E S T H E T I C S', {
          fontSize: 24,
          fontWeight: 300,
          color: '#ff71ce',
          letterSpacing: { value: 8, unit: 'PIXELS' },
        }),
        text('Digital nostalgia for an era that never existed.', {
          fontSize: 16,
          fontWeight: 400,
          color: '#8888aa',
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        vaporCard('DIGITAL', 'Pixels and polygons in an endless grid of possibility.', '01'),
        vaporCard('NOSTALGIC', 'Windows 95, early web, and the promise of cyberspace.', '02'),
        vaporCard('SURREAL', 'Roman busts and palm trees in impossible juxtaposition.', '03'),
      ],
    }),

    rectangle('Spacer', { size: { x: 1, y: 64 }, opacity: 0 }),
  ],
});
