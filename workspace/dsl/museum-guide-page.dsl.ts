/**
 * Museum Guide — Exhibit cards, floor map placeholder, and tour schedule
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function exhibitCard(title: string, floor: string, era: string, desc: string, color: string) {
  return frame(`Exhibit: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.91, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ExhibitThumb', { size: { x: 200, y: 100 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#1a1a2e', position: 1 }], 160)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      frame('Meta', { autoLayout: horizontal({ spacing: 8 }), children: [
        frame('FloorBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid('#f3f4f6')], cornerRadius: 9999, children: [text(floor, { fontSize: 10, fontWeight: 600, color: '#6b7280' })] }),
        frame('EraBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(era, { fontSize: 10, fontWeight: 600, color })] }),
      ] }),
      text(title, { fontSize: 15, fontWeight: 700, color: '#1a1a2e' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

function tourRow(time: string, name: string, guide: string, spots: number) {
  return frame(`Tour: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 10 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TourInfo', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        text(time, { fontSize: 13, fontWeight: 700, color: '#7c3aed' }),
        text(name, { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
        text(`by ${guide}`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      frame('SpotsBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(spots <= 3 ? '#fef2f2' : '#f0fdf4')], cornerRadius: 9999, children: [
        text(`${spots} spots`, { fontSize: 11, fontWeight: 600, color: spots <= 3 ? '#ef4444' : '#22c55e' }),
      ] }),
    ],
  });
}

export default frame('MuseumGuidePage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f3ef')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 36 }),
      fills: [gradient([{ hex: '#1a1a2e', position: 0 }, { hex: '#4a1942', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('National Art Museum', { fontSize: 28, fontWeight: 800, color: '#f5f3ef' }),
        text('Explore 5,000 years of art and history', { fontSize: 14, fontWeight: 400, color: '#f5f3ef99' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Exhibits', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Current Exhibits', { fontSize: 20, fontWeight: 700, color: '#1a1a2e' }),
            frame('ExhibitGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              exhibitCard('Impressionist Masters', 'Floor 2', '19th Century', 'Monet, Renoir, and Degas — light and color in motion', '#2563eb'),
              exhibitCard('Ancient Egypt', 'Floor 1', '3000 BCE', 'Mummies, papyrus scrolls, and golden artifacts', '#d97706'),
              exhibitCard('Modern Sculpture', 'Floor 3', 'Contemporary', 'Interactive installations and kinetic art', '#7c3aed'),
            ] }),
          ],
        }),
        frame('FloorMap', {
          autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Floor Map', { fontSize: 18, fontWeight: 700, color: '#1a1a2e' }),
            rectangle('MapPlaceholder', { size: { x: 800, y: 180 }, fills: [solid('#f3f4f6')], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
            frame('Legend', { autoLayout: horizontal({ spacing: 16 }), children: [
              frame('L1', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [ellipse('D1', { size: { x: 8, y: 8 }, fills: [solid('#2563eb')] }), text('Gallery', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
              frame('L2', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [ellipse('D2', { size: { x: 8, y: 8 }, fills: [solid('#d97706')] }), text('Restroom', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
              frame('L3', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [ellipse('D3', { size: { x: 8, y: 8 }, fills: [solid('#22c55e')] }), text('Café', { fontSize: 11, fontWeight: 500, color: '#64748b' })] }),
            ] }),
          ],
        }),
        frame('Tours', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Guided Tours Today', { fontSize: 18, fontWeight: 700, color: '#1a1a2e' }),
            tourRow('10:00 AM', 'Highlights Tour', 'Dr. Elena Moss', 8),
            tourRow('11:30 AM', 'Egyptian Gallery Walk', 'Prof. Karim Ali', 2),
            tourRow('2:00 PM', 'Impressionist Deep Dive', 'Sarah Chen', 12),
            tourRow('4:00 PM', 'Family-Friendly Tour', 'Tom Bailey', 5),
          ],
        }),
      ],
    }),
  ],
});
