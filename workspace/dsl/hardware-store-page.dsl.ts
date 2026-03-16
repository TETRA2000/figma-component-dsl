/**
 * Hardware Store — Product categories, tool cards, project guides
 * DSL features: grid layout, category badges, price tags, cornerRadius cards, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function categoryBadge(label: string, color: string) {
  return frame(`Cat:${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`CatIcon:${label}`, { size: { x: 40, y: 40 }, fills: [solid(color)], cornerRadius: 8 }),
      text(label, { fontSize: 13, fontWeight: 600, color: '#374151' }),
    ],
  });
}

function toolCard(name: string, brand: string, price: string, rating: string, colors: [string, string]) {
  return frame(`Tool:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img:${name}`, {
        size: { x: 220, y: 140 },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      text(brand, { fontSize: 11, fontWeight: 500, color: '#9ca3af' }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#111827' }),
      frame('PriceRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(price, { fontSize: 18, fontWeight: 700, color: '#b45309' }),
          text(rating, { fontSize: 12, fontWeight: 500, color: '#f59e0b' }),
        ],
      }),
    ],
  });
}

function guideCard(title: string, difficulty: string, time: string) {
  return frame(`Guide:${title}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 14 }),
    fills: [solid('#fffbeb')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.88, b: 0.68, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 14, fontWeight: 600, color: '#92400e' }),
      frame('GuideInfo', {
        autoLayout: horizontal({ spacing: 12 }),
        children: [
          text(difficulty, { fontSize: 11, fontWeight: 500, color: '#b45309' }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('HardwareStorePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 28, padX: 44, padY: 36 }),
  fills: [solid('#f9fafb')],
  children: [
    frame('StoreHeader', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('BuildRight Hardware', { fontSize: 28, fontWeight: 700, color: '#111827' }),
        frame('CartBtn', {
          autoLayout: horizontal({ spacing: 6, padX: 16, padY: 8 }),
          fills: [solid('#b45309')],
          cornerRadius: 8,
          children: [text('Cart (3)', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryBadge('Power Tools', '#f97316'),
        categoryBadge('Hand Tools', '#3b82f6'),
        categoryBadge('Fasteners', '#6b7280'),
        categoryBadge('Plumbing', '#06b6d4'),
        categoryBadge('Electrical', '#eab308'),
        categoryBadge('Paint', '#8b5cf6'),
      ],
    }),
    text('Popular Tools', { fontSize: 20, fontWeight: 600, color: '#111827' }),
    frame('ToolGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        toolCard('Cordless Drill 20V', 'DeWalt', '$129.99', '4.8 stars', ['#fde68a', '#f97316']),
        toolCard('Circular Saw 7.25"', 'Makita', '$199.99', '4.7 stars', ['#bfdbfe', '#1d4ed8']),
        toolCard('Impact Driver Kit', 'Milwaukee', '$149.99', '4.9 stars', ['#fecaca', '#dc2626']),
        toolCard('Jigsaw Variable Speed', 'Bosch', '$89.99', '4.6 stars', ['#bbf7d0', '#16a34a']),
      ],
    }),
    text('Project Guides', { fontSize: 20, fontWeight: 600, color: '#111827' }),
    frame('GuideGrid', {
      autoLayout: horizontal({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        guideCard('Build a Deck', 'Intermediate', '2-3 days'),
        guideCard('Install a Faucet', 'Beginner', '1 hour'),
        guideCard('Frame a Wall', 'Advanced', '4-6 hours'),
      ],
    }),
  ],
});
