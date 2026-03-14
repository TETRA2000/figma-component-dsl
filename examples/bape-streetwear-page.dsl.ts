import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: bape.com — Streetwear, camo-inspired colors, bold logo, product grid
const black = '#000000'; const white = '#ffffff'; const camo1 = '#4a5a2e'; const camo2 = '#6a7a3e';
const camo3 = '#3a4a20'; const dark = '#1a1a1a'; const med = '#808080'; const bg = '#f5f5f0';

function productCard(name: string, price: string, tag: string | null, g1: string, g2: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 260, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('ProductImg', { size: { x: 260, y: 300 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        ...(tag ? [frame('ProductTag', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(black)],
          children: [text(tag, { fontSize: 9, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] })] : []),
        text(name, { fontSize: 13, fontWeight: 600, color: dark }),
        text(price, { fontSize: 14, fontWeight: 700, color: dark }),
      ]}),
    ],
  });
}

export default frame('BAPEStreetWear', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(black)],
      children: [
        text('A BATHING APE', { fontSize: 16, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('New Arrivals', { fontSize: 12, fontWeight: 500, color: white }),
          text('Shark Hoodies', { fontSize: 12, fontWeight: 400, color: med }),
          text('Camo', { fontSize: 12, fontWeight: 400, color: med }),
          text('Accessories', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('CamoBanner', {
      autoLayout: horizontal({ padX: 48, padY: 40, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#3a4a20', position: 0 }, { hex: '#4a5a2e', position: 0.3 }, { hex: '#6a7a3e', position: 0.6 }, { hex: '#4a5a2e', position: 1 }], 135)],
      children: [
        frame('BannerText', { autoLayout: vertical({ spacing: 8 }), children: [
          text('SS26 COLLECTION', { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('BAPE CAMO\nRE-IMAGINED', { fontSize: 40, fontWeight: 900, color: white, lineHeight: { value: 44, unit: 'PIXELS' as const } }),
          text('The iconic 1ST CAMO returns in new colorways', { fontSize: 14, fontWeight: 400, color: '#c0d0a0' }),
        ]}),
        frame('ShopCTA', { autoLayout: horizontal({ padX: 24, padY: 10 }), fills: [solid(white)],
          children: [text('SHOP NOW', { fontSize: 13, fontWeight: 700, color: black, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
    frame('ProductSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('NEW ARRIVALS', { fontSize: 14, fontWeight: 800, color: dark, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('View All', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
        frame('Grid', { autoLayout: horizontal({ spacing: 14 }), children: [
          productCard('1ST CAMO SHARK FULL ZIP HOODIE', '¥52,800', 'NEW', camo1, camo2),
          productCard('BAPE STA LOW SNEAKER', '¥24,200', 'BESTSELLER', '#2a2a2a', '#4a4a4a'),
          productCard('BABY MILO TEE', '¥9,900', null, '#1a3a5a', '#2a4a6a'),
          productCard('ABC CAMO COLLEGE TEE', '¥13,200', 'NEW', camo3, camo1),
          productCard('SHARK FACE MASK', '¥5,500', null, '#2a2a2a', '#3a3a3a'),
        ]}),
      ],
    }),
  ],
});
