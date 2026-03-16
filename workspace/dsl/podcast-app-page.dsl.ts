/**
 * Podcast App — Episode cards, podcast library, now playing bar
 * DSL features: dark theme, gradient art squares, progress bar, SPACE_BETWEEN, horizontal rows
 */
import { frame, text, rectangle, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function episodeCard(title: string, podcast: string, duration: string, color1: string, color2: string) {
  return frame(`Episode: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#27272a')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Art', { size: { x: 64, y: 64 }, fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)], cornerRadius: 8 }),
      frame('EpInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          text(podcast, { fontSize: 12, fontWeight: 400, color: '#a1a1aa' }),
          text(duration, { fontSize: 11, fontWeight: 500, color: '#71717a' }),
        ],
      }),
      frame('PlayBtn', {
        size: { x: 36, y: 36 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ffffff1a')],
        cornerRadius: 18,
        children: [text('Play', { fontSize: 10, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
      }),
    ],
  });
}

function podcastRow(name: string, author: string, episodes: string, color1: string, color2: string) {
  return frame(`Podcast: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('Art', { size: { x: 44, y: 44 }, fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)], cornerRadius: 8 }),
      frame('PodInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          text(author, { fontSize: 12, fontWeight: 400, color: '#71717a' }),
        ],
      }),
      text(episodes, { fontSize: 11, fontWeight: 400, color: '#52525b' }),
    ],
  });
}

export default frame('PodcastAppPage', {
  size: { x: 480 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#18181b')],
  children: [
    // Now playing bar
    frame('NowPlaying', {
      autoLayout: vertical({ spacing: 8, padX: 16, padY: 12 }),
      fills: [solid('#27272a')],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('NowTop', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('NowArt', { size: { x: 40, y: 40 }, fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#ec4899', position: 1 }], 135)], cornerRadius: 6 }),
            frame('NowInfo', {
              autoLayout: vertical({ spacing: 2 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('The Future of AI Design', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
                text('Design Matters', { fontSize: 11, fontWeight: 400, color: '#71717a' }),
              ],
            }),
            text('Pause', { fontSize: 12, fontWeight: 600, color: '#a78bfa' }),
          ],
        }),
        frame('NowProgress', {
          size: { x: 1, y: 3 },
          fills: [solid('#3f3f46')],
          cornerRadius: 2,
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            rectangle('NowFill', { size: { x: 200, y: 3 }, fills: [solid('#a78bfa')], cornerRadius: 2 }),
          ],
        }),
      ],
    }),
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 16, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Podcasts', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
        frame('SearchBar', {
          autoLayout: horizontal({ spacing: 0, padX: 14, padY: 8 }),
          fills: [solid('#27272a')],
          cornerRadius: 8,
          children: [text('Search...', { fontSize: 13, fontWeight: 400, color: '#52525b' })],
        }),
      ],
    }),
    // Continue Listening
    frame('ContinueSection', {
      autoLayout: vertical({ spacing: 12, padX: 16, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Continue Listening', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
        episodeCard('The Future of AI Design', 'Design Matters', '45 min', '#7c3aed', '#ec4899'),
        episodeCard('Building at Scale', 'Tech Leaders', '32 min', '#3b82f6', '#06b6d4'),
        episodeCard('Mindful Productivity', 'Deep Work', '28 min', '#10b981', '#84cc16'),
      ],
    }),
    // Library
    frame('LibrarySection', {
      autoLayout: vertical({ spacing: 8, padX: 16, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Your Library', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
        podcastRow('Design Matters', 'Debbie Millman', '486 eps', '#7c3aed', '#ec4899'),
        podcastRow('Tech Leaders', 'Sam Harris', '312 eps', '#3b82f6', '#06b6d4'),
        podcastRow('Deep Work', 'Cal Newport', '156 eps', '#10b981', '#84cc16'),
        podcastRow('Startup Stories', 'Y Combinator', '243 eps', '#f59e0b', '#ef4444'),
        podcastRow('Code Review', 'Kent C. Dodds', '89 eps', '#6366f1', '#8b5cf6'),
      ],
    }),
  ],
});
