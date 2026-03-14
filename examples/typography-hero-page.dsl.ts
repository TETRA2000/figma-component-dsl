import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: 2026 Typography-First Hero trend — Giant text (72px+), no images, bold statement
const dark = '#0a0a0a'; const white = '#fafafa'; const accent = '#ff3d00'; const med = '#555555';
const lightGray = '#e0e0e0'; const bg = '#f5f5f5';

export default frame('TypographyHero', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(white)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 60, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('STUDIO', { fontSize: 14, fontWeight: 700, color: dark, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Work', { fontSize: 13, fontWeight: 500, color: dark }),
          text('About', { fontSize: 13, fontWeight: 400, color: med }),
          text('Contact', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 24, padX: 60, padY: 100 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('WE DESIGN', { fontSize: 96, fontWeight: 900, color: dark, letterSpacing: { value: -2, unit: 'PIXELS' as const }, lineHeight: { value: 88, unit: 'PIXELS' as const } }),
        text('EXPERIENCES', { fontSize: 96, fontWeight: 900, color: accent, letterSpacing: { value: -2, unit: 'PIXELS' as const }, lineHeight: { value: 88, unit: 'PIXELS' as const } }),
        text('THAT MATTER', { fontSize: 96, fontWeight: 900, color: dark, letterSpacing: { value: -2, unit: 'PIXELS' as const }, lineHeight: { value: 88, unit: 'PIXELS' as const } }),
        rectangle('Divider', { size: { x: 80, y: 4 }, fills: [solid(accent)] }),
        text('Digital products, brand identities, and creative direction\nfor companies that want to make a difference.', { fontSize: 18, fontWeight: 400, color: med, lineHeight: { value: 28, unit: 'PIXELS' as const } }),
      ],
    }),
    frame('StatsRow', {
      autoLayout: horizontal({ padX: 60, padY: 48, spacing: 60 }),
      layoutSizingHorizontal: 'FILL', fills: [solid(dark)],
      children: [
        frame('Stat1', { autoLayout: vertical({ spacing: 4 }), children: [
          text('150+', { fontSize: 48, fontWeight: 800, color: white }),
          text('Projects shipped', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        frame('Stat2', { autoLayout: vertical({ spacing: 4 }), children: [
          text('12', { fontSize: 48, fontWeight: 800, color: accent }),
          text('Years of craft', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        frame('Stat3', { autoLayout: vertical({ spacing: 4 }), children: [
          text('40+', { fontSize: 48, fontWeight: 800, color: white }),
          text('Team members', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        frame('Stat4', { autoLayout: vertical({ spacing: 4 }), children: [
          text('8', { fontSize: 48, fontWeight: 800, color: accent }),
          text('Industry awards', { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('ClientsSection', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('TRUSTED BY', { fontSize: 11, fontWeight: 500, color: med, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
        frame('ClientLogos', { autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }), children: [
          text('GOOGLE', { fontSize: 18, fontWeight: 300, color: lightGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('APPLE', { fontSize: 18, fontWeight: 300, color: lightGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('SONY', { fontSize: 18, fontWeight: 300, color: lightGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('TOYOTA', { fontSize: 18, fontWeight: 300, color: lightGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('MUJI', { fontSize: 18, fontWeight: 300, color: lightGray, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        ]}),
      ],
    }),
  ],
});
