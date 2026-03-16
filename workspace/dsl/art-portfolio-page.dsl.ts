/**
 * Art Portfolio — Artist showcase with project gallery, bio, exhibitions
 * DSL features: large hero text, minimal design, gradient gallery items, centered layout
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function projectItem(title: string, medium: string, year: string, c1: string, c2: string, h: number) {
  return frame(`Project: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Artwork', { size: { x: 1, y: h }, fills: [gradient([{ hex: c1, position: 0 }, { hex: c2, position: 1 }], 135)], cornerRadius: 4, layoutSizingHorizontal: 'FILL' }),
      frame('ProjInfo', { autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 14, fontWeight: 500, color: '#111827' }),
        text(`${medium}, ${year}`, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
      ]}),
    ],
  });
}

function exhibitionRow(title: string, venue: string, date: string) {
  return frame(`Exh: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ExhInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(title, { fontSize: 14, fontWeight: 500, color: '#111827' }),
        text(venue, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      ]}),
      text(date, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
    ],
  });
}

export default frame('ArtPortfolioPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 48, padX: 64, padY: 56 }),
  fills: [solid('#ffffff')],
  children: [
    frame('ArtHeader', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
      text('Elena Vasquez', { fontSize: 48, fontWeight: 300, color: '#111827' }),
      text('Contemporary Mixed Media Artist', { fontSize: 16, fontWeight: 400, color: '#6b7280' }),
      text('Exploring the intersection of digital and traditional mediums through abstract compositions that challenge perception and invite contemplation.', { fontSize: 14, fontWeight: 400, color: '#9ca3af', lineHeight: { value: 165, unit: 'PERCENT' }, size: { x: 600 }, textAutoResize: 'HEIGHT' }),
    ]}),
    frame('Gallery', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
      frame('GalCol1', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
        projectItem('Fragments I', 'Oil on canvas', '2026', '#1e293b', '#475569', 280),
        projectItem('Luminance', 'Digital print', '2025', '#f59e0b', '#ea580c', 200),
      ]}),
      frame('GalCol2', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
        projectItem('Echoes', 'Acrylic', '2026', '#7c3aed', '#ec4899', 220),
        projectItem('Stillwater', 'Mixed media', '2025', '#0ea5e9', '#06b6d4', 260),
      ]}),
    ]}),
    frame('Exhibitions', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
      text('Exhibitions', { fontSize: 20, fontWeight: 600, color: '#111827' }),
      exhibitionRow('Solo: Fragments', 'Pace Gallery, NYC', 'Mar 2026'),
      exhibitionRow('Group: New Perspectives', 'MoMA PS1', 'Jan 2026'),
      exhibitionRow('Solo: Luminance Series', 'Gagosian, LA', 'Oct 2025'),
    ]}),
  ],
});
