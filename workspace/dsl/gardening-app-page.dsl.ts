/**
 * Gardening App — Plant cards, watering schedule, care tips (mobile 500px)
 * DSL features: mobile width, gradient plant cards, schedule timeline, tip cards
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function plantCard(name: string, species: string, lastWatered: string, needsWater: boolean, color: string) {
  return frame(`Plant: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PlantIcon', {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(color + '1a')], cornerRadius: 12,
        children: [text('🌿', { fontSize: 22, fontWeight: 400, color })],
      }),
      frame('PlantInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 700, color: '#111827' }),
          text(species, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          text(`Watered ${lastWatered}`, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      ...(needsWater ? [frame('WaterBadge', {
        autoLayout: horizontal({ spacing: 4, padX: 8, padY: 4 }),
        fills: [solid('#dbeafe')], cornerRadius: 9999,
        children: [text('💧', { fontSize: 11, fontWeight: 400, color: '#2563eb' }), text('Water', { fontSize: 10, fontWeight: 600, color: '#2563eb' })],
      })] : []),
    ],
  });
}

function scheduleItem(time: string, task: string, plant: string, done: boolean) {
  return frame(`Task: ${task}`, {
    autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(time, { fontSize: 11, fontWeight: 600, color: '#9ca3af', size: { x: 50 } }),
      ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid(done ? '#16a34a' : '#d1d5db')] }),
      frame('TaskInfo', {
        autoLayout: vertical({ spacing: 1 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(task, { fontSize: 13, fontWeight: done ? 400 : 600, color: done ? '#9ca3af' : '#111827', textDecoration: done ? 'STRIKETHROUGH' : 'NONE' }),
          text(plant, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

function tipCard(title: string, tip: string, color: string) {
  return frame(`Tip: ${title}`, {
    autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }),
    fills: [solid(color + '0d')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.22, g: 0.65, b: 0.36, a: 0.2 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 13, fontWeight: 700, color: '#16a34a' }),
      text(tip, { fontSize: 12, fontWeight: 400, color: '#374151', lineHeight: { value: 150, unit: 'PERCENT' } }),
    ],
  });
}

export default frame('GardeningAppPage', {
  size: { x: 500 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 20, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#15803d', position: 1 }], 90)],
      children: [
        frame('Logo', {
          autoLayout: vertical({ spacing: 1 }),
          children: [
            text('PlantPal', { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
            text('4 plants, 2 need care', { fontSize: 11, fontWeight: 400, color: '#bbf7d0' }),
          ],
        }),
        text('🌱', { fontSize: 24, fontWeight: 400, color: '#ffffff' }),
      ],
    }),
    frame('Plants', {
      autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('My Plants', { fontSize: 16, fontWeight: 700, color: '#111827' }),
        plantCard('Monstera', 'Monstera deliciosa', '2 days ago', true, '#16a34a'),
        plantCard('Snake Plant', 'Sansevieria', '5 days ago', false, '#65a30d'),
        plantCard('Pothos', 'Epipremnum aureum', '1 day ago', true, '#059669'),
        plantCard('Fiddle Leaf', 'Ficus lyrata', '3 days ago', false, '#16a34a'),
      ],
    }),
    frame('Schedule', {
      autoLayout: vertical({ spacing: 4, padX: 20, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        text("Today's Schedule", { fontSize: 16, fontWeight: 700, color: '#111827' }),
        scheduleItem('8:00', 'Water plants', 'Monstera, Pothos', true),
        scheduleItem('10:00', 'Check soil moisture', 'Snake Plant', false),
        scheduleItem('12:00', 'Mist leaves', 'Fiddle Leaf Fig', false),
        scheduleItem('5:00', 'Move to shade', 'Pothos', false),
      ],
    }),
    frame('Tips', {
      autoLayout: vertical({ spacing: 8, padX: 20, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Care Tips', { fontSize: 16, fontWeight: 700, color: '#111827' }),
        tipCard('Overwatering', 'Yellow leaves often mean too much water. Let soil dry between waterings.', '#16a34a'),
        tipCard('Light Needs', 'Most houseplants prefer bright, indirect sunlight. Rotate weekly for even growth.', '#16a34a'),
      ],
    }),
  ],
});
