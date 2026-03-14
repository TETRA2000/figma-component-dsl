import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const teal = '#0d9488'; const tealBg = '#f0fdfa'; const white = '#ffffff'; const bg = '#f8fafc';
const dark = '#0f172a'; const med = '#64748b'; const red = '#ef4444'; const amber = '#f59e0b'; const green = '#22c55e';

function statusBadge(label: string, color: string) {
  return frame(`Status: ${label}`, {
    autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(color, 0.12)], cornerRadius: 4,
    children: [text(label, { fontSize: 11, fontWeight: 600, color })],
  });
}

function inventoryRow(name: string, sku: string, qty: number, price: string, category: string) {
  const status = qty <= 5 ? 'Critical' : qty <= 20 ? 'Low' : 'In Stock';
  const statusColor = qty <= 5 ? red : qty <= 20 ? amber : green;
  return frame(`Row: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ProdInfo', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), size: { x: 280, y: undefined }, children: [
        rectangle('ProdImg', { size: { x: 36, y: 36 }, fills: [solid(teal, 0.1)], cornerRadius: 6 }),
        frame('ProdText', { autoLayout: vertical({ spacing: 1 }), children: [
          text(name, { fontSize: 14, fontWeight: 500, color: dark }),
          text(sku, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
      ]}),
      text(category, { fontSize: 13, fontWeight: 400, color: med }),
      text(String(qty), { fontSize: 14, fontWeight: 600, color: qty <= 5 ? red : dark }),
      text(price, { fontSize: 14, fontWeight: 500, color: dark }),
      statusBadge(status, statusColor),
    ],
  });
}

function statCard(label: string, value: string, icon: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }), fills: [solid(white)],
    cornerRadius: 10, layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconBg', { size: { x: 40, y: 40 }, fills: [solid(color, 0.12)], cornerRadius: 10,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        children: [ellipse('Icon', { size: { x: 18, y: 18 }, fills: [solid(color)] })] }),
      frame('StatText', { autoLayout: vertical({ spacing: 2 }), children: [
        text(label, { fontSize: 12, fontWeight: 400, color: med }),
        text(value, { fontSize: 22, fontWeight: 700, color: dark }),
      ]}),
    ],
  });
}

export default frame('InventoryMgmt', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 4, padX: 12, padY: 16 }), size: { x: 220, y: undefined },
      fills: [solid(white)],
      strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('StockFlow', { fontSize: 18, fontWeight: 700, color: teal }),
        frame('SideNav', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          frame('NavActive', { autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8 }), fills: [solid(tealBg)], cornerRadius: 6, layoutSizingHorizontal: 'FILL',
            children: [text('Inventory', { fontSize: 13, fontWeight: 600, color: teal })] }),
          frame('Nav2', { autoLayout: horizontal({ padX: 12, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Orders', { fontSize: 13, fontWeight: 400, color: med })] }),
          frame('Nav3', { autoLayout: horizontal({ padX: 12, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Suppliers', { fontSize: 13, fontWeight: 400, color: med })] }),
          frame('Nav4', { autoLayout: horizontal({ padX: 12, padY: 8 }), layoutSizingHorizontal: 'FILL',
            children: [text('Reports', { fontSize: 13, fontWeight: 400, color: med })] }),
        ]}),
      ],
    }),
    frame('MainContent', {
      autoLayout: vertical({ spacing: 20, padX: 24, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('TopBar', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
          text('Inventory Overview', { fontSize: 22, fontWeight: 700, color: dark }),
          frame('AddBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(teal)], cornerRadius: 8,
            children: [text('Add Product', { fontSize: 13, fontWeight: 600, color: white })] }),
        ]}),
        frame('Stats', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          statCard('Total Products', '1,247', 'box', teal),
          statCard('Low Stock', '23', 'alert', amber),
          statCard('Out of Stock', '5', 'x', red),
          statCard('Total Value', '$284K', 'dollar', green),
        ]}),
        frame('Table', {
          autoLayout: vertical({ spacing: 0 }), fills: [solid(white)], cornerRadius: 10,
          layoutSizingHorizontal: 'FILL', clipContent: true,
          children: [
            frame('TableHeader', {
              autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL', fills: [solid('#f8fafc')],
              children: [
                text('Product', { fontSize: 12, fontWeight: 600, color: med }),
                text('Category', { fontSize: 12, fontWeight: 600, color: med }),
                text('Qty', { fontSize: 12, fontWeight: 600, color: med }),
                text('Price', { fontSize: 12, fontWeight: 600, color: med }),
                text('Status', { fontSize: 12, fontWeight: 600, color: med }),
              ],
            }),
            inventoryRow('Wireless Mouse Pro', 'SKU-001', 145, '$49.99', 'Electronics'),
            inventoryRow('USB-C Hub 7-in-1', 'SKU-002', 3, '$34.99', 'Electronics'),
            inventoryRow('Standing Desk Mat', 'SKU-003', 67, '$29.99', 'Furniture'),
            inventoryRow('Ergonomic Keyboard', 'SKU-004', 18, '$89.99', 'Electronics'),
            inventoryRow('Monitor Arm Mount', 'SKU-005', 42, '$59.99', 'Accessories'),
            inventoryRow('Webcam HD 1080p', 'SKU-006', 2, '$44.99', 'Electronics'),
          ],
        }),
      ],
    }),
  ],
});
