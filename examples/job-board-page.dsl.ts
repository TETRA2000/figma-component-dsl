import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const purple = '#7c3aed'; const purpleBg = '#f5f3ff'; const white = '#ffffff'; const bg = '#faf5ff';
const dark = '#1e1b4b'; const med = '#6b7280'; const green = '#059669'; const blue = '#2563eb'; const border = '#e5e7eb';

function jobCard(title: string, company: string, location: string, salary: string, tags: string[], isRemote: boolean, isFeatured: boolean) {
  return frame(`Job: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }), fills: [solid(white)],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    strokes: isFeatured ? [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 0.4 }, weight: 2, align: 'INSIDE' as const }]
      : [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('JobHeader', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        frame('CompanyInfo', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
          rectangle('CompanyLogo', { size: { x: 40, y: 40 }, fills: [solid(purple, 0.1)], cornerRadius: 8 }),
          frame('CompanyDetails', { autoLayout: vertical({ spacing: 1 }), children: [
            text(company, { fontSize: 13, fontWeight: 500, color: med }),
            text(title, { fontSize: 16, fontWeight: 600, color: dark }),
          ]}),
        ]}),
        ...(isFeatured ? [frame('FeaturedBadge', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(purple)], cornerRadius: 6,
          children: [text('Featured', { fontSize: 11, fontWeight: 600, color: white })] })] : []),
      ]}),
      frame('JobMeta', { autoLayout: horizontal({ spacing: 16 }), children: [
        text(location, { fontSize: 13, fontWeight: 400, color: med }),
        text(salary, { fontSize: 13, fontWeight: 600, color: green }),
        ...(isRemote ? [frame('RemoteBadge', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid(green, 0.1)], cornerRadius: 4,
          children: [text('Remote', { fontSize: 11, fontWeight: 500, color: green })] })] : []),
      ]}),
      frame('JobTags', { autoLayout: horizontal({ spacing: 6 }), children: tags.map(t =>
        frame(`Tag: ${t}`, { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(purpleBg)], cornerRadius: 6,
          children: [text(t, { fontSize: 12, fontWeight: 400, color: purple })] })
      )}),
      frame('JobFooter', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
        text('Posted 2 days ago', { fontSize: 12, fontWeight: 400, color: med }),
        frame('ApplyBtn', { autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(purple)], cornerRadius: 8,
          children: [text('Apply Now', { fontSize: 13, fontWeight: 600, color: white })] }),
      ]}),
    ],
  });
}

export default frame('JobBoard', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('HireMe', { fontSize: 22, fontWeight: 700, color: purple }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Find Jobs', { fontSize: 14, fontWeight: 600, color: purple }),
          text('Companies', { fontSize: 14, fontWeight: 400, color: med }),
          text('Salary Guide', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('PostBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(purple)], cornerRadius: 8,
          children: [text('Post a Job', { fontSize: 14, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#4c1d95', position: 0 }, { hex: '#6d28d9', position: 0.5 }, { hex: '#7c3aed', position: 1 }], 135)],
      children: [
        text('Find Your Next Opportunity', { fontSize: 36, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' as const }),
        text('Browse 10,000+ jobs from top companies worldwide', { fontSize: 16, fontWeight: 400, color: '#c4b5fd' }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 12, spacing: 12, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
          fills: [solid(white)], cornerRadius: 12, size: { x: 700, y: undefined },
          children: [
            text('Job title, keyword, or company', { fontSize: 14, fontWeight: 400, color: med }),
            frame('SearchBtn', { autoLayout: horizontal({ padX: 20, padY: 8 }), fills: [solid(purple)], cornerRadius: 8,
              children: [text('Search', { fontSize: 14, fontWeight: 600, color: white })] }),
          ],
        }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('JobList', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          frame('ResultHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            text('124 jobs found', { fontSize: 16, fontWeight: 600, color: dark }),
            text('Sort by: Relevance', { fontSize: 13, fontWeight: 400, color: med }),
          ]}),
          jobCard('Senior Frontend Developer', 'Vercel', 'San Francisco, CA', '$180K-$220K', ['React', 'TypeScript', 'Next.js'], true, true),
          jobCard('Product Designer', 'Figma', 'New York, NY', '$150K-$190K', ['Figma', 'Design Systems', 'Prototyping'], true, false),
          jobCard('Backend Engineer', 'Stripe', 'Remote US', '$170K-$210K', ['Go', 'Python', 'PostgreSQL'], true, false),
          jobCard('DevOps Engineer', 'GitHub', 'Seattle, WA', '$160K-$200K', ['Kubernetes', 'AWS', 'Terraform'], false, false),
        ]}),
        frame('Sidebar', { autoLayout: vertical({ spacing: 16 }), size: { x: 300, y: undefined }, children: [
          frame('FilterSection', {
            autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }), fills: [solid(white)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
            children: [
              text('Filters', { fontSize: 16, fontWeight: 600, color: dark }),
              text('Job Type', { fontSize: 13, fontWeight: 500, color: dark }),
              frame('TypeFilters', { autoLayout: vertical({ spacing: 6 }), children: [
                text('Full-time (89)', { fontSize: 13, fontWeight: 400, color: med }),
                text('Part-time (12)', { fontSize: 13, fontWeight: 400, color: med }),
                text('Contract (23)', { fontSize: 13, fontWeight: 400, color: med }),
              ]}),
              text('Experience', { fontSize: 13, fontWeight: 500, color: dark }),
              frame('ExpFilters', { autoLayout: vertical({ spacing: 6 }), children: [
                text('Junior (34)', { fontSize: 13, fontWeight: 400, color: med }),
                text('Mid-level (52)', { fontSize: 13, fontWeight: 400, color: med }),
                text('Senior (38)', { fontSize: 13, fontWeight: 400, color: med }),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
