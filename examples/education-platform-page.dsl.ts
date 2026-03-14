import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const purple = '#6d28d9';
const purpleLight = '#8b5cf6';
const purpleBg = '#f5f3ff';
const white = '#ffffff';
const bg = '#fafafa';
const dark = '#1f2937';
const med = '#6b7280';
const green = '#059669';
const blue = '#2563eb';
const orange = '#ea580c';

function courseCard(title: string, instructor: string, progress: number, lessons: string, grad1: string, grad2: string) {
  return frame(`Course: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 320, y: undefined },
    cornerRadius: 16,
    clipContent: true,
    fills: [solid(white)],
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('Thumbnail', {
        size: { x: 320, y: 160 },
        fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)],
      }),
      frame('CourseInfo', {
        autoLayout: vertical({ spacing: 10, padX: 20, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: dark }),
          text(instructor, { fontSize: 13, fontWeight: 400, color: med }),
          frame('ProgressSection', {
            autoLayout: vertical({ spacing: 4 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('ProgressHeader', {
                autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                layoutSizingHorizontal: 'FILL',
                children: [
                  text(lessons, { fontSize: 12, fontWeight: 400, color: med }),
                  text(`${progress}%`, { fontSize: 12, fontWeight: 600, color: purple }),
                ],
              }),
              frame('ProgressTrack', {
                size: { x: 1, y: 6 },
                fills: [solid('#e5e7eb')],
                cornerRadius: 3,
                layoutSizingHorizontal: 'FILL',
                clipContent: true,
                autoLayout: horizontal({ spacing: 0 }),
                children: [
                  rectangle('ProgressFill', {
                    size: { x: Math.round(280 * progress / 100), y: 6 },
                    fills: [gradient([{ hex: purple, position: 0 }, { hex: purpleLight, position: 1 }], 90)],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function achievementBadge(label: string, icon: string, color: string) {
  return frame(`Badge: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    size: { x: 120, y: undefined },
    children: [
      ellipse('BadgeIcon', { size: { x: 40, y: 40 }, fills: [solid(color, 0.15)] }),
      text(icon, { fontSize: 12, fontWeight: 600, color: color, textAlignHorizontal: 'CENTER' as const }),
      text(label, { fontSize: 11, fontWeight: 400, color: med, textAlignHorizontal: 'CENTER' as const }),
    ],
  });
}

function scheduleItem(time: string, subject: string, teacher: string) {
  return frame(`Schedule: ${time}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    cornerRadius: 8,
    children: [
      frame('TimeSlot', {
        autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(purpleBg)],
        cornerRadius: 6,
        children: [
          text(time, { fontSize: 12, fontWeight: 600, color: purple }),
        ],
      }),
      frame('SubjectInfo', {
        autoLayout: vertical({ spacing: 1 }),
        children: [
          text(subject, { fontSize: 14, fontWeight: 500, color: dark }),
          text(teacher, { fontSize: 12, fontWeight: 400, color: med }),
        ],
      }),
    ],
  });
}

export default frame('EducationPlatform', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('LogoMark', { size: { x: 28, y: 28 }, fills: [solid(purple)] }),
            text('LearnHub', { fontSize: 18, fontWeight: 700, color: dark }),
          ],
        }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 600, color: purple }),
            text('Courses', { fontSize: 14, fontWeight: 400, color: med }),
            text('Schedule', { fontSize: 14, fontWeight: 400, color: med }),
            text('Community', { fontSize: 14, fontWeight: 400, color: med }),
          ],
        }),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('WelcomeBanner', {
              autoLayout: horizontal({ spacing: 0, padX: 32, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              fills: [gradient([{ hex: purple, position: 0 }, { hex: '#4338ca', position: 1 }], 135)],
              cornerRadius: 16,
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('BannerText', {
                  autoLayout: vertical({ spacing: 8 }),
                  children: [
                    text('Welcome back, Alex!', { fontSize: 22, fontWeight: 700, color: white }),
                    text('Continue your learning journey', { fontSize: 14, fontWeight: 400, color: '#c4b5fd' }),
                  ],
                }),
                frame('Stats', {
                  autoLayout: horizontal({ spacing: 24 }),
                  children: [
                    frame('Stat', {
                      autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
                      children: [
                        text('12', { fontSize: 28, fontWeight: 700, color: white }),
                        text('Courses', { fontSize: 12, fontWeight: 400, color: '#c4b5fd' }),
                      ],
                    }),
                    frame('Stat2', {
                      autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
                      children: [
                        text('89%', { fontSize: 28, fontWeight: 700, color: white }),
                        text('Avg Score', { fontSize: 12, fontWeight: 400, color: '#c4b5fd' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            text('In Progress', { fontSize: 18, fontWeight: 600, color: dark }),
            frame('CourseGrid', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                courseCard('Advanced TypeScript', 'Sarah Johnson', 68, '24 of 36 lessons', purple, '#4338ca'),
                courseCard('Design Systems', 'Alex Rivera', 42, '8 of 20 lessons', blue, '#1d4ed8'),
                courseCard('Data Visualization', 'Maya Patel', 91, '28 of 30 lessons', green, '#047857'),
              ],
            }),
          ],
        }),
        frame('RightCol', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 340, y: undefined },
          children: [
            frame('Achievements', {
              autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
              fills: [solid(white)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Achievements', { fontSize: 16, fontWeight: 600, color: dark }),
                frame('BadgeRow', {
                  autoLayout: horizontal({ spacing: 8, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    achievementBadge('Streak', '7 days', orange),
                    achievementBadge('Top 10%', 'Score', green),
                    achievementBadge('Mentor', 'Helped 5', blue),
                  ],
                }),
              ],
            }),
            frame('TodaySchedule', {
              autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
              fills: [solid(white)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              children: [
                text("Today's Schedule", { fontSize: 16, fontWeight: 600, color: dark }),
                scheduleItem('9:00', 'TypeScript Workshop', 'Sarah Johnson'),
                scheduleItem('11:00', 'Design Review', 'Alex Rivera'),
                scheduleItem('14:00', 'Data Lab', 'Maya Patel'),
                scheduleItem('16:00', 'Group Project', 'Team Alpha'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
