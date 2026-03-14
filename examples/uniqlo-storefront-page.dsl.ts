import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: uniqlo.com — Bold red branding, clean product grid, sharp edges
const red = '#ff0000'; const white = '#ffffff'; const dark = '#111111'; const med = '#666666'; const bg = '#f5f5f5'; const charcoal = '#333333';

function productTile(name: string, price: string, originalPrice: string | null, color: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 260, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('ProductImg', { size: { x: 260, y: 320 }, fills: [solid(color, 0.08)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 13, fontWeight: 400, color: dark }),
        frame('PriceRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          text(price, { fontSize: 15, fontWeight: 700, color: originalPrice ? red : dark }),
          ...(originalPrice ? [text(originalPrice, { fontSize: 12, fontWeight: 400, color: med })] : []),
        ]}),
      ]}),
    ],
  });
}

export default frame('UniqloStorefront', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('TopBanner', {
      autoLayout: horizontal({ padX: 0, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(red)],
      children: [text('FREE SHIPPING ON ORDERS OVER ¥4,990', { fontSize: 11, fontWeight: 600, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } })],
    }),
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Logo', { autoLayout: horizontal({ padX: 10, padY: 6 }), fills: [solid(red)],
          children: [text('UNIQLO', { fontSize: 18, fontWeight: 700, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } })] }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Women', { fontSize: 13, fontWeight: 500, color: dark }),
          text('Men', { fontSize: 13, fontWeight: 500, color: dark }),
          text('Kids', { fontSize: 13, fontWeight: 500, color: dark }),
          text('Baby', { fontSize: 13, fontWeight: 500, color: dark }),
        ]}),
        frame('Actions', { autoLayout: horizontal({ spacing: 16 }), children: [
          text('Search', { fontSize: 13, fontWeight: 400, color: dark }),
          text('Cart (0)', { fontSize: 13, fontWeight: 400, color: dark }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 48 }),
      layoutSizingHorizontal: 'FILL', fills: [solid(bg)],
      children: [
        text('HEATTECH', { fontSize: 48, fontWeight: 700, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Innovative warmth technology. Lightweight, comfortable, and heat-retaining.', { fontSize: 15, fontWeight: 400, color: med }),
        frame('ShopBtn', { autoLayout: horizontal({ padX: 28, padY: 12 }), fills: [solid(dark)],
          children: [text('SHOP NOW', { fontSize: 13, fontWeight: 600, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('GridHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('Limited Offers', { fontSize: 18, fontWeight: 700, color: dark }),
          text('View All', { fontSize: 13, fontWeight: 400, color: red }),
        ]}),
        frame('Grid', { autoLayout: horizontal({ spacing: 16 }), children: [
          productTile('Ultra Light Down Jacket', '¥5,990', '¥7,990', red),
          productTile('Cashmere Crew Neck Sweater', '¥9,990', null, charcoal),
          productTile('Stretch Slim Fit Jeans', '¥3,990', '¥4,990', '#1a237e'),
          productTile('Supima Cotton T-Shirt', '¥1,500', null, charcoal),
          productTile('AIRism Cotton Crew Neck', '¥990', null, charcoal),
        ]}),
      ],
    }),
  ],
});
