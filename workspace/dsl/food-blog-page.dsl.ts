/**
 * Food Blog — Featured post, recipe grid, and categories
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function recipeCard(title: string, time: string, difficulty: string, color: string) {
  return frame(`Recipe: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 14, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('RecipeImage', { size: { x: 200, y: 120 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#f97316', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
      text(title, { fontSize: 14, fontWeight: 600, color: '#1a1a2e' }),
      frame('Meta', { autoLayout: horizontal({ spacing: 8 }), children: [
        text(`⏱ ${time}`, { fontSize: 11, fontWeight: 500, color: '#64748b' }),
        frame('DiffBadge', { autoLayout: horizontal({ padX: 8, padY: 2 }), fills: [solid('#fef3c7')], cornerRadius: 9999, children: [text(difficulty, { fontSize: 10, fontWeight: 600, color: '#d97706' })] }),
      ] }),
    ],
  });
}

function categoryChip(label: string, active: boolean) {
  return frame(`Cat: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 7 }),
    fills: [solid(active ? '#ea580c' : '#fff7ed')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: active ? '#ffffff' : '#c2410c' })],
  });
}

export default frame('FoodBlogPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fffbf5')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 48, padY: 18 }),
      fills: [solid('#ffffff')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Savory Stories', { fontSize: 22, fontWeight: 800, color: '#ea580c' }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Recipes', { fontSize: 13, fontWeight: 600, color: '#ea580c' }),
          text('About', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
          text('Newsletter', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
        ] }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Featured', {
          autoLayout: horizontal({ spacing: 24 }),
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            rectangle('FeaturedImage', { size: { x: 420, y: 260 }, fills: [gradient([{ hex: '#f97316', position: 0 }, { hex: '#dc2626', position: 1 }], 135)], cornerRadius: 16 }),
            frame('FeaturedText', { autoLayout: vertical({ spacing: 10, padY: 24, padX: 8 }), layoutSizingHorizontal: 'FILL', children: [
              frame('FeaturedBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid('#ea580c')], cornerRadius: 9999, children: [text('Featured Recipe', { fontSize: 10, fontWeight: 700, color: '#ffffff' })] }),
              text('Homemade Sourdough Bread', { fontSize: 22, fontWeight: 700, color: '#1a1a2e' }),
              text('A step-by-step guide to baking the perfect crusty loaf with a soft, tangy interior. Three days of patience, a lifetime of delicious bread.', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
              text('By Chef Maria Santos · 45 min prep · 3 hrs total', { fontSize: 12, fontWeight: 500, color: '#ea580c' }),
            ] }),
          ],
        }),
        frame('Categories', { autoLayout: horizontal({ spacing: 8 }), children: [
          categoryChip('All', false), categoryChip('Dinner', true), categoryChip('Baking', false),
          categoryChip('Salads', false), categoryChip('Desserts', false), categoryChip('Quick Meals', false),
        ] }),
        frame('RecipeGrid', {
          autoLayout: horizontal({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            recipeCard('Truffle Risotto', '40 min', 'Medium', '#7c3aed'),
            recipeCard('Thai Green Curry', '30 min', 'Easy', '#16a34a'),
            recipeCard('Lemon Tart', '1 hr', 'Hard', '#eab308'),
            recipeCard('Caesar Salad', '15 min', 'Easy', '#22d3ee'),
          ],
        }),
      ],
    }),
  ],
});
