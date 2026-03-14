import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: francfranc.com — White background, soft accents, lifestyle product grid, pastel
const white = '#ffffff'; const pink = '#f0b0c0'; const lavender = '#c0b0d8'; const mint = '#a0d8c8';
const dark = '#2a2a2a'; const med = '#808080'; const bg = '#fafafa'; const warmPink = '#e898a8';

function lifestyleCard(name: string, category: string, price: string, color: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 240, y: undefined }, fills: [solid(white)], cornerRadius: 8,
    children: [
      rectangle('ProductImg', { size: { x: 240, y: 240 }, fills: [solid(color, 0.12)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(category, { fontSize: 10, fontWeight: 400, color, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 13, fontWeight: 500, color: dark }),
        text(price, { fontSize: 13, fontWeight: 600, color: dark }),
      ]}),
    ],
  });
}

export default frame('FrancfrancLifestyle', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('Francfranc', { fontSize: 20, fontWeight: 400, color: dark }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('New In', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Furniture', { fontSize: 12, fontWeight: 400, color: med }),
          text('Kitchen', { fontSize: 12, fontWeight: 400, color: med }),
          text('Interior', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
        frame('CartBtn', { autoLayout: horizontal({ padX: 16, padY: 6 }), fills: [solid(pink)], cornerRadius: 9999,
          children: [text('Cart (2)', { fontSize: 11, fontWeight: 500, color: white })] }),
      ],
    }),
    frame('Hero', {
      autoLayout: horizontal({ padX: 60, padY: 40, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(pink, 0.08)],
      children: [
        frame('HeroText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('Spring Living', { fontSize: 36, fontWeight: 300, color: dark }),
          text('Brighten your home with soft pastels\nand playful accents for the new season', { fontSize: 14, fontWeight: 400, color: med, lineHeight: { value: 22, unit: 'PIXELS' as const } }),
          frame('ShopBtn', { autoLayout: horizontal({ padX: 24, padY: 10 }), fills: [solid(warmPink)], cornerRadius: 9999,
            children: [text('Shop Collection', { fontSize: 13, fontWeight: 500, color: white })] }),
        ]}),
        rectangle('HeroImg', { size: { x: 500, y: 300 },
          fills: [gradient([{ hex: '#f0b0c0', position: 0 }, { hex: '#c0b0d8', position: 0.5 }, { hex: '#a0d8c8', position: 1 }], 135)], cornerRadius: 12 }),
      ],
    }),
    frame('CategorySection', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Shop by Category', { fontSize: 18, fontWeight: 500, color: dark }),
        frame('CategoryRow', { autoLayout: horizontal({ spacing: 14 }), children: [
          frame('Cat1', { autoLayout: vertical({ spacing: 6, padX: 24, padY: 20, counterAlign: 'CENTER' }), fills: [solid(pink, 0.08)], cornerRadius: 12, size: { x: 200, y: undefined }, children: [
            ellipse('CatIcon1', { size: { x: 40, y: 40 }, fills: [solid(pink, 0.2)] }),
            text('Living Room', { fontSize: 13, fontWeight: 500, color: dark }),
          ]}),
          frame('Cat2', { autoLayout: vertical({ spacing: 6, padX: 24, padY: 20, counterAlign: 'CENTER' }), fills: [solid(lavender, 0.08)], cornerRadius: 12, size: { x: 200, y: undefined }, children: [
            ellipse('CatIcon2', { size: { x: 40, y: 40 }, fills: [solid(lavender, 0.2)] }),
            text('Bedroom', { fontSize: 13, fontWeight: 500, color: dark }),
          ]}),
          frame('Cat3', { autoLayout: vertical({ spacing: 6, padX: 24, padY: 20, counterAlign: 'CENTER' }), fills: [solid(mint, 0.08)], cornerRadius: 12, size: { x: 200, y: undefined }, children: [
            ellipse('CatIcon3', { size: { x: 40, y: 40 }, fills: [solid(mint, 0.2)] }),
            text('Kitchen', { fontSize: 13, fontWeight: 500, color: dark }),
          ]}),
          frame('Cat4', { autoLayout: vertical({ spacing: 6, padX: 24, padY: 20, counterAlign: 'CENTER' }), fills: [solid('#e8d898', 0.08)], cornerRadius: 12, size: { x: 200, y: undefined }, children: [
            ellipse('CatIcon4', { size: { x: 40, y: 40 }, fills: [solid('#e8d898', 0.2)] }),
            text('Bath', { fontSize: 13, fontWeight: 500, color: dark }),
          ]}),
        ]}),
      ],
    }),
    frame('ProductGridSection', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Trending Now', { fontSize: 18, fontWeight: 500, color: dark }),
        frame('Grid', { autoLayout: horizontal({ spacing: 14 }), children: [
          lifestyleCard('Aroma Diffuser', 'Interior', '¥4,980', lavender),
          lifestyleCard('Cushion Cover', 'Living', '¥2,980', pink),
          lifestyleCard('Candle Set', 'Interior', '¥3,480', mint),
          lifestyleCard('Flower Vase', 'Interior', '¥4,280', warmPink),
          lifestyleCard('Table Lamp', 'Lighting', '¥7,980', '#e8d898'),
        ]}),
      ],
    }),
  ],
});
