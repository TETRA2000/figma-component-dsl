/**
 * SaaS Notification Center — Tabs, notification items, read/unread
 * Batch 1, Page 8: Technology/SaaS
 * DSL Features: filter tabs, opacity for read/unread, timestamps, icons
 */
import {
  component, frame, rectangle, ellipse, text,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSNotifications', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 48, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Flowbase', { fontSize: 20, fontWeight: 700, color: '#1a1a2e' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavRight', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Notifications', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
            text('Settings', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Notification center
    frame('NotificationCenter', {
      autoLayout: vertical({ spacing: 24, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Header
        frame('Header', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Notifications', { fontSize: 24, fontWeight: 700, color: '#1a1a2e' }),
            frame('HeaderSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            frame('MarkAllBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: { r: 0.82, g: 0.84, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Mark all as read', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
              ],
            }),
          ],
        }),

        // Filter tabs
        frame('FilterTabs', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 10,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            filterTab('All', true),
            filterTab('Unread', false),
            filterTab('Mentions', false),
          ],
        }),

        // Notification list
        frame('NotificationList', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          clipContent: true,
          children: [
            notificationItem(
              'New deployment successful',
              'Your project "Dashboard v2" was deployed to production.',
              '5 min ago',
              '#22c55e',
              true,
            ),
            notificationDivider(),
            notificationItem(
              'Sarah mentioned you',
              '@alex can you review the new auth flow before EOD?',
              '23 min ago',
              '#3b82f6',
              true,
            ),
            notificationDivider(),
            notificationItem(
              'Pull request approved',
              'PR #142 "Refactor API layer" was approved by 2 reviewers.',
              '1 hour ago',
              '#8b5cf6',
              true,
            ),
            notificationDivider(),
            notificationItem(
              'Build failed',
              'CI pipeline for branch feature/auth failed at test stage.',
              '3 hours ago',
              '#ef4444',
              false,
            ),
            notificationDivider(),
            notificationItem(
              'Team invitation accepted',
              'Jordan Lee accepted your invitation to the Design team.',
              '6 hours ago',
              '#f59e0b',
              false,
            ),
            notificationDivider(),
            notificationItem(
              'Weekly usage report',
              'Your team used 84% of the allocated compute hours this week.',
              '1 day ago',
              '#64748b',
              false,
            ),
          ],
        }),
      ],
    }),
  ],
});

function filterTab(label: string, active: boolean) {
  return frame(`Tab: ${label}`, {
    autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active ? [solid('#6366f1')] : [],
    cornerRadius: active ? 8 : 0,
    children: [
      text(label, {
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color: active ? '#ffffff' : '#64748b',
      }),
    ],
  });
}

function notificationItem(
  title: string,
  description: string,
  time: string,
  iconColor: string,
  unread: boolean,
) {
  return frame(`Notification: ${title.substring(0, 20)}`, {
    autoLayout: horizontal({ spacing: 14, padX: 20, padY: 16, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    fills: unread ? [solid('#f0f4ff')] : [solid('#ffffff')],
    opacity: unread ? 1 : 0.7,
    children: [
      // Icon circle
      frame('IconCircle', {
        size: { x: 36, y: 36 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(iconColor, 0.12)],
        cornerRadius: 18,
        children: [
          ellipse('IconDot', {
            size: { x: 10, y: 10 },
            fills: [solid(iconColor)],
          }),
        ],
      }),
      // Content
      frame('Content', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('TitleRow', {
            autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(title, {
                fontSize: 14,
                fontWeight: unread ? 600 : 400,
                color: '#1a1a2e',
                layoutSizingHorizontal: 'FILL',
              }),
              text(time, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
            ],
          }),
          text(description, {
            fontSize: 13,
            fontWeight: 400,
            color: '#64748b',
            lineHeight: { value: 20, unit: 'PIXELS' },
          }),
        ],
      }),
    ],
  });
}

function notificationDivider() {
  return rectangle('Divider', {
    size: { x: 1, y: 1 },
    fills: [solid('#f1f5f9')],
    layoutSizingHorizontal: 'FILL',
  });
}
