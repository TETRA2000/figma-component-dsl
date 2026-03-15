/**
 * Medication Tracker — Current medications list, dosage info, schedule times,
 * refill reminders, interaction warnings
 * Batch 4, Page 5: Healthcare/Wellness
 * DSL Features: ellipse, SPACE_BETWEEN, strokes, progress bars, text wrapping
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

export default component('HealthMedication', {
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
        text('Medication Tracker', { fontSize: 22, fontWeight: 700, color: dark }),
        frame('AddBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8, spacing: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(blue)],
          cornerRadius: 8,
          children: [
            text('+ Add Medication', { fontSize: 13, fontWeight: 600, color: white }),
          ],
        }),
      ],
    }),

    /* ---- Today's Schedule ---- */
    frame('TodaySchedule', {
      autoLayout: vertical({ spacing: 16, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text("Today's Schedule", { fontSize: 18, fontWeight: 600, color: dark }),
        frame('TimeSlots', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            scheduleSlot('Morning', '8:00 AM', [
              { name: 'Lisinopril', dosage: '10mg', taken: true },
              { name: 'Metformin', dosage: '500mg', taken: true },
            ]),
            scheduleSlot('Afternoon', '2:00 PM', [
              { name: 'Metformin', dosage: '500mg', taken: false },
            ]),
            scheduleSlot('Evening', '8:00 PM', [
              { name: 'Atorvastatin', dosage: '20mg', taken: false },
              { name: 'Vitamin D', dosage: '2000 IU', taken: false },
            ]),
          ],
        }),
      ],
    }),

    /* ---- Main Content ---- */
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Medications List */
        frame('MedicationsList', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Current Medications', { fontSize: 18, fontWeight: 600, color: dark }),
            medicationCard('Lisinopril', '10mg', 'Once daily — Morning', 'Blood Pressure', 18, 30, green),
            medicationCard('Metformin', '500mg', 'Twice daily — Morning & Afternoon', 'Diabetes', 12, 30, blue),
            medicationCard('Atorvastatin', '20mg', 'Once daily — Evening', 'Cholesterol', 5, 30, amber),
            medicationCard('Vitamin D', '2000 IU', 'Once daily — Evening', 'Supplement', 25, 30, green),
          ],
        }),

        /* Right panel */
        frame('RightPanel', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 360, y: undefined },
          children: [
            /* Refill Reminders */
            frame('RefillReminders', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Refill Reminders', { fontSize: 16, fontWeight: 600, color: dark }),
                refillRow('Atorvastatin', '5 days left', red),
                refillRow('Metformin', '12 days left', amber),
                refillRow('Lisinopril', '18 days left', green),
              ],
            }),

            /* Interaction Warnings */
            frame('InteractionWarnings', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(redLight)],
              cornerRadius: 12,
              strokes: [{ color: hex('#fca5a5'), weight: 1, align: 'INSIDE' }],
              children: [
                frame('WarningHeader', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('⚠', { fontSize: 16, fontWeight: 600, color: red }),
                    text('Interaction Warnings', { fontSize: 16, fontWeight: 600, color: red }),
                  ],
                }),
                warningItem(
                  'Lisinopril + Potassium',
                  'Monitor potassium levels. Lisinopril may increase potassium.',
                ),
                warningItem(
                  'Metformin + Alcohol',
                  'Avoid excessive alcohol consumption while taking Metformin.',
                ),
              ],
            }),

            /* Adherence */
            frame('Adherence', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Adherence This Week', { fontSize: 16, fontWeight: 600, color: dark }),
                frame('AdherenceBar', {
                  autoLayout: vertical({ spacing: 6 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('BarTrack', {
                      size: { x: 320, y: 10 },
                      fills: [solid('#e2e8f0')],
                      cornerRadius: 5,
                      clipContent: true,
                      autoLayout: horizontal({ spacing: 0 }),
                      children: [
                        rectangle('BarFill', {
                          size: { x: 275, y: 10 },
                          fills: [solid(green)],
                        }),
                      ],
                    }),
                    frame('BarLabel', {
                      autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('86% taken on time', { fontSize: 12, fontWeight: 500, color: green }),
                        text('24/28 doses', { fontSize: 12, fontWeight: 400, color: gray }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    frame('BottomSpacer', { size: { x: 1, y: 32 }, layoutSizingHorizontal: 'FILL' }),
  ],
});

/* ---- helpers ---- */

function scheduleSlot(period: string, time: string, meds: { name: string; dosage: string; taken: boolean }[]) {
  return frame(`Schedule: ${period}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('SlotHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(period, { fontSize: 15, fontWeight: 600, color: dark }),
          text(time, { fontSize: 13, fontWeight: 400, color: gray }),
        ],
      }),
      ...meds.map(m =>
        frame(`Med: ${m.name}`, {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            ellipse('Check', {
              size: { x: 18, y: 18 },
              fills: [solid(m.taken ? green : '#e2e8f0')],
            }),
            text(`${m.name} ${m.dosage}`, {
              fontSize: 13, fontWeight: 400,
              color: m.taken ? gray : dark,
              textDecoration: m.taken ? 'STRIKETHROUGH' : 'NONE',
            }),
          ],
        }),
      ),
    ],
  });
}

function medicationCard(name: string, dosage: string, schedule: string, category: string, remaining: number, total: number, color: string) {
  const progress = remaining / total;
  const barWidth = Math.round(progress * 260);
  return frame(`MedCard: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('MedHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('MedTitle', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 16, fontWeight: 600, color: dark }),
              text(`${dosage} · ${schedule}`, { fontSize: 13, fontWeight: 400, color: gray }),
            ],
          }),
          frame(`Cat: ${category}`, {
            autoLayout: horizontal({ padX: 10, padY: 4 }),
            fills: [solid(lightBlue)],
            cornerRadius: 12,
            children: [
              text(category, { fontSize: 11, fontWeight: 500, color: blue }),
            ],
          }),
        ],
      }),
      frame('SupplyBar', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('Track', {
            size: { x: 260, y: 6 },
            fills: [solid('#e2e8f0')],
            cornerRadius: 3,
            clipContent: true,
            autoLayout: horizontal({ spacing: 0 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              rectangle('Fill', { size: { x: barWidth, y: 6 }, fills: [solid(color)] }),
            ],
          }),
          text(`${remaining} of ${total} days remaining`, { fontSize: 11, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

function refillRow(name: string, timeLeft: string, urgencyColor: string) {
  return frame(`Refill: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 14, fontWeight: 500, color: dark }),
      frame('UrgencyBadge', {
        autoLayout: horizontal({ padX: 8, padY: 3, spacing: 4, counterAlign: 'CENTER' }),
        fills: [solid(urgencyColor === red ? redLight : urgencyColor === amber ? amberLight : greenLight)],
        cornerRadius: 10,
        children: [
          ellipse('Dot', { size: { x: 6, y: 6 }, fills: [solid(urgencyColor)] }),
          text(timeLeft, { fontSize: 11, fontWeight: 500, color: urgencyColor }),
        ],
      }),
    ],
  });
}

function warningItem(title: string, desc: string) {
  return frame(`Warning: ${title}`, {
    autoLayout: vertical({ spacing: 4, padY: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 13, fontWeight: 600, color: '#991b1b' }),
      text(desc, {
        fontSize: 12, fontWeight: 400, color: '#b91c1c',
        lineHeight: { value: 18, unit: 'PIXELS' },
        size: { x: 280 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}
