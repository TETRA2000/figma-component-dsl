/**
 * Rewards Program — Points balance, tier progress, redeem catalog, history
 * Batch 6, Page 60: Finance (loosen variant-union)
 * DSL Features: gradient, progress bars, FILL sizing, cornerRadius, opacity
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function rewardCard(title: string, points: string, category: string) {
  return frame(`Reward: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('RewardImage', {
        size: { x: 1, y: 100 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#f1f5f9')],
        cornerRadius: 8,
      }),
      text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
      frame('RewardMeta', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(category, { fontSize: 12, fontWeight: 400, color: '#64748b', layoutSizingHorizontal: 'FILL' }),
          frame('PointsBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4 }),
            fills: [solid('#fef3c7')],
            cornerRadius: 12,
            children: [
              text(`${points} pts`, { fontSize: 12, fontWeight: 600, color: '#92400e' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function historyRow(description: string, date: string, points: string, earned: boolean) {
  return frame(`History: ${description}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(description, { fontSize: 14, fontWeight: 500, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
      text(date, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      text(`${earned ? '+' : '-'}${points}`, {
        fontSize: 14,
        fontWeight: 600,
        color: earned ? '#16a34a' : '#dc2626',
      }),
    ],
  });
}

export default component('RewardsProgram', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Points Header
    frame('PointsHeader', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e3a5f', position: 1 }], 135)],
      children: [
        text('Your Rewards', { fontSize: 14, fontWeight: 500, color: '#94a3b8', letterSpacing: { value: 5, unit: 'PERCENT' } }),
        text('24,850', { fontSize: 56, fontWeight: 800, color: '#f59e0b' }),
        text('Available Points', { fontSize: 16, fontWeight: 400, color: '#94a3b8' }),
        // Tier Progress
        frame('TierProgress', {
          autoLayout: vertical({ spacing: 8, align: 'CENTER' }),
          size: { x: 400, y: undefined },
          children: [
            frame('TierLabels', {
              autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Gold Member', { fontSize: 13, fontWeight: 600, color: '#f59e0b', layoutSizingHorizontal: 'FILL' }),
                text('Platinum at 30,000', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              ],
            }),
            frame('ProgressBar', {
              size: { x: 400, y: 8 },
              fills: [solid('#1e293b')],
              cornerRadius: 4,
              children: [
                rectangle('ProgressFill', {
                  size: { x: 330, y: 8 },
                  fills: [gradient([{ hex: '#f59e0b', position: 0 }, { hex: '#eab308', position: 1 }], 0)],
                  cornerRadius: 4,
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Multiplier Promotions
    frame('Promotions', {
      autoLayout: horizontal({ spacing: 16, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Promo1', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 10, counterAlign: 'CENTER' }),
          fills: [solid('#ecfdf5')],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('3x', { fontSize: 18, fontWeight: 800, color: '#059669' }),
            text('Points on dining this week', { fontSize: 13, fontWeight: 500, color: '#065f46' }),
          ],
        }),
        frame('Promo2', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 10, counterAlign: 'CENTER' }),
          fills: [solid('#ede9fe')],
          cornerRadius: 8,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('2x', { fontSize: 18, fontWeight: 800, color: '#7c3aed' }),
            text('Points on travel bookings', { fontSize: 13, fontWeight: 500, color: '#5b21b6' }),
          ],
        }),
      ],
    }),

    // Redeem Catalog
    frame('RedeemSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Redeem Rewards', { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
        frame('RewardGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rewardCard('$50 Statement Credit', '5,000', 'Cash Back'),
            rewardCard('Airport Lounge Pass', '7,500', 'Travel'),
            rewardCard('$100 Gift Card', '10,000', 'Shopping'),
            rewardCard('First Class Upgrade', '15,000', 'Travel'),
          ],
        }),
      ],
    }),

    // Earning History
    frame('HistorySection', {
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Recent Activity', { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
        frame('HistoryList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            historyRow('Amazon Purchase', 'Mar 14', '125', true),
            historyRow('Statement Credit Redeemed', 'Mar 12', '5,000', false),
            historyRow('Uber Eats (3x Bonus)', 'Mar 11', '87', true),
            historyRow('Delta Flight Booking', 'Mar 8', '450', true),
            historyRow('Monthly Interest Bonus', 'Mar 1', '200', true),
          ],
        }),
      ],
    }),
  ],
});
