/**
 * Creative Portfolio — Grid with project thumbnails, hover overlays, category filter
 * Batch 10, Page 91: Creative/Portfolio baseline
 * DSL Features: gradients, cornerRadius, opacity, layoutSizingHorizontal, clipContent
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// Bold creative palette
const purple = '#7c3aed';
const pink = '#ec4899';
const cyan = '#06b6d4';
const dark = '#0f0f0f';
const white = '#ffffff';
const muted = '#a1a1aa';

export default component('CreativePortfolio', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0f0f0f')],
      children: [
        text('STUDIO', { fontSize: 22, fontWeight: 800, color: white, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            text('Work', { fontSize: 14, fontWeight: 500, color: white }),
            text('About', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Services', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 100, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#0f0f0f', position: 0 },
          { hex: '#1a0a2e', position: 0.5 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        text('Creative Portfolio', {
          fontSize: 72,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          letterSpacing: { value: -2, unit: 'PIXELS' },
          lineHeight: { value: 80, unit: 'PIXELS' },
        }),
        text('Selected works from branding, web design, and digital experiences', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Category Filter
    frame('CategoryFilter', {
      autoLayout: horizontal({ spacing: 12, padX: 80, padY: 32, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterPill('All', true),
        filterPill('Branding', false),
        filterPill('Web Design', false),
        filterPill('UI/UX', false),
        filterPill('Motion', false),
      ],
    }),

    // Portfolio Grid
    frame('PortfolioGrid', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Row 1: 2 large
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            projectThumb('Brand Refresh', 'Branding', purple, pink),
            projectThumb('Web Platform', 'Web Design', cyan, purple),
          ],
        }),
        // Row 2: 3 medium
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            projectThumb('Mobile App', 'UI/UX', pink, '#f97316'),
            projectThumb('Motion Reel', 'Motion', '#06b6d4', '#3b82f6'),
            projectThumb('Packaging', 'Branding', '#8b5cf6', '#ec4899'),
          ],
        }),
        // Row 3: 2 large
        frame('Row3', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            projectThumb('Dashboard UI', 'UI/UX', '#3b82f6', cyan),
            projectThumb('Campaign', 'Branding', '#f97316', pink),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 40, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('© 2026 Studio. All rights reserved.', { fontSize: 14, fontWeight: 400, color: muted }),
        frame('SocialLinks', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Twitter', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Dribbble', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Behance', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),
  ],
});

function filterPill(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid(purple)] : [],
    cornerRadius: 999,
    strokes: active ? [] : [{ color: { r: 0.4, g: 0.4, b: 0.4, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: active ? white : muted }),
    ],
  });
}

function projectThumb(title: string, category: string, color1: string, color2: string) {
  return frame(`Project: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 16,
    clipContent: true,
    children: [
      // Thumbnail with gradient fill
      frame('Thumbnail', {
        size: { x: 100, y: 280 },
        layoutSizingHorizontal: 'FILL',
        fills: [
          gradient([
            { hex: color1, position: 0 },
            { hex: color2, position: 1 },
          ], 135),
        ],
        autoLayout: vertical({ spacing: 4, padX: 24, padY: 24, align: 'MAX' }),
        children: [
          // Hover overlay hint
          rectangle('OverlayHint', {
            size: { x: 40, y: 40 },
            fills: [solid('#ffffff', 0.15)],
            cornerRadius: 20,
          }),
        ],
      }),
      // Info
      frame('Info', {
        autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#1a1a1a')],
        children: [
          text(title, { fontSize: 18, fontWeight: 600, color: white }),
          text(category, { fontSize: 13, fontWeight: 400, color: muted }),
        ],
      }),
    ],
  });
}
