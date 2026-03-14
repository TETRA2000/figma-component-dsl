import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: shiseido.com — Luxury beauty, elegant typography, soft pink/gold
const rosePink = '#e8c4c8'; const gold = '#c9a96e'; const dark = '#2d1f1f'; const white = '#ffffff';
const cream = '#faf6f2'; const med = '#8c7575'; const light = '#b5a0a0';

function productCard(name: string, line: string, price: string, g1: string, g2: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 280, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('ProductImg', { size: { x: 280, y: 340 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 160)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 20 }), layoutSizingHorizontal: 'FILL', children: [
        text(line, { fontSize: 10, fontWeight: 400, color: gold, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 16, fontWeight: 300, color: dark }),
        text(price, { fontSize: 14, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('ShiseidoBeauty', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('SHISEIDO', { fontSize: 18, fontWeight: 300, color: dark, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Skincare', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Makeup', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Fragrance', { fontSize: 12, fontWeight: 400, color: dark }),
          text('New', { fontSize: 12, fontWeight: 400, color: gold }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: horizontal({ padX: 60, padY: 48, spacing: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#faf6f2', position: 0 }, { hex: '#f0e4e0', position: 0.5 }, { hex: '#e8c4c8', position: 1 }], 135)],
      children: [
        frame('HeroText', { autoLayout: vertical({ spacing: 16 }), size: { x: 500, y: undefined }, children: [
          text('ULTIMUNE', { fontSize: 12, fontWeight: 400, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
          text('Power Infusing Concentrate', { fontSize: 38, fontWeight: 300, color: dark, lineHeight: { value: 48, unit: 'PIXELS' as const } }),
          text('The legendary serum that strengthens skin from within. Powered by our exclusive ImuGeneration Technology.', { fontSize: 14, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
          frame('ShopBtn', { autoLayout: horizontal({ padX: 32, padY: 12 }),
            strokes: [{ color: { r: 0.18, g: 0.12, b: 0.12, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [text('DISCOVER', { fontSize: 12, fontWeight: 400, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' as const } })] }),
        ]}),
        rectangle('HeroProduct', { size: { x: 320, y: 400 },
          fills: [gradient([{ hex: '#c9a96e', position: 0 }, { hex: '#e8c4c8', position: 0.5 }, { hex: '#faf6f2', position: 1 }], 180)],
          cornerRadius: 160 }),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('BESTSELLERS', { fontSize: 12, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('ProductRow', { autoLayout: horizontal({ spacing: 20 }), children: [
          productCard('Benefiance Wrinkle Smoothing Cream', 'BENEFIANCE', '¥8,800', '#e8d5c4', '#c9a96e'),
          productCard('Vital Perfection Uplifting Cream', 'VITAL PERFECTION', '¥15,400', '#d4c4d8', '#a088a8'),
          productCard('Future Solution LX Total Cream', 'FUTURE SOLUTION', '¥38,500', '#c4c8d8', '#8890a8'),
          productCard('Essential Energy Cream', 'ESSENTIAL ENERGY', '¥6,050', '#c8d8c4', '#88a888'),
        ]}),
      ],
    }),
  ],
});
