/**
 * Pricing card — a SaaS-style pricing tier with feature list.
 *
 * Demonstrates:
 *  - Deep nesting with multiple layout levels
 *  - gradient() with angle rotation
 *  - Helper functions for repeated structures (feature rows)
 *  - Mixed sizing modes (FIXED width, HUG height)
 *  - rectangle() as a visual divider
 *  - opacity for de-emphasized elements
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function featureRow(label: string, included: boolean) {
  return frame(`Feature: ${label}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    opacity: included ? 1 : 0.4,
    children: [
      text(included ? '✓' : '—', {
        fontSize: 14,
        fontWeight: 600,
        color: included ? '#10b981' : '#9ca3af',
      }),
      text(label, {
        fontSize: 14,
        fontWeight: 400,
        color: '#374151',
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

function divider() {
  return rectangle('Divider', {
    size: { x: 1, y: 1 },
    fills: [solid('#e5e7eb')],
    layoutSizingHorizontal: 'FILL',
  });
}

export default component('PricingCard', {
  size: { x: 340, y: undefined },
  autoLayout: vertical({
    spacing: 0,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid('#ffffff')],
  cornerRadius: 16,
  strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'OUTSIDE' }],
  componentProperties: [
    { name: 'Tier', type: 'TEXT', defaultValue: 'Pro' },
    { name: 'Price', type: 'TEXT', defaultValue: '$29' },
    { name: 'Highlighted', type: 'BOOLEAN', defaultValue: true },
  ],
  children: [
    // Header with gradient
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 24, padY: 24, align: 'CENTER' }),
      fills: [
        gradient([
          { hex: '#7c3aed', position: 0 },
          { hex: '#6d28d9', position: 0.5 },
          { hex: '#4f46e5', position: 1 },
        ], 135),
      ],
      cornerRadii: { topLeft: 16, topRight: 16, bottomLeft: 0, bottomRight: 0 },
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Pro', {
          fontSize: 14,
          fontWeight: 600,
          color: '#c4b5fd',
          letterSpacing: { value: 5, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        text('$29', {
          fontSize: 48,
          fontWeight: 700,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
        text('/month', {
          fontSize: 14,
          fontWeight: 400,
          color: '#c4b5fd',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Features
    frame('Features', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        featureRow('Unlimited projects', true),
        featureRow('Priority support', true),
        featureRow('Custom domains', true),
        featureRow('Analytics dashboard', true),
        divider(),
        featureRow('SSO integration', false),
        featureRow('Dedicated account manager', false),
      ],
    }),

    // CTA
    frame('CTA', {
      autoLayout: vertical({ spacing: 0, padX: 24, padBottom: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Button', {
          autoLayout: horizontal({
            spacing: 0,
            padY: 14,
            align: 'CENTER',
            counterAlign: 'CENTER',
          }),
          fills: [solid('#7c3aed')],
          cornerRadius: 10,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Start free trial', {
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
            }),
          ],
        }),
      ],
    }),
  ],
});
