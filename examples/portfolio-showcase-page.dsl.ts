import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const offBlack = '#1a1a1a';
const nearWhite = '#f5f5f5';
const midGray = '#888888';
const dimGray = '#444444';

// Project card (wide)
function projectCard(title: string, category: string, gradFrom: string, gradTo: string) {
  return frame(`Project: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 680, y: 400 },
    cornerRadius: 16,
    clipContent: true,
    children: [
      // Image area with gradient
      frame('ProjectImage', {
        size: { x: 680, y: 320 },
        fills: [gradient([
          { hex: gradFrom, position: 0 },
          { hex: gradTo, position: 1 },
        ], 135)],
        autoLayout: vertical({ spacing: 0, padX: 24, padY: 24, align: 'MAX' }),
        children: [
          frame('Overlay', {
            autoLayout: vertical({ spacing: 4 }),
            children: [
              text(title, { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
              text(category, { fontSize: 14, fontWeight: 400, color: '#ffffff', opacity: 0.7 }),
            ],
          }),
        ],
      }),
      // Bottom bar
      frame('ProjectInfo', {
        autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        fills: [solid(offBlack)],
        layoutSizingHorizontal: 'FILL',
        children: [
          text('View Project →', { fontSize: 14, fontWeight: 600, color: nearWhite }),
          text('2026', { fontSize: 13, fontWeight: 400, color: midGray }),
        ],
      }),
    ],
  });
}

// Skill tag
function skillTag(label: string) {
  return frame(`Skill: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8 }),
    strokes: [{ color: { r: 0.33, g: 0.33, b: 0.33, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    cornerRadius: 9999,
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: nearWhite }),
    ],
  });
}

// Section divider
function sectionDivider() {
  return rectangle('Divider', {
    size: { x: 1, y: 1 },
    fills: [solid('#333333')],
    layoutSizingHorizontal: 'FILL',
  });
}

export default frame('Portfolio', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(offBlack)],
  children: [
    // Navigation
    frame('Nav', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('JW', { fontSize: 24, fontWeight: 700, color: nearWhite }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 40 }),
          children: [
            text('Work', { fontSize: 15, fontWeight: 500, color: nearWhite }),
            text('About', { fontSize: 15, fontWeight: 400, color: midGray }),
            text('Contact', { fontSize: 15, fontWeight: 400, color: midGray }),
          ],
        }),
      ],
    }),

    sectionDivider(),

    // Hero section
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Creative Developer', {
          fontSize: 14,
          fontWeight: 600,
          color: midGray,
          letterSpacing: { value: 4, unit: 'PIXELS' as const },
          textAlignHorizontal: 'CENTER' as const,
        }),
        text('I build digital experiences\nthat stand out.', {
          fontSize: 56,
          fontWeight: 700,
          color: nearWhite,
          textAlignHorizontal: 'CENTER' as const,
          lineHeight: { value: 110, unit: 'PERCENT' as const },
          letterSpacing: { value: -2, unit: 'PIXELS' as const },
          size: { x: 800 },
          textAutoResize: 'HEIGHT' as const,
        }),
        text('Product designer and developer specializing in design systems, creative coding, and interactive experiences.', {
          fontSize: 18,
          fontWeight: 400,
          color: midGray,
          textAlignHorizontal: 'CENTER' as const,
          lineHeight: { value: 160, unit: 'PERCENT' as const },
          size: { x: 600 },
          textAutoResize: 'HEIGHT' as const,
        }),
        frame('CTARow', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame('PrimaryCTA', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(nearWhite)],
              cornerRadius: 9999,
              children: [
                text('View Work', { fontSize: 15, fontWeight: 600, color: offBlack }),
              ],
            }),
            frame('SecondaryCTA', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              strokes: [{ color: { r: 0.53, g: 0.53, b: 0.53, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              cornerRadius: 9999,
              children: [
                text('Get in Touch', { fontSize: 15, fontWeight: 600, color: nearWhite }),
              ],
            }),
          ],
        }),
      ],
    }),

    sectionDivider(),

    // Projects grid
    frame('Projects', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Selected Work', {
          fontSize: 32,
          fontWeight: 700,
          color: nearWhite,
          letterSpacing: { value: -1, unit: 'PIXELS' as const },
        }),
        frame('ProjectRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            projectCard('E-Commerce Redesign', 'Product Design · Development', '#6366f1', '#8b5cf6'),
            projectCard('Brand Identity System', 'Branding · Design System', '#ec4899', '#f43f5e'),
          ],
        }),
        frame('ProjectRow2', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            projectCard('Data Visualization', 'Interactive · D3.js', '#06b6d4', '#0891b2'),
            projectCard('Mobile Banking App', 'UI/UX · React Native', '#f59e0b', '#d97706'),
          ],
        }),
      ],
    }),

    sectionDivider(),

    // Skills section
    frame('Skills', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Skills & Technologies', { fontSize: 24, fontWeight: 700, color: nearWhite }),
        frame('SkillTags', {
          autoLayout: horizontal({ spacing: 10 }),
          children: [
            skillTag('React'),
            skillTag('TypeScript'),
            skillTag('Figma'),
            skillTag('Node.js'),
            skillTag('GraphQL'),
            skillTag('Tailwind'),
            skillTag('Three.js'),
            skillTag('Framer Motion'),
          ],
        }),
      ],
    }),

    sectionDivider(),

    // Contact section
    frame('Contact', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text("Let's work together", {
          fontSize: 48,
          fontWeight: 700,
          color: nearWhite,
          textAlignHorizontal: 'CENTER' as const,
          letterSpacing: { value: -1.5, unit: 'PIXELS' as const },
        }),
        text('hello@jameswu.dev', { fontSize: 18, fontWeight: 400, color: midGray }),
        frame('SocialLinks', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('GitHub', { fontSize: 14, fontWeight: 500, color: nearWhite }),
            text('LinkedIn', { fontSize: 14, fontWeight: 500, color: nearWhite }),
            text('Dribbble', { fontSize: 14, fontWeight: 500, color: nearWhite }),
            text('Twitter', { fontSize: 14, fontWeight: 500, color: nearWhite }),
          ],
        }),
      ],
    }),
  ],
});
