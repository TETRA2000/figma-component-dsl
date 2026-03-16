/**
 * Fitness Class Schedule — Gym class schedule with instructor profiles, time slots, and class cards
 * DSL features stressed: gradient headers, pill badges, horizontal card grids, ellipse avatars,
 * SPACE_BETWEEN alignment, nested vertical/horizontal layouts
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function classCard(name: string, instructor: string, time: string, duration: string, spots: number, color: string) {
  return frame(`Class: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('ClassHeader', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ClassIcon', {
            size: { x: 40, y: 40 },
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(color + '1a')],
            cornerRadius: 10,
            children: [
              text(name.charAt(0), { fontSize: 16, fontWeight: 700, color }),
            ],
          }),
          frame('ClassInfo', {
            autoLayout: vertical({ spacing: 2 }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(name, { fontSize: 15, fontWeight: 600, color: '#1f2937' }),
              text(`with ${instructor}`, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
        ],
      }),
      frame('ClassDetails', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('TimeInfo', {
            autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
            children: [
              text(time, { fontSize: 13, fontWeight: 600, color: '#374151' }),
              text(`(${duration})`, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
            ],
          }),
          frame('SpotsBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
            fills: [solid(spots <= 3 ? '#fef2f2' : '#f0fdf4')],
            cornerRadius: 9999,
            children: [
              text(`${spots} spots left`, { fontSize: 11, fontWeight: 600, color: spots <= 3 ? '#ef4444' : '#16a34a' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function instructorProfile(name: string, specialty: string, classes: number, avatarColor: string) {
  return frame(`Instructor: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Avatar', { size: { x: 56, y: 56 }, fills: [gradient([{ hex: avatarColor, position: 0 }, { hex: '#6366f1', position: 1 }], 135)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#1f2937', textAlignHorizontal: 'CENTER' }),
      text(specialty, { fontSize: 12, fontWeight: 400, color: '#6b7280', textAlignHorizontal: 'CENTER' }),
      frame('ClassCount', {
        autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
        fills: [solid('#eef2ff')],
        cornerRadius: 9999,
        children: [
          text(`${classes} classes/week`, { fontSize: 11, fontWeight: 500, color: '#4f46e5' }),
        ],
      }),
    ],
  });
}

function timeSlot(time: string, isActive: boolean) {
  return frame(`Slot: ${time}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(isActive ? '#4f46e5' : '#f3f4f6')],
    cornerRadius: 8,
    children: [
      text(time, { fontSize: 12, fontWeight: 600, color: isActive ? '#ffffff' : '#6b7280' }),
    ],
  });
}

export default frame('FitnessClassPage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Hero header
    frame('Header', {
      autoLayout: vertical({ spacing: 4, padX: 32, padY: 28 }),
      fills: [gradient([{ hex: '#4f46e5', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('HeaderTop', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('FitStudio', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
            frame('MemberBadge', {
              autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6 }),
              fills: [solid('#ffffff1a')],
              cornerRadius: 9999,
              children: [
                text('Premium Member', { fontSize: 12, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
        text('Book your next class and crush your goals', { fontSize: 14, fontWeight: 400, color: '#ffffffb3' }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 32, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Time filter
        frame('TimeFilter', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Filter by Time', { fontSize: 16, fontWeight: 600, color: '#1f2937' }),
            frame('TimeSlots', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                timeSlot('6:00 AM', false),
                timeSlot('8:00 AM', true),
                timeSlot('10:00 AM', false),
                timeSlot('12:00 PM', false),
                timeSlot('5:00 PM', false),
                timeSlot('7:00 PM', false),
              ],
            }),
          ],
        }),

        // Today's classes
        frame('TodaySection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('SectionHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text("Today's Schedule", { fontSize: 18, fontWeight: 700, color: '#1f2937' }),
                text('View all', { fontSize: 13, fontWeight: 600, color: '#4f46e5' }),
              ],
            }),
            frame('ClassGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Col1', {
                  autoLayout: vertical({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    classCard('Power Yoga', 'Sarah Kim', '8:00 AM', '60 min', 5, '#7c3aed'),
                    classCard('Spin Class', 'Mike Torres', '10:00 AM', '45 min', 2, '#ef4444'),
                    classCard('Boxing Basics', 'Jake Reed', '12:00 PM', '50 min', 8, '#f59e0b'),
                  ],
                }),
                frame('Col2', {
                  autoLayout: vertical({ spacing: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    classCard('HIIT Burn', 'Lisa Chen', '8:30 AM', '30 min', 1, '#ef4444'),
                    classCard('Pilates Core', 'Anna Wells', '10:30 AM', '55 min', 12, '#10b981'),
                    classCard('Zumba Party', 'Carlos Diaz', '5:00 PM', '60 min', 6, '#ec4899'),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Instructors
        frame('InstructorSection', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Instructors', { fontSize: 18, fontWeight: 700, color: '#1f2937' }),
            frame('InstructorGrid', {
              autoLayout: horizontal({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                instructorProfile('Sarah Kim', 'Yoga & Meditation', 8, '#7c3aed'),
                instructorProfile('Mike Torres', 'Cycling & Cardio', 6, '#ef4444'),
                instructorProfile('Lisa Chen', 'HIIT & Strength', 10, '#f59e0b'),
                instructorProfile('Carlos Diaz', 'Dance & Zumba', 5, '#ec4899'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
