import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 7-Eleven/Lawson JP — Dense product catalog, colorful categories, promotional grid
const sevenRed = '#e02020'; const sevenGreen = '#00a040'; const sevenOrange = '#ff8c00';
const dark = '#1a1a1a'; const white = '#ffffff'; const bg = '#f5f5f5'; const med = '#666666';
const blue = '#0060a0';

function promoCard(name: string, price: string, tag: string, tagColor: string, bg2: string) {
  return frame(`Promo: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 160, y: undefined }, fills: [solid(white)], cornerRadius: 6,
    children: [
      frame('PromoImgWrap', { autoLayout: vertical({ padX: 0, padY: 20, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL', fills: [solid(bg2, 0.08)], children: [
        rectangle('PromoImg', { size: { x: 80, y: 80 }, fills: [solid(bg2, 0.2)], cornerRadius: 4 }),
      ]}),
      frame('PromoInfo', { autoLayout: vertical({ spacing: 3, padX: 10, padY: 8 }), layoutSizingHorizontal: 'FILL', children: [
        frame('PromoTag', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(tagColor)], cornerRadius: 2,
          children: [text(tag, { fontSize: 8, fontWeight: 700, color: white })] }),
        text(name, { fontSize: 11, fontWeight: 500, color: dark }),
        text(price, { fontSize: 14, fontWeight: 700, color: sevenRed }),
      ]}),
    ],
  });
}

export default frame('ConvenienceStore', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
          frame('LogoStripes', { autoLayout: horizontal({ spacing: 2 }), children: [
            rectangle('S1', { size: { x: 4, y: 24 }, fills: [solid(sevenRed)] }),
            rectangle('S2', { size: { x: 4, y: 24 }, fills: [solid(sevenOrange)] }),
            rectangle('S3', { size: { x: 4, y: 24 }, fills: [solid(sevenGreen)] }),
          ]}),
          text('7-Eleven', { fontSize: 18, fontWeight: 700, color: sevenGreen }),
        ]}),
        frame('Nav', { autoLayout: horizontal({ spacing: 16 }), children: [
          text('Deals', { fontSize: 12, fontWeight: 600, color: sevenRed }),
          text('Food', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Drinks', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Snacks', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Daily', { fontSize: 12, fontWeight: 400, color: dark }),
        ]}),
      ],
    }),
    frame('PromoBanner', {
      autoLayout: horizontal({ padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(sevenRed)],
      children: [
        text('WEEKLY DEALS — Save up to 30% on selected items!', { fontSize: 13, fontWeight: 600, color: white }),
        frame('DealBtn', { autoLayout: horizontal({ padX: 14, padY: 4 }), fills: [solid(white)], cornerRadius: 4,
          children: [text('View All', { fontSize: 11, fontWeight: 600, color: sevenRed })] }),
      ],
    }),
    frame('CategoryBar', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('CatAll', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(sevenGreen)], cornerRadius: 9999,
          children: [text('All', { fontSize: 11, fontWeight: 600, color: white })] }),
        frame('CatOnigiri', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Onigiri', { fontSize: 11, fontWeight: 500, color: dark })] }),
        frame('CatBento', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Bento', { fontSize: 11, fontWeight: 500, color: dark })] }),
        frame('CatSandwich', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Sandwiches', { fontSize: 11, fontWeight: 500, color: dark })] }),
        frame('CatSweets', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Sweets', { fontSize: 11, fontWeight: 500, color: dark })] }),
        frame('CatDrinks', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Drinks', { fontSize: 11, fontWeight: 500, color: dark })] }),
        frame('CatFrozen', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(bg)], cornerRadius: 9999,
          children: [text('Frozen', { fontSize: 11, fontWeight: 500, color: dark })] }),
      ],
    }),
    frame('ProductGridSection', {
      autoLayout: vertical({ spacing: 14, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Today\'s Picks', { fontSize: 16, fontWeight: 700, color: dark }),
        frame('Grid', { autoLayout: horizontal({ spacing: 10 }), children: [
          promoCard('Salmon Onigiri', '¥160', 'POPULAR', sevenGreen, sevenGreen),
          promoCard('Chicken Bento', '¥498', 'NEW', blue, blue),
          promoCard('Egg Sandwich', '¥298', 'SALE', sevenRed, sevenRed),
          promoCard('Matcha Latte', '¥220', 'LIMITED', sevenOrange, sevenOrange),
          promoCard('Melon Pan', '¥140', 'POPULAR', sevenGreen, sevenGreen),
          promoCard('Boss Coffee', '¥150', 'DEAL', sevenRed, sevenRed),
          promoCard('Famichiki', '¥220', 'HOT', sevenOrange, sevenOrange),
          promoCard('Ice Cream Mochi', '¥180', 'NEW', blue, blue),
        ]}),
      ],
    }),
  ],
});
