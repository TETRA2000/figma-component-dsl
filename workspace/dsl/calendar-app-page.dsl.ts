/**
 * Calendar App — Week view with day columns, mini calendar, events
 * DSL features: two-panel layout, colored left borders via rectangles, grid-like day columns, small text sizes
 */
import { frame, text, rectangle, solid, horizontal, vertical } from '@figma-dsl/core';

function calendarEvent(title: string, time: string, location: string, color: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('ColorBar', { size: { x: 3, y: 1 }, fills: [solid(color)], cornerRadius: 2, layoutSizingVertical: 'FILL' }),
      frame('EventInfo', {
        autoLayout: vertical({ spacing: 2, padX: 10, padY: 8 }),
        fills: [solid(color + '0d')],
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 12, fontWeight: 600, color: color }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
          text(location, { fontSize: 10, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function dayColumn(day: string, date: string, isToday: boolean, events: ReturnType<typeof calendarEvent>[]) {
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 8, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DayHeader', {
        autoLayout: vertical({ spacing: 2, padY: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid(isToday ? '#3b82f6' : '#00000000')],
        cornerRadius: 8,
        children: [
          text(day, { fontSize: 11, fontWeight: 500, color: isToday ? '#ffffff' : '#9ca3af', textAlignHorizontal: 'CENTER' }),
          text(date, { fontSize: 16, fontWeight: 700, color: isToday ? '#ffffff' : '#111827', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      ...events,
    ],
  });
}

function miniCalRow(days: string[]) {
  return frame('Row', {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: days.map(d => text(d, { fontSize: 11, fontWeight: 400, color: d === '16' ? '#3b82f6' : '#6b7280', textAlignHorizontal: 'CENTER' })),
  });
}

export default frame('CalendarAppPage', {
  size: { x: 1100 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Sidebar
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 24, padX: 20, padY: 24 }),
      fills: [solid('#f9fafb')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('March 2026', { fontSize: 16, fontWeight: 700, color: '#111827' }),
        frame('MiniCal', {
          autoLayout: vertical({ spacing: 6 }),
          children: [
            miniCalRow(['S', 'M', 'T', 'W', 'T', 'F', 'S']),
            miniCalRow(['1', '2', '3', '4', '5', '6', '7']),
            miniCalRow(['8', '9', '10', '11', '12', '13', '14']),
            miniCalRow(['15', '16', '17', '18', '19', '20', '21']),
            miniCalRow(['22', '23', '24', '25', '26', '27', '28']),
            miniCalRow(['29', '30', '31', '-', '-', '-', '-']),
          ],
        }),
        frame('UpcomingSection', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('Upcoming', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            calendarEvent('Team Standup', '9:00 AM', 'Zoom', '#3b82f6'),
            calendarEvent('Lunch with Sara', '12:30 PM', 'Cafe Roma', '#10b981'),
            calendarEvent('Design Review', '3:00 PM', 'Conf Room B', '#f59e0b'),
          ],
        }),
      ],
    }),
    // Main week view
    frame('WeekView', {
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('WeekHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Week of March 16, 2026', { fontSize: 20, fontWeight: 700, color: '#111827' }),
            frame('NavBtns', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                text('Prev', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
                text('Today', { fontSize: 13, fontWeight: 600, color: '#3b82f6' }),
                text('Next', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
              ],
            }),
          ],
        }),
        frame('DaysRow', {
          autoLayout: horizontal({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            dayColumn('MON', '16', true, [
              calendarEvent('Team Standup', '9:00 - 9:30', 'Zoom', '#3b82f6'),
              calendarEvent('Lunch with Sara', '12:30 - 1:30', 'Cafe Roma', '#10b981'),
              calendarEvent('Design Review', '3:00 - 4:00', 'Conf Room B', '#f59e0b'),
            ]),
            dayColumn('TUE', '17', false, [
              calendarEvent('Sprint Planning', '10:00 - 11:00', 'Main Office', '#3b82f6'),
              calendarEvent('Yoga Class', '6:00 - 7:00', 'Studio A', '#10b981'),
            ]),
            dayColumn('WED', '18', false, [
              calendarEvent('1:1 with Manager', '11:00 - 11:30', 'Office', '#f59e0b'),
              calendarEvent('Code Review', '2:00 - 3:00', 'Virtual', '#3b82f6'),
            ]),
            dayColumn('THU', '19', false, [
              calendarEvent('All Hands', '10:00 - 11:00', 'Auditorium', '#f59e0b'),
              calendarEvent('Dentist', '4:00 - 5:00', 'Dr. Smith', '#ef4444'),
            ]),
            dayColumn('FRI', '20', false, [
              calendarEvent('Demo Day', '2:00 - 3:30', 'Main Stage', '#3b82f6'),
              calendarEvent('Happy Hour', '5:00 - 7:00', 'Rooftop Bar', '#10b981'),
            ]),
          ],
        }),
      ],
    }),
  ],
});
