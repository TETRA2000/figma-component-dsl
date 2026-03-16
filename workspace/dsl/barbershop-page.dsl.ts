/**
 * Barbershop Booking — Service menu, stylist cards, time slots
 * DSL features: dark theme, gold accents, ellipse avatars, price list with strokes, SPACE_BETWEEN
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceRow(name: string, duration: string, price: string) {
  return frame(`Svc:${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.25, g: 0.22, b: 0.18, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 14, fontWeight: 500, color: '#f5f0e8' }),
      text(duration, { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
      text(price, { fontSize: 16, fontWeight: 700, color: '#d4a537' }),
    ],
  });
}

function stylistCard(name: string, specialty: string, rating: string, color: string) {
  return frame(`Stylist:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#1c1917')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, {
        size: { x: 64, y: 64 },
        fills: [gradient([{ hex: '#d4a537', position: 0 }, { hex: color, position: 1 }], 135)],
      }),
      text(name, { fontSize: 16, fontWeight: 600, color: '#f5f0e8' }),
      text(specialty, { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
      text(rating, { fontSize: 13, fontWeight: 500, color: '#d4a537' }),
    ],
  });
}

function timeSlot(time: string, available: boolean) {
  return frame(`Slot:${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'CENTER' }),
    fills: [solid(available ? '#d4a53722' : '#1c191700')],
    cornerRadius: 6,
    strokes: [{ color: { r: 0.83, g: 0.65, b: 0.22, a: available ? 1 : 0.2 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(time, { fontSize: 12, fontWeight: 500, color: available ? '#d4a537' : '#57534e' })],
  });
}

export default frame('BarbershopPage', {
  size: { x: 960 },
  autoLayout: vertical({ spacing: 32, padX: 44, padY: 40 }),
  fills: [solid('#0f0d0a')],
  children: [
    frame('ShopHeader', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('GoldLine', { size: { x: 60, y: 2 }, fills: [solid('#d4a537')] }),
        text('THE GENTLEMAN', { fontSize: 32, fontWeight: 700, color: '#f5f0e8' }),
        text('BARBER SHOP', { fontSize: 14, fontWeight: 500, color: '#d4a537' }),
        rectangle('GoldLine2', { size: { x: 60, y: 2 }, fills: [solid('#d4a537')] }),
      ],
    }),
    frame('ServiceMenu', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MenuTitle', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10 }),
          children: [text('Services', { fontSize: 18, fontWeight: 600, color: '#f5f0e8' })],
        }),
        serviceRow('Classic Haircut', '30 min', '$35'),
        serviceRow('Beard Trim & Shape', '20 min', '$25'),
        serviceRow('Hot Towel Shave', '40 min', '$45'),
        serviceRow('Hair + Beard Combo', '50 min', '$55'),
        serviceRow('Kids Haircut', '20 min', '$20'),
      ],
    }),
    text('Our Barbers', { fontSize: 18, fontWeight: 600, color: '#f5f0e8' }),
    frame('StylistGrid', {
      autoLayout: horizontal({ spacing: 14 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stylistCard('Marcus', 'Fades & Tapers', '4.9 stars', '#44403c'),
        stylistCard('Tony', 'Classic Cuts', '4.8 stars', '#57534e'),
        stylistCard('Devon', 'Beard Specialist', '4.7 stars', '#78716c'),
        stylistCard('Ray', 'Creative Styles', '4.9 stars', '#44403c'),
      ],
    }),
    frame('TimeSlots', {
      autoLayout: vertical({ spacing: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Book a Slot - Today', { fontSize: 16, fontWeight: 600, color: '#f5f0e8' }),
        frame('SlotGrid', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            timeSlot('9:00 AM', true),
            timeSlot('10:00 AM', false),
            timeSlot('11:00 AM', true),
            timeSlot('12:00 PM', true),
            timeSlot('2:00 PM', false),
            timeSlot('3:00 PM', true),
          ],
        }),
      ],
    }),
  ],
});
