/**
 * E-commerce Category Browse — Sidebar filters + product grid
 * Batch 2, Page 7: Category page with filtering
 * DSL Features: SPACE_BETWEEN, nested layouts, strokes, FILL sizing
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomCategory', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('ShopFlow', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Women', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Men', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Shoes', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('Accessories', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Breadcrumb
    frame('Breadcrumb', {
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Home', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
        text('/', { fontSize: 13, fontWeight: 400, color: '#d1d5db' }),
        text('Shoes', { fontSize: 13, fontWeight: 500, color: '#111827' }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Sidebar Filters
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 260, y: undefined },
          children: [
            text('Filters', { fontSize: 18, fontWeight: 700, color: '#111827' }),

            // Price Range
            filterSection('Price Range', [
              filterOption('Under $50', true),
              filterOption('$50 – $100', false),
              filterOption('$100 – $200', true),
              filterOption('$200+', false),
            ]),

            // Brand
            filterSection('Brand', [
              filterOption('Nike', true),
              filterOption('Adidas', false),
              filterOption('New Balance', false),
              filterOption('Puma', true),
            ]),

            // Color
            frame('ColorFilter', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Color', { fontSize: 14, fontWeight: 600, color: '#111827' }),
                frame('ColorSwatches', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    colorSwatch('#000000', true),
                    colorSwatch('#ffffff', false),
                    colorSwatch('#3b82f6', false),
                    colorSwatch('#ef4444', false),
                    colorSwatch('#10b981', false),
                  ],
                }),
              ],
            }),

            // Size
            filterSection('Size', [
              filterOption('S', false),
              filterOption('M', true),
              filterOption('L', false),
              filterOption('XL', false),
            ]),
          ],
        }),

        // Product Grid
        frame('ProductArea', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Sort Bar
            frame('SortBar', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('24 products found', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
                frame('SortSelect', {
                  autoLayout: horizontal({ spacing: 8, padX: 14, padY: 8, counterAlign: 'CENTER' }),
                  cornerRadius: 8,
                  strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Sort by: Popular', { fontSize: 13, fontWeight: 500, color: '#374151' }),
                    text('▾', { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
                  ],
                }),
              ],
            }),

            // Grid
            frame('Grid', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('GridRow1', {
                  autoLayout: horizontal({ spacing: 20 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    productCard('Air Max Runner', '$129.99', '4.7'),
                    productCard('Classic Leather', '$89.00', '4.5'),
                    productCard('Trail Blazer X', '$159.99', '4.8'),
                  ],
                }),
                frame('GridRow2', {
                  autoLayout: horizontal({ spacing: 20 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    productCard('Urban Slip-On', '$64.99', '4.3'),
                    productCard('Pro Trainer 5', '$119.00', '4.6'),
                    productCard('Canvas Lite', '$49.99', '4.4'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function filterSection(title: string, options: ReturnType<typeof filterOption>[]) {
  return frame(`Filter: ${title}`, {
    autoLayout: vertical({ spacing: 10 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 14, fontWeight: 600, color: '#111827' }),
      ...options,
    ],
  });
}

function filterOption(label: string, checked: boolean) {
  return frame(`Option: ${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    children: [
      frame('Checkbox', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 18, y: 18 },
        fills: [solid(checked ? '#111827' : '#ffffff')],
        cornerRadius: 4,
        strokes: [{ color: { r: 0.78, g: 0.78, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: checked
          ? [text('✓', { fontSize: 11, fontWeight: 700, color: '#ffffff' })]
          : [],
      }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#374151' }),
    ],
  });
}

function colorSwatch(color: string, selected: boolean) {
  return frame(`Color: ${color}`, {
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: 28, y: 28 },
    cornerRadius: 14,
    strokes: selected
      ? [{ color: { r: 0.39, g: 0.39, b: 0.95, a: 1 }, weight: 2, align: 'OUTSIDE' }]
      : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('Swatch', {
        size: { x: 20, y: 20 },
        fills: [solid(color)],
        cornerRadius: 10,
      }),
    ],
  });
}

function productCard(title: string, price: string, rating: string) {
  return frame(`Product: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      rectangle('Image', {
        size: { x: 280, y: 200 },
        fills: [solid('#f3f4f6')],
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          frame('PriceRating', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 16, fontWeight: 700, color: '#111827' }),
              frame('Stars', {
                autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                children: [
                  text('★', { fontSize: 13, fontWeight: 400, color: '#f59e0b' }),
                  text(rating, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
