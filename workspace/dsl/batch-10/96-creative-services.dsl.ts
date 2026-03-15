/**
 * Creative Services Page — Service cards, process steps, FAQ accordion
 * Batch 10, Page 96: Services page for creative portfolio
 * DSL Features: gradients, cornerRadius, nested layouts, icons
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

export default component('CreativeServices', {
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
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            text('Work', { fontSize: 14, fontWeight: 500, color: muted }),
            text('About', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Services', { fontSize: 14, fontWeight: 500, color: white }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#0f0f0f', position: 0 },
          { hex: '#1a0a2e', position: 0.5 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        text('OUR SERVICES', { fontSize: 14, fontWeight: 600, color: purple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('What We Do Best', {
          fontSize: 56,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          letterSpacing: { value: -2, unit: 'PIXELS' },
        }),
        text('Comprehensive creative solutions tailored to your needs', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
        }),
      ],
    }),

    // Service Cards Grid
    frame('ServicesGrid', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('\u2606', 'Brand Identity', 'Complete brand development including logo, color palette, typography, and brand guidelines.', '$5,000 — $15,000', purple),
            serviceCard('\u25A1', 'Web Design', 'Custom website design and development with responsive layouts and modern interactions.', '$8,000 — $25,000', pink),
            serviceCard('\u25CB', 'UI/UX Design', 'User-centered interface design with wireframing, prototyping, and usability testing.', '$6,000 — $20,000', cyan),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('\u25B7', 'Motion Design', 'Animated content including brand animations, explainer videos, and micro-interactions.', '$3,000 — $12,000', '#f97316'),
            serviceCard('\u2662', 'Illustration', 'Custom illustrations for web, print, and marketing materials in various styles.', '$2,000 — $8,000', '#22c55e'),
            serviceCard('\u2610', 'Print Design', 'Marketing collateral, packaging design, and editorial layouts for physical media.', '$2,500 — $10,000', '#3b82f6'),
          ],
        }),
      ],
    }),

    // Process Steps
    frame('Process', {
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Our Process', { fontSize: 40, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
        text('A proven workflow that delivers exceptional results', { fontSize: 18, fontWeight: 400, color: muted }),
        frame('StepsRow', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            processStep('01', 'Discovery', 'Understanding your goals, audience, and competitive landscape through research and workshops.', purple),
            processStep('02', 'Strategy', 'Defining the creative direction, project roadmap, and key deliverables.', pink),
            processStep('03', 'Creation', 'Designing, iterating, and refining until every detail is perfect.', cyan),
            processStep('04', 'Launch', 'Delivering final assets and providing support for implementation.', '#f97316'),
          ],
        }),
      ],
    }),

    // FAQ Section
    frame('FAQ', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FAQHeader', {
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Frequently Asked Questions', { fontSize: 36, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' }),
          ],
        }),
        frame('FAQList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            faqItem('What is your typical project timeline?', 'Most projects take 4-8 weeks depending on scope and complexity. We provide a detailed timeline during the discovery phase so you know exactly what to expect.', true),
            faqItem('Do you work with startups?', 'Absolutely! We love working with startups and have special packages designed for early-stage companies looking to establish their brand presence.', false),
            faqItem('What is included in a brand identity package?', 'Our brand identity packages include logo design, color palette, typography system, brand guidelines document, and a starter set of marketing templates.', false),
            faqItem('Can you handle both design and development?', 'Yes, we offer end-to-end design and development services. Our team includes both designers and developers who work closely together.', false),
            faqItem('What are your payment terms?', 'We typically require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments.', false),
          ],
        }),
      ],
    }),

    // CTA
    frame('CTA', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a2e', position: 0 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        text('Ready to Start?', { fontSize: 40, fontWeight: 700, color: white }),
        text('Let us bring your vision to life', { fontSize: 18, fontWeight: 400, color: muted }),
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 40, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
          cornerRadius: 999,
          children: [
            text('Get a Quote', { fontSize: 16, fontWeight: 600, color: white }),
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

function serviceCard(icon: string, title: string, description: string, price: string, accentColor: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 16,
    children: [
      // Icon
      frame('IconBg', {
        autoLayout: horizontal({ padX: 14, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 52, y: 52 },
        fills: [solid(accentColor, 0.15)],
        cornerRadius: 14,
        children: [
          text(icon, { fontSize: 22, fontWeight: 600, color: accentColor }),
        ],
      }),
      text(title, { fontSize: 20, fontWeight: 600, color: white }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: muted,
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 340 },
        textAutoResize: 'HEIGHT',
      }),
      rectangle('Divider', {
        size: { x: 1, y: 1 },
        fills: [solid('#2a2a2a')],
        layoutSizingHorizontal: 'FILL',
      }),
      text(price, { fontSize: 16, fontWeight: 600, color: accentColor }),
    ],
  });
}

function processStep(num: string, title: string, description: string, color: string) {
  return frame(`Step: ${num}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNum', {
        autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 56, y: 56 },
        fills: [solid(color, 0.15)],
        cornerRadius: 28,
        children: [
          text(num, { fontSize: 20, fontWeight: 700, color }),
        ],
      }),
      text(title, { fontSize: 18, fontWeight: 600, color: white, textAlignHorizontal: 'CENTER' }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: muted,
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 240 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function faqItem(question: string, answer: string, open: boolean) {
  return frame(`FAQ: ${question.substring(0, 30)}`, {
    autoLayout: vertical({ spacing: open ? 12 : 0, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('QuestionRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(question, { fontSize: 16, fontWeight: 600, color: white }),
          text(open ? '\u2212' : '+', { fontSize: 20, fontWeight: 600, color: purple }),
        ],
      }),
      ...(open ? [
        text(answer, {
          fontSize: 15,
          fontWeight: 400,
          color: muted,
          lineHeight: { value: 24, unit: 'PIXELS' },
          size: { x: 900 },
          textAutoResize: 'HEIGHT',
        }),
      ] : []),
    ],
  });
}
