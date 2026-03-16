/**
 * Recipe Cookbook — Warm kitchen theme with recipe cards, ingredient lists
 *
 * DSL features stressed: tall cards, nested auto-layout, text wrapping,
 * mixed cornerRadii (rounded top, square bottom), visibility toggling
 */
import {
  frame, text, rectangle,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

function categoryTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 8, align: 'CENTER' }),
    fills: [solid(active ? '#ff9800' : '#fff8e1')],
    cornerRadius: 9999,
    ...(active ? {} : { strokes: [{ color: { r: 0.87, g: 0.80, b: 0.72, a: 1 }, weight: 1, align: 'INSIDE' }] }),
    children: [
      text(label, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#5d4037' }),
    ],
  });
}

function timeBadge(minutes: string) {
  return frame(`Time: ${minutes}`, {
    autoLayout: horizontal({ spacing: 4, padX: 10, padY: 6, counterAlign: 'CENTER' }),
    fills: [solid('#ff9800')],
    cornerRadius: 8,
    children: [
      text('\u23F1', { fontSize: 12, color: '#ffffff' }),
      text(minutes, { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
    ],
  });
}

function recipeCard(title: string, time: string, desc: string) {
  return frame(`Recipe: ${title}`, {
    size: { x: 300 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadii: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
    clipContent: true,
    strokes: [{ color: { r: 0.91, g: 0.86, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Image area
      rectangle('RecipeImage', {
        size: { x: 300, y: 180 },
        fills: [solid('#f5e6cc')],
        layoutSizingHorizontal: 'FILL',
      }),
      // Content
      frame('RecipeContent', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('RecipeMeta', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              timeBadge(time),
              text('\u2605 4.8', { fontSize: 12, fontWeight: 600, color: '#ff9800' }),
            ],
          }),
          text(title, { fontSize: 16, fontWeight: 700, color: '#5d4037' }),
          text(desc, {
            fontSize: 13, fontWeight: 400, color: '#8d6e63',
            lineHeight: { value: 150, unit: 'PERCENT' },
            size: { x: 268 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

function ingredientItem(name: string, amount: string) {
  return frame(`Ingredient: ${name}`, {
    autoLayout: horizontal({ spacing: 8, padY: 6, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Left', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          rectangle('Check', {
            size: { x: 16, y: 16 },
            fills: [],
            cornerRadius: 4,
            strokes: [{ color: { r: 0.55, g: 0.43, b: 0.31, a: 1 }, weight: 1.5, align: 'INSIDE' }],
          }),
          text(name, { fontSize: 14, fontWeight: 400, color: '#5d4037' }),
        ],
      }),
      text(amount, { fontSize: 13, fontWeight: 500, color: '#8d6e63' }),
    ],
  });
}

export default frame('RecipeCookbookPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fff8e1')],
  children: [
    // Header
    frame('Header', {
      autoLayout: vertical({ spacing: 8, padX: 48, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('The Kitchen', { fontSize: 32, fontWeight: 700, color: '#5d4037', textAlignHorizontal: 'CENTER' }),
        text('Discover, cook, and share recipes', { fontSize: 15, fontWeight: 400, color: '#8d6e63', textAlignHorizontal: 'CENTER' }),
      ],
    }),

    // Category tabs
    frame('Tabs', {
      autoLayout: horizontal({ spacing: 8, padX: 48, padY: 0, align: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryTab('All', true),
        categoryTab('Breakfast', false),
        categoryTab('Lunch', false),
        categoryTab('Dinner', false),
        categoryTab('Dessert', false),
      ],
    }),

    // Featured recipe
    frame('FeaturedSection', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('FeaturedCard', {
          autoLayout: horizontal({ spacing: 0 }),
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          clipContent: true,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.91, g: 0.86, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            rectangle('FeaturedImage', {
              size: { x: 500, y: 340 },
              fills: [solid('#f5e6cc')],
            }),
            frame('FeaturedContent', {
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('FeaturedBadges', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    timeBadge('45 min'),
                    text('\u2605 4.9', { fontSize: 13, fontWeight: 600, color: '#ff9800' }),
                  ],
                }),
                text('Tuscan Herb Roasted Chicken', {
                  fontSize: 24, fontWeight: 700, color: '#5d4037',
                  lineHeight: { value: 130, unit: 'PERCENT' },
                }),
                text('A classic Mediterranean recipe with fresh herbs, garlic, and lemon. Perfect for Sunday dinner with family.', {
                  fontSize: 14, fontWeight: 400, color: '#8d6e63',
                  lineHeight: { value: 160, unit: 'PERCENT' },
                  size: { x: 400 },
                  textAutoResize: 'HEIGHT',
                }),
                // Ingredients preview
                frame('IngredientsPreview', {
                  autoLayout: vertical({ spacing: 4, padY: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Key Ingredients', { fontSize: 13, fontWeight: 600, color: '#5d4037' }),
                    ingredientItem('Whole chicken', '1.5 kg'),
                    ingredientItem('Fresh rosemary', '3 sprigs'),
                    ingredientItem('Garlic cloves', '6 pcs'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Recipe grid
    frame('RecipeGrid', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Recipes', { fontSize: 20, fontWeight: 700, color: '#5d4037' }),
        frame('Cards', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            recipeCard('Avocado Toast', '15 min', 'Crispy sourdough topped with creamy avocado and poached eggs.'),
            recipeCard('Thai Green Curry', '35 min', 'Fragrant coconut curry with vegetables and fresh basil.'),
            recipeCard('Berry Smoothie Bowl', '10 min', 'Thick blended berries topped with granola and fresh fruit.'),
          ],
        }),
      ],
    }),
  ],
});
