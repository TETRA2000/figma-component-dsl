/**
 * Quiz App — Question card, answer options, progress bar (mobile 600px)
 * DSL features: progress bar, selectable answer options, timer display, gradient header
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function answerOption(label: string, answer: string, selected: boolean, correct: boolean | null) {
  const bgColor = correct === true ? '#f0fdf4' : correct === false ? '#fef2f2' : selected ? '#eff6ff' : '#ffffff';
  const borderColor = correct === true ? '#16a34a' : correct === false ? '#dc2626' : selected ? '#2563eb' : '#e5e7eb';
  const br = correct === true ? 0.09 : correct === false ? 0.86 : selected ? 0.15 : 0.9;
  const bg = correct === true ? 0.09 : correct === false ? 0.86 : selected ? 0.15 : 0.9;
  return frame(`Answer: ${label}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(bgColor)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: br, g: bg, b: br, a: 1 }, weight: selected || correct !== null ? 2 : 1, align: 'INSIDE' as const }],
    children: [
      frame('OptionLabel', {
        size: { x: 32, y: 32 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(selected ? '#2563eb' : correct === true ? '#16a34a' : '#f3f4f6')],
        cornerRadius: 9999,
        children: [text(label, { fontSize: 14, fontWeight: 700, color: selected || correct === true ? '#ffffff' : '#374151' })],
      }),
      text(answer, { fontSize: 15, fontWeight: 500, color: '#111827', layoutSizingHorizontal: 'FILL' }),
      ...(correct === true ? [text('✓', { fontSize: 18, fontWeight: 700, color: '#16a34a' })] : []),
      ...(correct === false ? [text('✗', { fontSize: 18, fontWeight: 700, color: '#dc2626' })] : []),
    ],
  });
}

function statBadge(label: string, value: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 14, padY: 8, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff0d')], cornerRadius: 10,
    children: [
      text(value, { fontSize: 18, fontWeight: 800, color }),
      text(label, { fontSize: 10, fontWeight: 500, color: '#ffffffaa' }),
    ],
  });
}

function progressBar(current: number, total: number) {
  const pct = Math.round((current / total) * 100);
  const fillWidth = Math.round((current / total) * 552);
  return frame('Progress', {
    autoLayout: vertical({ spacing: 6 }), layoutSizingHorizontal: 'FILL',
    children: [
      frame('ProgressInfo', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(`Question ${current} of ${total}`, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
          text(`${pct}%`, { fontSize: 12, fontWeight: 600, color: '#2563eb' }),
        ],
      }),
      frame('Bar', {
        size: { x: 1, y: 8 }, fills: [solid('#e5e7eb')], cornerRadius: 4,
        layoutSizingHorizontal: 'FILL', clipContent: true,
        children: [rectangle('Fill', { size: { x: fillWidth, y: 8 }, fills: [gradient([{ hex: '#2563eb', position: 0 }, { hex: '#7c3aed', position: 1 }], 90)], cornerRadius: 4 })],
      }),
    ],
  });
}

export default frame('QuizAppPage', {
  size: { x: 600 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#2563eb', position: 0 }, { hex: '#7c3aed', position: 1 }], 90)],
      children: [
        text('QuizMaster', { fontSize: 18, fontWeight: 800, color: '#ffffff' }),
        frame('Stats', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            statBadge('Score', '7/10', '#22c55e'),
            statBadge('Time', '2:34', '#fbbf24'),
            statBadge('Streak', '3🔥', '#f97316'),
          ],
        }),
      ],
    }),
    frame('QuizContent', {
      autoLayout: vertical({ spacing: 20, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        progressBar(7, 10),
        frame('QuestionCard', {
          autoLayout: vertical({ spacing: 6, padX: 20, padY: 20 }),
          fills: [solid('#f8fafc')], cornerRadius: 16, layoutSizingHorizontal: 'FILL',
          children: [
            frame('CategoryTag', {
              autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
              fills: [solid('#ede9fe')], cornerRadius: 9999,
              children: [text('Science', { fontSize: 11, fontWeight: 600, color: '#7c3aed' })],
            }),
            text('What is the most abundant gas in Earth\'s atmosphere?', {
              fontSize: 18, fontWeight: 700, color: '#111827',
              size: { x: 500 }, textAutoResize: 'HEIGHT', lineHeight: { value: 140, unit: 'PERCENT' },
            }),
          ],
        }),
        frame('Answers', {
          autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL',
          children: [
            answerOption('A', 'Oxygen (O₂)', false, null),
            answerOption('B', 'Nitrogen (N₂)', true, null),
            answerOption('C', 'Carbon Dioxide (CO₂)', false, null),
            answerOption('D', 'Argon (Ar)', false, null),
          ],
        }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('SkipBtn', {
              autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
              fills: [solid('#f3f4f6')], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
              children: [text('Skip', { fontSize: 14, fontWeight: 600, color: '#6b7280' })],
            }),
            frame('SubmitBtn', {
              autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
              fills: [solid('#2563eb')], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
              children: [text('Submit Answer', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
            }),
          ],
        }),
      ],
    }),
  ],
});
