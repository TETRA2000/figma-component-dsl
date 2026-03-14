/**
 * SaaS Pricing showcase page — DSL equivalent of SaaSPricingShowcase.tsx
 *
 * Stresses: equal-width FILL columns, vertical auto-layout with SPACE_BETWEEN,
 * gradient CTA buttons, strokes for deselected state, per-corner radii
 */
import {
  frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helpers ---

function featureRow(feature: string, highlighted: boolean) {
  return frame(`Feature-${feature}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    children: [
      text('\u2713', {
        fontSize: 14,
        fontWeight: 700,
        color: highlighted ? '#a5b4fc' : '#4f46e5',
      }),
      text(feature, {
        fontSize: 14,
        fontWeight: 500,
        color: highlighted ? '#ffffffee' : '#374151',
      }),
    ],
  });
}

function pricingTier(
  name: string,
  price: string,
  features: string[],
  ctaLabel: string,
  highlighted: boolean,
) {
  const featureNodes = features.map(f => featureRow(f, highlighted));

  return frame(`Tier-${name}`, {
    size: { x: 320, y: 480 },
    autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
    fills: [highlighted ? solid('#4f46e5') : solid('#ffffff')],
    cornerRadius: 16,
    strokes: highlighted
      ? [{ color: { r: 0.486, g: 0.228, b: 0.929, a: 1 }, weight: 2, align: 'INSIDE' as const }]
      : [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Header: name + price
      frame(`Header-${name}`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, {
            fontSize: 18,
            fontWeight: 600,
            color: highlighted ? '#ffffffcc' : '#6b7280',
          }),
          frame(`PriceRow-${name}`, {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
            children: [
              text(price, {
                fontSize: 48,
                fontWeight: 700,
                color: highlighted ? '#ffffff' : '#111827',
                lineHeight: { value: 100, unit: 'PERCENT' },
              }),
              text('/mo', {
                fontSize: 16,
                fontWeight: 500,
                color: highlighted ? '#ffffff99' : '#6b7280',
              }),
            ],
          }),
        ],
      }),

      // Features list
      frame(`Features-${name}`, {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FILL',
        children: featureNodes,
      }),

      // CTA Button
      frame(`CTA-${name}`, {
        autoLayout: horizontal({ counterAlign: 'CENTER', align: 'CENTER', padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        cornerRadius: 12,
        fills: highlighted
          ? [gradient([
              { hex: '#7c3aed', position: 0 },
              { hex: '#a78bfa', position: 1 },
            ], 135)]
          : [solid('#f3f4f6')],
        children: [
          text(ctaLabel, {
            fontSize: 16,
            fontWeight: 600,
            color: highlighted ? '#ffffff' : '#4f46e5',
            textAlignHorizontal: 'CENTER',
          }),
        ],
      }),
    ],
  });
}

// --- Page ---

export default frame('SaaSPricingPage', {
  size: { x: 1440, y: 800 },
  fills: [solid('#f9fafb')],
  autoLayout: vertical({ spacing: 0, padX: 170, padY: 64, counterAlign: 'CENTER' }),
  children: [
    // Title
    text('Simple, transparent pricing', {
      fontSize: 40,
      fontWeight: 700,
      color: '#111827',
      textAlignHorizontal: 'CENTER',
    }),

    frame('Spacer1', { size: { x: 1, y: 12 } }),

    text('Choose the plan that fits your needs', {
      fontSize: 18,
      fontWeight: 400,
      color: '#6b7280',
      textAlignHorizontal: 'CENTER',
    }),

    frame('Spacer2', { size: { x: 1, y: 48 } }),

    // Pricing cards row
    frame('PricingCards', {
      autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
      children: [
        pricingTier('Starter', '$9', [
          '5 projects', '10 GB storage', 'Basic analytics', 'Email support',
        ], 'Get Started', false),
        pricingTier('Pro', '$29', [
          'Unlimited projects', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom domain',
        ], 'Upgrade to Pro', true),
        pricingTier('Enterprise', '$99', [
          'Everything in Pro', 'Unlimited storage', 'Dedicated manager', 'SLA guarantee', '24/7 phone support',
        ], 'Contact Sales', false),
      ],
    }),
  ],
});
