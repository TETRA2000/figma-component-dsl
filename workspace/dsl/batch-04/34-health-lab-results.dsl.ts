/**
 * Lab Results Page — Test categories, individual result rows (name, value,
 * normal range, status indicator), date selector
 * Batch 4, Page 4: Healthcare/Wellness
 * DSL Features: ellipse status dots, SPACE_BETWEEN, strokes, text wrapping
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#f8fafc';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const border = '#e2e8f0';
const green = '#16a34a';
const greenLight = '#dcfce7';
const amber = '#f59e0b';
const amberLight = '#fef3c7';
const red = '#dc2626';
const redLight = '#fee2e2';

export default component('HealthLabResults', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('Lab Results', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('DateSelector', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('Date Range:', { fontSize: 13, fontWeight: 500, color: gray }),
            frame('DatePicker', {
              autoLayout: horizontal({ padX: 12, padY: 6, spacing: 6, counterAlign: 'CENTER' }),
              fills: [solid(white)],
              cornerRadius: 6,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Mar 1 – Mar 15, 2026', { fontSize: 13, fontWeight: 500, color: dark }),
                text('▾', { fontSize: 12, fontWeight: 400, color: gray }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Summary Bar ---- */
    frame('Summary', {
      autoLayout: horizontal({ spacing: 16, padX: 64, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        summaryCard('Total Tests', '12', blue),
        summaryCard('Normal', '9', green),
        summaryCard('Abnormal', '2', amber),
        summaryCard('Critical', '1', red),
      ],
    }),

    /* ---- Category Tabs ---- */
    frame('CategoryTabs', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryTab('All Results', true),
        categoryTab('Blood Work', false),
        categoryTab('Metabolic', false),
        categoryTab('Thyroid', false),
        categoryTab('Urinalysis', false),
      ],
    }),

    /* ---- Results Table ---- */
    frame('ResultsTable', {
      autoLayout: vertical({ spacing: 0, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Table header */
        frame('TableHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#f1f5f9')],
          cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
          children: [
            text('Test Name', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 280 }, textAutoResize: 'HEIGHT' }),
            text('Result', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
            text('Normal Range', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 180 }, textAutoResize: 'HEIGHT' }),
            text('Unit', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
            text('Status', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
          ],
        }),

        /* Table container */
        frame('TableBody', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            /* Blood Work */
            sectionLabel('Complete Blood Count — Mar 10, 2026'),
            resultRow('White Blood Cells', '7.2', '4.5 – 11.0', '10^3/uL', 'normal'),
            resultRow('Red Blood Cells', '4.8', '4.2 – 5.9', '10^6/uL', 'normal'),
            resultRow('Hemoglobin', '14.1', '12.0 – 17.5', 'g/dL', 'normal'),
            resultRow('Hematocrit', '42.3', '36.0 – 50.0', '%', 'normal'),
            resultRow('Platelets', '145', '150 – 400', '10^3/uL', 'low'),

            /* Metabolic */
            sectionLabel('Metabolic Panel — Mar 8, 2026'),
            resultRow('Glucose (Fasting)', '118', '70 – 100', 'mg/dL', 'high'),
            resultRow('BUN', '16', '7 – 20', 'mg/dL', 'normal'),
            resultRow('Creatinine', '0.9', '0.7 – 1.3', 'mg/dL', 'normal'),
            resultRow('Sodium', '140', '136 – 145', 'mEq/L', 'normal'),
            resultRow('Potassium', '4.1', '3.5 – 5.0', 'mEq/L', 'normal'),

            /* Lipid */
            sectionLabel('Lipid Panel — Mar 8, 2026'),
            resultRow('Total Cholesterol', '215', '< 200', 'mg/dL', 'high'),
            resultRow('HDL Cholesterol', '55', '> 40', 'mg/dL', 'normal'),
            resultRow('LDL Cholesterol', '138', '< 100', 'mg/dL', 'high'),
            resultRow('Triglycerides', '110', '< 150', 'mg/dL', 'normal'),
          ],
        }),
      ],
    }),

    /* Bottom padding */
    frame('BottomSpacer', { size: { x: 1, y: 32 }, layoutSizingHorizontal: 'FILL' }),
  ],
});

/* ---- helpers ---- */

function summaryCard(label: string, value: string, color: string) {
  return frame(`Summary: ${label}`, {
    autoLayout: horizontal({ spacing: 12, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('SummaryDot', {
        size: { x: 40, y: 40 },
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(color + '18')],
        cornerRadius: 20,
        children: [
          text(value, { fontSize: 16, fontWeight: 700, color }),
        ],
      }),
      frame('SummaryText', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(value, { fontSize: 24, fontWeight: 700, color: dark }),
          text(label, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

function categoryTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    strokes: active
      ? [{ color: hex(blue), weight: 2, align: 'INSIDE' }]
      : [],
    children: [
      text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? blue : gray }),
    ],
  });
}

function sectionLabel(label: string) {
  return frame(`Section: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 10 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#f8fafc')],
    children: [
      text(label, { fontSize: 13, fontWeight: 600, color: dark }),
    ],
  });
}

function resultRow(testName: string, value: string, range: string, unit: string, status: 'normal' | 'high' | 'low') {
  const statusColor = status === 'normal' ? green : status === 'high' ? red : amber;
  const statusBg = status === 'normal' ? greenLight : status === 'high' ? redLight : amberLight;
  const statusLabel = status === 'normal' ? 'Normal' : status === 'high' ? 'High' : 'Low';

  return frame(`Row: ${testName}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f1f5f9'), weight: 1, align: 'INSIDE' }],
    children: [
      text(testName, { fontSize: 14, fontWeight: 400, color: dark, size: { x: 280 }, textAutoResize: 'HEIGHT' }),
      text(value, { fontSize: 14, fontWeight: 600, color: status !== 'normal' ? statusColor : dark, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      text(range, { fontSize: 13, fontWeight: 400, color: gray, size: { x: 180 }, textAutoResize: 'HEIGHT' }),
      text(unit, { fontSize: 13, fontWeight: 400, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
      frame(`StatusBadge: ${statusLabel}`, {
        autoLayout: horizontal({ padX: 8, padY: 3, spacing: 4, counterAlign: 'CENTER' }),
        fills: [solid(statusBg)],
        cornerRadius: 10,
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(statusColor)] }),
          text(statusLabel, { fontSize: 12, fontWeight: 500, color: statusColor }),
        ],
      }),
    ],
  });
}
