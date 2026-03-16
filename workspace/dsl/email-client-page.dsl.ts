/**
 * Email Client — Inbox with message list, preview panel, and folder sidebar
 * DSL features: three-column layout, strokes for dividers, FILL sizing,
 * textAutoResize HEIGHT for email body, ellipse avatars, opacity for read messages
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function folderItem(label: string, count: number, active: boolean) {
  return frame(`Folder: ${label}`, {
    autoLayout: horizontal({ spacing: 8, padX: 16, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(active ? '#e0edff' : '#ffffff')],
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 6,
    children: [
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#1d4ed8' : '#374151' }),
      ...(count > 0 ? [
        frame('Count', {
          autoLayout: horizontal({ spacing: 0, padX: 8, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(active ? '#1d4ed8' : '#e5e7eb')],
          cornerRadius: 9999,
          children: [
            text(String(count), { fontSize: 11, fontWeight: 600, color: active ? '#ffffff' : '#6b7280' }),
          ],
        }),
      ] : []),
    ],
  });
}

function emailRow(sender: string, subject: string, preview: string, time: string, unread: boolean, color: string) {
  return frame(`Email: ${sender}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid(unread ? '#f0f7ff' : '#ffffff')],
    layoutSizingHorizontal: 'FILL',
    opacity: unread ? 1 : 0.85,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse(`Av:${sender}`, { size: { x: 36, y: 36 }, fills: [solid(color)] }),
      frame('EmailInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('EmailTopRow', {
            autoLayout: horizontal({ spacing: 0 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(sender, { fontSize: 13, fontWeight: unread ? 600 : 400, color: '#111827', layoutSizingHorizontal: 'FILL' }),
              text(time, { fontSize: 11, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
          text(subject, { fontSize: 13, fontWeight: unread ? 600 : 400, color: '#1f2937' }),
          text(preview, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
    ],
  });
}

function previewHeader(sender: string, email: string, date: string) {
  return frame('PreviewHeader', {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text('Project Update: Q1 Sprint Review', { fontSize: 18, fontWeight: 700, color: '#111827' }),
      frame('SenderInfo', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse('SenderAv', { size: { x: 40, y: 40 }, fills: [solid('#3b82f6')] }),
          frame('SenderMeta', {
            autoLayout: vertical({ spacing: 2 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(sender, { fontSize: 14, fontWeight: 600, color: '#111827' }),
              text(`<${email}>`, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          text(date, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('EmailClientPage', {
  size: { x: 1100 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Folder sidebar
    frame('FolderSidebar', {
      size: { x: 200 },
      autoLayout: vertical({ spacing: 2, padX: 8, padY: 16 }),
      fills: [solid('#f9fafb')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Mailbox', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 5, unit: 'PERCENT' } }),
        folderItem('Inbox', 12, true),
        folderItem('Starred', 3, false),
        folderItem('Sent', 0, false),
        folderItem('Drafts', 1, false),
        folderItem('Spam', 0, false),
        folderItem('Trash', 0, false),
        rectangle('FolderDivider', { size: { x: 180, y: 1 }, fills: [solid('#e5e7eb')] }),
        text('Labels', { fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 5, unit: 'PERCENT' } }),
        folderItem('Work', 5, false),
        folderItem('Personal', 2, false),
        folderItem('Finance', 0, false),
      ],
    }),
    // Message list
    frame('MessageList', {
      size: { x: 380 },
      autoLayout: vertical({ spacing: 0 }),
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('ListHeader', {
          autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14 }),
          layoutSizingHorizontal: 'FILL',
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Inbox', { fontSize: 16, fontWeight: 700, color: '#111827' }),
          ],
        }),
        emailRow('Sarah Chen', 'Project Update: Q1 Sprint Review', 'Hi team, here is a summary of our progress...', '10:34 AM', true, '#3b82f6'),
        emailRow('Alex Rivera', 'Design System v2 Feedback', 'I reviewed the components and have a few...', '9:15 AM', true, '#10b981'),
        emailRow('Jordan Lee', 'Meeting Notes: Product Sync', 'Attached are the notes from yesterday...', 'Yesterday', false, '#f59e0b'),
        emailRow('Priya Patel', 'Invoice #1042 Approved', 'The finance team has approved your...', 'Yesterday', false, '#8b5cf6'),
        emailRow('Dev Team', 'CI/CD Pipeline Fixed', 'The build issue has been resolved...', 'Mar 12', false, '#ef4444'),
        emailRow('Lisa Wong', 'Conference Talk Proposal', 'Would you be interested in presenting...', 'Mar 11', false, '#ec4899'),
      ],
    }),
    // Preview panel
    frame('PreviewPanel', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        previewHeader('Sarah Chen', 'sarah.chen@company.com', 'Mar 14, 2026 10:34 AM'),
        frame('PreviewBody', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Hi team,\n\nHere is a summary of our progress from the Q1 sprint. We completed 34 out of 38 planned story points, which puts us at 89% completion rate.', {
              fontSize: 14, fontWeight: 400, color: '#374151',
              size: { x: 460 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 165, unit: 'PERCENT' },
            }),
            text('Key highlights:\n- Component library shipped with 42 components\n- Performance improved by 23% on core metrics\n- Two new integrations completed ahead of schedule', {
              fontSize: 14, fontWeight: 400, color: '#374151',
              size: { x: 460 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 165, unit: 'PERCENT' },
            }),
            text('Best regards,\nSarah', {
              fontSize: 14, fontWeight: 400, color: '#374151',
              lineHeight: { value: 165, unit: 'PERCENT' },
            }),
          ],
        }),
      ],
    }),
  ],
});
