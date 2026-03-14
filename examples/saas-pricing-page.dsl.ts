import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const indigo = '#4f46e5';
const violet = '#7c3aed';
const gray = '#6b7280';
const darkGray = '#374151';
const white = '#ffffff';
const bgGray = '#f9fafb';
const border = '#e5e7eb';
const greenCheck = '#10b981';

// Feature check row
function featureRow(feature: string, included: boolean) {
  return frame(`Feature: ${feature}`, {
    autoLayout: horizontal({ spacing: 10, padX: 0, padY: 6, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Check', {
        size: { x: 18, y: 18 },
        fills: [solid(included ? greenCheck : '#d1d5db')],
      }),
      text(feature, {
        fontSize: 14,
        fontWeight: 400,
        color: included ? darkGray : gray,
        opacity: included ? 1 : 0.6,
      }),
    ],
  });
}

// Pricing tier card
function pricingTier(name: string, price: string, period: string, features: [string, boolean][], isPopular: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 24, padX: 28, padY: 32 }),
    fills: [solid(white)],
    cornerRadius: isPopular ? 20 : 16,
    strokes: isPopular
      ? [{ color: { r: 0.31, g: 0.27, b: 0.9, a: 1 }, weight: 2, align: 'INSIDE' as const }]
      : [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    size: { x: 1, y: 520 },
    children: [
      // Header
      frame('TierHeader', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(name, { fontSize: 18, fontWeight: 600, color: darkGray }),
              ...(isPopular ? [
                frame('PopularBadge', {
                  autoLayout: horizontal({ padX: 10, padY: 3 }),
                  fills: [solid(indigo)],
                  cornerRadius: 9999,
                  children: [
                    text('Popular', { fontSize: 11, fontWeight: 600, color: white }),
                  ],
                }),
              ] : []),
            ],
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
            children: [
              text(price, { fontSize: 42, fontWeight: 700, color: darkGray }),
              text(period, { fontSize: 14, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),

      // Features
      frame('Features', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FILL',
        children: features.map(([f, inc]) => featureRow(f, inc)),
      }),

      // CTA button
      frame('CTAButton', {
        autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: isPopular
          ? [gradient([{ hex: indigo, position: 0 }, { hex: violet, position: 1 }], 135)]
          : [],
        strokes: isPopular
          ? []
          : [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        cornerRadius: 10,
        children: [
          text('Get Started', { fontSize: 15, fontWeight: 600, color: isPopular ? white : indigo }),
        ],
      }),
    ],
  });
}

// Toggle switch
const toggleSwitch = frame('ToggleSwitch', {
  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
  children: [
    text('Monthly', { fontSize: 14, fontWeight: 500, color: darkGray }),
    frame('Toggle', {
      size: { x: 48, y: 26 },
      fills: [solid(indigo)],
      cornerRadius: 13,
      autoLayout: horizontal({ spacing: 0, padX: 3, padY: 3, align: 'MAX' }),
      children: [
        ellipse('Knob', { size: { x: 20, y: 20 }, fills: [solid(white)] }),
      ],
    }),
    text('Annual', { fontSize: 14, fontWeight: 600, color: indigo }),
    frame('SaveBadge', {
      autoLayout: horizontal({ padX: 8, padY: 3 }),
      fills: [solid('#ecfdf5')],
      cornerRadius: 9999,
      children: [
        text('Save 20%', { fontSize: 12, fontWeight: 600, color: greenCheck }),
      ],
    }),
  ],
});

export default frame('SaaSPricing', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid(bgGray)],
  children: [
    // Header
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeaderBadge', {
          autoLayout: horizontal({ padX: 14, padY: 5 }),
          fills: [solid('#eef2ff')],
          cornerRadius: 9999,
          children: [
            text('Pricing', { fontSize: 13, fontWeight: 600, color: indigo }),
          ],
        }),
        text('Simple, transparent pricing', {
          fontSize: 40,
          fontWeight: 700,
          color: darkGray,
          textAlignHorizontal: 'CENTER' as const,
          letterSpacing: { value: -1, unit: 'PIXELS' as const },
        }),
        text('Choose the plan that works best for your team. All plans include a 14-day free trial.', {
          fontSize: 16,
          fontWeight: 400,
          color: gray,
          textAlignHorizontal: 'CENTER' as const,
          lineHeight: { value: 150, unit: 'PERCENT' as const },
        }),
        toggleSwitch,
      ],
    }),

    // Pricing tiers
    frame('PricingTiers', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pricingTier('Starter', '$19', '/month', [
          ['5 team members', true],
          ['10GB storage', true],
          ['Basic analytics', true],
          ['Email support', true],
          ['Custom integrations', false],
          ['Advanced security', false],
          ['Priority support', false],
        ], false),
        pricingTier('Professional', '$49', '/month', [
          ['25 team members', true],
          ['100GB storage', true],
          ['Advanced analytics', true],
          ['Priority email support', true],
          ['Custom integrations', true],
          ['Advanced security', true],
          ['Priority support', false],
        ], true),
        pricingTier('Enterprise', '$99', '/month', [
          ['Unlimited members', true],
          ['Unlimited storage', true],
          ['Custom analytics', true],
          ['24/7 phone support', true],
          ['Custom integrations', true],
          ['Advanced security', true],
          ['Dedicated manager', true],
        ], false),
      ],
    }),
  ],
});
