/**
 * Cycling Tracker — Route map placeholder, stats dashboard, and ride history
 * DSL features: gradient map, large stat numbers, progress bars, dark theme accents
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function statCard(label: string, value: string, unit: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 18, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#1e293b')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 500, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
      frame('ValueRow', { autoLayout: horizontal({ spacing: 4, counterAlign: 'BOTTOM' }), children: [
        text(value, { fontSize: 28, fontWeight: 800, color, textAlignHorizontal: 'CENTER' }),
        text(unit, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
      ] }),
    ],
  });
}

function progressBar(label: string, pct: number, color: string) {
  return frame(`Progress: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ProgressHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(label, { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
        text(`${pct}%`, { fontSize: 12, fontWeight: 600, color }),
      ] }),
      frame('BarBg', {
        size: { x: 1, y: 8 },
        fills: [solid('#1e293b')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('BarFill', { size: { x: pct * 3, y: 8 }, fills: [solid(color)], cornerRadius: 4 }),
        ],
      }),
    ],
  });
}

function rideRow(date: string, route: string, distance: string, time: string, pace: string) {
  return frame(`Ride: ${date}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#1e293b')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Left', { autoLayout: vertical({ spacing: 2 }), children: [
        text(route, { fontSize: 13, fontWeight: 600, color: '#e2e8f0' }),
        text(date, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      ] }),
      frame('RideStats', { autoLayout: horizontal({ spacing: 16 }), children: [
        text(distance, { fontSize: 13, fontWeight: 600, color: '#22d3ee' }),
        text(time, { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
        text(pace, { fontSize: 13, fontWeight: 500, color: '#a78bfa' }),
      ] }),
    ],
  });
}

export default frame('CyclingTrackerPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      fills: [solid('#1e293b')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('CycleTrack', { fontSize: 22, fontWeight: 800, color: '#22d3ee' }),
        frame('WeekBadge', { autoLayout: horizontal({ spacing: 0, padX: 12, padY: 5 }), fills: [solid('#22d3ee1a')], cornerRadius: 9999, children: [
          text('This Week', { fontSize: 12, fontWeight: 600, color: '#22d3ee' }),
        ] }),
      ],
    }),
    frame('MapArea', {
      autoLayout: vertical({ spacing: 0, padX: 40, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('MapPlaceholder', { size: { x: 1, y: 180 }, fills: [gradient([{ hex: '#0ea5e9', position: 0 }, { hex: '#0f172a', position: 1 }], 180)], cornerRadius: 14, layoutSizingHorizontal: 'FILL' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('StatsGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          statCard('Distance', '142.5', 'km', '#22d3ee'),
          statCard('Avg Speed', '24.8', 'km/h', '#a78bfa'),
          statCard('Calories', '3,420', 'kcal', '#f59e0b'),
          statCard('Elevation', '1,280', 'm', '#10b981'),
        ] }),
        frame('Goals', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#0f172a')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.18, g: 0.22, b: 0.30, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Weekly Goals', { fontSize: 18, fontWeight: 700, color: '#e2e8f0' }),
            progressBar('Distance (200 km)', 71, '#22d3ee'),
            progressBar('Rides (5 rides)', 60, '#a78bfa'),
            progressBar('Calories (5000 kcal)', 68, '#f59e0b'),
          ],
        }),
        frame('History', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Recent Rides', { fontSize: 18, fontWeight: 700, color: '#e2e8f0' }),
            rideRow('Mar 16', 'Golden Gate Loop', '45.2 km', '1h 48m', '25.1 km/h'),
            rideRow('Mar 14', 'Bay Trail South', '32.8 km', '1h 22m', '23.9 km/h'),
            rideRow('Mar 12', 'Mountain Pass', '28.5 km', '1h 35m', '18.0 km/h'),
          ],
        }),
      ],
    }),
  ],
});
