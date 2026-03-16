/**
 * Veterinary Clinic — Service cards, pet records, and appointment booking
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceCard(name: string, desc: string, price: string, color: string) {
  return frame(`Service: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Icon', { size: { x: 40, y: 40 }, autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }), fills: [solid(color + '15')], cornerRadius: 10, children: [
        text(name.charAt(0), { fontSize: 18, fontWeight: 700, color }),
      ] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
      text(`From ${price}`, { fontSize: 14, fontWeight: 700, color }),
    ],
  });
}

function petRecord(name: string, species: string, lastVisit: string, nextDue: string) {
  return frame(`Pet: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PetInfo', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        ellipse('PetAvatar', { size: { x: 36, y: 36 }, fills: [solid('#dbeafe')] }),
        frame('Details', { autoLayout: vertical({ spacing: 2 }), children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          text(species, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
        ] }),
      ] }),
      frame('Dates', { autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }), children: [
        text(`Last: ${lastVisit}`, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
        text(`Next: ${nextDue}`, { fontSize: 11, fontWeight: 600, color: '#2563eb' }),
      ] }),
    ],
  });
}

function appointmentSlot(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#ecfdf5' : '#f1f5f9')],
    cornerRadius: 8,
    children: [text(time, { fontSize: 12, fontWeight: 600, color: available ? '#059669' : '#94a3b8' })],
  });
}

export default frame('VeterinaryPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 32 }),
      fills: [gradient([{ hex: '#064e3b', position: 0 }, { hex: '#059669', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('PawCare Veterinary Clinic', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Compassionate care for your furry family members', { fontSize: 14, fontWeight: 400, color: '#a7f3d0' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Services', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Services', { fontSize: 20, fontWeight: 700, color: '#064e3b' }),
            frame('ServiceGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              serviceCard('Wellness Exam', 'Annual checkup and vaccinations', '$85', '#059669'),
              serviceCard('Dental Cleaning', 'Professional teeth cleaning under sedation', '$280', '#2563eb'),
              serviceCard('Surgery', 'Spay/neuter and soft tissue procedures', '$350', '#7c3aed'),
              serviceCard('Emergency', '24/7 urgent care for critical cases', '$150', '#ef4444'),
            ] }),
          ],
        }),
        frame('Records', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Your Pets', { fontSize: 18, fontWeight: 700, color: '#064e3b' }),
            petRecord('Buddy', 'Golden Retriever · 4 yrs', 'Jan 15, 2026', 'Jul 15, 2026'),
            petRecord('Whiskers', 'Domestic Shorthair · 7 yrs', 'Nov 3, 2025', 'May 3, 2026'),
            petRecord('Luna', 'French Bulldog · 2 yrs', 'Feb 20, 2026', 'Aug 20, 2026'),
          ],
        }),
        frame('Booking', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book Appointment', { fontSize: 18, fontWeight: 700, color: '#064e3b' }),
            text('Available slots for March 18, 2026', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
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
