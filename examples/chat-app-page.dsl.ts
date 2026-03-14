import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const indigo = '#4f46e5'; const indigoBg = '#eef2ff'; const white = '#ffffff'; const bg = '#f9fafb';
const dark = '#111827'; const med = '#6b7280'; const light = '#9ca3af'; const green = '#22c55e';

function chatBubble(msg: string, time: string, isMine: boolean) {
  return frame(`Msg: ${msg.substring(0, 15)}`, {
    autoLayout: horizontal({ align: isMine ? 'MAX' : 'MIN' }), layoutSizingHorizontal: 'FILL',
    children: [
      frame('Bubble', {
        autoLayout: vertical({ spacing: 4, padX: 14, padY: 10 }),
        fills: [solid(isMine ? indigo : white)],
        cornerRadius: 16, size: { x: 320, y: undefined },
        strokes: isMine ? [] : [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [
          text(msg, { fontSize: 14, fontWeight: 400, color: isMine ? white : dark, size: { x: 292 }, textAutoResize: 'HEIGHT' as const }),
          text(time, { fontSize: 11, fontWeight: 400, color: isMine ? '#c7d2fe' : light }),
        ],
      }),
    ],
  });
}

function contactItem(name: string, lastMsg: string, time: string, unread: number, isActive: boolean) {
  return frame(`Contact: ${name}`, {
    autoLayout: horizontal({ padX: 12, padY: 10, spacing: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: isActive ? [solid(indigoBg)] : [],
    children: [
      frame('AvatarWrap', { size: { x: 40, y: 40 }, children: [
        ellipse('Avatar', { size: { x: 40, y: 40 }, fills: [solid(indigo, 0.15)] }),
        ...(unread > 0 ? [ellipse('Online', { size: { x: 10, y: 10 }, fills: [solid(green)] })] : []),
      ]}),
      frame('ContactInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        frame('NameTime', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text(name, { fontSize: 14, fontWeight: isActive ? 600 : 400, color: dark }),
          text(time, { fontSize: 11, fontWeight: 400, color: light }),
        ]}),
        frame('MsgUnread', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text(lastMsg, { fontSize: 12, fontWeight: 400, color: med }),
          ...(unread > 0 ? [frame('Badge', { autoLayout: horizontal({ padX: 6, padY: 2 }), fills: [solid(indigo)], cornerRadius: 9999,
            children: [text(String(unread), { fontSize: 10, fontWeight: 600, color: white })] })] : []),
        ]}),
      ]}),
    ],
  });
}

export default frame('ChatApp', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('ContactList', {
      autoLayout: vertical({ spacing: 0 }), size: { x: 340, y: undefined }, fills: [solid(white)],
      strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('ListHeader', { autoLayout: horizontal({ padX: 16, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Messages', { fontSize: 20, fontWeight: 700, color: dark }),
            ellipse('ComposeBtn', { size: { x: 32, y: 32 }, fills: [solid(indigoBg)] }),
          ] }),
        frame('SearchBar', { autoLayout: horizontal({ padX: 16, padY: 8 }), layoutSizingHorizontal: 'FILL', children: [
          frame('SearchInput', { autoLayout: horizontal({ padX: 12, padY: 8 }), fills: [solid(bg)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
            children: [text('Search conversations...', { fontSize: 13, fontWeight: 400, color: light })] }),
        ]}),
        contactItem('Sarah Chen', 'Sounds great! Let me know...', '2m', 3, true),
        contactItem('Alex Rivera', 'The designs look awesome', '15m', 0, false),
        contactItem('Design Team', 'Maya: Updated the prototype', '1h', 5, false),
        contactItem('James Wu', 'Can we meet tomorrow?', '3h', 0, false),
        contactItem('Emily Brown', 'Thanks for the review!', 'Yesterday', 0, false),
      ],
    }),
    frame('ChatArea', {
      autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ChatHeader', {
          autoLayout: horizontal({ padX: 20, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL', fills: [solid(white)],
          strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('ChatUser', { autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }), children: [
              ellipse('ChatAvatar', { size: { x: 36, y: 36 }, fills: [solid(indigo, 0.15)] }),
              frame('ChatUserInfo', { autoLayout: vertical({ spacing: 1 }), children: [
                text('Sarah Chen', { fontSize: 15, fontWeight: 600, color: dark }),
                text('Online', { fontSize: 12, fontWeight: 400, color: green }),
              ]}),
            ]}),
            frame('Actions', { autoLayout: horizontal({ spacing: 12 }), children: [
              ellipse('CallBtn', { size: { x: 32, y: 32 }, fills: [solid(bg)] }),
              ellipse('VideoBtn', { size: { x: 32, y: 32 }, fills: [solid(bg)] }),
            ]}),
          ],
        }),
        frame('Messages', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }), layoutSizingHorizontal: 'FILL',
          children: [
            chatBubble('Hey! I just finished the new component library. Want to take a look?', '10:30 AM', false),
            chatBubble('Absolutely! Share the link and I will review it right away.', '10:32 AM', true),
            chatBubble('Here it is. I focused on making the design tokens consistent across all components. Let me know what you think!', '10:33 AM', false),
            chatBubble('This looks really polished! Love the attention to spacing and typography. A few small suggestions on the button variants.', '10:35 AM', true),
            chatBubble('Sounds great! Let me know when you have the detailed feedback ready.', '10:36 AM', false),
          ],
        }),
        frame('InputBar', {
          autoLayout: horizontal({ padX: 20, padY: 12, spacing: 10, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL', fills: [solid(white)],
          strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('MsgInput', { autoLayout: horizontal({ padX: 14, padY: 10 }), fills: [solid(bg)], cornerRadius: 24, layoutSizingHorizontal: 'FILL',
              children: [text('Type a message...', { fontSize: 14, fontWeight: 400, color: light })] }),
            frame('SendBtn', { size: { x: 40, y: 40 }, fills: [solid(indigo)], cornerRadius: 20,
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              children: [ellipse('SendIcon', { size: { x: 16, y: 16 }, fills: [solid(white)] })] }),
          ],
        }),
      ],
    }),
  ],
});
