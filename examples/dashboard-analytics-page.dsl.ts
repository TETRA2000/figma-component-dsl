import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const sapphire = '#1d4ed8'; const white = '#ffffff'; const bg = '#f8fafc'; const dark = '#0f172a';
const med = '#64748b'; const green = '#059669'; const red = '#dc2626'; const amber = '#d97706';

function kpiCard(label: string, value: string, change: string, isUp: boolean) {
  return frame(`KPI: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }), fills: [solid(white)],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: med }),
      text(value, { fontSize: 28, fontWeight: 700, color: dark }),
      frame('Change', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
        ellipse('Arrow', { size: { x: 8, y: 8 }, fills: [solid(isUp ? green : red)] }),
        text(change, { fontSize: 12, fontWeight: 600, color: isUp ? green : red }),
      ]}),
    ],
  });
}

function chartBar(label: string, h: number, color: string) {
  return frame(`Bar: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER', align: 'MAX' }),
    children: [
      rectangle('BarFill', { size: { x: 32, y: h }, fills: [solid(color)], cornerRadius: 4 }),
      text(label, { fontSize: 10, fontWeight: 400, color: med }),
    ],
  });
}

function activityRow(action: string, user: string, time: string, type: string) {
  const typeColor = type === 'sale' ? green : type === 'signup' ? sapphire : amber;
  return frame(`Act: ${action.substring(0, 15)}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, spacing: 10, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.95, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ActLeft', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
        ellipse('ActDot', { size: { x: 8, y: 8 }, fills: [solid(typeColor)] }),
        frame('ActInfo', { autoLayout: vertical({ spacing: 0 }), children: [
          text(action, { fontSize: 13, fontWeight: 500, color: dark }),
          text(user, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
      ]}),
      text(time, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('DashAnalytics', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 4, padX: 14, padY: 20 }), size: { x: 220, y: undefined },
      fills: [solid(dark)],
      children: [
        text('DataVault', { fontSize: 18, fontWeight: 700, color: white }),
        frame('SideNav', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          frame('SN1', { autoLayout: horizontal({ padX: 10, padY: 8 }), fills: [solid(sapphire, 0.2)], cornerRadius: 6, layoutSizingHorizontal: 'FILL',
            children: [text('Dashboard', { fontSize: 13, fontWeight: 600, color: white })] }),
          frame('SN2', { autoLayout: horizontal({ padX: 10, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Analytics', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] }),
          frame('SN3', { autoLayout: horizontal({ padX: 10, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Customers', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] }),
          frame('SN4', { autoLayout: horizontal({ padX: 10, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Products', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] }),
          frame('SN5', { autoLayout: horizontal({ padX: 10, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Settings', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 20, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('TopBar', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          text('Dashboard Overview', { fontSize: 22, fontWeight: 700, color: dark }),
          frame('DateRange', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(white)], cornerRadius: 6,
            strokes: [{ color: { r: 0.88, g: 0.9, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [text('Mar 1 - Mar 14, 2026', { fontSize: 13, fontWeight: 400, color: med })] }),
        ]}),
        frame('KPIs', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          kpiCard('Revenue', '$48,250', '+12.5% vs last month', true),
          kpiCard('Users', '12,847', '+8.3% vs last month', true),
          kpiCard('Orders', '1,842', '-2.1% vs last month', false),
          kpiCard('Conversion', '3.24%', '+0.5% vs last month', true),
        ]}),
        frame('BottomSection', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Chart', {
            autoLayout: vertical({ spacing: 16, padX: 20, padY: 16 }), fills: [solid(white)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
            children: [
              text('Revenue by Month', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('Bars', { autoLayout: horizontal({ spacing: 8, counterAlign: 'MAX' }), children: [
                chartBar('Jan', 80, sapphire),
                chartBar('Feb', 95, sapphire),
                chartBar('Mar', 70, sapphire),
                chartBar('Apr', 110, sapphire),
                chartBar('May', 125, sapphire),
                chartBar('Jun', 100, sapphire),
                chartBar('Jul', 140, sapphire),
                chartBar('Aug', 115, sapphire),
                chartBar('Sep', 130, sapphire),
                chartBar('Oct', 150, sapphire),
                chartBar('Nov', 135, sapphire),
                chartBar('Dec', 160, green),
              ]}),
            ],
          }),
          frame('Activity', {
            autoLayout: vertical({ spacing: 6, padX: 0, padY: 0 }), fills: [solid(white)], cornerRadius: 12,
            size: { x: 340, y: undefined }, clipContent: true,
            children: [
              frame('ActHeader', { autoLayout: horizontal({ padX: 14, padY: 12, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Recent Activity', { fontSize: 16, fontWeight: 600, color: dark }),
                text('View All', { fontSize: 12, fontWeight: 500, color: sapphire }),
              ]}),
              activityRow('New purchase: Pro Plan', 'sarah@example.com', '2m ago', 'sale'),
              activityRow('User signed up', 'alex@company.co', '15m ago', 'signup'),
              activityRow('Support ticket opened', 'james@startup.io', '1h ago', 'support'),
              activityRow('New purchase: Team Plan', 'maya@design.co', '2h ago', 'sale'),
              activityRow('User signed up', 'noah@dev.org', '3h ago', 'signup'),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
