import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const dark = '#111111'; const surface = '#1a1a1a'; const lime = '#84cc16'; const limeBg = '#1a2e05';
const white = '#ffffff'; const gray = '#888888'; const dimGray = '#444444';

function metricCircle(label: string, value: string, unit: string, color: string) {
  return frame(`Metric: ${label}`, {
    autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
    size: { x: 140, y: undefined },
    children: [
      frame('Circle', {
        size: { x: 100, y: 100 },
        children: [
          ellipse('BgRing', { size: { x: 100, y: 100 }, fills: [], strokes: [{ color: { r: 0.25, g: 0.25, b: 0.25, a: 1 }, weight: 6, align: 'INSIDE' as const }] }),
          ellipse('FgRing', { size: { x: 100, y: 100 }, fills: [], strokes: [{ color: { r: 0.52, g: 0.8, b: 0.09, a: 1 }, weight: 6, align: 'INSIDE' as const }] }),
        ],
      }),
      text(value, { fontSize: 24, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' as const }),
      text(label, { fontSize: 12, fontWeight: 400, color: gray, textAlignHorizontal: 'CENTER' as const }),
    ],
  });
}

function workoutCard(name: string, duration: string, cals: string, type: string) {
  return frame(`Workout: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    fills: [solid(surface)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Left', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        ellipse('Icon', { size: { x: 40, y: 40 }, fills: [solid(lime, 0.15)] }),
        frame('Info', { autoLayout: vertical({ spacing: 2 }), children: [
          text(name, { fontSize: 15, fontWeight: 600, color: white }),
          text(`${duration} · ${type}`, { fontSize: 12, fontWeight: 400, color: gray }),
        ]}),
      ]}),
      text(cals, { fontSize: 14, fontWeight: 600, color: lime }),
    ],
  });
}

function weekDay(day: string, active: boolean, done: boolean) {
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    size: { x: 44, y: undefined },
    children: [
      frame('DayCircle', {
        size: { x: 36, y: 36 },
        fills: [solid(done ? lime : (active ? dimGray : surface))],
        cornerRadius: 18,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [text(day, { fontSize: 13, fontWeight: 600, color: done ? dark : (active ? white : gray) })],
      }),
    ],
  });
}

export default frame('FitnessTracker', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('FitPulse', { fontSize: 20, fontWeight: 700, color: lime }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Dashboard', { fontSize: 14, fontWeight: 600, color: lime }),
          text('Workouts', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Nutrition', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Profile', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 24 }), layoutSizingHorizontal: 'FILL', children: [
          frame('TodaySummary', {
            autoLayout: vertical({ spacing: 20, padX: 24, padY: 24 }), fills: [solid(surface)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              frame('SummaryHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text("Today's Progress", { fontSize: 18, fontWeight: 700, color: white }),
                text('March 14', { fontSize: 13, fontWeight: 400, color: gray }),
              ]}),
              frame('Metrics', { autoLayout: horizontal({ spacing: 16, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                metricCircle('Calories', '1,842', 'kcal', lime),
                metricCircle('Steps', '8,247', 'steps', lime),
                metricCircle('Distance', '5.6', 'km', lime),
                metricCircle('Active', '47', 'min', lime),
              ]}),
            ],
          }),
          frame('WeekStreak', {
            autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }), fills: [solid(surface)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              text('Week Streak', { fontSize: 16, fontWeight: 600, color: white }),
              frame('Days', { autoLayout: horizontal({ spacing: 8, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                weekDay('M', false, true), weekDay('T', false, true), weekDay('W', false, true),
                weekDay('T', false, true), weekDay('F', true, false), weekDay('S', false, false), weekDay('S', false, false),
              ]}),
            ],
          }),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), size: { x: 400, y: undefined }, children: [
          frame('Workouts', {
            autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }), fills: [solid(surface)],
            cornerRadius: 16, layoutSizingHorizontal: 'FILL',
            children: [
              text('Recent Workouts', { fontSize: 16, fontWeight: 600, color: white }),
              workoutCard('Morning Run', '32 min', '284 cal', 'Cardio'),
              workoutCard('Weight Training', '45 min', '320 cal', 'Strength'),
              workoutCard('HIIT Session', '25 min', '312 cal', 'Interval'),
              workoutCard('Evening Walk', '40 min', '180 cal', 'Recovery'),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
