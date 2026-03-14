import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const red = '#dc2626'; const white = '#ffffff'; const bg = '#0c0a09'; const surface = '#1c1917';
const gray = '#a8a29e'; const dim = '#57534e'; const light = '#fafaf9'; const amber = '#f59e0b';

function movieCard(title: string, year: string, rating: string, g1: string, g2: string) {
  return frame(`Movie: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 200, y: undefined },
    cornerRadius: 10, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('Poster', { size: { x: 200, y: 280 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 160)] }),
      frame('MovieInfo', { autoLayout: vertical({ spacing: 3, padX: 10, padY: 10 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: light }),
        frame('YearRating', { autoLayout: horizontal({ spacing: 8 }), children: [
          text(year, { fontSize: 11, fontWeight: 400, color: dim }),
          frame('Rating', { autoLayout: horizontal({ spacing: 3, counterAlign: 'CENTER' }), children: [
            ellipse('Star', { size: { x: 10, y: 10 }, fills: [solid(amber)] }),
            text(rating, { fontSize: 11, fontWeight: 500, color: amber }),
          ]}),
        ]}),
      ]}),
    ],
  });
}

function genreChip(label: string, isActive: boolean) {
  return frame(`Genre: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid(isActive ? red : surface)], cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: isActive ? 600 : 400, color: isActive ? white : gray })],
  });
}

export default frame('MovieStreaming', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('CineStream', { fontSize: 22, fontWeight: 700, color: red }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Home', { fontSize: 14, fontWeight: 600, color: red }),
          text('Movies', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Series', { fontSize: 14, fontWeight: 400, color: gray }),
          text('My List', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    frame('FeaturedHero', {
      autoLayout: horizontal({ padX: 48, padY: 40, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a0505', position: 0 }, { hex: '#300a0a', position: 0.5 }, { hex: '#0c0a09', position: 1 }], 90)],
      children: [
        rectangle('FeaturedPoster', { size: { x: 240, y: 340 },
          fills: [gradient([{ hex: '#dc2626', position: 0 }, { hex: '#991b1b', position: 1 }], 135)], cornerRadius: 12 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 12 }), children: [
          frame('FeaturedBadge', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(red)], cornerRadius: 6,
            children: [text('NEW RELEASE', { fontSize: 11, fontWeight: 700, color: white })] }),
          text('The Last Frontier', { fontSize: 36, fontWeight: 700, color: light }),
          frame('MetaRow', { autoLayout: horizontal({ spacing: 12 }), children: [
            text('2026', { fontSize: 14, fontWeight: 400, color: gray }),
            text('2h 24m', { fontSize: 14, fontWeight: 400, color: gray }),
            text('PG-13', { fontSize: 14, fontWeight: 400, color: gray }),
            frame('RatingBig', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
              ellipse('StarBig', { size: { x: 14, y: 14 }, fills: [solid(amber)] }),
              text('8.7', { fontSize: 14, fontWeight: 600, color: amber }),
            ]}),
          ]}),
          text('A gripping tale of survival and discovery at the edge of civilization.', { fontSize: 15, fontWeight: 400, color: gray, size: { x: 500 }, textAutoResize: 'HEIGHT' as const }),
          frame('HeroActions', { autoLayout: horizontal({ spacing: 12 }), children: [
            frame('PlayBtn', { autoLayout: horizontal({ padX: 24, padY: 12 }), fills: [solid(red)], cornerRadius: 8,
              children: [text('Watch Now', { fontSize: 14, fontWeight: 600, color: white })] }),
            frame('TrailerBtn', { autoLayout: horizontal({ padX: 24, padY: 12 }), fills: [solid(surface)], cornerRadius: 8,
              strokes: [{ color: { r: 0.34, g: 0.33, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('Trailer', { fontSize: 14, fontWeight: 500, color: gray })] }),
          ]}),
        ]}),
      ],
    }),
    frame('Genres', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        genreChip('All', true), genreChip('Action', false), genreChip('Drama', false),
        genreChip('Sci-Fi', false), genreChip('Comedy', false), genreChip('Thriller', false),
      ],
    }),
    frame('TrendingSection', {
      autoLayout: vertical({ spacing: 14, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Trending Now', { fontSize: 20, fontWeight: 700, color: light }),
        frame('MovieRow', { autoLayout: horizontal({ spacing: 14 }), children: [
          movieCard('Echoes of Time', '2026', '8.2', '#7c3aed', '#4c1d95'),
          movieCard('Midnight Sun', '2025', '7.9', '#0284c7', '#075985'),
          movieCard('The Algorithm', '2026', '8.5', '#059669', '#065f46'),
          movieCard('Parallel Lines', '2025', '7.6', '#d97706', '#92400e'),
          movieCard('Neon Dynasty', '2026', '8.1', '#e11d48', '#9f1239'),
          movieCard('Silent Depths', '2025', '7.8', '#4f46e5', '#3730a3'),
        ]}),
      ],
    }),
  ],
});
