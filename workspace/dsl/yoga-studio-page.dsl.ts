/**
 * Yoga Studio — Class schedule, instructor bios, and membership plans
 * DSL features: soft gradients, ellipse avatars, FILL columns, cornerRadius, centered text
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function classRow(name: string, time: string, level: string, instructor: string) {
  return frame(`Class: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.90, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Left', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e1b4b' }),
        text(`${time} · ${instructor}`, { fontSize: 11, fontWeight: 400, color: '#7c7399' }),
      ] }),
      frame('LevelBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
        fills: [solid(level === 'Beginner' ? '#ecfdf5' : level === 'Intermediate' ? '#fffbeb' : '#fef2f2')],
        cornerRadius: 9999,
        children: [text(level, { fontSize: 11, fontWeight: 600, color: level === 'Beginner' ? '#059669' : level === 'Intermediate' ? '#d97706' : '#dc2626' })],
      }),
    ],
  });
}

function instructorCard(name: string, focus: string, years: number, color: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.90, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Avatar', { size: { x: 56, y: 56 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#a78bfa', position: 1 }], 135)] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e1b4b', textAlignHorizontal: 'CENTER' }),
      text(focus, { fontSize: 12, fontWeight: 400, color: '#7c7399', textAlignHorizontal: 'CENTER' }),
      text(`${years} years experience`, { fontSize: 11, fontWeight: 500, color: '#8b5cf6', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function planCard(name: string, price: string, perks: string[], highlight: boolean) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 22, counterAlign: 'CENTER' }),
    fills: [solid(highlight ? '#7c3aed' : '#ffffff')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    strokes: highlight ? [] : [{ color: { r: 0.88, g: 0.83, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 18, fontWeight: 700, color: highlight ? '#ffffff' : '#1e1b4b', textAlignHorizontal: 'CENTER' }),
      text(price, { fontSize: 32, fontWeight: 800, color: highlight ? '#ffffff' : '#7c3aed', textAlignHorizontal: 'CENTER' }),
      text('/month', { fontSize: 12, fontWeight: 400, color: highlight ? '#c4b5fd' : '#a78bfa', textAlignHorizontal: 'CENTER' }),
      ...perks.map(p => text(p, { fontSize: 12, fontWeight: 400, color: highlight ? '#e9d5ff' : '#64748b', textAlignHorizontal: 'CENTER' })),
    ],
  });
}

export default frame('YogaStudioPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#faf5ff')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Serene Flow Yoga', { fontSize: 30, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Find your balance, breathe deeply', { fontSize: 14, fontWeight: 400, color: '#e9d5ff', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Schedule', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text("Today's Classes", { fontSize: 20, fontWeight: 700, color: '#1e1b4b' }),
            classRow('Morning Vinyasa', '7:00 AM', 'Intermediate', 'Maya'),
            classRow('Gentle Hatha', '9:30 AM', 'Beginner', 'Liam'),
            classRow('Power Flow', '12:00 PM', 'Advanced', 'Ava'),
            classRow('Yin Restore', '5:30 PM', 'Beginner', 'Priya'),
          ],
        }),
        frame('Instructors', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Instructors', { fontSize: 20, fontWeight: 700, color: '#1e1b4b' }),
            frame('InstructorGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              instructorCard('Maya Patel', 'Vinyasa & Ashtanga', 12, '#8b5cf6'),
              instructorCard('Liam Brooks', 'Hatha & Meditation', 8, '#06b6d4'),
              instructorCard('Ava Santos', 'Power & Hot Yoga', 10, '#ec4899'),
              instructorCard('Priya Sharma', 'Yin & Restorative', 6, '#10b981'),
            ] }),
          ],
        }),
        frame('Plans', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Membership Plans', { fontSize: 20, fontWeight: 700, color: '#1e1b4b', textAlignHorizontal: 'CENTER' }),
            frame('PlanGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              planCard('Drop-In', '$20', ['Single class access', 'Mat rental included'], false),
              planCard('Unlimited', '$99', ['Unlimited classes', 'Guest passes', 'Workshop access'], true),
              planCard('10-Pack', '$150', ['10 class credits', 'Valid 3 months'], false),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
