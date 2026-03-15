/**
 * Health Appointment Booking — Doctor cards, date/time grid, specialty filter
 * Batch 4, Page 1: Healthcare/Wellness
 * DSL Features: ellipse avatars, SPACE_BETWEEN, strokes, text wrapping
 */
import {
  component, frame, rectangle, text, ellipse,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

/* ---- palette ---- */
const blue = '#0284c7';
const lightBlue = '#e0f2fe';
const bg = '#f8fafc';
const white = '#ffffff';
const dark = '#0f172a';
const gray = '#64748b';
const border = '#e2e8f0';

export default component('HealthAppointment', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Navbar ---- */
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        frame('Brand', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('LogoDot', { size: { x: 28, y: 28 }, fills: [solid(blue)] }),
            text('MediCare', { fontSize: 20, fontWeight: 700, color: blue }),
          ],
        }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: gray }),
            text('Appointments', { fontSize: 14, fontWeight: 600, color: blue }),
            text('Doctors', { fontSize: 14, fontWeight: 500, color: gray }),
            text('Messages', { fontSize: 14, fontWeight: 500, color: gray }),
          ],
        }),
      ],
    }),

    /* ---- Page Header ---- */
    frame('PageHeader', {
      autoLayout: vertical({ spacing: 8, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Book an Appointment', { fontSize: 28, fontWeight: 700, color: dark }),
        text('Find the right specialist and schedule your visit', {
          fontSize: 16, fontWeight: 400, color: gray,
        }),
      ],
    }),

    /* ---- Specialty Filter ---- */
    frame('SpecialtyFilter', {
      autoLayout: horizontal({ spacing: 12, padX: 64, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterChip('All', true),
        filterChip('Cardiology', false),
        filterChip('Dermatology', false),
        filterChip('Neurology', false),
        filterChip('Orthopedics', false),
        filterChip('Pediatrics', false),
      ],
    }),

    /* ---- Content Row ---- */
    frame('ContentRow', {
      autoLayout: horizontal({ spacing: 24, padX: 64, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Doctor List */
        frame('DoctorList', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            doctorCard('Dr. Sarah Mitchell', 'Cardiologist', '4.9', '12 yrs exp'),
            doctorCard('Dr. James Chen', 'Neurologist', '4.8', '8 yrs exp'),
            doctorCard('Dr. Emily Rodriguez', 'Dermatologist', '4.7', '15 yrs exp'),
          ],
        }),

        /* Date/Time Grid */
        frame('DateTimePanel', {
          autoLayout: vertical({ spacing: 20, padX: 24, padY: 24 }),
          size: { x: 380, y: undefined },
          fills: [solid(white)],
          cornerRadius: 12,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            text('Select Date & Time', { fontSize: 18, fontWeight: 600, color: dark }),

            /* Date Row */
            frame('DateRow', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                dateCell('Mon', '14', false),
                dateCell('Tue', '15', true),
                dateCell('Wed', '16', false),
                dateCell('Thu', '17', false),
                dateCell('Fri', '18', false),
              ],
            }),

            rectangle('Divider', {
              size: { x: 1, y: 1 },
              fills: [solid(border)],
              layoutSizingHorizontal: 'FILL',
            }),

            /* Time Slots */
            text('Available Times', { fontSize: 14, fontWeight: 600, color: dark }),
            frame('TimeGrid', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                timeSlot('9:00 AM', false),
                timeSlot('10:30 AM', true),
                timeSlot('11:00 AM', false),
              ],
            }),
            frame('TimeGrid2', {
              autoLayout: horizontal({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                timeSlot('1:00 PM', false),
                timeSlot('2:30 PM', false),
                timeSlot('4:00 PM', false),
              ],
            }),

            frame('BookBtn', {
              autoLayout: horizontal({ padX: 0, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(blue)],
              cornerRadius: 8,
              children: [
                text('Confirm Booking', { fontSize: 15, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? blue : white)],
    cornerRadius: 20,
    strokes: active ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? white : gray }),
    ],
  });
}

function doctorCard(name: string, specialty: string, rating: string, experience: string) {
  return frame(`Doctor: ${name}`, {
    autoLayout: horizontal({ spacing: 16, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      ellipse('Avatar', { size: { x: 56, y: 56 }, fills: [solid(lightBlue)] }),
      frame('Info', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: dark }),
          text(specialty, { fontSize: 14, fontWeight: 400, color: gray }),
          frame('Meta', {
            autoLayout: horizontal({ spacing: 16 }),
            children: [
              text(`★ ${rating}`, { fontSize: 13, fontWeight: 500, color: '#f59e0b' }),
              text(experience, { fontSize: 13, fontWeight: 400, color: gray }),
            ],
          }),
        ],
      }),
      frame('SelectBtn', {
        autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(lightBlue)],
        cornerRadius: 8,
        children: [
          text('Select', { fontSize: 13, fontWeight: 600, color: blue }),
        ],
      }),
    ],
  });
}

function dateCell(day: string, date: string, active: boolean) {
  return frame(`Date: ${day} ${date}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(active ? blue : '#f1f5f9')],
    cornerRadius: 8,
    children: [
      text(day, { fontSize: 11, fontWeight: 500, color: active ? white : gray }),
      text(date, { fontSize: 16, fontWeight: 600, color: active ? white : dark }),
    ],
  });
}

function timeSlot(time: string, active: boolean) {
  return frame(`Time: ${time}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? lightBlue : '#f1f5f9')],
    cornerRadius: 6,
    strokes: active ? [{ color: hex(blue), weight: 1, align: 'INSIDE' }] : [],
    children: [
      text(time, { fontSize: 13, fontWeight: 500, color: active ? blue : gray }),
    ],
  });
}
