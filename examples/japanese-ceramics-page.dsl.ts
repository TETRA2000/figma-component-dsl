import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: musubikiln.com — Porcelain white, warm stone, elegant product cards
const white = '#ffffff'; const cream = '#f8f4ee'; const stone = '#b0a898'; const dark = '#2a2420';
const med = '#7a7068'; const warm = '#c4b098'; const bg = '#faf8f4';

function ceramicCard(name: string, origin: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Ceramic: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined }, cornerRadius: 4, clipContent: true,
    children: [
      rectangle('CeramicImg', { size: { x: 300, y: 300 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('CeramicInfo', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
        text(origin, { fontSize: 10, fontWeight: 400, color: warm, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 16, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med }),
        text(price, { fontSize: 14, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('JapaneseCeramics', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('MUSUBI KILN', { fontSize: 16, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Shop', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Collections', { fontSize: 12, fontWeight: 300, color: med }),
          text('Artisans', { fontSize: 12, fontWeight: 300, color: med }),
          text('Our Story', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        text('Handcrafted Japanese Ceramics', { fontSize: 36, fontWeight: 200, color: dark }),
        text('Connecting artisan traditions to modern tables worldwide', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Featured Collection', { fontSize: 20, fontWeight: 300, color: dark }),
        frame('ProductGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          ceramicCard('Matcha Bowl — Shino Glaze', 'MINO WARE', '¥5,500', 'Soft white crackle glaze with warm undertones', '#e8e0d4', '#d0c4b0'),
          ceramicCard('Sake Set — Oribe', 'MINO WARE', '¥8,800', 'Distinctive green glaze with bold patterns', '#7a8a68', '#a0b088'),
          ceramicCard('Tea Cup — Arita Blue', 'ARITA WARE', '¥3,300', 'Delicate blue underglaze painting on white porcelain', '#b0c0d8', '#8098b8'),
          ceramicCard('Dinner Plate — Mashiko', 'MASHIKO WARE', '¥4,400', 'Earth-toned stoneware with rustic beauty', '#a09080', '#c4b4a0'),
        ]}),
      ],
    }),
  ],
});
