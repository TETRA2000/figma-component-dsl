/**
 * Creative Project Detail — Case study with hero, challenge/solution/result, process, testimonial
 * Batch 10, Page 92: Project case study page
 * DSL Features: gradients, cornerRadius, text styles, nested layouts
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

export default component('CreativeProject', {
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
        frame('BackLink', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('<-', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Back to Work', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Hero Image
    frame('HeroImage', {
      size: { x: 1440, y: 560 },
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: purple, position: 0 },
          { hex: pink, position: 0.5 },
          { hex: cyan, position: 1 },
        ], 135),
      ],
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 60, align: 'MAX' }),
      children: [
        frame('ProjectBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6 }),
          fills: [solid('#000000', 0.4)],
          cornerRadius: 999,
          children: [
            text('Branding', { fontSize: 13, fontWeight: 500, color: white }),
          ],
        }),
        text('Brand Refresh for Acme Inc.', {
          fontSize: 48,
          fontWeight: 800,
          color: white,
          lineHeight: { value: 56, unit: 'PIXELS' },
        }),
      ],
    }),

    // Project Meta
    frame('ProjectMeta', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 48, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(card)],
      children: [
        metaItem('Client', 'Acme Inc.'),
        metaItem('Year', '2026'),
        metaItem('Role', 'Lead Designer'),
        metaItem('Duration', '8 Weeks'),
      ],
    }),

    // Challenge / Solution / Result
    frame('CSR', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        csrBlock('The Challenge', 'Acme Inc. needed a complete brand overhaul to reflect their pivot from enterprise software to a consumer-focused SaaS platform. The existing brand felt dated and failed to resonate with their new target demographic of creative professionals.', purple),
        csrBlock('The Solution', 'We developed a bold, modern visual identity system featuring a vibrant color palette, custom typography, and a flexible design system. The new brand language emphasizes creativity, accessibility, and forward-thinking innovation.', pink),
        csrBlock('The Result', 'The rebrand led to a 340% increase in brand awareness, 78% improvement in user engagement metrics, and overwhelmingly positive reception from both existing customers and the creative community.', cyan),
      ],
    }),

    // Process Steps
    frame('Process', {
      autoLayout: vertical({ spacing: 48, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Our Process', {
          fontSize: 40,
          fontWeight: 700,
          color: white,
          textAlignHorizontal: 'CENTER',
        }),
        frame('Steps', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            processStep('01', 'Discovery', 'Deep-dive into brand values, market positioning, and user research.'),
            processStep('02', 'Ideation', 'Exploring visual directions through moodboards and concept sketches.'),
            processStep('03', 'Design', 'Crafting the final visual identity system and design deliverables.'),
            processStep('04', 'Delivery', 'Brand guidelines, asset library, and implementation support.'),
          ],
        }),
      ],
    }),

    // Client Testimonial
    frame('Testimonial', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('\u201C', { fontSize: 120, fontWeight: 700, color: purple, lineHeight: { value: 80, unit: 'PIXELS' } }),
        text('Working with Studio was a transformative experience. They truly understood our vision and translated it into a brand identity that exceeded all expectations. The attention to detail and creative thinking was exceptional.', {
          fontSize: 24,
          fontWeight: 400,
          color: '#d4d4d8',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 38, unit: 'PIXELS' },
          size: { x: 800 },
          textAutoResize: 'HEIGHT',
        }),
        frame('ClientInfo', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            rectangle('ClientPhoto', {
              size: { x: 48, y: 48 },
              fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
              cornerRadius: 24,
            }),
            frame('ClientDetails', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Sarah Mitchell', { fontSize: 16, fontWeight: 600, color: white }),
                text('CEO, Acme Inc.', { fontSize: 14, fontWeight: 400, color: muted }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer CTA
    frame('FooterCTA', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('Like what you see?', { fontSize: 36, fontWeight: 700, color: white }),
        frame('CTAButton', {
          autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
          cornerRadius: 999,
          children: [
            text('Start a Project', { fontSize: 16, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),
  ],
});

function metaItem(label: string, value: string) {
  return frame(`Meta: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: muted, letterSpacing: { value: 2, unit: 'PIXELS' } }),
      text(value, { fontSize: 18, fontWeight: 600, color: white }),
    ],
  });
}

function csrBlock(title: string, description: string, accentColor: string) {
  return frame(`CSR: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 16,
    children: [
      rectangle('Accent', {
        size: { x: 40, y: 4 },
        fills: [solid(accentColor)],
        cornerRadius: 2,
      }),
      text(title, { fontSize: 22, fontWeight: 700, color: white }),
      text(description, {
        fontSize: 15,
        fontWeight: 400,
        color: '#a1a1aa',
        lineHeight: { value: 24, unit: 'PIXELS' },
        size: { x: 340 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function processStep(num: string, title: string, description: string) {
  return frame(`Step: ${num}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1a1a1a')],
    cornerRadius: 12,
    children: [
      text(num, { fontSize: 36, fontWeight: 800, color: purple }),
      text(title, { fontSize: 18, fontWeight: 600, color: white }),
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
