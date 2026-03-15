/**
 * Recipe Detail — Hero image, ingredients, instructions, nutrition
 * Batch 3, Page 4: Food & Restaurant
 * DSL Features: rich typography, gradients, cornerRadii, warm colors
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const WHITE = '#FFFFFF';

function ingredientRow(qty: string, ingredient: string) {
  return frame(`Ingredient: ${ingredient}`, {
    autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Check', {
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 22, y: 22 },
        fills: [solid(BROWN, 0.1)],
        cornerRadius: 4,
        children: [],
      }),
      text(qty, { fontSize: 14, fontWeight: 600, color: BROWN }),
      text(ingredient, { fontSize: 14, fontWeight: 400, color: DARK }),
    ],
  });
}

function stepItem(num: number, instruction: string) {
  return frame(`Step ${num}`, {
    autoLayout: horizontal({ spacing: 16, padY: 12, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNum', {
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 36, y: 36 },
        fills: [solid(BROWN)],
        cornerRadius: 18,
        children: [
          text(String(num), { fontSize: 16, fontWeight: 700, color: WHITE }),
        ],
      }),
      text(instruction, {
        fontSize: 15, fontWeight: 400, color: DARK,
        lineHeight: { value: 24, unit: 'PIXELS' },
        size: { x: 500 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function nutritionRow(label: string, value: string, pct: string) {
  return frame(`Nutrition: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padY: 6, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 400, color: MUTED }),
      frame('NutritionValue', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(value, { fontSize: 14, fontWeight: 600, color: DARK }),
          text(pct, { fontSize: 12, fontWeight: 400, color: MUTED }),
        ],
      }),
    ],
  });
}

export default component('FoodRecipe', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero Image Area
    frame('HeroImage', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 40, align: 'MAX' }),
      layoutSizingHorizontal: 'FILL',
      size: { x: undefined, y: 400 },
      fills: [
        gradient([
          { hex: '#D4A574', position: 0 },
          { hex: '#8B4513', position: 0.6 },
          { hex: '#3E2723', position: 1 },
        ], 270),
      ],
      cornerRadii: { topLeft: 0, topRight: 0, bottomLeft: 24, bottomRight: 24 },
      clipContent: true,
      children: [
        frame('RecipeBadge', {
          autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(WHITE, 0.2)],
          cornerRadius: 20,
          children: [
            text('Italian Classic', { fontSize: 13, fontWeight: 500, color: WHITE }),
          ],
        }),
        text('Osso Buco alla Milanese', {
          fontSize: 42, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -0.5, unit: 'PIXELS' },
        }),
        frame('RecipeMeta', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('⏱ 2h 30m', { fontSize: 14, fontWeight: 500, color: TAN }),
            text('👤 Serves 4', { fontSize: 14, fontWeight: 500, color: TAN }),
            text('◆ Medium', { fontSize: 14, fontWeight: 500, color: TAN }),
          ],
        }),
      ],
    }),

    // Content
    frame('RecipeContent', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left Column: Ingredients + Nutrition
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 32 }),
          size: { x: 340, y: undefined },
          children: [
            // Ingredients Card
            frame('IngredientsCard', {
              autoLayout: vertical({ spacing: 4, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(WHITE)],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Ingredients', { fontSize: 20, fontWeight: 700, color: DARK }),
                rectangle('Div', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                ingredientRow('4', 'Veal shanks, cut 2" thick'),
                ingredientRow('½ cup', 'All-purpose flour'),
                ingredientRow('3 tbsp', 'Olive oil'),
                ingredientRow('1', 'Onion, finely diced'),
                ingredientRow('2', 'Carrots, diced'),
                ingredientRow('2 stalks', 'Celery, diced'),
                ingredientRow('4 cloves', 'Garlic, minced'),
                ingredientRow('1 cup', 'Dry white wine'),
                ingredientRow('1 can', 'San Marzano tomatoes'),
                ingredientRow('2 cups', 'Beef stock'),
              ],
            }),

            // Nutrition Facts
            frame('NutritionCard', {
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(WHITE)],
              cornerRadius: 16,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Nutrition Facts', { fontSize: 20, fontWeight: 700, color: DARK }),
                text('Per serving', { fontSize: 13, fontWeight: 400, color: MUTED }),
                rectangle('NDiv', { size: { x: 1, y: 2 }, fills: [solid(BROWN)], layoutSizingHorizontal: 'FILL' }),
                nutritionRow('Calories', '480', '24%'),
                nutritionRow('Total Fat', '18g', '23%'),
                nutritionRow('Protein', '42g', '84%'),
                nutritionRow('Carbs', '28g', '10%'),
                nutritionRow('Fiber', '4g', '14%'),
                nutritionRow('Sodium', '680mg', '30%'),
              ],
            }),
          ],
        }),

        // Right Column: Instructions
        frame('RightColumn', {
          autoLayout: vertical({ spacing: 16, padY: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Instructions', { fontSize: 24, fontWeight: 700, color: DARK }),
            frame('Steps', {
              autoLayout: vertical({ spacing: 4 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                stepItem(1, 'Season veal shanks with salt and pepper, then dredge in flour, shaking off excess.'),
                stepItem(2, 'Heat olive oil in a large Dutch oven over medium-high heat. Sear shanks until golden brown on all sides, about 4 minutes per side. Remove and set aside.'),
                stepItem(3, 'In the same pot, sauté onion, carrots, and celery until softened, about 5 minutes. Add garlic and cook for 1 minute.'),
                stepItem(4, 'Pour in white wine and scrape up any browned bits from the bottom. Let reduce by half.'),
                stepItem(5, 'Add crushed tomatoes and beef stock. Return shanks to pot. Bring to a simmer.'),
                stepItem(6, 'Cover and transfer to a 325°F oven. Braise for 2 hours, or until meat is fork-tender and falling off the bone.'),
                stepItem(7, 'Prepare gremolata by mixing together lemon zest, minced garlic, and fresh parsley.'),
                stepItem(8, 'Serve osso buco over saffron risotto, spooning sauce over top. Garnish with gremolata.'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
