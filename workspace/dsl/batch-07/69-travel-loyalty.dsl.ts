/**
 * Loyalty Program — Miles/points balance, tier badge, expiry, redemption, partner airlines
 * Batch 7, Page 9: Travel loyalty program dashboard
 * DSL Features: gradient fills, nested layouts, FILL sizing, clipContent
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelLoyalty', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Rewards', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
            text('Book', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            frame('ProfileBtn', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                rectangle('ProfileAvatar', {
                  size: { x: 32, y: 32 },
                  fills: [gradient([
                    { hex: '#ea580c', position: 0 },
                    { hex: '#0369a1', position: 1 },
                  ], 135)],
                  cornerRadius: 16,
                }),
                text('Alex M.', { fontSize: 14, fontWeight: 500, color: '#1e293b' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Hero Card — Points Balance
    frame('BalanceHero', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BalanceCard', {
          autoLayout: horizontal({ spacing: 0, padX: 40, padY: 40 }),
          layoutSizingHorizontal: 'FILL',
          fills: [gradient([
            { hex: '#0c4a6e', position: 0 },
            { hex: '#0369a1', position: 0.5 },
            { hex: '#0284c7', position: 1 },
          ], 135)],
          cornerRadius: 24,
          clipContent: true,
          children: [
            // Left: Balance info
            frame('BalanceInfo', {
              autoLayout: vertical({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('TierBadge', {
                  autoLayout: horizontal({ padX: 14, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff', 0.2)],
                  cornerRadius: 999,
                  children: [
                    text('★', { fontSize: 14, fontWeight: 600, color: '#fbbf24' }),
                    text('Gold Member', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
                frame('PointsDisplay', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Available Miles', { fontSize: 14, fontWeight: 400, color: '#ffffffaa' }),
                    text('124,850', { fontSize: 52, fontWeight: 700, color: '#ffffff' }),
                    text('miles', { fontSize: 16, fontWeight: 400, color: '#ffffffcc' }),
                  ],
                }),
                frame('BalanceActions', {
                  autoLayout: horizontal({ spacing: 12 }),
                  children: [
                    frame('EarnMoreBtn', {
                      autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#ffffff')],
                      cornerRadius: 8,
                      children: [
                        text('Earn More', { fontSize: 14, fontWeight: 600, color: '#0369a1' }),
                      ],
                    }),
                    frame('RedeemBtn', {
                      autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      cornerRadius: 8,
                      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.4 }, weight: 1, align: 'INSIDE' }],
                      children: [
                        text('Redeem', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // Right: Tier progress
            frame('TierProgress', {
              autoLayout: vertical({ spacing: 16, padX: 32 }),
              size: { x: 280, y: undefined },
              children: [
                text('Tier Progress', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                frame('TierBar', {
                  autoLayout: vertical({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('ProgressTrack', {
                      size: { x: 220, y: 8 },
                      fills: [solid('#ffffff', 0.2)],
                      cornerRadius: 4,
                      clipContent: true,
                      autoLayout: horizontal({ spacing: 0 }),
                      children: [
                        rectangle('ProgressFill', {
                          size: { x: 154, y: 8 },
                          fills: [solid('#fbbf24')],
                        }),
                      ],
                    }),
                    text('70% to Platinum', { fontSize: 12, fontWeight: 400, color: '#ffffffaa' }),
                  ],
                }),
                frame('TierLabels', {
                  autoLayout: vertical({ spacing: 8 }),
                  children: [
                    tierLabel('Silver', '25,000 miles', true),
                    tierLabel('Gold', '75,000 miles', true),
                    tierLabel('Platinum', '150,000 miles', false),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Expiry Warning
    frame('ExpirySection', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ExpiryBanner', {
          autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#fff7ed')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.35, b: 0.05, a: 0.3 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('⚠', { fontSize: 18, fontWeight: 400, color: '#ea580c' }),
            text('8,500 miles expiring on April 30, 2026', { fontSize: 14, fontWeight: 500, color: '#9a3412', layoutSizingHorizontal: 'FILL' }),
            frame('UseNowBtn', {
              autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ea580c')],
              cornerRadius: 6,
              children: [
                text('Use Now', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Redemption Options
    frame('Redemption', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Redemption Options', { fontSize: 22, fontWeight: 700, color: '#1e293b' }),
        frame('RedeemGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            redeemCard('Flight Upgrade', 'Upgrade to Business Class', '35,000 miles', '#0369a1'),
            redeemCard('Free Hotel Night', '4-star hotel, 1 night', '25,000 miles', '#7c3aed'),
            redeemCard('Lounge Access', 'Airport lounge day pass', '5,000 miles', '#ea580c'),
            redeemCard('Gift Card', '$50 travel credit', '8,000 miles', '#16a34a'),
          ],
        }),
      ],
    }),

    // Partner Airlines
    frame('Partners', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        frame('PartnersHeader', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Partner Airlines', { fontSize: 22, fontWeight: 700, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
            text('View all partners', { fontSize: 14, fontWeight: 500, color: '#0369a1' }),
          ],
        }),
        frame('PartnerGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            partnerCard('SkyWay Airlines', 'Earn 2x miles'),
            partnerCard('Atlantic Air', 'Earn 1.5x miles'),
            partnerCard('EuroConnect', 'Earn 1x miles'),
            partnerCard('Pacific Wings', 'Earn 1.5x miles'),
            partnerCard('Global Express', 'Earn 2x miles'),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('© 2026 Wanderly Rewards. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

function tierLabel(name: string, threshold: string, achieved: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      text(achieved ? '✓' : '○', { fontSize: 14, fontWeight: 600, color: achieved ? '#fbbf24' : '#ffffff55' }),
      text(name, { fontSize: 13, fontWeight: achieved ? 600 : 400, color: achieved ? '#ffffff' : '#ffffffaa' }),
      text(threshold, { fontSize: 12, fontWeight: 400, color: '#ffffff66' }),
    ],
  });
}

function redeemCard(title: string, description: string, cost: string, accentColor: string) {
  return frame(`Redeem: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('RedeemIcon', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 44, y: 44 },
        fills: [solid(accentColor + '18')],
        cornerRadius: 12,
        children: [
          text('✈', { fontSize: 20, fontWeight: 400, color: accentColor }),
        ],
      }),
      text(title, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
      text(description, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
      rectangle('RedeemDivider', {
        size: { x: 1, y: 1 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#f1f5f9')],
      }),
      frame('RedeemCost', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(cost, { fontSize: 14, fontWeight: 600, color: accentColor, layoutSizingHorizontal: 'FILL' }),
          frame('RedeemActionBtn', {
            autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(accentColor)],
            cornerRadius: 6,
            children: [
              text('Redeem', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function partnerCard(name: string, benefit: string) {
  return frame(`Partner: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#f8fafc')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('AirlineLogo', {
        size: { x: 48, y: 48 },
        fills: [solid('#e2e8f0')],
        cornerRadius: 8,
      }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(benefit, { fontSize: 12, fontWeight: 400, color: '#0369a1', textAlignHorizontal: 'CENTER' }),
    ],
  });
}
