import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const veryDark = '#0a0a0a';
const dark = '#141414';
const darkSurface = '#1a1a1a';
const neonPink = '#ff2d55';
const electricBlue = '#00d4ff';
const neonGreen = '#39ff14';
const white = '#ffffff';
const lightGray = '#a0a0a0';
const dimGray = '#666666';

// Game card
function gameCard(title: string, genre: string, isLive: boolean) {
  return frame(`Game: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 280, y: 340 },
    fills: [solid(darkSurface)],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 1, g: 0.18, b: 0.33, a: 0.3 }, weight: 2, align: 'INSIDE' as const }],
    children: [
      // Image placeholder with gradient
      frame('ImageArea', {
        size: { x: 280, y: 200 },
        fills: [gradient([
          { hex: neonPink, position: 0 },
          { hex: '#6a0080', position: 0.5 },
          { hex: electricBlue, position: 1 },
        ], 135)],
        autoLayout: vertical({ spacing: 0, padX: 12, padY: 12, align: 'MIN' }),
        children: [
          ...(isLive ? [
            frame('LiveBadge', {
              autoLayout: horizontal({ padX: 10, padY: 4, spacing: 6, counterAlign: 'CENTER' }),
              fills: [solid(neonPink)],
              cornerRadius: 9999,
              children: [
                ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid(white)] }),
                text('LIVE', { fontSize: 11, fontWeight: 700, color: white }),
              ],
            }),
          ] : []),
        ],
      }),
      // Info section
      frame('Info', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: white }),
          text(genre, { fontSize: 13, fontWeight: 400, color: lightGray }),
          frame('Rating', {
            autoLayout: horizontal({ spacing: 4 }),
            children: [
              ellipse('Star1', { size: { x: 12, y: 12 }, fills: [solid('#ffd700')] }),
              ellipse('Star2', { size: { x: 12, y: 12 }, fills: [solid('#ffd700')] }),
              ellipse('Star3', { size: { x: 12, y: 12 }, fills: [solid('#ffd700')] }),
              ellipse('Star4', { size: { x: 12, y: 12 }, fills: [solid('#ffd700')] }),
              ellipse('Star5', { size: { x: 12, y: 12 }, fills: [solid(dimGray)] }),
              text('4.2', { fontSize: 12, fontWeight: 500, color: lightGray }),
            ],
          }),
        ],
      }),
    ],
  });
}

// Leaderboard row
function leaderboardRow(rank: number, username: string, score: string, color: string) {
  return frame(`Rank ${rank}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 10, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(darkSurface, rank <= 3 ? 0.8 : 0.4)],
    cornerRadius: 8,
    strokes: rank <= 3 ? [{ color: { r: 0, g: 0.83, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' as const }] : [],
    children: [
      frame('Left', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('RankBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(color, 0.2)],
            cornerRadius: 6,
            size: { x: 32, y: 28 },
            children: [
              text(`#${rank}`, { fontSize: 13, fontWeight: 700, color: color }),
            ],
          }),
          rectangle('Avatar', {
            size: { x: 36, y: 36 },
            fills: [gradient([
              { hex: neonPink, position: 0 },
              { hex: electricBlue, position: 1 },
            ], 135)],
            cornerRadius: 18,
          }),
          text(username, { fontSize: 14, fontWeight: 600, color: white }),
        ],
      }),
      text(score, { fontSize: 14, fontWeight: 700, color: neonGreen }),
    ],
  });
}

// Username tag
function usernameTag(name: string) {
  return frame(`User: ${name}`, {
    autoLayout: horizontal({ padX: 12, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
    fills: [gradient([
      { hex: neonPink, position: 0 },
      { hex: electricBlue, position: 1 },
    ], 90)],
    cornerRadius: 9999,
    children: [
      ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid(neonGreen)] }),
      text(name, { fontSize: 13, fontWeight: 600, color: white }),
    ],
  });
}

// Featured banner
const featuredBanner = frame('FeaturedBanner', {
  size: { x: 1, y: 200 },
  layoutSizingHorizontal: 'FILL',
  fills: [gradient([
    { hex: '#0a0a0a', position: 0 },
    { hex: '#1a0030', position: 0.3 },
    { hex: '#002040', position: 0.7 },
    { hex: '#0a0a0a', position: 1 },
  ], 90)],
  autoLayout: vertical({ spacing: 16, padX: 48, padY: 32, align: 'CENTER', counterAlign: 'CENTER' }),
  children: [
    text('FEATURED GAME', {
      fontSize: 12,
      fontWeight: 700,
      color: neonPink,
      letterSpacing: { value: 4, unit: 'PIXELS' as const },
    }),
    text('Cyber Nexus: Uprising', {
      fontSize: 40,
      fontWeight: 700,
      color: white,
      letterSpacing: { value: -1, unit: 'PIXELS' as const },
    }),
    text('The next-gen cyberpunk RPG — Available now', {
      fontSize: 16,
      fontWeight: 400,
      color: lightGray,
    }),
    frame('CTAButtons', {
      autoLayout: horizontal({ spacing: 16 }),
      children: [
        frame('PlayNow', {
          autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [gradient([
            { hex: neonPink, position: 0 },
            { hex: '#cc0044', position: 1 },
          ], 135)],
          cornerRadius: 9999,
          children: [
            text('Play Now', { fontSize: 14, fontWeight: 700, color: white }),
          ],
        }),
        frame('WatchTrailer', {
          autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 9999,
          strokes: [{ color: { r: 0, g: 0.83, b: 1, a: 0.6 }, weight: 2, align: 'INSIDE' as const }],
          children: [
            text('Watch Trailer', { fontSize: 14, fontWeight: 600, color: electricBlue }),
          ],
        }),
      ],
    }),
  ],
});

export default frame('NeonGaming', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(veryDark)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(dark)],
      strokes: [{ color: { r: 1, g: 0.18, b: 0.33, a: 0.15 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('NEXUS', {
          fontSize: 24,
          fontWeight: 700,
          color: neonPink,
          letterSpacing: { value: 6, unit: 'PIXELS' as const },
        }),
        frame('OnlineUsers', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            usernameTag('xNova'),
            usernameTag('BlazeFury'),
            usernameTag('CyberWolf'),
          ],
        }),
      ],
    }),

    // Featured banner
    featuredBanner,

    // Game library
    frame('GameLibrary', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Games', { fontSize: 22, fontWeight: 700, color: white }),
        frame('GameGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            gameCard('Neon Runner', 'Action · Platformer', true),
            gameCard('Shadow Tactics', 'Strategy · Stealth', false),
            gameCard('Quantum Break', 'Sci-Fi · Shooter', true),
            gameCard('Drift Kings', 'Racing · Arcade', false),
          ],
        }),
      ],
    }),

    // Leaderboard
    frame('Leaderboard', {
      autoLayout: vertical({ spacing: 8, padX: 32, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Global Leaderboard', { fontSize: 22, fontWeight: 700, color: white }),
        leaderboardRow(1, 'xNova_Prime', '2,847,320', '#ffd700'),
        leaderboardRow(2, 'BlazeFury99', '2,654,110', '#c0c0c0'),
        leaderboardRow(3, 'CyberWolf_X', '2,401,850', '#cd7f32'),
        leaderboardRow(4, 'NightShade', '2,198,440', dimGray),
        leaderboardRow(5, 'PixelHunter', '1,987,620', dimGray),
      ],
    }),
  ],
});
