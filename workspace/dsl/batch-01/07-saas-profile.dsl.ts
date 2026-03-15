/**
 * SaaS User Profile Page — Avatar, stats, activity
 * Batch 1, Page 7: Technology/SaaS
 * DSL Features: ellipse avatar, stats row, activity list
 */
import {
  component, frame, rectangle, ellipse, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSProfile', {
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
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Profile', { fontSize: 14, fontWeight: 600, color: '#6366f1' }),
            text('Settings', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Profile content
    frame('ProfileContent', {
      autoLayout: vertical({ spacing: 32, padX: 48, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Profile header card
        frame('ProfileCard', {
          autoLayout: vertical({ spacing: 24, padX: 32, padY: 32, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Avatar
            ellipse('Avatar', {
              size: { x: 96, y: 96 },
              fills: [
                gradient([
                  { hex: '#6366f1', position: 0 },
                  { hex: '#8b5cf6', position: 1 },
                ], 135),
              ],
            }),

            // Name and bio
            frame('NameBio', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                text('Alex Johnson', { fontSize: 24, fontWeight: 700, color: '#1a1a2e' }),
                text('Senior Product Designer', {
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#64748b',
                }),
                text('Building design systems and component libraries.\nPassionate about clean UI and developer experience.', {
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#94a3b8',
                  textAlignHorizontal: 'CENTER',
                  lineHeight: { value: 22, unit: 'PIXELS' },
                }),
              ],
            }),

            // Stats row
            frame('StatsRow', {
              autoLayout: horizontal({ spacing: 48, counterAlign: 'CENTER' }),
              children: [
                statItem('42', 'Projects'),
                statItem('1,280', 'Followers'),
                statItem('384', 'Following'),
              ],
            }),

            // Edit profile button
            frame('EditProfileBtn', {
              autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              strokes: [{ color: { r: 0.82, g: 0.84, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Edit Profile', { fontSize: 14, fontWeight: 500, color: '#374151' }),
              ],
            }),
          ],
        }),

        // Recent Activity
        frame('RecentActivity', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#ffffff')],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Recent Activity', { fontSize: 18, fontWeight: 600, color: '#1a1a2e' }),
            rectangle('Divider', {
              size: { x: 1, y: 1 },
              fills: [solid('#e5e7eb')],
              layoutSizingHorizontal: 'FILL',
            }),
            activityItem('Deployed v2.4.0 to production', '2 hours ago', '#22c55e'),
            activityItem('Merged pull request #127', '5 hours ago', '#6366f1'),
            activityItem('Commented on issue #89', '1 day ago', '#f59e0b'),
            activityItem('Created new project "Design Tokens"', '2 days ago', '#3b82f6'),
            activityItem('Updated team permissions', '3 days ago', '#8b5cf6'),
          ],
        }),
      ],
    }),
  ],
});

function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      text(value, { fontSize: 22, fontWeight: 700, color: '#1a1a2e' }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

function activityItem(description: string, time: string, dotColor: string) {
  return frame(`Activity: ${description.substring(0, 20)}`, {
    autoLayout: horizontal({ spacing: 12, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Dot', {
        size: { x: 8, y: 8 },
        fills: [solid(dotColor)],
      }),
      text(description, {
        fontSize: 14,
        fontWeight: 400,
        color: '#374151',
        layoutSizingHorizontal: 'FILL',
      }),
      text(time, { fontSize: 13, fontWeight: 400, color: '#94a3b8' }),
    ],
  });
}
