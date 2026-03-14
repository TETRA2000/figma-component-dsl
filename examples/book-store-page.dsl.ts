import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const brown = '#92400e'; const cream = '#fef3c7'; const white = '#ffffff'; const bg = '#fffbeb';
const dark = '#1c1917'; const med = '#78716c'; const amber = '#f59e0b'; const green = '#059669';

function bookCard(title: string, author: string, price: string, rating: string, g1: string, g2: string) {
  return frame(`Book: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 180, y: undefined },
    cornerRadius: 10, clipContent: true, fills: [solid(white)],
    children: [
      rectangle('Cover', { size: { x: 180, y: 260 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('BookInfo', { autoLayout: vertical({ spacing: 4, padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: dark }),
        text(author, { fontSize: 11, fontWeight: 400, color: med }),
        frame('PriceRating', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text(price, { fontSize: 14, fontWeight: 700, color: brown }),
          frame('Rating', { autoLayout: horizontal({ spacing: 3, counterAlign: 'CENTER' }), children: [
            ellipse('Star', { size: { x: 10, y: 10 }, fills: [solid(amber)] }),
            text(rating, { fontSize: 11, fontWeight: 500, color: amber }),
          ]}),
        ]}),
      ]}),
    ],
  });
}

export default frame('BookStore', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('PageTurner', { fontSize: 22, fontWeight: 700, color: brown }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Browse', { fontSize: 14, fontWeight: 600, color: brown }),
          text('New Releases', { fontSize: 14, fontWeight: 400, color: med }),
          text('Bestsellers', { fontSize: 14, fontWeight: 400, color: med }),
          text('My Library', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: horizontal({ padX: 48, padY: 32, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#78350f', position: 0 }, { hex: '#92400e', position: 0.5 }, { hex: '#b45309', position: 1 }], 135)],
      children: [
        rectangle('FeaturedCover', { size: { x: 180, y: 260 },
          fills: [gradient([{ hex: '#dc2626', position: 0 }, { hex: '#b91c1c', position: 1 }], 135)], cornerRadius: 8 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 10 }), children: [
          text('Book of the Month', { fontSize: 12, fontWeight: 600, color: amber, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
          text('The Midnight Library', { fontSize: 32, fontWeight: 700, color: white }),
          text('Matt Haig', { fontSize: 16, fontWeight: 400, color: cream }),
          text('Between life and death there is a library, and within that library, the shelves go on forever.', { fontSize: 14, fontWeight: 400, color: '#fde68a', size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
          frame('BuyBtn', { autoLayout: horizontal({ padX: 20, padY: 10 }), fills: [solid(white)], cornerRadius: 8,
            children: [text('Buy Now · $18.99', { fontSize: 14, fontWeight: 600, color: brown })] }),
        ]}),
      ],
    }),
    frame('BooksSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Bestsellers', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('BookGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          bookCard('Project Hail Mary', 'Andy Weir', '$16.99', '4.8', '#1e40af', '#3b82f6'),
          bookCard('Atomic Habits', 'James Clear', '$14.99', '4.9', '#065f46', '#059669'),
          bookCard('Dune', 'Frank Herbert', '$12.99', '4.7', '#92400e', '#d97706'),
          bookCard('Klara and the Sun', 'Kazuo Ishiguro', '$15.99', '4.5', '#7c3aed', '#a855f7'),
          bookCard('The Song of Achilles', 'Madeline Miller', '$13.99', '4.8', '#be123c', '#f43f5e'),
          bookCard('Circe', 'Madeline Miller', '$14.99', '4.7', '#0e7490', '#06b6d4'),
        ]}),
      ],
    }),
  ],
});
