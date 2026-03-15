/**
 * Online Check-In — Booking reference input, passenger details, seat selection, boarding pass
 * Batch 7, Page 10: Online check-in flow
 * DSL Features: nested layouts, FILL sizing, clipContent, gradient fills
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelCheckin', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('My Trips', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Check-In', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
            text('Help', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Progress Steps
    frame('ProgressSteps', {
      autoLayout: horizontal({ spacing: 0, padX: 200, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      children: [
        stepIndicator('1', 'Booking', true, true),
        stepConnector(true),
        stepIndicator('2', 'Passengers', true, false),
        stepConnector(false),
        stepIndicator('3', 'Seats', false, false),
        stepConnector(false),
        stepIndicator('4', 'Boarding Pass', false, false),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Form area
        frame('FormArea', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Booking Reference
            frame('BookingRef', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Booking Reference', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
                frame('RefInput', {
                  autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  cornerRadius: 10,
                  fills: [solid('#f8fafc')],
                  strokes: [{ color: { r: 0.02, g: 0.41, b: 0.63, a: 1 }, weight: 2, align: 'INSIDE' }],
                  children: [
                    text('WDY-2026-ABCD', { fontSize: 16, fontWeight: 600, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
                    frame('VerifiedBadge', {
                      autoLayout: horizontal({ padX: 8, padY: 4, spacing: 4, counterAlign: 'CENTER' }),
                      fills: [solid('#dcfce7')],
                      cornerRadius: 4,
                      children: [
                        text('✓ Verified', { fontSize: 12, fontWeight: 600, color: '#16a34a' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Passenger Details
            frame('PassengerDetails', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Passenger Details', { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
                passengerRow('1', 'Alex Morgan', 'Passport: US123456789', true),
                rectangle('PaxDivider1', {
                  size: { x: 1, y: 1 },
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#f1f5f9')],
                }),
                passengerRow('2', 'Jordan Morgan', 'Passport: US987654321', true),
              ],
            }),

            // Seat Selection Grid
            frame('SeatSelection', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('SeatHeader', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Select Seats', { fontSize: 18, fontWeight: 600, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
                    frame('SeatLegend', {
                      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                      children: [
                        legendItem('#0369a1', 'Selected'),
                        legendItem('#e2e8f0', 'Available'),
                        legendItem('#f1f5f9', 'Taken'),
                      ],
                    }),
                  ],
                }),

                // Seat Grid Placeholder
                frame('SeatGrid', {
                  autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    // Column labels
                    frame('ColLabels', {
                      autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                      children: [
                        seatLabel('A'), seatLabel('B'), seatLabel('C'),
                        frame('AisleSpacer', { size: { x: 32, y: 20 } }),
                        seatLabel('D'), seatLabel('E'), seatLabel('F'),
                      ],
                    }),
                    seatRow('12', ['taken', 'taken', 'available', 'available', 'taken', 'available']),
                    seatRow('13', ['available', 'available', 'taken', 'taken', 'available', 'available']),
                    seatRow('14', ['taken', 'selected', 'available', 'available', 'selected', 'taken']),
                    seatRow('15', ['available', 'available', 'available', 'taken', 'taken', 'available']),
                    seatRow('16', ['available', 'taken', 'taken', 'available', 'available', 'available']),
                    seatRow('17', ['taken', 'available', 'available', 'available', 'taken', 'taken']),
                  ],
                }),

                text('Selected: 14B (Alex Morgan), 14E (Jordan Morgan)', {
                  fontSize: 13, fontWeight: 500, color: '#0369a1',
                }),
              ],
            }),
          ],
        }),

        // Right: Flight Info & Boarding Pass
        frame('RightPanel', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 380, y: undefined },
          children: [
            // Flight Info
            frame('FlightInfo', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Flight Details', { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
                frame('FlightRoute', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('DepInfo', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('JFK', { fontSize: 28, fontWeight: 700, color: '#1e293b' }),
                        text('New York', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                    frame('RouteSpacer', {
                      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('SW 402', { fontSize: 12, fontWeight: 500, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
                        rectangle('RouteLine', {
                          size: { x: 80, y: 2 },
                          fills: [solid('#e2e8f0')],
                        }),
                        text('7h 15m', { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
                      ],
                    }),
                    frame('ArrInfo', {
                      autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
                      children: [
                        text('LHR', { fontSize: 28, fontWeight: 700, color: '#1e293b', textAlignHorizontal: 'RIGHT' }),
                        text('London', { fontSize: 13, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'RIGHT' }),
                      ],
                    }),
                  ],
                }),
                rectangle('FlightDivider', {
                  size: { x: 1, y: 1 },
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#f1f5f9')],
                }),
                infoRow('Date', 'March 20, 2026'),
                infoRow('Departure', '08:30 AM'),
                infoRow('Arrival', '08:45 PM'),
                infoRow('Terminal', 'T4, Gate B22'),
                infoRow('Class', 'Economy'),
              ],
            }),

            // Boarding Pass Preview
            frame('BoardingPass', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 16,
              clipContent: true,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                // Top section
                frame('BPHeader', {
                  autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [gradient([
                    { hex: '#0c4a6e', position: 0 },
                    { hex: '#0369a1', position: 1 },
                  ], 0)],
                  children: [
                    text('Boarding Pass', { fontSize: 14, fontWeight: 600, color: '#ffffff', layoutSizingHorizontal: 'FILL' }),
                    text('SkyWay Airlines', { fontSize: 12, fontWeight: 500, color: '#ffffffaa' }),
                  ],
                }),
                // Passenger info
                frame('BPBody', {
                  autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#ffffff')],
                  children: [
                    frame('BPPassenger', {
                      autoLayout: vertical({ spacing: 2 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('PASSENGER', { fontSize: 10, fontWeight: 600, color: '#94a3b8' }),
                        text('MORGAN / ALEX', { fontSize: 16, fontWeight: 700, color: '#1e293b' }),
                      ],
                    }),
                    frame('BPDetails', {
                      autoLayout: horizontal({ spacing: 0 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        bpField('FLIGHT', 'SW 402'),
                        bpField('DATE', '20 MAR'),
                        bpField('SEAT', '14B'),
                        bpField('GATE', 'B22'),
                        bpField('BOARD', '07:45'),
                      ],
                    }),
                  ],
                }),
                // Barcode placeholder
                frame('BPBarcode', {
                  autoLayout: horizontal({ padX: 24, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#f8fafc')],
                  children: [
                    rectangle('Barcode', {
                      size: { x: 280, y: 48 },
                      fills: [solid('#d4d4d8')],
                      cornerRadius: 4,
                    }),
                  ],
                }),
              ],
            }),

            // Actions
            frame('CheckinActions', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('CompleteBtn', {
                  autoLayout: horizontal({ padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#ea580c')],
                  cornerRadius: 12,
                  children: [
                    text('Complete Check-In', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
                frame('SaveBtn', {
                  autoLayout: horizontal({ padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  cornerRadius: 12,
                  strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Save to Wallet', { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function stepIndicator(num: string, label: string, completed: boolean, active: boolean) {
  return frame(`Step: ${label}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('StepCircle', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 32, y: 32 },
        fills: [solid(completed ? '#0369a1' : active ? '#ea580c' : '#e2e8f0')],
        cornerRadius: 16,
        children: [
          text(completed ? '✓' : num, { fontSize: 14, fontWeight: 600, color: completed || active ? '#ffffff' : '#94a3b8' }),
        ],
      }),
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#ea580c' : completed ? '#0369a1' : '#94a3b8' }),
    ],
  });
}

function stepConnector(completed: boolean) {
  return frame('StepConnector', {
    autoLayout: horizontal({ padX: 8, padY: 0, counterAlign: 'CENTER' }),
    children: [
      rectangle('ConnLine', {
        size: { x: 40, y: 2 },
        fills: [solid(completed ? '#0369a1' : '#e2e8f0')],
      }),
    ],
  });
}

function passengerRow(num: string, name: string, passport: string, checked: boolean) {
  return frame(`Passenger: ${name}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('PaxCheck', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 24, y: 24 },
        fills: [solid(checked ? '#0369a1' : '#f1f5f9')],
        cornerRadius: 4,
        children: [
          text(checked ? '✓' : '·', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
      frame('PaxInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
          text(passport, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(`Passenger ${num}`, { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
    ],
  });
}

function legendItem(color: string, label: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      rectangle('LegendDot', {
        size: { x: 12, y: 12 },
        fills: [solid(color)],
        cornerRadius: 2,
      }),
      text(label, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

function seatLabel(col: string) {
  return frame(`ColLabel: ${col}`, {
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: 36, y: 20 },
    children: [
      text(col, { fontSize: 12, fontWeight: 600, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function seatRow(row: string, seats: string[]) {
  const seatColors: Record<string, string> = {
    available: '#e2e8f0',
    taken: '#f1f5f9',
    selected: '#0369a1',
  };

  return frame(`Row: ${row}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ...seats.slice(0, 3).map((s, i) =>
        seatBox(`${row}${String.fromCharCode(65 + i)}`, seatColors[s], s === 'selected', s === 'taken')
      ),
      frame('AisleGap', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 32, y: 36 },
        children: [
          text(row, { fontSize: 12, fontWeight: 500, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
        ],
      }),
      ...seats.slice(3).map((s, i) =>
        seatBox(`${row}${String.fromCharCode(68 + i)}`, seatColors[s], s === 'selected', s === 'taken')
      ),
    ],
  });
}

function seatBox(id: string, color: string, selected: boolean, taken: boolean) {
  return frame(`Seat: ${id}`, {
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: 36, y: 36 },
    fills: [solid(color)],
    cornerRadius: 6,
    opacity: taken ? 0.5 : 1,
    children: [
      text(selected ? '✓' : '·', { fontSize: 14, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function infoRow(label: string, value: string) {
  return frame(`Info: ${label}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: '#64748b', layoutSizingHorizontal: 'FILL' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
    ],
  });
}

function bpField(label: string, value: string) {
  return frame(`BP: ${label}`, {
    autoLayout: vertical({ spacing: 2 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 10, fontWeight: 600, color: '#94a3b8' }),
      text(value, { fontSize: 14, fontWeight: 700, color: '#1e293b' }),
    ],
  });
}
