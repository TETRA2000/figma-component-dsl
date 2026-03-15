/**
 * E-commerce Reviews Page — Star rating summary, distribution bars, review cards
 * Batch 2, Page 9: Product reviews page
 * DSL Features: nested layouts, FILL sizing, progress bars, strokes
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomReviews', {
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
        text('Back to Product', { fontSize: 14, fontWeight: 500, color: '#6366f1' }),
      ],
    }),

    // Page Header
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 4, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Customer Reviews', { fontSize: 28, fontWeight: 700, color: '#111827' }),
        text('Classic White Sneakers', { fontSize: 16, fontWeight: 400, color: '#6b7280' }),
      ],
    }),

    // Rating Summary
    frame('RatingSummary', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Overall Score
        frame('OverallScore', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          size: { x: 160, y: undefined },
          children: [
            text('4.8', { fontSize: 56, fontWeight: 700, color: '#111827' }),
            text('★ ★ ★ ★ ★', { fontSize: 20, fontWeight: 400, color: '#f59e0b' }),
            text('Based on 124 reviews', { fontSize: 13, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
          ],
        }),

        // Rating Distribution
        frame('RatingDistribution', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          size: { x: 400, y: undefined },
          children: [
            ratingBar('5 stars', 78, 96),
            ratingBar('4 stars', 18, 22),
            ratingBar('3 stars', 3, 4),
            ratingBar('2 stars', 1, 1),
            ratingBar('1 star', 0, 1),
          ],
        }),

        // Write Review Button
        frame('WriteReviewArea', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Share your experience', { fontSize: 14, fontWeight: 500, color: '#374151' }),
            frame('WriteReviewBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Write a Review', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Divider
    frame('DividerWrap', {
      autoLayout: horizontal({ padX: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('Divider', {
          size: { x: 1280, y: 1 },
          fills: [solid('#e5e7eb')],
        }),
      ],
    }),

    // Review Cards
    frame('ReviewCards', {
      autoLayout: vertical({ spacing: 0, padX: 80, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        reviewCard('Sarah Mitchell', '★ ★ ★ ★ ★', 'March 10, 2026', 'Absolutely love these sneakers!', 'The quality is outstanding. Super comfortable right out of the box — no break-in period needed. The white leather is easy to clean and looks premium. I wear them every day.'),
        reviewCard('James Thompson', '★ ★ ★ ★', 'March 5, 2026', 'Great shoes, minor sizing note', 'Beautiful design and very comfortable. They run slightly narrow, so I recommend going half a size up if you have wider feet. Otherwise, excellent purchase.'),
        reviewCard('Emily Chen', '★ ★ ★ ★ ★', 'February 28, 2026', 'Perfect everyday shoe', 'These are exactly what I was looking for — clean, minimal, and incredibly versatile. They pair well with jeans, chinos, and even casual dresses. Worth every penny.'),
        reviewCard('Michael Brown', '★ ★ ★ ★ ★', 'February 20, 2026', 'Best white sneakers I have owned', 'I have tried many brands but these are by far the best. The cushioning is excellent for all-day wear and the build quality is top-notch. Already planning to buy a second pair.'),
      ],
    }),
  ],
});

function ratingBar(label: string, percentage: number, count: number) {
  return frame(`Rating: ${label}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280', size: { x: 52 } }),
      frame('BarTrack', {
        size: { x: 260, y: 8 },
        fills: [solid('#e5e7eb')],
        cornerRadius: 4,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(260 * percentage / 100), y: 8 },
            fills: [solid('#f59e0b')],
          }),
        ],
      }),
      text(String(count), { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

function reviewCard(author: string, stars: string, date: string, title: string, content: string) {
  return frame(`Review: ${author}`, {
    autoLayout: vertical({ spacing: 10, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('ReviewHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('AuthorInfo', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              rectangle('Avatar', {
                size: { x: 40, y: 40 },
                fills: [solid('#e5e7eb')],
                cornerRadius: 20,
              }),
              frame('AuthorText', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(author, { fontSize: 15, fontWeight: 600, color: '#111827' }),
                  text(stars, { fontSize: 13, fontWeight: 400, color: '#f59e0b' }),
                ],
              }),
            ],
          }),
          text(date, { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      text(title, { fontSize: 15, fontWeight: 600, color: '#111827' }),
      text(content, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 900 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}
