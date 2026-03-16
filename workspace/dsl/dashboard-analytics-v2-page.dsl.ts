/**
 * Analytics Dashboard V2 — KPI cards, funnel, data table, chart placeholders
 * DSL features: data table with header row, funnel visualization, percentage bars, SPACE_BETWEEN
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function kpiCard(label: string, value: string, change: string, up: boolean) {
  return frame(`KPI: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
      text(value, { fontSize: 28, fontWeight: 700, color: '#111827' }),
      text(change, { fontSize: 12, fontWeight: 600, color: up ? '#10b981' : '#ef4444' }),
    ],
  });
}

function funnelBar(label: string, value: string, pct: number, color: string) {
  return frame(`Funnel: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('FunnelHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(label, { fontSize: 13, fontWeight: 500, color: '#374151' }),
        text(value, { fontSize: 13, fontWeight: 600, color: '#111827' }),
      ]}),
      frame('FunnelTrack', {
        size: { x: 1, y: 8 },
        fills: [solid('#f3f4f6')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [rectangle('Fill', { size: { x: Math.round(pct * 4), y: 8 }, fills: [solid(color)], cornerRadius: 4 })],
      }),
    ],
  });
}

function tableRow(cells: string[], header: boolean) {
  return frame('Row', {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: header ? 10 : 12 }),
    fills: [solid(header ? '#f9fafb' : '#ffffff')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: cells.map((cell, i) => text(cell, {
      fontSize: header ? 12 : 13,
      fontWeight: header ? 600 : 400,
      color: header ? '#6b7280' : '#111827',
      layoutSizingHorizontal: 'FILL',
    })),
  });
}

export default frame('AnalyticsV2Page', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 20, padX: 32, padY: 24 }),
  fills: [solid('#f9fafb')],
  children: [
    frame('PageHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
      text('Analytics Overview', { fontSize: 24, fontWeight: 700, color: '#111827' }),
      text('Last 30 days', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
    ]}),
    frame('KPIs', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
      kpiCard('Revenue', '$128.4K', '+12.3%', true),
      kpiCard('Users', '24,521', '+8.7%', true),
      kpiCard('Conversion', '3.2%', '-0.4%', false),
      kpiCard('Avg Order', '$52.30', '+5.1%', true),
    ]}),
    frame('MiddleRow', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
      // Chart placeholder
      frame('ChartCard', {
        autoLayout: vertical({ spacing: 12, padX: 20, padY: 18 }),
        fills: [solid('#ffffff')],
        cornerRadius: 12,
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Revenue Over Time', { fontSize: 15, fontWeight: 600, color: '#111827' }),
          rectangle('ChartPlaceholder', { size: { x: 1, y: 200 }, fills: [gradient([{ hex: '#ede9fe', position: 0 }, { hex: '#dbeafe', position: 1 }], 90)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
        ],
      }),
      // Funnel
      frame('FunnelCard', {
        autoLayout: vertical({ spacing: 12, padX: 20, padY: 18 }),
        fills: [solid('#ffffff')],
        cornerRadius: 12,
        children: [
          text('Conversion Funnel', { fontSize: 15, fontWeight: 600, color: '#111827' }),
          funnelBar('Visitors', '45,230', 100, '#3b82f6'),
          funnelBar('Sign-ups', '12,480', 28, '#8b5cf6'),
          funnelBar('Active Users', '8,920', 20, '#a855f7'),
          funnelBar('Paid Users', '1,450', 3, '#7c3aed'),
        ],
      }),
    ]}),
    // Table
    frame('TableCard', {
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
      fills: [solid('#ffffff')],
      cornerRadius: 12,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('TableTitle', { autoLayout: horizontal({ padX: 16, padY: 14 }), children: [
          text('Top Pages', { fontSize: 15, fontWeight: 600, color: '#111827' }),
        ]}),
        tableRow(['Page', 'Views', 'Bounce Rate', 'Avg Time'], true),
        tableRow(['/home', '12,450', '32%', '2m 15s'], false),
        tableRow(['/pricing', '8,320', '28%', '3m 42s'], false),
        tableRow(['/product', '6,890', '41%', '1m 55s'], false),
        tableRow(['/blog', '5,120', '35%', '4m 10s'], false),
      ],
    }),
  ],
});
