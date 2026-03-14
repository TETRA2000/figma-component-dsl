import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Premium sushi omakase — Black + gold, clean grid, luxury dining
const black = '#0a0a0a'; const gold = '#c8a44e'; const white = '#f5f0e8'; const dark = '#141210';
const silver = '#9a9890'; const deepGold = '#8a6a2e';

function sushiItem(name: string, nameJp: string, price: string, desc: string) {
  return frame(`Sushi: ${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid('#111111')], cornerRadius: 2,
    strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.15 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('SushiImg', { size: { x: 64, y: 64 },
        fills: [gradient([{ hex: '#2a2420', position: 0 }, { hex: '#3a3028', position: 1 }], 135)],
        strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.2 }, weight: 1, align: 'INSIDE' as const }] }),
      frame('SushiInfo', { autoLayout: vertical({ spacing: 3 }), layoutSizingHorizontal: 'FILL', children: [
        frame('NameRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          text(name, { fontSize: 15, fontWeight: 400, color: white }),
          text(nameJp, { fontSize: 12, fontWeight: 300, color: gold }),
        ]}),
        text(desc, { fontSize: 11, fontWeight: 300, color: silver }),
      ]}),
      text(price, { fontSize: 14, fontWeight: 400, color: gold }),
    ],
  });
}

export default frame('SushiRestaurant', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(black)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('鮨  匠', { fontSize: 24, fontWeight: 300, color: gold, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Omakase', { fontSize: 12, fontWeight: 400, color: white }),
          text('Reservations', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Philosophy', { fontSize: 12, fontWeight: 300, color: silver }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a0a', position: 0 }, { hex: '#1a1614', position: 0.5 }, { hex: '#0a0a0a', position: 1 }], 180)],
      children: [
        text('OMAKASE', { fontSize: 12, fontWeight: 400, color: gold, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('Trust the chef', { fontSize: 48, fontWeight: 200, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        rectangle('GoldLine', { size: { x: 60, y: 1 }, fills: [solid(gold, 0.4)] }),
        text('A twelve-course journey through the finest seasonal ingredients', { fontSize: 14, fontWeight: 300, color: silver }),
      ],
    }),
    frame('MenuSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 6 }), children: [
          text('TONIGHT\'S SELECTION', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Seasonal Omakase', { fontSize: 24, fontWeight: 200, color: white }),
        ]}),
        frame('SushiList', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
          sushiItem('Otoro', 'おとろ', '¥1,200', 'Fatty bluefin tuna belly — melt-in-mouth richness'),
          sushiItem('Uni', 'うに', '¥980', 'Hokkaido sea urchin — creamy, briny sweetness'),
          sushiItem('Kohada', 'こはだ', '¥600', 'Gizzard shad — vinegar-cured with delicate shimmer'),
          sushiItem('Anago', 'あなご', '¥750', 'Sea eel — brushed with sweet soy reduction'),
          sushiItem('Ikura', 'いくら', '¥850', 'Salmon roe — bursting jewels of ocean flavor'),
        ]}),
      ],
    }),
  ],
});
