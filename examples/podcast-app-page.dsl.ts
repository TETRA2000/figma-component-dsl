import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const coral = '#f43f5e'; const coralDark = '#e11d48'; const dark = '#18181b'; const surface = '#27272a';
const white = '#ffffff'; const gray = '#a1a1aa'; const dimGray = '#52525b'; const bg = '#09090b';

function podcastCard(title: string, host: string, eps: string, g1: string, g2: string) {
  return frame(`Pod: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 180, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('Cover', { size: { x: 180, y: 180 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('PodInfo', { autoLayout: vertical({ spacing: 2, padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: white }),
        text(host, { fontSize: 11, fontWeight: 400, color: gray }),
        text(eps, { fontSize: 11, fontWeight: 400, color: dimGray }),
      ]}),
    ],
  });
}

function episodeRow(title: string, podcast: string, duration: string, date: string, isPlaying: boolean) {
  return frame(`Ep: ${title}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, spacing: 12, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL', fills: isPlaying ? [solid(coral, 0.08)] : [],
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('EpLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        frame('PlayBtn', {
          size: { x: 36, y: 36 }, fills: [solid(isPlaying ? coral : dimGray)], cornerRadius: 18,
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [ellipse('PlayIcon', { size: { x: 12, y: 12 }, fills: [solid(white)] })],
        }),
        frame('EpInfo', { autoLayout: vertical({ spacing: 1 }), children: [
          text(title, { fontSize: 14, fontWeight: isPlaying ? 600 : 400, color: isPlaying ? coral : white }),
          text(podcast, { fontSize: 12, fontWeight: 400, color: gray }),
        ]}),
      ]}),
      frame('EpMeta', { autoLayout: horizontal({ spacing: 12 }), children: [
        text(duration, { fontSize: 12, fontWeight: 400, color: gray }),
        text(date, { fontSize: 12, fontWeight: 400, color: dimGray }),
      ]}),
    ],
  });
}

export default frame('PodcastApp', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(dark)],
      strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('PodStream', { fontSize: 20, fontWeight: 700, color: coral }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Discover', { fontSize: 14, fontWeight: 600, color: coral }),
          text('Library', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Following', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    frame('FeaturedBanner', {
      autoLayout: horizontal({ padX: 40, padY: 32, spacing: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a0a0e', position: 0 }, { hex: '#2a0a1e', position: 1 }], 90)],
      children: [
        rectangle('FeaturedCover', { size: { x: 160, y: 160 },
          fills: [gradient([{ hex: coral, position: 0 }, { hex: coralDark, position: 1 }], 135)], cornerRadius: 16 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 12 }), children: [
          text('Featured Podcast', { fontSize: 12, fontWeight: 600, color: coral, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
          text('The Design Mindset', { fontSize: 32, fontWeight: 700, color: white }),
          text('with Sarah Chen · 156 episodes', { fontSize: 14, fontWeight: 400, color: gray }),
          frame('FeaturedBtn', { autoLayout: horizontal({ padX: 20, padY: 10 }), fills: [solid(coral)], cornerRadius: 9999,
            children: [text('Listen Now', { fontSize: 14, fontWeight: 600, color: white })] }),
        ]}),
      ],
    }),
    frame('PopularSection', {
      autoLayout: vertical({ spacing: 16, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Shows', { fontSize: 20, fontWeight: 700, color: white }),
        frame('PodGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          podcastCard('Tech Talks', 'Alex Rivera', '234 episodes', '#3b82f6', '#1d4ed8'),
          podcastCard('Mind & Code', 'Maya Patel', '89 episodes', '#8b5cf6', '#6d28d9'),
          podcastCard('Startup Stories', 'James Wu', '167 episodes', '#f59e0b', '#d97706'),
          podcastCard('Science Now', 'Dr. Emily Brown', '312 episodes', '#10b981', '#059669'),
          podcastCard('Creative Hour', 'Luna Eclipse', '45 episodes', '#ec4899', '#db2777'),
          podcastCard('World Report', 'CNN Audio', '520 episodes', '#ef4444', '#dc2626'),
        ]}),
      ],
    }),
    frame('EpisodesSection', {
      autoLayout: vertical({ spacing: 8, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Recently Played', { fontSize: 18, fontWeight: 600, color: white }),
        episodeRow('The Future of Design Systems', 'The Design Mindset', '42 min', 'Today', true),
        episodeRow('Building with AI: A Developer Guide', 'Tech Talks', '58 min', 'Yesterday', false),
        episodeRow('From Idea to IPO', 'Startup Stories', '35 min', 'Mar 12', false),
        episodeRow('Quantum Computing Explained', 'Science Now', '47 min', 'Mar 11', false),
      ],
    }),
  ],
});
