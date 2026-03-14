import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const slate = '#334155'; const white = '#ffffff'; const bg = '#f1f5f9'; const dark = '#0f172a';
const med = '#64748b'; const green = '#16a34a'; const red = '#dc2626'; const amber = '#d97706'; const blue = '#2563eb';

function invoiceRow(id: string, client: string, amount: string, date: string, status: 'Paid' | 'Pending' | 'Overdue') {
  const statusColor = status === 'Paid' ? green : status === 'Pending' ? amber : red;
  return frame(`Inv: ${id}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(id, { fontSize: 13, fontWeight: 600, color: blue }),
      text(client, { fontSize: 13, fontWeight: 500, color: dark }),
      text(amount, { fontSize: 14, fontWeight: 600, color: dark }),
      text(date, { fontSize: 13, fontWeight: 400, color: med }),
      frame(`Status: ${status}`, { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(statusColor, 0.1)], cornerRadius: 9999,
        children: [text(status, { fontSize: 12, fontWeight: 600, color: statusColor })] }),
    ],
  });
}

function summaryCard(label: string, amount: string, color: string) {
  return frame(`Sum: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }), fills: [solid(white)],
    cornerRadius: 10, layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: med }),
      text(amount, { fontSize: 26, fontWeight: 700, color }),
    ],
  });
}

export default frame('InvoiceBilling', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('InvoiceFlow', { fontSize: 22, fontWeight: 700, color: slate }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Invoices', { fontSize: 14, fontWeight: 600, color: slate }),
          text('Clients', { fontSize: 14, fontWeight: 400, color: med }),
          text('Reports', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('NewInvoiceBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(blue)], cornerRadius: 8,
          children: [text('New Invoice', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Summary', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          summaryCard('Total Revenue', '$124,500', dark),
          summaryCard('Paid', '$98,200', green),
          summaryCard('Pending', '$18,300', amber),
          summaryCard('Overdue', '$8,000', red),
        ]}),
        frame('InvoiceTable', {
          autoLayout: vertical({ spacing: 0 }), fills: [solid(white)], cornerRadius: 10,
          layoutSizingHorizontal: 'FILL', clipContent: true,
          children: [
            frame('TableHead', {
              autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL', fills: [solid('#f8fafc')],
              children: [
                text('Invoice', { fontSize: 12, fontWeight: 600, color: med }),
                text('Client', { fontSize: 12, fontWeight: 600, color: med }),
                text('Amount', { fontSize: 12, fontWeight: 600, color: med }),
                text('Date', { fontSize: 12, fontWeight: 600, color: med }),
                text('Status', { fontSize: 12, fontWeight: 600, color: med }),
              ],
            }),
            invoiceRow('INV-001', 'Acme Corp', '$12,500', 'Mar 10, 2026', 'Paid'),
            invoiceRow('INV-002', 'TechStart Inc', '$8,200', 'Mar 08, 2026', 'Paid'),
            invoiceRow('INV-003', 'Design Studio', '$4,500', 'Mar 05, 2026', 'Pending'),
            invoiceRow('INV-004', 'CloudBase Ltd', '$6,800', 'Feb 28, 2026', 'Pending'),
            invoiceRow('INV-005', 'WebFlow Agency', '$3,200', 'Feb 15, 2026', 'Overdue'),
            invoiceRow('INV-006', 'DataSync Pro', '$5,000', 'Feb 10, 2026', 'Overdue'),
          ],
        }),
      ],
    }),
  ],
});
