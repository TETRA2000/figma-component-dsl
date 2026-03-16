/**
 * Education Platform — Deep nesting, progress bars, achievements
 * DSL features: deep nesting (3+ levels), varied lineHeight, text-heavy
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function courseCard(title: string, instructor: string, progress: number, lessons: string, color: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('CourseCover', {
        size: { x: 1, y: 120 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: '#1e1b4b', position: 1 }], 135)],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
      }),
      text(title, { fontSize: 16, fontWeight: 600, color: '#111827' }),
      text(instructor, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
      frame('ProgressSection', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ProgressHeader', {
            autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(`${progress}% complete`, { fontSize: 12, fontWeight: 500, color: color }),
              text(lessons, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
          frame('ProgressTrack', {
            size: { x: 1, y: 6 },
            fills: [solid('#f3f4f6')],
            cornerRadius: 3,
            layoutSizingHorizontal: 'FILL',
            clipContent: true,
            children: [
              rectangle('Fill', { size: { x: Math.round(progress * 2.8), y: 6 }, fills: [solid(color)], cornerRadius: 3 }),
            ],
          }),
        ],
      }),
    ],
  });
}

function lessonItem(num: number, title: string, duration: string, done: boolean) {
  return frame(`Lesson ${num}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    opacity: done ? 0.6 : 1,
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('LessonNum', {
        size: { x: 28, y: 28 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(done ? '#7c3aed' : '#f3f4f6')],
        cornerRadius: 14,
        children: [
          text(done ? '\u2713' : String(num), {
            fontSize: 12, fontWeight: 600,
            color: done ? '#ffffff' : '#6b7280',
            textAlignHorizontal: 'CENTER',
          }),
        ],
      }),
      frame('LessonInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 500, color: '#111827', textDecoration: done ? 'STRIKETHROUGH' : 'NONE' }),
          text(duration, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function achievementBadge(label: string, color: string) {
  return frame(`Badge: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 12, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      ellipse('BadgeCircle', { size: { x: 48, y: 48 }, fills: [solid(color)] }),
      text(label, { fontSize: 11, fontWeight: 600, color: '#374151', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('EducationPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 32 }),
  fills: [solid('#f9fafb')],
  children: [
    text('Learning Hub', { fontSize: 28, fontWeight: 700, color: '#111827' }),
    frame('SearchBar', {
      autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12 }),
      fills: [solid('#ffffff')],
      cornerRadius: 10,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.90, g: 0.90, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Search courses, topics, instructors...', { fontSize: 14, fontWeight: 400, color: '#9ca3af', layoutSizingHorizontal: 'FILL' }),
      ],
    }),
    frame('CoursesSection', {
      autoLayout: vertical({ spacing: 16, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Continue Learning', { fontSize: 20, fontWeight: 600, color: '#111827' }),
        frame('CourseGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            courseCard('Web Development', 'Sarah Johnson', 65, '12 of 20 lessons', '#7c3aed'),
            courseCard('UI Design Mastery', 'Alex Chen', 40, '8 of 18 lessons', '#f59e0b'),
            courseCard('Data Science Fundamentals', 'Dr. Maria Lopez', 85, '17 of 20 lessons', '#3b82f6'),
          ],
        }),
      ],
    }),
    frame('TwoCol', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('CurrentLesson', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Current Module: React Hooks', { fontSize: 16, fontWeight: 600, color: '#111827' }),
            lessonItem(1, 'Introduction to useState', '12 min', true),
            lessonItem(2, 'useEffect Deep Dive', '18 min', true),
            lessonItem(3, 'Custom Hooks Patterns', '15 min', false),
            lessonItem(4, 'useContext & Global State', '20 min', false),
            lessonItem(5, 'Performance with useMemo', '14 min', false),
          ],
        }),
        frame('Achievements', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            text('Achievements', { fontSize: 16, fontWeight: 600, color: '#111827' }),
            frame('BadgeGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                achievementBadge('Fast Learner', '#f59e0b'),
                achievementBadge('Streak Master', '#ef4444'),
                achievementBadge('Top Student', '#7c3aed'),
                achievementBadge('Completist', '#10b981'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
