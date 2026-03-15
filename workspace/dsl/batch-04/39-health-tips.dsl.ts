/**
 * Health Tips Blog — Category tabs, article cards with thumbnails,
 * featured tip hero section
 * Batch 4, Page 9: Healthcare/Wellness
 * DSL Features: ellipse, strokes, SPACE_BETWEEN, text wrapping
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#f8fafc';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const border = '#e2e8f0';
const green = '#16a34a';
const greenLight = '#dcfce7';

export default component('HealthTips', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('Health Tips & Articles', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 14, padY: 8, spacing: 8, counterAlign: 'CENTER' }),
          size: { x: 260, y: undefined },
          fills: [solid('#f1f5f9')],
          cornerRadius: 8,
          children: [
            text('🔍', { fontSize: 14, fontWeight: 400, color: gray }),
            text('Search articles...', { fontSize: 13, fontWeight: 400, color: gray }),
          ],
        }),
      ],
    }),

    /* ---- Featured Hero ---- */
    frame('FeaturedHero', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FeaturedCard', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          cornerRadius: 16,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          clipContent: true,
          children: [
            /* Image placeholder */
            frame('FeaturedImage', {
              size: { x: 480, y: 300 },
              fills: [
                gradient([
                  { hex: '#0284c7', position: 0 },
                  { hex: '#0ea5e9', position: 1 },
                ], 135),
              ],
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24, align: 'MAX' }),
              children: [
                frame('FeaturedBadge', {
                  autoLayout: horizontal({ padX: 10, padY: 4 }),
                  fills: [solid('#ffffff33')],
                  cornerRadius: 12,
                  children: [
                    text('Featured', { fontSize: 11, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
            /* Content */
            frame('FeaturedContent', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('FeaturedMeta', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    categoryBadge('Heart Health'),
                    text('·', { fontSize: 13, fontWeight: 400, color: gray }),
                    text('5 min read', { fontSize: 13, fontWeight: 400, color: gray }),
                  ],
                }),
                text('10 Simple Steps to a Heart-Healthy Lifestyle', {
                  fontSize: 24, fontWeight: 700, color: dark,
                  lineHeight: { value: 32, unit: 'PIXELS' },
                  size: { x: 400 },
                  textAutoResize: 'HEIGHT',
                }),
                text('Discover evidence-based strategies to protect your cardiovascular health, from dietary changes to exercise routines recommended by cardiologists.', {
                  fontSize: 15, fontWeight: 400, color: gray,
                  lineHeight: { value: 24, unit: 'PIXELS' },
                  size: { x: 400 },
                  textAutoResize: 'HEIGHT',
                }),
                frame('AuthorRow', {
                  autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
                  children: [
                    ellipse('AuthorAvatar', { size: { x: 32, y: 32 }, fills: [solid(lightBlue)] }),
                    frame('AuthorInfo', {
                      autoLayout: vertical({ spacing: 1 }),
                      children: [
                        text('Dr. Sarah Mitchell', { fontSize: 13, fontWeight: 600, color: dark }),
                        text('Mar 12, 2026', { fontSize: 12, fontWeight: 400, color: gray }),
                      ],
                    }),
                  ],
                }),
                frame('ReadMoreBtn', {
                  autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(blue)],
                  cornerRadius: 8,
                  children: [
                    text('Read Article', { fontSize: 14, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Category Tabs ---- */
    frame('CategoryTabs', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        categoryTab('All Topics', true),
        categoryTab('Nutrition', false),
        categoryTab('Exercise', false),
        categoryTab('Mental Health', false),
        categoryTab('Sleep', false),
        categoryTab('Prevention', false),
      ],
    }),

    /* ---- Articles Grid ---- */
    frame('ArticlesGrid', {
      autoLayout: vertical({ spacing: 20, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            articleCard('The Mediterranean Diet:\nA Complete Guide', 'Nutrition', '8 min', '#f97316', '#fff7ed'),
            articleCard('How Regular Walking\nTransforms Your Health', 'Exercise', '4 min', '#8b5cf6', '#f5f3ff'),
            articleCard('Managing Stress in\nthe Modern Workplace', 'Mental Health', '6 min', '#ec4899', '#fdf2f8'),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            articleCard('Sleep Hygiene: Building\nBetter Night Routines', 'Sleep', '5 min', '#6366f1', '#eef2ff'),
            articleCard('Understanding Your Blood\nPressure Numbers', 'Prevention', '3 min', green, greenLight),
            articleCard('Hydration Myths and\nFacts You Should Know', 'Nutrition', '4 min', '#0ea5e9', lightBlue),
          ],
        }),
      ],
    }),

    frame('BottomSpacer', { size: { x: 1, y: 32 }, layoutSizingHorizontal: 'FILL' }),
  ],
});

/* ---- helpers ---- */

function categoryBadge(label: string) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 10, padY: 4 }),
    fills: [solid(lightBlue)],
    cornerRadius: 12,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: blue }),
    ],
  });
}

function categoryTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
    strokes: active
      ? [{ color: hex(blue), weight: 2, align: 'INSIDE' }]
      : [],
    children: [
      text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? blue : gray }),
    ],
  });
}

function articleCard(title: string, category: string, readTime: string, accentColor: string, accentBg: string) {
  return frame(`Article: ${title.split('\n')[0]}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      /* Thumbnail */
      frame('Thumbnail', {
        size: { x: 1, y: 140 },
        fills: [
          gradient([
            { hex: accentColor, position: 0 },
            { hex: accentColor + '88', position: 1 },
          ], 135),
        ],
        layoutSizingHorizontal: 'FILL',
        autoLayout: horizontal({ padX: 12, padY: 12, align: 'MAX', counterAlign: 'MAX' }),
        children: [
          frame('ReadTimeBadge', {
            autoLayout: horizontal({ padX: 8, padY: 3 }),
            fills: [solid('#00000033')],
            cornerRadius: 10,
            children: [
              text(readTime, { fontSize: 11, fontWeight: 500, color: white }),
            ],
          }),
        ],
      }),
      /* Content */
      frame('CardContent', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame(`CatBadge: ${category}`, {
            autoLayout: horizontal({ padX: 8, padY: 3 }),
            fills: [solid(accentBg)],
            cornerRadius: 10,
            children: [
              text(category, { fontSize: 11, fontWeight: 500, color: accentColor }),
            ],
          }),
          text(title, {
            fontSize: 16, fontWeight: 600, color: dark,
            lineHeight: { value: 22, unit: 'PIXELS' },
          }),
          frame('ArticleMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              ellipse('SmallAvatar', { size: { x: 20, y: 20 }, fills: [solid('#e2e8f0')] }),
              text('MediCare Team', { fontSize: 12, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
    ],
  });
}
