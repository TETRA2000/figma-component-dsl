/**
 * Glassmorphism Design — frosted glass, translucent layers, gradient backgrounds.
 *
 * DSL features stressed: gradient fills, solid with opacity, cornerRadius,
 * strokes with alpha, nested auto-layout, counterAlign CENTER.
 */
import {
  frame, text, rectangle,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function glassFeatureCard(icon: string, title: string, desc: string) {
  return frame(`Feature: ${title}`, {
    size: { x: 300, y: undefined },
    autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
    fills: [solid('#ffffff', 0.1)],
    cornerRadius: 20,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('IconBg', {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ffffff', 0.2)],
        cornerRadius: 12,
        children: [
          text(icon, { fontSize: 20, fontWeight: 400, color: '#ffffff' }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 600, color: '#ffffff' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#ffffffB3',
        lineHeight: { value: 150, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('GlassmorphismPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [gradient([
    { hex: '#667eea', position: 0 },
    { hex: '#764ba2', position: 1 },
  ], 135)],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: horizontal({ padX: 80, padY: 80, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('GlassPanel', {
          size: { x: 600, y: undefined },
          autoLayout: vertical({ spacing: 20, padX: 48, padY: 48 }),
          fills: [solid('#ffffff', 0.15)],
          cornerRadius: 24,
          strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.3 }, weight: 1, align: 'INSIDE' }],
          children: [
            frame('Badge', {
              autoLayout: horizontal({ padX: 16, padY: 6 }),
              fills: [solid('#ffffff', 0.2)],
              cornerRadius: 999,
              children: [
                text('GLASS UI', {
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: { value: 1, unit: 'PIXELS' },
                }),
              ],
            }),
            text('The Future of Design', {
              fontSize: 48,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: { value: 110, unit: 'PERCENT' },
            }),
            text('Transparent, layered, and beautiful.', {
              fontSize: 18,
              fontWeight: 400,
              color: '#ffffffCC',
            }),
            frame('CTA', {
              autoLayout: horizontal({ padX: 32, padY: 14 }),
              fills: [solid('#ffffff', 0.25)],
              cornerRadius: 12,
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.4 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Get Started', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Feature Cards
    frame('Features', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        glassFeatureCard('◆', 'Transparency', 'Layers that breathe. See through to what matters.'),
        glassFeatureCard('●', 'Depth', 'Cards that float above the surface with grace.'),
        glassFeatureCard('■', 'Light', 'Borders that catch light like frosted glass.'),
        glassFeatureCard('▲', 'Motion', 'Subtle shifts that respond to your gaze.'),
      ],
    }),

    // Bottom spacer
    rectangle('Spacer', { size: { x: 1, y: 80 }, opacity: 0 }),
  ],
});
