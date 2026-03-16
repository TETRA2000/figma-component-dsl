/**
 * Analytics Dashboard — Data metrics with stat cards, progress bars, metric rows
 *
 * DSL features stressed: FILL sizing, SPACE_BETWEEN, mixed H/V layouts,
 * opacity for disabled states, ellipse shapes (status dots), strokes
 */
import {
  frame, text, rectangle, ellipse,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helpers ---

function sectionHeader(title: string, subtitle: string) {
  return frame(`SectionHeader: ${title}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
      text(subtitle, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

function statCard(label: string, value: string, change: string, positive: boolean) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
    fills: [solid('#1e293b')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
      text(value, { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
      text(change, { fontSize: 13, fontWeight: 600, color: positive ? '#10b981' : '#ef4444' }),
    ],
  });
}

function progressBar(label: string, value: number, fillWidth: number, color: string) {
  return frame(`Progress: ${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`${label}Header`, {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 13, fontWeight: 500, color: '#e2e8f0' }),
          text(`${value}%`, { fontSize: 13, fontWeight: 600, color: '#94a3b8' }),
        ],
      }),
      frame(`${label}Track`, {
        size: { x: 1, y: 8 },
        fills: [solid('#334155')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle(`${label}Fill`, {
            size: { x: fillWidth, y: 8 },
            fills: [solid(color)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

function metricRow(label: string, value: string, trend: string, positive: boolean) {
  return frame(`Metric: ${label}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.12, g: 0.16, b: 0.24, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      ellipse(`${label}Dot`, {
        size: { x: 8, y: 8 },
        fills: [solid(positive ? '#10b981' : '#f59e0b')],
      }),
      text(label, {
        fontSize: 14, fontWeight: 400, color: '#e2e8f0',
        layoutSizingHorizontal: 'FILL',
      }),
      text(value, {
        fontSize: 14, fontWeight: 600, color: '#ffffff',
        size: { x: 80 },
        textAlignHorizontal: 'RIGHT',
      }),
      text(trend, {
        fontSize: 12, fontWeight: 600,
        color: positive ? '#10b981' : '#f59e0b',
        size: { x: 50 },
        textAlignHorizontal: 'RIGHT',
      }),
    ],
  });
}

// --- Page ---

export default frame('AnalyticsDashboardPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0, padX: 32, padY: 32 }),
  fills: [solid('#0f172a')],
  children: [
    // Page header
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 4 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Analytics Dashboard', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('Real-time performance metrics', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
      ],
    }),

    // Overview section
    frame('OverviewSection', {
      autoLayout: vertical({ spacing: 16, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        sectionHeader('Overview', 'Last 30 days'),
        frame('StatCards', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statCard('Revenue', '$48,250', '+12.5%', true),
            statCard('Users', '12,847', '+8.2%', true),
            statCard('Orders', '1,423', '-2.1%', false),
            statCard('Conversion', '3.24%', '+0.8%', true),
          ],
        }),
      ],
    }),

    // Two-column section
    frame('TwoColumns', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Targets panel
        frame('TargetsPanel', {
          autoLayout: vertical({ spacing: 20, padX: 24, padY: 24 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            sectionHeader('Targets', 'Q1 2026'),
            progressBar('Sales Target', 72, 400, '#3b82f6'),
            progressBar('New Users', 89, 500, '#10b981'),
            progressBar('Engagement', 45, 250, '#f59e0b'),
            progressBar('Retention', 63, 350, '#8b5cf6'),
          ],
        }),

        // Key Metrics panel
        frame('MetricsPanel', {
          autoLayout: vertical({ spacing: 0, padX: 24, padY: 24 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            sectionHeader('Key Metrics', 'Updated now'),
            frame('MetricRows', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                metricRow('Active Users', '2,847', '+5.3%', true),
                metricRow('Avg Session', '4m 32s', '+12.1%', true),
                metricRow('Bounce Rate', '34.2%', '-2.8%', false),
                metricRow('Page Views', '89,421', '+18.7%', true),
                metricRow('Revenue/User', '$16.94', '+3.2%', true),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
