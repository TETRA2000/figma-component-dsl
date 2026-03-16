/**
 * Music Charts — Billboard-style chart with ranked rows, album art, weekly movement
 * DSL features: numbered ranking, gradient album placeholders, up/down indicators, divider rows
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function chartRow(rank: number, title: string, artist: string, weeks: number, peak: number, movement: 'up' | 'down' | 'same', color: string) {
  const arrow = movement === 'up' ? '▲' : movement === 'down' ? '▼' : '—';
  const moveColor = movement === 'up' ? '#16a34a' : movement === 'down' ? '#dc2626' : '#9ca3af';
  return frame(`Chart: ${rank}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(rank % 2 === 0 ? '#f9fafb' : '#ffffff')],
    children: [
      text(String(rank), { fontSize: 18, fontWeight: 800, color: rank <= 3 ? '#7c3aed' : '#6b7280', size: { x: 28 }, textAlignHorizontal: 'CENTER' }),
      text(arrow, { fontSize: 12, fontWeight: 700, color: moveColor, size: { x: 20 } }),
      rectangle(`Album:${title}`, { size: { x: 48, y: 48 }, fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'aa', position: 1 }], 135)], cornerRadius: 6 }),
      frame('SongInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          text(artist, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      text(`${weeks} wks`, { fontSize: 12, fontWeight: 500, color: '#9ca3af', size: { x: 50 }, textAlignHorizontal: 'CENTER' }),
      text(`#${peak}`, { fontSize: 12, fontWeight: 600, color: '#374151', size: { x: 40 }, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function headerLabel(label: string, width: number) {
  return text(label, { fontSize: 10, fontWeight: 700, color: '#9ca3af', size: { x: width }, textAlignHorizontal: 'CENTER', letterSpacing: { value: 8, unit: 'PERCENT' } });
}

function featuredAlbum(title: string, artist: string, color: string) {
  return frame(`Featured: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle(`Art:${title}`, { size: { x: 200, y: 120 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#1e1b4b', position: 1 }], 160)], cornerRadius: 10 }),
      text(title, { fontSize: 14, fontWeight: 700, color: '#111827' }),
      text(artist, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('MusicChartsPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4c1d95', position: 1 }], 90)],
      children: [
        text('SoundRank', { fontSize: 22, fontWeight: 900, color: '#ffffff' }),
        text('Top 10 • This Week', { fontSize: 13, fontWeight: 500, color: '#c4b5fd' }),
      ],
    }),
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 20, padX: 24, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ChartList', {
          autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('TableHead', {
              autoLayout: horizontal({ spacing: 12, padX: 16, padY: 8 }), layoutSizingHorizontal: 'FILL',
              children: [
                headerLabel('#', 28), headerLabel('', 20),
                rectangle('Spacer', { size: { x: 48, y: 1 }, fills: [] }),
                text('TITLE', { fontSize: 10, fontWeight: 700, color: '#9ca3af', layoutSizingHorizontal: 'FILL', letterSpacing: { value: 8, unit: 'PERCENT' } }),
                headerLabel('WKS', 50), headerLabel('PEAK', 40),
              ],
            }),
            chartRow(1, 'Midnight Glow', 'Aurora Skies', 8, 1, 'same', '#ec4899'),
            chartRow(2, 'Neon Dreams', 'The Drift', 5, 1, 'up', '#3b82f6'),
            chartRow(3, 'Electric Soul', 'DJ Pulse', 12, 2, 'down', '#22c55e'),
            chartRow(4, 'Wildfire', 'Cedar & Stone', 3, 4, 'up', '#f59e0b'),
            chartRow(5, 'Starlight', 'Lana Moon', 6, 3, 'down', '#8b5cf6'),
            chartRow(6, 'Ocean Floor', 'Glass Animals II', 2, 6, 'up', '#14b8a6'),
            chartRow(7, 'Thunder Road', 'Neon Nomad', 9, 4, 'down', '#f97316'),
            chartRow(8, 'Crystal Clear', 'Willow Creek', 4, 7, 'up', '#16a34a'),
            chartRow(9, 'Daybreak', 'Synthwave Kid', 7, 5, 'down', '#06b6d4'),
            chartRow(10, 'Gravity', 'Bass Theory', 1, 10, 'up', '#a855f7'),
          ],
        }),
        frame('Sidebar', {
          size: { x: 230 },
          autoLayout: vertical({ spacing: 12 }),
          children: [
            text('Featured Albums', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            featuredAlbum('Midnight Glow', 'Aurora Skies', '#ec4899'),
            featuredAlbum('Neon Dreams', 'The Drift', '#3b82f6'),
          ],
        }),
      ],
    }),
  ],
});
