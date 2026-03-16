/**
 * Bus Schedule — Transit route cards, timetables, stop list
 * DSL features: route color badges, timetable rows, stop timeline dots, status indicators
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function routeCard(number: string, name: string, color: string, nextIn: string, status: string) {
  return frame(`Route: ${number}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('RouteNum', {
        size: { x: 44, y: 44 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(color)], cornerRadius: 10,
        children: [text(number, { fontSize: 16, fontWeight: 800, color: '#ffffff' })],
      }),
      frame('RouteInfo', {
        autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#111827' }),
          text(status, { fontSize: 11, fontWeight: 500, color: status === 'On Time' ? '#16a34a' : '#f59e0b' }),
        ],
      }),
      frame('NextBadge', {
        autoLayout: vertical({ spacing: 0, padX: 10, padY: 6, counterAlign: 'CENTER' }),
        fills: [solid('#eff6ff')], cornerRadius: 8,
        children: [
          text(nextIn, { fontSize: 14, fontWeight: 700, color: '#2563eb' }),
          text('min', { fontSize: 10, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

function timeRow(time: string, destination: string, platform: string, status: string) {
  const onTime = status === 'On Time';
  return frame(`Time: ${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(time, { fontSize: 13, fontWeight: 600, color: '#111827', size: { x: 65 } }),
      text(destination, { fontSize: 13, fontWeight: 400, color: '#374151', layoutSizingHorizontal: 'FILL' }),
      text(platform, { fontSize: 12, fontWeight: 500, color: '#6b7280', size: { x: 50 }, textAlignHorizontal: 'CENTER' }),
      frame('StatusDot', {
        autoLayout: horizontal({ spacing: 4, padX: 8, padY: 3, counterAlign: 'CENTER' }),
        fills: [solid(onTime ? '#f0fdf4' : '#fef3c7')], cornerRadius: 9999,
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(onTime ? '#16a34a' : '#f59e0b')] }),
          text(status, { fontSize: 10, fontWeight: 600, color: onTime ? '#16a34a' : '#d97706' }),
        ],
      }),
    ],
  });
}

function stopItem(name: string, time: string, isNext: boolean) {
  return frame(`Stop: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padY: 6, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Dot:${name}`, { size: { x: 12, y: 12 }, fills: [solid(isNext ? '#2563eb' : '#d1d5db')] }),
      text(name, { fontSize: 13, fontWeight: isNext ? 600 : 400, color: isNext ? '#111827' : '#6b7280', layoutSizingHorizontal: 'FILL' }),
      text(time, { fontSize: 12, fontWeight: 500, color: isNext ? '#2563eb' : '#9ca3af' }),
    ],
  });
}

export default frame('BusSchedulePage', {
  size: { x: 700 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#2563eb')],
      children: [
        text('CityTransit', { fontSize: 20, fontWeight: 800, color: '#ffffff' }),
        text('Live Departures', { fontSize: 12, fontWeight: 500, color: '#93c5fd' }),
      ],
    }),
    frame('Routes', {
      autoLayout: vertical({ spacing: 8, padX: 24, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Nearby Routes', { fontSize: 16, fontWeight: 700, color: '#111827' }),
        routeCard('14', 'Downtown Express', '#2563eb', '3', 'On Time'),
        routeCard('22', 'Airport Shuttle', '#16a34a', '8', 'On Time'),
        routeCard('7', 'Waterfront Loop', '#f59e0b', '12', 'Delayed 5 min'),
      ],
    }),
    frame('BottomArea', {
      autoLayout: horizontal({ spacing: 16, padX: 24, padY: 12 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Timetable', {
          autoLayout: vertical({ spacing: 4, padX: 0, padY: 12 }),
          fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Route 14 — Timetable', { fontSize: 14, fontWeight: 700, color: '#111827' }),
            timeRow('2:15 PM', 'Central Station', 'Bay 3', 'On Time'),
            timeRow('2:30 PM', 'Market Square', 'Bay 1', 'On Time'),
            timeRow('2:45 PM', 'University', 'Bay 2', 'Delayed'),
            timeRow('3:00 PM', 'Central Station', 'Bay 3', 'On Time'),
            timeRow('3:15 PM', 'Riverside', 'Bay 4', 'On Time'),
          ],
        }),
        frame('StopList', {
          size: { x: 220 },
          autoLayout: vertical({ spacing: 2, padX: 14, padY: 14 }),
          fills: [solid('#ffffff')], cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Route 14 Stops', { fontSize: 14, fontWeight: 700, color: '#111827' }),
            stopItem('Central Station', '2:15', false),
            stopItem('Main & 5th', '2:19', false),
            stopItem('City Hall', '2:23', true),
            stopItem('Market Square', '2:27', false),
            stopItem('Park Ave', '2:31', false),
            stopItem('University', '2:38', false),
          ],
        }),
      ],
    }),
  ],
});
