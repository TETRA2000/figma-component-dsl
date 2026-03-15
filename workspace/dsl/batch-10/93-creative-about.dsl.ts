/**
 * Creative About Page — Headline, split layout, skills, timeline, awards
 * Batch 10, Page 93: About page for creative portfolio
 * DSL Features: gradients, split layouts, cornerRadius, nested frames
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

export default component('CreativeAbout', {
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
            text('About', { fontSize: 14, fontWeight: 500, color: white }),
            text('Services', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Large Headline
    frame('HeroHeadline', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 100, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('We design\nexperiences that\ninspire.', {
          fontSize: 80,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 88, unit: 'PIXELS' },
          letterSpacing: { value: -3, unit: 'PIXELS' },
        }),
      ],
    }),

    // Split Layout: Photo + Bio
    frame('SplitBio', {
      autoLayout: horizontal({ spacing: 64, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Photo placeholder
        rectangle('Photo', {
          size: { x: 480, y: 560 },
          fills: [
            gradient([
              { hex: purple, position: 0 },
              { hex: pink, position: 0.5 },
              { hex: cyan, position: 1 },
            ], 135),
          ],
          cornerRadius: 24,
        }),
        // Bio text
        frame('Bio', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('About Us', { fontSize: 14, fontWeight: 600, color: purple, letterSpacing: { value: 3, unit: 'PIXELS' } }),
            text('A Creative Studio Based in San Francisco', {
              fontSize: 36,
              fontWeight: 700,
              color: white,
              lineHeight: { value: 44, unit: 'PIXELS' },
            }),
            text('We are a team of designers, developers, and creative thinkers dedicated to building beautiful digital experiences. With over a decade of experience, we have helped startups and established brands alike find their visual voice.', {
              fontSize: 16,
              fontWeight: 400,
              color: muted,
              lineHeight: { value: 28, unit: 'PIXELS' },
              size: { x: 500 },
              textAutoResize: 'HEIGHT',
            }),
            text('Our approach combines strategic thinking with bold creativity. We believe that great design is not just about aesthetics — it is about solving problems and creating meaningful connections between brands and their audiences.', {
              fontSize: 16,
              fontWeight: 400,
              color: muted,
              lineHeight: { value: 28, unit: 'PIXELS' },
              size: { x: 500 },
              textAutoResize: 'HEIGHT',
            }),
          ],
        }),
      ],
    }),

    // Skills List
    frame('Skills', {
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Skills & Expertise', { fontSize: 36, fontWeight: 700, color: white }),
        frame('SkillsGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            skillColumn([
              { name: 'Brand Identity', level: 95 },
              { name: 'UI/UX Design', level: 90 },
              { name: 'Web Design', level: 88 },
            ]),
            skillColumn([
              { name: 'Motion Design', level: 82 },
              { name: 'Illustration', level: 78 },
              { name: 'Typography', level: 92 },
            ]),
          ],
        }),
      ],
    }),

    // Experience Timeline
    frame('Timeline', {
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Experience', { fontSize: 36, fontWeight: 700, color: white }),
        frame('TimelineEntries', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            timelineEntry('2022 — Present', 'Founder & Creative Director', 'Studio', 'Leading a team of 12 designers and developers, delivering world-class creative solutions.'),
            timelineEntry('2018 — 2022', 'Senior Designer', 'DesignCo', 'Led brand strategy and design for Fortune 500 clients across multiple industries.'),
            timelineEntry('2015 — 2018', 'Visual Designer', 'AgencyX', 'Created visual identities and marketing collateral for emerging tech startups.'),
          ],
        }),
      ],
    }),

    // Awards
    frame('Awards', {
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Awards & Recognition', { fontSize: 36, fontWeight: 700, color: white }),
        frame('AwardsList', {
          autoLayout: horizontal({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            awardItem('Awwwards', 'Site of the Day', '2025'),
            awardItem('CSS Design Awards', 'Best UI Design', '2024'),
            awardItem('FWA', 'FWA of the Month', '2024'),
            awardItem('Red Dot', 'Best of the Best', '2023'),
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
        text('hello@studio.design', { fontSize: 14, fontWeight: 500, color: purple }),
      ],
    }),
  ],
});

function skillColumn(skills: { name: string; level: number }[]) {
  return frame('SkillColumn', {
    autoLayout: vertical({ spacing: 20 }),
    layoutSizingHorizontal: 'FILL',
    children: skills.map(s => skillBar(s.name, s.level)),
  });
}

function skillBar(name: string, level: number) {
  return frame(`Skill: ${name}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SkillHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 500, color: white }),
          text(`${level}%`, { fontSize: 14, fontWeight: 500, color: muted }),
        ],
      }),
      frame('Track', {
        size: { x: 100, y: 6 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#2a2a2a')],
        cornerRadius: 3,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('Fill', {
            size: { x: Math.round(560 * level / 100), y: 6 },
            fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 0)],
          }),
        ],
      }),
    ],
  });
}

function timelineEntry(period: string, role: string, company: string, description: string) {
  return frame(`Timeline: ${period}`, {
    autoLayout: horizontal({ spacing: 32, padY: 32 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(period, { fontSize: 14, fontWeight: 500, color: muted, size: { x: 200 }, textAutoResize: 'HEIGHT' }),
      frame('Details', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(role, { fontSize: 20, fontWeight: 600, color: white }),
          text(company, { fontSize: 16, fontWeight: 500, color: purple }),
          text(description, {
            fontSize: 15,
            fontWeight: 400,
            color: muted,
            lineHeight: { value: 24, unit: 'PIXELS' },
            size: { x: 600 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

function awardItem(org: string, award: string, year: string) {
  return frame(`Award: ${org}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 16,
    children: [
      text(year, { fontSize: 14, fontWeight: 500, color: purple }),
      text(award, { fontSize: 18, fontWeight: 600, color: white, textAlignHorizontal: 'CENTER' }),
      text(org, { fontSize: 14, fontWeight: 400, color: muted }),
    ],
  });
}
