/**
 * Solar Panel Installer — Energy savings calculator, panel options, ROI chart
 * DSL features: green/yellow palette, large savings numbers, comparison columns, gradient chart, progress bars
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function savingStat(label: string, value: string, color: string) {
  return frame(`Stat:${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.9, g: 0.92, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(value, { fontSize: 28, fontWeight: 700, color }),
      text(label, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

function panelOption(name: string, watts: string, price: string, efficiency: string, highlighted: boolean) {
  return frame(`Panel:${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid(highlighted ? '#166534' : '#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: highlighted ? [] : [{ color: { r: 0.88, g: 0.9, b: 0.82, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ...(highlighted ? [frame('BestBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
        fills: [solid('#facc15')],
        cornerRadius: 4,
        children: [text('Best Value', { fontSize: 10, fontWeight: 700, color: '#422006' })],
      })] : []),
      text(name, { fontSize: 16, fontWeight: 600, color: highlighted ? '#ffffff' : '#111827' }),
      text(watts, { fontSize: 13, fontWeight: 400, color: highlighted ? '#bbf7d0' : '#6b7280' }),
      text(price, { fontSize: 24, fontWeight: 700, color: highlighted ? '#facc15' : '#166534' }),
      text(efficiency, { fontSize: 12, fontWeight: 500, color: highlighted ? '#86efac' : '#16a34a' }),
    ],
  });
}

function roiBar(year: string, pct: number, value: string) {
  return frame(`ROI:${year}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(year, { fontSize: 12, fontWeight: 500, color: '#374151', size: { x: 50 } }),
      frame('BarTrack', {
        size: { x: 400, y: 14 },
        fills: [solid('#ecfdf5')],
        cornerRadius: 7,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(400 * pct), y: 14 },
            fills: [gradient([{ hex: '#22c55e', position: 0 }, { hex: '#facc15', position: 1 }], 90)],
            cornerRadius: 7,
          }),
        ],
      }),
      text(value, { fontSize: 12, fontWeight: 600, color: '#166534', size: { x: 70 } }),
    ],
  });
}

export default frame('SolarPanelPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 28, padX: 44, padY: 36 }),
  fills: [solid('#f7fdf4')],
  children: [
    text('SunPower Solar Solutions', { fontSize: 28, fontWeight: 700, color: '#14532d' }),
    text('Calculate your savings, pick the right panels, see your return on investment.', { fontSize: 14, fontWeight: 400, color: '#6b7280', size: { x: 600 }, textAutoResize: 'HEIGHT' }),
    frame('SavingsRow', {
      autoLayout: horizontal({ spacing: 14 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        savingStat('Monthly Savings', '$142', '#16a34a'),
        savingStat('Annual Savings', '$1,704', '#15803d'),
        savingStat('25-Year Savings', '$42,600', '#166534'),
        savingStat('CO2 Offset/Year', '4.2 tons', '#ca8a04'),
      ],
    }),
    text('Panel Options', { fontSize: 20, fontWeight: 600, color: '#14532d' }),
    frame('PanelGrid', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        panelOption('Standard', '370W per panel', '$8,500', '19.1% efficiency', false),
        panelOption('Premium', '400W per panel', '$12,200', '21.5% efficiency', true),
        panelOption('Elite', '430W per panel', '$16,800', '22.8% efficiency', false),
      ],
    }),
    frame('ROISection', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
      fills: [solid('#ffffff')],
      cornerRadius: 12,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.88, g: 0.92, b: 0.82, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('ROI Projection', { fontSize: 18, fontWeight: 600, color: '#14532d' }),
        roiBar('Year 1', 0.12, '$1,704'),
        roiBar('Year 5', 0.45, '$8,520'),
        roiBar('Year 10', 0.72, '$17,040'),
        roiBar('Year 15', 0.88, '$25,560'),
        roiBar('Year 25', 1.0, '$42,600'),
      ],
    }),
  ],
});
