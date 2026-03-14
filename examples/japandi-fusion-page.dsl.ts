import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Pantechnicon-style Japandi — Warm neutrals, Japanese-Nordic fusion, clean lines
const oak = '#c4a878'; const dark = '#2a2620'; const white = '#faf8f4'; const linen = '#ede8dc';
const med = '#7a7468'; const sage = '#8a9478'; const warmGray = '#b0a898';

function productCard(name: string, origin: string, price: string, g1: string, g2: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('ProductImg', { size: { x: 300, y: 300 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ProductInfo', { autoLayout: vertical({ spacing: 4, padX: 18, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(origin, { fontSize: 10, fontWeight: 400, color: sage, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 15, fontWeight: 300, color: dark }),
        text(price, { fontSize: 14, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('JapandiFusion', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(linen)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('PANTECHNICON', { fontSize: 14, fontWeight: 300, color: dark, letterSpacing: { value: 5, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Shop', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Cafe', { fontSize: 12, fontWeight: 300, color: med }),
          text('Journal', { fontSize: 12, fontWeight: 300, color: med }),
          text('About', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 14, padX: 80, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('JAPANDI', { fontSize: 11, fontWeight: 400, color: sage, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('Where east meets north', { fontSize: 40, fontWeight: 200, color: dark }),
        text('Curated objects that embody the shared values of Japanese and Scandinavian design', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Curated Collection', { fontSize: 20, fontWeight: 200, color: dark }),
        frame('Grid', { autoLayout: horizontal({ spacing: 16 }), children: [
          productCard('Hasami Cup', 'JAPAN — NAGASAKI', '£28', '#d0c4b0', '#e8dcc8'),
          productCard('Normann Carafe', 'DENMARK — COPENHAGEN', '£45', '#b0b0a0', '#d0d0c8'),
          productCard('Kinto Teapot', 'JAPAN — SHIGA', '£65', '#c0b098', '#e0d4c0'),
          productCard('HAY Tray Table', 'DENMARK — HORSENS', '£120', '#a0a090', '#c8c8b8'),
        ]}),
      ],
    }),
    frame('PhilosophySection', {
      autoLayout: horizontal({ padX: 80, padY: 60, spacing: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('PhiloText', { autoLayout: vertical({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
          text('SHARED VALUES', { fontSize: 11, fontWeight: 400, color: sage, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Less, but better', { fontSize: 28, fontWeight: 200, color: dark }),
          text('Japanese wabi-sabi and Nordic hygge share a deep appreciation for simplicity, natural materials, and objects that improve with age. Japandi is not a trend — it is a philosophy.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 420 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('Principles', { autoLayout: vertical({ spacing: 10 }), size: { x: 360, y: undefined }, children: [
          frame('P1', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(linen)], cornerRadius: 4, children: [
            text('Simplicity', { fontSize: 14, fontWeight: 400, color: dark }),
          ]}),
          frame('P2', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(linen)], cornerRadius: 4, children: [
            text('Natural Materials', { fontSize: 14, fontWeight: 400, color: dark }),
          ]}),
          frame('P3', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(linen)], cornerRadius: 4, children: [
            text('Functional Beauty', { fontSize: 14, fontWeight: 400, color: dark }),
          ]}),
          frame('P4', { autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12 }), layoutSizingHorizontal: 'FILL', fills: [solid(linen)], cornerRadius: 4, children: [
            text('Craftsmanship', { fontSize: 14, fontWeight: 400, color: dark }),
          ]}),
        ]}),
      ],
    }),
  ],
});
