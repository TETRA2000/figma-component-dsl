/**
 * Chat Messenger — Two-panel chat with conversation list and message thread
 * DSL features: fixed-width sidebar, cornerRadii (asymmetric bubbles), ellipse avatars, online status dots, FILL columns
 */
import { frame, text, rectangle, ellipse, solid, horizontal, vertical } from '@figma-dsl/core';

function conversationItem(name: string, message: string, time: string, unread: number, color: string, selected: boolean) {
  return frame(`Conv: ${name}`, {
    autoLayout: horizontal({ spacing: 12, padX: 14, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(selected ? '#eff6ff' : '#ffffff')],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse(`Av:${name}`, { size: { x: 40, y: 40 }, fills: [solid(color)] }),
      frame('ConvInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: unread > 0 ? 600 : 400, color: '#111827' }),
          text(message, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      frame('ConvMeta', {
        autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(time, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
          ...(unread > 0 ? [frame('UnreadBadge', {
            size: { x: 20, y: 20 },
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#3b82f6')],
            cornerRadius: 10,
            children: [text(String(unread), { fontSize: 10, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
          })] : []),
        ],
      }),
    ],
  });
}

function chatBubble(msg: string, time: string, sent: boolean) {
  return frame(`Msg: ${sent ? 'sent' : 'recv'}`, {
    autoLayout: horizontal({ spacing: 0, align: sent ? 'MAX' : 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('Bubble', {
        autoLayout: vertical({ spacing: 4, padX: 14, padY: 10 }),
        fills: [solid(sent ? '#3b82f6' : '#f3f4f6')],
        cornerRadius: { topLeft: sent ? 16 : 4, topRight: sent ? 4 : 16, bottomLeft: 16, bottomRight: 16 },
        children: [
          text(msg, { fontSize: 14, fontWeight: 400, color: sent ? '#ffffff' : '#111827', size: { x: 300 }, textAutoResize: 'HEIGHT', lineHeight: { value: 145, unit: 'PERCENT' } }),
          text(time, { fontSize: 10, fontWeight: 400, color: sent ? '#ffffffaa' : '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('ChatMessengerPage', {
  size: { x: 900 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Left panel
    frame('ConvList', {
      size: { x: 300 },
      autoLayout: vertical({ spacing: 0 }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('ConvHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 14, padY: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [text('Messages', { fontSize: 18, fontWeight: 700, color: '#111827' })],
        }),
        frame('SearchBox', {
          autoLayout: horizontal({ spacing: 0, padX: 14, padY: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SearchInput', {
              autoLayout: horizontal({ spacing: 0, padX: 12, padY: 8 }),
              fills: [solid('#f3f4f6')],
              cornerRadius: 8,
              layoutSizingHorizontal: 'FILL',
              children: [text('Search conversations...', { fontSize: 13, fontWeight: 400, color: '#9ca3af' })],
            }),
          ],
        }),
        conversationItem('Sarah Chen', 'That sounds great! Let me...', '2:34 PM', 2, '#3b82f6', true),
        conversationItem('Alex Kim', 'The design looks perfect', '1:15 PM', 0, '#10b981', false),
        conversationItem('Team Chat', 'Bob: shipped the fix', '12:45 PM', 5, '#f59e0b', false),
        conversationItem('Maria Garcia', 'See you tomorrow!', '11:30 AM', 0, '#7c3aed', false),
        conversationItem('Dev Channel', 'New PR ready for review', '10:00 AM', 1, '#ef4444', false),
      ],
    }),
    // Right panel
    frame('ChatPanel', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Chat header
        frame('ChatHeader', {
          autoLayout: horizontal({ spacing: 12, padX: 16, padY: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Back', { fontSize: 13, fontWeight: 500, color: '#3b82f6' }),
            ellipse('ChatAv', { size: { x: 36, y: 36 }, fills: [solid('#3b82f6')] }),
            frame('ChatUser', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Sarah Chen', { fontSize: 15, fontWeight: 600, color: '#111827' }),
                frame('OnlineStatus', {
                  autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
                  children: [
                    ellipse('OnlineDot', { size: { x: 8, y: 8 }, fills: [solid('#10b981')] }),
                    text('Online', { fontSize: 11, fontWeight: 400, color: '#10b981' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        // Messages
        frame('Messages', {
          autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            chatBubble('Hey Sarah! How is the new design system coming along?', '2:20 PM', true),
            chatBubble('It is going really well! We just finished the component library and are starting on the documentation.', '2:22 PM', false),
            chatBubble('That is awesome! Can you share a preview?', '2:25 PM', true),
            chatBubble('Sure! I will send you the Figma link. We have about 40 components so far.', '2:27 PM', false),
            chatBubble('The tokens are all set up too - colors, spacing, typography. Everything is connected.', '2:28 PM', false),
            chatBubble('Perfect. That sounds great! Let me know when the docs are ready for review.', '2:30 PM', true),
            chatBubble('Will do! Should be ready by end of week.', '2:32 PM', false),
            chatBubble('That sounds great! Let me check my calendar and I will set up a review session.', '2:34 PM', false),
          ],
        }),
        // Input area
        frame('InputArea', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#f9fafb')],
          children: [
            frame('TextInput', {
              autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10 }),
              fills: [solid('#ffffff')],
              cornerRadius: 20,
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
              children: [text('Type a message...', { fontSize: 14, fontWeight: 400, color: '#9ca3af' })],
            }),
            frame('SendBtn', {
              size: { x: 36, y: 36 },
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#3b82f6')],
              cornerRadius: 18,
              children: [text('Send', { fontSize: 10, fontWeight: 600, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
            }),
          ],
        }),
      ],
    }),
  ],
});
