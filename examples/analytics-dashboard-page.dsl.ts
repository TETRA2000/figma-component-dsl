import { frame, text, rectangle } from '@figma-dsl/core';
import { solid, gradient, hex } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';

// --- Helper: Stat Card ---
function statCard(label: string, value: string, change: string, trendColor: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
    size: { x: 300, y: 0 },
    fills: [solid('#1e293b')],
    cornerRadius: 12,
    children: [
      text(label.toUpperCase(), {
        fontSize: 13, fontWeight: 500, color: '#94a3b8',
        letterSpacing: { value: 5, unit: 'PERCENT' },
      }),
      text(value, { fontSize: 32, fontWeight: 700, color: '#ffffff' }),
      text(change, { fontSize: 13, fontWeight: 600, color: trendColor }),
    ],
  });
}

// --- Helper: Progress Bar ---
function progressBar(label: string, value: number, max: number, barGradient: { from: string; to: string }) {
  const pct = Math.min(1, value / max);
  const trackWidth = 540;
  const fillWidth = Math.round(trackWidth * pct);

  return frame(`Progress: ${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    size: { x: trackWidth, y: 0 },
    children: [
      frame('Label Row', {
        autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        size: { x: trackWidth, y: 0 },
        children: [
          text(label, { fontSize: 14, fontWeight: 500, color: '#e2e8f0' }),
          text(`${value}/${max}`, { fontSize: 13, fontWeight: 600, color: '#94a3b8' }),
        ],
      }),
      frame('Track', {
        size: { x: trackWidth, y: 8 },
        fills: [solid('#334155')],
        cornerRadius: 4,
        clipContent: true,
        children: [
          rectangle('Fill', {
            size: { x: fillWidth, y: 8 },
            fills: [gradient([
              { hex: barGradient.from, position: 0 },
              { hex: barGradient.to, position: 1 },
            ], 0)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

// --- Helper: Chart Bar ---
function chartBar(heightPct: number, isActive: boolean) {
  return rectangle('Bar', {
    size: { x: 60, y: Math.round(160 * heightPct / 100) },
    fills: [gradient([
      { hex: '#3b82f6', position: 0 },
      { hex: '#1e40af', position: 1 },
    ], 180)],
    cornerRadius: 4,
    opacity: isActive ? 1 : 0.7,
  });
}

// --- Helper: Metric Row ---
function metricRow(label: string, value: string, subtext?: string, disabled?: boolean) {
  const children = [
    text(label, { fontSize: 14, fontWeight: 500, color: '#e2e8f0' }),
  ];

  const rightChildren = [
    text(value, { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
  ];
  if (subtext) {
    rightChildren.push(
      text(subtext, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
    );
  }

  children.push(
    frame('Right', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'MAX' }),
      children: rightChildren,
    }),
  );

  return frame(`Metric: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    size: { x: 1312, y: 0 },
    fills: [solid('#1e293b')],
    cornerRadius: 8,
    opacity: disabled ? 0.4 : 1,
    children,
  });
}

// --- Main Page ---
export default frame('Analytics Dashboard', {
  size: { x: 1440, y: 0 },
  autoLayout: vertical({ spacing: 40, padX: 64, padY: 48, widthSizing: 'FIXED', heightSizing: 'HUG' }),
  fills: [solid('#0f172a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 8 }),
      children: [
        text('Dashboard', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('Overview of key metrics', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
      ],
    }),

    // Stat Cards Row
    frame('Stat Cards', {
      autoLayout: horizontal({ spacing: 20 }),
      children: [
        statCard('Total Revenue', '$48,290', '+12.5%', '#10b981'),
        statCard('Active Users', '2,847', '+8.1%', '#10b981'),
        statCard('Bounce Rate', '24.3%', '-3.2%', '#f59e0b'),
        statCard('Avg Session', '4m 32s', '0%', '#94a3b8'),
      ],
    }),

    // Two Column Layout
    frame('Two Columns', {
      autoLayout: horizontal({ spacing: 24 }),
      size: { x: 1312, y: 0 },
      children: [
        // Left: Resource Usage
        frame('Resource Usage', {
          autoLayout: vertical({ spacing: 24, padX: 24, padY: 24 }),
          size: { x: 644, y: 0 },
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          children: [
            text('Resource Usage', { fontSize: 18, fontWeight: 600, color: '#ffffff' }),
            progressBar('Storage Used', 72, 100, { from: '#3b82f6', to: '#60a5fa' }),
            progressBar('API Calls', 8450, 10000, { from: '#10b981', to: '#34d399' }),
            progressBar('Bandwidth', 890, 1000, { from: '#f59e0b', to: '#fbbf24' }),
          ],
        }),

        // Right: Revenue Trend (bar chart)
        frame('Revenue Trend', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          size: { x: 644, y: 0 },
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          children: [
            text('Revenue Trend', { fontSize: 18, fontWeight: 600, color: '#ffffff' }),
            frame('Bars', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'MAX' }),
              size: { x: 596, y: 160 },
              children: [
                chartBar(40, false),
                chartBar(65, false),
                chartBar(55, false),
                chartBar(80, false),
                chartBar(70, false),
                chartBar(90, false),
                chartBar(85, true),
              ],
            }),
            frame('Labels', {
              autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
              size: { x: 596, y: 0 },
              children: [
                text('Mon', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Tue', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Wed', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Thu', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Fri', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Sat', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                text('Sun', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Key Metrics Section
    frame('Key Metrics Section', {
      autoLayout: vertical({ spacing: 8 }),
      children: [
        text('Key Metrics', { fontSize: 18, fontWeight: 600, color: '#ffffff' }),
        frame('Spacer', { size: { x: 1, y: 4 } }),
        metricRow('Conversion Rate', '3.24%', 'vs 2.8% last month'),
        metricRow('Avg Order Value', '$67.50', '+$4.20'),
        metricRow('Cart Abandonment', '18.7%', '-2.1%'),
        metricRow('Page Load Time', '1.2s', 'P95'),
        metricRow('Error Rate', '0.03%', undefined, true),
      ],
    }),
  ],
});
