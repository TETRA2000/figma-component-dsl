import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const cyan = '#0891b2'; const cyanBg = '#ecfeff'; const white = '#ffffff'; const bg = '#f0fdfa';
const dark = '#134e4a'; const med = '#5eead4'; const gray = '#6b7280'; const lightGray = '#94a3b8';
const green = '#059669'; const amber = '#d97706'; const red = '#dc2626'; const blue = '#2563eb';

function taskCard(title: string, tags: [string, string][], assignee: string, priority: string, priorityColor: string) {
  return frame(`Task: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 12 }),
    fills: [solid(white)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.89, g: 0.94, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Tags', { autoLayout: horizontal({ spacing: 6 }), children: tags.map(([t, c]) =>
        frame(`Tag: ${t}`, { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(c, 0.12)], cornerRadius: 4,
          children: [text(t, { fontSize: 11, fontWeight: 500, color: c })] })
      )}),
      text(title, { fontSize: 14, fontWeight: 500, color: '#1e293b' }),
      frame('CardFooter', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        frame('AssigneeRow', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
          ellipse('Ava', { size: { x: 22, y: 22 }, fills: [solid(cyan, 0.2)] }),
          text(assignee, { fontSize: 11, fontWeight: 400, color: lightGray }),
        ]}),
        frame('PriorityBadge', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(priorityColor, 0.1)], cornerRadius: 4,
          children: [text(priority, { fontSize: 10, fontWeight: 600, color: priorityColor })] }),
      ]}),
    ],
  });
}

function kanbanColumn(title: string, count: string, color: string, tasks: ReturnType<typeof frame>[]) {
  return frame(`Column: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 12, padY: 12 }),
    fills: [solid('#f8fafc')], cornerRadius: 12, size: { x: 300, y: undefined },
    children: [
      frame('ColHeader', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        rectangle('ColDot', { size: { x: 10, y: 10 }, fills: [solid(color)], cornerRadius: 5 }),
        text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        frame('ColCount', { autoLayout: horizontal({ padX: 6, padY: 1, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(color, 0.12)], cornerRadius: 9999,
          children: [text(count, { fontSize: 11, fontWeight: 600, color: color })] }),
      ]}),
      ...tasks,
    ],
  });
}

export default frame('ProjectManagement', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid('#f1f5f9')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 24, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          rectangle('LM', { size: { x: 24, y: 24 }, fills: [solid(cyan)], cornerRadius: 6 }),
          text('TaskFlow', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
        ]}),
        frame('ProjectInfo', { autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }), children: [
          text('Website Redesign', { fontSize: 15, fontWeight: 600, color: '#0f172a' }),
          frame('Sprint', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(cyanBg)], cornerRadius: 6,
            children: [text('Sprint 4', { fontSize: 12, fontWeight: 500, color: cyan })] }),
        ]}),
        frame('HeaderActions', { autoLayout: horizontal({ spacing: 12 }), children: [
          frame('FilterBtn', { autoLayout: horizontal({ padX: 12, padY: 6 }), cornerRadius: 6,
            strokes: [{ color: { r: 0.82, g: 0.84, b: 0.86, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [text('Filter', { fontSize: 13, fontWeight: 400, color: gray })] }),
          frame('AddBtn', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(cyan)], cornerRadius: 6,
            children: [text('+ New Task', { fontSize: 13, fontWeight: 600, color: white })] }),
        ]}),
      ],
    }),
    frame('Board', {
      autoLayout: horizontal({ spacing: 16, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        kanbanColumn('Backlog', '5', gray, [
          taskCard('Research competitor pricing', [['Research', blue]], 'Alex', 'Low', green),
          taskCard('Write API documentation', [['Docs', '#8b5cf6']], 'Sarah', 'Medium', amber),
          taskCard('Accessibility audit', [['QA', red]], 'Maya', 'High', red),
        ]),
        kanbanColumn('In Progress', '3', cyan, [
          taskCard('Build user dashboard', [['Frontend', cyan], ['UI', '#8b5cf6']], 'James', 'High', red),
          taskCard('Implement search API', [['Backend', green]], 'Alex', 'Medium', amber),
        ]),
        kanbanColumn('Review', '2', amber, [
          taskCard('Landing page redesign', [['Design', '#ec4899']], 'Maya', 'High', red),
          taskCard('Fix login bug #1234', [['Bug', red]], 'Sarah', 'Critical', '#7c2d12'),
        ]),
        kanbanColumn('Done', '4', green, [
          taskCard('Set up CI/CD pipeline', [['DevOps', '#6366f1']], 'James', 'Medium', amber),
          taskCard('Design system tokens', [['Design', '#ec4899']], 'Maya', 'Low', green),
        ]),
      ],
    }),
  ],
});
