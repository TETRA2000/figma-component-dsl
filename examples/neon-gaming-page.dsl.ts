/**
 * Neon Gaming showcase page — DSL equivalent of NeonGamingShowcase.tsx
 *
 * Stresses: gradient fills, gradient angles, thick strokes, high cornerRadius,
 * clip content, horizontal auto-layout
 */
import {
  frame, rectangle, text, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helpers ---

function gameCard(title: string, genre: string, players: string, accentHex: string) {
  return frame(`Card-${title}`, {
    size: { x: 280, y: 280 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#181818')],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 2, align: 'INSIDE' as const }],
    children: [
      // Gradient image placeholder
      rectangle('Image', {
        size: { x: 280, y: 160 },
        fills: [gradient([
          { hex: accentHex, position: 0 },
          { hex: '#0a0a0a', position: 1 },
        ], 135)],
        layoutSizingHorizontal: 'FILL',
      }),

      // Body
      frame('Body', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(genre.toUpperCase(), {
            fontSize: 11,
            fontWeight: 600,
            color: '#ff2d55',
          }),
          text(title, {
            fontSize: 18,
            fontWeight: 700,
            color: '#ffffff',
          }),
          text(`${players} playing`, {
            fontSize: 13,
            fontWeight: 500,
            color: '#888888',
          }),
        ],
      }),
    ],
  });
}

function liveBadge(label = 'LIVE') {
  return frame('LiveBadge', {
    autoLayout: horizontal({ spacing: 6, padX: 14, padY: 6, counterAlign: 'CENTER' }),
    fills: [solid('#ff2d55')],
    cornerRadius: 9999,
    children: [
      ellipse('Dot', {
        size: { x: 8, y: 8 },
        fills: [solid('#ffffff')],
      }),
      text(label, {
        fontSize: 12,
        fontWeight: 700,
        color: '#ffffff',
      }),
    ],
  });
}

function leaderboardRow(rank: number, username: string, score: string) {
  return frame(`Row-${rank}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#181818')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    size: { x: 480, y: 48 },
    children: [
      text(`#${rank}`, {
        fontSize: 16,
        fontWeight: 700,
        color: '#00d4ff',
        size: { x: 36 },
      }),
      text(username, {
        fontSize: 15,
        fontWeight: 600,
        color: '#ffffff',
        layoutSizingHorizontal: 'FILL',
      }),
      text(score, {
        fontSize: 15,
        fontWeight: 700,
        color: '#39ff14',
      }),
    ],
  });
}

// --- Page ---

export default frame('NeonGamingPage', {
  size: { x: 1440, y: 800 },
  fills: [solid('#0a0a0a')],
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 48 }),
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        text('Game Library', {
          fontSize: 36,
          fontWeight: 700,
          color: '#ffffff',
        }),
        liveBadge(),
      ],
    }),

    // Spacer
    frame('Spacer1', { size: { x: 1, y: 40 } }),

    // Game Cards Row
    frame('GameCards', {
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        gameCard('Neon Drift', 'Racing', '12.4K', '#ff2d55'),
        gameCard('Cyber Arena', 'FPS', '8.7K', '#00d4ff'),
        gameCard('Pixel Quest', 'RPG', '5.2K', '#39ff14'),
      ],
    }),

    // Spacer
    frame('Spacer2', { size: { x: 1, y: 48 } }),

    // Leaderboard
    text('Leaderboard', {
      fontSize: 24,
      fontWeight: 700,
      color: '#ffffff',
    }),

    // Spacer
    frame('Spacer3', { size: { x: 1, y: 16 } }),

    // Leaderboard rows
    frame('LeaderboardList', {
      autoLayout: vertical({ spacing: 8 }),
      children: [
        leaderboardRow(1, 'xNeonKing', '98,450'),
        leaderboardRow(2, 'CyberWolf', '87,200'),
        leaderboardRow(3, 'PixelStorm', '76,100'),
      ],
    }),
  ],
});
