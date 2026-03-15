/**
 * News Feed — Trending Bar + Article Cards + Breaking News + Categories
 * Batch 8, Page 5: Media/Entertainment — News portal layout
 * DSL Features: image placeholders, card grid, dark theme, gradients
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaNewsfeed', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Breaking News Banner
    frame('BreakingBanner', {
      autoLayout: horizontal({ spacing: 12, padX: 60, padY: 10, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#e11d48')],
      children: [
        frame('BreakingLabel', {
          autoLayout: horizontal({ padX: 10, padY: 3, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 4,
          children: [
            text('BREAKING', { fontSize: 11, fontWeight: 800, color: '#e11d48' }),
          ],
        }),
        text('Major breakthrough in quantum computing: researchers achieve 1000-qubit processor', {
          fontSize: 13, fontWeight: 500, color: '#ffffff',
          layoutSizingHorizontal: 'FILL',
        }),
        text('2 min ago', { fontSize: 12, fontWeight: 400, color: '#fecdd3' }),
      ],
    }),

    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('SIGNAL', { fontSize: 24, fontWeight: 900, color: '#ffffff' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Home', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            text('World', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Tech', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Science', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Business', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Culture', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
          ],
        }),
      ],
    }),

    // Trending Bar
    frame('TrendingBar', {
      autoLayout: horizontal({ spacing: 16, padX: 60, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Trending:', { fontSize: 13, fontWeight: 700, color: '#e11d48' }),
        text('#QuantumLeap', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
        text('#MarsColony', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
        text('#AIRegulation', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
        text('#ClimateAction', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
        text('#SpaceX', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
      ],
    }),

    // Main Content Area
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Articles Column
        frame('ArticlesColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Featured Article
            frame('FeaturedArticle', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              cornerRadius: 12,
              clipContent: true,
              fills: [solid('#1a1a1a')],
              children: [
                rectangle('FeaturedImage', {
                  size: { x: 960, y: 320 },
                  fills: [
                    gradient([
                      { hex: '#1a2d3d', position: 0 },
                      { hex: '#0a1420', position: 0.5 },
                      { hex: '#0a0a14', position: 1 },
                    ], 135),
                  ],
                }),
                frame('FeaturedContent', {
                  autoLayout: vertical({ spacing: 10, padX: 24, padY: 20 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('FeaturedMeta', {
                      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                      children: [
                        frame('CategoryBadge', {
                          autoLayout: horizontal({ padX: 10, padY: 3, align: 'CENTER', counterAlign: 'CENTER' }),
                          fills: [solid('#e11d48')],
                          cornerRadius: 4,
                          children: [
                            text('TECHNOLOGY', { fontSize: 10, fontWeight: 700, color: '#ffffff' }),
                          ],
                        }),
                        text('5 hours ago', { fontSize: 12, fontWeight: 400, color: '#525252' }),
                      ],
                    }),
                    text('The Race to Build the World\'s First Commercial Quantum Computer', {
                      fontSize: 24, fontWeight: 700, color: '#ffffff',
                      lineHeight: { value: 30, unit: 'PIXELS' },
                    }),
                    text('Leading tech companies are in a fierce competition to develop practical quantum computing solutions that could revolutionize industries from drug discovery to climate modeling.', {
                      fontSize: 15, fontWeight: 400, color: '#a3a3a3',
                      lineHeight: { value: 22, unit: 'PIXELS' },
                    }),
                    frame('AuthorRow', {
                      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                      children: [
                        rectangle('AuthorAvatar', { size: { x: 24, y: 24 }, fills: [solid('#333333')], cornerRadius: 12 }),
                        text('Elena Rodriguez', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
                        text('•  8 min read', { fontSize: 13, fontWeight: 400, color: '#525252' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Article Grid
            frame('ArticleGrid', {
              autoLayout: horizontal({ spacing: 20 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                articleCard('Mars Colony Plans Accelerate', 'SCIENCE', 'Reuters', '2h ago', '#2d1a0a', '#0a0a0a'),
                articleCard('AI Regulation Framework', 'POLITICS', 'AP News', '3h ago', '#0a1a2d', '#0a0a0a'),
                articleCard('Global Markets Rally', 'BUSINESS', 'Bloomberg', '4h ago', '#0a2d1a', '#0a0a0a'),
              ],
            }),
            frame('ArticleGrid2', {
              autoLayout: horizontal({ spacing: 20 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                articleCard('Film Festival Winners', 'CULTURE', 'Variety', '5h ago', '#2d0a2d', '#0a0a0a'),
                articleCard('Climate Summit Outcomes', 'WORLD', 'BBC', '6h ago', '#1a2d1a', '#0a0a0a'),
                articleCard('New Space Telescope', 'SCIENCE', 'NASA', '7h ago', '#0a1a3d', '#0a0a0a'),
              ],
            }),
          ],
        }),

        // Categories Sidebar
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 300, y: undefined },
          children: [
            // Categories
            frame('CategoriesSection', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111111')],
              cornerRadius: 12,
              children: [
                text('Categories', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
                categoryLink('Technology', '234'),
                categoryLink('Science', '189'),
                categoryLink('Business', '156'),
                categoryLink('World', '312'),
                categoryLink('Culture', '98'),
                categoryLink('Politics', '267'),
                categoryLink('Health', '145'),
              ],
            }),

            // Most Read
            frame('MostRead', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111111')],
              cornerRadius: 12,
              children: [
                text('Most Read', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
                topStory(1, 'Scientists detect high-energy signal from nearby star'),
                topStory(2, 'New battery technology could charge EVs in 5 minutes'),
                topStory(3, 'Major ransomware gang dismantled by Interpol'),
                topStory(4, 'Ocean temperatures hit record highs in February'),
                topStory(5, 'Revolutionary CRISPR therapy approved for rare disease'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

function articleCard(headline: string, category: string, source: string, time: string, gradStart: string, gradEnd: string) {
  return frame(`Article: ${headline}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 10,
    clipContent: true,
    fills: [solid('#1a1a1a')],
    children: [
      rectangle('ArticleImage', {
        size: { x: 300, y: 140 },
        fills: [gradient([{ hex: gradStart, position: 0 }, { hex: gradEnd, position: 1 }], 135)],
      }),
      frame('ArticleContent', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ArticleMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(category, { fontSize: 10, fontWeight: 700, color: '#e11d48' }),
              text('•', { fontSize: 10, fontWeight: 400, color: '#525252' }),
              text(time, { fontSize: 11, fontWeight: 400, color: '#525252' }),
            ],
          }),
          text(headline, { fontSize: 15, fontWeight: 600, color: '#ffffff', lineHeight: { value: 20, unit: 'PIXELS' } }),
          text(source, { fontSize: 12, fontWeight: 500, color: '#737373' }),
        ],
      }),
    ],
  });
}

function categoryLink(name: string, count: string) {
  return frame(`Cat: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 14, fontWeight: 500, color: '#a3a3a3', layoutSizingHorizontal: 'FILL' }),
      text(count, { fontSize: 13, fontWeight: 400, color: '#525252' }),
    ],
  });
}

function topStory(rank: number, headline: string) {
  return frame(`TopStory ${rank}`, {
    autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(`${rank}`, { fontSize: 20, fontWeight: 800, color: '#e11d48' }),
      text(headline, {
        fontSize: 13, fontWeight: 500, color: '#d4d4d4',
        lineHeight: { value: 18, unit: 'PIXELS' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}
