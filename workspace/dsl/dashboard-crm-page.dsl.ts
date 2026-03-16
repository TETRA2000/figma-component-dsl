/**
 * CRM Dashboard — Pipeline stages with deal cards, activity feed, and stats
 * DSL features: SPACE_BETWEEN for header, gradient stat cards, cornerRadius,
 * strokes on pipeline columns, FILL layout, ellipse avatars, opacity for secondary text
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function statCard(label: string, value: string, change: string, positive: boolean, gradFrom: string, gradTo: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 18 }),
    fills: [gradient([{ hex: gradFrom, position: 0 }, { hex: gradTo, position: 1 }], 135)],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#ffffffcc' }),
      text(value, { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
      text(`${positive ? '+' : ''}${change} vs last month`, { fontSize: 11, fontWeight: 500, color: positive ? '#86efac' : '#fca5a5' }),
    ],
  });
}

function dealCard(company: string, contact: string, amount: string, daysInStage: number, color: string) {
  return frame(`Deal: ${company}`, {
    autoLayout: vertical({ spacing: 8, padX: 12, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DealHeader', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse(`DealAv:${company}`, { size: { x: 28, y: 28 }, fills: [solid(color)] }),
          frame('DealNames', {
            autoLayout: vertical({ spacing: 1 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(company, { fontSize: 13, fontWeight: 600, color: '#111827' }),
              text(contact, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      frame('DealFooter', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(amount, { fontSize: 15, fontWeight: 700, color: '#111827', layoutSizingHorizontal: 'FILL' }),
          text(`${daysInStage}d`, { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function pipelineColumn(stage: string, count: number, total: string, deals: ReturnType<typeof dealCard>[]) {
  return frame(`Stage: ${stage}`, {
    size: { x: 220 },
    autoLayout: vertical({ spacing: 10, padX: 8, padY: 8 }),
    fills: [solid('#f9fafb')],
    cornerRadius: 10,
    children: [
      frame('StageHeader', {
        autoLayout: horizontal({ spacing: 0, padX: 4, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(stage, { fontSize: 13, fontWeight: 600, color: '#374151', layoutSizingHorizontal: 'FILL' }),
          frame('StageBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#e5e7eb')],
            cornerRadius: 9999,
            children: [text(String(count), { fontSize: 11, fontWeight: 600, color: '#6b7280' })],
          }),
        ],
      }),
      text(total, { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
      ...deals,
    ],
  });
}

function activityItem(name: string, action: string, time: string, color: string) {
  return frame(`Activity: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 0, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`ActAv:${name}`, { size: { x: 28, y: 28 }, fills: [solid(color)] }),
      frame('ActInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(`${name} ${action}`, { fontSize: 12, fontWeight: 400, color: '#374151', size: { x: 200 }, textAutoResize: 'HEIGHT', lineHeight: { value: 140, unit: 'PERCENT' } }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('DashboardCrmPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f3f4f6')],
  children: [
    // Top bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('SalesPro CRM', { fontSize: 18, fontWeight: 800, color: '#111827' }),
        frame('TopSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        frame('TopActions', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 13, fontWeight: 600, color: '#7c3aed' }),
            text('Contacts', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            text('Reports', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ellipse('UserAv', { size: { x: 32, y: 32 }, fills: [solid('#7c3aed')] }),
          ],
        }),
      ],
    }),
    // Stats row
    frame('StatsRow', {
      autoLayout: horizontal({ spacing: 16, padX: 24, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('Total Deals', '$1.24M', '+12.5%', true, '#7c3aed', '#6d28d9'),
        statCard('Won This Month', '$342K', '+8.3%', true, '#10b981', '#059669'),
        statCard('Pipeline Value', '$890K', '-2.1%', false, '#3b82f6', '#2563eb'),
        statCard('Avg Deal Size', '$28.4K', '+5.7%', true, '#f59e0b', '#d97706'),
      ],
    }),
    // Main content
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 20, padX: 24, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Pipeline
        frame('Pipeline', {
          autoLayout: horizontal({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            pipelineColumn('Qualified', 3, '$156K total', [
              dealCard('Acme Corp', 'John Smith', '$45,000', 3, '#3b82f6'),
              dealCard('TechStart Inc', 'Sarah Lee', '$62,000', 7, '#10b981'),
              dealCard('DataFlow', 'Mike Chen', '$49,000', 2, '#f59e0b'),
            ]),
            pipelineColumn('Proposal', 2, '$128K total', [
              dealCard('CloudNine', 'Lisa Park', '$78,000', 5, '#8b5cf6'),
              dealCard('BrightEdge', 'Tom Hayes', '$50,000', 12, '#ef4444'),
            ]),
            pipelineColumn('Negotiation', 2, '$195K total', [
              dealCard('MegaSoft', 'Anna Wright', '$120,000', 8, '#ec4899'),
              dealCard('GreenLeaf', 'David Kim', '$75,000', 4, '#14b8a6'),
            ]),
            pipelineColumn('Closed Won', 1, '$89K total', [
              dealCard('Pinnacle Ltd', 'Raj Patel', '$89,000', 1, '#22c55e'),
            ]),
          ],
        }),
        // Activity feed
        frame('ActivityFeed', {
          size: { x: 260 },
          autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Recent Activity', { fontSize: 15, fontWeight: 700, color: '#111827' }),
            activityItem('Sarah', 'moved Acme Corp to Qualified', '2 min ago', '#3b82f6'),
            activityItem('Tom', 'added a note on BrightEdge', '15 min ago', '#ef4444'),
            activityItem('Lisa', 'scheduled a call with CloudNine', '1 hr ago', '#8b5cf6'),
            activityItem('David', 'updated GreenLeaf deal value', '2 hr ago', '#14b8a6'),
            activityItem('Anna', 'closed MegaSoft deal', '3 hr ago', '#ec4899'),
          ],
        }),
      ],
    }),
  ],
});
