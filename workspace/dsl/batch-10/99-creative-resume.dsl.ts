/**
 * Creative Digital Resume — Header, summary, experience, education, skills, languages, certifications
 * Batch 10, Page 99: Clean minimal digital resume
 * DSL Features: gradients, cornerRadius, progress bars, clean typography
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const purple = '#7c3aed';
const pink = '#ec4899';
const white = '#ffffff';
const light = '#f4f4f5';
const dark = '#18181b';
const body = '#3f3f46';
const muted = '#71717a';
const border = '#e4e4e7';

export default component('CreativeResume', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(light)],
  children: [
    // Header with gradient
    frame('Header', {
      autoLayout: horizontal({ spacing: 32, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: purple, position: 0 },
          { hex: pink, position: 1 },
        ], 135),
      ],
      children: [
        // Avatar
        rectangle('Avatar', {
          size: { x: 100, y: 100 },
          fills: [solid(white, 0.2)],
          cornerRadius: 50,
        }),
        // Name and title
        frame('NameBlock', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Alexandra Rivera', {
              fontSize: 40,
              fontWeight: 700,
              color: white,
              letterSpacing: { value: -1, unit: 'PIXELS' },
            }),
            text('Senior Creative Designer', {
              fontSize: 20,
              fontWeight: 400,
              color: '#ffffffcc',
            }),
          ],
        }),
        // Contact info
        frame('ContactInfo', {
          autoLayout: vertical({ spacing: 6 }),
          children: [
            text('alex@designstudio.com', { fontSize: 14, fontWeight: 400, color: '#ffffffcc' }),
            text('+1 (415) 555-0123', { fontSize: 14, fontWeight: 400, color: '#ffffffcc' }),
            text('San Francisco, CA', { fontSize: 14, fontWeight: 400, color: '#ffffffcc' }),
            text('portfolio.design/alex', { fontSize: 14, fontWeight: 400, color: white }),
          ],
        }),
      ],
    }),

    // Summary
    frame('Summary', {
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        text('Professional Summary', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
        text('Award-winning creative designer with 10+ years of experience crafting compelling brand identities, digital products, and marketing campaigns. Specialized in bridging the gap between strategic thinking and visual excellence. Passionate about creating design systems that scale and experiences that resonate.', {
          fontSize: 15,
          fontWeight: 400,
          color: body,
          lineHeight: { value: 26, unit: 'PIXELS' },
          size: { x: 1280 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // Main content: two columns
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left column: Experience + Education
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 40 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Experience
            frame('Experience', {
              autoLayout: vertical({ spacing: 24, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              children: [
                text('EXPERIENCE', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                experienceEntry(
                  'Senior Creative Designer',
                  'DesignFlow Studio',
                  '2021 — Present',
                  'Lead creative direction for enterprise clients. Managed a team of 6 designers. Delivered 40+ brand identity projects with a 98% client satisfaction rate.',
                ),
                rectangle('Divider1', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
                experienceEntry(
                  'UI/UX Designer',
                  'TechVentures Inc.',
                  '2018 — 2021',
                  'Designed product interfaces for SaaS platforms. Implemented design systems used across 5 product lines. Increased user engagement by 45%.',
                ),
                rectangle('Divider2', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
                experienceEntry(
                  'Junior Designer',
                  'Creative Agency Co.',
                  '2015 — 2018',
                  'Created visual assets for marketing campaigns. Collaborated with cross-functional teams on brand strategy and visual identity projects.',
                ),
              ],
            }),

            // Education
            frame('Education', {
              autoLayout: vertical({ spacing: 20, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              children: [
                text('EDUCATION', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                educationEntry('Master of Fine Arts', 'Rhode Island School of Design', '2013 — 2015'),
                rectangle('EduDivider', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
                educationEntry('Bachelor of Design', 'California College of the Arts', '2009 — 2013'),
              ],
            }),
          ],
        }),

        // Right column: Skills, Languages, Certifications
        frame('RightCol', {
          autoLayout: vertical({ spacing: 32 }),
          size: { x: 380, y: undefined },
          children: [
            // Skills
            frame('Skills', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
              size: { x: 380, y: undefined },
              fills: [solid(white)],
              cornerRadius: 16,
              children: [
                text('SKILLS', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                skillBar('Brand Identity', 95),
                skillBar('UI/UX Design', 92),
                skillBar('Typography', 88),
                skillBar('Figma', 96),
                skillBar('Adobe Creative Suite', 90),
                skillBar('Motion Design', 78),
                skillBar('Design Systems', 85),
              ],
            }),

            // Languages
            frame('Languages', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 28 }),
              size: { x: 380, y: undefined },
              fills: [solid(white)],
              cornerRadius: 16,
              children: [
                text('LANGUAGES', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                languageItem('English', 'Native'),
                languageItem('Spanish', 'Fluent'),
                languageItem('French', 'Conversational'),
              ],
            }),

            // Certifications
            frame('Certifications', {
              autoLayout: vertical({ spacing: 12, padX: 28, padY: 28 }),
              size: { x: 380, y: undefined },
              fills: [solid(white)],
              cornerRadius: 16,
              children: [
                text('CERTIFICATIONS', { fontSize: 12, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                certItem('Google UX Design Certificate', '2024'),
                certItem('Interaction Design Foundation', '2023'),
                certItem('Adobe Certified Expert', '2022'),
                certItem('Figma Professional Certification', '2024'),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        text('References available upon request', { fontSize: 13, fontWeight: 400, color: muted }),
        text('Last updated: March 2026', { fontSize: 13, fontWeight: 400, color: muted }),
      ],
    }),
  ],
});

function experienceEntry(role: string, company: string, period: string, description: string) {
  return frame(`Exp: ${role.substring(0, 25)}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ExpHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(role, { fontSize: 17, fontWeight: 600, color: dark }),
          text(period, { fontSize: 13, fontWeight: 500, color: muted }),
        ],
      }),
      text(company, { fontSize: 15, fontWeight: 500, color: purple }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: body,
        lineHeight: { value: 22, unit: 'PIXELS' },
        size: { x: 600 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function educationEntry(degree: string, school: string, period: string) {
  return frame(`Edu: ${degree}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('EduHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(degree, { fontSize: 16, fontWeight: 600, color: dark }),
          text(period, { fontSize: 13, fontWeight: 500, color: muted }),
        ],
      }),
      text(school, { fontSize: 14, fontWeight: 400, color: body }),
    ],
  });
}

function skillBar(name: string, level: number) {
  return frame(`Skill: ${name}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SkillLabel', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 13, fontWeight: 500, color: dark }),
          text(`${level}%`, { fontSize: 12, fontWeight: 500, color: muted }),
        ],
      }),
      frame('Track', {
        size: { x: 324, y: 6 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#e4e4e7')],
        cornerRadius: 3,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('Fill', {
            size: { x: Math.round(324 * level / 100), y: 6 },
            fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 0)],
          }),
        ],
      }),
    ],
  });
}

function languageItem(lang: string, level: string) {
  return frame(`Lang: ${lang}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(lang, { fontSize: 14, fontWeight: 500, color: dark }),
      frame('LevelBadge', {
        autoLayout: horizontal({ padX: 10, padY: 3, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(purple, 0.1)],
        cornerRadius: 999,
        children: [
          text(level, { fontSize: 12, fontWeight: 500, color: purple }),
        ],
      }),
    ],
  });
}

function certItem(name: string, year: string) {
  return frame(`Cert: ${name.substring(0, 25)}`, {
    autoLayout: horizontal({ spacing: 0, padY: 6, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 14, fontWeight: 400, color: body }),
      text(year, { fontSize: 13, fontWeight: 500, color: muted }),
    ],
  });
}
