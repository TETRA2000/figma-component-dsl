import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const white = '#ffffff';
const lightGray = '#f3f4f6';
const borderGray = '#e5e7eb';
const blue = '#1d9bf0';
const dark = '#0f1419';
const medGray = '#536471';
const red = '#f91880';
const green = '#00ba7c';
const bgGray = '#f7f9f9';

// Avatar circle
function avatar(name: string, size: number, color1: string, color2: string) {
  return ellipse(`Avatar: ${name}`, {
    size: { x: size, y: size },
    fills: [gradient([
      { hex: color1, position: 0 },
      { hex: color2, position: 1 },
    ], 135)],
  });
}

// Engagement button
function engagementBtn(label: string, count: string | null, color: string) {
  return frame(`Btn: ${label}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      ellipse(`${label}Icon`, { size: { x: 18, y: 18 }, fills: [solid(color, 0.15)] }),
      ...(count ? [text(count, { fontSize: 13, fontWeight: 400, color: medGray })] : []),
    ],
  });
}

// Post card
function postCard(username: string, handle: string, time: string, content: string, likes: string, comments: string, shares: string, avatarColors: [string, string]) {
  return frame(`Post: ${handle}`, {
    autoLayout: vertical({ spacing: 0, padX: 16, padY: 12 }),
    fills: [solid(white)],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.95, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Author row
      frame('AuthorRow', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          avatar(username, 44, avatarColors[0], avatarColors[1]),
          frame('AuthorInfo', {
            autoLayout: vertical({ spacing: 0 }),
            children: [
              frame('NameLine', {
                autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                children: [
                  text(username, { fontSize: 15, fontWeight: 700, color: dark }),
                  ellipse('Verified', { size: { x: 16, y: 16 }, fills: [solid(blue)] }),
                ],
              }),
              frame('HandleTime', {
                autoLayout: horizontal({ spacing: 4 }),
                children: [
                  text(handle, { fontSize: 14, fontWeight: 400, color: medGray }),
                  text('·', { fontSize: 14, fontWeight: 400, color: medGray }),
                  text(time, { fontSize: 14, fontWeight: 400, color: medGray }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Content
      frame('PostContent', {
        autoLayout: vertical({ spacing: 0, padX: 0, padY: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(content, {
            fontSize: 15,
            fontWeight: 400,
            color: dark,
            lineHeight: { value: 145, unit: 'PERCENT' as const },
            size: { x: 500 },
            textAutoResize: 'HEIGHT' as const,
          }),
        ],
      }),
      // Engagement bar
      frame('EngagementBar', {
        autoLayout: horizontal({ spacing: 0, padX: 0, padY: 8, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        size: { x: 1, y: undefined },
        children: [
          engagementBtn('Comment', comments, medGray),
          engagementBtn('Repost', shares, green),
          engagementBtn('Like', likes, red),
          engagementBtn('Share', null, medGray),
        ],
      }),
    ],
  });
}

// Compose button
const composeButton = frame('ComposeButton', {
  autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
  fills: [solid(blue)],
  cornerRadius: 9999,
  children: [
    text('Post', { fontSize: 16, fontWeight: 700, color: white }),
  ],
});

// Trending topic
function trendingItem(category: string, topic: string, posts: string) {
  return frame(`Trend: ${topic}`, {
    autoLayout: vertical({ spacing: 2, padX: 16, padY: 10 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(category, { fontSize: 12, fontWeight: 400, color: medGray }),
      text(topic, { fontSize: 15, fontWeight: 700, color: dark }),
      text(posts, { fontSize: 12, fontWeight: 400, color: medGray }),
    ],
  });
}

// Who to follow
function followSuggestion(name: string, handle: string, colors: [string, string]) {
  return frame(`Follow: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 16, padY: 10, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('UserInfo', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          avatar(name, 40, colors[0], colors[1]),
          frame('Names', {
            autoLayout: vertical({ spacing: 0 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 700, color: dark }),
              text(handle, { fontSize: 13, fontWeight: 400, color: medGray }),
            ],
          }),
        ],
      }),
      frame('FollowBtn', {
        autoLayout: horizontal({ padX: 16, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(dark)],
        cornerRadius: 9999,
        children: [
          text('Follow', { fontSize: 13, fontWeight: 700, color: white }),
        ],
      }),
    ],
  });
}

export default frame('SocialFeed', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid(bgGray)],
  children: [
    // Left sidebar
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 20, padX: 20, padY: 20 }),
      size: { x: 260, y: undefined },
      fills: [solid(white)],
      strokes: [{ color: { r: 0.94, g: 0.95, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('SocialApp', { fontSize: 22, fontWeight: 700, color: blue }),
        frame('NavItems', {
          autoLayout: vertical({ spacing: 4 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Home', { fontSize: 18, fontWeight: 700, color: dark }),
            text('Explore', { fontSize: 18, fontWeight: 400, color: dark }),
            text('Notifications', { fontSize: 18, fontWeight: 400, color: dark }),
            text('Messages', { fontSize: 18, fontWeight: 400, color: dark }),
            text('Profile', { fontSize: 18, fontWeight: 400, color: dark }),
          ],
        }),
        composeButton,
      ],
    }),

    // Main feed
    frame('Feed', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Compose area
        frame('ComposeArea', {
          autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'MIN' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(white)],
          strokes: [{ color: { r: 0.94, g: 0.95, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            avatar('Me', 40, blue, '#1a73e8'),
            text("What's happening?", { fontSize: 18, fontWeight: 400, color: medGray }),
          ],
        }),
        // Posts
        postCard('Design Daily', '@designdaily', '2h', 'Just shipped our new component library built entirely with a DSL-first approach. The Figma-to-code pipeline is finally seamless. No more manual design token syncing!', '847', '123', '256', ['#7c3aed', '#4f46e5']),
        postCard('Sarah Chen', '@sarahchen', '4h', 'Hot take: The best design systems are the ones that embrace constraints. When your DSL only supports what Figma can render, you eliminate an entire class of implementation bugs.', '1.2K', '89', '432', ['#ec4899', '#f43f5e']),
        postCard('TypeScript Weekly', '@tsweekly', '6h', 'New pattern: using TypeScript template literal types to validate DSL color tokens at compile time. If it compiles, your colors are valid hex codes.', '634', '67', '198', ['#0ea5e9', '#06b6d4']),
        postCard('Alex Rivera', '@alexrivera', '8h', 'The feedback loop between designing in Figma and testing in code should be measured in seconds, not days. That is the bar we should all be aiming for.', '2.1K', '234', '567', ['#f59e0b', '#f97316']),
      ],
    }),

    // Right sidebar
    frame('RightSidebar', {
      autoLayout: vertical({ spacing: 16, padX: 0, padY: 16 }),
      size: { x: 340, y: undefined },
      children: [
        // Trending
        frame('Trending', {
          autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
          fills: [solid(white)],
          cornerRadius: 16,
          clipContent: true,
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('TrendingHeader', {
              autoLayout: horizontal({ padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Trending', { fontSize: 18, fontWeight: 700, color: dark }),
              ],
            }),
            trendingItem('Design · Trending', '#DesignSystems', '12.4K posts'),
            trendingItem('Tech · Trending', '#TypeScript', '8.7K posts'),
            trendingItem('Dev · Trending', '#ComponentDriven', '5.2K posts'),
          ],
        }),

        // Who to follow
        frame('WhoToFollow', {
          autoLayout: vertical({ spacing: 0 }),
          fills: [solid(white)],
          cornerRadius: 16,
          clipContent: true,
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('FollowHeader', {
              autoLayout: horizontal({ padX: 16, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Who to follow', { fontSize: 18, fontWeight: 700, color: dark }),
              ],
            }),
            followSuggestion('Figma', '@figma', ['#a259ff', '#1abcfe']),
            followSuggestion('React', '@reactjs', ['#61dafb', '#0a7ea4']),
            followSuggestion('Vercel', '@vercel', ['#000000', '#333333']),
          ],
        }),
      ],
    }),
  ],
});
