/**
 * Recommendations Feed — "Because you watched" sections, card rows, ratings
 * Batch 8, Page 80: Media/Entertainment (loosen image-refs)
 * DSL Features: multi-stop gradients, horizontal card rows, star ratings, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function contentCard(title: string, subtitle: string, rating: string, gradientColors: [string, string]) {
  return frame(`Card: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 200, y: undefined },
    cornerRadius: 10,
    clipContent: true,
    children: [
      rectangle('Poster', {
        size: { x: 200, y: 280 },
        fills: [gradient([
          { hex: gradientColors[0], position: 0 },
          { hex: gradientColors[1], position: 1 },
        ], 160)],
      }),
      frame('CardInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#1a1a2e')],
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#f1f5f9' }),
          text(subtitle, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
          frame('RatingRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
            children: [
              text('★', { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
              text(rating, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function recommendationRow(sectionTitle: string, reason: string, cards: Array<{ title: string; subtitle: string; rating: string; colors: [string, string] }>) {
  return frame(`Section: ${sectionTitle}`, {
    autoLayout: vertical({ spacing: 16, padX: 60, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SectionHeader', {
        autoLayout: vertical({ spacing: 4 }),
        children: [
          text(sectionTitle, { fontSize: 20, fontWeight: 700, color: '#f1f5f9' }),
          text(reason, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      frame('CardRow', {
        autoLayout: horizontal({ spacing: 16 }),
        children: cards.map(c => contentCard(c.title, c.subtitle, c.rating, c.colors)),
      }),
    ],
  });
}

export default component('Recommendations', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a1a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('StreamFlix', { fontSize: 24, fontWeight: 800, color: '#e11d48', layoutSizingHorizontal: 'FILL' }),
        frame('HeaderNav', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Home', { fontSize: 14, fontWeight: 500, color: '#f1f5f9' }),
            text('Movies', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
            text('TV Shows', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
            text('My List', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Hero Recommendation
    frame('HeroRec', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#0a0a1a', position: 0 },
        { hex: '#1a0a2e', position: 0.5 },
        { hex: '#0a0a1a', position: 1 },
      ], 135)],
      children: [
        text('Top Pick for You', { fontSize: 14, fontWeight: 600, color: '#e11d48', letterSpacing: { value: 5, unit: 'PERCENT' } }),
        text('The Grand Expedition', { fontSize: 42, fontWeight: 800, color: '#ffffff' }),
        text('A breathtaking journey through uncharted territories.\n98% match based on your viewing history.', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          lineHeight: { value: 24, unit: 'PIXELS' },
        }),
        frame('HeroCTAs', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('PlayBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#e11d48')],
              cornerRadius: 8,
              children: [text('Play', { fontSize: 15, fontWeight: 600, color: '#ffffff' })],
            }),
            frame('ListBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#1e293b')],
              cornerRadius: 8,
              strokes: [{ color: { r: 0.4, g: 0.4, b: 0.4, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [text('+ My List', { fontSize: 15, fontWeight: 600, color: '#e2e8f0' })],
            }),
          ],
        }),
      ],
    }),

    // Recommendation Rows
    recommendationRow('Because You Watched "Inception"', 'Mind-bending thrillers with complex narratives', [
      { title: 'Interstellar', subtitle: 'Sci-Fi, 2014', rating: '4.8', colors: ['#1e3a5f', '#0c4a6e'] },
      { title: 'Tenet', subtitle: 'Action, 2020', rating: '4.2', colors: ['#312e81', '#1e1b4b'] },
      { title: 'Memento', subtitle: 'Thriller, 2000', rating: '4.6', colors: ['#1c1917', '#44403c'] },
      { title: 'Shutter Island', subtitle: 'Mystery, 2010', rating: '4.5', colors: ['#1a2e05', '#365314'] },
      { title: 'The Prestige', subtitle: 'Drama, 2006', rating: '4.7', colors: ['#3f0f0f', '#7f1d1d'] },
    ]),

    recommendationRow('Trending Now', 'Most popular this week', [
      { title: 'Dune: Part Three', subtitle: 'Sci-Fi, 2026', rating: '4.9', colors: ['#78350f', '#451a03'] },
      { title: 'The Algorithm', subtitle: 'Thriller, 2026', rating: '4.3', colors: ['#0c4a6e', '#164e63'] },
      { title: 'Neon Nights', subtitle: 'Action, 2026', rating: '4.1', colors: ['#4a044e', '#701a75'] },
      { title: 'Ocean Deep', subtitle: 'Adventure, 2025', rating: '4.4', colors: ['#0e4429', '#14532d'] },
      { title: 'Last Light', subtitle: 'Drama, 2026', rating: '4.6', colors: ['#1e1b4b', '#312e81'] },
    ]),

    recommendationRow('Award Winners', 'Critically acclaimed masterpieces', [
      { title: 'Everything Everywhere', subtitle: 'Comedy, 2022', rating: '4.9', colors: ['#701a75', '#86198f'] },
      { title: 'Parasite', subtitle: 'Thriller, 2019', rating: '4.8', colors: ['#365314', '#4d7c0f'] },
      { title: 'Moonlight', subtitle: 'Drama, 2016', rating: '4.7', colors: ['#1e3a8a', '#1e40af'] },
      { title: 'The Shape of Water', subtitle: 'Fantasy, 2017', rating: '4.3', colors: ['#164e63', '#155e75'] },
      { title: 'Nomadland', subtitle: 'Drama, 2020', rating: '4.5', colors: ['#78350f', '#92400e'] },
    ]),
  ],
});
