import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const rose = '#e11d48'; const white = '#ffffff'; const bg = '#0a0a0a'; const surface = '#171717';
const gray = '#a3a3a3'; const dimGray = '#525252'; const light = '#fafafa';

function photoCard(title: string, author: string, likes: string, g1: string, g2: string, w: number, h: number) {
  return frame(`Photo: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: w, y: undefined },
    cornerRadius: 10, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('Image', { size: { x: w, y: h },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('PhotoInfo', {
        autoLayout: horizontal({ padX: 12, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('AuthorInfo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
            ellipse('AuthorAvatar', { size: { x: 24, y: 24 }, fills: [solid(dimGray)] }),
            frame('AuthorText', { autoLayout: vertical({ spacing: 1 }), children: [
              text(title, { fontSize: 12, fontWeight: 500, color: light }),
              text(author, { fontSize: 11, fontWeight: 400, color: gray }),
            ]}),
          ]}),
          frame('Likes', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
            ellipse('Heart', { size: { x: 12, y: 12 }, fills: [solid(rose)] }),
            text(likes, { fontSize: 11, fontWeight: 500, color: gray }),
          ]}),
        ],
      }),
    ],
  });
}

function categoryChip(label: string, isActive: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(isActive ? rose : surface)], cornerRadius: 9999,
    strokes: isActive ? [] : [{ color: { r: 0.32, g: 0.32, b: 0.32, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? white : gray })],
  });
}

export default frame('PhotoGallery', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('Aperture', { fontSize: 22, fontWeight: 700, color: rose }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Explore', { fontSize: 14, fontWeight: 600, color: rose }),
          text('Collections', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Community', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
        frame('UploadBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(rose)], cornerRadius: 8,
          children: [text('Upload', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a0a10', position: 0 }, { hex: '#0a0a0a', position: 1 }], 180)],
      children: [
        text('Discover stunning photography', { fontSize: 36, fontWeight: 700, color: light }),
        text('Curated collections from talented photographers worldwide', { fontSize: 15, fontWeight: 400, color: gray }),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        categoryChip('All', true),
        categoryChip('Nature', false),
        categoryChip('Architecture', false),
        categoryChip('Portrait', false),
        categoryChip('Street', false),
        categoryChip('Abstract', false),
        categoryChip('Travel', false),
      ],
    }),
    frame('Gallery', {
      autoLayout: horizontal({ spacing: 12, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Col1', { autoLayout: vertical({ spacing: 12 }), children: [
          photoCard('Mountain Sunrise', 'Alex Rivera', '2.4K', '#f97316', '#dc2626', 330, 240),
          photoCard('Urban Geometry', 'Maya Chen', '1.8K', '#3b82f6', '#1d4ed8', 330, 180),
          photoCard('Desert Bloom', 'Luna Sol', '956', '#eab308', '#ca8a04', 330, 260),
        ]}),
        frame('Col2', { autoLayout: vertical({ spacing: 12 }), children: [
          photoCard('Ocean Waves', 'James Park', '3.1K', '#06b6d4', '#0891b2', 330, 200),
          photoCard('Neon Nights', 'Kai Zhang', '2.7K', '#a855f7', '#7c3aed', 330, 280),
          photoCard('Autumn Path', 'Emma White', '1.2K', '#f59e0b', '#d97706', 330, 190),
        ]}),
        frame('Col3', { autoLayout: vertical({ spacing: 12 }), children: [
          photoCard('Crystal Cave', 'Noah Kim', '1.9K', '#8b5cf6', '#6366f1', 330, 260),
          photoCard('City Lights', 'Sophie Lee', '2.2K', '#ec4899', '#db2777', 330, 200),
          photoCard('Forest Mist', 'Oliver Day', '1.5K', '#10b981', '#059669', 330, 220),
        ]}),
      ],
    }),
  ],
});
