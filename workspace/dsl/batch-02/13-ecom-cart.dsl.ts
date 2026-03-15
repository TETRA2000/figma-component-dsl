/**
 * E-commerce Shopping Cart — Item rows with totals and checkout
 * Batch 2, Page 3: Shopping cart view
 * DSL Features: SPACE_BETWEEN, nested layouts, strokes, FILL sizing
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomCart', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('ShopFlow', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('Continue Shopping', { fontSize: 14, fontWeight: 500, color: '#6366f1' }),
      ],
    }),

    // Page Title
    frame('PageTitle', {
      autoLayout: horizontal({ padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Shopping Cart (3 items)', { fontSize: 28, fontWeight: 700, color: '#111827' }),
      ],
    }),

    // Cart Content
    frame('CartContent', {
      autoLayout: horizontal({ spacing: 40, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Cart Items
        frame('CartItems', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Header Row
            frame('CartHeader', {
              autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Product', { fontSize: 13, fontWeight: 600, color: '#6b7280' }),
                frame('HeaderRight', {
                  autoLayout: horizontal({ spacing: 80 }),
                  children: [
                    text('Qty', { fontSize: 13, fontWeight: 600, color: '#6b7280' }),
                    text('Price', { fontSize: 13, fontWeight: 600, color: '#6b7280' }),
                  ],
                }),
              ],
            }),
            cartItem('Classic White Sneakers', 'Size: 9 | Color: White', 1, '$89.99'),
            cartItem('Leather Crossbody Bag', 'Color: Brown', 1, '$129.00'),
            cartItem('Organic Cotton Tee', 'Size: M | Color: Navy', 2, '$69.98'),
          ],
        }),

        // Order Summary
        frame('OrderSummary', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          size: { x: 360, y: undefined },
          fills: [solid('#f9fafb')],
          cornerRadius: 12,
          children: [
            text('Order Summary', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            summaryRow('Subtotal', '$288.97'),
            summaryRow('Shipping', '$9.99'),
            summaryRow('Tax', '$23.12'),
            rectangle('SummaryDivider', {
              size: { x: 312, y: 1 },
              fills: [solid('#e5e7eb')],
            }),
            frame('TotalRow', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Total', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                text('$322.08', { fontSize: 18, fontWeight: 700, color: '#111827' }),
              ],
            }),
            frame('CheckoutBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Proceed to Checkout', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Bottom spacer
    frame('BottomSpacer', {
      size: { x: 1, y: 64 },
      layoutSizingHorizontal: 'FILL',
    }),
  ],
});

function cartItem(name: string, details: string, qty: number, price: string) {
  return frame(`CartItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('ItemLeft', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          rectangle('Thumbnail', {
            size: { x: 72, y: 72 },
            fills: [solid('#f3f4f6')],
            cornerRadius: 8,
          }),
          frame('ItemDetails', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: '#111827' }),
              text(details, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('Remove', { fontSize: 13, fontWeight: 500, color: '#ef4444' }),
            ],
          }),
        ],
      }),
      frame('ItemRight', {
        autoLayout: horizontal({ spacing: 80, counterAlign: 'CENTER' }),
        children: [
          text(String(qty), { fontSize: 15, fontWeight: 500, color: '#111827' }),
          text(price, { fontSize: 15, fontWeight: 600, color: '#111827' }),
        ],
      }),
    ],
  });
}

function summaryRow(label: string, value: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
      text(value, { fontSize: 14, fontWeight: 500, color: '#111827' }),
    ],
  });
}
