import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Kengo Kuma inspired — Timber tones, concrete gray, glass transparency, minimal
const timber = '#b8956a'; const concrete = '#a0a0a0'; const dark = '#1e1e1e'; const white = '#f8f8f8';
const med = '#707070'; const lightGray = '#e8e8e8'; const warmWhite = '#f4f0ea';

function projectCard(name: string, location: string, year: string, desc: string, g1: string, g2: string) {
  return frame(`Project: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 400, y: undefined }, fills: [solid(white)],
    children: [
      rectangle('ProjectImg', { size: { x: 400, y: 260 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('ProjectInfo', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 18 }), layoutSizingHorizontal: 'FILL', children: [
        frame('Meta', { autoLayout: horizontal({ spacing: 12 }), children: [
          text(location, { fontSize: 10, fontWeight: 400, color: timber, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
          text(year, { fontSize: 10, fontWeight: 400, color: med }),
        ]}),
        text(name, { fontSize: 20, fontWeight: 300, color: dark }),
        text(desc, { fontSize: 12, fontWeight: 300, color: med, size: { x: 360 }, textAutoResize: 'HEIGHT' as const }),
      ]}),
    ],
  });
}

function materialItem(name: string, desc: string, color: string) {
  return frame(`Material: ${name}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 2,
    children: [
      rectangle('MaterialSwatch', { size: { x: 48, y: 48 }, fills: [solid(color)], cornerRadius: 2 }),
      frame('MaterialText', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 14, fontWeight: 400, color: dark }),
        text(desc, { fontSize: 11, fontWeight: 300, color: med }),
      ]}),
    ],
  });
}

export default frame('JapaneseArchitecture', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(lightGray)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('KUMA & ASSOCIATES', { fontSize: 14, fontWeight: 300, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 28 }), children: [
          text('Projects', { fontSize: 12, fontWeight: 400, color: dark }),
          text('Philosophy', { fontSize: 12, fontWeight: 300, color: med }),
          text('Materials', { fontSize: 12, fontWeight: 300, color: med }),
          text('Studio', { fontSize: 12, fontWeight: 300, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72 }),
      layoutSizingHorizontal: 'FILL', fills: [solid(warmWhite)],
      children: [
        text('ARCHITECTURE', { fontSize: 11, fontWeight: 400, color: timber, letterSpacing: { value: 6, unit: 'PIXELS' as const } }),
        text('Dissolving boundaries between\ninside and outside', { fontSize: 38, fontWeight: 200, color: dark, lineHeight: { value: 50, unit: 'PIXELS' as const } }),
        text('Creating spaces where nature and architecture breathe together', { fontSize: 14, fontWeight: 300, color: med }),
      ],
    }),
    frame('Projects', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Selected Works', { fontSize: 22, fontWeight: 200, color: dark }),
        frame('ProjectGrid', { autoLayout: horizontal({ spacing: 20 }), children: [
          projectCard('V&A Dundee', 'SCOTLAND', '2018', 'Twisted concrete walls inspired by Scottish cliffs, meeting the River Tay', '#707070', '#a0a0a0'),
          projectCard('Nezu Museum', 'TOKYO', '2009', 'Bamboo and glass entrance leading to a hidden garden sanctuary', '#8a7a60', '#b8a880'),
          projectCard('Yusuhara Bridge Museum', 'KOCHI', '2010', 'Timber cantilever bridge connecting two mountainside buildings', '#a08868', '#c8a878'),
        ]}),
      ],
    }),
    frame('MaterialsSection', {
      autoLayout: horizontal({ padX: 80, padY: 48, spacing: 48 }),
      layoutSizingHorizontal: 'FILL', fills: [solid(warmWhite)],
      children: [
        frame('MaterialsText', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
          text('MATERIALS', { fontSize: 11, fontWeight: 400, color: timber, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text('Building with nature', { fontSize: 26, fontWeight: 200, color: dark }),
          text('We believe that materials carry memory. Each project begins with understanding the local materials and craft traditions.', { fontSize: 13, fontWeight: 300, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
        ]}),
        frame('MaterialList', { autoLayout: vertical({ spacing: 8 }), size: { x: 400, y: undefined }, children: [
          materialItem('Timber', 'Japanese cedar and cypress, locally sourced', timber),
          materialItem('Concrete', 'Raw exposed concrete with wood-grain formwork', concrete),
          materialItem('Stone', 'Volcanic basalt and river stones', '#6a6a6a'),
          materialItem('Washi', 'Translucent Japanese paper for diffused light', '#e8e0d4'),
        ]}),
      ],
    }),
  ],
});
