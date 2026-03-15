/**
 * E-commerce Checkout — Shipping form, payment, order summary sidebar
 * Batch 2, Page 4: Checkout flow
 * DSL Features: nested layouts, FILL sizing, strokes, form fields
 */
import {
  component, frame, rectangle, text,
  solid, horizontal, vertical,
} from '@figma-dsl/core';

export default component('EcomCheckout', {
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
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('Back to Cart', { fontSize: 14, fontWeight: 500, color: '#6366f1' }),
      ],
    }),

    // Checkout Content
    frame('CheckoutContent', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Forms
        frame('CheckoutForms', {
          autoLayout: vertical({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Shipping Information
            frame('ShippingSection', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Shipping Information', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                frame('NameRow', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('First Name', 'John'),
                    formField('Last Name', 'Smith'),
                  ],
                }),
                formField('Email Address', 'john@example.com'),
                formField('Street Address', '123 Main Street'),
                frame('CityRow', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('City', 'San Francisco'),
                    formField('State', 'CA'),
                    formField('ZIP Code', '94102'),
                  ],
                }),
              ],
            }),

            // Payment Information
            frame('PaymentSection', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#ffffff')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Payment Method', { fontSize: 18, fontWeight: 700, color: '#111827' }),
                formField('Card Number', '4242 4242 4242 4242'),
                frame('CardRow', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('Expiry Date', '12/28'),
                    formField('CVV', '123'),
                  ],
                }),
                formField('Name on Card', 'John Smith'),
              ],
            }),
          ],
        }),

        // Right: Order Summary
        frame('OrderSummary', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          size: { x: 380, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Order Summary', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            orderItem('Classic White Sneakers', '1', '$89.99'),
            orderItem('Leather Crossbody Bag', '1', '$129.00'),
            orderItem('Organic Cotton Tee', '2', '$69.98'),
            rectangle('Divider', {
              size: { x: 332, y: 1 },
              fills: [solid('#e5e7eb')],
            }),
            summaryRow('Subtotal', '$288.97'),
            summaryRow('Shipping', '$9.99'),
            summaryRow('Tax', '$23.12'),
            rectangle('Divider2', {
              size: { x: 332, y: 1 },
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
            frame('PlaceOrderBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111827')],
              cornerRadius: 10,
              children: [
                text('Place Order', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#374151' }),
      frame('Input', {
        autoLayout: horizontal({ padX: 14, padY: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

function orderItem(name: string, qty: string, price: string) {
  return frame(`OrderItem: ${name}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ItemInfo', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          rectangle('Thumb', { size: { x: 48, y: 48 }, fills: [solid('#f3f4f6')], cornerRadius: 6 }),
          frame('ItemText', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 13, fontWeight: 500, color: '#111827' }),
              text(`Qty: ${qty}`, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      text(price, { fontSize: 14, fontWeight: 600, color: '#111827' }),
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
