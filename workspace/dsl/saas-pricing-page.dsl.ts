/**
 * SaaS Pricing — Three-tier pricing comparison
 *
 * DSL features stressed: equal-width FILL columns, vertical SPACE_BETWEEN,
 * gradient CTA buttons, strokes for deselected, per-corner radii on highlighted
 */
import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function featureRow(label: string, included: boolean) {
  return frame(`Feature: ${label}`, {
    autoLayout: horizontal({ spacing: 10, padY: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(included ? '\u2713' : '\u2717', {
        fontSize: 14, fontWeight: 600,
        color: included ? '#10b981' : '#d1d5db',
      }),
      text(label, {
        fontSize: 14, fontWeight: 400,
        color: included ? '#374151' : '#9ca3af',
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

function pricingTier(
  name: string, price: string, period: string,
  features: { label: string; included: boolean }[],
  highlighted: boolean,
  ctaLabel: string,
) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 24, padX: 28, padY: 32 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    ...(highlighted
      ? { strokes: [{ color: { r: 0.31, g: 0.27, b: 0.90, a: 1 }, weight: 2, align: 'INSIDE' }] }
      : { strokes: [{ color: { r: 0.90, g: 0.90, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' }] }
    ),
    children: [
      // Header
      frame(`${name}Header`, {
        autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ...(highlighted ? [
            frame('PopularBadge', {
              autoLayout: horizontal({ spacing: 0, padX: 12, padY: 4, align: 'CENTER' }),
              fills: [solid('#4f46e5')],
              cornerRadius: 9999,
              children: [
                text('Most Popular', { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ] : []),
          text(name, {
            fontSize: 18, fontWeight: 600, color: '#374151',
            textAlignHorizontal: 'CENTER',
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
            children: [
              text(price, { fontSize: 42, fontWeight: 700, color: '#111827' }),
              text(period, { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
        ],
      }),

      // Divider
      rectangle(`${name}Divider`, {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),

      // Features
      frame(`${name}Features`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map(f => featureRow(f.label, f.included)),
      }),

      // CTA
      frame(`${name}CTA`, {
        autoLayout: horizontal({ padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: highlighted
          ? [gradient([{ hex: '#4f46e5', position: 0 }, { hex: '#7c3aed', position: 1 }], 0)]
          : [solid('#f3f4f6')],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
        children: [
          text(ctaLabel, {
            fontSize: 15, fontWeight: 600,
            color: highlighted ? '#ffffff' : '#374151',
            textAlignHorizontal: 'CENTER',
          }),
        ],
      }),
    ],
  });
}

const starterFeatures = [
  { label: '5 projects', included: true },
  { label: '10GB storage', included: true },
  { label: 'Basic analytics', included: true },
  { label: 'Email support', included: true },
  { label: 'API access', included: false },
  { label: 'Custom domain', included: false },
];

const proFeatures = [
  { label: 'Unlimited projects', included: true },
  { label: '100GB storage', included: true },
  { label: 'Advanced analytics', included: true },
  { label: 'Priority support', included: true },
  { label: 'API access', included: true },
  { label: 'Custom domain', included: false },
];

const enterpriseFeatures = [
  { label: 'Unlimited everything', included: true },
  { label: '1TB storage', included: true },
  { label: 'Real-time analytics', included: true },
  { label: 'Dedicated support', included: true },
  { label: 'Full API access', included: true },
  { label: 'Custom domain + SSO', included: true },
];

export default frame('SaaSPricingPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0, padX: 120, padY: 64 }),
  fills: [solid('#f9fafb')],
  children: [
    // Header
    frame('PricingHeader', {
      autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Choose Your Plan', {
          fontSize: 36, fontWeight: 700, color: '#111827',
          textAlignHorizontal: 'CENTER',
        }),
        text('Start free, upgrade when you need to. All plans include a 14-day trial.', {
          fontSize: 16, fontWeight: 400, color: '#6b7280',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Toggle
    frame('Toggle', {
      autoLayout: horizontal({ spacing: 0, padY: 32, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ToggleSwitch', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid('#e5e7eb')],
          cornerRadius: 9999,
          children: [
            frame('MonthlyBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 8, align: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 9999,
              children: [
                text('Monthly', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
            frame('AnnualBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 8, align: 'CENTER' }),
              cornerRadius: 9999,
              children: [
                text('Annual', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Pricing cards
    frame('PricingCards', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pricingTier('Starter', '$9', '/month', starterFeatures, false, 'Get Started'),
        pricingTier('Pro', '$29', '/month', proFeatures, true, 'Start Free Trial'),
        pricingTier('Enterprise', '$99', '/month', enterpriseFeatures, false, 'Contact Sales'),
      ],
    }),
  ],
});
