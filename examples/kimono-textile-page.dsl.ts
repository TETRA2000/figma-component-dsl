import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Kimono boutique — Deep indigo, traditional patterns as color blocks, elegant
const indigo = '#1a237e'; const white = '#f8f6f0'; const gold = '#b8982e'; const dark = '#0a0a1e';
const silver = '#9098a8'; const lightIndigo = '#3949ab'; const cream = '#f0ece0';

function kimonoCard(name: string, technique: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Kimono: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 280, y: undefined }, cornerRadius: 2, clipContent: true,
    fills: [solid(white)],
    children: [
      rectangle('FabricImg', { size: { x: 280, y: 340 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 160)] }),
      frame('KimonoInfo', { autoLayout: vertical({ spacing: 6, padX: 18, padY: 16 }), layoutSizingHorizontal: 'FILL', children: [
        text(technique, { fontSize: 10, fontWeight: 400, color: lightIndigo, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 16, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: silver }),
        text(price, { fontSize: 15, fontWeight: 400, color: indigo }),
      ]}),
    ],
  });
}

export default frame('KimonoTextileShop', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('染  織  堂', { fontSize: 22, fontWeight: 300, color: indigo, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Kimono', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Obi', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Fabrics', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Artisans', { fontSize: 12, fontWeight: 300, color: silver }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a1e', position: 0 }, { hex: '#1a237e', position: 0.4 }, { hex: '#3949ab', position: 1 }], 180)],
      children: [
        text('伝統の美', { fontSize: 14, fontWeight: 300, color: gold, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('The beauty of tradition', { fontSize: 42, fontWeight: 200, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text('Kyoto\'s finest hand-dyed textiles, woven with centuries of artistry', { fontSize: 14, fontWeight: 300, color: silver }),
        rectangle('GoldAccent', { size: { x: 50, y: 1 }, fills: [solid(gold, 0.5)] }),
      ],
    }),
    frame('Collection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 6 }), children: [
          text('COLLECTION', { fontSize: 11, fontWeight: 400, color: indigo, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Seasonal Kimono', { fontSize: 24, fontWeight: 200, color: dark }),
        ]}),
        frame('KimonoGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          kimonoCard('Yuzen Furisode', 'KAGA YUZEN', '¥580,000', 'Hand-painted cherry blossoms on silk crepe', '#1a237e', '#3949ab'),
          kimonoCard('Shibori Komon', 'ARIMATSU SHIBORI', '¥180,000', 'Indigo tie-dye with fine dot pattern', '#141e5e', '#283593'),
          kimonoCard('Nishijin Obi', 'NISHIJIN-ORI', '¥320,000', 'Gold-threaded brocade weave on silk', '#2a2040', '#4a3a60'),
          kimonoCard('Tsumugi Pongee', 'OSHIMA TSUMUGI', '¥420,000', 'Mud-dyed silk with geometric kasuri pattern', '#1a1a30', '#2e2e4e'),
        ]}),
      ],
    }),
  ],
});
