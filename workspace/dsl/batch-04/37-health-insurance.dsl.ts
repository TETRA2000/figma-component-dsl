/**
 * Insurance Info — Plan details card, coverage breakdown, deductible progress bar,
 * claim history table
 * Batch 4, Page 7: Healthcare/Wellness
 * DSL Features: SPACE_BETWEEN, strokes, progress bars, ellipse, text wrapping
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

export default component('HealthInsurance', {
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
        text('Insurance & Benefits', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('DownloadBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            text('Download Card', { fontSize: 13, fontWeight: 500, color: dark }),
          ],
        }),
      ],
    }),

    /* ---- Plan Details Card ---- */
    frame('PlanCard', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('PlanInfo', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(blue)],
          cornerRadius: 14,
          children: [
            frame('PlanHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('HealthPlus Premium PPO', { fontSize: 20, fontWeight: 700, color: white }),
                frame('ActiveBadge', {
                  autoLayout: horizontal({ padX: 10, padY: 4 }),
                  fills: [solid('#ffffff33')],
                  cornerRadius: 12,
                  children: [
                    text('Active', { fontSize: 12, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
            frame('PlanMeta', {
              autoLayout: horizontal({ spacing: 32 }),
              children: [
                planDetail('Member ID', 'HPP-2026-48291'),
                planDetail('Group No.', 'GRP-7834'),
                planDetail('Effective', 'Jan 1, 2026'),
              ],
            }),
            rectangle('PlanDivider', {
              size: { x: 1, y: 1 },
              fills: [solid('#ffffff33')],
              layoutSizingHorizontal: 'FILL',
            }),
            frame('PlanCosts', {
              autoLayout: horizontal({ spacing: 32 }),
              children: [
                planDetail('Monthly Premium', '$450'),
                planDetail('Copay (PCP)', '$25'),
                planDetail('Copay (Specialist)', '$50'),
                planDetail('ER Visit', '$250'),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Deductible & Out-of-Pocket ---- */
    frame('DeductibleSection', {
      autoLayout: horizontal({ spacing: 16, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        deductibleCard('Individual Deductible', 1850, 3000),
        deductibleCard('Family Deductible', 3200, 6000),
        deductibleCard('Out-of-Pocket Max', 4500, 8000),
      ],
    }),

    /* ---- Coverage Breakdown ---- */
    frame('CoverageSection', {
      autoLayout: vertical({ spacing: 16, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Coverage Breakdown', { fontSize: 18, fontWeight: 600, color: dark }),
        frame('CoverageGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            coverageCard('Preventive Care', '100%', 'Covered in full'),
            coverageCard('Primary Care', '90%', 'After deductible'),
            coverageCard('Specialist', '80%', 'After deductible'),
            coverageCard('Hospitalization', '80%', 'After deductible'),
          ],
        }),
        frame('CoverageGrid2', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            coverageCard('Prescription (Generic)', '90%', '$10 copay'),
            coverageCard('Prescription (Brand)', '70%', '$40 copay'),
            coverageCard('Mental Health', '80%', 'After deductible'),
            coverageCard('Physical Therapy', '80%', '30 visits/year'),
          ],
        }),
      ],
    }),

    /* ---- Claim History ---- */
    frame('ClaimsSection', {
      autoLayout: vertical({ spacing: 12, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Recent Claims', { fontSize: 18, fontWeight: 600, color: dark }),
        frame('ClaimsTable', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          cornerRadius: 10,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            claimHeader(),
            claimRow('Mar 10', 'Lab — Blood Work', 'Quest Diagnostics', '$285.00', '$28.50', 'Paid'),
            claimRow('Mar 5', 'Office Visit', 'Dr. Sarah Mitchell', '$175.00', '$25.00', 'Paid'),
            claimRow('Feb 22', 'Specialist', 'Dr. James Chen', '$320.00', '$50.00', 'Paid'),
            claimRow('Feb 15', 'Prescription', 'CVS Pharmacy', '$95.00', '$10.00', 'Paid'),
            claimRow('Feb 1', 'X-Ray', 'MedImage Center', '$420.00', '$84.00', 'Pending'),
          ],
        }),
      ],
    }),

    frame('BottomSpacer', { size: { x: 1, y: 32 }, layoutSizingHorizontal: 'FILL' }),
  ],
});

/* ---- helpers ---- */

function planDetail(label: string, value: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: vertical({ spacing: 2 }),
    children: [
      text(label, { fontSize: 11, fontWeight: 400, color: '#ffffffaa' }),
      text(value, { fontSize: 14, fontWeight: 600, color: white }),
    ],
  });
}

function deductibleCard(title: string, used: number, total: number) {
  const pct = Math.round((used / total) * 100);
  const barWidth = Math.round((used / total) * 300);
  const barColor = pct > 80 ? red : pct > 50 ? amber : green;
  return frame(`Deductible: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(title, { fontSize: 14, fontWeight: 600, color: dark }),
      frame('AmountRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(`$${used.toLocaleString()}`, { fontSize: 24, fontWeight: 700, color: dark }),
          text(`of $${total.toLocaleString()}`, { fontSize: 14, fontWeight: 400, color: gray }),
        ],
      }),
      frame('ProgressTrack', {
        size: { x: 300, y: 8 },
        fills: [solid('#e2e8f0')],
        cornerRadius: 4,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('ProgressFill', { size: { x: barWidth, y: 8 }, fills: [solid(barColor)] }),
        ],
      }),
      text(`${pct}% used`, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}

function coverageCard(service: string, percentage: string, note: string) {
  return frame(`Coverage: ${service}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(service, { fontSize: 13, fontWeight: 500, color: dark }),
      text(percentage, { fontSize: 22, fontWeight: 700, color: blue }),
      text(note, { fontSize: 12, fontWeight: 400, color: gray }),
    ],
  });
}

function claimHeader() {
  return frame('ClaimHeader', {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#f1f5f9')],
    children: [
      text('Date', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
      text('Service', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 200 }, textAutoResize: 'HEIGHT' }),
      text('Provider', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 200 }, textAutoResize: 'HEIGHT' }),
      text('Billed', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      text('You Owe', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      text('Status', { fontSize: 12, fontWeight: 600, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
    ],
  });
}

function claimRow(date: string, service: string, provider: string, billed: string, owed: string, status: string) {
  const statusColor = status === 'Paid' ? green : amber;
  const statusBg = status === 'Paid' ? greenLight : amberLight;
  return frame(`Claim: ${date} ${service}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f1f5f9'), weight: 1, align: 'INSIDE' }],
    children: [
      text(date, { fontSize: 13, fontWeight: 400, color: gray, size: { x: 100 }, textAutoResize: 'HEIGHT' }),
      text(service, { fontSize: 13, fontWeight: 500, color: dark, size: { x: 200 }, textAutoResize: 'HEIGHT' }),
      text(provider, { fontSize: 13, fontWeight: 400, color: gray, size: { x: 200 }, textAutoResize: 'HEIGHT' }),
      text(billed, { fontSize: 13, fontWeight: 500, color: dark, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      text(owed, { fontSize: 13, fontWeight: 600, color: dark, size: { x: 120 }, textAutoResize: 'HEIGHT' }),
      frame(`ClaimStatus: ${status}`, {
        autoLayout: horizontal({ padX: 8, padY: 3 }),
        fills: [solid(statusBg)],
        cornerRadius: 10,
        children: [
          text(status, { fontSize: 12, fontWeight: 500, color: statusColor }),
        ],
      }),
    ],
  });
}
