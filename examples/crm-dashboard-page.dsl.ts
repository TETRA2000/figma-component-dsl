import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const indigo = '#4f46e5'; const indigoBg = '#eef2ff'; const white = '#ffffff'; const bg = '#f8fafc';
const dark = '#1e293b'; const med = '#64748b'; const green = '#059669'; const red = '#dc2626';
const amber = '#d97706'; const blue = '#2563eb'; const border = '#e2e8f0';

function dealRow(company: string, contact: string, value: string, stage: string, stageColor: string, probability: string) {
  return frame(`Deal: ${company}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DealLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        ellipse('CompanyIcon', { size: { x: 32, y: 32 }, fills: [solid(stageColor, 0.15)] }),
        frame('DealInfo', { autoLayout: vertical({ spacing: 0 }), children: [
          text(company, { fontSize: 14, fontWeight: 600, color: dark }),
          text(contact, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
      text(value, { fontSize: 14, fontWeight: 600, color: dark }),
      frame('StageBadge', {
        autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(stageColor, 0.1)], cornerRadius: 9999,
        children: [text(stage, { fontSize: 12, fontWeight: 500, color: stageColor })],
      }),
      text(probability, { fontSize: 13, fontWeight: 500, color: med }),
    ],
  });
}

function pipelineStage(name: string, count: string, value: string, color: string) {
  return frame(`Stage: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(white)],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('StageHeader', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
        rectangle('StageColor', { size: { x: 10, y: 10 }, fills: [solid(color)], cornerRadius: 5 }),
        text(name, { fontSize: 13, fontWeight: 600, color: dark }),
      ]}),
      text(count, { fontSize: 22, fontWeight: 700, color: dark }),
      text(value, { fontSize: 13, fontWeight: 400, color: med }),
    ],
  });
}

function activityItem(action: string, person: string, time: string) {
  return frame(`Activity: ${action}`, {
    autoLayout: horizontal({ spacing: 10, padX: 0, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('ActDot', { size: { x: 8, y: 8 }, fills: [solid(indigo)] }),
      frame('ActInfo', { autoLayout: vertical({ spacing: 1 }), children: [
        text(action, { fontSize: 13, fontWeight: 500, color: dark }),
        text(`${person} · ${time}`, { fontSize: 12, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

function kpiCard(label: string, value: string, change: string, isUp: boolean) {
  return frame(`KPI: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }), fills: [solid(white)],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: med }),
      text(value, { fontSize: 26, fontWeight: 700, color: dark }),
      text(change, { fontSize: 12, fontWeight: 600, color: isUp ? green : red }),
    ],
  });
}

export default frame('CRMDashboard', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          rectangle('LogoMark', { size: { x: 24, y: 24 }, fills: [solid(indigo)], cornerRadius: 6 }),
          text('SalesPro', { fontSize: 18, fontWeight: 700, color: dark }),
        ]}),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Dashboard', { fontSize: 14, fontWeight: 600, color: indigo }),
          text('Contacts', { fontSize: 14, fontWeight: 400, color: med }),
          text('Deals', { fontSize: 14, fontWeight: 400, color: med }),
          text('Reports', { fontSize: 14, fontWeight: 400, color: med }),
          text('Settings', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 20, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('KPIRow', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          kpiCard('Revenue', '$284,500', '+18.2% vs last month', true),
          kpiCard('New Deals', '47', '+12 deals this week', true),
          kpiCard('Win Rate', '34.2%', '-2.1% vs last month', false),
          kpiCard('Avg Deal Size', '$6,052', '+$450 vs last month', true),
        ]}),
        frame('PipelineRow', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          pipelineStage('Prospecting', '23', '$138,000', blue),
          pipelineStage('Qualified', '18', '$198,000', indigo),
          pipelineStage('Proposal', '12', '$252,000', amber),
          pipelineStage('Negotiation', '8', '$184,000', green),
          pipelineStage('Closed Won', '5', '$142,500', '#059669'),
          pipelineStage('Closed Lost', '3', '$67,000', red),
        ]}),
        frame('BottomRow', { autoLayout: horizontal({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          frame('DealTable', {
            autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }), fills: [solid(white)],
            cornerRadius: 12, clipContent: true, layoutSizingHorizontal: 'FILL',
            children: [
              frame('TableHeader', {
                autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
                fills: [solid('#f8fafc')],
                children: [
                  text('Recent Deals', { fontSize: 16, fontWeight: 600, color: dark }),
                  text('View All', { fontSize: 13, fontWeight: 500, color: indigo }),
                ],
              }),
              dealRow('Acme Corp', 'John Smith', '$45,000', 'Proposal', amber, '65%'),
              dealRow('TechStart Inc', 'Sarah Lee', '$28,000', 'Qualified', indigo, '40%'),
              dealRow('Global Media', 'Mike Chen', '$72,000', 'Negotiation', green, '80%'),
              dealRow('DataFlow', 'Emma Wilson', '$35,000', 'Prospecting', blue, '25%'),
            ],
          }),
          frame('ActivityFeed', {
            autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }), fills: [solid(white)],
            cornerRadius: 12, size: { x: 360, y: undefined },
            children: [
              text('Recent Activity', { fontSize: 16, fontWeight: 600, color: dark }),
              activityItem('Closed deal with Acme Corp', 'John Smith', '2 hours ago'),
              activityItem('Sent proposal to TechStart', 'Sarah Lee', '4 hours ago'),
              activityItem('Meeting scheduled with Global Media', 'Mike Chen', 'Yesterday'),
              activityItem('New lead: DataFlow', 'Emma Wilson', 'Yesterday'),
              activityItem('Follow-up call with NetServe', 'Alex Johnson', '2 days ago'),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
