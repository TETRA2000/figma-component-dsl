/**
 * Startup Pitch Deck — Hero, problem/solution, metrics, team, CTA
 * DSL features: large hero typography, metric cards, gradient CTA, team avatars, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function metricCard(value: string, label: string, trend: string) {
  return frame(`Metric: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(value, { fontSize: 32, fontWeight: 800, color: '#111827', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 13, fontWeight: 500, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
      text(trend, { fontSize: 12, fontWeight: 600, color: '#10b981', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function teamMember(name: string, role: string, color: string) {
  return frame(`Team: ${name}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, { size: { x: 64, y: 64 }, fills: [solid(color)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#111827', textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

export default frame('StartupPitchPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 48, padX: 64, padY: 56 }),
  fills: [solid('#fafafa')],
  children: [
    // Hero
    frame('Hero', { autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
      frame('LogoBadge', { autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER' }), fills: [solid('#4f46e5')], cornerRadius: 8, children: [
        text('FlowAI', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
      ]}),
      text('The Future of\nWorkflow Automation', { fontSize: 48, fontWeight: 800, color: '#111827', textAlignHorizontal: 'CENTER', lineHeight: { value: 110, unit: 'PERCENT' }, size: { x: 700 }, textAutoResize: 'HEIGHT' }),
      text('AI-powered workflow automation that saves teams 10+ hours per week', { fontSize: 18, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ]}),
    // Metrics
    frame('Metrics', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
      metricCard('$2.4M', 'ARR', '+142% YoY'),
      metricCard('850+', 'Customers', '+68% QoQ'),
      metricCard('99.9%', 'Uptime', 'SLA Guaranteed'),
      metricCard('4.8', 'Rating', 'G2 Reviews'),
    ]}),
    // Problem/Solution
    frame('ProbSol', { autoLayout: horizontal({ spacing: 24 }), layoutSizingHorizontal: 'FILL', children: [
      frame('Problem', { autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }), fills: [solid('#fef2f2')], cornerRadius: 12, layoutSizingHorizontal: 'FILL', children: [
        text('The Problem', { fontSize: 18, fontWeight: 700, color: '#991b1b' }),
        text('Teams waste 40% of their time on repetitive tasks. Manual processes cause errors, delays, and burnout.', { fontSize: 14, fontWeight: 400, color: '#7f1d1d', lineHeight: { value: 160, unit: 'PERCENT' }, size: { x: 350 }, textAutoResize: 'HEIGHT' }),
      ]}),
      frame('Solution', { autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }), fills: [solid('#f0fdf4')], cornerRadius: 12, layoutSizingHorizontal: 'FILL', children: [
        text('Our Solution', { fontSize: 18, fontWeight: 700, color: '#166534' }),
        text('FlowAI learns your workflows and automates them intelligently. No coding required. Deploy in minutes, save hours daily.', { fontSize: 14, fontWeight: 400, color: '#14532d', lineHeight: { value: 160, unit: 'PERCENT' }, size: { x: 350 }, textAutoResize: 'HEIGHT' }),
      ]}),
    ]}),
    // Team
    frame('TeamSection', { autoLayout: vertical({ spacing: 20, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
      text('The Team', { fontSize: 22, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
      frame('TeamGrid', { autoLayout: horizontal({ spacing: 24 }), children: [
        teamMember('Sarah Chen', 'CEO & Co-founder', '#4f46e5'),
        teamMember('Marcus Kim', 'CTO & Co-founder', '#0ea5e9'),
        teamMember('Priya Patel', 'VP Engineering', '#10b981'),
        teamMember('James Lee', 'VP Product', '#f59e0b'),
      ]}),
    ]}),
    // CTA
    frame('CTA', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#4f46e5', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      cornerRadius: 16,
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Ready to automate?', { fontSize: 24, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Join 850+ teams already saving 10+ hours per week', { fontSize: 14, fontWeight: 400, color: '#c4b5fd', textAlignHorizontal: 'CENTER' }),
        frame('CTABtn', { autoLayout: horizontal({ padX: 32, padY: 12, align: 'CENTER' }), fills: [solid('#ffffff')], cornerRadius: 10, children: [
          text('Start Free Trial', { fontSize: 15, fontWeight: 600, color: '#4f46e5' }),
        ]}),
      ],
    }),
  ],
});
