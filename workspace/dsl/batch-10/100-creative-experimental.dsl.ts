/**
 * Experimental Art Page — Ultimate DSL stress test combining ALL features
 * Batch 10, Page 100: Uses every DSL primitive available
 * DSL Features: frame, text, rectangle, ellipse, polygon, star, line, group, section,
 *   component, gradient, radialGradient, solid, cornerRadii, clipContent, opacity,
 *   strokes, SPACE_BETWEEN, textDecoration, deep nesting
 */
import {
  component, frame, rectangle, ellipse, polygon, star, line,
  group, section, text,
  solid, gradient, radialGradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const purple = '#7c3aed';
const pink = '#ec4899';
const cyan = '#06b6d4';
const orange = '#f97316';
const green = '#22c55e';
const dark = '#0a0a0a';
const white = '#ffffff';
const muted = '#a1a1aa';

export default component('CreativeExperimental', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    // ========================================
    // SECTION 1: Hero with radialGradient + shapes
    // ========================================
    frame('HeroExperimental', {
      size: { x: 1440, y: 600 },
      layoutSizingHorizontal: 'FILL',
      fills: [
        radialGradient([
          { hex: '#7c3aed44', position: 0 },
          { hex: '#0a0a0a', position: 1 },
        ], { center: { x: 0.3, y: 0.4 }, radius: 0.8 }),
      ],
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 80, align: 'CENTER', counterAlign: 'CENTER' }),
      clipContent: true,
      children: [
        text('EXPERIMENTAL', {
          fontSize: 14,
          fontWeight: 700,
          color: purple,
          letterSpacing: { value: 8, unit: 'PIXELS' },
          textDecoration: 'UNDERLINE',
        }),
        text('The Art of\nDigital Creation', {
          fontSize: 80,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 88, unit: 'PIXELS' },
          letterSpacing: { value: -3, unit: 'PIXELS' },
        }),
        text('A showcase of every DSL primitive working in harmony', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
          textDecoration: 'NONE',
        }),
      ],
    }),

    // ========================================
    // SECTION 2: Geometric Shapes Gallery (polygon, star, ellipse, line)
    // ========================================
    frame('ShapesGallery', {
      autoLayout: vertical({ spacing: 40, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Geometric Primitives', {
          fontSize: 36,
          fontWeight: 700,
          color: white,
          textAlignHorizontal: 'CENTER',
          textDecoration: 'NONE',
        }),
        frame('ShapesRow', {
          autoLayout: horizontal({ spacing: 40, counterAlign: 'CENTER', align: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Triangle polygon
            frame('TriangleWrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                polygon('Triangle', {
                  pointCount: 3,
                  size: { x: 100, y: 100 },
                  fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 270)],
                }),
                text('Triangle', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // Pentagon polygon
            frame('PentagonWrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                polygon('Pentagon', {
                  pointCount: 5,
                  size: { x: 100, y: 100 },
                  fills: [gradient([{ hex: pink, position: 0 }, { hex: orange, position: 1 }], 135)],
                  cornerRadius: 4,
                }),
                text('Pentagon', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // Hexagon polygon
            frame('HexagonWrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                polygon('Hexagon', {
                  pointCount: 6,
                  size: { x: 100, y: 100 },
                  fills: [solid(cyan)],
                  strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.2 }, weight: 2, align: 'OUTSIDE' }],
                }),
                text('Hexagon', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // 5-point star
            frame('Star5Wrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                star('FiveStar', {
                  pointCount: 5,
                  size: { x: 100, y: 100 },
                  fills: [gradient([{ hex: '#fbbf24', position: 0 }, { hex: orange, position: 1 }], 270)],
                }),
                text('Star (5pt)', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // 8-point star with custom inner radius
            frame('Star8Wrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                star('EightStar', {
                  pointCount: 8,
                  innerRadius: 0.5,
                  size: { x: 100, y: 100 },
                  fills: [radialGradient([
                    { hex: green, position: 0 },
                    { hex: '#064e3b', position: 1 },
                  ])],
                }),
                text('Star (8pt)', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // Ellipse with stroke
            frame('EllipseWrap', {
              autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                ellipse('Ring', {
                  size: { x: 100, y: 100 },
                  fills: [],
                  strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 1 }, weight: 4, align: 'INSIDE' }],
                }),
                text('Ellipse', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
            // Lines
            frame('LinesWrap', {
              autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                line('Line1', {
                  size: { x: 100 },
                  strokes: [{ color: { r: 0.93, g: 0.29, b: 0.6, a: 1 }, weight: 2 }],
                }),
                line('Line2', {
                  size: { x: 80 },
                  strokes: [{ color: { r: 0.02, g: 0.71, b: 0.83, a: 1 }, weight: 3 }],
                }),
                line('Line3', {
                  size: { x: 60 },
                  strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 1 }, weight: 4 }],
                }),
                text('Lines', { fontSize: 12, fontWeight: 500, color: muted }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 3: Gradient Showcase (linear + radial, multi-stop)
    // ========================================
    frame('GradientShowcase', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Gradient Mastery', { fontSize: 36, fontWeight: 700, color: white }),
        frame('GradientGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Linear gradients at various angles
            gradientSwatch('Linear 0deg', gradient([
              { hex: purple, position: 0 },
              { hex: pink, position: 1 },
            ], 0)),
            gradientSwatch('Linear 90deg', gradient([
              { hex: cyan, position: 0 },
              { hex: green, position: 1 },
            ], 90)),
            gradientSwatch('Linear 135deg', gradient([
              { hex: orange, position: 0 },
              { hex: pink, position: 0.5 },
              { hex: purple, position: 1 },
            ], 135)),
            gradientSwatch('Linear 270deg', gradient([
              { hex: '#3b82f6', position: 0 },
              { hex: '#8b5cf6', position: 0.33 },
              { hex: pink, position: 0.66 },
              { hex: orange, position: 1 },
            ], 270)),
            // Radial gradients
            gradientSwatch('Radial Center', radialGradient([
              { hex: white, position: 0 },
              { hex: purple, position: 1 },
            ])),
            gradientSwatch('Radial Offset', radialGradient([
              { hex: pink, position: 0 },
              { hex: dark, position: 1 },
            ], { center: { x: 0.2, y: 0.2 }, radius: 0.7 })),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 4: cornerRadii + opacity showcase
    // ========================================
    frame('CornerRadiiSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Corner Radii & Opacity', { fontSize: 36, fontWeight: 700, color: white }),
        frame('RadiiRow', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Per-corner radii examples
            frame('TopLeftOnly', {
              size: { x: 160, y: 120 },
              fills: [solid(purple)],
              cornerRadii: { topLeft: 40, topRight: 0, bottomLeft: 0, bottomRight: 0 },
              autoLayout: vertical({ padX: 16, padY: 16, align: 'MAX' }),
              children: [
                text('topLeft: 40', { fontSize: 12, fontWeight: 500, color: white }),
              ],
            }),
            frame('DiagonalRadii', {
              size: { x: 160, y: 120 },
              fills: [solid(pink)],
              cornerRadii: { topLeft: 32, topRight: 0, bottomLeft: 0, bottomRight: 32 },
              autoLayout: vertical({ padX: 16, padY: 16, align: 'MAX' }),
              children: [
                text('diagonal: 32', { fontSize: 12, fontWeight: 500, color: white }),
              ],
            }),
            frame('AllDifferent', {
              size: { x: 160, y: 120 },
              fills: [solid(cyan)],
              cornerRadii: { topLeft: 0, topRight: 20, bottomLeft: 40, bottomRight: 8 },
              autoLayout: vertical({ padX: 16, padY: 16, align: 'MAX' }),
              children: [
                text('0/20/40/8', { fontSize: 12, fontWeight: 500, color: white }),
              ],
            }),
            // Opacity examples
            frame('Opacity100', {
              size: { x: 160, y: 120 },
              fills: [solid(purple)],
              cornerRadius: 12,
              opacity: 1.0,
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('100%', { fontSize: 20, fontWeight: 700, color: white }),
              ],
            }),
            frame('Opacity60', {
              size: { x: 160, y: 120 },
              fills: [solid(purple)],
              cornerRadius: 12,
              opacity: 0.6,
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('60%', { fontSize: 20, fontWeight: 700, color: white }),
              ],
            }),
            frame('Opacity30', {
              size: { x: 160, y: 120 },
              fills: [solid(purple)],
              cornerRadius: 12,
              opacity: 0.3,
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('30%', { fontSize: 20, fontWeight: 700, color: white }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 5: Deep Nesting + Groups
    // ========================================
    frame('DeepNesting', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Deep Nesting & Groups', { fontSize: 36, fontWeight: 700, color: white }),
        frame('NestingDemo', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Deep nesting: 5 levels
            frame('Level1', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1a1a1a')],
              cornerRadius: 20,
              strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 0.3 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Level 1', { fontSize: 14, fontWeight: 600, color: purple }),
                frame('Level2', {
                  autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#222222')],
                  cornerRadius: 16,
                  strokes: [{ color: { r: 0.93, g: 0.29, b: 0.6, a: 0.3 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Level 2', { fontSize: 13, fontWeight: 600, color: pink }),
                    frame('Level3', {
                      autoLayout: vertical({ spacing: 8, padX: 14, padY: 14 }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid('#2a2a2a')],
                      cornerRadius: 12,
                      strokes: [{ color: { r: 0.02, g: 0.71, b: 0.83, a: 0.3 }, weight: 1, align: 'INSIDE' }],
                      children: [
                        text('Level 3', { fontSize: 12, fontWeight: 600, color: cyan }),
                        frame('Level4', {
                          autoLayout: vertical({ spacing: 6, padX: 12, padY: 12 }),
                          layoutSizingHorizontal: 'FILL',
                          fills: [solid('#333333')],
                          cornerRadius: 8,
                          strokes: [{ color: { r: 0.97, g: 0.45, b: 0.09, a: 0.3 }, weight: 1, align: 'INSIDE' }],
                          children: [
                            text('Level 4', { fontSize: 11, fontWeight: 600, color: orange }),
                            frame('Level5', {
                              autoLayout: horizontal({ spacing: 8, padX: 10, padY: 10, counterAlign: 'CENTER' }),
                              layoutSizingHorizontal: 'FILL',
                              fills: [gradient([
                                { hex: purple, position: 0 },
                                { hex: pink, position: 1 },
                              ], 135)],
                              cornerRadius: 6,
                              children: [
                                ellipse('Dot1', { size: { x: 12, y: 12 }, fills: [solid(white)] }),
                                ellipse('Dot2', { size: { x: 12, y: 12 }, fills: [solid(white, 0.7)] }),
                                ellipse('Dot3', { size: { x: 12, y: 12 }, fills: [solid(white, 0.4)] }),
                                text('Level 5 - Deepest', { fontSize: 11, fontWeight: 600, color: white }),
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

            // Group demonstration
            frame('GroupDemo', {
              autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1a1a1a')],
              cornerRadius: 16,
              children: [
                text('Group Nodes', { fontSize: 18, fontWeight: 600, color: white }),
                group('ShapeGroup', [
                  rectangle('GroupRect1', {
                    size: { x: 80, y: 60 },
                    fills: [solid(purple, 0.8)],
                    cornerRadius: 8,
                  }),
                  rectangle('GroupRect2', {
                    size: { x: 80, y: 60 },
                    fills: [solid(pink, 0.8)],
                    cornerRadius: 8,
                  }),
                  rectangle('GroupRect3', {
                    size: { x: 80, y: 60 },
                    fills: [solid(cyan, 0.8)],
                    cornerRadius: 8,
                  }),
                ]),
                group('TextGroup', [
                  text('Grouped Text A', { fontSize: 14, fontWeight: 500, color: purple }),
                  text('Grouped Text B', { fontSize: 14, fontWeight: 500, color: pink }),
                  text('Grouped Text C', { fontSize: 14, fontWeight: 500, color: cyan }),
                ]),
              ],
            }),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 6: Section node + SPACE_BETWEEN + textDecoration + strokes
    // ========================================
    frame('SectionAndLayout', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Sections, Layouts & Typography', { fontSize: 36, fontWeight: 700, color: white }),

        // Section node
        section('ArtSection', {
          size: { x: 1280, y: 200 },
          fills: [solid('#1a1a2e')],
          children: [
            rectangle('SectionChild1', {
              size: { x: 120, y: 80 },
              fills: [solid(purple)],
              cornerRadius: 8,
            }),
            rectangle('SectionChild2', {
              size: { x: 120, y: 80 },
              fills: [solid(pink)],
              cornerRadius: 8,
            }),
            rectangle('SectionChild3', {
              size: { x: 120, y: 80 },
              fills: [solid(cyan)],
              cornerRadius: 8,
            }),
          ],
        }),

        // SPACE_BETWEEN layout
        frame('SpaceBetweenDemo', {
          autoLayout: horizontal({ spacing: 0, padX: 24, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#1a1a1a')],
          cornerRadius: 12,
          children: [
            text('LEFT', { fontSize: 14, fontWeight: 700, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('SPACE_BETWEEN', { fontSize: 14, fontWeight: 700, color: muted }),
            text('RIGHT', { fontSize: 14, fontWeight: 700, color: pink, letterSpacing: { value: 2, unit: 'PIXELS' } }),
          ],
        }),

        // Text decoration showcase
        frame('TextDecorations', {
          autoLayout: horizontal({ spacing: 32, padX: 24, padY: 20 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid('#1a1a1a')],
          cornerRadius: 12,
          children: [
            text('Normal Text', { fontSize: 16, fontWeight: 500, color: white, textDecoration: 'NONE' }),
            text('Underlined Text', { fontSize: 16, fontWeight: 500, color: purple, textDecoration: 'UNDERLINE' }),
            text('Strikethrough Text', { fontSize: 16, fontWeight: 500, color: pink, textDecoration: 'STRIKETHROUGH' }),
          ],
        }),

        // Strokes showcase: multiple stroke styles
        frame('StrokesDemo', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('StrokeInside', {
              size: { x: 200, y: 80 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 1 }, weight: 3, align: 'INSIDE' }],
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('INSIDE', { fontSize: 12, fontWeight: 600, color: purple }),
              ],
            }),
            frame('StrokeCenter', {
              size: { x: 200, y: 80 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.93, g: 0.29, b: 0.6, a: 1 }, weight: 3, align: 'CENTER' }],
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('CENTER', { fontSize: 12, fontWeight: 600, color: pink }),
              ],
            }),
            frame('StrokeOutside', {
              size: { x: 200, y: 80 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 12,
              strokes: [{ color: { r: 0.02, g: 0.71, b: 0.83, a: 1 }, weight: 3, align: 'OUTSIDE' }],
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('OUTSIDE', { fontSize: 12, fontWeight: 600, color: cyan }),
              ],
            }),
            frame('MultiStroke', {
              size: { x: 200, y: 80 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 12,
              strokes: [
                { color: { r: 0.49, g: 0.23, b: 0.93, a: 1 }, weight: 4, align: 'INSIDE' },
                { color: { r: 0.93, g: 0.29, b: 0.6, a: 0.5 }, weight: 2, align: 'OUTSIDE' },
              ],
              autoLayout: vertical({ padX: 16, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('MULTI', { fontSize: 12, fontWeight: 600, color: orange }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 7: clipContent + complex compositions
    // ========================================
    frame('ClipContentSection', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Clip Content & Compositions', { fontSize: 36, fontWeight: 700, color: white }),
        frame('ClipDemo', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Clipped overflow
            frame('ClippedFrame', {
              size: { x: 200, y: 200 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 24,
              clipContent: true,
              autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
              children: [
                text('Clipped Content', { fontSize: 14, fontWeight: 600, color: white }),
                rectangle('Overflow1', {
                  size: { x: 300, y: 60 },
                  fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 0)],
                  cornerRadius: 8,
                }),
                rectangle('Overflow2', {
                  size: { x: 250, y: 60 },
                  fills: [gradient([{ hex: cyan, position: 0 }, { hex: green, position: 1 }], 0)],
                  cornerRadius: 8,
                }),
                rectangle('Overflow3', {
                  size: { x: 280, y: 60 },
                  fills: [gradient([{ hex: orange, position: 0 }, { hex: '#fbbf24', position: 1 }], 0)],
                  cornerRadius: 8,
                }),
              ],
            }),
            // Unclipped for comparison
            frame('UnclippedFrame', {
              size: { x: 200, y: 200 },
              fills: [solid('#1a1a1a')],
              cornerRadius: 24,
              clipContent: false,
              autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
              children: [
                text('Unclipped', { fontSize: 14, fontWeight: 600, color: white }),
                rectangle('NoClip1', {
                  size: { x: 300, y: 60 },
                  fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 0)],
                  cornerRadius: 8,
                  opacity: 0.6,
                }),
              ],
            }),

            // Art composition with mixed shapes
            frame('ArtComposition', {
              autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              fills: [
                radialGradient([
                  { hex: '#1a0a2e', position: 0 },
                  { hex: '#0a0a0a', position: 1 },
                ], { center: { x: 0.5, y: 0.5 }, radius: 0.6 }),
              ],
              cornerRadius: 20,
              clipContent: true,
              children: [
                text('Art Composition', { fontSize: 18, fontWeight: 700, color: white }),
                frame('ArtRow1', {
                  autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
                  children: [
                    star('ArtStar', {
                      pointCount: 6,
                      innerRadius: 0.4,
                      size: { x: 48, y: 48 },
                      fills: [gradient([{ hex: '#fbbf24', position: 0 }, { hex: orange, position: 1 }], 270)],
                    }),
                    polygon('ArtHex', {
                      pointCount: 6,
                      size: { x: 48, y: 48 },
                      fills: [solid(cyan, 0.8)],
                    }),
                    ellipse('ArtCircle', {
                      size: { x: 48, y: 48 },
                      fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
                    }),
                    polygon('ArtTri', {
                      pointCount: 3,
                      size: { x: 48, y: 48 },
                      fills: [solid(green, 0.8)],
                    }),
                  ],
                }),
                frame('ArtRow2', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    line('ArtLine1', { size: { x: 60 }, strokes: [{ color: { r: 0.49, g: 0.23, b: 0.93, a: 0.6 }, weight: 2 }] }),
                    ellipse('ArtDot1', { size: { x: 8, y: 8 }, fills: [solid(purple)] }),
                    line('ArtLine2', { size: { x: 60 }, strokes: [{ color: { r: 0.93, g: 0.29, b: 0.6, a: 0.6 }, weight: 2 }] }),
                    ellipse('ArtDot2', { size: { x: 8, y: 8 }, fills: [solid(pink)] }),
                    line('ArtLine3', { size: { x: 60 }, strokes: [{ color: { r: 0.02, g: 0.71, b: 0.83, a: 0.6 }, weight: 2 }] }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ========================================
    // SECTION 8: Typography & Text Feature Stress Test
    // ========================================
    frame('TypographyStress', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Typography Stress Test', { fontSize: 36, fontWeight: 700, color: white }),
        frame('WeightRow', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'MAX' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Thin', { fontSize: 28, fontWeight: 100, color: '#52525b' }),
            text('Light', { fontSize: 28, fontWeight: 300, color: '#71717a' }),
            text('Regular', { fontSize: 28, fontWeight: 400, color: muted }),
            text('Medium', { fontSize: 28, fontWeight: 500, color: '#d4d4d8' }),
            text('Semi', { fontSize: 28, fontWeight: 600, color: '#e4e4e7' }),
            text('Bold', { fontSize: 28, fontWeight: 700, color: '#f4f4f5' }),
            text('Extra', { fontSize: 28, fontWeight: 800, color: white }),
            text('Black', { fontSize: 28, fontWeight: 900, color: white }),
          ],
        }),
        frame('SizeRow', {
          autoLayout: horizontal({ spacing: 20, counterAlign: 'MAX' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('10px', { fontSize: 10, fontWeight: 400, color: muted }),
            text('12px', { fontSize: 12, fontWeight: 400, color: muted }),
            text('14px', { fontSize: 14, fontWeight: 400, color: muted }),
            text('18px', { fontSize: 18, fontWeight: 400, color: muted }),
            text('24px', { fontSize: 24, fontWeight: 400, color: muted }),
            text('32px', { fontSize: 32, fontWeight: 400, color: muted }),
            text('48px', { fontSize: 48, fontWeight: 400, color: muted }),
          ],
        }),
        frame('DecorationRow', {
          autoLayout: horizontal({ spacing: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Underlined link style', { fontSize: 16, fontWeight: 500, color: purple, textDecoration: 'UNDERLINE' }),
            text('Strikethrough price', { fontSize: 16, fontWeight: 500, color: '#ef4444', textDecoration: 'STRIKETHROUGH' }),
            text('Normal text baseline', { fontSize: 16, fontWeight: 500, color: white, textDecoration: 'NONE' }),
          ],
        }),
        // Wrapped text with line height and letter spacing
        text('This is a long paragraph with custom line height and letter spacing to test how the DSL handles multi-line text rendering with various typographic properties applied simultaneously. The quick brown fox jumps over the lazy dog, demonstrating all letterforms in a single sentence.', {
          fontSize: 16,
          fontWeight: 400,
          color: '#d4d4d8',
          lineHeight: { value: 28, unit: 'PIXELS' },
          letterSpacing: { value: 0.5, unit: 'PIXELS' },
          size: { x: 1280 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    }),

    // ========================================
    // FOOTER
    // ========================================
    frame('Footer', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#1a0a2e', position: 0 },
          { hex: dark, position: 1 },
        ], 270),
      ],
      children: [
        text('DSL Feature Coverage: 100%', {
          fontSize: 14,
          fontWeight: 600,
          color: purple,
          letterSpacing: { value: 2, unit: 'PIXELS' },
        }),
        text('frame \u2022 text \u2022 rectangle \u2022 ellipse \u2022 polygon \u2022 star \u2022 line \u2022 group \u2022 section \u2022 component', {
          fontSize: 13,
          fontWeight: 400,
          color: muted,
        }),
        text('gradient \u2022 radialGradient \u2022 solid \u2022 cornerRadii \u2022 clipContent \u2022 opacity \u2022 strokes \u2022 SPACE_BETWEEN \u2022 textDecoration', {
          fontSize: 13,
          fontWeight: 400,
          color: muted,
        }),
        rectangle('FooterDivider', {
          size: { x: 200, y: 2 },
          fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 0.5 }, { hex: cyan, position: 1 }], 0)],
          cornerRadius: 1,
        }),
        text('© 2026 Creative Experimental — All DSL Primitives Exercised', { fontSize: 12, fontWeight: 400, color: '#52525b' }),
      ],
    }),
  ],
});

// Helper to wrap a gradient fill in a swatch card
function gradientSwatch(label: string, fill: ReturnType<typeof gradient>) {
  return frame(`Swatch: ${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('SwatchRect', {
        size: { x: 100, y: 100 },
        fills: [fill],
        cornerRadius: 12,
        layoutSizingHorizontal: 'FILL',
      }),
      text(label, { fontSize: 12, fontWeight: 500, color: muted, textAlignHorizontal: 'CENTER' }),
    ],
  });
}
