import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: lexus.jp — Automotive luxury, dark theme, metallic gradients
const bg = '#0a0a0a'; const surface = '#161616'; const silver = '#c0c0c0'; const white = '#f0f0f0';
const dim = '#555555'; const gold = '#b8960c'; const dark = '#050505';

function specItem(label: string, value: string) {
  return frame(`Spec: ${label}`, {
    autoLayout: horizontal({ padY: 12, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 300, color: dim }),
      text(value, { fontSize: 13, fontWeight: 400, color: white }),
    ],
  });
}

function modelCard(name: string, price: string, tagline: string, g1: string, g2: string) {
  return frame(`Model: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 420, y: undefined },
    cornerRadius: 4, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('CarImg', { size: { x: 420, y: 240 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 0.6 }, { hex: '#0a0a0a', position: 1 }], 180)] }),
      frame('ModelInfo', { autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 22, fontWeight: 300, color: white, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text(tagline, { fontSize: 12, fontWeight: 300, color: dim }),
        text(`From ${price}`, { fontSize: 14, fontWeight: 400, color: silver }),
      ]}),
    ],
  });
}

export default frame('LexusShowroom', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(dark)],
      children: [
        text('LEXUS', { fontSize: 20, fontWeight: 300, color: white, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 32 }), children: [
          text('Models', { fontSize: 12, fontWeight: 400, color: white }),
          text('Experience', { fontSize: 12, fontWeight: 300, color: dim }),
          text('Ownership', { fontSize: 12, fontWeight: 300, color: dim }),
          text('Craftsmanship', { fontSize: 12, fontWeight: 300, color: dim }),
        ]}),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1a1a', position: 0 }, { hex: '#0d0d0d', position: 0.4 }, { hex: '#050505', position: 1 }], 180)],
      children: [
        text('EXPERIENCE AMAZING', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('The New LC 500', { fontSize: 52, fontWeight: 200, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        text('Where performance meets artistry', { fontSize: 16, fontWeight: 300, color: dim }),
        rectangle('HeroCar', { size: { x: 800, y: 360 },
          fills: [gradient([{ hex: '#333333', position: 0 }, { hex: '#1a1a1a', position: 0.3 }, { hex: '#c0c0c0', position: 0.5 }, { hex: '#1a1a1a', position: 0.7 }, { hex: '#050505', position: 1 }], 90)],
          cornerRadius: 8 }),
      ],
    }),
    frame('ModelsSection', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('OUR LINEUP', { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('ModelRow', { autoLayout: horizontal({ spacing: 16 }), children: [
          modelCard('LC', '¥13,830,000', 'Grand touring coupe', '#555555', '#333333'),
          modelCard('LS', '¥10,940,000', 'Flagship sedan', '#3a3a4a', '#1a1a2a'),
          modelCard('NX', '¥4,850,000', 'Luxury crossover', '#3a4a3a', '#1a2a1a'),
        ]}),
      ],
    }),
    frame('SpecsPreview', {
      autoLayout: horizontal({ spacing: 40, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      fills: [solid(surface)],
      children: [
        frame('SpecsTitle', { autoLayout: vertical({ spacing: 8 }), size: { x: 300, y: undefined }, children: [
          text('LC 500', { fontSize: 28, fontWeight: 200, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('Technical specifications', { fontSize: 12, fontWeight: 300, color: dim }),
        ]}),
        frame('SpecsList', { autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
          specItem('Engine', '5.0L V8 Naturally Aspirated'),
          specItem('Power', '471 PS / 7,100 rpm'),
          specItem('Torque', '540 Nm / 4,800 rpm'),
          specItem('Transmission', '10-Speed Direct-Shift'),
          specItem('0-100 km/h', '4.7 seconds'),
        ]}),
      ],
    }),
  ],
});
