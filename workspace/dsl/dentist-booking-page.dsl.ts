/**
 * Dentist Booking — Appointment booking with doctor profiles, time slots, and service list
 * DSL features: clean white cards, ellipse avatars, time slot pills, SPACE_BETWEEN, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function doctorCard(name: string, specialty: string, rating: string, avatarColor: string) {
  return frame(`Doctor: ${name}`, {
    autoLayout: horizontal({ spacing: 14, padX: 18, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Avatar', { size: { x: 52, y: 52 }, fills: [gradient([{ hex: avatarColor, position: 0 }, { hex: '#6366f1', position: 1 }], 135)] }),
      frame('Info', {
        autoLayout: vertical({ spacing: 3 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
          text(specialty, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
          text(rating, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
        ],
      }),
      frame('BookBtn', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 8 }),
        fills: [solid('#2563eb')],
        cornerRadius: 8,
        children: [text('Book', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
      }),
    ],
  });
}

function timeSlotPill(time: string, available: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(available ? '#eff6ff' : '#f1f5f9')],
    cornerRadius: 9999,
    strokes: available ? [{ color: { r: 0.58, g: 0.73, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }] : [],
    children: [text(time, { fontSize: 12, fontWeight: 600, color: available ? '#2563eb' : '#94a3b8' })],
  });
}

function serviceRow(name: string, price: string, duration: string) {
  return frame(`Service: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Left', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(duration, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      text(price, { fontSize: 14, fontWeight: 700, color: '#2563eb' }),
    ],
  });
}

export default frame('DentistBookingPage', {
  size: { x: 960 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 40, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('BrightSmile Dental', { fontSize: 22, fontWeight: 800, color: '#2563eb' }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Services', { fontSize: 13, fontWeight: 600, color: '#2563eb' }),
          text('Doctors', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
          text('Contact', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 40, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('DoctorsSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Dentists', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            doctorCard('Dr. Sarah Mitchell', 'Cosmetic Dentistry', '4.9 stars', '#3b82f6'),
            doctorCard('Dr. James Park', 'Orthodontics', '4.8 stars', '#8b5cf6'),
            doctorCard('Dr. Emily Chen', 'Pediatric Dentistry', '4.9 stars', '#06b6d4'),
          ],
        }),
        frame('TimeSlotsSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SlotHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Available Times — March 18', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
                text('View calendar', { fontSize: 13, fontWeight: 600, color: '#2563eb' }),
              ],
            }),
            frame('Slots', { autoLayout: horizontal({ spacing: 8 }), children: [
              timeSlotPill('9:00 AM', true), timeSlotPill('10:00 AM', false),
              timeSlotPill('11:30 AM', true), timeSlotPill('1:00 PM', true),
              timeSlotPill('2:30 PM', false), timeSlotPill('4:00 PM', true),
            ] }),
          ],
        }),
        frame('ServicesSection', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Services & Pricing', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            serviceRow('Routine Cleaning', '$120', '45 min'),
            serviceRow('Teeth Whitening', '$350', '60 min'),
            serviceRow('Dental Filling', '$200', '30 min'),
            serviceRow('Root Canal', '$850', '90 min'),
            serviceRow('Dental Crown', '$1,100', '2 visits'),
          ],
        }),
      ],
    }),
  ],
});
