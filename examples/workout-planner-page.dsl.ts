import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const orange = '#f97316'; const white = '#ffffff'; const bg = '#18181b'; const surface = '#27272a';
const light = '#fafafa'; const gray = '#a1a1aa'; const dim = '#52525b'; const green = '#22c55e'; const red = '#ef4444';

function exerciseCard(name: string, sets: string, reps: string, weight: string, muscle: string, color: string) {
  return frame(`Ex: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, spacing: 12, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(surface)], cornerRadius: 10,
    children: [
      frame('ExLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        frame('MuscleIcon', { size: { x: 40, y: 40 }, fills: [solid(color, 0.15)], cornerRadius: 10,
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [ellipse('Icon', { size: { x: 16, y: 16 }, fills: [solid(color)] })] }),
        frame('ExInfo', { autoLayout: vertical({ spacing: 2 }), children: [
          text(name, { fontSize: 14, fontWeight: 600, color: light }),
          text(muscle, { fontSize: 12, fontWeight: 400, color: gray }),
        ]}),
      ]}),
      frame('ExStats', { autoLayout: horizontal({ spacing: 16 }), children: [
        frame('Sets', { autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), children: [
          text(sets, { fontSize: 16, fontWeight: 700, color: light }),
          text('sets', { fontSize: 10, fontWeight: 400, color: dim }),
        ]}),
        frame('Reps', { autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), children: [
          text(reps, { fontSize: 16, fontWeight: 700, color: light }),
          text('reps', { fontSize: 10, fontWeight: 400, color: dim }),
        ]}),
        frame('Weight', { autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), children: [
          text(weight, { fontSize: 16, fontWeight: 700, color: orange }),
          text('kg', { fontSize: 10, fontWeight: 400, color: dim }),
        ]}),
      ]}),
    ],
  });
}

export default frame('WorkoutPlanner', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('FitForge', { fontSize: 22, fontWeight: 700, color: orange }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Workouts', { fontSize: 14, fontWeight: 600, color: orange }),
          text('Progress', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Nutrition', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    frame('TodayBanner', {
      autoLayout: horizontal({ padX: 40, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#9a3412', position: 0 }, { hex: '#ea580c', position: 0.5 }, { hex: '#f97316', position: 1 }], 135)],
      children: [
        frame('TodayInfo', { autoLayout: vertical({ spacing: 6 }), children: [
          text("Today's Workout", { fontSize: 24, fontWeight: 700, color: white }),
          text('Upper Body Strength · 6 exercises', { fontSize: 14, fontWeight: 400, color: '#fed7aa' }),
        ]}),
        frame('TimerCard', { autoLayout: vertical({ spacing: 2, padX: 16, padY: 10, counterAlign: 'CENTER' }), fills: [solid(white, 0.15)], cornerRadius: 10, children: [
          text('Est. Duration', { fontSize: 11, fontWeight: 400, color: '#fed7aa' }),
          text('45 min', { fontSize: 24, fontWeight: 700, color: white }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ExerciseList', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
          text('Exercises', { fontSize: 18, fontWeight: 600, color: light }),
          exerciseCard('Bench Press', '4', '8', '80', 'Chest', '#ef4444'),
          exerciseCard('Overhead Press', '3', '10', '40', 'Shoulders', '#f59e0b'),
          exerciseCard('Barbell Row', '4', '8', '70', 'Back', '#3b82f6'),
          exerciseCard('Dumbbell Curl', '3', '12', '14', 'Biceps', '#8b5cf6'),
          exerciseCard('Tricep Dips', '3', '12', 'BW', 'Triceps', '#ec4899'),
          exerciseCard('Lateral Raise', '3', '15', '10', 'Shoulders', '#06b6d4'),
        ]}),
        frame('Sidebar', { autoLayout: vertical({ spacing: 16 }), size: { x: 300, y: undefined }, children: [
          frame('WeekProgress', {
            autoLayout: vertical({ spacing: 10, padX: 16, padY: 14 }), fills: [solid(surface)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
            children: [
              text('This Week', { fontSize: 16, fontWeight: 600, color: light }),
              frame('DayRow', { autoLayout: horizontal({ spacing: 8, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                frame('D1', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C1', { size: { x: 28, y: 28 }, fills: [solid(green)] }), text('M', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
                frame('D2', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C2', { size: { x: 28, y: 28 }, fills: [solid(green)] }), text('T', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
                frame('D3', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C3', { size: { x: 28, y: 28 }, fills: [solid(green)] }), text('W', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
                frame('D4', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C4', { size: { x: 28, y: 28 }, fills: [solid(orange)] }), text('T', { fontSize: 10, fontWeight: 500, color: orange }) ]}),
                frame('D5', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C5', { size: { x: 28, y: 28 }, fills: [solid(dim)] }), text('F', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
                frame('D6', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C6', { size: { x: 28, y: 28 }, fills: [solid(dim)] }), text('S', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
                frame('D7', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), children: [
                  ellipse('C7', { size: { x: 28, y: 28 }, fills: [solid(dim)] }), text('S', { fontSize: 10, fontWeight: 500, color: gray }) ]}),
              ]}),
              text('3 of 5 workouts completed', { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
          frame('PersonalRecords', {
            autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), fills: [solid(surface)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
            children: [
              text('Personal Records', { fontSize: 16, fontWeight: 600, color: light }),
              frame('PR1', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Bench Press', { fontSize: 13, fontWeight: 400, color: gray }),
                text('100 kg', { fontSize: 13, fontWeight: 600, color: orange }),
              ]}),
              frame('PR2', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Squat', { fontSize: 13, fontWeight: 400, color: gray }),
                text('140 kg', { fontSize: 13, fontWeight: 600, color: orange }),
              ]}),
              frame('PR3', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Deadlift', { fontSize: 13, fontWeight: 400, color: gray }),
                text('180 kg', { fontSize: 13, fontWeight: 600, color: orange }),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
