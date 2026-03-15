/**
 * Credit Score — Large score display, score history, factors, tips
 * Batch 6, Page 6: Finance/Banking
 * DSL Features: ellipses for circular display, FIXED sizing, strokes, progress bars
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinCreditScore', {
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
        text('Credit Score', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
        text('Last updated: Mar 15, 2026', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left — Score Display + History
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Score Display Card
            frame('ScoreCard', {
              autoLayout: vertical({ spacing: 24, padX: 40, padY: 36, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [
                gradient([
                  { hex: '#1e293b', position: 0 },
                  { hex: '#0f172a', position: 1 },
                ], 270),
              ],
              cornerRadius: 20,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                // Circular score display
                frame('ScoreCircle', {
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 240, y: 240 },
                  children: [
                    ellipse('ScoreRingBg', {
                      size: { x: 240, y: 240 },
                      fills: [],
                      strokes: [{ color: hex('#1e293b'), weight: 16, align: 'INSIDE' }],
                    }),
                  ],
                }),
                // Score overlay text (positioned below circle)
                frame('ScoreValue', {
                  autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
                  children: [
                    text('742', { fontSize: 72, fontWeight: 700, color: '#10b981' }),
                    text('Good', { fontSize: 18, fontWeight: 600, color: '#10b981' }),
                  ],
                }),
                // Score Range
                frame('ScoreRange', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('RangeItem', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('300', { fontSize: 12, fontWeight: 400, color: '#ef4444' }),
                        text('Poor', { fontSize: 10, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                    frame('RangeItem2', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('580', { fontSize: 12, fontWeight: 400, color: '#f59e0b' }),
                        text('Fair', { fontSize: 10, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                    frame('RangeItem3', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('670', { fontSize: 12, fontWeight: 400, color: '#eab308' }),
                        text('Good', { fontSize: 10, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                    frame('RangeItem4', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('740', { fontSize: 12, fontWeight: 400, color: '#10b981' }),
                        text('Very Good', { fontSize: 10, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                    frame('RangeItem5', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('850', { fontSize: 12, fontWeight: 400, color: '#22c55e' }),
                        text('Excellent', { fontSize: 10, fontWeight: 400, color: '#64748b' }),
                      ],
                    }),
                  ],
                }),
                // Score change
                frame('ScoreChange', {
                  autoLayout: horizontal({ padX: 16, padY: 8, spacing: 8, counterAlign: 'CENTER' }),
                  fills: [solid('#10b981', 0.15)],
                  cornerRadius: 999,
                  children: [
                    text('▲', { fontSize: 11, fontWeight: 600, color: '#10b981' }),
                    text('+12 points since last month', { fontSize: 13, fontWeight: 500, color: '#10b981' }),
                  ],
                }),
              ],
            }),

            // Score History
            frame('HistoryCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Score History', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                historyRow('March 2026', '742', '+12', '#10b981'),
                historyRow('February 2026', '730', '+5', '#10b981'),
                historyRow('January 2026', '725', '-3', '#ef4444'),
                historyRow('December 2025', '728', '+8', '#10b981'),
                historyRow('November 2025', '720', '+15', '#10b981'),
                historyRow('October 2025', '705', '0', '#94a3b8'),
              ],
            }),
          ],
        }),

        // Right — Factors + Tips
        frame('RightCol', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 480, y: undefined },
          children: [
            // Factors affecting score
            frame('FactorsCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Factors Affecting Your Score', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                factorItem('Payment History', 'Excellent', 35, '#10b981', 'On-time payments: 100%'),
                factorItem('Credit Utilization', 'Good', 30, '#22c55e', 'Using 23% of available credit'),
                factorItem('Credit Age', 'Fair', 15, '#f59e0b', 'Average age: 4 years 2 months'),
                factorItem('Credit Mix', 'Good', 10, '#22c55e', '3 credit cards, 1 loan, 1 mortgage'),
                factorItem('Hard Inquiries', 'Excellent', 10, '#10b981', '1 inquiry in last 12 months'),
              ],
            }),

            // Tips to Improve
            frame('TipsCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Tips to Improve', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                tipItem('1', 'Keep utilization below 30%', 'You\'re currently at 23%. Great job! Try to keep it below 30% for optimal scoring.'),
                tipItem('2', 'Don\'t close old accounts', 'Your oldest account is 8 years. Keeping it open helps your credit age.'),
                tipItem('3', 'Limit new applications', 'Wait at least 6 months before applying for new credit.'),
                tipItem('4', 'Set up autopay', 'Automate payments to maintain your perfect payment history.'),
              ],
            }),

            // Credit Report Summary
            frame('ReportCard', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Credit Report Summary', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                reportRow('Open Accounts', '7'),
                reportRow('Total Balance', '$34,567'),
                reportRow('Available Credit', '$112,400'),
                reportRow('Utilization', '23%'),
                reportRow('Oldest Account', '8 yrs'),
                reportRow('Recent Inquiries', '1'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function historyRow(month: string, score: string, change: string, color: string) {
  return frame(`History: ${month}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#0f172a'), weight: 1, align: 'INSIDE' }],
    children: [
      text(month, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      frame('ScoreAndChange', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(score, { fontSize: 14, fontWeight: 600, color: '#f8fafc' }),
          text(change === '0' ? '—' : change, { fontSize: 12, fontWeight: 500, color }),
        ],
      }),
    ],
  });
}

function factorItem(name: string, status: string, weight: number, color: string, detail: string) {
  return frame(`Factor: ${name}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('FactorHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('FactorLeft', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(name, { fontSize: 14, fontWeight: 500, color: '#f8fafc' }),
              frame('WeightBadge', {
                autoLayout: horizontal({ padX: 8, padY: 2 }),
                fills: [solid('#0f172a')],
                cornerRadius: 999,
                children: [
                  text(`${weight}%`, { fontSize: 10, fontWeight: 500, color: '#94a3b8' }),
                ],
              }),
            ],
          }),
          text(status, { fontSize: 13, fontWeight: 600, color }),
        ],
      }),
      frame('FactorBar', {
        size: { x: 300, y: 6 },
        fills: [solid('#0f172a')],
        cornerRadius: 3,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('FactorFill', {
            size: { x: Math.round((weight / 35) * 300), y: 6 },
            fills: [solid(color)],
            cornerRadius: 3,
          }),
        ],
      }),
      text(detail, { fontSize: 12, fontWeight: 400, color: '#64748b', lineHeight: { value: 18, unit: 'PIXELS' } }),
    ],
  });
}

function tipItem(num: string, title: string, description: string) {
  return frame(`Tip: ${title}`, {
    autoLayout: horizontal({ spacing: 14, padX: 16, padY: 14 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#0f172a')],
    cornerRadius: 10,
    children: [
      frame('TipNum', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 28, y: 28 },
        fills: [solid('#f59e0b')],
        cornerRadius: 14,
        children: [
          text(num, { fontSize: 13, fontWeight: 700, color: '#0f172a' }),
        ],
      }),
      frame('TipText', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: '#f8fafc' }),
          text(description, {
            fontSize: 12, fontWeight: 400, color: '#94a3b8',
            lineHeight: { value: 18, unit: 'PIXELS' },
            layoutSizingHorizontal: 'FILL',
          }),
        ],
      }),
    ],
  });
}

function reportRow(label: string, value: string) {
  return frame(`Report: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#0f172a'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#f8fafc' }),
    ],
  });
}
