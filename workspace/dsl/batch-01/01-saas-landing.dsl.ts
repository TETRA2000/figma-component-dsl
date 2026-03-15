/**
 * SaaS Landing Page — Hero + Features + CTA
 * Batch 1, Page 1: Technology/SaaS baseline (strict validation)
 * DSL Features: vertical/horizontal layout, gradients, text styles, cornerRadius
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSLanding', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
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
            text('Pricing', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Docs', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            frame('CTABtn', {
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
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#eef2ff', position: 0 },
          { hex: '#ffffff', position: 1 },
        ], 180),
      ],
      children: [
        frame('Badge', {
          autoLayout: horizontal({ padX: 16, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#eef2ff')],
          cornerRadius: 20,
          strokes: [{ color: { r: 0.79, g: 0.82, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('New: AI-powered analytics', { fontSize: 13, fontWeight: 500, color: '#4f46e5' }),
          ],
        }),
        text('Build faster with\nmodern tools', {
          fontSize: 64,
          fontWeight: 700,
          color: '#1a1a2e',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 72, unit: 'PIXELS' },
        }),
        text('Ship products 10x faster with our all-in-one platform.\nNo complex setup, no vendor lock-in.', {
          fontSize: 20,
          fontWeight: 400,
          color: '#64748b',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 30, unit: 'PIXELS' },
        }),
        frame('HeroCTAs', {
          autoLayout: horizontal({ spacing: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          children: [
            frame('PrimaryCTA', {
              autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#6366f1')],
              cornerRadius: 10,
              children: [
                text('Start free trial', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('SecondaryCTA', {
              autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('View demo', { fontSize: 16, fontWeight: 600, color: '#374151' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Features Grid
    frame('Features', {
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Everything you need', {
          fontSize: 36,
          fontWeight: 700,
          color: '#1a1a2e',
          textAlignHorizontal: 'CENTER',
        }),
        frame('FeatureGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            featureCard('Lightning Fast', 'Built on edge infrastructure for sub-100ms responses globally.', '#ede9fe'),
            featureCard('Secure by Default', 'End-to-end encryption with SOC 2 Type II compliance.', '#e0f2fe'),
            featureCard('Scale Infinitely', 'Auto-scaling from 0 to millions of requests per second.', '#ecfdf5'),
          ],
        }),
      ],
    }),

    // Footer
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

function featureCard(title: string, description: string, bgColor: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('IconBg', {
        autoLayout: horizontal({ padX: 12, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(bgColor)],
        cornerRadius: 10,
        size: { x: 48, y: 48 },
        children: [
          text('★', { fontSize: 20, fontWeight: 600, color: '#6366f1' }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: '#64748b',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
    ],
  });
}
