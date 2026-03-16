/**
 * Minimal Blog — Clean typography-focused blog with light theme
 *
 * DSL features stressed: Typography variety (sizes 11-40px), text alignment (CENTER),
 * line height, letter spacing, textAutoResize:HEIGHT for wrapping, minimal fills/strokes
 */
import {
  frame, text, rectangle,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

function tagPill(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#f5f5f4')],
    cornerRadius: 9999,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#78716c' }),
    ],
  });
}

function articleCard(title: string, excerpt: string, date: string, tag: string) {
  return frame(`Article: ${title}`, {
    size: { x: 340 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    clipContent: true,
    strokes: [{ color: { r: 0.91, g: 0.90, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Image placeholder
      rectangle('ImagePlaceholder', {
        size: { x: 340, y: 180 },
        fills: [solid('#f5f5f4')],
        layoutSizingHorizontal: 'FILL',
      }),
      // Content
      frame('CardContent', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(tag.toUpperCase(), {
            fontSize: 11, fontWeight: 600, color: '#78716c',
            letterSpacing: { value: 8, unit: 'PERCENT' },
          }),
          text(title, {
            fontSize: 18, fontWeight: 700, color: '#1c1917',
            lineHeight: { value: 140, unit: 'PERCENT' },
            size: { x: 300 },
            textAutoResize: 'HEIGHT',
          }),
          text(excerpt, {
            fontSize: 14, fontWeight: 400, color: '#78716c',
            lineHeight: { value: 160, unit: 'PERCENT' },
            size: { x: 300 },
            textAutoResize: 'HEIGHT',
          }),
          text(date, { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
        ],
      }),
    ],
  });
}

export default frame('MinimalBlogPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafaf9')],
  children: [
    // Header — centered
    frame('Header', {
      autoLayout: vertical({ spacing: 8, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('The Minimalist', {
          fontSize: 40, fontWeight: 700, color: '#1c1917',
          letterSpacing: { value: -2, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        text('Thoughts on design, craft, and the spaces between', {
          fontSize: 16, fontWeight: 400, color: '#78716c',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Tag pills — centered
    frame('Tags', {
      autoLayout: horizontal({ spacing: 8, padX: 120, padY: 0, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        tagPill('All'), tagPill('Design'), tagPill('Technology'), tagPill('Culture'), tagPill('Process'),
      ],
    }),

    // Featured article
    frame('FeaturedSection', {
      autoLayout: horizontal({ spacing: 0, padX: 120, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FeaturedCard', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          clipContent: true,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.91, g: 0.90, b: 0.89, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            rectangle('FeaturedImage', {
              size: { x: 480, y: 300 },
              fills: [solid('#f5f5f4')],
            }),
            frame('FeaturedContent', {
              autoLayout: vertical({ spacing: 16, padX: 40, padY: 40 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('FEATURED', {
                  fontSize: 11, fontWeight: 600, color: '#78716c',
                  letterSpacing: { value: 8, unit: 'PERCENT' },
                }),
                text('Why Less is More: The Philosophy of Reduction', {
                  fontSize: 28, fontWeight: 700, color: '#1c1917',
                  lineHeight: { value: 130, unit: 'PERCENT' },
                  size: { x: 480 },
                  textAutoResize: 'HEIGHT',
                }),
                text('In a world overwhelmed by excess, the greatest challenge for designers is knowing what to remove. This article explores the enduring power of minimalism.', {
                  fontSize: 15, fontWeight: 400, color: '#78716c',
                  lineHeight: { value: 170, unit: 'PERCENT' },
                  size: { x: 480 },
                  textAutoResize: 'HEIGHT',
                }),
                // Author byline
                frame('AuthorByline', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('Avatar', {
                      size: { x: 40, y: 40 },
                      fills: [solid('#d6d3d1')],
                      cornerRadius: 20,
                    }),
                    frame('AuthorInfo', {
                      autoLayout: vertical({ spacing: 2 }),
                      children: [
                        text('Elena Vasquez', { fontSize: 14, fontWeight: 600, color: '#1c1917' }),
                        text('Senior Designer', { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Blockquote
    frame('BlockquoteSection', {
      autoLayout: vertical({ spacing: 0, padX: 120, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Blockquote', {
          size: { x: 560 },
          autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }),
          strokes: [{ color: { r: 0.84, g: 0.83, b: 0.82, a: 1 }, weight: 3, align: 'INSIDE' }],
          children: [
            text('Design is not just what it looks like and feels like. Design is how it works.', {
              fontSize: 16, fontWeight: 400, color: '#57534e',
              lineHeight: { value: 160, unit: 'PERCENT' },
              size: { x: 500 },
              textAutoResize: 'HEIGHT',
            }),
            text('— Steve Jobs', { fontSize: 13, fontWeight: 500, color: '#a8a29e' }),
          ],
        }),
      ],
    }),

    // Article grid
    frame('ArticlesSection', {
      autoLayout: vertical({ spacing: 20, padX: 120, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Latest Articles', { fontSize: 20, fontWeight: 700, color: '#1c1917' }),
        frame('ArticleGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            articleCard('The Art of Simplicity in Design', 'Exploring how minimalist approaches lead to better user experiences.', 'Mar 12, 2026', 'Design'),
            articleCard('Typography as a Design Tool', 'How typeface choices communicate mood and meaning beyond words.', 'Mar 8, 2026', 'Craft'),
            articleCard('Space: The Invisible Element', 'Understanding negative space and its role in visual hierarchy.', 'Mar 3, 2026', 'Process'),
          ],
        }),
      ],
    }),
  ],
});
