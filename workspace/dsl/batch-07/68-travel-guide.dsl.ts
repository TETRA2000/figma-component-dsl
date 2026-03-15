/**
 * Travel Guide — Destination overview, best time to visit, local tips, attractions, budget
 * Batch 7, Page 8: Travel guide page
 * DSL Features: nested layouts, FILL sizing, gradient overlays, clipContent
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelGuide', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Explore', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Guides', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
            text('Hotels', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Hero Banner
    frame('HeroBanner', {
      size: { x: 1440, y: 360 },
      fills: [
        solid('#2d5a4e'),
        gradient([
          { hex: '#00000000', position: 0 },
          { hex: '#000000cc', position: 1 },
        ], 270),
      ],
      clipContent: true,
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 0, align: 'MAX' }),
      children: [
        frame('BreadcrumbRow', {
          autoLayout: horizontal({ spacing: 8, padY: 0 }),
          children: [
            text('Guides', { fontSize: 13, fontWeight: 400, color: '#ffffffaa' }),
            text('/', { fontSize: 13, fontWeight: 400, color: '#ffffff55' }),
            text('Asia', { fontSize: 13, fontWeight: 400, color: '#ffffffaa' }),
            text('/', { fontSize: 13, fontWeight: 400, color: '#ffffff55' }),
            text('Japan', { fontSize: 13, fontWeight: 500, color: '#ffffff' }),
          ],
        }),
        text('Japan Travel Guide', { fontSize: 44, fontWeight: 700, color: '#ffffff' }),
        text('Everything you need to know for an unforgettable trip to Japan', {
          fontSize: 18, fontWeight: 400, color: '#ffffffcc',
        }),
        rectangle('HeroSpacer', { size: { x: 1, y: 32 }, opacity: 0 }),
      ],
    }),

    // Quick Stats
    frame('QuickStats', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('Best Time', 'Mar - May\nOct - Nov', '#0369a1'),
        statCard('Currency', 'Japanese Yen\n(JPY)', '#ea580c'),
        statCard('Language', 'Japanese\nEnglish widely used', '#7c3aed'),
        statCard('Visa', 'Visa-free\n90 days (most)', '#16a34a'),
      ],
    }),

    // Destination Overview
    frame('Overview', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Destination Overview', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        text('Japan is a captivating blend of ancient tradition and cutting-edge modernity. From the serene temples of Kyoto to the neon-lit streets of Tokyo, every corner offers something extraordinary. Experience world-class cuisine, breathtaking nature, and one of the safest countries in the world.', {
          fontSize: 16, fontWeight: 400, color: '#4b5563',
          lineHeight: { value: 26, unit: 'PIXELS' },
          size: { x: 900 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // Best Time to Visit
    frame('BestTime', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('Best Time to Visit', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        frame('Seasons', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            seasonCard('Spring', 'Mar - May', 'Cherry blossom season. Mild weather, festivals, and iconic pink landscapes.', true),
            seasonCard('Summer', 'Jun - Aug', 'Hot and humid. Great for mountain hiking, festivals, and beach trips.', false),
            seasonCard('Autumn', 'Sep - Nov', 'Beautiful fall foliage. Cool weather, fewer crowds, pleasant hiking.', true),
            seasonCard('Winter', 'Dec - Feb', 'Perfect for skiing, hot springs, and illumination events.', false),
          ],
        }),
      ],
    }),

    // Local Tips
    frame('LocalTips', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Local Tips', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        frame('TipsList', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            tipItem('Get a JR Pass', 'The Japan Rail Pass offers unlimited travel on JR trains. Purchase before arriving for the best value.'),
            tipItem('Cash is King', 'Many small restaurants and shops still only accept cash. Always carry yen with you.'),
            tipItem('Learn Basic Japanese', 'A few phrases like "sumimasen" (excuse me) and "arigatou" (thank you) go a long way.'),
            tipItem('Shoes Off Indoors', 'Remove shoes when entering homes, temples, and many traditional restaurants.'),
            tipItem('Quiet on Trains', 'Keep phone conversations and music off on public transport. It is considered rude.'),
          ],
        }),
      ],
    }),

    // Must-See Attractions
    frame('Attractions', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('Must-See Attractions', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        frame('AttractionsList', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            attractionCard('1', 'Fushimi Inari Shrine', 'Kyoto', 'Thousands of vermilion torii gates winding through the mountain.', '4.8'),
            attractionCard('2', 'Mount Fuji', 'Shizuoka', 'Japan\'s iconic peak. Best viewed from Hakone or Lake Kawaguchi.', '4.9'),
            attractionCard('3', 'Shibuya Crossing', 'Tokyo', 'The world\'s busiest pedestrian crossing. A must-see spectacle.', '4.5'),
            attractionCard('4', 'Arashiyama Bamboo Grove', 'Kyoto', 'Walk through towering bamboo stalks in this ethereal forest.', '4.7'),
            attractionCard('5', 'Hiroshima Peace Memorial', 'Hiroshima', 'A powerful reminder of history and a symbol of peace.', '4.8'),
          ],
        }),
      ],
    }),

    // Budget Breakdown
    frame('Budget', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Budget Breakdown', { fontSize: 24, fontWeight: 700, color: '#1e293b' }),
        text('Estimated daily costs per person', { fontSize: 15, fontWeight: 400, color: '#64748b' }),
        frame('BudgetCards', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            budgetCard('Budget', '$80-120/day', [
              ['Hostel/Capsule Hotel', '$20-40'],
              ['Street food & convenience', '$15-25'],
              ['Local transport', '$10-15'],
              ['Attractions', '$10-20'],
            ], '#16a34a'),
            budgetCard('Mid-Range', '$150-250/day', [
              ['Business hotel', '$60-100'],
              ['Restaurants', '$30-50'],
              ['JR Pass + local', '$20-30'],
              ['Attractions + activities', '$20-40'],
            ], '#0369a1'),
            budgetCard('Luxury', '$400+/day', [
              ['Ryokan / 5-star hotel', '$200+'],
              ['Fine dining & kaiseki', '$80-150'],
              ['Private transport', '$50+'],
              ['Premium experiences', '$50+'],
            ], '#ea580c'),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('© 2026 Wanderly. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

function statCard(label: string, value: string, accentColor: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 32, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: accentColor, letterSpacing: { value: 5, unit: 'PERCENT' } }),
      text(value, {
        fontSize: 15, fontWeight: 500, color: '#1e293b',
        lineHeight: { value: 22, unit: 'PIXELS' },
      }),
    ],
  });
}

function seasonCard(name: string, months: string, description: string, recommended: boolean) {
  return frame(`Season: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: recommended ? { r: 0.92, g: 0.35, b: 0.05, a: 1 } : { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: recommended ? 2 : 1, align: 'INSIDE' }],
    children: [
      ...(recommended ? [
        frame('RecBadge', {
          autoLayout: horizontal({ padX: 8, padY: 2 }),
          fills: [solid('#fff7ed')],
          cornerRadius: 4,
          children: [
            text('Recommended', { fontSize: 11, fontWeight: 600, color: '#ea580c' }),
          ],
        }),
      ] : []),
      text(name, { fontSize: 18, fontWeight: 600, color: '#1e293b' }),
      text(months, { fontSize: 13, fontWeight: 500, color: '#0369a1' }),
      text(description, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        lineHeight: { value: 20, unit: 'PIXELS' },
      }),
    ],
  });
}

function tipItem(title: string, description: string) {
  return frame(`Tip: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('TipIcon', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 36, y: 36 },
        fills: [solid('#fff7ed')],
        cornerRadius: 18,
        children: [
          text('💡', { fontSize: 16, fontWeight: 400, color: '#ea580c' }),
        ],
      }),
      frame('TipContent', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: '#4b5563',
            lineHeight: { value: 20, unit: 'PIXELS' },
          }),
        ],
      }),
    ],
  });
}

function attractionCard(num: string, name: string, location: string, description: string, rating: string) {
  return frame(`Attraction: ${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('AttrNum', {
        autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
        size: { x: 36, y: 36 },
        fills: [solid('#ea580c')],
        cornerRadius: 18,
        children: [
          text(num, { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
        ],
      }),
      rectangle('AttrImage', {
        size: { x: 80, y: 60 },
        fills: [solid('#d4c4a8')],
        cornerRadius: 8,
      }),
      frame('AttrInfo', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
          text(location, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
          text(description, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
      frame('AttrRating', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text('★', { fontSize: 14, fontWeight: 400, color: '#f59e0b' }),
          text(rating, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
        ],
      }),
    ],
  });
}

function budgetCard(tier: string, range: string, items: string[][], accentColor: string) {
  return frame(`Budget: ${tier}`, {
    autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(tier, { fontSize: 14, fontWeight: 600, color: accentColor }),
      text(range, { fontSize: 28, fontWeight: 700, color: '#1e293b' }),
      rectangle('BudgetDivider', {
        size: { x: 1, y: 1 },
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#e2e8f0')],
      }),
      ...items.map(([label, cost]) =>
        frame(`Item: ${label}`, {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text(label, { fontSize: 14, fontWeight: 400, color: '#4b5563', layoutSizingHorizontal: 'FILL' }),
            text(cost, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          ],
        })
      ),
    ],
  });
}
