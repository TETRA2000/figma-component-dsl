import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const RATING_VARIANTS = [
  { rating: 3, author: 'Alice Johnson', title: 'Product Manager' },
  { rating: 4, author: 'Bob Smith', title: 'Senior Developer' },
  { rating: 5, author: 'Carol Davis', title: 'Design Lead' },
] as const;

/**
 * TestimonialCard — 3 rating variants (3/4/5 stars)
 * Repeated ELLIPSE shapes for star icons, avatar circle (40px ELLIPSE),
 * multi-section vertical layout with author info row, 165% line height on quote text.
 */
export async function buildTestimonialCard(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'TestimonialCards';
  setAutoLayout(container, {
    direction: 'HORIZONTAL',
    spacing: 24,
    sizing: 'HUG',
  });

  for (const variant of RATING_VARIANTS) {
    const card = api.createComponent();
    card.name = `rating=${variant.rating}`;
    card.fills = [solidPaint('#ffffff')];
    card.strokes = [solidPaint('#e5e7eb')];
    card.strokeWeight = 1;
    card.cornerRadius = 24;

    setAutoLayout(card, {
      direction: 'VERTICAL',
      spacing: 24,
      padX: 32,
      padY: 32,
      widthSizing: 'FIXED',
      heightSizing: 'HUG',
    });
    card.resize(320, 0);

    // Stars row — ELLIPSE shapes for star icons
    const starsRow = api.createFrame();
    starsRow.name = 'Stars';
    setAutoLayout(starsRow, {
      direction: 'HORIZONTAL',
      spacing: 2,
      sizing: 'HUG',
    });

    for (let i = 0; i < 5; i++) {
      const star = api.createEllipse();
      star.name = `Star ${i + 1}`;
      star.resize(16, 16);
      star.fills = [solidPaint(i < variant.rating ? '#fb923c' : '#e5e7eb')];
      starsRow.appendChild(star);
    }
    card.appendChild(starsRow);

    // Quote text with 165% line height
    const quote = await api.createText();
    quote.characters = `"This product has transformed our workflow and boosted productivity."`;
    quote.fontSize = 16;
    quote.fills = [solidPaint('#111827')];
    quote.lineHeight = { value: 165, unit: 'PERCENT' };
    card.appendChild(quote);

    // Author row
    const authorRow = api.createFrame();
    authorRow.name = 'Author';
    setAutoLayout(authorRow, {
      direction: 'HORIZONTAL',
      spacing: 12,
      sizing: 'HUG',
      counterAlign: 'CENTER',
    });

    // Avatar — 40px ELLIPSE
    const avatar = api.createEllipse();
    avatar.name = 'Avatar';
    avatar.resize(40, 40);
    avatar.fills = [solidPaint('#ddd6fe')];
    authorRow.appendChild(avatar);

    // Author info column
    const authorInfo = api.createFrame();
    authorInfo.name = 'AuthorInfo';
    setAutoLayout(authorInfo, {
      direction: 'VERTICAL',
      spacing: 2,
      sizing: 'HUG',
    });

    const authorName = await api.createText();
    authorName.characters = variant.author;
    authorName.fontSize = 14;
    authorName.fontWeight = 600;
    authorName.fills = [solidPaint('#111827')];
    authorInfo.appendChild(authorName);

    const authorTitle = await api.createText();
    authorTitle.characters = variant.title;
    authorTitle.fontSize = 12;
    authorTitle.fills = [solidPaint('#4b5563')];
    authorInfo.appendChild(authorTitle);

    authorRow.appendChild(authorInfo);
    card.appendChild(authorRow);

    container.appendChild(card);
  }

  return container;
}
