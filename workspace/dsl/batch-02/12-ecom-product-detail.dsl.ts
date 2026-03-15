/**
 * E-commerce Product Detail — Full product page with image, info, reviews
 * Batch 2, Page 2: Product detail view
 * DSL Features: nested layouts, FILL sizing, SPACE_BETWEEN, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomProductDetail', {
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
            text('Shop', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
            text('Cart (3)', { fontSize: 14, fontWeight: 500, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Breadcrumb
    frame('Breadcrumb', {
      autoLayout: horizontal({ spacing: 8, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Home', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
        text('/', { fontSize: 13, fontWeight: 400, color: '#d1d5db' }),
        text('Shoes', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
        text('/', { fontSize: 13, fontWeight: 400, color: '#d1d5db' }),
        text('Classic White Sneakers', { fontSize: 13, fontWeight: 500, color: '#111827' }),
      ],
    }),

    // Product Section
    frame('ProductSection', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Image area
        frame('ImageArea', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            rectangle('MainImage', {
              size: { x: 560, y: 480 },
              fills: [solid('#f3f4f6')],
              cornerRadius: 12,
            }),
            frame('Thumbnails', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                rectangle('Thumb1', { size: { x: 80, y: 80 }, fills: [solid('#e5e7eb')], cornerRadius: 8 }),
                rectangle('Thumb2', { size: { x: 80, y: 80 }, fills: [solid('#e5e7eb')], cornerRadius: 8 }),
                rectangle('Thumb3', { size: { x: 80, y: 80 }, fills: [solid('#e5e7eb')], cornerRadius: 8 }),
                rectangle('Thumb4', { size: { x: 80, y: 80 }, fills: [solid('#e5e7eb')], cornerRadius: 8 }),
              ],
            }),
          ],
        }),

        // Right: Product Info
        frame('ProductInfo', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Classic White Sneakers', { fontSize: 32, fontWeight: 700, color: '#111827' }),
            frame('PriceRow', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                text('$89.99', { fontSize: 28, fontWeight: 700, color: '#111827' }),
                text('$119.99', {
                  fontSize: 18, fontWeight: 400, color: '#9ca3af',
                  textDecoration: 'STRIKETHROUGH',
                }),
              ],
            }),
            frame('RatingRow', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('★ ★ ★ ★ ★', { fontSize: 16, fontWeight: 400, color: '#f59e0b' }),
                text('4.8 (124 reviews)', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
              ],
            }),
            text('Premium leather sneakers with cushioned insole and durable rubber outsole. Perfect for everyday wear with a clean, minimalist design that pairs well with any outfit.', {
              fontSize: 15, fontWeight: 400, color: '#4b5563',
              lineHeight: { value: 24, unit: 'PIXELS' },
              size: { x: 480 },
              textAutoResize: 'HEIGHT',
            }),

            // Size Selector
            frame('SizeSelector', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('Size', { fontSize: 14, fontWeight: 600, color: '#111827' }),
                frame('Sizes', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    sizeOption('7', false),
                    sizeOption('8', false),
                    sizeOption('9', true),
                    sizeOption('10', false),
                    sizeOption('11', false),
                  ],
                }),
              ],
            }),

            // Quantity
            frame('QuantityRow', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                text('Quantity', { fontSize: 14, fontWeight: 600, color: '#111827' }),
                frame('QuantityControl', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
                  cornerRadius: 8,
                  children: [
                    frame('Minus', {
                      autoLayout: horizontal({ padX: 14, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      children: [text('−', { fontSize: 16, fontWeight: 500, color: '#374151' })],
                    }),
                    frame('Qty', {
                      autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
                      children: [text('1', { fontSize: 16, fontWeight: 500, color: '#111827' })],
                    }),
                    frame('Plus', {
                      autoLayout: horizontal({ padX: 14, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      children: [text('+', { fontSize: 16, fontWeight: 500, color: '#374151' })],
                    }),
                  ],
                }),
              ],
            }),

            // Add to Cart
            frame('AddToCart', {
              autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Add to Cart', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Reviews Section
    frame('ReviewsSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f9fafb')],
      children: [
        text('Customer Reviews', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        frame('ReviewsList', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            reviewCard('Sarah M.', '★ ★ ★ ★ ★', 'Amazing quality and super comfortable! Wore them all day with no issues.'),
            reviewCard('James T.', '★ ★ ★ ★', 'Great shoes, true to size. Only wish they had more color options.'),
          ],
        }),
      ],
    }),
  ],
});

function sizeOption(size: string, selected: boolean) {
  return frame(`Size${size}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(selected ? '#111827' : '#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(size, { fontSize: 14, fontWeight: 500, color: selected ? '#ffffff' : '#374151' }),
    ],
  });
}

function reviewCard(author: string, stars: string, content: string) {
  return frame(`Review: ${author}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('ReviewHeader', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(author, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          text(stars, { fontSize: 13, fontWeight: 400, color: '#f59e0b' }),
        ],
      }),
      text(content, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
    ],
  });
}
