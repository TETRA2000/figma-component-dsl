/**
 * Movie Listing Page — Featured Hero + Genre Tabs + Poster Grid
 * Batch 8, Page 1: Media/Entertainment — Dark theme movie catalog
 * DSL Features: multi-stop gradients, rectangle placeholders, dark theme fills
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaMovies', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('CINEMAX', { fontSize: 22, fontWeight: 800, color: '#e11d48' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Movies', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            text('TV Shows', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('My List', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('New & Popular', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
          ],
        }),
      ],
    }),

    // Featured Movie Hero
    frame('FeaturedHero', {
      size: { x: 1440, y: 560 },
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 0, align: 'MAX' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a1a', position: 0 },
          { hex: '#2d0a1a', position: 0.3 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      clipContent: true,
      children: [
        frame('HeroContent', {
          autoLayout: vertical({ spacing: 16, padY: 40 }),
          children: [
            text('Featured Film', { fontSize: 13, fontWeight: 600, color: '#e11d48', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('The Last Horizon', { fontSize: 52, fontWeight: 800, color: '#ffffff', lineHeight: { value: 56, unit: 'PIXELS' } }),
            text('A breathtaking sci-fi epic that explores humanity\'s final frontier.\n2h 34m  |  Sci-Fi, Drama  |  2026', {
              fontSize: 16, fontWeight: 400, color: '#a3a3a3',
              lineHeight: { value: 26, unit: 'PIXELS' },
              size: { x: 500 }, textAutoResize: 'HEIGHT',
            }),
            frame('HeroCTAs', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                frame('PlayBtn', {
                  autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#e11d48')],
                  cornerRadius: 8,
                  children: [
                    text('▶  Play Now', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
                frame('InfoBtn', {
                  autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff', 0.1)],
                  cornerRadius: 8,
                  children: [
                    text('ⓘ  More Info', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Genre Tabs
    frame('GenreTabs', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        genreTab('All', true),
        genreTab('Action', false),
        genreTab('Comedy', false),
        genreTab('Drama', false),
        genreTab('Sci-Fi', false),
        genreTab('Horror', false),
        genreTab('Romance', false),
        genreTab('Thriller', false),
      ],
    }),

    // Movie Poster Grid
    frame('PosterSection', {
      autoLayout: vertical({ spacing: 32, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Trending Now', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('PosterRow1', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            moviePoster('Stellar Dawn', '#4a1942', '#1a0a2e'),
            moviePoster('Iron Requiem', '#2d1810', '#0a0a0a'),
            moviePoster('Neon Pulse', '#0a2d3d', '#0a0a1a'),
            moviePoster('The Divide', '#1a2d1a', '#0a0a0a'),
            moviePoster('Crimson Sky', '#3d0a1a', '#0a0a0a'),
          ],
        }),
        text('Top Rated', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('PosterRow2', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            moviePoster('Midnight Run', '#1a1a3d', '#0a0a1a'),
            moviePoster('Echo Valley', '#2d2d0a', '#0a0a0a'),
            moviePoster('Dark Water', '#0a1a2d', '#0a0a0a'),
            moviePoster('Last Breath', '#2d0a0a', '#0a0a0a'),
            moviePoster('Silent Road', '#1a1a1a', '#0a0a0a'),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('© 2026 Cinemax. All rights reserved.', { fontSize: 13, fontWeight: 400, color: '#525252' }),
      ],
    }),
  ],
});

function genreTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#e11d48')] : [],
    cornerRadius: 6,
    children: [
      text(label, {
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#ffffff' : '#a3a3a3',
      }),
    ],
  });
}

function moviePoster(title: string, gradStart: string, gradEnd: string) {
  return frame(`Poster: ${title}`, {
    size: { x: 240, y: 340 },
    autoLayout: vertical({ spacing: 4, padX: 12, padY: 12, align: 'MAX' }),
    fills: [
      gradient([
        { hex: gradStart, position: 0 },
        { hex: gradEnd, position: 1 },
      ], 270),
    ],
    cornerRadius: 8,
    clipContent: true,
    children: [
      frame('Rating', {
        autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#000000', 0.6)],
        cornerRadius: 4,
        children: [
          text('★ 8.4', { fontSize: 12, fontWeight: 600, color: '#fbbf24' }),
        ],
      }),
      text(title, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
    ],
  });
}
