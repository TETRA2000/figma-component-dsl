/**
 * SaaS Pricing Page — 3-tier pricing with feature comparison
 * Batch 1, Page 2: Technology/SaaS
 * DSL Features: vertical/horizontal, gradient, FILL sizing, componentProperties
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSPricing', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  componentProperties: [
    { name: 'Headline', type: 'TEXT', defaultValue: 'Simple, transparent pricing' },
    { name: 'ShowAnnualToggle', type: 'BOOLEAN', defaultValue: true },
  ],
  children: [
    // ── Navbar ──
    navbar(),

    // ── Hero Header ──
    frame('PricingHero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 72, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#eef2ff', position: 0 },
          { hex: '#f5f3ff', position: 0.5 },
          { hex: '#ffffff', position: 1 },
        ], 270),
      ],
      children: [
        frame('PricingBadge', {
          autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ede9fe')],
          cornerRadius: 999,
          children: [
            text('Pricing', { fontSize: 13, fontWeight: 600, color: '#7c3aed' }),
          ],
        }),
        text('Simple, transparent pricing', {
          fontSize: 48,
          fontWeight: 700,
          color: '#111827',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 56, unit: 'PIXELS' },
        }),
        text('Choose the plan that fits your team. Upgrade or downgrade anytime.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#6b7280',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 28, unit: 'PIXELS' },
        }),
        // Billing toggle
        frame('BillingToggle', {
          autoLayout: horizontal({ spacing: 12, padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            text('Monthly', { fontSize: 14, fontWeight: 500, color: '#9ca3af' }),
            frame('ToggleTrack', {
              size: { x: 48, y: 26 },
              fills: [solid('#6366f1')],
              cornerRadius: 13,
              autoLayout: horizontal({ padX: 3, padY: 3, align: 'MAX', counterAlign: 'CENTER' }),
              children: [
                rectangle('ToggleKnob', {
                  size: { x: 20, y: 20 },
                  fills: [solid('#ffffff')],
                  cornerRadius: 10,
                }),
              ],
            }),
            text('Annual', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            frame('SaveBadge', {
              autoLayout: horizontal({ padX: 8, padY: 3, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ecfdf5')],
              cornerRadius: 999,
              children: [
                text('Save 20%', { fontSize: 12, fontWeight: 600, color: '#059669' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── Pricing Cards Row ──
    frame('PricingCards', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 48, align: 'CENTER', counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pricingCard('Free', '$0', '/month', 'Get started for free', [
          'Up to 3 projects',
          '1 team member',
          '1 GB storage',
          'Community support',
          'Basic analytics',
        ], false, 'Get started free', '#f9fafb'),
        pricingCard('Pro', '$29', '/month', 'For growing teams', [
          'Unlimited projects',
          'Up to 10 team members',
          '50 GB storage',
          'Priority support',
          'Advanced analytics',
          'Custom integrations',
          'API access',
        ], true, 'Start free trial', '#ffffff'),
        pricingCard('Enterprise', '$99', '/month', 'For large organizations', [
          'Unlimited everything',
          'Unlimited team members',
          '500 GB storage',
          'Dedicated support',
          'Custom analytics',
          'SSO & SAML',
          'SLA guarantee',
          'Audit logs',
        ], false, 'Contact sales', '#f9fafb'),
      ],
    }),

    // ── Feature Comparison Table ──
    frame('ComparisonSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f9fafb')],
      children: [
        text('Compare all features', {
          fontSize: 28,
          fontWeight: 700,
          color: '#111827',
          textAlignHorizontal: 'CENTER',
        }),
        frame('ComparisonTable', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            comparisonHeader(),
            comparisonRow('Projects', '3', 'Unlimited', 'Unlimited'),
            comparisonRow('Team members', '1', '10', 'Unlimited'),
            comparisonRow('Storage', '1 GB', '50 GB', '500 GB'),
            comparisonRow('API access', '—', '✓', '✓'),
            comparisonRow('SSO / SAML', '—', '—', '✓'),
            comparisonRow('Audit logs', '—', '—', '✓'),
            comparisonRow('SLA guarantee', '—', '—', '✓'),
          ],
        }),
      ],
    }),

    // ── FAQ Section ──
    frame('FAQ', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Frequently asked questions', {
          fontSize: 28,
          fontWeight: 700,
          color: '#111827',
        }),
        frame('FAQList', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 720, y: undefined },
          children: [
            faqItem('Can I switch plans at any time?', 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'),
            faqItem('Is there a free trial for Pro?', 'Yes, Pro comes with a 14-day free trial. No credit card required.'),
            faqItem('What payment methods do you accept?', 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'),
          ],
        }),
      ],
    }),

    // ── Footer ──
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('© 2026 Flowbase. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

// ── Helper: Navbar ──
function navbar() {
  return frame('Navbar', {
    autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text('Flowbase', { fontSize: 20, fontWeight: 700, color: '#1a1a2e' }),
      frame('NavSpacer', {
        layoutSizingHorizontal: 'FILL',
        size: { x: 1, y: 1 },
      }),
      frame('NavLinks', {
        autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
        children: [
          text('Features', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          text('Pricing', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
          text('Docs', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          frame('NavCTA', {
            autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#6366f1')],
            cornerRadius: 8,
            children: [
              text('Get Started', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── Helper: Pricing Card ──
function pricingCard(
  tier: string,
  price: string,
  period: string,
  subtitle: string,
  features: string[],
  highlighted: boolean,
  ctaLabel: string,
  bgColor: string,
) {
  return frame(`PricingCard: ${tier}`, {
    autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
    layoutSizingHorizontal: 'FILL',
    fills: highlighted
      ? [solid('#ffffff')]
      : [solid(bgColor)],
    cornerRadius: 16,
    strokes: highlighted
      ? [{ color: { r: 0.39, g: 0.4, b: 0.95, a: 1 }, weight: 2, align: 'INSIDE' }]
      : [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Tier header
      frame(`${tier}Header`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`${tier}TierRow`, {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(tier, { fontSize: 20, fontWeight: 600, color: '#111827' }),
              ...(highlighted
                ? [frame('PopularBadge', {
                    autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                    fills: [gradient([
                      { hex: '#6366f1', position: 0 },
                      { hex: '#8b5cf6', position: 1 },
                    ], 0)],
                    cornerRadius: 999,
                    children: [
                      text('Most Popular', { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
                    ],
                  })]
                : []),
            ],
          }),
          text(subtitle, { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      // Price
      frame(`${tier}Price`, {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(price, { fontSize: 48, fontWeight: 700, color: '#111827' }),
          text(period, { fontSize: 16, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      // Divider
      rectangle(`${tier}Divider`, {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),
      // Feature list
      frame(`${tier}Features`, {
        autoLayout: vertical({ spacing: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map((f) => featureRow(f)),
      }),
      // CTA button
      frame(`${tier}CTA`, {
        autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: highlighted
          ? [gradient([
              { hex: '#6366f1', position: 0 },
              { hex: '#8b5cf6', position: 1 },
            ], 0)]
          : [solid('#ffffff')],
        cornerRadius: 10,
        strokes: highlighted
          ? []
          : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(ctaLabel, {
            fontSize: 15,
            fontWeight: 600,
            color: highlighted ? '#ffffff' : '#374151',
          }),
        ],
      }),
    ],
  });
}

// ── Helper: Feature Row (checkmark + text) ──
function featureRow(label: string) {
  return frame(`Feature: ${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text('✓', { fontSize: 14, fontWeight: 700, color: '#22c55e' }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#374151' }),
    ],
  });
}

// ── Helper: Comparison Table Header ──
function comparisonHeader() {
  return frame('ComparisonHeader', {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#f9fafb')],
    cornerRadii: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 },
    children: [
      text('Feature', {
        fontSize: 13,
        fontWeight: 600,
        color: '#6b7280',
        layoutSizingHorizontal: 'FILL',
      }),
      text('Free', {
        fontSize: 13,
        fontWeight: 600,
        color: '#6b7280',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
      text('Pro', {
        fontSize: 13,
        fontWeight: 600,
        color: '#6366f1',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
      text('Enterprise', {
        fontSize: 13,
        fontWeight: 600,
        color: '#6b7280',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

// ── Helper: Comparison Row ──
function comparisonRow(feature: string, free: string, pro: string, enterprise: string) {
  return frame(`Row: ${feature}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(feature, {
        fontSize: 14,
        fontWeight: 400,
        color: '#374151',
        layoutSizingHorizontal: 'FILL',
      }),
      text(free, {
        fontSize: 14,
        fontWeight: 500,
        color: free === '—' ? '#d1d5db' : '#374151',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
      text(pro, {
        fontSize: 14,
        fontWeight: 500,
        color: pro === '✓' ? '#22c55e' : '#374151',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
      text(enterprise, {
        fontSize: 14,
        fontWeight: 500,
        color: enterprise === '✓' ? '#22c55e' : '#374151',
        size: { x: 160 },
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

// ── Helper: FAQ Item ──
function faqItem(question: string, answer: string) {
  return frame(`FAQ: ${question}`, {
    autoLayout: vertical({ spacing: 8, padX: 0, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(question, { fontSize: 16, fontWeight: 600, color: '#111827' }),
      text(answer, {
        fontSize: 14,
        fontWeight: 400,
        color: '#6b7280',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
    ],
  });
}
