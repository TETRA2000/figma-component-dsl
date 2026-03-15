/**
 * E-commerce Search Results — Search bar, result count, sorting, product list
 * Batch 2, Page 8: Search results page
 * DSL Features: nested layouts, SPACE_BETWEEN, FILL sizing, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomSearch', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar with search
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
            text('Shop', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Categories', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Cart (3)', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Search Bar Section
    frame('SearchBarSection', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, counterAlign: 'CENTER', align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f9fafb')],
      children: [
        frame('SearchBar', {
          autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
          size: { x: 640, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('🔍', { fontSize: 16, fontWeight: 400, color: '#9ca3af' }),
            text('white sneakers', { fontSize: 15, fontWeight: 400, color: '#111827' }),
          ],
        }),
      ],
    }),

    // Results Header
    frame('ResultsHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ResultInfo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('Results for', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            text('"white sneakers"', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('— 18 products found', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        frame('SortOptions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Sort by:', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
            sortTab('Relevance', true),
            sortTab('Price: Low', false),
            sortTab('Price: High', false),
            sortTab('Newest', false),
          ],
        }),
      ],
    }),

    // Search Results
    frame('SearchResults', {
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        searchResultItem('Classic White Sneakers', 'Premium leather sneakers with cushioned insole and durable rubber outsole.', '$89.99', '$119.99', '4.8', '124 reviews'),
        searchResultItem('White Canvas Low-Top', 'Lightweight canvas shoes perfect for summer. Breathable and easy to clean.', '$54.99', '', '4.5', '89 reviews'),
        searchResultItem('Retro White Runner', 'Vintage-inspired running shoes with modern comfort technology.', '$109.00', '', '4.7', '56 reviews'),
        searchResultItem('Minimalist White Slip-On', 'Clean and simple slip-on design. No-lace convenience with elastic gussets.', '$69.99', '$84.99', '4.3', '203 reviews'),
      ],
    }),

    // Pagination
    frame('Pagination', {
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 32, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        pageButton('1', true),
        pageButton('2', false),
        pageButton('3', false),
        pageButton('...', false),
        pageButton('6', false),
      ],
    }),
  ],
});

function sortTab(label: string, active: boolean) {
  return frame(`Sort: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#111827')] : [],
    cornerRadius: 6,
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? '#ffffff' : '#6b7280' }),
    ],
  });
}

function searchResultItem(title: string, description: string, price: string, oldPrice: string, rating: string, reviewCount: string) {
  return frame(`Result: ${title}`, {
    autoLayout: horizontal({ spacing: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Product Image
      rectangle('Image', {
        size: { x: 160, y: 120 },
        fills: [solid('#f3f4f6')],
        cornerRadius: 10,
      }),
      // Product Info
      frame('Info', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 17, fontWeight: 600, color: '#111827' }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: '#6b7280',
            lineHeight: { value: 22, unit: 'PIXELS' },
          }),
          frame('PriceLine', {
            autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 18, fontWeight: 700, color: '#111827' }),
              ...(oldPrice
                ? [text(oldPrice, { fontSize: 14, fontWeight: 400, color: '#9ca3af', textDecoration: 'STRIKETHROUGH' })]
                : []),
            ],
          }),
          frame('RatingLine', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text('★', { fontSize: 14, fontWeight: 400, color: '#f59e0b' }),
              text(rating, { fontSize: 13, fontWeight: 600, color: '#374151' }),
              text(`(${reviewCount})`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function pageButton(label: string, active: boolean) {
  return frame(`Page: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#111827')] : [],
    cornerRadius: 8,
    strokes: active
      ? []
      : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: active ? '#ffffff' : '#374151' }),
    ],
  });
}
