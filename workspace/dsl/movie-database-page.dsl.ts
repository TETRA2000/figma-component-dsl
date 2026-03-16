/**
 * Movie Database — IMDB-style page with movie cards, ratings, cast list, and genre tags
 * DSL features stressed: gradient poster placeholders, pill tags, star ratings, two-column layout,
 * horizontal scrollable cast list, nested grids, FILL sizing
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function movieCard(title: string, year: string, rating: string, genres: string[], posterGrad: [string, string]) {
  return frame(`Movie: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 0, padY: 0 }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle('Poster', {
        size: { x: 1, y: 200 },
        fills: [gradient([{ hex: posterGrad[0], position: 0 }, { hex: posterGrad[1], position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('MovieInfo', {
        autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 15, fontWeight: 700, color: '#f1f5f9' }),
          frame('YearRating', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(year, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
              frame('RatingBadge', {
                autoLayout: horizontal({ spacing: 4, padX: 8, padY: 3 }),
                fills: [solid('#f59e0b1a')],
                cornerRadius: 6,
                children: [
                  text('★', { fontSize: 11, fontWeight: 700, color: '#f59e0b' }),
                  text(rating, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
                ],
              }),
            ],
          }),
          frame('GenreTags', {
            autoLayout: horizontal({ spacing: 6 }),
            children: genres.map(g =>
              frame(`Tag: ${g}`, {
                autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
                fills: [solid('#ffffff0d')],
                cornerRadius: 6,
                children: [
                  text(g, { fontSize: 10, fontWeight: 500, color: '#94a3b8' }),
                ],
              })
            ),
          }),
        ],
      }),
    ],
  });
}

function castMember(name: string, role: string, avatarColor: string) {
  return frame(`Cast: ${name}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      ellipse('CastAvatar', { size: { x: 64, y: 64 }, fills: [gradient([{ hex: avatarColor, position: 0 }, { hex: '#0f172a', position: 1 }], 180)] }),
      text(name, { fontSize: 12, fontWeight: 600, color: '#f1f5f9', textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 11, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function genreFilter(label: string, active: boolean) {
  return frame(`Genre: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
    fills: [solid(active ? '#f59e0b' : '#ffffff0d')],
    cornerRadius: 9999,
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: active ? '#0f172a' : '#94a3b8' }),
    ],
  });
}

export default frame('MovieDatabasePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Navigation bar
    frame('NavBar', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a1a2e')],
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('CineDB', { fontSize: 22, fontWeight: 800, color: '#f59e0b' }),
        frame('SearchBar', {
          size: { x: 360 },
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10 }),
          fills: [solid('#ffffff0d')],
          cornerRadius: 8,
          children: [
            text('Search movies, actors, directors...', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
          ],
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            text('Movies', { fontSize: 14, fontWeight: 600, color: '#f59e0b' }),
            text('TV Shows', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
            text('People', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Featured movie hero
        frame('FeaturedHero', {
          autoLayout: horizontal({ spacing: 28, padX: 28, padY: 28 }),
          fills: [gradient([{ hex: '#1e293b', position: 0 }, { hex: '#0f172a', position: 1 }], 135)],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            rectangle('HeroPoster', {
              size: { x: 200, y: 280 },
              fills: [gradient([{ hex: '#6366f1', position: 0 }, { hex: '#a855f7', position: 0.5 }, { hex: '#ec4899', position: 1 }], 135)],
              cornerRadius: 12,
            }),
            frame('HeroInfo', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('FeaturedLabel', {
                  autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
                  fills: [solid('#f59e0b')],
                  cornerRadius: 6,
                  children: [
                    text('FEATURED', { fontSize: 10, fontWeight: 700, color: '#0f172a' }),
                  ],
                }),
                text('The Last Horizon', { fontSize: 28, fontWeight: 800, color: '#f1f5f9' }),
                frame('HeroMeta', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    text('2026', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
                    text('2h 18min', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
                    text('PG-13', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
                    frame('HeroRating', {
                      autoLayout: horizontal({ spacing: 4, padX: 10, padY: 4 }),
                      fills: [solid('#f59e0b1a')],
                      cornerRadius: 6,
                      children: [
                        text('★ 8.7', { fontSize: 13, fontWeight: 700, color: '#f59e0b' }),
                      ],
                    }),
                  ],
                }),
                text('In a world where time itself is unraveling, a lone astronaut must journey beyond the edge of known space to find the key to humanity\'s survival. A visually stunning epic that blends hard science fiction with deeply human storytelling.', {
                  fontSize: 14, fontWeight: 400, color: '#94a3b8',
                  lineHeight: { value: 160, unit: 'PERCENT' },
                  size: { x: 500 },
                  textAutoResize: 'HEIGHT',
                }),
                frame('HeroGenres', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    genreFilter('Sci-Fi', true),
                    genreFilter('Drama', false),
                    genreFilter('Adventure', false),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Cast section
        frame('CastSection', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Top Cast', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
            frame('CastRow', {
              autoLayout: horizontal({ spacing: 20 }),
              children: [
                castMember('Elena Voss', 'Captain Aria', '#6366f1'),
                castMember('Marcus Cole', 'Dr. Reeves', '#22c55e'),
                castMember('Lin Zhao', 'Navigator', '#f59e0b'),
                castMember('James Park', 'Engineer', '#ef4444'),
                castMember('Sophie Bell', 'AI Voice', '#ec4899'),
                castMember('Omar Diaz', 'Commander', '#06b6d4'),
              ],
            }),
          ],
        }),

        // Genre filter + movie grid
        frame('BrowseSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Browse Movies', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
            frame('GenreFilters', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                genreFilter('All', true),
                genreFilter('Action', false),
                genreFilter('Comedy', false),
                genreFilter('Drama', false),
                genreFilter('Horror', false),
                genreFilter('Sci-Fi', false),
                genreFilter('Thriller', false),
              ],
            }),
            frame('MovieGrid', {
              autoLayout: horizontal({ spacing: 14 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                movieCard('Neon Requiem', '2025', '7.9', ['Action', 'Thriller'], ['#ef4444', '#7c3aed']),
                movieCard('Whispers in Rain', '2026', '8.3', ['Drama', 'Romance'], ['#06b6d4', '#0ea5e9']),
                movieCard('Shadow Protocol', '2025', '7.4', ['Action', 'Spy'], ['#1e293b', '#475569']),
                movieCard('Garden of Stars', '2026', '8.8', ['Sci-Fi', 'Fantasy'], ['#22c55e', '#14b8a6']),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
