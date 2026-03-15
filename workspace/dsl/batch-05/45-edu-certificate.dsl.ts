/**
 * Education Certificate Display — Decorative Border, Institution & Student Info
 * Batch 5, Page 5: Certificate with decorative border (strokes), institution name, student, course, date
 * DSL Features: strokes for decorative borders, nested auto-layout, centered text alignment
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const GOLD_DARK = '#92400e';
const GOLD = '#d97706';
const GOLD_BG = '#fef3c7';
const BG = '#f8fafc';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';

export default component('EduCertificate', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
  fills: [solid(BG)],
  children: [
    // Page Header
    frame('PageHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            frame('DownloadBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Download PDF', { fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }),
              ],
            }),
            frame('ShareBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(BLUE)],
              cornerRadius: 6,
              children: [
                text('Share', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Certificate Container
    frame('CertContainer', {
      autoLayout: vertical({ spacing: 0, padX: 120, padY: 60, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Outer Decorative Border
        frame('CertOuter', {
          autoLayout: vertical({ spacing: 0, padX: 8, padY: 8, counterAlign: 'CENTER' }),
          size: { x: 1000, y: undefined },
          fills: [solid('#ffffff')],
          cornerRadius: 4,
          strokes: [{ color: { r: 0.85, g: 0.65, b: 0.13, a: 1 }, weight: 3, align: 'INSIDE' }],
          children: [
            // Inner Decorative Border
            frame('CertInner', {
              autoLayout: vertical({ spacing: 32, padX: 60, padY: 60, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              strokes: [{ color: { r: 0.85, g: 0.65, b: 0.13, a: 0.5 }, weight: 1, align: 'INSIDE' }],
              children: [
                // Top Ornament
                frame('TopOrnament', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('OrnamentLeft', {
                      size: { x: 80, y: 2 },
                      fills: [gradient([
                        { hex: '#d9770600', position: 0 },
                        { hex: '#d97706', position: 1 },
                      ], 0)],
                    }),
                    text('✦', { fontSize: 20, fontWeight: 400, color: GOLD }),
                    rectangle('OrnamentRight', {
                      size: { x: 80, y: 2 },
                      fills: [gradient([
                        { hex: '#d97706', position: 0 },
                        { hex: '#d9770600', position: 1 },
                      ], 0)],
                    }),
                  ],
                }),

                // Institution
                frame('Institution', {
                  autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('Crest', {
                      size: { x: 64, y: 64 },
                      fills: [solid(BLUE)],
                      cornerRadius: 32,
                    }),
                    text('STANFORD UNIVERSITY', {
                      fontSize: 14,
                      fontWeight: 700,
                      color: BLUE,
                      letterSpacing: { value: 4, unit: 'PIXELS' },
                    }),
                    text('School of Computer Science', {
                      fontSize: 13,
                      fontWeight: 400,
                      color: TEXT_SECONDARY,
                    }),
                  ],
                }),

                // Certificate Title
                text('Certificate of Completion', {
                  fontSize: 36,
                  fontWeight: 400,
                  color: GOLD_DARK,
                  letterSpacing: { value: 2, unit: 'PIXELS' },
                }),

                // Ornamental Divider
                frame('Divider', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('LineLeft', {
                      size: { x: 120, y: 1 },
                      fills: [solid(GOLD)],
                    }),
                    text('❖', { fontSize: 14, fontWeight: 400, color: GOLD }),
                    rectangle('LineRight', {
                      size: { x: 120, y: 1 },
                      fills: [solid(GOLD)],
                    }),
                  ],
                }),

                // Presented To
                frame('PresentedTo', {
                  autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('This is to certify that', {
                      fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY,
                    }),
                    text('Alexandra Johnson', {
                      fontSize: 32, fontWeight: 700, color: TEXT_PRIMARY,
                    }),
                    rectangle('NameLine', {
                      size: { x: 300, y: 1 },
                      fills: [solid(GOLD)],
                    }),
                  ],
                }),

                // Course
                frame('CourseInfo', {
                  autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('has successfully completed the course', {
                      fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY,
                    }),
                    text('Advanced Machine Learning\nwith Python', {
                      fontSize: 22, fontWeight: 700, color: BLUE,
                      textAlignHorizontal: 'CENTER',
                      lineHeight: { value: 30, unit: 'PIXELS' },
                    }),
                    text('with a final grade of 96%', {
                      fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY,
                    }),
                  ],
                }),

                // Date and Signatures
                frame('Footer', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'MAX' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('DateBlock', {
                      autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        text('March 15, 2026', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                        rectangle('DateLine', { size: { x: 140, y: 1 }, fills: [solid('#cbd5e1')] }),
                        text('Date of Completion', { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
                      ],
                    }),
                    // Seal placeholder
                    frame('Seal', {
                      autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
                      size: { x: 80, y: 80 },
                      fills: [gradient([
                        { hex: '#d97706', position: 0 },
                        { hex: '#f59e0b', position: 1 },
                      ], 135)],
                      cornerRadius: 40,
                      children: [
                        text('SEAL', { fontSize: 12, fontWeight: 700, color: '#ffffff' }),
                      ],
                    }),
                    frame('SignatureBlock', {
                      autoLayout: vertical({ spacing: 6, counterAlign: 'CENTER' }),
                      children: [
                        text('Dr. Andrew Ng', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                        rectangle('SigLine', { size: { x: 140, y: 1 }, fills: [solid('#cbd5e1')] }),
                        text('Course Instructor', { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
                      ],
                    }),
                  ],
                }),

                // Bottom Ornament
                frame('BottomOrnament', {
                  autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
                  children: [
                    rectangle('OrnBotLeft', {
                      size: { x: 80, y: 2 },
                      fills: [gradient([
                        { hex: '#d9770600', position: 0 },
                        { hex: '#d97706', position: 1 },
                      ], 0)],
                    }),
                    text('✦', { fontSize: 20, fontWeight: 400, color: GOLD }),
                    rectangle('OrnBotRight', {
                      size: { x: 80, y: 2 },
                      fills: [gradient([
                        { hex: '#d97706', position: 0 },
                        { hex: '#d9770600', position: 1 },
                      ], 0)],
                    }),
                  ],
                }),

                // Certificate ID
                text('Certificate ID: EDL-2026-00847', {
                  fontSize: 11, fontWeight: 400, color: '#94a3b8',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
