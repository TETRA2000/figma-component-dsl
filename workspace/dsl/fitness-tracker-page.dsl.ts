/**
 * Fitness Tracker — Activity rings, workout cards, step counter
 * DSL features: dark theme, ellipse rings, gradient accents, opacity fills, nested grids
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function activityRing(value: string, label: string, color: string, subtext: string) {
  return frame(`Ring: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('RingOuter', {
        size: { x: 80, y: 80 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [
          ellipse('RingBg', { size: { x: 80, y: 80 }, fills: [solid('#ffffff0d')] }),
          frame('RingValue', {
            autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
            children: [
              text(value, { fontSize: 22, fontWeight: 700, color: color, textAlignHorizontal: 'CENTER' }),
              text(label, { fontSize: 10, fontWeight: 500, color: '#ffffff80', textAlignHorizontal: 'CENTER' }),
            ],
          }),
        ],
      }),
      text(subtext, { fontSize: 11, fontWeight: 500, color: '#ffffff59', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function workoutCard(type: string, duration: string, calories: string, date: string, iconLabel: string) {
  return frame(`Workout: ${type}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 14,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('WorkoutTop', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          frame('WorkoutIcon', {
            size: { x: 36, y: 36 },
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#ffffff0d')],
            cornerRadius: 10,
            children: [
              text(iconLabel, { fontSize: 12, fontWeight: 700, color: '#ff6347', textAlignHorizontal: 'CENTER' }),
            ],
          }),
          frame('WorkoutTitle', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(type, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              text(date, { fontSize: 11, fontWeight: 400, color: '#ffffff59' }),
            ],
          }),
        ],
      }),
      frame('WorkoutStats', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(duration, { fontSize: 13, fontWeight: 500, color: '#84cc16' }),
          text(calories, { fontSize: 13, fontWeight: 500, color: '#ff6347' }),
        ],
      }),
    ],
  });
}

function stepCounter(steps: number, goal: number) {
  const pct = Math.round((steps / goal) * 100);
  return frame('StepCounter', {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 16,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Steps', { fontSize: 14, fontWeight: 500, color: '#ffffff80' }),
          text(`${pct}%`, { fontSize: 14, fontWeight: 600, color: '#84cc16' }),
        ],
      }),
      text(steps.toLocaleString(), { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
      frame('StepBar', {
        size: { x: 1, y: 8 },
        fills: [solid('#ffffff0d')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle('StepFill', {
            size: { x: Math.round(pct * 6), y: 8 },
            fills: [gradient([{ hex: '#84cc16', position: 0 }, { hex: '#22c55e', position: 1 }], 90)],
            cornerRadius: 4,
          }),
        ],
      }),
      text(`${steps.toLocaleString()} / ${goal.toLocaleString()} steps`, { fontSize: 12, fontWeight: 400, color: '#ffffff59' }),
    ],
  });
}

export default frame('FitnessTrackerPage', {
  size: { x: 720 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f0f0f')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1a1a1a')],
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('FitTrack', { fontSize: 22, fontWeight: 800, color: '#ff6347' }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('March 16, 2026', { fontSize: 13, fontWeight: 500, color: '#ffffff80' }),
            ellipse('Avatar', { size: { x: 34, y: 34 }, fills: [gradient([{ hex: '#ff6347', position: 0 }, { hex: '#ff8c00', position: 1 }], 135)] }),
          ],
        }),
      ],
    }),
    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 32, padX: 32, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Activity section
        frame('ActivitySection', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Activity', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
            frame('ActivityRings', {
              autoLayout: horizontal({ spacing: 0, padX: 16, padY: 28, align: 'SPACE_BETWEEN' }),
              fills: [solid('#ffffff08')],
              cornerRadius: 16,
              strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
              layoutSizingHorizontal: 'FILL',
              children: [
                activityRing('580', 'Move', '#ff6347', '580 / 750 cal'),
                activityRing('35', 'Exercise', '#84cc16', '35 / 50 min'),
                activityRing('10', 'Stand', '#3b82f6', '10 / 12 hr'),
              ],
            }),
          ],
        }),
        // Steps
        frame('StepsSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text("Today's Stats", { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
            stepCounter(8432, 10000),
          ],
        }),
        // Workouts
        frame('WorkoutsSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('WorkoutsHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Workouts', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
                text('See all', { fontSize: 13, fontWeight: 600, color: '#ff6347' }),
              ],
            }),
            frame('WorkoutGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('WorkoutCol1', {
                  autoLayout: vertical({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    workoutCard('Morning Run', '32 min', '320 cal', 'Today', 'RUN'),
                    workoutCard('Cycling', '45 min', '380 cal', 'Yesterday', 'CYC'),
                  ],
                }),
                frame('WorkoutCol2', {
                  autoLayout: vertical({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    workoutCard('HIIT Session', '28 min', '410 cal', 'Today', 'HIT'),
                    workoutCard('Yoga Flow', '60 min', '180 cal', 'Yesterday', 'YGA'),
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
