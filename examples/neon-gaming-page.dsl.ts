/**
 * Neon Gaming showcase page — dark gaming UI with neon accents.
 *
 * Demonstrates:
 *  - gradient() fills for backgrounds and buttons
 *  - Thick strokes with neon colors
 *  - opacity for dimmed elements
 *  - ellipse() for avatar circles
 *  - Nested horizontal + vertical auto-layout
 *  - cornerRadii for rounded cards
 *  - FILL sizing for stat bars
 */
import {
  component, frame, rectangle, ellipse, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BG_DARK = '#0f0f23';
const CARD_BG = '#1a1a2e';
const BORDER_DIM = '#2d2d44';
const NEON_GREEN = '#39ff14';
const GOLD = '#facc15';
const WHITE = '#ffffff';
const GRAY_LIGHT = '#e2e8f0';
const GRAY_MID = '#94a3b8';

// --- Helper: Game Card ---
function gameCard(title: string, genre: string, price: string, rating: string, gradientStart: string) {
  return frame(`Card: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 280, y: undefined as unknown as number },
    fills: [solid(CARD_BG)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.224, g: 1, b: 0.078, a: 1 }, weight: 2, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      // Cover image (gradient rectangle)
      frame('Cover', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 12, align: 'MAX', counterAlign: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        size: { x: 280, y: 160 },
        fills: [gradient([
          { hex: gradientStart, position: 0 },
          { hex: '#0f172a', position: 1 },
        ], 135)],
        children: [
          // Rating badge
          frame('Rating Badge', {
            autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4, counterAlign: 'CENTER' }),
            fills: [solid('#000000', 0.7)],
            cornerRadius: 8,
            children: [
              text(rating, { fontSize: 14, fontWeight: 700, color: GOLD }),
            ],
          }),
        ],
      }),
      // Info section
      frame('Info', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(genre, {
            fontSize: 12, fontWeight: 600, color: NEON_GREEN,
            letterSpacing: { value: 10, unit: 'PERCENT' },
          }),
          text(title, { fontSize: 20, fontWeight: 700, color: WHITE }),
          // Footer row
          frame('Footer', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 24, fontWeight: 700, color: WHITE }),
              frame('Buy Button', {
                autoLayout: horizontal({ spacing: 0, padX: 20, padY: 8, counterAlign: 'CENTER' }),
                fills: [gradient([
                  { hex: '#39ff14', position: 0 },
                  { hex: '#00e676', position: 1 },
                ], 135)],
                cornerRadius: 8,
                children: [
                  text('Buy Now', { fontSize: 14, fontWeight: 700, color: '#0f172a' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// --- Helper: Stat Bar ---
function statBar(label: string, value: number, maxVal: number, barColor: string) {
  const pct = Math.min(value / maxVal, 1);
  const barWidth = Math.round(292 * pct); // 340 - 2*24 padding
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Header', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 14, fontWeight: 600, color: GRAY_LIGHT }),
          text(`${value}/${maxVal}`, { fontSize: 12, fontWeight: 500, color: GRAY_MID }),
        ],
      }),
      // Track
      frame('Track', {
        autoLayout: horizontal({ spacing: 0 }),
        layoutSizingHorizontal: 'FILL',
        size: { x: 292, y: 8 },
        fills: [solid(BORDER_DIM)],
        cornerRadius: 4,
        clipContent: true,
        children: [
          rectangle('Fill', {
            size: { x: barWidth, y: 8 },
            fills: [solid(barColor)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

// --- Helper: Leaderboard Row ---
function leaderboardRow(rank: number, username: string, score: string, level: string, highlighted: boolean) {
  return frame(`Row: ${username}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 12,
    strokes: [highlighted
      ? { color: { r: 0.224, g: 1, b: 0.078, a: 1 }, weight: 1, align: 'INSIDE' as const }
      : { color: { r: 0.176, g: 0.176, b: 0.267, a: 1 }, weight: 1, align: 'INSIDE' as const }
    ],
    children: [
      text(`#${rank}`, { fontSize: 16, fontWeight: 700, color: GOLD }),
      // Avatar
      ellipse('Avatar', {
        size: { x: 40, y: 40 },
        fills: [gradient([
          { hex: '#7c3aed', position: 0 },
          { hex: '#ec4899', position: 1 },
        ], 135)],
      }),
      // User info
      frame('UserInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(username, { fontSize: 16, fontWeight: 600, color: WHITE }),
          text(`Lvl ${level}`, { fontSize: 12, fontWeight: 500, color: GRAY_MID }),
        ],
      }),
      text(score, { fontSize: 18, fontWeight: 700, color: NEON_GREEN }),
    ],
  });
}

// --- Main Page ---
export default component('NeonGamingPage', {
  size: { x: 1280, y: undefined as unknown as number },
  autoLayout: vertical({
    spacing: 40,
    padX: 40,
    padY: 40,
    counterAlign: 'CENTER',
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid(BG_DARK)],
  children: [
    // Title
    text('NEON ARCADE', {
      fontSize: 36,
      fontWeight: 700,
      color: NEON_GREEN,
      textAlignHorizontal: 'CENTER',
    }),

    // Cards row
    frame('Cards Row', {
      autoLayout: horizontal({ spacing: 24, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        gameCard('Cyber Drift', 'RACING', '$29', '9.2', '#7c3aed'),
        gameCard('Shadow Ops', 'FPS', '$49', '8.7', '#ec4899'),
        gameCard('Neon Blitz', 'ARCADE', '$19', '9.5', '#06b6d4'),
      ],
    }),

    // Player Stats
    frame('Player Stats Panel', {
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      size: { x: 340, y: undefined as unknown as number },
      fills: [solid(CARD_BG)],
      cornerRadius: 16,
      strokes: [{ color: { r: 0.176, g: 0.176, b: 0.267, a: 1 }, weight: 2, align: 'INSIDE' as const }],
      children: [
        text('Player Stats', { fontSize: 18, fontWeight: 700, color: WHITE }),
        statBar('Attack', 85, 100, '#ef4444'),
        statBar('Defense', 60, 100, '#3b82f6'),
        statBar('Speed', 92, 100, '#39ff14'),
        statBar('Magic', 45, 100, '#a855f7'),
      ],
    }),

    // Leaderboard
    frame('Leaderboard', {
      autoLayout: vertical({ spacing: 8 }),
      size: { x: 400, y: undefined as unknown as number },
      children: [
        text('Leaderboard', {
          fontSize: 18, fontWeight: 700, color: WHITE,
        }),
        leaderboardRow(1, 'xNeonSlayer', '12,450', '99', true),
        leaderboardRow(2, 'CyberWolf', '11,280', '87', false),
        leaderboardRow(3, 'PixelStorm', '10,750', '82', false),
      ],
    }),
  ],
});
