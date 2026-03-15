/**
 * Bill Pay — Upcoming bills, paid/unpaid status, add payee, payment history, auto-pay
 * Batch 6, Page 8: Finance/Banking
 * DSL Features: FIXED sizing, strokes, toggle patterns, status indicators
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinBillPay', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0b1120')],
      strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
      children: [
        text('Bill Pay', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
        frame('AddPayeeBtn', {
          autoLayout: horizontal({ padX: 20, padY: 10, spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#f59e0b')],
          cornerRadius: 8,
          children: [
            text('+', { fontSize: 16, fontWeight: 600, color: '#0f172a' }),
            text('Add Payee', { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left Column — Bills
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Summary Cards
            frame('SummaryRow', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                billSummary('Due This Month', '$2,847.50', '#f59e0b'),
                billSummary('Paid', '$1,523.00', '#10b981'),
                billSummary('Upcoming', '$1,324.50', '#3b82f6'),
                billSummary('Overdue', '$0.00', '#94a3b8'),
              ],
            }),

            // Upcoming Bills
            frame('UpcomingCard', {
              autoLayout: vertical({ spacing: 0, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                frame('UpcomingHeader', {
                  autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Upcoming Bills', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                    frame('FilterBtns', {
                      autoLayout: horizontal({ spacing: 8 }),
                      children: [
                        filterChip('All', true),
                        filterChip('Unpaid', false),
                        filterChip('Paid', false),
                      ],
                    }),
                  ],
                }),
                rectangle('UBDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),

                billRow('Electric Company', 'Pacific Gas & Electric', 'Mar 18', '$134.22', 'unpaid', true),
                billRow('Internet', 'Comcast Xfinity', 'Mar 20', '$89.99', 'unpaid', true),
                billRow('Car Insurance', 'Progressive', 'Mar 22', '$245.00', 'unpaid', false),
                billRow('Phone Bill', 'Verizon Wireless', 'Mar 25', '$95.50', 'unpaid', true),
                billRow('Mortgage', 'Wells Fargo', 'Mar 28', '$1,850.00', 'unpaid', true),
                billRow('Netflix', 'Netflix Inc.', 'Mar 15', '$15.99', 'paid', true),
                billRow('Spotify', 'Spotify AB', 'Mar 14', '$9.99', 'paid', true),
                billRow('Gym', 'Planet Fitness', 'Mar 12', '$24.99', 'paid', false),
              ],
            }),
          ],
        }),

        // Right Column — Add Payee + History
        frame('RightCol', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 400, y: undefined },
          children: [
            // Add Payee Form
            frame('AddPayeeCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Add New Payee', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                payeeField('Payee Name', 'Enter payee name'),
                payeeField('Account Number', 'Enter account number'),
                payeeField('Routing Number', 'Enter routing number'),
                payeeField('Payment Amount', '$0.00'),
                payeeField('Due Date', 'Select date'),
                frame('AutoPayRow', {
                  autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Enable Auto-Pay', { fontSize: 13, fontWeight: 500, color: '#cbd5e1' }),
                    toggleSwitch(false),
                  ],
                }),
                frame('AddPayeeSubmit', {
                  autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#f59e0b')],
                  cornerRadius: 10,
                  children: [
                    text('Add Payee', { fontSize: 14, fontWeight: 600, color: '#0f172a' }),
                  ],
                }),
              ],
            }),

            // Payment History
            frame('HistoryCard', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Payment History', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                historyItem('Netflix', 'Mar 15', '$15.99', 'Checking ****4521'),
                historyItem('Spotify', 'Mar 14', '$9.99', 'Checking ****4521'),
                historyItem('Gym Membership', 'Mar 12', '$24.99', 'Credit ****2277'),
                historyItem('Water Bill', 'Mar 8', '$67.45', 'Checking ****4521'),
                historyItem('Car Insurance', 'Feb 22', '$245.00', 'Checking ****4521'),
                frame('ViewMore', {
                  autoLayout: horizontal({ padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('View All History →', { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function billSummary(label: string, value: string, color: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: vertical({ spacing: 6, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1e293b')],
    cornerRadius: 12,
    strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      text(value, { fontSize: 20, fontWeight: 700, color }),
    ],
  });
}

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid('#f59e0b')] : [],
    cornerRadius: 6,
    strokes: active ? [] : [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#0f172a' : '#94a3b8' }),
    ],
  });
}

function billRow(name: string, company: string, dueDate: string, amount: string, status: 'paid' | 'unpaid', autoPay: boolean) {
  const statusColor = status === 'paid' ? '#10b981' : '#f59e0b';
  const statusLabel = status === 'paid' ? 'Paid' : 'Due';
  return frame(`Bill: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#1e293b'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('BillLeft', {
        autoLayout: horizontal({ spacing: 14, counterAlign: 'CENTER' }),
        children: [
          frame('BillIcon', {
            autoLayout: horizontal({ padX: 10, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 40, y: 40 },
            fills: [solid('#0f172a')],
            cornerRadius: 10,
            children: [
              text('$', { fontSize: 16, fontWeight: 600, color: statusColor }),
            ],
          }),
          frame('BillInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
              text(company, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
      frame('BillCenter', {
        autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
        size: { x: 100, y: undefined },
        children: [
          text(dueDate, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
          frame('StatusBadge', {
            autoLayout: horizontal({ padX: 8, padY: 2 }),
            fills: [solid(statusColor, 0.15)],
            cornerRadius: 999,
            children: [
              text(statusLabel, { fontSize: 10, fontWeight: 600, color: statusColor }),
            ],
          }),
        ],
      }),
      frame('BillRight', {
        autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
        children: [
          text(amount, { fontSize: 14, fontWeight: 600, color: '#f8fafc' }),
          frame('AutoPayToggle', {
            autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
            children: [
              toggleSwitch(autoPay),
              text('Auto', { fontSize: 9, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function toggleSwitch(on: boolean) {
  return frame('Toggle', {
    autoLayout: horizontal({ padX: 3, padY: 3, align: on ? 'MAX' : 'MIN', counterAlign: 'CENTER' }),
    size: { x: 40, y: 22 },
    fills: [solid(on ? '#f59e0b' : '#334155')],
    cornerRadius: 11,
    children: [
      ellipse('ToggleKnob', {
        size: { x: 16, y: 16 },
        fills: [solid('#ffffff')],
      }),
    ],
  });
}

function payeeField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
      frame(`Input: ${label}`, {
        autoLayout: horizontal({ padX: 14, padY: 10 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#0f172a')],
        cornerRadius: 8,
        strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
    ],
  });
}

function historyItem(name: string, date: string, amount: string, account: string) {
  return frame(`History: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#0f172a'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('HistLeft', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 13, fontWeight: 500, color: '#f8fafc' }),
          text(account, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      frame('HistRight', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(amount, { fontSize: 13, fontWeight: 600, color: '#f8fafc', textAlignHorizontal: 'RIGHT' }),
          text(date, { fontSize: 11, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'RIGHT' }),
        ],
      }),
    ],
  });
}
