import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 2026 Neo-Brutalism trend — Thick black borders, offset shadows, raw aesthetic
const black = '#000000'; const white = '#ffffff'; const yellow = '#fbbf24'; const pink = '#f472b6';
const blue = '#3b82f6'; const green = '#22c55e'; const dark = '#1a1a1a'; const bg = '#fef3c7';

function brutalistCard(title: string, date: string, desc: string, tagColor: string, tag: string) {
  return frame(`Post: ${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 18 }), size: { x: 380, y: undefined },
    fills: [solid(white)], cornerRadius: 0,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 3, align: 'INSIDE' as const }],
    children: [
      frame('TagRow', { autoLayout: horizontal({ spacing: 8 }), children: [
        frame('Tag', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(tagColor)],
          strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, align: 'INSIDE' as const }],
          children: [text(tag, { fontSize: 11, fontWeight: 700, color: black })] }),
        text(date, { fontSize: 11, fontWeight: 400, color: dark }),
      ]}),
      text(title, { fontSize: 20, fontWeight: 800, color: black }),
      text(desc, { fontSize: 13, fontWeight: 400, color: dark }),
      frame('ReadMore', { autoLayout: horizontal({ padX: 14, padY: 6 }), fills: [solid(black)],
        children: [text('READ MORE', { fontSize: 11, fontWeight: 700, color: white, letterSpacing: { value: 2, unit: 'PIXELS' as const } })] }),
    ],
  });
}

export default frame('NeoBrutalistBlog', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 3, align: 'INSIDE' as const }],
      children: [
        text('BRUTALIST.BLOG', { fontSize: 20, fontWeight: 900, color: black }),
        frame('Nav', { autoLayout: horizontal({ spacing: 16 }), children: [
          frame('NavItem1', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(yellow)],
            strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, align: 'INSIDE' as const }],
            children: [text('HOME', { fontSize: 12, fontWeight: 700, color: black })] }),
          frame('NavItem2', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(pink)],
            strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, align: 'INSIDE' as const }],
            children: [text('ARCHIVE', { fontSize: 12, fontWeight: 700, color: black })] }),
          frame('NavItem3', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid(blue)],
            strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, align: 'INSIDE' as const }],
            children: [text('ABOUT', { fontSize: 12, fontWeight: 700, color: black })] }),
        ]}),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 12, padX: 40, padY: 40 }),
      layoutSizingHorizontal: 'FILL', fills: [solid(yellow)],
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 3, align: 'INSIDE' as const }],
      children: [
        text('NO ROUNDED CORNERS.', { fontSize: 48, fontWeight: 900, color: black }),
        text('NO GRADIENTS. NO MERCY.', { fontSize: 48, fontWeight: 900, color: black }),
        text('A design blog that celebrates raw, unpolished web aesthetics.', { fontSize: 16, fontWeight: 500, color: dark }),
      ],
    }),
    frame('PostGrid', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 32 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('LATEST POSTS', { fontSize: 14, fontWeight: 900, color: black, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Grid', { autoLayout: horizontal({ spacing: 16 }), children: [
          brutalistCard('Why Web Design Got Too Polished', '2026.03.10', 'We lost something when every website started looking like a Dribbble shot. Time to bring back personality.', yellow, 'OPINION'),
          brutalistCard('The Return of System Fonts', '2026.03.08', 'Arial, Helvetica, and Times New Roman are making a comeback. Here is why that is actually great.', pink, 'DESIGN'),
          brutalistCard('Building with Raw HTML', '2026.03.05', 'No framework, no build step, no problem. A manifesto for simpler web development.', green, 'CODE'),
        ]}),
      ],
    }),
  ],
});
