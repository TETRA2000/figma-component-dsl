/**
 * Education Assignment Submission — Instructions, Upload, Deadline, Rubric & Submit
 * Batch 5, Page 8: Assignment with instructions, file upload area, deadline countdown, rubric table, submit
 * DSL Features: nested auto-layout, SPACE_BETWEEN, table layout with frames
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BLUE = '#1e40af';
const BG = '#f8fafc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1e293b';
const TEXT_SECONDARY = '#64748b';
const BORDER = '#e2e8f0';
const RED = '#dc2626';
const GREEN = '#16a34a';
const ORANGE = '#ea580c';

function rubricRow(criterion: string, points: string, description: string, isHeader: boolean) {
  return frame(`Rubric: ${criterion}`, {
    autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(isHeader ? '#f1f5f9' : CARD_BG)],
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('CriterionCell', {
        autoLayout: horizontal({ padX: 16, padY: 12 }),
        size: { x: 200, y: undefined },
        children: [
          text(criterion, {
            fontSize: 13,
            fontWeight: isHeader ? 700 : 500,
            color: TEXT_PRIMARY,
          }),
        ],
      }),
      frame('PointsCell', {
        autoLayout: horizontal({ padX: 16, padY: 12, align: 'CENTER' }),
        size: { x: 100, y: undefined },
        children: [
          text(points, {
            fontSize: 13,
            fontWeight: isHeader ? 700 : 600,
            color: isHeader ? TEXT_PRIMARY : BLUE,
          }),
        ],
      }),
      frame('DescCell', {
        autoLayout: horizontal({ padX: 16, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(description, {
            fontSize: 13,
            fontWeight: isHeader ? 700 : 400,
            color: isHeader ? TEXT_PRIMARY : TEXT_SECONDARY,
            lineHeight: { value: 20, unit: 'PIXELS' },
            layoutSizingHorizontal: 'FILL',
          }),
        ],
      }),
    ],
  });
}

export default component('EduAssignment', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(BG)],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        frame('Breadcrumb', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Python 101', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('/', { fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY }),
            text('Assignment 3', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
          ],
        }),
        frame('DeadlineAlert', {
          autoLayout: horizontal({ spacing: 8, padX: 14, padY: 6, counterAlign: 'CENTER' }),
          fills: [solid('#fef2f2')],
          cornerRadius: 8,
          children: [
            text('⏰', { fontSize: 14, fontWeight: 400, color: RED }),
            text('Due in 2 days, 5 hours', { fontSize: 13, fontWeight: 600, color: RED }),
          ],
        }),
      ],
    }),

    // Main Content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Assignment Details
        frame('AssignmentDetails', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Assignment Header
            frame('AssignmentHeader', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('HeaderTop', {
                  autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Assignment 3: Data Structures', {
                      fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY,
                    }),
                    frame('StatusBadge', {
                      autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
                      fills: [solid('#fef3c7')],
                      cornerRadius: 999,
                      children: [
                        text('Not Submitted', { fontSize: 12, fontWeight: 600, color: '#92400e' }),
                      ],
                    }),
                  ],
                }),
                frame('AssignmentMeta', {
                  autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
                  children: [
                    text('Due: March 17, 2026', { fontSize: 13, fontWeight: 500, color: RED }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('Points: 100', { fontSize: 13, fontWeight: 500, color: BLUE }),
                    text('·', { fontSize: 13, fontWeight: 400, color: TEXT_SECONDARY }),
                    text('Weight: 15%', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
                  ],
                }),
              ],
            }),

            // Instructions
            frame('Instructions', {
              autoLayout: vertical({ spacing: 16, padX: 28, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Instructions', { fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }),
                text(
                  'In this assignment, you will implement fundamental data structures in Python. You are required to:\n\n1. Implement a Stack class with push, pop, peek, and is_empty methods\n2. Implement a Queue class using two stacks\n3. Implement a Binary Search Tree with insert, search, and delete operations\n4. Write unit tests for each data structure\n\nAll code should follow PEP 8 style guidelines and include docstrings for each method.',
                  {
                    fontSize: 14,
                    fontWeight: 400,
                    color: TEXT_PRIMARY,
                    lineHeight: { value: 24, unit: 'PIXELS' },
                    layoutSizingHorizontal: 'FILL',
                  },
                ),
                // Attachments
                frame('Attachments', {
                  autoLayout: vertical({ spacing: 8 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Attachments', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                    frame('FileItem', {
                      autoLayout: horizontal({ spacing: 12, padX: 14, padY: 10, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#f8fafc')],
                      cornerRadius: 8,
                      children: [
                        rectangle('FileIcon', {
                          size: { x: 32, y: 32 },
                          fills: [solid('#eff6ff')],
                          cornerRadius: 6,
                        }),
                        frame('FileInfo', {
                          autoLayout: vertical({ spacing: 2 }),
                          layoutSizingHorizontal: 'FILL',
                          children: [
                            text('assignment3_starter.py', { fontSize: 13, fontWeight: 500, color: BLUE }),
                            text('4.2 KB', { fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY }),
                          ],
                        }),
                        text('Download', { fontSize: 12, fontWeight: 500, color: BLUE }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Rubric
            frame('Rubric', {
              autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              clipContent: true,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('RubricTitle', {
                  autoLayout: horizontal({ padX: 28, padY: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Grading Rubric', { fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }),
                  ],
                }),
                rubricRow('Criterion', 'Points', 'Description', true),
                rubricRow('Stack Implementation', '25', 'Correct push, pop, peek, and is_empty operations', false),
                rubricRow('Queue Implementation', '25', 'Correct implementation using two stacks with all operations', false),
                rubricRow('BST Implementation', '30', 'Correct insert, search, and delete with edge cases handled', false),
                rubricRow('Unit Tests', '10', 'Comprehensive tests covering normal and edge cases', false),
                rubricRow('Code Quality', '10', 'PEP 8 compliance, docstrings, clean code structure', false),
              ],
            }),
          ],
        }),

        // Right: Submission Area
        frame('SubmissionArea', {
          autoLayout: vertical({ spacing: 20 }),
          size: { x: 380, y: undefined },
          children: [
            // Deadline Countdown
            frame('CountdownCard', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Time Remaining', { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
                frame('Countdown', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    frame('Days', {
                      autoLayout: vertical({ spacing: 2, padX: 12, padY: 8, counterAlign: 'CENTER' }),
                      fills: [solid('#fef2f2')],
                      cornerRadius: 8,
                      children: [
                        text('02', { fontSize: 28, fontWeight: 700, color: RED }),
                        text('days', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    text(':', { fontSize: 24, fontWeight: 700, color: TEXT_SECONDARY }),
                    frame('Hours', {
                      autoLayout: vertical({ spacing: 2, padX: 12, padY: 8, counterAlign: 'CENTER' }),
                      fills: [solid('#fff7ed')],
                      cornerRadius: 8,
                      children: [
                        text('05', { fontSize: 28, fontWeight: 700, color: ORANGE }),
                        text('hours', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                    text(':', { fontSize: 24, fontWeight: 700, color: TEXT_SECONDARY }),
                    frame('Mins', {
                      autoLayout: vertical({ spacing: 2, padX: 12, padY: 8, counterAlign: 'CENTER' }),
                      fills: [solid('#f8fafc')],
                      cornerRadius: 8,
                      children: [
                        text('42', { fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY }),
                        text('mins', { fontSize: 10, fontWeight: 500, color: TEXT_SECONDARY }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // File Upload Area
            frame('UploadArea', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(CARD_BG)],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Submit Your Work', { fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }),
                // Dropzone
                frame('Dropzone', {
                  autoLayout: vertical({ spacing: 12, padX: 24, padY: 32, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.59, g: 0.64, b: 0.72, a: 0.5 }, weight: 2, align: 'INSIDE' }],
                  fills: [solid('#f8fafc')],
                  children: [
                    rectangle('UploadIcon', {
                      size: { x: 48, y: 48 },
                      fills: [solid('#eff6ff')],
                      cornerRadius: 24,
                    }),
                    text('Drag & drop files here', {
                      fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY,
                      textAlignHorizontal: 'CENTER',
                    }),
                    text('or click to browse\n.py, .zip files up to 10MB', {
                      fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY,
                      textAlignHorizontal: 'CENTER',
                      lineHeight: { value: 18, unit: 'PIXELS' },
                    }),
                  ],
                }),
                // Uploaded file
                frame('UploadedFile', {
                  autoLayout: horizontal({ spacing: 10, padX: 12, padY: 10, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#f0fdf4')],
                  cornerRadius: 8,
                  children: [
                    rectangle('FileIcon', {
                      size: { x: 28, y: 28 },
                      fills: [solid(GREEN)],
                      cornerRadius: 6,
                    }),
                    frame('FileDetails', {
                      autoLayout: vertical({ spacing: 2 }),
                      layoutSizingHorizontal: 'FILL',
                      children: [
                        text('assignment3_solution.py', { fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }),
                        text('8.1 KB · Uploaded', { fontSize: 11, fontWeight: 400, color: GREEN }),
                      ],
                    }),
                    text('×', { fontSize: 18, fontWeight: 400, color: TEXT_SECONDARY }),
                  ],
                }),
                // Submit Button
                frame('SubmitBtn', {
                  autoLayout: horizontal({ padX: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid(BLUE)],
                  cornerRadius: 8,
                  children: [
                    text('Submit Assignment', { fontSize: 15, fontWeight: 700, color: '#ffffff' }),
                  ],
                }),
                text('You can resubmit until the deadline', {
                  fontSize: 11, fontWeight: 400, color: TEXT_SECONDARY,
                  textAlignHorizontal: 'CENTER',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
