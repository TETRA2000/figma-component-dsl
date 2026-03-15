/**
 * E-commerce Order Confirmation — Success page with order details
 * Batch 2, Page 5: Post-checkout confirmation
 * DSL Features: centered layouts, strokes, nested frames
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomOrderConfirm', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('ShopFlow', { fontSize: 22, fontWeight: 700, color: '#111827' }),
      ],
    }),

    // Confirmation Content
    frame('ConfirmationContent', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Success Icon
        frame('SuccessIcon', {
          autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
          size: { x: 80, y: 80 },
          fills: [solid('#ecfdf5')],
          cornerRadius: 40,
          children: [
            text('✓', { fontSize: 36, fontWeight: 700, color: '#10b981' }),
          ],
        }),

        // Success Message
        frame('SuccessMessage', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Order Confirmed!', { fontSize: 32, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
            text('Thank you for your purchase. Your order has been received and is being processed.', {
              fontSize: 16, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER',
              size: { x: 480 }, textAutoResize: 'HEIGHT',
            }),
          ],
        }),

        // Order Details Card
        frame('OrderDetailsCard', {
          autoLayout: vertical({ spacing: 20, padX: 32, padY: 32 }),
          size: { x: 560, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Order Info Row
            frame('OrderInfoRow', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('OrderNumber', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Order Number', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
                    text('#ORD-2026-7842', { fontSize: 16, fontWeight: 700, color: '#111827' }),
                  ],
                }),
                frame('OrderDate', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Order Date', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
                    text('March 15, 2026', { fontSize: 16, fontWeight: 600, color: '#111827' }),
                  ],
                }),
              ],
            }),

            rectangle('Divider1', {
              size: { x: 496, y: 1 },
              fills: [solid('#e5e7eb')],
            }),

            // Delivery Estimate
            frame('DeliveryEstimate', {
              autoLayout: vertical({ spacing: 4 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Estimated Delivery', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
                text('March 20 – March 22, 2026', { fontSize: 16, fontWeight: 600, color: '#10b981' }),
              ],
            }),

            rectangle('Divider2', {
              size: { x: 496, y: 1 },
              fills: [solid('#e5e7eb')],
            }),

            // Items Ordered
            text('Items Ordered', { fontSize: 15, fontWeight: 600, color: '#111827' }),
            confirmItem('Classic White Sneakers', '1', '$89.99'),
            confirmItem('Leather Crossbody Bag', '1', '$129.00'),
            confirmItem('Organic Cotton Tee', '2', '$69.98'),

            rectangle('Divider3', {
              size: { x: 496, y: 1 },
              fills: [solid('#e5e7eb')],
            }),

            frame('TotalRow', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total Paid', { fontSize: 16, fontWeight: 600, color: '#111827' }),
                text('$322.08', { fontSize: 18, fontWeight: 700, color: '#111827' }),
              ],
            }),
          ],
        }),

        // CTA Buttons
        frame('CTAButtons', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            frame('TrackOrderBtn', {
              autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Track Order', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            frame('ContinueBtn', {
              autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Continue Shopping', { fontSize: 15, fontWeight: 600, color: '#374151' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function confirmItem(name: string, qty: string, price: string) {
  return frame(`Item: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ItemLeft', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          rectangle('Thumb', { size: { x: 48, y: 48 }, fills: [solid('#f3f4f6')], cornerRadius: 6 }),
          frame('ItemText', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 500, color: '#111827' }),
              text(`Qty: ${qty}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: '#111827' }),
    ],
  });
}
