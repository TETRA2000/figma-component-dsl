/**
 * Gym Membership — Tier pricing cards, class schedule, trainer profiles
 * DSL features: pricing tier cards, gradient featured tier, schedule table, ellipse avatars
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function tierCard(name: string, price: string, perks: string[], color: string, featured: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 22 }),
    fills: [featured ? gradient([{ hex: color, position: 0 }, { hex: '#1e1b4b', position: 1 }], 160) : solid('#ffffff')],
    cornerRadius: 16, layoutSizingHorizontal: 'FILL',
    strokes: featured ? [] : [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 16, fontWeight: 700, color: featured ? '#ffffff' : '#111827' }),
      frame('PriceRow', {
        autoLayout: horizontal({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 32, fontWeight: 900, color: featured ? '#ffffff' : color }),
          text('/mo', { fontSize: 13, fontWeight: 400, color: featured ? '#ffffffaa' : '#9ca3af' }),
        ],
      }),
      ...perks.map(p => text(`✓  ${p}`, { fontSize: 13, fontWeight: 400, color: featured ? '#ffffffcc' : '#374151' })),
      frame('TierBtn', {
        autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
        fills: [solid(featured ? '#ffffff' : color)],
        cornerRadius: 10, layoutSizingHorizontal: 'FILL',
        children: [text('Join Now', { fontSize: 14, fontWeight: 700, color: featured ? color : '#ffffff' })],
      }),
    ],
  });
}

function classRow(time: string, name: string, trainer: string, spots: number) {
  return frame(`Class: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(time, { fontSize: 12, fontWeight: 600, color: '#6b7280', size: { x: 70 } }),
      text(name, { fontSize: 13, fontWeight: 600, color: '#111827', layoutSizingHorizontal: 'FILL' }),
      text(trainer, { fontSize: 12, fontWeight: 400, color: '#6b7280', size: { x: 100 } }),
      text(`${spots} spots`, { fontSize: 11, fontWeight: 500, color: spots < 5 ? '#dc2626' : '#16a34a' }),
    ],
  });
}

function trainerCard(name: string, specialty: string, color: string) {
  return frame(`Trainer: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 14, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`Av:${name}`, { size: { x: 56, y: 56 }, fills: [solid(color)] }),
      text(name, { fontSize: 14, fontWeight: 700, color: '#111827' }),
      text(specialty, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('GymMembershipPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#ef4444', position: 0 }, { hex: '#dc2626', position: 1 }], 90)],
      children: [
        text('IRONWORKS GYM', { fontSize: 22, fontWeight: 900, color: '#ffffff' }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('Plans', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
            text('Classes', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
            text('Trainers', { fontSize: 13, fontWeight: 400, color: '#ffffffcc' }),
          ],
        }),
      ],
    }),
    frame('TierSection', {
      autoLayout: vertical({ spacing: 14, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Membership Plans', { fontSize: 20, fontWeight: 800, color: '#111827' }),
        frame('TierRow', {
          autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            tierCard('Basic', '$29', ['Gym floor access', 'Locker room', 'Free WiFi'], '#ef4444', false),
            tierCard('Pro', '$59', ['All Basic perks', 'Group classes', 'Sauna & pool', 'Free towels'], '#ef4444', true),
            tierCard('Elite', '$99', ['All Pro perks', 'Personal trainer 2x/mo', 'Nutrition plan', 'Guest passes'], '#ef4444', false),
          ],
        }),
      ],
    }),
    frame('BottomArea', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Schedule', {
          autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
          fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text("Today's Classes", { fontSize: 16, fontWeight: 700, color: '#111827' }),
            classRow('6:00 AM', 'Morning HIIT', 'Coach Jake', 3),
            classRow('8:00 AM', 'Power Yoga', 'Maya S.', 8),
            classRow('12:00 PM', 'Boxing Circuit', 'Coach Jake', 12),
            classRow('5:30 PM', 'Spin Class', 'Rachel L.', 2),
            classRow('7:00 PM', 'CrossFit WOD', 'Mike T.', 6),
          ],
        }),
        frame('Trainers', {
          size: { x: 300 },
          autoLayout: vertical({ spacing: 10 }),
          children: [
            text('Our Trainers', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            trainerCard('Coach Jake', 'HIIT & Boxing', '#ef4444'),
            trainerCard('Maya Singh', 'Yoga & Pilates', '#8b5cf6'),
            trainerCard('Mike Torres', 'CrossFit & Strength', '#3b82f6'),
          ],
        }),
      ],
    }),
  ],
});
