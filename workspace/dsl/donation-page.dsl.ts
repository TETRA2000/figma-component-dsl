/**
 * Charity Donation Page — Campaign progress bar, donor list, impact stats
 *
 * DSL features stressed: progress bars with clipContent, large numbers,
 * gradient CTA button, SPACE_BETWEEN rows, cornerRadius cards
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function statCard(value: string, label: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 32, fontWeight: 800, color }),
      text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

function donorRow(name: string, amount: string, time: string, gradA: string, gradB: string) {
  return frame(`Donor: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`${name}Left`, {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse(`${name}Av`, {
            size: { x: 38, y: 38 },
            fills: [gradient([{ hex: gradA, position: 0 }, { hex: gradB, position: 1 }], 135)],
          }),
          frame(`${name}Info`, {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 600, color: '#1f2937' }),
              text(time, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
        ],
      }),
      text(amount, { fontSize: 15, fontWeight: 700, color: '#059669' }),
    ],
  });
}

function progressBar(raised: number, goal: number) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  return frame('CampaignProgress', {
    autoLayout: vertical({ spacing: 10, padX: 28, padY: 28 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ProgressHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(`$${raised.toLocaleString()} raised`, { fontSize: 20, fontWeight: 700, color: '#111827' }),
          text(`${pct}%`, { fontSize: 18, fontWeight: 700, color: '#059669' }),
        ],
      }),
      frame('BarBg', {
        size: { x: 1, y: 14 },
        fills: [solid('#e5e7eb')],
        cornerRadius: 7,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(pct * 7), y: 14 },
            fills: [gradient([{ hex: '#059669', position: 0 }, { hex: '#34d399', position: 1 }], 90)],
            cornerRadius: 7,
          }),
        ],
      }),
      text(`Goal: $${goal.toLocaleString()}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('DonationPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f3f4f6')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 14, padX: 60, padY: 52, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#065f46', position: 0 }, { hex: '#047857', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Clean Water for All', { fontSize: 36, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Help us bring clean drinking water to 10,000 families in rural communities.', {
          fontSize: 16, fontWeight: 400, color: '#a7f3d0', textAlignHorizontal: 'CENTER',
        }),
        frame('DonateCTA', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER' }),
          fills: [gradient([{ hex: '#f59e0b', position: 0 }, { hex: '#f97316', position: 1 }], 90)],
          cornerRadius: 12,
          children: [
            text('Donate Now', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Progress
    frame('ProgressSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        progressBar(73500, 100000),
      ],
    }),

    // Impact Stats
    frame('ImpactSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Our Impact', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        frame('StatsRow', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statCard('2,450', 'Donors', '#059669'),
            statCard('8,200', 'Families Helped', '#2563eb'),
            statCard('15', 'Wells Built', '#d97706'),
            statCard('98%', 'Funds to Field', '#7c3aed'),
          ],
        }),
      ],
    }),

    // Recent Donors
    frame('DonorsSection', {
      autoLayout: vertical({ spacing: 14, padX: 48, padY: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('DonorsHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Recent Donors', { fontSize: 20, fontWeight: 700, color: '#111827' }),
            text('View All', { fontSize: 14, fontWeight: 600, color: '#059669' }),
          ],
        }),
        donorRow('Alice Johnson', '$250', '2 hours ago', '#f472b6', '#a78bfa'),
        donorRow('Mark Chen', '$100', '5 hours ago', '#34d399', '#22d3ee'),
        donorRow('Sarah Williams', '$500', '1 day ago', '#fb923c', '#f43f5e'),
        donorRow('Anonymous', '$1,000', '1 day ago', '#94a3b8', '#64748b'),
      ],
    }),
  ],
});
