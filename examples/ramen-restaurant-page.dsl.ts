import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: ramen-guide.jp — Bold red, warm wood brown, playful food cards
const red = '#b71c1c'; const wood = '#8b6914'; const dark = '#1a1210'; const white = '#fffaf5';
const cream = '#f5ebe0'; const med = '#6e5a48'; const lightRed = '#e8c4b8';

function ramenCard(name: string, broth: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Ramen: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 280, y: undefined }, cornerRadius: 12, clipContent: true,
    fills: [solid(white)],
    children: [
      rectangle('BowlImg', { size: { x: 280, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('RamenInfo', { autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        frame('NameRow', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          text(name, { fontSize: 16, fontWeight: 700, color: dark }),
          text(price, { fontSize: 16, fontWeight: 700, color: red }),
        ]}),
        text(broth, { fontSize: 11, fontWeight: 600, color: red, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(desc, { fontSize: 12, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

export default frame('RamenRestaurant', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(red)],
      children: [
        text('麺  道  場', { fontSize: 22, fontWeight: 700, color: white, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Menu', { fontSize: 13, fontWeight: 600, color: white }),
          text('Our Story', { fontSize: 13, fontWeight: 400, color: lightRed }),
          text('Locations', { fontSize: 13, fontWeight: 400, color: lightRed }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 14, padX: 60, padY: 56, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1210', position: 0 }, { hex: '#3a2018', position: 0.5 }, { hex: '#8b6914', position: 1 }], 180)],
      children: [
        text('一杯入魂', { fontSize: 14, fontWeight: 400, color: '#c8a060', letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('Soul in Every Bowl', { fontSize: 42, fontWeight: 700, color: white }),
        text('Slow-simmered broths, handmade noodles, crafted daily since 1972', { fontSize: 14, fontWeight: 400, color: '#c0a888' }),
      ],
    }),
    frame('MenuSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          text('Our Ramen', { fontSize: 24, fontWeight: 700, color: dark }),
          text('View Full Menu', { fontSize: 13, fontWeight: 400, color: red }),
        ]}),
        frame('RamenGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          ramenCard('Tonkotsu Classic', 'PORK BONE BROTH', '¥980', 'Rich 18-hour pork bone broth with chashu, ajitama, and nori', '#e8d4c0', '#d0b898'),
          ramenCard('Shoyu Ramen', 'SOY SAUCE BROTH', '¥880', 'Clear soy-based broth with bamboo shoots and green onions', '#c8b8a0', '#a89878'),
          ramenCard('Miso Ramen', 'MISO BROTH', '¥920', 'Hearty Hokkaido miso with butter, corn, and bean sprouts', '#d4c0a0', '#b8a480'),
          ramenCard('Spicy Tantanmen', 'SESAME CHILI BROTH', '¥1,050', 'Fiery sesame broth with ground pork and bok choy', '#c8a080', '#a07050'),
        ]}),
      ],
    }),
  ],
});
