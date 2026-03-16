/**
 * Tutoring Platform — Subject cards, tutor profiles, and scheduling
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function subjectCard(name: string, tutors: number, color: string) {
  return frame(`Subject: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SubjectIcon', { size: { x: 44, y: 44 }, autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }), fills: [solid(color + '15')], cornerRadius: 12, children: [
        text(name.charAt(0), { fontSize: 20, fontWeight: 700, color }),
      ] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      text(`${tutors} tutors available`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}

function tutorProfile(name: string, subject: string, rating: string, rate: string, color: string) {
  return frame(`Tutor: ${name}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', { size: { x: 48, y: 48 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#6366f1', position: 1 }], 135)] }),
      frame('Info', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(subject, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        frame('Stats', { autoLayout: horizontal({ spacing: 10 }), children: [
          text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
          text(`${rate}/hr`, { fontSize: 12, fontWeight: 700, color: '#6366f1' }),
        ] }),
      ] }),
      frame('BookBtn', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid('#6366f1')], cornerRadius: 8, children: [
        text('Book', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
      ] }),
    ],
  });
}

function timeSlot(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#eef2ff' : '#f1f5f9')],
    cornerRadius: 8,
    children: [text(time, { fontSize: 12, fontWeight: 600, color: available ? '#6366f1' : '#94a3b8' })],
  });
}

export default frame('TutoringPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32 }),
      fills: [gradient([{ hex: '#312e81', position: 0 }, { hex: '#6366f1', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('BrainBoost Tutoring', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Expert 1-on-1 tutoring for all subjects and levels', { fontSize: 14, fontWeight: 400, color: '#c7d2fe' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Subjects', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Browse Subjects', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('SubjectGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              subjectCard('Mathematics', 24, '#ef4444'),
              subjectCard('Physics', 18, '#3b82f6'),
              subjectCard('English', 31, '#8b5cf6'),
              subjectCard('Chemistry', 15, '#059669'),
              subjectCard('History', 12, '#f59e0b'),
            ] }),
          ],
        }),
        frame('Tutors', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Top Rated Tutors', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            tutorProfile('Dr. Emily Hart', 'Mathematics & Calculus', '4.9', '$65', '#ef4444'),
            tutorProfile('James Liu', 'Physics & Engineering', '4.8', '$55', '#3b82f6'),
            tutorProfile('Priya Desai', 'English & Essay Writing', '5.0', '$50', '#8b5cf6'),
          ],
        }),
        frame('Schedule', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Available Time Slots — Today', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            frame('Slots', { autoLayout: horizontal({ spacing: 8 }), children: [
              timeSlot('9:00 AM', true), timeSlot('10:30 AM', false), timeSlot('12:00 PM', true),
              timeSlot('2:00 PM', true), timeSlot('3:30 PM', false), timeSlot('5:00 PM', true),
              timeSlot('7:00 PM', true),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
