import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const cream = '#fff8e1';
const brown = '#5d4037';
const brownLight = '#8d6e63';
const orange = '#ff9800';
const green = '#689f38';
const white = '#ffffff';
const darkText = '#3e2723';
const mutedText = '#795548';

// Time badge
function timeBadge(duration: string) {
  return frame('TimeBadge', {
    autoLayout: horizontal({ padX: 10, padY: 4, spacing: 4, counterAlign: 'CENTER' }),
    fills: [solid(orange, 0.15)],
    cornerRadius: 9999,
    children: [
      ellipse('ClockDot', { size: { x: 6, y: 6 }, fills: [solid(orange)] }),
      text(duration, { fontSize: 11, fontWeight: 600, color: orange }),
    ],
  });
}

// Step number badge
function stepBadge(num: number) {
  return frame(`Step ${num}`, {
    autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(green)],
    cornerRadius: 14,
    size: { x: 28, y: 28 },
    children: [
      text(`${num}`, { fontSize: 13, fontWeight: 700, color: white }),
    ],
  });
}

// Ingredient list item
function ingredientRow(name: string, amount: string) {
  return frame(`Ingredient: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.88, g: 0.82, b: 0.73, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 14, fontWeight: 400, color: darkText }),
      text(amount, { fontSize: 14, fontWeight: 600, color: brown }),
    ],
  });
}

// Recipe card (tall with image area)
function recipeCard(title: string, description: string, time: string, difficulty: string, gradColors: [string, string]) {
  return frame(`Recipe: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 300, y: undefined },
    fills: [solid(white)],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 0.88, g: 0.82, b: 0.73, a: 0.5 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Image placeholder with gradient
      rectangle('Image', {
        size: { x: 300, y: 180 },
        fills: [gradient([
          { hex: gradColors[0], position: 0 },
          { hex: gradColors[1], position: 1 },
        ], 135)],
      }),
      // Content
      frame('Content', {
        autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('Badges', {
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              timeBadge(time),
              frame('DiffBadge', {
                autoLayout: horizontal({ padX: 10, padY: 4 }),
                fills: [solid(green, 0.15)],
                cornerRadius: 9999,
                children: [
                  text(difficulty, { fontSize: 11, fontWeight: 600, color: green }),
                ],
              }),
            ],
          }),
          text(title, {
            fontSize: 18,
            fontWeight: 700,
            color: darkText,
            lineHeight: { value: 130, unit: 'PERCENT' as const },
          }),
          text(description, {
            fontSize: 13,
            fontWeight: 400,
            color: mutedText,
            lineHeight: { value: 150, unit: 'PERCENT' as const },
            size: { x: 268 },
            textAutoResize: 'HEIGHT' as const,
          }),
        ],
      }),
    ],
  });
}

// Category tab
function categoryTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: active ? [solid(brown)] : [solid(white)],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.78, g: 0.72, b: 0.63, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? white : brownLight }),
    ],
  });
}

export default frame('RecipeCookbook', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: { r: 0.88, g: 0.82, b: 0.73, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('The Kitchen', {
          fontSize: 24,
          fontWeight: 700,
          color: brown,
          letterSpacing: { value: -0.5, unit: 'PIXELS' as const },
        }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Recipes', { fontSize: 15, fontWeight: 600, color: brown }),
            text('Meal Plans', { fontSize: 15, fontWeight: 400, color: brownLight }),
            text('Favorites', { fontSize: 15, fontWeight: 400, color: brownLight }),
          ],
        }),
      ],
    }),

    // Category tabs
    frame('CategoryTabs', {
      autoLayout: horizontal({ spacing: 10, padX: 48, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryTab('All Recipes', true),
        categoryTab('Breakfast', false),
        categoryTab('Lunch', false),
        categoryTab('Dinner', false),
        categoryTab('Desserts', false),
      ],
    }),

    // Recipe cards grid
    frame('RecipeGrid', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Recipes', {
          fontSize: 28,
          fontWeight: 700,
          color: darkText,
          letterSpacing: { value: -0.5, unit: 'PIXELS' as const },
        }),
        frame('Row', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            recipeCard('Classic Pancakes', 'Fluffy buttermilk pancakes served with maple syrup and fresh berries.', '25 min', 'Easy', ['#f9a825', '#ff8f00']),
            recipeCard('Grilled Salmon', 'Herb-crusted salmon with lemon butter sauce and roasted vegetables.', '35 min', 'Medium', ['#ef6c00', '#d84315']),
            recipeCard('Caesar Salad', 'Crisp romaine lettuce with homemade croutons and parmesan dressing.', '15 min', 'Easy', ['#558b2f', '#33691e']),
            recipeCard('Chocolate Lava Cake', 'Rich molten chocolate cake with a gooey center and vanilla ice cream.', '45 min', 'Hard', ['#4e342e', '#3e2723']),
          ],
        }),
      ],
    }),

    // Featured recipe with ingredients
    frame('FeaturedRecipe', {
      autoLayout: horizontal({ spacing: 32, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        // Recipe image placeholder
        rectangle('FeaturedImage', {
          size: { x: 480, y: 320 },
          fills: [gradient([
            { hex: '#ff6f00', position: 0 },
            { hex: '#e65100', position: 1 },
          ], 135)],
          cornerRadius: 16,
        }),
        // Recipe details
        frame('FeaturedDetails', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('FeaturedBadges', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [timeBadge('30 min'), stepBadge(1), stepBadge(2), stepBadge(3)],
            }),
            text('Rustic Tomato Soup', { fontSize: 28, fontWeight: 700, color: darkText }),
            text('A hearty homestyle tomato soup made with roasted tomatoes, fresh basil, and a touch of cream. Perfect for cozy evenings.', {
              fontSize: 15,
              fontWeight: 400,
              color: mutedText,
              lineHeight: { value: 160, unit: 'PERCENT' as const },
              size: { x: 500 },
              textAutoResize: 'HEIGHT' as const,
            }),
            frame('IngredientList', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Ingredients', { fontSize: 16, fontWeight: 600, color: brown }),
                ingredientRow('Roma Tomatoes', '6 large'),
                ingredientRow('Fresh Basil', '1 bunch'),
                ingredientRow('Heavy Cream', '1/2 cup'),
                ingredientRow('Garlic Cloves', '4'),
                ingredientRow('Olive Oil', '3 tbsp'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
