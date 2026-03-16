/**
 * Gardening Tracker — Plant cards with water schedule, growth progress
 *
 * DSL features stressed: gradient plant images, progress bars,
 * clipContent, cornerRadius cards, FILL sizing, ellipse indicators
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function waterLevel(pct: number) {
  return frame('WaterBar', {
    size: { x: 1, y: 8 },
    fills: [solid('#e0f2fe')],
    cornerRadius: 4,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle('WaterFill', {
        size: { x: Math.round(pct * 2), y: 8 },
        fills: [gradient([{ hex: '#0ea5e9', position: 0 }, { hex: '#38bdf8', position: 1 }], 90)],
        cornerRadius: 4,
      }),
    ],
  });
}

function growthBar(pct: number) {
  return frame('GrowthBar', {
    size: { x: 1, y: 8 },
    fills: [solid('#dcfce7')],
    cornerRadius: 4,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle('GrowthFill', {
        size: { x: Math.round(pct * 2), y: 8 },
        fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#4ade80', position: 1 }], 90)],
        cornerRadius: 4,
      }),
    ],
  });
}

function plantCard(
  name: string, species: string, waterPct: number, growPct: number,
  nextWater: string, grad1: string, grad2: string, status: string,
) {
  return frame(`Plant: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle(`${name}Image`, {
        size: { x: 1, y: 140 },
        fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 150)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame(`${name}Info`, {
        autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`${name}Header`, {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame(`${name}Title`, {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(name, { fontSize: 16, fontWeight: 700, color: '#1a1a1a' }),
                  text(species, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
                ],
              }),
              frame(`${name}Status`, {
                autoLayout: horizontal({ padX: 10, padY: 4, spacing: 6, counterAlign: 'CENTER' }),
                fills: [solid(status === 'Healthy' ? '#f0fdf4' : '#fef3c7')],
                cornerRadius: 9999,
                children: [
                  ellipse(`${name}StatusDot`, {
                    size: { x: 8, y: 8 },
                    fills: [solid(status === 'Healthy' ? '#16a34a' : '#f59e0b')],
                  }),
                  text(status, {
                    fontSize: 11, fontWeight: 600,
                    color: status === 'Healthy' ? '#16a34a' : '#d97706',
                  }),
                ],
              }),
            ],
          }),
          // Water
          frame(`${name}Water`, {
            autoLayout: vertical({ spacing: 6 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame(`${name}WaterLabel`, {
                autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                layoutSizingHorizontal: 'FILL',
                children: [
                  text('Water Level', { fontSize: 12, fontWeight: 500, color: '#64748b' }),
                  text(`${waterPct}%`, { fontSize: 12, fontWeight: 600, color: '#0ea5e9' }),
                ],
              }),
              waterLevel(waterPct),
              text(`Next: ${nextWater}`, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          // Growth
          frame(`${name}Growth`, {
            autoLayout: vertical({ spacing: 6 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame(`${name}GrowthLabel`, {
                autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                layoutSizingHorizontal: 'FILL',
                children: [
                  text('Growth', { fontSize: 12, fontWeight: 500, color: '#64748b' }),
                  text(`${growPct}%`, { fontSize: 12, fontWeight: 600, color: '#16a34a' }),
                ],
              }),
              growthBar(growPct),
            ],
          }),
        ],
      }),
    ],
  });
}

function scheduleRow(day: string, task: string, active: boolean) {
  return frame(`Sched: ${day}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(active ? '#f0fdf4' : '#ffffff')],
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(day, { fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#16a34a' : '#64748b' }),
      text(task, { fontSize: 13, fontWeight: 400, color: '#374151' }),
    ],
  });
}

export default frame('GardeningAppPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.95, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('PlantPal', { fontSize: 24, fontWeight: 800, color: '#16a34a' }),
        text('March 16, 2026', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
      ],
    }),

    // Plant Grid
    frame('PlantSection', {
      autoLayout: vertical({ spacing: 16, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('My Plants', { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
        frame('PlantGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            plantCard('Monstera', 'Monstera deliciosa', 72, 85, 'Tomorrow', '#1a3a1a', '#2d6a2d', 'Healthy'),
            plantCard('Fiddle Leaf', 'Ficus lyrata', 30, 60, 'Today!', '#3a2a1a', '#6a5a2d', 'Needs Water'),
            plantCard('Snake Plant', 'Sansevieria', 90, 95, 'In 3 days', '#1a2a3a', '#2d4a6a', 'Healthy'),
          ],
        }),
      ],
    }),

    // Weekly Schedule
    frame('ScheduleSection', {
      autoLayout: vertical({ spacing: 12, padX: 36, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('This Week', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
        frame('ScheduleCard', {
          autoLayout: vertical({ spacing: 0 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            scheduleRow('Monday', 'Water Fiddle Leaf, Fertilize Monstera', false),
            scheduleRow('Tuesday', 'Check soil moisture', false),
            scheduleRow('Wednesday', 'Water Monstera, Mist Snake Plant', true),
            scheduleRow('Thursday', 'Rotate plants for light', false),
            scheduleRow('Friday', 'Water Fiddle Leaf', false),
          ],
        }),
      ],
    }),
  ],
});
