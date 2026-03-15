/**
 * Creative Case Study — Metrics banner, problem/approach/results, before/after
 * Batch 10, Page 98: Case study detail page
 * DSL Features: gradients, cornerRadius, stat blocks, split layouts
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const purple = '#7c3aed';
const pink = '#ec4899';
const cyan = '#06b6d4';
const dark = '#0f0f0f';
const white = '#ffffff';
const muted = '#a1a1aa';
const card = '#1a1a1a';

export default component('CreativeCaseStudy', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('STUDIO', { fontSize: 22, fontWeight: 800, color: white, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('Back to Case Studies', { fontSize: 14, fontWeight: 500, color: muted }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#0f0f0f', position: 0 },
          { hex: '#1a102e', position: 0.5 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        frame('CaseBadge', {
          autoLayout: horizontal({ padX: 14, padY: 6 }),
          fills: [solid(purple, 0.2)],
          cornerRadius: 999,
          children: [
            text('Case Study', { fontSize: 12, fontWeight: 600, color: purple }),
          ],
        }),
        text('Reimagining the Digital\nExperience for NovaTech', {
          fontSize: 56,
          fontWeight: 800,
          color: white,
          lineHeight: { value: 64, unit: 'PIXELS' },
          letterSpacing: { value: -2, unit: 'PIXELS' },
        }),
        text('A complete brand and platform redesign that transformed user engagement and business outcomes.', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
          lineHeight: { value: 32, unit: 'PIXELS' },
          size: { x: 700 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // Metrics Banner — 3 big numbers
    frame('MetricsBanner', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        metricBlock('340%', 'Increase in\nBrand Awareness', purple),
        metricBlock('2.5M', 'New Users\nin First Quarter', pink),
        metricBlock('98%', 'Customer\nSatisfaction Score', cyan),
      ],
    }),

    // Problem Statement
    frame('ProblemStatement', {
      autoLayout: horizontal({ spacing: 64, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ProblemText', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('THE PROBLEM', { fontSize: 14, fontWeight: 600, color: pink, letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('An Outdated Platform Failing Its Users', {
              fontSize: 36,
              fontWeight: 700,
              color: white,
              lineHeight: { value: 44, unit: 'PIXELS' },
            }),
            text('NovaTech had built a successful B2B software company, but their digital presence told a different story. The website was dated, the user experience was fragmented, and their brand no longer reflected the innovative solutions they provided.', {
              fontSize: 16,
              fontWeight: 400,
              color: muted,
              lineHeight: { value: 28, unit: 'PIXELS' },
              size: { x: 520 },
              textAutoResize: 'HEIGHT',
            }),
            text('Key pain points included a 67% bounce rate, confusing navigation, and a visual identity that blended in with competitors rather than standing out.', {
              fontSize: 16,
              fontWeight: 400,
              color: muted,
              lineHeight: { value: 28, unit: 'PIXELS' },
              size: { x: 520 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
        rectangle('ProblemImage', {
          size: { x: 480, y: 360 },
          fills: [gradient([{ hex: '#2a1a3e', position: 0 }, { hex: '#1a1a2e', position: 1 }], 135)],
          cornerRadius: 20,
        }),
      ],
    }),

    // Approach
    frame('Approach', {
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        frame('ApproachHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('OUR APPROACH', { fontSize: 14, fontWeight: 600, color: cyan, letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('Strategic Design Thinking', { fontSize: 40, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('ApproachSteps', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            approachStep('Research & Discovery', 'Conducted 30+ user interviews, competitive analysis, and stakeholder workshops to understand the core challenges.'),
            approachStep('Brand Strategy', 'Defined a new brand positioning, messaging framework, and visual direction that differentiated NovaTech in the market.'),
            approachStep('Design & Prototyping', 'Created a comprehensive design system with 200+ components, prototyped key user flows, and validated with real users.'),
            approachStep('Development & Launch', 'Built the new platform using modern web technologies, launched in phases, and measured impact continuously.'),
          ],
        }),
      ],
    }),

    // Results
    frame('Results', {
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ResultsHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('THE RESULTS', { fontSize: 14, fontWeight: 600, color: '#22c55e', letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('Measurable Impact Across the Board', { fontSize: 40, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('ResultsList', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            resultRow('Bounce Rate', '67%', '23%', '-66%'),
            resultRow('Time on Site', '1:20', '4:45', '+255%'),
            resultRow('Conversion Rate', '1.2%', '4.8%', '+300%'),
            resultRow('Support Tickets', '850/mo', '210/mo', '-75%'),
          ],
        }),
      ],
    }),

    // Before / After Comparison
    frame('BeforeAfter', {
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Before & After', { fontSize: 36, fontWeight: 700, color: white }),
        frame('Comparison', {
          autoLayout: horizontal({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            comparisonArea('Before', '#1a1a1a', '#3f3f46'),
            comparisonArea('After', '#1a0a2e', purple),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 40, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('© 2026 Studio. All rights reserved.', { fontSize: 14, fontWeight: 400, color: muted }),
      ],
    }),
  ],
});

function metricBlock(value: string, label: string, accentColor: string) {
  return frame(`Metric: ${value}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, {
        fontSize: 64,
        fontWeight: 800,
        color: accentColor,
        textAlignHorizontal: 'CENTER',
        letterSpacing: { value: -2, unit: 'PIXELS' },
      }),
      text(label, {
        fontSize: 16,
        fontWeight: 400,
        color: muted,
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 24, unit: 'PIXELS' },
      }),
    ],
  });
}

function approachStep(title: string, description: string) {
  return frame(`Approach: ${title.substring(0, 20)}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 12,
    children: [
      text(title, { fontSize: 17, fontWeight: 600, color: white }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: muted,
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function resultRow(metric: string, before: string, after: string, change: string) {
  const positive = change.startsWith('+') || change.startsWith('-7');
  return frame(`Result: ${metric}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 12,
    children: [
      text(metric, { fontSize: 16, fontWeight: 600, color: white, size: { x: 300 }, textAutoResize: 'HEIGHT' }),
      text(before, { fontSize: 16, fontWeight: 400, color: '#71717a', size: { x: 150 }, textAutoResize: 'HEIGHT' }),
      text(after, { fontSize: 16, fontWeight: 600, color: white, size: { x: 150 }, textAutoResize: 'HEIGHT' }),
      frame('Change', {
        autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(positive ? '#22c55e' : '#ef4444', 0.15)],
        cornerRadius: 999,
        children: [
          text(change, { fontSize: 14, fontWeight: 600, color: positive ? '#22c55e' : '#ef4444' }),
        ],
      }),
    ],
  });
}

function comparisonArea(label: string, bgColor: string, borderColor: string) {
  return frame(`Comparison: ${label}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(bgColor)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.3, g: 0.3, b: 0.3, a: 0.5 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 14, fontWeight: 600, color: borderColor, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      // Placeholder for comparison visual
      rectangle('ComparisonPlaceholder', {
        size: { x: 100, y: 320 },
        fills: [gradient([{ hex: bgColor, position: 0 }, { hex: borderColor, position: 1 }], 270)],
        cornerRadius: 12,
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}
