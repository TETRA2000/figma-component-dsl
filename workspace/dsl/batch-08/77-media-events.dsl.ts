/**
 * Event Calendar — Month View + Event Cards + Venue Info + Featured Carousel
 * Batch 8, Page 7: Media/Entertainment — Event discovery and calendar
 * DSL Features: grid layout, gradient cards, dark theme, multi-section
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaEvents', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Nav
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('EVENTSCAPE', { fontSize: 20, fontWeight: 800, color: '#e11d48' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Events', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            text('Venues', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Artists', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('My Tickets', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
          ],
        }),
      ],
    }),

    // Featured Events Carousel Area
    frame('FeaturedSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Featured Events', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
        frame('CarouselRow', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            featuredEvent('Neon Dreams Festival', 'Apr 12-14', 'Riverside Amphitheater', '$89', '#3d0a2d', '#1a0a1a', '#0a0a0a'),
            featuredEvent('Jazz Under the Stars', 'Apr 20', 'Central Park Pavilion', '$45', '#0a2d3d', '#0a1a20', '#0a0a0a'),
            featuredEvent('Electronic Pulse', 'May 3', 'The Warehouse', '$65', '#2d1a0a', '#1a0a00', '#0a0a0a'),
          ],
        }),
      ],
    }),

    // Calendar Section
    frame('CalendarSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Month Header
        frame('MonthHeader', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('◀', { fontSize: 18, fontWeight: 400, color: '#a3a3a3' }),
            frame('MonthSpacer1', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            text('March 2026', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
            frame('MonthSpacer2', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            text('▶', { fontSize: 18, fontWeight: 400, color: '#a3a3a3' }),
          ],
        }),

        // Day Labels
        frame('DayLabels', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d =>
            frame(`Day: ${d}`, {
              autoLayout: horizontal({ padX: 0, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text(d, { fontSize: 12, fontWeight: 600, color: '#525252' }),
              ],
            })
          ),
        }),

        // Calendar Grid (5 weeks)
        calendarWeek([null, null, null, null, null, null, 1], []),
        calendarWeek([2, 3, 4, 5, 6, 7, 8], [{ day: 5, label: 'Live Jazz' }]),
        calendarWeek([9, 10, 11, 12, 13, 14, 15], [{ day: 12, label: 'Neon Dreams' }, { day: 15, label: 'Comedy Night' }]),
        calendarWeek([16, 17, 18, 19, 20, 21, 22], [{ day: 20, label: 'Jazz Stars' }]),
        calendarWeek([23, 24, 25, 26, 27, 28, 29], [{ day: 25, label: 'Open Mic' }]),
        calendarWeek([30, 31, null, null, null, null, null], []),
      ],
    }),

    // Upcoming Events List
    frame('UpcomingEvents', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Upcoming Events', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        eventListItem('Live Jazz Thursdays', 'Mar 5', 'Blue Note Lounge', '8:00 PM', '$25', 'Available'),
        eventListItem('Neon Dreams Festival', 'Apr 12-14', 'Riverside Amphitheater', 'All Day', '$89', 'Selling Fast'),
        eventListItem('Comedy Night Live', 'Mar 15', 'Laugh Factory', '9:30 PM', '$35', 'Available'),
        eventListItem('Jazz Under the Stars', 'Apr 20', 'Central Park Pavilion', '7:00 PM', '$45', 'Available'),
        eventListItem('Electronic Pulse', 'May 3', 'The Warehouse', '10:00 PM', '$65', 'Limited'),
        eventListItem('Acoustic Sessions', 'May 10', 'The Living Room', '6:00 PM', '$20', 'Available'),
      ],
    }),
  ],
});

function featuredEvent(title: string, date: string, venue: string, price: string, g1: string, g2: string, g3: string) {
  return frame(`Featured: ${title}`, {
    size: { x: 420, y: 240 },
    autoLayout: vertical({ spacing: 8, padX: 24, padY: 20, align: 'MAX' }),
    fills: [
      gradient([
        { hex: g1, position: 0 },
        { hex: g2, position: 0.5 },
        { hex: g3, position: 1 },
      ], 270),
    ],
    cornerRadius: 12,
    clipContent: true,
    children: [
      frame('PriceTag', {
        autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#e11d48')],
        cornerRadius: 4,
        children: [
          text(`From ${price}`, { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
        ],
      }),
      text(title, { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
      text(`${date}  •  ${venue}`, { fontSize: 13, fontWeight: 400, color: '#d4d4d4' }),
    ],
  });
}

function calendarWeek(days: (number | null)[], events: { day: number; label: string }[]) {
  const weekNum = days.find(d => d !== null) || 0;
  return frame(`Week ${weekNum}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: days.map(d => {
      const event = events.find(e => e.day === d);
      return frame(`Cell ${d || 'empty'}`, {
        size: { x: 188, y: 72 },
        autoLayout: vertical({ spacing: 4, padX: 8, padY: 6 }),
        fills: [solid(d === 15 ? '#1a1a1a' : '#111111')],
        strokes: [{ color: { r: 0.12, g: 0.12, b: 0.12, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          ...(d !== null ? [
            text(`${d}`, { fontSize: 13, fontWeight: d === 15 ? 700 : 400, color: d === 15 ? '#e11d48' : '#a3a3a3' }),
          ] : []),
          ...(event ? [
            frame(`Event: ${event.label}`, {
              autoLayout: horizontal({ padX: 6, padY: 2 }),
              fills: [solid('#e11d48', 0.2)],
              cornerRadius: 3,
              children: [
                text(event.label, { fontSize: 10, fontWeight: 600, color: '#e11d48' }),
              ],
            }),
          ] : []),
        ],
      });
    }),
  });
}

function eventListItem(title: string, date: string, venue: string, time: string, price: string, availability: string) {
  const availColor = availability === 'Selling Fast' ? '#f59e0b' : availability === 'Limited' ? '#ef4444' : '#22c55e';
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#111111')],
    cornerRadius: 10,
    children: [
      // Date block
      frame('DateBlock', {
        autoLayout: vertical({ spacing: 0, padX: 12, padY: 8, counterAlign: 'CENTER' }),
        fills: [solid('#e11d48')],
        cornerRadius: 8,
        size: { x: 64, y: 56 },
        children: [
          text(date.split(' ')[0].split('-')[0], { fontSize: 11, fontWeight: 600, color: '#fecdd3' }),
          text(date.split(' ')[1] || date.split(' ')[0], { fontSize: 16, fontWeight: 800, color: '#ffffff' }),
        ],
      }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 4, padX: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          text(`${venue}  •  ${time}`, { fontSize: 13, fontWeight: 400, color: '#a3a3a3' }),
        ],
      }),
      frame('EventRight', {
        autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
        size: { x: 120, y: undefined },
        children: [
          text(price, { fontSize: 18, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'RIGHT' }),
          text(availability, { fontSize: 12, fontWeight: 600, color: availColor, textAlignHorizontal: 'RIGHT' }),
        ],
      }),
    ],
  });
}
