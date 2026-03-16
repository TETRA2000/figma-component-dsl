/**
 * Settings Page — Toggle sections, form fields, user preferences
 * DSL features: sidebar navigation, form layout, toggle switches (on/off), section dividers, avatar upload
 */
import { frame, text, rectangle, ellipse, solid, horizontal, vertical } from '@figma-dsl/core';

function navItem(label: string, active: boolean) {
  return frame(`Nav: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10 }),
    fills: [solid(active ? '#eff6ff' : '#00000000')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    children: [text(label, { fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#3b82f6' : '#6b7280' })],
  });
}

function toggleRow(label: string, desc: string, on: boolean) {
  return frame(`Toggle: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 16, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('ToggleInfo', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
        text(label, { fontSize: 14, fontWeight: 500, color: '#111827' }),
        text(desc, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
      ]}),
      frame('Switch', {
        size: { x: 44, y: 24 },
        fills: [solid(on ? '#3b82f6' : '#d1d5db')],
        cornerRadius: 12,
        children: [
          ellipse('Knob', { size: { x: 20, y: 20 }, fills: [solid('#ffffff')] }),
        ],
      }),
    ],
  });
}

function formField(label: string, value: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#374151' }),
      frame('Input', {
        autoLayout: horizontal({ spacing: 0, padX: 14, padY: 10 }),
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(value, { fontSize: 14, fontWeight: 400, color: '#111827' })],
      }),
    ],
  });
}

export default frame('SettingsPage', {
  size: { x: 1000 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f9fafb')],
  children: [
    // Sidebar
    frame('SettingsNav', {
      size: { x: 220 },
      autoLayout: vertical({ spacing: 4, padX: 12, padY: 24 }),
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Settings', { fontSize: 18, fontWeight: 700, color: '#111827' }),
        navItem('Profile', true),
        navItem('Notifications', false),
        navItem('Privacy', false),
        navItem('Security', false),
        navItem('Billing', false),
        navItem('Integrations', false),
      ],
    }),
    // Main content
    frame('SettingsContent', {
      autoLayout: vertical({ spacing: 24, padX: 40, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Profile Settings', { fontSize: 22, fontWeight: 700, color: '#111827' }),
        // Avatar section
        frame('AvatarSection', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            ellipse('ProfilePic', { size: { x: 72, y: 72 }, fills: [solid('#4f46e5')] }),
            frame('AvatarActions', { autoLayout: vertical({ spacing: 6 }), children: [
              text('Profile Photo', { fontSize: 14, fontWeight: 600, color: '#111827' }),
              text('JPG, PNG or GIF. Max 2MB.', { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
              frame('UploadBtn', { autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER' }), fills: [solid('#ffffff')], cornerRadius: 6, strokes: [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' }], children: [text('Upload', { fontSize: 12, fontWeight: 500, color: '#374151' })] }),
            ]}),
          ],
        }),
        // Form fields
        frame('FormFields', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('FieldRow', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              formField('First Name', 'Alex'),
              formField('Last Name', 'Rivera'),
            ]}),
            formField('Email', 'alex@example.com'),
            formField('Bio', 'Designer and developer passionate about creating beautiful interfaces.'),
          ],
        }),
        // Notification toggles
        frame('Toggles', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Notifications', { fontSize: 16, fontWeight: 600, color: '#111827' }),
            toggleRow('Email Notifications', 'Receive updates via email', true),
            toggleRow('Push Notifications', 'Get notified on your device', true),
            toggleRow('Marketing Emails', 'Receive promotional content', false),
            toggleRow('Weekly Digest', 'Summary of your activity', true),
          ],
        }),
        // Save button
        frame('SaveBtn', {
          autoLayout: horizontal({ padX: 32, padY: 10, align: 'CENTER' }),
          fills: [solid('#3b82f6')],
          cornerRadius: 8,
          children: [text('Save Changes', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});
