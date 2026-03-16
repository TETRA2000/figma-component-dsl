/**
 * Moving Company — Package tiers, quote form, and reviews
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function packageTier(name: string, price: string, includes: string[], color: string, popular: boolean) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid(popular ? color : '#ffffff')],
    cornerRadius: 14,
    strokes: popular ? [] : [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      popular ? frame('PopBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid('#ffffff33')], cornerRadius: 9999, children: [text('Best Value', { fontSize: 10, fontWeight: 700, color: '#ffffff' })] })
        : rectangle('Spacer', { size: { x: 1, y: 0 }, fills: [] }),
      text(name, { fontSize: 18, fontWeight: 700, color: popular ? '#ffffff' : '#0f172a' }),
      text(`From ${price}`, { fontSize: 24, fontWeight: 800, color: popular ? '#ffffff' : color }),
      ...includes.map(i => text(`✓ ${i}`, { fontSize: 12, fontWeight: 400, color: popular ? '#ffffffcc' : '#475569' })),
    ],
  });
}

function reviewCard(name: string, stars: number, comment: string) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Top', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
        text('★'.repeat(stars), { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
      ] }),
      text(comment, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#334155' }),
      frame('Input', { autoLayout: horizontal({ padX: 12, padY: 10 }), fills: [solid('#f8fafc')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [
        text(placeholder, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

export default frame('MovingCompanyPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 36, padY: 32 }),
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#2563eb', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SwiftMove Co.', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Stress-free moving — local & long-distance', { fontSize: 14, fontWeight: 400, color: '#93c5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Packages', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Moving Packages', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('PackageGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              packageTier('Basic', '$499', ['Loading & unloading', 'Local moves up to 25 mi', 'Basic insurance'], '#64748b', false),
              packageTier('Full Service', '$999', ['Packing & unpacking', 'Loading & unloading', 'Up to 100 mi', 'Full insurance', 'Furniture assembly'], '#2563eb', true),
              packageTier('Premium', '$1,899', ['White-glove packing', 'Cross-country moves', 'Storage for 30 days', 'Premium insurance', 'Dedicated coordinator'], '#7c3aed', false),
            ] }),
          ],
        }),
        frame('QuoteForm', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Get a Free Quote', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            frame('Row1', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [formField('Moving From', 'ZIP code'), formField('Moving To', 'ZIP code')] }),
            frame('Row2', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [formField('Move Date', 'MM/DD/YYYY'), formField('Home Size', 'e.g. 2 Bedroom')] }),
            frame('QuoteBtn', { autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER' }), fills: [solid('#2563eb')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [
              text('Get Quote', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
            ] }),
          ],
        }),
        frame('Reviews', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Customer Reviews', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            reviewCard('Maria G.', 5, 'Incredible service! The crew was on time, careful with our belongings, and so friendly.'),
            reviewCard('David T.', 4, 'Very professional movers. The only reason for 4 stars is the delay in scheduling.'),
            reviewCard('Amy L.', 5, 'Best moving experience ever. They even assembled all our furniture in the new place!'),
          ],
        }),
      ],
    }),
  ],
});
