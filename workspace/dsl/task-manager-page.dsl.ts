/**
 * Task Manager — Kanban board with columns and task cards
 * DSL features: multi-column horizontal layout, colored top borders, priority badges, ellipse avatars, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, horizontal, vertical } from '@figma-dsl/core';

function priorityBadge(priority: string) {
  const colors: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
  return frame(`Priority: ${priority}`, {
    autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
    fills: [solid(colors[priority] + '1a')],
    cornerRadius: 4,
    children: [
      text(priority.charAt(0).toUpperCase() + priority.slice(1), { fontSize: 11, fontWeight: 600, color: colors[priority] }),
    ],
  });
}

function taskCard(title: string, desc: string, priority: string, assignee: string, dueDate: string, assigneeColor: string) {
  return frame(`Task: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#64748b', lineHeight: { value: 140, unit: 'PERCENT' }, size: { x: 220 }, textAutoResize: 'HEIGHT' }),
      frame('CardFooter', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          priorityBadge(priority),
          frame('AssigneeRow', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              ellipse(`Av:${assignee}`, { size: { x: 22, y: 22 }, fills: [solid(assigneeColor)] }),
              text(dueDate, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function kanbanColumn(title: string, count: number, color: string, cards: ReturnType<typeof taskCard>[]) {
  return frame(`Column: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ColumnBar', { size: { x: 1, y: 3 }, fills: [solid(color)], layoutSizingHorizontal: 'FILL' }),
      frame('ColumnHeader', {
        autoLayout: horizontal({ spacing: 8, padX: 4, padY: 8, counterAlign: 'CENTER' }),
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          frame('CountBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2 }),
            fills: [solid('#f1f5f9')],
            cornerRadius: 9999,
            children: [
              text(String(count), { fontSize: 12, fontWeight: 500, color: '#64748b' }),
            ],
          }),
        ],
      }),
      frame('Cards', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: cards,
      }),
    ],
  });
}

function teamChip(name: string, initials: string, color: string) {
  return frame(`Member: ${name}`, {
    autoLayout: horizontal({ spacing: 6, padX: 10, padY: 5, counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`Av:${initials}`, { size: { x: 20, y: 20 }, fills: [solid(color)] }),
      text(name, { fontSize: 12, fontWeight: 500, color: '#475569' }),
    ],
  });
}

export default frame('TaskManagerPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 24, padX: 32, padY: 24 }),
  fills: [solid('#f1f5f9')],
  children: [
    frame('PageHeader', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Project Board', { fontSize: 24, fontWeight: 700, color: '#0f172a' }),
        frame('TeamRow', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            teamChip('Alice', 'AL', '#3b82f6'),
            teamChip('Bob', 'BO', '#10b981'),
            teamChip('Carol', 'CA', '#f59e0b'),
          ],
        }),
      ],
    }),
    frame('Board', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        kanbanColumn('To Do', 3, '#3b82f6', [
          taskCard('Design system audit', 'Review all components for consistency and update tokens', 'high', 'AL', 'Mar 18', '#3b82f6'),
          taskCard('API documentation', 'Write OpenAPI specs for the new endpoints', 'medium', 'BO', 'Mar 20', '#10b981'),
          taskCard('Unit test coverage', 'Increase test coverage to 80% for core modules', 'low', 'CA', 'Mar 22', '#f59e0b'),
        ]),
        kanbanColumn('In Progress', 2, '#f59e0b', [
          taskCard('Auth flow refactor', 'Migrate from session-based to JWT tokens', 'high', 'BO', 'Mar 17', '#10b981'),
          taskCard('Dashboard redesign', 'Implement the new analytics dashboard layout', 'medium', 'AL', 'Mar 19', '#3b82f6'),
        ]),
        kanbanColumn('Done', 2, '#10b981', [
          taskCard('CI pipeline setup', 'Configure GitHub Actions for automated testing', 'high', 'CA', 'Mar 15', '#f59e0b'),
          taskCard('Onboarding wizard', 'New user onboarding flow with 5 steps', 'medium', 'AL', 'Mar 14', '#3b82f6'),
        ]),
      ],
    }),
  ],
});
