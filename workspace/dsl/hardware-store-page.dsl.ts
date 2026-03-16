/**
 * Hardware Store — Tool categories, product cards, and project ideas
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function productCard(name: string, price: string, rating: string, brand: string, color: string) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ProductImg', { size: { x: 200, y: 120 }, fills: [solid('#f8fafc')], cornerRadius: 6, layoutSizingHorizontal: 'FILL' }),
      text(brand, { fontSize: 10, fontWeight: 600, color: '#94a3b8' }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
      frame('PriceRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(price, { fontSize: 16, fontWeight: 700, color: color }),
        text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
      ] }),
    ],
  });
}

function categoryPill(label: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 7 }),
    fills: [solid(active ? '#ea580c' : '#f1f5f9')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#475569' })],
  });
}

function projectIdea(title: string, difficulty: string, time: string) {
  return frame(`Project: ${title}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 12 }),
    fills: [solid('#fff7ed')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Info', { autoLayout: vertical({ spacing: 2 }), children: [
        text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(`${difficulty} · ${time}`, { fontSize: 11, fontWeight: 400, color: '#9a3412' }),
      ] }),
      frame('Arrow', { autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid('#ea580c')], cornerRadius: 6, children: [
        text('→', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
      ] }),
    ],
  });
}

export default frame('HardwareStorePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 18 }),
      fills: [solid('#ea580c')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('BuildRight Hardware', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
        frame('SearchBar', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid('#ffffff33')], cornerRadius: 8, size: { x: 280 }, children: [
          text('Search tools & supplies...', { fontSize: 13, fontWeight: 400, color: '#ffffffb3' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Categories', { autoLayout: horizontal({ spacing: 8 }), children: [
          categoryPill('All', false), categoryPill('Power Tools', true), categoryPill('Hand Tools', false),
          categoryPill('Plumbing', false), categoryPill('Electrical', false), categoryPill('Paint', false),
        ] }),
        frame('ProductGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Cordless Drill 20V', '$129.99', '4.8', 'DeWalt', '#ea580c'),
            productCard('Circular Saw 7¼"', '$89.99', '4.6', 'Makita', '#059669'),
            productCard('Socket Set 120pc', '$64.99', '4.9', 'Craftsman', '#2563eb'),
            productCard('LED Work Light', '$34.99', '4.5', 'Milwaukee', '#7c3aed'),
          ],
        }),
        frame('Projects', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('DIY Project Ideas', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            projectIdea('Build a Floating Shelf', 'Beginner', '2 hours'),
            projectIdea('Install a Ceiling Fan', 'Intermediate', '3 hours'),
            projectIdea('Build a Deck', 'Advanced', '2 weekends'),
          ],
        }),
      ],
    }),
  ],
});
