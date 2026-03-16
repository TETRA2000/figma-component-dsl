/**
 * Warehouse Inventory — Stock table, category badges, status indicators (1200px)
 * DSL features: wide table layout, status badges, category pills, progress bars, stats row
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function stockRow(sku: string, name: string, category: string, catColor: string, qty: number, max: number, status: string) {
  const pct = Math.round((qty / max) * 100);
  const barWidth = Math.round((qty / max) * 180);
  const statusColor = status === 'In Stock' ? '#16a34a' : status === 'Low Stock' ? '#f59e0b' : '#dc2626';
  return frame(`Item: ${sku}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(sku, { fontSize: 12, fontWeight: 500, color: '#6b7280', size: { x: 90 } }),
      text(name, { fontSize: 13, fontWeight: 600, color: '#111827', size: { x: 220 } }),
      frame('CatBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
        fills: [solid(catColor + '1a')], cornerRadius: 6,
        size: { x: 100 },
        children: [text(category, { fontSize: 11, fontWeight: 600, color: catColor })],
      }),
      frame('StockBar', {
        size: { x: 180, y: 6 }, fills: [solid('#f3f4f6')], cornerRadius: 3, clipContent: true,
        children: [rectangle('Fill', { size: { x: barWidth, y: 6 }, fills: [solid(statusColor)], cornerRadius: 3 })],
      }),
      text(`${qty}/${max}`, { fontSize: 12, fontWeight: 500, color: '#374151', size: { x: 80 }, textAlignHorizontal: 'CENTER' }),
      frame('StatusBadge', {
        autoLayout: horizontal({ spacing: 4, padX: 8, padY: 3, counterAlign: 'CENTER' }),
        fills: [solid(statusColor + '1a')], cornerRadius: 9999,
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(statusColor)] }),
          text(status, { fontSize: 11, fontWeight: 600, color: statusColor }),
        ],
      }),
    ],
  });
}

function statCard(label: string, value: string, change: string, up: boolean) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 18, padY: 14 }),
    fills: [solid('#ffffff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
      text(value, { fontSize: 24, fontWeight: 800, color: '#111827' }),
      text(`${up ? '+' : ''}${change}`, { fontSize: 11, fontWeight: 600, color: up ? '#16a34a' : '#dc2626' }),
    ],
  });
}

function tableHeader(label: string, width: number) {
  return text(label, { fontSize: 10, fontWeight: 700, color: '#9ca3af', size: { x: width }, letterSpacing: { value: 8, unit: 'PERCENT' } });
}

export default frame('WarehousePage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('StockHub', { fontSize: 22, fontWeight: 800, color: '#111827' }),
        frame('Search', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
          fills: [solid('#f3f4f6')], cornerRadius: 8,
          children: [text('Search inventory...', { fontSize: 13, fontWeight: 400, color: '#9ca3af' })],
        }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 14, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        statCard('Total SKUs', '1,847', '+32 this week', true),
        statCard('In Stock', '1,592', '+18', true),
        statCard('Low Stock', '189', '+24', false),
        statCard('Out of Stock', '66', '-8', true),
        statCard('Total Value', '$2.4M', '+3.2%', true),
      ],
    }),
    frame('TableSection', {
      autoLayout: vertical({ spacing: 0, padX: 32, padY: 8 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('TableHead', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10 }),
          layoutSizingHorizontal: 'FILL', fills: [solid('#f9fafb')], cornerRadius: 8,
          children: [
            tableHeader('SKU', 90), tableHeader('PRODUCT', 220), tableHeader('CATEGORY', 100),
            tableHeader('STOCK LEVEL', 180), tableHeader('QTY', 80), tableHeader('STATUS', 120),
          ],
        }),
        stockRow('WH-001', 'Wireless Bluetooth Headphones', 'Electronics', '#3b82f6', 234, 300, 'In Stock'),
        stockRow('WH-015', 'Ergonomic Office Chair', 'Furniture', '#8b5cf6', 18, 100, 'Low Stock'),
        stockRow('WH-042', 'Organic Cotton T-Shirt (M)', 'Apparel', '#ec4899', 456, 500, 'In Stock'),
        stockRow('WH-078', 'Stainless Steel Water Bottle', 'Kitchen', '#f59e0b', 0, 200, 'Out of Stock'),
        stockRow('WH-103', 'USB-C Charging Cable (6ft)', 'Electronics', '#3b82f6', 89, 400, 'Low Stock'),
        stockRow('WH-156', 'Standing Desk Converter', 'Furniture', '#8b5cf6', 67, 80, 'In Stock'),
        stockRow('WH-201', 'Ceramic Coffee Mug Set', 'Kitchen', '#f59e0b', 312, 350, 'In Stock'),
        stockRow('WH-245', 'Running Shoes (Size 10)', 'Apparel', '#ec4899', 5, 150, 'Low Stock'),
      ],
    }),
  ],
});
