/**
 * E-commerce Product List — Product grid with 6 product cards
 * Batch 2, Page 1: E-commerce/Retail baseline
 * DSL Features: nested layouts, rectangle placeholders, FILL sizing, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomProductList', {
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
            text('Home', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Shop', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('Categories', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Cart (3)', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Page Header
    frame('PageHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('All Products', { fontSize: 28, fontWeight: 700, color: '#111827' }),
        text('Showing 6 of 48 results', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
      ],
    }),

    // Product Grid
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Classic White Sneakers', '$89.99', '4.8'),
            productCard('Leather Crossbody Bag', '$129.00', '4.6'),
            productCard('Organic Cotton Tee', '$34.99', '4.9'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            productCard('Slim Fit Denim Jeans', '$79.00', '4.5'),
            productCard('Wool Blend Scarf', '$49.99', '4.7'),
            productCard('Running Shoes Pro', '$149.99', '4.4'),
          ],
        }),
      ],
    }),

    // Footer spacer
    frame('FooterSpacer', {
      size: { x: 1, y: 64 },
      layoutSizingHorizontal: 'FILL',
    }),
  ],
});

function productCard(title: string, price: string, rating: string) {
  return frame(`Product: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      // Image placeholder
      rectangle('ProductImage', {
        size: { x: 400, y: 280 },
        fills: [solid('#f3f4f6')],
      }),
      // Info
      frame('ProductInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: '#111827' }),
          frame('PriceRating', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 18, fontWeight: 700, color: '#111827' }),
              frame('Rating', {
                autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                children: [
                  text('★', { fontSize: 14, fontWeight: 400, color: '#f59e0b' }),
                  text(rating, { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
