import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const teal = '#0d9488';
const tealLight = '#14b8a6';
const tealBg = '#f0fdfa';
const navy = '#1e293b';
const white = '#ffffff';
const bgGray = '#f8fafc';
const border = '#e2e8f0';
const textDark = '#1e293b';
const textMed = '#64748b';
const textLight = '#94a3b8';
const red = '#ef4444';
const amber = '#f59e0b';
const blue = '#3b82f6';

// Vital stat card
function vitalCard(label: string, value: string, unit: string, status: string, statusColor: string) {
  return frame(`Vital: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('VitalHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(label, { fontSize: 13, fontWeight: 500, color: textMed }),
          frame('StatusBadge', {
            autoLayout: horizontal({ padX: 8, padY: 2 }),
            fills: [solid(statusColor, 0.1)],
            cornerRadius: 9999,
            children: [
              text(status, { fontSize: 11, fontWeight: 600, color: statusColor }),
            ],
          }),
        ],
      }),
      frame('VitalValue', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 32, fontWeight: 700, color: textDark }),
          text(unit, { fontSize: 14, fontWeight: 400, color: textMed }),
        ],
      }),
    ],
  });
}

// Patient row
function patientRow(name: string, age: string, condition: string, priority: string, priorityColor: string) {
  return frame(`Patient: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    cornerRadius: 8,
    children: [
      frame('PatientInfo', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('PatientAvatar', {
            size: { x: 36, y: 36 },
            fills: [solid(teal, 0.15)],
          }),
          frame('PatientDetails', {
            autoLayout: vertical({ spacing: 1 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 600, color: textDark }),
              text(`Age: ${age} · ${condition}`, { fontSize: 12, fontWeight: 400, color: textMed }),
            ],
          }),
        ],
      }),
      frame('PriorityBadge', {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid(priorityColor, 0.1)],
        cornerRadius: 9999,
        strokes: [{ color: { r: 0, g: 0, b: 0, a: 0 }, weight: 0, align: 'INSIDE' as const }],
        children: [
          text(priority, { fontSize: 12, fontWeight: 600, color: priorityColor }),
        ],
      }),
    ],
  });
}

// Donut chart section
function donutChart(title: string, percentage: number, color: string) {
  return frame(`Chart: ${title}`, {
    autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
    size: { x: 120, y: undefined },
    children: [
      frame('DonutRing', {
        size: { x: 80, y: 80 },
        children: [
          ellipse('BgRing', {
            size: { x: 80, y: 80 },
            fills: [],
            strokes: [{ color: { r: 0.9, g: 0.92, b: 0.94, a: 1 }, weight: 8, align: 'INSIDE' as const }],
          }),
          ellipse('FgRing', {
            size: { x: 80, y: 80 },
            fills: [],
            strokes: [{ color: { ...parseColor(color), a: 1 }, weight: 8, align: 'INSIDE' as const }],
          }),
        ],
      }),
      text(`${percentage}%`, { fontSize: 18, fontWeight: 700, color: textDark, textAlignHorizontal: 'CENTER' as const }),
      text(title, { fontSize: 12, fontWeight: 400, color: textMed, textAlignHorizontal: 'CENTER' as const }),
    ],
  });
}

function parseColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

// Appointment row
function appointmentRow(time: string, patient: string, type: string) {
  return frame(`Appt: ${time}`, {
    autoLayout: horizontal({ spacing: 12, padX: 12, padY: 10, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('TimeBlock', {
        autoLayout: horizontal({ padX: 8, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(tealBg)],
        cornerRadius: 6,
        size: { x: 60, y: undefined },
        children: [
          text(time, { fontSize: 12, fontWeight: 600, color: teal }),
        ],
      }),
      frame('ApptInfo', {
        autoLayout: vertical({ spacing: 1 }),
        children: [
          text(patient, { fontSize: 13, fontWeight: 600, color: textDark }),
          text(type, { fontSize: 12, fontWeight: 400, color: textMed }),
        ],
      }),
    ],
  });
}

export default frame('HealthcareDashboard', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bgGray)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('LogoMark', { size: { x: 28, y: 28 }, fills: [solid(teal)] }),
            text('MedView', { fontSize: 18, fontWeight: 700, color: textDark }),
          ],
        }),
        frame('HeaderNav', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 600, color: teal }),
            text('Patients', { fontSize: 14, fontWeight: 400, color: textMed }),
            text('Schedule', { fontSize: 14, fontWeight: 400, color: textMed }),
            text('Reports', { fontSize: 14, fontWeight: 400, color: textMed }),
            ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [solid(teal, 0.2)] }),
          ],
        }),
      ],
    }),

    // Main content
    frame('Content', {
      autoLayout: vertical({ spacing: 20, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Welcome + vitals row
        frame('TopSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Welcome', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('WelcomeText', {
                  autoLayout: vertical({ spacing: 4 }),
                  children: [
                    text('Good morning, Dr. Chen', { fontSize: 22, fontWeight: 700, color: textDark }),
                    text('You have 8 appointments today', { fontSize: 14, fontWeight: 400, color: textMed }),
                  ],
                }),
                frame('TodayBadge', {
                  autoLayout: horizontal({ padX: 16, padY: 8 }),
                  fills: [solid(tealBg)],
                  cornerRadius: 9999,
                  strokes: [{ color: { r: 0.05, g: 0.58, b: 0.53, a: 0.3 }, weight: 1, align: 'INSIDE' as const }],
                  children: [
                    text('March 14, 2026', { fontSize: 13, fontWeight: 500, color: teal }),
                  ],
                }),
              ],
            }),
            // Vital cards
            frame('VitalCards', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                vitalCard('Heart Rate', '72', 'bpm', 'Normal', teal),
                vitalCard('Blood Pressure', '120/80', 'mmHg', 'Normal', teal),
                vitalCard('Temperature', '98.6', '°F', 'Normal', teal),
                vitalCard('SpO2', '98', '%', 'Normal', teal),
                vitalCard('Blood Sugar', '142', 'mg/dL', 'Elevated', amber),
              ],
            }),
          ],
        }),

        // Bottom section: patients + charts + schedule
        frame('BottomSection', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Patient list
            frame('PatientList', {
              autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
              fills: [solid(white)],
              cornerRadius: 12,
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('PatientHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Active Patients', { fontSize: 16, fontWeight: 600, color: textDark }),
                    text('View All', { fontSize: 13, fontWeight: 500, color: teal }),
                  ],
                }),
                patientRow('Emma Thompson', '45', 'Post-op Recovery', 'High', red),
                patientRow('James Wilson', '67', 'Cardiac Monitoring', 'Medium', amber),
                patientRow('Sarah Lee', '32', 'Routine Checkup', 'Low', teal),
                patientRow('Michael Brown', '58', 'Diabetes Management', 'Medium', amber),
              ],
            }),

            // Right column: charts + schedule
            frame('RightCol', {
              autoLayout: vertical({ spacing: 16 }),
              size: { x: 380, y: undefined },
              children: [
                // Department stats
                frame('DeptStats', {
                  autoLayout: vertical({ spacing: 16, padX: 20, padY: 16 }),
                  fills: [solid(white)],
                  cornerRadius: 12,
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Department Overview', { fontSize: 16, fontWeight: 600, color: textDark }),
                    frame('Charts', {
                      autoLayout: horizontal({ spacing: 16, align: 'SPACE_BETWEEN' }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        donutChart('Occupancy', 78, teal),
                        donutChart('Satisfaction', 92, blue),
                        donutChart('On-time', 85, amber),
                      ],
                    }),
                  ],
                }),

                // Upcoming appointments
                frame('Appointments', {
                  autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
                  fills: [solid(white)],
                  cornerRadius: 12,
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Upcoming Appointments', { fontSize: 16, fontWeight: 600, color: textDark }),
                    appointmentRow('9:00', 'Emma Thompson', 'Post-op Follow-up'),
                    appointmentRow('9:45', 'James Wilson', 'Cardiac Review'),
                    appointmentRow('10:30', 'Sarah Lee', 'Annual Physical'),
                    appointmentRow('11:15', 'Michael Brown', 'Diabetes Consult'),
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
