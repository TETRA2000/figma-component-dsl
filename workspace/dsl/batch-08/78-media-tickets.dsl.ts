/**
 * Ticket Purchase — Event Poster + Seating Chart + Ticket Selector + Checkout
 * Batch 8, Page 8: Media/Entertainment — Ticket buying flow
 * DSL Features: large placeholders, gradient fills, price breakdown, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaTickets', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('← Back to Events', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('EVENTSCAPE', { fontSize: 18, fontWeight: 800, color: '#e11d48' }),
      ],
    }),

    // Event Header
    frame('EventHeader', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 32, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a20', position: 0 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      children: [
        // Event Poster
        rectangle('EventPoster', {
          size: { x: 300, y: 420 },
          fills: [
            gradient([
              { hex: '#e11d48', position: 0 },
              { hex: '#7c1d3e', position: 0.3 },
              { hex: '#3d0a2d', position: 0.6 },
              { hex: '#1a0a1a', position: 1 },
            ], 270),
          ],
          cornerRadius: 12,
        }),

        // Event Details
        frame('EventDetails', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('EventBadge', {
              autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#e11d48', 0.2)],
              cornerRadius: 4,
              children: [
                text('LIVE EVENT', { fontSize: 11, fontWeight: 700, color: '#e11d48' }),
              ],
            }),
            text('Neon Dreams Festival 2026', {
              fontSize: 36, fontWeight: 800, color: '#ffffff',
              lineHeight: { value: 40, unit: 'PIXELS' },
            }),
            frame('EventMeta', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                metaRow('📅', 'April 12-14, 2026'),
                metaRow('📍', 'Riverside Amphitheater, Austin TX'),
                metaRow('🕐', 'Gates open at 2:00 PM'),
                metaRow('🎵', '3 stages, 40+ artists'),
              ],
            }),
            text('Three days of electronic music featuring world-renowned DJs and emerging artists across multiple stages. Food vendors, art installations, and immersive experiences included.', {
              fontSize: 15, fontWeight: 400, color: '#a3a3a3',
              lineHeight: { value: 24, unit: 'PIXELS' },
              size: { x: 600 }, textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),

    // Main Purchase Area
    frame('PurchaseArea', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Seating Chart + Ticket Selection
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Seating Chart Placeholder
            frame('SeatingChart', {
              autoLayout: vertical({ spacing: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              size: { x: undefined, y: 360 },
              fills: [solid('#111111')],
              cornerRadius: 12,
              children: [
                // Stage
                frame('Stage', {
                  autoLayout: horizontal({ padX: 40, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [
                    gradient([
                      { hex: '#e11d48', position: 0 },
                      { hex: '#7c1d3e', position: 1 },
                    ], 0),
                  ],
                  cornerRadius: 8,
                  children: [
                    text('MAIN STAGE', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                rectangle('ChartSpacer', { size: { x: 1, y: 24 }, opacity: 0 }),
                // Seating zones
                frame('Zones', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    seatZone('VIP PIT', '#e11d48', 120),
                    seatZone('FLOOR', '#f59e0b', 200),
                    seatZone('GA', '#22c55e', 280),
                  ],
                }),
                rectangle('ChartSpacer2', { size: { x: 1, y: 16 }, opacity: 0 }),
                frame('Legend', {
                  autoLayout: horizontal({ spacing: 16 }),
                  children: [
                    legendItem('#e11d48', 'VIP Pit'),
                    legendItem('#f59e0b', 'Floor'),
                    legendItem('#22c55e', 'General Admission'),
                    legendItem('#525252', 'Sold Out'),
                  ],
                }),
              ],
            }),

            // Ticket Type Selector
            frame('TicketSelector', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111111')],
              cornerRadius: 12,
              children: [
                text('Select Tickets', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
                ticketType('General Admission', 'Access to all GA areas, 3-day pass', '$89', true),
                ticketType('Floor', 'Floor access + all GA areas, 3-day pass', '$149', false),
                ticketType('VIP Pit', 'Pit access + private bar + all areas', '$289', false),
                ticketType('Backstage VIP', 'All VIP + backstage access + meet & greet', '$499', false),
              ],
            }),
          ],
        }),

        // Right: Order Summary / Checkout
        frame('CheckoutPanel', {
          autoLayout: vertical({ spacing: 0, padX: 24, padY: 24 }),
          size: { x: 380, y: undefined },
          fills: [solid('#111111')],
          cornerRadius: 12,
          children: [
            text('Order Summary', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            rectangle('Div1', { size: { x: 332, y: 1 }, fills: [solid('#222222')] }),

            // Quantity Selector
            frame('QuantityRow', {
              autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Quantity', { fontSize: 15, fontWeight: 500, color: '#a3a3a3', layoutSizingHorizontal: 'FILL' }),
                frame('QuantityControl', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    frame('MinusBtn', {
                      autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#1a1a1a')],
                      cornerRadius: 4,
                      children: [text('−', { fontSize: 16, fontWeight: 600, color: '#ffffff' })],
                    }),
                    text('2', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
                    frame('PlusBtn', {
                      autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#1a1a1a')],
                      cornerRadius: 4,
                      children: [text('+', { fontSize: 16, fontWeight: 600, color: '#ffffff' })],
                    }),
                  ],
                }),
              ],
            }),

            rectangle('Div2', { size: { x: 332, y: 1 }, fills: [solid('#222222')] }),

            // Price Breakdown
            frame('PriceBreakdown', {
              autoLayout: vertical({ spacing: 12, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                priceRow('General Admission x 2', '$178.00'),
                priceRow('Service Fee', '$17.80'),
                priceRow('Facility Charge', '$8.00'),
                priceRow('Order Processing', '$4.50'),
              ],
            }),

            rectangle('Div3', { size: { x: 332, y: 1 }, fills: [solid('#222222')] }),

            // Total
            frame('TotalRow', {
              autoLayout: horizontal({ spacing: 0, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total', { fontSize: 18, fontWeight: 700, color: '#ffffff', layoutSizingHorizontal: 'FILL' }),
                text('$208.30', { fontSize: 22, fontWeight: 800, color: '#ffffff' }),
              ],
            }),

            // Checkout Button
            frame('CheckoutBtn', {
              autoLayout: horizontal({ padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#e11d48')],
              cornerRadius: 10,
              children: [
                text('Proceed to Checkout', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
              ],
            }),

            frame('SecureNote', {
              autoLayout: horizontal({ spacing: 4, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('🔒 Secure checkout  •  Refund protection included', { fontSize: 12, fontWeight: 400, color: '#525252' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function metaRow(icon: string, label: string) {
  return frame(`Meta: ${label}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      text(icon, { fontSize: 14, fontWeight: 400, color: '#ffffff' }),
      text(label, { fontSize: 15, fontWeight: 400, color: '#d4d4d4' }),
    ],
  });
}

function seatZone(label: string, color: string, width: number) {
  return frame(`Zone: ${label}`, {
    autoLayout: horizontal({ padX: 0, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: width, y: 40 },
    fills: [solid(color, 0.3)],
    cornerRadius: 4,
    strokes: [{ color: { r: 0.5, g: 0.5, b: 0.5, a: 0.3 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
    ],
  });
}

function legendItem(color: string, label: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      rectangle(`Dot: ${label}`, { size: { x: 10, y: 10 }, fills: [solid(color)], cornerRadius: 5 }),
      text(label, { fontSize: 11, fontWeight: 400, color: '#a3a3a3' }),
    ],
  });
}

function ticketType(name: string, description: string, price: string, selected: boolean) {
  return frame(`Ticket: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: selected ? [solid('#e11d48', 0.1)] : [solid('#1a1a1a')],
    cornerRadius: 8,
    strokes: [{ color: selected ? { r: 0.88, g: 0.11, b: 0.28, a: 0.5 } : { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: selected ? 2 : 1, align: 'INSIDE' }],
    children: [
      frame('RadioDot', {
        size: { x: 20, y: 20 },
        fills: selected ? [solid('#e11d48')] : [],
        cornerRadius: 10,
        strokes: [{ color: { r: 0.5, g: 0.5, b: 0.5, a: 1 }, weight: 2, align: 'INSIDE' }],
      }),
      frame('TicketInfo', {
        autoLayout: vertical({ spacing: 2, padX: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
          text(description, { fontSize: 12, fontWeight: 400, color: '#737373' }),
        ],
      }),
      text(price, { fontSize: 18, fontWeight: 700, color: selected ? '#e11d48' : '#ffffff' }),
    ],
  });
}

function priceRow(label: string, amount: string) {
  return frame(`Price: ${label}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: '#a3a3a3', layoutSizingHorizontal: 'FILL' }),
      text(amount, { fontSize: 14, fontWeight: 500, color: '#d4d4d4' }),
    ],
  });
}
