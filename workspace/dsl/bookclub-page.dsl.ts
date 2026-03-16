/**
 * Book Club App — Current read, discussion topics, member list, reading progress
 * DSL features: gradient book cover, progress bar, ellipse avatars, nested sections
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function progressBar(pct: number, color: string) {
  return frame('ProgressTrack', {
    size: { x: 300, y: 8 },
    fills: [solid('#e5e7eb')],
    cornerRadius: 4,
    layoutSizingHorizontal: 'FILL',
    clipContent: true,
    children: [
      rectangle('ProgressFill', {
        size: { x: Math.round(300 * pct), y: 8 },
        fills: [solid(color)],
        cornerRadius: 4,
      }),
    ],
  });
}

function memberAvatar(name: string, color: string) {
  return frame(`Member:${name}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse(`Av:${name}`, { size: { x: 40, y: 40 }, fills: [solid(color)] }),
      text(name, { fontSize: 10, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

function discussionTopic(title: string, replies: string, active: boolean) {
  return frame(`Topic:${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(active ? '#eff6ff' : '#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TopicInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: '#1f2937' }),
          text(replies, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      ...(active ? [frame('ActiveDot', {
        autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
        fills: [solid('#3b82f6')],
        cornerRadius: 9999,
        children: [text('Active', { fontSize: 10, fontWeight: 600, color: '#ffffff' })],
      })] : []),
    ],
  });
}

export default frame('BookClubPage', {
  size: { x: 960 },
  autoLayout: vertical({ spacing: 28, padX: 40, padY: 36 }),
  fills: [solid('#faf5ff')],
  children: [
    text('Pageturners Book Club', { fontSize: 26, fontWeight: 700, color: '#1f2937' }),
    frame('CurrentRead', {
      autoLayout: horizontal({ spacing: 24, padX: 24, padY: 24 }),
      fills: [solid('#ffffff')],
      cornerRadius: 14,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.88, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        rectangle('BookCover', {
          size: { x: 140, y: 200 },
          fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#4f46e5', position: 0.5 }, { hex: '#1e40af', position: 1 }], 160)],
          cornerRadius: 8,
        }),
        frame('BookDetails', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('NowReading', {
              autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
              fills: [solid('#7c3aed')],
              cornerRadius: 4,
              children: [text('Now Reading', { fontSize: 10, fontWeight: 600, color: '#ffffff' })],
            }),
            text('The Midnight Library', { fontSize: 22, fontWeight: 700, color: '#1f2937' }),
            text('by Matt Haig', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            text('Between life and death there is a library, and within that library, the shelves go on forever.', { fontSize: 13, fontWeight: 400, color: '#6b7280', lineHeight: { value: 150, unit: 'PERCENT' }, size: { x: 400 }, textAutoResize: 'HEIGHT' }),
            frame('ProgressSection', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('ProgressLabel', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Reading Progress', { fontSize: 12, fontWeight: 500, color: '#374151' }),
                    text('68%', { fontSize: 12, fontWeight: 600, color: '#7c3aed' }),
                  ],
                }),
                progressBar(0.68, '#7c3aed'),
              ],
            }),
          ],
        }),
      ],
    }),
    frame('BottomSections', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Discussions', {
          autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Discussion Topics', { fontSize: 16, fontWeight: 600, color: '#1f2937' }),
            discussionTopic('Nora\'s first library visit', '23 replies', true),
            discussionTopic('The concept of parallel lives', '18 replies', false),
            discussionTopic('Favorite alternate life?', '31 replies', true),
            discussionTopic('Themes of regret', '12 replies', false),
          ],
        }),
        frame('Members', {
          autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            text('Members (8)', { fontSize: 16, fontWeight: 600, color: '#1f2937' }),
            frame('MemberGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                memberAvatar('Alice', '#7c3aed'),
                memberAvatar('Ben', '#3b82f6'),
                memberAvatar('Clara', '#ec4899'),
                memberAvatar('David', '#10b981'),
              ],
            }),
            frame('MemberGrid2', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                memberAvatar('Emma', '#f59e0b'),
                memberAvatar('Frank', '#6366f1'),
                memberAvatar('Grace', '#ef4444'),
                memberAvatar('Henry', '#14b8a6'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
