/**
 * Hairstylist Salon — Service menu, stylist cards, and time slots
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceItem(name: string, price: string, duration: string) {
  return frame(`Service: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Info', { autoLayout: vertical({ spacing: 2 }), children: [
        text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        text(duration, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      text(price, { fontSize: 15, fontWeight: 700, color: '#be185d' }),
    ],
  });
}

function stylistCard(name: string, specialty: string, rating: string, color: string) {
  return frame(`Stylist: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', { size: { x: 56, y: 56 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#ec4899', position: 1 }], 135)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(specialty, { fontSize: 11, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
      text(`★ ${rating}`, { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
    ],
  });
}

function timeSlot(time: string, booked: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER' }),
    fills: [solid(booked ? '#f1f5f9' : '#fdf2f8')],
    cornerRadius: 8,
    children: [text(time, { fontSize: 12, fontWeight: 600, color: booked ? '#94a3b8' : '#be185d' })],
  });
}

export default frame('HairstylistPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fdf2f8')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 4, padX: 32, padY: 28 }),
      fills: [gradient([{ hex: '#831843', position: 0 }, { hex: '#be185d', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Luxe Salon', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Premium hair care — book your next appointment', { fontSize: 13, fontWeight: 400, color: '#ffffff99' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Services', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Services', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            serviceItem('Women\'s Haircut & Style', '$65', '60 min'),
            serviceItem('Men\'s Haircut', '$35', '30 min'),
            serviceItem('Balayage Highlights', '$180', '2.5 hrs'),
            serviceItem('Keratin Treatment', '$250', '3 hrs'),
            serviceItem('Blowout', '$45', '45 min'),
          ],
        }),
        frame('Stylists', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Stylists', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
            frame('StylistGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              stylistCard('Jessica Bloom', 'Color specialist', '4.9', '#a855f7'),
              stylistCard('David Park', 'Men\'s cuts', '4.8', '#3b82f6'),
              stylistCard('Maria Lopez', 'Bridal styling', '5.0', '#ec4899'),
            ] }),
          ],
        }),
        frame('Booking', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Available Times — Today', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
            frame('Slots', { autoLayout: horizontal({ spacing: 8 }), children: [
              timeSlot('9:00 AM', false), timeSlot('10:30 AM', true), timeSlot('12:00 PM', false),
              timeSlot('2:00 PM', false), timeSlot('3:30 PM', true), timeSlot('5:00 PM', false),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
