import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: kuoekyoto.com — Luxury timepiece, clean white, product-centric, gold accents
const dark = '#1a1410'; const white = '#ffffff'; const gold = '#b89858'; const cream = '#f8f4ec';
const med = '#7a7068'; const lightGold = '#e0d0b8'; const bg = '#faf8f4';

function watchCard(name: string, series: string, price: string, desc: string) {
  return frame(`Watch: ${name}`, {
    autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), size: { x: 320, y: undefined },
    fills: [solid(white)], cornerRadius: 4,
    children: [
      frame('WatchImgWrap', { autoLayout: vertical({ padX: 0, padY: 32, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL', fills: [solid(cream)], children: [
        ellipse('WatchFace', { size: { x: 140, y: 140 },
          fills: [gradient([{ hex: '#f0ece4', position: 0 }, { hex: '#e0d8c8', position: 0.5 }, { hex: '#f0ece4', position: 1 }], 135)],
          strokes: [{ color: { r: 0.72, g: 0.6, b: 0.35, a: 0.4 }, weight: 2, align: 'INSIDE' as const }] }),
      ]}),
      frame('WatchInfo', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 18, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        text(series, { fontSize: 10, fontWeight: 400, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 17, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med }),
        text(price, { fontSize: 15, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('KuoeKyotoWatches', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('KUOE KYOTO', { fontSize: 16, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Collection', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Story', { fontSize: 12, fontWeight: 300, color: med }),
          text('Craft', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        text('KYOTO TIMEPIECES', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Time, crafted in Kyoto', { fontSize: 38, fontWeight: 200, color: dark }),
        text('Classic designs inspired by vintage timepieces, made with modern precision', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('Collection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('The Collection', { fontSize: 22, fontWeight: 200, color: dark }),
        frame('WatchGrid', { autoLayout: horizontal({ spacing: 20 }), children: [
          watchCard('Old Smith 90-001', 'OLD SMITH SERIES', '¥29,700', 'Domed mineral glass, 35mm case, vintage denim strap'),
          watchCard('Old Smith 90-002', 'OLD SMITH SERIES', '¥29,700', 'Cream dial, blued hands, Italian leather strap'),
          watchCard('Royal Smith 90-006', 'ROYAL SMITH SERIES', '¥33,000', 'Date complication, 38mm case, stainless mesh bracelet'),
          watchCard('Old Smith 90-003', 'OLD SMITH SERIES', '¥31,900', 'Black dial, cathedral hands, cordovan leather strap'),
        ]}),
      ],
    }),
  ],
});
