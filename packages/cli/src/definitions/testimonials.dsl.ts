import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const TESTIMONIALS = [
  {
    quote: '"An incredible tool that transformed how we build components."',
    author: 'Sarah Chen',
    title: 'Engineering Lead',
    rating: 5,
  },
  {
    quote: '"The visual comparison feature saves us hours of manual review."',
    author: 'Marcus Rivera',
    title: 'Design Systems',
    rating: 4,
  },
  {
    quote: '"Finally, a bridge between code and design that actually works."',
    author: 'Priya Sharma',
    title: 'Frontend Developer',
    rating: 5,
  },
];

async function buildTestimonialCardInline(
  api: VirtualFigmaApi,
  testimonial: (typeof TESTIMONIALS)[number],
) {
  const card = api.createFrame();
  card.name = `Testimonial-${testimonial.author}`;
  card.fills = [solidPaint('#ffffff')];
  card.strokes = [solidPaint('#e5e7eb')];
  card.strokeWeight = 1;
  card.cornerRadius = 24;

  setAutoLayout(card, {
    direction: 'VERTICAL',
    spacing: 24,
    padX: 32,
    padY: 32,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  // Stars
  const starsRow = api.createFrame();
  starsRow.name = 'Stars';
  setAutoLayout(starsRow, {
    direction: 'HORIZONTAL',
    spacing: 2,
    sizing: 'HUG',
  });

  for (let i = 0; i < 5; i++) {
    const star = api.createEllipse();
    star.name = `Star${i + 1}`;
    star.resize(16, 16);
    star.fills = [solidPaint(i < testimonial.rating ? '#fb923c' : '#e5e7eb')];
    starsRow.appendChild(star);
  }
  card.appendChild(starsRow);

  // Quote
  const quote = await api.createText();
  quote.characters = testimonial.quote;
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

  const avatar = api.createEllipse();
  avatar.name = 'Avatar';
  avatar.resize(40, 40);
  avatar.fills = [solidPaint('#ddd6fe')];
  authorRow.appendChild(avatar);

  const authorInfo = api.createFrame();
  authorInfo.name = 'AuthorInfo';
  setAutoLayout(authorInfo, {
    direction: 'VERTICAL',
    spacing: 2,
    sizing: 'HUG',
  });

  const name = await api.createText();
  name.characters = testimonial.author;
  name.fontSize = 14;
  name.fontWeight = 600;
  name.fills = [solidPaint('#111827')];
  authorInfo.appendChild(name);

  const title = await api.createText();
  title.characters = testimonial.title;
  title.fontSize = 12;
  title.fills = [solidPaint('#4b5563')];
  authorInfo.appendChild(title);

  authorRow.appendChild(authorInfo);
  card.appendChild(authorRow);

  return card;
}

/**
 * Testimonials — section header (badge + title + subtitle) with horizontal row
 * of 3 TestimonialCard instances; tests INSTANCE nodes with property overrides.
 */
export async function buildTestimonials(api: VirtualFigmaApi) {
  const section = api.createFrame();
  section.name = 'Testimonials';
  section.resize(1200, 0);
  section.fills = [solidPaint('#f9fafb')];

  setAutoLayout(section, {
    direction: 'VERTICAL',
    spacing: 48,
    padX: 24,
    padY: 80,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    counterAlign: 'CENTER',
  });

  // Header
  const header = api.createFrame();
  header.name = 'Header';
  setAutoLayout(header, {
    direction: 'VERTICAL',
    spacing: 16,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    counterAlign: 'CENTER',
  });

  const badge = api.createFrame();
  badge.name = 'Badge';
  badge.fills = [solidPaint('#ede9fe')];
  badge.cornerRadius = 9999;
  setAutoLayout(badge, {
    direction: 'HORIZONTAL',
    padX: 16,
    padY: 4,
    sizing: 'HUG',
  });

  const badgeText = await api.createText();
  badgeText.characters = 'Testimonials';
  badgeText.fontSize = 14;
  badgeText.fontWeight = 600;
  badgeText.fills = [solidPaint('#6d28d9')];
  badge.appendChild(badgeText);
  header.appendChild(badge);

  const title = await api.createText();
  title.characters = 'Loved by developers';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = 'CENTER';
  header.appendChild(title);

  const subtitle = await api.createText();
  subtitle.characters = 'See what our users have to say.';
  subtitle.fontSize = 18;
  subtitle.fills = [solidPaint('#4b5563')];
  subtitle.lineHeight = { value: 165, unit: 'PERCENT' };
  subtitle.textAlignHorizontal = 'CENTER';
  header.appendChild(subtitle);

  section.appendChild(header);

  // Cards row
  const cardsRow = api.createFrame();
  cardsRow.name = 'Cards';
  setAutoLayout(cardsRow, {
    direction: 'HORIZONTAL',
    spacing: 24,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (const testimonial of TESTIMONIALS) {
    const card = await buildTestimonialCardInline(api, testimonial);
    cardsRow.appendChild(card);
  }

  section.appendChild(cardsRow);

  return section;
}
