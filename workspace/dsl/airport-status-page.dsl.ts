/**
 * Airport Status — Departures/arrivals table, gate info, and status indicators
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function flightRow(flight: string, dest: string, time: string, gate: string, status: string, statusColor: string) {
  return frame(`Flight: ${flight}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 16, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('FlightInfo', { autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }), children: [
        text(flight, { fontSize: 14, fontWeight: 700, color: '#1e293b' }),
        text(dest, { fontSize: 13, fontWeight: 500, color: '#475569' }),
        text(time, { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
        text(gate, { fontSize: 13, fontWeight: 500, color: '#64748b' }),
      ] }),
      frame('StatusBadge', { autoLayout: horizontal({ padX: 12, padY: 4 }), fills: [solid(statusColor + '15')], cornerRadius: 9999, children: [
        text(status, { fontSize: 11, fontWeight: 700, color: statusColor }),
      ] }),
    ],
  });
}

function tabButton(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 10 }),
    fills: [solid(active ? '#1e40af' : 'transparent')],
    cornerRadius: 8,
    children: [text(label, { fontSize: 14, fontWeight: 600, color: active ? '#ffffff' : '#64748b' })],
  });
}

function gateInfo(gate: string, terminal: string, status: string) {
  return frame(`Gate: ${gate}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')],
    cornerRadius: 8,
    children: [
      text(gate, { fontSize: 18, fontWeight: 800, color: '#1e40af' }),
      text(terminal, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
      ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid(status === 'open' ? '#22c55e' : '#f59e0b')] }),
    ],
  });
}

export default frame('AirportStatusPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 18 }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e40af', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SkyPort International', { fontSize: 24, fontWeight: 800, color: '#ffffff' }),
        text('Live Flight Status', { fontSize: 14, fontWeight: 500, color: '#93c5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Tabs', { autoLayout: horizontal({ spacing: 4 }), children: [
          tabButton('Departures', true), tabButton('Arrivals', false),
        ] }),
        frame('TableHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 16, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Labels', { autoLayout: horizontal({ spacing: 20 }), children: [
              text('Flight', { fontSize: 11, fontWeight: 700, color: '#94a3b8' }),
              text('Destination', { fontSize: 11, fontWeight: 700, color: '#94a3b8' }),
              text('Time', { fontSize: 11, fontWeight: 700, color: '#94a3b8' }),
              text('Gate', { fontSize: 11, fontWeight: 700, color: '#94a3b8' }),
            ] }),
            text('Status', { fontSize: 11, fontWeight: 700, color: '#94a3b8' }),
          ],
        }),
        flightRow('AA 1042', 'New York (JFK)', '08:15', 'B12', 'On Time', '#22c55e'),
        flightRow('UA 783', 'Los Angeles (LAX)', '09:30', 'C7', 'Boarding', '#3b82f6'),
        flightRow('DL 456', 'Chicago (ORD)', '10:00', 'A3', 'Delayed', '#ef4444'),
        flightRow('SW 219', 'Denver (DEN)', '10:45', 'D9', 'On Time', '#22c55e'),
        flightRow('BA 178', 'London (LHR)', '11:20', 'E1', 'Gate Change', '#f59e0b'),
        flightRow('AF 634', 'Paris (CDG)', '12:05', 'E4', 'On Time', '#22c55e'),
        frame('GateSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Gate Status — Terminal B', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
            frame('Gates', { autoLayout: horizontal({ spacing: 10 }), children: [
              gateInfo('B10', 'Terminal B', 'open'), gateInfo('B11', 'Terminal B', 'open'),
              gateInfo('B12', 'Terminal B', 'busy'), gateInfo('B13', 'Terminal B', 'open'),
              gateInfo('B14', 'Terminal B', 'busy'), gateInfo('B15', 'Terminal B', 'open'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
