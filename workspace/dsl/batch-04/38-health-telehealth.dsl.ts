/**
 * Telehealth Page — Video call area placeholder, chat sidebar,
 * patient notes, connection status indicator
 * Batch 4, Page 8: Healthcare/Wellness
 * DSL Features: ellipse, SPACE_BETWEEN, strokes, text wrapping
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#0f172a';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const lightGray = '#94a3b8';
const border = '#e2e8f0';
const darkBorder = '#334155';
const green = '#16a34a';
const red = '#dc2626';

export default component('HealthTelehealth', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Top Bar ---- */
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1e293b')],
      children: [
        frame('CallInfo', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            ellipse('DocAvatar', { size: { x: 36, y: 36 }, fills: [solid(lightBlue)] }),
            frame('DocName', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Dr. Sarah Mitchell', { fontSize: 15, fontWeight: 600, color: white }),
                text('Cardiologist', { fontSize: 12, fontWeight: 400, color: lightGray }),
              ],
            }),
          ],
        }),
        frame('CallStatus', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid(green)] }),
            text('Connected', { fontSize: 13, fontWeight: 500, color: green }),
            text('·', { fontSize: 13, fontWeight: 400, color: lightGray }),
            text('12:34', { fontSize: 13, fontWeight: 500, color: lightGray }),
          ],
        }),
        frame('CallActions', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            callButton('🔇', '#334155'),
            callButton('📹', '#334155'),
            callButton('🖥', '#334155'),
            frame('EndCallBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(red)],
              cornerRadius: 8,
              children: [
                text('End Call', { fontSize: 13, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Main Content ---- */
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Video Area */
        frame('VideoArea', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Main Video */
            frame('MainVideo', {
              size: { x: 640, y: 420 },
              fills: [solid('#1e293b')],
              cornerRadius: 12,
              autoLayout: vertical({ spacing: 8, padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                ellipse('DoctorPlaceholder', {
                  size: { x: 120, y: 120 },
                  fills: [solid('#334155')],
                }),
                text('Dr. Sarah Mitchell', { fontSize: 16, fontWeight: 500, color: lightGray }),
              ],
            }),

            /* Self View (PiP) */
            frame('SelfView', {
              size: { x: 180, y: 120 },
              fills: [solid('#334155')],
              cornerRadius: 8,
              autoLayout: vertical({ spacing: 4, padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
              strokes: [{ color: hex(blue), weight: 2, align: 'INSIDE' }],
              children: [
                ellipse('SelfPlaceholder', {
                  size: { x: 40, y: 40 },
                  fills: [solid('#475569')],
                }),
                text('You', { fontSize: 12, fontWeight: 500, color: lightGray }),
              ],
            }),

            /* Patient Notes */
            frame('PatientNotes', {
              autoLayout: vertical({ spacing: 10, padX: 20, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1e293b')],
              cornerRadius: 10,
              children: [
                frame('NotesHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Session Notes', { fontSize: 14, fontWeight: 600, color: white }),
                    text('Auto-saving...', { fontSize: 11, fontWeight: 400, color: lightGray }),
                  ],
                }),
                rectangle('NotesDivider', {
                  size: { x: 1, y: 1 },
                  fills: [solid(darkBorder)],
                  layoutSizingHorizontal: 'FILL',
                }),
                text('• Patient reports improved blood pressure readings\n• Current medication regimen appears effective\n• Discussed dietary modifications\n• Follow-up labs ordered for next visit', {
                  fontSize: 13, fontWeight: 400, color: lightGray,
                  lineHeight: { value: 22, unit: 'PIXELS' },
                  size: { x: 580 },
                  textAutoResize: 'HEIGHT',
                }),
              ],
            }),
          ],
        }),

        /* Chat Sidebar */
        frame('ChatSidebar', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 340, y: undefined },
          fills: [solid('#1e293b')],
          strokes: [{ color: hex(darkBorder), weight: 1, align: 'INSIDE' }],
          children: [
            /* Chat Header */
            frame('ChatHeader', {
              autoLayout: horizontal({ padX: 16, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex(darkBorder), weight: 1, align: 'INSIDE' }],
              children: [
                text('Chat', { fontSize: 15, fontWeight: 600, color: white }),
                text('3 messages', { fontSize: 12, fontWeight: 400, color: lightGray }),
              ],
            }),

            /* Messages */
            frame('Messages', {
              autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                chatMessage('Dr. Mitchell', 'Hello John, how have you been feeling this week?', '12:30 PM', false),
                chatMessage('You', 'Much better, doctor. The new medication seems to be working well.', '12:31 PM', true),
                chatMessage('Dr. Mitchell', 'Great to hear! Let me review your latest readings.', '12:32 PM', false),
              ],
            }),

            /* Spacer to push input to bottom */
            frame('ChatSpacer', {
              layoutSizingHorizontal: 'FILL',
              layoutSizingVertical: 'FILL',
              size: { x: 1, y: 80 },
            }),

            /* Chat Input */
            frame('ChatInput', {
              autoLayout: horizontal({ spacing: 8, padX: 16, padY: 12, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: hex(darkBorder), weight: 1, align: 'INSIDE' }],
              children: [
                frame('InputField', {
                  autoLayout: horizontal({ padX: 12, padY: 10 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#334155')],
                  cornerRadius: 8,
                  children: [
                    text('Type a message...', { fontSize: 13, fontWeight: 400, color: '#475569' }),
                  ],
                }),
                frame('SendBtn', {
                  autoLayout: horizontal({ padX: 12, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid(blue)],
                  cornerRadius: 8,
                  children: [
                    text('Send', { fontSize: 13, fontWeight: 600, color: white }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function callButton(icon: string, bgColor: string) {
  return frame(`CallBtn: ${icon}`, {
    autoLayout: horizontal({ padX: 12, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(bgColor)],
    cornerRadius: 8,
    children: [
      text(icon, { fontSize: 16, fontWeight: 400, color: white }),
    ],
  });
}

function chatMessage(sender: string, message: string, time: string, isUser: boolean) {
  return frame(`Msg: ${sender}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('MsgHeader', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text(sender, { fontSize: 12, fontWeight: 600, color: isUser ? blue : lightGray }),
          text(time, { fontSize: 11, fontWeight: 400, color: '#475569' }),
        ],
      }),
      frame('MsgBubble', {
        autoLayout: horizontal({ padX: 12, padY: 8 }),
        fills: [solid(isUser ? '#0c4a6e' : '#334155')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        children: [
          text(message, {
            fontSize: 13, fontWeight: 400, color: isUser ? '#bae6fd' : lightGray,
            lineHeight: { value: 20, unit: 'PIXELS' },
            size: { x: 270 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}
