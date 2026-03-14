/**
 * Banking App — mobile finance UI with precise sizing.
 *
 * Demonstrates:
 *  - ellipse() for avatars and icons
 *  - gradient() for card backgrounds
 *  - opacity on shapes
 *  - SPACE_BETWEEN for header and quick actions
 *  - Nested vertical + horizontal auto-layout
 *  - FILL sizing for transaction info columns
 *  - Strokes on containers
 *  - Precise fixed sizing
 */
import {
  component, frame, rectangle, ellipse, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BG_PAGE = '#f8fafc';
const WHITE = '#ffffff';
const TEXT_DARK = '#1e293b';
const TEXT_MID = '#475569';
const TEXT_LIGHT = '#94a3b8';
const BORDER = '#e2e8f0';
const GREEN = '#10b981';

// --- Helper: Transaction Row ---
function transactionRow(
  merchant: string, category: string, amount: string,
  date: string, positive: boolean, iconColor: string,
) {
  return frame(`Tx: ${merchant}`, {
    autoLayout: horizontal({ spacing: 12, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      // Icon circle
      ellipse('Icon', {
        size: { x: 40, y: 40 },
        fills: [solid(iconColor, 0.8)],
      }),
      // Info
      frame('Info', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(merchant, { fontSize: 15, fontWeight: 600, color: TEXT_DARK }),
          text(category, { fontSize: 13, fontWeight: 400, color: TEXT_LIGHT }),
        ],
      }),
      // Amount
      frame('Amount', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
        children: [
          text(`${positive ? '+' : '-'}${amount}`, {
            fontSize: 16, fontWeight: 700,
            color: positive ? GREEN : TEXT_DARK,
          }),
          text(date, { fontSize: 12, fontWeight: 400, color: TEXT_LIGHT }),
        ],
      }),
    ],
  });
}

// --- Helper: Quick Action ---
function quickAction(label: string, dotColor: string) {
  return frame(`Action: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    size: { x: 80, y: undefined as unknown as number },
    children: [
      // Outer circle (light fill with border)
      frame('Circle', {
        autoLayout: horizontal({ counterAlign: 'CENTER', align: 'CENTER' }),
        size: { x: 56, y: 56 },
        fills: [solid(dotColor, 0.12)],
        cornerRadius: 28,
        strokes: [{ color: { r: 0.3, g: 0.5, b: 0.8, a: 0.25 }, weight: 1, align: 'INSIDE' as const }],
        children: [
          ellipse('Dot', {
            size: { x: 24, y: 24 },
            fills: [solid(dotColor)],
          }),
        ],
      }),
      text(label, { fontSize: 13, fontWeight: 500, color: TEXT_MID, textAlignHorizontal: 'CENTER' }),
    ],
  });
}

// --- Main Page ---
export default component('BankingAppPage', {
  size: { x: 440, y: undefined as unknown as number },
  autoLayout: vertical({
    spacing: 32,
    padX: 32,
    padY: 32,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid(BG_PAGE)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Greeting', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Good morning,', { fontSize: 14, fontWeight: 400, color: TEXT_LIGHT }),
            text('Sarah', { fontSize: 24, fontWeight: 700, color: TEXT_DARK }),
          ],
        }),
        ellipse('Avatar', {
          size: { x: 44, y: 44 },
          fills: [gradient([
            { hex: '#6366f1', position: 0 },
            { hex: '#8b5cf6', position: 1 },
          ], 135)],
        }),
      ],
    }),

    // Account Card
    frame('Account Card', {
      autoLayout: vertical({ spacing: 20, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([
        { hex: '#1e3a5f', position: 0 },
        { hex: '#0f2744', position: 1 },
      ], 135)],
      cornerRadius: 16,
      children: [
        frame('Card Header', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('CHECKING', {
              fontSize: 14, fontWeight: 600, color: '#93c5fd',
              letterSpacing: { value: 5, unit: 'PERCENT' },
            }),
            text('**** 4829', { fontSize: 13, fontWeight: 500, color: TEXT_LIGHT }),
          ],
        }),
        frame('Balance Section', {
          autoLayout: vertical({ spacing: 4 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Available Balance', { fontSize: 12, fontWeight: 500, color: TEXT_LIGHT }),
            text('$12,450.80', { fontSize: 36, fontWeight: 700, color: WHITE }),
            text('USD', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Quick Actions
    frame('Quick Actions', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        quickAction('Send', '#3b82f6'),
        quickAction('Request', '#10b981'),
        quickAction('Pay', '#f59e0b'),
        quickAction('More', '#6366f1'),
      ],
    }),

    // Transactions
    frame('Transactions', {
      autoLayout: vertical({ spacing: 0, padX: 20, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(WHITE)],
      cornerRadius: 16,
      strokes: [{ color: { r: 0.886, g: 0.910, b: 0.941, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Recent Transactions', { fontSize: 16, fontWeight: 600, color: TEXT_DARK }),
        transactionRow('Apple Store', 'Shopping', '$129.00', 'Today', false, '#1e293b'),
        transactionRow('Salary Deposit', 'Income', '$4,500.00', 'Mar 12', true, '#10b981'),
        transactionRow('Uber', 'Transport', '$24.50', 'Mar 11', false, '#1e293b'),
        transactionRow('Netflix', 'Entertainment', '$15.99', 'Mar 10', false, '#ef4444'),
      ],
    }),
  ],
});
