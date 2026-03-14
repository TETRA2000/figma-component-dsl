/**
 * Vibrant Gradient — Bold multi-stop gradients, large type, colorful cards.
 *
 * DSL features stressed: multi-stop gradient(), radialGradient(), gradient 8-digit hex alpha,
 * large fontSize, cornerRadius, nested layouts.
 */
import {
  frame, text, rectangle,
  solid, gradient, radialGradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function gradientCard(title: string, desc: string, colors: { hex: string; position: number }[], angle: number) {
  return frame(`Card: ${title}`, {
    size: { x: 400, y: 280 },
    autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, align: 'MAX' }),
    fills: [gradient(colors, angle)],
    cornerRadius: 24,
    clipContent: true,
    children: [
      text(title, { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
      text(desc, {
        fontSize: 14,
        fontWeight: 400,
        color: '#ffffffCC',
        lineHeight: { value: 150, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('VibrantGradientPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 64 }),
  fills: [solid('#0f0f0f')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [radialGradient([
        { hex: '#4a1d96', position: 0 },
        { hex: '#0f0f0f', position: 1 },
      ], { center: { x: 0.5, y: 0.3 }, radius: 0.7 })],
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [gradient([
            { hex: '#f43f5e', position: 0 },
            { hex: '#8b5cf6', position: 1 },
          ], 90)],
          cornerRadius: 999,
          children: [
            text('NEW COLLECTION', { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        text('Colors That Move', {
          fontSize: 72,
          fontWeight: 800,
          color: '#ffffff',
        }),
        text('Gradients are not just backgrounds — they are emotions.', {
          fontSize: 20,
          fontWeight: 400,
          color: '#a5a5a5',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 24, padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        gradientCard('Sunrise', 'Warm tones that ignite creativity.', [
          { hex: '#f43f5e', position: 0 },
          { hex: '#fb923c', position: 0.5 },
          { hex: '#fbbf24', position: 1 },
        ], 135),
        gradientCard('Ocean', 'Cool blues that calm the mind.', [
          { hex: '#0ea5e9', position: 0 },
          { hex: '#6366f1', position: 0.5 },
          { hex: '#8b5cf6', position: 1 },
        ], 135),
        gradientCard('Aurora', 'Northern lights in pixel form.', [
          { hex: '#10b981', position: 0 },
          { hex: '#06b6d4', position: 0.5 },
          { hex: '#8b5cf6', position: 1 },
        ], 135),
      ],
    }),

    // Bottom spacer
    rectangle('Spacer', { size: { x: 1, y: 64 }, opacity: 0 }),
  ],
});
