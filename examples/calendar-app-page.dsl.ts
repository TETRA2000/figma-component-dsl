import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const violet = '#7c3aed'; const violetBg = '#f5f3ff'; const white = '#ffffff'; const bg = '#fafaf9';
const dark = '#1c1917'; const med = '#78716c'; const light = '#a8a29e'; const border = '#e7e5e4';
const blue = '#3b82f6'; const green = '#16a34a'; const red = '#dc2626'; const amber = '#d97706';

function calendarDay(day: string, isToday: boolean, hasEvent: boolean, eventColor?: string) {
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 4, padX: 0, padY: 6, counterAlign: 'CENTER' }),
    size: { x: 44, y: 50 },
    fills: isToday ? [solid(violet)] : [],
    cornerRadius: 10,
    children: [
      text(day, { fontSize: 14, fontWeight: isToday ? 700 : 400, color: isToday ? white : (day === 'S' ? light : dark), textAlignHorizontal: 'CENTER' as const }),
      ...(hasEvent ? [ellipse('EventDot', { size: { x: 6, y: 6 }, fills: [solid(isToday ? white : (eventColor ?? violet))] })] : []),
    ],
  });
}

function eventBlock(title: string, time: string, color: string, location?: string) {
  return frame(`Event: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(color, 0.08)],
    cornerRadius: 10,
    children: [
      rectangle('EventBar', { size: { x: 4, y: 40 }, fills: [solid(color)], cornerRadius: 2 }),
      frame('EventInfo', { autoLayout: vertical({ spacing: 2 }), children: [
        text(title, { fontSize: 14, fontWeight: 600, color: dark }),
        text(time, { fontSize: 12, fontWeight: 400, color: med }),
        ...(location ? [text(location, { fontSize: 11, fontWeight: 400, color: light })] : []),
      ]}),
    ],
  });
}

function miniCalendarRow(days: string[]) {
  return frame('CalRow', {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: days.map((d, i) => text(d, { fontSize: 12, fontWeight: 400, color: d === '14' ? violet : (i === 0 || i === 6 ? light : med), textAlignHorizontal: 'CENTER' as const })),
  });
}

function attendee(name: string, status: string, statusColor: string) {
  return frame(`Attendee: ${name}`, {
    autoLayout: horizontal({ spacing: 8, padY: 6, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AttLeft', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
        ellipse('AttAvatar', { size: { x: 28, y: 28 }, fills: [solid(violet, 0.15)] }),
        text(name, { fontSize: 13, fontWeight: 400, color: dark }),
      ]}),
      text(status, { fontSize: 11, fontWeight: 500, color: statusColor }),
    ],
  });
}

export default frame('CalendarApp', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          rectangle('LogoMark', { size: { x: 24, y: 24 }, fills: [solid(violet)], cornerRadius: 6 }),
          text('CalendarPro', { fontSize: 18, fontWeight: 700, color: dark }),
        ]}),
        frame('DateNav', { autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }), children: [
          text('< March 2026 >', { fontSize: 16, fontWeight: 600, color: dark }),
          frame('TodayBtn', {
            autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(violet)], cornerRadius: 8,
            children: [text('Today', { fontSize: 13, fontWeight: 600, color: white })],
          }),
        ]}),
        frame('ViewToggle', { autoLayout: horizontal({ spacing: 0 }), children: [
          frame('DayBtn', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(violetBg)], cornerRadius: 6, children: [text('Day', { fontSize: 13, fontWeight: 600, color: violet })] }),
          frame('WeekBtn', { autoLayout: horizontal({ padX: 12, padY: 6 }), children: [text('Week', { fontSize: 13, fontWeight: 400, color: med })] }),
          frame('MonthBtn', { autoLayout: horizontal({ padX: 12, padY: 6 }), children: [text('Month', { fontSize: 13, fontWeight: 400, color: med })] }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Calendar grid + events
        frame('LeftCol', { autoLayout: vertical({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          // Week strip
          frame('WeekStrip', {
            autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'SPACE_BETWEEN' }),
            fills: [solid(white)], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [
              calendarDay('10', false, false),
              calendarDay('11', false, true, blue),
              calendarDay('12', false, false),
              calendarDay('13', false, true, amber),
              calendarDay('14', true, true),
              calendarDay('15', false, false),
              calendarDay('16', false, true, green),
            ],
          }),
          // Today's events
          frame('TodayEvents', {
            autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }), fills: [solid(white)],
            cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [
              frame('TodayHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Friday, March 14', { fontSize: 18, fontWeight: 700, color: dark }),
                text('4 events', { fontSize: 13, fontWeight: 400, color: med }),
              ]}),
              eventBlock('Team Standup', '9:00 AM - 9:30 AM', violet, 'Zoom Meeting'),
              eventBlock('Design Review', '10:00 AM - 11:00 AM', blue, 'Conference Room B'),
              eventBlock('Lunch with Sarah', '12:30 PM - 1:30 PM', green, 'Café Downtown'),
              eventBlock('Sprint Planning', '2:00 PM - 3:00 PM', amber, 'Zoom Meeting'),
            ],
          }),
        ]}),
        // Right: Mini calendar + details
        frame('RightCol', { autoLayout: vertical({ spacing: 16 }), size: { x: 320, y: undefined }, children: [
          // Mini calendar
          frame('MiniCalendar', {
            autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }), fills: [solid(white)],
            cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [
              text('March 2026', { fontSize: 14, fontWeight: 600, color: dark }),
              miniCalendarRow(['S', 'M', 'T', 'W', 'T', 'F', 'S']),
              miniCalendarRow(['1', '2', '3', '4', '5', '6', '7']),
              miniCalendarRow(['8', '9', '10', '11', '12', '13', '14']),
              miniCalendarRow(['15', '16', '17', '18', '19', '20', '21']),
              miniCalendarRow(['22', '23', '24', '25', '26', '27', '28']),
              miniCalendarRow(['29', '30', '31', ' ', ' ', ' ', ' ']),
            ],
          }),
          // Event details
          frame('EventDetail', {
            autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }), fills: [solid(white)],
            cornerRadius: 14, layoutSizingHorizontal: 'FILL',
            strokes: [{ color: { r: 0.91, g: 0.9, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
            children: [
              frame('DetailHeader', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
                rectangle('EventColor', { size: { x: 12, y: 12 }, fills: [solid(blue)], cornerRadius: 3 }),
                text('Design Review', { fontSize: 16, fontWeight: 600, color: dark }),
              ]}),
              text('10:00 AM - 11:00 AM', { fontSize: 13, fontWeight: 400, color: med }),
              text('Conference Room B', { fontSize: 13, fontWeight: 400, color: med }),
              rectangle('Divider', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
              text('Attendees', { fontSize: 13, fontWeight: 600, color: dark }),
              attendee('Alex Rivera', 'Accepted', green),
              attendee('Sarah Chen', 'Accepted', green),
              attendee('James Wu', 'Tentative', amber),
              attendee('Maya Patel', 'Pending', med),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
