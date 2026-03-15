/**
 * Creative Testimonials — Large quotes, client info, star ratings
 * Batch 10, Page 95: Testimonials page for creative portfolio
 * DSL Features: gradients, cornerRadius, star ratings, typography
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

export default component('CreativeTestimonials', {
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
            text('Testimonials', { fontSize: 14, fontWeight: 500, color: white }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('CLIENT TESTIMONIALS', { fontSize: 14, fontWeight: 600, color: purple, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        text('What Our Clients Say', {
          fontSize: 56,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          letterSpacing: { value: -2, unit: 'PIXELS' },
        }),
        text('Trusted by creative teams and brands worldwide', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
        }),
      ],
    }),

    // Featured Testimonial
    frame('FeaturedTestimonial', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a2e', position: 0 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        text('\u201C', { fontSize: 160, fontWeight: 700, color: purple, lineHeight: { value: 100, unit: 'PIXELS' } }),
        text('Studio transformed our entire brand presence. Their creative vision and meticulous attention to detail produced results that far exceeded our expectations. Truly world-class design partners.', {
          fontSize: 28,
          fontWeight: 400,
          color: '#e4e4e7',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 44, unit: 'PIXELS' },
          size: { x: 900 },
          textAutoResize: 'HEIGHT',
        }),
        starRating(5),
        frame('FeaturedClient', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            rectangle('ClientPhoto', {
              size: { x: 56, y: 56 },
              fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
              cornerRadius: 28,
            }),
            frame('ClientDetails', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Alex Johnson', { fontSize: 18, fontWeight: 600, color: white }),
                text('CEO, TechFlow', { fontSize: 15, fontWeight: 400, color: muted }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Testimonials Grid
    frame('TestimonialsGrid', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Row 1
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            testimonialCard(
              'The creative team at Studio brings a unique perspective to every project. Their work on our product redesign increased our conversion rate by 150%.',
              'Maria Garcia', 'Head of Product, Nexus', 5, pink,
            ),
            testimonialCard(
              'Professional, innovative, and incredibly talented. Studio delivered a brand identity that perfectly captures our company values and vision.',
              'David Chen', 'Founder, Horizon Labs', 5, cyan,
            ),
            testimonialCard(
              'Working with Studio was seamless from start to finish. They understood our needs immediately and delivered beyond what we imagined possible.',
              'Emma Thompson', 'Marketing Director, Pulse', 4, purple,
            ),
          ],
        }),
        // Row 2
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            testimonialCard(
              'Studio creative output is consistently exceptional. They have been our go-to design partner for three years and counting.',
              'James Wilson', 'CTO, DataStream', 5, '#f97316',
            ),
            testimonialCard(
              'The attention to detail and creative problem-solving that Studio brings to the table is unmatched. Highly recommended for any creative project.',
              'Sophie Martin', 'Brand Manager, Elevate', 5, purple,
            ),
            testimonialCard(
              'From concept to execution, Studio demonstrates mastery of their craft. Our website redesign drove a 200% increase in engagement.',
              'Ryan Park', 'VP Design, CloudNine', 4, pink,
            ),
          ],
        }),
      ],
    }),

    // Stats Bar
    frame('StatsBar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 64, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        statItem('150+', 'Happy Clients'),
        statItem('4.9/5', 'Average Rating'),
        statItem('98%', 'Client Retention'),
        statItem('200+', 'Projects Delivered'),
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

function starRating(count: number) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    text(i < count ? '\u2605' : '\u2606', {
      fontSize: 20,
      fontWeight: 400,
      color: i < count ? '#fbbf24' : '#3f3f46',
    }),
  );
  return frame('StarRating', {
    autoLayout: horizontal({ spacing: 4 }),
    children: stars,
  });
}

function testimonialCard(
  quote: string, name: string, role: string, rating: number, accentColor: string,
) {
  return frame(`Testimonial: ${name}`, {
    autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 16,
    children: [
      rectangle('Accent', {
        size: { x: 32, y: 3 },
        fills: [solid(accentColor)],
        cornerRadius: 2,
      }),
      text('\u201C', { fontSize: 48, fontWeight: 700, color: accentColor, lineHeight: { value: 32, unit: 'PIXELS' } }),
      text(quote, {
        fontSize: 15,
        fontWeight: 400,
        color: '#d4d4d8',
        lineHeight: { value: 24, unit: 'PIXELS' },
        size: { x: 340 },
        textAutoResize: 'HEIGHT',
      }),
      starRating(rating),
      frame('ClientInfo', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          rectangle('Photo', {
            size: { x: 40, y: 40 },
            fills: [gradient([{ hex: accentColor, position: 0 }, { hex: purple, position: 1 }], 135)],
            cornerRadius: 20,
          }),
          frame('Details', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: white }),
              text(role, { fontSize: 13, fontWeight: 400, color: muted }),
            ],
          }),
        ],
      }),
    ],
  });
}

function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 40, fontWeight: 800, color: purple, textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 14, fontWeight: 400, color: muted, textAlignHorizontal: 'CENTER' }),
    ],
  });
}
