/**
 * Job Board — Job listings, filters, company cards
 * DSL features: search header, salary badges, tag pills, company logos, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function jobTag(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
    fills: [solid('#f1f5f9')],
    cornerRadius: 6,
    children: [text(label, { fontSize: 11, fontWeight: 500, color: '#475569' })],
  });
}

function jobCard(title: string, company: string, location: string, salary: string, type: string, tags: string[], logoColor: string) {
  return frame(`Job: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('JobTop', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          rectangle('Logo', { size: { x: 44, y: 44 }, fills: [solid(logoColor)], cornerRadius: 10 }),
          frame('JobMeta', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
            text(title, { fontSize: 16, fontWeight: 600, color: '#111827' }),
            text(`${company} - ${location}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ]}),
          frame('TypeBadge', {
            autoLayout: horizontal({ padX: 10, padY: 4 }),
            fills: [solid(type === 'Full-time' ? '#dcfce7' : '#fef3c7')],
            cornerRadius: 6,
            children: [text(type, { fontSize: 11, fontWeight: 600, color: type === 'Full-time' ? '#16a34a' : '#d97706' })],
          }),
        ],
      }),
      frame('TagRow', { autoLayout: horizontal({ spacing: 6 }), children: tags.map(t => jobTag(t)) }),
      frame('SalaryRow', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(salary, { fontSize: 16, fontWeight: 700, color: '#4f46e5' }),
          text('Apply Now', { fontSize: 13, fontWeight: 600, color: '#4f46e5' }),
        ],
      }),
    ],
  });
}

export default frame('JobBoardPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 36, counterAlign: 'CENTER' }),
      fills: [solid('#4f46e5')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find Your Next Role', { fontSize: 28, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        frame('SearchRow', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 12 }),
          fills: [solid('#ffffff')],
          cornerRadius: 10,
          children: [
            text('Search jobs, companies, skills...', { fontSize: 14, fontWeight: 400, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
    frame('JobList', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ListHeader', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('24 jobs found', { fontSize: 16, fontWeight: 600, color: '#111827' }),
          text('Sort: Newest', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
        ]}),
        jobCard('Senior Frontend Engineer', 'Stripe', 'San Francisco, CA', '$180K - $250K', 'Full-time', ['React', 'TypeScript', 'GraphQL'], '#635bff'),
        jobCard('Product Designer', 'Figma', 'Remote', '$150K - $200K', 'Full-time', ['Figma', 'Design Systems', 'Prototyping'], '#1abcfe'),
        jobCard('Data Scientist', 'Airbnb', 'San Francisco, CA', '$160K - $220K', 'Full-time', ['Python', 'ML', 'SQL'], '#ff5a5f'),
        jobCard('DevOps Engineer', 'Notion', 'New York, NY', '$140K - $190K', 'Contract', ['AWS', 'Kubernetes', 'CI/CD'], '#000000'),
      ],
    }),
  ],
});
