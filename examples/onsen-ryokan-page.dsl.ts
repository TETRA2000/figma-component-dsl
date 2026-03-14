import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: ryokan-yuen.jp — Warm earth tones, zen calm, generous whitespace
const clay = '#a0826d'; const sand = '#d4c4a8'; const bamboo = '#8b7355'; const white = '#faf8f5';
const dark = '#3d2e1e'; const med = '#8c7a68'; const cream = '#f5efe5';

function roomCard(name: string, desc: string, price: string, g1: string, g2: string) {
  return frame(`Room: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 380, y: undefined }, cornerRadius: 4, clipContent: true,
    children: [
      rectangle('RoomImg', { size: { x: 380, y: 240 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('RoomInfo', { autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)], children: [
        text(name, { fontSize: 18, fontWeight: 300, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med, size: { x: 332 }, textAutoResize: 'HEIGHT' as const }),
        rectangle('Divider', { size: { x: 40, y: 1 }, fills: [solid(clay, 0.4)] }),
        text(price, { fontSize: 14, fontWeight: 400, color: clay }),
      ]}),
    ],
  });
}

export default frame('OnsenRyokan', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('湯  宿', { fontSize: 24, fontWeight: 300, color: dark, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 32 }), children: [
          text('Rooms', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Onsen', { fontSize: 12, fontWeight: 400, color: med }),
          text('Cuisine', { fontSize: 12, fontWeight: 400, color: med }),
          text('Access', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
        frame('ReserveBtn', { autoLayout: horizontal({ padX: 24, padY: 8 }),
          strokes: [{ color: { r: 0.63, g: 0.51, b: 0.43, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [text('Reserve', { fontSize: 12, fontWeight: 400, color: clay })] }),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#f5efe5', position: 0 }, { hex: '#e8ddd0', position: 0.5 }, { hex: '#d4c4a8', position: 1 }], 180)],
      children: [
        text('心と体を癒す', { fontSize: 14, fontWeight: 300, color: clay, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('Healing for body and soul', { fontSize: 42, fontWeight: 200, color: dark, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        text('A traditional Japanese inn where time slows down', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('Rooms', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 60 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          text('ROOMS', { fontSize: 11, fontWeight: 400, color: clay, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Guest Rooms', { fontSize: 26, fontWeight: 200, color: dark }),
        ]}),
        frame('RoomGrid', { autoLayout: horizontal({ spacing: 20, align: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          roomCard('Tatami Suite', 'Traditional tatami flooring with shoji screens. Private open-air bath overlooking the garden.', 'From ¥48,000 per night', '#a0826d', '#c4a882'),
          roomCard('Garden View', 'Serene room facing the inner garden. Japanese futon bedding on tatami.', 'From ¥32,000 per night', '#7a8868', '#a0b088'),
          roomCard('Cypress Bath Room', 'Hinoki cypress private bath. Panoramic mountain views.', 'From ¥55,000 per night', '#8b7355', '#b0986d'),
        ]}),
      ],
    }),
    frame('OnsenSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(cream)],
      children: [
        rectangle('OnsenImg', { size: { x: 480, y: 320 },
          fills: [gradient([{ hex: '#8b9478', position: 0 }, { hex: '#a0826d', position: 0.5 }, { hex: '#d4c4a8', position: 1 }], 135)],
          cornerRadius: 4 }),
        frame('OnsenText', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('ONSEN', { fontSize: 11, fontWeight: 400, color: clay, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Natural Hot Springs', { fontSize: 28, fontWeight: 200, color: dark }),
          text('Our alkaline hot spring waters flow directly from the source, rich in minerals that soothe tired muscles and restore your skin. Open-air baths surrounded by nature offer a meditative experience.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
      ],
    }),
  ],
});
