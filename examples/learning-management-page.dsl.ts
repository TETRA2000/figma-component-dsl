import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const blue = '#2563eb'; const blueBg = '#eff6ff'; const white = '#ffffff'; const bg = '#f8fafc';
const dark = '#0f172a'; const med = '#64748b'; const green = '#16a34a'; const amber = '#d97706';

function courseCard(title: string, instructor: string, lessons: string, progress: number, g1: string, g2: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(white)],
    children: [
      rectangle('CourseImg', { size: { x: 300, y: 160 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('CourseInfo', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 15, fontWeight: 600, color: dark }),
        frame('InstructorRow', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          ellipse('InstrAvatar', { size: { x: 20, y: 20 }, fills: [solid(blue, 0.15)] }),
          text(instructor, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
        text(lessons, { fontSize: 12, fontWeight: 400, color: med }),
        frame('ProgressBar', { autoLayout: horizontal({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
          rectangle('ProgressFill', { size: { x: Math.round(268 * progress / 100), y: 6 }, fills: [solid(blue)], cornerRadius: 3 }),
          rectangle('ProgressBg', { size: { x: Math.round(268 * (100 - progress) / 100), y: 6 }, fills: [solid(blueBg)], cornerRadius: 3 }),
        ]}),
        text(`${progress}% complete`, { fontSize: 11, fontWeight: 500, color: blue }),
      ]}),
    ],
  });
}

function statItem(label: string, value: string, color: string) {
  return frame(`LmsStat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }), fills: [solid(white)],
    cornerRadius: 10, layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 24, fontWeight: 700, color }),
      text(label, { fontSize: 12, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('LearningMgmt', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('LearnHub', { fontSize: 22, fontWeight: 700, color: blue }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('My Courses', { fontSize: 14, fontWeight: 600, color: blue }),
          text('Browse', { fontSize: 14, fontWeight: 400, color: med }),
          text('Certificates', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('WelcomeBanner', {
      autoLayout: horizontal({ padX: 48, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1e40af', position: 0 }, { hex: '#2563eb', position: 0.5 }, { hex: '#60a5fa', position: 1 }], 135)],
      children: [
        frame('WelcomeText', { autoLayout: vertical({ spacing: 8 }), children: [
          text('Welcome back, Alex!', { fontSize: 28, fontWeight: 700, color: white }),
          text('You have 3 courses in progress. Keep up the great work!', { fontSize: 15, fontWeight: 400, color: '#bfdbfe' }),
          frame('ContinueBtn', { autoLayout: horizontal({ padX: 20, padY: 10 }), fills: [solid(white)], cornerRadius: 8,
            children: [text('Continue Learning', { fontSize: 14, fontWeight: 600, color: blue })] }),
        ]}),
        frame('StatsRow', { autoLayout: horizontal({ spacing: 12 }), children: [
          statItem('Courses', '12', blue),
          statItem('Hours', '86', green),
          statItem('Certificates', '4', amber),
        ]}),
      ],
    }),
    frame('CoursesSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Continue Learning', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('CourseGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          courseCard('Advanced React Patterns', 'Sarah Chen', '24 lessons', 68, '#2563eb', '#1d4ed8'),
          courseCard('Python for Data Science', 'Dr. James Wu', '36 lessons', 42, '#059669', '#047857'),
          courseCard('UX Design Fundamentals', 'Maya Patel', '18 lessons', 85, '#7c3aed', '#6d28d9'),
          courseCard('Cloud Architecture', 'Alex Rivera', '30 lessons', 15, '#ea580c', '#c2410c'),
        ]}),
      ],
    }),
  ],
});
