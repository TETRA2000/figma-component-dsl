/**
 * Wine Cellar — Bottle cards, tasting notes, and region filters
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bottleCard(name: string, year: string, region: string, price: string, notes: string, color: string) {
  return frame(`Wine: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('BottleImage', { size: { x: 200, y: 120 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#1a0a1e', position: 1 }], 180)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      frame('NameYear', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 15, fontWeight: 600, color: '#2d1b3d' }),
        text(year, { fontSize: 13, fontWeight: 500, color: '#8b5cf6' }),
      ] }),
      text(region, { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
      text(notes, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      text(price, { fontSize: 18, fontWeight: 700, color: '#7c2d12' }),
    ],
  });
}

function regionPill(label: string, active: boolean) {
  return frame(`Region: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(active ? '#7c2d12' : '#fef3c7')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#92400e' })],
  });
}

function tastingNote(label: string, value: number) {
  return frame(`Note: ${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
      frame('Bar', { autoLayout: horizontal({}), layoutSizingHorizontal: 'FILL', children: [
        rectangle('Fill', { size: { x: value * 30, y: 6 }, fills: [solid('#7c2d12')], cornerRadius: 3 }),
      ] }),
    ],
  });
}

export default frame('WineCellarPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf7f2')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 40, padY: 32 }),
      fills: [gradient([{ hex: '#3b0a2a', position: 0 }, { hex: '#7c2d12', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Cellar & Vine', { fontSize: 26, fontWeight: 800, color: '#fef3c7' }),
        text('Curated wines from the world\'s finest regions', { fontSize: 14, fontWeight: 400, color: '#fef3c799' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Regions', { autoLayout: horizontal({ spacing: 8 }), children: [
          regionPill('All', false), regionPill('Bordeaux', true), regionPill('Tuscany', false),
          regionPill('Napa Valley', false), regionPill('Rioja', false), regionPill('Barossa', false),
        ] }),
        frame('WineGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            bottleCard('Château Margaux', '2018', 'Bordeaux, France', '$289', 'Dark fruit, cedar, silky tannins', '#5b1a3a'),
            bottleCard('Sassicaia', '2019', 'Tuscany, Italy', '$215', 'Blackcurrant, herb, elegant finish', '#4a1942'),
            bottleCard('Opus One', '2020', 'Napa Valley, USA', '$395', 'Cassis, violet, integrated oak', '#6b2140'),
          ],
        }),
        frame('TastingProfile', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Tasting Profile — Château Margaux 2018', { fontSize: 16, fontWeight: 700, color: '#2d1b3d' }),
            tastingNote('Body', 4), tastingNote('Tannins', 3), tastingNote('Acidity', 3),
            tastingNote('Sweetness', 1), tastingNote('Finish', 5),
          ],
        }),
      ],
    }),
  ],
});
