/**
 * Student Portal — Grades table, upcoming tests, and announcements
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function gradeRow(subject: string, grade: string, percent: string, color: string) {
  return frame(`Grade: ${subject}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 16, padY: 12 }),
    fills: [solid('#ffffff')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    cornerRadius: 8,
    children: [
      text(subject, { fontSize: 14, fontWeight: 500, color: '#1e293b' }),
      frame('GradeBadge', { autoLayout: horizontal({ padX: 12, padY: 4 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [
        text(`${grade}  ${percent}`, { fontSize: 13, fontWeight: 700, color }),
      ] }),
    ],
  });
}

function testCard(subject: string, date: string, daysLeft: number) {
  const urgent = daysLeft <= 2;
  return frame(`Test: ${subject}`, {
    autoLayout: vertical({ spacing: 6, padX: 14, padY: 14 }),
    fills: [solid(urgent ? '#fef2f2' : '#f0fdf4')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(subject, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
      text(date, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      frame('DaysLeft', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(urgent ? '#ef4444' : '#22c55e')], cornerRadius: 9999, children: [
        text(`${daysLeft} days left`, { fontSize: 11, fontWeight: 600, color: '#ffffff' }),
      ] }),
    ],
  });
}

function announcement(title: string, preview: string, date: string) {
  return frame(`Announce: ${title}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Row', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(date, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      text(preview, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

export default frame('SchoolPortalPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 20 }),
      fills: [gradient([{ hex: '#1e40af', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('EduPortal', { fontSize: 24, fontWeight: 800, color: '#ffffff' }),
        frame('Student', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [solid('#ffffff33')] }),
          text('Alex Johnson — Grade 11', { fontSize: 13, fontWeight: 500, color: '#ffffffcc' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Current Grades', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            gradeRow('Mathematics', 'A', '94%', '#22c55e'),
            gradeRow('English Literature', 'B+', '87%', '#3b82f6'),
            gradeRow('Physics', 'A-', '91%', '#22c55e'),
            gradeRow('History', 'B', '83%', '#f59e0b'),
            gradeRow('Computer Science', 'A+', '98%', '#8b5cf6'),
            text('Announcements', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            announcement('Science Fair Registration', 'Sign up by Friday to participate in the annual science fair...', 'Mar 12'),
            announcement('Spring Break Schedule', 'Campus will be closed March 24 – April 1. Library hours...', 'Mar 10'),
          ],
        }),
        frame('RightCol', {
          autoLayout: vertical({ spacing: 14 }),
          size: { x: 280 },
          children: [
            text('Upcoming Tests', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            testCard('Physics — Ch. 8 Quiz', 'March 18, 2026', 2),
            testCard('Math — Midterm Exam', 'March 22, 2026', 6),
            testCard('English — Essay Due', 'March 25, 2026', 9),
            testCard('History — Unit Test', 'March 28, 2026', 12),
          ],
        }),
      ],
    }),
  ],
});
