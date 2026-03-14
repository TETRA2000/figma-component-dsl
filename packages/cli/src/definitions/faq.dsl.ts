import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const FAQ_ITEMS = [
  { q: 'How do I get started?', a: 'Sign up for a free account and follow our quickstart guide.' },
  { q: 'What plans are available?', a: 'We offer Starter, Professional, and Enterprise plans.' },
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time.' },
  { q: 'Do you offer support?', a: 'We provide 24/7 email and chat support for all plans.' },
  { q: 'Is there a free trial?', a: 'Yes, all plans include a 14-day free trial.' },
];

/**
 * FAQ — vertically stacked items with 1px borders, 720px constrained width,
 * question text + chevron indicator per item.
 */
export async function buildFAQ(api: VirtualFigmaApi) {
  const section = api.createFrame();
  section.name = 'FAQ';
  section.resize(768, 0);
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
  badgeText.characters = 'FAQ';
  badgeText.fontSize = 14;
  badgeText.fontWeight = 600;
  badgeText.fills = [solidPaint('#6d28d9')];
  badge.appendChild(badgeText);
  header.appendChild(badge);

  const title = await api.createText();
  title.characters = 'Frequently Asked Questions';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = 'CENTER';
  header.appendChild(title);

  section.appendChild(header);

  // FAQ items list
  const itemsList = api.createFrame();
  itemsList.name = 'Items';
  setAutoLayout(itemsList, {
    direction: 'VERTICAL',
    spacing: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (const faq of FAQ_ITEMS) {
    const item = api.createFrame();
    item.name = 'FAQItem';
    item.fills = [solidPaint('#ffffff')];
    item.strokes = [solidPaint('#e5e7eb')];
    item.strokeWeight = 1;
    item.cornerRadius = 16;

    setAutoLayout(item, {
      direction: 'VERTICAL',
      spacing: 0,
      padX: 24,
      padY: 20,
      widthSizing: 'FILL',
      heightSizing: 'HUG',
    });

    // Question row
    const questionRow = api.createFrame();
    questionRow.name = 'QuestionRow';
    setAutoLayout(questionRow, {
      direction: 'HORIZONTAL',
      spacing: 16,
      widthSizing: 'FILL',
      heightSizing: 'HUG',
      align: 'SPACE_BETWEEN',
      counterAlign: 'CENTER',
    });

    const questionText = await api.createText();
    questionText.characters = faq.q;
    questionText.fontSize = 16;
    questionText.fontWeight = 600;
    questionText.fills = [solidPaint('#111827')];
    questionText.lineHeight = { value: 150, unit: 'PERCENT' };
    questionRow.appendChild(questionText);

    // Chevron indicator placeholder (small rectangle)
    const chevron = api.createRectangle();
    chevron.name = 'Chevron';
    chevron.resize(16, 16);
    chevron.fills = [solidPaint('#9ca3af')];
    chevron.cornerRadius = 4;
    questionRow.appendChild(chevron);

    item.appendChild(questionRow);

    // Answer text (collapsed state — visible)
    const answerText = await api.createText();
    answerText.characters = faq.a;
    answerText.fontSize = 16;
    answerText.fills = [solidPaint('#4b5563')];
    answerText.lineHeight = { value: 165, unit: 'PERCENT' };
    item.appendChild(answerText);

    itemsList.appendChild(item);
  }

  section.appendChild(itemsList);

  return section;
}
