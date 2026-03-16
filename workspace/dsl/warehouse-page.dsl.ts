/**
 * Warehouse Inventory — Stock levels, category filters, item table
 *
 * DSL features stressed: data table, filter pills, stock level bars,
 * clipContent, FILL sizing, SPACE_BETWEEN rows
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function filterPill(label: string, active: boolean, count: string) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, spacing: 8, counterAlign: 'CENTER' }),
    fills: active ? [solid('#1e293b')] : [solid('#ffffff')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#374151' }),
      frame(`${label}Count`, {
        autoLayout: horizontal({ padX: 8, padY: 2 }),
        fills: [solid(active ? '#ffffff22' : '#f1f5f9')],
        cornerRadius: 9999,
        children: [
          text(count, { fontSize: 11, fontWeight: 600, color: active ? '#e2e8f0' : '#64748b' }),
        ],
      }),
    ],
  });
}

function stockBar(pct: number) {
  const color = pct > 60 ? '#16a34a' : pct > 25 ? '#f59e0b' : '#dc2626';
  return frame('StockBar', {
    size: { x: 80, y: 8 },
    fills: [solid('#f1f5f9')],
    cornerRadius: 4,
    clipContent: true,
    children: [
      rectangle('StockFill', {
        size: { x: Math.round(pct * 0.8), y: 8 },
        fills: [solid(color)],
        cornerRadius: 4,
      }),
    ],
  });
}

function tableHeader() {
  return frame('TableHeader', {
    autoLayout: horizontal({ spacing: 0, padX: 18, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text('Item', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 200 }),
      text('SKU', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 100 }),
      text('Category', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 100 }),
      text('Qty', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 60 }),
      text('Stock', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 100 }),
      text('Status', { fontSize: 12, fontWeight: 700, color: '#64748b', width: 80 }),
    ],
  });
}

function tableRow(item: string, sku: string, category: string, qty: number, max: number, status: string) {
  const pct = Math.round((qty / max) * 100);
  const statusColor = status === 'In Stock' ? '#16a34a' : status === 'Low Stock' ? '#f59e0b' : '#dc2626';
  return frame(`Row: ${item}`, {
    autoLayout: horizontal({ spacing: 0, padX: 18, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(item, { fontSize: 14, fontWeight: 500, color: '#1e293b', width: 200 }),
      text(sku, { fontSize: 13, fontWeight: 400, color: '#64748b', width: 100 }),
      text(category, { fontSize: 13, fontWeight: 400, color: '#64748b', width: 100 }),
      text(String(qty), { fontSize: 14, fontWeight: 600, color: '#1e293b', width: 60 }),
      frame(`${item}StockCol`, {
        autoLayout: vertical({ spacing: 4 }),
        size: { x: 100 },
        children: [stockBar(pct)],
      }),
      frame(`${item}StatusBadge`, {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(statusColor + '14')],
        cornerRadius: 9999,
        size: { x: 80 },
        children: [
          text(status, { fontSize: 11, fontWeight: 600, color: statusColor }),
        ],
      }),
    ],
  });
}

function summaryCard(label: string, value: string, color: string) {
  return frame(`Sum: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 20, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
      text(value, { fontSize: 26, fontWeight: 800, color }),
    ],
  });
}

export default frame('WarehousePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('StockVault', { fontSize: 22, fontWeight: 800, color: '#1e293b' }),
        frame('HeaderActions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('ExportBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8 }),
              fills: [solid('#f1f5f9')],
              cornerRadius: 8,
              children: [text('Export', { fontSize: 13, fontWeight: 600, color: '#374151' })],
            }),
            frame('AddBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8 }),
              fills: [solid('#1e293b')],
              cornerRadius: 8,
              children: [text('+ Add Item', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
            }),
          ],
        }),
      ],
    }),

    // Summary Cards
    frame('Summary', {
      autoLayout: horizontal({ spacing: 16, padX: 36, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        summaryCard('Total Items', '2,847', '#1e293b'),
        summaryCard('In Stock', '2,104', '#16a34a'),
        summaryCard('Low Stock', '512', '#f59e0b'),
        summaryCard('Out of Stock', '231', '#dc2626'),
      ],
    }),

    // Filters
    frame('Filters', {
      autoLayout: horizontal({ spacing: 10, padX: 36, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterPill('All Items', true, '2,847'),
        filterPill('Electronics', false, '843'),
        filterPill('Furniture', false, '612'),
        filterPill('Clothing', false, '1,392'),
      ],
    }),

    // Table
    frame('DataTable', {
      autoLayout: vertical({ spacing: 0, padX: 36, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TableContainer', {
          autoLayout: vertical({ spacing: 0 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            tableHeader(),
            tableRow('Wireless Keyboard', 'WK-4021', 'Electronics', 342, 500, 'In Stock'),
            tableRow('Ergonomic Chair', 'EC-1187', 'Furniture', 28, 200, 'Low Stock'),
            tableRow('Cotton T-Shirt (L)', 'CT-3302', 'Clothing', 0, 400, 'Out of Stock'),
            tableRow('USB-C Hub', 'UH-7744', 'Electronics', 567, 600, 'In Stock'),
            tableRow('Standing Desk', 'SD-9910', 'Furniture', 89, 150, 'In Stock'),
            tableRow('Denim Jacket (M)', 'DJ-2205', 'Clothing', 15, 300, 'Low Stock'),
          ],
        }),
      ],
    }),
  ],
});
