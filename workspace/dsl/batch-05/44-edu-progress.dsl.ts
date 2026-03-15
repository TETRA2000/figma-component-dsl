/**
 * Education Progress Tracker — Completion Bars, Skills Radar, Streaks & Badges
 * Batch 5, Page 4: Progress tracker with course bars, radar placeholder, streak counter, badges grid
 * DSL Features: progress bars with FILL sizing, nested auto-layout, SPACE_BETWEEN
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
const ORANGE = '#ea580c';
const PURPLE = '#7c3aed';

function courseProgressBar(title: string, pct: number, color: string) {
  return frame(`Progress: ${title}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Label', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY }),
          text(`${pct}%`, { fontSize: 14, fontWeight: 700, color }),
        ],
      }),
      frame('Track', {
        size: { x: 400, y: 10 },
        fills: [solid('#e2e8f0')],
        cornerRadius: 5,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('Fill', {
            size: { x: Math.round(400 * pct / 100), y: 10 },
            fills: [solid(color)],
            cornerRadius: 5,
          }),
        ],
      }),
    ],
  });
}

function statCard(value: string, label: string, iconBg: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('IconCircle', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 48, y: 48 },
        fills: [solid(iconBg)],
        cornerRadius: 24,
        children: [
          text('★', { fontSize: 20, fontWeight: 600, color: CARD_BG }),
        ],
      }),
      text(value, { fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY }),
      text(label, { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
    ],
  });
}

function badgeItem(name: string, earned: boolean) {
  return frame(`Badge: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 12, padY: 12, counterAlign: 'CENTER' }),
    size: { x: 100, y: undefined },
    fills: [solid(earned ? '#eff6ff' : '#f8fafc')],
    cornerRadius: 12,
    strokes: [{ color: earned
      ? { r: 0.12, g: 0.25, b: 0.69, a: 0.3 }
      : { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('BadgeIcon', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 40, y: 40 },
        fills: [solid(earned ? BLUE : '#cbd5e1')],
        cornerRadius: 20,
        opacity: earned ? 1 : 0.5,
        children: [
          text('🏆', { fontSize: 18, fontWeight: 400, color: '#ffffff' }),
        ],
      }),
      text(name, {
        fontSize: 11,
        fontWeight: earned ? 600 : 400,
        color: earned ? TEXT_PRIMARY : TEXT_SECONDARY,
        textAlignHorizontal: 'CENTER',
      }),
    ],
  });
}

export default component('EduProgress', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#1e40af', position: 0 },
        { hex: '#3b82f6', position: 1 },
      ], 135)],
      children: [
        text('Learning Progress', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),
        text('Track your journey and celebrate achievements', {
          fontSize: 15, fontWeight: 400, color: '#bfdbfe',
        }),
      ],
    }),

    // Stats Row
    frame('StatsRow', {
      autoLayout: horizontal({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('12', 'Courses Enrolled', BLUE),
        statCard('7', 'Completed', GREEN),
        statCard('142', 'Hours Learned', PURPLE),
        statCard('23', 'Day Streak', ORANGE),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Course Progress
        frame('CourseProgress', {
          autoLayout: vertical({ spacing: 24, padX: 28, padY: 28 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(CARD_BG)],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Course Completion', { fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }),
            courseProgressBar('Python Fundamentals', 85, BLUE),
            courseProgressBar('Data Structures', 62, GREEN),
            courseProgressBar('Machine Learning', 40, PURPLE),
            courseProgressBar('Web Development', 100, GREEN),
            courseProgressBar('Calculus I', 15, ORANGE),
            courseProgressBar('Statistics', 28, BLUE),
          ],
        }),

        // Right: Skills Radar + Streak
        frame('RightPanel', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 380, y: undefined },
          children: [
            // Skills Radar Placeholder
            frame('SkillsRadar', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Skills Radar', { fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }),
                // Radar chart placeholder
                frame('RadarPlaceholder', {
                  autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 240, y: 240 },
                  fills: [solid('#f8fafc')],
                  cornerRadius: 120,
                  strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 2, align: 'INSIDE' }],
                  children: [
                    text('Radar Chart\nPlaceholder', {
                      fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY,
                      textAlignHorizontal: 'CENTER',
                    }),
                  ],
                }),
                // Skill labels
                frame('SkillLabels', {
                  autoLayout: horizontal({ spacing: 12 }),
                  children: [
                    frame('SkillTag1', {
                      autoLayout: horizontal({ padX: 10, padY: 4 }),
                      fills: [solid('#eff6ff')],
                      cornerRadius: 999,
                      children: [text('Logic', { fontSize: 11, fontWeight: 600, color: BLUE })],
                    }),
                    frame('SkillTag2', {
                      autoLayout: horizontal({ padX: 10, padY: 4 }),
                      fills: [solid('#f0fdf4')],
                      cornerRadius: 999,
                      children: [text('Math', { fontSize: 11, fontWeight: 600, color: GREEN })],
                    }),
                    frame('SkillTag3', {
                      autoLayout: horizontal({ padX: 10, padY: 4 }),
                      fills: [solid('#faf5ff')],
                      cornerRadius: 999,
                      children: [text('Design', { fontSize: 11, fontWeight: 600, color: PURPLE })],
                    }),
                  ],
                }),
              ],
            }),

            // Streak Counter
            frame('StreakCard', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [gradient([
                { hex: '#fef3c7', position: 0 },
                { hex: '#fde68a', position: 1 },
              ], 270)],
              cornerRadius: 12,
              children: [
                text('🔥', { fontSize: 36, fontWeight: 400, color: TEXT_PRIMARY }),
                text('23 Day Streak!', { fontSize: 20, fontWeight: 700, color: '#92400e' }),
                text('Keep going! Your longest streak is 31 days.', {
                  fontSize: 13, fontWeight: 400, color: '#a16207',
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Badges Grid
    frame('BadgesSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Badges Earned', { fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }),
        frame('BadgeGrid', {
          autoLayout: horizontal({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            badgeItem('First Steps', true),
            badgeItem('Fast Learner', true),
            badgeItem('Quiz Master', true),
            badgeItem('Week Streak', true),
            badgeItem('Perfectionist', true),
            badgeItem('Collaborator', false),
            badgeItem('Night Owl', false),
            badgeItem('Mentor', false),
          ],
        }),
      ],
    }),
  ],
});
