/**
 * Resume Builder — Resume with header, experience, skills bars, education sections
 * DSL features: clean typography, progress bars for skills, timeline layout, section dividers
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function skillBar(name: string, level: number, color: string) {
  return frame(`Skill: ${name}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SkillLabel', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 12, fontWeight: 500, color: '#374151' }),
          text(`${level}%`, { fontSize: 11, fontWeight: 600, color: '#6b7280' }),
        ],
      }),
      frame('Bar', {
        size: { x: 1, y: 6 }, fills: [solid('#e5e7eb')], cornerRadius: 3,
        layoutSizingHorizontal: 'FILL', clipContent: true,
        children: [rectangle('Fill', { size: { x: level * 3.2, y: 6 }, fills: [solid(color)], cornerRadius: 3 })],
      }),
    ],
  });
}

function experienceItem(title: string, company: string, period: string, desc: string) {
  return frame(`Exp: ${title}`, {
    autoLayout: vertical({ spacing: 4, padY: 10 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(title, { fontSize: 14, fontWeight: 700, color: '#111827' }),
      frame('CompanyRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(company, { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
          text(period, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
      text(desc, {
        fontSize: 12, fontWeight: 400, color: '#6b7280',
        size: { x: 450 }, textAutoResize: 'HEIGHT', lineHeight: { value: 155, unit: 'PERCENT' },
      }),
    ],
  });
}

function educationItem(degree: string, school: string, year: string) {
  return frame(`Edu: ${degree}`, {
    autoLayout: vertical({ spacing: 2, padY: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(degree, { fontSize: 13, fontWeight: 600, color: '#111827' }),
      frame('SchoolRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
        children: [
          text(school, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
          text(year, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('ResumeBuilderPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    frame('ResumeHeader', {
      autoLayout: horizontal({ spacing: 20, padX: 40, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#2563eb', position: 1 }], 135)],
      children: [
        ellipse('Avatar', { size: { x: 72, y: 72 }, fills: [solid('#ffffff33')] }),
        frame('HeaderInfo', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Sarah Chen', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
            text('Senior Product Designer', { fontSize: 14, fontWeight: 500, color: '#93c5fd' }),
            text('san.francisco@email.com • (415) 555-0142 • sarahchen.design', { fontSize: 11, fontWeight: 400, color: '#ffffffaa' }),
          ],
        }),
      ],
    }),
    frame('Body', {
      autoLayout: horizontal({ spacing: 28, padX: 40, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('MainCol', {
          autoLayout: vertical({ spacing: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            frame('Summary', {
              autoLayout: vertical({ spacing: 6 }), layoutSizingHorizontal: 'FILL',
              children: [
                text('SUMMARY', { fontSize: 11, fontWeight: 800, color: '#2563eb', letterSpacing: { value: 10, unit: 'PERCENT' } }),
                text('Product designer with 8+ years of experience creating user-centered digital products. Led design for apps serving 2M+ users. Passionate about design systems and accessibility.', {
                  fontSize: 12, fontWeight: 400, color: '#374151',
                  size: { x: 440 }, textAutoResize: 'HEIGHT', lineHeight: { value: 160, unit: 'PERCENT' },
                }),
              ],
            }),
            frame('Experience', {
              autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL',
              children: [
                text('EXPERIENCE', { fontSize: 11, fontWeight: 800, color: '#2563eb', letterSpacing: { value: 10, unit: 'PERCENT' } }),
                experienceItem('Senior Product Designer', 'Stripe', '2022 – Present', 'Lead designer for the Payments Dashboard. Built a component library used by 40+ engineers. Improved task completion rate by 34%.'),
                experienceItem('Product Designer', 'Figma', '2019 – 2022', 'Designed collaborative editing features and the plugin marketplace. Contributed to the design system and ran 20+ user research sessions.'),
                experienceItem('UI/UX Designer', 'Airbnb', '2017 – 2019', 'Redesigned the host onboarding flow, increasing completion by 28%. Created mobile-first responsive patterns for the booking experience.'),
              ],
            }),
          ],
        }),
        frame('SideCol', {
          size: { x: 220 },
          autoLayout: vertical({ spacing: 18 }),
          children: [
            frame('Skills', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('SKILLS', { fontSize: 11, fontWeight: 800, color: '#2563eb', letterSpacing: { value: 10, unit: 'PERCENT' } }),
                skillBar('Figma', 95, '#2563eb'),
                skillBar('Prototyping', 88, '#7c3aed'),
                skillBar('Design Systems', 92, '#16a34a'),
                skillBar('User Research', 80, '#f59e0b'),
                skillBar('HTML/CSS', 75, '#ec4899'),
              ],
            }),
            frame('Education', {
              autoLayout: vertical({ spacing: 4 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('EDUCATION', { fontSize: 11, fontWeight: 800, color: '#2563eb', letterSpacing: { value: 10, unit: 'PERCENT' } }),
                educationItem('MFA, Interaction Design', 'School of Visual Arts', '2017'),
                educationItem('BFA, Graphic Design', 'RISD', '2015'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
