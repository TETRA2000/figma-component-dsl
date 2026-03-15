/**
 * Loan Application — Progress steps, form sections, loan amount, term options, rate, monthly payment
 * Batch 6, Page 7: Finance/Banking
 * DSL Features: FIXED sizing, strokes, progress indicators, form patterns
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('FinLoanApplication', {
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
            text('Loan Application', { fontSize: 22, fontWeight: 700, color: '#f8fafc' }),
          ],
        }),
        text('Save & Exit', { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
      ],
    }),

    // Progress Steps
    frame('ProgressBar', {
      autoLayout: horizontal({ spacing: 0, padX: 120, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        stepItem('1', 'Loan Type', true, true),
        stepConnector(true),
        stepItem('2', 'Amount', true, true),
        stepConnector(true),
        stepItem('3', 'Personal Info', true, false),
        stepConnector(false),
        stepItem('4', 'Employment', false, false),
        stepConnector(false),
        stepItem('5', 'Review', false, false),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left — Form
        frame('FormCol', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Step 3: Personal Information
            frame('PersonalInfoCard', {
              autoLayout: vertical({ spacing: 20, padX: 32, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                frame('SectionHeader', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Step 3: Personal Information', { fontSize: 18, fontWeight: 600, color: '#f8fafc' }),
                    text('Please provide your personal details for the loan application.', { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
                  ],
                }),

                frame('FormRow1', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('First Name', 'Alexandra', true),
                    formField('Last Name', 'Mitchell', true),
                  ],
                }),

                frame('FormRow2', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('Email', 'alexandra@email.com', true),
                    formField('Phone', '(555) 123-4567', true),
                  ],
                }),

                frame('FormRow3', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('Date of Birth', '06/15/1990', true),
                    formField('SSN', '***-**-4521', true),
                  ],
                }),

                formField('Street Address', '1234 Oak Street, Apt 5B', false),

                frame('FormRow4', {
                  autoLayout: horizontal({ spacing: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    formField('City', 'San Francisco', true),
                    formField('State', 'CA', true),
                    formField('ZIP', '94102', true),
                  ],
                }),
              ],
            }),

            // Loan Amount Slider Area
            frame('LoanAmountCard', {
              autoLayout: vertical({ spacing: 20, padX: 32, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Loan Amount', { fontSize: 18, fontWeight: 600, color: '#f8fafc' }),
                // Amount display
                frame('AmountDisplay', {
                  autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER', align: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('$', { fontSize: 28, fontWeight: 300, color: '#64748b' }),
                    text('35,000', { fontSize: 44, fontWeight: 700, color: '#f8fafc' }),
                  ],
                }),
                // Slider track
                frame('SliderTrack', {
                  size: { x: 600, y: 8 },
                  fills: [solid('#0f172a')],
                  cornerRadius: 4,
                  clipContent: true,
                  autoLayout: horizontal({ spacing: 0 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    rectangle('SliderFill', {
                      size: { x: 350, y: 8 },
                      fills: [
                        gradient([
                          { hex: '#f59e0b', position: 0 },
                          { hex: '#d97706', position: 1 },
                        ], 0),
                      ],
                      cornerRadius: 4,
                    }),
                  ],
                }),
                // Range labels
                frame('RangeLabels', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('$5,000', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                    text('$100,000', { fontSize: 12, fontWeight: 400, color: '#64748b' }),
                  ],
                }),
              ],
            }),

            // Navigation Buttons
            frame('NavButtons', {
              autoLayout: horizontal({ spacing: 16, align: 'SPACE_BETWEEN' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('BackBtn', {
                  autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  cornerRadius: 10,
                  strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('← Back', { fontSize: 14, fontWeight: 500, color: '#94a3b8' }),
                  ],
                }),
                frame('NextBtn', {
                  autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [
                    gradient([
                      { hex: '#f59e0b', position: 0 },
                      { hex: '#d97706', position: 1 },
                    ], 135),
                  ],
                  cornerRadius: 10,
                  children: [
                    text('Continue to Employment →', { fontSize: 14, fontWeight: 600, color: '#0f172a' }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right — Loan Summary
        frame('SummaryCol', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 380, y: undefined },
          children: [
            // Loan Summary Card
            frame('SummaryCard', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Loan Summary', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                rectangle('SumDivider', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),
                summaryRow('Loan Type', 'Personal Loan'),
                summaryRow('Loan Amount', '$35,000'),
                summaryRow('Interest Rate', '6.99% APR'),
                summaryRow('Loan Term', '60 months'),
                rectangle('SumDivider2', { size: { x: 1, y: 1 }, fills: [solid('#334155')], layoutSizingHorizontal: 'FILL' }),
                frame('MonthlyPayment', {
                  autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Estimated Monthly Payment', { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
                    text('$693.42', { fontSize: 36, fontWeight: 700, color: '#f59e0b' }),
                  ],
                }),
              ],
            }),

            // Term Options
            frame('TermCard', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 16,
              strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
              children: [
                text('Select Term', { fontSize: 16, fontWeight: 600, color: '#f8fafc' }),
                termOption('36 months', '7.49%', '$1,089.12', false),
                termOption('48 months', '7.24%', '$843.67', false),
                termOption('60 months', '6.99%', '$693.42', true),
                termOption('72 months', '7.49%', '$603.28', false),
              ],
            }),

            // Rate Info
            frame('RateCard', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#0f172a')],
              cornerRadius: 16,
              strokes: [{ color: hex('#f59e0b'), weight: 1, align: 'INSIDE' }],
              children: [
                frame('RateHeader', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('★', { fontSize: 16, fontWeight: 600, color: '#f59e0b' }),
                    text('Your Rate', { fontSize: 14, fontWeight: 600, color: '#f59e0b' }),
                  ],
                }),
                text('Based on your credit score of 742, you qualify for our preferred rate of 6.99% APR.', {
                  fontSize: 13, fontWeight: 400, color: '#94a3b8',
                  lineHeight: { value: 20, unit: 'PIXELS' },
                  layoutSizingHorizontal: 'FILL',
                }),
                text('Total interest: $6,605.20', { fontSize: 12, fontWeight: 500, color: '#cbd5e1' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function stepItem(num: string, label: string, completed: boolean, active: boolean) {
  const bgColor = completed ? '#f59e0b' : active ? '#f59e0b' : '#1e293b';
  const textColor = completed || active ? '#0f172a' : '#64748b';
  const labelColor = completed || active ? '#f8fafc' : '#64748b';
  return frame(`Step: ${label}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      frame('StepCircle', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 36, y: 36 },
        fills: [solid(bgColor)],
        cornerRadius: 18,
        children: [
          text(completed && !active ? '✓' : num, { fontSize: 14, fontWeight: 700, color: textColor }),
        ],
      }),
      text(label, { fontSize: 12, fontWeight: active ? 600 : 400, color: labelColor }),
    ],
  });
}

function stepConnector(completed: boolean) {
  return rectangle('StepLine', {
    size: { x: 80, y: 2 },
    fills: [solid(completed ? '#f59e0b' : '#334155')],
    cornerRadius: 1,
  });
}

function formField(label: string, placeholder: string, half: boolean) {
  const fieldProps: Record<string, unknown> = {
    autoLayout: vertical({ spacing: 6 }),
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#94a3b8' }),
      frame(`Input: ${label}`, {
        autoLayout: horizontal({ padX: 16, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#0f172a')],
        cornerRadius: 8,
        strokes: [{ color: hex('#334155'), weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 14, fontWeight: 400, color: '#cbd5e1' }),
        ],
      }),
    ],
  };
  if (half) {
    (fieldProps as Record<string, unknown>).layoutSizingHorizontal = 'FILL';
  } else {
    (fieldProps as Record<string, unknown>).layoutSizingHorizontal = 'FILL';
  }
  return frame(`Field: ${label}`, fieldProps as Parameters<typeof frame>[1]);
}

function summaryRow(label: string, value: string) {
  return frame(`Sum: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 6, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#f8fafc' }),
    ],
  });
}

function termOption(term: string, rate: string, monthly: string, selected: boolean) {
  return frame(`Term: ${term}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: selected ? [solid('#f59e0b', 0.1)] : [solid('#0f172a')],
    cornerRadius: 10,
    strokes: [{ color: hex(selected ? '#f59e0b' : '#334155'), weight: selected ? 2 : 1, align: 'INSIDE' }],
    children: [
      frame('TermLeft', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(term, { fontSize: 14, fontWeight: selected ? 600 : 400, color: selected ? '#f59e0b' : '#cbd5e1' }),
          text(`${rate} APR`, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(`${monthly}/mo`, { fontSize: 14, fontWeight: 600, color: selected ? '#f59e0b' : '#f8fafc' }),
    ],
  });
}
