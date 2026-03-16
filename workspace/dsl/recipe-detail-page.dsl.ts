/**
 * Recipe Detail — Single recipe with ingredients list, step-by-step instructions, nutrition
 * DSL features: hero gradient, numbered steps, ingredient list, pill tags, time badges
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function metaBadge(icon: string, value: string, label: string) {
  return frame(`Meta: ${label}`, {
    autoLayout: vertical({ spacing: 3, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid('#fff7ed')], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 18, fontWeight: 400, color: '#ea580c' }),
      text(value, { fontSize: 15, fontWeight: 700, color: '#111827' }),
      text(label, { fontSize: 10, fontWeight: 500, color: '#9ca3af' }),
    ],
  });
}

function ingredientItem(item: string, amount: string) {
  return frame(`Ing: ${item}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(item, { fontSize: 14, fontWeight: 400, color: '#374151', layoutSizingHorizontal: 'FILL' }),
      text(amount, { fontSize: 13, fontWeight: 600, color: '#ea580c' }),
    ],
  });
}

function stepItem(num: number, instruction: string) {
  return frame(`Step: ${num}`, {
    autoLayout: horizontal({ spacing: 12, padY: 10 }), layoutSizingHorizontal: 'FILL',
    children: [
      frame('StepNum', {
        size: { x: 28, y: 28 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ea580c')], cornerRadius: 9999,
        children: [text(String(num), { fontSize: 13, fontWeight: 700, color: '#ffffff' })],
      }),
      text(instruction, {
        fontSize: 14, fontWeight: 400, color: '#374151',
        size: { x: 440 }, textAutoResize: 'HEIGHT', lineHeight: { value: 160, unit: 'PERCENT' },
      }),
    ],
  });
}

export default frame('RecipeDetailPage', {
  size: { x: 800 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    rectangle('HeroImage', {
      size: { x: 800, y: 260 },
      fills: [gradient([{ hex: '#ea580c', position: 0 }, { hex: '#f97316', position: 0.5 }, { hex: '#fbbf24', position: 1 }], 135)],
    }),
    frame('RecipeHeader', {
      autoLayout: vertical({ spacing: 8, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Tags', {
          autoLayout: horizontal({ spacing: 6 }),
          children: [
            frame('Tag1', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#fef3c7')], cornerRadius: 9999, children: [text('Italian', { fontSize: 11, fontWeight: 600, color: '#d97706' })] }),
            frame('Tag2', { autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }), fills: [solid('#dcfce7')], cornerRadius: 9999, children: [text('Vegetarian', { fontSize: 11, fontWeight: 600, color: '#16a34a' })] }),
          ],
        }),
        text('Tuscan Sun-Dried Tomato Pasta', { fontSize: 28, fontWeight: 800, color: '#111827' }),
        text('A rich and creamy pasta with sun-dried tomatoes, fresh basil, and parmesan.', {
          fontSize: 14, fontWeight: 400, color: '#6b7280',
          size: { x: 720 }, textAutoResize: 'HEIGHT', lineHeight: { value: 150, unit: 'PERCENT' },
        }),
      ],
    }),
    frame('MetaRow', {
      autoLayout: horizontal({ spacing: 10, padX: 40, padY: 8 }), layoutSizingHorizontal: 'FILL',
      children: [
        metaBadge('⏱', '35 min', 'Total Time'),
        metaBadge('🍽', '4', 'Servings'),
        metaBadge('📊', 'Easy', 'Difficulty'),
        metaBadge('🔥', '420', 'Calories'),
      ],
    }),
    frame('ContentArea', {
      autoLayout: horizontal({ spacing: 28, padX: 40, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Ingredients', {
          size: { x: 220 },
          autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
          fills: [solid('#fafafa')], cornerRadius: 12,
          children: [
            text('Ingredients', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            ingredientItem('Penne pasta', '400g'),
            ingredientItem('Sun-dried tomatoes', '1 cup'),
            ingredientItem('Heavy cream', '1 cup'),
            ingredientItem('Parmesan cheese', '½ cup'),
            ingredientItem('Fresh basil', '¼ cup'),
            ingredientItem('Garlic cloves', '3'),
            ingredientItem('Olive oil', '2 tbsp'),
          ],
        }),
        frame('Steps', {
          autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('Instructions', { fontSize: 16, fontWeight: 700, color: '#111827' }),
            stepItem(1, 'Cook penne pasta according to package directions. Drain and reserve ½ cup pasta water.'),
            stepItem(2, 'Heat olive oil in a large skillet. Add garlic and cook until fragrant, about 1 minute.'),
            stepItem(3, 'Add sun-dried tomatoes and cook for 2 minutes. Pour in heavy cream and simmer gently.'),
            stepItem(4, 'Stir in parmesan until melted. Add pasta water if too thick.'),
            stepItem(5, 'Toss in pasta, garnish with fresh basil, and serve immediately.'),
          ],
        }),
      ],
    }),
  ],
});
