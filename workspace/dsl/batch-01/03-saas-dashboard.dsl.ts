/**
 * SaaS Analytics Dashboard — Sidebar + Stats + Chart area
 * Batch 1, Page 3: Technology/SaaS
 * DSL Features: horizontal + vertical nested layouts, FIXED width sidebar, FILL content area
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSDashboard', {
  size: { x: 1440, y: 900 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    // ── Sidebar ──
    sidebar(),

    // ── Main Content ──
    frame('MainContent', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',
      children: [
        // Top bar
        topBar(),

        // KPI Stats Row
        frame('StatsRow', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statCard('Total Revenue', '$48,295', '+12.5%', true),
            statCard('Active Users', '2,847', '+8.2%', true),
            statCard('Conversion Rate', '3.24%', '-0.4%', false),
            statCard('Avg. Session', '4m 32s', '+1.1%', true),
          ],
        }),

        // Charts Area
        frame('ChartsArea', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          layoutSizingVertical: 'FILL',
          children: [
            // Main chart
            frame('RevenueChart', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              layoutSizingVertical: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('ChartHeader', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('ChartTitleGroup', {
                      autoLayout: vertical({ spacing: 4 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('Revenue Overview', { fontSize: 16, fontWeight: 600, color: '#111827' }),
                        text('Monthly revenue for the past 12 months', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
                      ],
                    }),
                    frame('ChartPeriod', {
                      autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#f1f5f9')],
                      cornerRadius: 6,
                      children: [
                        text('12 months', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
                      ],
                    }),
                  ],
                }),
                // Chart placeholder — bar chart representation
                frame('ChartBody', {
                  autoLayout: horizontal({ spacing: 8, align: 'MAX', counterAlign: 'MAX' }),
                  layoutSizingHorizontal: 'FILL',
                  layoutSizingVertical: 'FILL',
                  children: [
                    chartBar('Jan', 60),
                    chartBar('Feb', 45),
                    chartBar('Mar', 72),
                    chartBar('Apr', 55),
                    chartBar('May', 80),
                    chartBar('Jun', 68),
                    chartBar('Jul', 90),
                    chartBar('Aug', 85),
                    chartBar('Sep', 75),
                    chartBar('Oct', 95),
                    chartBar('Nov', 88),
                    chartBar('Dec', 110),
                  ],
                }),
              ],
            }),

            // Side panel
            frame('ActivityPanel', {
              autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
              size: { x: 300, y: undefined },
              layoutSizingVertical: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Recent Activity', { fontSize: 16, fontWeight: 600, color: '#111827' }),
                activityItem('New signup', 'john@example.com joined', '2m ago', '#6366f1'),
                activityItem('Payment', '$299 received from Acme', '15m ago', '#22c55e'),
                activityItem('Alert', 'CPU usage above 90%', '1h ago', '#f59e0b'),
                activityItem('Deployment', 'v2.4.1 deployed to prod', '3h ago', '#3b82f6'),
                activityItem('New signup', 'sarah@corp.io joined', '5h ago', '#6366f1'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// ── Helper: Sidebar ──
function sidebar() {
  return frame('Sidebar', {
    autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
    size: { x: 240, y: undefined },
    layoutSizingVertical: 'FILL',
    fills: [solid('#1e293b')],
    children: [
      // Logo area
      frame('SidebarLogo', {
        autoLayout: horizontal({ spacing: 10, padX: 20, padY: 20, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('LogoIcon', {
            size: { x: 32, y: 32 },
            fills: [gradient([
              { hex: '#6366f1', position: 0 },
              { hex: '#8b5cf6', position: 1 },
            ], 135)],
            cornerRadius: 8,
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            children: [
              text('F', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
          text('Flowbase', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
        ],
      }),

      // Navigation sections
      frame('NavSection', {
        autoLayout: vertical({ spacing: 2, padX: 12, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('MAIN', { fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: { value: 8, unit: 'PERCENT' } }),
          navItem('Dashboard', true),
          navItem('Analytics', false),
          navItem('Customers', false),
          navItem('Products', false),
        ],
      }),

      rectangle('SidebarDivider1', {
        size: { x: 1, y: 1 },
        fills: [solid('#334155')],
        layoutSizingHorizontal: 'FILL',
      }),

      frame('NavSection2', {
        autoLayout: vertical({ spacing: 2, padX: 12, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('SETTINGS', { fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: { value: 8, unit: 'PERCENT' } }),
          navItem('Team', false),
          navItem('Billing', false),
          navItem('Integrations', false),
        ],
      }),

      // Spacer to push user profile to bottom
      frame('SidebarSpacer', {
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FILL',
        size: { x: 1, y: 1 },
      }),

      rectangle('SidebarDivider2', {
        size: { x: 1, y: 1 },
        fills: [solid('#334155')],
        layoutSizingHorizontal: 'FILL',
      }),

      // User profile
      frame('UserProfile', {
        autoLayout: horizontal({ spacing: 10, padX: 16, padY: 16, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('UserAvatar', {
            size: { x: 36, y: 36 },
            fills: [gradient([
              { hex: '#6366f1', position: 0 },
              { hex: '#a78bfa', position: 1 },
            ], 135)],
            cornerRadius: 18,
          }),
          frame('UserInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text('Alex Morgan', { fontSize: 13, fontWeight: 600, color: '#f1f5f9' }),
              text('alex@flowbase.io', { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── Helper: Nav Item ──
function navItem(label: string, active: boolean) {
  return frame(`Nav: ${label}`, {
    autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active ? [solid('#334155')] : [],
    cornerRadius: 8,
    children: [
      rectangle(`${label}Icon`, {
        size: { x: 18, y: 18 },
        fills: [solid(active ? '#a5b4fc' : '#64748b')],
        cornerRadius: 4,
      }),
      text(label, {
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#f1f5f9' : '#94a3b8',
      }),
    ],
  });
}

// ── Helper: Top Bar ──
function topBar() {
  return frame('TopBar', {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('PageTitle', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Dashboard', { fontSize: 24, fontWeight: 700, color: '#111827' }),
          text('Welcome back, Alex. Here is what is happening today.', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      frame('SearchBar', {
        autoLayout: horizontal({ padX: 14, padY: 10, spacing: 8, counterAlign: 'CENTER' }),
        size: { x: 260, y: undefined },
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        strokes: [{ color: { r: 0.88, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text('Search...', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

// ── Helper: Stat Card ──
function statCard(label: string, value: string, change: string, positive: boolean) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
      text(value, { fontSize: 28, fontWeight: 700, color: '#111827' }),
      frame(`${label}Change`, {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text(positive ? '↑' : '↓', {
            fontSize: 13,
            fontWeight: 600,
            color: positive ? '#22c55e' : '#ef4444',
          }),
          text(change, {
            fontSize: 13,
            fontWeight: 600,
            color: positive ? '#22c55e' : '#ef4444',
          }),
          text('vs last month', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

// ── Helper: Chart Bar ──
function chartBar(month: string, height: number) {
  return frame(`Bar: ${month}`, {
    autoLayout: vertical({ spacing: 6, align: 'MAX', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    layoutSizingVertical: 'FILL',
    children: [
      rectangle(`BarFill: ${month}`, {
        size: { x: 24, y: height },
        fills: [gradient([
          { hex: '#6366f1', position: 0 },
          { hex: '#a5b4fc', position: 1 },
        ], 90)],
        cornerRadii: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
      }),
      text(month, { fontSize: 10, fontWeight: 500, color: '#9ca3af' }),
    ],
  });
}

// ── Helper: Activity Item ──
function activityItem(type: string, description: string, time: string, dotColor: string) {
  return frame(`Activity: ${type}`, {
    autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Dot: ${type}`, {
        size: { x: 8, y: 8 },
        fills: [solid(dotColor)],
        cornerRadius: 4,
      }),
      frame(`ActivityText: ${type}`, {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(description, { fontSize: 13, fontWeight: 500, color: '#374151' }),
          text(time, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}
