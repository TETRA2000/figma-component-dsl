/**
 * Healthcare — Calming, trustworthy, clean medical UI.
 *
 * DSL features stressed: blue/teal palette, ellipse status indicators,
 * cornerRadius, progress bars, FILL sizing, SPACE_BETWEEN layouts.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function metricCard(label: string, value: string, unit: string, status: string, color: string) {
  return frame(`Metric: ${label}`, {
    size: { x: 320, y: undefined },
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: hex('#e8eff5'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('Header', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 13, fontWeight: 500, color: '#6b7e94' }),
          frame('Status', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              ellipse('Dot', { size: { x: 8, y: 8 }, fills: [solid(color)] }),
              text(status, { fontSize: 11, fontWeight: 500, color: color }),
            ],
          }),
        ],
      }),
      frame('Value', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 36, fontWeight: 700, color: '#1a3a5c' }),
          text(unit, { fontSize: 14, fontWeight: 400, color: '#8ca3be' }),
        ],
      }),
    ],
  });
}

export default frame('HealthcarePage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0f5fa')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: hex('#e0e8f0'), weight: 1, align: 'INSIDE' }],
      children: [
        text('VITALS', { fontSize: 16, fontWeight: 600, color: '#0891b2', letterSpacing: { value: 3, unit: 'PIXELS' } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Dashboard', { fontSize: 13, fontWeight: 500, color: '#0891b2' }),
            text('Records', { fontSize: 13, fontWeight: 400, color: '#8ca3be' }),
            text('Schedule', { fontSize: 13, fontWeight: 400, color: '#8ca3be' }),
          ],
        }),
      ],
    }),
    frame('Welcome', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Patient Dashboard', { fontSize: 28, fontWeight: 600, color: '#1a3a5c' }),
        text('Last updated 5 minutes ago', { fontSize: 14, fontWeight: 400, color: '#8ca3be' }),
      ],
    }),
    frame('Metrics', {
      autoLayout: horizontal({ spacing: 16, padX: 60, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        metricCard('Heart Rate', '72', 'bpm', 'Normal', '#22c55e'),
        metricCard('Blood Pressure', '120/80', 'mmHg', 'Optimal', '#22c55e'),
        metricCard('Temperature', '98.6', '°F', 'Normal', '#22c55e'),
        metricCard('Oxygen Sat', '98', '%', 'Warning', '#f59e0b'),
      ],
    }),
    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
