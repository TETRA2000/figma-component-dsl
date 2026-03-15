/**
 * Education Quiz Interface — Question Card, Multiple Choice & Timer
 * Batch 5, Page 3: Quiz with question card, A/B/C/D options, progress bar, timer, submit
 * DSL Features: progress bars, cornerRadius, nested auto-layout, SPACE_BETWEEN
 */
import {
  component, frame, rectangle, text,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const BG = '#f0f5ff';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';
const GREEN = '#16a34a';
const SELECTED_BG = '#eff6ff';

function choiceOption(letter: string, content: string, selected: boolean) {
  return frame(`Option ${letter}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(selected ? SELECTED_BG : CARD_BG)],
    cornerRadius: 12,
    strokes: [{ color: selected
      ? { r: 0.12, g: 0.25, b: 0.69, a: 1 }
      : { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: selected ? 2 : 1, align: 'INSIDE' }],
    children: [
      frame('LetterCircle', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 36, y: 36 },
        fills: [solid(selected ? BLUE : '#f1f5f9')],
        cornerRadius: 18,
        children: [
          text(letter, { fontSize: 14, fontWeight: 700, color: selected ? '#ffffff' : TEXT_PRIMARY }),
        ],
      }),
      text(content, {
        fontSize: 15,
        fontWeight: selected ? 600 : 400,
        color: selected ? BLUE : TEXT_PRIMARY,
        lineHeight: { value: 22, unit: 'PIXELS' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default component('EduQuiz', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Top Progress Bar
    frame('TopProgress', {
      autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      size: { x: 1440, y: 4 },
      fills: [solid('#e2e8f0')],
      clipContent: true,
      children: [
        rectangle('ProgressFill', {
          size: { x: 576, y: 4 },
          fills: [solid(BLUE)],
        }),
      ],
    }),

    // Quiz Header
    frame('QuizHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        frame('QuizInfo', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Python Fundamentals Quiz', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
            frame('QuestionCount', {
              autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#eff6ff')],
              cornerRadius: 999,
              children: [
                text('Question 4 of 10', { fontSize: 12, fontWeight: 600, color: BLUE }),
              ],
            }),
          ],
        }),
        frame('Timer', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8, counterAlign: 'CENTER' }),
          fills: [solid('#fef3c7')],
          cornerRadius: 8,
          children: [
            text('⏱', { fontSize: 16, fontWeight: 400, color: '#92400e' }),
            text('12:34', { fontSize: 16, fontWeight: 700, color: '#92400e' }),
          ],
        }),
      ],
    }),

    // Main Quiz Content
    frame('QuizBody', {
      autoLayout: vertical({ spacing: 32, padX: 200, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Question dots
        frame('QuestionDots', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: Array.from({ length: 10 }, (_, i) =>
            frame(`Dot${i + 1}`, {
              autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              size: { x: 32, y: 32 },
              fills: [solid(i < 3 ? GREEN : i === 3 ? BLUE : '#e2e8f0')],
              cornerRadius: 16,
              children: [
                text(String(i + 1), {
                  fontSize: 12,
                  fontWeight: 600,
                  color: i < 3 || i === 3 ? '#ffffff' : TEXT_SECONDARY,
                }),
              ],
            }),
          ),
        }),

        // Question Card
        frame('QuestionCard', {
          autoLayout: vertical({ spacing: 32, padX: 40, padY: 40 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(CARD_BG)],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Question text
            frame('QuestionText', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Question 4', { fontSize: 13, fontWeight: 600, color: BLUE, letterSpacing: { value: 1, unit: 'PIXELS' } }),
                text('What is the output of the following Python code?\n\nprint(type(3.14))', {
                  fontSize: 20,
                  fontWeight: 600,
                  color: TEXT_PRIMARY,
                  lineHeight: { value: 30, unit: 'PIXELS' },
                }),
              ],
            }),

            // Code block placeholder
            frame('CodeBlock', {
              autoLayout: horizontal({ padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 8,
              children: [
                text('>>> print(type(3.14))\n<class \'float\'>', {
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#a5f3fc',
                  lineHeight: { value: 22, unit: 'PIXELS' },
                }),
              ],
            }),

            // Options
            frame('Options', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                choiceOption('A', '<class \'int\'>', false),
                choiceOption('B', '<class \'float\'>', true),
                choiceOption('C', '<class \'str\'>', false),
                choiceOption('D', '<class \'double\'>', false),
              ],
            }),
          ],
        }),

        // Bottom Actions
        frame('QuizActions', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SkipBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Skip Question', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
              ],
            }),
            frame('SubmitBtn', {
              autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(BLUE)],
              cornerRadius: 8,
              children: [
                text('Submit Answer', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
