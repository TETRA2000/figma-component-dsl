import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const navy = '#1a237e';
const navyLight = '#283593';
const white = '#ffffff';
const lightBlue = '#e3f2fd';
const green = '#4caf50';
const red = '#f44336';
const gray = '#9e9e9e';
const darkGray = '#424242';
const bgGray = '#f5f5f5';

// Transaction row
function transactionRow(name: string, category: string, amount: string, isPositive: boolean, time: string) {
  return frame(`Txn: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Left', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('Icon', {
            size: { x: 40, y: 40 },
            fills: [solid(isPositive ? '#e8f5e9' : '#fce4ec')],
          }),
          frame('Details', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 500, color: darkGray }),
              text(category, { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
      frame('Right', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(`${isPositive ? '+' : '-'}${amount}`, {
            fontSize: 15,
            fontWeight: 600,
            color: isPositive ? green : red,
          }),
          text(time, { fontSize: 11, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

// Action button
function actionButton(label: string) {
  return frame(`Action: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    size: { x: 80, y: undefined },
    children: [
      ellipse('ActionIcon', {
        size: { x: 48, y: 48 },
        fills: [solid(navy)],
      }),
      text(label, { fontSize: 12, fontWeight: 500, color: darkGray, textAlignHorizontal: 'CENTER' as const }),
    ],
  });
}

// Account selector
function accountSelector(name: string, number: string, isSelected: boolean) {
  return frame(`Account: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(isSelected ? lightBlue : white)],
    cornerRadius: 12,
    strokes: [{ color: isSelected ? { r: 0.1, g: 0.14, b: 0.49, a: 1 } : { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: isSelected ? 2 : 1, align: 'INSIDE' as const }],
    size: { x: 200, y: undefined },
    children: [
      ellipse('BankIcon', {
        size: { x: 36, y: 36 },
        fills: [solid(isSelected ? navy : gray)],
      }),
      frame('AccountInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: isSelected ? navy : darkGray }),
          text(number, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

// Balance card
const balanceCard = frame('BalanceCard', {
  autoLayout: vertical({ spacing: 16, padX: 32, padY: 28 }),
  layoutSizingHorizontal: 'FILL',
  fills: [gradient([
    { hex: navy, position: 0 },
    { hex: navyLight, position: 1 },
  ], 135)],
  cornerRadius: 20,
  children: [
    frame('CardHeader', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Total Balance', { fontSize: 14, fontWeight: 400, color: '#bbdefb' }),
        ellipse('MoreIcon', { size: { x: 24, y: 24 }, fills: [solid(white, 0.2)] }),
      ],
    }),
    text('$24,568.90', { fontSize: 36, fontWeight: 700, color: white }),
    frame('CardFooter', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Change', {
          autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
          children: [
            text('+$1,234.50', { fontSize: 14, fontWeight: 600, color: '#a5d6a7' }),
            text('this month', { fontSize: 12, fontWeight: 400, color: '#bbdefb' }),
          ],
        }),
        text('**** 4829', { fontSize: 14, fontWeight: 400, color: '#bbdefb' }),
      ],
    }),
  ],
});

export default frame('BankingApp', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bgGray)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(navy)],
      children: [
        text('SecureBank', { fontSize: 20, fontWeight: 700, color: white }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: white }),
            text('Payments', { fontSize: 14, fontWeight: 400, color: '#bbdefb' }),
            text('Cards', { fontSize: 14, fontWeight: 400, color: '#bbdefb' }),
            ellipse('ProfileAvatar', {
              size: { x: 32, y: 32 },
              fills: [solid(white, 0.3)],
            }),
          ],
        }),
      ],
    }),

    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left column
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            balanceCard,

            // Quick actions
            frame('QuickActions', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }),
              fills: [solid(white)],
              cornerRadius: 16,
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Quick Actions', { fontSize: 16, fontWeight: 600, color: darkGray }),
                frame('ActionRow', {
                  autoLayout: horizontal({ spacing: 16, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    actionButton('Send'),
                    actionButton('Request'),
                    actionButton('Pay Bills'),
                    actionButton('Invest'),
                    actionButton('More'),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right column - account selectors + transactions
        frame('RightColumn', {
          autoLayout: vertical({ spacing: 16 }),
          size: { x: 440, y: undefined },
          children: [
            // Account selectors
            frame('Accounts', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }),
              fills: [solid(white)],
              cornerRadius: 16,
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Accounts', { fontSize: 16, fontWeight: 600, color: darkGray }),
                accountSelector('Checking', '****4829', true),
                accountSelector('Savings', '****7231', false),
              ],
            }),

            // Transactions
            frame('Transactions', {
              autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
              fills: [solid(white)],
              cornerRadius: 16,
              clipContent: true,
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('TxnHeader', {
                  autoLayout: horizontal({ spacing: 0, padX: 20, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Recent Transactions', { fontSize: 16, fontWeight: 600, color: darkGray }),
                    text('See All', { fontSize: 13, fontWeight: 500, color: navy }),
                  ],
                }),
                transactionRow('Amazon Purchase', 'Shopping', '$89.99', false, '2:30 PM'),
                transactionRow('Salary Deposit', 'Income', '$4,500.00', true, 'Yesterday'),
                transactionRow('Electric Bill', 'Utilities', '$142.50', false, 'Mar 12'),
                transactionRow('Freelance Payment', 'Income', '$850.00', true, 'Mar 11'),
                transactionRow('Grocery Store', 'Food', '$67.23', false, 'Mar 10'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
