/**
 * Photo Gallery — Grid layout, photo cards, photographer profiles
 * DSL features: masonry-like grid, gradient overlays, ellipse avatars, cornerRadius, opacity text overlays
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function photoCard(title: string, photographer: string, likes: string, h: number, color1: string, color2: string) {
  return frame(`Photo: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('PhotoImg', { size: { x: 1, y: h }, fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)], cornerRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('PhotoInfo', {
        autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse(`Av:${photographer}`, { size: { x: 28, y: 28 }, fills: [solid(color1)] }),
          frame('PhotoMeta', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
            text(title, { fontSize: 13, fontWeight: 600, color: '#111827' }),
            text(photographer, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
          ]}),
          text(likes, { fontSize: 12, fontWeight: 500, color: '#ef4444' }),
        ],
      }),
    ],
  });
}

export default frame('PhotoGalleryPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
  fills: [solid('#fafafa')],
  children: [
    frame('GalHeader', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Explore', { fontSize: 28, fontWeight: 700, color: '#111827' }),
        frame('FilterRow', { autoLayout: horizontal({ spacing: 8 }), children: [
          frame('TagAll', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#111827')], cornerRadius: 9999, children: [text('All', { fontSize: 12, fontWeight: 600, color: '#ffffff' })] }),
          frame('TagNature', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#ffffff')], cornerRadius: 9999, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }], children: [text('Nature', { fontSize: 12, fontWeight: 500, color: '#6b7280' })] }),
          frame('TagArch', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#ffffff')], cornerRadius: 9999, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }], children: [text('Architecture', { fontSize: 12, fontWeight: 500, color: '#6b7280' })] }),
          frame('TagPort', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#ffffff')], cornerRadius: 9999, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }], children: [text('Portrait', { fontSize: 12, fontWeight: 500, color: '#6b7280' })] }),
        ]}),
      ],
    }),
    frame('PhotoGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Col1', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          photoCard('Golden Hour', 'Alex Rivera', '2.4K', 220, '#f59e0b', '#ea580c'),
          photoCard('Mountain Mist', 'Sarah Lin', '1.8K', 180, '#0ea5e9', '#6366f1'),
          photoCard('Urban Night', 'Jordan Lee', '3.1K', 200, '#1e293b', '#475569'),
        ]}),
        frame('Col2', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          photoCard('Spring Bloom', 'Mia Chen', '1.2K', 180, '#ec4899', '#f43f5e'),
          photoCard('Seaside Walk', 'Tom Baker', '956', 240, '#06b6d4', '#0891b2'),
          photoCard('City Lights', 'Nina Patel', '2.1K', 160, '#8b5cf6', '#a855f7'),
        ]}),
        frame('Col3', { autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          photoCard('Forest Path', 'David Kim', '1.5K', 200, '#10b981', '#059669'),
          photoCard('Sunset Beach', 'Emma Wu', '4.2K', 220, '#f97316', '#dc2626'),
          photoCard('Quiet Morning', 'Liam Scott', '890', 170, '#64748b', '#94a3b8'),
        ]}),
      ],
    }),
  ],
});
