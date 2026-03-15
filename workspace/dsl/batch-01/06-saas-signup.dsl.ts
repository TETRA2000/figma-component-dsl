/**
 * SaaS Signup Page — Split layout with brand + form
 * Batch 1, Page 6: Technology/SaaS
 * DSL Features: horizontal split, gradient, form fields, checkbox
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSSignup', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Left side — Brand panel with gradient
    frame('BrandPanel', {
      size: { x: 720, y: 900 },
      autoLayout: vertical({ spacing: 32, padX: 64, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [
        gradient([
          { hex: '#4f46e5', position: 0 },
          { hex: '#7c3aed', position: 0.5 },
          { hex: '#6366f1', position: 1 },
        ], 270),
      ],
      children: [
        // Logo
        text('Flowbase', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),

        // Illustration placeholder
        rectangle('IllustrationPlaceholder', {
          size: { x: 400, y: 300 },
          fills: [solid('#ffffff', 0.1)],
          cornerRadius: 16,
        }),

        // Tagline
        text('Build faster.\nShip smarter.', {
          fontSize: 40,
          fontWeight: 700,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 48, unit: 'PIXELS' },
        }),
        text('Join 10,000+ developers who trust Flowbase\nto power their products.', {
          fontSize: 16,
          fontWeight: 400,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 24, unit: 'PIXELS' },
          opacity: 0.8,
        }),
      ],
    }),

    // Right side — Signup form
    frame('FormPanel', {
      size: { x: 720, y: 900 },
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      children: [
        frame('FormContent', {
          autoLayout: vertical({ spacing: 32, counterAlign: 'CENTER' }),
          size: { x: 400, y: undefined },
          children: [
            // Header
            frame('FormHeader', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Create your account', { fontSize: 28, fontWeight: 700, color: '#1a1a2e' }),
                text('Start your 14-day free trial', { fontSize: 16, fontWeight: 400, color: '#64748b' }),
              ],
            }),

            // Form fields
            frame('FormFields', {
              autoLayout: vertical({ spacing: 20 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                formField('Full Name', 'Enter your full name'),
                formField('Email', 'you@company.com'),
                formField('Password', 'Create a password'),
              ],
            }),

            // Terms checkbox
            frame('TermsRow', {
              autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Checkbox', {
                  size: { x: 20, y: 20 },
                  fills: [solid('#ffffff')],
                  cornerRadius: 4,
                  strokes: [{ color: { r: 0.82, g: 0.84, b: 0.88, a: 1 }, weight: 1.5, align: 'INSIDE' }],
                }),
                text('I agree to the Terms of Service and Privacy Policy', {
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#64748b',
                  lineHeight: { value: 20, unit: 'PIXELS' },
                }),
              ],
            }),

            // CTA Button
            frame('CreateAccountBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#6366f1')],
              cornerRadius: 10,
              children: [
                text('Create account', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),

            // Divider with text
            frame('DividerRow', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('DivLeft', {
                  size: { x: 140, y: 1 },
                  fills: [solid('#e5e7eb')],
                }),
                text('or', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
                rectangle('DivRight', {
                  size: { x: 140, y: 1 },
                  fills: [solid('#e5e7eb')],
                }),
              ],
            }),

            // Social signup
            frame('GoogleBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Continue with Google', { fontSize: 16, fontWeight: 500, color: '#374151' }),
              ],
            }),

            // Sign in link
            frame('SignInLink', {
              autoLayout: horizontal({ spacing: 4, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Already have an account?', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                text('Sign in', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: '#374151' }),
      frame(`Input: ${label}`, {
        autoLayout: horizontal({ padX: 14, padY: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        strokes: [{ color: { r: 0.82, g: 0.84, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}
