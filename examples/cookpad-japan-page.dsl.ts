import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: cookpad.com — Recipe sharing platform, warm orange, step-based recipes
// Features stressed: numbered badges, text decoration, lineHeight, CJK text, nested auto-layout

const cookpadOrange = '#F48C06';
const white = '#ffffff';
const dark = '#2d2d2d';
const gray = '#777777';
const lightBg = '#FFF8F0';
const green = '#2D8B4E';

function stepCard(num: number, instruction: string) {
  return frame(`Step${num}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 12, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL' as const,
    fills: [solid(white)],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.9, g: 0.88, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('StepNum', {
        autoLayout: horizontal({ padX: 10, padY: 6 }),
        fills: [solid(cookpadOrange)],
        cornerRadius: 9999,
        children: [text(String(num), { fontSize: 14, fontWeight: 700, color: white })],
      }),
      text(instruction, {
        fontSize: 14, fontWeight: 400, color: dark,
        lineHeight: { value: 22, unit: 'PIXELS' as const },
        textAutoResize: 'HEIGHT' as const,
      }),
    ],
  });
}

function ingredientRow(name: string, amount: string) {
  return frame(`Ing:${name}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL' as const,
    strokes: [{ color: { r: 0.92, g: 0.9, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 14, fontWeight: 400, color: dark }),
      text(amount, { fontSize: 14, fontWeight: 400, color: gray }),
    ],
  });
}

function tagPill(label: string) {
  return frame(`Tag:${label}`, {
    autoLayout: horizontal({ padX: 10, padY: 4 }),
    fills: [solid(cookpadOrange, 0.1)],
    cornerRadius: 9999,
    strokes: [{ color: { r: 0.96, g: 0.55, b: 0.02, a: 0.3 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 11, fontWeight: 500, color: cookpadOrange })],
  });
}

export default frame('CookpadPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(lightBg)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid(white)],
      strokes: [{ color: { r: 0.92, g: 0.9, b: 0.87, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('クックパッド', { fontSize: 22, fontWeight: 700, color: cookpadOrange }),
        frame('SearchBar', {
          autoLayout: horizontal({ padX: 16, padY: 10, counterAlign: 'CENTER' }),
          size: { x: 500, y: undefined },
          fills: [solid('#FFF5E6')],
          cornerRadius: 24,
          strokes: [{ color: { r: 0.96, g: 0.55, b: 0.02, a: 0.3 }, weight: 1, align: 'INSIDE' as const }],
          children: [text('レシピを検索...', { fontSize: 14, fontWeight: 400, color: gray })],
        }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('レシピを書く', { fontSize: 13, fontWeight: 600, color: cookpadOrange }),
            text('ログイン', { fontSize: 13, fontWeight: 400, color: dark }),
          ],
        }),
      ],
    }),
    // Popular tags
    frame('TagsBar', {
      autoLayout: horizontal({ spacing: 8, padX: 40, padY: 12 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        text('人気のキーワード:', { fontSize: 12, fontWeight: 500, color: gray }),
        tagPill('時短'),
        tagPill('作り置き'),
        tagPill('お弁当'),
        tagPill('節約'),
        tagPill('パスタ'),
        tagPill('鶏むね肉'),
        tagPill('スープ'),
      ],
    }),
    // Main content — recipe detail
    frame('RecipeContent', {
      autoLayout: horizontal({ spacing: 32, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL' as const,
      children: [
        // Recipe main
        frame('RecipeMain', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 800, y: undefined },
          children: [
            // Recipe header
            frame('RecipeHeader', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(white)],
              cornerRadius: 12,
              children: [
                rectangle('RecipeImg', { size: { x: 752, y: 400 }, fills: [solid('#E8E0D8')], cornerRadius: 8 }),
                text('絶品！本格チキンカレー', { fontSize: 24, fontWeight: 700, color: dark }),
                text('スパイスから作る本格的なチキンカレーです。玉ねぎをじっくり炒めることで甘みとコクが出ます。', {
                  fontSize: 14, fontWeight: 400, color: gray,
                  lineHeight: { value: 22, unit: 'PIXELS' as const },
                }),
                frame('RecipeMeta', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    text('調理時間: 45分', { fontSize: 13, fontWeight: 400, color: gray }),
                    text('4人前', { fontSize: 13, fontWeight: 400, color: gray }),
                    frame('ReportCount', {
                      autoLayout: horizontal({ spacing: 4 }),
                      children: [
                        text('つくれぽ', { fontSize: 13, fontWeight: 500, color: cookpadOrange }),
                        text('1,234件', { fontSize: 13, fontWeight: 700, color: cookpadOrange }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // Steps
            frame('StepsSection', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(white)],
              cornerRadius: 12,
              children: [
                text('作り方', { fontSize: 18, fontWeight: 700, color: dark, textDecoration: 'UNDERLINE' }),
                stepCard(1, '玉ねぎをみじん切りにし、飴色になるまで中火で15分炒める。'),
                stepCard(2, '鶏もも肉を一口大に切り、塩こしょうで下味をつける。'),
                stepCard(3, 'スパイス（クミン、コリアンダー、ターメリック、チリ）を加えて1分炒める。'),
                stepCard(4, 'トマト缶を加え、水200mlを足して中火で20分煮込む。'),
                stepCard(5, '塩で味を調え、仕上げにガラムマサラを加えて完成。'),
              ],
            }),
          ],
        }),
        // Sidebar
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 340, y: undefined },
          children: [
            // Ingredients card
            frame('IngredientsCard', {
              autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(white)],
              cornerRadius: 12,
              clipContent: true,
              children: [
                frame('IngHeader', {
                  autoLayout: horizontal({ padX: 16, padY: 12 }),
                  layoutSizingHorizontal: 'FILL' as const,
                  fills: [solid(cookpadOrange)],
                  children: [text('材料（4人前）', { fontSize: 16, fontWeight: 700, color: white })],
                }),
                ingredientRow('鶏もも肉', '400g'),
                ingredientRow('玉ねぎ', '2個'),
                ingredientRow('トマト缶', '1缶'),
                ingredientRow('クミンパウダー', '小さじ2'),
                ingredientRow('コリアンダー', '小さじ1'),
                ingredientRow('ターメリック', '小さじ1'),
                ingredientRow('チリパウダー', '小さじ1/2'),
                ingredientRow('ガラムマサラ', '小さじ1'),
                ingredientRow('塩', '適量'),
                ingredientRow('サラダ油', '大さじ2'),
              ],
            }),
            // Author card
            frame('AuthorCard', {
              autoLayout: horizontal({ spacing: 12, padX: 16, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL' as const,
              fills: [solid(white)],
              cornerRadius: 12,
              children: [
                ellipse('Avatar', { size: { x: 48, y: 48 }, fills: [solid(cookpadOrange, 0.2)] }),
                frame('AuthorInfo', {
                  autoLayout: vertical({ spacing: 2 }),
                  children: [
                    text('カレー好きママ', { fontSize: 14, fontWeight: 600, color: dark }),
                    text('レシピ数: 87', { fontSize: 12, fontWeight: 400, color: gray }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Footer
    frame('Footer', {
      autoLayout: vertical({ spacing: 6, padX: 40, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL' as const,
      fills: [solid('#3D3226')],
      children: [
        text('クックパッド株式会社', { fontSize: 12, fontWeight: 400, color: '#aa9988' }),
        text('© Cookpad Inc.', { fontSize: 11, fontWeight: 400, color: '#887766' }),
      ],
    }),
  ],
});
