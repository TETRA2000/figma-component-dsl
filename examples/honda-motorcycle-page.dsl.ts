import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: honda.co.jp — Geometric shapes, bold red, product specs, racing aesthetic
const hondaRed = '#cc0000'; const dark = '#1a1a1a'; const white = '#ffffff'; const silver = '#c0c0c0';
const med = '#666666'; const bg = '#f0f0f0'; const darkGray = '#2a2a2a';

function specItem(label: string, value: string) {
  return frame(`Spec: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(white)], cornerRadius: 4, size: { x: 160, y: undefined },
    children: [
      text(value, { fontSize: 20, fontWeight: 700, color: dark }),
      text(label, { fontSize: 10, fontWeight: 400, color: med }),
    ],
  });
}

function modelCard(name: string, displacement: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Model: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 320, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('BikeImg', { size: { x: 320, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ModelInfo', { autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(displacement, { fontSize: 10, fontWeight: 600, color: hondaRed, letterSpacing: { value: 1, unit: 'PIXELS' as const } }),
        text(name, { fontSize: 16, fontWeight: 700, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 400, color: med }),
        text(price, { fontSize: 15, fontWeight: 700, color: dark }),
      ]}),
    ],
  });
}

export default frame('HondaMotorcycle', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('Logo', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(hondaRed)],
          children: [text('HONDA', { fontSize: 16, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } })] }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Motorcycles', { fontSize: 13, fontWeight: 600, color: dark }),
          text('Racing', { fontSize: 13, fontWeight: 400, color: med }),
          text('Parts', { fontSize: 13, fontWeight: 400, color: med }),
          text('Dealers', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: horizontal({ padX: 48, padY: 48, spacing: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1a1a', position: 0 }, { hex: '#2a2a2a', position: 0.5 }, { hex: '#1a1a1a', position: 1 }], 90)],
      children: [
        frame('HeroText', { autoLayout: vertical({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
          text('2026 MODEL', { fontSize: 10, fontWeight: 600, color: hondaRed, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('CBR1000RR-R\nFireblade SP', { fontSize: 36, fontWeight: 800, color: white, lineHeight: { value: 42, unit: 'PIXELS' as const } }),
          text('Born on the racetrack. Built for the road.', { fontSize: 14, fontWeight: 400, color: silver }),
          frame('Specs', { autoLayout: horizontal({ spacing: 10 }), children: [
            specItem('Power', '217 PS'),
            specItem('Torque', '113 Nm'),
            specItem('Weight', '201 kg'),
            specItem('Engine', '999cc'),
          ]}),
          text('¥2,838,000', { fontSize: 22, fontWeight: 700, color: white }),
        ]}),
        rectangle('HeroBike', { size: { x: 500, y: 300 },
          fills: [gradient([{ hex: '#cc0000', position: 0 }, { hex: '#8a0000', position: 0.5 }, { hex: '#2a1a1a', position: 1 }], 135)], cornerRadius: 4 }),
      ],
    }),
    frame('ModelsSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Lineup', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('ModelGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          modelCard('CB650R', '649cc INLINE-4', '¥1,023,000', 'Neo Sports Cafe. Aggressive styling meets everyday performance.', '#2a2a2a', '#4a4a4a'),
          modelCard('Africa Twin', '1084cc PARALLEL-TWIN', '¥1,738,000', 'Adventure without limits. DCT available.', '#3a4a2a', '#5a6a3a'),
          modelCard('Rebel 1100', '1084cc PARALLEL-TWIN', '¥1,100,000', 'Modern cruiser with a rebellious spirit.', '#1a1a2a', '#3a3a4a'),
          modelCard('PCX160', '156cc SINGLE', '¥407,000', 'Premium urban commuter with eSP+ engine.', '#2a3a4a', '#4a5a6a'),
        ]}),
      ],
    }),
  ],
});
