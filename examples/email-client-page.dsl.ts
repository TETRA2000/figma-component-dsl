import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const blue = '#2563eb'; const blueBg = '#eff6ff'; const white = '#ffffff'; const bg = '#f1f5f9';
const dark = '#0f172a'; const med = '#64748b'; const lightGray = '#94a3b8'; const border = '#e2e8f0';
const red = '#ef4444'; const green = '#22c55e'; const amber = '#f59e0b';

function emailRow(sender: string, subject: string, preview: string, time: string, isRead: boolean, hasAttach: boolean, label?: string, labelColor?: string) {
  return frame(`Email: ${subject}`, {
    autoLayout: horizontal({ padX: 16, padY: 12, spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: isRead ? [] : [solid(blueBg)],
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Checkbox', { size: { x: 18, y: 18 }, fills: [], strokes: [{ color: { r: 0.7, g: 0.75, b: 0.8, a: 1 }, weight: 1.5, align: 'INSIDE' as const }] }),
      ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [solid(blue, 0.15)] }),
      frame('EmailContent', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        frame('SubjectLine', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          text(sender, { fontSize: 14, fontWeight: isRead ? 400 : 600, color: dark }),
          ...(label ? [frame('Label', { autoLayout: horizontal({ padX: 6, padY: 1 }), fills: [solid(labelColor!, 0.1)], cornerRadius: 4, children: [
            text(label, { fontSize: 10, fontWeight: 600, color: labelColor! }),
          ]})] : []),
        ]}),
        text(subject, { fontSize: 13, fontWeight: isRead ? 400 : 600, color: isRead ? med : dark }),
        text(preview, { fontSize: 12, fontWeight: 400, color: lightGray, size: { x: 500 }, textAutoResize: 'HEIGHT' as const }),
      ]}),
      frame('EmailMeta', { autoLayout: vertical({ spacing: 4, counterAlign: 'MAX' }), children: [
        text(time, { fontSize: 12, fontWeight: 400, color: med }),
        ...(hasAttach ? [ellipse('AttachIcon', { size: { x: 14, y: 14 }, fills: [solid(med, 0.3)] })] : []),
      ]}),
    ],
  });
}

function folderItem(name: string, count: string, active: boolean) {
  return frame(`Folder: ${name}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: active ? [solid(blueBg)] : [], cornerRadius: 8,
    children: [
      text(name, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? blue : dark }),
      ...(count !== '0' ? [frame('Count', {
        autoLayout: horizontal({ padX: 6, padY: 1, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(active ? blue : '#94a3b8', active ? 1 : 0.15)], cornerRadius: 9999,
        children: [text(count, { fontSize: 11, fontWeight: 600, color: active ? white : med })],
      })] : []),
    ],
  });
}

export default frame('EmailClient', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 16, padX: 16, padY: 20 }), size: { x: 240, y: undefined },
      fills: [solid(white)],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('MailBox', { fontSize: 20, fontWeight: 700, color: blue }),
        frame('ComposeBtn', {
          autoLayout: horizontal({ padX: 0, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(blue)], cornerRadius: 10, layoutSizingHorizontal: 'FILL',
          children: [text('Compose', { fontSize: 14, fontWeight: 600, color: white })],
        }),
        frame('Folders', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
          folderItem('Inbox', '12', true),
          folderItem('Starred', '3', false),
          folderItem('Sent', '0', false),
          folderItem('Drafts', '2', false),
          folderItem('Spam', '8', false),
          folderItem('Trash', '0', false),
        ]}),
        rectangle('Divider', { size: { x: 1, y: 1 }, fills: [solid(border)], layoutSizingHorizontal: 'FILL' }),
        text('Labels', { fontSize: 12, fontWeight: 600, color: lightGray }),
        frame('Labels', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
          frame('LabelWork', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
            rectangle('Dot', { size: { x: 8, y: 8 }, fills: [solid(blue)], cornerRadius: 4 }),
            text('Work', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
          frame('LabelPersonal', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
            rectangle('Dot2', { size: { x: 8, y: 8 }, fills: [solid(green)], cornerRadius: 4 }),
            text('Personal', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
          frame('LabelUrgent', { autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }), children: [
            rectangle('Dot3', { size: { x: 8, y: 8 }, fills: [solid(red)], cornerRadius: 4 }),
            text('Urgent', { fontSize: 13, fontWeight: 400, color: dark }),
          ]}),
        ]}),
      ],
    }),
    frame('Main', {
      autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        frame('Toolbar', {
          autoLayout: horizontal({ padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('SearchBar', {
              autoLayout: horizontal({ padX: 12, padY: 8, spacing: 8, counterAlign: 'CENTER' }),
              fills: [solid('#f1f5f9')], cornerRadius: 8, size: { x: 360, y: undefined },
              children: [
                ellipse('SearchIcon', { size: { x: 14, y: 14 }, fills: [solid(med, 0.4)] }),
                text('Search emails...', { fontSize: 13, fontWeight: 400, color: lightGray }),
              ],
            }),
            frame('Actions', { autoLayout: horizontal({ spacing: 8 }), children: [
              text('All', { fontSize: 13, fontWeight: 600, color: blue }),
              text('Unread', { fontSize: 13, fontWeight: 400, color: med }),
              text('Starred', { fontSize: 13, fontWeight: 400, color: med }),
            ]}),
          ],
        }),
        emailRow('Alice Johnson', 'Project kickoff meeting', 'Hi team, I wanted to schedule a kickoff meeting for the new project. Can everyone...', '10:30 AM', false, true, 'Work', blue),
        emailRow('GitHub', 'Pull request merged: #1234', 'Your pull request has been merged into the main branch. Changes will be deployed...', '9:15 AM', false, false),
        emailRow('Design Team', 'New brand guidelines ready', 'The updated brand guidelines document is ready for review. Please take a look...', 'Yesterday', true, true, 'Work', blue),
        emailRow('Mom', 'Dinner plans this weekend?', 'Hey! Are you free for dinner this Saturday? Dad and I were thinking of trying...', 'Yesterday', true, false, 'Personal', green),
        emailRow('AWS', 'Your monthly invoice is ready', 'Your AWS invoice for February 2026 is now available. Total: $142.87...', 'Mar 12', true, true),
        emailRow('Sarah Chen', 'RE: Design review feedback', 'Thanks for the detailed feedback! I have updated the mockups based on your suggestions...', 'Mar 12', true, false, 'Urgent', red),
        emailRow('Newsletter', 'This week in tech: AI updates', 'The latest developments in AI and machine learning from around the industry...', 'Mar 11', true, false),
      ],
    }),
  ],
});
