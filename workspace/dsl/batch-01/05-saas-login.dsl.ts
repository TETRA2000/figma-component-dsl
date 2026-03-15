/**
 * SaaS Login Page — Centered card with social login
 * Batch 1, Page 5: Technology/SaaS
 * DSL Features: centered layout, cornerRadius, gradients
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSLogin', {
  size: { x: 1440, y: 900 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // ── Left Panel — Branding ──
    frame('BrandPanel', {
      autoLayout: vertical({ spacing: 32, padX: 48, padY: 48, align: 'MAX', counterAlign: 'MIN' }),
      size: { x: 560, y: undefined },
      layoutSizingVertical: 'FILL',
      fills: [
        gradient([
          { hex: '#4f46e5', position: 0 },
          { hex: '#6366f1', position: 0.4 },
          { hex: '#818cf8', position: 1 },
        ], 270),
      ],
      children: [
        // Logo at top
        frame('BrandLogo', {
          autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
          children: [
            frame('LogoIcon', {
              size: { x: 40, y: 40 },
              fills: [solid('#ffffff', 0.2)],
              cornerRadius: 10,
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('F', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
              ],
            }),
            text('Flowbase', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
          ],
        }),

        // Spacer
        frame('BrandSpacer', {
          layoutSizingHorizontal: 'FILL',
          layoutSizingVertical: 'FILL',
          size: { x: 1, y: 1 },
        }),

        // Testimonial
        frame('Testimonial', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 28 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff', 0.1)],
          cornerRadius: 16,
          children: [
            text('"Flowbase has transformed how our team collaborates. We shipped 3x faster in the first month."', {
              fontSize: 18,
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: { value: 28, unit: 'PIXELS' },
              size: { x: 400 },
              textAutoResize: 'HEIGHT',
            }),
            frame('TestimonialAuthor', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                rectangle('TestimonialAvatar', {
                  size: { x: 40, y: 40 },
                  fills: [solid('#ffffff', 0.3)],
                  cornerRadius: 20,
                }),
                frame('AuthorInfo', {
                  autoLayout: vertical({ spacing: 2 }),
                  children: [
                    text('Sarah Chen', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                    text('CTO at TechCorp', { fontSize: 13, fontWeight: 400, color: '#c7d2fe' }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Stats row
        frame('BrandStats', {
          autoLayout: horizontal({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            brandStat('10K+', 'Active users'),
            brandStat('99.9%', 'Uptime'),
            brandStat('4.9/5', 'Rating'),
          ],
        }),
      ],
    }),

    // ── Right Panel — Login Form ──
    frame('LoginPanel', {
      autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        frame('LoginCard', {
          autoLayout: vertical({ spacing: 28, padX: 40, padY: 40, counterAlign: 'CENTER' }),
          size: { x: 420, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 20,
          strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Header
            frame('LoginHeader', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Welcome back', {
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#111827',
                  textAlignHorizontal: 'CENTER',
                }),
                text('Sign in to your account to continue', {
                  fontSize: 15,
                  fontWeight: 400,
                  color: '#6b7280',
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),

            // Social login buttons
            frame('SocialLogins', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                socialButton('Google', 'G'),
                socialButton('GitHub', 'GH'),
                socialButton('Apple', 'A'),
              ],
            }),

            // OR divider
            frame('OrDivider', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('DivLeft', {
                  size: { x: 1, y: 1 },
                  fills: [solid('#e5e7eb')],
                  layoutSizingHorizontal: 'FILL',
                }),
                text('or', { fontSize: 13, fontWeight: 500, color: '#9ca3af' }),
                rectangle('DivRight', {
                  size: { x: 1, y: 1 },
                  fills: [solid('#e5e7eb')],
                  layoutSizingHorizontal: 'FILL',
                }),
              ],
            }),

            // Email field
            frame('EmailField', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Email address', { fontSize: 14, fontWeight: 500, color: '#374151' }),
                frame('EmailInput', {
                  autoLayout: horizontal({ padX: 14, padY: 12, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#ffffff')],
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.85, g: 0.87, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('you@example.com', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
                  ],
                }),
              ],
            }),

            // Password field
            frame('PasswordField', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('PasswordLabel', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Password', {
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#374151',
                      layoutSizingHorizontal: 'FILL',
                    }),
                    text('Forgot password?', {
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#6366f1',
                      textDecoration: 'UNDERLINE',
                    }),
                  ],
                }),
                frame('PasswordInput', {
                  autoLayout: horizontal({ padX: 14, padY: 12, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#ffffff')],
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.85, g: 0.87, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('••••••••', { fontSize: 14, fontWeight: 400, color: '#374151' }),
                  ],
                }),
              ],
            }),

            // Remember me
            frame('RememberRow', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Checkbox', {
                  size: { x: 18, y: 18 },
                  fills: [solid('#6366f1')],
                  cornerRadius: 4,
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  children: [
                    text('✓', { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                text('Remember me for 30 days', { fontSize: 13, fontWeight: 400, color: '#4b5563' }),
              ],
            }),

            // Sign in button
            frame('SignInBtn', {
              autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [gradient([
                { hex: '#4f46e5', position: 0 },
                { hex: '#6366f1', position: 1 },
              ], 0)],
              cornerRadius: 10,
              children: [
                text('Sign in', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),

            // Sign up link
            frame('SignUpLink', {
              autoLayout: horizontal({ spacing: 4, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Don\'t have an account?', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
                text('Sign up', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
              ],
            }),
          ],
        }),

        // Footer text
        frame('LoginFooter', {
          autoLayout: horizontal({ spacing: 16, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            text('Privacy Policy', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            text('Terms of Service', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            text('Contact Support', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
  ],
});

// ── Helper: Social Login Button ──
function socialButton(provider: string, icon: string) {
  return frame(`Social: ${provider}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'CENTER', counterAlign: 'CENTER', spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.88, g: 0.9, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame(`${provider}Icon`, {
        size: { x: 20, y: 20 },
        fills: [solid('#374151')],
        cornerRadius: 4,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          text(icon, { fontSize: 10, fontWeight: 700, color: '#ffffff' }),
        ],
      }),
      text(provider, { fontSize: 13, fontWeight: 500, color: '#374151' }),
    ],
  });
}

// ── Helper: Brand Stat ──
function brandStat(value: string, label: string) {
  return frame(`Stat: ${value}`, {
    autoLayout: vertical({ spacing: 4 }),
    children: [
      text(value, { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
      text(label, { fontSize: 13, fontWeight: 400, color: '#c7d2fe' }),
    ],
  });
}
