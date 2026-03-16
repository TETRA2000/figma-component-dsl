/**
 * Language Learning — Duolingo-style app with lesson cards, streak counter, and progress rings
 * DSL features stressed: mobile-width layout (600px), ellipse progress rings, gradient level badges,
 * bright playful colors, pill XP badges, streak fire indicators
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function lessonCard(title: string, desc: string, progress: number, icon: string, color: string, locked: boolean) {
  const pctWidth = Math.round(progress * 2.2);
  return frame(`Lesson: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid(locked ? '#f9fafb' : '#ffffff')],
    cornerRadius: 14,
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    opacity: locked ? 0.6 : 1,
    children: [
      frame('LessonTop', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('LessonIcon', {
            size: { x: 44, y: 44 },
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(color + '1a')],
            cornerRadius: 12,
            children: [
              text(icon, { fontSize: 20, fontWeight: 400, color }),
            ],
          }),
          frame('LessonInfo', {
            autoLayout: vertical({ spacing: 2 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(title, { fontSize: 15, fontWeight: 700, color: locked ? '#9ca3af' : '#1f2937' }),
              text(desc, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          text(locked ? '🔒' : `${progress}%`, { fontSize: 13, fontWeight: 700, color: locked ? '#9ca3af' : color }),
        ],
      }),
      ...(locked ? [] : [
        frame('ProgressBar', {
          size: { x: 1, y: 6 },
          fills: [solid('#f3f4f6')],
          cornerRadius: 3,
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            rectangle('ProgressFill', {
              size: { x: pctWidth, y: 6 },
              fills: [solid(color)],
              cornerRadius: 3,
            }),
          ],
        }),
      ]),
    ],
  });
}

function progressRing(label: string, value: string, color: string) {
  return frame(`Ring: ${label}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      frame('RingOuter', {
        size: { x: 72, y: 72 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          ellipse('RingBg', { size: { x: 72, y: 72 }, fills: [solid(color + '1a')] }),
          text(value, { fontSize: 18, fontWeight: 700, color }),
        ],
      }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function xpBadge(amount: string) {
  return frame('XPBadge', {
    autoLayout: horizontal({ spacing: 4, padX: 10, padY: 4 }),
    fills: [solid('#fef3c7')],
    cornerRadius: 9999,
    children: [
      text('⚡', { fontSize: 11, fontWeight: 400, color: '#f59e0b' }),
      text(`${amount} XP`, { fontSize: 12, fontWeight: 700, color: '#d97706' }),
    ],
  });
}

export default frame('LanguageLearningPage', {
  size: { x: 600 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Header with streak
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#6d28d9', position: 1 }], 90)],
      children: [
        frame('HeaderLeft', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('LingoLeap', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            text('Learning Spanish', { fontSize: 12, fontWeight: 500, color: '#ffffffb3' }),
          ],
        }),
        frame('StreakBadge', {
          autoLayout: horizontal({ spacing: 6, padX: 14, padY: 8, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff1a')],
          cornerRadius: 12,
          children: [
            text('🔥', { fontSize: 18, fontWeight: 400, color: '#f59e0b' }),
            frame('StreakInfo', {
              autoLayout: vertical({ spacing: 0 }),
              children: [
                text('42 Day Streak!', { fontSize: 13, fontWeight: 700, color: '#ffffff' }),
                text('Keep it going!', { fontSize: 10, fontWeight: 400, color: '#ffffffb3' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Progress overview
        frame('ProgressSection', {
          autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
          fills: [solid('#faf5ff')],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('ProgressHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Your Progress', { fontSize: 16, fontWeight: 700, color: '#1f2937' }),
                xpBadge('2,340'),
              ],
            }),
            frame('ProgressRings', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                progressRing('Words', '284', '#7c3aed'),
                progressRing('Lessons', '47', '#ec4899'),
                progressRing('Hours', '18', '#f59e0b'),
                progressRing('Level', 'B1', '#16a34a'),
              ],
            }),
          ],
        }),

        // Daily goal
        frame('DailyGoal', {
          autoLayout: vertical({ spacing: 10, padX: 20, padY: 16 }),
          fills: [solid('#f0fdf4')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('GoalHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text("Today's Goal", { fontSize: 14, fontWeight: 600, color: '#1f2937' }),
                text('3 / 5 lessons', { fontSize: 13, fontWeight: 500, color: '#16a34a' }),
              ],
            }),
            frame('GoalBar', {
              size: { x: 1, y: 8 },
              fills: [solid('#dcfce7')],
              cornerRadius: 4,
              layoutSizingHorizontal: 'FILL',
              clipContent: true,
              children: [
                rectangle('GoalFill', {
                  size: { x: 300, y: 8 },
                  fills: [gradient([{ hex: '#16a34a', position: 0 }, { hex: '#22c55e', position: 1 }], 90)],
                  cornerRadius: 4,
                }),
              ],
            }),
          ],
        }),

        // Lessons
        frame('LessonsSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Unit 3: Daily Life', { fontSize: 18, fontWeight: 700, color: '#1f2937' }),
            lessonCard('Greetings', '10 new words, 5 phrases', 100, '👋', '#16a34a', false),
            lessonCard('At the Market', 'Shopping vocabulary', 72, '🛒', '#3b82f6', false),
            lessonCard('Family Members', 'Family & relationships', 35, '👨‍👩‍👧', '#ec4899', false),
            lessonCard('Telling Time', 'Numbers & time expressions', 0, '🕐', '#f59e0b', false),
            lessonCard('Restaurant', 'Food ordering & manners', 0, '🍽', '#7c3aed', true),
            lessonCard('Directions', 'Navigation vocabulary', 0, '🧭', '#06b6d4', true),
          ],
        }),
      ],
    }),
  ],
});
