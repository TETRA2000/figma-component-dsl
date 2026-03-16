/**
 * Neon Gaming — Game library with neon gradients, thick strokes, high cornerRadius
 *
 * DSL features stressed: multi-stop gradients, gradient angles, thick strokes,
 * high cornerRadius, clipContent, neon color palette
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function usernameTag(name: string, level: string) {
  return frame(`User: ${name}`, {
    autoLayout: horizontal({ spacing: 8, padX: 16, padY: 6, counterAlign: 'CENTER' }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(name, { fontSize: 13, fontWeight: 600, color: '#00d4ff' }),
      text(level, { fontSize: 11, fontWeight: 500, color: '#666666' }),
    ],
  });
}

function gameCard(title: string, genre: string, players: string) {
  return frame(`Game: ${title}`, {
    size: { x: 260 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#141414')],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 1, g: 0.18, b: 0.33, a: 1 }, weight: 2, align: 'INSIDE' }],
    children: [
      // Cover with neon gradient
      frame('Cover', {
        size: { x: 260, y: 160 },
        fills: [gradient([
          { hex: '#ff2d55', position: 0 },
          { hex: '#0a0a0a', position: 0.5 },
          { hex: '#00d4ff', position: 1 },
        ], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [
          // LIVE badge
          frame('LiveBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4, align: 'CENTER' }),
            fills: [solid('#ff2d55')],
            cornerRadius: 9999,
            x: 190,
            y: 10,
            children: [
              text('LIVE', { fontSize: 10, fontWeight: 700, color: '#ffffff', letterSpacing: { value: 5, unit: 'PERCENT' } }),
            ],
          }),
        ],
      }),
      // Info
      frame('Info', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
          text(genre, { fontSize: 12, fontWeight: 500, color: '#00d4ff' }),
          text(players, { fontSize: 11, fontWeight: 400, color: '#666666' }),
        ],
      }),
    ],
  });
}

function leaderboardRow(rank: number, name: string, score: string, isTop: boolean) {
  const row = frame(`Rank ${rank}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#141414')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    ...(isTop ? { strokes: [{ color: { r: 0.22, g: 1, b: 0.08, a: 1 }, weight: 1, align: 'INSIDE' }] } : {}),
    children: [
      text(`#${rank}`, { fontSize: 14, fontWeight: 700, color: '#ff2d55', size: { x: 32 } }),
      // Avatar gradient circle
      rectangle(`Avatar${rank}`, {
        size: { x: 32, y: 32 },
        fills: [gradient([
          { hex: '#00d4ff', position: 0 },
          { hex: '#ff2d55', position: 1 },
        ], 135)],
        cornerRadius: 16,
      }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#ffffff', layoutSizingHorizontal: 'FILL' }),
      text(score, { fontSize: 13, fontWeight: 600, color: '#39ff14' }),
    ],
  });
  return row;
}

export default frame('NeonGamingPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Hero banner with gradient overlay
    frame('HeroBanner', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 48, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      fills: [gradient([
        { hex: '#ff2d5526', position: 0 },
        { hex: '#0a0a0a', position: 0.5 },
        { hex: '#00d4ff26', position: 1 },
      ], 0)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeroText', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('NEXUS GAMING', {
              fontSize: 36, fontWeight: 700, color: '#ff2d55',
              letterSpacing: { value: -2, unit: 'PERCENT' },
            }),
            text('Your gateway to the metaverse', { fontSize: 14, fontWeight: 400, color: '#666666' }),
          ],
        }),
        frame('UserTags', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            usernameTag('xNova_', 'Lv. 42'),
            usernameTag('GhostRider', 'Lv. 38'),
          ],
        }),
      ],
    }),

    // Featured Games
    frame('FeaturedSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FeaturedHeader', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            rectangle('GreenDot', { size: { x: 10, y: 10 }, fills: [solid('#39ff14')] }),
            text('Featured Games', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        frame('GameGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            gameCard('Cyber Nexus', 'Action RPG', '24.5K playing'),
            gameCard('Void Runners', 'Battle Royale', '18.2K playing'),
            gameCard('Neon Drift', 'Racing', '12.8K playing'),
            gameCard('Shadow Protocol', 'Tactical FPS', '31.4K playing'),
          ],
        }),
      ],
    }),

    // Leaderboard
    frame('LeaderboardSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeaderboardHeader', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('\u25B2', { fontSize: 14, fontWeight: 700, color: '#ff2d55' }),
            text('Global Leaderboard', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        frame('LeaderboardList', {
          size: { x: 600 },
          autoLayout: vertical({ spacing: 8 }),
          children: [
            leaderboardRow(1, 'xNova_', '48,250 pts', true),
            leaderboardRow(2, 'GhostRider', '45,100 pts', false),
            leaderboardRow(3, 'ByteStorm', '42,800 pts', false),
            leaderboardRow(4, 'PixelPhantom', '39,650 pts', false),
            leaderboardRow(5, 'NeonShadow', '37,200 pts', false),
          ],
        }),
      ],
    }),
  ],
});
