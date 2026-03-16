/**
 * Recipe Detail — Single recipe page with hero, ingredients checklist, step-by-step instructions
 * DSL features stressed: warm color palette, gradient hero placeholder, numbered step cards,
 * checkbox-style ingredient list, nutrition grid, ellipse timer icon, print-friendly layout
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function ingredientItem(ingredient: string, amount: string, checked: boolean) {
  return frame(`Ingredient: ${ingredient}`, {
    autoLayout: horizontal({ spacing: 10, padY: 6, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Checkbox', {
        size: { x: 20, y: 20 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(checked ? '#ea580c' : '#ffffff')],
        cornerRadius: 6,
        strokes: checked ? [] : [{ color: { r: 0.82, g: 0.82, b: 0.82, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
        children: checked ? [text('✓', { fontSize: 12, fontWeight: 700, color: '#ffffff' })] : [],
      }),
      text(amount, { fontSize: 13, fontWeight: 600, color: '#374151', size: { x: 80 } }),
      text(ingredient, { fontSize: 14, fontWeight: 400, color: checked ? '#9ca3af' : '#1f2937', textDecoration: checked ? 'STRIKETHROUGH' : 'NONE' }),
    ],
  });
}

function stepCard(stepNumber: number, instruction: string, tip?: string) {
  return frame(`Step ${stepNumber}`, {
    autoLayout: horizontal({ spacing: 14, padX: 18, padY: 16 }),
    fills: [solid('#fff7ed')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNumber', {
        size: { x: 36, y: 36 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ea580c')],
        cornerRadius: 9999,
        children: [
          text(String(stepNumber), { fontSize: 15, fontWeight: 700, color: '#ffffff' }),
        ],
      }),
      frame('StepContent', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(instruction, { fontSize: 14, fontWeight: 400, color: '#374151', lineHeight: { value: 155, unit: 'PERCENT' }, size: { x: 600 }, textAutoResize: 'HEIGHT' }),
          ...(tip ? [text(`💡 Tip: ${tip}`, { fontSize: 12, fontWeight: 500, color: '#ea580c' })] : []),
        ],
      }),
    ],
  });
}

function nutritionItem(label: string, value: string, unit: string) {
  return frame(`Nutrition: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#fff7ed')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 20, fontWeight: 700, color: '#ea580c', textAlignHorizontal: 'CENTER' }),
      text(unit, { fontSize: 10, fontWeight: 500, color: '#9ca3af', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 12, fontWeight: 500, color: '#374151', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function metaItem(icon: string, label: string, value: string) {
  return frame(`Meta: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      ellipse('MetaIcon', { size: { x: 28, y: 28 }, fills: [solid('#ea580c1a')] }),
      frame('MetaText', {
        autoLayout: vertical({ spacing: 0 }),
        children: [
          text(label, { fontSize: 10, fontWeight: 500, color: '#9ca3af' }),
          text(value, { fontSize: 13, fontWeight: 600, color: '#374151' }),
        ],
      }),
    ],
  });
}

export default frame('RecipeDetailPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Hero
    rectangle('HeroImage', {
      size: { x: 800, y: 320 },
      fills: [gradient([{ hex: '#ea580c', position: 0 }, { hex: '#f97316', position: 0.3 }, { hex: '#fdba74', position: 0.7 }, { hex: '#fff7ed', position: 1 }], 160)],
    }),

    // Recipe header
    frame('RecipeHeader', {
      autoLayout: vertical({ spacing: 12, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('CategoryBadge', {
          autoLayout: horizontal({ spacing: 0, padX: 12, padY: 4 }),
          fills: [solid('#ea580c')],
          cornerRadius: 9999,
          children: [
            text('ITALIAN', { fontSize: 10, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
        text('Creamy Tuscan Chicken Pasta', { fontSize: 28, fontWeight: 700, color: '#1f2937' }),
        text('A rich and flavorful one-pan pasta with sun-dried tomatoes, spinach, and a creamy garlic parmesan sauce. Perfect for weeknight dinners.', {
          fontSize: 14, fontWeight: 400, color: '#6b7280',
          lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 680 },
          textAutoResize: 'HEIGHT',
        }),
        frame('RecipeMeta', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            metaItem('⏱', 'Prep Time', '15 min'),
            metaItem('🔥', 'Cook Time', '25 min'),
            metaItem('🍽', 'Servings', '4'),
            metaItem('📊', 'Difficulty', 'Easy'),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: horizontal({ spacing: 28, padX: 36, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Instructions column
        frame('InstructionsCol', {
          autoLayout: vertical({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Instructions', { fontSize: 20, fontWeight: 700, color: '#1f2937' }),
            stepCard(1, 'Season chicken breasts with salt, pepper, and Italian seasoning. Sear in a hot skillet with olive oil for 6-7 minutes per side until golden brown and cooked through. Remove and set aside.', 'Pat chicken dry for the best sear.'),
            stepCard(2, 'In the same skillet, add minced garlic and cook for 30 seconds until fragrant. Add sun-dried tomatoes and cook for 2 minutes.'),
            stepCard(3, 'Pour in chicken broth and heavy cream. Stir well and bring to a gentle simmer. Add the pasta and cook according to package directions, stirring occasionally.'),
            stepCard(4, 'Add fresh spinach and grated parmesan cheese. Stir until spinach wilts and cheese melts into the sauce. Slice the chicken and place on top.', 'Reserve a little pasta water to adjust consistency.'),
            stepCard(5, 'Garnish with fresh basil, a crack of black pepper, and extra parmesan. Serve immediately.'),
          ],
        }),

        // Sidebar: ingredients + nutrition
        frame('Sidebar', {
          size: { x: 260 },
          autoLayout: vertical({ spacing: 20 }),
          children: [
            // Ingredients
            frame('IngredientsCard', {
              autoLayout: vertical({ spacing: 8, padX: 18, padY: 18 }),
              fills: [solid('#fafafa')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Ingredients', { fontSize: 16, fontWeight: 700, color: '#1f2937' }),
                ingredientItem('Chicken breasts', '2 lbs', true),
                ingredientItem('Penne pasta', '12 oz', true),
                ingredientItem('Heavy cream', '1 cup', false),
                ingredientItem('Parmesan', '1/2 cup', false),
                ingredientItem('Sun-dried tomatoes', '1/3 cup', false),
                ingredientItem('Fresh spinach', '3 cups', false),
                ingredientItem('Garlic cloves', '4', false),
                ingredientItem('Chicken broth', '1 cup', false),
                ingredientItem('Italian seasoning', '1 tsp', false),
              ],
            }),

            // Nutrition
            frame('NutritionCard', {
              autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
              fills: [solid('#fafafa')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [
                text('Nutrition per serving', { fontSize: 14, fontWeight: 700, color: '#1f2937' }),
                frame('NutritionGrid', {
                  autoLayout: horizontal({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    nutritionItem('Calories', '485', 'kcal'),
                    nutritionItem('Protein', '38', 'g'),
                  ],
                }),
                frame('NutritionGrid2', {
                  autoLayout: horizontal({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    nutritionItem('Carbs', '42', 'g'),
                    nutritionItem('Fat', '18', 'g'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
