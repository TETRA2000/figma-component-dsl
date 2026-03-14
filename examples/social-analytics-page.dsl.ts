import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const pink = '#ec4899'; const pinkBg = '#fdf2f8'; const white = '#ffffff'; const bg = '#fdf2f8';
const dark = '#1e1b4b'; const med = '#6b7280'; const green = '#10b981'; const blue = '#3b82f6';

function metricCard(label: string, value: string, change: string, isUp: boolean, color: string) {
  return frame(`Metric: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }), fills: [solid(white)],
    cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: med }),
      text(value, { fontSize: 28, fontWeight: 700, color: dark }),
      frame('Change', { autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }), children: [
        ellipse('Arrow', { size: { x: 10, y: 10 }, fills: [solid(isUp ? green : '#ef4444')] }),
        text(change, { fontSize: 12, fontWeight: 600, color: isUp ? green : '#ef4444' }),
      ]}),
    ],
  });
}

function platformRow(name: string, followers: string, engagement: string, posts: string, color: string) {
  return frame(`Platform: ${name}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.93, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PlatLeft', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
        ellipse('PlatIcon', { size: { x: 32, y: 32 }, fills: [solid(color)] }),
        text(name, { fontSize: 14, fontWeight: 600, color: dark }),
      ]}),
      text(followers, { fontSize: 14, fontWeight: 500, color: dark }),
      text(engagement, { fontSize: 14, fontWeight: 500, color: green }),
      text(posts, { fontSize: 14, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('SocialAnalytics', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('SocialPulse', { fontSize: 20, fontWeight: 700, color: pink }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Overview', { fontSize: 14, fontWeight: 600, color: pink }),
          text('Content', { fontSize: 14, fontWeight: 400, color: med }),
          text('Audience', { fontSize: 14, fontWeight: 400, color: med }),
          text('Schedule', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 20, padX: 40, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('Metrics', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
          metricCard('Total Followers', '248.5K', '+12.3% this month', true, pink),
          metricCard('Engagement Rate', '4.8%', '+0.6% this month', true, green),
          metricCard('Posts This Week', '24', '+8 vs last week', true, blue),
          metricCard('Avg. Reach', '18.2K', '-2.1% this month', false, pink),
        ]}),
        frame('BottomRow', { autoLayout: horizontal({ spacing: 20 }), layoutSizingHorizontal: 'FILL', children: [
          frame('Platforms', {
            autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }), fills: [solid(white)],
            cornerRadius: 12, clipContent: true, layoutSizingHorizontal: 'FILL',
            children: [
              frame('PlatHeader', { autoLayout: horizontal({ padX: 16, padY: 12, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', fills: [solid('#fdf2f8')],
                children: [text('Platform Performance', { fontSize: 16, fontWeight: 600, color: dark }), text('Last 30 days', { fontSize: 13, fontWeight: 400, color: med })] }),
              platformRow('Instagram', '125K', '5.2%', '156 posts', '#E4405F'),
              platformRow('Twitter/X', '68K', '3.8%', '342 posts', '#1DA1F2'),
              platformRow('LinkedIn', '32K', '6.1%', '48 posts', '#0A66C2'),
              platformRow('TikTok', '23.5K', '8.4%', '67 videos', '#010101'),
            ],
          }),
          frame('TopPosts', {
            autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }), fills: [solid(white)],
            cornerRadius: 12, size: { x: 360, y: undefined },
            children: [
              text('Top Performing Posts', { fontSize: 16, fontWeight: 600, color: dark }),
              frame('Post1', { autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
                rectangle('PostThumb1', { size: { x: 48, y: 48 }, fills: [solid(pink, 0.15)], cornerRadius: 8 }),
                frame('PostInfo1', { autoLayout: vertical({ spacing: 2 }), children: [
                  text('Design trends for 2026', { fontSize: 13, fontWeight: 500, color: dark }),
                  text('12.4K likes · 892 shares', { fontSize: 12, fontWeight: 400, color: med }),
                ]}),
              ]}),
              frame('Post2', { autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
                rectangle('PostThumb2', { size: { x: 48, y: 48 }, fills: [solid(blue, 0.15)], cornerRadius: 8 }),
                frame('PostInfo2', { autoLayout: vertical({ spacing: 2 }), children: [
                  text('Behind the scenes: Our process', { fontSize: 13, fontWeight: 500, color: dark }),
                  text('8.7K likes · 456 shares', { fontSize: 12, fontWeight: 400, color: med }),
                ]}),
              ]}),
              frame('Post3', { autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
                rectangle('PostThumb3', { size: { x: 48, y: 48 }, fills: [solid(green, 0.15)], cornerRadius: 8 }),
                frame('PostInfo3', { autoLayout: vertical({ spacing: 2 }), children: [
                  text('5 tips for better engagement', { fontSize: 13, fontWeight: 500, color: dark }),
                  text('6.2K likes · 324 shares', { fontSize: 12, fontWeight: 400, color: med }),
                ]}),
              ]}),
            ],
          }),
        ]}),
      ],
    }),
  ],
});
