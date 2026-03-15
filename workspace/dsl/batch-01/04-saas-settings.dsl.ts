/**
 * SaaS Settings Page — Sidebar nav + form sections
 * Batch 1, Page 4: Technology/SaaS
 * DSL Features: nested layouts, strokes as dividers, text wrapping
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('SaaSSettings', {
  size: { x: 1440, y: 960 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // ── Sidebar ──
    settingsSidebar(),

    // ── Main Content Area ──
    frame('SettingsContent', {
      autoLayout: vertical({ spacing: 0, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',
      children: [
        // Page header
        frame('SettingsHeader', {
          autoLayout: vertical({ spacing: 4, padY: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Settings', { fontSize: 28, fontWeight: 700, color: '#111827' }),
            text('Manage your account settings and preferences.', {
              fontSize: 15,
              fontWeight: 400,
              color: '#6b7280',
              lineHeight: { value: 24, unit: 'PIXELS' },
            }),
          ],
        }),

        rectangle('HeaderDivider', {
          size: { x: 1, y: 1 },
          fills: [solid('#e5e7eb')],
          layoutSizingHorizontal: 'FILL',
        }),

        // ── Profile Section ──
        formSection('Profile', 'Your public profile information.', [
          inputField('Full Name', 'Alex Morgan', 'Your display name visible to team members.'),
          inputField('Email', 'alex@flowbase.io', 'We will send notifications to this address.'),
          textareaField('Bio', 'Product designer and developer based in San Francisco. Building tools for the modern web.'),
          frame('AvatarUpload', {
            autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('CurrentAvatar', {
                size: { x: 64, y: 64 },
                fills: [gradient([
                  { hex: '#6366f1', position: 0 },
                  { hex: '#a78bfa', position: 1 },
                ], 135)],
                cornerRadius: 32,
              }),
              frame('AvatarActions', {
                autoLayout: vertical({ spacing: 6 }),
                children: [
                  frame('UploadBtn', {
                    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                    fills: [solid('#ffffff')],
                    cornerRadius: 8,
                    strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
                    children: [
                      text('Upload new photo', { fontSize: 13, fontWeight: 500, color: '#374151' }),
                    ],
                  }),
                  text('JPG, PNG or GIF. Max 2MB.', { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
                ],
              }),
            ],
          }),
        ]),

        rectangle('Divider1', {
          size: { x: 1, y: 1 },
          fills: [solid('#e5e7eb')],
          layoutSizingHorizontal: 'FILL',
        }),

        // ── Security Section ──
        formSection('Security', 'Manage your password and two-factor authentication.', [
          inputField('Current Password', '••••••••', ''),
          inputField('New Password', '', 'Must be at least 8 characters with a mix of letters and numbers.'),
          toggleRow('Two-factor authentication', 'Add an extra layer of security to your account.', true),
          toggleRow('Login notifications', 'Get notified when someone logs into your account from a new device.', true),
        ]),

        rectangle('Divider2', {
          size: { x: 1, y: 1 },
          fills: [solid('#e5e7eb')],
          layoutSizingHorizontal: 'FILL',
        }),

        // ── Notifications Section ──
        formSection('Notifications', 'Choose what notifications you receive.', [
          toggleRow('Email notifications', 'Receive email updates about your account activity.', true),
          toggleRow('Push notifications', 'Receive push notifications on your mobile device.', false),
          toggleRow('Weekly digest', 'Get a weekly summary of your team activity.', true),
          toggleRow('Marketing emails', 'Receive emails about new features and promotions.', false),
        ]),

        // ── Save Bar ──
        frame('SaveBar', {
          autoLayout: horizontal({ spacing: 12, padY: 24, align: 'MAX', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('CancelBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Cancel', { fontSize: 14, fontWeight: 500, color: '#374151' }),
              ],
            }),
            frame('SaveBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#6366f1')],
              cornerRadius: 8,
              children: [
                text('Save changes', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// ── Helper: Settings Sidebar ──
function settingsSidebar() {
  return frame('SettingsSidebar', {
    autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
    size: { x: 260, y: undefined },
    layoutSizingVertical: 'FILL',
    fills: [solid('#ffffff')],
    strokes: [{ color: { r: 0.91, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Logo
      frame('SidebarBrand', {
        autoLayout: horizontal({ spacing: 10, padX: 20, padY: 20, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('LogoMark', {
            size: { x: 32, y: 32 },
            fills: [gradient([
              { hex: '#6366f1', position: 0 },
              { hex: '#8b5cf6', position: 1 },
            ], 135)],
            cornerRadius: 8,
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            children: [
              text('F', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
          text('Flowbase', { fontSize: 18, fontWeight: 700, color: '#111827' }),
        ],
      }),

      rectangle('BrandDivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),

      frame('SettingsNav', {
        autoLayout: vertical({ spacing: 2, padX: 12, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('ACCOUNT', { fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
          settingsNavItem('Profile', true),
          settingsNavItem('Security', false),
          settingsNavItem('Notifications', false),
          settingsNavItem('Billing', false),
        ],
      }),

      rectangle('NavDivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),

      frame('SettingsNav2', {
        autoLayout: vertical({ spacing: 2, padX: 12, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('WORKSPACE', { fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
          settingsNavItem('General', false),
          settingsNavItem('Team Members', false),
          settingsNavItem('Integrations', false),
          settingsNavItem('API Keys', false),
        ],
      }),

      // Spacer
      frame('SidebarSpacer', {
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'FILL',
        size: { x: 1, y: 1 },
      }),

      rectangle('BottomDivider', {
        size: { x: 1, y: 1 },
        fills: [solid('#e5e7eb')],
        layoutSizingHorizontal: 'FILL',
      }),

      // Back to dashboard
      frame('BackLink', {
        autoLayout: horizontal({ spacing: 8, padX: 20, padY: 16, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('←', { fontSize: 14, fontWeight: 500, color: '#6366f1' }),
          text('Back to Dashboard', { fontSize: 14, fontWeight: 500, color: '#6366f1' }),
        ],
      }),
    ],
  });
}

// ── Helper: Settings Nav Item ──
function settingsNavItem(label: string, active: boolean) {
  return frame(`SettingsNav: ${label}`, {
    autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active ? [solid('#eef2ff')] : [],
    cornerRadius: 8,
    children: [
      text(label, {
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#4f46e5' : '#4b5563',
      }),
    ],
  });
}

// ── Helper: Form Section ──
function formSection(title: string, description: string, children: ReturnType<typeof frame>[]) {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({ spacing: 20, padY: 28 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`${title}Header`, {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 600, color: '#111827' }),
          text(description, {
            fontSize: 14,
            fontWeight: 400,
            color: '#6b7280',
            lineHeight: { value: 20, unit: 'PIXELS' },
          }),
        ],
      }),
      ...children,
    ],
  });
}

// ── Helper: Input Field ──
function inputField(label: string, placeholder: string, hint: string) {
  const children = [
    text(label, { fontSize: 14, fontWeight: 500, color: '#374151' }),
    frame(`Input: ${label}`, {
      autoLayout: horizontal({ padX: 14, padY: 10, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      cornerRadius: 8,
      strokes: [{ color: { r: 0.85, g: 0.87, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text(placeholder || 'Enter value...', {
          fontSize: 14,
          fontWeight: 400,
          color: placeholder ? '#111827' : '#9ca3af',
        }),
      ],
    }),
  ];

  if (hint) {
    children.push(
      text(hint, {
        fontSize: 12,
        fontWeight: 400,
        color: '#9ca3af',
        lineHeight: { value: 18, unit: 'PIXELS' },
        size: { x: 500 },
        textAutoResize: 'HEIGHT',
      }),
    );
  }

  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

// ── Helper: Textarea Field ──
function textareaField(label: string, value: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: '#374151' }),
      frame(`Textarea: ${label}`, {
        autoLayout: horizontal({ padX: 14, padY: 10 }),
        layoutSizingHorizontal: 'FILL',
        size: { x: undefined, y: 80 },
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        strokes: [{ color: { r: 0.85, g: 0.87, b: 0.9, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(value, {
            fontSize: 14,
            fontWeight: 400,
            color: '#111827',
            lineHeight: { value: 22, unit: 'PIXELS' },
            size: { x: 600 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

// ── Helper: Toggle Row ──
function toggleRow(label: string, description: string, enabled: boolean) {
  return frame(`Toggle: ${label}`, {
    autoLayout: horizontal({ spacing: 16, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`ToggleText: ${label}`, {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 14, fontWeight: 500, color: '#111827' }),
          text(description, {
            fontSize: 13,
            fontWeight: 400,
            color: '#6b7280',
            lineHeight: { value: 20, unit: 'PIXELS' },
            size: { x: 480 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
      frame(`ToggleSwitch: ${label}`, {
        size: { x: 44, y: 24 },
        fills: [solid(enabled ? '#6366f1' : '#d1d5db')],
        cornerRadius: 12,
        autoLayout: horizontal({
          padX: 2,
          padY: 2,
          align: enabled ? 'MAX' : 'MIN',
          counterAlign: 'CENTER',
        }),
        children: [
          rectangle('Knob', {
            size: { x: 20, y: 20 },
            fills: [solid('#ffffff')],
            cornerRadius: 10,
          }),
        ],
      }),
    ],
  });
}
