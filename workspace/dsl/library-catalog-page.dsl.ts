/**
 * Library Catalog — Book cards with covers, search filters, and due dates
 * DSL features: gradient book covers, tag pills, two-column layout, FILL sizing, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bookCard(title: string, author: string, dueDate: string, tags: string[], grad1: string, grad2: string) {
  return frame(`Book: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 14, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.90, g: 0.90, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('Cover', { size: { x: 60, y: 84 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 150)], cornerRadius: 4 }),
      frame('BookInfo', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          text(author, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
          frame('Tags', { autoLayout: horizontal({ spacing: 6 }), children: tags.map(t =>
            frame(`Tag: ${t}`, { autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }), fills: [solid('#eff6ff')], cornerRadius: 4, children: [
              text(t, { fontSize: 10, fontWeight: 600, color: '#3b82f6' }),
            ] })
          ) }),
          text(`Due: ${dueDate}`, { fontSize: 11, fontWeight: 600, color: '#dc2626' }),
        ],
      }),
    ],
  });
}

function filterPill(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
    fills: [solid(active ? '#4338ca' : '#f5f3ff')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.84, g: 0.81, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#6d28d9' })],
  });
}

function searchBar() {
  return frame('SearchBar', {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.88, g: 0.88, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text('Search books, authors, genres...', { fontSize: 13, fontWeight: 400, color: '#a1a1aa' })],
  });
}

export default frame('LibraryCatalogPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf5ff')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#4338ca', position: 0 }, { hex: '#6d28d9', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('City Public Library', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Browse, borrow, and discover', { fontSize: 14, fontWeight: 400, color: '#c4b5fd', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        searchBar(),
        frame('Filters', { autoLayout: horizontal({ spacing: 8 }), children: [
          filterPill('All', true), filterPill('Fiction', false), filterPill('Non-Fiction', false),
          filterPill('Science', false), filterPill('History', false), filterPill('Biography', false),
        ] }),
        frame('Columns', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Col1', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              bookCard('The Great Gatsby', 'F. Scott Fitzgerald', 'Mar 25', ['Fiction', 'Classic'], '#1e40af', '#3b82f6'),
              bookCard('Sapiens', 'Yuval Noah Harari', 'Apr 2', ['Non-Fiction', 'History'], '#065f46', '#059669'),
              bookCard('Dune', 'Frank Herbert', 'Mar 30', ['Sci-Fi', 'Classic'], '#92400e', '#d97706'),
            ] }),
            frame('Col2', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              bookCard('Becoming', 'Michelle Obama', 'Apr 5', ['Biography'], '#9f1239', '#e11d48'),
              bookCard('Atomic Habits', 'James Clear', 'Mar 28', ['Self-Help'], '#7c2d12', '#ea580c'),
              bookCard('The Martian', 'Andy Weir', 'Apr 10', ['Sci-Fi'], '#1e3a5f', '#0369a1'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
