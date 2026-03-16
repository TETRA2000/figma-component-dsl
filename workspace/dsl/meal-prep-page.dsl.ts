/**
 * Meal Prep Planner — Weekly meal grid, nutrition breakdown, shopping list
 * DSL features: 7-column grid, nutrition bars with clipContent, nested sections, FILL sizing
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function dayMeal(day: string, meal: string, cal: string, color: string) {
  return frame(`Day:${day}`, {
    autoLayout: vertical({ spacing: 8, padX: 10, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('DayBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
        fills: [solid(color)],
        cornerRadius: 4,
        children: [text(day, { fontSize: 10, fontWeight: 700, color: '#ffffff' })],
      }),
      text(meal, { fontSize: 12, fontWeight: 500, color: '#374151', size: { x: 110 }, textAutoResize: 'HEIGHT' }),
      text(cal, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
    ],
  });
}

function nutritionBar(label: string, pct: number, color: string, value: string) {
  return frame(`Nut:${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('NutLabel', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 12, fontWeight: 500, color: '#374151' }),
          text(value, { fontSize: 12, fontWeight: 600, color: '#374151' }),
        ],
      }),
      frame('BarTrack', {
        size: { x: 300, y: 8 },
        fills: [solid('#f3f4f6')],
        cornerRadius: 4,
        layoutSizingHorizontal: 'FILL',
        clipContent: true,
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(300 * pct), y: 8 },
            fills: [solid(color)],
            cornerRadius: 4,
          }),
        ],
      }),
    ],
  });
}

function shoppingItem(item: string, qty: string) {
  return frame(`Shop:${item}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(item, { fontSize: 13, fontWeight: 400, color: '#374151' }),
      text(qty, { fontSize: 13, fontWeight: 600, color: '#6b7280' }),
    ],
  });
}

export default frame('MealPrepPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 28, padX: 40, padY: 36 }),
  fills: [solid('#f0fdf4')],
  children: [
    text('Weekly Meal Prep', { fontSize: 28, fontWeight: 700, color: '#14532d' }),
    text('Plan your meals, track nutrition, build your shopping list.', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
    frame('WeekGrid', {
      autoLayout: horizontal({ spacing: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        dayMeal('Mon', 'Grilled Chicken Bowl', '520 cal', '#22c55e'),
        dayMeal('Tue', 'Salmon & Quinoa', '610 cal', '#16a34a'),
        dayMeal('Wed', 'Veggie Stir Fry', '380 cal', '#15803d'),
        dayMeal('Thu', 'Turkey Wrap', '450 cal', '#22c55e'),
        dayMeal('Fri', 'Shrimp Pasta', '580 cal', '#16a34a'),
        dayMeal('Sat', 'Buddha Bowl', '420 cal', '#15803d'),
        dayMeal('Sun', 'Beef Tacos', '550 cal', '#22c55e'),
      ],
    }),
    frame('BottomSection', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Nutrition', {
          autoLayout: vertical({ spacing: 14, padX: 24, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Daily Nutrition Avg', { fontSize: 16, fontWeight: 600, color: '#14532d' }),
            nutritionBar('Protein', 0.72, '#22c55e', '108g'),
            nutritionBar('Carbs', 0.55, '#facc15', '165g'),
            nutritionBar('Fat', 0.4, '#f97316', '60g'),
            nutritionBar('Fiber', 0.65, '#8b5cf6', '26g'),
          ],
        }),
        frame('ShoppingList', {
          autoLayout: vertical({ spacing: 0, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Shopping List', { fontSize: 16, fontWeight: 600, color: '#14532d' }),
            shoppingItem('Chicken Breast', '1.5 lb'),
            shoppingItem('Salmon Fillet', '2 pcs'),
            shoppingItem('Quinoa', '1 cup'),
            shoppingItem('Brown Rice', '2 cups'),
            shoppingItem('Mixed Greens', '1 bag'),
            shoppingItem('Bell Peppers', '4 pcs'),
          ],
        }),
      ],
    }),
  ],
});
