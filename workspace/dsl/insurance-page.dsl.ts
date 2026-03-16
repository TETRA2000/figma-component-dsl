/**
 * Insurance Plans — Tier comparison, coverage details, and call-to-action
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function planTier(name: string, price: string, features: string[], recommended: boolean, color: string) {
  return frame(`Plan: ${name}`, {
    autoLayout: vertical({ spacing: 14, padX: 22, padY: 22 }),
    fills: [solid(recommended ? color : '#ffffff')],
    cornerRadius: 14,
    strokes: recommended ? [] : [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      recommended
        ? frame('RecBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid('#ffffff33')], cornerRadius: 9999, children: [text('Recommended', { fontSize: 10, fontWeight: 700, color: '#ffffff' })] })
        : rectangle('Spacer', { size: { x: 1, y: 0 }, fills: [] }),
      text(name, { fontSize: 20, fontWeight: 700, color: recommended ? '#ffffff' : '#0f172a' }),
      frame('PriceRow', { autoLayout: horizontal({ spacing: 4, counterAlign: 'BOTTOM' }), children: [
        text(price, { fontSize: 32, fontWeight: 800, color: recommended ? '#ffffff' : color }),
        text('/mo', { fontSize: 13, fontWeight: 400, color: recommended ? '#ffffffb3' : '#94a3b8' }),
      ] }),
      ...features.map(f => frame(`Feat: ${f}`, {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text('✓', { fontSize: 14, fontWeight: 700, color: recommended ? '#ffffff' : '#22c55e' }),
          text(f, { fontSize: 13, fontWeight: 400, color: recommended ? '#ffffffcc' : '#475569' }),
        ],
      })),
    ],
  });
}

function coverageRow(label: string, basic: string, standard: string, premium: string) {
  return frame(`Coverage: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 16, padY: 10 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#334155' }),
      frame('Values', { autoLayout: horizontal({ spacing: 40 }), children: [
        text(basic, { fontSize: 12, fontWeight: 600, color: '#64748b' }),
        text(standard, { fontSize: 12, fontWeight: 600, color: '#1e40af' }),
        text(premium, { fontSize: 12, fontWeight: 600, color: '#7c3aed' }),
      ] }),
    ],
  });
}

export default frame('InsurancePage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e40af', position: 1 }], 160)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('ShieldGuard Insurance', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Protect what matters most — plans for every budget', { fontSize: 14, fontWeight: 400, color: '#93c5fd' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('PlanGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            planTier('Basic', '$49', ['$10k coverage', 'Accident only', 'Email support'], false, '#64748b'),
            planTier('Standard', '$99', ['$50k coverage', 'Accident & illness', 'Priority support', 'Dental included'], true, '#1e40af'),
            planTier('Premium', '$179', ['$200k coverage', 'Full medical', '24/7 concierge', 'Dental & vision', 'Global coverage'], false, '#7c3aed'),
          ],
        }),
        frame('Comparison', {
          autoLayout: vertical({ spacing: 6 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Coverage Comparison', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            coverageRow('Deductible', '$5,000', '$2,500', '$500'),
            coverageRow('Hospital stays', '50%', '80%', '100%'),
            coverageRow('Prescriptions', '—', 'Generic only', 'All Rx'),
            coverageRow('Mental health', '—', '10 visits/yr', 'Unlimited'),
            coverageRow('Emergency room', '70%', '90%', '100%'),
          ],
        }),
      ],
    }),
  ],
});
