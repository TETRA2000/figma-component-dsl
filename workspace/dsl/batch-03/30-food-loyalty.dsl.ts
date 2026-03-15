/**
 * Loyalty Program — Points balance, tier status, rewards catalog, history
 * Batch 3, Page 10: Food & Restaurant
 * DSL Features: gradients, opacity, cornerRadii, warm palette, rich typography
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const WHITE = '#FFFFFF';

const BRONZE = '#CD7F32';
const SILVER = '#C0C0C0';
const GOLD = '#FFD700';

function tierCard(tier: string, color: string, points: string, active: boolean) {
  return frame(`Tier: ${tier}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active
      ? [gradient([{ hex: color, position: 0 }, { hex: '#3E2723', position: 1 }], 270)]
      : [solid(WHITE)],
    cornerRadius: 16,
    strokes: active
      ? []
      : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    opacity: active ? 1 : 0.6,
    children: [
      text('◆', { fontSize: 24, fontWeight: 600, color: active ? color : '#D7CCC8' }),
      text(tier, { fontSize: 18, fontWeight: 700, color: active ? WHITE : DARK }),
      text(points, { fontSize: 12, fontWeight: 500, color: active ? TAN : MUTED }),
    ],
  });
}

function rewardCard(name: string, points: string, desc: string, available: boolean) {
  return frame(`Reward: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(WHITE)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    opacity: available ? 1 : 0.5,
    children: [
      frame('RewardHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: DARK }),
          frame('PointsBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(BROWN, 0.1)],
            cornerRadius: 12,
            children: [
              text(points, { fontSize: 12, fontWeight: 600, color: BROWN }),
            ],
          }),
        ],
      }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: MUTED,
        lineHeight: { value: 20, unit: 'PIXELS' },
      }),
      frame('RedeemBtn', {
        autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: available ? [solid(BROWN)] : [solid('#D7CCC8')],
        cornerRadius: 8,
        children: [
          text(available ? 'Redeem' : 'Not Enough Points', {
            fontSize: 13, fontWeight: 600, color: WHITE,
          }),
        ],
      }),
    ],
  });
}

function transactionRow(date: string, desc: string, points: string, type: 'earned' | 'redeemed') {
  return frame(`Txn: ${desc}`, {
    autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TxnLeft', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(desc, { fontSize: 14, fontWeight: 500, color: DARK }),
          text(date, { fontSize: 12, fontWeight: 400, color: MUTED }),
        ],
      }),
      text(type === 'earned' ? `+${points}` : `-${points}`, {
        fontSize: 15, fontWeight: 600,
        color: type === 'earned' ? '#4CAF50' : '#E53935',
      }),
    ],
  });
}

export default component('FoodLoyalty', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero with Points Balance
    frame('LoyaltyHero', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#3E2723', position: 0 },
          { hex: '#8B4513', position: 0.6 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Loyalty Rewards', {
          fontSize: 44, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        // Points balance card
        frame('PointsCard', {
          autoLayout: vertical({ spacing: 8, padX: 40, padY: 28, counterAlign: 'CENTER' }),
          fills: [solid(WHITE, 0.12)],
          cornerRadius: 20,
          children: [
            text('Your Points Balance', { fontSize: 14, fontWeight: 500, color: TAN }),
            text('2,450', {
              fontSize: 56, fontWeight: 700, color: WHITE,
              letterSpacing: { value: -2, unit: 'PIXELS' },
            }),
            text('Silver Member', { fontSize: 16, fontWeight: 600, color: SILVER }),
            // Progress bar to Gold
            frame('ProgressSection', {
              autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
              children: [
                frame('ProgressTrack', {
                  size: { x: 280, y: 6 },
                  fills: [solid(WHITE, 0.2)],
                  cornerRadius: 3,
                  clipContent: true,
                  autoLayout: horizontal({ spacing: 0 }),
                  children: [
                    rectangle('ProgressFill', {
                      size: { x: 170, y: 6 },
                      fills: [solid(GOLD)],
                    }),
                  ],
                }),
                text('550 points to Gold status', { fontSize: 12, fontWeight: 400, color: TAN }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Tier Status
    frame('TierSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Membership Tiers', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('TierGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            tierCard('Bronze', BRONZE, '0 – 999 pts', false),
            tierCard('Silver', SILVER, '1,000 – 2,999 pts', true),
            tierCard('Gold', GOLD, '3,000+ pts', false),
          ],
        }),
      ],
    }),

    // Rewards Catalog
    frame('RewardsSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(BROWN, 0.04)],
      children: [
        text('Rewards Catalog', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('RewardsGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rewardCard('Free Appetizer', '500 pts', 'Choose any appetizer from our menu, on the house.', true),
            rewardCard('Dessert for Two', '800 pts', 'Two desserts of your choice with complimentary espresso.', true),
            rewardCard('Wine Pairing Dinner', '2,000 pts', 'Full 5-course dinner with sommelier-selected wine pairing.', true),
            rewardCard('Private Chef Experience', '5,000 pts', 'Exclusive private dinner prepared by Chef Marco at your home.', false),
          ],
        }),
      ],
    }),

    // Transaction History
    frame('HistorySection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Transaction History', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('HistoryCard', {
          autoLayout: vertical({ spacing: 0, padX: 24, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(WHITE)],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            transactionRow('March 12, 2026', 'Dinner — Osso Buco + Wine', '180', 'earned'),
            rectangle('HD1', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
            transactionRow('March 8, 2026', 'Redeemed: Free Appetizer', '500', 'redeemed'),
            rectangle('HD2', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
            transactionRow('March 5, 2026', 'Lunch — Truffle Risotto', '95', 'earned'),
            rectangle('HD3', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
            transactionRow('Feb 28, 2026', 'Dinner for 4 — Chef\'s Table', '320', 'earned'),
            rectangle('HD4', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
            transactionRow('Feb 20, 2026', 'Birthday celebration', '210', 'earned'),
          ],
        }),
      ],
    }),
  ],
});
