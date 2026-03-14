import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const pink = '#ec4899'; const white = '#ffffff'; const bg = '#fdf2f8'; const dark = '#1e1b4b';
const med = '#6b7280'; const light = '#9ca3af';

function noteCard(title: string, content: string, color: string, tags: string[]) {
  return frame(`Note: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL',
    fills: [solid(white)], cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.9, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('ColorBar', { size: { x: 50, y: 4 }, fills: [solid(color)], cornerRadius: 2 }),
      text(title, { fontSize: 14, fontWeight: 600, color: dark }),
      text(content, { fontSize: 12, fontWeight: 400, color: med, size: { x: 220 }, textAutoResize: 'HEIGHT' as const }),
      frame('Tags', { autoLayout: horizontal({ spacing: 4 }), children: tags.map(t =>
        frame(`T: ${t}`, { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(color, 0.1)], cornerRadius: 4,
          children: [text(t, { fontSize: 10, fontWeight: 500, color })] })
      )}),
    ],
  });
}

function column(title: string, count: string, color: string, cards: ReturnType<typeof noteCard>[]) {
  return frame(`Col: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 0, padY: 0 }), size: { x: 280, y: undefined },
    children: [
      frame('ColHeader', { autoLayout: horizontal({ spacing: 8, padX: 2, padY: 4, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        ellipse('ColDot', { size: { x: 8, y: 8 }, fills: [solid(color)] }),
        text(title, { fontSize: 14, fontWeight: 600, color: dark }),
        frame('Count', { autoLayout: horizontal({ padX: 6, padY: 1 }), fills: [solid(color, 0.15)], cornerRadius: 9999,
          children: [text(count, { fontSize: 11, fontWeight: 600, color })] }),
      ]}),
      ...cards,
    ],
  });
}

export default frame('KanbanNotes', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('NoteFlow', { fontSize: 22, fontWeight: 700, color: pink }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Board', { fontSize: 14, fontWeight: 600, color: pink }),
          text('List', { fontSize: 14, fontWeight: 400, color: med }),
          text('Calendar', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('NewNoteBtn', { autoLayout: horizontal({ padX: 14, padY: 8 }), fills: [solid(pink)], cornerRadius: 8,
          children: [text('New Note', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Board', {
      autoLayout: horizontal({ spacing: 16, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        column('Ideas', '4', '#8b5cf6', [
          noteCard('App redesign concept', 'Explore new color palette and typography for the main dashboard', '#8b5cf6', ['Design', 'High']),
          noteCard('Blog post ideas', 'Write about design tokens and why they matter for scaling', '#8b5cf6', ['Content']),
          noteCard('Plugin architecture', 'Research micro-frontend patterns for the new plugin system', '#8b5cf6', ['Dev', 'Research']),
          noteCard('User survey results', 'Analyze Q1 feedback and create action items', '#8b5cf6', ['Research']),
        ]),
        column('In Progress', '3', '#f59e0b', [
          noteCard('Design system v3', 'Update all components to new design tokens. Currently on button variants.', '#f59e0b', ['Design', 'Urgent']),
          noteCard('Landing page copy', 'Draft hero section and feature descriptions for launch', '#f59e0b', ['Content']),
          noteCard('API documentation', 'Document all REST endpoints with examples and response schemas', '#f59e0b', ['Dev', 'Docs']),
        ]),
        column('Review', '2', '#3b82f6', [
          noteCard('Mobile navigation', 'Bottom tab bar with gesture navigation. Ready for design review.', '#3b82f6', ['Design', 'Mobile']),
          noteCard('Performance audit', 'Core Web Vitals report with optimization recommendations', '#3b82f6', ['Dev']),
        ]),
        column('Done', '3', '#22c55e', [
          noteCard('Brand guidelines', 'Logo usage, spacing rules, and do/dont examples completed', '#22c55e', ['Design']),
          noteCard('Onboarding flow', 'New user onboarding with progress indicators shipped', '#22c55e', ['Design', 'Dev']),
          noteCard('Analytics dashboard', 'Real-time metrics dashboard deployed to production', '#22c55e', ['Dev']),
        ]),
      ],
    }),
  ],
});
