/**
 * Neomorphism — Soft UI with subtle shadows simulated via layered fills.
 *
 * DSL features stressed: multiple fills, subtle strokes, cornerRadius,
 * soft color palette, nested padding, ellipse shapes.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const BG = '#e0e5ec';

function neoCard(title: string, desc: string, iconColor: string) {
  return frame(`NeoCard: ${title}`, {
    size: { x: 380, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    fills: [solid(BG)],
    cornerRadius: 24,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.5 }, weight: 2, align: 'INSIDE' }],
    children: [
      frame('IconWrapper', {
        size: { x: 56, y: 56 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(BG)],
        cornerRadius: 16,
        strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.6 }, weight: 2, align: 'INSIDE' }],
        children: [
          ellipse('Dot', {
            size: { x: 16, y: 16 },
            fills: [solid(iconColor)],
          }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 600, color: '#3a4a5c' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#7a8a9c',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

function neoButton(label: string, filled: boolean) {
  return frame(`Btn: ${label}`, {
    autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: filled ? [gradient([
      { hex: '#6c63ff', position: 0 },
      { hex: '#5a52e0', position: 1 },
    ], 135)] : [solid(BG)],
    cornerRadius: 12,
    strokes: filled ? [] : [{ color: { r: 1, g: 1, b: 1, a: 0.4 }, weight: 2, align: 'INSIDE' }],
    children: [
      text(label, {
        fontSize: 15,
        fontWeight: 600,
        color: filled ? '#ffffff' : '#3a4a5c',
      }),
    ],
  });
}

export default frame('NeomorphismPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48 }),
  fills: [solid(BG)],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 20, padY: 8 }),
          fills: [solid(BG)],
          cornerRadius: 999,
          strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.6 }, weight: 2, align: 'INSIDE' }],
          children: [
            text('SOFT UI', { fontSize: 12, fontWeight: 600, color: '#6c63ff', letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),
        text('Neomorphism', {
          fontSize: 64,
          fontWeight: 700,
          color: '#3a4a5c',
        }),
        text('Soft surfaces that feel tactile and real.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#7a8a9c',
          textAlignHorizontal: 'CENTER',
        }),
        frame('CTARow', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            neoButton('Get Started', true),
            neoButton('Learn More', false),
          ],
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        neoCard('Analytics', 'Track your metrics with intuitive dashboards.', '#6c63ff'),
        neoCard('Security', 'Enterprise-grade protection for your data.', '#22c55e'),
        neoCard('Speed', 'Blazing fast performance out of the box.', '#f59e0b'),
      ],
    }),

    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
