import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Cherry blossom season — Soft pink #FFB7C5, white, pale green, seasonal landing
const sakura = '#ffb7c5'; const white = '#ffffff'; const paleGreen = '#c8e0c0'; const dark = '#3a2830';
const med = '#8a7078'; const blush = '#fce4ec'; const deepPink = '#e08098'; const bg = '#fef8fa';

function spotCard(name: string, location: string, peak: string, desc: string) {
  return frame(`Spot: ${name}`, {
    autoLayout: vertical({ spacing: 6, padX: 18, padY: 16 }), size: { x: 280, y: undefined },
    fills: [solid(white)], cornerRadius: 12,
    children: [
      frame('PeakTag', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(sakura, 0.2)], cornerRadius: 9999,
        children: [text(peak, { fontSize: 9, fontWeight: 500, color: deepPink })] }),
      text(name, { fontSize: 16, fontWeight: 400, color: dark }),
      text(location, { fontSize: 11, fontWeight: 400, color: deepPink }),
      text(desc, { fontSize: 12, fontWeight: 300, color: med }),
    ],
  });
}

export default frame('SakuraSeason', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('SAKURA GUIDE', { fontSize: 14, fontWeight: 400, color: deepPink, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Forecast', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Best Spots', { fontSize: 12, fontWeight: 400, color: med }),
          text('Hanami Tips', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#fce4ec', position: 0 }, { hex: '#ffb7c5', position: 0.4 }, { hex: '#f8bbd0', position: 0.7 }, { hex: '#fce4ec', position: 1 }], 180)],
      children: [
        text('SPRING 2026', { fontSize: 11, fontWeight: 400, color: deepPink, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Cherry Blossom Season', { fontSize: 42, fontWeight: 200, color: dark }),
        text('Japan\'s most beloved season — when millions of cherry trees burst into bloom', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('ForecastSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('2026 Bloom Forecast', { fontSize: 20, fontWeight: 300, color: dark }),
        frame('ForecastRow', { autoLayout: horizontal({ spacing: 12 }), children: [
          frame('FC1', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 14, counterAlign: 'CENTER' }), fills: [solid(white)], cornerRadius: 8, size: { x: 180, y: undefined }, children: [
            text('Tokyo', { fontSize: 14, fontWeight: 400, color: dark }),
            text('March 22', { fontSize: 18, fontWeight: 300, color: deepPink }),
            text('Full bloom', { fontSize: 11, fontWeight: 300, color: med }),
          ]}),
          frame('FC2', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 14, counterAlign: 'CENTER' }), fills: [solid(white)], cornerRadius: 8, size: { x: 180, y: undefined }, children: [
            text('Kyoto', { fontSize: 14, fontWeight: 400, color: dark }),
            text('March 28', { fontSize: 18, fontWeight: 300, color: deepPink }),
            text('Full bloom', { fontSize: 11, fontWeight: 300, color: med }),
          ]}),
          frame('FC3', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 14, counterAlign: 'CENTER' }), fills: [solid(white)], cornerRadius: 8, size: { x: 180, y: undefined }, children: [
            text('Osaka', { fontSize: 14, fontWeight: 400, color: dark }),
            text('March 26', { fontSize: 18, fontWeight: 300, color: deepPink }),
            text('Full bloom', { fontSize: 11, fontWeight: 300, color: med }),
          ]}),
          frame('FC4', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 14, counterAlign: 'CENTER' }), fills: [solid(white)], cornerRadius: 8, size: { x: 180, y: undefined }, children: [
            text('Hokkaido', { fontSize: 14, fontWeight: 400, color: dark }),
            text('May 3', { fontSize: 18, fontWeight: 300, color: deepPink }),
            text('Full bloom', { fontSize: 11, fontWeight: 300, color: med }),
          ]}),
        ]}),
      ],
    }),
    frame('BestSpots', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 40 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('Best Viewing Spots', { fontSize: 20, fontWeight: 300, color: dark }),
        frame('SpotGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          spotCard('Meguro River', 'Tokyo', 'PEAK: MAR 25-31', 'Over 800 cherry trees lining the canal, stunning at night with pink lanterns'),
          spotCard('Philosopher\'s Path', 'Kyoto', 'PEAK: APR 1-7', 'A two-kilometer stone path beneath a canopy of hundreds of cherry trees'),
          spotCard('Yoshino Mountain', 'Nara', 'PEAK: APR 5-15', '30,000 cherry trees covering the mountainside in waves of pink'),
          spotCard('Hirosaki Castle', 'Aomori', 'PEAK: APR 20-28', 'Petals floating on the moat create a pink river around the castle'),
        ]}),
      ],
    }),
  ],
});
