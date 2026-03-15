/**
 * Mortgage Calculator — Amount display, rate, term selector buttons,
 * payment breakdown table
 * Batch 9, Page 5: Real Estate
 * DSL Features: component(), strokes, helper functions, mixed sizing
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const brown = '#78350f';
const green = '#365314';
const cream = '#f5f0e8';
const white = '#ffffff';
const dark = '#1c1917';
const gray = '#78716c';
const border = '#d6d3d1';
const lightGreen = '#dcfce7';
const darkGreen = '#166534';

export default component('RealEstateMortgageCalc', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 64, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(brown)],
      children: [
        text('Mortgage Calculator', { fontSize: 28, fontWeight: 700, color: white }),
        text('Estimate your monthly payments and find the best rate', { fontSize: 16, fontWeight: 400, color: '#d6d3d1' }),
      ],
    }),

    /* ---- Calculator Body ---- */
    frame('CalcBody', {
      autoLayout: horizontal({ spacing: 32, padX: 64, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Left: Inputs */
        frame('InputsCol', {
          autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          cornerRadius: 16,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            /* Home Price */
            inputField('Home Price', '$895,000'),
            /* Down Payment */
            frame('DownPaymentRow', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('DownPaymentInput', {
                  autoLayout: vertical({ spacing: 6 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Down Payment', { fontSize: 13, fontWeight: 500, color: gray }),
                    frame('DownPaymentField', {
                      autoLayout: horizontal({ padX: 14, padY: 12 }),
                      layoutSizingHorizontal: 'FILL',
                      cornerRadius: 8,
                      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                      children: [
                        text('$179,000', { fontSize: 16, fontWeight: 600, color: dark }),
                      ],
                    }),
                  ],
                }),
                frame('PercentInput', {
                  autoLayout: vertical({ spacing: 6 }),
                  size: { x: 100, y: undefined },
                  children: [
                    text('Percent', { fontSize: 13, fontWeight: 500, color: gray }),
                    frame('PercentField', {
                      autoLayout: horizontal({ padX: 14, padY: 12 }),
                      layoutSizingHorizontal: 'FILL',
                      cornerRadius: 8,
                      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                      children: [
                        text('20%', { fontSize: 16, fontWeight: 600, color: dark }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* Interest Rate */
            inputField('Interest Rate', '6.75%'),

            /* Loan Term */
            frame('LoanTerm', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Loan Term', { fontSize: 13, fontWeight: 500, color: gray }),
                frame('TermButtons', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    termBtn('15 years', false),
                    termBtn('20 years', false),
                    termBtn('30 years', true),
                  ],
                }),
              ],
            }),

            /* Property Tax */
            inputField('Property Tax (yearly)', '$10,740'),
            /* Home Insurance */
            inputField('Home Insurance (yearly)', '$2,400'),

            /* Calculate Button */
            frame('CalcBtn', {
              autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(green)],
              cornerRadius: 10,
              children: [
                text('Calculate Payment', { fontSize: 16, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),

        /* Right: Results */
        frame('ResultsCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Monthly Payment Display */
            frame('MonthlyPayment', {
              autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Estimated Monthly Payment', { fontSize: 14, fontWeight: 500, color: gray }),
                text('$4,642', { fontSize: 48, fontWeight: 700, color: brown }),
                text('/month', { fontSize: 16, fontWeight: 400, color: gray }),
              ],
            }),

            /* Payment Breakdown */
            frame('BreakdownCard', {
              autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              clipContent: true,
              children: [
                frame('BreakdownHeader', {
                  autoLayout: horizontal({ padX: 24, padY: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(cream)],
                  children: [
                    text('Payment Breakdown', { fontSize: 16, fontWeight: 600, color: dark }),
                  ],
                }),
                breakdownRow('Principal & Interest', '$3,497', brown),
                breakdownRow('Property Tax', '$895', dark),
                breakdownRow('Home Insurance', '$200', dark),
                breakdownRow('PMI', '$0', darkGreen),
                rectangle('BreakdownDivider', {
                  size: { x: 1, y: 1 },
                  fills: [solid(border)],
                  layoutSizingHorizontal: 'FILL',
                }),
                frame('TotalRow', {
                  autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(cream)],
                  children: [
                    text('Total Monthly', { fontSize: 15, fontWeight: 700, color: dark }),
                    text('$4,642', { fontSize: 15, fontWeight: 700, color: brown }),
                  ],
                }),
              ],
            }),

            /* Loan Summary */
            frame('LoanSummary', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              clipContent: true,
              children: [
                frame('SummaryHeader', {
                  autoLayout: horizontal({ padX: 24, padY: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(cream)],
                  children: [
                    text('Loan Summary', { fontSize: 16, fontWeight: 600, color: dark }),
                  ],
                }),
                summaryRow('Loan Amount', '$716,000'),
                summaryRow('Total Interest Paid', '$555,120'),
                summaryRow('Total Cost of Loan', '$1,271,120'),
                summaryRow('Payoff Date', 'March 2056'),
              ],
            }),

            /* Donut indicator */
            frame('DonutChart', {
              autoLayout: horizontal({ spacing: 24, padX: 24, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                ellipse('ChartRing', {
                  size: { x: 100, y: 100 },
                  fills: [],
                  strokes: [{ color: hex(brown), weight: 10, align: 'INSIDE' }],
                }),
                frame('ChartLegend', {
                  autoLayout: vertical({ spacing: 8 }),
                  children: [
                    legendItem(brown, 'Principal & Interest — 75%'),
                    legendItem('#57534e', 'Property Tax — 19%'),
                    legendItem('#a8a29e', 'Insurance — 4%'),
                    legendItem(darkGreen, 'PMI — 0%'),
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

/* ---- helpers ---- */

function inputField(label: string, value: string) {
  return frame(`Input: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: gray }),
      frame(`Field: ${label}`, {
        autoLayout: horizontal({ padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        cornerRadius: 8,
        strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
        children: [
          text(value, { fontSize: 16, fontWeight: 600, color: dark }),
        ],
      }),
    ],
  });
}

function termBtn(label: string, active: boolean) {
  return frame(`Term: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? brown : white)],
    cornerRadius: 8,
    strokes: active ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: active ? white : dark }),
    ],
  });
}

function breakdownRow(label: string, amount: string, amountColor: string) {
  return frame(`Breakdown: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: gray }),
      text(amount, { fontSize: 14, fontWeight: 600, color: amountColor }),
    ],
  });
}

function summaryRow(label: string, value: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 14, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: gray }),
      text(value, { fontSize: 14, fontWeight: 600, color: dark }),
    ],
  });
}

function legendItem(color: string, label: string) {
  return frame(`Legend: ${label}`, {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      rectangle(`Dot: ${label}`, { size: { x: 10, y: 10 }, fills: [solid(color)], cornerRadius: 5 }),
      text(label, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}
