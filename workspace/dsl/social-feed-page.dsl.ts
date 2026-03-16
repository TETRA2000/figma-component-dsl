/**
 * Social Feed — Twitter-style post feed
 *
 * DSL features stressed: ellipse nodes (avatars), horizontal action bars with even spacing,
 * nested groups, clip content for avatar images
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function avatar(name: string, size_: number) {
  return ellipse(`Avatar: ${name}`, {
    size: { x: size_, y: size_ },
    fills: [gradient([
      { hex: '#1d9bf0', position: 0 },
      { hex: '#0a66c2', position: 1 },
    ], 135)],
  });
}

function engagementBtn(icon: string, count: string) {
  return frame(`Action: ${icon}`, {
    autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
    children: [
      text(icon, { fontSize: 14, color: '#536471' }),
      text(count, { fontSize: 13, fontWeight: 400, color: '#536471' }),
    ],
  });
}

function postCard(username: string, handle: string, content: string, time: string, likes: string, comments: string, shares: string) {
  return frame(`Post: ${username}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      avatar(username, 44),
      frame('PostBody', {
        autoLayout: vertical({ spacing: 8 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          // Name row
          frame('NameRow', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text(username, { fontSize: 15, fontWeight: 700, color: '#0f1419' }),
              text(`@${handle}`, { fontSize: 14, fontWeight: 400, color: '#536471' }),
              text(`· ${time}`, { fontSize: 14, fontWeight: 400, color: '#536471' }),
            ],
          }),
          // Content text
          text(content, {
            fontSize: 15, fontWeight: 400, color: '#0f1419',
            lineHeight: { value: 150, unit: 'PERCENT' },
            size: { x: 500 },
            textAutoResize: 'HEIGHT',
          }),
          // Engagement bar
          frame('EngagementBar', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padY: 4 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              engagementBtn('Reply', comments),
              engagementBtn('RT', shares),
              engagementBtn('Like', likes),
              engagementBtn('Save', '-'),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('SocialFeedPage', {
  size: { x: 680 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Header
    frame('FeedHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 16, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Home', { fontSize: 20, fontWeight: 700, color: '#0f1419' }),
        frame('ComposeBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 10, align: 'CENTER' }),
          fills: [solid('#1d9bf0')],
          cornerRadius: 9999,
          children: [
            text('Post', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
          ],
        }),
      ],
    }),

    // Compose area
    frame('ComposeArea', {
      autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12 }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        avatar('You', 40),
        text("What's happening?", {
          fontSize: 18, fontWeight: 400, color: '#9aa5b1',
          layoutSizingHorizontal: 'FILL',
        }),
      ],
    }),

    // Posts
    postCard('Alex Chen', 'alexdev', 'Just shipped a major refactor of our design system. The new token architecture reduces bundle size by 40% while improving consistency.', '2h', '142', '28', '12'),
    postCard('Maria Santos', 'msantos_ux', 'Hot take: the best design systems are the ones nobody notices. They just work.', '4h', '523', '89', '31'),
    postCard('Sam Taylor', 'samtaylor', "We've been using the new Figma DSL pipeline for 3 weeks now. The gap between design and code has never been smaller. Here are my takeaways...", '6h', '87', '15', '8'),
    postCard('Jordan Lee', 'jordanleee', 'Reminder: accessibility is not a feature, it\'s a requirement. Every component you build should work for everyone.', '8h', '1.2K', '234', '56'),
  ],
});
