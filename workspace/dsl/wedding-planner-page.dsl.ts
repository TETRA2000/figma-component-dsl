/**
 * Wedding Planner — Timeline, vendor cards, RSVP tracker
 * DSL features: elegant serif-style, soft pastels, timeline with colored dots, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function timelineItem(time: string, event: string, location: string, done: boolean) {
  return frame(`TL: ${event}`, {
    autoLayout: horizontal({ spacing: 12, padX: 0, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Dot', { size: { x: 12, y: 12 }, fills: [solid(done ? '#ec4899' : '#e5e7eb')] }),
      frame('TLInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(event, { fontSize: 14, fontWeight: 600, color: done ? '#111827' : '#9ca3af' }),
        text(`${time} - ${location}`, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      ]}),
    ],
  });
}

function vendorCard(name: string, category: string, price: string, color: string) {
  return frame(`Vendor: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('VendorImg', { size: { x: 1, y: 100 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#fdf2f8', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#111827' }),
      text(category, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      text(price, { fontSize: 14, fontWeight: 700, color: '#ec4899' }),
    ],
  });
}

function rsvpRow(name: string, status: string, guests: string) {
  const statusColors: Record<string, string> = { Accepted: '#10b981', Pending: '#f59e0b', Declined: '#ef4444' };
  return frame(`RSVP: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 10, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 13, fontWeight: 500, color: '#111827' }),
      frame('StatusBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid((statusColors[status] || '#6b7280') + '1a')], cornerRadius: 4, children: [
        text(status, { fontSize: 11, fontWeight: 600, color: statusColors[status] || '#6b7280' }),
      ]}),
      text(guests, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('WeddingPlannerPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 24, padX: 48, padY: 40 }),
  fills: [solid('#fdf2f8')],
  children: [
    frame('WedHeader', { autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
      text('Sarah & James', { fontSize: 36, fontWeight: 700, color: '#831843' }),
      text('June 15, 2026 - The Grand Estate', { fontSize: 16, fontWeight: 400, color: '#9ca3af' }),
    ]}),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          text('Day Timeline', { fontSize: 18, fontWeight: 600, color: '#111827' }),
          timelineItem('2:00 PM', 'Guest Arrival', 'Grand Entrance', true),
          timelineItem('3:00 PM', 'Ceremony', 'Garden Chapel', true),
          timelineItem('4:00 PM', 'Cocktail Hour', 'Terrace', false),
          timelineItem('5:30 PM', 'Reception & Dinner', 'Grand Ballroom', false),
          timelineItem('8:00 PM', 'First Dance', 'Grand Ballroom', false),
          timelineItem('11:00 PM', 'Send-off', 'Main Drive', false),
        ]}),
        frame('RightCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          text('Vendors', { fontSize: 18, fontWeight: 600, color: '#111827' }),
          frame('VendorGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
            vendorCard('Bloom Studio', 'Florist', '$3,200', '#ec4899'),
            vendorCard('Lens & Light', 'Photography', '$4,500', '#8b5cf6'),
          ]}),
          text('RSVP Tracker', { fontSize: 18, fontWeight: 600, color: '#111827' }),
          rsvpRow('Emma Wilson', 'Accepted', '2 guests'),
          rsvpRow('Michael Brown', 'Accepted', '1 guest'),
          rsvpRow('Lisa Anderson', 'Pending', '3 guests'),
          rsvpRow('David Martinez', 'Declined', '0 guests'),
        ]}),
      ],
    }),
  ],
});
