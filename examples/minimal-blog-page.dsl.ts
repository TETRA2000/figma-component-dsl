import {
  frame, text, rectangle,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

const offWhite = '#fafaf9';
const stone = '#78716c';
const ink = '#1c1917';
const warmGray = '#d6d3d1';
const accent = '#b45309';

// Tag pill
function tagPill(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 4 }),
    fills: [solid('#f5f5f4')],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.85, g: 0.83, b: 0.81, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: stone }),
    ],
  });
}

// Author byline
function authorByline(name: string, date: string) {
  return frame('Byline', {
    autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
    children: [
      rectangle('Avatar', {
        size: { x: 32, y: 32 },
        fills: [solid(warmGray)],
        cornerRadius: 16,
      }),
      frame('AuthorInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 13, fontWeight: 600, color: ink }),
          text(date, { fontSize: 12, fontWeight: 400, color: stone }),
        ],
      }),
    ],
  });
}

// Article card
function articleCard(title: string, excerpt: string, author: string, date: string, tags: string[]) {
  return frame(`Article: ${title}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.9, g: 0.89, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    size: { x: 400, y: undefined },
    children: [
      frame('Tags', {
        autoLayout: horizontal({ spacing: 8 }),
        children: tags.map(t => tagPill(t)),
      }),
      text(title, {
        fontSize: 20,
        fontWeight: 700,
        color: ink,
        lineHeight: { value: 130, unit: 'PERCENT' as const },
        letterSpacing: { value: -0.5, unit: 'PIXELS' as const },
      }),
      text(excerpt, {
        fontSize: 15,
        fontWeight: 400,
        color: stone,
        lineHeight: { value: 160, unit: 'PERCENT' as const },
        size: { x: 352 },
        textAutoResize: 'HEIGHT' as const,
      }),
      authorByline(author, date),
    ],
  });
}

// Blockquote
function blockquote(quoteText: string, attribution: string) {
  return frame('Blockquote', {
    autoLayout: horizontal({ spacing: 16, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('AccentBar', {
        size: { x: 3, y: 60 },
        fills: [solid(accent)],
        cornerRadius: 2,
      }),
      frame('QuoteContent', {
        autoLayout: vertical({ spacing: 8 }),
        children: [
          text(`"${quoteText}"`, {
            fontSize: 18,
            fontWeight: 400,
            color: ink,
            lineHeight: { value: 160, unit: 'PERCENT' as const },
            letterSpacing: { value: -0.3, unit: 'PIXELS' as const },
            size: { x: 600 },
            textAutoResize: 'HEIGHT' as const,
          }),
          text(`— ${attribution}`, { fontSize: 14, fontWeight: 500, color: stone }),
        ],
      }),
    ],
  });
}

// Featured article (large)
const featuredArticle = frame('FeaturedArticle', {
  autoLayout: horizontal({ spacing: 32, padX: 40, padY: 40 }),
  fills: [solid('#ffffff')],
  cornerRadius: 16,
  strokes: [{ color: { r: 0.9, g: 0.89, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
  layoutSizingHorizontal: 'FILL',
  children: [
    rectangle('FeaturedImage', {
      size: { x: 480, y: 320 },
      fills: [solid(warmGray)],
      cornerRadius: 12,
    }),
    frame('FeaturedContent', {
      autoLayout: vertical({ spacing: 16 }),
      size: { x: 480, y: undefined },
      children: [
        frame('FeaturedTags', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [tagPill('Featured'), tagPill('Design')],
        }),
        text('The Art of Minimalist Design', {
          fontSize: 32,
          fontWeight: 700,
          color: ink,
          lineHeight: { value: 120, unit: 'PERCENT' as const },
          letterSpacing: { value: -1, unit: 'PIXELS' as const },
        }),
        text('Exploring how less truly becomes more in modern design. A deep dive into the principles that guide the most effective minimalist interfaces and why simplicity continues to resonate.', {
          fontSize: 16,
          fontWeight: 400,
          color: stone,
          lineHeight: { value: 160, unit: 'PERCENT' as const },
          size: { x: 480 },
          textAutoResize: 'HEIGHT' as const,
        }),
        authorByline('Sarah Chen', 'March 14, 2026'),
      ],
    }),
  ],
});

export default frame('MinimalBlog', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(offWhite)],
  children: [
    // Navigation
    frame('Nav', {
      autoLayout: horizontal({ spacing: 0, padX: 120, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.9, g: 0.89, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('The Minimalist', {
          fontSize: 22,
          fontWeight: 700,
          color: ink,
          letterSpacing: { value: -0.5, unit: 'PIXELS' as const },
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text('Blog', { fontSize: 15, fontWeight: 500, color: ink }),
            text('About', { fontSize: 15, fontWeight: 400, color: stone }),
            text('Archive', { fontSize: 15, fontWeight: 400, color: stone }),
            text('Contact', { fontSize: 15, fontWeight: 400, color: stone }),
          ],
        }),
      ],
    }),

    // Hero / Featured
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Latest Stories', {
          fontSize: 14,
          fontWeight: 600,
          color: accent,
          letterSpacing: { value: 2, unit: 'PIXELS' as const },
          textAlignHorizontal: 'LEFT' as const,
        }),
        featuredArticle,
      ],
    }),

    // Blockquote
    frame('QuoteSection', {
      autoLayout: vertical({ spacing: 0, padX: 120, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        blockquote(
          'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
          'Antoine de Saint-Exupéry'
        ),
      ],
    }),

    // Article grid
    frame('ArticleGrid', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('More Stories', {
          fontSize: 24,
          fontWeight: 700,
          color: ink,
          letterSpacing: { value: -0.5, unit: 'PIXELS' as const },
        }),
        frame('Grid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            articleCard(
              'Typography in the Digital Age',
              'How modern web fonts and variable type are reshaping the way we read online.',
              'Alex Rivera',
              'March 12, 2026',
              ['Typography', 'Web']
            ),
            articleCard(
              'Color Theory for Developers',
              'A practical guide to choosing color palettes that work across light and dark modes.',
              'Maya Patel',
              'March 10, 2026',
              ['Color', 'Dev']
            ),
            articleCard(
              'The Rise of Component Systems',
              'Why every serious design team is investing in a shared component library.',
              'James Wu',
              'March 8, 2026',
              ['Systems', 'Components']
            ),
          ],
        }),
      ],
    }),
  ],
});
