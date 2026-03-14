import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const violet = '#7c3aed'; const white = '#ffffff'; const bg = '#faf5ff'; const dark = '#1e1b4b';
const med = '#6b7280'; const green = '#16a34a'; const red = '#dc2626'; const blue = '#2563eb';

function transactionRow(desc: string, category: string, amount: string, date: string, isIncome: boolean) {
  return frame(`Txn: ${desc}`, {
    autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.9, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TxnLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        frame('CatIcon', { size: { x: 36, y: 36 }, fills: [solid(isIncome ? green : red, 0.1)], cornerRadius: 8,
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [ellipse('Dot', { size: { x: 10, y: 10 }, fills: [solid(isIncome ? green : red)] })] }),
        frame('TxnInfo', { autoLayout: vertical({ spacing: 1 }), children: [
          text(desc, { fontSize: 14, fontWeight: 500, color: dark }),
          text(category, { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ]}),
      frame('TxnRight', { autoLayout: vertical({ spacing: 1, counterAlign: 'MAX' }), children: [
        text(`${isIncome ? '+' : '-'}${amount}`, { fontSize: 14, fontWeight: 600, color: isIncome ? green : red }),
        text(date, { fontSize: 11, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

function budgetBar(category: string, spent: number, budget: number, color: string) {
  const pct = Math.min(100, Math.round(spent / budget * 100));
  return frame(`Budget: ${category}`, {
    autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL',
    children: [
      frame('BudgetHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        text(category, { fontSize: 13, fontWeight: 500, color: dark }),
        text(`$${spent} / $${budget}`, { fontSize: 12, fontWeight: 400, color: med }),
      ]}),
      frame('Bar', { autoLayout: horizontal({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
        rectangle('Fill', { size: { x: Math.round(280 * pct / 100), y: 8 }, fills: [solid(color)], cornerRadius: 4 }),
        rectangle('Empty', { size: { x: Math.round(280 * (100 - pct) / 100), y: 8 }, fills: [solid(color, 0.12)], cornerRadius: 4 }),
      ]}),
    ],
  });
}

export default frame('BudgetTracker', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('SpendWise', { fontSize: 22, fontWeight: 700, color: violet }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Dashboard', { fontSize: 14, fontWeight: 600, color: violet }),
          text('Transactions', { fontSize: 14, fontWeight: 400, color: med }),
          text('Budgets', { fontSize: 14, fontWeight: 400, color: med }),
          text('Goals', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('BalanceCards', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Balance', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
            fills: [gradient([{ hex: '#5b21b6', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)], cornerRadius: 12,
            children: [
              text('Total Balance', { fontSize: 13, fontWeight: 400, color: '#c4b5fd' }),
              text('$12,450.00', { fontSize: 32, fontWeight: 700, color: white }),
            ]}),
          frame('Income', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
            fills: [solid(white)], cornerRadius: 12,
            children: [
              text('Income', { fontSize: 13, fontWeight: 400, color: med }),
              text('$5,200.00', { fontSize: 26, fontWeight: 700, color: green }),
              text('This month', { fontSize: 11, fontWeight: 400, color: med }),
            ]}),
          frame('Expenses', { autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
            fills: [solid(white)], cornerRadius: 12,
            children: [
              text('Expenses', { fontSize: 13, fontWeight: 400, color: med }),
              text('$3,180.00', { fontSize: 26, fontWeight: 700, color: red }),
              text('This month', { fontSize: 11, fontWeight: 400, color: med }),
            ]}),
        ]}),
        frame('BottomRow', { autoLayout: horizontal({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Transactions', {
            autoLayout: vertical({ spacing: 8, padX: 0, padY: 0 }), fills: [solid(white)], cornerRadius: 12,
            layoutSizingHorizontal: 'FILL', clipContent: true,
            children: [
              frame('TxnHeader', { autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
                text('Recent Transactions', { fontSize: 16, fontWeight: 600, color: dark }),
                text('View All', { fontSize: 13, fontWeight: 500, color: violet }),
              ]}),
              transactionRow('Salary', 'Income', '$5,200', 'Mar 1', true),
              transactionRow('Grocery Store', 'Food', '$142.50', 'Mar 12', false),
              transactionRow('Electric Bill', 'Utilities', '$89.00', 'Mar 10', false),
              transactionRow('Coffee Shop', 'Food', '$24.80', 'Mar 11', false),
              transactionRow('Freelance Work', 'Income', '$850', 'Mar 8', true),
            ],
          }),
          frame('BudgetPanel', {
            autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }), size: { x: 320, y: undefined },
            fills: [solid(white)], cornerRadius: 12,
            children: [
              text('Monthly Budgets', { fontSize: 16, fontWeight: 600, color: dark }),
              budgetBar('Food & Dining', 680, 800, '#f59e0b'),
              budgetBar('Transportation', 240, 400, blue),
              budgetBar('Entertainment', 180, 200, '#ec4899'),
              budgetBar('Shopping', 450, 300, red),
              budgetBar('Utilities', 190, 250, green),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
