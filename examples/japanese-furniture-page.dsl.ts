import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: karimoku.com — Warm oak tones, clean product gallery, craftsmanship emphasis
const oak = '#c4a882'; const dark = '#2a2420'; const white = '#faf8f4'; const cream = '#f0ebe0';
const med = '#7a7068'; const warmGray = '#9a9088'; const lightOak = '#e8d8c4';

function furnitureCard(name: string, collection: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Furniture: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 380, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('FurnitureImg', { size: { x: 380, y: 280 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('FurnitureInfo', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 18 }), layoutSizingHorizontal: 'FILL', children: [
        text(collection, { fontSize: 10, fontWeight: 400, color: oak, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 18, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med }),
        text(price, { fontSize: 15, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('JapaneseFurniture', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('KARIMOKU', { fontSize: 16, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Living', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Dining', { fontSize: 12, fontWeight: 300, color: med }),
          text('Bedroom', { fontSize: 12, fontWeight: 300, color: med }),
          text('Office', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 14, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#c4a882', position: 0 }, { hex: '#e8d8c4', position: 0.5 }, { hex: '#f0ebe0', position: 1 }], 180)],
      children: [
        text('CRAFTSMANSHIP SINCE 1940', { fontSize: 11, fontWeight: 400, color: dark, letterSpacing: { value: 5, unit: 'PIXELS' as const } }),
        text('Furniture that ages with grace', { fontSize: 38, fontWeight: 200, color: dark }),
        text('Japanese woodcraft tradition meets contemporary design', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('Products', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Featured Collection', { fontSize: 22, fontWeight: 200, color: dark }),
        frame('ProductGrid', { autoLayout: horizontal({ spacing: 20 }), children: [
          furnitureCard('Lounge Chair', 'CASTOR SERIES', '¥198,000', 'Solid oak frame with woven paper cord seat', '#d4c4a8', '#b8a888'),
          furnitureCard('Dining Table', 'HIDA COLLECTION', '¥385,000', 'Hand-planed Japanese oak with butterfly joints', '#c0a880', '#a08860'),
          furnitureCard('Side Table', 'COLOUR WOOD', '¥68,200', 'Steam-bent plywood in natural oak finish', '#e0d0b8', '#c8b898'),
        ]}),
      ],
    }),
    frame('CraftSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        rectangle('CraftImg', { size: { x: 400, y: 300 },
          fills: [gradient([{ hex: '#8a7860', position: 0 }, { hex: '#c4a882', position: 0.5 }, { hex: '#e8d8c4', position: 1 }], 135)] }),
        frame('CraftText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('OUR CRAFT', { fontSize: 11, fontWeight: 400, color: oak, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Wood speaks to those who listen', { fontSize: 26, fontWeight: 200, color: dark }),
          text('Every piece begins with selecting the right wood. Our craftsmen in Aichi Prefecture hand-select each plank, understanding that the grain, texture, and character of the wood will define the finished piece for generations.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
      ],
    }),
  ],
});
