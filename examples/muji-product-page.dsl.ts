import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: muji.com — Extreme minimalism, whitespace, neutral palette
const bg = '#ffffff'; const dark = '#333333'; const med = '#888888'; const light = '#cccccc'; const bg2 = '#f5f5f5';

function productCard(name: string, category: string, price: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined },
    children: [
      rectangle('ProductImg', { size: { x: 300, y: 300 }, fills: [solid(bg2)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 6, padX: 0, padY: 16 }), layoutSizingHorizontal: 'FILL', children: [
        text(category, { fontSize: 11, fontWeight: 400, color: med }),
        text(name, { fontSize: 14, fontWeight: 400, color: dark }),
        text(price, { fontSize: 14, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('MujiProductPage', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('MUJI', { fontSize: 20, fontWeight: 700, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 32 }), children: [
          text('New Arrivals', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Clothing', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Household', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Stationery', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Food', { fontSize: 13, fontWeight: 400, color: dark }),
        ]}),
        text('Search', { fontSize: 13, fontWeight: 400, color: med }),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 60 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg2)],
      children: [
        text('Found MUJI', { fontSize: 36, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('Simple, quality products for a pleasant life', { fontSize: 15, fontWeight: 300, color: med }),
      ],
    }),
    frame('ProductSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Recommended', { fontSize: 16, fontWeight: 400, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        frame('ProductGrid', { autoLayout: horizontal({ spacing: 24 }), children: [
          productCard('Organic Cotton Crew Neck T-Shirt', 'Clothing', '¥1,990'),
          productCard('Polypropylene Storage Box', 'Household', '¥990'),
          productCard('Gel Ink Ballpoint Pen 0.5mm', 'Stationery', '¥150'),
          productCard('Mild Cleansing Oil', 'Beauty', '¥1,290'),
        ]}),
      ],
    }),
    frame('Philosophy', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('No brand, good quality', { fontSize: 24, fontWeight: 300, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text('MUJI products are born from a careful selection of materials, streamlining of processes, and simplification of packaging.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 500 }, textAutoResize: 'HEIGHT' as const }),
      ],
    }),
  ],
});
