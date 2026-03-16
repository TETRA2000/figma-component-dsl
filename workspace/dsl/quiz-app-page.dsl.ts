/**
 * Quiz / Trivia App — Question card, answer options, score tracker, timer
 *
 * DSL features stressed: large centered text, option buttons with strokes,
 * progress bar, ellipse timer, SPACE_BETWEEN, cornerRadius
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function answerOption(letter: string, label: string, state: 'default' | 'selected' | 'correct' | 'wrong') {
  const fills: Record<string, string> = {
    default: '#ffffff', selected: '#eff6ff', correct: '#f0fdf4', wrong: '#fef2f2',
  };
  const borders: Record<string, { r: number; g: number; b: number; a: number }> = {
    default: { r: 0.85, g: 0.85, b: 0.85, a: 1 },
    selected: { r: 0.15, g: 0.39, b: 0.92, a: 1 },
    correct: { r: 0.09, g: 0.64, b: 0.29, a: 1 },
    wrong: { r: 0.86, g: 0.15, b: 0.15, a: 1 },
  };
  const colors: Record<string, string> = {
    default: '#374151', selected: '#2563eb', correct: '#16a34a', wrong: '#dc2626',
  };
  return frame(`Option: ${letter}`, {
    autoLayout: horizontal({ spacing: 14, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid(fills[state])],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: borders[state], weight: 2, align: 'INSIDE' as const }],
    children: [
      frame(`${letter}Badge`, {
        autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER' }),
        fills: [solid(colors[state] + '1a')],
        cornerRadius: 8,
        children: [
          text(letter, { fontSize: 14, fontWeight: 700, color: colors[state] }),
        ],
      }),
      text(label, { fontSize: 15, fontWeight: 500, color: colors[state], layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

function scoreItem(label: string, value: string, color: string) {
  return frame(`Score: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 24, fontWeight: 800, color, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('QuizAppPage', {
  size: { x: 960 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f3ff')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#4c1d95', position: 0 }, { hex: '#7c3aed', position: 1 }], 90)],
      children: [
        text('BrainBuzz', { fontSize: 24, fontWeight: 800, color: '#ffffff' }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('Categories', { fontSize: 14, fontWeight: 500, color: '#e9d5ff' }),
            text('Leaderboard', { fontSize: 14, fontWeight: 500, color: '#e9d5ff' }),
            frame('XPBadge', {
              autoLayout: horizontal({ padX: 12, padY: 5 }),
              fills: [solid('#ffffff1a')],
              cornerRadius: 9999,
              children: [
                text('1,250 XP', { fontSize: 13, fontWeight: 700, color: '#fbbf24' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Progress & Timer row
    frame('ProgressRow', {
      autoLayout: horizontal({ spacing: 24, padX: 36, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Progress bar
        frame('QuizProgress', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('ProgLabel', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Question 7 of 15', { fontSize: 14, fontWeight: 600, color: '#4c1d95' }),
                text('47%', { fontSize: 14, fontWeight: 600, color: '#7c3aed' }),
              ],
            }),
            frame('ProgBar', {
              size: { x: 1, y: 10 },
              fills: [solid('#ede9fe')],
              cornerRadius: 5,
              layoutSizingHorizontal: 'FILL',
              clipContent: true,
              children: [
                rectangle('ProgFill', {
                  size: { x: 320, y: 10 },
                  fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 90)],
                  cornerRadius: 5,
                }),
              ],
            }),
          ],
        }),
        // Timer
        frame('Timer', {
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          size: { x: 64, y: 64 },
          children: [
            ellipse('TimerBg', {
              size: { x: 64, y: 64 },
              fills: [solid('#ede9fe')],
            }),
            frame('TimerValue', {
              autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
              children: [
                text('0:23', { fontSize: 20, fontWeight: 800, color: '#7c3aed', textAlignHorizontal: 'CENTER' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Question Card
    frame('QuestionCard', {
      autoLayout: vertical({ spacing: 24, padX: 36, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('QuestionBox', {
          autoLayout: vertical({ spacing: 0, padX: 32, padY: 32, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 20,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.88, g: 0.85, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Science & Nature', { fontSize: 13, fontWeight: 600, color: '#7c3aed' }),
            text('What is the largest organ in the human body?', {
              fontSize: 24, fontWeight: 700, color: '#1e1b4b',
              textAlignHorizontal: 'CENTER', lineHeight: 32,
            }),
          ],
        }),

        // Answer Options
        frame('Options', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            answerOption('A', 'The heart', 'default'),
            answerOption('B', 'The skin', 'selected'),
            answerOption('C', 'The liver', 'default'),
            answerOption('D', 'The brain', 'default'),
          ],
        }),
      ],
    }),

    // Score Tracker
    frame('ScoreSection', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 28, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ScoreCard', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN' }),
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.88, g: 0.85, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            scoreItem('Correct', '5', '#16a34a'),
            scoreItem('Wrong', '1', '#dc2626'),
            scoreItem('Streak', '3', '#f59e0b'),
            scoreItem('Points', '520', '#7c3aed'),
          ],
        }),
      ],
    }),
  ],
});
