/**
 * Fashion Store — Product grid, size filters, lookbook section
 * DSL features: wide layout (1200px), gradient product images, pill size filters, grid layout
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function sizeFilter(label: string, active: boolean) {
  return frame(`Size: ${label}`, {
    size: { x: 40, y: 36 },
    autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#111827' : '#ffffff')], cornerRadius: 8,
    strokes: active ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#374151' })],
  });
}

function productCard(name: string, price: string, origPrice: string, color: string, isNew: boolean) {
  return frame(`Product: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      frame('ProductImg', {
        size: { x: 1, y: 200 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'MIN', padX: 8, padY: 8 }),
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + '88', position: 1 }], 160)],
        layoutSizingHorizontal: 'FILL',
        children: isNew ? [frame('NewBadge', {
          autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
          fills: [solid('#111827')], cornerRadius: 6,
          children: [text('NEW', { fontSize: 10, fontWeight: 700, color: '#ffffff' })],
        })] : [],
      }),
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 16, fontWeight: 700, color: '#111827' }),
              ...(origPrice ? [text(origPrice, { fontSize: 13, fontWeight: 400, color: '#9ca3af', textDecoration: 'STRIKETHROUGH' })] : []),
            ],
          }),
        ],
      }),
    ],
  });
}

function lookbookCard(title: string, color1: string, color2: string) {
  return frame(`Look: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`LookImg:${title}`, {
        size: { x: 1, y: 280 },
        fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)],
        cornerRadius: 14,
      }),
      frame('LookInfo', {
        autoLayout: vertical({ spacing: 2, padX: 8, padY: 10 }),
        children: [
          text(title, { fontSize: 16, fontWeight: 700, color: '#111827' }),
          text('Shop the look →', { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

export default frame('FashionStorePage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('MAISON', { fontSize: 24, fontWeight: 900, color: '#111827', letterSpacing: { value: 15, unit: 'PERCENT' } }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Women', { fontSize: 13, fontWeight: 600, color: '#111827' }),
            text('Men', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            text('Accessories', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            text('Sale', { fontSize: 13, fontWeight: 600, color: '#dc2626' }),
          ],
        }),
        frame('Cart', {
          autoLayout: horizontal({ spacing: 4, padX: 12, padY: 6 }),
          fills: [solid('#111827')], cornerRadius: 8,
          children: [text('Cart (3)', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 16, padX: 36, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      children: [
        text('Size:', { fontSize: 13, fontWeight: 600, color: '#374151' }),
        sizeFilter('XS', false), sizeFilter('S', true), sizeFilter('M', false),
        sizeFilter('L', false), sizeFilter('XL', false),
        frame('FilterSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        text('128 items', { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
      ],
    }),
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 16, padX: 36, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Oversized Linen Blazer', '$189', '$249', '#c4b5a0', true),
            productCard('Silk Midi Dress', '$245', '', '#b8c0d4', false),
            productCard('Cashmere Sweater', '$165', '$220', '#d4a9b0', false),
            productCard('Tailored Trousers', '$135', '', '#a0b8a8', true),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Leather Tote Bag', '$295', '', '#8b7355', false),
            productCard('Wool Coat', '$380', '$450', '#6b7b8d', false),
            productCard('Cotton Shirt Dress', '$120', '', '#d4c4a8', true),
            productCard('Pleated Skirt', '$98', '$130', '#b0a0c4', false),
          ],
        }),
      ],
    }),
    frame('LookbookSection', {
      autoLayout: vertical({ spacing: 14, padX: 36, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Spring Lookbook', { fontSize: 20, fontWeight: 800, color: '#111827' }),
        frame('LookbookRow', {
          autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            lookbookCard('Coastal Elegance', '#87CEEB', '#DEB887'),
            lookbookCard('Urban Minimalist', '#2F4F4F', '#708090'),
            lookbookCard('Garden Party', '#98FB98', '#FFB6C1'),
          ],
        }),
      ],
    }),
  ],
});
