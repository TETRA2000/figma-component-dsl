/**
 * E-commerce Product Page — Product display, size selector, reviews
 * DSL features: two-column layout, gradient product image, pill size selectors, strikethrough price, star ratings, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function sizeOption(size: string, selected: boolean) {
  return frame(`Size: ${size}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'CENTER' }),
    fills: [solid(selected ? '#111827' : '#ffffff')],
    cornerRadius: 8,
    strokes: selected ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(size, { fontSize: 13, fontWeight: 500, color: selected ? '#ffffff' : '#374151' }),
    ],
  });
}

function reviewCard(name: string, initials: string, rating: string, reviewText: string, date: string, color: string) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#f9fafb')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ReviewerRow', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          ellipse(`Av:${initials}`, { size: { x: 32, y: 32 }, fills: [solid(color)] }),
          frame('ReviewerInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 13, fontWeight: 600, color: '#111827' }),
              text(rating, { fontSize: 12, fontWeight: 500, color: '#f59e0b' }),
            ],
          }),
          text(date, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      text(reviewText, { fontSize: 13, fontWeight: 400, color: '#4b5563', lineHeight: { value: 150, unit: 'PERCENT' }, size: { x: 400 }, textAutoResize: 'HEIGHT' }),
    ],
  });
}

export default frame('EcommerceProductPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 40 }),
  fills: [solid('#ffffff')],
  children: [
    // Product section - two column
    frame('ProductSection', {
      autoLayout: horizontal({ spacing: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Product image
        frame('ProductImages', {
          autoLayout: vertical({ spacing: 12 }),
          children: [
            rectangle('MainImage', {
              size: { x: 480, y: 480 },
              fills: [gradient([{ hex: '#f3e8ff', position: 0 }, { hex: '#dbeafe', position: 0.5 }, { hex: '#e0e7ff', position: 1 }], 135)],
              cornerRadius: 16,
            }),
            frame('Thumbnails', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                rectangle('Thumb1', { size: { x: 72, y: 72 }, fills: [solid('#f3e8ff')], cornerRadius: 8, strokes: [{ color: { r: 0.67, g: 0.56, b: 0.93, a: 1 }, weight: 2, align: 'INSIDE' }] }),
                rectangle('Thumb2', { size: { x: 72, y: 72 }, fills: [solid('#dbeafe')], cornerRadius: 8 }),
                rectangle('Thumb3', { size: { x: 72, y: 72 }, fills: [solid('#e0e7ff')], cornerRadius: 8 }),
              ],
            }),
          ],
        }),
        // Product info
        frame('ProductInfo', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Minimalist Desk Lamp', { fontSize: 28, fontWeight: 700, color: '#111827' }),
            frame('RatingRow', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('4.8 stars', { fontSize: 14, fontWeight: 500, color: '#f59e0b' }),
                text('(234 reviews)', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
              ],
            }),
            frame('PriceRow', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                text('$89.99', { fontSize: 28, fontWeight: 700, color: '#111827' }),
                text('$119.99', { fontSize: 18, fontWeight: 400, color: '#9ca3af', textDecoration: 'STRIKETHROUGH' }),
              ],
            }),
            text('A beautifully crafted desk lamp with adjustable brightness and warm LED light. Perfect for home offices and reading nooks. Features touch controls and a minimalist Scandinavian design.', {
              fontSize: 14, fontWeight: 400, color: '#6b7280',
              lineHeight: { value: 160, unit: 'PERCENT' },
              size: { x: 500 },
              textAutoResize: 'HEIGHT',
            }),
            frame('SizeSection', {
              autoLayout: vertical({ spacing: 10 }),
              children: [
                text('Size', { fontSize: 14, fontWeight: 600, color: '#374151' }),
                frame('SizeOptions', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    sizeOption('S', false),
                    sizeOption('M', true),
                    sizeOption('L', false),
                  ],
                }),
              ],
            }),
            frame('AddToCart', {
              autoLayout: horizontal({ spacing: 0, padX: 48, padY: 14, align: 'CENTER' }),
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Add to Cart', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Reviews section
    frame('ReviewsSection', {
      autoLayout: vertical({ spacing: 16, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Customer Reviews', { fontSize: 20, fontWeight: 600, color: '#111827' }),
        frame('ReviewsGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            reviewCard('Emma Wilson', 'EW', '5 stars', 'Absolutely love this lamp! The build quality is exceptional and the warm light is perfect for late-night reading.', 'Mar 10, 2026', '#7c3aed'),
            reviewCard('James Chen', 'JC', '4 stars', 'Great design and functionality. The touch controls are intuitive. Wish it came in more colors.', 'Mar 8, 2026', '#3b82f6'),
            reviewCard('Sofia Garcia', 'SG', '5 stars', 'This lamp transformed my workspace. The adjustable brightness is a game-changer for video calls.', 'Mar 5, 2026', '#10b981'),
          ],
        }),
      ],
    }),
  ],
});
