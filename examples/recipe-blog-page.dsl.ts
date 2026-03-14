import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: cookpad.com style — White/warm, recipe step cards, ingredient lists, user avatars
const orange = '#f57c00'; const dark = '#2a2420'; const white = '#ffffff'; const cream = '#faf6f0';
const med = '#7a7068'; const green = '#43a047'; const warmGray = '#e0d8d0';

function recipeCard(title: string, author: string, time: string, difficulty: string, g1: string, g2: string) {
  return frame(`Recipe: ${title}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 280, y: undefined }, cornerRadius: 8, clipContent: true,
    fills: [solid(white)],
    children: [
      rectangle('RecipeImg', { size: { x: 280, y: 180 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('RecipeInfo', { autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 14, fontWeight: 600, color: dark }),
        frame('AuthorRow', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
          ellipse('Avatar', { size: { x: 20, y: 20 }, fills: [solid(orange, 0.15)] }),
          text(author, { fontSize: 11, fontWeight: 400, color: med }),
        ]}),
        frame('MetaRow', { autoLayout: horizontal({ spacing: 10 }), children: [
          frame('TimeBadge', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(orange, 0.1)], cornerRadius: 4,
            children: [text(time, { fontSize: 10, fontWeight: 500, color: orange })] }),
          frame('DiffBadge', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(green, 0.1)], cornerRadius: 4,
            children: [text(difficulty, { fontSize: 10, fontWeight: 500, color: green })] }),
        ]}),
      ]}),
    ],
  });
}

function stepItem(num: string, instruction: string) {
  return frame(`Step ${num}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 4,
    children: [
      frame('StepNum', { autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(orange)], cornerRadius: 9999,
        children: [text(num, { fontSize: 11, fontWeight: 700, color: white })] }),
      text(instruction, { fontSize: 12, fontWeight: 400, color: dark, layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

export default frame('RecipeBlog', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('Cookpad', { fontSize: 20, fontWeight: 700, color: orange }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Recipes', { fontSize: 12, fontWeight: 500, color: dark }),
          text('Popular', { fontSize: 12, fontWeight: 400, color: med }),
          text('Seasonal', { fontSize: 12, fontWeight: 400, color: med }),
          text('Quick Meals', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('FeaturedRecipe', {
      autoLayout: horizontal({ padX: 48, padY: 28, spacing: 32 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        rectangle('FeaturedImg', { size: { x: 400, y: 300 },
          fills: [gradient([{ hex: '#f57c00', position: 0 }, { hex: '#e65100', position: 0.5 }, { hex: '#bf360c', position: 1 }], 135)], cornerRadius: 8 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
          frame('FeaturedTag', { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(orange)], cornerRadius: 4,
            children: [text('FEATURED RECIPE', { fontSize: 9, fontWeight: 700, color: white, letterSpacing: { value: 1, unit: 'PIXELS' as const } })] }),
          text('Oyakodon — Chicken and Egg Rice Bowl', { fontSize: 22, fontWeight: 600, color: dark }),
          text('The ultimate Japanese comfort food. Tender chicken simmered in dashi and sweet soy, finished with silky half-set eggs over steaming rice.', { fontSize: 13, fontWeight: 400, color: med, size: { x: 400 }, textAutoResize: 'HEIGHT' as const }),
          frame('Steps', { autoLayout: vertical({ spacing: 6 }), layoutSizingHorizontal: 'FILL', children: [
            text('Steps', { fontSize: 13, fontWeight: 600, color: dark }),
            stepItem('1', 'Slice onion thinly. Cut chicken thigh into bite-sized pieces.'),
            stepItem('2', 'Simmer dashi, soy sauce, mirin, and sugar. Add onion and chicken.'),
            stepItem('3', 'Beat eggs lightly. Pour over the simmered chicken mixture.'),
            stepItem('4', 'Cover and cook until eggs are just set. Serve over hot rice.'),
          ]}),
        ]}),
      ],
    }),
    frame('PopularRecipes', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular This Week', { fontSize: 18, fontWeight: 600, color: dark }),
        frame('RecipeGrid', { autoLayout: horizontal({ spacing: 14 }), children: [
          recipeCard('Miso Soup', 'Yuko K.', '15 min', 'Easy', '#c8a060', '#e8c888'),
          recipeCard('Tonkatsu', 'Hiroshi T.', '40 min', 'Medium', '#a08060', '#c8a888'),
          recipeCard('Tamagoyaki', 'Sakura M.', '10 min', 'Easy', '#e8d060', '#f0e088'),
          recipeCard('Curry Rice', 'Kenji H.', '60 min', 'Easy', '#a07040', '#c89868'),
        ]}),
      ],
    }),
  ],
});
