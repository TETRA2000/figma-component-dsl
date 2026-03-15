/**
 * Article Page — Hero Image + Headline + Body + Pull Quote + Related
 * Batch 8, Page 6: Media/Entertainment — Long-form article layout
 * DSL Features: large image placeholder, text hierarchy, pull quote, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaArticle', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Nav
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('SIGNAL', { fontSize: 22, fontWeight: 900, color: '#ffffff' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Home', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
            text('Technology', { fontSize: 14, fontWeight: 600, color: '#e11d48' }),
            text('Science', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
          ],
        }),
      ],
    }),

    // Hero Image
    frame('HeroImage', {
      size: { x: 1440, y: 480 },
      autoLayout: vertical({ spacing: 0, align: 'MAX', padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#0a1a2d', position: 0 },
          { hex: '#1a2d3d', position: 0.3 },
          { hex: '#0a1420', position: 0.7 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      clipContent: true,
      children: [
        frame('ImageCaption', {
          autoLayout: horizontal({ padX: 12, padY: 6 }),
          fills: [solid('#000000', 0.5)],
          cornerRadius: 4,
          children: [
            text('Photo: A quantum computing processor at IBM Research Labs  |  Credit: Reuters', {
              fontSize: 12, fontWeight: 400, color: '#a3a3a3',
            }),
          ],
        }),
      ],
    }),

    // Article Content
    frame('ArticleContent', {
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Headline Area
        frame('HeadlineArea', {
          autoLayout: vertical({ spacing: 16, padX: 120, padY: 40, counterAlign: 'CENTER' }),
          size: { x: 860, y: undefined },
          children: [
            frame('CategoryDate', {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                frame('CategoryBadge', {
                  autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#e11d48')],
                  cornerRadius: 4,
                  children: [
                    text('TECHNOLOGY', { fontSize: 11, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                text('March 15, 2026  •  12 min read', { fontSize: 13, fontWeight: 400, color: '#525252' }),
              ],
            }),
            text('The Race to Build the World\'s First\nCommercial Quantum Computer', {
              fontSize: 40, fontWeight: 800, color: '#ffffff',
              lineHeight: { value: 48, unit: 'PIXELS' },
              textAlignHorizontal: 'CENTER',
            }),
            text('How a handful of companies are pushing the boundaries of physics\nto create machines that could change everything.', {
              fontSize: 18, fontWeight: 400, color: '#a3a3a3',
              lineHeight: { value: 28, unit: 'PIXELS' },
              textAlignHorizontal: 'CENTER',
            }),
          ],
        }),

        // Author/Date Row
        frame('AuthorBar', {
          autoLayout: horizontal({ spacing: 16, padX: 0, padY: 24, counterAlign: 'CENTER' }),
          size: { x: 680, y: undefined },
          strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            rectangle('AuthorPhoto', { size: { x: 48, y: 48 }, fills: [solid('#333333')], cornerRadius: 24 }),
            frame('AuthorInfo', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Elena Rodriguez', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
                text('Senior Technology Correspondent', { fontSize: 13, fontWeight: 400, color: '#737373' }),
              ],
            }),
            frame('AuthSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            frame('ShareBtns', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                frame('ShareBtn', {
                  autoLayout: horizontal({ padX: 12, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#1a1a1a')],
                  cornerRadius: 6,
                  children: [text('Share', { fontSize: 12, fontWeight: 500, color: '#a3a3a3' })],
                }),
                frame('BookmarkBtn', {
                  autoLayout: horizontal({ padX: 12, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#1a1a1a')],
                  cornerRadius: 6,
                  children: [text('Bookmark', { fontSize: 12, fontWeight: 500, color: '#a3a3a3' })],
                }),
              ],
            }),
          ],
        }),

        // Body Paragraphs
        frame('Body', {
          autoLayout: vertical({ spacing: 24, padX: 0, padY: 40 }),
          size: { x: 680, y: undefined },
          children: [
            bodyParagraph('The world of quantum computing stands at a pivotal crossroads. After decades of theoretical research and laboratory experiments, the technology is finally approaching a point where practical, commercial applications may become reality. The question is no longer whether quantum computers will work, but who will build the first one capable of solving real-world problems.'),
            bodyParagraph('At IBM\'s research campus in Yorktown Heights, New York, a team of more than 200 scientists and engineers are working around the clock on what they call "Quantum Eagle" — a 1,000-qubit processor that could perform calculations impossible for even the most powerful classical supercomputers.'),
            bodyParagraph('"We\'re not just building a faster computer," says Dr. Jay Gambetta, IBM\'s Vice President of Quantum Computing. "We\'re building an entirely new paradigm of computation that will transform industries from pharmaceuticals to finance, from materials science to artificial intelligence."'),

            // Pull Quote
            frame('PullQuote', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.88, g: 0.11, b: 0.28, a: 1 }, weight: 3, align: 'INSIDE' }],
              children: [
                text('"We are witnessing the birth of a computational revolution that will be as transformative as the invention of the transistor."', {
                  fontSize: 22, fontWeight: 600, color: '#ffffff',
                  lineHeight: { value: 32, unit: 'PIXELS' },
                  size: { x: 600 }, textAutoResize: 'HEIGHT',
                }),
                text('— Dr. Jay Gambetta, VP of Quantum Computing, IBM', {
                  fontSize: 14, fontWeight: 500, color: '#e11d48',
                }),
              ],
            }),

            bodyParagraph('The race involves more than just IBM. Google, with its "Willow" quantum chip, demonstrated quantum error correction below a key threshold in late 2024. Microsoft has taken a radically different approach with topological qubits, betting that more stable building blocks will ultimately win the race.'),
            bodyParagraph('Meanwhile, startups like IonQ, Rigetti Computing, and PsiQuantum are pursuing their own unique architectures. IonQ uses trapped-ion technology, while PsiQuantum is building a photonic quantum computer — one that uses particles of light instead of superconducting circuits.'),
          ],
        }),
      ],
    }),

    // Related Articles
    frame('RelatedSection', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Related Articles', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('RelatedGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            relatedCard('Google\'s Willow Chip Sets New Record', 'TECHNOLOGY', '3 days ago'),
            relatedCard('The Ethics of Quantum Cryptography', 'OPINION', '1 week ago'),
            relatedCard('How Quantum Could Cure Cancer', 'SCIENCE', '2 weeks ago'),
            relatedCard('China\'s Quantum Satellite Network', 'WORLD', '3 weeks ago'),
          ],
        }),
      ],
    }),
  ],
});

function bodyParagraph(content: string) {
  return text(content, {
    fontSize: 17, fontWeight: 400, color: '#d4d4d4',
    lineHeight: { value: 28, unit: 'PIXELS' },
    size: { x: 680 }, textAutoResize: 'HEIGHT',
  });
}

function relatedCard(headline: string, category: string, time: string) {
  return frame(`Related: ${headline}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 10,
    clipContent: true,
    fills: [solid('#1a1a1a')],
    children: [
      rectangle('RelatedImage', {
        size: { x: 300, y: 140 },
        fills: [
          gradient([
            { hex: '#1a1a2e', position: 0 },
            { hex: '#0a0a14', position: 1 },
          ], 135),
        ],
      }),
      frame('RelatedContent', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(category, { fontSize: 10, fontWeight: 700, color: '#e11d48' }),
          text(headline, { fontSize: 15, fontWeight: 600, color: '#ffffff', lineHeight: { value: 20, unit: 'PIXELS' } }),
          text(time, { fontSize: 12, fontWeight: 400, color: '#525252' }),
        ],
      }),
    ],
  });
}
