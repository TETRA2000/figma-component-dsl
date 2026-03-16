/**
 * Freelancer Profile — Services, portfolio grid, testimonials section
 * DSL features: gradient hero, service cards, portfolio grid, testimonial cards with avatars
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function serviceCard(title: string, desc: string, price: string, icon: string, color: string) {
  return frame(`Service: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 18, padY: 18 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ServiceIcon', {
        size: { x: 44, y: 44 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(color + '1a')], cornerRadius: 12,
        children: [text(icon, { fontSize: 20, fontWeight: 400, color })],
      }),
      text(title, { fontSize: 15, fontWeight: 700, color: '#111827' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#6b7280', lineHeight: { value: 150, unit: 'PERCENT' } }),
      text(`From ${price}`, { fontSize: 14, fontWeight: 700, color }),
    ],
  });
}

function portfolioItem(title: string, category: string, color: string) {
  return frame(`Work: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img:${title}`, {
        size: { x: 1, y: 140 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'aa', position: 1 }], 135)],
        cornerRadius: 12,
      }),
      frame('WorkInfo', {
        autoLayout: vertical({ spacing: 2, padX: 4, padY: 8 }),
        children: [
          text(title, { fontSize: 13, fontWeight: 600, color: '#111827' }),
          text(category, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

function testimonialCard(name: string, role: string, comment: string, color: string) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 16 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text('★★★★★', { fontSize: 14, fontWeight: 400, color: '#f59e0b' }),
      text(`"${comment}"`, {
        fontSize: 13, fontWeight: 400, color: '#374151',
        size: { x: 260 }, textAutoResize: 'HEIGHT', lineHeight: { value: 155, unit: 'PERCENT' },
      }),
      frame('TestimonialAuthor', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          ellipse(`Av:${name}`, { size: { x: 32, y: 32 }, fills: [solid(color)] }),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 1 }),
            children: [
              text(name, { fontSize: 12, fontWeight: 600, color: '#111827' }),
              text(role, { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('FreelancerPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Hero', {
      autoLayout: horizontal({ spacing: 24, padX: 40, padY: 36, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#3b82f6', position: 1 }], 135)],
      children: [
        ellipse('Avatar', { size: { x: 80, y: 80 }, fills: [solid('#ffffff33')] }),
        frame('HeroInfo', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Alex Rivera', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
            text('Product Designer & Developer', { fontSize: 14, fontWeight: 500, color: '#93c5fd' }),
            text('San Francisco, CA • Available for freelance', { fontSize: 12, fontWeight: 400, color: '#ffffffaa' }),
          ],
        }),
        frame('HireSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        frame('HireBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12 }),
          fills: [solid('#ffffff')], cornerRadius: 10,
          children: [text('Hire Me', { fontSize: 14, fontWeight: 700, color: '#2563eb' })],
        }),
      ],
    }),
    frame('Services', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Services', { fontSize: 20, fontWeight: 800, color: '#111827' }),
        frame('ServiceGrid', {
          autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            serviceCard('UI/UX Design', 'User-centered interfaces for web and mobile apps.', '$3,000', '🎨', '#3b82f6'),
            serviceCard('Web Development', 'Modern React/Next.js sites with pixel-perfect code.', '$4,000', '💻', '#7c3aed'),
            serviceCard('Brand Identity', 'Logos, style guides, and brand systems.', '$2,500', '✨', '#ec4899'),
          ],
        }),
      ],
    }),
    frame('Portfolio', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Recent Work', { fontSize: 20, fontWeight: 800, color: '#111827' }),
        frame('PortfolioGrid', {
          autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            portfolioItem('Fintech Dashboard', 'UI Design', '#3b82f6'),
            portfolioItem('E-Commerce Redesign', 'UX + Dev', '#ec4899'),
            portfolioItem('SaaS Landing Page', 'Design + Code', '#f59e0b'),
            portfolioItem('Health App', 'Mobile UI', '#10b981'),
          ],
        }),
      ],
    }),
    frame('Testimonials', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Testimonials', { fontSize: 20, fontWeight: 800, color: '#111827' }),
        frame('TestGrid', {
          autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL',
          children: [
            testimonialCard('Sarah Kim', 'CEO, TechStart', 'Alex delivered an outstanding product. The attention to detail was impressive.', '#3b82f6'),
            testimonialCard('James Chen', 'PM, CloudNine', 'Working with Alex was seamless. He understood our vision from day one.', '#7c3aed'),
            testimonialCard('Maria Lopez', 'Founder, GreenLeaf', 'Exceptional quality and communication throughout the project.', '#16a34a'),
          ],
        }),
      ],
    }),
  ],
});
