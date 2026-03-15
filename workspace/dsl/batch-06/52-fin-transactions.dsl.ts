/**
 * Transaction History — Date groups, transaction rows, filters, export
 * Batch 6, Page 2: Finance/Banking
 * DSL Features: FIXED sizing, strokes, data table patterns, number typography
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinTransactions', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Header Bar
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0b1120')],
      strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
      children: [
        text('Transaction History', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
        frame('HeaderActions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('ExportBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, spacing: 8, counterAlign: 'CENTER' }),
              fills: [solid('#f59e0b')],
              cornerRadius: 8,
              children: [
                text('↓', { fontSize: 14, fontWeight: 600, color: '#0f172a' }),
                text('Export CSV', { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Filters & Toggle
    frame('FiltersBar', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0f172a')],
      strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
      children: [
        // Income/Expense Toggle
        frame('Toggle', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid('#1e293b')],
          cornerRadius: 10,
          children: [
            frame('ToggleAll', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#f59e0b')],
              cornerRadius: 10,
              children: [
                text('All', { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
              ],
            }),
            frame('ToggleIncome', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('Income', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
              ],
            }),
            frame('ToggleExpense', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('Expenses', { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
              ],
            }),
          ],
        }),
        // Search & Date Filter
        frame('SearchFilters', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('SearchBox', {
              autoLayout: horizontal({ padX: 16, padY: 10, spacing: 8, counterAlign: 'CENTER' }),
              size: { x: 240, y: undefined },
              fills: [solid('#1e293b')],
              cornerRadius: 8,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('⌕', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                text('Search transactions...', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              ],
            }),
            frame('DateFilter', {
              autoLayout: horizontal({ padX: 16, padY: 10, spacing: 8, counterAlign: 'CENTER' }),
              fills: [solid('#1e293b')],
              cornerRadius: 8,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Mar 1 – Mar 15, 2026', { fontSize: 13, fontWeight: 500, color: '#cbd5e1' }),
                text('▾', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Transactions List
    frame('TransactionsList', {
      autoLayout: vertical({ spacing: 0, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Summary Row
        frame('SummaryRow', {
          autoLayout: horizontal({ spacing: 32, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            summaryBadge('Total In', '+$8,425.00', '#10b981'),
            summaryBadge('Total Out', '-$3,212.48', '#ef4444'),
            summaryBadge('Net', '+$5,212.52', '#f59e0b'),
            summaryBadge('Transactions', '23', '#3b82f6'),
          ],
        }),

        rectangle('ListDivider1', { size: { x: 1, y: 1 }, fills: [solid('#1e293b')], layoutSizingHorizontal: 'FILL' }),

        // Column Headers
        frame('ColumnHeaders', {
          autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Transaction', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 340 }, textAutoResize: 'HEIGHT' }),
            text('Category', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 140 }, textAutoResize: 'HEIGHT' }),
            text('Date', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 120 }, textAutoResize: 'HEIGHT' }),
            text('Amount', { fontSize: 11, fontWeight: 600, color: '#64748b', size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
          ],
        }),

        rectangle('ListDivider2', { size: { x: 1, y: 1 }, fills: [solid('#1e293b')], layoutSizingHorizontal: 'FILL' }),

        // Date Group: Today
        dateGroup('Today — March 15, 2026', [
          txRow('Starbucks Coffee', '☕', 'Food & Drink', 'Mar 15', '-$6.45', '#ef4444'),
          txRow('Uber Ride', '🚗', 'Transportation', 'Mar 15', '-$23.50', '#ef4444'),
        ]),

        // Date Group: Yesterday
        dateGroup('Yesterday — March 14, 2026', [
          txRow('Whole Foods Market', '🛒', 'Groceries', 'Mar 14', '-$127.43', '#ef4444'),
          txRow('Amazon Prime', '📦', 'Shopping', 'Mar 14', '-$14.99', '#ef4444'),
          txRow('Client Payment', '💼', 'Income', 'Mar 14', '+$2,500.00', '#10b981'),
        ]),

        // Date Group: March 13
        dateGroup('March 13, 2026', [
          txRow('Salary Deposit', '🏦', 'Income', 'Mar 13', '+$6,225.00', '#10b981'),
          txRow('Electric Bill', '⚡', 'Utilities', 'Mar 13', '-$134.22', '#ef4444'),
          txRow('Gym Membership', '💪', 'Health', 'Mar 13', '-$49.99', '#ef4444'),
        ]),

        // Date Group: March 12
        dateGroup('March 12, 2026', [
          txRow('Netflix', '🎬', 'Entertainment', 'Mar 12', '-$15.99', '#ef4444'),
          txRow('Shell Gas Station', '⛽', 'Transportation', 'Mar 12', '-$52.30', '#ef4444'),
        ]),

        // Pagination
        frame('Pagination', {
          autoLayout: horizontal({ spacing: 8, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            pageBtn('←', false),
            pageBtn('1', true),
            pageBtn('2', false),
            pageBtn('3', false),
            pageBtn('...', false),
            pageBtn('12', false),
            pageBtn('→', false),
          ],
        }),
      ],
    }),
  ],
});

function summaryBadge(label: string, value: string, color: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 20, padY: 14 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1e293b')],
    cornerRadius: 12,
    strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      text(value, { fontSize: 20, fontWeight: 700, color }),
    ],
  });
}

function dateGroup(label: string, rows: ReturnType<typeof txRow>[]) {
  return frame(`Group: ${label}`, {
    autoLayout: vertical({ spacing: 0, padY: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('GroupLabel', {
        autoLayout: horizontal({ padY: 10 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 13, fontWeight: 600, color: '#f59e0b' }),
        ],
      }),
      ...rows,
    ],
  });
}

function txRow(merchant: string, icon: string, category: string, date: string, amount: string, amountColor: string) {
  return frame(`Tx: ${merchant}`, {
    autoLayout: horizontal({ spacing: 0, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('TxMerchant', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        size: { x: 340, y: undefined },
        children: [
          frame('TxIconBox', {
            autoLayout: horizontal({ padX: 10, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 36, y: 36 },
            fills: [solid('#0f172a')],
            cornerRadius: 8,
            children: [
              text(icon, { fontSize: 14, fontWeight: 400, color: '#f8fafc' }),
            ],
          }),
          text(merchant, { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
        ],
      }),
      text(category, { fontSize: 13, fontWeight: 400, color: '#94a3b8', size: { x: 140 }, textAutoResize: 'HEIGHT' }),
      text(date, { fontSize: 13, fontWeight: 400, color: '#64748b', size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      text(amount, { fontSize: 14, fontWeight: 600, color: amountColor, size: { x: 120 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
    ],
  });
}

function pageBtn(label: string, active: boolean) {
  return frame(`Page: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: 36, y: 36 },
    fills: active ? [solid('#f59e0b')] : [solid('#1e293b')],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#0f172a' : '#94a3b8' }),
    ],
  });
}
