/**
 * Podcast Detail — Cover Art + Episode List + Show Notes
 * Batch 8, Page 3: Media/Entertainment — Podcast show page
 * DSL Features: large image placeholders, dark fills, multi-stop gradients
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaPodcast', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Header Bar
    frame('HeaderBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('PODWAVE', { fontSize: 20, fontWeight: 800, color: '#e11d48' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Discover', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
            text('Library', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
            text('Search', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
          ],
        }),
      ],
    }),

    // Podcast Hero
    frame('PodcastHero', {
      autoLayout: horizontal({ spacing: 40, padX: 60, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a20', position: 0 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      children: [
        // Cover Art Placeholder
        rectangle('CoverArt', {
          size: { x: 280, y: 280 },
          fills: [
            gradient([
              { hex: '#e11d48', position: 0 },
              { hex: '#7c1d3e', position: 0.5 },
              { hex: '#2d0a1a', position: 1 },
            ], 135),
          ],
          cornerRadius: 16,
        }),

        // Show Info
        frame('ShowInfo', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 600, y: undefined },
          children: [
            text('PODCAST', { fontSize: 12, fontWeight: 700, color: '#e11d48', letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('The Deep Dive', { fontSize: 40, fontWeight: 800, color: '#ffffff', lineHeight: { value: 44, unit: 'PIXELS' } }),
            text('by Sarah Chen & Marcus Webb', { fontSize: 16, fontWeight: 400, color: '#a3a3a3' }),
            text('An investigative podcast exploring the stories behind the world\'s most fascinating unsolved mysteries, scientific breakthroughs, and cultural phenomena.', {
              fontSize: 15, fontWeight: 400, color: '#737373',
              lineHeight: { value: 24, unit: 'PIXELS' },
              size: { x: 560 }, textAutoResize: 'HEIGHT',
            }),
            frame('PodcastMeta', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                text('★ 4.8', { fontSize: 14, fontWeight: 600, color: '#fbbf24' }),
                text('•', { fontSize: 14, fontWeight: 400, color: '#525252' }),
                text('142 episodes', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
                text('•', { fontSize: 14, fontWeight: 400, color: '#525252' }),
                text('Weekly', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
              ],
            }),
            frame('PodcastActions', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                frame('SubscribeBtn', {
                  autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#e11d48')],
                  cornerRadius: 999,
                  children: [
                    text('Subscribe', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
                frame('ShareBtn', {
                  autoLayout: horizontal({ padX: 28, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#1a1a1a')],
                  cornerRadius: 999,
                  strokes: [{ color: { r: 0.3, g: 0.3, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Share', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Episode List
    frame('EpisodeSection', {
      autoLayout: vertical({ spacing: 0, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Latest Episodes', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        rectangle('Divider', { size: { x: 1320, y: 1 }, fills: [solid('#1a1a1a')] }),
        episodeRow(142, 'The Vanishing Lake', 'Mar 12, 2026', '1h 14m', 'A remote lake in Siberia that disappears every decade reveals clues about underground river systems.'),
        episodeRow(141, 'Code Breakers', 'Mar 5, 2026', '58m', 'The untold story of the team that cracked an "unbreakable" encryption algorithm.'),
        episodeRow(140, 'Ghost Frequencies', 'Feb 26, 2026', '1h 2m', 'Strange radio signals from deep space continue to puzzle astronomers worldwide.'),
        episodeRow(139, 'The Memory Merchant', 'Feb 19, 2026', '47m', 'Can memories be artificially enhanced? We explore the cutting edge of neuroscience.'),
        episodeRow(138, 'Lost Civilizations', 'Feb 12, 2026', '1h 8m', 'Recent archaeological discoveries that are rewriting ancient history.'),
      ],
    }),

    // Show Notes Section
    frame('ShowNotes', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('About This Show', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
        text('The Deep Dive is a weekly investigative podcast that takes listeners on a journey through the most compelling mysteries and discoveries of our time. Each episode features in-depth research, expert interviews, and immersive storytelling.\n\nNew episodes drop every Wednesday. Available on all major podcast platforms.', {
          fontSize: 15, fontWeight: 400, color: '#a3a3a3',
          lineHeight: { value: 24, unit: 'PIXELS' },
          size: { x: 800 }, textAutoResize: 'HEIGHT',
        }),
        frame('Tags', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            tagPill('Science'),
            tagPill('Mystery'),
            tagPill('Investigative'),
            tagPill('True Stories'),
          ],
        }),
      ],
    }),
  ],
});

function episodeRow(num: number, title: string, date: string, duration: string, description: string) {
  return frame(`Ep ${num}`, {
    autoLayout: horizontal({ spacing: 16, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(`${num}`, { fontSize: 16, fontWeight: 700, color: '#525252', size: { x: 40 }, textAutoResize: 'HEIGHT' }),
      frame('PlayIcon', {
        autoLayout: horizontal({ padX: 10, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#e11d48')],
        cornerRadius: 20,
        size: { x: 40, y: 40 },
        children: [
          text('▶', { fontSize: 14, fontWeight: 400, color: '#ffffff' }),
        ],
      }),
      frame('EpDetails', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#737373',
            lineHeight: { value: 20, unit: 'PIXELS' },
            size: { x: 700 }, textAutoResize: 'HEIGHT',
          }),
        ],
      }),
      frame('EpMeta', {
        autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
        size: { x: 100, y: undefined },
        children: [
          text(date, { fontSize: 12, fontWeight: 400, color: '#525252' }),
          text(duration, { fontSize: 13, fontWeight: 600, color: '#a3a3a3' }),
        ],
      }),
    ],
  });
}

function tagPill(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 999,
    strokes: [{ color: { r: 0.25, g: 0.25, b: 0.25, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#a3a3a3' }),
    ],
  });
}
