/**
 * Education Student Profile — Avatar, Courses, Stats, Streak & Badges
 * Batch 5, Page 6: Student profile with avatar, enrolled courses, completion stats, streak, badges
 * DSL Features: nested auto-layout, progress bars, FILL sizing, SPACE_BETWEEN
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const BG = '#f8fafc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';
const GREEN = '#16a34a';
const PURPLE = '#7c3aed';
const ORANGE = '#ea580c';

function enrolledCourse(title: string, instructor: string, pct: number, color: string) {
  return frame(`Course: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Course thumbnail
      rectangle('Thumb', {
        size: { x: 56, y: 56 },
        fills: [gradient([
          { hex: color, position: 0 },
          { hex: '#3b82f6', position: 1 },
        ], 135)],
        cornerRadius: 8,
      }),
      // Course info
      frame('Info', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
          text(instructor, { fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY }),
          frame('ProgressRow', {
            autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('Track', {
                size: { x: 200, y: 4 },
                fills: [solid('#e2e8f0')],
                cornerRadius: 2,
                clipContent: true,
                autoLayout: horizontal({ spacing: 0 }),
                layoutSizingHorizontal: 'FILL',
                children: [
                  rectangle('Fill', {
                    size: { x: Math.round(200 * pct / 100), y: 4 },
                    fills: [solid(color)],
                  }),
                ],
              }),
              text(`${pct}%`, { fontSize: 11, fontWeight: 600, color }),
            ],
          }),
        ],
      }),
    ],
  });
}

function profileStat(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function achievementBadge(icon: string, name: string, desc: string, earned: boolean) {
  return frame(`Achievement: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(earned ? '#eff6ff' : '#f8fafc')],
    cornerRadius: 12,
    strokes: [{ color: earned
      ? { r: 0.12, g: 0.25, b: 0.69, a: 0.2 }
      : { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    opacity: earned ? 1 : 0.6,
    children: [
      frame('BadgeIcon', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 44, y: 44 },
        fills: [solid(earned ? BLUE : '#cbd5e1')],
        cornerRadius: 22,
        children: [
          text(icon, { fontSize: 20, fontWeight: 400, color: '#ffffff' }),
        ],
      }),
      text(name, {
        fontSize: 12, fontWeight: 600,
        color: earned ? TEXT_PRIMARY : TEXT_SECONDARY,
        textAlignHorizontal: 'CENTER',
      }),
      text(desc, {
        fontSize: 10, fontWeight: 400,
        color: TEXT_SECONDARY,
        textAlignHorizontal: 'CENTER',
        size: { x: 100 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

export default component('EduStudentProfile', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Profile', { fontSize: 14, fontWeight: 600, color: BLUE }),
            text('Settings', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
          ],
        }),
      ],
    }),

    // Profile Header
    frame('ProfileHeader', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Cover
        frame('Cover', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          size: { x: 1440, y: 160 },
          fills: [gradient([
            { hex: '#1e40af', position: 0 },
            { hex: '#3b82f6', position: 0.5 },
            { hex: '#7c3aed', position: 1 },
          ], 0)],
          children: [],
        }),
        // Profile Info Card
        frame('ProfileInfo', {
          autoLayout: horizontal({ spacing: 24, padX: 60, padY: 24, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Avatar
            rectangle('Avatar', {
              size: { x: 96, y: 96 },
              fills: [gradient([
                { hex: '#1e40af', position: 0 },
                { hex: '#7c3aed', position: 1 },
              ], 135)],
              cornerRadius: 48,
            }),
            // Name and info
            frame('NameInfo', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Alexandra Johnson', { fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY }),
                text('Computer Science · Junior Year', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
                frame('Tags', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    frame('Tag1', {
                      autoLayout: horizontal({ padX: 10, padY: 3 }),
                      fills: [solid('#eff6ff')],
                      cornerRadius: 999,
                      children: [text('Python', { fontSize: 11, fontWeight: 600, color: BLUE })],
                    }),
                    frame('Tag2', {
                      autoLayout: horizontal({ padX: 10, padY: 3 }),
                      fills: [solid('#f0fdf4')],
                      cornerRadius: 999,
                      children: [text('ML/AI', { fontSize: 11, fontWeight: 600, color: GREEN })],
                    }),
                    frame('Tag3', {
                      autoLayout: horizontal({ padX: 10, padY: 3 }),
                      fills: [solid('#faf5ff')],
                      cornerRadius: 999,
                      children: [text('Web Dev', { fontSize: 11, fontWeight: 600, color: PURPLE })],
                    }),
                  ],
                }),
              ],
            }),
            // Stats summary
            frame('ProfileStats', {
              autoLayout: horizontal({ spacing: 24 }),
              children: [
                profileStat('12', 'Courses'),
                profileStat('7', 'Completed'),
                profileStat('4.2', 'GPA'),
              ],
            }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left Column
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Enrolled Courses
            frame('EnrolledCourses', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('SectionHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Enrolled Courses', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                    text('View All →', { fontSize: 13, fontWeight: 500, color: BLUE }),
                  ],
                }),
                enrolledCourse('Machine Learning Basics', 'Dr. Andrew Ng', 72, BLUE),
                enrolledCourse('Data Structures in Python', 'Prof. Sarah Chen', 45, GREEN),
                enrolledCourse('Intro to UX Design', 'Jane Cooper', 88, PURPLE),
                enrolledCourse('Statistics 101', 'Dr. Mark Williams', 20, ORANGE),
              ],
            }),

            // Completion Stats
            frame('CompletionStats', {
              autoLayout: vertical({ spacing: 16, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Completion Overview', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                frame('StatsGrid', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('StatItem1', {
                      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#eff6ff')],
                      cornerRadius: 8,
                      children: [
                        text('142', { fontSize: 28, fontWeight: 700, color: BLUE }),
                        text('Hours Learned', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('StatItem2', {
                      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#f0fdf4')],
                      cornerRadius: 8,
                      children: [
                        text('48', { fontSize: 28, fontWeight: 700, color: GREEN }),
                        text('Assignments', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    frame('StatItem3', {
                      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#fef3c7')],
                      cornerRadius: 8,
                      children: [
                        text('15', { fontSize: 28, fontWeight: 700, color: '#d97706' }),
                        text('Quizzes Passed', { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right Column
        frame('RightCol', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 360, y: undefined },
          children: [
            // Learning Streak
            frame('StreakCard', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [gradient([
                { hex: '#fef3c7', position: 0 },
                { hex: '#fde68a', position: 1 },
              ], 270)],
              cornerRadius: 12,
              children: [
                text('🔥', { fontSize: 32, fontWeight: 400, color: TEXT_PRIMARY }),
                text('23 Day Streak', { fontSize: 20, fontWeight: 700, color: '#92400e' }),
                text('Personal best: 31 days', { fontSize: 13, fontWeight: 400, color: '#a16207' }),
                // Weekly dots
                frame('WeekDots', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) =>
                    frame(`Day${day}${i}`, {
                      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
                      children: [
                        frame(`Dot${i}`, {
                          size: { x: 28, y: 28 },
                          fills: [solid(i < 5 ? GREEN : '#e2e8f0')],
                          cornerRadius: 14,
                          autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                          children: [
                            text(i < 5 ? '✓' : '·', { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
                          ],
                        }),
                        text(day, { fontSize: 10, fontWeight: 500, color: '#92400e' }),
                      ],
                    }),
                  ),
                }),
              ],
            }),

            // Achievement Badges
            frame('Achievements', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Achievement Badges', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                frame('BadgeRow1', {
                  autoLayout: horizontal({ spacing: 10 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    achievementBadge('🚀', 'First Steps', 'Complete 1 course', true),
                    achievementBadge('⚡', 'Fast Learner', '5 lessons in a day', true),
                    achievementBadge('🎯', 'Quiz Pro', 'Score 100% on quiz', true),
                  ],
                }),
                frame('BadgeRow2', {
                  autoLayout: horizontal({ spacing: 10 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    achievementBadge('🌟', 'All Star', 'Complete 10 courses', false),
                    achievementBadge('🤝', 'Helper', 'Answer 50 questions', false),
                    achievementBadge('📚', 'Scholar', 'Get 4.0 GPA', false),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
