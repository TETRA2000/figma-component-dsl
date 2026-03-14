import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const emerald = '#059669'; const emeraldBg = '#ecfdf5'; const white = '#ffffff'; const bg = '#f9fafb';
const dark = '#111827'; const med = '#6b7280'; const light = '#9ca3af'; const blue = '#3b82f6';

function threadCard(title: string, author: string, replies: string, views: string, tag: string, tagColor: string, isPinned: boolean) {
  return frame(`Thread: ${title.substring(0, 20)}`, {
    autoLayout: horizontal({ padX: 16, padY: 14, spacing: 14, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)],
    cornerRadius: 10,
    strokes: isPinned ? [{ color: { r: 0.02, g: 0.59, b: 0.4, a: 0.3 }, weight: 2, align: 'INSIDE' as const }]
      : [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ThreadLeft', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        ellipse('AuthorAvatar', { size: { x: 36, y: 36 }, fills: [solid(tagColor, 0.15)] }),
        frame('ThreadInfo', { autoLayout: vertical({ spacing: 3 }), children: [
          frame('TitleRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
            ...(isPinned ? [frame('PinnedBadge', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(emerald)], cornerRadius: 4,
              children: [text('Pinned', { fontSize: 10, fontWeight: 600, color: white })] })] : []),
            text(title, { fontSize: 15, fontWeight: 600, color: dark }),
          ]}),
          frame('MetaRow', { autoLayout: horizontal({ spacing: 10 }), children: [
            text(author, { fontSize: 12, fontWeight: 500, color: med }),
            frame('Tag', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(tagColor, 0.1)], cornerRadius: 4,
              children: [text(tag, { fontSize: 11, fontWeight: 500, color: tagColor })] }),
          ]}),
        ]}),
      ]}),
      frame('ThreadStats', { autoLayout: horizontal({ spacing: 20 }), children: [
        frame('Replies', { autoLayout: vertical({ spacing: 1, counterAlign: 'CENTER' }), children: [
          text(replies, { fontSize: 16, fontWeight: 700, color: dark }),
          text('replies', { fontSize: 11, fontWeight: 400, color: light }),
        ]}),
        frame('Views', { autoLayout: vertical({ spacing: 1, counterAlign: 'CENTER' }), children: [
          text(views, { fontSize: 16, fontWeight: 700, color: dark }),
          text('views', { fontSize: 11, fontWeight: 400, color: light }),
        ]}),
      ]}),
    ],
  });
}

export default frame('ForumCommunity', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('DevForum', { fontSize: 22, fontWeight: 700, color: emerald }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Discussions', { fontSize: 14, fontWeight: 600, color: emerald }),
          text('Categories', { fontSize: 14, fontWeight: 400, color: med }),
          text('Members', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('NewPostBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(emerald)], cornerRadius: 8,
          children: [text('New Thread', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ThreadList', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
          frame('ListHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text('Recent Discussions', { fontSize: 20, fontWeight: 700, color: dark }),
            text('Sort: Latest', { fontSize: 13, fontWeight: 400, color: med }),
          ]}),
          threadCard('Welcome! Introduce yourself here', 'Admin', '234', '5.6K', 'General', emerald, true),
          threadCard('Best practices for React Server Components', 'sarah_dev', '89', '3.2K', 'React', blue, false),
          threadCard('How to structure a monorepo in 2026?', 'code_ninja', '56', '2.1K', 'Architecture', '#7c3aed', false),
          threadCard('TypeScript 6.0 — First impressions', 'ts_lover', '142', '8.4K', 'TypeScript', '#2563eb', false),
          threadCard('Database migration strategies for production', 'db_guru', '33', '1.5K', 'Backend', '#ea580c', false),
          threadCard('CSS Container Queries deep dive', 'style_master', '67', '2.8K', 'CSS', '#ec4899', false),
        ]}),
        frame('Sidebar', { autoLayout: vertical({ spacing: 16 }), size: { x: 280, y: undefined }, children: [
          frame('Categories', {
            autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(white)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
            children: [
              text('Categories', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('CatList', { autoLayout: vertical({ spacing: 6 }), children: [
                text('React (234 threads)', { fontSize: 13, fontWeight: 400, color: blue }),
                text('TypeScript (189 threads)', { fontSize: 13, fontWeight: 400, color: '#2563eb' }),
                text('Node.js (156 threads)', { fontSize: 13, fontWeight: 400, color: emerald }),
                text('CSS (98 threads)', { fontSize: 13, fontWeight: 400, color: '#ec4899' }),
                text('Architecture (87 threads)', { fontSize: 13, fontWeight: 400, color: '#7c3aed' }),
              ]}),
            ],
          }),
          frame('TopMembers', {
            autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(white)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
            children: [
              text('Top Members', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('MemberList', { autoLayout: vertical({ spacing: 8 }), children: [
                frame('M1', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
                  ellipse('A1', { size: { x: 28, y: 28 }, fills: [solid(emerald, 0.15)] }),
                  frame('M1Info', { autoLayout: vertical({ spacing: 0 }), children: [
                    text('sarah_dev', { fontSize: 13, fontWeight: 500, color: dark }),
                    text('892 posts', { fontSize: 11, fontWeight: 400, color: light }),
                  ]}),
                ]}),
                frame('M2', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
                  ellipse('A2', { size: { x: 28, y: 28 }, fills: [solid(blue, 0.15)] }),
                  frame('M2Info', { autoLayout: vertical({ spacing: 0 }), children: [
                    text('code_ninja', { fontSize: 13, fontWeight: 500, color: dark }),
                    text('654 posts', { fontSize: 11, fontWeight: 400, color: light }),
                  ]}),
                ]}),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
