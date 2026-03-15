/**
 * SaaS Help Center — Search, categories, popular articles, contact CTA
 * Batch 1, Page 10: Technology/SaaS
 * DSL Features: search bar, category cards, article list, gradient CTA
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSHelp', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Flowbase', { fontSize: 20, fontWeight: 700, color: '#1a1a2e' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Help', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
            text('Settings', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Hero with search
    frame('HelpHero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#eef2ff', position: 0 },
          { hex: '#ffffff', position: 1 },
        ], 270),
      ],
      children: [
        text('How can we help you?', {
          fontSize: 36,
          fontWeight: 700,
          color: '#1a1a2e',
          textAlignHorizontal: 'CENTER',
        }),
        text('Search our knowledge base or browse categories below', {
          fontSize: 16,
          fontWeight: 400,
          color: '#64748b',
          textAlignHorizontal: 'CENTER',
        }),
        // Search bar
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 20, padY: 14, spacing: 12, counterAlign: 'CENTER' }),
          size: { x: 560, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.82, g: 0.84, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Search for articles, guides, and more...', {
              fontSize: 15,
              fontWeight: 400,
              color: '#94a3b8',
              layoutSizingHorizontal: 'FILL',
            }),
            frame('SearchIcon', {
              size: { x: 36, y: 36 },
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#6366f1')],
              cornerRadius: 8,
              children: [
                text('Go', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Category cards
    frame('Categories', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Browse by Category', { fontSize: 20, fontWeight: 600, color: '#1a1a2e' }),
        frame('CategoryGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            categoryCard('Getting Started', 'Quick setup guides and onboarding tutorials', '12 articles', '#ede9fe', '#7c3aed'),
            categoryCard('API Docs', 'REST API reference, SDKs, and integration guides', '28 articles', '#e0f2fe', '#0284c7'),
            categoryCard('Billing', 'Plans, invoices, payment methods, and upgrades', '8 articles', '#ecfdf5', '#16a34a'),
            categoryCard('Security', 'Authentication, permissions, and compliance', '15 articles', '#fef3c7', '#d97706'),
          ],
        }),
      ],
    }),

    // Popular articles
    frame('PopularArticles', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Articles', { fontSize: 20, fontWeight: 600, color: '#1a1a2e' }),
        frame('ArticleList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          clipContent: true,
          children: [
            articleItem('How to set up SSO for your organization', 'Security', '5 min read'),
            articleDivider(),
            articleItem('Migrating from v1 to v2 API', 'API Docs', '8 min read'),
            articleDivider(),
            articleItem('Understanding your monthly invoice', 'Billing', '3 min read'),
            articleDivider(),
            articleItem('Creating your first project', 'Getting Started', '4 min read'),
            articleDivider(),
            articleItem('Managing team roles and permissions', 'Security', '6 min read'),
          ],
        }),
      ],
    }),

    // Contact CTA
    frame('ContactCTA', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#4f46e5', position: 0 },
          { hex: '#6366f1', position: 1 },
        ], 0),
      ],
      children: [
        text('Still need help?', {
          fontSize: 24,
          fontWeight: 700,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
        text('Our support team is available 24/7 to assist you.', {
          fontSize: 16,
          fontWeight: 400,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
          opacity: 0.85,
        }),
        frame('ContactBtn', {
          autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 10,
          children: [
            text('Contact Support', { fontSize: 16, fontWeight: 600, color: '#4f46e5' }),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('© 2026 Flowbase. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

function categoryCard(
  title: string,
  description: string,
  count: string,
  bgColor: string,
  accentColor: string,
) {
  return frame(`Category: ${title}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('IconBg', {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(bgColor)],
        cornerRadius: 10,
        children: [
          text('?', { fontSize: 20, fontWeight: 600, color: accentColor }),
        ],
      }),
      text(title, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: '#64748b',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
      text(count, { fontSize: 13, fontWeight: 500, color: accentColor }),
    ],
  });
}

function articleItem(title: string, category: string, readTime: string) {
  return frame(`Article: ${title.substring(0, 25)}`, {
    autoLayout: horizontal({ spacing: 12, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, {
        fontSize: 14,
        fontWeight: 500,
        color: '#374151',
        layoutSizingHorizontal: 'FILL',
      }),
      frame('CategoryBadge', {
        autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#f1f5f9')],
        cornerRadius: 4,
        children: [
          text(category, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
        ],
      }),
      text(readTime, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}

function articleDivider() {
  return rectangle('Divider', {
    size: { x: 1, y: 1 },
    fills: [solid('#f1f5f9')],
    layoutSizingHorizontal: 'FILL',
  });
}
