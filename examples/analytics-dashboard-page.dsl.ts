/**
 * Analytics Dashboard — clean data visualization page.
 *
 * Demonstrates:
 *  - FILL sizing for equal-width columns
 *  - Mixed horizontal/vertical auto-layout
 *  - cornerRadii for accent strips
 *  - Rectangle bars for chart simulation
 *  - Divider lines via thin rectangles
 *  - SPACE_BETWEEN for table rows
 */
import {
  component, frame, rectangle, text,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

const BG_PAGE = '#f9fafb';
const WHITE = '#ffffff';
const BORDER = '#e5e7eb';
const BORDER_LIGHT = '#f3f4f6';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6b7280';
const GREEN = '#10b981';
const RED = '#ef4444';
const INDIGO = '#6366f1';

// --- Helper: Metric Card ---
function metricCard(label: string, value: string, change: string, positive: boolean, accentColor: string) {
  return frame(`Metric: ${label}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(WHITE)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      // Accent strip
      rectangle('Accent', {
        size: { x: 4, y: 1 },
        fills: [solid(accentColor)],
        layoutSizingVertical: 'FILL',
      }),
      // Content
      frame('Content', {
        autoLayout: vertical({ spacing: 4, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, {
            fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY,
            letterSpacing: { value: 3, unit: 'PERCENT' },
          }),
          text(value, { fontSize: 32, fontWeight: 700, color: TEXT_PRIMARY }),
          text(`${positive ? '+' : ''}${change}`, {
            fontSize: 14, fontWeight: 600,
            color: positive ? GREEN : RED,
          }),
        ],
      }),
    ],
  });
}

// --- Helper: Mini Chart ---
function miniChart(title: string, bars: number[], barColor: string) {
  const max = Math.max(...bars);
  const barHeight = 120;
  return frame(`Chart: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(WHITE)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }),
      frame('Bars', {
        autoLayout: horizontal({ spacing: 6, counterAlign: 'MAX' }),
        layoutSizingHorizontal: 'FILL',
        size: { x: 1, y: barHeight },
        children: bars.map((val, i) => {
          const h = Math.max(Math.round((val / max) * barHeight), 4);
          return rectangle(`Bar ${i}`, {
            size: { x: 1, y: h },
            fills: [solid(barColor)],
            layoutSizingHorizontal: 'FILL',
            cornerRadii: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
          });
        }),
      }),
    ],
  });
}

// --- Helper: Table Row ---
function tableRow(name: string, value: string, trend: string, trendColor: string, hasBorder: boolean) {
  const children = [
    frame('Row Content', {
      autoLayout: horizontal({ spacing: 0, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text(name, { fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY, layoutSizingHorizontal: 'FILL' }),
        text(value, { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, layoutSizingHorizontal: 'FILL' }),
        text(trend, { fontSize: 14, fontWeight: 600, color: trendColor, layoutSizingHorizontal: 'FILL' }),
      ],
    }),
  ];
  if (hasBorder) {
    children.push(
      rectangle('Divider', {
        size: { x: 1, y: 1 },
        fills: [solid(BORDER_LIGHT)],
        layoutSizingHorizontal: 'FILL',
      })
    );
  }
  return frame(`TableRow: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

// --- Main Page ---
export default component('AnalyticsDashboard', {
  size: { x: 960, y: undefined as unknown as number },
  autoLayout: vertical({
    spacing: 24,
    padX: 32,
    padY: 32,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid(BG_PAGE)],
  children: [
    // Title
    text('Analytics Dashboard', { fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY }),

    // Metric Cards Row
    frame('Metrics Row', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        metricCard('REVENUE', '$48.2K', '12.5%', true, INDIGO),
        metricCard('USERS', '2,847', '8.1%', true, GREEN),
        metricCard('BOUNCE RATE', '24.3%', '-2.4%', false, RED),
      ],
    }),

    // Charts Row
    frame('Charts Row', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        miniChart('Weekly Revenue', [42, 68, 55, 80, 73, 95, 62], INDIGO),
        miniChart('New Users', [30, 45, 60, 38, 72, 55, 88], GREEN),
      ],
    }),

    // Data Table
    frame('Revenue Table', {
      autoLayout: vertical({ spacing: 0, padX: 20, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(WHITE)],
      cornerRadius: 12,
      strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Revenue by Channel', { fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }),
        // Header
        frame('Table Header', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Header Row', {
              autoLayout: horizontal({ spacing: 0, padY: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('CHANNEL', { fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, layoutSizingHorizontal: 'FILL', letterSpacing: { value: 3, unit: 'PERCENT' } }),
                text('REVENUE', { fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, layoutSizingHorizontal: 'FILL', letterSpacing: { value: 3, unit: 'PERCENT' } }),
                text('TREND', { fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, layoutSizingHorizontal: 'FILL', letterSpacing: { value: 3, unit: 'PERCENT' } }),
              ],
            }),
            rectangle('Header Divider', {
              size: { x: 1, y: 2 },
              fills: [solid(BORDER)],
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),
        // Rows
        tableRow('Direct', '$12,400', '+12.5%', GREEN, true),
        tableRow('Organic Search', '$8,200', '+5.3%', GREEN, true),
        tableRow('Referral', '$6,100', '-3.2%', RED, true),
        tableRow('Social Media', '$4,800', '+18.7%', GREEN, true),
        tableRow('Email', '$3,200', '0.0%', TEXT_SECONDARY, false),
      ],
    }),
  ],
});
