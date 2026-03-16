/**
 * Online Bookstore — Book cards with genre filters, bestseller section, ratings
 * DSL features: card grid, pill filters, star ratings, gradient featured section
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function genreFilter(label: string, active: boolean) {
  return frame(`Genre: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 7 }),
    fills: [solid(active ? '#7c3aed' : '#f3f4f6')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#6b7280' })],
  });
}

function bookCard(title: string, author: string, price: string, rating: number, color: string) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  return frame(`Book: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle(`Cover:${title}`, {
        size: { x: 1, y: 160 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'cc', position: 1 }], 160)],
        cornerRadius: 12,
      }),
      frame('BookInfo', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 700, color: '#111827' }),
          text(author, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          text(stars, { fontSize: 12, fontWeight: 400, color: '#f59e0b' }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 16, fontWeight: 800, color: '#7c3aed' }),
              frame('CartBtn', {
                autoLayout: horizontal({ spacing: 0, padX: 10, padY: 5 }),
                fills: [solid('#7c3aed')], cornerRadius: 6,
                children: [text('Add', { fontSize: 11, fontWeight: 600, color: '#ffffff' })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function bestsellerRow(rank: number, title: string, author: string, price: string) {
  return frame(`Rank: ${rank}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(`#${rank}`, { fontSize: 16, fontWeight: 800, color: '#7c3aed', size: { x: 32 } }),
      frame('BsInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: '#111827' }),
          text(author, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 700, color: '#111827' }),
    ],
  });
}

export default frame('BookstorePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('PageTurner', { fontSize: 22, fontWeight: 800, color: '#7c3aed' }),
        frame('Search', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
          fills: [solid('#f3f4f6')], cornerRadius: 8,
          children: [text('Search books, authors...', { fontSize: 13, fontWeight: 400, color: '#9ca3af' })],
        }),
      ],
    }),
    frame('Genres', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        genreFilter('All', true), genreFilter('Fiction', false), genreFilter('Sci-Fi', false),
        genreFilter('Mystery', false), genreFilter('Non-Fiction', false), genreFilter('Romance', false),
      ],
    }),
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BookGrid', {
          autoLayout: vertical({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('New Releases', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            frame('Row1', {
              autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
              children: [
                bookCard('The Glass Ocean', 'Marina Cole', '$24.99', 5, '#3b82f6'),
                bookCard('Neon Requiem', 'Kai Tanaka', '$19.99', 4, '#ec4899'),
                bookCard('Silent Meridian', 'Alex Rivera', '$21.99', 4, '#10b981'),
              ],
            }),
            frame('Row2', {
              autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
              children: [
                bookCard('The Last Algorithm', 'Priya Sharma', '$22.99', 5, '#f59e0b'),
                bookCard('Dust & Echoes', 'Sam Wright', '$18.99', 3, '#8b5cf6'),
                bookCard('Mapmaker\'s Daughter', 'Elena Torres', '$20.99', 4, '#ef4444'),
              ],
            }),
          ],
        }),
        frame('BestsellerPanel', {
          size: { x: 280 },
          autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')], cornerRadius: 14,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Bestsellers', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            bestsellerRow(1, 'The Glass Ocean', 'Marina Cole', '$24.99'),
            bestsellerRow(2, 'Quantum Hearts', 'John Lee', '$26.99'),
            bestsellerRow(3, 'The Last Algorithm', 'Priya Sharma', '$22.99'),
            bestsellerRow(4, 'Iron Garden', 'Sofia Reyes', '$19.99'),
            bestsellerRow(5, 'Night Compass', 'Leo Park', '$21.99'),
          ],
        }),
      ],
    }),
  ],
});
