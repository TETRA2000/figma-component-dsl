/**
 * SaaS Analytics Overview — Metrics, sparklines, data table
 * Batch 1, Page 9: Technology/SaaS
 * DSL Features: metric cards, sparkline placeholders, data table, date selector
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSAnalytics', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Flowbase', { fontSize: 20, fontWeight: 700, color: '#1a1a2e' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Analytics', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
            text('Settings', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Analytics content
    frame('AnalyticsContent', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Header with date range
        frame('PageHeader', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('TitleArea', {
              autoLayout: vertical({ spacing: 4 }),
              children: [
                text('Analytics Overview', { fontSize: 24, fontWeight: 700, color: '#1a1a2e' }),
                text('Track your key metrics and performance', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
              ],
            }),
            frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            frame('DateRangeSelector', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                dateRangeBtn('7D', false),
                dateRangeBtn('30D', true),
                dateRangeBtn('90D', false),
                dateRangeBtn('1Y', false),
              ],
            }),
          ],
        }),

        // Metric cards grid
        frame('MetricCards', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            metricCard('Total Users', '24,521', '+12.5%', true, '#6366f1'),
            metricCard('Revenue', '$84,230', '+8.2%', true, '#22c55e'),
            metricCard('Conversion', '3.24%', '-0.4%', false, '#f59e0b'),
            metricCard('Churn Rate', '1.8%', '-0.2%', true, '#ef4444'),
          ],
        }),

        // Data table
        frame('DataTable', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          clipContent: true,
          children: [
            // Table header
            frame('TableTitle', {
              autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Transactions', { fontSize: 16, fontWeight: 600, color: '#1a1a2e' }),
                frame('TitleSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
                text('View all', { fontSize: 13, fontWeight: 500, color: '#6366f1' }),
              ],
            }),
            rectangle('HeaderDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e5e7eb')],
              layoutSizingHorizontal: 'FILL',
            }),
            // Column headers
            tableRow('Customer', 'Plan', 'Amount', 'Status', true),
            rectangle('Div1', { size: { x: 1, y: 1 }, fills: [solid('#f1f5f9')], layoutSizingHorizontal: 'FILL' }),
            tableRow('Acme Corp', 'Enterprise', '$2,400', 'Paid', false),
            rectangle('Div2', { size: { x: 1, y: 1 }, fills: [solid('#f1f5f9')], layoutSizingHorizontal: 'FILL' }),
            tableRow('Globex Inc', 'Pro', '$480', 'Paid', false),
            rectangle('Div3', { size: { x: 1, y: 1 }, fills: [solid('#f1f5f9')], layoutSizingHorizontal: 'FILL' }),
            tableRow('Initech', 'Starter', '$120', 'Pending', false),
            rectangle('Div4', { size: { x: 1, y: 1 }, fills: [solid('#f1f5f9')], layoutSizingHorizontal: 'FILL' }),
            tableRow('Umbrella Ltd', 'Pro', '$480', 'Paid', false),
            rectangle('Div5', { size: { x: 1, y: 1 }, fills: [solid('#f1f5f9')], layoutSizingHorizontal: 'FILL' }),
            tableRow('Wayne Enterprises', 'Enterprise', '$2,400', 'Overdue', false),
          ],
        }),
      ],
    }),
  ],
});

function dateRangeBtn(label: string, active: boolean) {
  return frame(`Range: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#6366f1')] : [solid('#ffffff')],
    cornerRadius: 6,
    strokes: active ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, {
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        color: active ? '#ffffff' : '#64748b',
      }),
    ],
  });
}

function metricCard(
  label: string,
  value: string,
  change: string,
  positive: boolean,
  accentColor: string,
) {
  return frame(`Metric: ${label}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#64748b' }),
      frame('ValueRow', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'MAX' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(value, { fontSize: 28, fontWeight: 700, color: '#1a1a2e' }),
          frame('ChangeBadge', {
            autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(positive ? '#ecfdf5' : '#fef2f2')],
            cornerRadius: 4,
            children: [
              text(change, {
                fontSize: 12,
                fontWeight: 600,
                color: positive ? '#16a34a' : '#dc2626',
              }),
            ],
          }),
        ],
      }),
      // Sparkline placeholder
      rectangle('Sparkline', {
        size: { x: 1, y: 40 },
        fills: [
          gradient([
            { hex: accentColor + '20', position: 0 },
            { hex: accentColor + '05', position: 1 },
          ], 270),
        ],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

function tableRow(
  col1: string,
  col2: string,
  col3: string,
  col4: string,
  isHeader: boolean,
) {
  const color = isHeader ? '#64748b' : '#374151';
  const weight = isHeader ? 500 : 400;
  const bg = isHeader ? '#f8fafc' : '#ffffff';

  return frame(`Row: ${col1}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(bg)],
    children: [
      text(col1, { fontSize: 14, fontWeight: weight, color, layoutSizingHorizontal: 'FILL' }),
      text(col2, { fontSize: 14, fontWeight: weight, color, layoutSizingHorizontal: 'FILL' }),
      text(col3, { fontSize: 14, fontWeight: weight, color, layoutSizingHorizontal: 'FILL' }),
      statusCell(col4, isHeader),
    ],
  });
}

function statusCell(status: string, isHeader: boolean) {
  if (isHeader) {
    return text(status, { fontSize: 14, fontWeight: 500, color: '#64748b', layoutSizingHorizontal: 'FILL' });
  }

  const colors: Record<string, { bg: string; text: string }> = {
    Paid: { bg: '#ecfdf5', text: '#16a34a' },
    Pending: { bg: '#fffbeb', text: '#d97706' },
    Overdue: { bg: '#fef2f2', text: '#dc2626' },
  };
  const c = colors[status] || { bg: '#f1f5f9', text: '#64748b' };

  return frame(`Status: ${status}`, {
    autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(c.bg)],
    cornerRadius: 4,
    children: [
      text(status, { fontSize: 13, fontWeight: 500, color: c.text }),
    ],
  });
}
