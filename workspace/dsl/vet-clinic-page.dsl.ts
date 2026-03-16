/**
 * Veterinary Clinic — Pet profiles, appointment scheduler, and service cards
 * DSL features: soft colors, ellipse pet avatars, card grid, strokes, FILL sizing
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function petProfile(name: string, breed: string, age: string, nextVisit: string, color: string) {
  return frame(`Pet: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.90, g: 0.94, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('PetAvatar', { size: { x: 48, y: 48 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#86efac', position: 1 }], 135)] }),
      frame('PetInfo', { autoLayout: vertical({ spacing: 3 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 15, fontWeight: 600, color: '#14532d' }),
        text(`${breed} · ${age}`, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      ] }),
      frame('NextVisit', { autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }), children: [
        text('Next visit', { fontSize: 10, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'RIGHT' }),
        text(nextVisit, { fontSize: 12, fontWeight: 600, color: '#059669', textAlignHorizontal: 'RIGHT' }),
      ] }),
    ],
  });
}

function serviceCard(name: string, price: string, desc: string, color: string) {
  return frame(`Service: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.90, g: 0.94, b: 0.90, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Icon', { size: { x: 38, y: 38 }, autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }), fills: [solid(color + '15')], cornerRadius: 10, children: [
        text(name.charAt(0), { fontSize: 16, fontWeight: 700, color }),
      ] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#14532d' }),
      text(desc, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      text(`From ${price}`, { fontSize: 13, fontWeight: 700, color }),
    ],
  });
}

function appointmentSlot(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#ecfdf5' : '#f1f5f9')],
    cornerRadius: 9999,
    strokes: available ? [{ color: { r: 0.60, g: 0.90, b: 0.72, a: 1 }, weight: 1, align: 'INSIDE' as const }] : [],
    children: [text(time, { fontSize: 12, fontWeight: 600, color: available ? '#059669' : '#94a3b8' })],
  });
}

export default frame('VetClinicPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32 }),
      fills: [gradient([{ hex: '#14532d', position: 0 }, { hex: '#059669', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Happy Paws Vet Clinic', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Caring for your pets like family', { fontSize: 14, fontWeight: 400, color: '#bbf7d0' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Pets', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Your Pets', { fontSize: 20, fontWeight: 700, color: '#14532d' }),
            petProfile('Buddy', 'Golden Retriever', '4 yrs', 'Jul 15', '#22c55e'),
            petProfile('Whiskers', 'Maine Coon', '6 yrs', 'May 3', '#f59e0b'),
            petProfile('Luna', 'French Bulldog', '2 yrs', 'Aug 20', '#8b5cf6'),
          ],
        }),
        frame('Services', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Services', { fontSize: 20, fontWeight: 700, color: '#14532d' }),
            frame('ServiceGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              serviceCard('Wellness Exam', '$85', 'Annual checkup and vaccinations', '#059669'),
              serviceCard('Dental Care', '$280', 'Professional teeth cleaning', '#3b82f6'),
              serviceCard('Surgery', '$350', 'Spay/neuter and soft tissue', '#8b5cf6'),
              serviceCard('Emergency', '$150', '24/7 urgent care visits', '#ef4444'),
            ] }),
          ],
        }),
        frame('Appointment', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('ApptHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
              text('Book Appointment', { fontSize: 18, fontWeight: 700, color: '#14532d' }),
              text('March 18, 2026', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
            ] }),
            frame('Slots', { autoLayout: horizontal({ spacing: 8 }), children: [
              appointmentSlot('8:00 AM', true), appointmentSlot('9:30 AM', false),
              appointmentSlot('11:00 AM', true), appointmentSlot('1:00 PM', true),
              appointmentSlot('3:00 PM', false), appointmentSlot('4:30 PM', true),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
