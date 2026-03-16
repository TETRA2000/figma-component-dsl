/**
 * Video Streaming — Netflix-style dark theme with hero banner and content rows
 * DSL features: gradient hero overlay, clipContent, cornerRadius, horizontal scrolling rows,
 * opacity for metadata text, FILL layout, SPACE_BETWEEN for nav
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function navLink(label: string, active: boolean) {
  return text(label, {
    fontSize: 14, fontWeight: active ? 700 : 400,
    color: active ? '#ffffff' : '#ffffffaa',
    textDecoration: active ? 'UNDERLINE' : 'NONE',
  });
}

function contentCard(title: string, year: string, rating: string, gradFrom: string, gradTo: string) {
  return frame(`Card: ${title}`, {
    size: { x: 200 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#1a1a2e')],
    cornerRadius: 8,
    clipContent: true,
    children: [
      rectangle('Poster', {
        size: { x: 200, y: 280 },
        fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 160)],
      }),
      frame('CardInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 10 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          frame('CardMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(year, { fontSize: 11, fontWeight: 400, color: '#ffffffaa', opacity: 0.7 }),
              frame('RatingBadge', {
                autoLayout: horizontal({ spacing: 0, padX: 6, padY: 2 }),
                fills: [solid('#e50914')],
                cornerRadius: 4,
                children: [text(rating, { fontSize: 10, fontWeight: 700, color: '#ffffff' })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function contentRow(sectionTitle: string, cards: ReturnType<typeof contentCard>[]) {
  return frame(`Section: ${sectionTitle}`, {
    autoLayout: vertical({ spacing: 14, padX: 48, padY: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(sectionTitle, { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
      frame('Row', {
        autoLayout: horizontal({ spacing: 16 }),
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: cards,
      }),
    ],
  });
}

export default frame('VideoStreamingPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0d0d1a')],
  children: [
    // Navigation bar
    frame('NavBar', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 16, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0d0d1a', position: 0 }, { hex: '#0d0d1aaa', position: 1 }], 180)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('STREAMFLIX', { fontSize: 22, fontWeight: 800, color: '#e50914' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            navLink('Home', true),
            navLink('Series', false),
            navLink('Movies', false),
            navLink('My List', false),
          ],
        }),
      ],
    }),
    // Hero banner
    frame('HeroBanner', {
      size: { x: 1200, y: 420 },
      fills: [gradient([{ hex: '#1a0a2e', position: 0 }, { hex: '#2d1b69', position: 0.5 }, { hex: '#0d0d1a', position: 1 }], 135)],
      clipContent: true,
      children: [
        // Overlay gradient for text readability
        rectangle('HeroOverlay', {
          size: { x: 1200, y: 420 },
          fills: [gradient([{ hex: '#0d0d1a', position: 0 }, { hex: '#0d0d1a00', position: 0.6 }], 90)],
        }),
        frame('HeroContent', {
          autoLayout: vertical({ spacing: 16, padX: 48, padY: 80 }),
          size: { x: 500 },
          children: [
            frame('TopTenBadge', {
              autoLayout: horizontal({ spacing: 8, padX: 12, padY: 6, counterAlign: 'CENTER' }),
              fills: [solid('#e50914')],
              cornerRadius: 4,
              children: [
                text('TOP 10', { fontSize: 12, fontWeight: 800, color: '#ffffff' }),
              ],
            }),
            text('The Quantum Paradox', { fontSize: 40, fontWeight: 800, color: '#ffffff', lineHeight: { value: 110, unit: 'PERCENT' } }),
            text('A physicist discovers a way to communicate across parallel universes, but each message creates catastrophic consequences in both worlds.', {
              fontSize: 15, fontWeight: 400, color: '#ffffffcc',
              size: { x: 440 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 155, unit: 'PERCENT' },
            }),
            frame('HeroButtons', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                frame('PlayBtn', {
                  autoLayout: horizontal({ spacing: 8, padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff')],
                  cornerRadius: 6,
                  children: [text('Play', { fontSize: 15, fontWeight: 700, color: '#000000' })],
                }),
                frame('InfoBtn', {
                  autoLayout: horizontal({ spacing: 8, padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff33')],
                  cornerRadius: 6,
                  children: [text('More Info', { fontSize: 15, fontWeight: 600, color: '#ffffff' })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Content rows
    contentRow('Trending Now', [
      contentCard('Neon Shadows', '2026', '98%', '#ff6b6b', '#2d1b69'),
      contentCard('Arctic Code', '2025', '95%', '#4ecdc4', '#1a1a2e'),
      contentCard('Last Signal', '2026', '91%', '#f7dc6f', '#1a0a2e'),
      contentCard('Deep State', '2024', '88%', '#e74c3c', '#0d0d1a'),
      contentCard('Echoes', '2026', '94%', '#9b59b6', '#1a1a2e'),
    ]),
    contentRow('New Releases', [
      contentCard('Solar Wind', '2026', '92%', '#3498db', '#0d0d1a'),
      contentCard('The Vault', '2026', '89%', '#e67e22', '#1a0a2e'),
      contentCard('Midnight Run', '2026', '96%', '#1abc9c', '#2d1b69'),
      contentCard('Binary Star', '2025', '87%', '#e84393', '#1a1a2e'),
      contentCard('Code Zero', '2026', '93%', '#6c5ce7', '#0d0d1a'),
    ]),
  ],
});
