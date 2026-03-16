/**
 * Donation Page — Charity with cause cards, donation tiers, impact stats
 * DSL features: gradient hero, tier selection, impact stats with icons, progress bar
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function impactStat(icon: string, value: string, label: string) {
  return frame(`Impact: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#f0fdf4')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 22, fontWeight: 400, color: '#16a34a' }),
      text(value, { fontSize: 22, fontWeight: 800, color: '#111827' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

function donationTier(amount: string, desc: string, selected: boolean) {
  return frame(`Tier: ${amount}`, {
    autoLayout: vertical({ spacing: 6, padX: 18, padY: 14 }),
    fills: [solid(selected ? '#16a34a' : '#ffffff')],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: selected ? [] : [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(amount, { fontSize: 24, fontWeight: 800, color: selected ? '#ffffff' : '#16a34a' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: selected ? '#ffffffcc' : '#6b7280' }),
    ],
  });
}

function causeCard(title: string, desc: string, raised: string, goal: string, pct: number, color: string) {
  return frame(`Cause: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle(`CauseImg:${title}`, {
        size: { x: 1, y: 100 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'aa', position: 1 }], 135)],
        cornerRadius: 10,
      }),
      text(title, { fontSize: 15, fontWeight: 700, color: '#111827' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#6b7280', lineHeight: { value: 150, unit: 'PERCENT' } }),
      frame('ProgressBar', {
        size: { x: 1, y: 6 }, fills: [solid('#e5e7eb')], cornerRadius: 3,
        layoutSizingHorizontal: 'FILL', clipContent: true,
        children: [rectangle('Fill', { size: { x: pct * 3, y: 6 }, fills: [solid(color)], cornerRadius: 3 })],
      }),
      frame('FundRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(`${raised} raised`, { fontSize: 11, fontWeight: 600, color }),
          text(`Goal: ${goal}`, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('DonationPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#15803d', position: 1 }], 135)],
      children: [
        text('GreenHope Foundation', { fontSize: 28, fontWeight: 900, color: '#ffffff' }),
        text('Together, we can make a difference. Every dollar counts.', { fontSize: 14, fontWeight: 400, color: '#ffffffcc', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('ImpactRow', {
      autoLayout: horizontal({ spacing: 12, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        impactStat('🌱', '12,400', 'Trees Planted'),
        impactStat('💧', '8.2M', 'Gallons Saved'),
        impactStat('👥', '34K', 'Donors'),
        impactStat('🌍', '28', 'Countries'),
      ],
    }),
    frame('DonateSection', {
      autoLayout: vertical({ spacing: 12, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Choose Your Impact', { fontSize: 18, fontWeight: 700, color: '#111827' }),
        frame('TierRow', {
          autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
          children: [
            donationTier('$10', 'Plant 5 trees', false),
            donationTier('$25', 'Clean water for a family', true),
            donationTier('$50', 'Restore 1 acre of forest', false),
            donationTier('$100', 'Fund a community garden', false),
          ],
        }),
        frame('DonateBtn', {
          autoLayout: horizontal({ spacing: 0, padY: 14, align: 'CENTER' }),
          fills: [solid('#16a34a')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
          children: [text('Donate $25', { fontSize: 16, fontWeight: 700, color: '#ffffff' })],
        }),
      ],
    }),
    frame('CausesSection', {
      autoLayout: vertical({ spacing: 12, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Active Campaigns', { fontSize: 18, fontWeight: 700, color: '#111827' }),
        frame('CauseGrid', {
          autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            causeCard('Amazon Reforestation', 'Replanting native trees in deforested areas of the Amazon.', '$184K', '$250K', 73, '#16a34a'),
            causeCard('Ocean Cleanup', 'Removing plastic waste from Pacific coastal waters.', '$92K', '$150K', 61, '#2563eb'),
          ],
        }),
      ],
    }),
  ],
});
