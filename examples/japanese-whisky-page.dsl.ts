import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Suntory/Yamazaki — Amber/copper gradients, dark oak background, luxury spirits
const amber = '#c88030'; const copper = '#a06020'; const dark = '#1a1008'; const white = '#f8f0e0';
const silver = '#a0a098'; const cream = '#e8dcc8'; const oakDark = '#2a1c10';

function whiskeyCard(name: string, age: string, price: string, notes: string) {
  return frame(`Whisky: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 24, padY: 24, counterAlign: 'CENTER' }), size: { x: 280, y: undefined },
    fills: [gradient([{ hex: '#1a1008', position: 0 }, { hex: '#2a1c10', position: 1 }], 180)],
    cornerRadius: 4,
    strokes: [{ color: { r: 0.78, g: 0.5, b: 0.19, a: 0.2 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('BottleShape', { size: { x: 40, y: 160 },
        fills: [gradient([{ hex: '#c88030', position: 0 }, { hex: '#a06020', position: 0.3 }, { hex: '#c88030', position: 0.6 }, { hex: '#a06020', position: 1 }], 180)],
        cornerRadius: 4 }),
      text(age, { fontSize: 10, fontWeight: 400, color: amber, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
      text(name, { fontSize: 18, fontWeight: 300, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
      rectangle('AmberLine', { size: { x: 30, y: 1 }, fills: [solid(amber, 0.3)] }),
      text(notes, { fontSize: 11, fontWeight: 300, color: silver }),
      text(price, { fontSize: 15, fontWeight: 400, color: amber }),
    ],
  });
}

export default frame('JapaneseWhisky', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(oakDark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SUNTORY WHISKY', { fontSize: 14, fontWeight: 300, color: amber, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Collection', { fontSize: 12, fontWeight: 400, color: white }),
          text('Distillery', { fontSize: 12, fontWeight: 300, color: silver }),
          text('Heritage', { fontSize: 12, fontWeight: 300, color: silver }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1008', position: 0 }, { hex: '#2a1c10', position: 0.3 }, { hex: '#3a2c18', position: 0.6 }, { hex: '#1a1008', position: 1 }], 180)],
      children: [
        text('YAMAZAKI', { fontSize: 12, fontWeight: 400, color: amber, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('The art of Japanese whisky', { fontSize: 44, fontWeight: 200, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        rectangle('HeroDivider', { size: { x: 50, y: 1 }, fills: [solid(amber, 0.4)] }),
        text('Born in 1923. Crafted in Yamazaki, Osaka — where the art of blending began.', { fontSize: 14, fontWeight: 300, color: silver }),
      ],
    }),
    frame('CollectionSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 6 }), children: [
          text('THE COLLECTION', { fontSize: 11, fontWeight: 400, color: amber, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Single Malt Whisky', { fontSize: 24, fontWeight: 200, color: white }),
        ]}),
        frame('WhiskyGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          whiskeyCard('Yamazaki 12', 'AGED 12 YEARS', '¥15,400', 'Honey, dried fruit, vanilla with a hint of Mizunara oak'),
          whiskeyCard('Yamazaki 18', 'AGED 18 YEARS', '¥44,000', 'Deep amber. Raisin, chocolate, sherry cask complexity'),
          whiskeyCard('Yamazaki 25', 'AGED 25 YEARS', '¥176,000', 'Extraordinarily rich. Red berry, sandalwood, incense'),
          whiskeyCard('Hakushu 12', 'AGED 12 YEARS', '¥15,400', 'Fresh and herbal. Mint, green apple, subtle smoke'),
        ]}),
      ],
    }),
  ],
});
