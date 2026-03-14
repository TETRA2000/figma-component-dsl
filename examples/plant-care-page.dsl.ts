import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const leaf = '#15803d'; const leafBg = '#f0fdf4'; const white = '#ffffff'; const bg = '#fafdf7';
const dark = '#14532d'; const med = '#6b7280'; const blue = '#2563eb'; const amber = '#d97706';

function plantCard(name: string, species: string, waterDays: number, light: string, health: string, g1: string, g2: string) {
  const healthColor = health === 'Thriving' ? leaf : health === 'Good' ? '#65a30d' : amber;
  return frame(`Plant: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 220, y: undefined },
    cornerRadius: 14, clipContent: true, fills: [solid(white)],
    children: [
      rectangle('PlantImg', { size: { x: 220, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('PlantInfo', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 15, fontWeight: 600, color: dark }),
        text(species, { fontSize: 12, fontWeight: 400, color: med, fontStyle: 'italic' as const }),
        frame('PlantMeta', { autoLayout: horizontal({ spacing: 10 }), children: [
          frame('Water', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
            ellipse('WaterDot', { size: { x: 8, y: 8 }, fills: [solid(blue)] }),
            text(`Every ${waterDays}d`, { fontSize: 11, fontWeight: 400, color: med }),
          ]}),
          text(light, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
        frame('HealthBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(healthColor, 0.12)], cornerRadius: 4,
          children: [text(health, { fontSize: 11, fontWeight: 600, color: healthColor })] }),
      ]}),
    ],
  });
}

function careTask(plant: string, task: string, dueIn: string, isDone: boolean) {
  return frame(`Task: ${plant}`, {
    autoLayout: horizontal({ padX: 14, padY: 10, spacing: 10, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.95, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TaskLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        frame('Checkbox', { size: { x: 20, y: 20 }, fills: [solid(isDone ? leaf : white)], cornerRadius: 4,
          strokes: isDone ? [] : [{ color: { r: 0.8, g: 0.85, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [] }),
        frame('TaskText', { autoLayout: vertical({ spacing: 1 }), children: [
          text(plant, { fontSize: 13, fontWeight: 500, color: isDone ? med : dark }),
          text(task, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
      text(dueIn, { fontSize: 12, fontWeight: 500, color: dueIn === 'Today' ? amber : dueIn === 'Overdue' ? '#dc2626' : med }),
    ],
  });
}

export default frame('PlantCare', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('Plantopia', { fontSize: 22, fontWeight: 700, color: leaf }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('My Garden', { fontSize: 14, fontWeight: 600, color: leaf }),
          text('Care Guide', { fontSize: 14, fontWeight: 400, color: med }),
          text('Community', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Banner', {
      autoLayout: horizontal({ padX: 48, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#14532d', position: 0 }, { hex: '#15803d', position: 0.5 }, { hex: '#4ade80', position: 1 }], 135)],
      children: [
        frame('BannerText', { autoLayout: vertical({ spacing: 6 }), children: [
          text('Your Garden', { fontSize: 28, fontWeight: 700, color: white }),
          text('12 plants · 3 need attention', { fontSize: 14, fontWeight: 400, color: '#bbf7d0' }),
        ]}),
        frame('AddPlantBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(white)], cornerRadius: 8,
          children: [text('Add Plant', { fontSize: 13, fontWeight: 600, color: leaf })] }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('PlantGrid', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          text('My Plants', { fontSize: 20, fontWeight: 700, color: dark }),
          frame('Grid', { autoLayout: horizontal({ spacing: 14 }), children: [
            plantCard('Monstera', 'Monstera deliciosa', 7, 'Indirect', 'Thriving', '#15803d', '#4ade80'),
            plantCard('Snake Plant', 'Sansevieria trifasciata', 14, 'Low light', 'Good', '#365314', '#65a30d'),
            plantCard('Fiddle Leaf', 'Ficus lyrata', 5, 'Bright', 'Needs Care', '#854d0e', '#ca8a04'),
            plantCard('Pothos', 'Epipremnum aureum', 10, 'Any light', 'Thriving', '#047857', '#10b981'),
          ]}),
        ]}),
        frame('TaskPanel', { autoLayout: vertical({ spacing: 10, padX: 16, padY: 14 }), size: { x: 320, y: undefined },
          fills: [solid(white)], cornerRadius: 12,
          children: [
            text('Care Schedule', { fontSize: 16, fontWeight: 600, color: dark }),
            careTask('Fiddle Leaf Fig', 'Water', 'Overdue', false),
            careTask('Monstera', 'Fertilize', 'Today', false),
            careTask('Snake Plant', 'Check soil', 'Tomorrow', false),
            careTask('Pothos', 'Water', 'In 3 days', false),
            careTask('All plants', 'Mist leaves', 'Done', true),
          ],
        }),
      ],
    }),
  ],
});
