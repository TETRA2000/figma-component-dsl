/**
 * Money Transfer — Account selectors, amount input, fee breakdown, confirm
 * Batch 6, Page 3: Finance/Banking
 * DSL Features: FIXED sizing, form patterns, strokes, number typography
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinTransfer', {
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
        frame('HeaderLeft', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            text('←', { fontSize: 18, fontWeight: 400, color: '#94a3b8' }),
            text('Transfer Money', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
          ],
        }),
        frame('QuickActions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Recent', { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
            text('Scheduled', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
      ],
    }),

    // Main Content — centered card
    frame('MainContent', {
      autoLayout: vertical({ spacing: 32, padX: 64, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Transfer Card
        frame('TransferCard', {
          autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
          size: { x: 560, y: undefined },
          fills: [solid('#1e293b')],
          cornerRadius: 20,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            // From Account
            frame('FromSection', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('From', { fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: { value: 8, unit: 'PERCENT' } }),
                frame('FromAccount', {
                  autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#0f172a')],
                  cornerRadius: 12,
                  strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
                  children: [
                    frame('FromInfo', {
                      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                      children: [
                        ellipse('CheckDot', { size: { x: 12, y: 12 }, fills: [solid('#3b82f6')] }),
                        frame('FromDetails', {
                          autoLayout: vertical({ spacing: 2 }),
                          children: [
                            text('Checking Account', { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
                            text('****4521', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                          ],
                        }),
                      ],
                    }),
                    frame('FromBalance', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('Available', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                        text('$45,230.12', { fontSize: 14, fontWeight: 600, color: '#f8fafc' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Swap indicator
            frame('SwapRow', {
              autoLayout: horizontal({ padX: 32, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('SwapCircle', {
                  autoLayout: horizontal({ padX: 10, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 40, y: 40 },
                  fills: [solid('#f59e0b')],
                  cornerRadius: 20,
                  children: [
                    text('↕', { fontSize: 18, fontWeight: 600, color: '#0f172a' }),
                  ],
                }),
              ],
            }),

            // To Account / Recipient
            frame('ToSection', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('To', { fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: { value: 8, unit: 'PERCENT' } }),
                frame('ToAccount', {
                  autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#0f172a')],
                  cornerRadius: 12,
                  strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
                  children: [
                    frame('ToInfo', {
                      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                      children: [
                        rectangle('RecipientAvatar', {
                          size: { x: 36, y: 36 },
                          fills: [solid('#10b981')],
                          cornerRadius: 18,
                        }),
                        frame('ToDetails', {
                          autoLayout: vertical({ spacing: 2 }),
                          children: [
                            text('James Wilson', { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
                            text('Bank of America ****7823', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                          ],
                        }),
                      ],
                    }),
                    text('▾', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
                  ],
                }),
              ],
            }),

            rectangle('Divider1', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),

            // Amount Input
            frame('AmountSection', {
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 28, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Amount', { fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: { value: 8, unit: 'PERCENT' } }),
                frame('AmountInput', {
                  autoLayout: horizontal({ spacing: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                  children: [
                    text('$', { fontSize: 36, fontWeight: 300, color: '#64748b' }),
                    text('1,500', { fontSize: 48, fontWeight: 700, color: '#f8fafc' }),
                    text('.00', { fontSize: 28, fontWeight: 400, color: '#64748b' }),
                  ],
                }),
                frame('QuickAmounts', {
                  autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
                  children: [
                    quickAmountBtn('$100'),
                    quickAmountBtn('$500'),
                    quickAmountBtn('$1,000'),
                    quickAmountBtn('$5,000'),
                  ],
                }),
              ],
            }),

            rectangle('Divider2', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),

            // Fee Breakdown
            frame('FeeSection', {
              autoLayout: vertical({ spacing: 10, padX: 32, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                feeRow('Transfer Amount', '$1,500.00'),
                feeRow('Service Fee', '$0.00'),
                feeRow('Exchange Rate', 'N/A'),
                rectangle('FeeDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),
                feeRow('Total', '$1,500.00'),
              ],
            }),

            // Note
            frame('NoteSection', {
              autoLayout: vertical({ spacing: 8, padX: 32, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Note (optional)', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                frame('NoteInput', {
                  autoLayout: horizontal({ padX: 16, padY: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#0f172a')],
                  cornerRadius: 8,
                  strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Rent payment for March', { fontSize: 13, fontWeight: 400, color: '#cbd5e1' }),
                  ],
                }),
              ],
            }),

            // Confirm Button
            frame('ConfirmSection', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('ConfirmBtn', {
                  autoLayout: horizontal({ padX: 0, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [
                    gradient([
                      { hex: '#f59e0b', position: 0 },
                      { hex: '#d97706', position: 1 },
                    ], 135),
                  ],
                  cornerRadius: 12,
                  children: [
                    text('Confirm Transfer', { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
                  ],
                }),
                text('Transfers typically arrive within 1-2 business days', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
              ],
            }),
          ],
        }),

        // Recent Recipients
        frame('RecentRecipients', {
          autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
          size: { x: 560, y: undefined },
          fills: [solid('#1e293b')],
          cornerRadius: 16,
          strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
          children: [
            text('Recent Recipients', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
            frame('RecipientRow', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                recipientChip('JW', '#10b981', 'James W.'),
                recipientChip('SM', '#3b82f6', 'Sarah M.'),
                recipientChip('KL', '#8b5cf6', 'Kevin L.'),
                recipientChip('AR', '#ef4444', 'Anna R.'),
                recipientChip('+', '#334155', 'Add New'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function quickAmountBtn(label: string) {
  return frame(`Quick: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#0f172a')],
    cornerRadius: 8,
    strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#cbd5e1' }),
    ],
  });
}

function feeRow(label: string, value: string) {
  return frame(`Fee: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: label === 'Total' ? 600 : 400, color: label === 'Total' ? '#f8fafc' : '#94a3b8' }),
      text(value, { fontSize: 13, fontWeight: label === 'Total' ? 700 : 400, color: label === 'Total' ? '#f59e0b' : '#cbd5e1' }),
    ],
  });
}

function recipientChip(initials: string, color: string, name: string) {
  return frame(`Recipient: ${name}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('RecipAvatar', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 48, y: 48 },
        fills: [solid(color)],
        cornerRadius: 24,
        children: [
          text(initials, { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
      text(name, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}
