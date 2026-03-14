/**
 * Analytics Dashboard showcase page — DSL equivalent of AnalyticsShowcase.tsx
 *
 * Stresses: FILL sizing, SPACE_BETWEEN alignment, gradient fills on accent bars,
 * opacity, mixed H+V layouts, ellipse nodes, progress bars
 */
import {
  frame, rectangle, text, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helpers ---

function statCard(
  label: string,
  value: string,
  change: string,
  trend: 'up' | 'down',
  accentColor: string,
) {
  return frame(`Stat-${label}`, {
    size: { x: 240, y: 120 },
    autoLayout: horizontal({ spacing: 0 }),
    fills: [solid('#1e293b')],
    cornerRadius: 12,
    clipContent: true,
    children: [
      // Accent bar (gradient)
      rectangle('Accent', {
        size: { x: 6, y: 120 },
        fills: [gradient([
          { hex: accentColor, position: 0 },
          { hex: accentColor, position: 0.5 },
        ], 135)],
      }),
      // Content
      frame('Content', {
        autoLayout: vertical({ spacing: 4, padX: 24, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, {
            fontSize: 13,
            fontWeight: 500,
            color: '#94a3b8',
          }),
          text(value, {
            fontSize: 32,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: { value: 110, unit: 'PERCENT' },
          }),
          text(`${trend === 'up' ? '\u2191' : '\u2193'} ${change}`, {
            fontSize: 13,
            fontWeight: 600,
            color: trend === 'up' ? '#10b981' : '#f59e0b',
          }),
        ],
      }),
    ],
  });
}

function progressBar(label: string, value: number, color: string) {
  const trackWidth = 460;
  const fillWidth = Math.round(trackWidth * value / 100);
  return frame(`Progress-${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      // Header: label + percentage
      frame(`ProgressHeader-${label}`, {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, {
            fontSize: 14,
            fontWeight: 500,
            color: '#94a3b8',
          }),
          text(`${value}%`, {
            fontSize: 14,
            fontWeight: 600,
            color: '#ffffff',
          }),
        ],
      }),
      // Track
      frame(`Track-${label}`, {
        size: { x: trackWidth, y: 8 },
        fills: [solid('#334155')],
        cornerRadius: 4,
        clipContent: true,
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('Fill', {
            size: { x: fillWidth, y: 8 },
            fills: [solid(color)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

function metricRow(label: string, value: string, subValue: string, dotColor: string) {
  return frame(`Metric-${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padY: 12 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.118, g: 0.161, b: 0.231, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Left: dot + label
      frame(`Left-${label}`, {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse(`Dot-${label}`, {
            size: { x: 10, y: 10 },
            fills: [solid(dotColor)],
          }),
          text(label, {
            fontSize: 14,
            fontWeight: 500,
            color: '#cbd5e1',
          }),
        ],
      }),
      // Right: value + subValue
      frame(`Right-${label}`, {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(value, {
            fontSize: 16,
            fontWeight: 700,
            color: '#ffffff',
          }),
          text(subValue, {
            fontSize: 12,
            fontWeight: 500,
            color: '#64748b',
          }),
        ],
      }),
    ],
  });
}

// --- Page ---

export default frame('AnalyticsDashboard', {
  size: { x: 1440, y: 800 },
  fills: [solid('#0f172a')],
  autoLayout: vertical({ spacing: 0, padX: 200, padY: 48 }),
  children: [
    // Header
    text('Dashboard Overview', {
      fontSize: 28,
      fontWeight: 700,
      color: '#ffffff',
    }),
    frame('SubSpacer', { size: { x: 1, y: 8 } }),
    text('Real-time analytics for your platform', {
      fontSize: 14,
      fontWeight: 400,
      color: '#64748b',
    }),

    frame('Spacer1', { size: { x: 1, y: 32 } }),

    // Stat Cards Row
    frame('StatCards', {
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        statCard('Total Revenue', '$48.2K', '+12.5%', 'up', '#3b82f6'),
        statCard('Active Users', '2,847', '+8.1%', 'up', '#10b981'),
        statCard('Bounce Rate', '24.3%', '-3.2%', 'down', '#f59e0b'),
        statCard('Avg. Session', '4m 32s', '+1.8%', 'up', '#8b5cf6'),
      ],
    }),

    frame('Spacer2', { size: { x: 1, y: 40 } }),

    // Two-column layout
    frame('Columns', {
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        // Goals Progress
        frame('GoalsProgress', {
          size: { x: 508, y: 340 },
          autoLayout: vertical({ spacing: 20, padX: 24, padY: 24 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          children: [
            text('Goals Progress', {
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
            }),
            progressBar('Revenue Target', 72, '#3b82f6'),
            progressBar('User Acquisition', 89, '#10b981'),
            progressBar('Engagement Score', 45, '#f59e0b'),
            progressBar('Retention Rate', 61, '#8b5cf6'),
          ],
        }),

        // Top Channels
        frame('TopChannels', {
          size: { x: 508, y: 340 },
          autoLayout: vertical({ spacing: 0, padX: 24, padY: 24 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          children: [
            text('Top Channels', {
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
            }),
            frame('ChannelSpacer', { size: { x: 1, y: 16 } }),
            metricRow('Organic Search', '12,847', '38%', '#3b82f6'),
            metricRow('Direct Traffic', '8,421', '25%', '#10b981'),
            metricRow('Social Media', '6,053', '18%', '#f59e0b'),
            metricRow('Email Campaign', '4,192', '12%', '#8b5cf6'),
            metricRow('Referral', '2,380', '7%', '#ec4899'),
          ],
        }),
      ],
    }),
  ],
});
