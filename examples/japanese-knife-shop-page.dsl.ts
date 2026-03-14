import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Japanese knife artisan — Pure black + white, metallic silver gradients, product focus
const black = '#000000'; const white = '#ffffff'; const silver = '#c0c0c0'; const dark = '#1a1a1a';
const med = '#808080'; const lightGray = '#e0e0e0'; const steel = '#8a9098';

function knifeCard(name: string, style: string, price: string, length: string, material: string) {
  return frame(`Knife: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('BladeImg', { size: { x: 300, y: 180 },
        fills: [gradient([{ hex: '#e8e8e8', position: 0 }, { hex: '#c0c0c0', position: 0.3 }, { hex: '#f0f0f0', position: 0.5 }, { hex: '#a0a0a0', position: 0.8 }, { hex: '#d0d0d0', position: 1 }], 90)] }),
      frame('KnifeInfo', { autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }], children: [
        text(style, { fontSize: 10, fontWeight: 400, color: med, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 18, fontWeight: 300, color: dark }),
        rectangle('Divider', { size: { x: 30, y: 1 }, fills: [solid(dark, 0.15)] }),
        frame('Specs', { autoLayout: horizontal({ spacing: 16 }), children: [
          text(length, { fontSize: 11, fontWeight: 400, color: med }),
          text(material, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
        text(price, { fontSize: 16, fontWeight: 400, color: dark }),
      ]}),
    ],
  });
}

export default frame('JapaneseKnifeShop', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('TAKESHI HAMONO', { fontSize: 14, fontWeight: 300, color: dark, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Knives', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Craft', { fontSize: 12, fontWeight: 300, color: med }),
          text('Care', { fontSize: 12, fontWeight: 300, color: med }),
          text('About', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: horizontal({ padX: 80, padY: 60, spacing: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(black)],
      children: [
        frame('HeroText', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          text('HAND-FORGED', { fontSize: 11, fontWeight: 400, color: steel, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
          text('The blade is the soul of the kitchen', { fontSize: 36, fontWeight: 200, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
          text('Each knife is forged by a single craftsman in Sakai, Osaka — the blade-making capital of Japan for over 600 years.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 420 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        rectangle('HeroBlade', { size: { x: 400, y: 200 },
          fills: [gradient([{ hex: '#1a1a1a', position: 0 }, { hex: '#3a3a3a', position: 0.2 }, { hex: '#c0c0c0', position: 0.4 }, { hex: '#f0f0f0', position: 0.5 }, { hex: '#c0c0c0', position: 0.6 }, { hex: '#3a3a3a', position: 0.8 }, { hex: '#1a1a1a', position: 1 }], 90)] }),
      ],
    }),
    frame('ProductSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHead', { autoLayout: vertical({ spacing: 4 }), children: [
          text('COLLECTION', { fontSize: 11, fontWeight: 400, color: med, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Essential Japanese Knives', { fontSize: 24, fontWeight: 200, color: dark }),
        ]}),
        frame('KnifeGrid', { autoLayout: horizontal({ spacing: 20 }), children: [
          knifeCard('Gyuto Chef Knife', 'GYUTO', '¥38,500', '210mm blade', 'Aogami Super Steel'),
          knifeCard('Santoku All-Purpose', 'SANTOKU', '¥28,600', '180mm blade', 'VG-10 Damascus'),
          knifeCard('Yanagiba Sashimi', 'YANAGIBA', '¥52,800', '270mm blade', 'White Steel #1'),
          knifeCard('Nakiri Vegetable', 'NAKIRI', '¥24,200', '165mm blade', 'Blue Steel #2'),
        ]}),
      ],
    }),
  ],
});
