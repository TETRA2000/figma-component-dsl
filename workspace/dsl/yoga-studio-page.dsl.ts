/**
 * Yoga Studio — Class schedule, instructor bios, and pricing
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function classRow(time: string, name: string, level: string, instructor: string, levelColor: string) {
  return frame(`Class: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Info', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        text(time, { fontSize: 13, fontWeight: 700, color: '#7c3aed' }),
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(instructor, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      frame('LevelBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(levelColor + '15')], cornerRadius: 9999, children: [
        text(level, { fontSize: 11, fontWeight: 600, color: levelColor }),
      ] }),
    ],
  });
}

function instructorBio(name: string, style: string, years: number, color: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', { size: { x: 52, y: 52 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#a78bfa', position: 1 }], 135)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(style, { fontSize: 12, fontWeight: 400, color: '#7c3aed', textAlignHorizontal: 'CENTER' }),
      text(`${years} years experience`, { fontSize: 11, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function pricingCard(name: string, price: string, period: string, features: string[], highlighted: boolean) {
  return frame(`Price: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid(highlighted ? '#7c3aed' : '#ffffff')],
    cornerRadius: 12,
    strokes: highlighted ? [] : [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 16, fontWeight: 700, color: highlighted ? '#ffffff' : '#1e293b' }),
      text(price, { fontSize: 28, fontWeight: 800, color: highlighted ? '#ffffff' : '#7c3aed' }),
      text(period, { fontSize: 12, fontWeight: 400, color: highlighted ? '#ffffffb3' : '#94a3b8' }),
      ...features.map(f => text(`✓ ${f}`, { fontSize: 12, fontWeight: 400, color: highlighted ? '#ffffffcc' : '#475569' })),
    ],
  });
}

export default frame('YogaStudioPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf5ff')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 4, padX: 32, padY: 28, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#4c1d95', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Serenity Yoga', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Find your balance — body, mind, spirit', { fontSize: 13, fontWeight: 400, color: '#c4b5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Schedule', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Today\'s Classes', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            classRow('6:30 AM', 'Sunrise Flow', 'Beginner', 'Maya Chen', '#22c55e'),
            classRow('9:00 AM', 'Power Vinyasa', 'Advanced', 'Raj Patel', '#ef4444'),
            classRow('12:00 PM', 'Gentle Stretch', 'All Levels', 'Lina Kim', '#3b82f6'),
            classRow('5:30 PM', 'Hot Yoga', 'Intermediate', 'James Okoye', '#f59e0b'),
            classRow('7:00 PM', 'Yin & Restore', 'Beginner', 'Maya Chen', '#22c55e'),
          ],
        }),
        frame('Instructors', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Instructors', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('InstructorGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              instructorBio('Maya Chen', 'Hatha & Yin', 12, '#ec4899'),
              instructorBio('Raj Patel', 'Ashtanga & Vinyasa', 8, '#f59e0b'),
              instructorBio('Lina Kim', 'Restorative', 6, '#22d3ee'),
            ] }),
          ],
        }),
        frame('Pricing', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Membership Plans', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('PriceGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              pricingCard('Drop-In', '$20', 'per class', ['Single class', 'Mat rental'], false),
              pricingCard('Monthly', '$89', 'per month', ['Unlimited classes', 'Free mat rental', 'Guest passes'], true),
              pricingCard('Annual', '$799', 'per year', ['Unlimited classes', 'Workshops included', 'Retail discounts'], false),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
