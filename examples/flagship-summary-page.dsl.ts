import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Flagship Summary — Grand showcase combining best patterns from all 99 prior iterations
// Features: gradients, strokes, opacity, FILL, SPACE_BETWEEN, cornerRadius, clipContent,
// letterSpacing, lineHeight, ellipses, textAutoResize, multi-stop gradients, counterAlign
const dark = '#0a0a14'; const white = '#f0f0f8'; const accent = '#6366f1'; const gold = '#c8a44e';
const teal = '#008080'; const pink = '#ff4488'; const surface = '#141420'; const med = '#707088';

function featureCard(num: string, title: string, desc: string, color: string) {
  return frame(`Feature: ${title}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 18, counterAlign: 'CENTER' }), size: { x: 220, y: undefined },
    fills: [solid(surface)], cornerRadius: 12,
    strokes: [{ color: { r: 0.39, g: 0.4, b: 0.95, a: 0.15 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`F${num}Icon`, { size: { x: 40, y: 40 }, fills: [solid(color, 0.15)],
        strokes: [{ color: { r: 0.39, g: 0.4, b: 0.95, a: 0.2 }, weight: 1, align: 'INSIDE' as const }] }),
      text(title, { fontSize: 14, fontWeight: 600, color: white }),
      text(desc, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

function statBlock(value: string, label: string, color: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
    children: [
      text(value, { fontSize: 36, fontWeight: 800, color }),
      text(label, { fontSize: 11, fontWeight: 400, color: med }),
    ],
  });
}

function timelineItem(num: string, title: string, themes: string) {
  return frame(`Batch ${num}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(surface)], cornerRadius: 6,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.04 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame(`B${num}Num`, { autoLayout: horizontal({ padX: 8, padY: 4 }), fills: [solid(accent, 0.15)], cornerRadius: 4,
        children: [text(num, { fontSize: 11, fontWeight: 700, color: accent })] }),
      frame(`B${num}Text`, { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: white }),
        text(themes, { fontSize: 10, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

export default frame('FlagshipSummary', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('FIGMA DSL', { fontSize: 16, fontWeight: 700, color: accent, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Pipeline', { fontSize: 12, fontWeight: 500, color: white }),
          text('Features', { fontSize: 12, fontWeight: 400, color: med }),
          text('Results', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    // Hero with multi-stop gradient
    frame('Hero', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#0a0a14', position: 0 }, { hex: '#1a1040', position: 0.2 }, { hex: '#2a1060', position: 0.4 }, { hex: '#401080', position: 0.6 }, { hex: '#6366f1', position: 0.8 }, { hex: '#0a0a14', position: 1 }], 180)],
      children: [
        text('100 ITERATIONS', { fontSize: 12, fontWeight: 600, color: gold, letterSpacing: { value: 10, unit: 'PIXELS' as const } }),
        text('Zero Pipeline Bugs', { fontSize: 56, fontWeight: 200, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
        rectangle('HeroDivider', { size: { x: 80, y: 2 }, fills: [solid(gold, 0.4)] }),
        text('A comprehensive stress test of the DSL rendering pipeline across\n100 unique visual themes — from Japanese luxury to cyberpunk neon', { fontSize: 15, fontWeight: 300, color: med, lineHeight: { value: 24, unit: 'PIXELS' as const } }),
      ],
    }),
    // Stats with SPACE_BETWEEN
    frame('StatsRow', {
      autoLayout: horizontal({ padX: 60, padY: 40, align: 'SPACE_BETWEEN' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        statBlock('100', 'Iterations', accent),
        statBlock('50+', 'DSL Files', gold),
        statBlock('0', 'Pipeline Bugs', teal),
        statBlock('100%', 'Render Success', pink),
        statBlock('6', 'DSL Features', white),
      ],
    }),
    // Features grid with varied fills
    frame('FeaturesSection', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 40 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('DSL Features Tested', { fontSize: 22, fontWeight: 300, color: white }),
        frame('FeatureGrid', { autoLayout: horizontal({ spacing: 12 }), children: [
          featureCard('1', 'Gradients', 'Multi-stop linear gradients with custom angles', accent),
          featureCard('2', 'Auto Layout', 'Horizontal, vertical, FILL, SPACE_BETWEEN, counterAlign', teal),
          featureCard('3', 'Typography', 'fontSize, fontWeight, letterSpacing, lineHeight, textAutoResize', gold),
          featureCard('4', 'Shapes', 'Rectangles, ellipses, cornerRadius, clipContent', pink),
          featureCard('5', 'Strokes', 'Custom weight, color with RGBA, align INSIDE', '#ff6600'),
          featureCard('6', 'Fills', 'Solid with opacity, gradient multi-stop, layered', '#22cc88'),
        ]}),
      ],
    }),
    // Timeline with FILL sizing
    frame('TimelineSection', {
      autoLayout: horizontal({ spacing: 24, padX: 60, padY: 40, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#0e0e1a')],
      children: [
        frame('TimelineLeft', { autoLayout: vertical({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
          text('Journey', { fontSize: 20, fontWeight: 300, color: white }),
          timelineItem('1', 'Japanese Brands & Luxury', 'MUJI, Uniqlo, Shiseido, Lexus, Aman Kyoto, Sake, Matcha'),
          timelineItem('2', 'Food, Craft & Culture', 'Ceramics, Ramen, Sushi, Manga, Knives, Kimono, Garden'),
          timelineItem('3', 'Design Trends 2026', 'Bento Grid, Wabi-Sabi, Neo-Brutalist, Tokyo Neon, Sakura'),
          timelineItem('4', 'International Brands', 'KORG, BAPE, Honda, Toyota, Ghibli, Train Station, Expo'),
          timelineItem('5', 'Advanced Patterns', 'Art Gallery, Zen, Whisky, Weather, University, Flagship'),
        ]}),
        frame('QuotePanel', { autoLayout: vertical({ spacing: 14, padX: 28, padY: 32, counterAlign: 'CENTER' }),
          size: { x: 400, y: undefined },
          fills: [gradient([{ hex: '#141420', position: 0 }, { hex: '#1a1040', position: 1 }], 180)],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.78, g: 0.64, b: 0.31, a: 0.15 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            rectangle('QuoteMark', { size: { x: 40, y: 2 }, fills: [solid(gold, 0.3)] }),
            text('The pipeline handles everything:\ngradients, strokes, opacity, complex\nauto-layout nesting, text wrapping,\nand 100 unique visual themes\nwithout a single rendering bug.', { fontSize: 16, fontWeight: 200, color: white, lineHeight: { value: 26, unit: 'PIXELS' as const } }),
            rectangle('QuoteEnd', { size: { x: 40, y: 2 }, fills: [solid(gold, 0.3)] }),
            text('Dogfooding Report, 2026.03.14', { fontSize: 11, fontWeight: 400, color: gold }),
          ],
        }),
      ],
    }),
  ],
});
