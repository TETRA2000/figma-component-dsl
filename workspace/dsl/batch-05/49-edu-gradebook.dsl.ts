/**
 * Education Gradebook — Grade Table, GPA Summary & Semester Selector
 * Batch 5, Page 9: Grade book table with course rows, assignment columns, grade cells, GPA, semester
 * DSL Features: table layout with frames, SPACE_BETWEEN, nested auto-layout, FILL sizing
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
const GREEN = '#16a34a';
const RED = '#dc2626';
const ORANGE = '#ea580c';

function gradeColor(grade: string): string {
  if (grade === 'A' || grade === 'A+' || grade === 'A-') return GREEN;
  if (grade === 'B' || grade === 'B+' || grade === 'B-') return BLUE;
  if (grade === 'C' || grade === 'C+') return ORANGE;
  if (grade === '-') return TEXT_SECONDARY;
  return RED;
}

function gradeCell(grade: string, width: number) {
  return frame(`Grade: ${grade}`, {
    autoLayout: horizontal({ padX: 8, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    size: { x: width, y: undefined },
    children: [
      grade === '-'
        ? text('-', { fontSize: 13, fontWeight: 400, color: '#cbd5e1' })
        : frame('GradePill', {
            autoLayout: horizontal({ padX: 8, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(gradeColor(grade) + '15')],
            cornerRadius: 4,
            children: [
              text(grade, { fontSize: 13, fontWeight: 700, color: gradeColor(grade) }),
            ],
          }),
    ],
  });
}

function tableHeaderCell(label: string, width: number) {
  return frame(`Header: ${label}`, {
    autoLayout: horizontal({ padX: 8, padY: 12, counterAlign: 'CENTER' }),
    size: { x: width, y: undefined },
    children: [
      text(label, { fontSize: 12, fontWeight: 700, color: TEXT_SECONDARY, letterSpacing: { value: 0.5, unit: 'PIXELS' } }),
    ],
  });
}

function courseRow(
  course: string,
  code: string,
  hw: string,
  midterm: string,
  project: string,
  finalExam: string,
  overall: string,
  isAlt: boolean,
) {
  return frame(`Row: ${course}`, {
    autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(isAlt ? '#f8fafc' : CARD_BG)],
    strokes: [{ color: { r: 0.93, g: 0.94, b: 0.96, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('CourseCell', {
        autoLayout: vertical({ spacing: 2, padX: 16, padY: 12 }),
        size: { x: 260, y: undefined },
        children: [
          text(course, { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }),
          text(code, { fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY }),
        ],
      }),
      gradeCell(hw, 120),
      gradeCell(midterm, 120),
      gradeCell(project, 120),
      gradeCell(finalExam, 120),
      frame('OverallCell', {
        autoLayout: horizontal({ padX: 8, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('OverallPill', {
            autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(gradeColor(overall))],
            cornerRadius: 999,
            children: [
              text(overall, { fontSize: 13, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function gpaStat(label: string, value: string, trend: string, trendUp: boolean) {
  return frame(`GPA: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 16, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(CARD_BG)],
    cornerRadius: 10,
    strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY }),
      text(value, { fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY }),
      frame('Trend', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text(trendUp ? '↑' : '↓', { fontSize: 12, fontWeight: 700, color: trendUp ? GREEN : RED }),
          text(trend, { fontSize: 12, fontWeight: 500, color: trendUp ? GREEN : RED }),
        ],
      }),
    ],
  });
}

export default component('EduGradebook', {
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
        text('EduLearn', { fontSize: 18, fontWeight: 700, color: BLUE }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
          children: [
            text('Dashboard', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Courses', { fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }),
            text('Grades', { fontSize: 14, fontWeight: 600, color: BLUE }),
          ],
        }),
      ],
    }),

    // Page Header
    frame('PageHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 28, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TitleArea', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Grade Book', { fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY }),
            text('Track your academic performance across all courses', {
              fontSize: 14, fontWeight: 400, color: TEXT_SECONDARY,
            }),
          ],
        }),
        // Semester Selector
        frame('SemesterSelector', {
          autoLayout: horizontal({ spacing: 4, padX: 4, padY: 4 }),
          fills: [solid('#f1f5f9')],
          cornerRadius: 8,
          children: [
            frame('SemOpt1', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              children: [
                text('Fall 2025', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
              ],
            }),
            frame('SemOpt2', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ffffff')],
              cornerRadius: 6,
              children: [
                text('Spring 2026', { fontSize: 13, fontWeight: 700, color: BLUE }),
              ],
            }),
            frame('SemOpt3', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              children: [
                text('All Time', { fontSize: 13, fontWeight: 500, color: TEXT_SECONDARY }),
              ],
            }),
          ],
        }),
      ],
    }),

    // GPA Summary
    frame('GPASummary', {
      autoLayout: horizontal({ spacing: 16, padX: 60, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        gpaStat('Semester GPA', '3.78', '+0.12 from last', true),
        gpaStat('Cumulative GPA', '3.65', '+0.05 overall', true),
        gpaStat('Credits Earned', '68', '15 this semester', true),
        gpaStat('Class Rank', '12/156', 'Top 8%', true),
      ],
    }),

    // Grade Table
    frame('GradeTable', {
      autoLayout: vertical({ spacing: 0, padX: 60, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('TableCard', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(CARD_BG)],
          cornerRadius: 12,
          clipContent: true,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Table header
            frame('TableHeader', {
              autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#f1f5f9')],
              strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                frame('CourseHeader', {
                  autoLayout: horizontal({ padX: 16, padY: 12 }),
                  size: { x: 260, y: undefined },
                  children: [
                    text('COURSE', { fontSize: 12, fontWeight: 700, color: TEXT_SECONDARY, letterSpacing: { value: 0.5, unit: 'PIXELS' } }),
                  ],
                }),
                tableHeaderCell('HOMEWORK', 120),
                tableHeaderCell('MIDTERM', 120),
                tableHeaderCell('PROJECT', 120),
                tableHeaderCell('FINAL', 120),
                frame('OverallHeader', {
                  autoLayout: horizontal({ padX: 8, padY: 12, align: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('OVERALL', { fontSize: 12, fontWeight: 700, color: TEXT_SECONDARY, letterSpacing: { value: 0.5, unit: 'PIXELS' } }),
                  ],
                }),
              ],
            }),
            // Data rows
            courseRow('Intro to Machine Learning', 'CS 229', 'A', 'B+', 'A-', '-', 'A-', false),
            courseRow('Data Structures & Algorithms', 'CS 161', 'A-', 'A', 'A', 'A', 'A', true),
            courseRow('Linear Algebra', 'MATH 51', 'B+', 'B', 'A-', '-', 'B+', false),
            courseRow('Technical Writing', 'ENGR 40', 'A', 'A-', 'A+', 'A', 'A', true),
            courseRow('Statistics for Engineers', 'STATS 101', 'B', 'C+', 'B+', '-', 'B', false),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Grades are updated within 48 hours of submission.', {
          fontSize: 12, fontWeight: 400, color: TEXT_SECONDARY,
        }),
        frame('ExportBtn', {
          autoLayout: horizontal({ padX: 16, padY: 8, spacing: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 6,
          strokes: [{ color: { r: 0.89, g: 0.91, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Export Transcript', { fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }),
          ],
        }),
      ],
    }),
  ],
});
