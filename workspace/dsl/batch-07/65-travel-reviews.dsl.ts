/**
 * Travel Reviews — Destination rating, photo grid, review cards, helpful buttons
 * Batch 7, Page 5: Travel reviews page
 * DSL Features: clipContent, image fills (rectangle placeholders), FILL sizing, nested layouts
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelReviews', {
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
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Explore', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Flights', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Hotels', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Reviews', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
          ],
        }),
      ],
    }),

    // Destination Header
    frame('DestHeader', {
      autoLayout: horizontal({ spacing: 40, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        // Rating Summary
        frame('RatingSummary', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 320, y: undefined },
          children: [
            text('Santorini, Greece', { fontSize: 28, fontWeight: 700, color: '#1e293b' }),
            frame('OverallRating', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                text('4.9', { fontSize: 56, fontWeight: 700, color: '#ea580c' }),
                frame('RatingDetails', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('★ ★ ★ ★ ★', { fontSize: 20, fontWeight: 400, color: '#f59e0b' }),
                    text('3,241 reviews', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                  ],
                }),
              ],
            }),
            // Rating Bars
            ratingBar('5 stars', 78),
            ratingBar('4 stars', 15),
            ratingBar('3 stars', 4),
            ratingBar('2 stars', 2),
            ratingBar('1 star', 1),
          ],
        }),

        // Photo Grid Placeholder
        frame('PhotoGrid', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('PhotoRow1', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('Photo1', { size: { x: 300, y: 160 }, fills: [solid('#7ba3c9')], cornerRadius: 12 }),
                rectangle('Photo2', { size: { x: 300, y: 160 }, fills: [solid('#c9a67b')], cornerRadius: 12 }),
                rectangle('Photo3', { size: { x: 300, y: 160 }, fills: [solid('#a3c97b')], cornerRadius: 12 }),
              ],
            }),
            frame('PhotoRow2', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('Photo4', { size: { x: 200, y: 120 }, fills: [solid('#c97ba3')], cornerRadius: 12 }),
                rectangle('Photo5', { size: { x: 200, y: 120 }, fills: [solid('#7bc9c9')], cornerRadius: 12 }),
                rectangle('Photo6', { size: { x: 200, y: 120 }, fills: [solid('#c9c97b')], cornerRadius: 12 }),
                frame('MorePhotos', {
                  size: { x: 200, y: 120 },
                  fills: [solid('#64748b')],
                  cornerRadius: 12,
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  children: [
                    text('+248 photos', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Filter Bar
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 12, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('Filter by:', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
        filterChip('All', true),
        filterChip('Couples', false),
        filterChip('Families', false),
        filterChip('Solo', false),
        filterChip('Business', false),
        frame('FilterSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('Sort: Most Recent', { fontSize: 13, fontWeight: 500, color: '#0369a1' }),
      ],
    }),

    // Reviews List
    frame('ReviewsList', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        reviewCard(
          'Maria Gonzalez', 'Barcelona, Spain', 'Oct 2025',
          5, 'Absolutely magical!',
          'Santorini exceeded every expectation. The sunsets from Oia are truly unforgettable. We stayed in a cave hotel with a private pool overlooking the caldera. The local food was incredible, especially the fresh seafood.',
          42, 3,
        ),
        reviewCard(
          'James Chen', 'San Francisco, USA', 'Sep 2025',
          4, 'Beautiful but crowded',
          'The views are stunning and the architecture is gorgeous. However, visiting in September was still quite crowded. I recommend going in early October for fewer tourists. The wine tasting tours are a must!',
          28, 5,
        ),
        reviewCard(
          'Yuki Tanaka', 'Tokyo, Japan', 'Aug 2025',
          5, 'Dream destination',
          'This was on my bucket list for years and it did not disappoint. The blue-domed churches, white-washed buildings, and crystal-clear water create a paradise. Highly recommend renting an ATV to explore the island.',
          55, 2,
        ),
      ],
    }),

    // Load More
    frame('LoadMore', {
      autoLayout: horizontal({ padX: 0, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LoadMoreBtn', {
          autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Load More Reviews', { fontSize: 14, fontWeight: 500, color: '#1e293b' }),
          ],
        }),
      ],
    }),
  ],
});

function ratingBar(label: string, percent: number) {
  return frame(`Rating: ${label}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: '#64748b', size: { x: 56 }, textAutoResize: 'HEIGHT' }),
      frame('BarTrack', {
        size: { x: 180, y: 8 },
        fills: [solid('#e2e8f0')],
        cornerRadius: 4,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(180 * percent / 100), y: 8 },
            fills: [solid('#f59e0b')],
          }),
        ],
      }),
      text(`${percent}%`, { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
    ],
  });
}

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#ea580c' : '#ffffff')],
    cornerRadius: 999,
    strokes: active ? [] : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? '#ffffff' : '#4b5563' }),
    ],
  });
}

function reviewCard(
  name: string, location: string, date: string,
  rating: number, title: string, body: string,
  helpful: number, notHelpful: number,
) {
  const stars = Array(5).fill('★').map((s, i) => i < rating ? '★' : '☆').join(' ');

  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Header
      frame('ReviewHeader', {
        autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('TravelerInfo', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('Avatar', {
                size: { x: 44, y: 44 },
                fills: [gradient([
                  { hex: '#ea580c', position: 0 },
                  { hex: '#0369a1', position: 1 },
                ], 135)],
                cornerRadius: 22,
              }),
              frame('TravelerDetails', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
                  text(`${location}  •  ${date}`, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
                ],
              }),
            ],
          }),
          text(stars, { fontSize: 16, fontWeight: 400, color: '#f59e0b' }),
        ],
      }),
      // Content
      text(title, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
      text(body, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
      // Actions
      rectangle('ReviewDivider', {
        size: { x: 1, y: 1 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#f1f5f9')],
      }),
      frame('ReviewActions', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          frame('HelpfulBtn', {
            autoLayout: horizontal({ spacing: 6, padX: 12, padY: 6, counterAlign: 'CENTER' }),
            cornerRadius: 6,
            strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
            children: [
              text('Helpful', { fontSize: 13, fontWeight: 500, color: '#4b5563' }),
              text(`(${helpful})`, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          frame('NotHelpfulBtn', {
            autoLayout: horizontal({ spacing: 6, padX: 12, padY: 6, counterAlign: 'CENTER' }),
            cornerRadius: 6,
            strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
            children: [
              text('Not Helpful', { fontSize: 13, fontWeight: 500, color: '#4b5563' }),
              text(`(${notHelpful})`, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          text('Report', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}
