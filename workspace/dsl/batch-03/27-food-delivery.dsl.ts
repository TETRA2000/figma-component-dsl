/**
 * Delivery Tracker — Order status steps, driver info placeholder
 * Batch 3, Page 7: Food & Restaurant
 * DSL Features: gradients, opacity, cornerRadii, warm colors
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const WHITE = '#FFFFFF';
const GREEN = '#4CAF50';

function statusStep(
  label: string,
  time: string,
  status: 'completed' | 'active' | 'pending',
) {
  const dotColor = status === 'completed' ? GREEN : status === 'active' ? BROWN : '#D7CCC8';
  const lineColor = status === 'completed' ? GREEN : '#E0D6CF';
  const textColor = status === 'pending' ? '#B0998A' : DARK;

  return frame(`Step: ${label}`, {
    autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      // Status indicator
      frame('StepIndicator', {
        autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
        children: [
          frame('Dot', {
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 32, y: 32 },
            fills: [solid(dotColor)],
            cornerRadius: 16,
            children: [
              text(status === 'completed' ? '✓' : status === 'active' ? '●' : '○', {
                fontSize: 14, fontWeight: 700, color: WHITE,
              }),
            ],
          }),
          ...(label !== 'Delivered'
            ? [rectangle('Line', {
                size: { x: 2, y: 40 },
                fills: [solid(lineColor)],
              })]
            : []),
        ],
      }),
      // Step info
      frame('StepInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 16, fontWeight: 600, color: textColor }),
          text(time, { fontSize: 13, fontWeight: 400, color: MUTED }),
        ],
      }),
    ],
  });
}

function orderItem(name: string, qty: string, price: string) {
  return frame(`OrderItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ItemLeft', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(qty + 'x', { fontSize: 14, fontWeight: 600, color: BROWN }),
          text(name, { fontSize: 14, fontWeight: 400, color: DARK }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: DARK }),
    ],
  });
}

export default component('FoodDelivery', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Header
    frame('DeliveryHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(WHITE)],
      strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('La Trattoria', { fontSize: 20, fontWeight: 700, color: BROWN }),
        frame('OrderId', {
          autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(BROWN, 0.08)],
          cornerRadius: 8,
          children: [
            text('Order #4821', { fontSize: 13, fontWeight: 600, color: BROWN }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('DeliveryContent', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Map placeholder + Driver info
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Map placeholder
            frame('MapPlaceholder', {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24, align: 'MAX' }),
              layoutSizingHorizontal: 'FILL',
              size: { x: undefined, y: 320 },
              fills: [
                gradient([
                  { hex: '#D4A574', position: 0 },
                  { hex: '#C4A882', position: 0.5 },
                  { hex: '#A89070', position: 1 },
                ], 270),
              ],
              cornerRadius: 20,
              clipContent: true,
              children: [
                frame('ETABadge', {
                  autoLayout: horizontal({ padX: 16, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(DARK, 0.85)],
                  cornerRadius: 12,
                  children: [
                    text('ETA: 12 minutes', { fontSize: 14, fontWeight: 600, color: WHITE }),
                  ],
                }),
              ],
            }),

            // Driver Info
            frame('DriverCard', {
              autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(WHITE)],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                rectangle('DriverPhoto', {
                  size: { x: 56, y: 56 },
                  fills: [
                    gradient([
                      { hex: '#D4A574', position: 0 },
                      { hex: '#8B4513', position: 1 },
                    ], 135),
                  ],
                  cornerRadius: 28,
                }),
                frame('DriverInfo', {
                  autoLayout: vertical({ spacing: 2 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Your Driver', { fontSize: 12, fontWeight: 500, color: MUTED }),
                    text('Antonio M.', { fontSize: 18, fontWeight: 600, color: DARK }),
                    frame('DriverRating', {
                      autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                      children: [
                        text('★', { fontSize: 14, fontWeight: 600, color: '#F9A825' }),
                        text('4.9', { fontSize: 13, fontWeight: 600, color: DARK }),
                        text('(342 deliveries)', { fontSize: 12, fontWeight: 400, color: MUTED }),
                      ],
                    }),
                  ],
                }),
                frame('ContactBtn', {
                  autoLayout: horizontal({ padX: 16, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(BROWN)],
                  cornerRadius: 10,
                  children: [
                    text('Contact', { fontSize: 13, fontWeight: 600, color: WHITE }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right: Status + Order summary
        frame('RightColumn', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 380, y: undefined },
          children: [
            // Status Steps
            frame('StatusCard', {
              autoLayout: vertical({ spacing: 0, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(WHITE)],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Order Status', { fontSize: 18, fontWeight: 700, color: DARK }),
                rectangle('StatusDiv', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                statusStep('Order Confirmed', '6:15 PM', 'completed'),
                statusStep('Preparing', '6:18 PM', 'completed'),
                statusStep('On the Way', '6:35 PM — Now', 'active'),
                statusStep('Delivered', 'Estimated 6:47 PM', 'pending'),
              ],
            }),

            // Order Summary
            frame('OrderSummary', {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(WHITE)],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Order Summary', { fontSize: 18, fontWeight: 700, color: DARK }),
                rectangle('SummDiv', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                orderItem('Osso Buco', '1', '$38'),
                orderItem('Truffle Risotto', '1', '$28'),
                orderItem('Tiramisu', '2', '$24'),
                rectangle('TotalDiv', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                frame('TotalRow', {
                  autoLayout: horizontal({ spacing: 0, padY: 4, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Total', { fontSize: 16, fontWeight: 700, color: DARK }),
                    text('$94.50', { fontSize: 16, fontWeight: 700, color: BROWN }),
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
