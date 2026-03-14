import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Japanese garden tour guide — Moss green, stone gray, cherry blossom pink accents
const moss = '#4a6a3a'; const stone = '#8a8878'; const sakura = '#f0b0c0'; const dark = '#2a2820';
const white = '#f8f8f2'; const med = '#6a6858'; const cream = '#f0ece4'; const paleGreen = '#d0e0c0';

function gardenCard(name: string, season: string, desc: string, g1: string, g2: string, accent: string) {
  return frame(`Garden: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined }, cornerRadius: 4, clipContent: true,
    fills: [solid(white)],
    children: [
      rectangle('GardenImg', { size: { x: 300, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('GardenInfo', { autoLayout: vertical({ spacing: 6, padX: 18, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        frame('SeasonTag', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(accent, 0.15)], cornerRadius: 4, children: [
          text(season, { fontSize: 9, fontWeight: 500, color: accent }),
        ]}),
        text(name, { fontSize: 16, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med }),
      ]}),
    ],
  });
}

export default frame('JapaneseGardenTour', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('日本庭園', { fontSize: 20, fontWeight: 300, color: moss, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Gardens', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Seasons', { fontSize: 12, fontWeight: 300, color: med }),
          text('Tours', { fontSize: 12, fontWeight: 300, color: med }),
          text('Guide', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#2a3a20', position: 0 }, { hex: '#4a6a3a', position: 0.3 }, { hex: '#8aaa70', position: 0.6 }, { hex: '#d0e0c0', position: 0.85 }, { hex: '#f0b0c0', position: 1 }], 180)],
      children: [
        text('花鳥風月', { fontSize: 14, fontWeight: 300, color: paleGreen, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('Nature\'s beauty in every season', { fontSize: 40, fontWeight: 200, color: white }),
        text('Explore Japan\'s most exquisite traditional gardens', { fontSize: 14, fontWeight: 300, color: paleGreen }),
      ],
    }),
    frame('FeaturedGardens', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 6 }), children: [
          text('FEATURED GARDENS', { fontSize: 11, fontWeight: 400, color: moss, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Timeless landscapes', { fontSize: 24, fontWeight: 200, color: dark }),
        ]}),
        frame('GardenGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          gardenCard('Kinkaku-ji', 'ALL SEASONS', 'Golden Pavilion reflected in mirror pond, surrounded by pine', '#4a6a3a', '#8aaa70', moss),
          gardenCard('Ryoan-ji', 'SPRING', 'Fifteen stones on white gravel — the quintessential zen garden', '#8a8878', '#b0b0a0', stone),
          gardenCard('Kenroku-en', 'AUTUMN', 'One of Japan\'s three great gardens, ablaze with maple colors', '#c8682a', '#e8a868', '#c86828'),
          gardenCard('Kokedera', 'SUMMER', 'The moss temple — 120 varieties of moss carpet the grounds', '#3a5a2a', '#6a8a58', moss),
        ]}),
      ],
    }),
    frame('SeasonSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 16 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('Spring', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(sakura, 0.08)], cornerRadius: 4, children: [
          ellipse('SpringIcon', { size: { x: 32, y: 32 }, fills: [solid(sakura, 0.2)] }),
          text('Spring', { fontSize: 14, fontWeight: 400, color: dark }),
          text('Cherry blossoms', { fontSize: 11, fontWeight: 300, color: med }),
        ]}),
        frame('Summer', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(moss, 0.08)], cornerRadius: 4, children: [
          ellipse('SummerIcon', { size: { x: 32, y: 32 }, fills: [solid(moss, 0.2)] }),
          text('Summer', { fontSize: 14, fontWeight: 400, color: dark }),
          text('Lush green foliage', { fontSize: 11, fontWeight: 300, color: med }),
        ]}),
        frame('Autumn', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid('#c86828', 0.08)], cornerRadius: 4, children: [
          ellipse('AutumnIcon', { size: { x: 32, y: 32 }, fills: [solid('#c86828', 0.2)] }),
          text('Autumn', { fontSize: 14, fontWeight: 400, color: dark }),
          text('Crimson maple leaves', { fontSize: 11, fontWeight: 300, color: med }),
        ]}),
        frame('Winter', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', fills: [solid(stone, 0.08)], cornerRadius: 4, children: [
          ellipse('WinterIcon', { size: { x: 32, y: 32 }, fills: [solid(stone, 0.2)] }),
          text('Winter', { fontSize: 14, fontWeight: 400, color: dark }),
          text('Snow-covered stones', { fontSize: 11, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
  ],
});
