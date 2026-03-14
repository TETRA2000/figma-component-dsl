/**
 * Fitness App — Energetic, progress-focused, dynamic stats cards.
 *
 * DSL features stressed: progress bars (clipped rectangles), ellipse avatars,
 * gradient fills, counterAlign combinations, FILL sizing, multiple cards.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function progressBar(pct: number, color: string) {
  return frame('ProgressTrack', {
    size: { x: 240, y: 6 },
    fills: [solid('#2a2a2a')],
    cornerRadius: 3,
    clipContent: true,
    autoLayout: horizontal({ spacing: 0 }),
    children: [
      rectangle('Fill', { size: { x: Math.round(240 * pct / 100), y: 6 }, fills: [solid(color)] }),
    ],
  });
}

function statCard(title: string, value: string, unit: string, pct: number, color: string) {
  return frame(`Stat: ${title}`, {
    size: { x: 300, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 16,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(title, { fontSize: 13, fontWeight: 400, color: '#888888', letterSpacing: { value: 1, unit: 'PIXELS' } }),
      frame('ValueRow', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
          text(unit, { fontSize: 16, fontWeight: 400, color: '#666666' }),
        ],
      }),
      progressBar(pct, color),
      text(`${pct}% of daily goal`, { fontSize: 12, fontWeight: 400, color: '#555555' }),
    ],
  });
}

export default frame('FitnessAppPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f0f0f')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('PULSE', { fontSize: 16, fontWeight: 700, color: '#22c55e', letterSpacing: { value: 3, unit: 'PIXELS' } }),
        frame('User', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [gradient([
              { hex: '#22c55e', position: 0 },
              { hex: '#16a34a', position: 1 },
            ], 135)] }),
            text('Alex', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          ],
        }),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Good morning, Alex', { fontSize: 28, fontWeight: 600, color: '#ffffff' }),
        text('You\'re 73% through your weekly goals.', { fontSize: 16, fontWeight: 400, color: '#888888' }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 16, padX: 60, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('STEPS', '8,420', 'steps', 84, '#22c55e'),
        statCard('CALORIES', '1,847', 'kcal', 65, '#f59e0b'),
        statCard('DISTANCE', '6.2', 'km', 78, '#3b82f6'),
        statCard('HEART RATE', '72', 'bpm', 90, '#ef4444'),
      ],
    }),
    rectangle('Spacer', { size: { x: 1, y: 48 }, opacity: 0 }),
  ],
});
