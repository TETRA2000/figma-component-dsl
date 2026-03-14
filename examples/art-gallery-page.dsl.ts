import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: teamLab style — Immersive dark background, floating artwork cards, minimal UI
const dark = '#050510'; const white = '#e8e8f0'; const accent = '#6060ff'; const med = '#606080';
const surface = '#101020'; const dimBlue = '#2020a0';

function artworkCard(title: string, year: string, medium: string, g1: string, g2: string, g3: string) {
  return frame(`Art: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 380, y: undefined }, cornerRadius: 4, clipContent: true,
    fills: [solid(surface)],
    children: [
      rectangle('ArtworkImg', { size: { x: 380, y: 260 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 0.5 }, { hex: g3, position: 1 }], 135)] }),
      frame('ArtInfo', { autoLayout: vertical({ spacing: 4, padX: 18, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 16, fontWeight: 300, color: white }),
        text(`${year} — ${medium}`, { fontSize: 11, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

export default frame('ArtGallery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('DIGITAL ART MUSEUM', { fontSize: 14, fontWeight: 300, color: white, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Exhibitions', { fontSize: 12, fontWeight: 400, color: accent }),
          text('Artists', { fontSize: 12, fontWeight: 300, color: med }),
          text('Visit', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#050510', position: 0 }, { hex: '#101040', position: 0.3 }, { hex: '#200040', position: 0.6 }, { hex: '#050510', position: 1 }], 180)],
      children: [
        text('BORDERLESS', { fontSize: 12, fontWeight: 400, color: accent, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('Art without boundaries', { fontSize: 48, fontWeight: 200, color: white }),
        text('Where art moves freely between rooms, escaping the frame', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('ExhibitionsSection', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Current Exhibitions', { fontSize: 20, fontWeight: 200, color: white }),
        frame('ArtGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          artworkCard('Flowers and People', '2024', 'Interactive digital', '#200040', '#4000a0', '#0040a0'),
          artworkCard('Universe of Water Particles', '2023', 'Projection mapping', '#001030', '#002060', '#0040a0'),
          artworkCard('Infinity Mirror Room', '2024', 'LED installation', '#300020', '#600040', '#a00060'),
        ]}),
      ],
    }),
  ],
});
