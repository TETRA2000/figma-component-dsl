import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const tomato = '#dc2626'; const white = '#ffffff'; const bg = '#fef2f2'; const dark = '#1c1917';
const med = '#78716c'; const amber = '#f59e0b'; const green = '#16a34a';

function recipeCard(title: string, author: string, time: string, difficulty: string, rating: string, g1: string, g2: string) {
  return frame(`Recipe: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 300, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(white)],
    children: [
      frame('RecipeImg', { size: { x: 300, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
        autoLayout: horizontal({ padX: 10, padY: 10, align: 'SPACE_BETWEEN' }),
        children: [
          frame('TimeBadge', { autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid('#00000066')], cornerRadius: 6,
            children: [text(time, { fontSize: 11, fontWeight: 600, color: white })] }),
          frame('DiffBadge', { autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(white)], cornerRadius: 6,
            children: [text(difficulty, { fontSize: 11, fontWeight: 500, color: dark })] }),
        ],
      }),
      frame('RecipeInfo', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 16, fontWeight: 600, color: dark }),
        frame('AuthorRating', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          frame('Author', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
            ellipse('Avatar', { size: { x: 20, y: 20 }, fills: [solid(tomato, 0.15)] }),
            text(author, { fontSize: 12, fontWeight: 400, color: med }),
          ]}),
          frame('Rating', { autoLayout: horizontal({ spacing: 3, counterAlign: 'CENTER' }), children: [
            ellipse('Star', { size: { x: 12, y: 12 }, fills: [solid(amber)] }),
            text(rating, { fontSize: 12, fontWeight: 600, color: amber }),
          ]}),
        ]}),
      ]}),
    ],
  });
}

export default frame('RecipeSharing', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('TastyBites', { fontSize: 22, fontWeight: 700, color: tomato }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Recipes', { fontSize: 14, fontWeight: 600, color: tomato }),
          text('Meal Plans', { fontSize: 14, fontWeight: 400, color: med }),
          text('Community', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
        frame('ShareBtn', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(tomato)], cornerRadius: 8,
          children: [text('Share Recipe', { fontSize: 13, fontWeight: 600, color: white })] }),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#991b1b', position: 0 }, { hex: '#dc2626', position: 0.5 }, { hex: '#f87171', position: 1 }], 135)],
      children: [
        text('Discover Delicious Recipes', { fontSize: 34, fontWeight: 700, color: white }),
        text('Share your creations with food lovers worldwide', { fontSize: 15, fontWeight: 400, color: '#fecaca' }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 10, spacing: 10, counterAlign: 'CENTER' }), fills: [solid(white)], cornerRadius: 10,
          size: { x: 500, y: undefined },
          children: [
            text('Search recipes, ingredients...', { fontSize: 14, fontWeight: 400, color: med }),
          ],
        }),
      ],
    }),
    frame('Categories', {
      autoLayout: horizontal({ spacing: 12, padX: 48, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('CatBreakfast', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(tomato)], cornerRadius: 9999, children: [text('Breakfast', { fontSize: 13, fontWeight: 600, color: white })] }),
        frame('CatLunch', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(white)], cornerRadius: 9999, children: [text('Lunch', { fontSize: 13, fontWeight: 400, color: med })] }),
        frame('CatDinner', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(white)], cornerRadius: 9999, children: [text('Dinner', { fontSize: 13, fontWeight: 400, color: med })] }),
        frame('CatDessert', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(white)], cornerRadius: 9999, children: [text('Desserts', { fontSize: 13, fontWeight: 400, color: med })] }),
        frame('CatVegan', { autoLayout: horizontal({ padX: 16, padY: 8 }), fills: [solid(white)], cornerRadius: 9999, children: [text('Vegan', { fontSize: 13, fontWeight: 400, color: med })] }),
      ],
    }),
    frame('RecipeGrid', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 8 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Trending Recipes', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('Row', { autoLayout: horizontal({ spacing: 16 }), children: [
          recipeCard('Avocado Toast Supreme', 'Chef Maria', '15 min', 'Easy', '4.9', '#22c55e', '#16a34a'),
          recipeCard('Spicy Korean Bibimbap', 'Kim Ji-yeon', '45 min', 'Medium', '4.8', '#dc2626', '#ea580c'),
          recipeCard('Classic French Croissant', 'Pierre Blanc', '3 hours', 'Hard', '4.7', '#f59e0b', '#d97706'),
          recipeCard('Thai Green Curry', 'Suda Patel', '30 min', 'Medium', '4.8', '#059669', '#047857'),
        ]}),
      ],
    }),
  ],
});
