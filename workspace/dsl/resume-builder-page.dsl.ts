/**
 * Resume Builder — Two-column layout, skills section, experience timeline
 *
 * DSL features stressed: two-column layout, strokes, pill tags,
 * SPACE_BETWEEN, nested auto-layout, FILL sizing
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function skillPill(label: string) {
  return frame(`Skill: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6 }),
    fills: [solid('#eff6ff')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.73, g: 0.84, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
    ],
  });
}

function experienceItem(role: string, company: string, period: string, desc: string) {
  return frame(`Exp: ${role}`, {
    autoLayout: horizontal({ spacing: 16 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TimelineDot', {
        autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }),
        children: [
          ellipse(`${role}Dot`, { size: { x: 10, y: 10 }, fills: [solid('#2563eb')] }),
          rectangle(`${role}Line`, { size: { x: 2, y: 60 }, fills: [solid('#dbeafe')] }),
        ],
      }),
      frame(`${role}Details`, {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(role, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
          frame(`${role}CompanyRow`, {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(company, { fontSize: 13, fontWeight: 500, color: '#64748b' }),
              text(period, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          text(desc, { fontSize: 13, fontWeight: 400, color: '#475569', lineHeight: 20 }),
        ],
      }),
    ],
  });
}

function sidebarSection(title: string, children: ReturnType<typeof frame>[]) {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 13, fontWeight: 700, color: '#ffffff80' }),
      rectangle(`${title}Div`, {
        size: { x: 1, y: 1 }, fills: [solid('#ffffff1a')], layoutSizingHorizontal: 'FILL',
      }),
      ...children,
    ],
  });
}

export default frame('ResumeBuilderPage', {
  size: { x: 960 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f1f5f9')],
  children: [
    // Sidebar
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 28, padX: 28, padY: 36 }),
      fills: [solid('#1e293b')],
      size: { x: 280 },
      children: [
        // Profile
        frame('Profile', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ellipse('Avatar', {
              size: { x: 72, y: 72 },
              fills: [gradient([{ hex: '#3b82f6', position: 0 }, { hex: '#8b5cf6', position: 1 }], 135)],
            }),
            text('Jordan Rivera', { fontSize: 20, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
            text('Full-Stack Developer', { fontSize: 13, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
          ],
        }),

        sidebarSection('Contact', [
          frame('ContactInfo', {
            autoLayout: vertical({ spacing: 8 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text('jordan@email.com', { fontSize: 12, fontWeight: 400, color: '#cbd5e1' }),
              text('+1 (555) 123-4567', { fontSize: 12, fontWeight: 400, color: '#cbd5e1' }),
              text('San Francisco, CA', { fontSize: 12, fontWeight: 400, color: '#cbd5e1' }),
              text('github.com/jordanr', { fontSize: 12, fontWeight: 400, color: '#60a5fa' }),
            ],
          }),
        ]),

        sidebarSection('Skills', [
          frame('SkillsWrap', {
            autoLayout: horizontal({ spacing: 8, wrap: true }),
            layoutSizingHorizontal: 'FILL',
            children: [
              ...['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map(s =>
                frame(`SP:${s}`, {
                  autoLayout: horizontal({ padX: 10, padY: 4 }),
                  fills: [solid('#ffffff14')],
                  cornerRadius: 9999,
                  children: [
                    text(s, { fontSize: 11, fontWeight: 500, color: '#93c5fd' }),
                  ],
                })
              ),
            ],
          }),
        ]),

        sidebarSection('Education', [
          frame('EducationList', {
            autoLayout: vertical({ spacing: 12 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              frame('Edu1', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text('B.S. Computer Science', { fontSize: 13, fontWeight: 600, color: '#e2e8f0' }),
                  text('Stanford University', { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
                  text('2016 – 2020', { fontSize: 11, fontWeight: 400, color: '#64748b' }),
                ],
              }),
            ],
          }),
        ]),
      ],
    }),

    // Main content
    frame('MainContent', {
      autoLayout: vertical({ spacing: 28, padX: 36, padY: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Summary
        frame('SummarySection', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Professional Summary', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            rectangle('SummaryDivider', {
              size: { x: 1, y: 2 }, fills: [solid('#2563eb')], layoutSizingHorizontal: 'FILL',
            }),
            text('Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean architecture, developer experience, and delivering impactful products.', {
              fontSize: 14, fontWeight: 400, color: '#475569', lineHeight: 22,
              layoutSizingHorizontal: 'FILL',
            }),
          ],
        }),

        // Experience
        frame('ExperienceSection', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Experience', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            rectangle('ExpDivider', {
              size: { x: 1, y: 2 }, fills: [solid('#2563eb')], layoutSizingHorizontal: 'FILL',
            }),
            experienceItem('Senior Developer', 'TechCorp Inc.', '2022 – Present',
              'Led a team of 6 engineers to rebuild the core platform, reducing load times by 40%.'),
            experienceItem('Full-Stack Developer', 'StartupXYZ', '2020 – 2022',
              'Built microservices architecture serving 500K+ daily active users with 99.9% uptime.'),
            experienceItem('Junior Developer', 'WebAgency Co.', '2018 – 2020',
              'Developed responsive client sites and internal tools using React and Node.js.'),
          ],
        }),

        // Skills highlight
        frame('SkillsHighlight', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Key Skills', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            rectangle('SkillsDivider', {
              size: { x: 1, y: 2 }, fills: [solid('#2563eb')], layoutSizingHorizontal: 'FILL',
            }),
            frame('SkillPills', {
              autoLayout: horizontal({ spacing: 8, wrap: true }),
              layoutSizingHorizontal: 'FILL',
              children: [
                skillPill('System Design'),
                skillPill('CI/CD Pipelines'),
                skillPill('API Design'),
                skillPill('Team Leadership'),
                skillPill('Agile / Scrum'),
                skillPill('Performance Optimization'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
