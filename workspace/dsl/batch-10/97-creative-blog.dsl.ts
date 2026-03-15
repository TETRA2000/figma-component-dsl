/**
 * Creative Blog — Featured post hero, post grid, categories sidebar, newsletter
 * Batch 10, Page 97: Blog page for creative portfolio
 * DSL Features: gradients, cornerRadius, text styles, clipContent, nested layouts
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

export default component('CreativeBlog', {
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
            text('Blog', { fontSize: 14, fontWeight: 500, color: white }),
            text('About', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: muted }),
          ],
        }),
      ],
    }),

    // Featured Post Hero
    frame('FeaturedPost', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a2e', position: 0 },
          { hex: '#0f0f0f', position: 1 },
        ], 270),
      ],
      children: [
        // Featured image
        rectangle('FeaturedImage', {
          size: { x: 580, y: 380 },
          fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 0.7 }, { hex: cyan, position: 1 }], 135)],
          cornerRadius: 20,
        }),
        // Featured content
        frame('FeaturedContent', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('FeaturedBadge', {
              autoLayout: horizontal({ padX: 12, padY: 4 }),
              fills: [solid(purple, 0.2)],
              cornerRadius: 999,
              children: [
                text('Featured', { fontSize: 12, fontWeight: 600, color: purple }),
              ],
            }),
            text('The Future of Design Systems: Bridging Code and Creativity', {
              fontSize: 32,
              fontWeight: 700,
              color: white,
              lineHeight: { value: 40, unit: 'PIXELS' },
            }),
            text('Exploring how modern design systems are evolving to create seamless workflows between designers and developers, and what it means for the future of digital product creation.', {
              fontSize: 16,
              fontWeight: 400,
              color: muted,
              lineHeight: { value: 26, unit: 'PIXELS' },
              size: { x: 500 },
              textAutoResize: 'HEIGHT',
            }),
            frame('FeaturedMeta', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                text('Mar 10, 2026', { fontSize: 13, fontWeight: 400, color: '#71717a' }),
                text('\u2022', { fontSize: 13, fontWeight: 400, color: '#3f3f46' }),
                text('8 min read', { fontSize: 13, fontWeight: 400, color: '#71717a' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Main content: Blog grid + Sidebar
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Blog Posts Grid
        frame('PostsGrid', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('PostRow1', {
              autoLayout: horizontal({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                blogPost('Building a Brand from Scratch', 'A comprehensive guide to creating a memorable brand identity that resonates with your target audience.', 'Branding', 'Mar 5, 2026', '6 min', purple),
                blogPost('Color Theory in UI Design', 'How to use color psychology and theory to create more effective and emotionally engaging user interfaces.', 'Design', 'Feb 28, 2026', '5 min', pink),
              ],
            }),
            frame('PostRow2', {
              autoLayout: horizontal({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                blogPost('Typography Best Practices', 'Essential typography rules every designer should know for creating readable and beautiful layouts.', 'Typography', 'Feb 20, 2026', '7 min', cyan),
                blogPost('Motion Design Principles', 'Understanding the fundamentals of motion design and how to apply them to create engaging animations.', 'Motion', 'Feb 15, 2026', '4 min', '#f97316'),
              ],
            }),
            frame('PostRow3', {
              autoLayout: horizontal({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                blogPost('Responsive Design in 2026', 'Modern approaches to responsive design that go beyond breakpoints and media queries.', 'Web', 'Feb 10, 2026', '9 min', '#22c55e'),
                blogPost('Client Communication Tips', 'How to effectively communicate design decisions and manage client expectations throughout a project.', 'Process', 'Feb 5, 2026', '5 min', '#3b82f6'),
              ],
            }),
          ],
        }),

        // Sidebar
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 32 }),
          size: { x: 320, y: undefined },
          children: [
            // Categories
            frame('Categories', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              size: { x: 320, y: undefined },
              fills: [solid(card)],
              cornerRadius: 16,
              children: [
                text('Categories', { fontSize: 18, fontWeight: 600, color: white }),
                rectangle('CatDivider', { size: { x: 1, y: 1 }, fills: [solid('#2a2a2a')], layoutSizingHorizontal: 'FILL' }),
                categoryItem('Branding', '12'),
                categoryItem('Design', '18'),
                categoryItem('Typography', '8'),
                categoryItem('Motion', '6'),
                categoryItem('Web', '15'),
                categoryItem('Process', '9'),
              ],
            }),

            // Newsletter Signup
            frame('Newsletter', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
              size: { x: 320, y: undefined },
              fills: [
                gradient([
                  { hex: '#1a0a2e', position: 0 },
                  { hex: card, position: 1 },
                ], 270),
              ],
              cornerRadius: 16,
              children: [
                text('Newsletter', { fontSize: 18, fontWeight: 600, color: white }),
                text('Get the latest articles and resources delivered to your inbox.', {
                  fontSize: 14,
                  fontWeight: 400,
                  color: muted,
                  lineHeight: { value: 22, unit: 'PIXELS' },
                  size: { x: 272 },
                  textAutoResize: 'HEIGHT',
                }),
                frame('EmailInput', {
                  autoLayout: horizontal({ padX: 14, padY: 12, counterAlign: 'CENTER' }),
                  size: { x: 272, y: undefined },
                  fills: [solid('#111111')],
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('your@email.com', { fontSize: 14, fontWeight: 400, color: '#52525b' }),
                  ],
                }),
                frame('SubscribeBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  size: { x: 272, y: undefined },
                  fills: [solid(purple)],
                  cornerRadius: 10,
                  children: [
                    text('Subscribe', { fontSize: 14, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
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
      ],
    }),
  ],
});

function blogPost(title: string, excerpt: string, category: string, date: string, readTime: string, color: string) {
  return frame(`Post: ${title.substring(0, 25)}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 16,
    clipContent: true,
    fills: [solid(card)],
    children: [
      // Thumbnail
      rectangle('PostImage', {
        size: { x: 100, y: 180 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f0f0f', position: 1 }], 270)],
        layoutSizingHorizontal: 'FILL',
      }),
      // Content
      frame('PostContent', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('PostCategory', {
            autoLayout: horizontal({ padX: 10, padY: 3 }),
            fills: [solid(color, 0.15)],
            cornerRadius: 999,
            children: [
              text(category, { fontSize: 11, fontWeight: 600, color }),
            ],
          }),
          text(title, { fontSize: 17, fontWeight: 600, color: white, lineHeight: { value: 24, unit: 'PIXELS' } }),
          text(excerpt, {
            fontSize: 13,
            fontWeight: 400,
            color: muted,
            lineHeight: { value: 20, unit: 'PIXELS' },
            size: { x: 320 },
            textAutoResize: 'HEIGHT',
          }),
          frame('PostMeta', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              text(date, { fontSize: 12, fontWeight: 400, color: '#71717a' }),
              text('\u2022', { fontSize: 12, fontWeight: 400, color: '#3f3f46' }),
              text(readTime, { fontSize: 12, fontWeight: 400, color: '#71717a' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function categoryItem(name: string, count: string) {
  return frame(`Cat: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 14, fontWeight: 500, color: '#d4d4d8' }),
      frame('Count', {
        autoLayout: horizontal({ padX: 10, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#2a2a2a')],
        cornerRadius: 999,
        children: [
          text(count, { fontSize: 12, fontWeight: 500, color: muted }),
        ],
      }),
    ],
  });
}
