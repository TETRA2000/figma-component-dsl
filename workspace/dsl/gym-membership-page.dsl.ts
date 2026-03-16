/**
 * Gym Membership Page — Class schedule, membership tiers, trainer profiles
 *
 * DSL features stressed: FILL columns, gradient hero section, price cards,
 * SPACE_BETWEEN for row alignment, cornerRadius cards, ellipse avatars
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function classRow(time: string, name: string, trainer: string, spots: string) {
  return frame(`Class: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`${name}Left`, {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('TimeBadge', {
            autoLayout: horizontal({ padX: 10, padY: 6, align: 'CENTER' }),
            fills: [solid('#f0f9ff')],
            cornerRadius: 6,
            children: [
              text(time, { fontSize: 12, fontWeight: 700, color: '#0369a1' }),
            ],
          }),
          frame(`${name}Info`, {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
              text(`with ${trainer}`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
      text(spots, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
    ],
  });
}

function tierCard(name: string, price: string, perks: string[], highlighted: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 20, padX: 24, padY: 28 }),
    fills: highlighted
      ? [gradient([{ hex: '#0ea5e9', position: 0 }, { hex: '#6366f1', position: 1 }], 135)]
      : [solid('#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    strokes: highlighted ? [] : [{ color: { r: 0.90, g: 0.90, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 18, fontWeight: 700, color: highlighted ? '#ffffff' : '#1e293b' }),
      text(price, { fontSize: 36, fontWeight: 800, color: highlighted ? '#ffffff' : '#0f172a' }),
      rectangle(`${name}Divider`, {
        size: { x: 1, y: 1 }, fills: [solid(highlighted ? '#ffffff33' : '#e2e8f0')],
        layoutSizingHorizontal: 'FILL',
      }),
      frame(`${name}Perks`, {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: perks.map(p =>
          text(`\u2713  ${p}`, { fontSize: 13, fontWeight: 400, color: highlighted ? '#e0f2fe' : '#475569' })
        ),
      }),
      frame(`${name}CTA`, {
        autoLayout: horizontal({ padY: 12, align: 'CENTER' }),
        fills: highlighted ? [solid('#ffffff')] : [solid('#0ea5e9')],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Join Now', {
            fontSize: 14, fontWeight: 600,
            color: highlighted ? '#0ea5e9' : '#ffffff',
            textAlignHorizontal: 'CENTER',
          }),
        ],
      }),
    ],
  });
}

function trainerCard(name: string, specialty: string, color1: string, color2: string) {
  return frame(`Trainer: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`${name}Avatar`, {
        size: { x: 56, y: 56 },
        fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], 135)],
      }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(specialty, { fontSize: 12, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('GymMembershipPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 60, padY: 56, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0c4a6e', position: 0 }, { hex: '#1e40af', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('ELEVATE YOUR FITNESS', { fontSize: 14, fontWeight: 700, color: '#7dd3fc', textAlignHorizontal: 'CENTER' }),
        text('Train Hard. Live Strong.', { fontSize: 40, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Unlimited classes, top trainers, and state-of-the-art facilities.', {
          fontSize: 16, fontWeight: 400, color: '#bae6fd', textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Schedule
    frame('ScheduleSection', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text("Today's Classes", { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
        classRow('6:00 AM', 'Power Yoga', 'Sarah K.', '4 spots left'),
        classRow('8:30 AM', 'HIIT Blast', 'Mike R.', '2 spots left'),
        classRow('12:00 PM', 'Spin Cycle', 'Jenna L.', '8 spots left'),
        classRow('5:30 PM', 'Strength Training', 'Carlos D.', 'Full'),
      ],
    }),

    // Membership Tiers
    frame('TiersSection', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Membership Plans', { fontSize: 22, fontWeight: 700, color: '#0f172a', textAlignHorizontal: 'CENTER' }),
        frame('TierCards', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            tierCard('Basic', '$29/mo', ['Gym access', 'Locker room', '2 classes/week'], false),
            tierCard('Pro', '$59/mo', ['Unlimited classes', 'Sauna & pool', 'Personal program', 'Nutrition guide'], true),
            tierCard('Elite', '$99/mo', ['Everything in Pro', '1-on-1 training', 'Guest passes', 'Recovery suite'], false),
          ],
        }),
      ],
    }),

    // Trainers
    frame('TrainersSection', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Our Trainers', { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
        frame('TrainerGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            trainerCard('Sarah Kim', 'Yoga & Pilates', '#f472b6', '#c084fc'),
            trainerCard('Mike Rivera', 'HIIT & CrossFit', '#fb923c', '#f43f5e'),
            trainerCard('Jenna Lee', 'Cycling & Cardio', '#34d399', '#22d3ee'),
            trainerCard('Carlos Diaz', 'Strength & Power', '#60a5fa', '#818cf8'),
          ],
        }),
      ],
    }),
  ],
});
