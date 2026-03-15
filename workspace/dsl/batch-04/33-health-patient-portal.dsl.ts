/**
 * Patient Portal Dashboard — Upcoming appointments, test results,
 * prescriptions list, messages count
 * Batch 4, Page 3: Healthcare/Wellness
 * DSL Features: SPACE_BETWEEN, ellipse, strokes, stat blocks
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#f8fafc';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const border = '#e2e8f0';
const green = '#16a34a';
const greenLight = '#dcfce7';
const amber = '#f59e0b';
const amberLight = '#fef3c7';
const red = '#dc2626';
const redLight = '#fee2e2';

export default component('HealthPatientPortal', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('MediCare Portal', { fontSize: 20, fontWeight: 700, color: blue }),
        frame('UserInfo', {
          autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
          children: [
            text('Welcome, John', { fontSize: 14, fontWeight: 500, color: dark }),
            ellipse('UserAvatar', { size: { x: 36, y: 36 }, fills: [solid(lightBlue)] }),
          ],
        }),
      ],
    }),

    /* ---- Quick Stats ---- */
    frame('QuickStats', {
      autoLayout: horizontal({ spacing: 16, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('Upcoming', '3', 'Appointments', blue, lightBlue),
        statCard('Unread', '5', 'Messages', amber, amberLight),
        statCard('Active', '4', 'Prescriptions', green, greenLight),
        statCard('Pending', '2', 'Test Results', red, redLight),
      ],
    }),

    /* ---- Main Content ---- */
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Left column */
        frame('LeftColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Upcoming Appointments */
            frame('Appointments', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                frame('AppointmentsHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Upcoming Appointments', { fontSize: 16, fontWeight: 600, color: dark }),
                    text('View All', { fontSize: 13, fontWeight: 500, color: blue }),
                  ],
                }),
                appointmentRow('Dr. Sarah Mitchell', 'Cardiology', 'Mar 18, 10:30 AM'),
                appointmentRow('Dr. James Chen', 'Neurology', 'Mar 22, 2:00 PM'),
                appointmentRow('Dr. Emily Rodriguez', 'Dermatology', 'Mar 28, 9:00 AM'),
              ],
            }),

            /* Recent Test Results */
            frame('TestResults', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Recent Test Results', { fontSize: 16, fontWeight: 600, color: dark }),
                testResultRow('Complete Blood Count', 'Mar 10', 'Normal'),
                testResultRow('Lipid Panel', 'Mar 8', 'Review'),
                testResultRow('Thyroid Function', 'Feb 28', 'Normal'),
              ],
            }),
          ],
        }),

        /* Right column */
        frame('RightColumn', {
          autoLayout: vertical({ spacing: 24 }),
          size: { x: 380, y: undefined },
          children: [
            /* Prescriptions */
            frame('Prescriptions', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Active Prescriptions', { fontSize: 16, fontWeight: 600, color: dark }),
                prescriptionRow('Lisinopril', '10mg', 'Daily'),
                prescriptionRow('Metformin', '500mg', 'Twice daily'),
                prescriptionRow('Atorvastatin', '20mg', 'At bedtime'),
                prescriptionRow('Vitamin D', '2000 IU', 'Daily'),
              ],
            }),

            /* Messages */
            frame('Messages', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                frame('MsgHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Messages', { fontSize: 16, fontWeight: 600, color: dark }),
                    frame('MsgBadge', {
                      autoLayout: horizontal({ padX: 8, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid(red)],
                      cornerRadius: 10,
                      children: [
                        text('5', { fontSize: 11, fontWeight: 600, color: white }),
                      ],
                    }),
                  ],
                }),
                messageRow('Dr. Mitchell', 'Your test results are ready for review.', '2h ago'),
                messageRow('Lab Center', 'Appointment reminder for tomorrow.', '5h ago'),
                messageRow('Pharmacy', 'Your prescription refill is ready.', '1d ago'),
              ],
            }),
          ],
        }),
      ],
    }),

    /* Bottom padding */
    frame('BottomSpacer', {
      size: { x: 1, y: 32 },
      layoutSizingHorizontal: 'FILL',
    }),
  ],
});

/* ---- helpers ---- */

function statCard(label: string, value: string, subtitle: string, accentColor: string, bgColor: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('StatIcon', {
        autoLayout: horizontal({ padX: 8, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(bgColor)],
        cornerRadius: 8,
        size: { x: 36, y: 36 },
        children: [
          text('●', { fontSize: 14, fontWeight: 600, color: accentColor }),
        ],
      }),
      text(value, { fontSize: 28, fontWeight: 700, color: dark }),
      text(subtitle, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

function appointmentRow(doctor: string, specialty: string, datetime: string) {
  return frame(`Appt: ${doctor}`, {
    autoLayout: horizontal({ spacing: 12, padX: 0, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#f1f5f9'), weight: 1, align: 'INSIDE' }],
    children: [
      ellipse('DocAvatar', { size: { x: 40, y: 40 }, fills: [solid(lightBlue)] }),
      frame('ApptInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(doctor, { fontSize: 14, fontWeight: 600, color: dark }),
          text(specialty, { fontSize: 13, fontWeight: 400, color: gray }),
        ],
      }),
      text(datetime, { fontSize: 12, fontWeight: 500, color: gray }),
    ],
  });
}

function testResultRow(testName: string, date: string, status: string) {
  const statusColor = status === 'Normal' ? green : amber;
  const statusBg = status === 'Normal' ? greenLight : amberLight;
  return frame(`Result: ${testName}`, {
    autoLayout: horizontal({ spacing: 0, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ResultInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(testName, { fontSize: 14, fontWeight: 500, color: dark }),
          text(date, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
      frame(`Status: ${status}`, {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(statusBg)],
        cornerRadius: 12,
        children: [
          text(status, { fontSize: 12, fontWeight: 500, color: statusColor }),
        ],
      }),
    ],
  });
}

function prescriptionRow(name: string, dosage: string, frequency: string) {
  return frame(`Rx: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('RxInfo', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(name, { fontSize: 14, fontWeight: 500, color: dark }),
          text(`${dosage} · ${frequency}`, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
      frame('RefillBtn', {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(lightBlue)],
        cornerRadius: 6,
        children: [
          text('Refill', { fontSize: 12, fontWeight: 500, color: blue }),
        ],
      }),
    ],
  });
}

function messageRow(sender: string, preview: string, time: string) {
  return frame(`Msg: ${sender}`, {
    autoLayout: horizontal({ spacing: 10, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('MsgAvatar', { size: { x: 32, y: 32 }, fills: [solid('#e2e8f0')] }),
      frame('MsgContent', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(sender, { fontSize: 13, fontWeight: 600, color: dark }),
          text(preview, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
      text(time, { fontSize: 11, fontWeight: 400, color: gray }),
    ],
  });
}
