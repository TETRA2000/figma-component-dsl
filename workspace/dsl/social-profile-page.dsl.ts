/**
 * Social Profile — User profile, stats, post grid, followers
 * DSL features: centered header, large avatar, stat counters, image grid, bio text
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 20, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function postThumb(color1: string, color2: string) {
  return rectangle('Post', {
    size: { x: 1, y: 160 },
    fills: [gradient([{ hex: color1, position: 0 }, { hex: color2, position: 1 }], Math.random() * 360)],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
  });
}

function followerItem(name: string, handle: string, color: string) {
  return frame(`Follower: ${name}`, {
    autoLayout: horizontal({ spacing: 10, padX: 12, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, { size: { x: 36, y: 36 }, fills: [solid(color)] }),
      frame('FollowerInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(name, { fontSize: 14, fontWeight: 500, color: '#111827' }),
        text(handle, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      ]}),
      frame('FollowBtn', {
        autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER' }),
        fills: [solid('#3b82f6')],
        cornerRadius: 8,
        children: [text('Follow', { fontSize: 12, fontWeight: 600, color: '#ffffff' })],
      }),
    ],
  });
}

export default frame('SocialProfilePage', {
  size: { x: 480 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Cover
    rectangle('Cover', { size: { x: 1, y: 160 }, fills: [gradient([{ hex: '#4f46e5', position: 0 }, { hex: '#7c3aed', position: 0.5 }, { hex: '#ec4899', position: 1 }], 135)], layoutSizingHorizontal: 'FILL' }),
    // Profile header
    frame('ProfileHeader', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        ellipse('Avatar', { size: { x: 88, y: 88 }, fills: [solid('#4f46e5')] }),
        text('Alex Rivera', { fontSize: 22, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
        text('@alexrivera', { fontSize: 14, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
        text('Designer and photographer. Creating beautiful things one pixel at a time.', { fontSize: 14, fontWeight: 400, color: '#4b5563', textAlignHorizontal: 'CENTER', lineHeight: { value: 150, unit: 'PERCENT' }, size: { x: 320 }, textAutoResize: 'HEIGHT' }),
        frame('Stats', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statItem('1.2K', 'Posts'),
            statItem('24.5K', 'Followers'),
            statItem('892', 'Following'),
          ],
        }),
        frame('ActionBtns', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            frame('FollowBtn', { autoLayout: horizontal({ padX: 32, padY: 10, align: 'CENTER' }), fills: [solid('#3b82f6')], cornerRadius: 10, children: [text('Follow', { fontSize: 14, fontWeight: 600, color: '#ffffff' })] }),
            frame('MsgBtn', { autoLayout: horizontal({ padX: 32, padY: 10, align: 'CENTER' }), fills: [solid('#ffffff')], cornerRadius: 10, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }], children: [text('Message', { fontSize: 14, fontWeight: 600, color: '#374151' })] }),
          ],
        }),
      ],
    }),
    // Post grid
    frame('PostGrid', {
      autoLayout: vertical({ spacing: 4, padX: 4, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', { autoLayout: horizontal({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
          postThumb('#f59e0b', '#ea580c'), postThumb('#3b82f6', '#06b6d4'), postThumb('#ec4899', '#f43f5e'),
        ]}),
        frame('Row2', { autoLayout: horizontal({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
          postThumb('#10b981', '#059669'), postThumb('#8b5cf6', '#a855f7'), postThumb('#1e293b', '#475569'),
        ]}),
      ],
    }),
    // Suggested followers
    frame('Suggested', {
      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Suggested for you', { fontSize: 15, fontWeight: 600, color: '#111827' }),
        followerItem('Sarah Chen', '@sarahchen', '#10b981'),
        followerItem('Marcus Kim', '@marcusk', '#f59e0b'),
        followerItem('Priya Patel', '@priyap', '#ec4899'),
      ],
    }),
  ],
});
