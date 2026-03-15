/**
 * Finance Account Overview — Balance card, recent transactions, account cards
 * Batch 6, Page 1: Dark navy/gold palette (#0f172a, #f59e0b)
 * DSL Features: gradients, FIXED sizing, strokes, ellipses, data layouts
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinAccountOverview', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Top Nav
    frame('TopNav', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0b1120')],
      strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
          children: [
            rectangle('LogoIcon', { size: { x: 32, y: 32 }, fills: [solid('#f59e0b')], cornerRadius: 8 }),
            text('VaultBank', { fontSize: 20, fontWeight: 700, color: '#f8fafc' }),
          ],
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            text('Accounts', { fontSize: 14, fontWeight: 600, color: '#f59e0b' }),
            text('Transfers', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
            text('Investments', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
            text('Cards', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
        frame('UserArea', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            ellipse('NotifDot', { size: { x: 8, y: 8 }, fills: [solid('#f59e0b')] }),
            text('Notifications', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
            rectangle('Avatar', { size: { x: 36, y: 36 }, fills: [solid('#1e293b')], cornerRadius: 18 }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: vertical({ spacing: 32, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Greeting
        frame('Greeting', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Good morning, Alexandra', { fontSize: 28, fontWeight: 700, color: '#f8fafc' }),
            text('Here\'s your financial overview for today.', { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),

        // Balance Card (gradient)
        frame('BalanceCard', {
          autoLayout: vertical({ spacing: 24, padX: 40, padY: 36 }),
          layoutSizingHorizontal: 'FILL',
          fills: [
            gradient([
              { hex: '#f59e0b', position: 0 },
              { hex: '#d97706', position: 0.5 },
              { hex: '#b45309', position: 1 },
            ], 135),
          ],
          cornerRadius: 20,
          children: [
            frame('BalanceTop', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('BalanceInfo', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Total Balance', { fontSize: 14, fontWeight: 500, color: '#fef3c7' }),
                    text('$124,563.89', { fontSize: 42, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                frame('ChangeBadge', {
                  autoLayout: horizontal({ padX: 14, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff', 0.2)],
                  cornerRadius: 999,
                  children: [
                    text('▲', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
                    text('+3.24%', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
            rectangle('BalanceDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#ffffff', 0.2)],
              layoutSizingHorizontal: 'FILL',
            }),
            frame('BalanceStats', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                balanceStat('Monthly Income', '$12,450.00'),
                balanceStat('Monthly Expenses', '$8,234.56'),
                balanceStat('Savings Rate', '33.8%'),
              ],
            }),
          ],
        }),

        // Account Cards Row
        frame('AccountCards', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            accountCard('Checking Account', '****4521', '$45,230.12', '#3b82f6', 'Active'),
            accountCard('Savings Account', '****8903', '$67,891.45', '#10b981', 'Active'),
            accountCard('Credit Card', '****2277', '-$3,456.78', '#ef4444', 'Due: Mar 25'),
            accountCard('Investment', '****6610', '$14,988.10', '#8b5cf6', 'Active'),
          ],
        }),

        // Recent Transactions
        frame('RecentTransactions', {
          autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#1e293b')],
          cornerRadius: 16,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            frame('TxHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Transactions', { fontSize: 18, fontWeight: 600, color: '#f8fafc' }),
                frame('ViewAllBtn', {
                  autoLayout: horizontal({ padX: 16, padY: 8 }),
                  cornerRadius: 8,
                  strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('View All', { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
                  ],
                }),
              ],
            }),
            rectangle('TxDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#334155')],
              layoutSizingHorizontal: 'FILL',
            }),
            transactionRow('Whole Foods Market', 'Groceries', '-$127.43', '#ef4444', 'Mar 14'),
            transactionRow('Salary Deposit', 'Income', '+$6,225.00', '#10b981', 'Mar 13'),
            transactionRow('Netflix', 'Entertainment', '-$15.99', '#ef4444', 'Mar 12'),
            transactionRow('Gas Station', 'Transportation', '-$52.30', '#ef4444', 'Mar 11'),
            transactionRow('Freelance Payment', 'Income', '+$1,200.00', '#10b981', 'Mar 10'),
          ],
        }),
      ],
    }),
  ],
});

function balanceStat(label: string, value: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    children: [
      text(label, { fontSize: 12, fontWeight: 400, color: '#fef3c7' }),
      text(value, { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
    ],
  });
}

function accountCard(name: string, number: string, balance: string, accent: string, status: string) {
  return frame(`Account: ${name}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1e293b')],
    cornerRadius: 14,
    strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('CardTop', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse('AccDot', { size: { x: 10, y: 10 }, fills: [solid(accent)] }),
          text(status, { fontSize: 11, fontWeight: 500, color: '#94a3b8' }),
        ],
      }),
      frame('CardInfo', {
        autoLayout: vertical({ spacing: 4 }),
        children: [
          text(name, { fontSize: 14, fontWeight: 500, color: '#cbd5e1' }),
          text(number, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(balance, { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
    ],
  });
}

function transactionRow(merchant: string, category: string, amount: string, amountColor: string, date: string) {
  return frame(`Tx: ${merchant}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TxLeft', {
        autoLayout: horizontal({ spacing: 14, counterAlign: 'CENTER' }),
        children: [
          rectangle('TxIcon', {
            size: { x: 40, y: 40 },
            fills: [solid('#0f172a')],
            cornerRadius: 10,
          }),
          frame('TxInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(merchant, { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
              text(category, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
      frame('TxRight', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(amount, { fontSize: 14, fontWeight: 600, color: amountColor, textAlignHorizontal: 'RIGHT' }),
          text(date, { fontSize: 12, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'RIGHT' }),
        ],
      }),
    ],
  });
}
