import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const teal = '#0d9488'; const white = '#ffffff'; const bg = '#f0fdfa'; const dark = '#134e4a';
const med = '#64748b'; const light = '#94a3b8';

function questionCard(num: string, question: string, type: string, required: boolean) {
  return frame(`Q: ${num}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
    fills: [solid(white)], cornerRadius: 10,
    strokes: [{ color: { r: 0.88, g: 0.95, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('QHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        frame('QNum', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          frame('NumBadge', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(teal)], cornerRadius: 4,
            children: [text(num, { fontSize: 11, fontWeight: 700, color: white })] }),
          text(question, { fontSize: 15, fontWeight: 600, color: dark }),
        ]}),
        frame('QMeta', { autoLayout: horizontal({ spacing: 8 }), children: [
          frame('TypeBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(teal, 0.1)], cornerRadius: 4,
            children: [text(type, { fontSize: 11, fontWeight: 500, color: teal })] }),
          ...(required ? [frame('ReqBadge', { autoLayout: horizontal({ padX: 6, padY: 3 }), fills: [solid('#dc2626', 0.1)], cornerRadius: 4,
            children: [text('Required', { fontSize: 10, fontWeight: 600, color: '#dc2626' })] })] : []),
        ]}),
      ]}),
      ...(type === 'Multiple Choice' ? [
        frame('Options', { autoLayout: vertical({ spacing: 6, padX: 4 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Opt1', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
            ellipse('Radio1', { size: { x: 16, y: 16 }, fills: [], strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 2, align: 'INSIDE' as const }] }),
            text('Option A', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
          frame('Opt2', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
            ellipse('Radio2', { size: { x: 16, y: 16 }, fills: [], strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 2, align: 'INSIDE' as const }] }),
            text('Option B', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
          frame('Opt3', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
            ellipse('Radio3', { size: { x: 16, y: 16 }, fills: [], strokes: [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 2, align: 'INSIDE' as const }] }),
            text('Option C', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
        ]}),
      ] : type === 'Text' ? [
        frame('TextInput', { autoLayout: horizontal({ padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL',
          fills: [solid(bg)], cornerRadius: 6,
          children: [text('Type your answer here...', { fontSize: 13, fontWeight: 400, color: light })] }),
      ] : type === 'Rating' ? [
        frame('Stars', { autoLayout: horizontal({ spacing: 6 }), children: [
          ellipse('S1', { size: { x: 24, y: 24 }, fills: [solid('#fbbf24')] }),
          ellipse('S2', { size: { x: 24, y: 24 }, fills: [solid('#fbbf24')] }),
          ellipse('S3', { size: { x: 24, y: 24 }, fills: [solid('#fbbf24')] }),
          ellipse('S4', { size: { x: 24, y: 24 }, fills: [solid('#d4d4d8')] }),
          ellipse('S5', { size: { x: 24, y: 24 }, fills: [solid('#d4d4d8')] }),
        ]}),
      ] : []),
    ],
  });
}

export default frame('SurveyBuilder', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('FormCraft', { fontSize: 22, fontWeight: 700, color: teal }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Builder', { fontSize: 14, fontWeight: 600, color: teal }),
          text('Responses', { fontSize: 14, fontWeight: 400, color: med }),
          text('Analytics', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('PublishBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(teal)], cornerRadius: 8,
          children: [text('Publish', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('BuilderArea', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          frame('SurveyTitle', { autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
            fills: [gradient([{ hex: '#134e4a', position: 0 }, { hex: '#0d9488', position: 1 }], 135)], cornerRadius: 12,
            children: [
              text('Customer Satisfaction Survey', { fontSize: 22, fontWeight: 700, color: white }),
              text('Help us improve our product by sharing your feedback', { fontSize: 14, fontWeight: 400, color: '#99f6e4' }),
            ]}),
          questionCard('1', 'How satisfied are you overall?', 'Rating', true),
          questionCard('2', 'Which features do you use most?', 'Multiple Choice', true),
          questionCard('3', 'What could we improve?', 'Text', false),
          questionCard('4', 'Would you recommend us?', 'Multiple Choice', true),
        ]}),
        frame('Sidebar', { autoLayout: vertical({ spacing: 12 }), size: { x: 280, y: undefined }, children: [
          frame('QuestionTypes', {
            autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(white)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
            children: [
              text('Add Question', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('QT1', { autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 6, children: [
                ellipse('QTIcon1', { size: { x: 16, y: 16 }, fills: [solid(teal, 0.3)] }),
                text('Multiple Choice', { fontSize: 13, fontWeight: 400, color: dark }),
              ]}),
              frame('QT2', { autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 6, children: [
                ellipse('QTIcon2', { size: { x: 16, y: 16 }, fills: [solid(teal, 0.3)] }),
                text('Short Text', { fontSize: 13, fontWeight: 400, color: dark }),
              ]}),
              frame('QT3', { autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 6, children: [
                ellipse('QTIcon3', { size: { x: 16, y: 16 }, fills: [solid(teal, 0.3)] }),
                text('Rating Scale', { fontSize: 13, fontWeight: 400, color: dark }),
              ]}),
              frame('QT4', { autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8 }), layoutSizingHorizontal: 'FILL', fills: [solid(bg)], cornerRadius: 6, children: [
                ellipse('QTIcon4', { size: { x: 16, y: 16 }, fills: [solid(teal, 0.3)] }),
                text('File Upload', { fontSize: 13, fontWeight: 400, color: dark }),
              ]}),
            ],
          }),
          frame('SurveyStats', {
            autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(white)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
            children: [
              text('Survey Stats', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('Stat1', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Questions', { fontSize: 13, fontWeight: 400, color: med }), text('4', { fontSize: 13, fontWeight: 600, color: dark }),
              ]}),
              frame('Stat2', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Responses', { fontSize: 13, fontWeight: 400, color: med }), text('128', { fontSize: 13, fontWeight: 600, color: teal }),
              ]}),
              frame('Stat3', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Completion', { fontSize: 13, fontWeight: 400, color: med }), text('87%', { fontSize: 13, fontWeight: 600, color: '#059669' }),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
