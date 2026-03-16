/**
 * Invoice — Professional invoice document with header, line items table, totals, and payment info
 * DSL features: strokes for table borders, FILL layout for columns, textAlignHorizontal RIGHT,
 * rectangle dividers, cornerRadii on table header, lineHeight for addresses, opacity, ellipse for status dot
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function tableHeaderCell(label: string, width: number, align: 'LEFT' | 'CENTER' | 'RIGHT' = 'LEFT') {
  return text(label, {
    fontSize: 11, fontWeight: 700, color: '#6b7280',
    size: { x: width },
    textAlignHorizontal: align,
    letterSpacing: { value: 5, unit: 'PERCENT' },
  });
}

function lineItem(description: string, qty: number, rate: string, amount: string) {
  return frame(`Item: ${description}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(description, { fontSize: 13, fontWeight: 500, color: '#111827', size: { x: 340 } }),
      text(String(qty), { fontSize: 13, fontWeight: 400, color: '#374151', size: { x: 80 }, textAlignHorizontal: 'CENTER' }),
      text(rate, { fontSize: 13, fontWeight: 400, color: '#374151', size: { x: 120 }, textAlignHorizontal: 'RIGHT' }),
      text(amount, { fontSize: 13, fontWeight: 600, color: '#111827', size: { x: 120 }, textAlignHorizontal: 'RIGHT' }),
    ],
  });
}

function totalRow(label: string, value: string, bold: boolean) {
  return frame(`Total: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TotalSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
      text(label, { fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 400, color: bold ? '#111827' : '#6b7280', size: { x: 120 }, textAlignHorizontal: 'RIGHT' }),
      text(value, { fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 500, color: '#111827', size: { x: 120 }, textAlignHorizontal: 'RIGHT' }),
    ],
  });
}

export default frame('InvoicePage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0, padX: 48, padY: 40 }),
  fills: [solid('#ffffff')],
  children: [
    // Header
    frame('InvoiceHeader', {
      autoLayout: horizontal({ spacing: 0, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('CompanyInfo', {
          autoLayout: vertical({ spacing: 6 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('LogoArea', {
              autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
              children: [
                rectangle('LogoPlaceholder', {
                  size: { x: 40, y: 40 },
                  fills: [gradient([{ hex: '#3b82f6', position: 0 }, { hex: '#6366f1', position: 1 }], 135)],
                  cornerRadius: 8,
                }),
                text('Vertex Studio', { fontSize: 20, fontWeight: 800, color: '#111827' }),
              ],
            }),
            text('123 Design Street, Suite 400\nSan Francisco, CA 94102\nhello@vertexstudio.com\n(415) 555-0192', {
              fontSize: 12, fontWeight: 400, color: '#6b7280',
              lineHeight: { value: 170, unit: 'PERCENT' },
            }),
          ],
        }),
        frame('InvoiceMeta', {
          autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
          children: [
            text('INVOICE', { fontSize: 32, fontWeight: 900, color: '#111827' }),
            frame('InvoiceNum', {
              autoLayout: horizontal({ spacing: 6 }),
              children: [
                text('Invoice #', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
                text('INV-2026-0042', { fontSize: 13, fontWeight: 600, color: '#111827' }),
              ],
            }),
            frame('InvoiceDate', {
              autoLayout: horizontal({ spacing: 6 }),
              children: [
                text('Date:', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
                text('March 14, 2026', { fontSize: 13, fontWeight: 500, color: '#111827' }),
              ],
            }),
            frame('DueDate', {
              autoLayout: horizontal({ spacing: 6 }),
              children: [
                text('Due:', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
                text('April 13, 2026', { fontSize: 13, fontWeight: 500, color: '#ef4444' }),
              ],
            }),
          ],
        }),
      ],
    }),
    rectangle('HeaderDiv', { size: { x: 704, y: 1 }, fills: [solid('#e5e7eb')] }),
    // Bill to / Payment terms
    frame('BillToSection', {
      autoLayout: horizontal({ spacing: 0, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BillTo', {
          autoLayout: vertical({ spacing: 6 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('BILL TO', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
            text('Acme Corporation', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('456 Business Ave, Floor 12\nNew York, NY 10001\naccounts@acmecorp.com', {
              fontSize: 12, fontWeight: 400, color: '#6b7280',
              lineHeight: { value: 170, unit: 'PERCENT' },
            }),
          ],
        }),
        frame('PaymentTerms', {
          autoLayout: vertical({ spacing: 6, counterAlign: 'MAX' }),
          children: [
            text('PAYMENT TERMS', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
            text('Net 30', { fontSize: 14, fontWeight: 600, color: '#111827' }),
            text('Late fee: 1.5% per month', { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),
    // Line items table
    frame('TableHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 0, padY: 10 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f9fafb')],
      cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
      children: [
        tableHeaderCell('DESCRIPTION', 340),
        tableHeaderCell('QTY', 80, 'CENTER'),
        tableHeaderCell('RATE', 120, 'RIGHT'),
        tableHeaderCell('AMOUNT', 120, 'RIGHT'),
      ],
    }),
    frame('TableBody', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        lineItem('Brand Identity Design', 1, '$4,500.00', '$4,500.00'),
        lineItem('Website UI/UX Design (8 pages)', 8, '$800.00', '$6,400.00'),
        lineItem('Design System Components', 42, '$150.00', '$6,300.00'),
        lineItem('User Research & Testing', 1, '$2,200.00', '$2,200.00'),
        lineItem('Project Management', 1, '$1,500.00', '$1,500.00'),
      ],
    }),
    rectangle('TableDiv', { size: { x: 704, y: 1 }, fills: [solid('#e5e7eb')] }),
    // Totals
    frame('Totals', {
      autoLayout: vertical({ spacing: 4, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        totalRow('Subtotal', '$20,900.00', false),
        totalRow('Tax (8.5%)', '$1,776.50', false),
        totalRow('Discount (10%)', '-$2,090.00', false),
        rectangle('TotalDiv', { size: { x: 240, y: 2 }, fills: [solid('#111827')] }),
        totalRow('Amount Due', '$20,586.50', true),
      ],
    }),
    rectangle('FooterDiv', { size: { x: 704, y: 1 }, fills: [solid('#e5e7eb')] }),
    // Payment info
    frame('PaymentInfo', {
      autoLayout: horizontal({ spacing: 0, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('BankDetails', {
          autoLayout: vertical({ spacing: 6 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('PAYMENT DETAILS', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
            text('Bank: First National Bank\nAccount: 1234-5678-9012\nRouting: 021000021\nSWIFT: FNBKUS33', {
              fontSize: 12, fontWeight: 400, color: '#6b7280',
              lineHeight: { value: 170, unit: 'PERCENT' },
            }),
          ],
        }),
        frame('Notes', {
          autoLayout: vertical({ spacing: 6, counterAlign: 'MAX' }),
          children: [
            text('NOTES', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
            text('Thank you for your business!\nPayment is due within 30 days.', {
              fontSize: 12, fontWeight: 400, color: '#6b7280',
              lineHeight: { value: 170, unit: 'PERCENT' },
            }),
          ],
        }),
      ],
    }),
    // Status badge
    frame('StatusBar', {
      autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('StatusBadge', {
          autoLayout: horizontal({ spacing: 6, padX: 16, padY: 8, counterAlign: 'CENTER' }),
          fills: [solid('#fef3c7')],
          cornerRadius: 8,
          children: [
            ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid('#f59e0b')] }),
            text('PAYMENT PENDING', { fontSize: 12, fontWeight: 700, color: '#92400e', letterSpacing: { value: 5, unit: 'PERCENT' } }),
          ],
        }),
      ],
    }),
  ],
});
