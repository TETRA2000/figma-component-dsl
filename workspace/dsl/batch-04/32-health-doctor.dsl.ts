/**
 * Doctor Profile — Photo placeholder (ellipse), credentials, specialties,
 * availability schedule, patient reviews
 * Batch 4, Page 2: Healthcare/Wellness
 * DSL Features: ellipse, strokes, text wrapping (textAutoResize: 'HEIGHT')
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

export default component('HealthDoctorProfile', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    /* ---- Top Banner ---- */
    frame('Banner', {
      size: { x: 1280, y: 160 },
      fills: [solid(blue)],
      autoLayout: vertical({ spacing: 0, widthSizing: 'FIXED', heightSizing: 'FIXED' }),
      layoutSizingHorizontal: 'FILL',
    }),

    /* ---- Profile Section ---- */
    frame('ProfileSection', {
      autoLayout: horizontal({ spacing: 32, padX: 64, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Left column: avatar + basic info */
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          size: { x: 260, y: undefined },
          children: [
            /* Avatar overlaps banner visually — offset via negative-ish placement */
            ellipse('DoctorPhoto', {
              size: { x: 140, y: 140 },
              fills: [solid(lightBlue)],
              strokes: [{ color: hex(white), weight: 4, align: 'OUTSIDE' }],
            }),
            text('Dr. Sarah Mitchell', { fontSize: 22, fontWeight: 700, color: dark, textAlignHorizontal: 'CENTER' }),
            text('Cardiologist', { fontSize: 15, fontWeight: 500, color: blue, textAlignHorizontal: 'CENTER' }),
            frame('OnlineStatus', {
              autoLayout: horizontal({ spacing: 6, counterAlign: 'CENTER' }),
              children: [
                ellipse('StatusDot', { size: { x: 8, y: 8 }, fills: [solid(green)] }),
                text('Available Now', { fontSize: 13, fontWeight: 500, color: green }),
              ],
            }),

            /* Credentials */
            frame('Credentials', {
              autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 10,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Credentials', { fontSize: 14, fontWeight: 600, color: dark }),
                credentialRow('MD', 'Harvard Medical School'),
                credentialRow('Board Certified', 'Cardiology'),
                credentialRow('Fellowship', 'Mayo Clinic'),
                credentialRow('License', 'CA-MC-2012-4891'),
              ],
            }),
          ],
        }),

        /* Right column: details */
        frame('RightCol', {
          autoLayout: vertical({ spacing: 24, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* About */
            frame('About', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('About', { fontSize: 18, fontWeight: 600, color: dark }),
                text(
                  'Dr. Sarah Mitchell is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and non-invasive cardiac imaging.',
                  {
                    fontSize: 14, fontWeight: 400, color: gray,
                    lineHeight: { value: 22, unit: 'PIXELS' },
                    size: { x: 600 },
                    textAutoResize: 'HEIGHT',
                  },
                ),
              ],
            }),

            /* Specialties */
            frame('Specialties', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Specialties', { fontSize: 18, fontWeight: 600, color: dark }),
                frame('SpecialtyTags', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    tag('Heart Disease'),
                    tag('Hypertension'),
                    tag('Echocardiography'),
                    tag('Preventive Care'),
                  ],
                }),
              ],
            }),

            /* Availability */
            frame('Availability', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 10,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Weekly Availability', { fontSize: 16, fontWeight: 600, color: dark }),
                scheduleRow('Monday', '9:00 AM – 1:00 PM'),
                scheduleRow('Tuesday', '10:00 AM – 4:00 PM'),
                scheduleRow('Wednesday', '9:00 AM – 12:00 PM'),
                scheduleRow('Thursday', '1:00 PM – 5:00 PM'),
                scheduleRow('Friday', '9:00 AM – 3:00 PM'),
              ],
            }),

            /* Patient Reviews */
            frame('Reviews', {
              autoLayout: vertical({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('ReviewHeader', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Patient Reviews', { fontSize: 18, fontWeight: 600, color: dark }),
                    text('★ 4.9 (128 reviews)', { fontSize: 14, fontWeight: 500, color: '#f59e0b' }),
                  ],
                }),
                reviewCard('Robert K.', '★★★★★', 'Excellent doctor. Very thorough and took time to explain everything clearly.'),
                reviewCard('Maria L.', '★★★★★', 'Dr. Mitchell helped me manage my blood pressure effectively. Highly recommended!'),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function credentialRow(label: string, value: string) {
  return frame(`Cred: ${label}`, {
    autoLayout: horizontal({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: gray }),
      text(value, { fontSize: 12, fontWeight: 400, color: dark }),
    ],
  });
}

function tag(label: string) {
  return frame(`Tag: ${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 6 }),
    fills: [solid(lightBlue)],
    cornerRadius: 16,
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: blue }),
    ],
  });
}

function scheduleRow(day: string, hours: string) {
  return frame(`Schedule: ${day}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(day, { fontSize: 14, fontWeight: 500, color: dark }),
      text(hours, { fontSize: 14, fontWeight: 400, color: gray }),
    ],
  });
}

function reviewCard(author: string, stars: string, comment: string) {
  return frame(`Review: ${author}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 10,
    strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      frame('ReviewMeta', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('ReviewerAvatar', { size: { x: 32, y: 32 }, fills: [solid('#e2e8f0')] }),
          text(author, { fontSize: 14, fontWeight: 600, color: dark }),
          text(stars, { fontSize: 13, fontWeight: 400, color: '#f59e0b' }),
        ],
      }),
      text(comment, {
        fontSize: 14, fontWeight: 400, color: gray,
        lineHeight: { value: 20, unit: 'PIXELS' },
        size: { x: 500 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}
