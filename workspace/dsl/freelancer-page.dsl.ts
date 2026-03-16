/**
 * Freelancer Dashboard — Active projects, time tracker, earnings chart
 *
 * DSL features stressed: SPACE_BETWEEN, progress bars, gradient chart
 * placeholder, two-panel layout, FILL sizing, cornerRadius cards
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function statBox(label: string, value: string, sub: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
      text(value, { fontSize: 28, fontWeight: 800, color }),
      text(sub, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}

function projectCard(name: string, client: string, pct: number, dueDate: string, color: string) {
  return frame(`Proj: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 18, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`${name}Top`, {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`${name}TitleCol`, {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
              text(client, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          text(`${pct}%`, { fontSize: 16, fontWeight: 700, color }),
        ],
      }),
      frame(`${name}Bar`, {
        size: { x: 1, y: 8 },
        fills: [solid('#f1f5f9')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle(`${name}Fill`, {
            size: { x: Math.round(pct * 3.5), y: 8 },
            fills: [solid(color)],
            cornerRadius: 4,
          }),
        ],
      }),
      frame(`${name}Footer`, {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(`Due: ${dueDate}`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
          text('View', { fontSize: 12, fontWeight: 600, color }),
        ],
      }),
    ],
  });
}

function timeEntry(project: string, hours: string, amount: string) {
  return frame(`Time: ${project}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(project, { fontSize: 14, fontWeight: 500, color: '#374151' }),
      frame(`${project}Right`, {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          text(hours, { fontSize: 13, fontWeight: 600, color: '#6b7280' }),
          text(amount, { fontSize: 14, fontWeight: 700, color: '#059669' }),
        ],
      }),
    ],
  });
}

export default frame('FreelancerPage', {
  size: { x: 1080 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('FreelanceHub', { fontSize: 22, fontWeight: 800, color: '#7c3aed' }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 14, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('Projects', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            text('Invoices', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            ellipse('Avatar', {
              size: { x: 32, y: 32 },
              fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#c084fc', position: 1 }], 135)],
            }),
          ],
        }),
      ],
    }),

    // Stats Row
    frame('StatsRow', {
      autoLayout: horizontal({ spacing: 16, padX: 36, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statBox('This Month', '$8,420', '+12% vs last month', '#059669'),
        statBox('Hours Logged', '142h', 'Avg 7.1h / day', '#2563eb'),
        statBox('Active Projects', '5', '2 due this week', '#d97706'),
        statBox('Pending Invoices', '$3,200', '2 unpaid', '#dc2626'),
      ],
    }),

    // Two-panel layout
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 36, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Projects
        frame('ProjectsPanel', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('ProjectsHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Active Projects', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
                text('View All', { fontSize: 14, fontWeight: 600, color: '#7c3aed' }),
              ],
            }),
            projectCard('Brand Redesign', 'Acme Corp', 75, 'Mar 22', '#7c3aed'),
            projectCard('Mobile App UI', 'TechStart', 40, 'Apr 5', '#2563eb'),
            projectCard('Website Rebuild', 'CafeBloom', 90, 'Mar 18', '#059669'),
          ],
        }),

        // Right: Time + Earnings
        frame('RightPanel', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 360 },
          children: [
            // Time Tracker
            frame('TimeTracker', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text("Today's Time", { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
                timeEntry('Brand Redesign', '3h 20m', '$250'),
                timeEntry('Mobile App UI', '2h 45m', '$206'),
                timeEntry('Website Rebuild', '1h 10m', '$88'),
              ],
            }),

            // Earnings Chart Placeholder
            frame('EarningsChart', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Monthly Earnings', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
                rectangle('ChartPlaceholder', {
                  size: { x: 1, y: 120 },
                  fills: [gradient([{ hex: '#7c3aed22', position: 0 }, { hex: '#c084fc22', position: 1 }], 180)],
                  cornerRadius: 10,
                  layoutSizingHorizontal: 'FILL',
                }),
                frame('ChartLegend', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Jan', { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
                    text('Feb', { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
                    text('Mar', { fontSize: 11, fontWeight: 700, color: '#7c3aed' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
