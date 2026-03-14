/**
 * Space Exploration — Cosmic theme, deep purples, starfield simulation, orbital shapes.
 *
 * DSL features stressed: radialGradient, deep dark fills, ellipse as planets,
 * gradient overlays, letterSpacing, opacity.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, radialGradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function planetCard(name: string, desc: string, planetColor: string, planetSize: number) {
  return frame(`Planet: ${name}`, {
    size: { x: 340, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 28, counterAlign: 'CENTER' }),
    fills: [solid('#0a0a1a')],
    cornerRadius: 16,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' }],
    children: [
      ellipse('Planet', { size: { x: planetSize, y: planetSize }, fills: [radialGradient([
        { hex: planetColor, position: 0 },
        { hex: '#000000', position: 1 },
      ], { center: { x: 0.3, y: 0.3 }, radius: 0.6 })] }),
      text(name, { fontSize: 20, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
      text(desc, { fontSize: 13, fontWeight: 400, color: '#6666aa', lineHeight: { value: 160, unit: 'PERCENT' }, textAlignHorizontal: 'CENTER', layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

export default frame('SpaceExplorationPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48 }),
  fills: [radialGradient([
    { hex: '#0f0033', position: 0 },
    { hex: '#050510', position: 1 },
  ], { center: { x: 0.5, y: 0.2 }, radius: 0.8 })],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('DEEP SPACE', { fontSize: 12, fontWeight: 600, color: '#6666cc', letterSpacing: { value: 6, unit: 'PIXELS' } }),
        text('Beyond the Stars', { fontSize: 72, fontWeight: 700, color: '#ffffff' }),
        text('Exploring the infinite cosmos, one pixel at a time.', { fontSize: 18, fontWeight: 400, color: '#8888bb' }),
      ],
    }),
    frame('Planets', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        planetCard('NEBULA', 'A stellar nursery where new stars are born.', '#7b2ff7', 80),
        planetCard('PULSAR', 'Rotating neutron star emitting beams of radiation.', '#00ccff', 64),
        planetCard('QUASAR', 'The most luminous objects in the universe.', '#ff6600', 72),
        planetCard('VOID', 'Empty space between galaxy superclusters.', '#333355', 56),
      ],
    }),
    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
