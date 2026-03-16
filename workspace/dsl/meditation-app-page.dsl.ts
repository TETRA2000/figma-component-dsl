/**
 * Meditation App — Session cards, breathing timer, mood tracker
 * DSL features: soft gradients, rounded shapes, large centered timer, mood emojis as text, progress rings
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function sessionCard(title: string, duration: string, category: string, c1: string, c2: string) {
  return frame(`Session: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('SessionArt', { size: { x: 56, y: 56 }, fills: [gradient([{ hex: c1, position: 0 }, { hex: c2, position: 1 }], 135)], cornerRadius: 14 }),
      frame('SessionInfo', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
        text(`${duration} - ${category}`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      ]}),
      text('Play', { fontSize: 13, fontWeight: 600, color: '#7c3aed' }),
    ],
  });
}

function moodBtn(label: string, selected: boolean) {
  return frame(`Mood: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(selected ? '#ede9fe' : '#ffffff')],
    cornerRadius: 12,
    strokes: selected ? [] : [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 24, fontWeight: 400, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function statBubble(value: string, label: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(color + '0d')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 22, fontWeight: 700, color: color, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('MeditationAppPage', {
  size: { x: 420 },
  autoLayout: vertical({ spacing: 24, padX: 24, padY: 32 }),
  fills: [gradient([{ hex: '#f5f3ff', position: 0 }, { hex: '#fdf2f8', position: 1 }], 180)],
  children: [
    frame('MedHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
      frame('Greeting', { autoLayout: vertical({ spacing: 2 }), children: [
        text('Good evening', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
        text('Sarah', { fontSize: 22, fontWeight: 700, color: '#1e293b' }),
      ]}),
      ellipse('Avatar', { size: { x: 40, y: 40 }, fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#ec4899', position: 1 }], 135)] }),
    ]}),
    // Timer
    frame('Timer', {
      autoLayout: vertical({ spacing: 8, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        ellipse('TimerRing', { size: { x: 180, y: 180 }, fills: [solid('#ede9fe')] }),
        text('15:00', { fontSize: 40, fontWeight: 300, color: '#7c3aed', textAlignHorizontal: 'CENTER' }),
        text('Breathe deeply', { fontSize: 14, fontWeight: 400, color: '#a78bfa', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    // Stats
    frame('Stats', { autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
      statBubble('7', 'Day Streak', '#7c3aed'),
      statBubble('42', 'Sessions', '#ec4899'),
      statBubble('8.5h', 'Total', '#0ea5e9'),
    ]}),
    // Mood
    frame('MoodSection', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
      text('How are you feeling?', { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      frame('MoodRow', { autoLayout: horizontal({ spacing: 8, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        moodBtn('Calm', false),
        moodBtn('Happy', true),
        moodBtn('Tired', false),
        moodBtn('Anxious', false),
      ]}),
    ]}),
    // Sessions
    frame('SessionSection', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
      text('Recommended', { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      sessionCard('Deep Sleep', '20 min', 'Sleep', '#7c3aed', '#4f46e5'),
      sessionCard('Morning Calm', '10 min', 'Focus', '#0ea5e9', '#06b6d4'),
      sessionCard('Stress Relief', '15 min', 'Relax', '#ec4899', '#f43f5e'),
    ]}),
  ],
});
