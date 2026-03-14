import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const slate = '#0f172a';
const slateLight = '#1e293b';
const slateMid = '#334155';
const blue = '#3b82f6';
const emerald = '#10b981';
const amber = '#f59e0b';
const red = '#ef4444';
const white = '#ffffff';
const gray = '#94a3b8';
const grayLight = '#cbd5e1';

// Stat card
function statCard(label: string, value: string, change: string, isPositive: boolean, barColor: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid(slateLight)],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Header', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 13, fontWeight: 500, color: gray }),
          text(change, { fontSize: 12, fontWeight: 600, color: isPositive ? emerald : red }),
        ],
      }),
      text(value, { fontSize: 28, fontWeight: 700, color: white }),
      frame('Bar', {
        size: { x: 1, y: 6 },
        fills: [solid(slateMid)],
        cornerRadius: 3,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('Fill', {
            size: { x: 180, y: 6 },
            fills: [solid(barColor)],
          }),
        ],
      }),
    ],
  });
}

// Metric row
function metricRow(label: string, value: string, trend: string, bgOpacity: number) {
  return frame(`Metric: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(slateLight, bgOpacity)],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: grayLight }),
      text(value, { fontSize: 14, fontWeight: 600, color: white }),
      text(trend, { fontSize: 12, fontWeight: 500, color: emerald }),
    ],
  });
}

// Section header
function sectionHeader(title: string, subtitle: string) {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 18, fontWeight: 700, color: white }),
      text(subtitle, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

// Progress bar chart item
function chartBar(label: string, height: number, color: string) {
  return frame(`Bar: ${label}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER', align: 'MAX' }),
    size: { x: 48, y: 160 },
    children: [
      rectangle('BarFill', {
        size: { x: 32, y: height },
        fills: [gradient([
          { hex: color, position: 0 },
          { hex: '#1e293b', position: 1 },
        ], 180)],
        cornerRadius: 4,
      }),
      text(label, { fontSize: 11, fontWeight: 400, color: gray }),
    ],
  });
}

export default frame('AnalyticsDashboard', {
  size: { x: 1440, y: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(slate)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(slateLight)],
      strokes: [{ color: { r: 0.2, g: 0.25, b: 0.35, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Analytics Dashboard', { fontSize: 20, fontWeight: 700, color: white }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Overview', { fontSize: 14, fontWeight: 600, color: blue }),
            text('Revenue', { fontSize: 14, fontWeight: 400, color: gray }),
            text('Users', { fontSize: 14, fontWeight: 400, color: gray }),
            text('Settings', { fontSize: 14, fontWeight: 400, color: gray, opacity: 0.5 }),
          ],
        }),
      ],
    }),

    // Main content
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',
      children: [
        // Stat cards row
        frame('StatCards', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statCard('Total Revenue', '$84,254', '+12.5%', true, blue),
            statCard('Active Users', '12,847', '+8.2%', true, emerald),
            statCard('Conversion Rate', '3.24%', '-2.1%', false, amber),
            statCard('Avg. Order', '$68.50', '+4.7%', true, blue),
          ],
        }),

        // Middle section: chart + metrics
        frame('MiddleSection', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Chart area
            frame('ChartArea', {
              autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
              fills: [solid(slateLight)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              children: [
                sectionHeader('Weekly Revenue', 'Last 7 days performance'),
                frame('Chart', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'MAX', align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  size: { x: 1, y: 160 },
                  children: [
                    chartBar('Mon', 80, blue),
                    chartBar('Tue', 120, blue),
                    chartBar('Wed', 60, blue),
                    chartBar('Thu', 140, blue),
                    chartBar('Fri', 100, blue),
                    chartBar('Sat', 45, blue),
                    chartBar('Sun', 90, blue),
                  ],
                }),
              ],
            }),

            // Metrics panel
            frame('MetricsPanel', {
              autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
              fills: [solid(slateLight)],
              cornerRadius: 12,
              size: { x: 360, y: undefined },
              children: [
                sectionHeader('Key Metrics', 'Performance indicators'),
                metricRow('Page Views', '45,289', '+15.3%', 0.5),
                metricRow('Bounce Rate', '32.1%', '-3.2%', 0.3),
                metricRow('Session Duration', '4m 23s', '+8.7%', 0.5),
                metricRow('New Users', '2,847', '+22.1%', 0.3),
                metricRow('Retention', '68.5%', '+1.2%', 0.5),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
