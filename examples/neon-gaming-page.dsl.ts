import { frame, text, rectangle, ellipse } from '@figma-dsl/core';
import { solid, gradient, hex, defineTokens, token } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';

const colors = defineTokens({
  bg: '#0a0a0a',
  card: '#141414',
  pink: '#ff2d55',
  cyan: '#00d4ff',
  green: '#39ff14',
  white: '#ffffff',
  gray: '#888888',
  border: '#222222',
});

// --- Helper: Live Badge ---
function liveBadge(label: string, bgColor: string) {
  return frame(`Badge: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(bgColor)],
    cornerRadius: 999,
    children: [
      text(label, { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
    ],
  });
}

function trendingBadge() {
  return frame('Badge: TRENDING', {
    autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [gradient([
      { hex: '#ff2d55', position: 0 },
      { hex: '#00d4ff', position: 1 },
    ], 135)],
    cornerRadius: 999,
    children: [
      text('TRENDING', { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
    ],
  });
}

// --- Helper: Game Card ---
function gameCard(title: string, genre: string, players: string, rating: string, isLive: boolean) {
  const imageChildren = isLive
    ? [
        // Push badge to top-right using a spacer approach
        frame('Image Overlay', {
          autoLayout: horizontal({ align: 'MAX', counterAlign: 'MIN' }),
          size: { x: 280, y: 160 },
          fills: [gradient([
            { hex: '#ff2d55', position: 0 },
            { hex: '#0a0a0a', position: 0.6 },
            { hex: '#00d4ff', position: 1 },
          ], 135)],
          clipContent: true,
          children: [
            liveBadge('LIVE', '#ff2d55'),
          ],
        }),
      ]
    : [
        rectangle('Image Placeholder', {
          size: { x: 280, y: 160 },
          fills: [gradient([
            { hex: '#ff2d55', position: 0 },
            { hex: '#0a0a0a', position: 0.6 },
            { hex: '#00d4ff', position: 1 },
          ], 135)],
        }),
      ];

  return frame(`Card: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 280, y: 0 },
    fills: [solid('#141414')],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: hex('#ff2d55'), weight: 2, align: 'INSIDE' }],
    children: [
      ...imageChildren,
      frame('Info', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        children: [
          frame('Header Row', {
            autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            size: { x: 248, y: 0 },
            children: [
              text(title, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
              text(rating, { fontSize: 14, fontWeight: 600, color: '#39ff14' }),
            ],
          }),
          text(genre, { fontSize: 13, fontWeight: 500, color: '#00d4ff' }),
          text(players, { fontSize: 12, fontWeight: 400, color: '#888888' }),
        ],
      }),
    ],
  });
}

// --- Helper: Leaderboard Row ---
function leaderboardRow(rank: number, username: string, score: string) {
  const isTop3 = rank <= 3;
  return frame(`Rank ${rank}: ${username}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 12, counterAlign: 'CENTER' }),
    size: { x: 520, y: 0 },
    fills: isTop3
      ? [solid('#2a1520')]
      : [solid('#141414')],
    cornerRadius: 12,
    strokes: [{ color: isTop3 ? hex('#ff2d55') : hex('#222222'), weight: 1, align: 'INSIDE' }],
    children: [
      text(`#${rank}`, { fontSize: 16, fontWeight: 700, color: isTop3 ? '#ff2d55' : '#888888' }),
      ellipse('Avatar', {
        size: { x: 36, y: 36 },
        fills: [gradient([
          { hex: '#00d4ff', position: 0 },
          { hex: '#39ff14', position: 1 },
        ], 135)],
      }),
      text(username, { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
      text(score, { fontSize: 14, fontWeight: 700, color: '#39ff14' }),
    ],
  });
}

// --- Main Page ---
export default frame('Neon Gaming Page', {
  size: { x: 1440, y: 0 },
  autoLayout: vertical({ spacing: 0, widthSizing: 'FIXED', heightSizing: 'HUG' }),
  fills: [solid('#0a0a0a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 12, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      size: { x: 1440, y: 0 },
      children: [
        text('NEXUS', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('GAMES', { fontSize: 28, fontWeight: 700, color: '#ff2d55' }),
        // Spacer
        frame('Spacer', {
          size: { x: 600, y: 1 },
        }),
        liveBadge('LIVE', '#ff2d55'),
        trendingBadge(),
        liveBadge('NEW', '#39ff14'),
      ],
    }),

    // Featured Banner Wrapper (centers the banner)
    frame('Banner Wrapper', {
      autoLayout: horizontal({ padX: 80, padY: 0, counterAlign: 'CENTER' }),
      size: { x: 1440, y: 0 },
      children: [
        frame('Featured Banner', {
          autoLayout: horizontal({ padX: 60, padY: 0, counterAlign: 'CENTER' }),
          size: { x: 1280, y: 200 },
      fills: [gradient([
        { hex: '#ff2d55', position: 0 },
        { hex: '#0a0a0a', position: 0.4 },
        { hex: '#00d4ff', position: 1 },
      ], 135)],
      cornerRadius: 20,
      strokes: [{ color: hex('#ff2d55'), weight: 2, align: 'INSIDE' }],
      children: [
          frame('Banner Text', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('Season 7 is Here', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
              text('New maps, weapons, and ranked mode available now', { fontSize: 16, fontWeight: 400, color: '#cccccc' }),
            ],
          }),
        ],
      }),
      ],
    }),

    // Section: Popular Games
    frame('Popular Games Section', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }),
      size: { x: 1440, y: 0 },
      children: [
        text('Popular Games', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('Game Grid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            gameCard('Cyber Arena', 'FPS / Battle Royale', '12.4k playing', '4.8', true),
            gameCard('Neon Drift', 'Racing', '5.1k playing', '4.6', false),
            gameCard('Void Hunters', 'RPG / Co-op', '8.9k playing', '4.9', true),
          ],
        }),
      ],
    }),

    // Section: Leaderboard
    frame('Leaderboard Section', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }),
      size: { x: 1440, y: 0 },
      children: [
        text('Top Players', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('Leaderboard', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            leaderboardRow(1, 'NeonSlayer', '14,280'),
            leaderboardRow(2, 'CyberPhantom', '12,750'),
            leaderboardRow(3, 'GlitchWolf', '11,430'),
            leaderboardRow(4, 'PixelStorm', '9,815'),
            leaderboardRow(5, 'VoidRunner', '8,290'),
          ],
        }),
      ],
    }),
  ],
});
