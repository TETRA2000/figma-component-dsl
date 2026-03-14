import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Manga store — Fuchsia-pink, bold graphics, youth-oriented, category grid
const pink = '#ec4899'; const dark = '#1a1a2e'; const white = '#ffffff'; const yellow = '#fbbf24';
const purple = '#8b5cf6'; const cyan = '#06b6d4'; const med = '#94a3b8'; const bg = '#0f172a';

function mangaCard(title: string, genre: string, price: string, g1: string, g2: string) {
  return frame(`Manga: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 180, y: undefined }, cornerRadius: 8, clipContent: true,
    fills: [solid('#1e293b')],
    children: [
      rectangle('CoverArt', { size: { x: 180, y: 260 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('MangaInfo', { autoLayout: vertical({ spacing: 4, padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 700, color: white }),
        frame('GenreTag', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(pink, 0.2)], cornerRadius: 9999, children: [
          text(genre, { fontSize: 9, fontWeight: 600, color: pink }),
        ]}),
        text(price, { fontSize: 14, fontWeight: 700, color: yellow }),
      ]}),
    ],
  });
}

function categoryChip(label: string, color: string) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(color, 0.15)], cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color })],
  });
}

export default frame('AnimeMangaStore', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#1e293b')],
      children: [
        text('MANGA HUB', { fontSize: 18, fontWeight: 800, color: pink, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('New Releases', { fontSize: 12, fontWeight: 600, color: white }),
          text('Bestsellers', { fontSize: 12, fontWeight: 400, color: med }),
          text('Genres', { fontSize: 12, fontWeight: 400, color: med }),
          text('Sales', { fontSize: 12, fontWeight: 600, color: yellow }),
        ]}),
        frame('Cart', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid(pink)], cornerRadius: 9999,
          children: [text('Cart (3)', { fontSize: 12, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1a2e', position: 0 }, { hex: '#3b1a5e', position: 0.5 }, { hex: '#ec4899', position: 1 }], 135)],
      children: [
        text('NEW SEASON DROP', { fontSize: 11, fontWeight: 700, color: yellow, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        text('Spring 2026 Manga Collection', { fontSize: 36, fontWeight: 800, color: white }),
        text('Over 200 new titles from top publishers', { fontSize: 14, fontWeight: 400, color: '#e0b0d0' }),
        frame('ShopBtn', { autoLayout: horizontal({ padX: 24, padY: 10 }), fills: [solid(pink)], cornerRadius: 9999,
          children: [text('BROWSE NOW', { fontSize: 13, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
      ],
    }),
    frame('Categories', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 28 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Browse by Genre', { fontSize: 18, fontWeight: 700, color: white }),
        frame('ChipRow', { autoLayout: horizontal({ spacing: 10 }), children: [
          categoryChip('Shonen', pink),
          categoryChip('Shojo', purple),
          categoryChip('Seinen', cyan),
          categoryChip('Isekai', yellow),
          categoryChip('Horror', '#ef4444'),
          categoryChip('Slice of Life', '#10b981'),
        ]}),
      ],
    }),
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Trending Now', { fontSize: 18, fontWeight: 700, color: white }),
        frame('Grid', { autoLayout: horizontal({ spacing: 14 }), children: [
          mangaCard('Chainsaw Man Vol. 16', 'Shonen', '¥528', '#b91c1c', '#dc2626'),
          mangaCard('Spy x Family Vol. 13', 'Comedy', '¥528', '#2563eb', '#60a5fa'),
          mangaCard('Jujutsu Kaisen Vol. 25', 'Shonen', '¥528', '#7c3aed', '#a78bfa'),
          mangaCard('Frieren Vol. 12', 'Fantasy', '¥528', '#059669', '#34d399'),
          mangaCard('Blue Lock Vol. 28', 'Sports', '¥528', '#0891b2', '#22d3ee'),
          mangaCard('Dandadan Vol. 14', 'Action', '¥528', '#db2777', '#f472b6'),
        ]}),
      ],
    }),
  ],
});
