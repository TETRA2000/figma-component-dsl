/**
 * Book Club — Current read, discussion board, and reading list
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function bookCard(title: string, author: string, pages: string, genre: string, color: string, current: boolean) {
  return frame(`Book: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 14, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(current ? '#fefce8' : '#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Cover', { size: { x: 48, y: 68 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#1e293b', position: 1 }], 160)], cornerRadius: 4 }),
      frame('Info', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(author, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        frame('Tags', { autoLayout: horizontal({ spacing: 6 }), children: [
          frame('GenreBadge', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [text(genre, { fontSize: 10, fontWeight: 600, color })] }),
          text(pages, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
        ] }),
      ] }),
    ],
  });
}

function discussionPost(user: string, message: string, time: string) {
  return frame(`Post: ${user}`, {
    autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [solid('#dbeafe')] }),
      frame('PostContent', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        frame('PostHeader', { autoLayout: horizontal({ spacing: 8 }), children: [
          text(user, { fontSize: 12, fontWeight: 600, color: '#1e293b' }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
        ] }),
        text(message, { fontSize: 12, fontWeight: 400, color: '#475569' }),
      ] }),
    ],
  });
}

export default frame('BookClubPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fefce8')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 32, padY: 24 }),
      fills: [gradient([{ hex: '#78350f', position: 0 }, { hex: '#b45309', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('PageTurners Book Club', { fontSize: 24, fontWeight: 800, color: '#fef3c7' }),
        text('A chapter a day keeps boredom away', { fontSize: 13, fontWeight: 400, color: '#fde68a99' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('CurrentRead', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Currently Reading', { fontSize: 18, fontWeight: 700, color: '#78350f' }),
            frame('CurrentBook', {
              autoLayout: horizontal({ spacing: 20, padX: 18, padY: 18 }),
              fills: [solid('#ffffff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              children: [
                rectangle('BigCover', { size: { x: 100, y: 150 }, fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#1e293b', position: 1 }], 160)], cornerRadius: 8 }),
                frame('BookDetails', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
                  text('Project Hail Mary', { fontSize: 20, fontWeight: 700, color: '#1e293b' }),
                  text('Andy Weir', { fontSize: 14, fontWeight: 500, color: '#7c3aed' }),
                  text('A lone astronaut must save Earth from disaster in this gripping sci-fi adventure full of humor and heart.', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
                  frame('Progress', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
                    rectangle('ProgressBar', { size: { x: 200, y: 6 }, fills: [solid('#e2e8f0')], cornerRadius: 3 }),
                    text('67% complete', { fontSize: 11, fontWeight: 600, color: '#7c3aed' }),
                  ] }),
                  text('Discussion: March 22, 2026', { fontSize: 12, fontWeight: 600, color: '#b45309' }),
                ] }),
              ],
            }),
          ],
        }),
        frame('Discussion', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Discussion Board', { fontSize: 18, fontWeight: 700, color: '#78350f' }),
            discussionPost('Emma K.', 'Chapter 12 was absolutely wild! Did not see that twist coming.', '2h ago'),
            discussionPost('Carlos R.', 'The science explanations are so fun. Weir makes astrophysics entertaining.', '5h ago'),
            discussionPost('Priya S.', 'Rocky is my favorite character of all time. Fist my bump!', '1d ago'),
          ],
        }),
        frame('ReadingList', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Up Next', { fontSize: 18, fontWeight: 700, color: '#78350f' }),
            bookCard('Klara and the Sun', 'Kazuo Ishiguro', '320 pages', 'Literary Fiction', '#f59e0b', false),
            bookCard('The Midnight Library', 'Matt Haig', '304 pages', 'Fantasy', '#8b5cf6', false),
            bookCard('Piranesi', 'Susanna Clarke', '272 pages', 'Mystery', '#059669', false),
          ],
        }),
      ],
    }),
  ],
});
