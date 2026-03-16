# Dogfooding: DslCanvas 100-Design Stress Test
> Date: 2026-03-16 | 100 iterations across 10 batches

## Overview
Stress-tested the DSL rendering pipeline with 100 unique designs, all rendered through the `DslCanvas` React component and the `canvas()` DSL primitive. Each batch targeted a specific feature area with escalating complexity.

## Batch Summary

| Batch | Focus | Designs | Issues | Notes |
|-------|-------|---------|--------|-------|
| 1 | Foundations | 10 | 0 | Basic shapes, frames, canvas nesting |
| 2 | Typography | 10 | 0 | Font sizes/weights, alignment, wrapping, line heights |
| 3 | Auto-Layout | 10 | 0 | H/V layouts, 5-level nesting, spacing, padding |
| 4 | Colors & Fills | 10 | 0 | Linear/radial gradients, multi-stop, opacity |
| 5 | Sizing & Alignment | 10 | 0 | FILL/HUG/FIXED, counterAlign, SPACE_BETWEEN |
| 6 | Borders & Clipping | 10 | 0 | Strokes, per-corner radii, clipContent |
| 7 | Canvas Nesting | 10 | 0 | 4-deep canvas nesting, mixed scales |
| 8 | Complex Layouts | 10 | 0 | Dashboard, pricing table, feed, sidebar |
| 9 | Edge Cases | 10 | 0 | Zero spacing, 1px elements, 800px tall canvas |
| 10 | Stress Tests | 10 | 0 | 100-rect grid, 1000x1000 canvas, 8 concurrent canvases |

## DslCanvas Performance

All 100 designs rendered successfully through the DslCanvas Vite plugin API:

| Design | Size | Render Time |
|--------|------|-------------|
| Simple shapes | 400x300 | ~10ms |
| Linear gradient | 400x300 | ~10ms |
| Triple canvas (nested) | 400x400 | ~10ms |
| 100 rectangles grid | 560x660 | ~20ms |
| Large canvas | 1060x1060 | ~50ms |
| Gradient heavy | 700x700 | ~40ms |

## DSL Features Exercised

- **Node types**: frame, text, rectangle, ellipse, canvas (all working)
- **Fills**: solid, gradient (linear), radialGradient, opacity on fills
- **Layout**: horizontal, vertical, nested H+V, SPACE_BETWEEN, counterAlign CENTER/MAX
- **Sizing**: FILL, HUG, FIXED, layoutSizingHorizontal/Vertical
- **Text**: fontSize 8-48, fontWeight 400-700, textAutoResize HEIGHT, lineHeight, letterSpacing, textAlignHorizontal
- **Borders**: strokes (INSIDE/CENTER/OUTSIDE), cornerRadius, cornerRadii (per-corner)
- **Clipping**: clipContent with oversized children
- **Canvas**: canvas() primitive, nested canvas-in-canvas (up to 4 deep), scale 1x/2x

## Pipeline Fixes
None required — all 100 designs compiled, rendered, and served through DslCanvas without errors.

## Known Observations
- Text wrapping with `textAutoResize: 'HEIGHT'` works correctly when using `compileWithLayout` (layout resolver measures text and computes height)
- Canvas nodes at 2x scale render at double dimensions as expected
- The Vite plugin cache (SHA256-based) provides instant responses for repeated renders
- No memory or performance issues with 100 concurrent DslCanvas imports in the gallery

## Commits
- See git log for this session's commits
