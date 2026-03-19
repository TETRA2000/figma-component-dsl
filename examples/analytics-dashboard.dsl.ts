import {
  frame, text, rectangle, svg,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

import type { FontDeclaration } from '@figma-dsl/core';

// Enable Canvas Mode
export const mode = 'canvas';

// Font declarations
export const fonts: FontDeclaration[] = [];

// --- Colors ---
const DARK_BG = '#0f172a';
const CARD_BG = '#1e293b';
const ACCENT = '#38bdf8';
const ACCENT_DARK = '#0284c7';
const WHITE = '#f8fafc';
const MUTED = '#94a3b8';
const SUCCESS = '#22c55e';
const WARNING = '#f59e0b';

// --- SVG Icons (inline) ---
const ICON_CHART = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="18" width="6" height="10" rx="1" fill="#38bdf8"/><rect x="13" y="10" width="6" height="18" rx="1" fill="#38bdf8" opacity="0.7"/><rect x="22" y="4" width="6" height="24" rx="1" fill="#38bdf8" opacity="0.4"/></svg>`;
const ICON_ARROW_UP = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4L16 12H4L10 4Z" fill="#22c55e"/><rect x="8" y="11" width="4" height="6" rx="1" fill="#22c55e"/></svg>`;
const ICON_ARROW_DOWN = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16L4 8H16L10 16Z" fill="#f59e0b"/><rect x="8" y="3" width="4" height="6" rx="1" fill="#f59e0b"/></svg>`;
const ICON_STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.9 8.6L22 9.2L16.7 14L18.2 21L12 17.3L5.8 21L7.3 14L2 9.2L9.1 8.6L12 2Z" fill="#f59e0b"/></svg>`;

// --- Reusable stat card helper ---
function statCard(
  title: string,
  value: string,
  trend: string,
  positive: boolean,
  iconSvg: string,
) {
  return frame(`Card-${title}`, {
    size: { x: 240, y: 140 },
    autoLayout: vertical({
      spacing: 12,
      padX: 20,
      padY: 20,
    }),
    fills: [solid(CARD_BG)],
    cornerRadius: 16,
    effects: [{
      type: 'DROP_SHADOW' as const,
      color: { r: 0, g: 0, b: 0, a: 0.3 },
      offsetX: 0,
      offsetY: 4,
      blur: 20,
    }],
    children: [
      // Header row: icon + title
      frame(`${title}-Header`, {
        autoLayout: horizontal({
          spacing: 8,
          counterAlign: 'CENTER',
        }),
        children: [
          svg(`${title}-Icon`, { svgContent: iconSvg, size: { x: 20, y: 20 } }),
          text(title, {
            fontSize: 14,
            fontWeight: 500,
            color: MUTED,
          }),
        ],
      }),
      // Value
      text(value, {
        fontSize: 32,
        fontWeight: 700,
        color: WHITE,
      }),
      // Trend row
      frame(`${title}-Trend`, {
        autoLayout: horizontal({
          spacing: 4,
          counterAlign: 'CENTER',
        }),
        children: [
          svg(`${title}-TrendArrow`, {
            svgContent: positive ? ICON_ARROW_UP : ICON_ARROW_DOWN,
            size: { x: 16, y: 16 },
          }),
          text(trend, {
            fontSize: 13,
            fontWeight: 600,
            color: positive ? SUCCESS : WARNING,
          }),
        ],
      }),
    ],
  });
}

// --- Root Dashboard ---
export default frame('AnalyticsDashboard', {
  size: { x: 580, y: 440 },
  clipContent: true,
  autoLayout: vertical({
    spacing: 24,
    padX: 32,
    padY: 32,
    widthSizing: 'FIXED',
    heightSizing: 'FIXED',
  }),
  fills: [solid(DARK_BG)],
  children: [

    // ====== Title Bar ======
    frame('TitleBar', {
      autoLayout: horizontal({
        spacing: 12,
        counterAlign: 'CENTER',
      }),
      children: [
        svg('ChartIcon', { svgContent: ICON_CHART, size: { x: 32, y: 32 } }),
        text('Analytics Overview', {
          fontSize: 24,
          fontWeight: 700,
          color: WHITE,
          textShadow: {
            color: 'rgba(56,189,248,0.3)',
            offsetX: 0,
            offsetY: 2,
            blur: 8,
          },
        }),
      ],
    }),

    // ====== Stats Row ======
    frame('StatsRow', {
      autoLayout: horizontal({
        spacing: 16,
        counterAlign: 'MIN',
      }),
      children: [
        statCard('Revenue', '$48.2K', '+12.5% vs last month', true, ICON_STAR),
        statCard('Users', '2,841', '-3.2% vs last month', false, ICON_STAR),
      ],
    }),

    // ====== Footer accent bar ======
    frame('AccentBar', {
      size: { x: 516, y: 6 },
      fills: [
        gradient([
          { hex: ACCENT, position: 0 },
          { hex: ACCENT_DARK, position: 1 },
        ], 0),
      ],
      cornerRadius: 3,
      rotation: 0,
    }),

  ],
});
