/**
 * Banking App — Account overview with precise FIXED sizing, FILL width, ellipses
 *
 * DSL features stressed: FIXED sizing, FILL width children, counter-axis CENTER/MAX,
 * stroke alignment, ellipse shapes, per-side padding
 */
import {
  frame, text, rectangle, ellipse,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

function accountSelector(name: string, type: string, active: boolean) {
  return frame(`Account: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(active ? '#e8eaf6' : '#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: active ? { r: 0.10, g: 0.14, b: 0.49, a: 1 } : { r: 0.89, g: 0.95, b: 0.99, a: 1 }, weight: 1, align: 'INSIDE' }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`${name}Dot`, {
        size: { x: 10, y: 10 },
        fills: [solid('#1a237e')],
      }),
      frame(`${name}Info`, {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: '#1a237e' }),
          text(type, { fontSize: 12, fontWeight: 400, color: '#90a4ae' }),
        ],
      }),
    ],
  });
}

function transactionRow(title: string, category: string, amount: string, positive: boolean, date: string) {
  return frame(`Txn: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.89, g: 0.95, b: 0.99, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle(`${title}Icon`, {
        size: { x: 40, y: 40 },
        fills: [solid('#e3f2fd')],
        cornerRadius: 12,
      }),
      frame(`${title}Meta`, {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#1a237e' }),
          text(`${category} · ${date}`, { fontSize: 12, fontWeight: 400, color: '#90a4ae' }),
        ],
      }),
      text(amount, {
        fontSize: 15, fontWeight: 600,
        color: positive ? '#4caf50' : '#1a237e',
      }),
    ],
  });
}

export default frame('BankingAppPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Nav bar
    frame('NavBar', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      fills: [solid('#1a237e')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SecureBank', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
        frame('UserInfo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('UserAvatar', { size: { x: 36, y: 36 }, fills: [solid('#e3f2fd')] }),
            text('John D.', { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Body
    frame('Body', {
      autoLayout: horizontal({ spacing: 32, padX: 32, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Sidebar
        frame('Sidebar', {
          size: { x: 260 },
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('ACCOUNTS', {
              fontSize: 13, fontWeight: 600, color: '#90a4ae',
              letterSpacing: { value: 5, unit: 'PERCENT' },
            }),
            accountSelector('Main Account', 'Checking', true),
            accountSelector('Savings', 'Savings Account', false),
            accountSelector('Business', 'Business Account', false),
          ],
        }),

        // Main content
        frame('MainContent', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Balance card
            frame('BalanceCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
              fills: [solid('#1a237e')],
              cornerRadius: 16,
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('BalanceTop', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Total Balance', { fontSize: 14, fontWeight: 500, color: '#90caf9' }),
                    text('•••• 4892', { fontSize: 13, fontWeight: 400, color: '#64b5f6' }),
                  ],
                }),
                text('$24,580.45', { fontSize: 36, fontWeight: 700, color: '#ffffff' }),
                frame('ActionButtons', {
                  autoLayout: horizontal({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: ['Send', 'Receive', 'Pay'].map(label =>
                    frame(`Btn${label}`, {
                      autoLayout: horizontal({ padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#ffffff', 0.12)],
                      cornerRadius: 10,
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text(label, { fontSize: 13, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
                      ],
                    })
                  ),
                }),
              ],
            }),

            // Transaction header
            frame('TxnHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Transactions', { fontSize: 18, fontWeight: 700, color: '#1a237e' }),
                text('View all', { fontSize: 13, fontWeight: 500, color: '#90a4ae' }),
              ],
            }),

            // Transactions
            frame('Transactions', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                transactionRow('Apple Store', 'Shopping', '-$129.00', false, 'Mar 15'),
                transactionRow('Salary Deposit', 'Income', '+$4,500.00', true, 'Mar 14'),
                transactionRow('Netflix', 'Subscription', '-$15.99', false, 'Mar 13'),
                transactionRow('Grocery Store', 'Food', '-$67.42', false, 'Mar 12'),
                transactionRow('Freelance Payment', 'Income', '+$850.00', true, 'Mar 11'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
