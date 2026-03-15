/**
 * Rental Application — Step tracker, form sections, document upload area, submit
 * Batch 9, Page 10: Real Estate
 * DSL Features: component(), ellipse(), line(), strokes, section(), mixed sizing
 */
import {
  component, frame, rectangle, text, ellipse, line, section,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const brown = '#78350f';
const green = '#365314';
const cream = '#f5f0e8';
const white = '#ffffff';
const dark = '#1c1917';
const gray = '#78716c';
const border = '#d6d3d1';
const darkGreen = '#166534';
const lightGreen = '#dcfce7';
const blue = '#1e40af';
const lightBlue = '#dbeafe';

export default component('RealEstateRentalApp', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: vertical({ spacing: 6, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(brown)],
      children: [
        text('Rental Application', { fontSize: 26, fontWeight: 700, color: white }),
        text('456 Mission Creek, Unit 4B — SoMa, CA', { fontSize: 15, fontWeight: 400, color: '#d6d3d1' }),
      ],
    }),

    /* ---- Step Tracker ---- */
    frame('StepTracker', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        stepItem('1', 'Personal Info', 'completed'),
        stepConnector(true),
        stepItem('2', 'Employment', 'completed'),
        stepConnector(true),
        stepItem('3', 'Rental History', 'active'),
        stepConnector(false),
        stepItem('4', 'Documents', 'upcoming'),
        stepConnector(false),
        stepItem('5', 'Review & Submit', 'upcoming'),
      ],
    }),

    /* ---- Form Body ---- */
    frame('FormBody', {
      autoLayout: horizontal({ spacing: 32, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Main Form */
        frame('MainForm', {
          autoLayout: vertical({ spacing: 28 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Section: Rental History */
            section('RentalHistorySection', {
              fills: [solid(white)],
              children: [
                frame('RentalHistory', {
                  autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(white)],
                  cornerRadius: 16,
                  strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Rental History', { fontSize: 20, fontWeight: 700, color: dark }),
                    text('Please provide your rental history for the past 3 years.', {
                      fontSize: 14, fontWeight: 400, color: gray,
                      lineHeight: { value: 20, unit: 'PIXELS' },
                    }),

                    formField('Current Address', '123 Main Street, Apt 5'),
                    formField('City, State, ZIP', 'San Francisco, CA 94105'),
                    frame('TwoColRow1', {
                      autoLayout: horizontal({ spacing: 16 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        formField('Move-in Date', 'January 2022'),
                        formField('Monthly Rent', '$2,800'),
                      ],
                    }),
                    formField('Landlord Name', 'Robert Johnson'),
                    formField('Landlord Phone', '(415) 555-9876'),
                    formField('Reason for Leaving', 'Relocating for work'),

                    line('HistoryDivider', {
                      size: { x: 700 },
                      strokes: [{ color: hex(border), weight: 1, align: 'CENTER' }],
                      layoutSizingHorizontal: 'FILL',
                    }),

                    frame('AddPriorBtn', {
                      autoLayout: horizontal({ padX: 16, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
                      cornerRadius: 8,
                      strokes: [{ color: hex(brown), weight: 1, align: 'INSIDE' }],
                      children: [
                        text('+ Add Prior Address', { fontSize: 14, fontWeight: 500, color: brown }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            /* Section: References */
            frame('ReferencesCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Personal References', { fontSize: 20, fontWeight: 700, color: dark }),
                text('Provide at least 2 personal references (non-family).', {
                  fontSize: 14, fontWeight: 400, color: gray,
                }),
                referenceBlock('Reference 1', 'Maria Garcia', '(415) 555-1234', 'Colleague'),
                line('RefDivider', {
                  size: { x: 700 },
                  strokes: [{ color: hex(border), weight: 1, align: 'CENTER' }],
                  layoutSizingHorizontal: 'FILL',
                }),
                referenceBlock('Reference 2', 'James Wilson', '(510) 555-5678', 'Former Neighbor'),
              ],
            }),

            /* Section: Document Upload */
            frame('DocumentsCard', {
              autoLayout: vertical({ spacing: 20, padX: 28, padY: 28 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 16,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Document Upload', { fontSize: 20, fontWeight: 700, color: dark }),
                text('Upload the following documents to complete your application.', {
                  fontSize: 14, fontWeight: 400, color: gray,
                }),

                /* Upload area */
                frame('UploadArea', {
                  autoLayout: vertical({ spacing: 12, padX: 32, padY: 32, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  cornerRadius: 12,
                  strokes: [{ color: hex('#a8a29e'), weight: 2, align: 'INSIDE' }],
                  fills: [solid(cream)],
                  children: [
                    text('↑', { fontSize: 32, fontWeight: 300, color: gray }),
                    text('Drag & drop files here', { fontSize: 16, fontWeight: 500, color: dark }),
                    text('or click to browse', { fontSize: 14, fontWeight: 400, color: gray }),
                    text('PDF, JPG, PNG — Max 10MB per file', { fontSize: 12, fontWeight: 400, color: '#a8a29e' }),
                  ],
                }),

                /* Required documents checklist */
                frame('DocChecklist', {
                  autoLayout: vertical({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Required Documents', { fontSize: 14, fontWeight: 600, color: dark }),
                    docItem('Government-issued Photo ID', true),
                    docItem('Proof of Income (2 recent pay stubs)', true),
                    docItem('Bank Statements (last 3 months)', false),
                    docItem('Employment Verification Letter', false),
                    docItem('Previous Landlord Reference Letter', false),
                  ],
                }),
              ],
            }),
          ],
        }),

        /* Sidebar */
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 320, y: undefined },
          children: [
            /* Property Summary */
            frame('PropertySummary', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                rectangle('PropThumb', {
                  size: { x: 280, y: 140 },
                  fills: [solid('#d6d3d1')],
                  cornerRadius: 8,
                }),
                text('$2,800/month', { fontSize: 20, fontWeight: 700, color: brown }),
                text('456 Mission Creek, Unit 4B', { fontSize: 14, fontWeight: 600, color: dark }),
                text('SoMa, San Francisco, CA', { fontSize: 13, fontWeight: 400, color: gray }),
                line('PropDivider', {
                  size: { x: 280 },
                  strokes: [{ color: hex(border), weight: 1, align: 'CENTER' }],
                  layoutSizingHorizontal: 'FILL',
                }),
                detailRow('Bedrooms', '3'),
                detailRow('Bathrooms', '2.5'),
                detailRow('Square Feet', '1,950'),
                detailRow('Available', 'April 1, 2026'),
                detailRow('Lease Term', '12 months'),
              ],
            }),

            /* Application Fee */
            frame('AppFee', {
              autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Application Fee', { fontSize: 16, fontWeight: 600, color: dark }),
                text('$50.00', { fontSize: 24, fontWeight: 700, color: brown }),
                text('Non-refundable processing fee', { fontSize: 12, fontWeight: 400, color: gray }),
              ],
            }),

            /* Progress */
            frame('ProgressCard', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(white)],
              cornerRadius: 12,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Completion', { fontSize: 16, fontWeight: 600, color: dark }),
                frame('ProgressBar', {
                  size: { x: 280, y: 8 },
                  fills: [solid('#e7e5e4')],
                  cornerRadius: 4,
                  clipContent: true,
                  autoLayout: horizontal({ spacing: 0 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    rectangle('ProgressFill', {
                      size: { x: 168, y: 8 },
                      fills: [solid(darkGreen)],
                    }),
                  ],
                }),
                text('60% complete — 2 of 5 steps done', { fontSize: 13, fontWeight: 400, color: gray }),
              ],
            }),

            /* Help */
            frame('HelpCard', {
              autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(lightBlue)],
              cornerRadius: 12,
              children: [
                text('Need Help?', { fontSize: 16, fontWeight: 600, color: blue }),
                text('Contact our leasing office at (415) 555-0199 or email leasing@missioncreek.com', {
                  fontSize: 13, fontWeight: 400, color: dark,
                  lineHeight: { value: 20, unit: 'PIXELS' },
                  size: { x: 260 },
                  textAutoResize: 'HEIGHT',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Bottom Actions ---- */
    frame('BottomActions', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        frame('BackStepBtn', {
          autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 8,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          children: [
            text('← Previous Step', { fontSize: 15, fontWeight: 500, color: dark }),
          ],
        }),
        frame('NavBtns', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('SaveBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: hex(brown), weight: 1, align: 'INSIDE' }],
              children: [
                text('Save Draft', { fontSize: 15, fontWeight: 500, color: brown }),
              ],
            }),
            frame('NextBtn', {
              autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(brown)],
              cornerRadius: 8,
              children: [
                text('Save & Continue →', { fontSize: 15, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function stepItem(num: string, label: string, state: 'completed' | 'active' | 'upcoming') {
  const bgColor = state === 'completed' ? darkGreen : state === 'active' ? brown : '#e7e5e4';
  const textColor = state === 'upcoming' ? gray : white;
  const labelColor = state === 'active' ? brown : state === 'completed' ? darkGreen : gray;

  return frame(`Step: ${label}`, {
    autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
    children: [
      ellipse(`StepCircle: ${num}`, {
        size: { x: 32, y: 32 },
        fills: [solid(bgColor)],
      }),
      text(label, { fontSize: 14, fontWeight: state === 'active' ? 600 : 400, color: labelColor }),
    ],
  });
}

function stepConnector(complete: boolean) {
  return line('StepLine', {
    size: { x: 40 },
    strokes: [{ color: hex(complete ? darkGreen : '#d6d3d1'), weight: 2, align: 'CENTER' }],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: gray }),
      frame(`Input: ${label}`, {
        autoLayout: horizontal({ padX: 14, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        cornerRadius: 8,
        strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 15, fontWeight: 400, color: dark }),
        ],
      }),
    ],
  });
}

function referenceBlock(title: string, name: string, phone: string, relation: string) {
  return frame(`Ref: ${title}`, {
    autoLayout: vertical({ spacing: 12 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, { fontSize: 15, fontWeight: 600, color: dark }),
      frame('RefFields', {
        autoLayout: horizontal({ spacing: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          formField('Full Name', name),
          formField('Phone', phone),
          formField('Relationship', relation),
        ],
      }),
    ],
  });
}

function docItem(label: string, uploaded: boolean) {
  return frame(`Doc: ${label}`, {
    autoLayout: horizontal({ spacing: 10, padY: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse(`DocCheck: ${label}`, {
        size: { x: 18, y: 18 },
        fills: [solid(uploaded ? darkGreen : '#e7e5e4')],
      }),
      text(label, {
        fontSize: 13,
        fontWeight: 400,
        color: uploaded ? darkGreen : dark,
      }),
      ...(uploaded
        ? [text('Uploaded', { fontSize: 11, fontWeight: 500, color: darkGreen })]
        : []),
    ],
  });
}

function detailRow(label: string, value: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 400, color: gray }),
      text(value, { fontSize: 13, fontWeight: 600, color: dark }),
    ],
  });
}
